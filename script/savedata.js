import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";

import { getFirestore, collection, addDoc 
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyC1qq59U0moH20dOCpAITNFR9ttHLxTRFg",
authDomain: "pt-test-b0dc9.firebaseapp.com",
projectId: "pt-test-b0dc9",
storageBucket: "pt-test-b0dc9.firebasestorage.app",
messagingSenderId: "1938984234",
appId: "1:1938984234:web:89078e2d16c3958cc6a253",
measurementId: "G-F2KV6LY4XE"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);   

async function main() {
await liff.init({ liffId: "2008650824-wo3yRXa9" });
if (liff.isLoggedIn()) {
    getUserProfile();
} else {
    liff.login();
}
}
main();

async function getUserProfile() {
const profile = await liff.getProfile();
document.getElementById("userId").value = profile.userId;
}

async function saveToFirestore() {
const data = {
    userId: document.getElementById("userId").value,
    name: document.getElementById("name").value,
    type: document.getElementById("type").value,
    pattern: document.getElementById("pattern").value,
    start_date: document.getElementById("start_date").value,
    end_date: document.getElementById("end_date").value,
    count_day: document.getElementById("count_day").value,
    note: document.getElementById("note").value,
    timestamp: new Date(),
};

try {
    await addDoc(collection(db, "request"), data);
    Swal.fire({
      icon: 'success',
      title: 'ส่งคำขอสำเร็จ',
      text: 'บันทึกข้อมูลเรียบร้อยแล้ว 😊',
      confirmButtonText: 'ตกลง'
    });
} catch (e) {
    console.error("Error adding document: ", e);
    alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
}
}

window.submitForm = function () {
saveToFirestore();
};