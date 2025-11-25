import { mockUsers } from '../data/mockData';

// Simulate async delay
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Get all users from localStorage or use default mock data
const getStoredUsers = () => {
  const stored = localStorage.getItem('users');
  return stored ? JSON.parse(stored) : [...mockUsers];
};

// Save users to localStorage
const saveUsers = (users) => {
  localStorage.setItem('users', JSON.stringify(users));
};

export const authService = {
  register: async (userData) => {
    await delay();
    const users = getStoredUsers();

    // Check if email already exists
    if (users.find(u => u.email === userData.email)) {
      throw new Error('Email already exists');
    }

    const newUser = {
      id: Math.max(...users.map(u => u.id), 0) + 1,
      name: userData.name,
      email: userData.email,
      role: 'user',
      created_at: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);

    // Set as current user
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    localStorage.setItem('isAuthenticated', 'true');

    return { user: newUser, token: 'mock-token-' + newUser.id };
  },

  login: async (credentials) => {
    await delay();
    const users = getStoredUsers();

    // Find user by email
    const user = users.find(u => u.email === credentials.email);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    // In mock mode, any password works for demo purposes
    // Set as current user
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('isAuthenticated', 'true');

    return { user, token: 'mock-token-' + user.id };
  },

  logout: () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAuthenticated');
  },

  getCurrentUser: async () => {
    await delay();
    const currentUser = localStorage.getItem('currentUser');

    if (!currentUser) {
      throw new Error('Not authenticated');
    }

    return JSON.parse(currentUser);
  },
};
