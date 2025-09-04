import { Badge } from "@/components/ui/badge";

type InstituteType = "university" | "college" | "school" | "academy";
type status = 'active' | 'inactive'

const typeColors: Record<InstituteType, string> = {
  university: "bg-purple-100 text-purple-800",
  college: "bg-blue-100 text-blue-800",
  school: "bg-green-100 text-green-800",
  academy: "bg-yellow-100 text-yellow-800",
};

const statusColors: Record<status, string> = {
  active: "bg-green-500 text-white",
  inactive: "bg-yellow-500 text-white",
};

export function StatusBadge({ status }: { status: status }) {
  return (
    <Badge className={`${statusColors[status]} lowercase text-xs`}>
      {status}
    </Badge>
  );
}

export function InstituteTypeBadge({ type }: { type: InstituteType }) {
  return (
    <Badge className={`${typeColors[type]} capitalize text-xs`}>
      {type}
    </Badge>
  );
}
