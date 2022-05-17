

let canvas;
let context;

let fpsInterval = 1000/30; 
let now;
let then = Date.now();

let request_id;

let player = {
    x:256,
    y:160,
    width: 16,
    height:16,
    frameX:0,
    frameY:0,
    x_velocity:0,
    y_velocity:0,
    has_control : true,
    is_dashing : false,
    timer:0,
    hp:3



};

let backgroundImage = new Image();
backgroundImage.src = "TilesetFloor.png";

 let background = [
    [70,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,72],
    [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
    [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
    [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
    [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
    [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
    [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
    [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
    [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
    [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
    [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
    [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
    [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
    [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
    [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
    [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
    [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
    [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
    [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
    [90,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,92]
    ];
 let tileSize = 16;
 let tilesPerRow = 10;




let playerImage = new Image();
playerImage.src = "wombat.png";

let skeleton_image = new Image();
skeleton_image.src = "skeleton.png"

let ninja_image = new Image();
ninja_image.src = "ninja.png"

let zombat_image = new Image();
zombat_image.src = "zombat.png"

let enemies = [];
let spawn_timer = 0;
let kills = 0;

let move_speed = 2; //no real reason to have this be a variable, just makes it easier to adjust
let charge_speed = 30;

let key;
let move_left = false;
let move_right = false;
let move_up = false;
let move_down = false;

document.addEventListener("DOMContentLoaded", init, false);

function init() {
    
    
    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");

    document.addEventListener("keydown", activate, false);
    document.addEventListener("keyup", deactivate, false);

    

    draw()  
    
    
}

function activate(event) {
    if(player.has_control){
        if(event.key ===key && player.timer <=10){
            player.is_dashing = true;
            player.has_control = false;
        }
        
        key = event.key
        
        if (key === "ArrowRight"){
            move_left = false
            move_right = true
        }
        else if (key === "ArrowLeft"){
            move_left = true
            move_right = false
        }
        else if (key === "ArrowUp"){
            move_up = true
            move_down = false
        }
        else if (key === "ArrowDown"){
            move_up = false
            move_down = true
        };
    }
};

function deactivate(event) {
    let key = event.key
    player.timer = 0;
    if (key === "ArrowRight"){
        move_right = false
    }
    else if (key === "ArrowLeft"){
        move_left = false
    }
    else if (key === "ArrowUp"){
        move_up = false
    }
    else if (key === "ArrowDown"){
        move_down = false
    };
    
};

function randint(min,max)  {
    return Math.round(Math.random() * (max-min) + min)
}







function draw() {
    request_id = window.requestAnimationFrame(draw)

    let now = Date.now();
    let elapsed = now - then;
    if (elapsed <= fpsInterval) {
        return;
    }
    then = now - (elapsed % fpsInterval);


    
    context.clearRect(0,0,canvas.width,canvas.height);
    context.fillStyle = "red";
    context.fillRect(0,0,canvas.width,canvas.height);

    for(let r = 0;r<20;r+=1){
        for(let c=0; c<32;c+=1){
            let tile = background[r][c];
            if(tile >=0){
                let tileRow = Math.floor(tile/ tilesPerRow);
                let tileCol = Math.floor(tile%tilesPerRow);
                
                context.drawImage(backgroundImage,
                    tileCol * tileSize, tileRow * tileSize, tileSize, tileSize,
                    c * tileSize, r*tileSize, tileSize, tileSize);
                    
            }
        }
    }

    //context.fillRect(0,0,canvas.width,canvas.height);
    context.fillStyle = "white";
    


    //checking if player is dead
    if (player.hp <0){
        let body_element = document.querySelector("body");
        let new_element = document.createElement("p");
        body_element.appendChild(new_element);
        new_element.innerHTML="You survived " + Math.floor(spawn_timer*100/30)/100 + " seconds.\nYou killed " + kills + " of the undead."
        stop()
    }

    //enemy sprites go here
    for (let a of enemies) {
        if(a.ai_style === 0){
            context.drawImage(skeleton_image,
                a.frameX * a.width, a.frameY * a.height, a.width,a.height,
                a.x,a.y,a.width,a.height)
        }
        else if(a.ai_style === 1){
            context.drawImage(ninja_image,
                a.frameX * a.width, a.frameY * a.height, a.width,a.height,
                a.x,a.y,a.width,a.height)
        }
        else{
            context.drawImage(zombat_image,
                a.frameX * a.width, a.frameY * a.height, a.width,a.height,
                a.x,a.y,a.width,a.height)
        }
        
    };


    //player sprite goes here
    context.fillStyle = "cyan";
    //context.fillRect(player.x,player.y,player.width,player.height);
    context.drawImage(playerImage,
        player.frameX * player.width, player.frameY * player.height, player.width,player.height,
        player.x,player.y,player.width,player.height)
    player.frameX = 1;
    player.frameY =1;


        //              enemies             \\

    //incrementing the timer for spawns
    spawn_timer++;
    

    if(spawn_timer % 90<=0 || spawn_timer % 200>=198 || spawn_timer % 650>=647 || spawn_timer % 1100>=1095){
        let a = {
            x: randint(0,1)*canvas.width,
            y: randint(0,1)*canvas.height,
            width: 16,
            height: 16,
            frameX:0,
            frameY:0,
            x_velocity:0,
            y_velocity:0,
            is_alive : true,
            is_attacking : false,
            ai_style : randint(-1,3),
            attack_timer:0  
            
        }
        
        enemies.push(a)
        
    };


    for(let a of enemies){
        if(a.is_alive){
            AI(a)
        }
        
        if(player_collides(a)){
            a.is_alive = false;
            a.attack_timer = 0;
            kills +=1;
        }

        npc_animation(a)
            
    };

    //incrementing the timer for dashes
    player.timer++;
    
    animate_player()

    if(player.has_control){
        if(move_right){
            player.x_velocity += move_speed;
        }
        else if(move_left){
            player.x_velocity -= move_speed;
        };
        if(move_up){
            player.y_velocity -= move_speed;
        }
        else if (move_down) {
            player.y_velocity += move_speed;
        }

        //velocity and physics
        player.x_velocity *= 0.9
        player.y_velocity *= 0.9


        //rebounding off of walls
        if(player.x >= canvas.width -player.width || player.x <=0){
            player.x_velocity *= -1.7
        }
        if(player.y >= canvas.height -player.height|| player.y <=0){
            player.y_velocity *= -1.7
        }
    }
    else{
        
        //player.x_velocity = 0;
        //player.y_velocity = 0;
        
        if(player.is_dashing){
            if(move_right){
                player.x_velocity = charge_speed;
                player.y_velocity = 0;
            }
            else if(move_left){
                player.x_velocity = -charge_speed;
                player.y_velocity = 0;
            };
            if(move_up){
                player.y_velocity = -charge_speed;
                player.x_velocity = 0;
            }
            else if (move_down) {
                player.y_velocity = charge_speed;
                player.x_velocity = 0;
            }
        }

        if(player.x >= canvas.width -player.width || player.x <=0){
            player.x_velocity *= -0.5
            player.is_dashing = false;
            player.timer = 0;

            if(player.x >= canvas.width-player.width){
                player.x = canvas.width-player.width
            }
            else{
                player.x = 0
            }            
        }

        if(player.y >= canvas.height -player.height|| player.y <=0){
            player.y_velocity *= -0.5
            player.is_dashing = false;
            player.timer = 0;
            if(player.y >= canvas.height-player.height){
                player.y = canvas.height-player.height
            }
            else{
                player.y = 0
            }
        }

        if(player.is_dashing ===false && player.timer >= 5){
            player.has_control = true;
        }
    }


    //movement
    player.x += player.x_velocity
    player.y += player.y_velocity
}




function AI(a){
    if(a.ai_style === 0){           // zombie
        //moving towards player
        
        if(a.is_attacking != true){
            if(a.attack_timer>=90){
                a.is_attacking = true;
                a.attack_timer = 0;
            }
            else{
                //console.log(a.x, a.y, a.x_velocity, a.y_velocity)
                
                find_direction(a,player.x,player.y,2,0)
                
            }
        }
        //attacking
        else{
            if(a.attack_timer<=30){
                find_direction(a,player.x,player.y,-1,0)
            }
            else if(a.attack_timer ===31){  //turning it around so the turn resistance charges towards player instead of same direction
                find_direction(a,player.x,player.y,1,0)
            }
            else if(a.attack_timer >=31){
                find_direction(a,player.x,player.y,5,9999)
            }
            if(a.attack_timer>=90){
                a.is_attacking = false;
                a.attack_timer = 0;
            }
        }
    }
    else if(a.ai_style === 1){      //wolf ai
        if(a.attack_timer%180 >= 90){
            a.is_attacking = true;
            find_direction(a,player.x,player.y,5,10)
        }
        else{
            find_direction(a,player.x,player.y,1,0)
            a.is_attacking = false;
        }
    }
    else{
        if(a.is_attacking !=true && a.attack_timer >= 15){
            if(Math.abs(player.x - a.x) <= 8 || Math.abs(player.y - a.y) <= 8){
                a.is_attacking = true;
                find_direction(a,player.x,player.y,6,0)
            }
            else if(Math.abs(a.x - player.x) >=Math.abs(a.y - player.y) ){
                find_direction(a,a.x,player.y,2,0)
            }
            else{
                find_direction(a,player.x,a.y,2,0)
            }
        }
        else if (a.is_attacking ===true){       //copy of player charging code
            
            if(a.x >= canvas.width || a.x <=0){
                a.x_velocity *= -0.5
                a.is_attacking = false;
                a.timer = 0;
    
                if(a.x >= canvas.width){
                    a.x = canvas.width
                }
                else{
                    a.x = 0
                }            
            }
    
            if(a.y >= canvas.height || a.y <=0){
                a.y_velocity *= -0.5
                a.is_attacking = false;
                a.timer = 0;
                if(a.y >= canvas.height){
                    a.y = canvas.height
                }
                else{
                    a.y = 0
                }
            }
        }
        else{
            find_direction(a,player.x,player.y,2,0)
        }
    }




    a.attack_timer++;

    
    //moving the npc
    a.x += a.x_velocity;
    a.y += a.y_velocity;
}



function find_direction(npc, target_x, target_y, speed ,turnResistance)
        {
            
            let move_x = target_x-npc.x;
            let move_y = target_y-npc.y
            
            let hyp = Math.sqrt(Math.pow(move_x)+ Math.pow(move_y));
            if (hyp > speed)
            {
                move_x *= speed / hyp;
                move_y *= speed / hyp;
            }
            
            //turn resistance section adapted from an old c# project, which was origionally adapted from: https://youtu.be/oZDTyiv9aqo?t=1435
            //original github upload of code: https://github.com/FoolsLynx/TMMC/commit/18956f47cf7aa6adfe562aa8e4b30b655e49a85d at line 233
            move_x = (npc.x_velocity * turnResistance + move_x) / (turnResistance + 1);
            move_y = (npc.y_velocity * turnResistance + move_y) / (turnResistance + 1);
            
            
            hyp = Math.sqrt(Math.pow(move_x,2)+ Math.pow(move_y,2));
            
            
            
            {
                
                move_x *= speed / hyp;
                move_y *= speed / hyp;
            }
            
            
            //change the velocity
            npc.x_velocity = move_x;
            npc.y_velocity = move_y;
            
        }



        



function stop() {
    window.removeEventListener("keydown", activate, false);
    window.removeEventListener("keyup", deactivate, false);

    window.cancelAnimationFrame(request_id);
}


function player_collides(a) {
    if(a.is_alive){
        if (player.x + player.width < a.x || a.x +a.width < player.x
            || player.y + player.height < a.y || a.y +a.height < player.y) {
            return false
        } else {
            if(!player.is_dashing){
                player_hit()
            }
            return true

        }
    }
    else{
        return false
    }
}



function animate_player(){
    if(player.has_control){
        if(move_down){
            if(player.frameX === 0 && player.frameY === 1){
                player.frameX = 1;
            }
            else{
                player.frameX = 0;
                player.frameY = 2;
            }
        }
        else if(move_up){
            if(player.frameX === 1 && player.frameY === 1){
                player.frameX = 2;
            }
            else{
                player.frameX = 1;
                player.frameY = 1;
            }
        }
        
        else if(move_right){
            if(player.frameX === 0 && player.frameY === 0){
                player.frameX = 1;
            }
            else{
                player.frameX = 0;
                player.frameY = 0;
            }
        }
        else if(move_left){
            if(player.frameX === 0 && player.frameY === 1){
                player.frameX = 2;
                player.frameY = 0;
            }
            else{
                player.frameX = 0;
                player.frameY = 1;
            }
        }
    }
    else{
        if(player.frameX === 2){
            player.frameX =0;
            player.frameY = 3;

        }
        else if(player.frameY = 3){
            player.frameX = 1;
        }
        else{
            player.frameX = 2;
            player.frameY = 2;
        }
    }

}

function npc_animation(a){
    if(a.ai_style ===1 || a.ai_style ===0){
        if(a.is_alive){
            if(Math.abs(a.x_velocity) > Math.abs(a.y_velocity)){
                if(a.x_velocity > 0){
                    a.frameX = 3
                }
                else{
                    a.frameX = 2
                }
            }
            else{
                if(a.y_velocity > 0){
                    a.frameX = 0
                }
                else{
                    a.frameX = 1
                }
            }
            a.frameY = (a.frameY +1)%6;
        }
        else{
            a.frameX = 0;
            a.frameY = 6;
            a.attack_timer++;
            if(a.attack_timer >= 120){
                a.frameX = 9;
            }
        }
    }else{
        if(a.is_alive){
            if(!a.is_attacking){
                if(Math.abs(a.x_velocity) > Math.abs(a.y_velocity)){
                    if(a.x_velocity > 0){
                        a.frameX = (a.frameX+1) %2
                        a.frameY = 0
                    }
                    else{
                        if(a.frameY = 0){
                            a.frameY = 1;
                            a.frameX = 0;
                        }else{
                            a.frameY = 0;
                            a.frameX = 2;

                        }
                    }
                }
                else{
                    if(a.y_velocity > 0){
                        a.frameY = 2
                        a.frameX = (a.frameX +1 ) %2
                    }
                    else{
                        a.frameY = 1
                        a.frameX = a.frameX %2 +1
                    }
                }
            }else{
                if(a.frameX === 2 && a.frameY ===2){
                    a.frameX = 0
                    a.frameY = 3
                }
                else if(a.frameX === 0 && a.frameY ===3){
                    a.frameX++;
                }
                else{
                    a.frameX = 2;
                    a.frameY = 2;
                }
            }
            
        }
        else{
            a.frameX = 2;
            a.frameY = 3;
            a.attack_timer++;
            if(a.attack_timer >= 120){
                a.frameX = 9;
            }
        }

    }
    
}
function player_hit(){
    if( player.hp ===3){
        player.hp -= 1;
        background = [
            [70,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,72],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,-1,-1,-1,-1,-1,-1,-1,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,-1,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,-1,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,-1,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,-1,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,-1,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,-1,-1,-1,-1,-1,-1,-1,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,-1,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,-1,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,-1,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,-1,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,-1,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,-1,-1,-1,-1,-1,-1,-1,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
            [90,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,92]
            ];
    }else if(player.hp ===2){
        player.hp -= 1;
        background = [
            [70,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,72],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,-1,-1,-1,-1,-1,-1,-1,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,-1,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,-1,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,-1,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,-1,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,-1,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,-1,-1,-1,-1,-1,-1,-1,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,-1,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,-1,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,-1,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,-1,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,-1,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,-1,-1,-1,-1,-1,-1,-1,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
            [90,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,92]
            ];
    }else if(player.hp ===1){
        player.hp -= 1;
        background = [
            [70,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,72],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,-1,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,-1,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,-1,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,-1,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,-1,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,-1,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,-1,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,-1,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,-1,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,-1,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,-1,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,-1,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,-1,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
            [90,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,92]
            ];
    }else if(player.hp ===0){
        player.hp -= 1;
        background = [
            [70,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,72],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,-1,-1,-1,-1,81,81,-1,81,81,81,-1,81,-1,81,81,-1,-1,-1,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,-1,81,81,81,81,-1,81,-1,81,-1,81,-1,81,-1,81,-1,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,-1,81,-1,-1,81,-1,-1,-1,81,-1,81,-1,81,-1,81,-1,-1,-1,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,-1,81,81,-1,81,-1,81,-1,81,-1,81,-1,81,-1,81,-1,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,-1,-1,-1,-1,81,-1,81,-1,81,-1,81,-1,81,-1,81,-1,-1,-1,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,-1,-1,-1,81,-1,81,-1,81,-1,-1,-1,81,-1,-1,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,-1,81,-1,81,-1,81,-1,81,-1,81,81,81,-1,81,-1,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,-1,81,-1,81,-1,81,-1,81,-1,-1,-1,81,-1,-1,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,-1,81,-1,81,-1,81,-1,81,-1,81,81,81,-1,81,-1,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,-1,-1,-1,81,81,-1,81,81,-1,-1,-1,81,-1,81,-1,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
            [80,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,81,82],
            [90,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,92]
            ];
            
    }
    
}