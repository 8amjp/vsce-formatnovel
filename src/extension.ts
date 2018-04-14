'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { window, commands, ExtensionContext, TextEditor, Position, Range } from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "8novels-formatter" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    commands.registerCommand('extension.formatNovel', () => {
        if (window.activeTextEditor) {
            let editor = window.activeTextEditor;
            // 全角の感嘆符(！)、疑問符(？)のあとに全角スペースを挿入
            insertAfter(editor)
            .then(() => {
                // 行頭に全角スペースを挿入
                indent(editor);
            });
        }
    });
}

// 全角の感嘆符(！)、疑問符(？)のあとに全角スペースを挿入
function insertAfter(editor: TextEditor): Promise<boolean> {
	return new Promise((resolve, reject) => {
        editor.edit((editBuilder) => {
            let document = editor.document;
            let text = document.getText();
            let range = new Range(document.positionAt(0), document.positionAt(text.length));
            text = text.replace(/([？！](?![　？！」』]))/g, '$1　');
            editBuilder.replace(range, text);
        }).then(success => {
            resolve();
        });
	});
}

// 行頭に全角スペースを挿入
function indent(editor: TextEditor): Promise<boolean> {
	return new Promise((resolve, reject) => {
        editor.edit((editBuilder) => {
            let lineCount = editor.document.lineCount;
            let line;
            for (let i = 0; i < lineCount; i++) {
                line = editor.document.lineAt(i).text;
                if (!/^[「『#　]/.test(line)) {
                    editBuilder.insert(new Position(i, 0), "　");
                }
            }
        }).then(success => {
            resolve();
        });
	});
}

// this method is called when your extension is deactivated
export function deactivate() {
}