var vscode = require('vscode');
var renderTableInOutputChannel = require('./view');
var fzCalculator = require('filesize-calculator');

var window = vscode.window;
var workspace = vscode.workspace;

var cachedLocation = 'left';

var statusBarItem, oc, info, config, isShowingDetailedInfo;

function updateConfig() {
  var configuration = workspace.getConfiguration('filesize');
  config = {
    useDecimal: configuration.get('useDecimal'),
    use24HourFormat: configuration.get('use24HourFormat'),
    showGzip: configuration.get('showGzip'),
    showGzipInStatusBar: configuration.get('showGzipInStatusBar'),
    displayInfoOnTheRightSideOfStatusBar: configuration.get('displayInfoOnTheRightSideOfStatusBar'),
    showBrotli: configuration.get('showBrotli'),
    showGzipInStatusBar: configuration.get('showGzipInStatusBar'),
    showNumberOfLines: configuration.get('showNumberOfLines')
  };
  updateStatusBarItem();
  return config;
}

function showStatusBarItem(newInfo) {
  info = fzCalculator.addPrettySize(newInfo, config);
  if (info && info.prettySize) {
    statusBarItem.text = info.prettySize;
    if (config.showGzipInStatusBar) {
      statusBarItem.text = `Raw: ${info.prettySize}`;
      info = fzCalculator.addGzipSize(info, config);
      statusBarItem.text += ` | Gzip: ${info.gzipSize}`
    }
    if (config.showNumberOfLines) {
      statusBarItem.text += ` | ${newInfo.lineCount}L`
    }
    statusBarItem.show();
  }
}

function hideStatusBarItem() {
  hideDetailedInfo();
  statusBarItem.text = '';
  statusBarItem.hide();
}

// Update simple info in the status bar
function updateStatusBarItem() {
  // Check where to display the status bar
  var location = config.displayInfoOnTheRightSideOfStatusBar ? 'right' : 'left';
  // Set up statusBarItem
  if (cachedLocation !== location) {
    cachedLocation = location;
    if (location === 'right') {
      statusBarItem = window.createStatusBarItem(vscode.StatusBarAlignment.Right, 1);
    } else {
      statusBarItem = window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);
    }
    statusBarItem.command = 'extension.toggleFilesizeInfo';
    statusBarItem.tooltip = 'Current file size - Click to toggle more info';
  }
  try {
    var currentEditor = window.activeTextEditor.document;
    if (currentEditor && currentEditor.uri.scheme === 'file') {
      var fileInfo = fzCalculator.loadFileInfoSync(currentEditor.fileName);
      fileInfo.lineCount = currentEditor.lineCount;

      hideDetailedInfo();
      showStatusBarItem(fileInfo);
    } else {
      if (currentEditor.uri.scheme !== 'output') hideStatusBarItem();
    }
  } catch (e) {
    hideStatusBarItem();
  }
}

// Show detailed filesize info in the OC
function showDetailedInfo() {
  if (info && info.prettySize) {
    info = config.showGzip ? fzCalculator.addGzipSize(info, config) : info;
    info = config.showBrotli ? fzCalculator.addBrotliSize(info, config) : info;
    info = fzCalculator.addMimeTypeInfo(info);
    info = fzCalculator.addPrettyDateInfo(info, config);
    const table = [];
    if (info.prettySize) table.push({ header: 'Size', content: info.prettySize });
    if (info.gzipSize) table.push({ header: 'Gzipped', content: info.gzipSize });
    if (info.brotliSize) table.push({ header: 'Brotli', content: info.brotliSize });
    if (info.mimeType) table.push({ header: 'Mime type', content: info.mimeType });
    if (info.prettyDateCreated) table.push({ header: 'Created', content: info.prettyDateCreated });
    if (info.prettyDateChanged) table.push({ header: 'Changed', content: info.prettyDateChanged });
    renderTableInOutputChannel(oc, info.absolutePath, table);
  } else {
    oc.clear();
    oc.appendLine('No file information available for this context!');
  }
  oc.show(true);
  isShowingDetailedInfo = true;
}

function hideDetailedInfo() {
  oc.hide();
  isShowingDetailedInfo = false;
}

function toggleDetailedInfo() {
  if (isShowingDetailedInfo) {
    hideDetailedInfo();
  } else {
    showDetailedInfo();
  }
}

// Called when VS Code activates the extension
function activate(context) {
  console.log('filesize is active');

  // Set up statusBarItem
  statusBarItem = window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);
  statusBarItem.command = 'extension.toggleFilesizeInfo';
  statusBarItem.tooltip = 'Current file size - Click to toggle more info';

  // Global OutputChannel to be used for the extension detailed info
  oc = window.createOutputChannel('filesize');

  // Update handlers
  var onSave = workspace.onDidSaveTextDocument(updateStatusBarItem);
  var onActiveEditorChanged = window.onDidChangeActiveTextEditor(updateStatusBarItem);
  var onChangeConfig = workspace.onDidChangeConfiguration(updateConfig);

  // Show detailed info through custom command
  var command = vscode.commands.registerCommand('extension.toggleFilesizeInfo', toggleDetailedInfo);

  // Register disposables that get disposed when deactivating
  context.subscriptions.push(onSave);
  context.subscriptions.push(onChangeConfig);
  context.subscriptions.push(onActiveEditorChanged);
  context.subscriptions.push(command);

  // Set default config
  updateConfig();
}

// Called when VS Code deactivates the extension
function deactivate() {
  if (oc) {
    oc.clear();
    oc.dispose();
  }
  if (statusBarItem) {
    statusBarItem.hide();
    statusBarItem.dispose();
  }
  oc = null;
  statusBarItem = null;
  config = null;
  info = null;
}

module.exports = {
  activate: activate,
  deactivate: deactivate
};
