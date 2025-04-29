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
        <button onclick="reiniciar()">Volver</button>
    `;
}

function reiniciar(){
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

    let rows, cols;
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
            console.error("Nivel de juego no válido");
            return; 
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
        <button onclick="reiniciar()">Reiniciar</button>
    `;

    document.getElementById("summary").scrollIntoView({ behavior: "smooth" });


}
