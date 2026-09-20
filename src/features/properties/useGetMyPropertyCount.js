import { useQuery } from "@tanstack/react-query";
import { getMyPropertyCounts } from "../../services/apiProperties";

export default function useGetMyPropertyCounts({ id }) {
  const { data, isPending, error } = useQuery({
    queryKey: ["my-property-counts", id],
    queryFn: () => getMyPropertyCounts({ id }),
    enabled: !!id,
  });

  return {
    publishedCount: data?.publishedCount,
    draftCount: data?.draftCount,
    totalCount: data?.totalCount,
    isPending,
    error,
  };
}
