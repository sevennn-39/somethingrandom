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

const outfitOptions = {
    shirt: ["orange.png", "yellow.png", "green.png", "blue.png", "purple.png"],
    accessory: ["bracelets.png", "necklace.png"],
    hat: ["tophat.png", "sidehat.png", "leafhat.png"]
};

const targetOutfit = Object.fromEntries(
    Object.entries(outfitOptions).map(([category, options]) => [
        category,
        `files/${options[Math.floor(Math.random() * options.length)]}`
    ])
);

for (const category of Object.keys(targetOutfit)) {
    const targetImage = document.getElementById(`target-${category}`);
    if (targetImage) targetImage.src = targetOutfit[category];
}

function updateConfidenceFromOutfit() {
    const categories = ["shirt", "accessory", "hat"];
    const matches = categories.filter((category) =>
        window.placedAccessories.some((item) =>
            item.isWorn && item.src.endsWith(targetOutfit[category])
        )
    ).length;

    confidence = (matches / categories.length) * maxconfidence;
    confidenceBar.style.height = `${confidence}%`;
}

backgroundImage.onload = setCanvasSize;
baseImage.onload = setCanvasSize;

backgroundImage.src = "files/bg.png";
baseImage.src = "files/use.png"