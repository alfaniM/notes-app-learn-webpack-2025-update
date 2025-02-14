import Swal from 'sweetalert2';

// Notifikasi sukses
export function showSuccess(message = 'Success!') {
  Swal.fire({
    icon: 'success',
    title: 'Success!',
    text: message,
    timer: 2000,
    showConfirmButton: false,
  });
}

// Notifikasi saat offline
export function showOfflineAlert() {
  Swal.fire({
    icon: 'error',
    title: 'Koneksi Terputus!',
    text: 'Periksa koneksi internet Anda lalu coba lagi.',
    confirmButtonText: 'Coba Lagi',
  }).then(() => {
    location.reload();
  });
}

// notifikasi error
export function showError(message = 'An error occurred!') {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message,
  });
}

// notifikasi konfirmasi
export async function showConfirm(
  message = 'Are you sure you want to proceed?'
) {
  const result = await Swal.fire({
    title: 'Apa kamu yakin?',
    text: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, lanjutkan!',
    cancelButtonText: 'Gak jadi deh',
  });

  return result.isConfirmed;
}
