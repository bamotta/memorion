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
var timerEnabled = false;
var timerInterval;
var secondsElapsed = 0;
var timerStarted = false;
var isFlashMode = false;

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
        ["h1","CONFIGURACIÓN"],
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
    clearInterval(timerInterval);
    timerInterval = null;
    timerStarted = false;
    secondsElapsed = 0;
    location.reload();
}

//muestra la pantalla de juego 
function startGame() {
    //aleatorio
    if (gameTheme === 'aleatorio') {
        const themes = ["comida", "deportes", "banderas", "scooby-doo"];
        gameTheme = themes[Math.floor(Math.random() * themes.length)];
    }

    movesCounter = 0;

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

    if (timerEnabled) {
        const timerDiv = document.createElement('div');
        timerDiv.id = 'timer-container';
        timerDiv.textContent = 'Tiempo: 0:00';
        element.appendChild(timerDiv);
    }
    resetTimer();

    const boardDiv = document.createElement('div');
    boardDiv.id = 'game-board';
    element.appendChild(boardDiv);

    const countDiv = document.createElement('div');
    countDiv.id = 'moves-counter';
    countDiv.textContent = 'Movimientos: 0';
    element.appendChild(countDiv);

    //Activar modo Flash
    isFlashMode = gameMode === "Flash";

    createGameBoard(); 
}

//crea el tablero con las opciones que hemos recogido anteriormente
function createGameBoard() {
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = "";

    let totalCards = rows*cols;

     // Cargar imágenes según el tema seleccionado
     const themePath = `images/${gameTheme}/`;
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
                button.textContent = "?";

                button.addEventListener('click', function() {
                    handleCardClick(this);
                });

                td.appendChild(button);
                tr.appendChild(td);

        }

        table.appendChild(tr);

    }

    gameBoard.appendChild(table);
    
    //mostrar todas las cartas durante 5s
    if (isFlashMode) {
        const allCards = document.querySelectorAll(".card");
        allCards.forEach(card => {
            card.classList.add("flipped");
            card.innerHTML = `<img src="${card.dataset.image}" alt="Imagen de tarjeta" class="card-front">`;
        });

        setTimeout(() => {
            allCards.forEach(card => {
                card.classList.remove("flipped");
                card.innerHTML = "?";
            });
        }, 5000); // 5 segundos
    }

}

//funcion para manejar lo que hace una carta al presionarla
function handleCardClick(card) {

    if(!timerStarted && timerEnabled){
        startTimer();
        timerStarted = true;
    }

    if (lockBoard || card === firstCard || card.classList.contains('flipped')) {
        return; // Evita que se seleccionen más cartas o la misma carta dos veces
    }

    if (!firstCard) {
        // Si no hay una carta seleccionada, almacena la primera carta
        firstCard = card;

        //Para que quede en naraja y ver cual he seleccionado.
        if (isFlashMode) card.classList.add("selected");

        // En modo normal, girar la carta inmediatamente y verificar
        if(!isFlashMode){
            card.classList.add("flipped");
            card.innerHTML = `<img src="${card.getAttribute("data-image")}" alt="Imagen de tarjeta" class="card-front">`;
        }

    } else {
        // Si ya hay una carta seleccionada, almacena la segunda carta
        secondCard = card;
        lockBoard = true;
        checkForMatch();
        incrementMoves(); 

        if (isFlashMode) {
            card.classList.add("selected");
            // En modo Flash, verificar si coinciden antes de girarlas
            checkForMatchFlashMode();
        } else {
            // En modo normal, girar la carta inmediatamente y verificar
            card.classList.add("flipped");
            card.innerHTML = `<img src="${card.getAttribute("data-image")}" alt="Imagen de tarjeta" class="card-front">`;
            checkForMatch();
        }
    }
}

//funcion que comprueba si dos cartas son iguales
function checkForMatch() {
    const isMatch = firstCard.getAttribute('data-image') === secondCard.getAttribute('data-image');

    if (isMatch) {
        firstCard.classList.add('match');
        secondCard.classList.add('match');

        const aciertoSound = document.getElementById("acierto-sound");
        if (aciertoSound) {
            aciertoSound.currentTime = 0;
            aciertoSound.play();
        }

        setTimeout(() => {

            firstCard.classList.remove('match');
            secondCard.classList.remove('match');

            firstCard.disabled = true;
            secondCard.disabled = true;

            resetBoard();
            checkIfGameFinished();
        }, 800);

    } else {
        // Si no coinciden, las volteamos nuevamente después de un breve retraso
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.innerHTML = "?"; 
            secondCard.innerHTML = "?"; 
            resetBoard();
        }, 1000);
    }
}

//funcion que comprueba si dos cartas son iguales en modo Flash
function checkForMatchFlashMode() {
    const isMatch = firstCard.getAttribute("data-image") === secondCard.getAttribute("data-image");

    if (isMatch) {
        // Si las cartas coinciden, girarlas y deshabilitarlas
        firstCard.classList.add("flipped");
        secondCard.classList.add("flipped");
        firstCard.classList.remove("selected");
        secondCard.classList.remove("selected");

        const aciertoSound = document.getElementById("acierto-sound");
        if (aciertoSound) {
            aciertoSound.currentTime = 0; // Reinicia el sonido si ya se había reproducido
            aciertoSound.play();
        }

        firstCard.innerHTML = `<img src="${firstCard.getAttribute("data-image")}" alt="Imagen de tarjeta" class="card-front">`;
        secondCard.innerHTML = `<img src="${secondCard.getAttribute("data-image")}" alt="Imagen de tarjeta" class="card-front">`;

        firstCard.disabled = true;
        secondCard.disabled = true;
        resetBoard();
        checkIfGameFinished();
    } else {
        // Eliminar clase 'error' primero si ya estaba
        firstCard.classList.remove("error");
        secondCard.classList.remove("error");

        // Forzar reflow para reiniciar la animación
        void firstCard.offsetWidth;
        void secondCard.offsetWidth;

        // Agregar clase 'error' para disparar animación
        firstCard.classList.add("error");
        secondCard.classList.add("error");

        firstCard.classList.remove("selected");
        secondCard.classList.remove("selected");

        setTimeout(() => {
            firstCard.classList.remove("error");
            secondCard.classList.remove("error");

            resetBoard();
        }, 1000); // 1 segundo de retraso para mostrar el error
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
        }, 500);
    }
}


//funcion que termina el juego y muestra el resumen
function endGame() {

    saveGameResult(username, gameMode, gameLevel, movesCounter, secondsElapsed);

    const element = document.getElementById("main-content");
    element.style.display = "block";
    element.innerHTML="";

    const elements = [
        ["h1","Juego terminado"],
        ["h2",` ${username}`],
        ["p", `Movimientos realizados: ${movesCounter}`],
    ]

    if(timerEnabled){
        const minutes =Math.floor(secondsElapsed / 60);
        const seconds = secondsElapsed % 60;
        const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        elements.push(["p", `Tiempo total: ${formattedTime}`]);
        stopTimer(); 
    }

    elements.push(["p", "¡Gracias por jugar!"]);

    for(const [tag, text] of elements){
        const ele = document.createElement(tag);
        ele.textContent = text;
        element.appendChild(ele);
    }

   
    const rest = document.createElement('button');
    rest.textContent = "Volver";
    rest.addEventListener('click', rel);

    element.appendChild(rest);

    const share = document.createElement('button');
    share.textContent = "Compartir en Facebook";
    share.addEventListener('click', () =>{
        shareOnFacebook(username, gameLevel, movesCounter, secondsElapsed);
    });

    element.appendChild(share);

    const rank = document.createElement('button');
    rank.textContent = "Ranking";
    rank.addEventListener('click', showRankings);

    element.appendChild(rank);

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

//funcion que inicia el reloj
function startTimer() {
    if(timerStarted) return;

    timerInterval = setInterval(() => {
        secondsElapsed++;
        const minutes = Math.floor(secondsElapsed / 60);
        const seconds = secondsElapsed % 60;
        const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        const timerDiv = document.getElementById('timer-container');
        if (timerDiv) {
            timerDiv.textContent = `Tiempo: ${formattedTime}`;
        }
    }, 1000);

    timerStarted = true;

}

//funcion que para el reloj
function stopTimer() {
    clearInterval(timerInterval);
}

//funcion que resetea el reloj
function resetTimer() {
    stopTimer();
    secondsElapsed = 0;
    timerStarted = false;
    const timerDiv = document.getElementById('timer-container');
    if (timerDiv) {
        timerDiv.textContent = 'Tiempo: 0:00';
    }
}

//funcion para dar formato al tiempo
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

// Función para guardar los datos de la partida en localStorage
function saveGameResult(username, gameMode, gameLevel, moves, time) {
    const gameResults = JSON.parse(localStorage.getItem('gameResults')) || [];
    gameResults.push({ username, gameMode, gameLevel, moves, time });
    localStorage.setItem('gameResults', JSON.stringify(gameResults));
}

//funcion para manejar los rankings
function showRankings() {
    const gameResults = JSON.parse(localStorage.getItem('gameResults')) || [];
    if (gameResults.length === 0) {
        alert("No hay partidas registradas.");
        return;
    }

    // Crear la pantalla de rankings
    const rankingsDiv = document.createElement('div');
    rankingsDiv.id = 'rankings-container';
    
    const title = document.createElement('h2');
    title.textContent = "Rankings";
    rankingsDiv.appendChild(title);

    const buttonsDiv = document.createElement("div");
    buttonsDiv.id = "rankings-buttons";

    const movesButton = document.createElement('button');
    movesButton.textContent = "Ordenar por Movimientos";
    movesButton.id = "sort-moves";

    const timeButton = document.createElement('button');
    timeButton.textContent = "Ordenar por Tiempo";
    timeButton.id = "sort-time";

    const modeButton = document.createElement('button');
    modeButton.textContent = "Ordenar por Modo";
    modeButton.id = "sort-mode";

    buttonsDiv.append(movesButton, timeButton, modeButton);

    const table = document.createElement('table');
    table.id = 'rankings-table';

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    ["Usuario", "Modo", "Nivel", "Movimientos", "Tiempo"].forEach(text => {
        const th = document.createElement("th");
        th.textContent = text;
        headerRow.appendChild(th);
        th.id = 'th-table-rankings';
    });
    thead.appendChild(headerRow);

    const tbody = document.createElement("tbody");

    table.append(thead, tbody);

    const closeButton = document.createElement('button');
    closeButton.textContent = "Cerrar";
    closeButton.id = "close-rankings";

    const clearButton = document.createElement('button');
    clearButton.textContent = "Limpiar Ranking";
    clearButton.id = "clear-rankings";


    rankingsDiv.append(title, buttonsDiv, table, closeButton, clearButton);

    document.body.appendChild(rankingsDiv);

    clearButton.addEventListener('click', () => {
        if (confirm("¿Estás seguro de que deseas eliminar todos los rankings?")) {
            localStorage.removeItem('gameResults');
            rankingsDiv.remove(); // Cierra la ventana de rankings
            alert("Ranking eliminado.");
        }
    });

    // Función para actualizar la tabla según el criterio seleccionado
    function updateRankingsTable(sortBy) {
        if (sortBy === "movimientos") {
            gameResults.sort((a, b) => a.moves - b.moves || a.time - b.time && a.gameLevel.localeCompare(b.gameLevel));
        } else if (sortBy === "tiempo") {
            gameResults.sort((a, b) => {
                // Colocar partidas sin tiempo al final
                if (a.time === 0) return 1;
                if (b.time === 0) return -1;
                return a.time - b.time || a.moves - b.moves;
            });
        } else if (sortBy === "modo") {
            gameResults.sort((a, b) => a.gameMode.localeCompare(b.gameMode) || a.moves - b.moves || a.time - b.time && a.gameLevel.localeCompare(b.gameLevel));
        }

        const tbody = rankingsDiv.querySelector('#rankings-table tbody');
        tbody.innerHTML = gameResults.map(result => `
            <tr  id="tr-table-rankings">
                <td>${result.username}</td>
                <td>${result.gameMode}</td>
                <td>${result.gameLevel}</td>
                <td>${result.moves}</td>
                <td>${result.time === 0 ? "" : formatTime(result.time)}</td>
            </tr>
        `).join('');
    }

    // Inicializar la tabla con un criterio por defecto
    updateRankingsTable("movimientos");

    // Añadir eventos a los botones
    document.getElementById('sort-moves').addEventListener('click', () => updateRankingsTable("movimientos"));
    document.getElementById('sort-time').addEventListener('click', () => updateRankingsTable("tiempo"));
    document.getElementById('sort-mode').addEventListener('click', () => updateRankingsTable("modo"));

    // Cerrar el ranking
    document.getElementById('close-rankings').addEventListener('click', () => {
        rankingsDiv.remove();
    });
}

//funcion para compartir en Facebook
function shareOnFacebook(username, gameLevel, moves, time) {
    const timeFormatted = formatTime(time);
    let shareText = `He jugado al juego de memoria (${gameLevel}) con ${moves} movimientos`;

    if (timerEnabled) {
        const timeFormatted = formatTime(time);
        shareText += ` en ${timeFormatted}`;
    }

    shareText += `. ¿Puedes superarme?`;
    const urlToShare = "https://bamotta.github.io/memorion/";

    navigator.clipboard.writeText(shareText).then(() => {
        alert("Texto copiado al portapapeles. Pégalo en tu publicación de Facebook.");
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}&quote=${encodeURIComponent(shareText)}`, "_blank")
    });
}

// Función para mostrar el easter egg
function showEasterEgg() {
    const title = document.getElementById("memorion-title");
    title.style.transition = "transform 0.5s";
    title.style.transform = "rotateY(360deg)";

    setTimeout(() => {
        alert("¿QUÉ LE DIJO UNA CARTA A SU PAREJA? \n¡Por fin te encuentro! Pensé que ibas a seguir dandome la espalda toda la vida.");
        title.style.transform = "none"; // Restablecer la rotación
    }, 500); // Mostrar el mensaje después de la animación
}

// Añadir el evento al título
document.addEventListener("DOMContentLoaded", () => {
    const title = document.getElementById("memorion-title");
    if (title) {
        title.addEventListener("click", showEasterEgg);
    }
});