import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('first-5c.replace', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        const document = editor.document;

        editor.edit(editBuilder => {
            for (let i = 0; i < document.lineCount; i++) {
                const line = document.lineAt(i);
                const lastColumn = Math.min(5, line.text.length);
                const firstFive = line.text.substring(0, lastColumn);

                if (/\S/.test(firstFive)) {
                    const rangeToReplace = new vscode.Range(
                        i, 0,
                        i, lastColumn
                    );
                    const newText = "     ";
                    editBuilder.replace(rangeToReplace, newText);
                }
            }
        });
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}