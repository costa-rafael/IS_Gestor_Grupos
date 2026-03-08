// Student Groups Manager
// Deploy with: wrangler deploy

const HTML_PAGE = `<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Gestor de Grupos de Alunos</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"></script>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #f3f6ff;
      --surface: rgba(255, 255, 255, 0.88);
      --surface2: #eef2ff;
      --surface-strong: #dfe7ff;
      --border: rgba(74, 96, 188, 0.25);
      --accent: #6f7bff;
      --accent2: #ff7db5;
      --accent3: #49f5b2;
      --text: #1e2b58;
      --muted: #5c6ca7;
      --shadow: 0 10px 24px rgba(37, 62, 146, 0.14);
      --radius: 16px;
    }

    html, body {
      height: 100%;
      background: linear-gradient(180deg, #f8faff 0%, #eef3ff 100%);
      color: var(--text);
      font-family: 'DM Mono', monospace;
      font-size: 14px;
      overflow-x: hidden;
    }

    /* Background mesh */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background:
        radial-gradient(ellipse 70% 45% at 12% 18%, rgba(111,123,255,0.12) 0%, transparent 68%),
        radial-gradient(ellipse 55% 40% at 88% 80%, rgba(255,125,181,0.08) 0%, transparent 70%),
        radial-gradient(ellipse 45% 55% at 55% 0%, rgba(73,245,178,0.08) 0%, transparent 72%);
      pointer-events: none;
      z-index: 0;
    }

    body::after {
      content: '';
      position: fixed;
      inset: 0;
      background-image:
        linear-gradient(rgba(129, 146, 198, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(129, 146, 198, 0.05) 1px, transparent 1px);
      background-size: 32px 32px;
      mask-image: radial-gradient(circle at center, black 45%, transparent 100%);
      pointer-events: none;
      z-index: 0;
    }

    .app {
      position: relative;
      z-index: 1;
      max-width: 1400px;
      margin: 0 auto;
      padding: 24px;
      min-height: 100vh;
    }

    /* Header */
    .header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 28px;
      padding: 18px;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      background: linear-gradient(135deg, rgba(111,123,255,0.15), rgba(20,30,58,0.55));
      box-shadow: var(--shadow);
      backdrop-filter: blur(8px);
    }

    .logo {
      width: 44px;
      height: 44px;
      background: linear-gradient(135deg, var(--accent), var(--accent2));
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      flex-shrink: 0;
    }

    .header-text h1 {
      font-family: 'Syne', sans-serif;
      font-size: 22px;
      font-weight: 800;
      letter-spacing: -0.5px;
      color: var(--text);
    }

    .header-text p {
      font-size: 12px;
      color: var(--muted);
      margin-top: 4px;
    }

    /* Steps indicator */
    .steps {
      display: flex;
      gap: 0;
      margin-bottom: 36px;
      background: linear-gradient(135deg, rgba(16,26,50,0.78), rgba(13,20,38,0.86));
      border: 1px solid var(--border);
      border-radius: calc(var(--radius) - 2px);
      padding: 4px;
      width: fit-content;
      box-shadow: var(--shadow);
    }

    .step {
      padding: 8px 20px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 500;
      color: var(--muted);
      cursor: default;
      transition: all 0.2s;
      white-space: nowrap;
    }

    .step.active {
      background: linear-gradient(130deg, var(--accent), #8f66ff);
      color: white;
    }

    .step.done {
      color: var(--accent3);
    }

    /* Panels */
    .panel {
      display: none;
      animation: fadeIn 0.3s ease;
    }

    .panel.visible { display: block; }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Cards */
    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 24px;
      margin-bottom: 20px;
      box-shadow: var(--shadow);
      backdrop-filter: blur(6px);
    }

    .card-title {
      font-family: 'Syne', sans-serif;
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: var(--muted);
      margin-bottom: 16px;
    }

    /* Upload zone */
    .upload-zone {
      border: 2px dashed var(--border);
      border-radius: var(--radius);
      padding: 60px 40px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s;
      position: relative;
      overflow: hidden;
    }

    .upload-zone::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at center, rgba(108,99,255,0.05) 0%, transparent 70%);
      opacity: 0;
      transition: opacity 0.3s;
    }

    .upload-zone:hover, .upload-zone.drag-over {
      border-color: var(--accent);
    }

    .upload-zone:hover::before, .upload-zone.drag-over::before {
      opacity: 1;
    }

    .upload-icon {
      font-size: 48px;
      margin-bottom: 16px;
      display: block;
    }

    .upload-zone h3 {
      font-family: 'Syne', sans-serif;
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 8px;
    }

    .upload-zone p {
      color: var(--muted);
      font-size: 13px;
    }

    .upload-zone input[type=file] {
      position: absolute;
      inset: 0;
      opacity: 0;
      cursor: pointer;
      width: 100%;
      height: 100%;
    }

    /* Student list */
    .student-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 8px;
      max-height: 320px;
      overflow-y: auto;
      padding-right: 4px;
    }

    .student-grid::-webkit-scrollbar { width: 4px; }
    .student-grid::-webkit-scrollbar-track { background: var(--surface2); border-radius: 2px; }
    .student-grid::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

    .student-chip {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      background: var(--surface2);
      border: 1px solid var(--border);
      border-radius: 8px;
      font-size: 13px;
      cursor: grab;
      transition: all 0.15s;
      user-select: none;
      position: relative;
    }

    .student-chip:hover {
      border-color: var(--accent);
      background: rgba(108,99,255,0.1);
    }

    .student-chip.dragging {
      opacity: 0.4;
      transform: scale(0.95);
    }

    .student-chip.unassigned {
      border-color: rgba(255,107,107,0.4);
    }

    .student-avatar {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--accent), var(--accent2));
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: 700;
      color: white;
      flex-shrink: 0;
    }

    /* Config section */
    .config-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    @media (max-width: 600px) {
      .config-grid { grid-template-columns: 1fr; }
    }

    .field label {
      display: block;
      font-size: 11px;
      color: var(--muted);
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 8px;
    }

    .field input, .field select {
      width: 100%;
      background: var(--surface2);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 10px 14px;
      color: var(--text);
      font-family: 'DM Mono', monospace;
      font-size: 14px;
      outline: none;
      transition: border-color 0.2s;
    }

    .field input:focus, .field select:focus {
      border-color: var(--accent);
    }

    .field select option { background: var(--surface2); }

    /* Mode selector */
    .mode-tabs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-bottom: 20px;
    }

    .mode-tab {
      padding: 14px;
      background: var(--surface2);
      border: 2px solid var(--border);
      border-radius: 10px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s;
    }

    .mode-tab.active {
      border-color: var(--accent);
      background: rgba(108,99,255,0.1);
    }

    .mode-tab .mode-icon { font-size: 24px; margin-bottom: 6px; }
    .mode-tab .mode-label {
      font-family: 'Syne', sans-serif;
      font-size: 13px;
      font-weight: 700;
    }
    .mode-tab .mode-desc {
      font-size: 11px;
      color: var(--muted);
      margin-top: 2px;
    }

    /* Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      border-radius: 8px;
      border: none;
      font-family: 'DM Mono', monospace;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-primary {
      background: linear-gradient(130deg, var(--accent), #8f66ff);
      color: white;
    }

    .btn-primary:hover { background: #5a52e8; transform: translateY(-1px); }

    .btn-secondary {
      background: var(--surface2);
      border: 1px solid var(--border);
      color: var(--text);
    }

    .btn-secondary:hover { border-color: var(--accent); }

    .btn-success {
      background: linear-gradient(130deg, var(--accent3), #2dd89a);
      color: #0a0a0f;
    }

    .btn-success:hover { background: #38d470; transform: translateY(-1px); }

    .btn-danger {
      background: rgba(255,107,107,0.15);
      border: 1px solid rgba(255,107,107,0.4);
      color: var(--accent2);
    }

    .btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      transform: none !important;
    }

    .btn-group {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-top: 16px;
    }

    /* Groups workspace */
    .workspace {
      display: grid;
      gap: 16px;
    }

    .workspace-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
    }

    .groups-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 16px;
    }

    .group-card {
      background: var(--surface);
      border: 2px solid var(--border);
      border-radius: var(--radius);
      padding: 16px;
      min-height: 160px;
      transition: border-color 0.2s;
      position: relative;
    }

    .group-card.drag-target {
      border-color: var(--accent3);
      background: rgba(67,233,123,0.05);
    }

    .group-card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--border);
    }

    .group-name {
      font-family: 'Syne', sans-serif;
      font-size: 14px;
      font-weight: 700;
    }

    .group-count {
      font-size: 11px;
      color: var(--muted);
      background: var(--surface2);
      padding: 3px 8px;
      border-radius: 20px;
    }

    .group-drop-zone {
      min-height: 80px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .group-drop-zone .student-chip {
      cursor: grab;
      font-size: 12px;
      padding: 6px 10px;
    }

    .group-empty {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 80px;
      border: 1px dashed var(--border);
      border-radius: 8px;
      color: var(--muted);
      font-size: 12px;
    }

    /* Unassigned pool */
    .pool-card {
      background: rgba(255,107,107,0.04);
      border: 2px solid rgba(255,107,107,0.2);
    }

    .pool-badge {
      background: rgba(255,107,107,0.15);
      color: var(--accent2);
      padding: 3px 10px;
      border-radius: 20px;
      font-size: 11px;
    }

    /* Stats bar */
    .stats-bar {
      display: flex;
      gap: 20px;
      padding: 14px 20px;
      background: linear-gradient(145deg, rgba(20,31,56,0.8), rgba(15,23,42,0.88));
      border: 1px solid var(--border);
      border-radius: 10px;
      margin-bottom: 20px;
      flex-wrap: wrap;
      box-shadow: var(--shadow);
    }

    .hero-strip {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
      gap: 12px;
      margin-bottom: 20px;
    }

    .hero-chip {
      padding: 12px 14px;
      border: 1px solid var(--border);
      border-radius: 12px;
      background: linear-gradient(150deg, rgba(28,39,70,0.82), rgba(18,27,47,0.82));
      font-size: 12px;
      color: #42538d;
      box-shadow: var(--shadow);
    }

    .hero-chip strong {
      display: block;
      color: var(--text);
      font-size: 14px;
      font-family: 'Syne', sans-serif;
      margin-bottom: 2px;
    }

    .stat {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .stat-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    .stat-label { color: var(--muted); font-size: 12px; }
    .stat-value { font-weight: 500; }

    /* Email config */
    .email-config {
      background: rgba(67,233,123,0.04);
      border: 1px solid rgba(67,233,123,0.2);
    }

    /* Modal */
    .modal-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.7);
      backdrop-filter: blur(4px);
      z-index: 100;
      align-items: center;
      justify-content: center;
    }

    .modal-overlay.open { display: flex; }

    .modal {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 32px;
      max-width: 480px;
      width: 90%;
      animation: modalIn 0.25s ease;
    }

    @keyframes modalIn {
      from { transform: scale(0.9); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    .modal h2 {
      font-family: 'Syne', sans-serif;
      font-size: 20px;
      font-weight: 800;
      margin-bottom: 12px;
    }

    .modal p { color: var(--muted); line-height: 1.6; margin-bottom: 20px; }

    /* Toast */
    .toast-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 200;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .toast {
      padding: 12px 18px;
      border-radius: 10px;
      border: 1px solid var(--border);
      background: var(--surface);
      font-size: 13px;
      max-width: 320px;
      animation: toastIn 0.3s ease;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    @keyframes toastIn {
      from { transform: translateX(40px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    .toast.success { border-color: rgba(67,233,123,0.4); }
    .toast.error { border-color: rgba(255,107,107,0.4); }
    .toast.info { border-color: rgba(108,99,255,0.4); }

    /* Progress bar */
    .progress-bar {
      height: 4px;
      background: var(--surface2);
      border-radius: 2px;
      overflow: hidden;
      margin: 16px 0;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--accent), var(--accent3));
      border-radius: 2px;
      transition: width 0.4s ease;
    }

    /* Loader */
    .spinner {
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255,255,255,0.2);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
      display: inline-block;
    }

    @keyframes spin { to { transform: rotate(360deg); } }

    .hidden { display: none !important; }
  </style>
</head>
<body>
<div class="app">

  <!-- Header -->
  <div class="header">
    <div class="logo">🎓</div>
    <div class="header-text">
      <h1>Organizador de Turmas</h1>
      <p>Gestor de grupos para professores</p>
    </div>
  </div>

  <!-- Steps -->
  <div class="steps">
    <div class="step active" id="step-1">① Importar</div>
    <div class="step" id="step-2">② Configurar</div>
    <div class="step" id="step-3">③ Organizar</div>
    <div class="step" id="step-4">④ Exportar</div>
  </div>

  <div class="hero-strip">
    <div class="hero-chip"><strong>🧭 Organização Inteligente</strong>Importa, configura e distribui alunos em poucos cliques.</div>
    <div class="hero-chip"><strong>🧠 Fluxo Guiado</strong>4 etapas para importar, organizar e exportar sem fricção.</div>
    <div class="hero-chip"><strong>✅ Fiável no Dia a Dia</strong>Validação de dados e exportação rápida para Excel.</div>
  </div>

  <!-- Panel 1: Import -->
  <div class="panel visible" id="panel-1">
    <div class="card">
      <div class="card-title">Importar Lista de Alunos</div>
      <div class="upload-zone" id="upload-zone">
        <input type="file" id="file-input" accept=".xlsx,.xls,.csv" />
        <span class="upload-icon">📊</span>
        <h3>Arrasta o ficheiro ou clica para seleccionar</h3>
        <p>Suporta ficheiros .xlsx, .xls e .csv<br>Detecta cabeçalhos automaticamente (ex.: Número, Nome)</p>
      </div>
    </div>

    <div class="card hidden" id="preview-card">
      <div class="card-title">Alunos Importados — <span id="student-count">0</span> alunos</div>
      <div class="student-grid" id="student-preview"></div>
      <div class="btn-group">
        <button class="btn btn-primary" onclick="goToStep(2)">Continuar →</button>
      </div>
    </div>
  </div>

  <!-- Panel 2: Configure -->
  <div class="panel" id="panel-2">
    <div class="card">
      <div class="card-title">Modo de Criação</div>
      <div class="mode-tabs">
        <div class="mode-tab active" id="mode-random" onclick="selectMode('random')">
          <div class="mode-icon">🎲</div>
          <div class="mode-label">Aleatório</div>
          <div class="mode-desc">Distribuição automática</div>
        </div>
        <div class="mode-tab" id="mode-manual" onclick="selectMode('manual')">
          <div class="mode-icon">✋</div>
          <div class="mode-label">Manual</div>
          <div class="mode-desc">Drag &amp; drop personalizado</div>
        </div>
      </div>

      <div class="config-grid">
        <div class="field">
          <label>Método de definição</label>
          <select id="config-method" onchange="updateConfigUI()">
            <option value="num-groups">Número de grupos</option>
            <option value="per-group">Alunos por grupo</option>
          </select>
        </div>
        <div class="field">
          <label id="config-label">Nº de grupos</label>
          <input type="number" id="config-value" value="4" min="1" />
        </div>
      </div>

      <div id="config-preview" style="margin-top:16px; color: var(--muted); font-size:13px;"></div>

      <div class="btn-group">
        <button class="btn btn-secondary" onclick="goToStep(1)">← Voltar</button>
        <button class="btn btn-primary" onclick="generateGroups()">Gerar Grupos →</button>
      </div>
    </div>
  </div>

  <!-- Panel 3: Organize -->
  <div class="panel" id="panel-3">
    <div class="stats-bar" id="stats-bar">
      <div class="stat">
        <div class="stat-dot" style="background: var(--accent)"></div>
        <span class="stat-label">Total:</span>
        <span class="stat-value" id="stat-total">0</span>
      </div>
      <div class="stat">
        <div class="stat-dot" style="background: var(--accent3)"></div>
        <span class="stat-label">Atribuídos:</span>
        <span class="stat-value" id="stat-assigned">0</span>
      </div>
      <div class="stat">
        <div class="stat-dot" style="background: var(--accent2)"></div>
        <span class="stat-label">Por atribuir:</span>
        <span class="stat-value" id="stat-unassigned">0</span>
      </div>
      <div style="margin-left:auto;">
        <button class="btn btn-secondary" style="padding:6px 14px; font-size:12px;" onclick="shuffleAll()">🔀 Baralhar</button>
      </div>
    </div>

    <!-- Unassigned pool (manual mode) -->
    <div class="card pool-card hidden" id="pool-card">
      <div class="card-title">
        <span>Alunos Não Atribuídos</span>
        <span class="pool-badge" id="pool-count">0</span>
      </div>
      <div class="student-grid" id="pool-zone" style="max-height:180px;"></div>
    </div>

    <!-- Groups -->
    <div class="groups-grid" id="groups-container"></div>

    <div class="btn-group" style="margin-top:20px;">
      <button class="btn btn-secondary" onclick="goToStep(2)">← Reconfigurar</button>
      <button class="btn btn-success" onclick="openConfirmModal()">✓ Finalizar Grupos</button>
    </div>
  </div>

  <!-- Panel 4: Export -->
  <div class="panel" id="panel-4">
    <div class="card email-config">
      <div class="card-title">📧 Notificação por Email</div>
      <div class="config-grid">
        <div class="field">
          <label>Email do Professor</label>
          <input type="email" id="teacher-email" placeholder="professor@escola.pt" />
        </div>
        <div class="field">
          <label>Nome do Professor</label>
          <input type="text" id="teacher-name" placeholder="Prof. Silva" />
        </div>
        <div class="field" style="grid-column: 1/-1;">
          <label>Turma / Disciplina (opcional)</label>
          <input type="text" id="class-name" placeholder="Ex: Matemática — 10ºA" />
        </div>
      </div>
      <div class="btn-group">
        <button class="btn btn-success" onclick="exportAndSend(this)">
          ⬇️ Exportar Excel &amp; Enviar Email
        </button>
        <button class="btn btn-secondary" onclick="downloadExcelOnly()">
          ⬇️ Apenas Exportar Excel
        </button>
      </div>
    </div>

    <div class="card">
      <div class="card-title">Resumo dos Grupos</div>
      <div id="export-summary"></div>
    </div>

    <div class="btn-group">
      <button class="btn btn-secondary" onclick="goToStep(3)">← Voltar aos Grupos</button>
      <button class="btn btn-primary" onclick="startOver()">🔄 Nova Sessão</button>
    </div>
  </div>

</div>

<!-- Confirmation Modal -->
<div class="modal-overlay" id="confirm-modal">
  <div class="modal">
    <h2>✅ Confirmar Grupos</h2>
    <p id="confirm-msg">Tens a certeza que queres finalizar os grupos?</p>
    <div id="confirm-unassigned-warning" class="hidden" style="padding:12px; background:rgba(255,107,107,0.1); border:1px solid rgba(255,107,107,0.3); border-radius:8px; color:var(--accent2); font-size:13px; margin-bottom:16px;"></div>
    <div class="btn-group">
      <button class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
      <button class="btn btn-success" onclick="confirmGroups()">Confirmar ✓</button>
    </div>
  </div>
</div>

<div class="toast-container" id="toast-container"></div>

<script>
// ─── State ───────────────────────────────────────────────────────────────────
let students = [];
let groups = {};  // { groupId: [studentName, ...] }
let unassigned = [];
let mode = 'random';
let currentStep = 1;
let dragSrc = null;

// ─── Navigation ──────────────────────────────────────────────────────────────
function goToStep(n) {
  document.querySelectorAll('.panel').forEach((p,i) => {
    p.classList.toggle('visible', i+1 === n);
  });
  document.querySelectorAll('.step').forEach((s,i) => {
    s.classList.remove('active','done');
    if (i+1 === n) s.classList.add('active');
    if (i+1 < n) s.classList.add('done');
  });
  currentStep = n;
  if (n === 4) renderExportSummary();
}

// ─── Upload & Parse ───────────────────────────────────────────────────────────
const uploadZone = document.getElementById('upload-zone');
const fileInput = document.getElementById('file-input');

uploadZone.addEventListener('dragover', e => { e.preventDefault(); uploadZone.classList.add('drag-over'); });
uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('drag-over'));
uploadZone.addEventListener('drop', e => {
  e.preventDefault();
  uploadZone.classList.remove('drag-over');
  const file = e.dataTransfer.files[0];
  if (file) parseFile(file);
});
fileInput.addEventListener('change', e => {
  if (e.target.files[0]) parseFile(e.target.files[0]);
});

function normalizeHeader(text) {
  return String(text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
}

function detectDelimiter(line) {
  const candidates = [',', ';', '\t'];
  let best = ',';
  let maxCount = -1;
  for (const d of candidates) {
    const count = line.split(d).length - 1;
    if (count > maxCount) { maxCount = count; best = d; }
  }
  return best;
}

function parseDelimitedRows(text) {
  const lines = String(text || '').split(/\r?\n/).filter(l => l.trim());
  if (!lines.length) return [];
  const delimiter = detectDelimiter(lines[0]);
  return lines.map(line => line.split(delimiter).map(c => c.trim()));
}

function looksLikeNumericCode(value) {
  return /^\d+(?:[\s.-]\d+)*$/.test(String(value || '').trim());
}

function extractNamesFromRows(rows) {
  if (!rows || !rows.length) return [];

  const headerAliases = ['nome', 'nomes', 'name', 'names', 'aluno', 'alunos', 'student', 'students'];
  let headerRow = -1;
  let nameCol = -1;

  for (let i = 0; i < Math.min(5, rows.length); i++) {
    const row = rows[i] || [];
    for (let c = 0; c < row.length; c++) {
      const cell = normalizeHeader(row[c]);
      if (headerAliases.includes(cell)) {
        headerRow = i;
        nameCol = c;
        break;
      }
    }
    if (headerRow !== -1) break;
  }

  const dataStart = headerRow !== -1 ? headerRow + 1 : 0;
  const dataRows = rows.slice(dataStart).filter(r => Array.isArray(r) && r.length);
  if (!dataRows.length) return [];

  if (nameCol === -1) {
    const maxCols = Math.max(...dataRows.map(r => r.length));
    let bestCol = 0;
    let bestScore = -Infinity;

    for (let c = 0; c < maxCols; c++) {
      let score = 0;
      for (const row of dataRows.slice(0, 80)) {
        const value = String(row[c] ?? '').trim();
        if (!value) continue;
        if (/[A-Za-zÀ-ÖØ-öø-ÿ]/.test(value)) score += 2;
        if (looksLikeNumericCode(value)) score -= 1;
      }
      if (score > bestScore) {
        bestScore = score;
        bestCol = c;
      }
    }
    nameCol = bestCol;
  }

  const names = dataRows
    .map(row => String(row[nameCol] ?? '').trim())
    .filter(Boolean)
    .filter(value => !looksLikeNumericCode(value));

  return [...new Set(names)];
}

function parseFile(file) {
  const ext = file.name.split('.').pop().toLowerCase();
  const reader = new FileReader();

  reader.onload = e => {
    try {
      let names = [];
      if (ext === 'csv') {
        const rows = parseDelimitedRows(e.target.result);
        names = extractNamesFromRows(rows);
      } else {
        const wb = XLSX.read(e.target.result, { type: 'array' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1, raw: false, defval: '' });
        names = extractNamesFromRows(data);
      }

      if (names.length === 0) { toast('Nenhum nome de aluno encontrado no ficheiro!', 'error'); return; }

      students = names.map(n => String(n).trim());
      renderPreview();
      toast(\`\${students.length} alunos importados com sucesso!\`, 'success');
    } catch(err) {
      toast('Erro ao ler o ficheiro: ' + err.message, 'error');
    }
  };

  if (ext === 'csv') reader.readAsText(file);
  else reader.readAsArrayBuffer(file);
}

function getInitials(name) {
  return name.split(' ').slice(0,2).map(p => p[0]?.toUpperCase() || '').join('');
}

function renderPreview() {
  const grid = document.getElementById('student-preview');
  grid.innerHTML = students.map(s => \`
    <div class="student-chip">
      <div class="student-avatar">\${getInitials(s)}</div>
      <span>\${s}</span>
    </div>
  \`).join('');
  document.getElementById('student-count').textContent = students.length;
  document.getElementById('preview-card').classList.remove('hidden');
}

// ─── Configuration ───────────────────────────────────────────────────────────
function selectMode(m) {
  mode = m;
  document.getElementById('mode-random').classList.toggle('active', m === 'random');
  document.getElementById('mode-manual').classList.toggle('active', m === 'manual');
}

function updateConfigUI() {
  const method = document.getElementById('config-method').value;
  const label = document.getElementById('config-label');
  label.textContent = method === 'num-groups' ? 'Nº de grupos' : 'Alunos por grupo';
  updateConfigPreview();
}

function updateConfigPreview() {
  const method = document.getElementById('config-method').value;
  const val = parseInt(document.getElementById('config-value').value) || 0;
  const n = students.length;
  if (!n || !val) return;

  let groups, perGroup, rem;
  if (method === 'num-groups') {
    groups = val;
    perGroup = Math.floor(n / val);
    rem = n % val;
  } else {
    perGroup = val;
    groups = Math.ceil(n / val);
    rem = n % val;
  }

  const preview = document.getElementById('config-preview');
  preview.innerHTML = \`→ \${groups} grupo(s) · ~\${perGroup} alunos cada\${rem ? \` (\${rem} grupo(s) com \${perGroup+1})\` : ''}\`;
}

document.getElementById('config-value').addEventListener('input', updateConfigPreview);
document.getElementById('config-method').addEventListener('change', updateConfigPreview);

function generateGroups() {
  const method = document.getElementById('config-method').value;
  const val = parseInt(document.getElementById('config-value').value);
  const n = students.length;

  if (!val || val < 1) { toast('Introduz um valor válido!', 'error'); return; }

  let numGroups;
  if (method === 'num-groups') numGroups = Math.min(val, n);
  else numGroups = Math.ceil(n / val);

  groups = {};
  for (let i = 1; i <= numGroups; i++) groups['G' + i] = [];

  if (mode === 'random') {
    const shuffled = [...students].sort(() => Math.random() - 0.5);
    shuffled.forEach((s, i) => {
      const gid = 'G' + ((i % numGroups) + 1);
      groups[gid].push(s);
    });
    unassigned = [];
  } else {
    // manual: start empty, pool has everyone
    unassigned = [...students];
  }

  renderOrganizePanel();
  goToStep(3);
}

// ─── Organize Panel ───────────────────────────────────────────────────────────
function renderOrganizePanel() {
  renderGroups();
  if (mode === 'manual') {
    document.getElementById('pool-card').classList.remove('hidden');
    renderPool();
  } else {
    document.getElementById('pool-card').classList.add('hidden');
  }
  updateStats();
}

function renderPool() {
  const zone = document.getElementById('pool-zone');
  zone.innerHTML = unassigned.length
    ? unassigned.map(s => makeChipHTML(s, 'pool', 'pool')).join('')
    : '<div class="group-empty">Todos atribuídos! 🎉</div>';
  document.getElementById('pool-count').textContent = unassigned.length;
  setupDragListeners();
}

function renderGroups() {
  const container = document.getElementById('groups-container');
  container.innerHTML = Object.entries(groups).map(([gid, members]) => \`
    <div class="group-card" id="card-\${gid}"
      ondragover="onDragOver(event, '\${gid}')"
      ondragleave="onDragLeave('\${gid}')"
      ondrop="onDrop(event, '\${gid}')">
      <div class="group-card-header">
        <span class="group-name">Grupo \${gid.replace('G','')}</span>
        <span class="group-count">\${members.length} aluno(s)</span>
      </div>
      <div class="group-drop-zone" id="zone-\${gid}">
        \${members.length
          ? members.map(s => makeChipHTML(s, gid, gid)).join('')
          : '<div class="group-empty">Arrasta alunos aqui</div>'
        }
      </div>
    </div>
  \`).join('');
  setupDragListeners();
}

function makeChipHTML(name, sourceId, zone) {
  return \`<div class="student-chip"
    draggable="true"
    data-name="\${escapeAttr(name)}"
    data-source="\${sourceId}"
    data-zone="\${zone}">
    <div class="student-avatar">\${getInitials(name)}</div>
    <span>\${name}</span>
  </div>\`;
}

function escapeAttr(str) {
  return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function setupDragListeners() {
  document.querySelectorAll('.student-chip[draggable]').forEach(chip => {
    chip.addEventListener('dragstart', onDragStart);
    chip.addEventListener('dragend', onDragEnd);
  });
}

// ─── Drag & Drop ─────────────────────────────────────────────────────────────
function onDragStart(e) {
  dragSrc = {
    name: this.dataset.name,
    source: this.dataset.source,
    zone: this.dataset.zone
  };
  this.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
}

function onDragEnd(e) {
  this.classList.remove('dragging');
}

function onDragOver(e, gid) {
  e.preventDefault();
  document.getElementById('card-' + gid)?.classList.add('drag-target');
}

function onDragLeave(gid) {
  document.getElementById('card-' + gid)?.classList.remove('drag-target');
}

function onDrop(e, targetGid) {
  e.preventDefault();
  document.getElementById('card-' + targetGid)?.classList.remove('drag-target');
  if (!dragSrc) return;

  const { name, source } = dragSrc;

  // Remove from source
  if (source === 'pool') {
    unassigned = unassigned.filter(s => s !== name);
  } else {
    groups[source] = groups[source].filter(s => s !== name);
  }

  // Add to target
  if (!groups[targetGid].includes(name)) {
    groups[targetGid].push(name);
  }

  dragSrc = null;
  renderOrganizePanel();
}

// Pool drop
document.addEventListener('DOMContentLoaded', () => {
  const pool = document.getElementById('pool-zone');
  if (pool) {
    pool.addEventListener('dragover', e => { e.preventDefault(); });
    pool.addEventListener('drop', e => {
      e.preventDefault();
      if (!dragSrc || dragSrc.source === 'pool') return;
      const { name, source } = dragSrc;
      groups[source] = groups[source].filter(s => s !== name);
      if (!unassigned.includes(name)) unassigned.push(name);
      dragSrc = null;
      renderOrganizePanel();
    });
  }
});

// Also setup pool drag-drop after render
function setupPoolDrop() {
  const pool = document.getElementById('pool-zone');
  if (pool) {
    pool.ondragover = e => e.preventDefault();
    pool.ondrop = e => {
      e.preventDefault();
      if (!dragSrc || dragSrc.source === 'pool') return;
      const { name, source } = dragSrc;
      groups[source] = groups[source].filter(s => s !== name);
      if (!unassigned.includes(name)) unassigned.push(name);
      dragSrc = null;
      renderOrganizePanel();
    };
  }
}

// ─── Stats ────────────────────────────────────────────────────────────────────
function updateStats() {
  const assigned = Object.values(groups).reduce((a,g) => a + g.length, 0);
  const total = students.length;
  document.getElementById('stat-total').textContent = total;
  document.getElementById('stat-assigned').textContent = assigned;
  document.getElementById('stat-unassigned').textContent = total - assigned;
  setupPoolDrop();
}

function shuffleAll() {
  const allStudents = [...Object.values(groups).flat(), ...unassigned].sort(() => Math.random() - 0.5);
  const keys = Object.keys(groups);
  keys.forEach(k => groups[k] = []);
  allStudents.forEach((s, i) => groups[keys[i % keys.length]].push(s));
  unassigned = [];
  renderOrganizePanel();
  toast('Grupos baralhados!', 'info');
}

// ─── Confirm & Export ─────────────────────────────────────────────────────────
function openConfirmModal() {
  const assigned = Object.values(groups).reduce((a,g) => a + g.length, 0);
  const total = students.length;
  const remaining = total - assigned;

  const warning = document.getElementById('confirm-unassigned-warning');
  const msg = document.getElementById('confirm-msg');

  if (remaining > 0) {
    warning.classList.remove('hidden');
    warning.textContent = \`⚠️ \${remaining} aluno(s) ainda não foram atribuídos a nenhum grupo!\`;
    msg.textContent = 'Tens a certeza que queres finalizar? Alguns alunos ficarão sem grupo.';
  } else {
    warning.classList.add('hidden');
    msg.textContent = \`Todos os \${total} alunos estão atribuídos. Confirmar a criação dos grupos?\`;
  }

  document.getElementById('confirm-modal').classList.add('open');
}

function closeModal() {
  document.getElementById('confirm-modal').classList.remove('open');
}

function confirmGroups() {
  closeModal();
  goToStep(4);
}

function renderExportSummary() {
  const summary = document.getElementById('export-summary');
  summary.innerHTML = Object.entries(groups).map(([gid, members]) => \`
    <div style="margin-bottom:16px;">
      <div style="font-family:'Syne',sans-serif; font-weight:700; margin-bottom:8px; color:var(--accent);">
        Grupo \${gid.replace('G','')} <span style="font-size:12px; color:var(--muted); font-family:'DM Mono',monospace;">(\${members.length} alunos)</span>
      </div>
      <div style="display:flex; flex-wrap:wrap; gap:6px;">
        \${members.map(s => \`<span style="padding:4px 10px; background:var(--surface2); border:1px solid var(--border); border-radius:6px; font-size:12px;">\${s}</span>\`).join('')}
        \${members.length === 0 ? '<span style="color:var(--muted); font-size:12px;">Grupo vazio</span>' : ''}
      </div>
    </div>
  \`).join('') + (unassigned.length ? \`
    <div style="padding:12px; background:rgba(255,107,107,0.08); border:1px solid rgba(255,107,107,0.3); border-radius:8px; margin-top:8px;">
      <div style="color:var(--accent2); font-size:12px; margin-bottom:6px;">⚠️ Não atribuídos</div>
      <div style="display:flex; flex-wrap:wrap; gap:6px;">
        \${unassigned.map(s => \`<span style="padding:4px 10px; background:rgba(255,107,107,0.1); border:1px solid rgba(255,107,107,0.3); border-radius:6px; font-size:12px;">\${s}</span>\`).join('')}
      </div>
    </div>\` : '');
}

function buildExcelWorkbook() {
  const wb = XLSX.utils.book_new();
  const wsData = [];

  // Summary sheet
  Object.entries(groups).forEach(([gid, members]) => {
    wsData.push([\`Grupo \${gid.replace('G','')}\`]);
    members.forEach(m => wsData.push([m]));
    wsData.push([]);
  });

  if (unassigned.length) {
    wsData.push(['Não Atribuídos']);
    unassigned.forEach(m => wsData.push([m]));
  }

  const ws = XLSX.utils.aoa_to_sheet(wsData);
  ws['!cols'] = [{ wch: 35 }];

  // Style group headers
  let row = 0;
  Object.entries(groups).forEach(([gid, members]) => {
    const cellRef = XLSX.utils.encode_cell({ r: row, c: 0 });
    if (!ws[cellRef]) ws[cellRef] = {};
    ws[cellRef].s = { font: { bold: true, color: { rgb: '6C63FF' } }, fill: { fgColor: { rgb: 'F0EEFF' } } };
    row += members.length + 2;
  });

  XLSX.utils.book_append_sheet(wb, ws, 'Grupos');

  // Per-group sheets
  Object.entries(groups).forEach(([gid, members]) => {
    const sheetData = [[\`Grupo \${gid.replace('G','')}\`], ...members.map(m => [m])];
    const s = XLSX.utils.aoa_to_sheet(sheetData);
    s['!cols'] = [{ wch: 35 }];
    XLSX.utils.book_append_sheet(wb, s, \`Grupo \${gid.replace('G','')}\`);
  });

  return wb;
}

function downloadExcelOnly() {
  const wb = buildExcelWorkbook();
  XLSX.writeFile(wb, 'grupos_alunos.xlsx');
  toast('Excel exportado com sucesso!', 'success');
}

async function exportAndSend(btnEl) {
  const email = document.getElementById('teacher-email').value.trim();
  const name = document.getElementById('teacher-name').value.trim();
  const className = document.getElementById('class-name').value.trim();

  if (!email) { toast('Introduz o email do professor!', 'error'); return; }

  // Build Excel
  const wb = buildExcelWorkbook();
  const excelBuf = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });

  // Prepare groups summary for email
  const groupsSummary = Object.entries(groups).map(([gid, members]) =>
    \`Grupo \${gid.replace('G','')}: \${members.join(', ')}\`
  ).join('\\n');

  const btn = btnEl || document.querySelector('.btn.btn-success[onclick*="exportAndSend"]');
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span> A enviar...';

  try {
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: email,
        teacherName: name,
        className,
        groupsSummary,
        excelBase64: excelBuf,
        groupCount: Object.keys(groups).length,
        studentCount: students.length
      })
    });

    const data = await res.json();

    if (data.ok) {
      // Also download locally
      XLSX.writeFile(wb, 'grupos_alunos.xlsx');
      toast('Email enviado e Excel exportado!', 'success');
    } else {
      toast('Email: ' + (data.error || 'Erro desconhecido') + '. A fazer download local...', 'error');
      XLSX.writeFile(wb, 'grupos_alunos.xlsx');
    }
  } catch(err) {
    toast('Erro de rede. A fazer download local...', 'error');
    XLSX.writeFile(wb, 'grupos_alunos.xlsx');
  }

  btn.disabled = false;
  btn.innerHTML = '⬇️ Exportar Excel &amp; Enviar Email';
}

function startOver() {
  students = []; groups = {}; unassigned = []; mode = 'random';
  document.getElementById('student-preview').innerHTML = '';
  document.getElementById('preview-card').classList.add('hidden');
  document.getElementById('file-input').value = '';
  goToStep(1);
}

// ─── Toasts ───────────────────────────────────────────────────────────────────
function toast(msg, type = 'info') {
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  const el = document.createElement('div');
  el.className = \`toast \${type}\`;
  el.innerHTML = \`<span>\${icons[type]}</span><span>\${msg}</span>\`;
  document.getElementById('toast-container').appendChild(el);
  setTimeout(() => el.remove(), 4000);
}

// ─── Init ─────────────────────────────────────────────────────────────────────
updateConfigPreview();

// Fix dragstart scope
document.addEventListener('dragstart', function(e) {
  const chip = e.target.closest('.student-chip[draggable]');
  if (!chip) return;
  dragSrc = {
    name: chip.dataset.name,
    source: chip.dataset.source,
    zone: chip.dataset.zone
  };
  chip.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
});

document.addEventListener('dragend', function(e) {
  const chip = e.target.closest('.student-chip');
  if (chip) chip.classList.remove('dragging');
});
</script>
</body>
</html>`;

// ─── Email sending via Mailchannels (free for CF Workers) ──────────────────
async function sendEmail(payload, env) {
  const { to, teacherName, className, groupsSummary, excelBase64, groupCount, studentCount } = payload || {};

  if (!to || !excelBase64 || !Number.isFinite(groupCount) || !Number.isFinite(studentCount)) {
    return { ok: false, error: "Payload de email inválido" };
  }

  const fromEmail = env?.MAIL_FROM || "noreply@gestor-grupos.local";
  const fromName = env?.MAIL_FROM_NAME || "Gestor de Grupos";
  // Build email body
  const subject = `Grupos Criados${className ? ' — ' + className : ''}`;
  const textBody = `Olá${teacherName ? ' ' + teacherName : ''},

Os grupos de alunos foram criados com sucesso!

${className ? 'Turma/Disciplina: ' + className + '\n' : ''}Número de grupos: ${groupCount}
Total de alunos: ${studentCount}

Resumo dos grupos:
${groupsSummary}

Em anexo encontra o ficheiro Excel com os grupos formados.

Gestor de Grupos de Alunos`;

  const htmlBody = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <div style="background: linear-gradient(135deg, #6c63ff, #ff6b6b); padding: 24px; border-radius: 12px 12px 0 0;">
      <h1 style="color: white; margin: 0; font-size: 22px;">🎓 Gestor de Grupos</h1>
      <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0;">Plataforma de criação de grupos para professores</p>
    </div>
    <div style="background: #f9f9ff; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e0e0f0;">
      <p>Olá${teacherName ? ' <strong>' + teacherName + '</strong>' : ''},</p>
      <p>Os grupos de alunos foram criados com sucesso! ✅</p>
      ${className ? `<p><strong>Turma/Disciplina:</strong> ${className}</p>` : ''}
      <div style="background: white; border: 1px solid #e0e0f0; border-radius: 8px; padding: 16px; margin: 16px 0;">
        <p style="margin:0 0 8px; font-weight: bold; color: #6c63ff;">📊 Resumo</p>
        <p style="margin:0;">🏷️ Número de grupos: <strong>${groupCount}</strong></p>
        <p style="margin:4px 0 0;">👥 Total de alunos: <strong>${studentCount}</strong></p>
      </div>
      <p>O ficheiro Excel com os grupos completos está em anexo.</p>
      <hr style="border: none; border-top: 1px solid #e0e0f0; margin: 20px 0;">
      <p style="color: #999; font-size: 12px;">Enviado pelo Gestor de Grupos</p>
    </div>
  </div>`;

  // Try MailChannels provider
  const response = await fetch('https://api.mailchannels.net/tx/v1/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to, name: teacherName || to }] }],
      from: { email: fromEmail, name: fromName },
      subject,
      content: [
        { type: 'text/plain', value: textBody },
        { type: 'text/html', value: htmlBody }
      ],
      attachments: [
        {
          filename: 'grupos_alunos.xlsx',
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          content: excelBase64,
          disposition: 'attachment'
        }
      ]
    })
  });

  if (response.ok || response.status === 202) {
    return { ok: true };
  }

  const errText = await response.text();
  return { ok: false, error: `MailChannels: ${response.status} — ${errText.slice(0,120)}` };
}

// ─── Worker Handler ────────────────────────────────────────────────────────────
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const commonHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'X-Content-Type-Options': 'nosniff'
    };

    // Healthcheck endpoint
    if (url.pathname === '/health') {
      return new Response(JSON.stringify({ ok: true, service: 'gestor-grupos' }), {
        headers: { ...commonHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Serve frontend
    if (url.pathname === '/' || url.pathname === '') {
      return new Response(HTML_PAGE, {
        headers: { ...commonHeaders, 'Content-Type': 'text/html; charset=utf-8' }
      });
    }

    // Email API endpoint
    if (url.pathname === '/api/send-email' && request.method === 'POST') {
      try {
        const body = await request.json();
        const result = await sendEmail(body, env);
        return new Response(JSON.stringify(result), {
          headers: { ...commonHeaders, 'Content-Type': 'application/json' }
        });
      } catch (err) {
        return new Response(JSON.stringify({ ok: false, error: err.message }), {
          status: 500,
          headers: { ...commonHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: commonHeaders });
    }

    return new Response('Not Found', { status: 404, headers: commonHeaders });
  }
};
