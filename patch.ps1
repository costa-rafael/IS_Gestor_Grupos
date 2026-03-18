$lines = Get-Content "worker.js"
$newLines = @()
$skipNext = $false

foreach ($line in $lines) {
    if ($skipNext) {
        $skipNext = $false
        continue
    }

    if ($line -like "*else g.members.forEach(s => {*") {
        $newLines += "          else g.members.forEach((s, sIdx) => {"
        $newLines += "              let anim = s._isAuto ? \\\`animation: popIn 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) \\\${sIdx * 0.04}s forwards; opacity: 0;\\\` : '';"
        $newLines += "              delete s._isAuto;"
        $newLines += "              cDiv.innerHTML += \\\`<div class=\`\"member\`\" style=\`\"\\\${anim}\`\" draggable=\`\"true\`\" ondragstart=\`\"drag(event, '\\\${s.id}\\\', '\\\${g.id}\\\')\`\"><span>\\\${escapeHtml(s.nome)}</span><span class=\`\"mono\`\">\\\${escapeHtml(s.numero)}</span></div>\\\`;"
        $skipNext = $true
    } else {
        $newLines += $line
    }
}

$newLines | Set-Content "worker.js"
Write-Host "Patched successfully!"
