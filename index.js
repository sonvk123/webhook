const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.post('/viber-webhook', (req, res) => {
    console.log(req.body); // Xử lý dữ liệu từ Viber
    res.sendStatus(200); // Trả lại mã trạng thái 200
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
