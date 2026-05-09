---
name: commit
description: Archive and sync a completed OpenSpec change, then create a Conventional Commit and push the current branch. Use when the user asks to commit, archive-and-commit, sync OpenSpec changes before committing, create a feat/fix/chore commit, or push completed OpenSpec work.
---

# Commit

Finish an OpenSpec change cleanly: verify completion, archive/sync it, commit the intended work with a Conventional Commit message, then push.

## Workflow

1. **Select the OpenSpec change**

   - If the user names a change, use it.
   - Otherwise run `openspec list --json`.
   - Auto-select only when exactly one active change has `status: "complete"`.
   - If multiple complete changes exist, or none are complete, ask the user which change to archive and commit.
   - Announce the selected change.

2. **Verify completion**

   - Run `openspec instructions apply --change "<change>" --json`.
   - Proceed only when `state` is `all_done` and `progress.remaining` is `0`.
   - If tasks remain, stop and tell the user to finish or apply the change first.
   - Run `openspec validate "<change>"` when available for the workflow; if validation fails, stop and report the failure.

3. **Inspect the working tree before archiving**

   - Run `git status --short --branch`.
   - Read the relevant diff with `git diff` and `git diff --stat`.
   - Identify files that belong to the selected change.
   - If unrelated dirty files are present, do not stage them silently. Ask whether to include them, leave them unstaged, or pause.
   - Never revert user changes.

4. **Archive and sync OpenSpec**

   - Run `openspec archive "<change>"`.
   - This is the canonical archive-sync step: it archives the change under `openspec/changes/archive/` and updates main specs from the change deltas.
   - If the archive command reports conflicts, missing tasks, or validation errors, stop and summarize the issue.
   - After archiving, run `openspec list --json` or inspect `openspec/changes/archive/` to confirm the active change is gone.

5. **Review final diff**

   - Run `git status --short --branch` and `git diff --stat`.
   - Confirm the final staged scope before committing.
   - Stage only intended files with explicit `git add <paths>`.
   - If the user explicitly asked to commit everything, `git add -A` is acceptable after summarizing the scope.

6. **Choose a Conventional Commit message**

   - Use `<type>(<scope>): <summary>` when a scope is clear; otherwise `<type>: <summary>`.
   - Prefer these types:
     - `feat`: user-visible feature or capability
     - `fix`: bug fix
     - `chore`: maintenance, tooling, OpenSpec-only archive, dependency/config upkeep
     - `docs`: documentation-only change
     - `test`: tests-only change
     - `refactor`: code change without behavior change
     - `build`: build system or package changes
     - `ci`: CI workflow changes
   - Infer the type from the implementation diff, not the OpenSpec proposal title alone.
   - Keep the summary imperative, lowercase where natural, and under about 72 characters.
   - Examples:
     - `fix(server): normalize structured error responses`
     - `feat(auth): standardize token refresh flow`
     - `chore(openspec): archive auth token flow change`

7. **Commit**

   - Run `git diff --cached --check`.
   - Run `git commit -m "<message>"`.
   - If no files are staged, stop and explain why.
   - If hooks modify files or fail, inspect status, fix or report, then retry only when appropriate.

8. **Push**
   - Determine the current branch with `git branch --show-current`.
   - Push to origin with `git push origin <branch>`.
   - If the branch has no upstream and the push command needs `-u`, ask for approval before using a different push command.
   - If push is rejected because the remote moved, stop and report; do not force-push unless the user explicitly asks.

## Output

On success, report:

- archived change name and archive path
- commit SHA and commit message
- pushed branch and remote
- any unrelated dirty files left behind

Keep the final response brief and include the relevant git app directives when staging, committing, or pushing succeeded.
