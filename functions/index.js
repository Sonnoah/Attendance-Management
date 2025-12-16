const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const axios = require("axios");
const { defineSecret } = require("firebase-functions/params");

const LINE_CHANNEL_TOKEN = defineSecret("LINE_CHANNEL_TOKEN");

exports.sendLineOnRequest = onDocumentCreated(
  {
    document: "request/{docId}",
    region: "us-central1",
    secrets: [LINE_CHANNEL_TOKEN],
  },
  async (event) => {
    const data = event.data.data();

    const userId = data.userId;
    if (!userId) return;

    const message = {
      type: "text",
      text:
`✅ ส่งคำขอลางานเรียบร้อยแล้ว

👤 ชื่อ: ${data.name}
📌 ประเภท: ${data.type}
📅 ${data.start_date} → ${data.end_date}
🧮 ${data.count_day} วัน
📝 หมายเหตุ: ${data.note || "-"}

ระบบได้รับข้อมูลแล้ว`,
    };

    await axios.post(
      "https://api.line.me/v2/bot/message/push",
      {
        to: userId, 
        messages: [message],
      },
      {
        headers: {
          Authorization: `Bearer ${LINE_CHANNEL_TOKEN.value()}`,
          "Content-Type": "application/json",
        },
      }
    );
  }
);
