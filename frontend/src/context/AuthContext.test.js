import React from 'react';
import { render, act, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';

// Mock apiClient
jest.mock('../api/apiClient', () => ({
  authApi: {
    login: jest.fn(),
    register: jest.fn(),
    me: jest.fn(),
  },
  userApi: {
    syncFavorites: jest.fn(),
  },
}));

const { authApi, userApi } = require('../api/apiClient');

// Test component that exposes auth context values
const TestComponent = ({ onAuth }) => {
  const auth = useAuth();
  React.useEffect(() => {
    onAuth(auth);
  });
  return null;
};

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    authApi.me.mockRejectedValue(new Error('No token'));
    userApi.syncFavorites.mockResolvedValue({ data: [] });
  });

  test('starts with unauthenticated state when no token exists', async () => {
    let authState;
    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent onAuth={(auth) => { authState = auth; }} />
        </AuthProvider>
      );
    });

    await waitFor(() => {
      expect(authState.isAuthenticated).toBe(false);
      expect(authState.user).toBeNull();
      expect(authState.loading).toBe(false);
    });
  });

  test('login stores token and sets user state', async () => {
    authApi.login.mockResolvedValue({
      data: {
        token: 'test-jwt-token',
        id: 1,
        prenom: 'Aminata',
        nom: 'Diallo',
        email: 'aminata@example.com',
        role: 'USER',
        avatar: 'https://ui-avatars.com/api/?name=Aminata+Diallo',
      },
    });

    let authState;
    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent onAuth={(auth) => { authState = auth; }} />
        </AuthProvider>
      );
    });

    // Wait for initial loading to complete
    await waitFor(() => expect(authState.loading).toBe(false));

    await act(async () => {
      await authState.login('aminata@example.com', 'password123');
    });

    expect(authApi.login).toHaveBeenCalledWith({
      email: 'aminata@example.com',
      motDePasse: 'password123',
    });
    expect(localStorage.getItem('guideafrica_token')).toBe('test-jwt-token');
    expect(authState.isAuthenticated).toBe(true);
    expect(authState.user.prenom).toBe('Aminata');
    expect(authState.user.nom).toBe('Diallo');
    expect(authState.user.email).toBe('aminata@example.com');
    expect(authState.user.role).toBe('USER');
  });

  test('login syncs local favorites after successful authentication', async () => {
    // Set up local favorites in localStorage
    localStorage.setItem('guideafrica_favorites', JSON.stringify({
      restaurants: [1, 2],
      hotels: [3],
    }));

    authApi.login.mockResolvedValue({
      data: {
        token: 'test-token',
        id: 1,
        prenom: 'Aminata',
        nom: 'Diallo',
        email: 'aminata@example.com',
        role: 'USER',
        avatar: null,
      },
    });

    let authState;
    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent onAuth={(auth) => { authState = auth; }} />
        </AuthProvider>
      );
    });

    await waitFor(() => expect(authState.loading).toBe(false));

    await act(async () => {
      await authState.login('aminata@example.com', 'password123');
    });

    expect(userApi.syncFavorites).toHaveBeenCalledWith([
      { type: 'RESTAURANT', targetId: 1 },
      { type: 'RESTAURANT', targetId: 2 },
      { type: 'HOTEL', targetId: 3 },
    ]);
    // Local favorites should be cleared after sync
    expect(localStorage.getItem('guideafrica_favorites')).toBeNull();
  });

  test('register stores token and sets user state', async () => {
    authApi.register.mockResolvedValue({
      data: {
        token: 'register-token',
        id: 2,
        prenom: 'Fatou',
        nom: 'Sow',
        email: 'fatou@example.com',
        role: 'USER',
        avatar: 'https://ui-avatars.com/api/?name=Fatou+Sow',
      },
    });

    let authState;
    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent onAuth={(auth) => { authState = auth; }} />
        </AuthProvider>
      );
    });

    await waitFor(() => expect(authState.loading).toBe(false));

    const inscriptionData = {
      prenom: 'Fatou',
      nom: 'Sow',
      email: 'fatou@example.com',
      motDePasse: 'password123',
    };

    await act(async () => {
      await authState.register(inscriptionData);
    });

    expect(authApi.register).toHaveBeenCalledWith(inscriptionData);
    expect(localStorage.getItem('guideafrica_token')).toBe('register-token');
    expect(authState.isAuthenticated).toBe(true);
    expect(authState.user.prenom).toBe('Fatou');
    expect(authState.user.email).toBe('fatou@example.com');
  });

  test('logout clears token and resets user state', async () => {
    localStorage.setItem('guideafrica_token', 'existing-token');
    authApi.me.mockResolvedValue({
      data: {
        id: 1,
        prenom: 'Aminata',
        nom: 'Diallo',
        email: 'aminata@example.com',
        role: 'USER',
        avatar: null,
      },
    });

    let authState;
    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent onAuth={(auth) => { authState = auth; }} />
        </AuthProvider>
      );
    });

    await waitFor(() => {
      expect(authState.isAuthenticated).toBe(true);
      expect(authState.loading).toBe(false);
    });

    act(() => {
      authState.logout();
    });

    expect(localStorage.getItem('guideafrica_token')).toBeNull();
    expect(authState.isAuthenticated).toBe(false);
    expect(authState.user).toBeNull();
  });

  test('restores user from token on mount', async () => {
    localStorage.setItem('guideafrica_token', 'existing-valid-token');
    authApi.me.mockResolvedValue({
      data: {
        id: 1,
        prenom: 'Aminata',
        nom: 'Diallo',
        email: 'aminata@example.com',
        role: 'USER',
        avatar: 'https://ui-avatars.com/api/?name=Aminata+Diallo',
      },
    });

    let authState;
    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent onAuth={(auth) => { authState = auth; }} />
        </AuthProvider>
      );
    });

    await waitFor(() => {
      expect(authState.isAuthenticated).toBe(true);
      expect(authState.user.prenom).toBe('Aminata');
      expect(authState.loading).toBe(false);
    });

    expect(authApi.me).toHaveBeenCalled();
  });

  test('clears invalid token on mount when me() fails', async () => {
    localStorage.setItem('guideafrica_token', 'invalid-token');
    authApi.me.mockRejectedValue(new Error('Unauthorized'));

    let authState;
    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent onAuth={(auth) => { authState = auth; }} />
        </AuthProvider>
      );
    });

    await waitFor(() => {
      expect(authState.isAuthenticated).toBe(false);
      expect(authState.loading).toBe(false);
    });

    expect(localStorage.getItem('guideafrica_token')).toBeNull();
  });

  test('useAuth throws error when used outside AuthProvider', () => {
    const ConsumerOutsideProvider = () => {
      useAuth();
      return null;
    };

    expect(() => {
      render(<ConsumerOutsideProvider />);
    }).toThrow('useAuth doit être utilisé dans un AuthProvider');
  });
});
