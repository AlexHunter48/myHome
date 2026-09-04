import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/apiProfile";

export default function useProfile(id) {
  const {
    data: profile,
    error,
    isPending,
  } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => getProfile(id),
    enabled: !!id,
  });

  return { profile, isPending, error };
}
