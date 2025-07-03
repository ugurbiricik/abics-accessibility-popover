
let isCustomStyleLoaded = false;
export function loadCustomStyleOnce() {
  if (isCustomStyleLoaded) {
    return;
  }

  try {
    const sCorrectPath = sap.ui.require.toUrl("abics-accessibility-popover/css/style.css");

    const link = document.createElement("link");
    link.id = "abics-accessibility-popover-styles";
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = sCorrectPath;
    document.head.appendChild(link);
    
    isCustomStyleLoaded = true;
    console.log("Custom CSS loaded successfully from:", sCorrectPath);
  } catch (error) {
      console.error("Failed to load custom CSS:", error);
  }
}