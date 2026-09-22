import { Eye, MessageCircleCheck } from "lucide-react";
import useGetPropertyEnquiries from "../listings/useGetPropertyEnquiries";

export default function PropertyStats({ property }) {
  const { enquiries, isPending } = useGetPropertyEnquiries({
    propertyId: property?.id,
  });
  return (
    <div className="flex items-center gap-5 text-[var(--color-text-secondary)]">
      <span className="flex items-center gap-1.5 whitespace-nowrap">
        <Eye size={16} strokeWidth={1.8} />
        <span className="text-sm">{property.views}</span>
      </span>

      <span className="flex items-center gap-1.5 whitespace-nowrap">
        <MessageCircleCheck size={16} strokeWidth={1.8} />
        <span className="text-sm">{isPending ? "..." : enquiries}</span>
      </span>
    </div>
  );
}
