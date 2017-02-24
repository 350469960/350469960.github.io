(function () {
    window.Bird = Class.extend({
       init:function () {
          this.x = game.canvas.width * 0.5;
          this.y = 100;
          this.width = 85;
          this.height = 60;
          /*鸟的状态  合法值0，1，2  */
          this.swingState = 0;
          /*鸟挥翅的频率*/
          this.swingRate = 5;
          /*下落的增量*/
          this.dY = 0;
          /*下落的帧数*/
           this.drop = game.frameUtil.currentFrame ;
          /*旋转角度*/
          this.rotateAngle = 0;
          /*鸟的飞行状态 0向下掉  1向上飞*/
          this.state = 0;
          /*空气阻力*/
          this.deltaY = 0;
          /*监听事件的调用*/
          this.birdClickListen();
            /*鸟的死亡状态*/
            this.die = false;
            /*鸟死亡动画的下标*/
            this.dieAnimationIndex = 0;
       },
        update:function () {
           if(this.die){
               this.dieAnimationIndex ++;
               if(this.dieAnimationIndex == 30){
                   game.pause();
               }
               return;
           }
            /*鸟煽动翅膀*/
            if(game.frameUtil.currentFrame % this.swingRate == 0){
                /*挥动翅膀的状态*/
                this.swingState ++ ;
                /*判断*/
                if(this.swingState > 2){
                    this.swingState = 0;
                }
            }
            /*判断鸟飞行的状态*/
            if(this.state == 0){//向下落
                /*自由落体*/
                //下落高度: h= 1/2 *g*Math.pow(t, 2)
                this.dY = 0.001 * 0.5 * 9.8 * Math.pow(game.frameUtil.currentFrame -  this.drop,2);
                //console.log(game.frameUtil.currentFrame -  this.drop);
                /*增加旋转角度*/
                this.rotateAngle += 1;
            }else if(this.state == 1){//向上飞
                /*阻力累加*/
                this.deltaY ++;
                /*增量*/
                this.dY = -15 + this.deltaY;
                /*判断*/
                if(this.dY >= 0){
                    /*更改状态*/
                    this.state = 0
                    /*更改下落的帧数*/
                    this.drop = game.frameUtil.currentFrame;
                }
            }
            /*更新y值*/
            this.y += this.dY;

            /*禁空*/
            if(this.y<0){
                this.y = 0;
            }
            /*触碰地板死亡*/
            if(this.y > (game.canvas.height - 48 - this.height)){
                game.gameOver();
            }

        },
        render:function () {
            /*判断鸟是否死亡  死亡则抛热血，游戏结束！*/
           if(this.die){
                var sWidth = 325,sHeight = 138;
                var row = parseInt(this.dieAnimationIndex / 5);
                var col = this.dieAnimationIndex % 5;
                game.context.drawImage(game.allImageObj['blood'],col * sWidth,row*sHeight,sWidth,sHeight,this.x-100,this.y,sWidth,sHeight);
                game.context.drawImage(game.allImageObj['gameover'],(game.canvas.width-626)*0.5,(game.canvas.height-144)*0.5);
                return;
           }

            game.context.save();
            game.context.translate(this.x + this.width* 0.5,this.y + this.height * 0.5);
            game.context.rotate(this.rotateAngle * Math.PI /180);
            game.context.translate(-(this.x + this.width* 0.5),-(this.y + this.height * 0.5));
            game.context.drawImage(game.allImageObj['bird'],this.swingState * this.width,0,this.width,this.height,this.x,this.y,this.width,this.height);
            game.context.restore();
        },
        birdClickListen:function () {
           /*备份指针*/
           var self = this;
            game.canvas.addEventListener('mousedown',function () {
                /*更改飞行状态*/
                self.state = 1;
                /*飞行的角度*/
                self.rotateAngle = -25;
                /*空气阻力归一*/
                self.deltaY = 1;
            });
        }
    });
})();
