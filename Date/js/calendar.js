(function () {
    var Calendar = window.Calendar = function (JSON) {
        this.dateBox = null;
        this.calendarDiv = null;
        this.yearSelect = null;
        this.monthSelect = null;
        this.tds = null;
        //获取当前年份
        this.year = (new Date()).getFullYear();
        //获取当前月份
        this.month = (new Date()).getMonth()+1;
        //获取当前日期
        this.date = (new Date()).getDate();
        this.init(JSON);
        this.getDay(this.year,this.month,this.date);
        this.bindEvent();
        this.btn = null;
    };
    /**
     * 初始化
     * @param JSON
     */
    Calendar.prototype.init = function (JSON) {
        //获取标签
        this.dom = document.getElementById(JSON['id']);
        var self = this;
        //创建标签
        this.dateBox = document.createElement('span');
        this.dom.appendChild(this.dateBox);
        //创建div
        this.calendarDiv = document.createElement('div');
        //添加类名
        this.calendarDiv.className = 'calendarDiv';
        this.dom.appendChild(this.calendarDiv);
        //创建下拉年份框
        this.yearSelect = document.createElement('select');
        this.calendarDiv.appendChild(this.yearSelect);
        //动态添加下拉框中的年份
        for(var i=1995; i<= 2030; i++){
            var option = document.createElement('option');
            option.value = i;
            option.innerHTML = i;
            this.yearSelect.appendChild(option);
        }
        //创建数组月份
        var monthArr = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];
        //创建下拉月份框
        this.monthSelect = document.createElement('select');
        this.calendarDiv.appendChild(this.monthSelect);
        //动态添加到下拉月份框
        for(var i=0, len=monthArr.length; i<len; i++){
            var option = document.createElement('option');
            option.value = i+1;
            option.innerHTML = monthArr[i];
            this.monthSelect.appendChild(option);
        }
        this.btn = document.createElement('button');
        this.btn.className = 'btn';
        this.btn.innerHTML = '返回';
        this.calendarDiv.appendChild(this.btn );
        //创建日历表
        this.tableDom = document.createElement('table');
        this.calendarDiv.appendChild(this.tableDom);
        //创建星期数组
        this.weekArr = ["日","一","二","三","四","五","六"];
        //动态添加星期
        for(var i=0, len=this.weekArr.length; i<len; i++){
            var th = document.createElement('th');
            th.innerHTML = this.weekArr[i];
            this.tableDom.appendChild(th);
        }
        //动态创建表格
        for(var i=0; i<6; i++){
            var tr = document.createElement('tr');
            for(var j=0; j<7; j++){
                var td = document.createElement('td');
                tr.appendChild(td);
            }
            this.tableDom.appendChild(tr);
        }
        this.tds = this.tableDom.getElementsByTagName('td');
    };
    /**
     * 获取日期方法
     * @param year
     * @param month
     * @param date
     */
    Calendar.prototype.getDay = function (year,month,date) {
        var self = this;
     this.year = year;
     this.month = month;
     date && (this.date = date);
     this.yearSelect.value = this.year;
     this.monthSelect.value = this.month;
     //获取当前月的第一天是星期几
     var thisMOnthFirstDate = this.thisMOnthFirstDate = (new Date(year,month-1,1)).getDay();
      //0 是星期天
      thisMOnthFirstDate = (thisMOnthFirstDate == 0) ? 7 : thisMOnthFirstDate;
      this.thisMOnthFirstDate = thisMOnthFirstDate;
      //获取上个月有多少天
      var preMonthSumDate = this.preMonthSumDate = new Date(new Date(year,month-1,1)-1).getDate();
      //获取当前月的天数
      var thisMonthSumDate = this.thisMonthSumDate = (function () {
          switch (month){
              case 1 :
              case 3 :
              case 5 :
              case 7 :
              case 8 :
              case 10 :
              case 12 :
                  return 31;
                  break;
              case 4 :
              case 6 :
              case 9 :
              case 11 :
                  return 30;
                  break;
              case 2 :
                  if( (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0) ){
                      return 29;
                  };
                  return 28;
                  break;
          }
      })();
        //渲染上个月的日期
      for(var i=0; i<thisMOnthFirstDate; i++){
          this.tds[i].innerHTML = preMonthSumDate - thisMOnthFirstDate + i+1;
          this.tds[i].className = 'col';
      }
      //渲染本月日期
      for(var i=thisMOnthFirstDate; i<thisMonthSumDate+thisMOnthFirstDate; i++){
          this.tds[i].innerHTML = i - thisMOnthFirstDate + 1;
          this.tds[i].className = '';
      }
      //渲染下个月的日期
      for(var i=thisMonthSumDate+thisMOnthFirstDate; i<42; i++){
          this.tds[i].innerHTML = i - thisMonthSumDate - thisMOnthFirstDate + 1;
          this.tds[i].className = 'col';
      }
      //当日期改变时改变input值
        var weekArr = ['一','二','三','四','五','六','日'];
      if(date != undefined){
          this.tds[ thisMOnthFirstDate + date - 1].className = 'cur';
          this.dateBox.innerHTML = year + '-' + month + '-' + date + '&nbsp;星期' + weekArr[(new Date(year + '-' + month + '-' + date).getDay()-1)];
          this.dateBox.className = 'current';
      }
        this.btn.onclick = function () {
            self.dateBox.innerHTML = year + '-' + month + '-' + date + '&nbsp;星期' + weekArr[(new Date(year + '-' + month + '-' + date).getDay()-1)];
        }
    };
    /**
     * 事件监听
     */
    Calendar.prototype.bindEvent = function () {
        var self = this;
        /**
         * 选择年份事件
         */
        this.yearSelect.onchange = function () {
            self.dateBox.value = '';
            self.getDay(parseInt(this.value),parseInt(self.monthSelect.value));
        };

        /**
         * 选择月份
         */
        this.monthSelect.onchange = function () {
            self.dateBox.value = '';
            self.getDay(parseInt(self.yearSelect.value),parseInt(this.value));
        };

        //输入对应的日期数字，匹配对应日期
        this.dateBox.oninput = function () {
            var val = this.value;
            var valArr = val.match(/(\d+)-(\d+)-(\d+)/);
            if(valArr){
                var y = parseInt(valArr[1]);
                var m = parseInt(valArr[2]);
                var d = parseInt(valArr[3]);
                self.getDay(y,m,d);
            }
        };
        //把所有的tds绑定事件
        for(var i=0; i<this.tds.length; i++){
            (function (i) {
                self.tds[i].onclick = function () {
                    var FirstDate = (self.thisMOnthFirstDate == 0) ? 7 :self.thisMOnthFirstDate;
                    var temp = i;
                    if(temp < FirstDate){
                        if(self.month-1<=0){
                            var y = self.year -1;
                            var m = 12;
                            var d = self.preMonthSumDate - FirstDate + i + 1;
                            self.getDay(y,m,d);
                        }else{
                            var y = self.year;
                            var m = self.month -1;
                            var d = self.preMonthSumDate - FirstDate + i + 1;
                            self.getDay(y,m,d);
                        }
                    }else if(temp < FirstDate + self.thisMonthSumDate){
                        var y = self.year;
                        var m = self.month;
                        var d = temp - self.thisMOnthFirstDate + 1;
                        self.getDay(y,m,d);
                    }else{
                        if(self.month + 1 >12){
                            var y = self.year + 1;
                            var m =1;
                            var d = temp - (self.thisMOnthFirstDate + self.thisMonthSumDate) + 1;
                            self.getDay(y,m,d);
                        }else{
                            var y = self.year;
                            var m = self.month +1;
                            var d = temp - (self.thisMonthSumDate + self.thisMOnthFirstDate) + 1;
                            self.getDay(y,m,d);
                        }
                    }
                }
            })(i)
        }
    };

})();