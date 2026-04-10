import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import PostDetailPage from './PostDetailPage';

describe('PostDetailPage Unit Test', () => {
    const mockPost = {
        title: 'Amazing Dog Park',
        author: 'Paw-some User',
        content: 'Our golden retriever had a blast here! Very secure fencing.',
        pet_friendly_rating: 5
    };

    const mockHandleClose = vi.fn();

    test('Renders the post', () => {
        render(<PostDetailPage selectedPost={mockPost} handleClosePost={mockHandleClose} />);

        expect(screen.getByText(mockPost.title)).toBeInTheDocument();
        expect(screen.getByText(new RegExp(mockPost.author, 'i'))).toBeInTheDocument();
        expect(screen.getByText(mockPost.content)).toBeInTheDocument();

        expect(screen.getByText(/5\/5/i)).toBeInTheDocument();
    })
})