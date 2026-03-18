import sys, os

file = 'worker.js'
with open(file, 'r', encoding='utf-8') as f:
    lines = f.readlines()

found = False
for i in range(len(lines)):
    if 'let anim = s._isAuto ?' in lines[i] and 'popIn' in lines[i]:
        print(f"Fixing broken template escaping on line {i+1}")
        
        # Using raw string r"..." to ensure exact literal backslashes are written and preserved.
        lines[i] = r"              let anim = s._isAuto ? \\\`animation: popIn 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) \\\${sIdx * 0.04}s forwards; opacity: 0;\\\` : '';" + "\n"
        
        # Line i + 2 is the InnerHTML append
        lines[i + 2] = r"              cDiv.innerHTML += \\\`<div class='member' style='\\\${anim}\\\` + '\"' + \\\` draggable='true' ondragstart='drag(event, \"\\\${s.id}\\\", \"\\\${g.id}\\\")\'><span>\\\${escapeHtml(s.nome)}</span><span class='mono'>\\\${escapeHtml(s.numero)}</span></div>\\\`;" + "\n"
        found = True
        break

if found:
    with open(file, 'w', encoding='utf-8') as f:
        f.writelines(lines)
    print("Pre-fixed accurately.")
else:
    print("Could not locate broken line.")
