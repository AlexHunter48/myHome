import { useQuery } from "@tanstack/react-query";
import { getMyProperties } from "../../services/apiProperties";
import toast from "react-hot-toast";

export default function useGetMyProperties({ id, page, pageSize }) {
  const { data, isPending, error } = useQuery({
    queryKey: ["my-properties", id, page, pageSize],
    queryFn: () => getMyProperties({ id, page, pageSize }),
    enabled: !!id,
    onError: (error) => {
      console.log(error);
      toast.error("Could not get your properties. Please try again");
    },
  });

  const properties = data?.properties;
  const count = data?.count;

  return {
    properties,
    count,
    isPending,
    error,
  };
}
