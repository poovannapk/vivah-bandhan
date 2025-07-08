import React, { useState } from 'react';

const ProkeralaMatchPage: React.FC = () => {
  const [boy, setBoy] = useState({ date: '', month: '', year: '', hour: '', minute: '', lat: '', lon: '', tzone: '' });
  const [girl, setGirl] = useState({ date: '', month: '', year: '', hour: '', minute: '', lat: '', lon: '', tzone: '' });
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (who: 'boy' | 'girl', field: string, value: string) => {
    if (who === 'boy') setBoy(prev => ({ ...prev, [field]: value }));
    else setGirl(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);
    try {
      const res = await fetch('/api/compatibility/prokerala-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ boyDetails: boy, girlDetails: girl }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch compatibility');
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch compatibility');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-4">Kundli Matching</h2>
        <div className="grid grid-cols-2 gap-6 mb-4">
          <div>
            <h3 className="font-semibold mb-2">Boy's Birth Details</h3>
            {/* Use a single datetime-local input for date, month, year, hour, minute */}
            <label className="block text-sm font-medium text-gray-700 mb-1">Birth Date & Time</label>
            <input
              type="datetime-local"
              className="border p-2 w-full mb-2"
              value={boy.dateTime || ''}
              onChange={e => {
                const dt = e.target.value;
                // Optionally, parse and split into date, month, year, hour, minute if backend expects it
                setBoy(prev => ({ ...prev, dateTime: dt }));
              }}
              required
            />
            {/* Birth Location Dropdowns */}
            <label className="block text-sm font-medium text-gray-700 mb-1">Birth State</label>
            <select
              className="border p-2 w-full mb-2"
              value={boy.state || ''}
              onChange={e => handleChange('boy', 'state', e.target.value)}
              required
            >
              <option value="">Select State</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Bihar">Bihar</option>
              <option value="Punjab">Punjab</option>
              <option value="Kerala">Kerala</option>
              <option value="Delhi">Delhi</option>
              <option value="Other">Other</option>
            </select>
            <label className="block text-sm font-medium text-gray-700 mb-1">Birth District/City</label>
            <input
              type="text"
              className="border p-2 w-full mb-2"
              placeholder="Enter District or City"
              value={boy.district || ''}
              onChange={e => handleChange('boy', 'district', e.target.value)}
              required
            />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Girl's Birth Details</h3>
            <label className="block text-sm font-medium text-gray-700 mb-1">Birth Date & Time</label>
            <input
              type="datetime-local"
              className="border p-2 w-full mb-2"
              value={girl.dateTime || ''}
              onChange={e => {
                const dt = e.target.value;
                setGirl(prev => ({ ...prev, dateTime: dt }));
              }}
              required
            />
            <label className="block text-sm font-medium text-gray-700 mb-1">Birth State</label>
            <select
              className="border p-2 w-full mb-2"
              value={girl.state || ''}
              onChange={e => handleChange('girl', 'state', e.target.value)}
              required
            >
              <option value="">Select State</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Bihar">Bihar</option>
              <option value="Punjab">Punjab</option>
              <option value="Kerala">Kerala</option>
              <option value="Delhi">Delhi</option>
              <option value="Other">Other</option>
            </select>
            <label className="block text-sm font-medium text-gray-700 mb-1">Birth District/City</label>
            <input
              type="text"
              className="border p-2 w-full mb-2"
              placeholder="Enter District or City"
              value={girl.district || ''}
              onChange={e => handleChange('girl', 'district', e.target.value)}
              required
            />
          </div>
        </div>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <button type="submit" className="bg-primary-600 text-white px-4 py-2 rounded w-full" disabled={loading}>
          {loading ? 'Checking...' : 'Check Compatibility'}
        </button>
        {result && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded">
            <h3 className="text-lg font-bold text-green-700 mb-2 text-center">Compatibility Result</h3>
            {result.summary && (
              <div className="mb-2 text-center text-base text-gray-700">{result.summary}</div>
            )}
            {result.score !== undefined && (
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="font-bold text-2xl text-green-600">{result.score}</span>
                <span className="text-gray-600">/ 36 Points</span>
              </div>
            )}
            {result.details && Array.isArray(result.details) && (
              <ul className="mt-2 space-y-1">
                {result.details.map((item: any, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className={`h-2 w-2 rounded-full mt-2 ${item.passed ? 'bg-green-500' : 'bg-red-400'}`}></span>
                    <span className="text-gray-800">{item.name}: <span className={item.passed ? 'text-green-700' : 'text-red-600'}>{item.result}</span></span>
                  </li>
                ))}
              </ul>
            )}
            {result.recommendation && (
              <div className="mt-3 text-center text-sm text-blue-700 font-medium">{result.recommendation}</div>
            )}
            {/* fallback for unknown structure */}
            {!result.summary && !result.score && !result.details && !result.recommendation && (
              <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default ProkeralaMatchPage;
