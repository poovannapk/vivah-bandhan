import { render, screen } from '@testing-library/react';
import { ProfilePage } from '../ProfilePage';

describe('ProfilePage', () => {
  it('renders user profile', () => {
    render(<ProfilePage />);
    expect(screen.getByText(/Profile/i)).toBeInTheDocument();
    // expect(screen.getByText(/user@example.com/i)).toBeInTheDocument();
  });
});