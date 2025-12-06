import { mockData } from './mock/transactions.js';

// ---
// ESTADO GLOBAL DA APLICAÇÃO
// ---
let transactions = [...mockData];
let currentTheme = localStorage.getItem('theme') || 'light';

// ---
// SELETORES DO DOM (Constantes - Padrão UPPER_SNAKE_CASE)
// ---
const THEME_SWITCHER_BTN = document.getElementById('theme-switcher');
const BODY_ELEMENT = document.body;

// ---
// MANIPULAÇÃO DO DOM (Renderização)
// ---

/**
 * Aplica o tema atual ao body.
 */
function applyTheme() {
    BODY_ELEMENT.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
}

// ---
// EVENT LISTENERS
// ---

/**
 * Lida com o clique no botão de trocar o tema (Light/Dark).
 */
THEME_SWITCHER_BTN.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme();
});

/**
 * Função de inicialização da aplicação. A "main"
 */
function init() {
}

// Inicia a aplicação
init();
