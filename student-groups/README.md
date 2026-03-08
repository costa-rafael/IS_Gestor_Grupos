# Gestor de Grupos de Alunos

Aplicação web **serverless** para criação, organização e exportação de grupos de alunos, construída sobre **Cloudflare Workers**.

## Visão Geral

A aplicação simplifica a formação de grupos em contexto letivo com um fluxo em 4 passos:

1. **Importar** alunos via Excel/CSV
2. **Configurar** estratégia de agrupamento
3. **Organizar** automaticamente ou por drag & drop
4. **Exportar** resultados para Excel e envio por email

---

## Principais Funcionalidades

- Importação de ficheiros `.xlsx`, `.xls` e `.csv`
- Deteção automática de cabeçalho na primeira linha (ex.: `Nome`)
- Dois modos de agrupamento:
  - 🎲 **Aleatório** (balanceado)
  - ✋ **Manual** (drag & drop)
- Configuração por:
  - número de grupos, ou
  - número de alunos por grupo
- Indicação de alunos não atribuídos
- Exportação para Excel com todos os grupos
- Envio opcional por email (MailChannels API)
- Endpoint técnico de monitorização: `GET /health`

---

## Stack Técnica

- **Runtime:** Cloudflare Workers
- **Tooling:** Wrangler v3
- **UI:** HTML + CSS + JavaScript vanilla (single-file worker)
- **Leitura/Exportação Excel:** SheetJS (`xlsx` via CDN)

---

## Estrutura do Projeto

```text
student-groups/
├── worker.js        # Worker principal (frontend + endpoints)
├── wrangler.toml    # Configuração do deployment
├── package.json     # Scripts de desenvolvimento/deploy
└── README.md
```

---

## Requisitos

- Node.js 18+
- Conta Cloudflare
- Wrangler autenticado

---

## Como Executar Localmente

```bash
npm install
npm run dev
```

Aplicação disponível em `http://localhost:8787`.

---

## Deploy

```bash
npm run deploy
```

Após deploy, a aplicação fica disponível no domínio `*.workers.dev` configurado na tua conta.

---

## Configuração de Email

Por omissão, o projeto usa **MailChannels** para envio de email.

### Variáveis recomendadas

```bash
npx wrangler secret put MAIL_FROM
npx wrangler secret put MAIL_FROM_NAME
```

Exemplo:

- `MAIL_FROM=noreply@teu-dominio.pt`
- `MAIL_FROM_NAME=Gestor de Grupos`

> Nota: para maior entregabilidade, usa domínio com SPF/DKIM devidamente configurado.

---

## Formato Esperado do Ficheiro de Alunos

- Pode ter múltiplas colunas (ex.: `Número`, `Nome`)
- A app tenta detetar automaticamente a coluna de nomes
- Cabeçalhos são identificados e ignorados na leitura dos dados

Exemplo:

| Nome |
|---|
| Ana Silva |
| Bruno Costa |
| Carla Mendes |

---

## Operação e Qualidade

- Interface orientada por etapas para reduzir erros operacionais
- Feedback visual por toasts e indicadores de estado
- Compatível com execução nativa em Workers (sem `nodejs_compat`)

---

## Segurança e Boas Práticas

- Uso de secrets via Wrangler para credenciais sensíveis
- Endpoint `/health` para integração com monitorização externa
- Headers de segurança/CORS aplicados no worker

---

## Roadmap Sugerido

- Persistência de sessões (KV / D1)
- Histórico de turmas e templates de grupos
- Regras de equilíbrio (ex.: género, desempenho, afinidade)
- Internacionalização (PT/EN)

---

## Licença

MIT
