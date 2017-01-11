// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');

var window = vscode.window;

var item;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    console.log('Congratulations, your extension "filesize" is now active!');

    var disposable = vscode.commands.registerCommand('extension.showDetailedFilesizeInfo', function () {

        // Test out outputChannel, supports only strings :(
        var oc = window.createOutputChannel('filesize');
        oc.appendLine('+--------------------------------------------------------------+');
        oc.appendLine('| Size         | 1139.89 KB                                    |');
        oc.appendLine('|--------------------------------------------------------------|');
        oc.appendLine('| Gzipped      | 1000.89 KB                                    |');
        oc.appendLine('|--------------------------------------------------------------|');
        oc.appendLine('| Mime type    | image/jpeg                                    |');
        oc.appendLine('|--------------------------------------------------------------|');
        oc.appendLine('| Created      | December, 29th, 2016 07:00 AM                 |');
        oc.appendLine('|--------------------------------------------------------------|');
        oc.appendLine('| Changed      | January, 29th, 2016 08:00 AM                  |');
        oc.appendLine('|--------------------------------------------------------------|');
        oc.appendLine('| Dimmensions  | 640x640                                       |');
        oc.appendLine('+--------------------------------------------------------------+');
        oc.show(true);

    });

    context.subscriptions.push(disposable);

    item = window.createStatusBarItem(vscode.StatusBarAlignment.Left);
    item.text = 'Click Me!';
    item.command = 'extension.showDetailedFilesizeInfo';
    item.show();
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
