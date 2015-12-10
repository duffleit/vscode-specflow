'use strict';
import vscode = require('vscode');

export interface Driver {
    suggestBindings() : Promise<vscode.CompletionItem[]>;
}

export interface DriverContext {
    getAllFiles(include: string, exclude: string) : Thenable<vscode.Uri[]>;
}