import sys, os

file = 'worker.js'
with open(file, 'r', encoding='utf-8') as f:
    lines = f.readlines()

found = False
for i in range(len(lines)):
    if 'activeGroups.forEach(g =>' in lines[i]:
        print(f"Found activeGroups loop around line {i+1}")
        
        # Verify block indexing from previous view:
        # i + 1: const div = createElement
        # i + 2: className = group
        # i + 3: setAttribute ondragover...
        # i + 4: div.innerHTML = 
        
        if (i + 4 < len(lines)) and ('div.innerHTML =' in lines[i + 4]):
             print("Patching group node innerHTML mappings...")
             
             lines[i+3] = r"          div.setAttribute('ondragover', 'allowDrop(event)'); div.setAttribute('ondragleave', 'leaveDrop(event)'); div.setAttribute('ondrop', \\\`drop(event, '\\\${g.id}')\\\`);" + "\n"
             lines[i+4] = r"          div.innerHTML = \\\`<h3><span style='cursor: text;' title='Duplo-clique para renomear' ondblclick='editGroupName(\"\\\${g.id}\\\")' id='name_\\\${g.id}'>\\\${escapeHtml(g.name)}</span><span class='mono'>\\\${g.members.length}</span></h3>\\\`;" + "\n"
             found = True
        
        # Now find the inner template for let anim and innerHTML inside
        for j in range(i + 4, i + 15):
             if j < len(lines) and 'let anim =' in lines[j]:
                 print(f"Patching inner member innerHTML mapping at line {j+1}")
                 lines[j] = r"              let anim = s._isAuto ? \\\`animation: popIn 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) \\\${sIdx * 0.04}s forwards; opacity: 0;\\\` : '';" + "\n"
                 
                 if j + 2 < len(lines) and 'cDiv.innerHTML +=' in lines[j+2]:
                      lines[j+2] = r"              cDiv.innerHTML += \\\`<div class='member' style='\\\${anim}\\\` + '\"' + \\\` draggable='true' ondragstart='drag(event, \"\\\${s.id}\\\", \"\\\${g.id}\\\")\' ondragend='this.classList.remove(\"dragging\")\'><span>\\\${escapeHtml(s.nome)}</span><span class='mono'>\\\${escapeHtml(s.numero)}</span></div>\\\`;" + "\n"
                 break
        break

if found:
    with open(file, 'w', encoding='utf-8') as f:
        f.writelines(lines)
    print("File patched successfully.")
else:
    print("Target section activeGroups.forEach not found.")
