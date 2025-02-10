function onFormSubmit(e) {
  var responses = e.response.getItemResponses(); // Ambil semua jawaban dari Form

  // Ambil email otomatis dari Google Form
  var email = e.response.getRespondentEmail(); 

  // Ambil timestamp dari Google Form
  var timestamp = e.response.getTimestamp();
  var formattedTimestamp = Utilities.formatDate(timestamp, Session.getScriptTimeZone(), "dd/MM/yyyy HH:mm:ss");

  // Fungsi untuk konversi data menjadi string
  function getResponseAsString(response) {
    if (!response) return "Tidak ada data"; 
    if (Array.isArray(response)) {
      return response.join(", ");
    }
    return response.toString();
  }

  // Ambil data dari Google Form
  var namaPelapor = getResponseAsString(responses[0].getResponse());
  var unitKerja = getResponseAsString(responses[1].getResponse());
  var subUnitKerja = getResponseAsString(responses[2].getResponse());
  var noTelp = getResponseAsString(responses[3].getResponse());
  var issue = getResponseAsString(responses[4].getResponse());
  var dokumentasi = getResponseAsString(responses[5].getResponse());

  // Debugging: Log untuk memastikan semua jawaban benar
  Logger.log("Email: " + email);
  Logger.log("Nama Pelapor: " + namaPelapor);
  Logger.log("Issue: " + issue);
  Logger.log("Dokumentasi Sebelum Konversi: " + dokumentasi);

  // **Cek apakah dokumentasi adalah ID file atau link lengkap**
  function convertToGoogleDriveImageLink(dokumentasi) {
    if (dokumentasi.startsWith("http")) {
      return dokumentasi; // Jika sudah link, gunakan langsung
    } else {
      return "https://drive.google.com/uc?export=view&id=" + dokumentasi; // Konversi ID ke direct image link
    }
  }

  var dokumentasiFinal = convertToGoogleDriveImageLink(dokumentasi);
  Logger.log("Dokumentasi Setelah Konversi: " + dokumentasiFinal);

  // **Buat pesan notifikasi Telegram**
  var message = "🔔 <b>Laporan Baru Diterima!</b>\n\n" +
                "🕒 <b>Waktu:</b> " + formattedTimestamp + "\n" +
                "📧 <b>Email:</b> " + email + "\n" +
                "👤 <b>Pelapor:</b> " + namaPelapor + "\n" +
                "🏢 <b>Unit Kerja:</b> " + unitKerja + "\n" +
                "📌 <b>Sub Unit:</b> " + subUnitKerja + "\n" +
                "📞 <b>No. Telp:</b> " + noTelp + "\n" +
                "⚠️ <b>Masalah:</b> " + issue;

  // Jika ada dokumentasi, tambahkan ke pesan
  if (dokumentasi !== "Tidak ada data") {
    message += "\n📂 <b>Dokumentasi:</b> <a href='" + dokumentasiFinal + "'>Lihat Gambar</a>";
  }

  // Kirim teks laporan ke Telegram
  sendTelegramNotification(message);

  // Jika ada gambar, kirim sebagai foto ke Telegram
  if (dokumentasi !== "Tidak ada data") {
    sendTelegramPhoto(dokumentasiFinal, "📸 Dokumentasi dari laporan: " + namaPelapor);
  }
}

// **Fungsi untuk mengirim pesan teks ke Telegram**
function sendTelegramNotification(message) {
  var token = "7615420836:AAEx6xUphHEEY68XxNCmJbLl8QzB6c7nugg"; // Ganti dengan TOKEN BOT kamu
  var chatId = "@laportelematika"; // Ganti dengan Chat ID grup

  var payload = {
    "chat_id": chatId,
    "text": message,
    "parse_mode": "HTML", // Gunakan HTML agar bisa klik link
    "disable_web_page_preview": false
  };

  var options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(payload)
  };

  UrlFetchApp.fetch("https://api.telegram.org/bot" + token + "/sendMessage", options);
}

// **Fungsi untuk mengirim foto langsung ke Telegram**
function sendTelegramPhoto(photoUrl, caption) {
  var token = "7615420836:AAEx6xUphHEEY68XxNCmJbLl8QzB6c7nugg"; 
  var chatId = "@laportelematika"; // Ganti dengan Chat ID grup

  var payload = {
    "chat_id": chatId,
    "photo": photoUrl,
    "caption": caption,
    "parse_mode": "HTML"
  };

  var options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(payload)
  };

  var response = UrlFetchApp.fetch("https://api.telegram.org/bot" + token + "/sendPhoto", options);
  Logger.log(response.getContentText()); // Log respons dari Telegram
}
