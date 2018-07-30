## Truly Number Service

### 1. Install dependencies

npm install

### 2. Run Node Server

PORT=8080 HOST=127.0.0.1 node app/app.js

### 3. Test

#### Querying

curl http://127.0.0.1:8080/query?number=%2B17046366868

#### Adding number

curl -X POST -d '{ "name": "Bob Barker", "number": "+17046366868", "context": "house" }' -H "Content-Type: application/json" http://127.0.0.1:8080/number

#### Adding number that exists with same context returns error

curl -X POST -d '{ "name": "Bob Barker", "number": "+17046366868", "context": "space" }' -H "Content-Type: application/json" http://127.0.0.1:8080/number

### TODO

Stop CSV reading after first number with same context found during POST to increase performance
