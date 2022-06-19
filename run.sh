#!/bin/bash

dir=$(dirname "$(readlink -f "$BASH_SOURCE")")
cd "$dir"
selected_text="$(xsel -p)"
xmessage -nearmouse "$(node src/timestamp_helper.js ${selected_text})"
