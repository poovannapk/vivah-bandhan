import { render, screen, fireEvent } from '@testing-library/react';
import { RegisterPage } from '../RegisterPage';

describe('RegisterPage', () => {
  it('renders registration form', () => {
    render(<RegisterPage />);
    expect(screen.getByTestId('register-email')).toBeInTheDocument();
    expect(screen.getByTestId('register-password')).toBeInTheDocument();
  });

  it('shows error on empty submit', () => {
    render(<RegisterPage />);
    fireEvent.click(screen.getByTestId('register-submit'));
    expect(screen.getByText(/Please fill all required fields/i)).toBeInTheDocument();
  });
});