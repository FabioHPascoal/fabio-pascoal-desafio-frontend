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

const LIST_ELEMENT = document.getElementById('transactions-list');
const TOTAL_BALANCE_ELEMENT = document.getElementById('total-balance');
const EMPTY_STATE_MSG = document.getElementById('empty-state');

const FILTER_INPUT = document.getElementById('search-input');

// ---
// FUNÇÕES UTILITÁRIAS (Formatadores)
// ---

/**
 * Formata um número para moeda brasileira (BRL).
 * @param {number} value - O valor numérico.
 * @returns {string} String formatada (ex: R$ 1.500,00).
 */
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

/**
 * Formata uma string de data ISO (YYYY-MM-DD) para PT-BR (DD/MM/YYYY).
 * Usa split para evitar problemas de fuso horário do objeto Date.
 * @param {string} dateString - Data no formato YYYY-MM-DD.
 * @returns {string} Data formatada.
 */
function formatDate(dateString) {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}

// ---
// LÓGICA DE NEGÓCIO
// ---

/**
 * Calcula o saldo total
 */
function updateBalance() {
    const total = transactions.reduce((acc, transaction) => {
        if (transaction.type === 'income') {
            return acc + transaction.amount;
        } else {
            return acc - transaction.amount;
        }
    }, 0);

    TOTAL_BALANCE_ELEMENT.textContent = formatCurrency(total);
}

// ---
// MANIPULAÇÃO DO DOM
// ---

/**
 * Renderiza a lista de transações na tela.
 */
function renderList() {
    // Limpa a lista atual
    LIST_ELEMENT.innerHTML = '';

    let processedList = transactions.filter(t => 
        t.description.toLowerCase()
    );

    // Verifica se está vazio
    if (processedList.length === 0) {
        EMPTY_STATE_MSG.classList.remove('hidden');
    } else {
        EMPTY_STATE_MSG.classList.add('hidden');
    }

    // Cria os elementos HTML
    processedList.forEach(transaction => {
        const li = document.createElement('li');
        
        // Adiciona classes para estilo (income/expense)
        li.classList.add('transaction-item', transaction.type);
        
        const symbol = transaction.type === 'expense' ? '- ' : '+ ';

        li.innerHTML = `
            <div class="info">
                <strong>${transaction.description}</strong>
                <span>${formatDate(transaction.date)}</span>
            </div>
            <div class="amount">
                ${symbol}${formatCurrency(transaction.amount)}
            </div>
        `;

        LIST_ELEMENT.appendChild(li);
    });

    updateBalance();
}

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

// ---
// INICIALIZAÇÃO
// ---
function init() {
    applyTheme();
    renderList();
}

// Inicia a aplicação
init();
