// Table constants
var TABLE_WIDTH = 64;
var HEADER_WIDTH = 16;
var CONTENT_WIDTH = 48;
var CORNER_CHAR = '+';
var SEPARATOR_CHAR = '|';
var DIVIDER_CHAR = '-';
var DIVIDER = function makeTableLine() {
  var newString = '';
  for (var i = 0; i < TABLE_WIDTH - 2; i++) newString += DIVIDER_CHAR;
  return newString;
} ();
var VERTICAL_BORDER = CORNER_CHAR + DIVIDER + CORNER_CHAR;
var SEPARATOR = SEPARATOR_CHAR + DIVIDER + SEPARATOR_CHAR;

// Get column formatted
function formatColumn(text, maxChars, first) {
  var output = ((first) ? '| ' : ' ') + text;
  for (var i = output.length; i < maxChars - 1; i++) output += ' ';
  output += '|';
  return output;
}

// Render a human readable table in OC by passing the OC and header: content
function renderTableInOutputChannel(outputChannel, title, data) {
  // Make sure it's clean
  outputChannel.clear();

  // Title, file path
  if (title) outputChannel.appendLine(title + '\n');

  // Start table
  outputChannel.appendLine(VERTICAL_BORDER);

  for (var i = 0, length = data.length; i < length; i++) {
    var header = formatColumn(data[i].header, HEADER_WIDTH, true);
    var content = formatColumn(data[i].content, CONTENT_WIDTH);
    var line = header + content;
    outputChannel.appendLine(line);
    if (i < length - 1) outputChannel.appendLine(SEPARATOR);
  }

  // End table
  outputChannel.appendLine(VERTICAL_BORDER);
}

module.exports = renderTableInOutputChannel;
