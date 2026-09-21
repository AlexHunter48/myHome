import { useQuery } from "@tanstack/react-query";
import { getProperty } from "../../services/apiProperties";

export default function useGetProperty(id) {
  const {
    data: property,
    isPending,
    error,
  } = useQuery({
    queryKey: ["property", id],
    queryFn: () => getProperty(id),
    enabled: !!id,
  });

  return {
    property,
    isPending,
    error,
  };
}
