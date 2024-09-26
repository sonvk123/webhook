const express = require('express');
const bodyParser = require('body-parser');
const line = require("@line/bot-sdk");

const app = express();
const PORT = process.env.PORT || 3000;

// Cấu hình LINE SDK
const config = {
  channelAccessToken: "YOUR_CHANNEL_ACCESS_TOKEN",
  channelSecret: "YOUR_CHANNEL_SECRET",
};

const client = new line.Client(config);

// Phân tích body JSON
app.use(bodyParser.json());

// Xử lý yêu cầu GET để xác minh webhook
app.get('/line-webhook', (req, res) => {
    // Xác minh webhook bằng cách trả về mã challenge
    if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === 'YOUR_VERIFY_TOKEN') {
        res.status(200).send(req.query['hub.challenge']);
    } else {
        res.sendStatus(403);
    }
});

// Nhận webhook từ LINE
app.post("/line-webhook", (req, res) => {
  const events = req.body.events;

  if (events.length > 0) {
    events.forEach((event) => {
      if (event.type === "message" && event.message.type === "text") {
        const replyToken = event.replyToken;
        const message = {
          type: "text",
          text: `Bạn đã gửi: ${event.message.text}`,
        };

        // Gửi phản hồi lại người dùng
        client
          .replyMessage(replyToken, message)
          .catch((err) => console.error(err));
      }
    });
  }

  res.sendStatus(200); // Trả lại mã trạng thái 200
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
