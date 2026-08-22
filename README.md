# Dra. Jenifer Vieira — Harmonização Facial

Site institucional da Dra. Jenifer Vieira.

A entrega atual é a página **Avaliação** (`/avaliacao`): um formulário de
múltiplas etapas, usado em campanhas para captar e qualificar leads. O
visitante responde algumas perguntas sobre o que gostaria de melhorar,
vê um carrossel de resultados e deixa nome e WhatsApp. As respostas são
enviadas por e-mail para a clínica.

## Stack

| | |
| --- | --- |
| Framework | Next.js 16 (App Router, static export) |
| Linguagem | TypeScript |
| Estilo | Tailwind CSS v4 |
| UI | React 19 |
| Fontes | Montserrat e Cormorant Garamond (`next/font`) |
| Envio de formulário | Web3Forms |
| Processamento de imagens | sharp |
| Hospedagem | Hostinger (hospedagem compartilhada) |

O projeto é compilado como site estático (`output: "export"`), sem
necessidade de Node no servidor.

```bash
npm install
npm run dev
```
