'use strict';
import { window, commands, ExtensionContext, TextEditor, Position } from 'vscode';

export function activate(context: ExtensionContext) {
    commands.registerCommand('extension.formatNovel', () => {
        if (window.activeTextEditor) {
            let editor = window.activeTextEditor;
            // Markdownとプレーンテキストの時だけ実行
            if (editor.document.languageId === "markdown" || editor.document.languageId === "plaintext") {
                // 全角の感嘆符(！)、疑問符(？)のあとに全角スペースを挿入
                insertAfter(editor)
                .then(() => {
                    // 行頭に全角スペースを挿入
                    indent(editor);
                });
            }
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
                if (line.length > 0 && !regEx.test(line)) {
                    editBuilder.insert(new Position(i, 0), "　");
                }
            }
        }).then(success => {
            resolve();
        });
    });
}

export function deactivate() {
}