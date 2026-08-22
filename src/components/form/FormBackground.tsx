import Image from "next/image";

import { site } from "@/config/site";
import { asset } from "@/lib/asset";

const OVERSCAN_LG = "119%";

export function FormBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div
        className="absolute inset-y-0 left-0 w-full lg:w-[var(--overscan)]"
        style={{ ["--overscan" as string]: OVERSCAN_LG }}
      >
        <Image
          src={asset(site.evaluationPhoto)}
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 119vw, 100vw"
          className="object-cover object-[42%_14%] sm:object-[44%_18%] lg:object-[50%_22%]"
        />
      </div>

      <div className="absolute inset-0 bg-nude-500 mix-blend-multiply" />

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(36,31,26,0.20)_0%,rgba(36,31,26,0.52)_45%,rgba(36,31,26,0.86)_100%)]" />

      <div className="absolute inset-0 hidden lg:block bg-[radial-gradient(120%_100%_at_50%_35%,transparent_45%,rgba(36,31,26,0.55)_100%)]" />
    </div>
  );
}
