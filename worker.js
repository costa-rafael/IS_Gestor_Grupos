const APP_HTML = `<!doctype html>
<html lang="pt">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Gestor de Grupos Premium</title>
  <script src="https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js"></script>
  <style>
    :root { 
      --primary: #fbb702;
      --primary-hover: #e0a400;
      --bg: #f5f5f7;
      --card-bg: #ffffff;
      --border: rgba(0,0,0,0.06);
      --text-main: #1d1d1f;
      --text-muted: #86868b;
      --danger: #ff3b30;
      --success: #34c759;
    }
    
    * { box-sizing: border-box; }
    
    body { 
      margin: 0; 
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: var(--bg);
      color: var(--text-main);
      height: 100vh;
      display: flex;
      flex-direction: column;
      overflow: hidden; /* No page scroll */
      -webkit-font-smoothing: antialiased;
    }

    .wrap { 
      width: 100%;
      max-width: 1200px; 
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      flex: 1;
      overflow: hidden;
      padding: 20px;
    }
    
    .header-section { margin-bottom: 8px; text-align: center; flex-shrink: 0; }
    h1 { 
      margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.03em; 
      background: linear-gradient(135deg, #1d1d1f 60%, #434344);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }
    p.subtitle { margin: 2px 0 0; font-size: 13px; color: var(--text-muted); font-weight: 400; }
    
    /* Segmented Control (Apple Style) */
    .segmented-control {
      display: flex; background: #e3e3e8; padding: 4px; border-radius: 12px;
      margin-top: 8px; width: 100%; border: 1px solid rgba(0,0,0,0.02);
      gap: 2px;
    }
    .segmented-control .option {
      flex: 1; text-align: center; padding: 10px; border-radius: 9px; cursor: pointer;
      font-size: 14px; font-weight: 600; color: #48484a; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .segmented-control .option:hover:not(.active) { background: rgba(0,0,0,0.04); }
    .segmented-control .option.active {
      background: #ffffff; color: #1d1d1f; box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }
    
    /* Apple Stepper */
    .apple-stepper {
      display: flex; align-items: center; background: #e3e3e8; 
      border-radius: 12px; padding: 4px; margin-top: 8px; width: fit-content;
    }
    .apple-stepper button {
      background: #ffffff; color: #1d1d1f; border-radius: 12px; 
      width: 44px; height: 44px; padding: 0; box-shadow: 0 1px 4px rgba(0,0,0,0.06);
      font-size: 20px; font-weight: 500;
    }
    .apple-stepper button:hover { background: #fdfdfd; transform: translateY(0) !important; box-shadow: 0 2px 6px rgba(0,0,0,0.08); }
    .apple-stepper input {
      border: none !important; background: transparent !important; text-align: center; width: 60px;
      font-size: 20px; font-weight: 700; padding: 0 !important; color: #1d1d1f; pointer-events: none;
      height: 44px; line-height: 44px;
    }
    
    /* Hide Spinners in stepper */
    .apple-stepper input::-webkit-outer-spin-button,
    .apple-stepper input::-webkit-inner-spin-button {
      -webkit-appearance: none; margin: 0;
    }
    .apple-stepper input[type=number] {
      -moz-appearance: textfield;
    }
    
    @keyframes popIn {
      from { transform: scale(0.85) translateY(10px); opacity: 0; }
      to { transform: scale(1) translateY(0); opacity: 1; }
    }
    
    /* File Icon Dashboard Step 4 */
    .file-icon {
      width: 66px; height: 84px; background: #ffffff; border: 2px solid #e1e4e8;
      border-radius: 6px; position: relative; display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.03); margin-top: 10px;
    }
    .file-corner {
      width: 0; height: 0; border-style: solid; border-width: 0 16px 16px 0;
      border-color: transparent #e1e4e8 transparent transparent;
      position: absolute; top: -2px; right: -2px; border-bottom-left-radius: 4px;
    }
    
    /* Stepper */
    .stepper {
      display: flex; justify-content: space-between; position: relative; margin-bottom: 16px;
      max-width: 600px; margin-left: auto; margin-right: auto; flex-shrink: 0;
    }
    .stepper::before {
      content: ''; position: absolute; top: 50%; left: 0; right: 0; height: 1px;
      background: rgba(0,0,0,0.05); z-index: 0; transform: translateY(-50%);
    }
    .step {
      position: relative; z-index: 1;
      background: var(--bg); border: 2px solid rgba(0,0,0,0.05);
      padding: 6px 14px; border-radius: 20px; color: var(--text-muted);
      font-weight: 600; font-size: 13px; transition: all 0.2s;
    }
    .step.active {
      background: var(--primary); border-color: var(--primary); color: #1d1d1f;
    }
    .step.completed {
      background: #e8e8ed; border-color: #e8e8ed; color: var(--text-main);
    }

    /* Panels */
    .wizard-panel { display: none; flex-direction: column; flex: 1; overflow: hidden; animation: fadeIn 0.3s ease; }
    .wizard-panel.active { display: flex; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

    /* Scrollable content inside panels */
    .panel-content { flex: 1; overflow-y: auto; padding-right: 4px; }

    .card { 
      background: var(--card-bg); border: 1px solid var(--border); 
      border-radius: 16px; padding: 24px; margin-bottom: 16px; 
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
      animation: slideUp 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .row { display: flex; gap: 16px; flex-wrap: wrap; align-items: center; }
    .row-between { justify-content: space-between; }
    
    label strong { font-size: 16px; font-weight: 600; display: block; margin-bottom: 8px; }
    
    input[type="file"] { display: none; }
    .custom-file-upload {
      border: 1px dashed #d2d2d7; display: inline-block; padding: 18px 24px;
      cursor: pointer; border-radius: 12px; background: #fafafa;
      transition: all 0.2s; color: var(--text-main); font-weight: 500; flex-grow: 1; text-align: center;
    }
    .custom-file-upload:hover { border-color: var(--primary); background: #fdfcf8; }
    
    #studentChecklist::-webkit-scrollbar { display: none; }
    #studentChecklist { scrollbar-width: none; }
    
    * { -ms-overflow-style: none !important; scrollbar-width: none !important; }
    *::-webkit-scrollbar { display: none !important; }
    
    input[type="text"], input[type="number"], input[type="email"], select, textarea { 
      background: #fff; border: 1px solid #d2d2d7; 
      border-radius: 10px; padding: 12px 14px; font-size: 15px; color: var(--text-main);
      font-family: inherit; transition: border-color 0.2s;
    }
    input:focus, select:focus, textarea:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 2px rgba(251, 183, 2, 0.2); }
    
    .student-check-item {
      display: flex; align-items: center; gap: 12px; padding: 10px 14px; 
      border-bottom: 1px solid var(--border); transition: background 0.2s;
    }
    .student-check-item:last-child { border-bottom: none; }
    .student-check-item input { accent-color: var(--primary); width: 18px; height: 18px; cursor: pointer; }

    .actions { display: flex; gap: 12px; margin: 16px 0; justify-content: space-between; flex-shrink: 0; }
    .actions.end { justify-content: flex-end; }
    
    button { 
      background: var(--primary); color: #1d1d1f; border: none; border-radius: 18px; padding: 10px 20px;
      font-size: 15px; font-weight: 600; font-family: inherit; cursor: pointer; 
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); display: inline-flex; align-items: center; gap: 6px; justify-content: center;
    }
    button:hover:not(:disabled) { background: var(--primary-hover); transform: translateY(-2px); box-shadow: 0 4px 12px rgba(251, 183, 2, 0.25); }
    button:active:not(:disabled) { transform: translateY(0); }
    button.alt:hover:not(:disabled) { background: #d2d2d7; box-shadow: 0 4px 12px rgba(0,0,0,0.04); }
    button:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
    
    .pill { 
      background: #f0f0f5; color: var(--text-main); 
      border: 1px solid var(--border); border-radius: 999px; 
      padding: 4px 12px; font-size: 13px; font-weight: 500;
    }
    
    /* Side-by-Side Setup Step 3 */
    .sbs-layout { display: flex; gap: 20px; align-items: stretch; flex: 1; overflow: hidden; height: 100%; }
    .sidebar { width: 320px; display: flex; flex-direction: column; overflow: hidden; }
    .main-grid { flex: 1; overflow-y: auto; padding-right: 4px; }
    .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; align-items: start; }
    
    /* Internal Groups Scrollable */
    .group { 
      background: var(--card-bg); border: 1px solid var(--border); 
      border-radius: 14px; overflow: hidden; box-shadow: 0 1px 4px rgba(0, 0, 0, 0.01);
      display: flex; flex-direction: column; min-height: 120px;
      transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.2s, box-shadow 0.2s;
    }
    .group.drag-over { 
      border-color: var(--primary); border-width: 2px; border-style: dashed; 
      background-color: rgba(251, 183, 2, 0.04); 
      transform: scale(1.02);
      box-shadow: 0 8px 16px rgba(0,0,0,0.05);
    }
    .group-content { flex: 1; padding-bottom: 16px; }
    
    .group h3 { 
      margin: 0; padding: 12px 16px; background: #fbfbfb;
      border-bottom: 1px solid var(--border); font-size: 14px; 
      display: flex; justify-content: space-between; align-items: center; font-weight: 600;
    }
    .member { 
      padding: 10px 16px; border-bottom: 1px solid var(--border); 
      display: flex; justify-content: space-between; align-items: center; 
      transition: all 0.2s ease-out;
      cursor: grab; font-size: 14px;
    }
    .member:active { cursor: grabbing; background: #fafafa; transform: scale(0.98); }
    .member:hover { background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.04); transform: translateX(3px); }
    .member.dragging { opacity: 0.5; transform: scale(0.96) rotate(-1deg) !important; background: #fff !important; box-shadow: 0 4px 12px rgba(0,0,0,0.08) !important; }
    .member:last-child { border-bottom: none; }
    .mono { font-family: "SF Mono", monospace; color: var(--text-muted); font-size: 12px; }
    
    .unassigned-panel { border: 2px dashed #d2d2d7; background: #fafafa; box-shadow: none; flex: 1; display: flex; flex-direction: column; overflow: hidden; }
    .unassigned-panel h3 { background: transparent; }
    .unassigned-panel .group-content { flex: 1; overflow-y: auto; }

    #log { 
      font-size: 14px; margin: 8px 0; padding: 12px; border-radius: 10px; text-align: center; display: none;
      background: #f2f2f7; color: var(--text-main); border: 1px solid var(--border); flex-shrink: 0;
    }
    #log.error { color: var(--danger); background: #fff2f2; border-color: #ffcccc; }

  </style>
</head>
<body>

  <div class="wrap">
    <div class="header-section">
      <h1>SmartGroups</h1>
      <p class="subtitle">Organize equipas de forma rápida e inteligente</p>
    </div>

    <!-- Stepper Navigation -->
    <div class="stepper">
      <div class="step active" id="st-1">1. Importar</div>
      <div class="step" id="st-2">2. Configurar</div>
      <div class="step" id="st-3">3. Resultados</div>
      <div class="step" id="st-4">4. Partilhar</div>
    </div>
    
    <div id="log"></div>

    <!-- Step 1: Import -->
    <div id="panel-1" class="wizard-panel active">
      <!-- Top Action -->
      <div class="actions end">
        <button id="btnNext1_top" onclick="goToStep(2)" disabled>Continuar</button>
      </div>

      <div class="panel-content">
        <div style="max-width: 600px; margin: 0 auto; width: 100%;">
          <section class="card">
            <label><strong>Selecione a pauta de alunos</strong></label>
            <div class="row" style="margin-top: 16px;">
              <label class="custom-file-upload" style="padding: 40px 20px; width: 100%;">
                <input id="file" type="file" accept=".csv, .xlsx, .xls" />
                <span id="fileName" style="font-size: 15px;">Clique para procurar ou arraste o ficheiro</span>
              </label>
            </div>
            
            <!-- Selection List -->
            <div id="studentSelectionDiv" style="display: none; margin-top: 20px;">
               <div class="row row-between" style="margin-bottom: 12px;">
                  <label style="margin:0;"><strong>Alunos Selecionados (<span id="selCount">0</span>)</strong></label>
                  <button class="alt" style="padding: 6px 14px; font-size: 13px;" onclick="toggleAllStudents()">Inverter Seleção</button>
               </div>
               <div id="studentChecklist" style="background: #fff; border-radius: 12px; border: 1px solid var(--border);">
                 <!-- Checkboxes will appear here -->
               </div>
            </div>
          </section>
        </div>
      </div>

      <!-- Bottom Action -->
      <div class="actions end">
        <button id="btnNext1_bot" onclick="goToStep(2)" disabled>Continuar</button>
      </div>
    </div>

    <!-- Step 2: Configure -->
    <div id="panel-2" class="wizard-panel">
      <!-- Top Action -->
      <div class="actions">
        <button class="alt" onclick="goToStep(1)">Voltar</button>
        <button onclick="generateGroupsAndGoToStep3()">Criar Grupos</button>
      </div>

      <div class="panel-content">
        <div style="max-width: 600px; margin: 0 auto; width: 100%;">
          <section class="card" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
            <label style="margin-bottom: 8px; width: 100%;"><strong>Definições de Agrupamento</strong></label>
            <div style="margin-top: 24px; display: flex; flex-direction: column; gap: 24px; align-items: center; width: 100%;">
              <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; width: 100%;">
                <span style="font-weight: 600; color: #48484a; font-size: 14px;">Tamanho desejado por grupo</span>
                <div class="apple-stepper">
                   <button onclick="adjustSize(-1)">−</button>
                   <input id="size" type="number" min="2" max="50" value="4" readonly style="padding: 0 !important; text-align: center;" />
                   <button onclick="adjustSize(1)">+</button>
                </div>
              </div>
              
              <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; width: 100%;">
                 <span style="font-weight: 600; color: #48484a; font-size: 14px;">Modo de distribuição</span>
                 <div class="segmented-control" id="modeOption" style="max-width: 380px;">
                    <div class="option active" onclick="setMode('random')">Aleatório</div>
                    <div class="option" onclick="setMode('sequential')">Sequencial</div>
                    <div class="option" onclick="setMode('manual')">Manual</div>
                 </div>
                 <input type="hidden" id="selectedMode" value="random" />
              </div>
            </div>
          </section>
        </div>
      </div>

      <!-- Bottom Action -->
      <div class="actions">
        <button class="alt" onclick="goToStep(1)">Voltar</button>
        <button onclick="generateGroupsAndGoToStep3()">Criar Grupos</button>
      </div>
    </div>

    <!-- Step 3: Results -->
    <div id="panel-3" class="wizard-panel">
      <!-- Top Action -->
      <div class="actions" style="margin-bottom: 12px;">
        <div style="display: flex; align-items: center;">
          <button class="alt" onclick="goToStep(2)">⬅ Reconfigurar</button>
          <span id="groupsCount" class="pill" style="margin-left: 8px;">0 grupos</span>
        </div>
        <button onclick="goToStep(4)">Validar e Partilhar ➔</button>
      </div>

      <!-- SBS Layout fills strictly the space -->
      <div class="sbs-layout">
         <!-- Left Sidebar: Unassigned -->
         <div class="sidebar" id="unassignedContainer"></div>
         <!-- Right Area: Groups Grid -->
         <div class="main-grid" id="groups"></div>
      </div>
      
      <!-- Bottom Action -->
      <div class="actions" style="margin-top: 12px;">
        <button class="alt" onclick="goToStep(2)">Reconfigurar</button>
        <button onclick="goToStep(4)">Validar e Partilhar</button>
      </div>
    </div>

    <!-- Step 4: Share -->
    <div id="panel-4" class="wizard-panel">
      <!-- Top Action -->
      <div class="actions">
        <button class="alt" onclick="goToStep(3)">Voltar aos Resultados</button>
        <button class="alt" onclick="resetAll()">Começar de Novo</button>
      </div>

      <div class="panel-content">
        <div style="max-width: 600px; margin: 0 auto; display: flex; flex-direction: column; gap: 20px; width: 100%;">
            <section class="card">
              <label><strong>Enviar por Email</strong></label>
              <div style="margin-top: 16px;">
                 <input type="email" id="emailTo" placeholder="Para: docente@escola.pt" style="width: 100%; margin-bottom: 10px;" />
                 <input type="text" id="emailSubject" value="Grupos de Trabalho" style="width: 100%; margin-bottom: 10px;" />
                 <textarea id="emailBody" rows="10" style="width: 100%; resize: none;" placeholder="Corpo do email..."></textarea>
                 <button id="btnSendMail" onclick="openLocalEmail()" style="width: 100%; margin-top: 10px; padding: 14px; font-size: 16px;">Escrever Email</button>
              </div>
              <div style="margin-top: 24px; text-align: center; border-top: 1px solid var(--border); padding-top: 16px;">
                 <span style="font-size: 13px; color: var(--text-muted); display: block; margin-bottom: 6px;">Também podes guardar localmente as pautas:</span>
                 <button class="alt" onclick="downloadExcel()" style="font-size: 13px; padding: 6px 14px;">Transferir Excel (.xlsx)</button>
              </div>
            </section>
        </div>
      </div>

      <!-- Bottom Action -->
      <div class="actions">
        <button class="alt" onclick="goToStep(3)">Voltar aos Resultados</button>
        <button class="alt" onclick="resetAll()">Começar de Novo</button>
      </div>
    </div>

  </div>

  <script>
    let importedStudents = [];
    let activeStudents = [];
    let activeGroups = [];
    let unassignedStudents = [];

    let currentStep = 1;

    const fileInput = document.getElementById('file');
    const fileNameDisplay = document.getElementById('fileName');
    const logEl = document.getElementById('log');

    fileInput.addEventListener('change', onFile);

    function setLog(msg, isError = false) {
      logEl.style.display = 'block';
      logEl.textContent = msg;
      logEl.className = isError ? 'error' : '';
      if (!isError) {
        setTimeout(() => { if (logEl.textContent === msg) logEl.style.display = 'none'; }, 6000);
      }
    }

    function goToStep(step) {
      document.querySelectorAll('.wizard-panel').forEach(p => p.classList.remove('active'));
      document.getElementById('panel-' + step).classList.add('active');
      
      document.querySelectorAll('.step').forEach((s, idx) => {
         s.classList.remove('active', 'completed');
         if (idx + 1 < step) s.classList.add('completed');
         if (idx + 1 === step) s.classList.add('active');
      });
      currentStep = step;
      logEl.style.display = 'none';

      // Load email template on Step 4
      if (step === 4) {
         document.getElementById('emailBody').value = "Olá,\\n\\nSegue em anexo o ficheiro Excel com os grupos gerados.\\n\\n(Aviso técnico: Por favor, arraste o ficheiro xlsx recém-descarregado para este email antes de enviar.)\\n\\nCumprimentos.";
         if (document.getElementById('statsAlunos')) {
             document.getElementById('statsAlunos').textContent = activeStudents.length;
             document.getElementById('statsGrupos').textContent = activeGroups.length;
         }
      }
    }

    async function onFile(e) {
      const file = e.target.files?.[0];
      if (!file) return;
      fileNameDisplay.textContent = file.name;
      
      try {
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
        
        if (json.length === 0) throw new Error("O ficheiro está vazio.");

        importedStudents = json.map((row, i) => {
          const keys = Object.keys(row);
          const val = (k) => row[k]? String(row[k]).trim() : "";
          let kNome = keys.find(k => /nome|name|aluno/i.test(k)) || keys[0];
          let kNum = keys.find(k => /n(u|ú)mero|num|id/i.test(k));
          let kMail = keys.find(k => /mail/i.test(k));

          return {
            id: 'stu_' + i,
            numero: kNum ? val(kNum) : String(i + 1),
            nome: val(kNome),
            email: kMail ? val(kMail) : ""
          };
        }).filter(s => s.nome.length > 0);

        renderStudentSelection();
        setLog('Ficheiro lido com sucesso!');

      } catch (err) {
        setLog('Erro ao ler ficheiro: ' + err.message, true);
        document.getElementById('btnNext1_top').disabled = document.getElementById('btnNext1_bot').disabled = true;
      }
    }

    function renderStudentSelection() {
        const selDiv = document.getElementById('studentSelectionDiv');
        const listDiv = document.getElementById('studentChecklist');
        selDiv.style.display = 'block';
        listDiv.innerHTML = '';
        
        importedStudents.forEach((s) => {
           const div = document.createElement('div');
           div.className = 'student-check-item';
           div.innerHTML = \\\`<input type="checkbox" id="chk_\\\${s.id}\\\` + '"' + \\\` checked onchange="updateSelectionCount()">
                            <label for="chk_\\\${s.id}\\\` + '"' + \\\` style="cursor:pointer; flex: 1;">
                               \\\${escapeHtml(s.nome)} <span class="muted mono" style="margin-left: 8px;">\\\${escapeHtml(s.numero)}</span>
                            </label>\\\`;
           listDiv.appendChild(div);
        });
        updateSelectionCount();
    }

    function toggleAllStudents() {
        const checkboxes = document.querySelectorAll('#studentChecklist input[type="checkbox"]');
        let allChecked = Array.from(checkboxes).every(chk => chk.checked);
        checkboxes.forEach(chk => chk.checked = !allChecked);
        updateSelectionCount();
    }

    function updateSelectionCount() {
        const count = Array.from(document.querySelectorAll('#studentChecklist input[type="checkbox"]')).filter(c => c.checked).length;
        document.getElementById('selCount').textContent = count;
        document.getElementById('btnNext1_top').disabled = document.getElementById('btnNext1_bot').disabled = (count === 0);
    }

    function setMode(val) {
        document.getElementById('selectedMode').value = val;
        document.querySelectorAll('#modeOption .option').forEach(opt => opt.classList.remove('active'));
        window.event.currentTarget.classList.add('active');
    }

    function adjustSize(val) {
        const el = document.getElementById('size');
        let curr = Number(el.value) + val;
        if (curr >= 2 && curr <= 50) el.value = curr;
    }

    function generateGroupsAndGoToStep3() {
       activeStudents = importedStudents.filter(s => document.getElementById('chk_' + s.id)?.checked);
       if (!activeStudents.length) return setLog('Sem alunos selecionados.', true);
       
       const size = Number(document.getElementById('size').value);
       const mode = document.getElementById('selectedMode').value;

       let list = [...activeStudents];
       activeGroups = []; unassignedStudents = [];
       
       if (mode === 'manual') {
           for (let i = 0; i < Math.ceil(list.length / size); i++) {
              activeGroups.push({ id: 'g_' + i, name: 'Grupo ' + (i + 1), members: [] });
           }
           unassignedStudents = [...list];
       } else {
           if (mode === 'random') {
              for (let i = list.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [list[i], list[j]] = [list[j], list[i]];
              }
           }
           for (let i = 0; i < list.length; i += size) {
             activeGroups.push({ id: 'g_' + activeGroups.length, name: 'Grupo ' + (activeGroups.length + 1), members: list.slice(i, i + size) });
           }
       }
       renderInteractiveGroups();
       goToStep(3);
    }

    function allowDrop(ev) { ev.preventDefault(); ev.currentTarget.classList.add('drag-over'); }
    function leaveDrop(ev) { ev.currentTarget.classList.remove('drag-over'); }
    function drag(ev, studentId, sourceGroupId) { ev.dataTransfer.setData("stuId", studentId); ev.dataTransfer.setData("sourceGroup", sourceGroupId); ev.currentTarget.classList.add('dragging'); }

    function drop(ev, targetGroupId) {
        ev.preventDefault();
        ev.currentTarget.classList.remove('drag-over');
        const stuId = ev.dataTransfer.getData("stuId");
        const sourceGroup = ev.dataTransfer.getData("sourceGroup");
        if (sourceGroup === targetGroupId) return;
        
        let stuObj;
        if (sourceGroup === 'unassigned') {
            const idx = unassignedStudents.findIndex(s => s.id === stuId);
            if(idx > -1) stuObj = unassignedStudents.splice(idx, 1)[0];
        } else {
            const grp = activeGroups.find(g => g.id === sourceGroup);
            if (grp) { const idx = grp.members.findIndex(s => s.id === stuId); if(idx > -1) stuObj = grp.members.splice(idx, 1)[0]; }
        }

        if (!stuObj) return;

        if (targetGroupId === 'unassigned') unassignedStudents.push(stuObj);
        else activeGroups.find(g => g.id === targetGroupId)?.members.push(stuObj);

        renderInteractiveGroups();
    }

    function autoFillRandom() {
       if (!unassignedStudents.length) return;
       let list = [...unassignedStudents];
       for (let i = list.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [list[i], list[j]] = [list[j], list[i]]; }
       unassignedStudents = [];
       let idx = 0;
       while(list.length > 0) { 
          let s = list.pop(); s._isAuto = true;
          activeGroups[idx].members.push(s); 
          idx = (idx + 1) % activeGroups.length; 
       }
       renderInteractiveGroups();
    }

    function renderInteractiveGroups() {
      const groupsEl = document.getElementById('groups');
      const unassignedEl = document.getElementById('unassignedContainer');
      groupsEl.innerHTML = ''; unassignedEl.innerHTML = '';

      // Render Unassigned Sidebar
      const cardU = document.createElement('div');
      cardU.className = 'group unassigned-panel';
      cardU.setAttribute('ondragover', 'allowDrop(event)'); cardU.setAttribute('ondragleave', 'leaveDrop(event)'); cardU.setAttribute('ondrop', "drop(event, 'unassigned')");
      
      let btn = unassignedStudents.length ? \\\`<button onclick="autoFillRandom()" style="font-size:11px; padding: 4px 8px; border-radius:6px;">Auto</button>\\\` : '';
      cardU.innerHTML = \\\`<h3><span>Alunos (<span class="mono">\\\${unassignedStudents.length}</span>)</span> \\\${btn}</h3>\\\`;
      
      const contentU = document.createElement('div'); contentU.className = 'group-content';
      if (!unassignedStudents.length) {
          contentU.innerHTML = \\\`<div style="padding:24px; text-align:center; color:var(--text-muted); font-size:13px;">Tudo organizado.</div>\\\`;
      } else {
          unassignedStudents.forEach(s => {
             contentU.innerHTML += \\\`<div class="member" draggable="true" ondragstart="drag(event, '\\\${s.id}\\\` + "'" + \\\`, 'unassigned')"><span>\\\${escapeHtml(s.nome)}</span><span class="mono">\\\${escapeHtml(s.numero)}</span></div>\\\`;
          });
      }
      cardU.appendChild(contentU); unassignedEl.appendChild(cardU);

      // Render Main Grid groups
      activeGroups.forEach(g => {
         const div = document.createElement('div');
         div.className = 'group';
          div.setAttribute('ondragover', 'allowDrop(event)'); div.setAttribute('ondragleave', 'leaveDrop(event)'); div.setAttribute('ondrop', \\\`drop(event, '\\\${g.id}')\\\`);
          div.innerHTML = \\\`<h3><span style='cursor: text;' title='Duplo-clique para renomear' ondblclick='editGroupName(\"\\\${g.id}\\\")' id='name_\\\${g.id}'>\\\${escapeHtml(g.name)}</span><span class='mono'>\\\${g.members.length}</span></h3>\\\`;
         const cDiv = document.createElement('div'); cDiv.className = 'group-content';
         if (!g.members.length) cDiv.innerHTML = `<div style="padding:20px; color:var(--text-muted); text-align:center; font-size:12px;">Vazio</div>`;
         else g.members.forEach((s, sIdx) => {
              let anim = s._isAuto ? \\\`animation: popIn 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) \\\${sIdx * 0.04}s forwards; opacity: 0;\\\` : '';
              delete s._isAuto;
              cDiv.innerHTML += \\\`<div class='member' style='\\\${anim}\\\` + '\"' + \\\` draggable='true' ondragstart='drag(event, \"\\\${s.id}\\\", \"\\\${g.id}\\\")\' ondragend='this.classList.remove(\"dragging\")\'><span>\\\${escapeHtml(s.nome)}</span><span class='mono'>\\\${escapeHtml(s.numero)}</span></div>\\\`;
         });
         div.appendChild(cDiv); groupsEl.appendChild(div);
      });
      if (document.getElementById('groupsCount')) {
         document.getElementById('groupsCount').textContent = activeGroups.length + ' grupos';
      }
    }

    function editGroupName(id) {
       const span = document.getElementById('name_' + id);
       if (!span) return;
       const curr = span.textContent.trim();
       const input = document.createElement('input');
       input.type = 'text'; input.value = curr;
       input.style.width = '130px'; input.style.padding = '4px 6px'; input.style.fontSize = '14px';
       input.style.border = '1px solid var(--primary)'; input.style.borderRadius = '6px'; input.style.background = '#fff';
       
       span.replaceWith(input); input.focus(); input.select();

       function save() {
          let val = input.value.trim();
          if (!val) val = curr;
          const g = activeGroups.find(x => x.id === id);
          if (g) g.name = val;
          input.replaceWith(span);
          renderInteractiveGroups();
       }

       input.onblur = save;
       input.onkeyup = (e) => { if (e.key === 'Enter') save(); if (e.key === 'Escape') { input.replaceWith(span); renderInteractiveGroups(); } };
    }

    function buildWorkbook() {
       const rows = [];
       activeGroups.forEach(g => g.members.forEach(s => rows.push({ Grupo: g.name, Numero: s.numero, Nome: s.nome, Email: s.email })));
       unassignedStudents.forEach(s => rows.push({ Grupo: 'Sem Grupo', Numero: s.numero, Nome: s.nome, Email: s.email }));
       const ws = XLSX.utils.json_to_sheet(rows); const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, "Grupos"); return wb;
    }

    function downloadExcel() {
       if (!activeGroups.some(g => g.members.length > 0)) return setLog('Não existem alunos em grupos.', true);
       XLSX.writeFile(buildWorkbook(), "Grupos_Atribuidos.xlsx");
    }

    function openLocalEmail() {
        const email = document.getElementById('emailTo').value.trim();
        const subject = encodeURIComponent(document.getElementById('emailSubject').value.trim());
        const body = encodeURIComponent(document.getElementById('emailBody').value);

        if (!activeGroups.some(g => g.members.length > 0)) return setLog('Não existem alunos em grupos para partilhar.', true);

        downloadExcel();
        setTimeout(() => {
          window.location.href = \\\`mailto:\\\${email}?subject=\\\${subject}&body=\\\${body}\\\`;
          setLog('Download efetuado e e-mail carregado!');
        }, 800);
    }

    function escapeHtml(str) { return String(str).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m])); }

    function resetAll() {
      importedStudents = []; activeStudents = []; activeGroups = []; unassignedStudents = [];
      fileInput.value = ''; fileNameDisplay.textContent = 'Clique para procurar ou arraste o ficheiro';
      document.getElementById('btnNext1_top').disabled = document.getElementById('btnNext1_bot').disabled = true;
      document.getElementById('studentSelectionDiv').style.display = 'none';
      goToStep(1); setLog('Reiniciado.');
    }
  </script>
</body>
</html>\`;

export default {
    async fetch(request, env) {
        return new Response(APP_HTML, {
            headers: {
                "content-type": "text/html;charset=UTF-8",
                "x-content-type-options": "nosniff",
                "x-frame-options": "DENY",
                "referrer-policy": "strict-origin-when-cross-origin",
                "cache-control": "no-store, max-age=0"
            }
        });
    }
}
