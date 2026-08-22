import Image from "next/image";
import Link from "next/link";

import { site } from "@/config/site";
import { asset } from "@/lib/asset";

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 py-16 text-center">
      <Image
        src={asset(site.brand.logoLockupDark)}
        alt={`${site.name} — ${site.tagline}`}
        width={1000}
        height={637}
        priority
        className="h-auto w-[12rem] sm:w-[15rem]"
      />

      <span aria-hidden className="rule-gold mx-auto mt-10" />

      <p className="mt-8 max-w-md text-pretty leading-relaxed text-nude-700">
        Site em construção. A avaliação personalizada com {site.doctor.name} já
        está disponível.
      </p>

      <Link
        href="/avaliacao"
        className="rounded-control mt-9 inline-flex min-h-12 items-center justify-center bg-[image:var(--gradient-gold)] px-9 py-4 text-[0.75rem] font-medium uppercase tracking-[0.18em] text-nude-900 transition-all duration-300 ease-[var(--ease-luxe)] hover:brightness-108"
      >
        Fazer minha avaliação
      </Link>
    </main>
  );
}
