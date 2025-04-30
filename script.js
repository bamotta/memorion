let username = "";
let gameMode = "";
let gameLevel = "";
let gameTheme = "";
let boardType = "";
let rows = 0;
let cols = 0;

function submitConfiguration() {
    const usernameInput = document.getElementById("username").value.trim();
    const modeInput = document.querySelector('input[name="game-mode"]:checked');
    const boardTypeInput = document.querySelector('input[name="board-type"]:checked');    const themeInput = document.getElementById("game-theme").value;
    const timerInput = document.getElementById("timer").checked;

    if (!usernameInput || !modeInput || !boardTypeInput || !themeInput) {
        alert("Por favor, completa todas las opciones.");
        return;
    }

    username = usernameInput;
    gameMode = modeInput.value;
    gameTheme = themeInput;
    timerEnabled = timerInput;
    boardType = boardTypeInput;

    
    if (boardTypeInput.value === "default") {
        const levelInput = document.querySelector('input[name="game-level"]:checked');
        if (!levelInput) {
            alert("Por favor, selecciona un nivel de juego.");
            return;
        }
        gameLevel = levelInput.value;
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

    document.getElementById("config-form").style.display = "none";
    document.getElementById("main-content").style.display = "block";
    document.getElementById("main-content").innerHTML = `
        <h1>Configuración completada</h1>
        <p>Nombre de usuario: ${username}</p>
        <p>Modo de juego: ${gameMode}</p>
        <p>Tipo de tablero: ${gameLevel}</p>
        <p>Tema: ${gameTheme}</p>
        <p>Temporizador: ${timerEnabled ? "Activado" : "Desactivado"}</p>
        <button onclick="startGame()">Iniciar Juego</button>
        <button onclick="rel()">Volver</button>
    `;
 }


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

function rel(){
    location.reload();
}

function startGame() {
    document.getElementById("main-content").innerHTML = `
        <h1>Bienvenido, ${username}</h1>
        <h2>¡Juego en progreso!</h2>
        <div id="timer-container">Tiempo: 2:00</div> 
        <div id="game-board"></div> 
        <div id="points">Puntos: 0</div>
        <button onclick="endGame()">Finalizar Juego</button>
    `;

    createGameBoard(); 
}

function createGameBoard() {
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = "";

    if (boardType === "default") {
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
    }

    if (boardType === "custom") {
        if (!rows || !cols) {
            alert("Dimensiones del tablero personalizadas no definidas.");
            return;
        }
    }

    let tableHTML = "<table>";
    for (let i = 0; i < rows; i++) {
        tableHTML += "<tr>";
        for (let j = 0; j < cols; j++) {
            tableHTML += `
                <td>
                    <button class="card" onclick="handleCardClick(this)">🃏</button>
                </td>
            `;
        }
        tableHTML += "</tr>";
    }
    tableHTML += "</table>";
    gameBoard.innerHTML = tableHTML;
}

function handleCardClick(card) {
    card.innerText = "✔"; 
    card.disabled = true; 
}

function endGame() {
    document.getElementById("main-content").style.display = "none";
    document.getElementById("summary").style.display = "block";
    document.getElementById("summary").innerHTML = `
        <h1>Resumen del Juego</h1>
        <p>Nombre de usuario: ${username}</p>
        <p>Modo de juego: ${gameMode}</p>
        <p>Nivel de juego: ${gameLevel}</p>
        <p>Tema: ${gameTheme}</p>
        <p>Temporizador: ${timerEnabled ? "Activado" : "Desactivado"}</p>
        <p>¡Gracias por jugar!</p>
        <button onclick="rel()">Reiniciar</reiniciar>
    `;

    document.getElementById("summary").scrollIntoView({ behavior: "smooth" });


}
