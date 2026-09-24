import { useQuery } from "@tanstack/react-query";
import { getOwnerDetails } from "../../services/apiProperties";

export default function useGetOwnerDetails({ conversationId }) {
  const {
    data: ownerDetails,
    isPending,
    error,
  } = useQuery({
    queryKey: ["owner-details", conversationId],
    queryFn: () => getOwnerDetails({ conversationId }),
    enabled: !!conversationId,
  });

  return { ownerDetails, isPending, error };
}
