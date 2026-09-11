import { useQuery } from "@tanstack/react-query";
import { checkSavedProperty } from "../../services/apiProperties";

export default function useCheckSavedProperty({ userId, propertyId }) {
  const {
    data: isSaved,
    isPending,
    error,
  } = useQuery({
    queryKey: ["isSaved", userId, propertyId],
    queryFn: () => checkSavedProperty({ userId, propertyId }),
    enabled: !!userId && !!propertyId,
  });

  return { isSaved, isPending, error };
}
