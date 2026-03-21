const onePCoords = "40.59969,-74.1496471";

const lots = {
  lot1: "Parking 1, 70 Lovell Ave, Staten Island, NY 10314",
  lot2: "Parking 2, Staten Island, NY 10314",
  lot3: "Parking 3, Loop Rd, Staten Island, NY 10314",
  lot4: "40.60075, -74.14684",
  lot5: "40.59901, -74.14682",
  lot6: "40.60037040321241, -74.14649686354696",
};

const mapWrapper = document.getElementById("mapWrapper");
const arrowLayer = document.getElementById("arrowLayer");
const buildingBtn = document.getElementById("building1P");

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


function clearPath() {
  arrowLayer.innerHTML = "";
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


// New selection
Object.keys(lots).forEach((lotId) => {
  const btn = document.getElementById(lotId);
  if (!btn) return;

  btn.addEventListener("click", () => {
    clearPath();

    if (lotId === "lot6") {
      alert(
        "Warning: Google Maps does not directly navigate to the loading dock area or the disabled parking lot by the 1P building. After arriving, turn into the area, continue straight until you reach the 1P building, and then turn into the disabled parking lot/loading dock."
      );
    }

    openDirectionsToDestination(lots[lotId], "driving");
  });
});


buildingBtn.addEventListener("click", () => {
  clearPath();
  openDirectionsToDestination(onePCoords, "walking");
});
window.addEventListener("resize", () => {
  clearPath();
});