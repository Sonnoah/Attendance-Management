import Swal from 'sweetalert2'

export function showSuccess() {
  Swal.fire({
    icon: 'success',
    title: 'ส่งคำขอสำเร็จ',
    text: 'บันทึกข้อมูลเรียบร้อยแล้ว 😊',
    confirmButtonText: 'ตกลง'
  });
}
