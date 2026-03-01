import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import FavoriteButton from './FavoriteButton';

// Mock the context hooks and API client
const mockShowToast = jest.fn();
let mockIsAuthenticated = false;

jest.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    isAuthenticated: mockIsAuthenticated,
  }),
}));

jest.mock('../context/ToastContext', () => ({
  useToast: () => ({
    showToast: mockShowToast,
  }),
}));

jest.mock('../api/apiClient', () => ({
  favoritesApi: {
    isFavorite: jest.fn(),
    toggle: jest.fn(),
  },
  userApi: {
    checkFavorite: jest.fn(),
    addFavorite: jest.fn(),
    removeFavoriteByTarget: jest.fn(),
  },
}));

const { favoritesApi, userApi } = require('../api/apiClient');

describe('FavoriteButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockIsAuthenticated = false;
    favoritesApi.isFavorite.mockReturnValue(false);
    userApi.checkFavorite.mockResolvedValue({ data: { isFavorite: false } });
    userApi.addFavorite.mockResolvedValue({ data: {} });
    userApi.removeFavoriteByTarget.mockResolvedValue({ data: {} });
  });

  // ========== Rendering tests ==========

  test('renders a button with heart icon', () => {
    render(<FavoriteButton type="restaurants" id={1} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button.querySelector('svg')).toBeInTheDocument();
  });

  test('renders with custom className', () => {
    render(<FavoriteButton type="restaurants" id={1} className="custom-class" />);

    const button = screen.getByRole('button');
    expect(button.className).toContain('custom-class');
    expect(button.className).toContain('favorite-btn');
  });

  // ========== Unauthenticated (localStorage) state tests ==========

  test('shows empty heart when not a favorite (unauthenticated)', async () => {
    favoritesApi.isFavorite.mockReturnValue(false);

    render(<FavoriteButton type="restaurants" id={1} />);

    const button = screen.getByRole('button');
    await waitFor(() => {
      expect(button).toHaveAttribute('aria-label', 'Ajouter aux favoris');
      expect(button).toHaveAttribute('title', 'Ajouter aux favoris');
    });
    expect(button.className).not.toContain('is-favorite');
  });

  test('shows filled heart when is a favorite (unauthenticated)', async () => {
    favoritesApi.isFavorite.mockReturnValue(true);

    render(<FavoriteButton type="restaurants" id={1} />);

    const button = screen.getByRole('button');
    await waitFor(() => {
      expect(button.className).toContain('is-favorite');
      expect(button).toHaveAttribute('aria-label', 'Retirer des favoris');
    });
  });

  test('toggles favorite on click (unauthenticated)', async () => {
    favoritesApi.isFavorite.mockReturnValue(false);

    render(<FavoriteButton type="restaurants" id={5} />);

    const button = screen.getByRole('button');

    await act(async () => {
      fireEvent.click(button);
    });

    expect(favoritesApi.toggle).toHaveBeenCalledWith('restaurants', 5);
    expect(mockShowToast).toHaveBeenCalledWith('Ajouté aux favoris', 'success');
  });

  test('removes favorite on click when already favorited (unauthenticated)', async () => {
    favoritesApi.isFavorite.mockReturnValue(true);

    render(<FavoriteButton type="hotels" id={3} />);

    const button = screen.getByRole('button');

    // Wait for initial state to settle
    await waitFor(() => {
      expect(button.className).toContain('is-favorite');
    });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(favoritesApi.toggle).toHaveBeenCalledWith('hotels', 3);
    expect(mockShowToast).toHaveBeenCalledWith('Retiré des favoris', 'info');
  });

  // ========== Authenticated (API) state tests ==========

  test('checks favorite status via API when authenticated', async () => {
    mockIsAuthenticated = true;
    userApi.checkFavorite.mockResolvedValue({ data: { isFavorite: true } });

    render(<FavoriteButton type="restaurants" id={10} />);

    await waitFor(() => {
      expect(userApi.checkFavorite).toHaveBeenCalledWith('RESTAURANT', 10);
    });

    const button = screen.getByRole('button');
    await waitFor(() => {
      expect(button.className).toContain('is-favorite');
    });
  });

  test('adds favorite via API on click when authenticated and not favorited', async () => {
    mockIsAuthenticated = true;
    userApi.checkFavorite.mockResolvedValue({ data: { isFavorite: false } });

    render(<FavoriteButton type="restaurants" id={10} />);

    await waitFor(() => {
      expect(userApi.checkFavorite).toHaveBeenCalled();
    });

    const button = screen.getByRole('button');

    await act(async () => {
      fireEvent.click(button);
    });

    expect(userApi.addFavorite).toHaveBeenCalledWith({ type: 'RESTAURANT', targetId: 10 });
    expect(mockShowToast).toHaveBeenCalledWith('Ajouté aux favoris', 'success');
  });

  test('removes favorite via API on click when authenticated and favorited', async () => {
    mockIsAuthenticated = true;
    userApi.checkFavorite.mockResolvedValue({ data: { isFavorite: true } });

    render(<FavoriteButton type="hotels" id={20} />);

    const button = screen.getByRole('button');

    await waitFor(() => {
      expect(button.className).toContain('is-favorite');
    });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(userApi.removeFavoriteByTarget).toHaveBeenCalledWith('HOTEL', 20);
    expect(mockShowToast).toHaveBeenCalledWith('Retiré des favoris', 'info');
  });

  // ========== Event propagation tests ==========

  test('click stops propagation and prevents default', async () => {
    render(<FavoriteButton type="restaurants" id={1} />);

    const button = screen.getByRole('button');

    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
    Object.defineProperty(clickEvent, 'preventDefault', { value: jest.fn() });
    Object.defineProperty(clickEvent, 'stopPropagation', { value: jest.fn() });

    await act(async () => {
      button.dispatchEvent(clickEvent);
    });

    expect(clickEvent.preventDefault).toHaveBeenCalled();
    expect(clickEvent.stopPropagation).toHaveBeenCalled();
  });

  // ========== Error handling tests ==========

  test('shows error toast when API call fails (authenticated)', async () => {
    mockIsAuthenticated = true;
    userApi.checkFavorite.mockResolvedValue({ data: { isFavorite: false } });
    userApi.addFavorite.mockRejectedValue(new Error('Network error'));

    render(<FavoriteButton type="restaurants" id={10} />);

    await waitFor(() => {
      expect(userApi.checkFavorite).toHaveBeenCalled();
    });

    const button = screen.getByRole('button');

    await act(async () => {
      fireEvent.click(button);
    });

    expect(mockShowToast).toHaveBeenCalledWith('Erreur lors de la mise à jour', 'error');
  });

  // ========== Type mapping tests ==========

  test('maps restaurants type to RESTAURANT backend enum', async () => {
    mockIsAuthenticated = true;
    userApi.checkFavorite.mockResolvedValue({ data: { isFavorite: false } });

    render(<FavoriteButton type="restaurants" id={1} />);

    await waitFor(() => {
      expect(userApi.checkFavorite).toHaveBeenCalledWith('RESTAURANT', 1);
    });
  });

  test('maps hotels type to HOTEL backend enum', async () => {
    mockIsAuthenticated = true;
    userApi.checkFavorite.mockResolvedValue({ data: { isFavorite: false } });

    render(<FavoriteButton type="hotels" id={2} />);

    await waitFor(() => {
      expect(userApi.checkFavorite).toHaveBeenCalledWith('HOTEL', 2);
    });
  });
});
