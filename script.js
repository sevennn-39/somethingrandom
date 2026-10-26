const music = new Audio('files/')

music.loop = true,

function startMusic(){
    music.play()
}

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

backgroundImage.onload = setCanvasSize;
baseImage.onload = setCanvasSize;

backgroundImage.src = "files/bg.png";
baseImage.src = "files/use.png"