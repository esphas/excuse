#!/usr/bin/env bash

mkdir -p ~/bin
EXCUSE=~/bin/excuse bash -c 'wget -qO $EXCUSE https://github.com/esphas/excuse/raw/master/bin/excuse.sh && chmod 744 $EXCUSE'
