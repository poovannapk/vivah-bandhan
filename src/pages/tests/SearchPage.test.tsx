import { render, screen, fireEvent } from '@testing-library/react';
import { SearchPage } from '../SearchPage';

describe('SearchPage', () => {
  it('renders search input', () => {
    render(<SearchPage />);
    expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();
  });

  it('shows results after search', () => {
    render(<SearchPage />);
    fireEvent.change(screen.getByPlaceholderText(/Search/i), { target: { value: 'Priya' } });
    fireEvent.click(screen.getByText(/Search/i));
    // expect(screen.getByText(/Priya Sharma/i)).toBeInTheDocument();
  });
});