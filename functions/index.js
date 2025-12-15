const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { defineSecret } = require("firebase-functions/params");
const axios = require("axios");

const LINE_TOKEN = defineSecret("LINE_TOKEN");

exports.sendLineOnRequest = onDocumentCreated(
  {
    document: "request/{docId}",
    secrets: [LINE_TOKEN],
  },
  async (event) => {
    const data = event.data.data();

    const message = `
📄 มีคำขอลางานใหม่
👤 ชื่อ: ${data.name}
📌 ประเภท: ${data.type}
📅 ${data.start_date} ถึง ${data.end_date}
⏱ ${data.count_day} วัน
📝 ${data.note || "-"}
    `;

    await axios.post(
      "https://notify-api.line.me/api/notify",
      new URLSearchParams({ message }),
      {
        headers: {
          Authorization: `Bearer ${LINE_TOKEN.value()}`,
        },
      }
    );
  }
);
