#!/bin/bash
#!/usr/bin/env node
# Basic range in for loop


# farm_hosts=(63 71 72 73 242 243 253 254 255)
# for value in ${farm_hosts[@]}
for value in {0..337}
do
sleep 10
node get-survyes.js $value
done
echo All done