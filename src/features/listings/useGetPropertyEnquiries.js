import { useQuery } from "@tanstack/react-query";
import { getPropertyEnquiries } from "../../services/apiProperties";

export default function useGetPropertyEnquiries({ propertyId }) {
  const {
    data: enquiries,
    error,
    isPending,
  } = useQuery({
    queryKey: ["total-enquiries", propertyId],
    queryFn: () => getPropertyEnquiries({ propertyId }),
  });

  return { enquiries, isPending, error };
}
