var vscode = require('vscode');
var renderTableInOutputChannel = require('./view');
var fzCalculator = require('filesize-calculator');

var filesizeQuery = null; // Cache file info queries to cancel

var window = vscode.window;
var workspace = vscode.workspace;

var statusBarItem, oc, info, config, isShowingDetailedInfo;

function updateConfig() {
  var configuration = workspace.getConfiguration('filesize');
  config = {
    useKibibyteRepresentation: configuration.get('useKibibyteRepresentation'),
    use24HourFormat: configuration.get('use24HourFormat'),
    showGzip: configuration.get('showGzip')
  };
  updateStatusBarItem();
  return config;
}

function showStatusBarItem(newInfo) {
  info = fzCalculator.addPrettySize(newInfo, config);
  if (info && info.prettySize) {
    statusBarItem.text = info.prettySize;
    statusBarItem.show();
  }
}

function hideStatusBarItem() {
  oc.hide();
  statusBarItem.text = '';
  statusBarItem.hide();
}

// Update simple info in the status bar
function updateStatusBarItem() {
  hideDetailedInfo();
  try {
    var currentEditor = window.activeTextEditor._documentData._document;
    if (filesizeQuery !== null) filesizeQuery.cancel();
    if (currentEditor && currentEditor.uri.scheme === 'file') {
      filesizeQuery = fzCalculator.loadFileInfoAsync(currentEditor.fileName)
        .then(showStatusBarItem)
        .catch(hideStatusBarItem);
    } else {
      hideStatusBarItem();
    }
  } catch (e) {
    if (filesizeQuery !== null) filesizeQuery.cancel();
    hideStatusBarItem();
  }
}

// Show detailed filesize info in the OC
function showDetailedInfo() {
  if (info && info.prettySize) {
    info = config.showGzip ? fzCalculator.addGzipSize(info, config) : info;
    info = fzCalculator.addMimeTypeInfo(info);
    info = fzCalculator.addPrettyDateInfo(info, config);
    const table = [];
    if (info.absolutePath) table.push({ header: 'Path', content: info.absolutePath });
    if (info.prettySize) table.push({ header: 'Size', content: info.prettySize });
    if (info.gzipSize) table.push({ header: 'Gzipped', content: info.gzipSize });
    if (info.mimeType) table.push({ header: 'Mime type', content: info.mimeType });
    if (info.prettyDateCreated) table.push({ header: 'Created', content: info.prettyDateCreated });
    if (info.prettyDateChanged) table.push({ header: 'Changed', content: info.prettyDateChanged });
    renderTableInOutputChannel(oc, table);
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
