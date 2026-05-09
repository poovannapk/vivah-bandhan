import React, { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import { Input } from './Input';

type GoogleLocationInputProps = {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onPlaceSelect?: (place: {
    formattedAddress: string;
    city?: string;
    state?: string;
    country?: string;
    lat?: number;
    lng?: number;
    placeId?: string;
  }) => void;
};

type GoogleMapsWindow = Window & {
  google?: {
    maps?: {
      places?: {
        Autocomplete: new (
          input: HTMLInputElement,
          options?: {
            fields?: string[];
            types?: string[];
          }
        ) => {
          addListener: (eventName: string, handler: () => void) => void;
          getPlace: () => {
            formatted_address?: string;
            name?: string;
            place_id?: string;
            address_components?: Array<{
              long_name: string;
              short_name: string;
              types: string[];
            }>;
            geometry?: {
              location?: {
                lat: () => number;
                lng: () => number;
              };
            };
          };
        };
      };
      event?: {
        clearInstanceListeners: (instance: unknown) => void;
      };
    };
  };
};

let googleMapsScriptPromise: Promise<void> | null = null;

const loadGoogleMapsPlaces = (apiKey: string): Promise<void> => {
  const googleWindow = window as GoogleMapsWindow;

  if (googleWindow.google?.maps?.places) {
    return Promise.resolve();
  }

  if (googleMapsScriptPromise) {
    return googleMapsScriptPromise;
  }

  googleMapsScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>('script[data-google-maps-places]');

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true });
      existingScript.addEventListener('error', () => reject(new Error('Failed to load Google Maps')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.dataset.googleMapsPlaces = 'true';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Google Maps'));
    document.head.appendChild(script);
  });

  return googleMapsScriptPromise;
};

const getAddressPart = (
  components: Array<{ long_name: string; short_name: string; types: string[] }> = [],
  type: string
) => components.find(component => component.types.includes(type))?.long_name;

export const GoogleLocationInput: React.FC<GoogleLocationInputProps> = ({
  label,
  placeholder = 'Search city, state, or country',
  value,
  onChange,
  onPlaceSelect,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const autocompleteRef = useRef<unknown>(null);
  const [isGoogleReady, setIsGoogleReady] = useState(false);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (!apiKey || !inputRef.current) return;

    let isMounted = true;

    loadGoogleMapsPlaces(apiKey)
      .then(() => {
        if (!isMounted || !inputRef.current) return;

        const googleWindow = window as GoogleMapsWindow;
        const Autocomplete = googleWindow.google?.maps?.places?.Autocomplete;
        if (!Autocomplete) return;

        const autocomplete = new Autocomplete(inputRef.current, {
          fields: ['address_components', 'formatted_address', 'geometry', 'name', 'place_id'],
          types: ['(cities)'],
        });

        autocompleteRef.current = autocomplete;
        setIsGoogleReady(true);

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          const formattedAddress = place.formatted_address || place.name || '';
          const nextValue = formattedAddress || value;
          const lat = place.geometry?.location?.lat();
          const lng = place.geometry?.location?.lng();

          onChange(nextValue);
          onPlaceSelect?.({
            formattedAddress: nextValue,
            city: getAddressPart(place.address_components, 'locality') || getAddressPart(place.address_components, 'administrative_area_level_2'),
            state: getAddressPart(place.address_components, 'administrative_area_level_1'),
            country: getAddressPart(place.address_components, 'country'),
            lat,
            lng,
            placeId: place.place_id,
          });
        });
      })
      .catch(() => setIsGoogleReady(false));

    return () => {
      isMounted = false;
      const googleWindow = window as GoogleMapsWindow;
      if (autocompleteRef.current) {
        googleWindow.google?.maps?.event?.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [apiKey, onChange, onPlaceSelect, value]);

  return (
    <Input
      ref={inputRef}
      type="text"
      label={label}
      placeholder={apiKey ? placeholder : `${placeholder} (add Google API key for suggestions)`}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      icon={<MapPin className="h-5 w-5" />}
      autoComplete="off"
      title={isGoogleReady ? 'Google location suggestions enabled' : undefined}
    />
  );
};
