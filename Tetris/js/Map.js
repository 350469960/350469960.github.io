(function () {
    var Map = window.Map = function () {
        //矩阵数组
        this.matrix = [
            "QQ000000000000QQ",
            "QQ000000000000QQ",
            "QQ000000000000QQ",
            "QQ000000000000QQ",
            "QQ000000000000QQ",
            "QQ000000000000QQ",
            "QQ000000000000QQ",
            "QQ000000000000QQ",
            "QQ000000000000QQ",
            "QQ000000000000QQ",
            "QQ000000000000QQ",
            "QQ000000000000QQ",
            "QQ000000000000QQ",
            "QQ000000000000QQ",
            "QQ000000000000QQ",
            "QQ000000000000QQ",
            "QQ000000000000QQ",
            "QQ000000000000QQ",
            "QQ000000000000QQ",
            "QQ000000000000QQ",
            "QQQQQQQQQQQQQQQQ",
            "QQQQQQQQQQQQQQQQ",
            "QQQQQQQQQQQQQQQQ",
            "QQQQQQQQQQQQQQQQ",
            "QQQQQQQQQQQQQQQQ"
        ];
        //满行的行数
        this.lineNo = 0;
        //消行的总数
        this.allLine = 0;
    }

    /**
     *
     * @param row
     * @param col
     * @returns {Array}
     */
    Map.prototype.cut = function (row, col) {
        var result = [];
        for (var i = row; i < row + 4; i++) {
            result.push(this.matrix[i].substr(2 + col, 4));
        }
        return result;
    };
    /**
     * 地图的绘制
     */
    Map.prototype.render = function () {
        for (var row = 0; row < 20; row++) {
            for (var col = 0; col < 12; col++) {
                var char = this.matrix[row].charAt(col + 2);
                if (char != '0') {
                    game.setClass(row, col, char);
                }
            }
        }
    };
    /**
     * 判断
     * @param row 死亡的行数
     * @param col 死亡的列数
     * @param blockMatrix 方块的矩阵
     * @param typeName 图形的类型
     */
    Map.prototype.integrate = function (row, col, blockMatrix, typeName) {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                borunqing(blockMatrix, i, j) == 1 && (this.matrix[row + i] = changeString(this.matrix[row + i], col + j + 2, typeName));
            }
        }
    };
    /**
     * 检查是否可以消行
     */
    Map.prototype.check = function () {
        for (var i = 19; i >= 0; i--) {
            if (this.matrix[i].indexOf('0') == -1) {//判断是否满行
                this.matrix.splice(i, 1);//删除一行
                this.matrix.unshift('QQ000000000000QQ');//头部再补充一行新的
                //满行的行数
                this.lineNo ++;
                //补充了一行
                i++;
            }
        }
        //消一行
        if(this.lineNo ==1){
            game.score += 5;
        }
        //消两行
        else if(this.lineNo ==2){
            game.score += 20;
        }
        //消三行
        else if(this.lineNo ==3){
            game.score += 50;
        }
        //消四行
        else if(this.lineNo ==4){
            game.score += 100;
        }
        //消行的总行数
        this.allLine += this.lineNo;
        //消行的总行数 >=10
        if(this.allLine >= 10){
            //等级升为1级
            game.status = 1;
            //下落的速度加快
            game.speed = 10;
        }else if(this.allLine >= 30){
            game.status = 2;
            game.speed = 5;
        }else if(this.allLine >= 80){
            game.status = 3;
            game.speed = 2;
        }
        //满行的行数归零
        this.lineNo = 0;
    };
    /**
     * 判断图形的占位情况
     * @param dia 方块的矩阵
     * @param rowNo  行号
     * @param lie  列号
     * @returns {number}
     */
    function borunqing(dia,rowNo,colNo) {
        return (dia >> (3 - rowNo) * 4 & 0xf) >> (3 - colNo) & 0x1;
    }

    /**
     *
     * @param string
     * @param pos
     * @param chr
     * @returns {*}
     */
    function changeString(string, pos, chr) {
        return string.substr(0, pos) + chr + string.substr(pos + 1);
    }

})();
