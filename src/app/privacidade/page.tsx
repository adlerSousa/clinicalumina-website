import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { site } from "@/config/site";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: `Como a ${site.name} coleta, usa e protege os dados pessoais informados no site.`,
};

const ATUALIZADO_EM = "2 de setembro de 2026";

function Secao({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12 first:mt-0">
      <h2 className="font-display text-[1.625rem] leading-tight text-nude-900">
        {titulo}
      </h2>
      <span aria-hidden className="mt-3 block h-px w-10 bg-gold-400" />
      <div className="mt-5 space-y-4 text-[0.9375rem] leading-[1.75] text-nude-700">
        {children}
      </div>
    </section>
  );
}

function Lista({ itens }: { itens: string[] }) {
  return (
    <ul className="space-y-2.5">
      {itens.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-gold-400" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Realce({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const externo = href.startsWith("http");
  return (
    <a
      href={href}
      {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="text-gold-700 underline decoration-gold-400 underline-offset-4 transition-colors hover:text-gold-600"
    >
      {children}
    </a>
  );
}

export default function PrivacidadePage() {
  return (
    <main className="min-h-dvh bg-nude-300 px-4 py-8 sm:px-6 sm:py-14">
      <article className="mx-auto w-full max-w-[46rem] bg-white px-6 py-12 shadow-[0_24px_60px_rgba(36,31,26,0.14)] sm:px-14 sm:py-16">
        <header className="text-center">
          <Link href="/" className="inline-block">
            <Image
              src={asset(site.brand.logoLockupDark)}
              alt={`${site.name} · ${site.tagline}`}
              width={1000}
              height={637}
              priority
              className="mx-auto h-auto w-[11rem] sm:w-[14rem]"
            />
          </Link>

          <span aria-hidden className="rule-gold mx-auto mt-10" />

          <h1 className="font-display mt-8 text-[clamp(2rem,1.5rem+2vw,2.75rem)] leading-tight text-nude-900">
            Política de Privacidade
          </h1>

          <p className="overline mt-4 text-nude-500">
            Atualizada em {ATUALIZADO_EM}
          </p>
        </header>

        <div className="mt-14 border-t border-nude-300 pt-14">
          <Secao titulo="Quem é responsável pelos seus dados">
            <p>
              A {site.name} é a controladora dos dados pessoais informados neste
              site, nos termos da Lei Geral de Proteção de Dados (Lei
              13.709/2018).
            </p>
            <p>
              Para qualquer assunto relacionado aos seus dados, entre em contato
              pelo e-mail{" "}
              <Realce href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </Realce>
              .
            </p>
          </Secao>

          <Secao titulo="Quais dados coletamos">
            <p>
              No formulário de avaliação, coletamos apenas o que você informa
              voluntariamente:
            </p>
            <Lista
              itens={[
                "Nome",
                "Número de WhatsApp",
                "Suas respostas sobre o que gostaria de melhorar na aparência, se já realizou procedimentos estéticos e como foi essa experiência",
              ]}
            />
            <p>
              As respostas sobre procedimentos estéticos podem ser consideradas
              dados sensíveis relacionados à saúde. Por isso solicitamos seu
              consentimento explícito antes do envio, e você pode retirá-lo a
              qualquer momento.
            </p>
            <p>
              Não usamos cookies de rastreamento, não fazemos perfilamento e não
              coletamos nada além do que você digita.
            </p>
          </Secao>

          <Secao titulo="Para que usamos">
            <p>
              Exclusivamente para que nossa equipe entre em contato com você,
              avalie suas respostas e proponha o atendimento mais adequado. Não
              usamos seus dados para outra finalidade, não vendemos e não
              compartilhamos com terceiros para fins comerciais.
            </p>
            <p>
              A base legal é o seu consentimento, manifestado ao marcar a caixa
              de autorização antes de enviar o formulário.
            </p>
          </Secao>

          <Secao titulo="Com quem compartilhamos">
            <p>
              O envio do formulário é processado pelo serviço{" "}
              <Realce href="https://web3forms.com/privacy">Web3Forms</Realce>,
              que atua como operador e encaminha suas respostas ao nosso
              e-mail. O serviço opera com infraestrutura da Amazon Web Services
              e da Cloudflare, com dados criptografados em repouso, e pode reter
              os dados enviados por até três anos.
            </p>
            <p>
              Isso envolve transferência internacional de dados. Fora esse
              encaminhamento, seus dados ficam apenas na caixa de e-mail da
              clínica.
            </p>
          </Secao>

          <Secao titulo="Por quanto tempo guardamos">
            <p>
              Mantemos suas respostas pelo tempo necessário ao atendimento e ao
              histórico de relacionamento. Se você pedir a exclusão, removemos
              os dados dos nossos registros, ressalvadas obrigações legais de
              guarda de prontuário quando houver atendimento realizado.
            </p>
          </Secao>

          <Secao titulo="Seus direitos">
            <p>A LGPD garante a você o direito de:</p>
            <Lista
              itens={[
                "confirmar se tratamos seus dados e acessá-los",
                "corrigir dados incompletos ou desatualizados",
                "solicitar a exclusão dos dados tratados com base no consentimento",
                "revogar o consentimento a qualquer momento",
                "solicitar informação sobre com quem compartilhamos seus dados",
              ]}
            />
            <p>
              Para exercer qualquer um deles, escreva para{" "}
              <Realce href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </Realce>
              . Respondemos em até 15 dias.
            </p>
          </Secao>

          <Secao titulo="Segurança">
            <p>
              O site é servido exclusivamente por conexão segura (HTTPS) e não
              armazena dados em banco próprio. As respostas transitam
              criptografadas até nosso e-mail.
            </p>
          </Secao>
        </div>

        <footer className="mt-16 border-t border-nude-300 pt-10 text-center">
          <Link
            href="/avaliacao"
            className="rounded-control inline-flex min-h-12 items-center justify-center bg-[image:var(--gradient-gold)] px-9 py-3.5 text-[0.75rem] font-medium uppercase tracking-[0.18em] text-nude-900 transition-all duration-300 ease-[var(--ease-luxe)] hover:brightness-108"
          >
            Voltar para a avaliação
          </Link>

          <p className="mt-8 text-[0.6875rem] tracking-wide text-nude-500">
            {site.name} · {site.tagline}
          </p>
        </footer>
      </article>
    </main>
  );
}
