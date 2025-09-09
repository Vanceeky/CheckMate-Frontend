import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarFallProps {
  src?: string;
  alt?: string;
  institutionName?: string;
}

export function AvatarFall({ src, alt, institutionName }: AvatarFallProps) {
  const initials = institutionName
    ? institutionName.slice(0, 2).toUpperCase()
    : "CM";

  return (
    <Avatar>
      <AvatarImage src={src} alt={alt ?? initials} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}
