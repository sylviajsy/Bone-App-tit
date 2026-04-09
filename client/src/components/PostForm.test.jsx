import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import PostForm from './PostForm';

describe('Add Post', () => {
    const mockOnSubmit = vi.fn();
    const mockOnClose = vi.fn();

    const mockCategories = [
        { id: 1, name: 'Cafe' },
        { id: 2, name: 'Park' },
    ];

    const mockSuggestions = [
        { name: 'Zilker Park', address: 'Austin, TX', lat: 30.26, lon: -97.77 }
    ];

    beforeEach(() => {
        vi.clearAllMocks();

        global.fetch = vi.fn((url) => {
            if (url.includes('/api/categories')) {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve(mockCategories),
                });
            }
            if (url.includes('/api/geocode/autocomplete')) {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve(mockSuggestions),
                });
            }
            return Promise.reject(new Error('Unknown API'));
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test('user can select autocomplete result and submit the form', async () => {
        const user = userEvent.setup();

        render(<PostForm onClose={mockOnClose} onSubmit={mockOnSubmit} />);

        const categorySelect = await screen.findByRole('combobox');

        const placeInput = screen.getByPlaceholderText(/Place name/i);
        await user.type(placeInput, 'Zilker');

        const suggestionItem = await screen.findByText('Zilker Park');
        await user.click(suggestionItem);

        await user.type(screen.getByPlaceholderText(/Post title/i), 'Great Dog Park');
        await user.type(screen.getByPlaceholderText(/Author/i), 'Dog Lover');
        await user.type(screen.getByPlaceholderText(/Write your review/i), 'Lots of space for dogs.');

        await user.selectOptions(categorySelect, '1');

        await user.type(screen.getByPlaceholderText(/Rating/i), '5');

        const submitButton = screen.getByRole('button', { name: /Add/i });
        await user.click(submitButton);

        await waitFor(() => {
            expect(mockOnSubmit).toHaveBeenCalledWith(expect.objectContaining({
                place_name: 'Zilker Park',
                address: 'Austin, TX',
                title: 'Great Dog Park',
                content: 'Lots of space for dogs.',
                pet_friendly_rating: '5',
                category_id: '1'
            }));
        });
    });
})