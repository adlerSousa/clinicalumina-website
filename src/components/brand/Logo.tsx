import Image from "next/image";

import { site } from "@/config/site";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";

const base = "h-auto max-w-full";

export function LogoLockup({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={asset(site.brand.logoLockup)}
      alt={`${site.name} — ${site.tagline}`}
      width={1000}
      height={637}
      priority={priority}
      className={cn(base, className)}
    />
  );
}

export function LogoIcon({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={asset(site.brand.icon)}
      alt={site.name}
      width={256}
      height={263}
      priority={priority}
      className={cn(base, className)}
    />
  );
}
