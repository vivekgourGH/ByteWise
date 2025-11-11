// Local stub for profileAPI to allow frontend to run without backend.
// This file intentionally avoids network calls and reads/writes from localStorage.

class ProfileAPIStub {
  warn() {
    console.warn('profileAPI stub in use. No backend calls will be made.');
  }

  async getUsers() {
    this.warn();
    const raw = localStorage.getItem('localUsers');
    if (!raw) return [];
    try { return JSON.parse(raw); } catch { return []; }
  }

  async findUserByEmail(email) {
    const users = await this.getUsers();
    return users.find(u => u.email.toLowerCase() === (email || '').toLowerCase());
  }

  // Minimal API shape used in the app; others can be added as needed.
  async post(endpoint, data) {
    this.warn();
    // Implement a few expected endpoints for compatibility
    if (endpoint.includes('/login')) {
      const user = await this.findUserByEmail(data.email);
      if (!user) return { success: false, message: 'User not found' };
      return { success: true, ...user };
    }
    return { success: false, message: 'Not implemented in stub' };
  }

  async get(endpoint) {
    this.warn();
    return { success: false, message: 'Not implemented in stub' };
  }
}

export const profileAPI = new ProfileAPIStub();
