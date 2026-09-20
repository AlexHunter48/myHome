import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../services/supabase";
import useProfile from "../profiles/useProfile";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { profile: fetchedProfile, isPending: isProfileLoading } = useProfile(
    user?.id,
  );

  useEffect(() => {
    async function getCurrentUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
      setLoading(false);
    }

    getCurrentUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const isAuthenticated = !!user;
  const isOwner = fetchedProfile?.role === "owner";

  const isAuthLoading = loading || (isAuthenticated && isProfileLoading);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile: fetchedProfile,
        isAuthenticated,
        loading: isAuthLoading,
        isOwner,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("Context was used outside of Provider");

  return context;
}
