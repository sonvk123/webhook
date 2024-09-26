const express = require('express');
const bodyParser = require('body-parser');
const line = require('@line/bot-sdk');

const app = express();
const PORT = process.env.PORT || 3000;

const config = {
    channelAccessToken: 'deE4udp88RRg1nOG62cVcoiqf5r6vxFRCJ/FAHHGW0vn2VF1fKYklGXQYVQo0/0+2dQMm1YNzEsdQ3z1zvJNhqsSXWv1Q2uHkd74bzZdbrjLaaF39c7FFhDRsMDM1hG7etppLiudQVgo50s/xcvcKAdB04t89/1O/w1cDnyilFU=',
    channelSecret: '7695b7d3fe457cc0df98f8657f00eaa6',
};

// Middleware để phân tích dữ liệu JSON
app.use(bodyParser.json());

app.post('/test', (req, res) => {
    res.status(200).json({
        "success": true,
        "timestamp": new Date().toISOString(),
        "statusCode": 200,
        "reason": "OK",
        "detail": "200"
    });
});

app.post('/callback', (req, res) => {
    res.status(200).json({
        "success": true,
        "timestamp": new Date().toISOString(),
        "statusCode": 200,
        "reason": "OK",
        "detail": "200"
    });
});

// Xử lý yêu cầu POST từ LINE
app.post('/line-webhook', (req, res) => {
    res.status(200).json({
        "success": true,
        "timestamp": new Date().toISOString(),
        "statusCode": 200,
        "reason": "OK",
        "detail": "200"
    });
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
