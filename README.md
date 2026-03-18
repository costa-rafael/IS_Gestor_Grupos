# 🍏 SmartGroups - Gestor de Grupos Premium

Uma aplicação web moderna, minimalista e altamente interativa inspirada nos princípios de design da Apple para **criação, organização e exportação de pautas de alunos** em grupos de trabalho.

---

## 🌟 Visão Geral

O **SmartGroups** simplifica a gestão de equipes com um fluxo de trabalho em **4 passos sequenciais**, concebidos para proporcionar uma experiência livre de distrações e totalmente fluida:

1. 📥 **Importar**: Carrega a pauta de alunos (Excel/CSV) e filtra quem participa.
2. ⚙️ **Configurar**: Define o tamanho dos grupos e o modo de distribuição com controlos Apple-style.
3. 🎲 **Resultados**: Organiza instantaneamente e ajusta via *Drag & Drop* inteligente com feedback visual.
4. ✉️ **Partilhar**: Envia a composição por email ou descarrega em formato `.xlsx` estruturado.

---

## ✨ Funcionalidades "Apple-Coded"

### 🎨 Experiência de Utilizador (UX/UI)
*   **Segmented Controls & Apple Steppers**: Seleções e ajustes numéricos através de interfaces táteis e elegantes.
*   **Sem Barras de Scroll Visíveis**: Interface limpa e focada, ocultando rastros cinzentos enquanto mantém navegação natural.
*   **Header Compacto**: Maximiza o espaço útil no ecrã para focar no conteúdo e cartões de dados.

### ✋ Gestão Interativa de Grupos
*   **Duplo-Clique para Renomear**: Edita o nome de qualquer grupo (*inline*) com um duplo-clique rápido no título.
*   **Feedback de Arraste (Drag State)**: Os cartões de alunos ganham elevação, rotação suave e opacidade ao serem suspensos.
*   **Animação "Pop-In"**: Novos alunos entram nos grupos com micro-animações sequenciais suaves.

---

## 🛠️ Stack Técnica

*   **Runtime:** JavaScript Serverless (compatível com Cloudflare Workers)
*   **Frontend:** HTML5 + Vanilla CSS3 (Single-file template renderizado dinamicamente)
*   **Bibliotecas:** SheetJS (`xlsx`) para parsing e exportações nativas.

---

## 📂 Estrutura do Projeto

```text
student-groups/
├── worker.js        # Backend Serverless + Frontend Dinâmico
├── wrangler.toml    # Configurações de Deployment da Cloudflare
├── package.json     # Scripts e Dependências
└── README.md        # Documentação Geral
```

---

## 🚀 Como Executar Localmente

1. Instala as dependências:
   ```bash
   npm install
   ```

2. Corre o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

A aplicação ficará disponível em `http://localhost:8787`.

---

## ✉️ Fluxo de Partilha

*   **Email Nativo**: A aplicação prioriza o envio direto por email através de formulário integrado.
*   **Exportação Excel**: Disponível como ação secundária para guardar relatórios `.xlsx` locais organizados por Colunas (`Grupo`, `Número`, `Nome`, `Email`).

---

## 📜 Licença

Distribuído sob a Licença MIT.
