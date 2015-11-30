'use strict';
import vscode = require('vscode');
import {SpecflowCompletionItemProvider } from './specflowSuggest';
import {SPECFLOWMODE } from './specflowMode';

export function activate(context: vscode.ExtensionContext) {

	//check if cucumber extension is installed
	var cucumber = vscode.extensions.getExtension("stevejpurves.cucumber");
	if(cucumber === undefined || cucumber === null){
		vscode.window.showErrorMessage('To Use Specflow Integration please install the Visual Studio Code Cucumber extension.')
		vscode.commands.registerCommand('extension.aboutSpecflow', () => {});
		return;
	}

	console.log('extension "specflow" is active'); 

	context.subscriptions.push(vscode.languages.registerCompletionItemProvider(
		SPECFLOWMODE, new SpecflowCompletionItemProvider(), '.'));
		
	var disposable = vscode.commands.registerCommand('extension.aboutSpecflow', () => {
		vscode.window.showInformationMessage('If you want to get more information about specflow visit us on specflow.org');	
	});
		
	context.subscriptions.push(disposable);
}