function updateDirectionLabels() {
  if (!selectedLotId) {
    dpTo1P.innerText = "📍 Directions to 1P";
    dpToLot.innerText = "🚗 Directions to Lot";
    return;
  }

  const lotButton = document.getElementById(selectedLotId);
  const lotName = lotButton.textContent.replace("🅿️", "").trim();

  dpTo1P.innerText = `📍 Directions to 1P from ${lotName}`;
  dpToLot.innerText = `🚗 Directions to ${lotName}`;
}

const onePCoords = "40.59969,-74.1496471";

const lots = {
  lot1: "Parking 1, 70 Lovell Ave, Staten Island, NY 10314",
  lot2: "Parking 2, Staten Island, NY 10314",
  lot3: "Parking 3, Loop Rd, Staten Island, NY 10314",
  lot4: "40.60132, -74.14668",
  lot5: "40.59901, -74.14682",
  lot6: "40.60075, -74.14684"
};

let selectedLotId = null;

const mapWrapper = document.getElementById("mapWrapper");
const arrowLayer = document.getElementById("arrowLayer");
const buildingBtn = document.getElementById("building1P");

// Directions panel
const dpLabel = document.getElementById("dpLabel");
const dpToLot = document.getElementById("dpToLot");
const dpTo1P = document.getElementById("dpTo1P");
const dpClear = document.getElementById("dpClear");
const dpHint = document.getElementById("dpHint");

// Accordion
document.querySelectorAll(".accordion-btn").forEach((button) => {
  button.addEventListener("click", function () {
    const content = this.nextElementSibling;

    document.querySelectorAll(".accordion-content").forEach((item) => {
      if (item !== content) {
        item.style.maxHeight = null;
        item.classList.remove("active");
      }
    });

    if (content.style.maxHeight) {
      content.style.maxHeight = null;
      content.classList.remove("active");
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      content.classList.add("active");
    }
  });
});

function setPanelState(enabled, labelText, hintText) {
  dpToLot.disabled = !enabled;
  dpTo1P.disabled = !enabled;
  dpClear.disabled = !enabled;
  dpLabel.textContent = labelText;
  dpHint.textContent = hintText;
}

function clearSelection() {
  selectedLotId = null;
  document.querySelectorAll(".lot-button").forEach((b) => b.classList.remove("selected"));
  clearPath();
  setPanelState(false, "Select a parking lot", "Tip: Tap a parking lot, then choose where you want directions.");
  updateDirectionLabels();
}

// --- Arrow alignment helpers ---
function getCenter(el) {
  const rect = el.getBoundingClientRect();
  const parentRect = mapWrapper.getBoundingClientRect();
  return {
    x: rect.left - parentRect.left + rect.width / 2,
    y: rect.top - parentRect.top + rect.height / 2,
  };
}

function clearPath() {
  arrowLayer.innerHTML = "";
}

// Curved animated path from selected lot button to 1P button
function drawAnimatedPath(fromEl) {
  clearPath();

  arrowLayer.setAttribute("width", "100%");
  arrowLayer.setAttribute("height", "100%");
  arrowLayer.setAttribute("viewBox", `0 0 ${mapWrapper.clientWidth} ${mapWrapper.clientHeight}`);
  arrowLayer.setAttribute("preserveAspectRatio", "none");

  // defs marker
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
  marker.setAttribute("id", "arrowhead");
  marker.setAttribute("markerWidth", "10");
  marker.setAttribute("markerHeight", "10");
  marker.setAttribute("refX", "9");
  marker.setAttribute("refY", "5");
  marker.setAttribute("orient", "auto");

  const poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  poly.setAttribute("points", "0 0, 10 5, 0 10");
  poly.setAttribute("fill", "#ff3b3b");

  marker.appendChild(poly);
  defs.appendChild(marker);
  arrowLayer.appendChild(defs);

  const start = getCenter(fromEl);
  const end = getCenter(buildingBtn);

  const dx = end.x - start.x;
  const dy = end.y - start.y;

  const bend = Math.min(180, Math.max(90, Math.hypot(dx, dy) * 0.35));
  const c1 = { x: start.x + dx * 0.25, y: start.y - bend };
  const c2 = { x: start.x + dx * 0.75, y: end.y - bend * 0.35 };

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  const d = `M ${start.x} ${start.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${end.x} ${end.y}`;
  path.setAttribute("d", d);
  path.setAttribute("marker-end", "url(#arrowhead)");
  arrowLayer.appendChild(path);

  // Animate draw
  const length = path.getTotalLength();
  path.style.strokeDasharray = `${length}`;
  path.style.strokeDashoffset = `${length}`;

  let progress = length;
  const step = length / 42;

  const anim = setInterval(() => {
    progress -= step;
    path.style.strokeDashoffset = `${progress}`;
    if (progress <= 0) clearInterval(anim);
  }, 15);
}

// --- URL helpers ---
function openDirectionsToDestination(destination, travelmode = "driving") {
  const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    destination
  )}&travelmode=${travelmode}`;
  window.open(url, "_blank");
}

function openDirectionsOriginToDestination(origin, destination, travelmode = "walking") {
  const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
    origin
  )}&destination=${encodeURIComponent(destination)}&travelmode=${travelmode}`;
  window.open(url, "_blank");
}

// Double tap detection (mobile-friendly)
const doubleTapDelay = 300;
let lastTapTime = 0;

Object.keys(lots).forEach((lotId) => {
  const btn = document.getElementById(lotId);
  if (!btn) return;

  btn.addEventListener("click", () => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTapTime;

    if (tapLength < doubleTapDelay && tapLength > 0) {
      // DOUBLE TAP → Go directly to lot
      openDirectionsToDestination(lots[lotId], "driving");
      lastTapTime = 0;
      return;
    }
    
    lastTapTime = currentTime;
    // SINGLE TAP → Select only
    selectedLotId = lotId; 
    updateDirectionLabels();

    document.querySelectorAll(".lot-button").forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");

    clearPath();

    setPanelState(
      true,
      `Selected: ${btn.textContent.replace("🚗", "").trim()}`,
      "Tap again quickly to go directly to this lot, or choose a direction below."
    );
  });
});

// Panel buttons
dpToLot.addEventListener("click", () => {
  if (!selectedLotId) return;
  openDirectionsToDestination(lots[selectedLotId], "driving");
});

dpTo1P.addEventListener("click", () => {
  if (!selectedLotId) return;

  const fromBtn = document.getElementById(selectedLotId);
  drawAnimatedPath(fromBtn);

  setTimeout(() => {
    openDirectionsOriginToDestination(lots[selectedLotId], onePCoords, "walking");
  }, 450);
});

dpClear.addEventListener("click", () => {
  clearSelection();
});

// 1P click: if lot selected, route lot -> 1P; otherwise current -> 1P
buildingBtn.addEventListener("click", () => {
  if (selectedLotId) {
    const fromBtn = document.getElementById(selectedLotId);
    drawAnimatedPath(fromBtn);

    setTimeout(() => {
      openDirectionsOriginToDestination(lots[selectedLotId], onePCoords, "walking");
    }, 450);

    return;
  }

  openDirectionsToDestination(onePCoords, "walking");
});

// Initial panel state
setPanelState(false, "Select a parking lot", "Tip: Tap a parking lot, then choose where you want directions.");

// Keep arrows aligned on resize (clear old path)
window.addEventListener("resize", () => {
  clearPath();
});

updateDirectionLabels();