function doGet(e) {
  return HtmlService.createHtmlOutputFromFile("index")
}

function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function processForm(data){
  var url="https://docs.google.com/spreadsheets/d/1SsMtZd6xh6szXvdGmJK603RE0Zk51CLwxBeClmM__1k/edit?gid=0#gid=0";
  var sheet= SpreadsheetApp.openByUrl(url);
  var worksheet = sheet.getSheetByName("Data");

  worksheet.appendRow([
    new Date(),
    data.userId,
    data.name,
    data.type,
    data.pattern,
    data.start_date,
    data.end_date,
    data.count_day,
    data.note
  ]);
}