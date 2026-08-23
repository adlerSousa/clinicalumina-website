import { site } from "@/config/site";

const ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

export type LeadAnswer = { label: string; value: string };

export type Lead = {
  name: string;
  whatsapp: string;
  answers: LeadAnswer[];
  botcheck?: string;
};

export type SubmitResult = { ok: true } | { ok: false; error: string };

function buildPayload(lead: Lead): Record<string, string> {
  const payload: Record<string, string> = {
    access_key: ACCESS_KEY,
    subject: `Novo lead: ${lead.name}`,
    from_name: `Site ${site.name}`,
    Nome: lead.name,
    WhatsApp: lead.whatsapp,
  };

  for (const { label, value } of lead.answers) {
    let chave = label;
    let n = 2;
    while (chave in payload) chave = `${label} (${n++})`;
    payload[chave] = value.trim() || "Não respondeu";
  }

  return payload;
}

export async function submitLead(lead: Lead): Promise<SubmitResult> {
  if (lead.botcheck) return { ok: true };

  if (!ACCESS_KEY) {
    return {
      ok: false,
      error:
        "O formulário ainda não foi conectado ao e-mail da clínica. Defina NEXT_PUBLIC_WEB3FORMS_KEY (veja o README).",
    };
  }

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(buildPayload(lead)),
    });

    const data: { success?: boolean; message?: string } = await response
      .json()
      .catch(() => ({}));

    if (!response.ok || !data.success) {
      return {
        ok: false,
        error:
          data.message ??
          "Não conseguimos enviar suas respostas agora. Tente novamente em instantes.",
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      error:
        "Não conseguimos enviar suas respostas. Verifique sua conexão e tente novamente.",
    };
  }
}
