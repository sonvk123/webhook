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

app.post('/callback', middleware, (req, res) => {
    const signature = req.headers['x-line-signature'];
    const body = req.body;

    console.log("Request body:", body);  // Log request body

    // Xử lý webhook body
    try {
        // Xử lý các sự kiện từ LINE
        // Thêm mã xử lý sự kiện tại đây, ví dụ:
        if (body.events.length > 0) {
            body.events.forEach((event) => {
                // Xử lý từng sự kiện tại đây
            });
        }
    } catch (error) {
        console.error("Invalid signature. Please check your channel access token/channel secret.");
        return res.status(400).send('Invalid signature');
    }

    // Trả về 'OK' nếu không có lỗi
     res.sendStatus(200);
});

// Xử lý yêu cầu POST từ LINE
app.post('/line-webhook', (req, res) => {
    const events = req.body.events;

    if (events.length > 0) {
        events.forEach((event) => {
            if (event.type === 'message' && event.message.type === 'text') {
                const replyToken = event.replyToken;
                const message = {
                    type: 'text',
                    text: `Bạn đã gửi: ${event.message.text}`,
                };

                client.replyMessage(replyToken, message)
                    .catch((err) => console.error(err));
            }
        });
    }

    // Trả về mã trạng thái 200 để xác nhận đã nhận yêu cầu
    res.sendStatus(200);
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
