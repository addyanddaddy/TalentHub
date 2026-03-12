import Image from "next/image";
import { cn, getInitials } from "@/lib/utils";

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-16 w-16 text-lg",
  xl: "h-24 w-24 text-2xl",
};

interface AvatarProps {
  src?: string | null;
  name: string;
  size?: keyof typeof sizeClasses;
  className?: string;
}

export function Avatar({ src, name, size = "md", className }: AvatarProps) {
  const initials = getInitials(name);

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center rounded-full overflow-hidden ring-1 ring-white/[0.08] hover:ring-2 hover:ring-bronze/30 transition-all duration-200",
        src ? "bg-navy-800" : "bg-bronze/20 text-bronze font-medium",
        sizeClasses[size],
        className
      )}
    >
      {src ? (
        <Image src={src} alt={name} fill className="object-cover" />
      ) : (
        <span className="select-none">{initials}</span>
      )}
    </div>
  );
}

export function AvatarStack({ users, max = 4 }: { users: Array<{ name: string; src?: string | null }>; max?: number }) {
  const visible = users.slice(0, max);
  const remaining = users.length - max;

  return (
    <div className="flex -space-x-2">
      {visible.map((user, i) => (
        <Avatar key={i} src={user.src} name={user.name} size="sm" className="ring-1 ring-navy-900" />
      ))}
      {remaining > 0 && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-bronze/20 text-xs font-medium text-bronze ring-1 ring-navy-900">
          +{remaining}
        </div>
      )}
    </div>
  );
}
