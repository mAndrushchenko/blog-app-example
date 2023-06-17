import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../constants';

const authContext = createContext({ user: null, isLogged: false, login: null, logout: null });

export const useAuthContext = () => useContext(authContext);

export const ProviderAuth = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const logout = () => {
    setIsLogged(false);
    setUser(null);

    localStorage.removeItem(auth.USER);
  };

  const login = (user) => {
    setIsLogged(true);
    setUser(user);

    localStorage.setItem(auth.USER, JSON.stringify(user));
  };

  useEffect(() => {
    const user = localStorage.getItem(auth.USER);

    if (user) {
      setIsLogged(true);
      setUser(JSON.parse(user));
    }

    setIsLoading(false)
  }, []);

  return (
    <authContext.Provider value={{ user, isLogged, login, logout }}>
      {!isLoading && children}
    </authContext.Provider>
  );
};
