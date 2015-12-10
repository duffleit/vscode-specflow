'use strict';
import vscode = require('vscode');
import DataStore = require("nedb");

export class BindingDataStore{
	private dataStore : any;
	constructor(){
		var datastore = new DataStore();
		datastore.loadDatabase();
		this.dataStore = datastore;
	};

	insertBinding(filePath: string, binding:string) : void{
		var record = { filePath: filePath, binding: binding };
		this.dataStore.insert(record);
	}

	getByFile(filePath : string, callback: (error: any, records: any) => void){
		this.dataStore.find({filePath: filePath}, callback);
	}

	getByBinding(binding : string, callback: (error: any, records: any) => void){
		this.dataStore.find({binding: new RegExp(binding)}, callback);
	}
	countAll(callback : (error: any, count: number) => void) : void {
		this.dataStore.count({}, callback);
	}
};
