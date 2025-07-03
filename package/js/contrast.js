let _settingsModel = null;
const _rootElement = document.documentElement;
let contrastActive = false;

export const initContrastHandler = (oSettingsModel) => {
    _settingsModel = oSettingsModel;
};

const _updateView = () => {
    if (!_settingsModel) return;

    const isActive = _settingsModel.getProperty("/contrast/isActive");
    if (isActive) {
        const value = _settingsModel.getProperty("/contrast/contrastValue");
        _rootElement.style.filter = `contrast(${value})`;
    } else {
        _rootElement.style.filter = "";
    }
};

export const onToggleContrast = () => {
    if (!_settingsModel) return;

    const bIsActive = _settingsModel.getProperty("/contrast/isActive");
    _settingsModel.setProperty("/contrast/isActive", !bIsActive);

    if (!bIsActive && _settingsModel.getProperty("/contrast/contrastValue") === 1) {
        _settingsModel.setProperty("/contrast/contrastValue", 1.5);
    }

    _updateView();
};

export const onIncreaseContrast = () => {
    if (!_settingsModel || !_settingsModel.getProperty("/contrast/isActive")) return;

    let value = _settingsModel.getProperty("/contrast/contrastValue");
    if (value < 3.0) {
        value += 0.1;
        _settingsModel.setProperty("/contrast/contrastValue", parseFloat(value.toFixed(2)));
        _updateView();
    }
};

export const onDecreaseContrast = () => {
    if (!_settingsModel || !_settingsModel.getProperty("/contrast/isActive")) return;

    let value = _settingsModel.getProperty("/contrast/contrastValue");
    if (value > 0.5) {
        value -= 0.1;
        _settingsModel.setProperty("/contrast/contrastValue", parseFloat(value.toFixed(2)));
        _updateView();
    }
};

export const onResetContrast = () => {
    if (!_settingsModel) return;

    if (_settingsModel.getProperty("/contrast/isActive")) {
        _settingsModel.setProperty("/contrast/contrastValue", 1);
        _updateView();
    }
};

export const toggleContrastMode = () => {
    contrastActive = !contrastActive;
    if (contrastActive) {
        document.body.style.filter = 'invert(1) grayscale(1)';
        document.body.style.backgroundColor = '#000';
        document.body.style.color = '#fff';
    } else {
        document.body.style.filter = '';
        document.body.style.backgroundColor = '';
        document.body.style.color = '';
    }
    return contrastActive;
};

export const isContrastModeActive = () => contrastActive;