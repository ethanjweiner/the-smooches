#!/bin/sh

DIR="$( cd "$( dirname "$0" )" && pwd )"

$DIR/build.sh
$DIR/push.sh
$DIR/configure.sh