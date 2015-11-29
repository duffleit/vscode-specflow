'use strict';
import vscode = require('vscode');
import {SpecflowCompletionItemProvider } from './specflowSuggest';
import {SPECFLOWMODE } from './specflowMode';

export function activate(context: vscode.ExtensionContext) {

	console.log('extension "specflow" is active'); 

	context.subscriptions.push(vscode.languages.registerCompletionItemProvider(
		SPECFLOWMODE, new SpecflowCompletionItemProvider(), '.'));

	var disposable = vscode.commands.registerCommand('about Specflow', () => {
		vscode.window.showInformationMessage('If you want to get more information about specflow visit us on specflow.org');
	});
		
	context.subscriptions.push(disposable);
}
