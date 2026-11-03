const music = new Audio('files/bgmmusic.mp3')

music.loop = true;

function startMusic(){
    music.play().catch(() => {
        document.addEventListener('pointerdown', startMusic, { once: true });
        document.addEventListener('keydown', startMusic, { once: true });
    });
}

startMusic();

const canvas = document.getElementById("uwah");
const ctx = canvas.getContext("2d");

window.placedAccessories = [];
window.activeDrag = null;

const backgroundImage = new Image();
const baseImage = new Image();

function renderScene() {
    if (!backgroundImage.complete || !baseImage.complete) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);

    for (const item of window.placedAccessories) {
        if (item && item.image && item.image.complete) {
            ctx.drawImage(item.image, item.x, item.y, item.width, item.height);
        }
    }
}

function setCanvasSize() {
    const width = backgroundImage.naturalWidth || baseImage.naturalWidth;
    const height = backgroundImage.naturalHeight || baseImage.naturalHeight;

    canvas.width = width;
    canvas.height = height;
    renderScene();
}

let confidence = 0;
const maxconfidence = 100;
const confidenceBar = document.getElementById("confidenceBar");

function updateConfidenceFromOutfit() {
    const placedCategories = new Set(
        window.placedAccessories
            .map((item) => item.type === "clothes" ? "shirt" : item.type === "hat" ? "hat" : "accessory")
    );

    confidence = (placedCategories.size / 3) * maxconfidence;
    confidenceBar.style.height = `${confidence}%`;
}

backgroundImage.onload = setCanvasSize;
baseImage.onload = setCanvasSize;

backgroundImage.src = "files/bg.png";
baseImage.src = "files/use.png"