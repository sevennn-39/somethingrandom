const uwah = document.getElementById("uwah");
const context = uwah.getContext("2d");

function getAccessoryType(src) {
  if (src.includes("tophat") || src.includes("sidehat") || src.includes("leafhat")) return "hat";
  if (src.includes("bracelets")) return "bracelets";
  if (src.includes("necklace")) return "necklace";
  return "clothes";
}

function getAnchorForType(type, item) {
  const centerX = uwah.width / 2;

  switch (type) {
    case "hat":
      return { x: centerX - item.width / 2, y: 18 };
    case "necklace":
      return { x: centerX - item.width / 2, y: 180 };
    case "bracelets":
      return { x: centerX - item.width / 2, y: 250 };
    case "clothes":
      return { x: centerX - item.width / 2, y: 220 };
    default:
      return { x: centerX - item.width / 2, y: centerX };
  }
}

function snapAccessory(item) {
  const anchor = getAnchorForType(item.type, item);
  const centerX = item.x + item.width / 2;
  const centerY = item.y + item.height / 2;
  const anchorX = anchor.x + item.width / 2;
  const anchorY = anchor.y + item.height / 2;

  if (Math.hypot(centerX - anchorX, centerY - anchorY) <= 160) {
    item.x = anchor.x;
    item.y = anchor.y;
  }
}

function getPointerPosition(ev) {
  const rect = uwah.getBoundingClientRect();
  return {
    x: ev.clientX - rect.left,
    y: ev.clientY - rect.top
  };
}

function findAccessoryAtPosition(x, y) {
  for (let i = window.placedAccessories.length - 1; i >= 0; i--) {
    const item = window.placedAccessories[i];
    if (
      x >= item.x &&
      x <= item.x + item.width &&
      y >= item.y &&
      y <= item.y + item.height
    ) {
      return item;
    }
  }

  return null;
}

function finalizeDrag() {
  if (!window.activeDrag) return;

  snapAccessory(window.activeDrag.item);
  window.activeDrag = null;
  renderScene();
}

uwah.addEventListener("dragover", (ev) => {
  ev.preventDefault();
});

uwah.addEventListener("drop", (ev) => {
  ev.preventDefault();

  const src = ev.dataTransfer.getData("text/plain");
  if (!src) return;

  const image = new Image();
  image.onload = () => {
    const pos = getPointerPosition(ev);
    const type = ev.dataTransfer.getData("application/x-accessory-type") || getAccessoryType(src);

    const item = {
      image,
      src,
      type,
      width: image.naturalWidth,
      height: image.naturalHeight,
      x: pos.x - image.naturalWidth / 2,
      y: pos.y - image.naturalHeight / 2
    };

    window.placedAccessories.push(item);
    snapAccessory(item);
    renderScene();
  };

  image.src = src;
});

uwah.addEventListener("pointerdown", (ev) => {
  const pos = getPointerPosition(ev);
  const item = findAccessoryAtPosition(pos.x, pos.y);

  if (!item) return;

  window.activeDrag = {
    item,
    offsetX: pos.x - item.x,
    offsetY: pos.y - item.y
  };
});

uwah.addEventListener("pointermove", (ev) => {
  if (!window.activeDrag) return;

  const pos = getPointerPosition(ev);
  const item = window.activeDrag.item;

  item.x = pos.x - window.activeDrag.offsetX;
  item.y = pos.y - window.activeDrag.offsetY;
  renderScene();
});

uwah.addEventListener("pointerup", finalizeDrag);
uwah.addEventListener("pointerleave", finalizeDrag);