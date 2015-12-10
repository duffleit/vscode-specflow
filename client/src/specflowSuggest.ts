
'use strict';
import vscode = require('vscode');
import fs = require('fs');
import {SpecflowDriver} from './driver/SpecflowDriver'
import {Driver, DriverContext} from './driver/Common'


export class SpecflowCompletionItemProvider implements vscode.CompletionItemProvider {
	public provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Promise<vscode.CompletionItem[]> {
		
		var specflowDriver = new SpecflowDriver(new DefaultDriverContext());
		return specflowDriver.suggestBindings();
	}
}

class DefaultDriverContext implements DriverContext{
	public getAllFiles(include: string, exclude: string) : Thenable<vscode.Uri[]>{
		return vscode.workspace.findFiles(include, exclude, 200);
	}
}
