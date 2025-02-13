import Swal from 'sweetalert2';

// Notifikasi sukses
export function showSuccess(message = 'Berhasil!') {
  Swal.fire({
    icon: 'success',
    title: 'Sukses!',
    text: message,
    timer: 2000,
    showConfirmButton: false,
  });
}

// Notifikasi error
export function showError(message = 'Terjadi kesalahan!') {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message,
  });
}

// Konfirmasi sebelum melakukan aksi
export async function showConfirm(message = 'Yakin ingin melanjutkan?') {
  const result = await Swal.fire({
    title: 'Konfirmasi',
    text: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, Lanjutkan',
    cancelButtonText: 'Batal',
  });

  return result.isConfirmed;
}
