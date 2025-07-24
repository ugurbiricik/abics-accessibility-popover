import ResourceModel from "sap/ui/model/resource/ResourceModel";

let i18nModel = null;

/**
 * 
 * @returns {string}  (en, de vb.)
 */
function detectBrowserLanguage() {
  
    const supportedLanguages = ['en', 'de'];
    
  
    const browserLanguages = navigator.languages || [navigator.language || navigator.userLanguage];
    
 
    for (const lang of browserLanguages) {
        const cleanLang = lang.split('-')[0].toLowerCase();
        if (supportedLanguages.includes(cleanLang)) {
            return cleanLang;
        }
    }
    
    return 'de';
}

/**
 * 
 * @returns {sap.ui.model.resource.ResourceModel} I18n model
 */
export function createI18nModel() {
    if (i18nModel) {
        return i18nModel;
    }
    
    const detectedLanguage = detectBrowserLanguage();
    console.log(`[ui5-smart-access] Detected language: ${detectedLanguage}`);
    
    try {
        const bundleNames = [
            "ui5-smart-access.i18n.i18n",
            "ui5-smart-access/i18n/i18n", 
            "./i18n/i18n"
        ];
        
        for (const bundleName of bundleNames) {
            try {
                console.log(`[ui5-smart-access] Trying bundle name: ${bundleName}`);
                
                i18nModel = new ResourceModel({
                    bundleName: bundleName,
                    supportedLocales: ["en", "de", ""],
                    locale: detectedLanguage,
                    fallbackLocale: "de"
                });
                
                const resourceBundle = i18nModel.getResourceBundle();
                if (resourceBundle) {
                    const testText = resourceBundle.getText("fontSize.title");
                    if (testText && testText !== "fontSize.title") {
                        console.log(`[ui5-smart-access] Successfully loaded with bundle: ${bundleName}`);
                        console.log(`[ui5-smart-access] Test text: ${testText}`);
                        return i18nModel;
                    }
                }
            } catch (error) {
                console.warn(`[ui5-smart-access] Failed with bundle ${bundleName}:`, error);
                continue;
            }
        }
        
        throw new Error("All bundle names failed");
        
    } catch (error) {
        console.error(`[ui5-smart-access] Error creating i18n model:`, error);
        
        i18nModel = new ResourceModel({
            bundleName: "ui5-smart-access.i18n.i18n",
            supportedLocales: ["en", "de"],
            locale: detectedLanguage,
            fallbackLocale: "de"
        });
    }
    
    return i18nModel;
}

/**
 *
 * @returns {sap.ui.model.resource.ResourceModel|null} I18n model
 */
export function getI18nModel() {
    return i18nModel;
}

/**
 * 
 * @param {string} language  (en, de)
 */
export function changeLanguage(language) {
    if (i18nModel && ['en', 'de'].includes(language)) {
        
        i18nModel = null;
        createI18nModel();
        console.log(`[ui5-smart-access] Language changed to: ${language}`);
    }
}

/**
 * 
 * @param {string} key I18n key
 * @param {Array} parameters 
 * @returns {string} 
 */
export function getText(key, parameters = []) {
    if (!i18nModel) {
        console.warn(`[ui5-smart-access] I18n model not initialized, returning key: ${key}`);
        return key;
    }
    
    try {
        const resourceBundle = i18nModel.getResourceBundle();
        if (resourceBundle) {
            const text = resourceBundle.getText(key, parameters);
            if (text && text !== key) {
                return text;
            }
        }
    } catch (error) {
        console.error(`[ui5-smart-access] Error getting text for key '${key}':`, error);
    }
    
    console.warn(`[ui5-smart-access] No translation found for key: ${key}`);
    return key;
} 