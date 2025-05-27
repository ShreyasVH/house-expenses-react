cd build

if ! lsof -i :$PORT > /dev/null; then
    echo "Starting"
    serve -s . --single > server.log 2>&1 &
fi

cd ../