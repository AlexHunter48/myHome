import { useQuery } from "@tanstack/react-query";
import { getOwnerDetailsById } from "../../services/apiProperties";

export default function useGetOwnerDetailsById({ ownerId }) {
  const {
    data: ownerDetails,
    isPending,
    error,
  } = useQuery({
    queryKey: ["owner-details", ownerId],
    queryFn: () => getOwnerDetailsById({ ownerId }),
    enabled: !!ownerId,
  });

  return { ownerDetails, isPending, error };
}
