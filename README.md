
commands that can be run:
-n == --name
-s == --size
-m == --modify

fist commands :  cd bin
node index.js ./folder --type "text"
node index.js ./folder --type "text,image"
node index.js ./folder --type "text" -n
node index.js ./folder --type "text,image" --name
node index.js ./folder --type "text,image" --modify
node index.js ./folder --type "text,image" -n -s -m 
node index.js ./folder --type "text,image" -n -s -m --output ./category