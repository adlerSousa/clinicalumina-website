import { site } from "@/config/site";
import { asset } from "@/lib/asset";

export type GalleryPhoto = { src: string; alt: string };

export type Step =
  | {
      kind: "intro";
      id: string;
      eyebrow: string;
      title: string;
      body: string;
      meta: string;
      cta: string;
    }
  | {
      kind: "gallery";
      id: string;
      label: string;
      title: string;
      body: string[];
      highlight: string;
      photos: GalleryPhoto[];
      options: { value: string; label: string }[];
    }
  | {
      kind: "text";
      id: string;
      label: string;
      question: string;
      help?: string;
      placeholder: string;
      required: boolean;
      maxLength: number;
    }
  | {
      kind: "choice";
      id: string;
      label: string;
      question: string;
      help?: string;
      options: { value: string; label: string }[];
      followUp?: {
        showWhen: string[];
        placeholder: string;
        maxLength: number;
        label: string;
      };
    }
  | {
      kind: "contact";
      id: string;
      eyebrow: string;
      question: string;
      help: string;
      cta: string;
    }
  | {
      kind: "thanks";
      id: string;
      title: string;
      body: string;
      priceCaption: string;
      priceNote: string;
      cta: string;
      nextStep: string;
    };

const RESULTADOS = [2, 3, 4, 5, 6, 7, 8, 9];

const resultados: GalleryPhoto[] = RESULTADOS.map((n, i) => ({
  src: asset(`/images/resultados/ad-${n}.webp`),
  alt: `Antes e depois de harmonização facial, resultado ${i + 1}`,
}));

export const steps: Step[] = [
  {
    kind: "intro",
    id: "intro",
    eyebrow: "Avaliação personalizada",
    title: "Mais do que harmonizar rostos, meu propósito é devolver confiança.",
    body: `Olá! Eu sou a ${site.doctor.name} e preparei uma avaliação rápida para entender suas principais queixas e descobrir como posso ajudar você.`,
    meta: "Leva apenas 1 minuto.",
    cta: "Iniciar avaliação",
  },
  {
    kind: "gallery",
    id: "resultados",
    label: "Reação ao Método Lumina",
    title: "Método Lumina",
    body: [
      "Uma abordagem exclusiva de reestruturação facial, criada para esculpir e harmonizar cada rosto de forma individual, respeitando sua anatomia, proporções e beleza natural.",
      "Mais do que realizar procedimentos, o Método Lumina parte de um planejamento personalizado para valorizar contornos, equilibrar proporções e realçar o que cada paciente tem de mais bonito.",
    ],
    highlight: "Naturalidade, equilíbrio e sofisticação em cada detalhe.",
    photos: resultados,
    options: [
      { value: "quero_igual", label: "Também quero me sentir assim" },
      { value: "e_o_que_busco", label: "É exatamente isso que eu busco" },
    ],
  },
  {
    kind: "text",
    id: "incomodo",
    label: "O que mais incomoda ao se olhar no espelho",
    question: "O que mais incomoda quando você olha no espelho?",
    placeholder: "Digite sua resposta aqui...",
    required: true,
    maxLength: 500,
  },
  {
    kind: "choice",
    id: "procedimento_previo",
    label: "Já realizou algum procedimento estético",
    question: "Você já realizou algum procedimento estético?",
    options: [
      { value: "sim", label: "Sim, já realizei" },
      { value: "nao", label: "Não, seria a primeira vez" },
    ],
    followUp: {
      showWhen: ["sim"],
      placeholder: "Conte rapidamente como foi sua experiência...",
      maxLength: 500,
      label: "Como foi a experiência",
    },
  },
  {
    kind: "text",
    id: "mudaria",
    label: "O que mudaria no rosto hoje",
    question: "Se pudesse mudar apenas uma coisa no seu rosto hoje, o que seria?",
    placeholder: "Digite sua resposta aqui...",
    required: true,
    maxLength: 500,
  },
  {
    kind: "contact",
    id: "contato",
    eyebrow: "Estamos quase terminando",
    question: "Para onde envio a análise das suas respostas?",
    help: "Para que minha equipe possa analisar suas respostas e entrar em contato, preencha seus dados abaixo.",
    cta: "Continuar",
  },
  {
    kind: "thanks",
    id: "obrigada",
    title: "Obrigada pelas suas respostas!",
    body: "Com base no que você compartilhou, acredito que uma avaliação personalizada seja o melhor caminho para definir o tratamento ideal.",
    priceCaption: `Consulta com a ${site.doctor.name}`,
    priceNote: site.consultation.note,
    cta: "Agendar minha consulta",
    nextStep: "Você será direcionado(a) ao WhatsApp para escolher o melhor horário com a nossa equipe.",
  },
];

export const answerableSteps = steps.filter(
  (s) =>
    s.kind === "gallery" ||
    s.kind === "text" ||
    s.kind === "choice" ||
    s.kind === "contact",
);
