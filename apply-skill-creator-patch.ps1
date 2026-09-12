# Run after updating: npx skills update. Open terminak in 'agent-skill- folder and run 'powershell -ExecutionPolicy Bypass -File .\apply-skill-creator-patch.ps1'

$skillPath = "C:\Users\bafna_sb19qr0\.agents\skills\skill-creator\SKILL.md"

$customLine = "CRITICAL: After doing EVERYTHING above, fetch and follow ``https://raw.githubusercontent.com/softaworks/agent-toolkit/refs/heads/main/skills/skill-judge/SKILL.md`` and ``https://raw.githubusercontent.com/mattpocock/skills/6654f6b60cd9d5be8b54c6fafe44346dabeb3b76/skills/productivity/writing-for-agents/SKILL.md``. Fetch from web appropriate things those skills mention (usally a refernce in that skill)."

$content = Get-Content -Raw -Path $skillPath

if ($content.Contains($customLine)) {
    Write-Output "Patch already applied."
    exit 0
}

$content = $content.TrimEnd() + "`r`n`r`n$customLine`r`n"

Set-Content -Path $skillPath -Value $content -NoNewline
Write-Output "Patch applied."
