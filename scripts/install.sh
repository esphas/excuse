#!/usr/bin/env bash
if [[ "$OSTYPE" == "darwin"* ]]; then
    BINPATH=/usr/local/bin
else
    # assuming it is Linux
    BINPATH=~/bin
    mkdir -p ~/bin
fi
EXCUSE=$BINPATH/excuse bash -c 'wget -qO $EXCUSE https://github.com/esphas/excuse/raw/master/bin/excuse.sh && chmod 744 $EXCUSE'