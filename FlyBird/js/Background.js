(function () {
    window.Background = Class.extend({
        /*初始化*/
       init:function (option) {
           option = option || {};
           this.img = option.img;
           this.x = 0;
           this.y = option.y || 0;
           this.width = option.width || 0;
           this.height = option.height || 0;
           /*背景移动的速度*/
           this.speed = option.speed || 1;
           /*图片的个数*/
           this.count = parseInt(game.canvas.width / this.width) + 1;
       },
        /*更新*/
        update:function () {
            this.x -= this.speed;
            if(this.x < -this.count * this.width){
                this.x = 0;
            }
        },
        /*绘制*/
        render:function () {
            for(var i=0; i<this.count * 2; i++){
                game.context.drawImage(this.img,this.x + i * this.width,this.y,this.width,this.height);
            }
        },
        /*停止*/
        pause:function () {
            this.speed = 0;
        }
    });
})();
