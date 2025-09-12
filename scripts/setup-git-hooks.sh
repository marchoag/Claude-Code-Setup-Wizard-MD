#!/usr/bin/env bash
set -euo pipefail

HOOK_FILE=".git/hooks/pre-push"

cat > "$HOOK_FILE" <<'HOOK'
#!/usr/bin/env bash
echo "➡️  Running pre-push checks (npm run ci)..."
npm run ci
status=$?
if [ $status -ne 0 ]; then
  echo "❌ Pre-push checks failed. Push aborted."
  exit $status
fi
echo "✅ Pre-push checks passed. Proceeding with push."
exit 0
HOOK

chmod +x "$HOOK_FILE"
echo "✅ Installed pre-push hook at $HOOK_FILE"
echo "Pushes will now run 'npm run ci' and block on failure."

