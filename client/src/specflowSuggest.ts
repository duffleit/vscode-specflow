
'use strict';
import vscode = require('vscode');
import fs = require('fs');

export class SpecflowCompletionItemProvider implements vscode.CompletionItemProvider {
	public provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Promise<vscode.CompletionItem[]> {
		
		var specflowDriver = new SpecFlowDriver();
		

				
		return new Promise((resolve, reject) => resolve(
			files.then(files => {
				var allbindings = [].concat.apply([],files.map(file => {
					var content = fs.readFileSync(file.fsPath,'utf8');
					var bindings = specflowDriver.getBindings(content);
					return bindings;
				}));
				
				return allbindings.map(binding => {
					var completionItem = new vscode.CompletionItem(binding);
					completionItem.kind = vscode.CompletionItemKind.Value;
					return completionItem;
				});
			}
		)));
	}
}

export class BindingCache{
	
}

export class SpecFlowDriver{
	
	private _bindings : any = null;
	
	public getBinding() : void{
		
		if(this._bindings == null){
			var files = vscode.workspace.findFiles('**\*.cs', null, 2000);
			var p =  new Promise((resolve, reject) => resolve(
				files.then(files => {
					var allbindings = [].concat.apply([],files.map(file => {
						var content = fs.readFileSync(file.fsPath,'utf8');
						var bindings = this.getBindings(content);
						return bindings.map(b => new FileBinding(file.fsPath, b));
					}));
				}
			)))
			.then(v => 
				this._bindings = v, e => this._bindings = null)
			
		}
		else{
			
		}
		

	}
	public match : string = '**\*.cs';
	public antimatch : string = null;
	
	getBindings(content:string) : any{
		var regex =  /\[Given\(@\"([^"]*)\"\)\]/g;	
		return this.applyRegex(regex, content);
	}
	
	applyRegex(regex: any, content: string){
		var match = regex.exec(content);
		if(match == null) return [];
		return match.slice(1,2).concat(this.applyRegex(regex, content));
	}
}

export class FileBinding{
	filename: string;
	matching: string;
	
	constructor(filename : string, matching: string){
		this.filename = filename;
		this.matching = matching;
	}
}