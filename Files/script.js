document.addEventListener("DOMContentLoaded", function () {
  const attributes = ["ataque", "defesa", "ps"];

  let lastSelectedElement = {
    ataque: null,
    defesa: null,
    ps: null,
  };

  attributes.forEach((attribute) => {
    for (let i = 1; i <= 15; i++) {
      const element = document.querySelector(`.quadrado-${attribute}-${i}`);
      element.addEventListener("click", () => {
        updateSelected(attribute, i);
        clearResultMessage();
      });

      element.addEventListener("mouseenter", () => {
        highlightSquares(attribute, i);
      });

      element.addEventListener("mouseleave", () => {
        removeHighlight(attribute, i);
      });

      element.addEventListener("dblclick", () => {
        clearAttribute(attribute);
      });
    }
  });

  const clearAttribute = (attribute) => {
    const selectedSquares = document.querySelectorAll(
      `.quadrados-${attribute} .selected`
    );
    selectedSquares.forEach((square) => {
      square.classList.remove("selected");
    });

    const statElement = document.querySelector(`.texto-stat-${attribute}`);
    statElement.textContent = "0";
  };

  const updateSelected = (attribute, value) => {
    for (let i = 1; i <= 15; i++) {
      const element = document.querySelector(`.quadrado-${attribute}-${i}`);
      element.classList.remove("selected");
    }

    for (let i = 1; i <= value; i++) {
      const element = document.querySelector(`.quadrado-${attribute}-${i}`);
      element.classList.add("selected");
    }

    const statElement = document.querySelector(`.texto-stat-${attribute}`);
    statElement.textContent = value;

    if (lastSelectedElement[attribute]) {
      lastSelectedElement[attribute].classList.remove("last-selected");
    }
    lastSelectedElement[attribute] = document.querySelector(
      `.quadrado-${attribute}-${value}`
    );
    lastSelectedElement[attribute].classList.add("last-selected");
  };

  const clearButton = document.querySelector(".botao-limpar button");
  clearButton.addEventListener("click", () => {
    clearSelection();
  });

  const clearSelection = () => {
    const selectedSquares = document.querySelectorAll(".selected");
    selectedSquares.forEach((square) => {
      square.classList.remove("selected");
    });

    attributes.forEach((attribute) => {
      const statElement = document.querySelector(`.texto-stat-${attribute}`);
      statElement.textContent = "0";
    });

    clearResultMessage();
  };

  const calculateButton = document.querySelector(".botao-calcular button");
  calculateButton.addEventListener("click", () => {
    calculateIV();
  });

  const calculateIV = () => {
    const ataque = parseInt(
      document.querySelector(".texto-stat-ataque").textContent
    );
    const defesa = parseInt(
      document.querySelector(".texto-stat-defesa").textContent
    );
    const ps = parseInt(document.querySelector(".texto-stat-ps").textContent);

    const resultado = Math.round((ataque + defesa + ps) * 2.22);

    const resultadoTexto = document.querySelector(".resultado-texto-mensagem");
    resultadoTexto.innerHTML = `O IV do seu Pokémon é <span class="resultado-porcentagem">${resultado}%</span>`;
    resultadoTexto.style.color = "black";
    resultadoTexto.style.fontStyle = "normal";
  };

  const clearResultMessage = () => {
    const resultadoTexto = document.querySelector(".resultado-texto-mensagem");
    resultadoTexto.textContent = "O IV do seu Pokémon aparecerá aqui!";
    resultadoTexto.style.color = "#d0d0d0";
  };
});