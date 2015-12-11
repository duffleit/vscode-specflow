"use strict";
import vscode = require("vscode");
import {SpecflowCompletionItemProvider } from "./specflowSuggest";
import {SPECFLOWMODE } from "./specflowMode";
import * as path from "path";
import { LanguageClient, LanguageClientOptions, SettingMonitor, ServerOptions } from "vscode-languageclient";

export function activate(context: vscode.ExtensionContext) {

	//check if cucumber extension is installed
	var cucumber = vscode.extensions.getExtension("stevejpurves.cucumber");
	if(cucumber === undefined || cucumber === null){
		vscode.window.showErrorMessage("To Use Specflow Integration please install the Visual Studio Code Cucumber extension.")
		vscode.commands.registerCommand("extension.aboutSpecflow", () => {});
		return;
	}

	console.log("extension 'specflow' is active");

// 	// SpecFlow Language Server
// 	let serverModule = context.asAbsolutePath(path.join("server", "server.js"));
// 	// The debug options for the server
// 	let debugOptions = { execArgv: ["--nolazy", "--debug=6004"] };
// 		let serverOptions: ServerOptions = {
// 		run : { module: serverModule },
// 		debug: { module: serverModule, options: debugOptions }
// 	};
// 
// 	let clientOptions: LanguageClientOptions = {
// 		documentSelector: ["feature"]
// 	};
// 
// 	let languageServer = new LanguageClient("Specflow Language Server", serverOptions, clientOptions).start();
// 
// 	console.log("'specflow' language server sucessful started");

	context.subscriptions.push(vscode.languages.registerCompletionItemProvider(
		SPECFLOWMODE, new SpecflowCompletionItemProvider(), "."));

	var aboutSpecflowCommand = vscode.commands.registerCommand("extension.aboutSpecflow", () => {
		vscode.window.showInformationMessage("If you want to get more information about specflow visit us on specflow.org");
	});

	// context.subscriptions.push(languageServer);
	context.subscriptions.push(aboutSpecflowCommand);
}