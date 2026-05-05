/**
 * COPY SCRIPT INI KE GOOGLE SPREADSHEET ANDA
 * Cara: Buka Spreadsheet > Extensions > Apps Script > Paste & Run fungsi setupAwal
 */

function setupAwal() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 1. Setup Sheet RSVP
  let rsvpSheet = ss.getSheetByName("RSVP");
  if (!rsvpSheet) {
    rsvpSheet = ss.insertSheet("RSVP");
  } else {
    rsvpSheet.clear();
  }
  rsvpSheet.appendRow(["Timestamp", "Nama", "Kehadiran", "Jumlah Tamu", "Pesan", "Diundang Sebagai"]);
  rsvpSheet.getRange(1, 1, 1, 6).setFontWeight("bold").setBackground("#D9812F").setFontColor("white");
  
  // 2. Setup Sheet Broadcast
  let broadcastSheet = ss.getSheetByName("Broadcast");
  if (!broadcastSheet) {
    broadcastSheet = ss.insertSheet("Broadcast");
  } else {
    broadcastSheet.clear();
  }
  broadcastSheet.appendRow(["Nama", "No WhatsApp", "Status"]);
  broadcastSheet.getRange(1, 1, 1, 3).setFontWeight("bold").setBackground("#1B263B").setFontColor("white");
  
  // Tambahkan Contoh Data di Broadcast
  broadcastSheet.appendRow(["Contoh Nama Tamu", "628123456789", "Belum Terkirim"]);
  
  SpreadsheetApp.getUi().alert("✅ Header Otomatis Berhasil Dibuat!\nSilakan isi daftar tamu di sheet 'Broadcast'.");
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Wedding App')
    .addItem('Setup Header Otomatis', 'setupAwal')
    .addToUi();
}
