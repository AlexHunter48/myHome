import { useQuery } from "@tanstack/react-query";
import { getTotalViewCount } from "../../services/apiProperties";

export default function useGetTotalViewCount() {
  const {
    data: totalViews,
    isPending,
    error,
  } = useQuery({
    queryKey: ["total-view-count"],
    queryFn: getTotalViewCount,
  });

  return { totalViews, isPending, error };
}
