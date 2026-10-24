const draw_panel = document.getElementById("draw_panel");
const context = draw_panel.getContext("2d");

draw_panel.addEventListener("dragover", (ev) => {
  ev.preventDefault();
});
draw_panel.addEventListener("drop", (ev) => {
  ev.preventDefault();
  const image = new Image();
  image.src = ev.dataTransfer.getData("text/plain");
  image.onload = () => {
    const rect = draw_panel.getBoundingClientRect();
    context.drawImage(image, ev.clientX - rect.left, ev.clientY - rect.top);
  };
});