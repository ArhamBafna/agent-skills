---
name: link-agents-md
description: Hardlink C:\Users\bafna_sb19qr0\Desktop\AGENTS.md to global rule files for AI coding agents and IDEs. Triggers on "link AGENTS.md", "sync global rules to <agent>", "connect agent rules", or /link-agents-md.
---

# link-agents-md

Hardlink `C:\Users\bafna_sb19qr0\Desktop\AGENTS.md` to target agent global rules file via NTFS hardlink (`mklink /H`).

## Invariants
* **Source:** `C:\Users\bafna_sb19qr0\Desktop\AGENTS.md` (single source of truth).
* **Link type:** NTFS file hardlink (`mklink /H`). Files only. No folders.
* **Volume boundary:** Same drive volume (`C:`) only.

---

## Active Registered Links

| Agent / Tool | Target File Path |
| :--- | :--- |
| **Desktop (Source)** | `C:\Users\bafna_sb19qr0\Desktop\AGENTS.md` |
| **Windsurf** | `C:\Users\bafna_sb19qr0\.codeium\windsurf\memories\global_rules.md` |
| **Trae** | `C:\Users\bafna_sb19qr0\.trae\user_rules\AGENTS.md` |
| **OpenCode** | `C:\Users\bafna_sb19qr0\.config\opencode\AGENTS.md` |
| **Antigravity / Gemini** | `C:\Users\bafna_sb19qr0\.gemini\GEMINI.md` |
| **Copilot** | `C:\Users\bafna_sb19qr0\.copilot\copilot-instructions.md` |
| **Codex** | `C:\Users\bafna_sb19qr0\.codex\AGENTS.md` |
| **Devin (Profile)** | `C:\Users\bafna_sb19qr0\.devin\AGENTS.md` |
| **Devin (AppData)** | `C:\Users\bafna_sb19qr0\AppData\Roaming\Devin\AGENTS.md` |

---

## Workflow

### 1. Resolve Target Path
* **Agent name given:** Search docs/web for global rules path on Windows (`%USERPROFILE%` or `%APPDATA%`).
* **Path given:** Normalize path (`\`). If parent path invalid or ambiguous, ask user before link.

### 2. Collision & Inode Check
Run check:
```powershell
fsutil hardlink list "<target_file_path>"
```
* **Already hardlinked to source:** Stop. Report active.
* **Unlinked file exists:** Ask user choice before touch:
  1. Backup to `<file>.bak` + replace with hardlink.
  2. Overwrite direct with hardlink.
  3. Review diff / merge rules first.
  4. Cancel.

### 3. Create Hardlink
Ensure parent dir exists, then link:
```powershell
if (!(Test-Path "<parent_dir>")) { New-Item -ItemType Directory -Force -Path "<parent_dir>" }
cmd /c mklink /H "<target_file_path>" "C:\Users\bafna_sb19qr0\Desktop\AGENTS.md"
```

### 4. Verify Hardlink
```powershell
fsutil hardlink list "<target_file_path>"
```
Criterion: target path appears in output list.

### 5. Update Registry & Push
1. Edit `C:\Users\bafna_sb19qr0\Desktop\Projects\agent-skills\skills\link-agents-md\SKILL.md`. Add new row to **Active Registered Links** table.
2. Commit and push `agent-skills`:
```powershell
git -C "C:\Users\bafna_sb19qr0\Desktop\Projects\agent-skills" add .
git -C "C:\Users\bafna_sb19qr0\Desktop\Projects\agent-skills" commit -m "feat(link-agents-md): register <agent_name> link"
git -C "C:\Users\bafna_sb19qr0\Desktop\Projects\agent-skills" push
```
Criterion: git push exit 0.