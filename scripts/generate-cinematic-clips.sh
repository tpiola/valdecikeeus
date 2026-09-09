#!/usr/bin/env bash
# Generate muted, web-optimized ken-burns clips from product PNGs (no third-party footage).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/videos"
mkdir -p "$OUT"

gen() {
  local name="$1" src="$2" bg="$3" zoom_expr="$4" x_expr="$5" y_expr="$6" dur="$7" w="$8" h="$9"
  local frames
  frames=$((dur * 25))
  echo "==> $name (${w}x${h}, ${dur}s)"
  ffmpeg -y -hide_banner -loglevel error \
    -loop 1 -i "$src" \
    -filter_complex "\
color=c=${bg}:s=${w}x${h}:d=${dur}[bg];\
[0:v]scale=${w}*0.72:-1:force_original_aspect_ratio=decrease,format=rgba[fg];\
[bg][fg]overlay=(W-w)/2:(H-h)/2:shortest=1,format=yuva420p,\
zoompan=z='${zoom_expr}':x='${x_expr}':y='${y_expr}':d=${frames}:s=${w}x${h}:fps=25,format=yuv420p" \
    -t "$dur" -r 25 -c:v libx264 -preset medium -crf 23 -pix_fmt yuv420p \
    -movflags +faststart -an "$OUT/${name}.mp4"
  # lightweight webm fallback
  ffmpeg -y -hide_banner -loglevel error -i "$OUT/${name}.mp4" \
    -c:v libvpx-vp9 -b:v 0 -crf 34 -an "$OUT/${name}.webm" || true
  ls -lh "$OUT/${name}.mp4" "$OUT/${name}.webm" 2>/dev/null || ls -lh "$OUT/${name}.mp4"
}

# Hero 16:9 — slow zoom in on Toledo Preto Laranja (dark stage)
gen "hero-toledo" \
  "$ROOT/public/assets/real/produtos/toledo-preto-laranja/2k-v2/1.png" \
  "0x0f0f0f" "min(1.0+0.0009*on,1.12)" "iw/2-(iw/zoom/2)" "ih/2-(ih/zoom/2)" \
  6 1280 720

# Story — Malibu Mel Café, slight pan right + zoom
gen "story-malibu" \
  "$ROOT/public/assets/real/produtos/malibu-mel-cafe/2k-v2/1.png" \
  "0xf6f3ef" "min(1.0+0.0008*on,1.10)" "iw/2-(iw/zoom/2)+on*0.15" "ih/2-(ih/zoom/2)" \
  5 1280 720

# Story — Bahamas Café, zoom out feel (start higher)
gen "story-bahamas" \
  "$ROOT/public/assets/real/produtos/bahamas-cafe-cafe/2k-v2/1.png" \
  "0xf6f3ef" "max(1.12-0.0009*on,1.0)" "iw/2-(iw/zoom/2)" "ih/2-(ih/zoom/2)" \
  5 1280 720

# Story — Toledo Café, vertical-ish crop for mobile hero alt (9:16)
gen "story-toledo-cafe" \
  "$ROOT/public/assets/real/produtos/toledo-cafe-cafe/2k-v2/1.png" \
  "0x1a1a1a" "min(1.0+0.0010*on,1.14)" "iw/2-(iw/zoom/2)" "ih/2-(ih/zoom/2)-on*0.08" \
  5 720 1280

echo "Done. Clips in $OUT"
ls -lh "$OUT"
