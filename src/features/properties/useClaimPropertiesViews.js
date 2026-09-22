import { useMutation } from "@tanstack/react-query";
import { claimVisitorPropertyViews } from "../../services/apiProperties";

export default function useClaimVisitorPropertyViews() {
  const {
    mutateAsync: claimViews,
    isPending,
    error,
  } = useMutation({
    mutationFn: claimVisitorPropertyViews,
  });

  return {
    claimViews,
    isPending,
    error,
  };
}
