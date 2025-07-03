let isDarkMode = false;

export const toggleNightMode = () => {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
        sap.ui.getCore().applyTheme("sap_horizon_dark");
    } else {
        sap.ui.getCore().applyTheme("sap_horizon");
    }
    return isDarkMode;
};

export const disableNightMode = () => {
    if (isDarkMode) {
        sap.ui.getCore().applyTheme("sap_horizon");
        isDarkMode = false;
    }
};

export const isNightModeActive = () => isDarkMode; 