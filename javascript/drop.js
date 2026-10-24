function dragstartHandler(ev) {
  ev.dataTransfer.setData("text/plain", ev.target.src);
}

document.querySelectorAll('[id="EVIL"]').forEach((image) => {
  image.addEventListener("dragstart", dragstartHandler);
}); 