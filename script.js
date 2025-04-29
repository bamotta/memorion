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
        <button onclick="endGame()">Finalizar Juego</button>
    `;
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