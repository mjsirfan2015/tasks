if [ -z "$1" ]
  then
    echo "No argument supplied"
elif [ -z "$2" ]
  then
    mkdir MainPage/$1
    touch MainPage/$1/index.js
else
  mkdir $1
  dir="$1"
  shift
  touch MainPage/$dir/$@
  echo MainPage/$dir hi $@
fi