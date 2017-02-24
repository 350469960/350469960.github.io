
(function () {
    window.StaticSourceUtil = Class.extend({
       init:function () {
           this.allImageObj = {};
       },
        /*加载图片*/
        //加载图片方法, 返回 所有dom对象, 总的图片个数, 已经加载的图片个数
        loadImage:function (jsonUrl,callBack) {
            /*备份指针*/
            var self = this;
            /*创建请求*/
            var xhr = new XMLHttpRequest();
            /*请求三步骤*/
            /*接收*/
            xhr.onreadystatechange = function () {
                if(xhr.readyState == 4){
                    if(xhr.status >=200 && xhr.status < 300 || xhr.status == 304){
                        /*加载图片个数*/
                        var loadImageCount = 0;
                        /*请求数据*/
                        var responseText = xhr.responseText;
                        /*解析JSON*/
                        var responseJson = JSON.parse(responseText);
                        /*创建数组*/
                        var imgArr = responseJson.images;
                        /*遍历数组*/
                        for(var i=0;i<imgArr.length;i++){

                            /*创建图片对象*/
                            var image = new Image();
                            /*图片路径*/
                            image.src = imgArr[i].src;
                            /*图片下标*/
                            image.index = i;
                            /*图片加载完成*/
                            image.onload = function () {
                                /*累加图片个数*/
                                loadImageCount ++;
                                /*保存图片对象*/
                                self.allImageObj[imgArr[this.index].name] = this;
                                /*回掉函数*/
                                //返回 所有dom对象, 总的图片个数, 已经加载的图片个数
                                callBack(self.allImageObj,imgArr.length,loadImageCount);
                            };

                        }
                    }
                }
            };
            /*连接*/
            xhr.open('get',jsonUrl,true);
            /*发送*/
            xhr.send(null);
        }
    });
})();