import { useMutation } from "@tanstack/react-query";
import { publishProperty } from "../../services/apiProperties";

export default function usePublishProperty() {
  const { mutate: publish, isPending } = useMutation({
    mutationFn: publishProperty,
  });

  return { publish, isPending };
}
