import { useMutation } from "@tanstack/react-query";
import { recordPropertyView } from "../services/apiProperties";

export default function useRecordPropertyViews() {
  const {
    mutate: recordView,
    isPending,
    error,
  } = useMutation({
    mutationFn: recordPropertyView,
  });

  return {
    recordView,
    isPending,
    error,
  };
}
