import { getText } from "./js/i18nModel.js";

/**
 * 
 * @returns {Array} 
 */
function getPopoverModules() {
  return [
    {
      id: "fontSize",
      icon: "sap-icon://text-formatting",
      name: getText("fontSize.title"),
      expandable: true,
      expanded: false,
    },

    {
      id: "contrast",
      icon: "sap-icon://microphone",
      name: getText("tts.title"),
      expandable: true,
      expanded: false,
    },
    {
      id: "colorBlindness",
      icon: "sap-icon://palette",
      name: getText("colorBlindness.title"),
      expandable: true,
      expanded: false,
    },
    {
      id: "blauFilter",
      icon: "sap-icon://light-mode",
      name: getText("blueFilter.activate"),
      expandable: true,
      expanded: false,
    },
    {
      id: "darkMode",
      icon: "sap-icon://paint-bucket",
      name: getText("contrastMode.activate"),
      expandable: false,
      expanded: false,
    },

    {
      id: "nightMode",
      icon: "sap-icon://dark-mode",
      name: getText("nightMode.activate"),
      expandable: false,
      expanded: false,
    },

    {
      id: "tabNavigation",
      icon: "sap-icon://keyboard-and-mouse",
      name: getText("tabNavigation.title"),
      expandable: false,
      expanded: false,
    },

    {
      id: "toggleImages",
      icon: "sap-icon://picture",
      name: getText("toggleImages.hide"),
      expandable: false,
      expanded: false,
    },
  ];
}

export default getPopoverModules;
