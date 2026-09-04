import { useQuery } from "@tanstack/react-query";
import { getPropertyById } from "../../services/apiProperties";

export default function useProperty(propertyId) {
  const {
    data: property,
    isPending,
    error,
  } = useQuery({
    queryKey: ["property", propertyId],
    queryFn: () => getPropertyById(propertyId),
  });

  return {
    property,
    isPending,
    error,
  };
}
