(function () {
    /*全局的游戏类*/
    window.Game = Class.extend({
        /*初始化*/
       init:function (option) {
           option = option || {};
           var self = this;
           this.fps = option.fps || 50;

           /*实例化帧工具类*/
           this.frameUtil = new FrameUtil();
           /*获取上下文*/
           this.canvas = document.getElementById(option.canvasId);
           this.context = this.canvas.getContext('2d');

           this.allImageObj = {};

           /*实例化图片加载工具类*/
           this.staticSourceUtil = new StaticSourceUtil();
           this.staticSourceUtil.loadImage('r.json',function (allImageObj,allImageCount,loadImageCount) {
              if(allImageCount == loadImageCount){
                  self.allImageObj = allImageObj;
                  self.run();
              }
           });
           /*记录游戏的状态*/
           this.isGameOver = false;
       },
        /*游戏运行*/
        run:function () {
            /*备份指针*/
           var self = this;
           /*设置定时器*/
            this.timer = setInterval(function () {
                self.runloop();
            },1000/self.fps);//每一帧的时间
            console.log(1000/self.fps);

            /*初始化房子*/
            this.fangzi = new Background({
                img:this.allImageObj['fangzi'],
                y:this.canvas.height - 256 - 100,
                width:300,
                height:256,
                speed:1
            });
            /*初始化树*/
            this.shu = new Background({
                img:this.allImageObj['shu'],
                y:this.canvas.height - 216 - 48,
                width:300,
                height:216,
                speed:2
            });
            /*初始化地板*/
            this.diban = new Background({
                img:this.allImageObj['diban'],
                y:this.canvas.height - 48,
                width:48,
                height:48,
                speed:3
            });
            /*初始化管道数组*/
            this.pipeArr = [new Pipe()];
            /*初始化小鸟*/
            this.bird = new Bird();
        },
        /*游戏循环*/
        runloop:function () {
            // console.log(Math.random());
            /*执行工具帧方法*/
            this.frameUtil.render();
            /*清屏*/
            this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
            /*绘制文本*/
            this.context.fillText('FPS / '+ this.frameUtil.realFps,15,15);
            this.context.fillText('FNO / '+ this.frameUtil.currentFrame,15,30);
            /*更新和绘制房子*/
            this.fangzi.update();
            this.fangzi.render();
            /*更新和绘制树*/
            this.shu.update();
            this.shu.render();
            /*更新和绘制地板*/
            this.diban.update();
            this.diban.render();

            /*每隔100帧创建一个管道*/
            if(!this.isGameOver && (game.frameUtil.currentFrame % 100 == 0)){
                this.pipeArr.push(new Pipe());
            }
            /*遍历管道数组*/
            for(var i=0;i<this.pipeArr.length;i++){
                this.pipeArr[i].update();
                this.pipeArr[i].render();
            }
            /*更新和绘制小鸟*/
            this.bird.update();
            this.bird.render();

        },
        /*游戏停止*/
        pause:function () {
            clearInterval(this.timer);
        },
        /*游戏结束*/
        gameOver:function () {
            /*背景停止*/
            this.fangzi.pause();
            this.shu.pause();
            this.diban.pause();
            /*管道停止*/
           this.pipeArr.forEach(function (item,index) {
               item.pause();
           });
           /*鸟死亡*/
           this.bird.die = true;
           /*游戏的状态*/
            this.isGameOver = true;
        }
    });
})();