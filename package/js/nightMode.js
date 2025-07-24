let isDarkMode = false;

// Apply dark mode styles to popover
const applyPopoverDarkMode = () => {
    const style = document.createElement('style');
    style.id = 'popover-dark-mode-styles';
    style.textContent = `
        .abicsAccessibilityPopover * {
            background-color: #2b2b2b !important;
            color: #ffffff !important;
            border-color: #555555 !important;
        }
        
        .abicsAccessibilityPopover .sapMPanel .sapMTB.sapMPanelHeaderTB {
            background-color: #2b2b2b !important;
            color: #ffffff !important;
        }
        
        .abicsAccessibilityPopover .sapMPanel .sapMTB.sapMPanelHeaderTB .sapMTitle,
        .abicsAccessibilityPopover .sapMPanel .sapMTB.sapMPanelHeaderTB .sapUiIcon {
            color: #ffffff !important;
            background-color: #2b2b2b !important;
        }
        
        .abicsAccessibilityPopover .sapMPopoverHeader .sapMBarContainer *,
        .abicsAccessibilityPopover .sapMPopoverHeader .sapMBarContainer {
            background-color: #1a1a1a !important;
            color: #ffffff !important;
        }
        
        .abicsAccessibilityPopover .sapMSwtLabel {
            background-color: #555555 !important;
            color: #ffffff !important;
        }
        
        .abicsAccessibilityPopover .sapMSwtInner .sapMSwtHandle {
            background-color: #ffffff !important;
        }
        
        .abicsAccessibilityPopover .sapMSliderProgress,
        .abicsAccessibilityPopover .sapMSliderInner {
            background-color: #555555 !important;
        }
    `;
    document.head.appendChild(style);
};

// Remove dark mode styles from popover
const removePopoverDarkMode = () => {
    const existingStyle = document.getElementById('popover-dark-mode-styles');
    if (existingStyle) {
        existingStyle.remove();
    }
};

export const toggleNightMode = () => {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
        sap.ui.getCore().applyTheme("sap_horizon_dark");
        applyPopoverDarkMode();
    } else {
        sap.ui.getCore().applyTheme("sap_horizon");
        removePopoverDarkMode();
    }
    return isDarkMode;
};

export const disableNightMode = () => {
    if (isDarkMode) {
        sap.ui.getCore().applyTheme("sap_horizon");
        removePopoverDarkMode();
        isDarkMode = false;
    }
};

export const isNightModeActive = () => isDarkMode; 