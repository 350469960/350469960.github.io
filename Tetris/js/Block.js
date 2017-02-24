(function () {
    /**
     * 创建砖块类
     * @type {Window.Block}
     */
    var Block = window.Block = function () {
        //类型
        this.type = (['I','L','J','Z','S','O','T'])[parseInt(Math.random()*7)];
        //图形矩阵
        this.allMatrix = getAllBlocks()[this.type];
        //图形的方向总数
        this.allDirectionAmount = this.allMatrix.length;
        //图形当前方向
        this.direction = parseInt(Math.random()*this.allDirectionAmount);
        //图形当前矩阵
        this.matrix = this.allMatrix[this.direction];
        /*矩阵的默认行数*/
        this.row = 0;
        /*矩阵的默认列数*/
        this.col = 4;
    };

    Block.prototype = {
        /**
         * 向下的方法
         */
        goDown : function () {
            this.row ++;
        },
        /**
         * 向右的方法
         */
        goRight : function () {
            this.col ++;
        },
        /**
         * 向左的方法
         */
        goLeft : function () {
            this.col --;
        },
        /**
         * 向上旋转方法
         */
        rotate : function () {
            this.direction ++;
            if(this.direction === this.allDirectionAmount){
                this.direction =0;
            }
            this.matrix = this.allMatrix[this.direction];
        },
        /**
         * 判断是否可以旋转
         * @returns {*}
         */
        getNextDirectionMatrix : function () {
            var dir = this.direction + 1;
            if(dir === this.allDirectionAmount){
                dir = 0;
            }
            return this.allMatrix[dir];
        },
        /**
         * 绘制图形
         */
        render : function () {
            for(var i=0; i<4; i++){
                for(var j=0; j<4; j++){
                    borunqing(this.matrix,i,j) && game.setClass(i+this.row, j+this.col, this.type);
                }
            }
        },
        /**
         * 地图上的矩阵和自己的矩阵比较，是否可以向下
         * @param arr
         * @param mymatrix
         * @returns {boolean}
         */
        compare : function(arr,mymatrix){
            if(mymatrix === undefined){
                mymatrix = this.matrix;
            }
            for(var i=0; i<4; i++){
                for(var j=0; j<4; j++){
                    var myMatrixState = borunqing(mymatrix, i, j);
                    var arrChr = arr[i].charAt(j);
                    if(arrChr != 0 && myMatrixState != 0){
                        return true;
                    }

                }
            }
            return false;
        }
    };
    /**
     * 获取图形的矩阵
     * @returns {{I: [number,number], L: [number,number,number,number], J: [number,number,number,number], Z: [number,number], S: [number,number], O: [number], T: [number,number,number,number]}}
     *  返回方块的矩阵的集合
     */
    function getAllBlocks() {
        return {
            "I": [0x4444,0x0f00],
            "L" : [0x4460,0x0e80,0xc440,0x2e00],
            "J" : [0x44c0,0x8e00,0x6440,0x0e20],
            "Z" : [0x0c60,0x4c80],
            "S" : [0x06c0,0x8c40],
            "O" : [0x0660],
            "T" : [0x0e40,0x4c40,0x4e00,0x4640]
        }
    }

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

})();
