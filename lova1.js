let stepSize = 20;
let lineLength = 150;
let palette;
let starss = [];
let cols, rows;
let bgGraphics; // cache for background

function setup() {
  createCanvas(innerWidth, innerHeight);
  noFill();
  strokeWeight(0.5);

  // ---- create an off-screen graphics layer for the static background ----
  bgGraphics = createGraphics(width, height);
  bgGraphics.background(4, 12, 36);
  bgGraphics.noFill();
  bgGraphics.strokeWeight(0.5);

  // ---- Flow field color palette ----
  palette = [
    color(255, 255, 255, 80),
    color(157, 165, 189, 100),
    color(58, 76, 122, 100),
    color(10, 32, 90, 100),
  ];

  // ---- 1️⃣ Draw static flow field background ONCE ----
  for (let x = 0; x < width; x += stepSize) {
    for (let y = 0; y < height; y += stepSize) {
      bgGraphics.stroke(palette[int(random(palette.length))]);

      let px = x;
      let py = y;

      bgGraphics.beginShape();
      for (let i = 0; i < lineLength; i++) {
        bgGraphics.vertex(px, py);

        let n = noise(px * 0.002, py * 0.002);
        let angle = TAU * n;

        px += cos(angle) * 2;
        py += sin(angle) * 2;

        if (px < 0 || px > width || py < 0 || py > height) break;
      }
      bgGraphics.endShape();
    }
  }

  // ---- 2️⃣ Create stars (fixed positions) ----
  cols = floor(width / (stepSize * 2)); // half density
  rows = floor(height / (stepSize * 2));

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      starss.push({
        x: i * stepSize * 2 + random(-3, 3),
        y: j * stepSize * 2 + random(-3, 3),
        alpha: random(0.5, 1),
        offset: random(TAU),
        pulseSpeed: random(0.02, 0.04),
      });
    }
  }
}

function draw() {
  // ---- draw the cached background ----
  image(bgGraphics, 0, 0);

  noStroke();

  for (let stars of starss) {
    // pulse effect (scale)
    let pulse = 1 + 0.3 * sin(frameCount * stars.pulseSpeed + stars.offset);

    // twinkle brightness
    let brightness =
      180 + 75 * sin(frameCount * stars.pulseSpeed + stars.offset);
    fill(255, 255, 255, brightness * stars.alpha);

    push();
    translate(stars.x, stars.y);
    scale(pulse);

    // ⭐ Star shape (fixed)
    ellipse(0, 0, 1, 10);
    ellipse(0, 0, 10, 1);

    push();
    rotate(PI / 5);
    ellipse(0, 0, 3, 3);
    pop();

    push();
    rotate(-PI / 5);
    ellipse(0, 0, 3, 3);
    pop();

    pop();
  }
}
