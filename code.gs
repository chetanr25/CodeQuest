function ask(q){
  q.asking = 'give me links for top '+ q.platform +' videos for ' + q.tech + '(strictly related to coding or education!)';
  q.answer = markdownToHtml(BARD(q.asking));
  sendMail(q);
}

// Convert markdown to HTML using GitHub API
function markdownToHtml(markdownContent) {

  // Create the payload for the GitHub API
  var payload = {
    text: markdownContent,
    mode: 'gfm',
  };

  // Convert markdown to HTML using GitHub API
  var response = UrlFetchApp.fetch('https://api.github.com/markdown', {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
  });

  // Get the HTML content from the response
  var htmlContent = response.getContentText();

  // Log the HTML content (you can modify this part based on your needs)
  Logger.log(htmlContent);

  // Return the HTML content
  return htmlContent;
}


// Send email using GmailApp
function sendMail(q){
  var sub = `Here are some good resources for ${q.tech} on ${q.platform}`;
  var html = HtmlService.createHtmlOutput(q.answer).getContent();
  MailApp.sendEmail({to: q.email,subject: sub,htmlBody: html});
}

function doGet() {  
  var ht = HtmlService.createTemplateFromFile("sasta");
  ht = ht.evaluate();
  return ht;
}

function include(e){
 return HtmlService.createHtmlOutputFromFile(e).getContent();
}

// BARD API
function BARD (prompt) {
  var apiur1 = '';
  var headers = {
  "Content-Type": "application/json"};
  var requestBody = {
  "prompt": {
  "text": prompt}}
  var options = {
  "method" : "POST",
  "headers": headers,
  "payload": JSON.stringify (requestBody)}
  var response = UrlFetchApp. fetch (apiur1, options);
  var data = JSON .parse (response .getContentText ());
  var output = data.candidates[0].output ;
  Logger.log (output);
  return output ;
}