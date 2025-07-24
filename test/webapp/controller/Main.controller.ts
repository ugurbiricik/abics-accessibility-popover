
import BaseController from "./BaseController";
import {openAccessPopover} from "ui5-smart-access";
import UIEvent from "sap/ui/base/Event";

/**
 * @namespace test.controller
 */
export default class Main extends BaseController {

	openAbicsAccessibilityPopover(oEvent : UIEvent): void {
		openAccessPopover(this, oEvent);

	}
}
