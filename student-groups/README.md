# GrupoFácil · Gestor de Grupos de Alunos

Aplicação web para Cloudflare Workers que permite criar e gerir grupos de alunos a partir de ficheiros Excel.

## 🚀 Funcionalidades

- **Importação de alunos** via ficheiro `.xlsx`, `.xls` ou `.csv`
- **Dois modos de criação de grupos:**
  - 🎲 **Aleatório** — distribuição automática e balanceada
  - ✋ **Manual** — drag & drop para organização personalizada
- **Configuração flexível** — por número de grupos ou por alunos por grupo
- **Validação** — indicação visual de alunos não atribuídos
- **Exportação Excel** — ficheiro com todos os grupos organizados
- **Notificação por email** — envio automático para o professor com o Excel em anexo

## 📁 Estrutura do Projecto

```
student-groups/
├── worker.js       # Worker principal (frontend + backend)
├── wrangler.toml   # Configuração do Cloudflare Workers
├── package.json
└── README.md
```

## ⚙️ Instalação e Deploy

### Pré-requisitos
- Conta Cloudflare (gratuita)
- Node.js 18+

### Passos

```bash
# 1. Instalar dependências
npm install

# 2. Autenticar no Cloudflare
npx wrangler login

# 3. Desenvolvimento local
npm run dev
# Abre em http://localhost:8787

# 4. Deploy para produção
npm run deploy
# Disponível em https://student-groups.<teu-subdomínio>.workers.dev
```

## 📧 Configuração do Email

O Worker utiliza a **API MailChannels** que é gratuita para Cloudflare Workers (sem necessidade de conta adicional).

> **Nota:** O MailChannels requer que o domínio de envio tenha SPF/DKIM configurado. Para a Workers domain (`.workers.dev`), pode ser necessário configurar um **SPF record** no teu domínio ou utilizar um domínio personalizado.

### Alternativa: SendGrid / Mailgun

Se preferires usar outra API de email, edita a função `sendEmail` em `worker.js`:

```javascript
// Exemplo com SendGrid
async function sendEmail({ to, ... }, apiKey) {
  return fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ /* payload SendGrid */ })
  });
}
```

Para guardar a API key de forma segura, usa variáveis de ambiente Wrangler:

```bash
npx wrangler secret put SENDGRID_API_KEY
```

E acede via `env.SENDGRID_API_KEY` no Worker.

## 📊 Formato do Ficheiro Excel

O ficheiro de importação deve ter:
- **Coluna A**: nomes dos alunos (um por linha)
- A primeira linha pode ser cabeçalho (ex: "Nome") — é detectada e ignorada automaticamente

### Exemplo:
| Nome |
|------|
| Ana Silva |
| Bruno Costa |
| Carla Mendes |

## 🎨 Interface

A aplicação guia o utilizador por 4 etapas:
1. **Importar** — carregar ficheiro Excel
2. **Configurar** — definir número de grupos e modo
3. **Organizar** — ajustar grupos (drag & drop em modo manual)
4. **Exportar** — download Excel + envio de email

## 📄 Licença

MIT
