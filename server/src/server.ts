'use strict';

import {
	createConnection, IConnection, TextDocumentSyncKind,
	TextDocuments, ITextDocument, Diagnostic, DiagnosticSeverity,
	InitializeParams, InitializeResult, TextDocumentIdentifier,
	CompletionItem, CompletionItemKind, RemoteWindow
} from 'vscode-languageserver';

let connection: IConnection = createConnection(process.stdin, process.stdout);

let documents: TextDocuments = new TextDocuments();
documents.listen(connection);

let workspaceRoot : string;

connection.onInitialize((params): InitializeResult => {
	workspaceRoot = params.rootPath;
	
	return {
		capabilities: {
			// Tell the client that the server works in FULL text document sync mode
			textDocumentSync: documents.syncKind,
			// Tell the client that the server support code complete
			completionProvider: {
				resolveProvider: true
			}
		}
	}
});


interface Binding{
	currentFile : string;
	labels: string[];
	
}

function getBindings() : Binding[]{
	return [
		{currentFile: 'bindings.cs', labels: ['Given is a test', 'Given is a teest']},
		{currentFile: 'bindings.cs', labels: ['When it is a test']},
		{currentFile: 'bindings.cs', labels: ['Then it must be a test']}
	];
}

connection.onCompletion((textDocumentPosition: TextDocumentIdentifier): CompletionItem[] => {
	
	let specflowExamples =  [
		{
			label: 'Given I have entered <number> into the calculator (from server)',
			kind: CompletionItemKind.Value,
			data: 1
		},
		{
			label: 'When I press add',
			kind: CompletionItemKind.Value,
			data: 2
		},
		{
			label: 'Then the result should be <number> on the screen',
			kind: CompletionItemKind.Value,
			data: 3
		}
	]
	
	return specflowExamples;
});

connection.listen();