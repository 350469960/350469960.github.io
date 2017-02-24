(function () {
    window.Pipe = Class.extend({
       init:function () {
           /*管道开口的方向 0向下  1向上*/
           this.dir = _.random(0,1);
           this.width = 148;
           this.height = _.random(80,game.canvas.height/2);
           this.x = game.canvas.width;
           this.y = this.dir==0 ? 0 : game.canvas.height - this.height -48;
           this.speed = 3;

       },
        update:function () {
           this.x -= this.speed;
           /*优化处理  清除管道*/
           if(this.x < -this.width){
               game.pipeArr = _.without(game.pipeArr,this);
           }
           /*鸟与管道的碰撞处理*/
         /*  if((game.bird.x < this.x + this.width) && (game.bird.x > this.x - game.bird.width)){
               if(this.dir == 0){//口向下
                    if(game.bird.y < this.height){
                        game.gameOver();
                    }
               }else if(this.dir == 1){口向上
                    if(game.bird.y > this.y - game.bird.height){
                   game.gameOver();
                    }
               }
           }*/
            if((game.bird.x < this.x + this.width) && (game.bird.x > this.x - game.bird.width)){
                if(this.dir == 0){
                    if(game.bird.y<this.height){
                        game.gameOver();
                    }
                }else if(this.dir == 1){
                    if(game.bird.y>this.y-game.bird.height){
                        game.gameOver();
                    }
                }
            }

        },
        render:function () {
            if(this.dir==0){
                game.context.drawImage(game.allImageObj['pipe1'],0,1664-this.height,this.width,this.height,this.x,this.y,this.width,this.height);
            }else if(this.dir==1){
                game.context.drawImage(game.allImageObj['pipe0'],0,0,this.width,this.height,this.x,this.y,this.width,this.height);
            }
        },
        pause:function () {
            this.speed = 0;
        }
    });
})();