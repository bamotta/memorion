let username = "";
let gameMode = "";
let gameLevel = "";
let gameTheme = "";
let timerEnabled = false;

function submitConfiguration() {
    const usernameInput = document.getElementById("username").value.trim();
    const modeInput = document.querySelector('input[name="game-mode"]:checked');
    const levelInput = document.querySelector('input[name="game-level"]:checked');
    const themeInput = document.getElementById("game-theme").value;
    const timerInput = document.getElementById("timer").checked;

    if (!usernameInput || !modeInput || !levelInput || !themeInput) {
        alert("Por favor, completa todas las opciones.");
        return;
    }

    username = usernameInput;
    gameMode = modeInput.value;
    gameLevel = levelInput.value;
    gameTheme = themeInput;
    timerEnabled = timerInput;

    document.getElementById("config-form").style.display = "none";
    document.getElementById("main-content").style.display = "block";
    document.getElementById("main-content").innerHTML = `
        <h1>Configuración completada</h1>
        <p>Nombre de usuario: ${username}</p>
        <p>Modo de juego: ${gameMode}</p>
        <p>Nivel de juego: ${gameLevel}</p>
        <p>Tema: ${gameTheme}</p>
        <p>Temporizador: ${timerEnabled ? "Activado" : "Desactivado"}</p>
        <button onclick="startGame()">Iniciar Juego</button>
    `;
}

function startGame() {
    document.getElementById("main-content").innerHTML = `
        <h1>¡Juego en progreso!</h1>
        <p>Disfruta del juego con las opciones seleccionadas.</p>
        <div id="game-board"></div> <!-- Contenedor para la tabla de tarjetas -->
        <button onclick="endGame()">Finalizar Juego</button>
    `;

    createGameBoard(); // Llamar a la función para generar la tabla de tarjetas
}

function createGameBoard() {
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = ""; // Limpiar el contenido previo

    let rows, cols;
    switch (gameLevel) {
        case "Fácil":
            rows = 4;
            cols = 4;
            break;
        case "Medio":
            rows = 4; // 4 filas
            cols = 5; // 5 columnas
            break;
        case "Difícil":
            rows = 6;
            cols = 6;
            break;
        default:
            console.error("Nivel de juego no válido");
            return; // Salir de la función si el nivel no es válido
    }

    let tableHTML = "<table>";

    for (let i = 0; i < rows; i++) {
        tableHTML += "<tr>"; // Iniciar una nueva fila
        for (let j = 0; j < cols; j++) {
            tableHTML += `
                <td>
                    <button class="card" onclick="handleCardClick(this)">🃏</button>
                </td>
            `; // Cada tarjeta es un botón
        }
        tableHTML += "</tr>"; // Cerrar la fila
    }

    tableHTML += "</table>";
    gameBoard.innerHTML = tableHTML;
}

// Función para manejar el clic en una tarjeta
function handleCardClick(card) {
    card.innerText = "✔"; // Ejemplo: Cambiar el contenido del botón al presionarlo
    card.disabled = true; // Deshabilitar el botón después de presionarlo
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
    `;
}
