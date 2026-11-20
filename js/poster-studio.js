(function () {
  const { poster: POSTER, twibifyUrl: TWIBIFY } = window.SAG_CONFIG;
  const canvas = document.getElementById("pc");
  const context = canvas.getContext("2d");
  const width = 1080;
  const centerX = 540;
  const centerY = 690;
  const radius = 285;
  const navy = "#032d60";
  const muted = "#51627a";
  let height = 1080;

  const frames = [
    { id: "att", name: "Attending", role: "I’M ATTENDING", verb: "attending", start: "#1b96ff", end: "#0176d3", kind: "sq" },
    { id: "spk", name: "Speaking", role: "I’M SPEAKING", verb: "speaking at", start: "#ffb25c", end: "#e8741a", kind: "sq" },
    { id: "vol", name: "Volunteering", role: "I’M VOLUNTEERING", verb: "volunteering at", start: "#3fbf7f", end: "#04844b", kind: "sq" },
    { id: "pa", name: "Poster: Attending", role: "I’M ATTENDING", verb: "attending", start: "#1b96ff", end: "#0176d3", kind: "po" },
    { id: "ps", name: "Poster: Speaking", role: "I’M SPEAKING", verb: "speaking at", start: "#ffb25c", end: "#e8741a", kind: "po" }
  ];

  let frame = frames[0];
  const photoState = { image: null, zoom: 1, offsetX: 0, offsetY: 0 };
  const logo = new Image();
  logo.onload = draw;
  logo.src = document.querySelector(".brand img").src;

  const font = (weight, size) => `${weight} ${size}px 'Plus Jakarta Sans', Inter, system-ui, sans-serif`;

  function drawPolygon(points) {
    context.beginPath();
    points.forEach((point, index) => {
      if (index) context.lineTo(point[0], point[1]);
      else context.moveTo(point[0], point[1]);
    });
    context.closePath();
    context.fill();
  }

  function roundedRectPath(x, y, rectWidth, rectHeight, radiusValue) {
    context.moveTo(x + radiusValue, y);
    context.arcTo(x + rectWidth, y, x + rectWidth, y + rectHeight, radiusValue);
    context.arcTo(x + rectWidth, y + rectHeight, x, y + rectHeight, radiusValue);
    context.arcTo(x, y + rectHeight, x, y, radiusValue);
    context.arcTo(x, y, x + rectWidth, y, radiusValue);
    context.closePath();
  }

  function roundedRect(x, y, rectWidth, rectHeight, radiusValue) {
    context.beginPath();
    roundedRectPath(x, y, rectWidth, rectHeight, radiusValue);
  }

  function fitText(text, weight, size, maxWidth) {
    context.font = font(weight, size);
    while (context.measureText(text).width > maxWidth && size > 18) {
      size -= 2;
      context.font = font(weight, size);
    }
  }

  function drawCloud(x, y, scale, alpha) {
    context.fillStyle = `rgba(255,255,255,${alpha})`;
    context.beginPath();
    [[0, 0, 32], [40, -18, 44], [90, -2, 36], [46, 10, 38]].forEach(([dx, dy, cloudRadius]) => {
      context.moveTo(x + (dx + cloudRadius) * scale, y + dy * scale);
      context.arc(x + dx * scale, y + dy * scale, cloudRadius * scale, 0, 7);
    });
    context.fill();
  }

  function drawPine(x, y, scale) {
    context.fillStyle = "#17563b";
    context.fillRect(x - 6 * scale, y - 14 * scale, 12 * scale, 22 * scale);
    [[0, 86, 64], [34, 64, 52], [64, 44, 40]].forEach(([offset, top, halfWidth]) => {
      drawPolygon([
        [x, y - top * scale - offset * scale * 0.2 - 46 * scale],
        [x - halfWidth * scale, y - offset * scale - 14 * scale],
        [x + halfWidth * scale, y - offset * scale - 14 * scale]
      ]);
    });
  }

  function setShadow(enabled) {
    context.shadowColor = enabled ? "rgba(3,45,96,.28)" : "transparent";
    context.shadowBlur = enabled ? 44 : 0;
    context.shadowOffsetY = enabled ? 18 : 0;
  }

  function photoBox() {
    return frame.kind === "po"
      ? { x: centerX - radius, y: centerY - radius, width: radius * 2, height: radius * 2 }
      : { x: 0, y: 0, width, height: width };
  }

  function clampPhotoOffset() {
    if (!photoState.image) return;
    const box = photoBox();
    const scale = Math.max(box.width / photoState.image.width, box.height / photoState.image.height) * photoState.zoom;
    const maxX = (photoState.image.width * scale - box.width) / 2;
    const maxY = (photoState.image.height * scale - box.height) / 2;
    photoState.offsetX = Math.min(maxX, Math.max(-maxX, photoState.offsetX));
    photoState.offsetY = Math.min(maxY, Math.max(-maxY, photoState.offsetY));
  }

  function drawPhoto() {
    const box = photoBox();
    if (photoState.image) {
      clampPhotoOffset();
      const scale = Math.max(box.width / photoState.image.width, box.height / photoState.image.height) * photoState.zoom;
      const imageWidth = photoState.image.width * scale;
      const imageHeight = photoState.image.height * scale;
      context.drawImage(
        photoState.image,
        box.x + box.width / 2 - imageWidth / 2 + photoState.offsetX,
        box.y + box.height / 2 - imageHeight / 2 + photoState.offsetY,
        imageWidth,
        imageHeight
      );
      return;
    }

    const gradient = context.createLinearGradient(box.x, box.y, box.x + box.width, box.y + box.height);
    gradient.addColorStop(0, "#dfe7f0");
    gradient.addColorStop(1, "#c3d0de");
    context.fillStyle = gradient;
    context.fillRect(box.x, box.y, box.width, box.height);
    context.fillStyle = muted;
    context.textAlign = "center";
    context.font = font("600", 36);
    context.fillText("Add your photo", box.x + box.width / 2, box.y + box.height / 2 + 12);
  }

  function displayName() {
    return document.getElementById("pn").value.trim();
  }

  function drawLogo(x, y, logoRadius) {
    setShadow(true);
    context.fillStyle = "#fff";
    context.beginPath();
    context.arc(x, y, logoRadius, 0, 7);
    context.fill();
    setShadow(false);
    if (!logo.complete || !logo.naturalWidth) return;

    context.save();
    context.beginPath();
    context.arc(x, y, logoRadius - 7, 0, 7);
    context.clip();
    context.drawImage(logo, x - logoRadius + 7, y - logoRadius + 7, 2 * logoRadius - 14, 2 * logoRadius - 14);
    context.restore();
  }

  function drawSquareFrame() {
    const size = width;
    drawPhoto();

    const fade = context.createLinearGradient(0, 600, 0, size);
    fade.addColorStop(0, "rgba(3,45,96,0)");
    fade.addColorStop(1, "rgba(3,45,96,.7)");
    context.fillStyle = fade;
    context.fillRect(0, 600, size, 480);

    const border = context.createLinearGradient(0, 0, size, size);
    border.addColorStop(0, frame.start);
    border.addColorStop(1, frame.end);
    context.fillStyle = border;
    context.beginPath();
    context.rect(0, 0, size, size);
    roundedRectPath(40, 40, size - 80, size - 80, 52);
    context.fill("evenodd");

    drawLogo(150, 150, 86);
    context.textAlign = "center";
    fitText(POSTER.title, "700", 26, 440);
    const titleWidth = context.measureText(POSTER.title).width + 60;
    setShadow(true);
    context.fillStyle = "#fff";
    roundedRect(size - 80 - titleWidth, 106, titleWidth, 64, 32);
    context.fill();
    setShadow(false);
    context.fillStyle = navy;
    context.fillText(POSTER.title, size - 80 - titleWidth / 2, 148);

    setShadow(true);
    context.fillStyle = navy;
    roundedRect(110, 810, 860, 170, 46);
    context.fill();
    setShadow(false);
    context.fillStyle = frame.start;
    context.beginPath();
    context.arc(170, 895, 10, 0, 7);
    context.arc(910, 895, 10, 0, 7);
    context.fill();
    context.fillStyle = "#fff";
    fitText(frame.role, "800", 60, 700);
    context.fillText(frame.role, centerX, 885);
    context.fillStyle = "#bcd8f4";
    const name = displayName() || POSTER.subtitle;
    fitText(name, "600", 32, 700);
    context.fillText(name, centerX, 938);
  }

  function drawPosterFrame() {
    const sky = context.createLinearGradient(0, 0, 0, 950);
    sky.addColorStop(0, "#7cc8ff");
    sky.addColorStop(1, "#e4f4ff");
    context.fillStyle = sky;
    context.fillRect(0, 0, width, height);

    const sun = context.createRadialGradient(880, 260, 10, 880, 260, 320);
    sun.addColorStop(0, "rgba(255,255,255,.9)");
    sun.addColorStop(1, "rgba(255,255,255,0)");
    context.fillStyle = sun;
    context.fillRect(0, 0, width, 700);
    drawCloud(70, 470, 1.1, 0.9);
    drawCloud(800, 560, 1.3, 0.95);
    drawCloud(380, 190, 0.8, 0.7);

    context.fillStyle = "#6cb6ee";
    drawPolygon([[-80, 1010], [240, 590], [600, 1010]]);
    context.fillStyle = "#4f9fe0";
    drawPolygon([[240, 590], [600, 1010], [420, 1010]]);
    context.fillStyle = "#5aa9e8";
    drawPolygon([[380, 1010], [840, 520], [1180, 1010]]);
    context.fillStyle = "#3f90d6";
    drawPolygon([[840, 520], [1180, 1010], [960, 1010]]);
    context.fillStyle = "#fff";
    drawPolygon([[240, 590], [188, 672], [228, 656], [250, 684], [290, 660]]);
    drawPolygon([[840, 520], [772, 624], [814, 608], [842, 640], [890, 612]]);

    context.fillStyle = "#58b36b";
    context.beginPath();
    context.moveTo(0, 1030);
    context.bezierCurveTo(260, 940, 520, 1090, 800, 1000);
    context.bezierCurveTo(920, 965, 1010, 985, 1080, 1000);
    context.lineTo(width, height);
    context.lineTo(0, height);
    context.fill();
    context.fillStyle = "#3c9a58";
    context.beginPath();
    context.moveTo(0, 1140);
    context.bezierCurveTo(300, 1080, 700, 1200, 1080, 1100);
    context.lineTo(width, height);
    context.lineTo(0, height);
    context.fill();
    drawPine(60, 1070, 1.15);
    drawPine(150, 1110, 0.8);
    drawPine(1020, 1060, 1.15);
    drawPine(930, 1110, 0.8);

    setShadow(true);
    context.fillStyle = "rgba(255,255,255,.95)";
    roundedRect(56, 52, 500, 90, 45);
    context.fill();
    setShadow(false);
    if (logo.complete && logo.naturalWidth) {
      context.save();
      context.beginPath();
      context.arc(101, 97, 34, 0, 7);
      context.clip();
      context.drawImage(logo, 67, 63, 68, 68);
      context.restore();
    }

    context.textAlign = "left";
    context.fillStyle = navy;
    context.font = font("700", 26);
    context.fillText("Salesforce Architect Group", 150, 92);
    context.fillStyle = muted;
    context.font = font("500", 22);
    context.fillText("Noida, India", 150, 122);
    context.textAlign = "center";
    context.fillStyle = navy;
    fitText(POSTER.title, "800", 88, 900);
    context.fillText(POSTER.title, centerX, 290);

    if (POSTER.subtitle) {
      context.font = font("600", 28);
      const subtitleWidth = Math.min(900, context.measureText(POSTER.subtitle).width + 72);
      context.fillStyle = "rgba(255,255,255,.9)";
      roundedRect(centerX - subtitleWidth / 2, 322, subtitleWidth, 56, 28);
      context.fill();
      context.fillStyle = navy;
      context.fillText(POSTER.subtitle, centerX, 360);
    }

    setShadow(true);
    const ring = context.createLinearGradient(centerX - radius, centerY - radius, centerX + radius, centerY + radius);
    ring.addColorStop(0, frame.start);
    ring.addColorStop(1, frame.end);
    context.fillStyle = ring;
    context.beginPath();
    context.arc(centerX, centerY, radius + 22, 0, 7);
    context.fill();
    setShadow(false);
    context.fillStyle = "#fff";
    context.beginPath();
    context.arc(centerX, centerY, radius + 9, 0, 7);
    context.fill();
    context.save();
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 7);
    context.clip();
    drawPhoto();
    context.restore();

    context.fillStyle = "#021f45";
    drawPolygon([[96, 990], [190, 990], [190, 1078], [143, 1054], [96, 1078]]);
    drawPolygon([[984, 990], [890, 990], [890, 1078], [937, 1054], [984, 1078]]);
    setShadow(true);
    context.fillStyle = navy;
    drawPolygon([[140, 950], [940, 950], [940, 1040], [140, 1040]]);
    setShadow(false);
    context.fillStyle = "#ff9a3c";
    [200, 880].forEach((x) => {
      context.beginPath();
      context.arc(x, 995, 8, 0, 7);
      context.fill();
    });
    context.textAlign = "center";
    context.fillStyle = "#fff";
    fitText(frame.role, "800", 52, 640);
    context.fillText(frame.role, centerX, 1010);
    setShadow(true);
    context.fillStyle = "#fff";
    roundedRect(90, 1090, 900, 196, 36);
    context.fill();
    setShadow(false);
    const name = displayName() || "Learn · Connect · Build";
    context.fillStyle = navy;
    fitText(name, "800", 54, 820);
    context.fillText(name, centerX, 1166);
    const details = [POSTER.date, POSTER.venue].filter(Boolean).join("  ·  ");
    if (details) {
      context.fillStyle = muted;
      fitText(details, "500", 28, 820);
      context.fillText(details, centerX, 1226);
    }
  }

  function draw() {
    height = frame.kind === "po" ? 1350 : 1080;
    if (canvas.height !== height) canvas.height = height;
    context.clearRect(0, 0, width, height);
    if (frame.kind === "po") drawPosterFrame();
    else drawSquareFrame();
  }

  function caption() {
    return `I’m ${frame.verb} ${POSTER.title} with the Salesforce Architect Group, Noida! Join fellow Trailblazers to learn, connect and build.\n\n#SalesforceArchitectGroup #Trailblazer #Salesforce #Noida`;
  }

  function updateShareLinks() {
    const text = caption();
    const encoded = encodeURIComponent(text);
    document.getElementById("pcap").value = text;
    document.getElementById("sl").href = `https://www.linkedin.com/feed/?shareActive=true&text=${encoded}`;
    document.getElementById("sw").href = `https://wa.me/?text=${encoded}`;
    document.getElementById("sx").href = `https://twitter.com/intent/tweet?text=${encoded}`;
  }

  const frameList = document.getElementById("frames");
  frames.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `tile ${option.kind}`;
    button.setAttribute("role", "radio");
    button.setAttribute("aria-checked", String(index === 0));
    button.style.setProperty("--a", option.start);
    button.style.setProperty("--b", option.end);
    button.innerHTML = `<span class="tp"></span>${option.name}`;
    button.addEventListener("click", () => {
      frame = option;
      photoState.offsetX = 0;
      photoState.offsetY = 0;
      frameList.querySelectorAll(".tile").forEach((tile) => {
        tile.setAttribute("aria-checked", String(tile === button));
      });
      document.getElementById("fname").textContent = option.name;
      updateShareLinks();
      draw();
    });
    frameList.appendChild(button);
  });

  const campaign = document.createElement("a");
  campaign.className = "tile tw";
  campaign.href = TWIBIFY;
  campaign.target = "_blank";
  campaign.rel = "noopener";
  campaign.innerHTML = '<span class="tp"></span>Twibify campaign ↗';
  frameList.appendChild(campaign);

  const twibifyView = document.getElementById("twv");
  const studio = document.querySelector(".studio");
  const twibifyFrame = document.getElementById("twf");
  document.getElementById("twopen").href = TWIBIFY;

  function showTwibify(show) {
    twibifyView.hidden = !show;
    studio.style.display = show ? "none" : "";
    if (show && twibifyFrame.getAttribute("src") === "about:blank") {
      twibifyFrame.src = TWIBIFY;
    }
    (show ? twibifyView : studio).scrollIntoView({ behavior: "smooth", block: "start" });
  }

  campaign.addEventListener("click", (event) => {
    event.preventDefault();
    showTwibify(true);
  });
  document.getElementById("twback").addEventListener("click", () => showTwibify(false));

  let dragPosition = null;
  canvas.addEventListener("pointerdown", (event) => {
    if (!photoState.image) return;
    dragPosition = { x: event.clientX, y: event.clientY };
    canvas.setPointerCapture(event.pointerId);
  });
  canvas.addEventListener("pointermove", (event) => {
    if (!dragPosition) return;
    const scale = width / canvas.getBoundingClientRect().width;
    photoState.offsetX += (event.clientX - dragPosition.x) * scale;
    photoState.offsetY += (event.clientY - dragPosition.y) * scale;
    dragPosition = { x: event.clientX, y: event.clientY };
    draw();
  });
  canvas.addEventListener("pointerup", () => {
    dragPosition = null;
  });
  canvas.addEventListener("pointercancel", () => {
    dragPosition = null;
  });

  document.getElementById("pf").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const image = new Image();
    image.onload = () => {
      photoState.image = image;
      photoState.zoom = 1;
      photoState.offsetX = 0;
      photoState.offsetY = 0;
      const zoom = document.getElementById("pz");
      zoom.value = 1;
      zoom.disabled = false;
      canvas.style.touchAction = "none";
      canvas.style.cursor = "grab";
      draw();
    };
    image.src = URL.createObjectURL(file);
  });

  document.getElementById("pz").addEventListener("input", (event) => {
    photoState.zoom = Number(event.target.value);
    draw();
  });
  document.getElementById("pn").addEventListener("input", draw);
  document.getElementById("pd").addEventListener("click", () => {
    draw();
    canvas.toBlob((blob) => {
      const download = document.createElement("a");
      download.href = URL.createObjectURL(blob);
      download.download = `sag-noida-${frame.id}.png`;
      document.body.appendChild(download);
      download.click();
      download.remove();
    }, "image/png");
  });

  const copyButton = document.getElementById("pcopy");
  copyButton.addEventListener("click", () => {
    const captionField = document.getElementById("pcap");
    const onCopied = () => {
      copyButton.textContent = "Copied";
      setTimeout(() => {
        copyButton.textContent = "Copy caption";
      }, 1600);
    };

    if (navigator.clipboard) {
      navigator.clipboard.writeText(captionField.value).then(onCopied, () => {
        captionField.select();
        document.execCommand("copy");
        onCopied();
      });
    } else {
      captionField.select();
      document.execCommand("copy");
      onCopied();
    }
  });

  updateShareLinks();
  draw();
  if (document.fonts && document.fonts.load) {
    Promise.all([
      document.fonts.load("800 40px 'Plus Jakarta Sans'"),
      document.fonts.load("600 20px 'Plus Jakarta Sans'")
    ]).then(draw).catch(() => {});
  }
})();
