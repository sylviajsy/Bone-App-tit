import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
import PlacesMap from './PlacesMap';

// mock react-leaflet
vi.mock('react-leaflet', () => ({
  MapContainer: ({ children }) => <div data-testid="map">{children}</div>,
  TileLayer: () => <div data-testid="tile-layer" />,
  Marker: ({ children }) => <div data-testid="marker">{children}</div>,
  Popup: ({ children }) => <div data-testid="popup">{children}</div>,
  useMap: () => ({
    flyTo: vi.fn(),
  }),
}));

// mock PostCard so we control what gets rendered/clicked
vi.mock('./PostCard', () => ({
  default: ({ post, onClick }) => (
    <button onClick={onClick}>Open Post {post.id}: {post.title}</button>
  ),
}));

// mock TypewriterSummary
vi.mock('./TypewriterSummary', () => ({
  TypewriterSummary: ({ placeSummary }) => <div>{placeSummary}</div>,
}));

describe('PlacesMap', () => {
  test('shows only the posts for each place and calls handleOpenPost with the right id', async () => {
    const user = userEvent.setup();

    const handleOpenPost = vi.fn();
    const fetchAiSummary = vi.fn();

    const places = [
      {
        id: 1,
        name: 'Austin Cafe',
        category: 'Cafe',
        address: '123 Main St',
        latitude: '30.2672',
        longitude: '-97.7431',
      },
      {
        id: 2,
        name: 'Dallas Park',
        category: 'Park',
        address: '456 Elm St',
        latitude: '32.7767',
        longitude: '-96.7970',
      },
    ];

    const posts = [
      { id: 101, place_id: 1, title: 'Great coffee' },
      { id: 102, place_id: 1, title: 'Nice vibe' },
      { id: 201, place_id: 2, title: 'Good for dogs' },
    ];

    render(
      <PlacesMap
        places={places}
        posts={posts}
        handleOpenPost={handleOpenPost}
        fetchAiSummary={fetchAiSummary}
        aiSummary={{}}
        isAiLoading={null}
        userLocation={[30.2672, -97.7431]}
      />
    );

    // place names render
    expect(screen.getByText('Austin Cafe')).toBeInTheDocument();
    expect(screen.getByText('Dallas Park')).toBeInTheDocument();

    // correct posts render
    expect(screen.getByText('Open Post 101: Great coffee')).toBeInTheDocument();
    expect(screen.getByText('Open Post 102: Nice vibe')).toBeInTheDocument();
    expect(screen.getByText('Open Post 201: Good for dogs')).toBeInTheDocument();

    // click one specific post
    await user.click(screen.getByText('Open Post 101: Great coffee'));

    expect(handleOpenPost).toHaveBeenCalledTimes(1);
    expect(handleOpenPost).toHaveBeenCalledWith(101);
  });
});