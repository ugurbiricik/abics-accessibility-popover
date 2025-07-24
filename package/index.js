import JSONModel from "sap/ui/model/json/JSONModel";
import getPopoverModules from "./popoverModules.js";
import Fragment from "sap/ui/core/Fragment";
import { loadCustomStyleOnce } from "./js/cssLoader.js";
import { createI18nModel, getText } from "./js/i18nModel.js";
import {
    initFontSizer,
    onIncreaseFontSize,
    onDecreaseFontSize,
    onResetFontSize
} from "./js/fontsize.js";
import {
    initTextToSpeech,
    startReading,
    stopReading,
    setTTSRate,
    setTTSVolume,
    enableHoverRead,
    disableHoverRead
} from "./js/textToSpeech.js";
import {
    applyColorBlindness,
    resetColorBlindness
} from "./js/colorBlindness.js";
import {
    enableBlueLightFilter,
    disableBlueLightFilter
} from "./js/blueLightFilter.js";
import {
    toggleNightMode
} from "./js/nightMode.js";
import {
    toggleImages
} from "./js/imageHider.js";
import {
    toggleContrastMode
} from "./js/contrast.js";
import { resetAll } from "./js/resetAll.js";

const oSettingsModel = new JSONModel({
    fontStep: 0,
    ttsRate: 1,
    ttsVolume: 1,
    ttsHover: false,
    colorBlindnessType: 'none',
    blueLightFilterLevel: 50,
    blueLightFilterActive: false,
    fontSizeExpanded: false,
    ttsExpanded: false,
    colorBlindnessExpanded: false,
    blaufilterExpanded: false,
    nightModeActive: false,
    toggleImagesActive: false,
    contrastModeActive: false,
    contrastModeExpanded: false,
    contrastBgColor: "#000000",
    contrastTextColor: "#FFFFFF",
    contrastRatio: "21:1",
    contrastReadable: "LESBAR?",
    contrastUnderlineLinks: true
});

const popoverInternalController = {
    onFontSizeToolbarPress: function () {
        const expanded = oSettingsModel.getProperty("/fontSizeExpanded");
        oSettingsModel.setProperty("/fontSizeExpanded", !expanded);
    },
    onTTSToolbarPress: function () {
        const expanded = oSettingsModel.getProperty("/ttsExpanded");
        oSettingsModel.setProperty("/ttsExpanded", !expanded);
    },
    onColorBlindnessToolbarPress: function () {
        const expanded = oSettingsModel.getProperty("/colorBlindnessExpanded");
        oSettingsModel.setProperty("/colorBlindnessExpanded", !expanded);
    },
    onBlaufilterToolbarPress: function () {
        const expanded = oSettingsModel.getProperty("/blaufilterExpanded");
        oSettingsModel.setProperty("/blaufilterExpanded", !expanded);
        
        
        const blaufilterTitle = Fragment.byId(this._sFragmentId, "blaufilterTitle");
        if (blaufilterTitle && this._oPopover) {
            const i18nModel = this._oPopover.getModel("i18n");
            if (i18nModel && i18nModel.getResourceBundle) {
                const bundle = i18nModel.getResourceBundle();
                const newText = !expanded ? bundle.getText("blueFilter.deactivate") : bundle.getText("blueFilter.activate");
                blaufilterTitle.setText(newText);
            }
        }
        
        if (!expanded) {
            enableBlueLightFilter(oSettingsModel.getProperty("/blueLightFilterLevel"));
            oSettingsModel.setProperty("/blueLightFilterActive", true);
        } else {
            disableBlueLightFilter();
            oSettingsModel.setProperty("/blueLightFilterActive", false);
        }
    },
    onNightModeToolbarPress: function () {
        const active = toggleNightMode();
        oSettingsModel.setProperty("/nightModeActive", active);
        
       
        const nightModeTitle = Fragment.byId(this._sFragmentId, "nightModeTitle");
        if (nightModeTitle && this._oPopover) {
            const i18nModel = this._oPopover.getModel("i18n");
            if (i18nModel && i18nModel.getResourceBundle) {
                const bundle = i18nModel.getResourceBundle();
                const newText = active ? bundle.getText("nightMode.deactivate") : bundle.getText("nightMode.activate");
                nightModeTitle.setText(newText);
            }
        }
    },
    onToggleImagesToolbarPress: function () {
        const active = toggleImages();
        oSettingsModel.setProperty("/toggleImagesActive", active);
        
 
        const toggleImagesTitle = Fragment.byId(this._sFragmentId, "toggleImagesTitle");
        if (toggleImagesTitle && this._oPopover) {
            const i18nModel = this._oPopover.getModel("i18n");
            if (i18nModel && i18nModel.getResourceBundle) {
                const bundle = i18nModel.getResourceBundle();
                const newText = active ? bundle.getText("toggleImages.show") : bundle.getText("toggleImages.hide");
                toggleImagesTitle.setText(newText);
            }
        }
    },
    onContrastModeToolbarPress: function () {
        const active = toggleContrastMode();
        oSettingsModel.setProperty("/contrastModeActive", active);
        
       
        const contrastModeTitle = Fragment.byId(this._sFragmentId, "contrastModeTitle");
        if (contrastModeTitle && this._oPopover) {
            const i18nModel = this._oPopover.getModel("i18n");
            if (i18nModel && i18nModel.getResourceBundle) {
                const bundle = i18nModel.getResourceBundle();
                const newText = active ? bundle.getText("contrastMode.deactivate") : bundle.getText("contrastMode.activate");
                contrastModeTitle.setText(newText);
            }
        }
    },
    onResetAllToolbarPress: function () {
        resetAll();
        oSettingsModel.setProperty("/fontStep", 0);
        oSettingsModel.setProperty("/ttsRate", 1);
        oSettingsModel.setProperty("/ttsVolume", 1);
        oSettingsModel.setProperty("/ttsHover", false);
        oSettingsModel.setProperty("/colorBlindnessType", 'none');
        oSettingsModel.setProperty("/blueLightFilterLevel", 50);
        oSettingsModel.setProperty("/blueLightFilterActive", false);
        oSettingsModel.setProperty("/fontSizeExpanded", false);
        oSettingsModel.setProperty("/ttsExpanded", false);
        oSettingsModel.setProperty("/colorBlindnessExpanded", false);
        oSettingsModel.setProperty("/blaufilterExpanded", false);
        oSettingsModel.setProperty("/nightModeActive", false);
        oSettingsModel.setProperty("/toggleImagesActive", false);
        oSettingsModel.setProperty("/contrastModeActive", false);
    },
    onContrastPresetPress: function (oEvent) {
        const key = oEvent.getSource().getCustomData()[0].getValue();
        let bg = "#000000", text = "#FFFFFF";
        if (key === "black-white") { bg = "#000000"; text = "#FFFFFF"; }
        if (key === "yellow-black") { bg = "#FFFF00"; text = "#000000"; }
        if (key === "red-black") { bg = "#FF0000"; text = "#000000"; }
        if (key === "green-black") { bg = "#00FF00"; text = "#000000"; }
        oSettingsModel.setProperty("/contrastBgColor", bg);
        oSettingsModel.setProperty("/contrastTextColor", text);
        updateContrastPreview();
    },
    onContrastApply: function () {
        applyContrastToDOM(
            oSettingsModel.getProperty("/contrastBgColor"),
            oSettingsModel.getProperty("/contrastTextColor"),
            oSettingsModel.getProperty("/contrastUnderlineLinks")
        );
        oSettingsModel.setProperty("/contrastModeActive", true);
    },
    onContrastReset: function () {
        removeContrastFromDOM();
        oSettingsModel.setProperty("/contrastBgColor", "#000000");
        oSettingsModel.setProperty("/contrastTextColor", "#FFFFFF");
        oSettingsModel.setProperty("/contrastUnderlineLinks", true);
        oSettingsModel.setProperty("/contrastModeActive", false);
        updateContrastPreview();
    },
    onUnderlineLinksToggle: function (oEvent) {
        oSettingsModel.setProperty("/contrastUnderlineLinks", oEvent.getParameter("selected"));
        updateContrastPreview();
    },
    onPopoverClosePress: function (oEvent) {
        let oPopover = oEvent.getSource().getParent();
        while (oPopover && !(oPopover.isA && oPopover.isA("sap.m.Popover"))) {
            oPopover = oPopover.getParent && oPopover.getParent();
        }
        if (oPopover && oPopover.close) {
            oPopover.close();
        }
    }
};

export const openAccessPopover = async (controller, oEvent) => {
    // DEBUG: Parameter checks
    if (!controller || typeof controller.getView !== "function") {
        console.error("[ui5-smart-access] ERROR: The controller parameter must be a UI5 Controller!", controller);
        throw new Error("The controller parameter must be a UI5 Controller!");
    }
    if (!oEvent || typeof oEvent.getSource !== "function") {
        console.error("[ui5-smart-access] ERROR: The oEvent parameter must be a UI5 Event!", oEvent);
        throw new Error("The oEvent parameter must be a UI5 Event!");
    }
    const oView = controller.getView();
    const sFragmentId = oView.getId();

    if (!controller._pPopover) {
        console.debug("[ui5-smart-access] Popover is being loaded for the first time.");
        loadCustomStyleOnce();
        initFontSizer(oSettingsModel);
        initTextToSpeech(oSettingsModel);

        const i18nModel = createI18nModel();

        controller._pPopover = Fragment.load({
            id: sFragmentId,
            name: "ui5-smart-access.Popover",
            controller: popoverInternalController
        }).then((oPopover) => {
            if (!oPopover) {
                console.error("[ui5-smart-access] ERROR: Fragment could not be loaded!");
                throw new Error("Popover Fragment could not be loaded!");
            }
            oView.addDependent(oPopover);

            try {
                oPopover.setModel(oSettingsModel, "settings");
                oPopover.setModel(i18nModel, "i18n");
                console.log("[ui5-smart-access] I18n model successfully assigned to popover");
                
                popoverInternalController._oPopover = oPopover;
                popoverInternalController._sFragmentId = sFragmentId;
            } catch (err) {
                console.error("[ui5-smart-access] ERROR: Model could not be assigned!", err);
            }

            const closeButton = Fragment.byId(sFragmentId, "closePopoverButton");
            const increaseButton = Fragment.byId(sFragmentId, "increaseFontButton");
            const decreaseButton = Fragment.byId(sFragmentId, "decreaseFontButton");
            const resetButton = Fragment.byId(sFragmentId, "resetFontButton");

            if (!closeButton) console.warn("[ui5-smart-access] WARNING: closePopoverButton not found!");
            if (!increaseButton) console.warn("[ui5-smart-access] WARNING: increaseFontButton not found!");
            if (!decreaseButton) console.warn("[ui5-smart-access] WARNING: decreaseFontButton not found!");
            if (!resetButton) console.warn("[ui5-smart-access] WARNING: resetFontButton not found!");

            closeButton?.attachPress(() => oPopover.close());
            increaseButton?.attachPress(onIncreaseFontSize);
            decreaseButton?.attachPress(onDecreaseFontSize);
            resetButton?.attachPress(onResetFontSize);

            const ttsStartButton = Fragment.byId(sFragmentId, "ttsStartButton");
            const ttsStopButton = Fragment.byId(sFragmentId, "ttsStopButton");
            const ttsRateSlider = Fragment.byId(sFragmentId, "ttsRateSlider");
            const ttsVolumeSlider = Fragment.byId(sFragmentId, "ttsVolumeSlider");
            const ttsHoverSwitch = Fragment.byId(sFragmentId, "ttsHoverSwitch");

            ttsStartButton?.attachPress(startReading);
            ttsStopButton?.attachPress(stopReading);
            ttsRateSlider?.attachChange((e) => setTTSRate(e.getParameter("value")));
            ttsVolumeSlider?.attachChange((e) => setTTSVolume(e.getParameter("value")));
            ttsHoverSwitch?.attachChange((e) => {
                const active = e.getParameter("state");
                oSettingsModel.setProperty("/ttsHover", active);
                if (active) enableHoverRead(); else disableHoverRead();
            });

            const colorBlindnessSelect = Fragment.byId(sFragmentId, "colorBlindnessSelect");
            const colorBlindnessResetButton = Fragment.byId(sFragmentId, "colorBlindnessResetButton");
            colorBlindnessSelect?.attachChange((e) => {
                const type = e.getParameter("selectedItem").getKey();
                oSettingsModel.setProperty("/colorBlindnessType", type);
                applyColorBlindness(type);
            });
            colorBlindnessResetButton?.attachPress(() => {
                oSettingsModel.setProperty("/colorBlindnessType", "none");
                resetColorBlindness();
            });

            const blueLightFilterSlider = Fragment.byId(sFragmentId, "blueLightFilterSlider");
            const blueLightFilterResetButton = Fragment.byId(sFragmentId, "blueLightFilterResetButton");
            blueLightFilterSlider?.attachChange((e) => {
                const level = e.getParameter("value");
                oSettingsModel.setProperty("/blueLightFilterLevel", level);
                enableBlueLightFilter(level);
            });
            blueLightFilterResetButton?.attachPress(() => {
                oSettingsModel.setProperty("/blueLightFilterLevel", 0);
                disableBlueLightFilter();
            });

            const blueLightFilterHeaderButton = Fragment.byId(sFragmentId, "blueLightFilterHeaderButton");
            blueLightFilterHeaderButton?.attachPress(() => {
                const active = oSettingsModel.getProperty("/blueLightFilterActive");
                if (!active) {
                    enableBlueLightFilter(oSettingsModel.getProperty("/blueLightFilterLevel"));
                } else {
                    disableBlueLightFilter();
                }
                oSettingsModel.setProperty("/blueLightFilterActive", !active);
            });

            oPopover.onPanelHeaderPress = function (oEvent) {
                const context = oEvent.getSource().getBindingContext("modules");
                if (context) {
                    const name = context.getProperty("name");
                    const expanded = context.getProperty("expanded");
                    context.getModel().setProperty(context.getPath() + "/expanded", !expanded);
                 
                    const activateText = getText("blueFilter.activate");
                    const deactivateText = getText("blueFilter.deactivate");
                    if (name === activateText || name === deactivateText) {
                        if (!expanded) {
                            const level = oSettingsModel.getProperty("/blueLightFilterLevel");
                            enableBlueLightFilter(level);
                        } else {
                            disableBlueLightFilter();
                        }
                    }
                }
            };

            return oPopover;
        }).catch((err) => {
            console.error("[ui5-smart-access] ERROR: Error occurred during Fragment.load!", err);
            throw err;
        });
    }

    const oPopover = await controller._pPopover;

    try {
        oPopover.setModel(new JSONModel({ items: getPopoverModules() }), "modules");
    } catch (err) {
        console.error("[ui5-smart-access] ERROR: Modules model could not be assigned!", err);
    }
    try {
        oPopover.openBy(oEvent.getSource());
    } catch (err) {
        console.error("[ui5-smart-access] ERROR: Error during openBy!", err);
    }
};

function updateContrastPreview() {
    const bg = oSettingsModel.getProperty("/contrastBgColor");
    const text = oSettingsModel.getProperty("/contrastTextColor");
    const ratio = getContrastRatio(bg, text);
    oSettingsModel.setProperty("/contrastRatio", ratio.ratioText);
    oSettingsModel.setProperty("/contrastReadable", ratio.readable ? getText("contrast.readable") : getText("contrast.notReadable"));
}
function getContrastRatio(bg, text) {
    function luminance(hex) {
        let c = hex.replace('#', '');
        if (c.length === 3) c = c.split('').map(x => x + x).join('');
        const rgb = [0, 1, 2].map(i => parseInt(c.substr(i * 2, 2), 16) / 255);
        const lum = rgb.map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
        return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
    }
    const l1 = luminance(bg);
    const l2 = luminance(text);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    return { ratioText: ratio.toFixed(1) + ":1", readable: ratio >= 4.5 };
}
function applyContrastToDOM(bg, text, underlineLinks) {
    document.body.style.backgroundColor = bg;
    document.body.style.color = text;
    Array.from(document.querySelectorAll('a')).forEach(a => {
        a.style.textDecoration = underlineLinks ? 'underline' : 'none';
        a.style.color = text;
    });
}
function removeContrastFromDOM() {
    document.body.style.backgroundColor = '';
    document.body.style.color = '';
    Array.from(document.querySelectorAll('a')).forEach(a => {
        a.style.textDecoration = '';
        a.style.color = '';
    });
}