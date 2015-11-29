// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import vscode = require('vscode');
export const SPECFLOW_MODE: vscode.DocumentFilter = { language: 'feature', scheme: 'file' }

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "specflow" is now active!'); 

	context.subscriptions.push(vscode.languages.registerCompletionItemProvider(SPECFLOW_MODE, new SpecFlowCompletionItemProvider(), '.'));
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	var disposable = vscode.commands.registerCommand('extension.sayHello', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World!');
	});
		
	context.subscriptions.push(disposable);
}

interface SpecflowSuggestion {
	type: string;
	name: string;
}

export class SpecFlowCompletionItemProvider implements vscode.CompletionItemProvider {
	public provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Promise<vscode.CompletionItem[]> {
		return new Promise((resolve, reject) => {
			var filename = document.fileName;
			
			var currentLine = document.lineAt(position);
			
			var sampleItem1 = new vscode.CompletionItem("Given I have entered <number> into the calculator");
			sampleItem1.kind = vscode.CompletionItemKind.Value;
			
			var sampleItem2 = new vscode.CompletionItem("When I press add");
			sampleItem2.kind = vscode.CompletionItemKind.Value;
						
			var sampleItem3 = new vscode.CompletionItem("Then the result should be <number> on the screen");
			sampleItem3.kind = vscode.CompletionItemKind.Value;

			resolve([sampleItem1, sampleItem2, sampleItem3]);
		});
	}
}