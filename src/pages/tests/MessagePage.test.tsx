import { render, screen, fireEvent } from '@testing-library/react';
import { MessagesPage } from '../MessagesPage';

describe('MessagesPage', () => {
  it('renders conversation list', () => {
    render(<MessagesPage />);
    expect(screen.getByTestId('conversation-list')).toBeInTheDocument();
  });

  it('sends a message', () => {
    render(<MessagesPage />);
    fireEvent.change(screen.getByTestId('message-input'), { target: { value: 'Hello' } });
    fireEvent.keyDown(screen.getByTestId('message-input'), { key: 'Enter', code: 'Enter' });
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});