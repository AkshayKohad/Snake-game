


//pen.fillRect()







function init(){
// Initialization of game
canvas = document.getElementById("mycanvas")

H=canvas.height = 1000
W=canvas.width = 1000
// Canvas is used to draw graphics
pen =  canvas.getContext('2d')
cs = 65;
game_over = false;
score = 5;
//Create a Image Object for food
// inbuilt Image object present in javascript
food_img = new Image();
food_img.src = "Assets/apple.png";

//create a Trophy image
trophy_img = new Image();
trophy_img.src = "Assets/trophy.png"

food = getRandomFood();

snake = {
    init_len:5,
    color:"blue",
    cells:[],
    direction:"right",
     
    createSnake:function(){
        for(var i=1;i<=this.init_len;i++)
        {
            this.cells.push({x:i,y:0})
        }
    },
    drawSnake:function(){
      for(var i=0;i<this.cells.length;i++)
      {
          pen.fillStyle = this.color
        pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2)
      }
    },

    updateSnake:function(){
       // console.log("Updating snake")

// checking if snake is eating food or not, if eating then need to increase it's length
var headX = this.cells[this.cells.length-1].x;
        var headY = this.cells[this.cells.length-1].y;

        if(headX==food.x && headY==food.y)
        {
            //generate new food
            food = getRandomFood();
            score++;

        }
       // if above condition get satisfied then we don't need to remove cell as new cell will get added
        // else we will pop out cell for direction 
        else{
            this.cells.shift();
        }
    

       // Controlling direction of snake movements
        
        var headX = this.cells[this.cells.length-1].x;
        var headY = this.cells[this.cells.length-1].y;
        var nextX,nextY;
        if(this.direction=="right")
        {
        var nextX = headX+1;
        var nextY = headY;
        }

        else if(this.direction=="left")
        {
            var nextX = headX-1;
            var nextY = headY;
        }

        else if(this.direction=="up")
        {
            var nextX = headX;
            var nextY = headY-1;
        }

        else if(this.direction=="down")
        {
            var nextX = headX;
            var nextY = headY+1;
        }
        this.cells.push({x:nextX,y:nextY});


        // Logic that prevents snake from going out
        var X = this.cells[this.cells.length-1].x;
        var Y = this.cells[this.cells.length-1].y;
        if(X<0 || Y<0 || X*cs>W || Y*cs>H)
        {
            game_over=true;
           // clearInterval(f)
           
        }
    }
};

snake.createSnake();

//Add a event listner on the Document Object to control movement of snake
function keyPressed(e){
    console.log("Key Pressed",e.key)
   
    //Conditional Statements
    if(e.key=="ArrowRight")
    {
        snake.direction = "right"
    }

    else if(e.key=="ArrowLeft")
    {
       snake.direction = "left"
    }

    else if(e.key=="ArrowUp")
    {
       snake.direction = "up"
    }

    else if(e.key=="ArrowDown")
    {
       snake.direction = "down"
    }

}

document.addEventListener('keydown',keyPressed);

//game_over = false
// rect = {
//    x:20,
//     y:20,
//     w:40,
//     h:40,
//     speed:20,
// }


}

function draw(){
  pen.clearRect(0,0,W,H)

//pen.fillStyle = "red";
snake.drawSnake();
pen.fillStyle = food.color
// for food with normal block
//pen.fillRect(food.x*cs,food.y*cs,cs-2,cs-2);

// for food with image
pen.drawImage(food_img,food.x*cs,food.y*cs,cs-2,cs-2);


// for trophy image
pen.drawImage(trophy_img,18,20,cs,cs);
// To show score
pen.fillStyle = "blue";
pen.font = "20px Roboto" 
pen.fillText(score,50,50)
}

function update(){
    
//rect.x += rect.speed

//if(rect.x>W-rect.w || rect.x<0)
//rect.speed *=-1;

snake.updateSnake();
}


function getRandomFood(){
    var foodX = Math.round(Math.random()*(W-cs)/cs)
    var foodY = Math.round(Math.random()*(H-cs)/cs);

    var food = {
        x:foodX,
        y:foodY,
        color:"red",
    }

    return food;
}

// This loop should be called again and again
// until game is over
function gameloop(){
    if(game_over==true)
    {
        clearInterval(f);
         alert("game over")
    }
    draw();
    update();
}

init();
var f = setInterval(gameloop,100);


