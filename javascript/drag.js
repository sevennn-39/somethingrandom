function dragstartHandler(ev) {
  const accessory = ev.target.closest(".accessory");
  if (!accessory) return;

  ev.dataTransfer.setData("text/plain", accessory.src);
  ev.dataTransfer.setData("application/x-accessory-type", accessory.dataset.type || "clothes");
}

document.querySelectorAll(".accessory").forEach((image) => {
  image.addEventListener("dragstart", dragstartHandler);
});