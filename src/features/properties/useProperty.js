import { useQuery } from "@tanstack/react-query";
import { getPropertyById } from "../../services/apiProperties";

export default function useProperty(propertyId, enabled = true) {
  const {
    data: property,
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ["property", propertyId],
    queryFn: () => getPropertyById(propertyId),
    enabled,
  });

  return { property, isPending, error, refetch };
}
