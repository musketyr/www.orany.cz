# AGENTS.md — telegraphic.dev Blog

## Workflow

- Start from latest `main` before new work.
- Use feature branches / worktrees.
- Use the normal GitHub + PR workflow.
- Run the relevant build/checks before pushing.

## Content / Publishing

- Blog content lives in repo content files with frontmatter; keep repo-specific publishing rules here rather than in root memory.
- If importing from Compose, validate frontmatter, slug/date format, and rendered Markdown output.
- Prefer repeatable content transformation steps over one-off manual edits.

## Deploy

- Use the normal GitHub-driven deployment path.
- Do not invent alternate deployment shortcuts without approval.

## Documentation

- Repo-specific blog/import details belong here or in repo docs.
- Root `MEMORY.md` should only keep cross-project truths, not blog implementation details.
