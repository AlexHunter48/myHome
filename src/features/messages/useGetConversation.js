import { useQuery } from "@tanstack/react-query";
import { getConversation } from "../../services/apiMessages";

export default function useGetConversation({ propertyId, buyerId, ownerId }) {
  const {
    data: conversation,
    isPending,
    error,
  } = useQuery({
    queryKey: ["conversation", propertyId, buyerId, ownerId],
    queryFn: () =>
      getConversation({
        propertyId,
        buyerId,
        ownerId,
      }),
    enabled: !!propertyId && !!buyerId && !!ownerId,
  });

  return {
    conversation,
    isPending,
    error,
  };
}
