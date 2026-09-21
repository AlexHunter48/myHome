import { useQuery } from "@tanstack/react-query";
import { getPropertyImages } from "../../services/apiProperties";

export default function useGetPropertyImages(propertyId) {
  const {
    data: images,
    isPending,
    error,
  } = useQuery({
    queryKey: ["property-images", propertyId],
    queryFn: () => getPropertyImages(propertyId),
    enabled: !!propertyId,
  });

  return {
    images,
    isPending,
    error,
  };
}
