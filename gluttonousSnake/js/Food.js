(function () {
    var Food = window.Food = function () {
        //食物数组
        this.arrFood = ['🍍','🍉','🍡','🍎','🍓','🍌','🍇','🍑','🍒','🥝'];
        //食物下标
        this.index = parseInt(Math.random()*this.arrFood.length);
        //当前食物
        this.fruit = this.arrFood[this.index];
        //判断
        while(true){
            //食物坐标
            this.row = parseInt(Math.random()*16);
            this.col = parseInt(Math.random()*16);
            for(var i=0; i<game.snake.body.length; i++){
                //判断食物是否生成在蛇身上
                if(game.snake.body[i]['row'] == this.row && game.snake.body[i]['col'] == this.col){
                    break;
                }
            }
            //说明食物不在蛇身上，食物生成的位置合适，跳出while判断
            if(i == game.snake.body.length){
                break;
            }
        }
        this.changeHTML();
    };
    /**
     * 生成食物
     */
    Food.prototype.changeHTML = function () {
        game.changehtml(this.row,this.col,this.fruit);
    };
    /**
     * 检查是否吃到食物
     * @returns {boolean}
     */
    Food.prototype.check = function () {
        if(game.snake.body[0]['row'] == this.row && game.snake.body[0]['col'] == this.col){
            //判断各种食物的分数
            switch (this.index){
                case 0:
                    game.score += 1;
                    break;
                case 1:
                    game.score += 2;
                    break;
                case 2:
                    game.score += 3;
                    break;
                case 3:
                    game.score += 4;
                    break;
                case 4:
                    game.score += 5;
                    break;
                case 5:
                    game.score += 6;
                    break;
                case 6:
                    game.score += 7;
                    break;
                case 7:
                    game.score += 8;
                    break;
                case 8:
                    game.score += 9;
                    break;
                case 9:
                    game.score += 10;
                    break;
            }
            //食物的个数++
            game.fruitNo ++;
            return true;
        }
    }
})();