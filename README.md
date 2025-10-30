# Desafio de Estágio Frontend - IUPI

Olá, candidato! Este desafio foi criado para avaliarmos seus conhecimentos fundamentais em HTML, CSS moderno e JavaScript puro.

**Atenção:** O uso de frameworks (Vue, React, Angular) ou bibliotecas (jQuery, Bootstrap) **não é permitido**. Queremos ver seu conhecimento dos fundamentos da web.

## 🎯 O Desafio

Você deve construir uma página de "Controle de Despesas". A página terá um formulário para adicionar transações e uma lista que exibe as transações existentes.

Você receberá um arquivo de mock (`/mock/transactions.js`) com dados iniciais.

### Layout (Responsividade é Chave)

* **Desktop (telas > 768px):** Layout em **duas colunas** (formulário de um lado, lista do outro).
* **Mobile (telas < 768px):** Layout em **coluna única** (formulário em cima, lista embaixo).

---

## ✅ Requisitos Funcionais

### 1. Renderização e Formatação
* Ao carregar, o JavaScript deve ler os dados do `/mock/transactions.js` e renderizar a lista.
* Para cada transação no mock, um item deve ser renderizado na lista.

Os dados do mock devem ser formatados para exibição:
* **Valor (`amount`):** Deve ser formatado como moeda brasileira (ex: `R$ 1.500,00` ou `-R$ 250,50`).
* **Data (`date`):** Deve ser formatada de `YYYY-MM-DD` para `DD/MM/YYYY`.
* **Tipo (`type`):** A lista deve indicar visualmente se a transação é `income` (entrada) ou `expense` (saída). (Ex: uma borda verde para entrada, vermelha para saída).
  
### 2. Formulário e Validação
* O formulário deve conter campos para "Descrição", "Valor", "Tipo" (Entrada/Saída) e "Data".
* Ao submeter, a página **não deve** recarregar.
* **Validação (Obrigatório):**
    * Nenhum campo pode estar vazio.
    * O valor não pode ser zero ou negativo.
    * Mensagens de erro claras devem aparecer abaixo dos campos inválidos.

### 3. Filtro e Ordenação
* **Filtro por Descrição:** Um campo de texto (`<input type="search">`) que filtra pelo campo de descrição em tempo real.
* **Ordenação:** Um `<select>` que permite ordenar a lista por:
    * Data (Mais Recentes / Antigas)
    * Valor (Maior / Menor)

### 4. Tema (Light/Dark)
* Adicione um botão "switch" que alterna o tema da página entre **Light Mode** e **Dark Mode**.
* Você **deve** usar **Variáveis CSS** (CSS Custom Properties).

---

## 💎 Requisitos de Qualidade de Código

Este desafio também avalia *como* você escreve e organiza seu código. Um código limpo é tão importante quanto um código que funciona.

### 1. Padrões de Nomenclatura (Padrão de Variáveis)
Siga as convenções da comunidade para manter o código legível:

* **JavaScript:**
    * `camelCase` para variáveis e funções (ex: `let myTransaction`, `function renderList()`).
    * `UPPER_SNAKE_CASE` para constantes *globais*, especialmente seletores do DOM (ex: `const LIST_ELEMENT = ...`).
* **CSS:**
    * `kebab-case` para classes e IDs (ex: `.transaction-list`, `#theme-switcher`).

### 2. Documentação de Código (Comentários)
Queremos ver como você explica seu próprio código.

* **JSDoc para Funções:** Use o formato JSDoc para documentar suas funções principais (como as de formatação, renderização e ordenação).
* **Exemplo:**
    ```javascript
    /**
     * Formata uma string de data (YYYY-MM-DD) para o padrão brasileiro (DD/MM/YYYY).
     * @param {string} dateString - A data no formato ISO.
     * @returns {string} A data formatada.
     */
    function formatDate(dateString) {
        // ...
    }
    ```
* **Comentários de Lógica:** Se você escrever um bloco de código complexo, adicione um comentário simples (`// ...`) explicando *o porquê* da sua decisão.

---

## ⭐ Requisitos Bônus (Opcional)
* **Saldo Total:** Calcular e exibir o "Saldo Total" (Entradas - Saídas).
* **Botão Excluir:** Adicionar um "X" em cada item da lista para removê-lo.
* **Persistência:** Usar `localStorage` para salvar o tema e as transações.

---

## 📚 Materiais de Aprendizado
* **Introdução ao HTML**
    * [MDN - Introdução ao HTML](https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Structuring_content)
* **Intrudução ao CSS**
    * [MDN - Introdução ao CSS](https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Styling_basics)
* **Instrodução ao JavaScript**
    * [MDN - JavaScript](https://developer.mozilla.org/pt-BR/docs/conflicting/Learn_web_development/Core/Scripting_785964b4c0711553d2bf3130baef052c6d78a03b4ce249eeb9d1ce2be1e3c308)  
* **Playlists do Youtube**
    * [Curso de HTML Completo](https://youtube.com/playlist?list=PL2Fdisxwzt_cajoGVWTx44wM6Ht09QJ3A&si=82wxtbyk9T_f4uHU)
    * [Curso de CSS Completo](https://youtube.com/playlist?list=PL2Fdisxwzt_fqPM6MOwi2zXsbfV1j11kc&si=ku6ZczRpNYLaEx2E)
    * [Curso de JavaScript Completo](https://youtube.com/playlist?list=PL2Fdisxwzt_eMWior34VtbfX8xsCF7qMd&si=K4DSDoqJjG9ISuB0)
* **Aprenda muito rápido**
    * [HTML em 5 minutos](https://www.youtube.com/watch?v=Bi56rN6gmbA)
    * [CSS em 15 minutos](https://youtu.be/BKATrAAWrRo?si=rDaepDumIeHHhATw)
    * [JavaScript em 10 minutos](https://youtu.be/eVzW7ePg_hQ?si=AjY2fJ5CJwwaUJGh)
* **Tema (Light/Dark):**
    * [MDN - Usando Variáveis CSS (Custom Properties)](https://developer.mozilla.org/pt-BR/docs/Web/CSS/Using_CSS_custom_properties)
* **Ordenação (JS):**
    * [MDN - Array.prototype.sort()](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
* **Filtro (JS):**
    * [MDN - Array.prototype.filter()](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
* **Documentação (JS):**
    * [JSDoc - Primeiros Passos (em inglês)](https://jsdoc.app/about-getting-started.html) (O básico de `@param` e `@returns` é o suficiente).
* **Formatação (JS):**
    * [MDN - Intl.NumberFormat (Formatar Moeda)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
    * [MDN - Date.toLocaleDateString (Formatar Data)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString)
* **Validação (HTML/JS):**
    * [MDN - Validação de Formulário Cliente-Side](https://developer.mozilla.org/pt-BR/docs/Learn/Forms/Form_validation)
* **Persistência (Bônus):**
    * [MDN - Window.localStorage](https://developer.mozilla.org/pt-BR/docs/Web/API/Window/localStorage)

## 🚚 Como Entregar
1.  Faça um **Fork** deste repositório.
2.  Crie uma nova branch no seu fork (ex: `meu-nome-desafio`).
3.  Faça seus commits.
4.  Ao finalizar, abra um **Pull Request (PR)** do seu fork de volta para este repositório original.
5.  No corpo do PR, deixe comentários sobre suas decisões, dificuldades e o que você mais gostou.

Boa sorte!
