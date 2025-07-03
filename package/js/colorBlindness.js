const FILTERS = {
    none: '',
    protanopia: 'url(#protanopia)',
    deuteranopia: 'url(#deuteranopia)',
    tritanopia: 'url(#tritanopia)',
    achromatopsia: 'grayscale(1)'
};


function injectSVGFilters() {
    if (document.getElementById('color-blindness-filters')) return;
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('id', 'color-blindness-filters');
    svg.setAttribute('style', 'position:absolute;width:0;height:0;');
    svg.innerHTML = `
      <filter id="protanopia">
        <feColorMatrix type="matrix" values="0.567 0.433 0 0 0 0.558 0.442 0 0 0 0 0.242 0.758 0 0 0 0 0 1 0"/>
      </filter>
      <filter id="deuteranopia">
        <feColorMatrix type="matrix" values="0.625 0.375 0 0 0 0.7 0.3 0 0 0 0 0.3 0.7 0 0 0 0 0 1 0"/>
      </filter>
      <filter id="tritanopia">
        <feColorMatrix type="matrix" values="0.95 0.05 0 0 0 0 0.433 0.567 0 0 0 0.475 0.525 0 0 0 0 0 1 0"/>
      </filter>
    `;
    document.body.appendChild(svg);
}

export const applyColorBlindness = (type) => {
    injectSVGFilters();
    const filter = FILTERS[type] || '';
    document.documentElement.style.filter = filter;
};

export const resetColorBlindness = () => {
    document.documentElement.style.filter = '';
}; 