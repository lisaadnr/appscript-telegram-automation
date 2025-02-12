function sendEmailOnFormSubmit(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Form Responses 2"); // Ganti sesuai nama sheet
  var data = e.values; // Data yang masuk dari form

  var idKeluhan = data[1]; // Ambil ID Keluhan dari form
  var status = data[2]; // Ambil Status dari form

  Logger.log("Mencari email untuk ID: " + idKeluhan);
  Logger.log("Data yang masuk dari form: " + JSON.stringify(e.values));

  // Pastikan emailPengirim dideklarasikan sebelum digunakan
  var emailPengirim = findEmailById(sheet, idKeluhan) || ""; 

  if (!emailPengirim) {
    Logger.log("Gagal mengirim email: Email tidak ditemukan untuk ID " + idKeluhan);
    return;
  }

  var subject = "Update Keluhan: " + idKeluhan;
  var body = "<p>Halo,</p>"
         + "<p>Keluhan dengan <b>ID " + idKeluhan + "</b> telah diperbarui dengan:</p>"
         + "<p><b>Status:</b> " + status + "</p>"
         + "<p>Berkenan Bapak/Ibu untuk mengisi form survei indikator kepuasan pelanggan pada link berikut:</p>"
         + "<p><a href='https://forms.gle/BJKNuLGLkpunrEuZ9'>https://forms.gle/BJKNuLGLkpunrEuZ9</a></p>"
         + "<br>"
         + "<p>Terima kasih.</p>"
         + "<p><i><b>Team Lapor Telematika</b></i></p>";

  try {
    Logger.log("Mengirim email ke: " + emailPengirim);

    GmailApp.sendEmail(emailPengirim, subject, "", {
      htmlBody: body,
      name: "Tim Support",
      replyTo: ".@gmail.com"
    });

    Logger.log("Email berhasil dikirim ke: " + emailPengirim);
  } catch (error) {
    Logger.log("Gagal mengirim email: " + error.message);
  }
}

// Fungsi untuk mencari email berdasarkan ID Keluhan di Sheet2
function findEmailById(sheet, idKeluhan) {
  var dataRange = sheet.getDataRange();
  var values = dataRange.getValues();

  for (var i = 1; i < values.length; i++) { // Mulai dari baris ke-2 (baris pertama header)
    if (values[i][1] == idKeluhan) { // Kolom ke-2 adalah "ID Keluhan"
      Logger.log("Email ditemukan: " + values[i][6]); // Log email yang ditemukan
      return values[i][6]; // Kolom ke-7 adalah "Email Pengirim"
    }
  }

  Logger.log("Email tidak ditemukan untuk ID: " + idKeluhan);
  return null;
}

// Aktifkan trigger agar kode berjalan otomatis saat form dikirim
function createTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  
  // Hapus trigger lama kalau ada
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === "sendEmailOnFormSubmit") {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  // Buat trigger baru
  ScriptApp.newTrigger("sendEmailOnFormSubmit")
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onFormSubmit()
    .create();
}

function testFindEmail() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Form Responses 2");
  var testId = "10/02/2025 1:18:05 - lisa - jaringan - PC/Laptop"; // Ganti dengan ID Keluhan yang ada di sheet
  var email = findEmailById(sheet, testId);
  Logger.log("Email untuk ID " + testId + " adalah: " + email);
}

function testSendEmail() {
  var testEvent = {
    values: ["", "10/02/2025 1:18:05 - lisa - jaringan - PC/Laptop", "Diproses"]
  };
  sendEmailOnFormSubmit(testEvent);
}


