(function () {
    var Snake = window.Snake = function () {
        //蛇身
        this.body = [
            {"row":3,"col":8},
            {"row":3,"col":9},
            {"row":3,"col":10},
            {"row":3,"col":11},
            {"row":3,"col":12}
        ];
        //当前方向向左
        this.direction = 'L';
        //改变前的方向
        this.oldDirection = 'L';
    };
    /**
     * 绘制蛇
     */
    Snake.prototype.render = function () {
        //设置蛇头的颜色
        game.changeColor(this.body[0].row,this.body[0].col,'');
        for(var i=1; i<this.body.length; i++){
            //设置蛇身的颜色
            game.changeColor(this.body[i].row,this.body[i].col,'green');
        }
    };
    /**
     * 改变方向
     * @param str
     */
    Snake.prototype.changedirection = function (str) {
        this.direction = str;
    }
    /**
     * 更新蛇身
     */
    Snake.prototype.update = function () {
        if(this.direction == 'L' && this.oldDirection == 'R' || this.direction == 'R' && this.oldDirection == 'L' || this.direction == 'U' && this.oldDirection == 'D' || this.direction == 'D' && this.oldDirection == 'U'){
            //方向不变
            this.direction = this.oldDirection;
        }
        //把新方向赋值给旧方向
        this.oldDirection = this.direction;
        //判断方向改变的位置
        switch (this.direction){
            case 'L':
                var head = {'row':this.body[0].row,'col':this.body[0].col-1};
                break;
            case 'R':
                var head = {'row':this.body[0].row,'col':this.body[0].col+1};
                break;
            case 'U':
                var head = {'row':this.body[0].row -1,'col':this.body[0].col};
                break;
            case 'D':
                var head = {'row':this.body[0].row+1,'col':this.body[0].col};
                break;
        };
        //判断是否迟到食物
        if(!game.food.check()){
            //删除最后一个
            this.body.pop();
        }else{
            //吃到增加食物
            game.createFood();
        }
        //把最后一个添加到头部
        this.body.unshift(head);
    };
    /**
     * 判断蛇是否死亡
     * @returns {boolean}
     */
    Snake.prototype.checked = function () {
        for(var i=1; i<this.body.length; i++){
            //撞到自己
            if(this.body[0].row == this.body[i].row && this.body[0].col == this.body[i].col){
                return true;
            }
        }
        //撞到墙壁
        if(this.body[0].row >= 16 || this.body[0].row <0 || this.body[0].col >=16 || this.body[0].col <0){
            return true;
        }
    }
})();
