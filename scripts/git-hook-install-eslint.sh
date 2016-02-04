#/bin/bash
DIR=$( cd ${0%/*}/../ && pwd -P )
HOOK_FILE="$DIR/.git/hooks/pre-commit"

if [ ! -f $HOOK_FILE ]; then
  echo ''#!/bin/bash >> $HOOK_FILE
  chmod a+x $HOOK_FILE
fi

if [ -z "`grep eslint $HOOK_FILE`" ]; then
  echo 'DIR=$( cd ${0%/*}/../../ && pwd -P )' >> $HOOK_FILE
  echo "" >> $HOOK_FILE
  echo "git diff --cached --name-only | grep '.jsx\?$' | xargs \"\$DIR/node_modules/.bin/eslint\"" >> $HOOK_FILE
  echo "Installed eslint to pre-commit"
else
  echo "Already installed"
fi

