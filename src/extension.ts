'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { window, commands, ExtensionContext, TextEditor, Position } from 'vscode';

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
            const regEx = /([？！](?![\s？！」』]))/g;
            const document = editor.document;
            const text = document.getText();
            let match;
            while (match = regEx.exec(text)) {
                editBuilder.insert(document.positionAt(match.index + 1), "　");
            }
        }).then(success => {
            resolve();
        });
    });
}

// 行頭に全角スペースを挿入
function indent(editor: TextEditor): Promise<boolean> {
    return new Promise((resolve, reject) => {
        editor.edit((editBuilder) => {
            const regEx = /^[「『#\s]/;
            const document = editor.document;
            const lineCount = document.lineCount;
            let line;
            for (let i = 0; i < lineCount; i++) {
                line = document.lineAt(i).text;
                if (!regEx.test(line) && line.length > 0) {
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