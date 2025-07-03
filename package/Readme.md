Creating and Locally Testing an NPM Package for UI5 Applications

This guide outlines the process of creating a modern JavaScript NPM package and testing it locally within a separate UI5 application.

1. Setting Up the NPM Package

A critical first step is to correctly define the module system for your package. The choice between CommonJS and ES Modules (ESM) affects how you write import and export statements.

For this guide, we will use the modern ES Modules standard.

Configure package.json for ES Modules

To ensure your package is treated as an ES Module, you must add the "type": "module" property to your package.json file.

{
  "name": "your-new-npm-package",
  "version": "1.0.0",
  "description": "A reusable utility for UI5 applications.",
  "main": "index.js",
  "type": "module"
}

2. Preparing the UI5 Consumer Application

To test your local NPM package within a UI5 application, the UI5 project needs to be configured to resolve dependencies from the node_modules folder. This is not a default behavior of the UI5 tooling.

Install ui5-tooling-modules

The ui5-tooling-modules package is a custom middleware that enables the UI5 development server to locate and serve your linked NPM packages. Install it as a development dependency in your UI5 application:

npm install ui5-tooling-modules --save-dev

Configure ui5.yaml

After installing the middleware, you must register it in your ui5.yaml file. The configuration instructs the UI5 server on how to handle requests for your package's resources.

For detailed and up-to-date instructions on the various configuration options, please refer to the official documentation:

https://www.npmjs.com/package/ui5-tooling-modules


4. Linking the Package for Local Testing
To test your package in your local UI5 application without publishing it to a registry, you can use the npm link command. This creates a symbolic link (symlink) that makes your UI5 app use your local package code directly. This means any changes you save in your package are instantly reflected in your UI5 application.
The process involves two steps:
Step 1: Register the Package Globally
First, navigate to the root directory of your NPM package and run the following command. This creates a global link on your machine that points to your package's folder.
Generated bash

# Go to your package's directory
cd /path/to/your-npm-package

# Create the global link
npm link

Step 2: Link the Package to Your UI5 Application
Next, navigate to the root directory of your UI5 application and run the following command. Replace your-new-npm-package with the actual name from your package's package.json file.

# Go to your UI5 application's directory
cd /path/to/your-ui5-app

# Link the globally registered package into this project
npm link your-new-npm-package
This command creates a symlink inside your UI5 app's node_modules folder that points to your globally linked package. You can now import from it in your UI5 code as if you had installed it from the NPM registry.



Only UI5 with JS

sap.ui.define(["./BaseController", "sap/m/MessageBox", "abics-accessibility-popover", "sap/ui/base/Event"], function (BaseController, MessageBox, AccessibilityPopover, Event) {
	"use strict";

	return BaseController.extend("jsapp.controller.Main", {

		sayHello: function (Event) {
			AccessibilityPopover.openAbicsAccessibilityPopover(this, Event)
		}
	});
});


Only UI5 with TS

import MessageBox from "sap/m/MessageBox";
import BaseController from "./BaseController";
import  UIEvent  from "sap/ui/base/Event";
import { openAbicsAccessibilityPopover } from "abics-accessibility-popover";

/**
 * @namespace tsapp.controller
 */
export default class Main extends BaseController {
	public sayHello(Event : UIEvent): void {
		openAbicsAccessibilityPopover(this, Event)
	}
}







