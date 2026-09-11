import { useQuery } from "@tanstack/react-query";
import { getProperties } from "../../services/apiProperties";

export default function useProperties(filters) {
  const {
    data: properties,
    isPending,
    error,
  } = useQuery({
    queryKey: ["properties", filters],
    queryFn: () => getProperties(filters),
  });

  return { properties, isPending, error };
}
