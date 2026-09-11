import { useQuery } from "@tanstack/react-query";
import { getSavedProperties as getSavedPropertiesApi } from "../../services/apiProperties";

export default function useGetSavedProperties({ userId }) {
  const {
    data: properties,
    isPending,
    error,
  } = useQuery({
    queryKey: ["savedProperties", userId],
    queryFn: () => getSavedPropertiesApi({ userId }),
    enabled: !!userId,
  });

  return { properties, isPending, error };
}
