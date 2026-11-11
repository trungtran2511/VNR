# Project Instructions for AI Agents

This file provides instructions and context for AI coding agents working on this project.

<!-- BEGIN BEADS INTEGRATION v:1 profile:minimal hash:7510c1e2 -->
## Beads Issue Tracker

This project uses **bd (beads)** for issue tracking. Run `bd prime` to see full workflow context and commands.

### Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --claim  # Claim work
bd close <id>         # Complete work
```

### Rules

- Use `bd` for ALL task tracking — do NOT use TodoWrite, TaskCreate, or markdown TODO lists
- Run `bd prime` for detailed command reference and session close protocol
- Use `bd remember` for persistent knowledge — do NOT use MEMORY.md files

**Architecture in one line:** issues live in a local Dolt DB; sync uses `refs/dolt/data` on your git remote; `.beads/issues.jsonl` is a passive export. See https://github.com/gastownhall/beads/blob/main/docs/SYNC_CONCEPTS.md for details and anti-patterns.

## Session Completion

**When ending a work session**, you MUST complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **File issues for remaining work** - Create issues for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **PUSH TO REMOTE** - This is MANDATORY:
   ```bash
   git pull --rebase
   git push
   git status  # MUST show "up to date with origin"
   ```
5. **Clean up** - Clear stashes, prune remote branches
6. **Verify** - All changes committed AND pushed
7. **Hand off** - Provide context for next session

**CRITICAL RULES:**
- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds
<!-- END BEADS INTEGRATION -->


## Build & Test

```bash
npm run dev    # Chạy máy chủ dev
npm run build  # Build production
npm run lint   # Kiểm tra linting
npx tsc -b     # Kiểm tra kiểu TypeScript
```

## Architecture Overview

- React 19 + TypeScript + Vite 8
- Tailwind CSS v4 + Semantic Tokens
- Icon System: `lucide-react` (size chuẩn, strokeWidth=1.5)

## Mandatory UI Design Rules (Anti-AI Vibe & Universal UI Rules)

Toàn bộ giao diện phải tuân thủ nghiêm ngặt bộ quy tắc trong `UI_DESIGN_RULES.md`:
1. **Cấm Inline SVG**: 100% icon phải dùng qua `lucide-react`.
2. **Cấm Emoji cho Icon chức năng**: Chỉ dùng component icon chuẩn.
3. **Cấm Shadow to xù / Blurry Shadows**: Dùng flat surface với hairline border 1px mờ (`border-border` / `border-white/10`).
4. **Cấm lồng hộp nhiều tầng (Box-in-Box)**: Tách lớp bằng negative space và padding thay vì border liên tục.
5. **Cấm Gradient neon / bão hòa cao**: Dùng bảng màu trung tính, tĩnh lặng (Quiet / Matte), màu nhấn tiết chế.
6. **Cấm animation lòe loẹt**: Chỉ chuyển đổi trạng thái nhẹ nhàng (`duration-150` hoặc `200ms ease-out`).
7. **Icon System**: Kích thước cố định (14px action, 16-18px sidebar, 20-24px header), `strokeWidth={1.5}` bo tròn đầu nét, khoảng cách icon-chữ 5px - 8px.
8. **Semantic Tokens**: Không hardcode hex, dùng biến semantic `--background`, `--foreground`, `--border`,...
9. **Table & Form**: Bảng phẳng sát mép, action column chuẩn [Xem -> Sửa -> Xóa], skeleton loading (không dùng spinner đơn độc), ký hiệu rỗng `—`, cấm `window.alert/confirm`.
