const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp();

const LINE_TOKEN = "7YzXvlQRE4xfuAIDAAW79MasmGQOGD0lJu1I3UwrZlGCP7d27HOD/IKtQ/uhZoTIUiT7lWwN2zQ3p9xcFyazWSszbxLlPmd6/O8HwbLb/hyzv//Csa7Hkx1/+LOOzruy2P7Z2/yMbrXBuYtTXAofwAdB04t89/1O/w1cDnyilFU=";


exports.notifyLeaveRequest = functions.firestore
  .document("request/{docId}")
  .onCreate(async (snap, context) => {

    const data = snap.data();

    const messageText = `
มีคำขอลางานใหม่
--------------------
ชื่อ: ${data.name}
ประเภทการลา: ${data.type}
รูปแบบวันลา: ${data.pattern}
เริ่ม: ${data.start_date}
สิ้นสุด: ${data.end_date}
จำนวนวัน: ${data.count_day}
หมายเหตุ: ${data.note ?? "-"}
LINE UserID: ${data.userId}
    `;

    try {
      await axios.post(
        "https://api.line.me/v2/bot/message/push",
        {
          to: data.userId,   
          messages: [
            {
              type: "text",
              text: messageText,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${LINE_TOKEN}`,
          },
        }
      );

      console.log("ส่งข้อความสำเร็จ");

    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการส่ง LINE:", error);
    }
  });