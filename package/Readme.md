# 📦 Creating and Testing a Local NPM Package for UI5 Applications

This guide explains how to create a modern **JavaScript-based NPM package** for **SAPUI5 applications**, test it locally, and support both **JavaScript** and **TypeScript**-based UI5 projects with proper configuration.

---

## 🧱 1. Create the NPM Package

To use **ES Modules** (instead of CommonJS), your `package.json` must include the following:

```json
{
  "name": "your-new-npm-package",
  "version": "1.0.0",
  "description": "A reusable utility for UI5 applications.",
  "main": "index.js",
  "type": "module"
}
```

This enables modern syntax like:

```js
export function doSomething() { ... }
import { doSomething } from 'your-new-npm-package';
```

---

## 🔗 2. Link the Package Locally (Development Without Publishing)

You can link your local package to your UI5 app using `npm link`:

### Step 1: Register the Package Globally

```bash
cd /path/to/your-npm-package
npm link
```

### Step 2: Link the Package to Your UI5 Application

```bash
cd /path/to/your-ui5-app
npm link your-new-npm-package
```

> 🔄 This creates a symlink in `node_modules`, so your UI5 app will instantly reflect code changes in your local package.

---

## ⚙️ 3. Enable NPM Modules in UI5 with `ui5-tooling-modules`

By default, UI5 tooling doesn’t load packages from `node_modules`. To support this:

### Install the Middleware

```bash
npm install ui5-tooling-modules --save-dev
```

### Configure `ui5.yaml`

```yaml
builder:
  customTasks:
    - name: ui5-tooling-modules-task
      afterTask: replaceVersion
	  
server:
  customMiddleware:
    - name: ui5-tooling-modules
      afterMiddleware: compression
      configuration:
        debug: true
```

📚 More info: [ui5-tooling-modules on npm](https://www.npmjs.com/package/ui5-tooling-modules)

---

## 🧠 4. Support TypeScript Consumers

If your UI5 application is written in **TypeScript**, your package must expose typings.

### Update `package.json`

```json
{
  ...
  "types": "index.d.ts"
}
```

### Create `index.d.ts` in your package root

```ts
// index.d.ts
export function openAbicsAccessibilityPopover(controller: any, oEvent: any): void;
```

This enables proper **type checking**, **auto-completion**, and **editor integration** in TypeScript projects.

---

## 🚀 5. Example Usage

### JavaScript-Based UI5 App

```js
sap.ui.define([
  "./BaseController",
  "sap/m/MessageBox",
  "abics_accessibility_popover",
  "sap/ui/base/Event"
], function (BaseController, MessageBox, AccessibilityPopover, Event) {
  "use strict";

  return BaseController.extend("jsapp.controller.Main", {
    sayHello: function (Event) {
      AccessibilityPopover.openAbicsAccessibilityPopover(this, Event);
    }
  });
});
```

---

### TypeScript-Based UI5 App

```ts
import MessageBox from "sap/m/MessageBox";
import BaseController from "./BaseController";
import UIEvent from "sap/ui/base/Event";
import { openAbicsAccessibilityPopover } from "abics_accessibility_popover";

/**
 * @namespace tsapp.controller
 */
export default class Main extends BaseController {
  public sayHello(Event: UIEvent): void {
    openAbicsAccessibilityPopover(this, Event);
  }
}
```

---

## ✅ Summary

- ✅ Use `"type": "module"` for modern JS syntax.
- 🔁 Use `npm link` for local development without publishing.
- 🧩 Use `ui5-tooling-modules` to resolve dependencies from `node_modules`.
- 🧠 Add `"types": "index.d.ts"` and define exported APIs to support TypeScript usage.

---

> This workflow allows you to develop, test, and reuse powerful UI5 utilities across projects with full compatibility for both JavaScript and TypeScript-based environments.
