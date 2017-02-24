(function(){
    var Game = window.Game = function () {
        this.table = null;
        //创建蛇
        this.snake = new Snake();
        this.food = null;
        this.timer = null;
        //初始化
        this.init();
        //开始游戏
        this.start();
        //监听键盘输入
        this.bindEvent();
        //帧数
        this.f = 0;
        //用时的秒
        this.second = 0;
        //用时的分
        this.min = 0;
        //用时的时
        this.hour = 0;
        //所得总分
        this.score = 0;
        //食物个数
        this.fruitNo = 0;
    };
    /**
     * 初始化
     */
    Game.prototype.init = function () {
        //动态创建元素
        this.main = document.createElement('div');
        this.main.setAttribute('id','main');
        this.content = document.createElement('div');
        this.content.setAttribute('id','content');
        document.body.appendChild(this.main);
        this.table = document.createElement('table');
        this.main.appendChild(this.table);
        this.main.appendChild(this.content);
        this.content.innerHTML = '<br>&nbsp用时：0:0:0<br><br>'+
            '&nbsp分数:0<br><br>'+
            '&nbsp食物: 0';
        for(var i=0; i<16; i++){
            var tr = document.createElement('tr');
            for(var j=0; j<16; j++){
                var td = document.createElement('td');
                tr.appendChild(td);
            }
            this.table.appendChild(tr);
        }
    };
    /**
     * 设置蛇头蛇尾颜色
     * @param row
     * @param col
     * @param color
     */
    Game.prototype.changeColor = function (row,col,color) {
        this.table.getElementsByTagName('tr')[row].getElementsByTagName('td')[col].style.background = color;
    };
    /**
     * 设置食物
     * @param row
     * @param col
     * @param html
     */
    Game.prototype.changehtml = function (row,col,html) {
        this.table.getElementsByTagName('tr')[row].getElementsByTagName('td')[col].innerHTML = html;
    };
    /**
     * 清除样式
     */
    Game.prototype.clear = function () {
        for(var i=0; i<16; i++){
            for(var j=0; j<16; j++){
                this.changeColor(i,j,'#fff');
            }
        }
    };
    /**
     * 开始游戏
     */
    Game.prototype.start = function () {
        var self = this;
        //设置定时器
        self.timer = setInterval(function () {
            self.f ++;
            //每隔一秒
            if(self.f % 5 == 0){
                //用时秒数加加
                self.second ++;
                //秒数小于10时前面加个0
                if(self.second < 10){
                    self.second = '0'+self.second;
                }
            }
            //秒数大于0，并且等于60时
            else if(self.second>0 && self.second % 60 == 0 ){
                //分数小于10时前面加个0
                if(self.min < 10){
                    self.min = '0'+self.min;
                }
                //用时分数加加
                self.min ++;
                //秒数归零
                self.second = 0;
            }
            //分数大于0，并且等于60时
            else if(self.min>0 &&self.min % 60 == 0 ){
                //小时数小于10时前面加个0
                if(self.hour < 10){
                    self.hour = '0'+self.hour;
                }
                //用时小时数加加
                self.hour ++ ;
                //分数归零
                self.min = 0;
            }
            document.getElementById('content').innerHTML = '<br>&nbsp用时：'+ self.hour +':'+ self.min +':'+ self.second + '<br><br>' +
                '&nbsp分数:' + self.score + '<br><br>'+
                '&nbsp食物:' + self.fruitNo +'<br><br>';
            //判断是否有食物
            if(!self.food){
                self.food = new Food();
            }
            //清除样式
            self.clear();
            //更新蛇
            self.snake.update();
            //判断蛇有没有撞到自身或墙壁
            if(self.snake.checked()){
                clearInterval(self.timer);
                alert('GAMEOVER!');
                return;
            }
            //绘制蛇
            self.snake.render();
        },200);
    };
    /**
     * 监听键盘输入
     */
    Game.prototype.bindEvent = function () {
        var self = this;
        //键盘按下事件
        document.onkeydown = function (e) {
            e = e || event;
            switch (e.keyCode){
                case 37:
                    self.snake.changedirection('L');
                    break;
                case 38:
                    self.snake.changedirection('U');
                    break;
                case 39:
                    self.snake.changedirection('R');
                    break;
                case 40:
                    self.snake.changedirection('D');
                    break;
            }
        }
    };
    /**
     * 增加食物
     */
    Game.prototype.createFood = function () {
        this.changehtml(this.food.row,this.food.col,'');
        this.food = new Food();
    }
})();
