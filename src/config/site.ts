export const site = {
  name: "Dra. Jenifer Vieira",
  shortName: "Jenifer Vieira",
  tagline: "Harmonização Facial",
  url: "https://luminaes.com.br",

  doctor: {
    name: "Dra. Jenifer",
    fullName: "Dra. Jenifer Vieira",
    credentials: "",
  },

  contact: {
    whatsapp: "5528999816346",
    email: "luminaesb@gmail.com",
    address: "",
    city: "",
  },

  social: {
    instagram: "https://instagram.com/",
  },

  brand: {
    logoLockup: "/brand/logo-lockup-branco.png",
    logoLockupDark: "/brand/logo-lockup-preto.png",
    icon: "/brand/icone-branco.png",
    iconDark: "/brand/icone-preto.png",
    iconGold: "/brand/icone-dourado.png",
  },

  evaluationPhoto: "/images/dr-jenifer-fundo-form.JPG",

  consultation: {
    price: "R$ 300",
    note: "O valor é integralmente abatido caso você inicie seu tratamento no mesmo dia.",
  },
} as const;

export function whatsappLink(message: string): string {
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
