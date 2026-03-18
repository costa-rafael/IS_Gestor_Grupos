import sys, os

file = 'worker.js'
if not os.path.exists(file):
    print("File not found")
    sys.exit(1)

with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace line ending discrepancies if any to ensure clean row splits
lines = content.split('\n')

found = False
for i in range(len(lines)):
    if 'else g.members.forEach(s => {' in lines[i]:
        print(f"Found match at line {i+1}")
        lines[i] = lines[i].replace('forEach(s => {', 'forEach((s, sIdx) => {')
        
        # Insert animation lines below- Delay increments
        anim_block = "             let anim = s._isAuto ? \\\`animation: popIn 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) \\\${sIdx * 0.04}s forwards; opacity: 0;\\\` : '';\n             delete s._isAuto;"
        lines.insert(i + 1, anim_block)
        
        # Modify the render line (now line i + 2)
        lines[i + 2] = lines[i + 2].replace('draggable="true"', 'style="\\\${anim}\\\` + \'"\' + \\\` draggable="true"')
        found = True
        break

if found:
    with open(file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    print("Patched successfully!")
else:
    print("Target string 'else g.members.forEach(s => {' NOT found.")
