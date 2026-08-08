#!/usr/bin/env bash
#
# Assembles the preview site into a directory any static server can host.
#
# The site loads a theme from themes/<name>/, while this repo keeps each theme at
# the root, because that root folder is what you copy into a Redmine install.
# This script is the only place that bridges the two layouts, so the Pages deploy
# and the downloadable bundle are always assembled the same way.
#
#   script/build-site.sh [output-dir]      default: _site
#
set -euo pipefail

THEMES=(atlas zen umbra dense folio)

cd "$(dirname "$0")/.."
out=${1:-_site}

rm -rf "$out"
mkdir -p "$out/themes"

cp index.html "$out/"
cp preview/README.md "$out/README.md"
cp COPYING "$out/"
# jstoolbar/ holds the wiki-toolbar glyphs Redmine ships, referenced by
# stylesheets/jstoolbar.css. They are Tabler Icons under the MIT licence, which
# requires its notice to travel with them — so doc/licenses/ ships too.
cp -r preview stylesheets jstoolbar doc "$out/"

for theme in "${THEMES[@]}"; do
  for required in stylesheets/application.css javascripts/theme.js; do
    if [ ! -f "$theme/$required" ]; then
      echo "build-site: $theme/$required is missing — refusing to publish a broken preview" >&2
      exit 1
    fi
  done
  cp -r "$theme" "$out/themes/"
done

echo "build-site: staged ${#THEMES[@]} themes into $out/"
