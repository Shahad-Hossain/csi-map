const onePCoords = "40.6015,-74.1486";

const lots = {
    lot1: "70 Lovell Ave, Staten Island, NY 10314",
    lot2: "Parking 2, Staten Island, NY 10314",
    lot3: "Parking 3, Loop Rd, Staten Island, NY 10314",
    lot4: "Parking 4, Loop Rd, Staten Island, NY 10314"
};

const mapWrapper = document.getElementById("mapWrapper");
const arrowLayer = document.getElementById("arrowLayer");
const building = document.getElementById("building1P");

function getCenter(el) {
    const rect = el.getBoundingClientRect();
    const parentRect = mapWrapper.getBoundingClientRect();

    return {
        x: rect.left - parentRect.left + rect.width / 2,
        y: rect.top - parentRect.top + rect.height / 2
    };
}

function drawPath(fromEl) {
    arrowLayer.innerHTML = "";

    const start = getCenter(fromEl);
    const end = getCenter(building);

    const controlX = (start.x + end.x) / 2;
    const controlY = start.y - 100; // curvature upward

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const d = `M ${start.x} ${start.y} Q ${controlX} ${controlY}, ${end.x} ${end.y}`;

    path.setAttribute("d", d);
    arrowLayer.appendChild(path);

    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;

    let progress = length;
    const animation = setInterval(() => {
        progress -= length / 40;
        path.style.strokeDashoffset = progress;
        if (progress <= 0) clearInterval(animation);
    }, 15);
}

Object.keys(lots).forEach(id => {
    document.getElementById(id).addEventListener("click", function () {

        drawPath(this);

        setTimeout(() => {
            const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(lots[id])}&destination=${onePCoords}&travelmode=walking`;
            window.open(url, "_blank");
        }, 800);
    });
});

building.addEventListener("click", function () {
    window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${onePCoords}&travelmode=walking`,
        "_blank"
    );
});

window.addEventListener("resize", () => {
    arrowLayer.innerHTML = "";
});

document.querySelectorAll(".accordion-btn").forEach(button => {
    button.addEventListener("click", function () {

        const content = this.nextElementSibling;

        document.querySelectorAll(".accordion-content").forEach(item => {
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