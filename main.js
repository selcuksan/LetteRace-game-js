var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

cvs.width = innerWidth;
cvs.height = innerHeight;

let scoreInc = 1;
const data = {
    'A': 0,
    'B': 1,
    'C': 2,
    'D': 3,
    'E': 4,
    'F': 5,
    'G': 6,
    'Ğ': 30,
    'H': 7,
    'I': 8,
    'İ': 29,
    'J': 9,
    'K': 10,
    'L': 11,
    'M': 12,
    'N': 13,
    'O': 14,
    'Ö': 28,
    'P': 15,
    'R': 17,
    'S': 18,
    'Ş': 31,
    'T': 19,
    'U': 20,
    'Ü': 27,
    'V': 21,
    'Y': 25,
    'Z': 26,
    'X': 24,
    'W': 22,
    'Q': 16,
    'Ç': 23

};


const bgRoad = {
    "6": "1",
    "5": "2",
    "4": "4",
    "3": "5",
    "2": "4",
    "1": "6",
    "0": "2"
};
var backImg = Math.floor(Math.random() * 7);
var roadImg = bgRoad[backImg];

let bg = new Image();
let car = new Image();
let flag = new Image();
let road = new Image();
let parachute1 = new Image();
let parachute2 = new Image();
let parachute3 = new Image();
let cup = new Image();
var win = new Audio();
var lose = new Audio();

paraImg = [];
paraImg.push(parachute1, parachute2, parachute3);

class Car {
    constructor() {
        this.speed = 0;
        car.src = "images/car.png";
    }
}
class Game {
    constructor() {
        this.SCORE = 0;
        this.BEST_SCORE = 0;
        this.COUNTER = 0;
    }
}
class BackGround {
    constructor() {
        this.parachutes = [];
        this.gravity = 1;
        flag.src = "images/flag.png";
        bg.src = "images/bg" + backImg + ".jpg";
        road.src = "images/road" + roadImg + ".jpg";
        cup.src = "images/cup.png";
        win.src = "sounds/win.mp3";
        lose.src = "sounds/lose.mp3";
    }
}
class Parachutes {
    constructor() {
        this.height = cvs.height / 4;
        this.width = cvs.width / 10;
        this.rand = random();
        this.x = Math.floor(Math.random() * cvs.width / 1.5);
        this.y = Math.floor(Math.random() * cvs.height / 20) - this.height / 2;
        this.src = "images/p" + this.rand + ".png";

    }
}

paracH = new Parachutes();
parachute1.src = paracH.src;
paracH2 = new Parachutes();
parachute2.src = paracH2.src;
paracH3 = new Parachutes();
parachute3.src = paracH3.src;

backG = new BackGround();
backG.parachutes.push(paracH, paracH2, paracH3);
var paras = backG.parachutes

mcQueen = new Car();
game = new Game();

game.BEST_SCORE = localStorage.getItem('bestScore');
draw();
function draw() {
    ctx.drawImage(bg, 0, 0, cvs.width, cvs.height / 1.15);
    ctx.drawImage(road, 0, cvs.height / 1.15, cvs.width, cvs.height / 7.8);
    ctx.drawImage(car, mcQueen.speed, cvs.height / 1.15, cvs.width / 9, cvs.height / 10);
    ctx.drawImage(flag, cvs.width / 1.13, cvs.height / 1.33, cvs.width / 10, cvs.height / 5);
    ctx.font = "25px Georgia";
    ctx.fillText(`Puan: ${game.SCORE}`, 20, 50);
    ctx.fillText(`En yüksek puan: ${game.BEST_SCORE}`, 20, 80);
    var result = loseCheck();
    if (result) return;
    result = winCheck();
    if (result) return;
    gravityCheck();
    parachuteCheck();
    requestAnimationFrame(draw);
}
document.addEventListener("keyup", function (e) {
    var button = e.key.toUpperCase();
    if (!data.hasOwnProperty(button)) {
        e.preventDefault();
        return;
    }
    if (e.key === 'İ' || e.key === 'i') {
        button = 'İ';
    }
    for (let i = 0; i < paras.length; i++) {
        if (data[button] === paras[i].rand) {
            mcQueen.speed += cvs.width / 40;
            game.SCORE += scoreInc;
            scoreInc += 0.25;
            backG.gravity += 0.1;
            paras[i].x = Math.floor(Math.random() * 10) * 75;
            paras[i].y = Math.floor(Math.random() * cvs.height / 20) - paras[i].height / 2;
            paras[i].rand = random();
            paraImg[i].src = "images/p" + paras[i].rand + ".png";
            return;
        }
    }
    mcQueen.speed -= cvs.width / 15;
    game.SCORE -= 5;
    backG.gravity += 0.01;
    return;
}
);

function random() {
    var rand = Math.floor(Math.random() * 32);
    return rand;
}
function loseCheck() {
    if (game.COUNTER >= 5 || mcQueen.speed < -cvs.width / 3) {
        ctx.fillText(`KAYBETTİNİZ PUANINIZ: ${game.SCORE}`, cvs.width / 2.5, cvs.height / 8);
        ctx.fillText(`YENİDEN OYNAMAK İÇİN EKRANA TIKLAYIN`, cvs.width / 2.9, cvs.height / 5.5);
        lose.play();
        if (game.SCORE > game.BEST_SCORE) {
            localStorage.setItem('bestScore', game.SCORE);
            game.BEST_SCORE = localStorage.getItem('bestScore');
        } 
        again();
        return true;
    }
    else return false;
}
function winCheck() {
    if (mcQueen.speed >= cvs.width / 1.2) {
        ctx.fillText(`KAZANDINIZ PUANINIZ: ${game.SCORE}`, cvs.width / 2.5, cvs.height / 6);
        ctx.drawImage(cup, cvs.width / 2.5, cvs.height / 5.5, cvs.width / 5, cvs.height / 3);
        win.play();
        if (game.SCORE > game.BEST_SCORE) {
            localStorage.setItem('bestScore', game.SCORE);
            game.BEST_SCORE = localStorage.getItem('bestScore');
        }
        again();
        return true;
    } else return false;
}
function parachuteCheck() {
    for (let i = 0; i < paras.length; i++) {
        if (paras[i].y > cvs.height / 1.35) {
            paras[i].x = Math.floor(Math.random() * 10) * 75;
            paras[i].y = Math.floor(Math.random() * cvs.height / 20) - paras[i].height / 2;
            game.COUNTER++;
            game.SCORE -= 7.5;
            paras[i].rand = random();
            paraImg[i].src = "images/p" + paras[i].rand + ".png";
        }
        ctx.fillText(`Kalan can: ${5 - game.COUNTER}`, cvs.width / 1.2, 50);
    }
}
function gravityCheck() {
    for (let i = 0; i < paras.length; i++) {
        ctx.drawImage(paraImg[i], paras[i].x, paras[i].y, paras[i].width, paras[i].height);
        paras[i].y += backG.gravity;
    }
}
function again() {
    document.addEventListener('click', function (e) {
        location.reload();
    })
}

