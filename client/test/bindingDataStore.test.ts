import * as vscode from "vscode";
import * as assert from "assert";
import {BindingDataStore} from "../src/BindingDataStore";

describe("BindingDataStore", () => {

	it("insertBindingsAndCountThem", (done) => {
		var ds = new BindingDataStore();
		ds.insertBinding("testFile", "testbinding");
		ds.insertBinding("testFileTwo", "testbindingTwo");

		ds.countAll((error, count) => {
			assert.equal(2, count);
			done();
		});
	});

	it("insertBindingsAndFindByFilePath", (done) => {
		var ds = new BindingDataStore();
		ds.insertBinding("testFile", "testbinding");
		ds.insertBinding("testFileTwo", "testbinding2");

		ds.getByFile("testFile", (error, records) => {
			assert.equal(1, records.length);
			done();
		});
	});

	it("insertBindingsAndFindByBinding", (done) => {
		var ds = new BindingDataStore();
		ds.insertBinding("testFile", "Das ist ja cool");
		ds.insertBinding("testFileTwo", "Das ist noch viel cooler");
		ds.insertBinding("testFileThree", "Das war schon immer cooler");

		ds.getByBinding("ist", (error, records) => {
			assert.equal(2, records.length);
			done();
		});
	});

});

