(function () {
    var Game = window.Game = function (tableId) {
     //获取标签
     this.table = document.getElementById(tableId);
     //帧数
     this.f = 0;
     //初始化
     this.init();
     //事件监听
     this.bindEvent();
     //创建新的砖块
     this.block = new Block();
     //创建地图
     this.map = new Map();
     //用时的秒
     this.second = 0;
     //用时的分
     this.min = 0;
     //用时的时
     this.hour = 0;
     //所得总分
     this.score = 0;
     //等级
     this.grade = ['新手','菜鸟','达人','传奇'];
     //等级的状态
     this.status = 0;
     //下落的速率
     this.speed = 20;

    }
    //获取标签
    var btn1 = document.getElementById('btn1');
    var btn2 = document.getElementById('btn2');
    /**
     * 游戏原型
     * @type {{init: Game.init, setClass: Game.setClass, clear: Game.clear, bindEvent: Game.bindEvent, start: Game.start}}
     */
    Game.prototype = {
        /**
         * 初始化绘制表格
         */
        init : function() {
            for (var row = 0; row < 20; row++) {
                var tr = document.createElement('tr');
                for (var col = 0; col < 12; col++) {
                    var td = document.createElement('td');
                    tr.appendChild(td);
                }
                this.table.appendChild(tr);
            }
        },
        /**
         * 设置样式
         * @param row
         * @param col
         * @param current
         */
        setClass : function (row,col,current) {
            this.table.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].className = current;
        },
        /**
         * 清除样式
         */
        clear : function(){
            for(var row =0; row<20; row++){
                for(var col=0; col <12; col++){
                    this.setClass(row,col,'')
                }
            }
        },
        /**
         * 监听键盘的操作
         */
        bindEvent : function () {
            var self = this;
            /**
             * 键盘按下事件
             * @param e
             */
            document.onkeydown = function (e) {
                e = e || event;
                //向左键
                if(e.keyCode == 37){
                    if(!self.block.compare(self.map.cut(self.block.row,self.block.col -1))){
                        self.block.goLeft();
                    }
                }
                //向右键
                else if(e.keyCode == 39){
                    if(!self.block.compare(self.map.cut(self.block.row,self.block.col +1))){
                        self.block.goRight();
                    }
                }
                //向下键
                else if(e.keyCode == 40){
                    if(!self.block.compare(self.map.cut(self.block.row +1 ,self.block.col))){
                        self.block.goDown();
                    }
                }
                //向上键
                else if(e.keyCode == 38){
                    if(!self.block.compare(self.map.cut(self.block.row,self.block.col),self.block.getNextDirectionMatrix())){
                        self.block.rotate();
                    }
                }
                //空格键
                else if(e.keyCode == 32){
                    //快速下落
                    while(!self.block.compare(self.map.cut(self.block.row + 1, self.block.col))){
                        self.block.goDown();
                    }
                    //加载音乐
                    document.getElementById('dropmusic').load();
                    document.getElementById('dropmusic').play();
                }
            }
        },
        /**
         * 游戏开始
         */
        start : function () {
            var self = this;
            //清除定时器
            clearInterval(self.timer);
            //设置定时器
            self.timer = setInterval(function () {
                self.f ++;
                //每隔一秒
                if(self.f % 50 == 0){
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
                //插入信息
                document.getElementById('tip').innerHTML = '<br>&nbsp用时：'+ self.hour +':'+ self.min +':'+ self.second + '<br><br>' +
                    '&nbsp分数:' + self.score + '<br><br>'+
                    '&nbsp消行:' + self.map.allLine +'<br><br>' +
                    '&nbsp等级:' + self.grade[self.status];
                //清除样式
                self.clear();
                //判断什么时候下落
                if(self.f % self.speed == 0){
                    //
                    if(!self.block.compare(self.map.cut(self.block.row +1,self.block.col))){
                        self.block.goDown();
                    }else{
                        self.map.integrate(self.block.row,self.block.col,self.block.matrix,self.block.type);
                        //到达顶行时，游戏结束
                        if(self.block.row <= 0){
                            alert('GAMEOVER');
                            clearInterval(self.timer);
                            return;
                        }
                        //创建一个新的块头
                        self.block = new Block();
                        //判断是否满行
                        self.map.check();
                    }
                }
                //绘制块头
                self.block.render();
                //绘制地图
                self.map.render();

                /*document.getElementById('tip2').innerHTML = '';
                for(var i=0; i<19; i++){
                    document.getElementById('tip2').innerHTML += self.map.matrix[i] + '<br>';
                }*/

            },20);
        },
    };
    //游戏开始
    btn1.onclick = function () {
        //alert(0)
        game.start();
    }
    //游戏暂停
    btn2.onclick = function () {
        clearInterval(game.timer);
    }



})();
