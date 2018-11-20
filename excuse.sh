#!/bin/bash

curl -s programmingexcuses.com | egrep -o "<a[^<>]+>[^<>]+</a>" | egrep -o "[^<>]+" | sed -n 2p
