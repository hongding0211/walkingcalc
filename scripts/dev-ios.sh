#!/bin/sh
set -eu

detect_lan_ip() {
  default_iface="$(route get default 2>/dev/null | awk '/interface:/{print $2; exit}')"

  if [ -n "${default_iface:-}" ]; then
    ipconfig getifaddr "$default_iface" 2>/dev/null || true
  fi

  return 0
}

HOST_IP="${WALKCALC_DEV_HOST:-${LAN_IP:-}}"

if [ -z "$HOST_IP" ]; then
  HOST_IP="$(detect_lan_ip)"
fi

if [ -z "$HOST_IP" ]; then
  for iface in en0 en1 en2; do
    HOST_IP="$(ipconfig getifaddr "$iface" 2>/dev/null || true)"
    if [ -n "$HOST_IP" ]; then
      break
    fi
  done
fi

if [ -z "$HOST_IP" ]; then
  HOST_IP="127.0.0.1"
  echo "Could not detect a LAN IP. Falling back to $HOST_IP."
fi

export EXPO_PUBLIC_HONG97_WEB_BASE_URL="${EXPO_PUBLIC_HONG97_WEB_BASE_URL:-http://$HOST_IP:3000}"
export EXPO_PUBLIC_WALKCALC_API_BASE_URL="${EXPO_PUBLIC_WALKCALC_API_BASE_URL:-http://$HOST_IP:3500}"

PORT="${EXPO_DEV_PORT:-8081}"

echo "Frontend: $EXPO_PUBLIC_HONG97_WEB_BASE_URL"
echo "API:      $EXPO_PUBLIC_WALKCALC_API_BASE_URL"
echo "Expo:     http://$HOST_IP:$PORT"

exec yarn expo start --ios --go --port "$PORT" "$@"
