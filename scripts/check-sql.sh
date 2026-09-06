#!/usr/bin/env bash
# Runs the migrations the way he will run them, before he runs them.
#
# Two SQL files get pasted into Supabase by hand, and a mistake in either is
# a red error on a phone with nothing to do about it. This stands up a real
# Postgres, applies them to an empty database, applies them a second time to
# prove they are safe to repeat, and then asks the policies who can read what.
#
#   ./scripts/check-sql.sh
#
# Needs postgresql-16 binaries (/usr/lib/postgresql/16/bin) and psql.
set -euo pipefail

BIN=${PG_BIN:-/usr/lib/postgresql/16/bin}
WORK=$(mktemp -d)
DATA=$WORK/pg
PORT=${PG_PORT:-55433}
SOCK=$(mktemp -d)
HERE=$(cd "$(dirname "$0")/.." && pwd)

stop() { "$BIN/pg_ctl" -D "$DATA" -m immediate stop >/dev/null 2>&1 || true; }
trap stop EXIT

# initdb refuses to run as root, so borrow a plain user when we are one.
AS=""
if [ "$(id -u)" = "0" ]; then
  id pg >/dev/null 2>&1 || useradd -m pg
  mkdir -p "$DATA" "$SOCK"
  chmod 755 "$WORK" "$(dirname "$SOCK")"
  chown -R pg "$WORK" "$SOCK"
  AS="su pg -c"
fi

run() { if [ -n "$AS" ]; then $AS "$1"; else bash -c "$1"; fi }

run "$BIN/initdb -D $DATA -U pg --auth=trust" >/dev/null
# A unix socket only: no port to collide with anything else on the machine.
run "$BIN/pg_ctl -D $DATA -o \"-p $PORT -k $SOCK -h ''\" -l $DATA/log start" >/dev/null
export PGHOST=$SOCK PGPORT=$PORT PGUSER=pg

psql -q -d postgres -c "create database mypromo" >/dev/null

apply() {
  printf '%-24s' "$(basename "$1")"
  if psql -q -v ON_ERROR_STOP=1 -d mypromo -f "$1" >/dev/null 2>"$DATA/err"; then
    echo "ok"
  else
    echo "FAILED"; grep -iE "ERROR|FATAL" "$DATA/err" | head -5; exit 1
  fi
}

echo "— on an empty database"
apply "$HERE/supabase/test/stub.sql"
apply "$HERE/supabase/schema.sql"
apply "$HERE/supabase/social.sql"

echo "— and again, because it is pasted twice as often as not"
apply "$HERE/supabase/schema.sql"
apply "$HERE/supabase/social.sql"

echo "— who can read what"
if psql -q -v ON_ERROR_STOP=1 -d mypromo -f "$HERE/supabase/test/rls.sql" >/dev/null 2>"$DATA/rls"; then
  sed -n 's/.*NOTICE:  ok  /  ok  /p' "$DATA/rls"
else
  echo "  FAILED"; grep -iE "ERROR|FATAL" "$DATA/rls" | head -5; exit 1
fi
