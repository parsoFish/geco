//Aliases
var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Graphics = PIXI.Graphics,
    Sprite = PIXI.Sprite;

sounds.load([
    "sounds/1.wav", 
    "sounds/2.wav",
    "sounds/3.wav",
    "sounds/4.wav",
    "sounds/5plus.wav",
    "sounds/down.wav",
    "sounds/up.wav",
    "sounds/spin.wav",
    "sounds/ambience.wav"
]);

var oneSound, twoSound, threeSound, fourSound, fiveSound, downSound, upSound, spinSound, ambience;

sounds.whenLoaded = soundsetup;

var state=standby;
var tileSize = Math.floor(window.innerWidth/8);
//Create a Pixi stage and renderer and add the 
//renderer.view to the DOM
var stage = new Container(),
    renderer = autoDetectRenderer(256, 256);
renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
renderer.autoResize = true;
renderer.resize(window.innerWidth, window.innerHeight);
renderer.backgroundColor = 0x061639;
document.body.appendChild(renderer.view);

//load an image and run the `setup` function when it's done
loader
      .add("images/slots.json")
      .load(setup);
var spinRect, downRect, upRect;
var topLine, midLine, botLine, upLine1, upLine2, downLine1, downLine2;
var upGroup = new Container();
var downGroup = new Container();
var apple, banana, bar, cherry, grape, lemon, orange, watermelon;
var topArr = [], midArr = [], botArr = [], upArr = [], downArr = [];
var reel1 = [1,5,2,1,6,5,8,5,1,2,3,7,4,5,8,1,4,3,2,5,6];
var reel2 = [5,1,6,3,7,8,1,3,2,4,6,8,5,4,5,3,8,7,5,4,1,7,4,8,4];
var reel3 = [8,4,1,3,2,6,7,2,3,4,1,5,6,7,8,2,5,4,3,1,2,7,6,7,1,4,3,2,4];
var reel4 = [1,7,4,2,3,8,4,3,2,5,6,7,2,3,4,5,8,1,2,6,2,4,2,6,3,7,8,4,6,2,3,1,2,5,6,3,4];
var reel5 = [8,5,1,8,5,1];
var slotsArr = [reel1, reel2, reel3, reel4, reel5];
var tiles1 = [];
var tiles2 = [];
var tiles3 = [];
var tiles4 = [];
var tiles5 = [];
var tileArr = [tiles1,tiles2,tiles3,tiles4,tiles5];
var counter;
var winAmount = 0, balance = 100, bet = 1;
var reel1Counter = reel1.length-1, 
    reel2Counter = reel2.length-1, 
    reel3Counter = reel3.length-1, 
    reel4Counter = reel4.length-1, 
    reel5Counter = reel5.length-1;
var winText, betText, balanceText;
var executed = false;

function soundsetup(){
    oneSound = sounds["sounds/1.wav"];
    twoSound = sounds["sounds/2.wav"];
    threeSound = sounds["sounds/3.wav"];
    fourSound = sounds["sounds/4.wav"];
    fiveSound = sounds["sounds/5plus.wav"];
    downSound = sounds["sounds/down.wav"];
    upSound = sounds["sounds/up.wav"];
    spinSound= sounds["sounds/spin.wav"];
    ambience = sounds["sounds/ambience.wav"];
    ambience.play();
    ambience.loop = true;
    ambience.volume = 0.2;
}

function setup() {
    
    id = resources["images/slots.json"].textures;
    for (var i=0; i<slotsArr.length; i++){
        var yOffset = (slotsArr[i].length - 3) * tileSize;
        for(var j=0; j<slotsArr[i].length; j++)
            switch(slotsArr[i][j]){
                case 1:
                    apple = new Sprite(id["apple.png"]);
                    stage.addChild(apple);
                    apple.y = 50 + j*tileSize - yOffset;
                    apple.x = 50 + i*tileSize;
                    apple.width = tileSize;
                    apple.height = tileSize;
                    stage.addChild(apple);
                    tileArr[i].push(apple);
                break;
                case 2:
                    banana = new Sprite(id["banana.png"]);
                    stage.addChild(banana);
                    banana.y = 50 + j*tileSize - yOffset;
                    banana.x = 50 + i*tileSize;
                    banana.width = tileSize;
                    banana.height = tileSize;
                    stage.addChild(banana);
                    tileArr[i].push(banana);
                break;
                case 3:
                    cherry = new Sprite(id["cherry.png"]);
                    stage.addChild(cherry);
                    cherry.y = 50 + j*tileSize - yOffset;
                    cherry.x = 50 + i*tileSize;
                    cherry.width = tileSize;
                    cherry.height = tileSize;
                    stage.addChild(cherry);
                    tileArr[i].push(cherry);
                break;
                case 4:
                    grape = new Sprite(id["grape.png"]);
                    stage.addChild(grape);
                    grape.y = 50 + j*tileSize - yOffset;
                    grape.x = 50 + i*tileSize;
                    grape.width = tileSize;
                    grape.height = tileSize;
                    stage.addChild(grape);
                    tileArr[i].push(grape);
                break;
                case 5:
                    lemon = new Sprite(id["lemon.png"]);
                    stage.addChild(lemon);
                    lemon.y = 50 + j*tileSize - yOffset;
                    lemon.x = 50 + i*tileSize;
                    lemon.width = tileSize;
                    lemon.height = tileSize;
                    stage.addChild(lemon);
                    tileArr[i].push(lemon);
                break;
                case 6:
                    orange = new Sprite(id["orange.png"]);
                    stage.addChild(orange);
                    orange.y = 50 + j*tileSize - yOffset;
                    orange.x = 50 + i*tileSize;
                    orange.width = tileSize;
                    orange.height = tileSize;
                    stage.addChild(orange);
                    tileArr[i].push(orange);
                break;
                case 7:
                    watermelon = new Sprite(id["watermelon.png"]);
                    stage.addChild(watermelon);
                    watermelon.y = 50 + j*tileSize - yOffset;
                    watermelon.x = 50 + i*tileSize;
                    watermelon.width = tileSize;
                    watermelon.height = tileSize;
                    stage.addChild(watermelon);
                    tileArr[i].push(watermelon);
                break;
                case 8:
                    bar = new Sprite(id["bar.png"]);
                    stage.addChild(bar);
                    bar.y = 50 + j*tileSize - yOffset;
                    bar.x = 50 + i*tileSize;
                    bar.width = tileSize;
                    bar.height = tileSize;
                    stage.addChild(bar);
                    tileArr[i].push(bar);
                break;
            }
    }
    //setup top and bottom bars
    var topRect = new Graphics();
    topRect.beginFill(0x000000);
    topRect.drawRect(50, 0, tileSize*5, 50);
    topRect.endFill();
    stage.addChild(topRect);
    var botRect = new Graphics();
    botRect.beginFill(0x000000);
    botRect.drawRect(50, tileSize*3+50, tileSize*5, 300);
    botRect.endFill();
    stage.addChild(botRect);
    
    //setup the spin button and text
    spinRect = new Graphics();
    spinRect.beginFill(0xFFFFFF);
    spinRect.drawRect(50+tileSize*5-tileSize*0.75, 50 + tileSize*3, tileSize*0.75, 50);
    spinRect.endFill();
    spinRect.interactive = true;
    spinRect.buttonMode = true;
    spinRect.on('pointerdown', onSpin)
    stage.addChild(spinRect);
    var spinText = new PIXI.Text('SPIN');
    spinText.x = 50+tileSize*5-tileSize*0.75;
    spinText.y = 50 + tileSize*3;
    spinText.width = tileSize*0.75;
    spinText.height = 50;
    stage.addChild(spinText);
    
    winRect = new Graphics();
    winRect.beginFill(0xFFFFFF);
    winRect.drawRect(50+tileSize*1.5, 0, tileSize*2, 50);
    winRect.endFill();
    stage.addChild(winRect);
    winText = new PIXI.Text('Win: $0');
    winText.x = 50+tileSize*1.5;
    winText.y = 0;
    winText.width = tileSize*2;
    winText.height = 50;
    stage.addChild(winText);
    
    betRect = new Graphics();
    betRect.beginFill(0xFFFFFF);
    betRect.drawRect(50, 50+tileSize*3, tileSize*0.75, 50 );
    betRect.endFill();
    stage.addChild(betRect);
    betText = new PIXI.Text('Bet: $1');
    betText.x = 50;
    betText.y = 50 + tileSize*3;
    betText.width = tileSize*0.75;
    betText.height = 50;
    stage.addChild(betText);
    
    downRect = new Graphics();
    downRect.beginFill(0xFFFFFF);
    downRect.drawRect(50, 105+tileSize*3, tileSize*0.75/2-2, smallbuttons());
    downRect.endFill();
    downRect.interactive = true;
    downRect.buttonMode = true;
    downRect.on('pointerdown', downBet)
    stage.addChild(downRect);
    var downText = new PIXI.Text('Down');
    downText.x = 50;
    downText.y = 105+tileSize*3;
    downText.width = tileSize*0.75/2-2;
    downText.height = smallbuttons();
    stage.addChild(downText);
    
    upRect = new Graphics();
    upRect.beginFill(0xFFFFFF);
    upRect.drawRect(50+tileSize*0.75/2+2, 105+tileSize*3, tileSize*0.75/2-2, smallbuttons());
    upRect.endFill();
    upRect.interactive = true;
    upRect.buttonMode = true;
    upRect.on('pointerdown', upBet)
    stage.addChild(upRect);
    var upText = new PIXI.Text('Up');
    upText.x = 50+tileSize*0.75/2+2;
    upText.y = 105+tileSize*3;
    upText.width = tileSize*0.75/2-2;
    upText.height = smallbuttons();
    stage.addChild(upText);
    
    balanceRect = new Graphics();
    balanceRect.beginFill(0xFFFFFF);
    balanceRect.drawRect(50+tileSize*1.5, 50+tileSize*3, tileSize*2, 50);
    balanceRect.endFill();
    stage.addChild(balanceRect);
    balanceText = new PIXI.Text('Balance: $100');
    balanceText.x = 50+tileSize*1.5;
    balanceText.y = 50+tileSize*3;
    balanceText.width = tileSize*2;
    balanceText.height = 50;
    stage.addChild(balanceText);
    
    //setup winlines 
    topLine = new Graphics();
    topLine.lineStyle(8, 0xFFDF00, 1);
    topLine.moveTo(50, 50+tileSize/2);
    topLine.lineTo(50+tileSize*5, 50+tileSize/2);
    stage.addChild(topLine);
    
    midLine = new Graphics();
    midLine.lineStyle(8, 0xFFDF00, 1);
    midLine.moveTo(50, 50+tileSize/2+tileSize);
    midLine.lineTo(50+tileSize*5, 50+tileSize/2+tileSize);
    stage.addChild(midLine);
    
    botLine = new Graphics();
    botLine.lineStyle(8, 0xFFDF00, 1);
    botLine.moveTo(50, 50+tileSize/2+tileSize*2);
    botLine.lineTo(50+tileSize*5, 50+tileSize/2+tileSize*2);
    stage.addChild(botLine);
    
    upLine1 = new Graphics();
    upLine1.lineStyle(8, 0xFFDF00, 1);
    upLine1.moveTo(50, 50+tileSize*3);
    upLine1.lineTo(50+(tileSize*5/2), 50+tileSize/2);
    
    upLine2 = new Graphics();
    upLine2.lineStyle(8, 0xFFDF00, 1);
    upLine2.moveTo(50+(tileSize*5/2), 50+tileSize/2);
    upLine2.lineTo(50+tileSize*5, 50+tileSize*3);
    
    downLine1 = new Graphics();
    downLine1.lineStyle(8, 0xFFDF00, 1);
    downLine1.moveTo(50, 50);
    downLine1.lineTo(50+(tileSize*5/2), 50+tileSize/2+tileSize*2);
    
    downLine2 = new Graphics();
    downLine2.lineStyle(8, 0xFFDF00, 1);
    downLine2.moveTo(50+(tileSize*5/2), 50+tileSize/2+tileSize*2);
    downLine2.lineTo(50+tileSize*5, 50);
    
    upGroup.addChild(upLine1);
    upGroup.addChild(upLine2);
    stage.addChild(upGroup)
    downGroup.addChild(downLine1);
    downGroup.addChild(downLine2);
    stage.addChild(downGroup);
    
    state = standby;
    gameloop();
  renderer.render(stage);
}

function gameloop(){
    requestAnimationFrame(gameloop)
    state();
    renderer.render(stage);
}
function spin() {
    setTimeout(stopSpin, 4000);
    spinRect.interactive = false;
    for(var i=0;i<tileArr.length;i++){
        reelSpeed = Math.ceil(randomInt(tileSize/10,tileSize/5));
        tileArr[i].forEach(function(tile){
        tile.y += reelSpeed;
        if(tile.y>=50+tileSize*3){
            tile.y -= tileArr[i].length*tileSize
            switch(i){
                case 0:
                    reel1Counter--;
                    if(reel1Counter<0){
                        reel1Counter=reel1.length-1;
                    }
                break;
                case 1:
                    reel2Counter--;
                    if(reel2Counter<0){
                        reel2Counter=reel2.length-1;
                    }
                break;
                case 2:
                    reel3Counter--;
                    if(reel3Counter<0){
                        reel3Counter=reel3.length-1;
                    }
                break;
                case 3:
                    reel4Counter--;
                    if(reel4Counter<0){
                        reel4Counter=reel4.length-1;
                    }
                break;
                case 4:
                    reel5Counter--;
                    if(reel5Counter<0){
                        reel5Counter=reel5.length-1;
                    }
                break;
                }
            }
        });
    }
}

function onSpin(){
    if(bet<=balance){
        spinSound.play();
        state = spin;
        topLine.visible = false;
        midLine.visible = false;
        botLine.visible = false;
        upGroup.visible = false;
        downGroup.visible = false;
        botArr.length = 0;
        upArr.length = 0;
        midArr.length = 0;
        downArr.length = 0;
        topArr.length = 0;
        winAmount = 0;
        winText.text = "Win: $0"
        balance -= bet;
        balanceText.text = "Balance: $" + balance;
        executed = false;
        counter = 0;
    }
}

function stopSpin(){
    state = stopSpin;
    for(var i=0;i<tileArr.length;i++){
        
        reelSpeed = 1;
        tileArr[i].forEach(function(tile){
            if((tile.y-50)%tileSize!=0)
            tile.y += reelSpeed;
            if(tile.y>=50+tileSize*3){
                tile.y -= tileArr[i].length*tileSize
                counter++;
                switch(i){
                    case 0:
                        reel1Counter--;
                        if(reel1Counter<0){
                            reel1Counter=reel1.length-1;
                        }
                    break;
                    case 1:
                        reel2Counter--;
                        if(reel2Counter<0){
                            reel2Counter=reel2.length-1;
                        }
                    break;
                    case 2:
                        reel3Counter--;
                        if(reel3Counter<0){
                            reel3Counter=reel3.length-1;
                        }
                    break;
                    case 3:
                        reel4Counter--;
                        if(reel4Counter<0){
                            reel4Counter=reel4.length-1;
                        }
                    break;
                    case 4:
                        reel5Counter--;
                        if(reel5Counter<0){
                            reel5Counter=reel5.length-1;
                        }
                    break;
                }
            }
        });
    }
    if(counter>=5){
        checkwins();
    }    
}

function checkwins(){
    state = standby; 
    if(!executed){
        executed = true;
        for (var i=0;i<slotsArr.length; i++){
            switch(i){
                case 0:
                    var temp1 = reel1Counter-1;
                    if(temp1<0){
                        temp1 = reel1.length-1;
                    }
                    var temp2 = temp1-1;
                    if(temp2<0){
                        temp2 = reel1.length-1;
                    }
                    botArr.push(slotsArr[i][reel1Counter]);
                    upArr.push(slotsArr[i][reel1Counter]);
                    midArr.push(slotsArr[i][temp1]);
                    topArr.push(slotsArr[i][temp2]);
                    downArr.push(slotsArr[i][temp2]);
                break;
                case 1:
                    var temp1 = reel2Counter-1;
                    if(temp1<0){
                        temp1 = reel2.length-1;
                    }
                    var temp2 = temp1-1;
                    if(temp2<0){
                        temp2 = reel2.length-1;
                    }
                    botArr.push(slotsArr[i][reel2Counter]);
                    upArr.push(slotsArr[i][temp1]);
                    midArr.push(slotsArr[i][temp1]);
                    topArr.push(slotsArr[i][temp2]);
                    downArr.push(slotsArr[i][temp1]);
                break;
                case 2:
                    var temp1 = reel3Counter-1;
                    if(temp1<0){
                        temp1 = reel3.length-1;
                    }
                    var temp2 = temp1-1;
                    if(temp2<0){
                        temp2 = reel3.length-1;
                    }
                    botArr.push(slotsArr[i][reel3Counter]);
                    upArr.push(slotsArr[i][temp2]);
                    midArr.push(slotsArr[i][temp1]);
                    topArr.push(slotsArr[i][temp2]);
                    downArr.push(slotsArr[i][reel3Counter]);
                break;
                case 3:
                    var temp1 = reel4Counter-1;
                    if(temp1<0){
                        temp1 = reel4.length-1;
                    }
                    var temp2 = temp1-1;
                    if(temp2<0){
                        temp2 = reel4.length-1;
                    }
                    botArr.push(slotsArr[i][reel4Counter]);
                    upArr.push(slotsArr[i][temp1]);
                    midArr.push(slotsArr[i][temp1]);
                    topArr.push(slotsArr[i][temp2]);
                    downArr.push(slotsArr[i][temp1]);
                break;
                case 4:
                    var temp1 = reel5Counter-1;
                    if(temp1<0){
                        temp1 = reel5.length-1;
                    }
                    var temp2 = temp1-1;
                    if(temp2<0){
                        temp2 = reel5.length-1;
                    }
                    botArr.push(slotsArr[i][reel5Counter]);
                    upArr.push(slotsArr[i][reel5Counter]);
                    midArr.push(slotsArr[i][temp1]);
                    topArr.push(slotsArr[i][temp2]);
                    downArr.push(slotsArr[i][temp2]);
                break;
            }
        }
        for (var i=0; i<8; i++){
            var botCounter = 0;
            var upCounter = 0;
            var midCounter = 0;
            var downCounter = 0;
            var topCounter = 0;
            for (var j=0; j<5; j++){
                if(botArr[j]==i+1){
                    botCounter++;
                }
                if(j==4&&botCounter>=3){
                    showWin(botCounter, i, "bot")
                }
                if(upArr[j]==i+1){
                    upCounter++;
                }
                if(j==4&&upCounter>=3){
                    showWin(upCounter, i, "up")
                }
                if(midArr[j]==i+1){
                    midCounter++;
                }
                if(j==4&&midCounter>=3){
                    showWin(midCounter, i, "mid")
                }
                if(downArr[j]==i+1){
                    downCounter++;
                }
                if(j==4&&downCounter>=3){
                    showWin(downCounter, i, "down")
                }
                if(topArr[j]==i+1){
                    topCounter++;
                }
                if(j==4&&topCounter>=3){
                    showWin(topCounter, i, "top")
                }
            }
        }
    }
}

function showWin(count, value, line){
    var threeOfAKind = [250,200,150,100,90,80,70,60];
    var fourOfAKind = [500,450,400,350,300,250,200,100];
    var fiveOfAKind = [1000,800,700,600,700,600,500,400];
    switch(line){
        case "bot":
            botLine.visible = true; 
        break;
        case "up":
            upGroup.visible = true;
        break;
        case "mid":
            midLine.visible = true; 
        break;
        case "down":
            downGroup.visible = true; 
        break;
        case "top":
            topLine.visible = true; 
        break;
               }
    if(count>=3){
        switch(value){
            case 0:
                oneSound.play();
            break;
            case 1:
                twoSound.play();
            break;
            case 2:
                threeSound.play();
            break;
            case 3:
                fourSound.play();
            break;
            case 4:
                fiveSound.play();
            break;
            case 5:
                fiveSound.play();
            break;
            case 6:
                fiveSound.play();
            break;
            case 7:
                fiveSound.play();
            break;
                    }
    }
    switch(count){
        case 3:
            winAmount += threeOfAKind[value]*bet;
        break;
        case 4:
            winAmount += fourOfAKind[value]*bet;
        break;
        case 5:
            winAmount += fiveOfAKind[value]*bet;
        break;
    }
    winText.text = "Win: $" + winAmount;
    balance += winAmount;
    balanceText.text = "Balance: $" + balance;
}

function standby(){
    setTimeout(function(){
        spinRect.interactive = true;
    },3500);
}

function downBet(){
    downSound.play();
    if(bet>1){
        bet--;
        betText.text = "Bet: $" + bet;
    }
}

function upBet(){
    upSound.play();
    if(bet<balance){
        bet++;
        betText.text = "Bet: $" + bet;
    }
}


function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function smallbuttons(){
    var temp = tileSize/3;
    if (temp>50){
        temp = 50;
    }
    return temp;
}