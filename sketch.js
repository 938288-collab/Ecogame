let x, y;
let x1, y1;

let h, k;
let h1, k1;

let baseSpeed = 2;
let time = 0;
let speed, speed2;

let type, type1;
let cooldown = 50;

let fishCaught = 0;
let warningTimer = 0;

let bodyBend = 0;
let legStrech = 0;

let gPickerPos = 20;

let score = 0;

let cx = 300;

let strikes = 0;
let firstStrike = 0;

let selected2 = false;
let selected1 = false;



//functions for images
function preload() {
  pollutionC = loadImage("https://static.vecteezy.com/system/resources/thumbnails/042/167/773/small/ai-generated-garbage-basket-full-of-garbage-on-transparent-background-ai-generated-free-png.png");
  
  garbage = loadImage("https://png.pngtree.com/png-clipart/20250103/original/pngtree-recycling-trash-pile-clipart-illustration-png-image_19079477.png");
}






function setup() {
  createCanvas(600, 600);
  cx = 300;

  resetObject1();
  resetObject2();

//  gameOverSound = new;
}

function resetObject1() {
  h = random(200, 400);
  k = 200;

  speed = random([-2, 2]);
  type = random(["garbage", "fish", "garbage", "garbage"]);

  x = 0;
}

function resetObject2() {
  h1 = random(200, 400);
  k1 = 200;

  speed2 = random([-speed, speed]);
  type1 = random(["garbage", "fish", "garbage", "garbage"]);

  x1 = 0;
  
}

function draw() {
  if (strikes > 10) {
    textSize(40);
    fill(0);
    text("Game Over", 200, 280);
    noLoop();
  }
  else {
  game();
  }
  
  //this is to fix the bug of automatic strikes in the start of game.
  if (firstStrike < 10) {
    strikes = 0;
  }
}

function drawObject(x, y, type, h, speed) {
  if (type == "garbage") {
    push();
    translate(x, y);
    rotate(sin(time * 0.1) * 0.1);

    fill(30);
    ellipse(0, 10, 45, 55);

    fill(20);
    rect(-8, -20, 16, 15);

    stroke(0);
    strokeWeight(2);
    line(-5, -20, 0, -30);
    line(5, -20, 0, -30);

    noStroke();
    fill(80);
    ellipse(-8, 5, 8, 12);

    pop();
  } else {
    let slope = 0.02 * (x - h);
    let angle = atan(slope);

    push();
    translate(x, y);

    if (speed < 0) rotate(angle + PI);
    else rotate(angle);

    fill(0, 150, 255);
    ellipse(0, 0, 50, 30);

    triangle(25, 0, 40, -10, 40, 10);

    fill(255);
    circle(-10, -5, 10);
    fill(0);
    circle(-10, -5, 5);

    pop();
  }
}

function drawBackground() {
  for (let i = 0; i < 400; i++) {
    let r = 235 - i * 0.2;
    let g = 245 - i * 0.15;
    let b = 255;

    stroke(r, g, b);
    line(0, i, width, i);
  }

  noStroke();

  let sunX = 520;
  let sunY = 80;

  for (let r = 90; r > 0; r -= 2) {
    let inter = map(r, 0, 90, 1, 0);

    fill(
      lerp(255, 255, inter),
      lerp(255, 220, inter),
      lerp(200, 80, inter),
      180
    );

    circle(sunX, sunY, r * 2);
  }

  fill(255);
  ellipse(150, 100, 60, 40);
  ellipse(180, 100, 60, 40);
  ellipse(165, 80, 60, 40);

  ellipse(350, 120, 70, 45);
  ellipse(390, 120, 70, 45);
  ellipse(370, 100, 70, 45);
}

function game() {
  firstStrike ++;
  
  if (score > 10) {
    cooldown --;
  }
  
  background(255);
  time++;

  drawBackground();

  fill(0, 100, 200);
  rect(0, 400, 600, 200);

  fill(0);
  rect(cx - 100, 400, 200, 20);

  bodyBend = (mouseX >= cx) ? 10 : -10;
  legStrech = (mouseY >= 350) ? 10 : -10;

  noStroke();
  fill(70, 85, 108);

  quad(cx - 20 + bodyBend, 350 + legStrech, cx, 350 + legStrech, cx, 400, cx - 20, 400);
  quad(cx + 10 + bodyBend, 350 + legStrech, cx + 30, 350 + legStrech, cx + 30, 400, cx + 10, 400);
  rect(cx - 10 + bodyBend, 350 + legStrech, 30, 20);

  fill(75, 53, 29);
  rect(cx - 20 + bodyBend, 350 + legStrech, 50, 10);

  fill(162, 230, 258);
  rect(cx - 20 + bodyBend, 290 + legStrech, 50, 60);

  fill(255, 224, 194);
  circle(cx + 5 + bodyBend, 275 + legStrech, 30);

  fill(0);
  ellipse(cx, 270 + legStrech, 7, 3);
  ellipse(cx + 10, 270 + legStrech, 7, 3);

  stroke(255, 224, 194);
  strokeWeight(10);

  let m = (mouseY - 300) / (mouseX - cx);
  let b = mouseY - m * mouseX;

  let A = 1 + m * m;
  let B = 2 * (m * (b - 300) - cx);
  let C = cx * cx + (b - 300) * (b - 300) - 75 * 75;

  let handx = (-B + sqrt(B * B - 4 * A * C)) / (2 * A);
  let handy = m * handx + b;

  line(cx - 20 + bodyBend, 300 + legStrech, handx, handy);
  line(cx + 30 + bodyBend, 300 + legStrech, handx, handy);

  stroke(100);
  line(handx, handy, mouseX, mouseY);

  gPickerPos = mouseIsPressed ? 15 : 20;

  line(mouseX, mouseY, mouseX + gPickerPos, mouseY - gPickerPos);
  line(mouseX, mouseY, mouseX + gPickerPos, mouseY + gPickerPos);

  noStroke();
  fill(180);
  rect(cx + 80, 330, 60, 70, 5);

  fill(140);
 rect(cx + 75, 320, 70, 10);

  fill(160);
  rect(cx + 85, 335, 8, 60);
  rect(cx + 105, 335, 8, 60);
  rect(cx + 125, 335, 8, 60);

  fill(120);
  rect(cx + 80, 390, 60, 10);

/*  //OBJECT 1
  x -= speed;
  y = 0.008 * pow(x - h, 2) + k;

  drawObject(x, y, type, h, speed);

  if (x < -100 || x > width + 100 || y > height + 100) {
    resetObject1();
  } 

  //OBJECT 2
  if (score > 5) {
    x1 -= speed2;
    y1 = 0.008 * pow(x1 - h1, 2) + k1;

    drawObject(x1, y1, type1, h1, speed2);

    if (x1 < -100 || x1 > width + 100 || y1 > height + 100) {
      resetObject2();
    }
  } */

  fill(0);
  textSize(20);
  text("Score: " + score, 20, 30);
  text("strikes: " + strikes, 20, 90)
  
   if (mouseIsPressed == true && mouseButton == LEFT && mouseX < x + 50 && mouseX + gPickerPos * 2 > x - 50 && mouseY > y - 50 && mouseY < y + 50 && selected2 == false) {
    x = mouseX;
    y = mouseY;
    
    selected1 = true;
    
   // image(garbage, x - 25, y - 25, 50, 50);
    drawObject(x, y, type, h, speed);
     
     if (type == "fish") {
       fishCaught += 1;
     }  
    }
    else if (mouseIsPressed == false && x > cx + 75 && x < cx + 145 && y > 320 && y < 400 && mouseX > cx + 75 && mouseX < cx + 145 && mouseY > 320 && mouseY < 400 && selected1 == true) {
      
      selected1 = false;
      score += 1
      resetObject1();
    
      h = random(200, 400);
      speed = random([speed, -speed]);
      if (speed < 0) {
        x = h + 110
      }
      else {
        x = h - 110;
      }
    }
  
  else {
    k = 200
    y = 0.03 * pow(x - h, 2) + k;
  
    x += speed;
  
    //image(garbage, x, y, 50, 50);
    drawObject(x, y, type, h, speed);
  }
  
  
  if (y > 600 || x > 600 || x < 0) {
    if (type == "garbage") { 
      strikes += 1;
    }
    resetObject1();
    
    h = random(200, 400);
    speed = random([speed, -speed]);
    
    if (speed < 0) {
      x = h + 110
    }
    else {
      x = h - 110;
    } 
  } 
  
if (score > 10 && mouseIsPressed == true && mouseButton == LEFT && mouseX < x1 + 50 && mouseX + gPickerPos * 2 > x1 - 50 && mouseY > y1 - 50 && mouseY < y1 + 50 && selected1 == false) {
    cooldown = 50
  
    x1 = mouseX;
    y1 = mouseY;
    
    selected2 = true;
    
   // image(garbage, x - 25, y - 25, 50, 50);
    drawObject(x1, y1, type1, h1, speed2);
     
     if (type1 == "fish") {
       fishCaught += 1;
     }  
  }
  
  else if (score > 10 && mouseIsPressed == false && x1 > cx + 75 && x1 < cx + 145 && y1 > 320 && y1 < 400 && mouseX > cx + 75 && mouseX < cx + 145 && mouseY > 320 && mouseY < 400 && selected2 == true) {
    
    selected2 = false;
    score += 1
    resetObject2();
    
//    speed *= 1.01;
//    speed2 *= 1.01;
    
    h1 = random(200, 400);
    speed2 = random([speed2, -speed2]);
    if (speed < 0) {
      x1 = h1 + 110
    }
    else {
      x1 = h1 - 110;
    }
  }
  
  
  else if (score > 10) {
    k1 = 200
    y1 = 0.03 * pow(x1 - h1, 2) + k1;
  
    x1 += speed2;
  
    //image(garbage, x, y, 50, 50);
    drawObject(x1, y1, type1, h1, speed2);
  }
  
  
  if (score > 10 && y1 > 600 || x1 > 600 || x1 < 0 && cooldown < 0) {
    if (type1 == "garbage") {
      strikes += 1;
    }
    resetObject2();
    
    k1 = 200
    h1 = random(200, 400);
    speed2 = random([speed2, -speed2]);
    
    if (speed2 < 0) {
      x1 = h1 + 110
    }
    else {
      x1 = h1 - 110;
    } 
  } 
  


  if (warningTimer > 0 && fishCaught < 2) {
    fill(255, 0, 0);
    textSize(24);
    text("⚠ Don't catch fish!", 180, 80);
    warningTimer--;
  }

  if (fishCaught >= 2) {
    textSize(40);
    fill(0);
    text("Game Over", 200, 280);

//    if (!gameOverPlayed) {
//      gameOverSound.play();
//      gameOverPlayed = true;
//    }

    noLoop();
  }
}
