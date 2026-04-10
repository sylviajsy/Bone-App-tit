import { render, screen, act } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { TypewriterSummary } from './TypewriterSummary';

describe('TypewriterSummary', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.clearAllMocks();
    });

    test('reveals text one character at a time', () => {
        render(<TypewriterSummary placeSummary="Dog" />);

        expect(screen.getByText(/✨/)).toBeInTheDocument();

        act(() => {
            vi.advanceTimersByTime(50);
        });
        expect(screen.getByText(/✨ D/)).toBeInTheDocument();

        act(() => {
            vi.advanceTimersByTime(50);
        });
        expect(screen.getByText(/✨ Do/)).toBeInTheDocument();

        act(() => {
            vi.advanceTimersByTime(50);
        });
        expect(screen.getByText(/✨ Dog/)).toBeInTheDocument();
    });
})