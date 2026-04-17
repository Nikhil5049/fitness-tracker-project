export const API_BASE = 'http://localhost:8080';

export const getToken = () => localStorage.getItem('fp_token');

export const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem('fp_user'));
  } catch {
    return null;
  }
};

export const saveSession = (token, user) => {
  localStorage.setItem('fp_token', token);
  localStorage.setItem('fp_user', JSON.stringify(user));
};

export const clearSession = () => {
  localStorage.removeItem('fp_token');
  localStorage.removeItem('fp_user');
};

export const authFetch = (url, opts = {}) => {
  const token = getToken();
  return fetch(`${API_BASE}${url}`, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
      ...(opts.headers || {}),
    },
  });
};
