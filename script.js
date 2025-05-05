var username = "";
var gameMode = "";
var gameLevel = "";
var gameTheme = "";
var boardType = "";
var rows = 0;
var cols = 0;
var customRows = 0;
var customCols = 0;
var firstCard = null;
var secondCard = null;
var lockBoard = false;
var movesCounter = 0

//funcion que se encarga de gestionar la configuración del tablero.
function submitConfiguration() {
    const usernameInput = document.getElementById("username").value.trim();
    const modeInput = document.querySelector('input[name="game-mode"]:checked');
    const boardTypeInput = document.querySelector('input[name="board-type"]:checked');   
    const themeInput = document.getElementById("game-theme").value;
    const timerInput = document.getElementById("timer").checked;

    //comprueba que esten todas las opciones seleccionadas
    if (!usernameInput || !modeInput || !boardTypeInput || !themeInput) {
        alert("Por favor, completa todas las opciones.");
        return;
    }

    //asignar valores a las variables
    username = usernameInput;
    gameMode = modeInput.value;
    gameTheme = themeInput;
    timerEnabled = timerInput;
    boardType = boardTypeInput.value;

    //comprobamos si el tablero es preseleccionado o si es customizado
    if (boardTypeInput.value === "default") {
        const levelInput = document.querySelector('input[name="game-level"]:checked');
        if (!levelInput) {
            alert("Por favor, selecciona un nivel de juego.");
            return;
        }
        gameLevel = levelInput.value;

        switch (gameLevel) {
            case "Fácil":
                rows = 4;
                cols = 4;
                break;
            case "Medio":
                rows = 4;
                cols = 5;
                break;
            case "Difícil":
                rows = 6;
                cols = 6;
                break;
            default:
                alert("Nivel de juego no válido");
                return;
        }

    } else if (boardTypeInput.value === "custom") {
        rows = parseInt(document.getElementById("rows").value);
        cols = parseInt(document.getElementById("cols").value);
        const totalCards = rows * cols;

        if (isNaN(rows) || isNaN(cols) || rows <= 0 || cols <= 0) {
            alert("Por favor, introduce valores válidos para las filas y columnas.");
            return;
        }

        if (rows > 6 || cols > 6) {
            alert("El número de filas y columnas no puede ser mayor que 6.");
            return;
        }

        if (totalCards % 2 !== 0 || totalCards > 36) {
            alert("El número total de casillas debe ser par y menor o igual a 36.");
            return;
        }

        customRows = rows; 
        customCols = cols;
        gameLevel = `Personalizado (${rows}x${cols})`;
    }


    document.getElementById("config-form").remove();

    const element = document.getElementById("main-content");
    element.style.display = "block";
    element.innerHTML="";

    const elements = [
        ["h1","Configuración completada"],
        ["p", `Nombre de usuario: ${username}`],
        ["p", `Modo de juego: ${gameMode}`],
        ["p", `Tipo de tablero ${gameLevel}`],
        ["p", `Tema: ${gameTheme}`],
        ["p", `Temporizador: ${timerEnabled ? "Activado" : "Desactivado"}`],
    ]

    for(const [tag, text] of elements){
        const ele = document.createElement(tag);
        ele.textContent = text;
        element.appendChild(ele);
    }

    const start = document.createElement("button");
    const ret = document.createElement("button");

    start.textContent = "Iniciar Juego";
    ret.textContent = "Volver";

    start.addEventListener('click', startGame);
    ret.addEventListener('click', rel);

    element.appendChild(start);
    element.appendChild(ret);

 }
//recoge las opciones de dimensiones del tablero
function toggleBoardOptions() {
    boardType = document.querySelector('input[name="board-type"]:checked').value;
    const defaultOptions = document.getElementById("default-options");
    const customOptions = document.getElementById("custom-options");
    const customOptionsCols = document.getElementById("custom-options-cols");

    if (boardType === "default") {
        defaultOptions.style.display = "table-row";
        customOptions.style.display = "none";
        customOptionsCols.style.display = "none";
    } else {
        defaultOptions.style.display = "none";
        customOptions.style.display = "table-row";
        customOptionsCols.style.display = "table-row";
    }
}

//funcion para regresar a la pantalla principal
function rel(){
    location.reload();
}

//muestra la pantalla de juego 
function startGame() {
    //aleatorio
    if (gameTheme === 'aleatorio') {
        const themes = ["comida", "deportes", "banderas"];
        gameTheme = themes[Math.floor(Math.random() * themes.length)];
    }

    const element = document.getElementById("main-content");
    element.innerHTML="";

    const elements = [
        ["h1",`Bienvenido, ${username}`],
        ["h2", "¡Juego en progreso!"],
    ]

    for(const [tag, text] of elements){
        const ele = document.createElement(tag);
        ele.textContent = text;
        element.appendChild(ele);
    }

    const timerDiv = document.createElement('div');
    timerDiv.id = 'timer-container';
    timerDiv.textContent = 'Tiempo: 0:00';
    element.appendChild(timerDiv);

    const boardDiv = document.createElement('div');
    boardDiv.id = 'game-board';
    element.appendChild(boardDiv);

    const countDiv = document.createElement('div');
    countDiv.id = 'moves-counter';
    countDiv.textContent = 'Movimientos: 0';
    element.appendChild(countDiv);

    const end = document.createElement("button");
    end.textContent = "Finalizar Juego";
    end.addEventListener('click', endGame);
    element.appendChild(end);

    createGameBoard(); 
}

//crea el tablero con las opciones que hemos recogido anteriormente
function createGameBoard() {
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = "";

    let totalCards = rows*cols;

     // Cargar imágenes según el tema seleccionado
     const themePath = `images/${gameTheme}/`; // Ruta de la carpeta del tema
     const availableImages = Array.from({ length: 18 }, (_, i) => `${themePath}image${i + 1}.png`);
 
     console.log("Rutas de imágenes disponibles:", availableImages);
 
     // Seleccionar imágenes necesarias y duplicarlas para formar pares
     const selectedImages = availableImages.slice(0, totalCards / 2);
     const cardImages = [...selectedImages, ...selectedImages]; // Duplicar imágenes
     const shuffledImages = cardImages.sort(() => Math.random() - 0.5); // Mezclar imágenes
 

    const table = document.createElement("table");

    for (let i = 0; i < rows; i++) {
        const tr = document.createElement("tr");

            for (let j = 0; j < cols; j++) {
                const td = document.createElement("td")
                const image = shuffledImages.pop(); // Obtener una imagen aleatoria

                const button = document.createElement("button");
                const cardClass = gameTheme === "banderas" ? "card banderas" : "card"; // Añadir la clase 'banderas' si el tema es banderas
                button.className = cardClass;
                button.dataset.image = image;
                button.textContent = "❓";

                button.addEventListener('click', function() {
                    handleCardClick(this);
                });

                td.appendChild(button);
                tr.appendChild(td);

        }

        table.appendChild(tr);

    }

    gameBoard.appendChild(table);

}

//funcion para manejar lo que hace una carta al presionarla
function handleCardClick(card) {
    if (lockBoard || card === firstCard || card.classList.contains('flipped')) {
        return; // Evita que se seleccionen más cartas o la misma carta dos veces
    }

    card.classList.add('flipped'); // Voltea la carta
    card.innerHTML = `<img src="${card.getAttribute('data-image')}" alt="Imagen de tarjeta" class="card-front">`; // Mostrar la imagen

    if (!firstCard) {
        // Si no hay una carta seleccionada, almacena la primera carta
        firstCard = card;
    } else {
        // Si ya hay una carta seleccionada, almacena la segunda carta
        secondCard = card;

        // Bloquea el tablero mientras se realiza la comparación
        lockBoard = true;

        // Compara las dos cartas seleccionadas
        checkForMatch();
    }
}

//funcion que comprueba si dos cartas son iguales
function checkForMatch() {
    const isMatch = firstCard.getAttribute('data-image') === secondCard.getAttribute('data-image');

    if (isMatch) {
        // Si las cartas coinciden, las dejamos volteadas
        firstCard.disabled = true;
        secondCard.disabled = true;
        resetBoard();

        // Verificar si todas las cartas están volteadas
        checkIfGameFinished();
    } else {
        // Si no coinciden, las volteamos nuevamente después de un breve retraso
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.innerHTML = "❓"; // Restaurar el contenido original
            secondCard.innerHTML = "❓"; // Restaurar el contenido original
            incrementMoves(); // Incrementar el contador de movimientos
            resetBoard();
        }, 1000); // 1 segundo de retraso para que el jugador vea las cartas
    }
}

//funcion que comprueba si el juego se ha acabado
function checkIfGameFinished() {
    const allCards = document.querySelectorAll('.card');
    const allFlipped = Array.from(allCards).every(card => card.classList.contains('flipped'));

    if (allFlipped) {
        // Si todas las cartas están volteadas, finalizar el juego
        setTimeout(() => {
            endGame();
        }, 500); // Breve retraso antes de finalizar el juego
    }
}


//funcion que termina el juego y muestra el resumen
function endGame() {

    const element = document.getElementById("main-content");
    element.style.display = "block";
    element.innerHTML="";

    const elements = [
        ["h1","Resumen del Juego"],
        ["p", `Nombre de usuario: ${username}`],
        ["p", `Modo de juego: ${gameMode}`],
        ["p", `Tipo de tablero ${gameLevel}`],
        ["p", `Tema: ${gameTheme}`],
        ["p", `Temporizador: ${timerEnabled ? "Activado" : "Desactivado"}`],
        ["p", `Movimientos realizados: ${movesCounter}`],
        ["p", "¡Gracias por jugar!"]
    ]

    for(const [tag, text] of elements){
        const ele = document.createElement(tag);
        ele.textContent = text;
        element.appendChild(ele);
    }

    const rest = document.createElement("button");

    rest.textContent = "Volver";

    rest.addEventListener('click', rel);

    element.appendChild(rest);


}

//funcion que incrementa los movimientos
function incrementMoves() {
    movesCounter++; // Incrementar el contador de movimientos
    document.getElementById('moves-counter').textContent = `Movimientos: ${movesCounter}`; // Actualizar el contador en la interfaz
}

function resetBoard() {
    // Reinicia las variables para permitir nuevas selecciones
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}


