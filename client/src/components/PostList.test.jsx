import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
import PostList from './PostList';

// mock PostCard
vi.mock('./PostCard', () => ({
  default: ({ post, onClick }) => (
    <button onClick={onClick}>
      Post {post.id}: {post.title}
    </button>
  ),
}));

describe('PostList', () => {
    const posts = [
        { id: 1, title: 'Post One' },
        { id: 2, title: 'Post Two' },
    ];

    test('renders posts count', () => {
        render(<PostList posts={posts} handleOpenPost={() => {}} />);

        expect(screen.getByText('2 posts')).toBeInTheDocument();
    });

});