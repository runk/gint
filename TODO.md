## TODO

### Make hook snippet compatible with existing hooks

 - Keep footprint small, essentially shebang and one line that points to the `bin/handler` that does the rest.
 - When hook script exists, amend it with the one line instead of ignoring the setup at all.
 - Add setup health check at start up.

### Check ideas:

See https://git-scm.com/docs/githooks for details.

 - Prevent rebasing (via `pre-rebase`)
 - No push to master branch (via `pre-push`)
 - Branch name pattern (via `pre-commit` and parsing git refs)
 - Limit number of files changed (via `pre-commit`)
 - Limit number of lines changed (via `pre-commit`)
 - External cmd (or script from package.json)
