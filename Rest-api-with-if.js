const http = require('http');

const server = http.createServer((req,res)=>{
    if(req.url === '/'){
        res.write('Hello world');
        console.log('Requested for /');
        res.end();
    }
//routes req /api/courses
    if (req.url === '/api/courses'){
        res.write(JSON.stringify([1,2,3,4,5]));
        console.log('Requested for /api');
        res.end();
    }
});

server.listen(3000);

console.log('Listening to port 3000');