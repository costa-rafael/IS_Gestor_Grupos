const APP_HTML = `<!DOCTYPE html>
<html lang="pt">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 64 64%27%3E%3Crect width=%2764%27 height=%2764%27 rx=%2714%27 fill=%27%230f766e%27/%3E%3Cpath d=%27M18 22h28v6H24v8h18v6H24v14h-6z%27 fill=%27white%27/%3E%3C/svg%3E"/>
<title>GroupForge — Organizador de Grupos</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;400;500;600;700;800&family=IBM+Plex+Mono:wght@300;400;500&display=swap" rel="stylesheet">
<script>
const XLSX_CDNS=[
  'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js',
  'https://unpkg.com/xlsx@0.18.5/dist/xlsx.full.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'
];
function ensureXlsxLoaded(){
  if(window.XLSX)return Promise.resolve(window.XLSX);
  if(window.__xlsxLoading)return window.__xlsxLoading;
  window.__xlsxLoading=new Promise((resolve,reject)=>{
    let i=0;
    const loadNext=()=>{
      if(i>=XLSX_CDNS.length){window.__xlsxLoading=null;reject(new Error('Não foi possível carregar o motor de leitura Excel. Tenta novamente ou exporta para CSV.'));return;}
      const sc=document.createElement('script');
      const src=XLSX_CDNS[i++];
      let settled=false;
      const finish=(ok)=>{
        if(settled)return;
        settled=true;
        clearTimeout(timer);
        if(ok&&window.XLSX){resolve(window.XLSX);return;}
        sc.remove();
        loadNext();
      };
      const timer=setTimeout(()=>finish(false),8000);
      sc.src=src;
      sc.async=true;
      sc.onload=()=>finish(true);
      sc.onerror=()=>finish(false);
      document.head.appendChild(sc);
    };
    loadNext();
  });
  return window.__xlsxLoading;
}
</script>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#eef3f9;--surface:rgba(255,255,255,0.72);--surface2:rgba(255,255,255,0.88);--surface3:#f4f7fc;
  --border:rgba(148,163,184,0.3);--border2:rgba(100,116,139,0.38);
  --teal:#0f766e;--teal-dim:rgba(15,118,110,0.08);--teal-glow:rgba(15,118,110,0.14);
  --amber:#b45309;--amber-dim:rgba(245,158,11,0.12);
  --red:#b91c1c;--red-dim:rgba(239,68,68,0.1);
  --green:#166534;--green-dim:rgba(34,197,94,0.1);
  --text:#1e293b;--text2:#475569;--text3:#64748b;
  --r:10px;
}
html,body{height:100%;background:radial-gradient(circle at top left,#ffffff 0,#edf3ff 48%,#e4ebf7 100%);color:var(--text);font-family:'Bricolage Grotesque',sans-serif;font-size:14px;line-height:1.5;overflow-x:hidden}
::-webkit-scrollbar{width:5px;height:5px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:var(--border2);border-radius:3px}

.shell{display:flex;height:100vh;overflow:hidden}

/* SIDEBAR */
.sidebar{width:240px;flex-shrink:0;background:var(--surface);backdrop-filter:blur(14px);border-right:1px solid var(--border);display:flex;flex-direction:column}
.sidebar-logo{padding:24px 20px 18px;border-bottom:1px solid var(--border)}
.logo-mark{display:flex;align-items:center;gap:10px;margin-bottom:4px}
.logo-name{font-size:16px;font-weight:700;letter-spacing:-.3px}
.logo-sub{font-family:'IBM Plex Mono',monospace;font-size:9px;color:var(--text3);letter-spacing:1.5px;text-transform:uppercase;margin-left:0}
.sidebar-nav{flex:1;padding:12px 10px;display:flex;flex-direction:column;gap:2px;overflow-y:auto}
.nav-sep{font-family:'IBM Plex Mono',monospace;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--text3);padding:10px 10px 6px}
.nav-item{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:var(--r);font-size:13px;font-weight:500;color:var(--text2);cursor:pointer;transition:all .15s;border:1px solid transparent;user-select:none}
.nav-item:hover{background:var(--surface2);color:var(--text)}
.nav-item.active{background:var(--teal-dim);color:var(--teal);border-color:rgba(45,212,191,.18)}
.nav-item .ni{font-size:14px;width:18px;text-align:center}
.nav-item .nb{margin-left:auto;font-family:'IBM Plex Mono',monospace;font-size:10px;background:var(--surface3);color:var(--text3);padding:1px 6px;border-radius:10px}
.nav-item.active .nb{background:rgba(45,212,191,.15);color:var(--teal)}
.sidebar-footer{padding:14px 16px;border-top:1px solid var(--border);font-family:'IBM Plex Mono',monospace;font-size:10px;color:var(--text3);line-height:1.9;white-space:pre-line}

/* MAIN */
.main{flex:1;overflow:hidden;display:flex;flex-direction:column}
.topbar{height:58px;flex-shrink:0;background:var(--surface);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);display:flex;align-items:center;padding:0 28px;gap:16px}
.topbar-title{font-size:15px;font-weight:700}
.topbar-sub{font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--text3)}
.topbar-right{margin-left:auto;display:flex;gap:8px}
.prog-wrap{height:3px;background:var(--border);flex-shrink:0}
.prog-fill{height:100%;background:linear-gradient(90deg,var(--teal),#0ea5e9);transition:width .4s cubic-bezier(.4,0,.2,1)}
.content{flex:1;overflow-y:auto;padding:32px 28px}

/* PANELS */
.panel{display:none;animation:fUp .25s ease}
.panel.active{display:block}
@keyframes fUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}

/* PAGE HEADER */
.ph{margin-bottom:24px}
.ph-title{font-size:21px;font-weight:800;letter-spacing:-.5px;margin-bottom:4px}
.ph-desc{font-size:13px;color:var(--text2)}

/* UPLOAD */
.dz{border:2px dashed var(--border2);border-radius:10px;padding:56px 40px;text-align:center;cursor:pointer;transition:all .2s;position:relative;background:linear-gradient(180deg,var(--surface2),var(--surface))}
.dz:hover,.dz.over{border-color:var(--teal);background:var(--teal-dim)}
.dz input{position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;height:100%}
.dz-icon{font-size:42px;margin-bottom:14px;display:block}
.dz-title{font-size:18px;font-weight:700;margin-bottom:6px}
.dz-sub{font-size:13px;color:var(--text2)}
.dz-fmts{display:inline-flex;gap:6px;margin-top:12px}
.fmt{font-family:'IBM Plex Mono',monospace;font-size:10px;padding:3px 8px;border:1px solid var(--border2);border-radius:4px;color:var(--text3)}
.info-box{display:flex;gap:10px;padding:13px 16px;background:var(--teal-dim);border:1px solid rgba(45,212,191,.2);border-radius:var(--r);font-size:13px;color:var(--text2);margin-top:18px}
.upload-status{margin-top:12px;font-size:12px;color:var(--text2);min-height:18px}
.upload-status.busy{color:var(--teal);font-weight:600}
.upload-status.err{color:var(--red);font-weight:600}
.upload-status.ok{color:var(--green);font-weight:600}

/* ALUNO TABLE */
.atoolbar{display:flex;align-items:center;gap:10px;margin-bottom:14px;flex-wrap:wrap}
.srch-wrap{position:relative;flex:1;min-width:200px}
.srch-ico{position:absolute;left:11px;top:50%;transform:translateY(-50%);color:var(--text3);font-size:13px;pointer-events:none}
.srch{width:100%;background:var(--surface2);border:1px solid var(--border);border-radius:var(--r);padding:9px 12px 9px 33px;color:var(--text);font-family:'Bricolage Grotesque',sans-serif;font-size:13px;outline:none;transition:border-color .15s}
.srch:focus{border-color:var(--teal)}
.srch::placeholder{color:var(--text3)}
.sel-lbl{font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--text2);white-space:nowrap}
.tbl-wrap{border:1px solid var(--border);border-radius:8px;overflow:hidden;margin-bottom:22px}
table{width:100%;border-collapse:collapse}
thead tr{background:var(--surface2);border-bottom:1px solid var(--border)}
th{padding:10px 14px;font-family:'IBM Plex Mono',monospace;font-size:10px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;color:var(--text3);text-align:left}
th:first-child{width:44px;text-align:center}
td{padding:9px 14px;border-bottom:1px solid var(--border);font-size:13px}
tbody tr:last-child td{border-bottom:none}
tbody tr{transition:background .1s;cursor:pointer}
tbody tr:hover{background:var(--surface2)}
tbody tr.sel{background:var(--teal-dim)}
tbody tr.hid{display:none}
.cbc{width:16px;height:16px;border:1.5px solid var(--border2);border-radius:4px;display:inline-flex;align-items:center;justify-content:center;font-size:10px;color:transparent;background:var(--surface3);transition:all .15s}
.sel .cbc{background:var(--teal);border-color:var(--teal);color:#000}
.mono{font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--text3)}

/* CFG */
.cfg-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px}
@media(max-width:680px){.cfg-grid{grid-template-columns:1fr}}
.cfg-card{background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:18px;cursor:pointer;transition:all .15s}
.cfg-card:hover{border-color:var(--border2)}
.cfg-card.active{border-color:var(--teal);background:var(--teal-dim)}
.cfg-icon{font-size:22px;margin-bottom:8px}
.cfg-title{font-size:13px;font-weight:700;margin-bottom:3px}
.cfg-desc{font-size:12px;color:var(--text2)}
.fl{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:var(--text2);margin-bottom:6px}
.fi,.fs{background:var(--surface2);border:1px solid var(--border);border-radius:var(--r);padding:10px 14px;color:var(--text);font-family:'Bricolage Grotesque',sans-serif;font-size:14px;outline:none;transition:border-color .15s;width:100%}
.fi:focus,.fs:focus{border-color:var(--teal)}
.fs option{background:var(--surface2)}
.stepper{display:inline-flex;align-items:center;border:1px solid var(--border);border-radius:var(--r);overflow:hidden}
.stpbtn{width:36px;height:38px;background:var(--surface2);border:none;color:var(--text);font-size:18px;font-weight:300;cursor:pointer;transition:background .15s}
.stpbtn:hover{background:var(--surface3)}
.stpfld{width:60px;height:38px;background:var(--surface);border:none;border-left:1px solid var(--border);border-right:1px solid var(--border);color:var(--text);font-family:'IBM Plex Mono',monospace;font-size:16px;text-align:center;outline:none}
.prev-pill{display:inline-flex;align-items:center;gap:6px;padding:7px 13px;background:var(--surface2);border:1px solid var(--border);border-radius:20px;font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--teal)}
.div{height:1px;background:var(--border);margin:22px 0}

/* ORGANIZE */
.org-layout{display:grid;grid-template-columns:320px 1fr;gap:18px;align-items:start}
@media(max-width:900px){.org-layout{grid-template-columns:1fr}}
.org-pool{background:var(--surface);border:1px solid var(--border);border-radius:8px;overflow:hidden;position:sticky;top:0}
.pool-head{padding:13px 16px;border-bottom:1px solid var(--border);background:var(--surface2);display:flex;align-items:center;justify-content:space-between}
.pool-title{font-size:13px;font-weight:700}
.pool-ct{font-family:'IBM Plex Mono',monospace;font-size:11px;padding:2px 8px;border-radius:10px;background:var(--surface3);color:var(--text2)}
.pool-list{padding:8px;max-height:calc(100vh - 230px);overflow-y:auto;display:flex;flex-direction:column;gap:3px}
.pool-empty{padding:28px 14px;text-align:center;font-size:12px;color:var(--text3)}
.pchip{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:5px;background:var(--surface2);border:1px solid var(--border);font-size:12px;font-weight:500;cursor:grab;user-select:none;transition:all .12s}
.pchip:hover{background:var(--surface3);border-color:var(--border2);transform:translateX(2px)}
.pchip.dragging{opacity:.3;transform:scale(.97)}
.pchip .cn{font-family:'IBM Plex Mono',monospace;font-size:10px;color:var(--text3);min-width:52px}
.pchip .cname{flex:1}
.pchip .dico{color:var(--text3);font-size:11px}
.groups-right{}
.groups-topbar{display:flex;align-items:center;gap:8px;margin-bottom:14px;flex-wrap:wrap}
.gsgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:12px}
.gcard{background:var(--surface);border:1px solid var(--border);border-radius:8px;overflow:hidden;transition:border-color .15s,box-shadow .15s}
.gcard.drop-target{border-color:var(--teal);box-shadow:0 0 0 3px var(--teal-glow)}
.ghead{padding:11px 14px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:8px;background:var(--surface2)}
.gdot{width:9px;height:9px;border-radius:50%;flex-shrink:0}
.gname{flex:1;background:none;border:none;color:var(--text);font-family:'Bricolage Grotesque',sans-serif;font-size:13px;font-weight:700;outline:none;padding:0}
.gname::placeholder{color:var(--text3)}
.gbadge{font-family:'IBM Plex Mono',monospace;font-size:10px;padding:2px 7px;border-radius:10px;background:var(--surface3);color:var(--text3);flex-shrink:0}
.gdel{background:none;border:none;color:var(--text3);cursor:pointer;font-size:12px;padding:2px 4px;border-radius:3px;transition:all .12s}
.gdel:hover{color:var(--red);background:var(--red-dim)}
.gbody{padding:8px;min-height:76px;display:flex;flex-direction:column;gap:3px}
.gchip{display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:5px;background:var(--surface2);border:1px solid var(--border);font-size:12px;font-weight:500;cursor:grab;user-select:none;transition:all .12s}
.gchip:hover{border-color:var(--border2)}
.gchip.dragging{opacity:.3}
.gchip .cn{font-family:'IBM Plex Mono',monospace;font-size:10px;color:var(--text3);min-width:52px}
.gchip .cname{flex:1}
.gchip .rmbtn{background:none;border:none;cursor:pointer;color:var(--text3);font-size:12px;padding:1px 4px;border-radius:3px;transition:all .12s;opacity:0}
.gchip:hover .rmbtn{opacity:1}
.gchip:hover .rmbtn:hover{color:var(--red);background:var(--red-dim)}
.gdrophint{padding:18px 10px;text-align:center;border:1.5px dashed var(--border);border-radius:5px;font-size:11px;color:var(--text3);transition:all .15s}
.gcard.drop-target .gdrophint{border-color:var(--teal);color:var(--teal);background:var(--teal-dim)}

/* STATS */
.stats-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;margin-bottom:20px}
.scard{background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:14px 16px}
.slbl{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:var(--text3);margin-bottom:5px}
.sval{font-size:26px;font-weight:800;letter-spacing:-1px}
.sval.tc{color:var(--teal)}.sval.am{color:var(--amber)}.sval.rd{color:var(--red)}

/* PROGRESS */
.aprog{margin-bottom:18px}
.aprog-bar{height:6px;background:var(--border);border-radius:3px;overflow:hidden;margin-top:6px}
.aprog-fill{height:100%;background:linear-gradient(90deg,var(--teal),#0ea5e9);border-radius:3px;transition:width .3s ease}
.aprog-lbl{font-family:'IBM Plex Mono',monospace;font-size:10px;color:var(--text3);display:flex;justify-content:space-between}

/* EXPORT */
.exp-block{background:var(--surface);border:1px solid var(--border);border-radius:8px;overflow:hidden;margin-bottom:22px}
.exp-gsec{border-bottom:1px solid var(--border)}
.exp-gsec:last-child{border-bottom:none}
.exp-ghead{padding:11px 16px;background:var(--surface2);display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--border)}
.exp-gdot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.exp-gname{font-size:13px;font-weight:700}
.exp-gcnt{font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--text3);margin-left:auto}
.exp-members{padding:12px 16px;display:flex;flex-wrap:wrap;gap:6px}
.exp-tag{padding:4px 10px;background:var(--surface3);border:1px solid var(--border2);border-radius:4px;font-size:12px;font-weight:500}

/* BUTTONS */
.btn{display:inline-flex;align-items:center;gap:7px;padding:9px 18px;border-radius:var(--r);border:1px solid transparent;font-family:'Bricolage Grotesque',sans-serif;font-size:13px;font-weight:600;cursor:pointer;transition:all .15s;white-space:nowrap;text-decoration:none}
.btn-primary{background:var(--teal);color:#fff;border-color:var(--teal)}
.btn-primary:hover{background:#2bc5b0;transform:translateY(-1px)}
.btn-ghost{background:var(--surface2);color:var(--text);border-color:var(--border)}
.btn-ghost:hover{background:var(--surface3);border-color:var(--border2)}
.btn-green{background:var(--green-dim);color:var(--green);border-color:rgba(34,197,94,.3)}
.btn-green:hover{background:rgba(34,197,94,.2)}
.btn-amber{background:var(--amber-dim);color:var(--amber);border-color:rgba(245,158,11,.3)}
.btn-red{background:var(--red-dim);color:var(--red);border-color:rgba(239,68,68,.3)}
.btn:disabled{opacity:.35;cursor:not-allowed;transform:none!important}
.btn-sm{padding:6px 13px;font-size:12px}
.btn-row{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:18px}

/* MODAL */
.mbg{display:none;position:fixed;inset:0;background:rgba(15,23,42,.28);backdrop-filter:blur(4px);z-index:500;align-items:center;justify-content:center}
.mbg.open{display:flex}
.modal{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:30px;max-width:420px;width:90%;animation:mIn .2s ease}
@keyframes mIn{from{transform:scale(.94);opacity:0}to{transform:scale(1);opacity:1}}
.modal-title{font-size:18px;font-weight:800;margin-bottom:8px}
.modal-desc{font-size:13px;color:var(--text2);line-height:1.6;margin-bottom:18px}
.modal-warn{padding:10px 14px;background:var(--amber-dim);border:1px solid rgba(245,158,11,.3);border-radius:var(--r);color:var(--amber);font-size:12px;margin-bottom:14px}

/* TOASTS */
.tz{position:fixed;bottom:22px;right:22px;z-index:600;display:flex;flex-direction:column;gap:7px;align-items:flex-end}
.toast{display:flex;align-items:center;gap:9px;padding:10px 16px;background:var(--surface2);border:1px solid var(--border2);border-radius:8px;font-size:13px;font-weight:500;max-width:280px;animation:tIn .2s cubic-bezier(.16,1,.3,1);box-shadow:0 8px 24px rgba(0,0,0,.4)}
@keyframes tIn{from{transform:translateX(18px);opacity:0}to{transform:translateX(0);opacity:1}}
.toast.ok{border-color:rgba(34,197,94,.4)}.toast.err{border-color:rgba(239,68,68,.4)}.toast.info{border-color:rgba(45,212,191,.3)}

.tag{display:inline-block;padding:2px 8px;background:var(--surface3);border:1px solid var(--border2);border-radius:4px;font-family:'IBM Plex Mono',monospace;font-size:10px;color:var(--text3)}
.hidden{display:none!important}
</style>
</head>
<body>
<div class="shell">

<!-- SIDEBAR -->
<nav class="sidebar">
  <div class="sidebar-logo">
    <div class="logo-mark">
      <span class="logo-name">GroupForge</span>
    </div>
    <div class="logo-sub">Organizador de Turmas</div>
  </div>
  <div class="sidebar-nav">
    <div class="nav-sep">Fluxo</div>
    <div class="nav-item active" data-step="1" onclick="navTo(1)"><span class="ni">01</span>Importar<span class="nb" id="nb1">—</span></div>
    <div class="nav-item" data-step="2" onclick="navTo(2)"><span class="ni">02</span>Seleccionar<span class="nb" id="nb2">—</span></div>
    <div class="nav-item" data-step="3" onclick="navTo(3)"><span class="ni">03</span>Configurar<span class="nb" id="nb3">—</span></div>
    <div class="nav-item" data-step="4" onclick="navTo(4)"><span class="ni">04</span>Organizar<span class="nb" id="nb4">—</span></div>
    <div class="nav-item" data-step="5" onclick="navTo(5)"><span class="ni">05</span>Exportar<span class="nb" id="nb5">—</span></div>
    <div class="nav-sep" style="margin-top:12px">Sessão</div>
    <div class="nav-item" onclick="resetSession()"><span class="ni">S</span>Nova Sessão</div>
  </div>
  <div class="sidebar-footer" id="sfoot">Sem dados importados</div>
</nav>

<!-- MAIN -->
<div class="main">
  <div class="topbar">
    <div>
      <div class="topbar-title" id="ttitle">Importar Ficheiro</div>
      <div class="topbar-sub" id="tsub">Passo 1 de 5</div>
    </div>
    <div class="topbar-right">
      <button class="btn btn-ghost btn-sm" onclick="resetSession()">Reiniciar</button>
    </div>
  </div>
  <div class="prog-wrap"><div class="prog-fill" id="gprog" style="width:20%"></div></div>

  <div class="content">

    <!-- P1: IMPORTAR -->
    <div class="panel active" id="panel-1">
      <div class="ph"><div class="ph-title">Importar Lista de Alunos</div><div class="ph-desc">Carrega um ficheiro Excel ou CSV. A aplicação detecta automaticamente as colunas de número, nome e email.</div></div>
      <div class="dz" id="dz">
        <input type="file" id="fi" accept=".xlsx,.xls,.xlsm,.xlsb,.csv"/>
        <span class="dz-icon">UPLOAD</span>
        <div class="dz-title">Arrasta o ficheiro ou clica para seleccionar</div>
        <div class="dz-sub">Detecção automática de colunas — Número, Nome, Email...</div>
        <div class="dz-fmts"><span class="fmt">.xlsx</span><span class="fmt">.xls</span><span class="fmt">.csv</span></div>
      </div>
      <div class="upload-status" id="uploadStatus" aria-live="polite"></div>
      <div class="info-box"><span>i</span><span>Os dados são processados localmente no teu browser. Nenhuma informação é enviada para servidores externos.</span></div>
      <div class="btn-row"><button class="btn btn-primary" id="btn1next" onclick="navTo(2)" disabled>Continuar</button></div>
    </div>

    <!-- P2: SELECCIONAR -->
    <div class="panel" id="panel-2">
      <div class="ph"><div class="ph-title">Seleccionar Alunos</div><div class="ph-desc">Escolhe quais os alunos que participam. Podes excluir ausentes ou alunos que não devem ser agrupados.</div></div>
      <div class="atoolbar">
        <div class="srch-wrap"><span class="srch-ico"></span><input class="srch" id="srch" type="text" placeholder="Pesquisar por nome ou número..." oninput="filterT()"/></div>
        <button class="btn btn-ghost btn-sm" onclick="selAll(true)">Todos</button>
        <button class="btn btn-ghost btn-sm" onclick="selAll(false)">Nenhum</button>
        <span class="sel-lbl" id="sellbl">0 sel.</span>
      </div>
      <div class="tbl-wrap">
        <table>
          <thead><tr>
            <th><div class="cbc" id="mcb" onclick="toggleMaster()" style="cursor:pointer;margin:auto">✓</div></th>
            <th>Número</th><th>Nome Completo</th><th>Email</th>
          </tr></thead>
          <tbody id="tbody"></tbody>
        </table>
      </div>
      <div class="btn-row">
        <button class="btn btn-ghost" onclick="navTo(1)">Voltar</button>
        <button class="btn btn-primary" id="btn2cfg" onclick="navTo(3)" disabled>Configurar</button>
      </div>
    </div>

    <!-- P3: CONFIGURAR -->
    <div class="panel" id="panel-3">
      <div class="ph"><div class="ph-title">Configurar Grupos</div><div class="ph-desc">Define o modo de criação, número de grupos e nomes personalizados.</div></div>
      <div style="margin-bottom:18px">
        <div class="fl" style="margin-bottom:10px">Modo de distribuição</div>
        <div class="cfg-grid">
          <div class="cfg-card active" id="cfgauto" onclick="setDist('auto')"><div class="cfg-icon">A</div><div class="cfg-title">Distribuição Automática</div><div class="cfg-desc">Alunos distribuídos aleatoriamente pelos grupos.</div></div>
          <div class="cfg-card" id="cfgmanual" onclick="setDist('manual')"><div class="cfg-icon">M</div><div class="cfg-title">Distribuição Manual</div><div class="cfg-desc">Arrasta cada aluno para o grupo pretendido.</div></div>
        </div>
      </div>
      <div class="div"></div>
      <div style="margin-bottom:18px">
        <div class="fl" style="margin-bottom:10px">Método de definição</div>
        <div class="cfg-grid">
          <div class="cfg-card active" id="mng" onclick="setMethod('num-groups')"><div class="cfg-title">Por número de grupos</div><div class="cfg-desc">Define quantos grupos criar no total.</div></div>
          <div class="cfg-card" id="mpg" onclick="setMethod('per-group')"><div class="cfg-title">Por alunos por grupo</div><div class="cfg-desc">Define o tamanho máximo de cada grupo.</div></div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:20px;flex-wrap:wrap;margin-bottom:22px">
        <div>
          <div class="fl" id="vallbl" style="margin-bottom:6px">Número de grupos</div>
          <div class="stepper"><button class="stpbtn" onclick="adj(-1)">−</button><input class="stpfld" id="cfgv" type="number" value="4" min="1" oninput="updPrev()"/><button class="stpbtn" onclick="adj(1)">+</button></div>
        </div>
        <div class="prev-pill" id="prevpill">→</div>
      </div>
      <div class="div"></div>
      <div class="fl" style="margin-bottom:10px">Nomes dos grupos <span class="tag">opcional</span></div>
      <div id="gnameinputs"></div>
      <div class="btn-row">
        <button class="btn btn-ghost" onclick="navTo(2)">Voltar</button>
        <button class="btn btn-primary" onclick="generate()">Criar Grupos</button>
      </div>
    </div>

    <!-- P4: ORGANIZAR -->
    <div class="panel" id="panel-4">
      <div class="ph"><div class="ph-title">Organizar Grupos</div><div class="ph-desc">Arrasta alunos da banca para os grupos ou entre grupos. Clica × para devolver à banca.</div></div>
      <div class="stats-row" id="ostats"></div>
      <div class="aprog">
        <div class="aprog-lbl"><span>Progresso de atribuição</span><span id="progtxt">0 / 0</span></div>
        <div class="aprog-bar"><div class="aprog-fill" id="progfill" style="width:0%"></div></div>
      </div>
      <div class="org-layout">
        <div class="org-pool" id="poolpanel">
          <div class="pool-head"><span class="pool-title">Banca de Alunos</span><span class="pool-ct" id="poolct">0</span></div>
          <div class="pool-list" id="poollist" ondragover="event.preventDefault()" ondrop="dropPool(event)"></div>
        </div>
        <div class="groups-right">
          <div class="groups-topbar">
            <button class="btn btn-ghost btn-sm" onclick="shuffle()">Redistribuir</button>
            <button class="btn btn-ghost btn-sm" onclick="addGrp()">＋ Novo Grupo</button>
            <button class="btn btn-primary btn-sm" style="margin-left:auto" onclick="openConfirm()">Finalizar</button>
          </div>
          <div class="gsgrid" id="gsgrid"></div>
        </div>
      </div>
    </div>

    <!-- P5: EXPORTAR -->
    <div class="panel" id="panel-5">
      <div class="ph"><div class="ph-title">Exportar Resultados</div><div class="ph-desc">Descarrega os grupos em Excel. Inclui uma folha de resumo e uma folha por grupo.</div></div>
      <div class="stats-row" id="estats"></div>
      <div class="exp-block" id="expsummary"></div>
      <div class="btn-row" style="margin-bottom:28px">
        <button class="btn btn-green" onclick="dlXls()">Exportar Excel</button>
        <button class="btn btn-ghost" onclick="navTo(4)">Voltar</button>
        <button class="btn btn-ghost" style="margin-left:auto" onclick="resetSession()">Nova Sessão</button>
      </div>
      <div class="div"></div>
      <div style="font-size:15px;font-weight:800;margin-bottom:14px">Exportar com Email <span class="tag">opcional</span></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px">
        <div><div class="fl" style="margin-bottom:5px">Email do professor</div><input class="fi" type="email" id="expemail" placeholder="professor@escola.pt"/></div>
        <div><div class="fl" style="margin-bottom:5px">Turma / Disciplina</div><input class="fi" type="text" id="expturma" placeholder="Matemática — 10ºA"/></div>
      </div>
      <button class="btn btn-ghost" onclick="dlXls(true)">Exportar e Abrir Email</button>
    </div>

  </div>
</div>
</div>

<!-- MODAL -->
<div class="mbg" id="mbg">
  <div class="modal">
    <div class="modal-title" id="mtitle">Confirmar</div>
    <div class="modal-desc" id="mdesc"></div>
    <div class="modal-warn hidden" id="mwarn"></div>
    <div class="btn-row">
      <button class="btn btn-ghost" onclick="closeMod()">Cancelar</button>
      <button class="btn btn-primary" onclick="doConfirm()">Confirmar</button>
    </div>
  </div>
</div>
<div class="tz" id="tz"></div>

<script>
// ── STATE
let students=[], groups={}, pool=[], distMode='auto', cfgMethod='num-groups', gid=1, dragSrc=null, pendingFn=null, currentStep=1, fileLabel='';

const COLORS=['#2dd4bf','#818cf8','#f472b6','#fb923c','#a3e635','#38bdf8','#e879f9','#fbbf24','#34d399','#60a5fa'];

const STEPS={1:['Importar Ficheiro','Passo 1 de 5'],2:['Seleccionar Alunos','Passo 2 de 5'],3:['Configurar Grupos','Passo 3 de 5'],4:['Organizar Grupos','Passo 4 de 5'],5:['Exportar Resultados','Passo 5 de 5']};

// ── NAV
function navTo(n){
  const movingForward=n>currentStep;
  if(movingForward&&n>1&&!students.length){toast('Importa um ficheiro primeiro.','err');return}
  if(movingForward&&n>2&&!selStudents().length){toast('Selecciona pelo menos um aluno.','err');return}
  if(movingForward&&n>4&&!Object.keys(groups).length){toast('Cria os grupos primeiro.','err');return}
  document.querySelectorAll('.panel').forEach((p,i)=>p.classList.toggle('active',i+1===n));
  document.querySelectorAll('.nav-item[data-step]').forEach(el=>el.classList.toggle('active',+el.dataset.step===n));
  document.getElementById('ttitle').textContent=STEPS[n][0];
  document.getElementById('tsub').textContent=STEPS[n][1];
  document.getElementById('gprog').style.width=(n/5*100)+'%';
  currentStep=n;
  updSidebar();
  if(n===2)renderTable();
  if(n===3)renderGnameInputs();
  if(n===4)renderOrg();
  if(n===5)renderExport();
}

function updSidebar(){
  const sel=selStudents();
  document.getElementById('nb1').textContent=students.length?students.length+' alunos':'—';
  document.getElementById('nb2').textContent=sel.length?sel.length+' sel.':'—';
  document.getElementById('nb3').textContent=Object.keys(groups).length?Object.keys(groups).length+' grp':'—';
  const ass=Object.values(groups).reduce((a,g)=>a+g.members.length,0);
  document.getElementById('nb4').textContent=Object.keys(groups).length?ass+'/'+sel.length:'—';
  document.getElementById('nb5').textContent=Object.keys(groups).length?'✓':'—';
  const sf=document.getElementById('sfoot');
  sf.textContent=students.length?\`\${students.length} alunos importados\n\${sel.length} seleccionados\n\${Object.keys(groups).length} grupos criados\`:'Sem dados importados';
}

// ── UPLOAD
const dz=document.getElementById('dz'), fi=document.getElementById('fi');
dz.addEventListener('dragover',e=>{e.preventDefault();dz.classList.add('over')});
dz.addEventListener('dragleave',()=>dz.classList.remove('over'));
dz.addEventListener('drop',e=>{e.preventDefault();dz.classList.remove('over');if(e.dataTransfer.files[0])parseFile(e.dataTransfer.files[0])});
fi.addEventListener('change',e=>{if(e.target.files[0])parseFile(e.target.files[0])});

function nh(t){return String(t||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase()}

function csvToRows(text){
  const lines=text.split(/\r?\n/).filter(l=>l.trim());
  if(!lines.length)return [];
  const d=[',',';','\t'].reduce((b,x)=>lines[0].split(x).length>lines[0].split(b).length?x:b,',');
  return lines.map(l=>l.split(d).map(c=>c.trim()));
}

function sheetRows(sheet){
  return XLSX.utils.sheet_to_json(sheet,{header:1,raw:false,defval:''});
}

function pickBestSheetRows(wb){
  const NA=['nome','nomes','name','aluno','alunos','student'],
        NU=['numero','numeros','num','number','id','nº','no','codigo','codigos'],
        EA=['email','mail','e-mail','correio'];
  let bestRows=[],bestScore=-1;
  wb.SheetNames.forEach(sn=>{
    const rows=sheetRows(wb.Sheets[sn]);
    const nonEmpty=rows.filter(r=>(r||[]).some(c=>String(c||'').trim())).length;
    if(!nonEmpty)return;
    const hdr=(rows.slice(0,8).flat().map(nh));
    const hits=hdr.filter(h=>NA.some(a=>h.includes(a))||NU.some(a=>h.includes(a))||EA.some(a=>h.includes(a))).length;
    const score=nonEmpty+(hits*6);
    if(score>bestScore){bestScore=score;bestRows=rows;}
  });
  return bestRows;
}

function setUploadStatus(msg,type=''){
  const el=document.getElementById('uploadStatus');
  if(!el)return;
  el.textContent=msg||'';
  el.className='upload-status'+(type?' '+type:'');
}

function parseFile(file){
  fileLabel=file.name||'ficheiro';
  const ext=(file.name.split('.').pop()||'').toLowerCase();
  const isCsv=ext==='csv'||String(file.type||'').includes('csv');
  const parse=()=>{
    setUploadStatus('A processar '+file.name+'...','busy');
    const r=new FileReader();
    r.onload=e=>{
      try{
        let rows=[];
        if(isCsv)rows=csvToRows(e.target.result);
        else {
          const wb=XLSX.read(e.target.result,{type:'array'});
          rows=pickBestSheetRows(wb);
        }
        extractStudents(rows);
      }catch(err){setUploadStatus('Erro ao ler '+file.name+': '+err.message,'err');toast('Erro ao ler ficheiro: '+err.message,'err')}
    };
    r.onerror=()=>{setUploadStatus('Erro ao abrir '+file.name+'.','err');toast('Erro ao abrir ficheiro.','err')};
    if(isCsv)r.readAsText(file);else r.readAsArrayBuffer(file);
  };

  if(isCsv){parse();return;}
  setUploadStatus('A carregar motor de leitura Excel...','busy');
  toast('A preparar leitura de Excel...','info');
  ensureXlsxLoaded().then(parse).catch(err=>{setUploadStatus(err.message,'err');toast(err.message,'err')});
}

function extractStudents(rows){
  if(!rows||!rows.length){setUploadStatus('Ficheiro vazio.','err');toast('Ficheiro vazio.','err');return}
  const NA=['nome','nomes','name','aluno','alunos','student'],
        NU=['numero','numeros','num','number','id','nº','no','codigo','codigos'],
        EA=['email','mail','e-mail','correio'];

  let hRow=-1,nCand=[],uCand=[],eCand=[];
  for(let i=0;i<Math.min(20,rows.length);i++){
    const row=rows[i]||[];
    let rowHasHeader=false;
    for(let c=0;c<row.length;c++){
      const h=nh(row[c]);
      if(NA.some(a=>h.includes(a))){if(!nCand.includes(c))nCand.push(c);rowHasHeader=true}
      if(NU.some(a=>h===a||h.startsWith(a)||h.includes(a))){if(!uCand.includes(c))uCand.push(c);rowHasHeader=true}
      if(EA.some(a=>h.includes(a))){if(!eCand.includes(c))eCand.push(c);rowHasHeader=true}
    }
    if(rowHasHeader&&hRow===-1)hRow=i;
  }

  const ds=hRow>=0?hRow+1:0;
  const dr=rows.slice(ds).filter(r=>r&&r.some(c=>String(c||'').trim()));
  if(!dr.length){setUploadStatus('Ficheiro sem linhas de alunos.','err');toast('Ficheiro sem linhas de alunos.','err');return}
  const mc=Math.max(...dr.map(r=>r.length),0);

  function scoreCol(c,type){
    let score=0;
    const sample=dr.slice(0,120);
    sample.forEach(r=>{
      const v=String(r[c]||'').trim();
      if(!v)return;
      if(type==='name'){
        if(/[A-Za-zÀ-ÖØ-öø-ÿ]/.test(v))score+=3;
        if(v.includes(' '))score+=1;
        if(/@/.test(v))score-=3;
        if(/^\d+$/.test(v))score-=5;
      }
      if(type==='num'){
        if(/^\d{4,10}$/.test(v))score+=3;
        if(/[A-Za-z]/.test(v))score-=2;
      }
      if(type==='email'){
        if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))score+=5;
        else if(/@/.test(v))score+=2;
      }
    });
    return score;
  }

  function bestCol(cands,type,exclude=-1){
    let cols=(cands&&cands.length)?cands:Array.from({length:mc},(_,i)=>i);
    cols=cols.filter(c=>c!==exclude);
    let best=-1,bScore=-Infinity;
    cols.forEach(c=>{const sc=scoreCol(c,type);if(sc>bScore){bScore=sc;best=c}});
    return best;
  }

  const nC=bestCol(nCand,'name');
  const uC=bestCol(uCand,'num',nC);
  const eC=bestCol(eCand,'email',nC);

  const seen=new Set();
  students=dr.map((r,i)=>({
    num:uC>=0?String(r[uC]||'').trim():String(i+1),
    name:nC>=0?String(r[nC]||'').trim():'',
    email:eC>=0?String(r[eC]||'').trim():'',
    sel:true
  })).filter(s=>{
    if(!s.name||/^\d+$/.test(s.name))return false;
    const k=\`\${s.num}::\${s.name}\`;
    if(seen.has(k))return false;
    seen.add(k);return true;
  });

  if(!students.length){setUploadStatus('Nenhum nome encontrado. Verifica o cabeçalho da coluna de nomes.','err');toast('Nenhum nome encontrado. Verifica o cabeçalho da coluna de nomes.','err');return}
  setUploadStatus(\`\${students.length} alunos importados de \${fileLabel}.\`,'ok');
  toast(\`\${students.length} alunos importados!\`,'ok');
  const b1=document.getElementById('btn1next');if(b1)b1.disabled=false;
  updSidebar();navTo(2);
}

// ── SELECT
function selStudents(){return students.filter(s=>s.sel)}
function renderTable(){
  document.getElementById('tbody').innerHTML=students.map((s,i)=>\`
    <tr class="\${s.sel?'sel':''}" data-i="\${i}" onclick="togS(\${i})">
      <td style="text-align:center"><div class="cbc">✓</div></td>
      <td><span class="mono">\${s.num||'—'}</span></td>
      <td><strong>\${s.name}</strong></td>
      <td><span class="mono">\${s.email||'—'}</span></td>
    </tr>\`).join('');
  updSelCt();
}
function togS(i){students[i].sel=!students[i].sel;const r=document.querySelector(\`#tbody tr[data-i="\${i}"]\`);if(r)r.classList.toggle('sel',students[i].sel);updSelCt()}
function selAll(v){document.querySelectorAll('#tbody tr:not(.hid)').forEach(r=>{const i=+r.dataset.i;if(!isNaN(i)){students[i].sel=v;r.classList.toggle('sel',v)}});updSelCt()}
function toggleMaster(){const a=students.some(s=>!s.sel);selAll(a)}
function filterT(){
  const q=document.getElementById('srch').value.toLowerCase();
  document.querySelectorAll('#tbody tr').forEach(r=>{const i=+r.dataset.i;const s=students[i];const m=!q||s.name.toLowerCase().includes(q)||s.num.includes(q)||(s.email||'').toLowerCase().includes(q);r.classList.toggle('hid',!m)});
}
function updSelCt(){
  const n=selStudents().length;
  document.getElementById('sellbl').textContent=n+' sel.';
  document.getElementById('btn2cfg').disabled=n===0;
  updSidebar();
}

// ── CONFIG
function setDist(m){distMode=m;document.getElementById('cfgauto').classList.toggle('active',m==='auto');document.getElementById('cfgmanual').classList.toggle('active',m==='manual')}
function setMethod(m){cfgMethod=m;document.getElementById('mng').classList.toggle('active',m==='num-groups');document.getElementById('mpg').classList.toggle('active',m==='per-group');document.getElementById('vallbl').textContent=m==='num-groups'?'Número de grupos':'Alunos por grupo';updPrev();renderGnameInputs()}
function adj(d){const el=document.getElementById('cfgv');el.value=Math.max(1,(+el.value||1)+d);updPrev();renderGnameInputs()}
function numGroups(){const v=+document.getElementById('cfgv').value||4;const n=selStudents().length;return cfgMethod==='num-groups'?Math.min(v,n):Math.ceil(n/v)}
function updPrev(){
  const v=+document.getElementById('cfgv').value||0;const n=selStudents().length;if(!v||!n)return;
  let g,pp,rem;if(cfgMethod==='num-groups'){g=v;pp=Math.floor(n/v);rem=n%v}else{g=Math.ceil(n/v);pp=v;rem=n%v}
  document.getElementById('prevpill').textContent=\`→ \${g} grupo(s) · ~\${pp} alunos\${rem?\` (\${rem} com \${pp+1})\`:''}\`;
}
function renderGnameInputs(){
  const n=numGroups();const c=document.getElementById('gnameinputs');
  const ex={};c.querySelectorAll('input').forEach((el,i)=>{if(el.value)ex[i]=el.value});
  c.innerHTML=\`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:8px">
    \${Array.from({length:n},(_,i)=>\`<div><div class="fl" style="margin-bottom:5px">Grupo \${i+1}</div><input class="fi" id="gn\${i}" placeholder="Grupo \${i+1}" value="\${ex[i]||''}"/></div>\`).join('')}
  </div>\`;
  updPrev();
}

// ── GENERATE
function generate(){
  const sel=selStudents();const ng=numGroups();gid=1;groups={};
  for(let i=0;i<ng;i++){
    const id='G'+(gid++);const ne=document.getElementById('gn'+i);
    groups[id]={name:ne?.value.trim()||\`Grupo \${i+1}\`,color:COLORS[i%COLORS.length],members:[]};
  }
  if(distMode==='auto'){
    const sh=[...sel].sort(()=>Math.random()-.5);const ks=Object.keys(groups);
    sh.forEach((s,i)=>groups[ks[i%ng]].members.push(s.num));pool=[];
  } else {pool=sel.map(s=>s.num)}
  navTo(4);
}

// ── ORGANIZE
function getStu(num){return students.find(s=>s.num===num)}
function renderOrg(){renderPool();renderGcards();renderOstats()}

function renderPool(){
  const l=document.getElementById('poollist');
  l.innerHTML=pool.length
    ?pool.map(n=>{const s=getStu(n);return\`<div class="pchip" draggable="true" data-num="\${n}" data-src="pool"><span class="dico">⠿</span><span class="cn">\${s.num}</span><span class="cname">\${s.name}</span></div>\`}).join('')
    :'<div class="pool-empty">✓ Todos os alunos foram atribuídos</div>';
  document.getElementById('poolct').textContent=pool.length;
  document.querySelectorAll('.pchip[draggable]').forEach(el=>{
    el.addEventListener('dragstart',e=>{dragSrc={num:el.dataset.num,src:'pool'};setTimeout(()=>el.classList.add('dragging'),0);e.dataTransfer.effectAllowed='move'});
    el.addEventListener('dragend',()=>el.classList.remove('dragging'));
  });
}

function renderGcards(){
  const g=document.getElementById('gsgrid');
  g.innerHTML=Object.entries(groups).map(([id,gr])=>\`
    <div class="gcard" id="gc\${id}" ondragover="gOver(event,'\${id}')" ondragleave="gLeave('\${id}')" ondrop="gDrop(event,'\${id}')">
      <div class="ghead">
        <div class="gdot" style="background:\${gr.color}"></div>
        <input class="gname" value="\${gr.name}" placeholder="Nome" onchange="groups['\${id}'].name=this.value"/>
        <span class="gbadge">\${gr.members.length}</span>
        <button class="gdel" onclick="delGrp('\${id}')">✕</button>
      </div>
      <div class="gbody" id="gb\${id}">
        \${gr.members.length?gr.members.map(n=>{const s=getStu(n);return\`<div class="gchip" draggable="true" data-num="\${n}" data-src="\${id}"><span class="cn">\${s.num}</span><span class="cname">\${s.name}</span><button class="rmbtn" onclick="rmFromG('\${id}','\${n}',event)">×</button></div>\`}).join(''):'<div class="gdrophint">Arrasta alunos aqui</div>'}
      </div>
    </div>\`).join('');
  document.querySelectorAll('.gchip[draggable]').forEach(el=>{
    el.addEventListener('dragstart',e=>{dragSrc={num:el.dataset.num,src:el.dataset.src};setTimeout(()=>el.classList.add('dragging'),0);e.dataTransfer.effectAllowed='move'});
    el.addEventListener('dragend',()=>el.classList.remove('dragging'));
  });
}

function gOver(e,id){e.preventDefault();document.getElementById('gc'+id)?.classList.add('drop-target')}
function gLeave(id){document.getElementById('gc'+id)?.classList.remove('drop-target')}
function gDrop(e,tid){
  e.preventDefault();document.getElementById('gc'+tid)?.classList.remove('drop-target');
  if(!dragSrc)return;
  const{num,src}=dragSrc;
  if(src==='pool')pool=pool.filter(n=>n!==num);
  else if(groups[src])groups[src].members=groups[src].members.filter(n=>n!==num);
  if(!groups[tid].members.includes(num))groups[tid].members.push(num);
  dragSrc=null;renderOrg();
}
function dropPool(e){
  e.preventDefault();if(!dragSrc||dragSrc.src==='pool')return;
  const{num,src}=dragSrc;
  if(groups[src])groups[src].members=groups[src].members.filter(n=>n!==num);
  if(!pool.includes(num))pool.push(num);
  dragSrc=null;renderOrg();
}
function rmFromG(id,num,e){e.stopPropagation();groups[id].members=groups[id].members.filter(n=>n!==num);if(!pool.includes(num))pool.push(num);renderOrg()}
function addGrp(){const id='G'+(gid++);groups[id]={name:\`Grupo \${Object.keys(groups).length+1}\`,color:COLORS[Object.keys(groups).length%COLORS.length],members:[]};renderOrg();toast('Novo grupo adicionado.','info')}
function delGrp(id){groups[id].members.forEach(n=>{if(!pool.includes(n))pool.push(n)});delete groups[id];renderOrg();toast('Grupo removido. Alunos devolvidos à banca.','info')}
function shuffle(){
  const all=[...Object.values(groups).flatMap(g=>g.members),...pool].sort(()=>Math.random()-.5);
  const ks=Object.keys(groups);if(!ks.length){toast('Cria pelo menos um grupo.','err');return}
  ks.forEach(k=>groups[k].members=[]);all.forEach((n,i)=>groups[ks[i%ks.length]].members.push(n));pool=[];
  renderOrg();toast('Redistribuídos aleatoriamente!','ok');
}
function renderOstats(){
  const ass=Object.values(groups).reduce((a,g)=>a+g.members.length,0);
  const tot=selStudents().length;const pct=tot?Math.round(ass/tot*100):0;
  document.getElementById('ostats').innerHTML=\`
    <div class="scard"><div class="slbl">Total</div><div class="sval">\${tot}</div></div>
    <div class="scard"><div class="slbl">Grupos</div><div class="sval tc">\${Object.keys(groups).length}</div></div>
    <div class="scard"><div class="slbl">Atribuídos</div><div class="sval">\${ass}</div></div>
    <div class="scard"><div class="slbl">Na Banca</div><div class="sval \${pool.length?'am':''}">\${pool.length}</div></div>\`;
  document.getElementById('progfill').style.width=pct+'%';
  document.getElementById('progtxt').textContent=\`\${ass} / \${tot}\`;
  updSidebar();
}

// ── CONFIRM
function openConfirm(){
  document.getElementById('mtitle').textContent='Finalizar grupos?';
  document.getElementById('mdesc').textContent=\`\${Object.keys(groups).length} grupos criados. Prosseguir para a exportação?\`;
  const w=document.getElementById('mwarn');
  if(pool.length){w.classList.remove('hidden');w.textContent=\`Atenção: \${pool.length} aluno(s) ficarão sem grupo.\`}else w.classList.add('hidden');
  pendingFn=()=>navTo(5);
  document.getElementById('mbg').classList.add('open');
}
function closeMod(){document.getElementById('mbg').classList.remove('open');pendingFn=null}
function doConfirm(){closeMod();if(pendingFn)pendingFn()}

// ── EXPORT
function renderExport(){
  const ass=Object.values(groups).reduce((a,g)=>a+g.members.length,0);
  document.getElementById('estats').innerHTML=\`
    <div class="scard"><div class="slbl">Grupos</div><div class="sval tc">\${Object.keys(groups).length}</div></div>
    <div class="scard"><div class="slbl">Alunos</div><div class="sval">\${ass}</div></div>
    <div class="scard"><div class="slbl">Sem Grupo</div><div class="sval \${pool.length?'rd':''}">\${pool.length}</div></div>\`;
  const el=document.getElementById('expsummary');
  el.innerHTML=Object.entries(groups).map(([,gr])=>\`
    <div class="exp-gsec">
      <div class="exp-ghead"><div class="exp-gdot" style="background:\${gr.color}"></div><span class="exp-gname">\${gr.name}</span><span class="exp-gcnt">\${gr.members.length} aluno(s)</span></div>
      <div class="exp-members">\${gr.members.map(n=>\`<span class="exp-tag">\${getStu(n).name}</span>\`).join('')||'<span style="font-size:12px;color:var(--text3)">Vazio</span>'}</div>
    </div>\`)
  .join('')+(pool.length?\`
    <div class="exp-gsec">
      <div class="exp-ghead" style="background:var(--red-dim)"><div class="exp-gdot" style="background:var(--red)"></div><span class="exp-gname" style="color:var(--red)">Sem grupo</span><span class="exp-gcnt">\${pool.length} aluno(s)</span></div>
      <div class="exp-members">\${pool.map(n=>\`<span class="exp-tag" style="border-color:rgba(239,68,68,.3)">\${getStu(n).name}</span>\`).join('')}</div>
    </div>\`:'');
}

function dlXls(email=false){
  const wb=XLSX.utils.book_new();
  const sum=[['Grupo','Nº Aluno','Nome Completo','Email']];
  Object.entries(groups).forEach(([,gr])=>gr.members.forEach(n=>{const s=getStu(n);sum.push([gr.name,s.num,s.name,s.email||''])}));
  if(pool.length)pool.forEach(n=>{const s=getStu(n);sum.push(['Sem grupo',s.num,s.name,s.email||''])});
  const ws0=XLSX.utils.aoa_to_sheet(sum);ws0['!cols']=[{wch:20},{wch:10},{wch:44},{wch:40}];
  XLSX.utils.book_append_sheet(wb,ws0,'Resumo');
  Object.entries(groups).forEach(([,gr])=>{
    const d=[['Nº','Nome Completo','Email'],...gr.members.map(n=>{const s=getStu(n);return[s.num,s.name,s.email||'']})];
    const ws=XLSX.utils.aoa_to_sheet(d);ws['!cols']=[{wch:10},{wch:44},{wch:40}];
    XLSX.utils.book_append_sheet(wb,ws,gr.name.replace(/[:\\\/\?\*\[\]]/g,'').slice(0,31)||'Grupo');
  });
  XLSX.writeFile(wb,'grupos_turma.xlsx');
  toast('Excel exportado!','ok');
  if(email){
    const em=document.getElementById('expemail').value.trim();
    const tu=document.getElementById('expturma').value.trim();
    if(!em){toast('Introduz um email.','err');return}
    const sub=encodeURIComponent(\`Grupos\${tu?' — '+tu:''}\`);
    const bod=encodeURIComponent(\`Olá,\n\nSegue em anexo o ficheiro com os grupos\${tu?' para '+tu:''}.\n\nTotal de grupos: \${Object.keys(groups).length}\nTotal de alunos: \${Object.values(groups).reduce((a,g)=>a+g.members.length,0)}\n\nGerado pelo GroupForge\`);
    window.location.href=\`mailto:\${em}?subject=\${sub}&body=\${bod}\`;
  }
}

// ── RESET
function resetSession(){
  students=[];groups={};pool=[];distMode='auto';cfgMethod='num-groups';gid=1;dragSrc=null;currentStep=1;
  document.getElementById('fi').value='';
  document.getElementById('cfgauto').classList.add('active');document.getElementById('cfgmanual').classList.remove('active');
  document.getElementById('mng').classList.add('active');document.getElementById('mpg').classList.remove('active');
  document.getElementById('cfgv').value=4;
  const b1=document.getElementById('btn1next');if(b1)b1.disabled=true;
  navTo(1);updSidebar();
}

// ── TOASTS
function toast(msg,type='info'){
  const icons={ok:'OK',err:'ERRO',info:'INFO'};
  const el=document.createElement('div');el.className=\`toast \${type}\`;
  el.innerHTML=\`<strong>\${icons[type]||'·'}</strong> \${msg}\`;
  document.getElementById('tz').appendChild(el);setTimeout(()=>el.remove(),3500);
}

// ── INIT
ensureXlsxLoaded().catch(()=>{});
updPrev();renderGnameInputs();
</script>
</body>
</html>`;

const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...SECURITY_HEADERS,
    },
  });
}

function htmlResponse(html) {
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=60",
      ...SECURITY_HEADERS,
    },
  });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return jsonResponse({ ok: true, service: "gestorgrupos", ts: new Date().toISOString() });
    }

    if (url.pathname === "/" || url.pathname === "/index.html") {
      return htmlResponse(APP_HTML);
    }

    return new Response("Not Found", {
      status: 404,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        ...SECURITY_HEADERS,
      },
    });
  },
};
