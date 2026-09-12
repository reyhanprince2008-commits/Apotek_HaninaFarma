// --- KONFIGURASI ADMIN ---
// Ganti nomor ini dengan nomor WhatsApp Business admin Anda (format internasional: 62...)
const adminPhoneNumber = "628560832519";

// Fungsi untuk Menambah / Mengurangi Jumlah Produk
function changeQty(productId, amount) {
    const qtyInput = document.getElementById(`qty-${productId}`);
    let currentQty = parseInt(qtyInput.value);
    
    currentQty += amount;
    if (currentQty < 1) {
        currentQty = 1;
    }
    
    qtyInput.value = currentQty;
}

// Helper untuk Mengubah Angka ke Format Rupiah (RP)
function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0
    }).format(number);
}

// Fungsi untuk Mengirim Pesanan ke WhatsApp Admin
function orderViaWhatsApp(productId, unitPrice) {
    // Ambil detail produk berdasarkan ID
    const productName = document.getElementById(`name-${productId}`).innerText;
    const quantity = parseInt(document.getElementById(`qty-${productId}`).value);
    const totalPrice = unitPrice * quantity;

    // Format Pesan WhatsApp
    const message = 
`Halo Admin Apotek Hanina Farma, saya ingin memesan obat berikut:

*Detail Pesanan:*
• Nama Produk: ${productName}
• Harga Satuan: ${formatRupiah(unitPrice)}
• Jumlah: ${quantity}
----------------------------------
*Total Harga: ${formatRupiah(totalPrice)}*

Mohon konfirmasi ketersediaan stok dan info pembayaran. Terima kasih!`;

    // Encode teks agar aman digunakan pada URL
    const encodedMessage = encodeURIComponent(message);

    // Buat URL API WhatsApp
    const whatsappURL = `https://wa.me/${628560832519}?text=${encodedMessage}`;

    // Buka tautan WhatsApp di tab baru
    window.open(whatsappURL, '_blank');
}