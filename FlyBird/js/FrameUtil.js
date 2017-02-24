(function () {
    window.FrameUtil = Class.extend({
       init:function () {
           /*总帧数*/
           this.currentFrame = 0;
           /*开始时间*/
           this.sTime = new Date();
           /*开始帧数*/
           this.sFrame = 0;
           /*真实的帧数*/
           this.realFps = 0;
       },
        /*每一帧都执行*/
        render:function () {
            /*累加总帧数*/
            this.currentFrame ++;
            /*当前帧的当前时间*/
            var currentTime = new Date();
            /*判断*/
            if(currentTime - this.sTime >= 1000){
                this.realFps = this.currentFrame - this.sFrame;
                /*更新*/
                this.sFrame = this.currentFrame;
                this.sTime = currentTime;
            }

        }
    });
})();
