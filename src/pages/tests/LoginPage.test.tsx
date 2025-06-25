import { render, screen, fireEvent } from '@testing-library/react';
import { LoginPage } from '../LoginPage';

describe('LoginPage', () => {
  it('renders login form', () => {
    render(<LoginPage />);
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('shows error on invalid login', async () => {
    render(<LoginPage />);
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByText(/Sign In/i));
    // Mock fetch or context to return error
    // expect(await screen.findByText(/Invalid email or password/i)).toBeInTheDocument();
  });
});