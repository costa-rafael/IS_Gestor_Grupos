const fs = require('fs');
const file = 'worker.js';
let lines = fs.readFileSync(file, 'utf8').split('\n');

let found = false;
for (let i = 0; i < lines.length; i++) {
   if (lines[i].includes('else g.members.forEach(s => {')) {
       console.log("Found target at line " + (i+1));
       lines[i] = `          else g.members.forEach((s, sIdx) => {`;
       // Set the next line to include internal anim template
       lines[i+1] = `             let anim = s._isAuto ? \\\`animation: popIn 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) \\\${sIdx * 0.04}s forwards; opacity: 0;\\\` : '';\n             delete s._isAuto;\n             cDiv.innerHTML += \\\`<div class="member" style="\\\${anim}\\\` + '"' + \\\` draggable="true" ondragstart="drag(event, '\\\${s.id}\\\` + "'" + \\\`, '\\\${g.id}\\\` + "'" + \\\`)"><span>\\\${escapeHtml(s.nome)}</span><span class="mono">\\\${escapeHtml(s.numero)}</span></div>\\\`;`;
       found = true;
       break;
   }
}

if (found) {
    fs.writeFileSync(file, lines.join('\n'), 'utf8');
    console.log("File patched successfully!");
} else {
    console.log("Target string 'else g.members.forEach(s => {' NOT found.");
}
