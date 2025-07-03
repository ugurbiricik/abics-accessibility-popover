const STORAGE_KEY = "eye-able-images-hidden";
const CSS_CLASS = "eye-able-images-hidden";

let imagesHidden = false;
let observer = null;

function setVisibilityAll(selector, value) {
    document.querySelectorAll(selector).forEach(el => el.style.visibility = value);
}

function setVisibilityBackgroundImage(value) {
    document.querySelectorAll('[style*="background-image"]').forEach(el => el.style.visibility = value);
}

function setVisibilityInShadowRoots(value) {
    document.querySelectorAll('*').forEach(el => {
        if (el.shadowRoot) {
            el.shadowRoot.querySelectorAll('img,svg,.sapUiIcon,.sapMImg,.sapMBtnIcon,.sapFAvatar,.sapMIllustratedMessage-illu').forEach(shEl => shEl.style.visibility = value);
            el.shadowRoot.querySelectorAll('[style*="background-image"]').forEach(shEl => shEl.style.visibility = value);
        }
    });
}

export const toggleImages = () => {
    imagesHidden = !imagesHidden;
    if (imagesHidden) {
        hideImages();
        startImageObserver();
    } else {
        showImages();
        stopImageObserver();
    }
    localStorage.setItem(STORAGE_KEY, imagesHidden);
    console.log(`Images are now ${imagesHidden ? 'hidden' : 'visible'}.`);
    return imagesHidden;
};

export const initImageHider = () => {
    const shouldHide = localStorage.getItem(STORAGE_KEY) === "true";
    if (shouldHide) {
        document.body.classList.add(CSS_CLASS);
        console.log("Initializing with images hidden based on user preference.");
    }
};

export const hideImages = () => {
    setVisibilityAll('img', 'hidden');
    setVisibilityAll('svg', 'hidden');
    setVisibilityAll('.sapMImg', 'hidden');
    setVisibilityAll('.sapMBtnIcon', 'hidden');
    setVisibilityAll('.sapUiIcon', 'hidden');
    setVisibilityAll('.sapFAvatar', 'hidden');
    setVisibilityAll('.sapMIllustratedMessage-illu', 'hidden');
    setVisibilityBackgroundImage('hidden');
    setVisibilityInShadowRoots('hidden');
};

export const showImages = () => {
    setVisibilityAll('img', '');
    setVisibilityAll('svg', '');
    setVisibilityAll('.sapMImg', '');
    setVisibilityAll('.sapMBtnIcon', '');
    setVisibilityAll('.sapUiIcon', '');
    setVisibilityAll('.sapFAvatar', '');
    setVisibilityAll('.sapMIllustratedMessage-illu', '');
    setVisibilityBackgroundImage('');
    setVisibilityInShadowRoots('');
};

export const areImagesHidden = () => imagesHidden;

export const startImageObserver = () => {
    if (observer) return;
    observer = new MutationObserver(() => {
        if (imagesHidden) hideImages();
    });
    observer.observe(document.body, { childList: true, subtree: true });
};

export const stopImageObserver = () => {
    if (observer) observer.disconnect();
    observer = null;
};