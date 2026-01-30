#!/bin/bash
#
# Almadar Language Tests Runner
#
# This script runs all language tests using the almadar CLI.
# It validates and compiles each test schema, ensuring the language works correctly.
#
# Usage: ./run-tests.sh [--verbose] [--shell <typescript|python>]
#

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SCHEMAS_DIR="$SCRIPT_DIR/schemas"
VERBOSE=false
SHELL="typescript"
FAILED=0
PASSED=0

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --verbose|-v)
      VERBOSE=true
      shift
      ;;
    --shell|-s)
      SHELL="$2"
      shift 2
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
done

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo "======================================"
echo "  Almadar Language Tests"
echo "======================================"
echo ""
echo "Shell: $SHELL"
echo "Schemas: $SCHEMAS_DIR"
echo ""

# Check if almadar CLI is available
if ! command -v almadar &> /dev/null; then
  echo -e "${RED}Error: 'almadar' CLI not found in PATH${NC}"
  echo "Please install the almadar CLI first."
  exit 1
fi

# Get almadar version
echo "Almadar CLI version: $(almadar --version 2>/dev/null || echo 'unknown')"
echo ""
echo "--------------------------------------"

# Run tests
for schema in "$SCHEMAS_DIR"/*.orb; do
  name=$(basename "$schema")

  echo -n "Testing $name ... "

  # Step 1: Validate
  if $VERBOSE; then
    echo ""
    echo "  Validating..."
  fi

  if ! almadar validate "$schema" 2>&1; then
    echo -e "${RED}FAILED${NC} (validation)"
    if $VERBOSE; then
      almadar validate "$schema" 2>&1 || true
    fi
    FAILED=$((FAILED + 1))
    continue
  fi

  # Step 2: Compile (dry run to check code generation)
  if $VERBOSE; then
    echo "  Compiling to $SHELL..."
  fi

  # Create temp directory for output
  TEMP_DIR=$(mktemp -d)

  if ! almadar compile "$schema" --shell "$SHELL" --output "$TEMP_DIR" 2>&1; then
    echo -e "${RED}FAILED${NC} (compilation)"
    if $VERBOSE; then
      almadar compile "$schema" --shell "$SHELL" --output "$TEMP_DIR" 2>&1 || true
    fi
    rm -rf "$TEMP_DIR"
    FAILED=$((FAILED + 1))
    continue
  fi

  # Check that output was generated
  if [ ! -d "$TEMP_DIR" ] || [ -z "$(ls -A "$TEMP_DIR" 2>/dev/null)" ]; then
    echo -e "${YELLOW}WARN${NC} (no output generated)"
    rm -rf "$TEMP_DIR"
    FAILED=$((FAILED + 1))
    continue
  fi

  # Cleanup
  rm -rf "$TEMP_DIR"

  echo -e "${GREEN}PASSED${NC}"
  PASSED=$((PASSED + 1))
done

echo ""
echo "--------------------------------------"
echo "Results: $PASSED passed, $FAILED failed"
echo "--------------------------------------"

if [ $FAILED -gt 0 ]; then
  echo -e "${RED}Some tests failed!${NC}"
  exit 1
else
  echo -e "${GREEN}All tests passed!${NC}"
  exit 0
fi
