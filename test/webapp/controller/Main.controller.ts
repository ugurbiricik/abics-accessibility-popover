
import BaseController from "./BaseController";
import {openAbicsAccessibilityPopover} from "abics_accessibility_popover";
import UIEvent from "sap/ui/base/Event";

/**
 * @namespace test.controller
 */
export default class Main extends BaseController {

	openAbicsAccessibilityPopover(oEvent : UIEvent): void {
		openAbicsAccessibilityPopover(this, oEvent);

	}
}
