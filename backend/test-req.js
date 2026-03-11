const http = require('http');

const data = JSON.stringify({
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123'
});

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/register',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);
    let resData = '';
    res.on('data', d => {
        resData += d;
    });
    res.on('end', () => {
        console.log(resData);
    });
});

req.on('error', error => {
    console.error(error);
});

req.write(data);
req.end();
