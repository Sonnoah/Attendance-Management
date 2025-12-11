import Swal from 'sweetalert2/dist/sweetalert2.js'

export async function showSuccess() {
  Swal.fire({
    icon: 'success',
    title: 'ส่งคำขอสำเร็จ',
    text: 'บันทึกข้อมูลเรียบร้อยแล้ว 😊',
    confirmButtonText: 'ตกลง'
  });
}
