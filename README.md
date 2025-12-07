# Controle Financeiro

Uma aplicação web de controle de despesas construída com **HTML, CSS e JavaScript puro**, sem frameworks ou bibliotecas externas.

## Visão Geral

Esta é uma solução para o **Desafio de Estágio Frontend - IUPI**. A aplicação permite gerenciar transações financeiras com funcionalidades de adição, filtragem, ordenação e tema claro/escuro.

## Responsividade

- **Desktop (≥768px)** - Layout em 2 colunas (formulário + lista)
- **Mobile (<768px)** - Layout em coluna única

## Tecnologias

- HTML5 semântico
- CSS3 com variáveis customizadas (CSS Custom Properties)
- JavaScript ES6+ (módulos, arrow functions, template literals)

## Estrutura do Projeto

```
fabio-pascoal-desafio-frontend/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── script.js
│   └── mock/
│       └── transactions.js
└── assets/
    └── lupa.svg
```

## Como Usar

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/fabio-pascoal-desafio-frontend.git
cd fabio-pascoal-desafio-frontend
```

2. Abra o projeto no VS Code e use a extensão **Live Server**:
   - Instale a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) (por Ritwick Dey)
   - Clique com botão direito em `index.html` e selecione **"Open with Live Server"**
   - A aplicação abrirá automaticamente no navegador

## Principais Funções

| Função | Descrição |
|--------|-----------|
| `formatCurrency(value)` | Formata número para BRL |
| `formatDate(dateString)` | Converte YYYY-MM-DD para DD/MM/YYYY |
| `validateForm(data)` | Valida campos do formulário |
| `renderList()` | Renderiza lista com filtros/ordenação |
| `getProcessedTransactions()` | Aplica filtro e ordenação |
| `applyTheme()` | Aplica tema e persiste no localStorage |

## Exemplo de Uso

### Adicionar Transação
1. Preencha Descrição, Valor, Data e Tipo
2. Clique em "Adicionar Transação"
3. A transação aparecerá na lista automaticamente

### Filtrar
- Use o campo "Buscar por descrição..." para filtrar em tempo real

### Ordenar
- Selecione uma opção no dropdown "Ordenar por"

### Mudar Tema
- Clique no botão "Alternar Tema" no header

## Licença

Este projeto é um desafio técnico e está disponível para fins educacionais.

---

**Desenvolvido por:** Fábio Pascoal  
**Challenge:** Desafio de Estágio Frontend - IUPI