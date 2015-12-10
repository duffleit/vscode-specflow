'use strict';
import vscode = require('vscode');
import {Driver, DriverContext } from './Common';
import fs = require('fs');

export class SpecflowDriver implements Driver{
	
	private context : DriverContext;
	
	constructor(context : DriverContext){
		this.context = context;
	}
	
	public suggestBindings() : Promise<vscode.CompletionItem[]>{
		
		var files = this.context.getAllFiles('**\*.cs',null);
	 	var num = 1;
		return new Promise(
			(resolve, reject) => resolve(
				files.then(files => {
					
					var allbindings = [].concat.apply([],files.map(file => {
						var content = fs.readFileSync(file.fsPath,'utf8');
						var bindings = this.getBindings(content);
						return bindings;
					}));
					
					var completionItems = allbindings.map(binding => {
						var completionItem = new vscode.CompletionItem(binding);
						completionItem.kind = vscode.CompletionItemKind.Value;
						return completionItem;
					});
					
					return completionItems;
				})
			)
		);
	}

		
	private getBindings(content:string) : any{
		var regex =  /\[(Given|When|Then)\(@\"([^"]*)\"\)\]/g;	
		return this.applyRegex(regex, content);
	}
	
	private applyRegex(regex: any, content: string){
		var match = regex.exec(content);
		if(match == null) return [];
		
		var arr = [];
		arr.push(match[1]+ " " + match[2]);
		return arr.concat(this.applyRegex(regex, content));
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