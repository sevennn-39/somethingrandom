const music = new Audio('files/')

music.loop = true,

function startMusic(){
    music.play()
}

const canvas = document.getElementById("uwah");
const ctx = canvas.getContext("2d");

const img = new Image();

img.onload = function() {
    ctx.drawImage(0,0);
};

img.src = "files/use.png"