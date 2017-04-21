---
title: Angular 中的常用指令和常用服务
layout: page
date: 2017-03-18
modifiedOn: 2017-03-18
category: directive/server
tag: angular 
reward: true
---
Angular 中的常用指令
1、Ng-app 模块入口指令   指令定义了 AngularJS 应用
```script
<body>
    <div ng-app="myApp" ng-controller="myCtr">
        名：<input type="text" ng-model="firstName">
        姓：<input type="text" ng-model ="lastName">
        <br>
        姓名：{{lastName + ""+ firstName}}
    </div>
    <script>
        var app = angular.module('myApp',[]);
        app.controller('myCtr',function ($scope) {
         $scope.firstName = 'john';
         $scope.lastName = 'Doe';
        })
    </script>
</body>
```
<!--more-->
Ng-app的作用域为当前div

2、Ng-controller 控制器（功能入口指令）指令定义了应用控制器
```script
<body>
    <div ng-app="myApp" ng-controller="myCtr">
        名：<input type="text" ng-model="firstName">
        姓：<input type="text" ng-model ="lastName">
        <br>
        姓名：{{lastName + ""+ firstName}}
    </div>
    <script>
        var app = angular.module('myApp',[]);
        app.controller('myCtr',function ($scope) {
         $scope.firstName = 'john';
         $scope.lastName = 'Doe';
        })
    </script>
</body>
```
Ng-controller的作用域为当前div


3、Ng-show 展示指令，返回值为boolean
```script
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="angular.js"></script>
    <script>
        var app = angular.module('myApp',[]);
        app.controller('myCtrl',['$scope',function ($scope) {
            $scope.students = ['zs','lisi','wangwu'];
            $scope.isShow = true;
            $scope.isShow = 1;
        }]);
    </script>
</head>
<body>
    <ul ng-app = "myApp" ng-controller="myCtrl">
        <li ng-repeat="x in students">{{x}}</li>
        <li ng-repeat="x in students" ng-show="false">{{x}}</li>
        <li ng-repeat="x in students" ng-hide="true">{{x}}</li>
        <li ng-repeat="x in students" ng-show="isShow">{{x}}</li>
        <li ng-repeat="x in students" ng-if="false">{{x}}</li>
    </ul>
</body>
</html>
```

4、Ng-hide 隐藏指令，返回值为boolean
同上代码
5、Ng-if 隐藏标签指令，返回值为boolean
同上代码

6、Ng-click 点击事件指令
```script
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="angular.js"></script>
    <script>
        var app = angular.module('myApp',[]);
        app.controller('myCtrl',['$scope',function ($scope) {
            $scope.click = function () {
              alert(100);
            };
        }]);
    </script>
</head>
<body ng-app="myApp" ng-controller="myCtrl">
    <p ng-click="click()">点我</p>
</body>
</html>
```

7、Ng-mouseover 鼠标移上指令
8、Ng-事件名 事件指令
9、数据绑定 {{name}} （有闪烁）
```script
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="angular.js"></script>
    <script>
        var app = angular.module('myApp',[]);
        app.controller('myCtrl',['$scope',function ($scope) {
            $scope.name = 'jhon';
            $scope.age = 18;
        }]);
    </script>
</head>
<body ng-app="myApp" ng-controller="myCtrl">
    <ul>
        <li ng-bind="name"></li>
        <li ng-bind-template="{{name}} {{age}}"></li>
        <li ng-cloak>{{name}} {{age}}</li>
    </ul>
</body>
</html>
```

10、Ng-bind 单数据绑定指令（无闪烁）
同上代码

11、Ng-bind-template 多数据绑定指令（无闪烁）
同上代码

12、Ng-cloak 多数据绑定指令（无闪烁）
同上代码

13、Ng-class 操控类名指令
```script
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        .red{
            color: #f60;
        }
        .font{
            font-size:60px;
        }
    </style>
</head>
<body ng-app="myApp">
<div ng-class="{red:true,font:true}">hello</div>
<div ng-style="sty">hello</div>
<script src="angular.js"></script>
<script>
    var app = angular.module('myApp',[]);
    app.controller('myCtrl',['$scope',function ($scope) {
        $scope.sty = {
            'color':'red'
        }
    }]);
</script>
</body>
</html>
```

14、Ng-style 操控样式指令
```script
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="angular.js"></script>
    <script>
        var app = angular.module('myApp',[]);
        app.controller('myCtrl',['$scope',function ($scope) {
            $scope.sty = {
                'color':'red'
            }
        }]);
    </script>
</head>
<body ng-app="myApp" ng-controller="myCtrl">
    <p ng-style="sty">hello</p>
</body>
</html>
```

15、Ng-src 操控图片地址
```script
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="http://cdn.static.runoob.com/libs/angular.js/1.4.6/angular.min.js"></script>

    <script>
        var app = angular.module('myApp',[]);
        app.controller('myCtrl',['$scope',function ($scope) {
            $scope.url = "image/03.jpg";
        }]);
    </script>
</head>
<body ng-app="myApp" ng-controller="myCtrl">
<img ng-src="{{url}}" alt="">
</body>
</html>
```

16、Ng-href 操控a标签地址
```script
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="angular.js"></script>
    <script>
        var app = angular.module('myApp',[]);
        app.controller('myCtrl',['$scope',function ($scope) {
            $scope.url = "www.baidu.com";
        }]);
    </script>
</head>
<body ng-app="myApp" ng-controller="myCtrl">
<a ng-href="url">a</a>
</body>
</html>
```

17、Ng-include 插入模块指令
```script
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body ng-app="myApp">
    <div ng-include="'./head.html'"></div>
    <div ng-include="'./body.html'"></div>
    <div ng-include="'./foot.html'"></div>
    <img ng-src="url" alt="">

<script src="angular.js"></script>
<script>
    var app = angular.module('myApp',[]);
    app.controller('myCtrl',['$scope',function ($scope) {
        $scope.url = "mengxiang.png";
    }]);
</script>
</body>
</html>
```

18、Ng-model 绑定数据（相当于$scope对象创建属性）
```script
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="http://cdn.static.runoob.com/libs/angular.js/1.4.6/angular.min.js"></script>
</head>
<body>
    <div ng-app="myApp" ng-controller="myCtr">
        名字：<input ng-model = "name">
        <h1>你输入了：{{name}}</h1>
    </div>
    <script>
        var app = angular.module('myApp',[]);
        app.controller('myCtr',function ($scope) {
           $scope.name = 'dap';
        })
    </script>
</body>
</html>
```

19、Ng-init 设置默认数据指令	
```script
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="http://cdn.static.runoob.com/libs/angular.js/1.4.6/angular.min.js"></script>
</head>
<body>
    <div ng-app="" ng-init="firstName = 'john'">
        <p>姓名：<span ng-bind="firstName"></span></p>
    </div>
</body>
</html>
```

20、Ng-Repeat 遍历数据指令
```script
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="http://cdn.static.runoob.com/libs/angular.js/1.4.6/angular.min.js"></script>
</head>
<body>
    <div ng-app ="" ng-init="names=[{name:'jhon',country:'Norway'},{name:'hege',country:'sweden'},{name:'doe',country:'denmark'}]">
        <p>循环对象：</p>
        <ul>
            <li ng-repeat ="x in names">{{x.name + ',' + x.country}}</li>
        </ul>
    </div>

</body>
</html>
```
Ng-repeat=”value in 自定义数据名”

21、Ng-options 遍历数据指令（用于下拉菜单数据遍历）
```script
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="https://cdn.static.runoob.com/libs/angular.js/1.4.6/angular.min.js"></script>
</head>
<body>
<div ng-app="myApp" ng-controller="myCtrl">
    <select ng-init="selectedName = names[0]" ng-model="selectedName" ng-options="x for x in names">
    </select>
    <p>该实例演示了使用 ng-options 指令来创建下拉列表。</p>
</div>
<script>
    var app = angular.module('myApp',[]);
    app.controller('myCtrl',function ($scope) {
        $scope.names = ['Google','Runoob','Taobao'];
    });
</script>
</body>
</html>
```

22、Ng-checked 
```script
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="https://cdn.static.runoob.com/libs/angular.js/1.4.6/angular.min.js"></script>
</head>
<body ng-app="">
    <p>My cars:</p>
    <input type="checkbox" ng-model = "all">Check all <br><br>
    <input type="checkbox" ng-checked="all">Volvo <br>
    <input type="checkbox" ng-checked="all">Ford <br>
    <input type="checkbox" ng-checked="all">Mercedes <br>
    <p>点击Check all 选择所有的车</p>
</body>
</html>
```

23、Ng-disabled
24、Ng-readonly
25、Ng-submit 使用angular监听表单提交，用在form上
26、Ng-open 返回值为boolean 常用于details标签，用作显示隐藏
27、Ng-cut 剪切事件
```script
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="https://cdn.static.runoob.com/libs/angular.js/1.4.6/angular.min.js"></script>
</head>
<body ng-app="">
<input type="text" ng-cut="count=count+1" ng-init="count=0" value="拷贝">
<p>文本被剪切{{count}}次。</p>
<p>实例中变量count的值在输入框的文本被剪切时会自动增加1.</p>
</body>
</html>
```

28、Ng-copy 拷贝事件
```script
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="https://cdn.static.runoob.com/libs/angular.js/1.4.6/angular.min.js"></script>
</head>
<body ng-app="">
<input type="text" ng-copy="count=count+1" ng-init="count=0" value="拷贝">
<p>文本被拷贝{{count}}次。</p>
<p>实例中变量count的值在输入框的文本被拷贝时会自动增加1.</p>
</body>
</html>
```

29、Ng-paste 粘贴事件
30、Ng-change 内容改变时执行
```script
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="https://cdn.static.runoob.com/libs/angular.js/1.4.6/angular.min.js"></script>
</head>
<body ng-app="app" ng-controller="myCtrl">
<div>
    <p>在输入框中输入一些信息：</p>
    <input type="text" ng-change="myFunc()" ng-model="myValue">
    <p>输入框已经修改了{{count}}次。</p>
</div>
</body>
<script>
    var app = angular.module('app',[]);
    app.controller('myCtrl',['$scope',function ($scope) {
        $scope.count = 0;
        $scope.myFunc = function () {
            $scope.count ++;
        }
    }]);
</script>
</html>
```

31、Ng-class-even 在偶数行起作用的css类
```script
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        .striped{
            color: white;
            background-color: black;
        }
    </style>
    <script src="https://cdn.static.runoob.com/libs/angular.js/1.4.6/angular.min.js"></script>
</head>
<body ng-app="app" ng-controller="myCtrl">
<table>
    <tr ng-repeat="x in records" ng-class-even="'striped'">
        <td>{{x.Name}}</td>
        <td>{{x.Country}}</td>
    </tr>
</table>
</body>
<script>
    var app = angular.module('app',[]);
    app.controller('myCtrl',['$scope',function ($scope) {
        $scope.records = [
            {
                "Name" : "Alfreds Futterkiste",
                "Country" : "Germany"
            },
            {
                "Name" : "Berglunds snabbk",
                "Country" : "Sweden"
            },
            {
                "Name" : "Centro comercial Moctezuma",
                "Country" : "Mexico"
            },
            {
                "Name" : "Ernst Handel",
                "Country" : "Austria"
            }
        ]
    }]);
</script>
</html>
```
32、Ng-model-options 规定如何更新模型
33、ng-non-bindable 规定元素不能绑定数据
```script
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <script src="https://cdn.static.runoob.com/libs/angular.js/1.4.6/angular.min.js"></script>
</head>
<body>
    <div ng-app="">
        <p>使用 AngularJS: {{ 5+5 }}</p>
        <p ng-non-bindable>不使用 AngularJS: {{ 5+5 }}</p>
    </div>
    <p>如果你不想使用 AngularJS 执行表达式可以使用 ng-non-bindable 。</p>
</body>
</html>
```

34、ng-transclude 一般用在自定义指令中模板中，使其替换的标签内部的子元素嵌套在模板中，并且自定义指令必须有transclude:true

35、自定义指令
```script
App.directive(‘name’,[‘依赖模块’,function(){
    Return {
        Restrict:’EAMC’,
        Replace:true,
        Template/templateUrl:’’,
        Controller:function(){},
        Scope:true/false/{
        Data:’@’或  //常量  单向传递
        Data:’=’或  //变量   双向绑定
        Data:’&’   //回掉函数

        },默认false，子父级在同一个作用域；true子父级作用域分离；{}子父级作用域相对独立
        Link:function(scope,element.attrs){
        }  
    }
}]);
```

一般用法
Angular.forEach() 对象或数组的迭代函数
Angular.copy() 数组或者对象的深度拷贝
Angular.equals() 如果两个对象相等返回true
Angular.fromJson() 反序列化JSON字符串
Angular.toJson() 序列化JSON字符串
Angular.bootstrap() 手动启动AngularJs
Angular.element() 把DOM元素转换为jQuery对象


Angular的常用服务
1、$http 
Angular-1.5x版本
```script
<script src="angular.js"></script>
</head>
<body ng-app="app" ng-controller="myCtrl">

</body>
<script>
    var app = angular.module('app',[]);
    app.controller('myCyrl',['$scope','$http',function ($scope,$http) {
        $http({
           url:'get.php',
            method:'get',
            params:{
               name:'jhon'
            }
        }).success(function (res) {         
        }).error(function (err) {           
        });

/*     $http({
         url:'post.php',
         method:'post',
         headers:{
           'Content-Type':'application/x-www-form-urlencoded'
         },
         params:{

         },
         data:"name=xmg"
     }).success(function (res) {
         alert(res);
     }).error(function (res) {
         alert(res);
     });*/

    }]);
</script>
```

Angular-1.6x版本
```script
<script src="angular.js"></script>
</head>
<body ng-app="app" ng-controller="myCtrl">

</body>
<script>
    var app = angular.module('app',[]);
    app.controller('myCyrl',['$scope','$http',function ($scope,$http) {
        $http({
           url:'get.php',
            method:'get',
            params:{
               name:'jhon'
            }
        }).then(function (res) {
            alert(res.data);//返回的是对象，其对象的data才是结果
        }).catch(function (err) {
            
        });
    }]);
</script>
```

2、$log 日志输出
$log.log()
$log.error()
$log.warn()
$log.info()
$log.debug()

3、$location 地址
$location.absUrl() 绝对地址
$location.url() 锚点后的地址
$location.port() 端口
$location.host() 主机
$location.hash() 锚点
$location.search() 获取搜索地址
$location.protocol() 协议

4、$filter 过滤器
```script
$filter(‘currency’);
Currency、orderBy、uppercase、lowercase、limitTo、date、number、filter、json
```

5、$watch 监听内容改变
```script
$watch(‘监听对象’,function(new,old){},true/false)；true是深监听，不单纯监听地址，也监听引用类型内部的值的改变
```

6、$q 延迟执行
```script
$q.defer()延迟执行

$http({})
    .then($q.defer().resolve(res))
    .catch($q.defer().reject(err))

$q.promise();
$q.when(fn1()).then() 顺序执行
$q.all([fn1(),fn2()]).then(结果) 同时执行
```
7、$timeout
8、$interval
9、自定义服务
```script
//工厂
App.factory(‘name’,function(){
    Return {}或function(){}
});
//服务
App.service(‘name’,function(){
    This.fn = function(){}
    或
    This.age = num;
});
//常量
App.value(‘name’,12); 定义常量
``` 

10、配置块
```script
App.config(‘$logProvider’,function($logProvider){});

1、$logProvider.debugEnabled();禁用debug输出

2、filterProvider.register(‘name’,function(){});注册过滤器

3、$routeProvider.when(‘url’,{
    Template:’’
 }).otherwise({
    redirectTo:’’
});

4、$sceDelegateProvider  跨域配置白名单
$sceDelegateProvider.resourceUrlWhitelist([
    'http://c.runoob.com/runoobtest/**'
]);
```


11、运行块
```script
App.run([‘依赖模块’,function(){}]);
```

12、控制器
```script
App.controller(‘name’,[‘$scope’,function($scope){
    $scope.$broadcast(‘name’,{参数});//父元素向子元素广播一个事件，但其必须放在事件中，不然会立即执行
    $scope.$on(‘name’,function(event,data){});//这个是在子元素对应的控制器中
    $scope.$emit(‘name’,{参数});子元素向父元素广播一个事件，但其必须放在事件中，不然会立即执行
    $scope.$on(‘name’,function(event,data){});//这个是在父元素对应的控制器中
}]);
```

13、路由
1、angular-route
```script
App.config(‘$routeProvider’,[function($routeProvider){
    $routeProvider.when(‘url/:id’,{
        Template:’’
    }).otherwise({
        redirectTo:’url/参数’
    });

}]);
```

2、angular-ui-router
```script
App.config(‘$stateProvider’,’$urlRouterProvider’,[function($routePro		vider,$urlRouterProvider){
    $routeProvider.state(‘name’,{//name别名
        Url:’url/:id’,
        Template:’’
    });
    $urlRouterProvider.otherwise(name);
}]);
```

14、验证

$invalid 非法字符
$valid 有效字符
$dirty 有填写表单
$pristine 没有填写表单
$error 错误
novalidate 属性规定当提交表单时不对其进行验证。

