import { mockData } from './mock/transactions.js';

// ---
// 1. ESTADO GLOBAL DA APLICAÇÃO
// ---
let transactions = [...mockData];
let currentTheme = localStorage.getItem('theme') || 'light';

// ---
// 2. SELETORES DO DOM (Constantes - Padrão UPPER_SNAKE_CASE)
// ---
const THEME_SWITCHER_BTN = document.getElementById('theme-switcher');
const BODY_ELEMENT = document.body;

const FORM_ELEMENT = document.getElementById('transaction-form');
const INPUT_DESC = document.getElementById('description');
const INPUT_AMOUNT = document.getElementById('amount');
const INPUT_DATE = document.getElementById('date');
const INPUT_TYPE = document.getElementById('type');

const LIST_ELEMENT = document.getElementById('transactions-list');
const TOTAL_BALANCE_ELEMENT = document.getElementById('total-balance');
const EMPTY_STATE_MSG = document.getElementById('empty-state');

const FILTER_INPUT = document.getElementById('search-input');
const SORT_SELECT = document.getElementById('sort-select');

const ERROR_FIELDS = {
    description: document.getElementById('error-description'),
    amount: document.getElementById('error-amount'),
    date: document.getElementById('error-date'),
    type: document.getElementById('error-type'),
};

// ---
// 3. FUNÇÕES UTILITÁRIAS (Formatadores)
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

/**
 * Gera um ID único simples (para novas transações).
 * @returns {number} Timestamp atual.
 */
function generateID() {
    return Date.now();
}

// ---
// 4. LÓGICA DE NEGÓCIO
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

/**
 * Aplica filtros e ordenação na lista de transações.
 * @returns {Array} Array filtrado e ordenado.
 */
function getProcessedTransactions() {
    // 1. Filtrar por texto
    const filterTerm = FILTER_INPUT.value.toLowerCase();
    let filtered = transactions.filter(t => 
        t.description.toLowerCase().includes(filterTerm)
    );

    // 2. Ordenar
    const sortType = SORT_SELECT.value;
    filtered.sort((a, b) => {
        if (sortType === 'date-desc') return new Date(b.date) - new Date(a.date);
        if (sortType === 'date-asc') return new Date(a.date) - new Date(b.date);
        if (sortType === 'amount-desc') return b.amount - a.amount;
        if (sortType === 'amount-asc') return a.amount - b.amount;
        return 0;
    });

    return filtered;
}

/**
 * Limpa mensagens de erro do formulário.
 */
function clearErrors() {
    Object.values(ERROR_FIELDS).forEach(span => span.textContent = '');
    [INPUT_DESC, INPUT_AMOUNT, INPUT_DATE, INPUT_TYPE].forEach(input => input.style.borderColor = '');
}

/**
 * Valida o formulário.
 * @returns {boolean} True se válido, False se houver erro.
 */
function validateForm(data) {
    let isValid = true;
    clearErrors();

    if (!data.description.trim()) {
        ERROR_FIELDS.description.textContent = 'Descrição é obrigatória.';
        isValid = false;
    }

    if (!data.amount || data.amount <= 0) {
        ERROR_FIELDS.amount.textContent = 'Valor deve ser maior que zero.';
        isValid = false;
    }

    if (!data.date) {
        ERROR_FIELDS.date.textContent = 'Data é obrigatória.';
        isValid = false;
    }

    if (!data.type) {
        ERROR_FIELDS.type.textContent = 'Selecione um tipo.';
        isValid = false;
    }

    return isValid;
}

// ---
// 5. MANIPULAÇÃO DO DOM
// ---

/**
 * Renderiza a lista de transações na tela.
 */
function renderList() {
    // Limpa a lista atual
    LIST_ELEMENT.innerHTML = '';

    const processedList = getProcessedTransactions();

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
        
        // Determina o sinal (+ ou -) para exibição
        const symbol = transaction.type === 'expense' ? '- ' : '+ ';

        li.innerHTML = `
            <div class="info">
                <strong>${transaction.description}</strong>
                <span>${formatDate(transaction.date)}</span>
            </div>
            <div class="amount">
                ${symbol}${formatCurrency(transaction.amount)}
                <button class="delete-btn" data-id="${transaction.id}" aria-label="Excluir transação">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
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
// 6. EVENT LISTENERS
// ---

// Adicionar Transação
FORM_ELEMENT.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = {
        description: INPUT_DESC.value,
        amount: parseFloat(INPUT_AMOUNT.value),
        date: INPUT_DATE.value,
        type: INPUT_TYPE.value
    };

    if (validateForm(formData)) {
        const newTransaction = {
            id: generateID(),
            ...formData
        };

        transactions.push(newTransaction);
        
        FORM_ELEMENT.reset();
        renderList();
        
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }
});

// Filtro e Ordenação
FILTER_INPUT.addEventListener('input', renderList);
SORT_SELECT.addEventListener('change', renderList);

// Remover Transação
LIST_ELEMENT.addEventListener('click', (event) => {
    const btn = event.target.closest('.delete-btn');
    
    if (btn) {
        const idToDelete = Number(btn.dataset.id);
        const confirmDelete = confirm('Deseja realmente excluir esta transação?');

        if (confirmDelete) {
            transactions = transactions.filter(t => t.id !== idToDelete);
            renderList();
        }
    }
});

/**
 * Lida com o clique no botão de trocar o tema (Light/Dark).
 */
THEME_SWITCHER_BTN.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme();
});

// ---
// 7. INICIALIZAÇÃO
// ---
function init() {
    applyTheme();
    renderList();
}

// Inicia a aplicação
init();
