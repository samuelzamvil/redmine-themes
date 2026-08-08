#!/usr/bin/env bash
#
# Builds every release asset into a directory.
#
#   script/build-release.sh [output-dir]        default: _release
#
# Each theme archive carries a copy of COPYING inside the theme folder, so the
# licence travels with the theme when someone unpacks one on its own — the folder
# is the unit people copy around, not this repo.
#
set -euo pipefail

THEMES=(atlas zen umbra dense folio)

cd "$(dirname "$0")/.."
out=${1:-_release}

rm -rf "$out"
mkdir -p "$out"
stage=$(mktemp -d)
trap 'rm -rf "$stage"' EXIT

# Theme folders, each with the licence dropped in.
for theme in "${THEMES[@]}"; do
  cp -r "$theme" "$stage/"
  cp COPYING "$stage/$theme/"
done

# One archive per theme, plus one holding all of them. Both unpack with the theme
# folder at the archive root, straight into a Redmine themes/ directory.
for theme in "${THEMES[@]}"; do
  (cd "$stage" && zip -qr "$OLDPWD/$out/$theme.zip" "$theme")
done
(cd "$stage" && zip -qr "$OLDPWD/$out/redmine-themes-all.zip" "${THEMES[@]}")

# The mock Redmine, as a site anyone can host.
script/build-site.sh "$stage/redmine-mock-site"
(cd "$stage" && zip -qr "$OLDPWD/$out/redmine-mock-site.zip" redmine-mock-site)

echo "build-release: assets in $out/"
ls -1sh "$out"
