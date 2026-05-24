import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import {
  getMeRequest,
  loginRequest,
  registerRequest
} from "../services/authService.js";
import { clearToken, getToken, setToken } from "../utils/storage.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setAuthToken] = useState(() => getToken());
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(Boolean(getToken()));

  const persistSession = useCallback((session) => {
    setToken(session.token);
    setAuthToken(session.token);
    setUser(session.user);
  }, []);

  const login = useCallback(
    async (payload) => {
      const session = await loginRequest(payload);
      persistSession(session);
      return session;
    },
    [persistSession]
  );

  const register = useCallback(
    async (payload) => {
      const session = await registerRequest(payload);
      persistSession(session);
      return session;
    },
    [persistSession]
  );

  const logout = useCallback(() => {
    clearToken();
    setAuthToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    const hydrateUser = async () => {
      if (!token) {
        setInitializing(false);
        return;
      }

      try {
        const data = await getMeRequest();
        setUser(data.user);
      } catch {
        logout();
      } finally {
        setInitializing(false);
      }
    };

    hydrateUser();
  }, [logout, token]);

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(token),
      initializing,
      login,
      logout,
      register,
      token,
      user
    }),
    [initializing, login, logout, register, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
