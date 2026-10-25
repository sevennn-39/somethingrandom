const music = new Audio('files/')

music.loop = true,

function startMusic(){
    music.play()
}

const canvas = document.getElementById("uwah");
const ctx = canvas.getContext("2d");

window.placedAccessories = [];
window.activeDrag = null;

const baseImage = new Image();

function renderScene() {
    if (!baseImage.complete) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);

    for (const item of window.placedAccessories) {
        if (item && item.image && item.image.complete) {
            ctx.drawImage(item.image, item.x, item.y, item.width, item.height);
        }
    }
}

baseImage.onload = function() {
    canvas.width = baseImage.naturalWidth;
    canvas.height = baseImage.naturalHeight;
    renderScene();
};

baseImage.src = "files/use.png"