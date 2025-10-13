let stepSize = 14;
let lineLength = 150;
let palette;

let starss = [];
let cols, rows;
let bgGraphics;
let clickedStars = [];

function setup() {
  createCanvas(innerWidth, innerHeight);
  noFill();
  strokeWeight(0.5);

  //create an off-screen graphics layer for the static background
  bgGraphics = createGraphics(innerWidth, innerHeight);
  bgGraphics.background(4, 12, 36);
  bgGraphics.noFill();
  bgGraphics.strokeWeight(0.5);

  //Flow field color palette
  palette = [
    color(255, 255, 255, 80),
    color(157, 165, 189, 100),
    color(58, 76, 122, 100),
    color(10, 32, 90, 100),
  ];

  // Flowfield part of the code is inspired by Tyler Hobbs:
  // https://www.tylerxhobbs.com/words/flow-fields

  //Draw static flow field background
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

  // The following lines of code (until row 102) is inspired by Garitt's snow demo
  // given during the course Foundations of Programming, spring 2024.

  // Create stars (small stars with fixed positions)
  cols = floor(width / stepSize);
  rows = floor(height / stepSize);

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
  //draw the flowfield background
  image(bgGraphics, 0, 0);

  //Draw the fixed stars
  noStroke();
  for (let stars of starss) {
    let pulse = 1 + 0.3 * sin(frameCount * stars.pulseSpeed + stars.offset);
    let brightness =
      180 + 75 * sin(frameCount * stars.pulseSpeed + stars.offset);
    fill(255, 255, 255, brightness * stars.alpha);

    push();
    translate(stars.x, stars.y);
    scale(pulse);
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

  //Yellow stars on click
  for (let s of clickedStars) {
    drawClickedStar(s);
  }
}

function drawClickedStar(s) {
  stroke(255, 255, 150, 220);
  strokeWeight(2);
  noFill();

  //following 13 lines for making proper star-shapes is inspired by discussion with ChatGPT (OpenAI, 2025)
  const angleStep = TWO_PI / 5;
  beginShape();
  for (let i = 0; i < 5; i++) {
    let x1 = s.x + (cos(i * angleStep) * s.size) / 2;
    let y1 = s.y + (sin(i * angleStep) * s.size) / 2;
    vertex(x1, y1);

    let x2 = s.x + (cos(i * angleStep + angleStep / 2) * s.size) / 4;
    let y2 = s.y + (sin(i * angleStep + angleStep / 2) * s.size) / 4;
    vertex(x2, y2);
  }
  endShape(CLOSE);
}

//function for drawing stars
function mousePressed() {
  clickedStars.push({
    x: mouseX,
    y: mouseY,
    size: random(30, 60),
  });

  console.log("Mouse pressed!");

  Tone.start().then(() => {
    console.log("AudioContext started!");

    const lowpass = new Tone.Filter(100, "lowpass").toDestination();
    const highpass = new Tone.Filter(250, "highpass").connect(lowpass);

    const osc = new Tone.Oscillator(Math.random() * 880 + 110, "sine").connect(
      highpass
    );

    osc.start();
    osc.stop("+0.8");
  });
}
