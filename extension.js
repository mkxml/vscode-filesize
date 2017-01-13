var vscode = require('vscode');
var renderTableInOutputChannel = require('./view');
var fzCalculator = require('filesize-calculator');

var window = vscode.window;
var workspace = vscode.workspace;

var statusBarItem, oc, info, config, isShowingDetailedInfo;

function updateConfig() {
  var configuration = workspace.getConfiguration('filesize');
  config = {
    useKibibyteRepresentation: configuration.get('useKibibyteRepresentation'),
    use24HourFormat: configuration.get('use24HourFormat')
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

function hideStatusBarItem(event, force) {
  try {
    var currentEditor = window.activeTextEditor._documentData._document;
    if (force || (event && event.fileName === currentEditor.fileName)) {
      oc.hide();
      statusBarItem.text = '';
      statusBarItem.hide();
    }
  } catch (e) { }
}

// Update simple info in the status bar
function updateStatusBarItem() {
  try {
    var currentEditor = window.activeTextEditor._documentData._document;
    if (currentEditor && currentEditor.uri.scheme === 'file') {
      fzCalculator.loadFileInfoAsync(currentEditor.fileName)
        .then(showStatusBarItem)
        .catch(hideStatusBarItem);
    } else {
      hideStatusBarItem(null, true);
    }
  } catch (e) {
    hideStatusBarItem(null, true);
  }
}

// Show detailed filesize info in the OC
function showDetailedInfo() {
  if (info && info.prettySize) {
    info = fzCalculator.addGzipSize(info, config);
    info = fzCalculator.addMimeTypeInfo(info);
    info = fzCalculator.addPrettyDateInfo(info, config);
    renderTableInOutputChannel(oc, [
      {
        header: 'Size',
        content: info.prettySize
      },
      {
        header: 'Gzipped',
        content: info.gzipSize
      },
      {
        header: 'Mime type',
        content: info.mimeType
      },
      {
        header: 'Created',
        content: info.prettyDateCreated
      },
      {
        header: 'Changed',
        content: info.prettyDateChanged
      }
    ]);
  } else {
    oc.clear();
    oc.appendLine('No file information available for this context!');
  }
  oc.show(true);
  isShowingDetailedInfo = true;
}

function toggleDetailedInfo() {
  if (isShowingDetailedInfo) {
    oc.hide();
    isShowingDetailedInfo = false;
  } else {
    showDetailedInfo();
  }
}

// Called when VS Code activates the extension
function activate(context) {
  console.log('filesize is active');

  // Set up statusBarItem
  statusBarItem = window.createStatusBarItem(vscode.StatusBarAlignment.Left);
  statusBarItem.command = 'extension.toggleInfo';
  statusBarItem.tooltip = 'Current file size - Click to toggle more info';

  // Global OutputChannel to be used for the extension detailed info
  oc = window.createOutputChannel('filesize');

  // Update handlers
  var onOpen = workspace.onDidOpenTextDocument(updateStatusBarItem);
  var onClose = workspace.onDidCloseTextDocument(hideStatusBarItem);
  var onSave = workspace.onDidSaveTextDocument(updateStatusBarItem);
  var onChangeConfig = workspace.onDidChangeConfiguration(updateConfig);

  // Toggle detailed info when clicking the status bar item
  var clickEvent = vscode.commands.registerCommand('extension.toggleInfo', toggleDetailedInfo);

  // Show detailed info through custom command
  var command = vscode.commands.registerCommand('extension.showFilesizeInfo', showDetailedInfo);

  // Register disposables that get disposed when deactivating
  context.subscriptions.push(onOpen);
  context.subscriptions.push(onClose);
  context.subscriptions.push(onSave);
  context.subscriptions.push(onChangeConfig);
  context.subscriptions.push(clickEvent);
  context.subscriptions.push(command);

  // Set default config
  updateConfig();

  // First update
  updateStatusBarItem();
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
