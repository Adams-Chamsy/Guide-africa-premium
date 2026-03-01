// ===== API & Network =====
export const API_BASE_URL = process.env.REACT_APP_API_URL || '/api/v1';
export const DEBOUNCE_MS = 300;
export const POLL_INTERVAL_MS = 60000; // 60 seconds for notifications polling

// ===== Pagination =====
export const DEFAULT_PAGE_SIZE = 12;
export const ADMIN_PAGE_SIZE = 20;

// ===== Upload =====
export const MAX_FILE_SIZE_MB = 5;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

// ===== Ratings =====
export const MAX_RATING = 5;
export const MIN_RATING = 1;

// ===== Map =====
export const DEFAULT_MAP_CENTER = [2.0, 20.0]; // Center of Africa
export const DEFAULT_MAP_ZOOM = 4;

// ===== Auth =====
export const TOKEN_KEY = 'guideafrica_token';
export const LANGUAGE_KEY = 'guideafrica_language';

// ===== UI =====
export const TOAST_DURATION_MS = 3000;
export const SEARCH_MIN_CHARS = 2;
