
let isCustomStyleLoaded = false;
export function loadCustomStyleOnce() {
  if (isCustomStyleLoaded) {
    return;
  }

  try {
    const sCorrectPath = sap.ui.require.toUrl("access_popover/css/style.css");

    const link = document.createElement("link");
    link.id = "access_popover-styles";
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = sCorrectPath;
    document.head.appendChild(link);
    
    isCustomStyleLoaded = true;
  } catch (error) {
      console.error("Failed to load custom CSS:", error);
  }
}