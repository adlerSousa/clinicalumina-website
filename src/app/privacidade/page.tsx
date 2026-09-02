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
    <section className="mt-10">
      <h2 className="font-display text-[1.5rem] leading-snug text-nude-900">
        {titulo}
      </h2>
      <div className="mt-3 space-y-3 text-[0.9375rem] leading-relaxed text-nude-700">
        {children}
      </div>
    </section>
  );
}

export default function PrivacidadePage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-14 sm:px-8 sm:py-20">
      <Link href="/" className="inline-block">
        <Image
          src={asset(site.brand.logoLockupDark)}
          alt={`${site.name} · ${site.tagline}`}
          width={1000}
          height={637}
          priority
          className="h-auto w-[9rem]"
        />
      </Link>

      <h1 className="font-display mt-10 text-[clamp(1.875rem,1.4rem+1.8vw,2.5rem)] leading-tight text-nude-900">
        Política de Privacidade
      </h1>

      <p className="mt-3 text-sm text-nude-600">
        Última atualização: {ATUALIZADO_EM}
      </p>

      <Secao titulo="Quem é responsável pelos seus dados">
        <p>
          A {site.name} é a controladora dos dados pessoais informados neste
          site, nos termos da Lei Geral de Proteção de Dados (Lei 13.709/2018).
        </p>
        <p>
          Para qualquer assunto relacionado aos seus dados, entre em contato
          pelo e-mail{" "}
          <a
            href={`mailto:${site.contact.email}`}
            className="text-gold-700 underline underline-offset-2"
          >
            {site.contact.email}
          </a>
          .
        </p>
      </Secao>

      <Secao titulo="Quais dados coletamos">
        <p>
          No formulário de avaliação, coletamos apenas o que você informa
          voluntariamente:
        </p>
        <ul className="ml-5 list-disc space-y-1.5">
          <li>Nome</li>
          <li>Número de WhatsApp</li>
          <li>
            Suas respostas sobre o que gostaria de melhorar na aparência, se já
            realizou procedimentos estéticos e como foi essa experiência
          </li>
        </ul>
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
          Exclusivamente para que nossa equipe entre em contato com você, avalie
          suas respostas e proponha o atendimento mais adequado. Não usamos
          seus dados para outra finalidade, não vendemos e não compartilhamos
          com terceiros para fins comerciais.
        </p>
        <p>
          A base legal é o seu consentimento, manifestado ao marcar a caixa de
          autorização antes de enviar o formulário.
        </p>
      </Secao>

      <Secao titulo="Com quem compartilhamos">
        <p>
          O envio do formulário é processado pelo serviço{" "}
          <a
            href="https://web3forms.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-700 underline underline-offset-2"
          >
            Web3Forms
          </a>
          , que atua como operador e encaminha suas respostas ao nosso e-mail. O
          serviço opera com infraestrutura da Amazon Web Services e da
          Cloudflare, com dados criptografados em repouso, e pode reter os
          dados enviados por até três anos.
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
          histórico de relacionamento. Se você pedir a exclusão, removemos os
          dados dos nossos registros, ressalvadas obrigações legais de guarda
          de prontuário quando houver atendimento realizado.
        </p>
      </Secao>

      <Secao titulo="Seus direitos">
        <p>A LGPD garante a você o direito de:</p>
        <ul className="ml-5 list-disc space-y-1.5">
          <li>confirmar se tratamos seus dados e acessá-los</li>
          <li>corrigir dados incompletos ou desatualizados</li>
          <li>solicitar a exclusão dos dados tratados com base no consentimento</li>
          <li>revogar o consentimento a qualquer momento</li>
          <li>solicitar informação sobre com quem compartilhamos seus dados</li>
        </ul>
        <p>
          Para exercer qualquer um deles, escreva para{" "}
          <a
            href={`mailto:${site.contact.email}`}
            className="text-gold-700 underline underline-offset-2"
          >
            {site.contact.email}
          </a>
          . Respondemos em até 15 dias.
        </p>
      </Secao>

      <Secao titulo="Segurança">
        <p>
          O site é servido exclusivamente por conexão segura (HTTPS) e não
          armazena dados em banco próprio. As respostas transitam criptografadas
          até nosso e-mail.
        </p>
      </Secao>

      <div className="mt-14 border-t border-nude-300 pt-8">
        <Link
          href="/avaliacao"
          className="text-sm text-gold-700 underline underline-offset-2"
        >
          Voltar para a avaliação
        </Link>
      </div>
    </main>
  );
}
