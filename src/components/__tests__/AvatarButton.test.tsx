import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AvatarButton from '../AvatarButton';

// Mock the lucide-react icons
jest.mock('lucide-react', () => ({
  ArrowRight: () => <div data-testid="arrow-right-icon" />,
  X: () => <div data-testid="x-icon" />,
  Play: () => <div data-testid="play-icon" />,
}));

describe('AvatarButton', () => {
  beforeEach(() => {
    // Reset body overflow style before each test
    document.body.style.overflow = 'unset';
  });

  afterEach(() => {
    // Clean up body overflow style after each test
    document.body.style.overflow = 'unset';
  });

  it('renders the launch button correctly', () => {
    render(<AvatarButton />);
    
    const button = screen.getByRole('button', { name: /launch avatar/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Launch Avatar');
    
    // Check for icons
    expect(screen.getByTestId('play-icon')).toBeInTheDocument();
    expect(screen.getByTestId('arrow-right-icon')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    render(<AvatarButton className="custom-class" />);
    
    const button = screen.getByRole('button', { name: /launch avatar/i });
    expect(button).toHaveClass('custom-class');
  });

  it('opens modal when button is clicked', async () => {
    const user = userEvent.setup();
    render(<AvatarButton />);
    
    const button = screen.getByRole('button', { name: /launch avatar/i });
    await user.click(button);
    
    // Check if modal is opened
    expect(screen.getByText('AI Avatar Interface')).toBeInTheDocument();
    expect(screen.getByText('Experience real-time AI interaction')).toBeInTheDocument();
    expect(screen.getByText('Loading Avatar...')).toBeInTheDocument();
  });

  it('shows loading state initially when modal opens', async () => {
    const user = userEvent.setup();
    render(<AvatarButton />);
    
    const button = screen.getByRole('button', { name: /launch avatar/i });
    await user.click(button);
    
    // Check loading state
    expect(screen.getByText('Loading Avatar...')).toBeInTheDocument();
    expect(screen.getByText('Initializing AI interface')).toBeInTheDocument();
    
    // Check for loading spinner
    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('shows avatar interface after loading completes', async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    
    render(<AvatarButton />);
    
    const button = screen.getByRole('button', { name: /launch avatar/i });
    await user.click(button);
    
    // Fast-forward time to complete loading
    jest.advanceTimersByTime(2000);
    
    await waitFor(() => {
      expect(screen.getByText('Avatar Ready')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Your AI avatar is now active and ready for interaction.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /start conversation/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /settings/i })).toBeInTheDocument();
    
    jest.useRealTimers();
  });

  it('closes modal when X button is clicked', async () => {
    const user = userEvent.setup();
    render(<AvatarButton />);
    
    // Open modal
    const launchButton = screen.getByRole('button', { name: /launch avatar/i });
    await user.click(launchButton);
    
    // Close modal
    const closeButton = screen.getByTestId('x-icon').closest('button');
    expect(closeButton).toBeInTheDocument();
    
    if (closeButton) {
      await user.click(closeButton);
    }
    
    // Check if modal is closed
    expect(screen.queryByText('AI Avatar Interface')).not.toBeInTheDocument();
  });

  it('closes modal when backdrop is clicked', async () => {
    const user = userEvent.setup();
    render(<AvatarButton />);
    
    // Open modal
    const button = screen.getByRole('button', { name: /launch avatar/i });
    await user.click(button);
    
    // Click backdrop
    const backdrop = document.querySelector('.bg-black\\/60');
    expect(backdrop).toBeInTheDocument();
    
    if (backdrop) {
      await user.click(backdrop);
    }
    
    // Check if modal is closed
    expect(screen.queryByText('AI Avatar Interface')).not.toBeInTheDocument();
  });

  it('closes modal when Escape key is pressed', async () => {
    const user = userEvent.setup();
    render(<AvatarButton />);
    
    // Open modal
    const button = screen.getByRole('button', { name: /launch avatar/i });
    await user.click(button);
    
    // Press Escape key
    await user.keyboard('{Escape}');
    
    // Check if modal is closed
    expect(screen.queryByText('AI Avatar Interface')).not.toBeInTheDocument();
  });

  it('prevents body scroll when modal is open', async () => {
    const user = userEvent.setup();
    render(<AvatarButton />);
    
    // Initially body should have normal overflow
    expect(document.body.style.overflow).toBe('unset');
    
    // Open modal
    const button = screen.getByRole('button', { name: /launch avatar/i });
    await user.click(button);
    
    // Body overflow should be hidden
    expect(document.body.style.overflow).toBe('hidden');
    
    // Close modal
    const closeButton = screen.getByTestId('x-icon').closest('button');
    if (closeButton) {
      await user.click(closeButton);
    }
    
    // Body overflow should be restored
    expect(document.body.style.overflow).toBe('unset');
  });

  it('displays connection status in footer', async () => {
    const user = userEvent.setup();
    render(<AvatarButton />);
    
    const button = screen.getByRole('button', { name: /launch avatar/i });
    await user.click(button);
    
    expect(screen.getByText('Powered by Advanced AI Technology')).toBeInTheDocument();
    expect(screen.getByText('Connected')).toBeInTheDocument();
    
    // Check for connection indicator
    const indicator = document.querySelector('.bg-green-500');
    expect(indicator).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<AvatarButton />);
    
    const button = screen.getByRole('button', { name: /launch avatar/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
  });
});

