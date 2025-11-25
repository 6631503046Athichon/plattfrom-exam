import { mockUsers } from '../data/mockData';

const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

const getStoredUsers = () => {
  const stored = localStorage.getItem('users');
  let users = stored ? JSON.parse(stored) : [...mockUsers];
  
  const adminUser = mockUsers.find(u => u.role === 'admin');
  if (adminUser) {
    const existingAdminIndex = users.findIndex(u => u.role === 'admin');
    
    if (existingAdminIndex !== -1) {
      users[existingAdminIndex] = { ...users[existingAdminIndex], ...adminUser };
    } else {
      users.push(adminUser);
    }
    
    saveUsers(users);
  }
  
  return users;
};

const saveUsers = (users) => {
  localStorage.setItem('users', JSON.stringify(users));
};

export const authService = {
  register: async (userData) => {
    await delay();
    const users = getStoredUsers();

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

    localStorage.setItem('currentUser', JSON.stringify(newUser));
    localStorage.setItem('isAuthenticated', 'true');

    return { user: newUser, token: 'mock-token-' + newUser.id };
  },

  login: async (credentials) => {
    await delay();
    const users = getStoredUsers();

    const user = users.find(u => u.email === credentials.email);

    if (!user) {
      throw new Error('Invalid email or password');
    }

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
