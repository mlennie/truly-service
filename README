## Truly Number Service

### 1. Install dependencies

npm install

### 2. Run Node Server

PORT=8080 HOST=localhost node app/app.js

### Test

### Querying

curl http://172.17.0.3:30400/query?number=%2B17046366868

#### Adding number

curl -X POST -d '{ "name": "Bob Barker", "number": "+17046366868", "context": "house" }' -H "Content-Type: application/json" http://172.17.0.3:30400/number

#### Adding number that exists with same context returns error

curl -X POST -d '{ "name": "Bob Barker", "number": "+17046366868", "context": "space" }' -H "Content-Type: application/json" http://172.17.0.3:30400/number

