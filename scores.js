const jsonBody = require("body/json");
var scores = [{name: "Edwin", score: 50}, {name: "David", score: 39}];
var resources = { "/scores": scores };
// const textBody = require("body");
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    var body;
    if (req.method === "GET") {
        if (resources[req.url] === undefined) {
            res.statusCode = 404;
        } else {
            res.statusCode = 200;
            res.setHeader("content-type", "application/json")
            body = scores;
        }
    } else if (req.method === "POST") {
        res.statusCode = 201;
        jsonBody(req, res, (err, reqBody) => {
            resources[req.url].push(reqBody);
            var sorted = scores.sort(function(a, b){
                return a.score - b.score
            })
            sorted.reverse();
            var topThree = [];
            topThree.push(sorted[0, 1, 2])
            body = topThree;
        })
    }
    res.end(JSON.stringify(body))
});

server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}/`);
});