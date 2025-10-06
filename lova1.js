//The following lines of code is inspired by flow field art by Tyler Hobbs, https://www.tylerxhobbs.com/words/flow-fields
function setup() {
  createCanvas(innerWidth, innerHeight);
  background(225, 235, 245);
  noFill();
  strokeWeight(1.2);

  let lineLength = 300; // gör linjerna längre
  let palette = [
    color(215, 70, 110, 50),
    color(90, 20, 200, 50),
    color(255, 150, 50, 50),
    color(20, 120, 150, 50),
  ];

  // Rita t.ex. 100 linjer från nedre mitten
  for (let j = 0; j < 100; j++) {
    stroke(palette[int(random(palette.length))]);

    let px = width / 2;
    let py = height;

    beginShape();
    for (let i = 0; i < lineLength; i++) {
      vertex(px, py);

      // Perlin noise flow field
      let n = noise(px * 0.002, py * 0.002, j * 0.1); // tredje dimension för variation
      let angle = TAU * n;

      px += cos(angle) * 2;
      py += sin(angle) * 2;

      if (px < 0 || px > width || py < 0 || py > height) break;
    }
    endShape();
  }

  noLoop();
}

