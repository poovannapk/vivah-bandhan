import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MessagesPage } from '../MessagesPage';

describe('MessagesPage', () => {
  it('renders conversation list', () => {
    render(<MessagesPage />);
    expect(screen.getByText(/Priya Sharma/i)).toBeInTheDocument();
  });

  it('selects a conversation', () => {
    render(<MessagesPage />);
    fireEvent.click(screen.getByText(/Priya Sharma/i));
    expect(screen.getByTestId('message-thread')).toBeInTheDocument();
  });

  it('sends a new message', () => {
    render(<MessagesPage />);
    const input = screen.getByTestId('message-input');
    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });
});