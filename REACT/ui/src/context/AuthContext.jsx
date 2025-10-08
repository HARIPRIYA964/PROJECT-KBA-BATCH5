import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null); // store role: "user" | "admin"
  // login
  const login = useCallback(async (email, password) => {
    const res = await fetch("/api/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email,password: password })
    });

    if (!res.ok) throw new Error("Invalid credentials");

    const data = await res.json();
    setIsAuthenticated(true);
    setUserType(data.userType); // backend must return { userType: "user" | "admin" }
  }, []);

  // logout
  const logout = useCallback(async () => {
    await fetch("/api/logout", { method: "POST", credentials: "include" });
    setIsAuthenticated(false);
    setUserType(null);
  }, []);

  const value = useMemo(() => ({
    isAuthenticated,
    userType,
    login,
    logout,
  }), [isAuthenticated, userType, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
