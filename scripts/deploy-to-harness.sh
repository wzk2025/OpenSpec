#!/usr/bin/env bash
set -euo pipefail

# Deploy customized OpenSpec CLI to rd_harness as 'rd' command
#
# Usage: bash scripts/deploy-to-harness.sh [/path/to/rd_harness]
#
# Outputs:
#   rd_harness/.harness/bin/rd.js    - CLI entry point
#   rd_harness/.harness/bin/dist/    - Compiled TypeScript
#   rd_harness/.harness/bin/schemas/ - Workflow schemas
#   rd_harness/.harness/bin/node_modules/ - Production dependencies

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OPENSPEC_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
HARNESS_ROOT="${1:-/work/repos/aios/rd_harness}"
HARNESS_BIN="$HARNESS_ROOT/.harness/bin"

if [ ! -d "$HARNESS_ROOT" ]; then
  echo "Error: rd_harness directory not found at $HARNESS_ROOT"
  echo "Usage: bash scripts/deploy-to-harness.sh [/path/to/rd_harness]"
  exit 1
fi

echo "=== Deploying rd CLI to $HARNESS_BIN ==="

# Step 1: Build OpenSpec
echo "Building OpenSpec..."
cd "$OPENSPEC_ROOT"
pnpm run build

# Step 2: Clean target directory (preserve node_modules if exists to speed up reinstall)
echo "Preparing target directory..."
rm -rf "$HARNESS_BIN/dist" "$HARNESS_BIN/schemas"
mkdir -p "$HARNESS_BIN"

# Step 3: Copy compiled dist
echo "Copying dist/..."
cp -r "$OPENSPEC_ROOT/dist" "$HARNESS_BIN/dist"

# Step 4: Copy schemas (required at runtime by artifact-graph/resolver.ts)
echo "Copying schemas/..."
cp -r "$OPENSPEC_ROOT/schemas" "$HARNESS_BIN/schemas"

# Step 5: Create rd.js entry point
echo "Creating rd.js entry point..."
cat > "$HARNESS_BIN/rd.js" << 'ENTRY'
#!/usr/bin/env node
import './dist/cli/index.js';
ENTRY
chmod +x "$HARNESS_BIN/rd.js"

# Step 6: Create minimal package.json for version detection
# dist/cli/index.js does require('../../package.json') to get version
VERSION=$(node -e "console.log(require('$OPENSPEC_ROOT/package.json').version)")
cat > "$HARNESS_BIN/package.json" << PKGJSON
{
  "name": "rd",
  "version": "$VERSION",
  "type": "module"
}
PKGJSON

# Step 7: Install production dependencies
# Compiled JS uses bare specifiers (commander, chalk, etc.)
# Node.js walks up from dist/ to find node_modules/ at .harness/bin/
echo "Installing production dependencies..."
cd "$HARNESS_BIN"

# Temporarily use full package.json for npm install
cp "$OPENSPEC_ROOT/package.json" package-full.json
cp package.json package-minimal.json
cp package-full.json package.json
npm install --omit=dev --ignore-scripts 2>&1 | tail -3
mv package-minimal.json package.json
rm -f package-full.json

echo ""
echo "=== Deploy complete ==="
echo "Binary:  $HARNESS_BIN/rd.js"
echo "Version: $VERSION"
echo ""
echo "Usage:"
echo "  node $HARNESS_BIN/rd.js --help"
echo "  node $HARNESS_BIN/rd.js init --tools claude --force"
