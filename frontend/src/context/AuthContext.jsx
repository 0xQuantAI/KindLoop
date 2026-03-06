import { createContext, useContext, useState, useEffect } from 'react';
import {
  volunteerLogin,
  volunteerRegister,
  getVolunteerMe,
  orgLogin,
  orgRegister,
  adminLogin,
} from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    const token = localStorage.getItem('token');
    const type = localStorage.getItem('userType');
    if (!token || !type) {
      setLoading(false);
      return;
    }
    try {
      if (type === 'volunteer') {
        const { data } = await getVolunteerMe();
        setUser(data.user);
        setUserType('volunteer');
      } else if (type === 'organization') {
        setUser(JSON.parse(localStorage.getItem('organization') || '{}'));
        setUserType('organization');
      } else if (type === 'admin') {
        setUser(JSON.parse(localStorage.getItem('admin') || '{}'));
        setUserType('admin');
      }
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const volunteerSignUp = async (data) => {
    const { data: res } = await volunteerRegister(data);
    localStorage.setItem('token', res.token);
    localStorage.setItem('userType', 'volunteer');
    setUser(res.user);
    setUserType('volunteer');
    return res;
  };

  const volunteerLogIn = async (email, password) => {
    const { data } = await volunteerLogin(email, password);
    localStorage.setItem('token', data.token);
    localStorage.setItem('userType', 'volunteer');
    setUser(data.user);
    setUserType('volunteer');
    return data;
  };

  const orgSignUp = async (data) => {
    const { data: res } = await orgRegister(data);
    localStorage.setItem('token', res.token);
    localStorage.setItem('userType', 'organization');
    localStorage.setItem('organization', JSON.stringify(res.organization));
    setUser(res.organization);
    setUserType('organization');
    return res;
  };

  const orgLogIn = async (email, password) => {
    const { data } = await orgLogin(email, password);
    localStorage.setItem('token', data.token);
    localStorage.setItem('userType', 'organization');
    localStorage.setItem('organization', JSON.stringify(data.organization));
    setUser(data.organization);
    setUserType('organization');
    return data;
  };

  const adminLogIn = async (email, password) => {
    const { data } = await adminLogin(email, password);
    localStorage.setItem('token', data.token);
    localStorage.setItem('userType', 'admin');
    localStorage.setItem('admin', JSON.stringify(data.admin));
    setUser(data.admin);
    setUserType('admin');
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('organization');
    localStorage.removeItem('admin');
    setUser(null);
    setUserType(null);
  };

  const value = {
    user,
    userType,
    loading,
    volunteerSignUp,
    volunteerLogIn,
    orgSignUp,
    orgLogIn,
    adminLogIn,
    logout,
    loadUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
