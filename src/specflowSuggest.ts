'use strict';
import vscode = require('vscode');

export class SpecflowCompletionItemProvider implements vscode.CompletionItemProvider {
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