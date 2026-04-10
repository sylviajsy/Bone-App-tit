import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
import PostCard from './PostCard';

describe('PostCard', () => {
    const mockPost = {
        id: 1,
        title: 'Great park',
        author: 'Siyi',
        pet_friendly_rating: 5,
    };

    test('renders post information correctly', () => {
        render(<PostCard post={mockPost} onClick={() => {}} />);

        expect(screen.getByText('Great park')).toBeInTheDocument();
        expect(screen.getByText('By Siyi')).toBeInTheDocument();
        expect(screen.getByText('5/5')).toBeInTheDocument();
    });

  
});