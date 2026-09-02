import { useQuery } from "@tanstack/react-query";
import { getProperties } from "../../services/apiProperties";

export default function useProperties() {
  const {
    data: properties,
    isPending,
    error,
  } = useQuery({
    queryKey: ["properties"],
    queryFn: getProperties,
  });

  return { properties, isPending, error };
}
