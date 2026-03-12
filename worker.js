const APP_HTML = `<!doctype html>
<html lang="pt">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Gestor de Grupos</title>
  <style>
    :root { font-family: Inter, system-ui, sans-serif; }
    body { margin: 0; background: #f5f7fb; color: #1f2937; }
    .wrap { max-width: 1000px; margin: 0 auto; padding: 24px; }
    h1 { margin: 0 0 8px; }
    .muted { color: #6b7280; font-size: 14px; }
    .card { background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px; margin-top: 14px; }
    .row { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }
    input, select, button, textarea { border: 1px solid #d1d5db; border-radius: 8px; padding: 8px 10px; font-size: 14px; }
    input[type="number"] { width: 100px; }
    button { background: #0f766e; color: #fff; border-color: #0f766e; cursor: pointer; }
    button.alt { background: #fff; color: #0f766e; }
    button:disabled { opacity: .55; cursor: not-allowed; }
    .pill { background: #e6f4f1; color: #0f766e; border-radius: 999px; padding: 4px 10px; font-size: 12px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 12px; margin-top: 12px; }
    .group { background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; }
    .group h3 { margin: 0; padding: 10px 12px; border-bottom: 1px solid #e5e7eb; font-size: 15px; display: flex; justify-content: space-between; }
    .member { padding: 8px 12px; border-bottom: 1px dashed #eef2f7; display: flex; justify-content: space-between; gap: 8px; }
    .member:last-child { border-bottom: none; }
    .mono { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; color: #6b7280; font-size: 12px; }
    #log { font-size: 13px; color: #374151; white-space: pre-line; }
    .error { color: #b91c1c; }
  </style>
</head>
<body>
  <div class="wrap">
    <h1>Gestor de Grupos de Alunos</h1>
    <p class="muted">Versão refeita de raiz: importar CSV, criar grupos e exportar resultado.</p>

    <section class="card">
      <div class="row">
        <label><strong>1) CSV de alunos</strong></label>
        <input id="file" type="file" accept=".csv,text/csv" />
        <span id="studentsCount" class="pill">0 alunos</span>
      </div>
      <p class="muted" style="margin:10px 0 0;">Formato recomendado: <code>numero,nome,email</code> (email opcional).</p>
    </section>

    <section class="card">
      <div class="row">
        <label><strong>2) Configuração</strong></label>
        <label>Tamanho por grupo <input id="size" type="number" min="2" max="12" value="4" /></label>
        <button id="randomize">Gerar grupos aleatórios</button>
        <button id="clear" class="alt">Limpar</button>
        <button id="exportCsv" class="alt">Exportar CSV</button>
      </div>
    </section>

    <section class="card">
      <div class="row" style="justify-content:space-between;">
        <strong>3) Resultado</strong>
        <span id="groupsCount" class="pill">0 grupos</span>
      </div>
      <div id="groups" class="grid"></div>
      <div id="log" style="margin-top:10px;"></div>
    </section>
  </div>

  <script>
    let students = [];
    let groups = [];

    const fileInput = document.getElementById('file');
    const sizeInput = document.getElementById('size');
    const randomizeBtn = document.getElementById('randomize');
    const clearBtn = document.getElementById('clear');
    const exportBtn = document.getElementById('exportCsv');
    const studentsCount = document.getElementById('studentsCount');
    const groupsCount = document.getElementById('groupsCount');
    const groupsEl = document.getElementById('groups');
    const logEl = document.getElementById('log');

    fileInput.addEventListener('change', onFile);
    randomizeBtn.addEventListener('click', buildRandomGroups);
    clearBtn.addEventListener('click', clearAll);
    exportBtn.addEventListener('click', exportCsv);

    function setLog(msg, isError = false) {
      logEl.textContent = msg;
      logEl.classList.toggle('error', isError);
    }

    async function onFile(e) {
      const file = e.target.files?.[0];
      if (!file) return;
      try {
        const text = await file.text();
        students = parseCsv(text)
          .map((row, i) => ({
            numero: row.numero || String(i + 1),
            nome: row.nome || row.name || row.aluno || '',
            email: row.email || ''
          }))
          .filter(s => s.nome.trim().length > 0);

        studentsCount.textContent = students.length + ' alunos';
        groups = [];
        renderGroups();
        setLog('Ficheiro carregado com sucesso.');
      } catch (err) {
        setLog('Erro ao ler CSV: ' + err.message, true);
      }
    }

    function parseCsv(text) {
      const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
      if (!lines.length) return [];

      const header = splitCsvLine(lines[0]).map(h => h.trim().toLowerCase());
      const idxNumero = header.findIndex(h => ['numero', 'número', 'num', 'id'].includes(h));
      const idxNome = header.findIndex(h => ['nome', 'name', 'aluno'].includes(h));
      const idxEmail = header.findIndex(h => ['email', 'mail', 'e-mail'].includes(h));

      const hasHeader = idxNome >= 0 || idxNumero >= 0 || idxEmail >= 0;
      const dataLines = hasHeader ? lines.slice(1) : lines;

      return dataLines.map((line, i) => {
        const cols = splitCsvLine(line);
        if (hasHeader) {
          return {
            numero: idxNumero >= 0 ? (cols[idxNumero] || '').trim() : String(i + 1),
            nome: idxNome >= 0 ? (cols[idxNome] || '').trim() : (cols[0] || '').trim(),
            email: idxEmail >= 0 ? (cols[idxEmail] || '').trim() : ''
          };
        }
        return {
          numero: String(i + 1),
          nome: (cols[0] || '').trim(),
          email: (cols[1] || '').trim()
        };
      });
    }

    function splitCsvLine(line) {
      const out = [];
      let current = '';
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"') {
          if (inQuotes && line[i + 1] === '"') {
            current += '"';
            i++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (ch === ',' && !inQuotes) {
          out.push(current);
          current = '';
        } else {
          current += ch;
        }
      }
      out.push(current);
      return out;
    }

    function buildRandomGroups() {
      if (!students.length) {
        setLog('Importa primeiro um CSV com alunos.', true);
        return;
      }
      const size = Number(sizeInput.value);
      if (!Number.isInteger(size) || size < 2) {
        setLog('Define um tamanho de grupo válido (>= 2).', true);
        return;
      }

      const shuffled = [...students];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      groups = [];
      for (let i = 0; i < shuffled.length; i += size) {
        groups.push({ name: 'Grupo ' + (groups.length + 1), members: shuffled.slice(i, i + size) });
      }

      renderGroups();
      setLog('Grupos gerados.');
    }

    function renderGroups() {
      groupsEl.innerHTML = '';
      groupsCount.textContent = groups.length + ' grupos';

      if (!groups.length) {
        groupsEl.innerHTML = '<p class="muted">Ainda não existem grupos.</p>';
        return;
      }

      groups.forEach(group => {
        const card = document.createElement('article');
        card.className = 'group';

        const header = document.createElement('h3');
        header.innerHTML = '<span>' + group.name + '</span><span class="mono">' + group.members.length + ' alunos</span>';
        card.appendChild(header);

        group.members.forEach(student => {
          const row = document.createElement('div');
          row.className = 'member';
          row.innerHTML = '<span>' + escapeHtml(student.nome) + '</span><span class="mono">' + escapeHtml(student.numero) + '</span>';
          card.appendChild(row);
        });

        groupsEl.appendChild(card);
      });
    }

    function escapeHtml(str) {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    function clearAll() {
      students = [];
      groups = [];
      fileInput.value = '';
      studentsCount.textContent = '0 alunos';
      renderGroups();
      setLog('Dados limpos.');
    }

    function exportCsv() {
      if (!groups.length) {
        setLog('Não existem grupos para exportar.', true);
        return;
      }

      const rows = [['grupo', 'numero', 'nome', 'email']];
      groups.forEach(group => {
        group.members.forEach(student => {
          rows.push([group.name, student.numero, student.nome, student.email || '']);
        });
      });

      const csv = rows.map(cols => cols.map(csvEscape).join(',')).join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'grupos.csv';
      a.click();
      URL.revokeObjectURL(url);
      setLog('CSV exportado.');
    }

    function csvEscape(value) {
      const v = String(value ?? '');
      return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
    }
  </script>
</body>
</html>`;

function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...(init.headers || {}),
    },
  });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return json({ ok: true, service: "gestor-grupos", ts: new Date().toISOString() });
    }

    if (url.pathname === "/" || url.pathname === "/index.html") {
      return new Response(APP_HTML, {
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "no-store",
          "x-content-type-options": "nosniff",
          "x-frame-options": "DENY",
          "referrer-policy": "strict-origin-when-cross-origin",
        },
      });
    }

    return json({ ok: false, error: "not_found" }, { status: 404 });
  },
};
