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

// Định nghĩa endpoint webhook
app.post('/webhook', (req, res) => {
    const events = req.body.events;

    if (events.length > 0) {
        events.forEach((event) => {
            if (event.type === 'message') {
                // In chi tiết tin nhắn lên màn hình
                console.log("Received message from user:");
                console.log("User ID:", event.source.userId);
                console.log("Message type:", event.message.type);
                console.log("Message text:", event.message.text);
            }
        });
    }

    // Trả về mã trạng thái 200 OK
    res.sendStatus(200);
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
