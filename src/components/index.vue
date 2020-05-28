<template>
<el-container class="telWidth">
  <el-header style="height: 55px; padding:0 10px;">
    <p><span @click="ejectFrame">{{looktime}}</span>经营报告</p>
    <h2>
      <!-- 事业一部 -->
      <select><option>事业一部</option><option>事业er部</option></select>
    </h2> 
  </el-header> 
  <el-drawer :visible.sync="drawer" :direction="direction" :with-header="false" >
    <div class="demo-drawer__content">
      <div class="timePart">
        <el-button v-for="(time, index) in timePart" 
          :key="index" @click="setTimeFilter(time, index)" 
          :class="{'active': timeClick === index}" 
        >{{time}}</el-button>
      </div>
      <div>
        <calendar ref="myCalendar" :show = true mode="during" :defaultDate="defaultDate" :maxDate="maxDate" @change="onChange"/>
      </div>
      <div class="demo-drawer__footer">
        <el-button  type="info" @click="cancelForm">取 消</el-button>
        <el-button type="success" @click="determine">确定</el-button>
      </div>
    </div>
  </el-drawer> 

  <el-main>   
    <div class="box-card">
      <div class="title">
        <!-- <h2>汇总消息</h2> -->
        <!-- <div><router-link to="/todayReport"><b><i class="el-icon-document"></i>今日</b></router-link></div> -->
      </div>
      <ul class="cards">
        <li class="card"> 
          <div class="card-head">
            <h3>应收数据</h3>
          </div>
          <div class="card-content">
            <div class="text item">净佣金<p>{{receivableAll.commission}}</p></div>
            <div class="text item">成交单数<p>{{receivableAll.amount}}</p></div>
            <div class="text item">成交金额<p>{{receivableAll.sum}}</p></div>
            <div class="text item">成交面积<p>{{receivableAll.area}}</p></div>
          </div>
          <div class="allprogress">
            <p>目标完成进度（{{timeDeg}}） <span>{{this.unitConvert("元", receivableTarget)}}</span></p>
            <el-progress :percentage="percentage1" :color="colorMethod"></el-progress>
          </div>
        </li>
        <li class="card"> 
          <div class="card-head">
            <h3>实收数据</h3>
          </div>
          <div class="card-content">
            <div class="text item">净佣金<p>{{receiptsAll.commission}}</p> </div>
            <div class="text item">单数<p>{{receiptsAll.amount}}</p></div>
            <div class="text item"></div>
            <div class="text item" @click="toggleReceivable">查看详情<p><i class="el-icon-arrow-down"></i></p></div>
          </div>
          <div class="allInfo" v-if="receivableInfo">
            <el-table :data="receiptsdetails" max-height="350" style="width: 100%">
              <el-table-column type="expand" width="20">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="付款企业"> <span>{{ props.row.payer }}</span> </el-form-item>
                    <el-form-item label="发票号"> <span>{{ props.row.invoiceNO }}</span> </el-form-item>
                    <el-form-item label="开票时间"> <span>{{ props.row.invoiceDate }}</span> </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column label="时间" prop="receiptsDate"> </el-table-column>
              <el-table-column label="项目单位" prop="deptName"> </el-table-column>
              <el-table-column label="金额" prop="receipts"> </el-table-column>
              <el-table-column label="类型" prop="receiptsType" width="80"> </el-table-column>
            </el-table>
          </div>
          <div class="allprogress">
            <p>目标完成进度（{{timeDeg}}） <span>{{this.unitConvert("元", receiptsTarget)}}</span></p>        
            <el-progress :percentage="percentage2" :color="colorMethod"></el-progress>            
          </div>
        </li>
        <li class="card">
          <div class="card-head">
            <h3>人员数据</h3> <!-- <span>{{humanResourceAll.onJobCount}}人</span> -->
          </div>
          <div class="card-content">
            <div class="text item">在职<p>{{humanResourceAll.onJobCount}}人</p> </div>
            <div class="text item">入职<p>{{humanResourceAll.entryCount}}人</p> </div>
            <div class="text item">离职<p>{{humanResourceAll.dimissionCount}}人</p></div>
            <div class="text item">离职率<p>{{humanResourceAll.dimissionRate}}%</p></div>
            <div class="text item">销售<p>{{humanResourceAll.sellCount}}人</p> </div>
            <div class="text item">策划<p>{{humanResourceAll.planningCount}}人</p></div>
          </div>
        </li>
      </ul>   
    </div>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="成交应收" name="first">
        <el-table :data="receivable" style="width: 100%;margin-bottom: 20px;" :header-cell-style="{background:'#e9f0f6',color:'#606266'}"
          :row-class-name="tableRowClassName" row-key="id" border default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column class="bgFixed" fixed prop="deptName" label="部门" width="120" > </el-table-column>
            <el-table-column prop="commission" label="净佣金" sortable width="90"> </el-table-column>
            <el-table-column prop="sum" label="成交金额" width="100"> </el-table-column>
            <el-table-column prop="amount" label="成交单数"  width="100"> </el-table-column>
            <el-table-column prop="area" label="成交面积"> </el-table-column>
        </el-table>
      </el-tab-pane>
     <el-tab-pane label="实收" name="second">
        <el-table :data="receipts" style="width: 100%;margin-bottom: 20px;" :header-cell-style="{background:'#eef1f6',color:'#606266'}"  @cell-click="cellClick"
          :row-class-name="tableRowClassName" row-key="id" border default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column fixed prop="deptName" label="部门" width="100"> </el-table-column>
            <el-table-column prop="datastes.receiptsData.commission" label="净佣金" sortable> </el-table-column>
            <el-table-column prop="datastes.receiptsData.amount" label="单数"> </el-table-column>
        </el-table>
      </el-tab-pane> 
      <el-tab-pane label="人员信息" name="third">        
        <el-table :data="humanResource" style="width: 100%;margin-bottom: 20px;" :header-cell-style="{background:'#eef1f6',color:'#606266'}"  @cell-click="cellClick"
          :row-class-name="tableRowClassName" row-key="id" border :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column fixed prop="deptName" label="部门" width="120"> </el-table-column>
            <el-table-column prop="datastes.humanResourceData.onJobCount" label="在职" sortable  width="90"> </el-table-column>
            <el-table-column prop="datastes.humanResourceData.entryCount" label="入职" width="80"> </el-table-column>
            <el-table-column prop="datastes.humanResourceData.dimissionCount" label="离职"  width="80"> </el-table-column>
            <el-table-column prop="datastes.humanResourceData.dimissionRate" label="离职率" width="80"> </el-table-column>
            <el-table-column prop="datastes.humanResourceData.sellCount" label="销售" width="80"> </el-table-column>
            <el-table-column prop="datastes.humanResourceData.planningCount" label="策划" width="80"> </el-table-column>
        </el-table>
      </el-tab-pane>

      <!--<el-tab-pane label="保本复工情况" name="fourth">
        <el-table :data="tableData4" style="width: 100%;margin-bottom: 20px;" :header-cell-style="{background:'#eef1f6',color:'#606266'}"
          :row-class-name="tableRowClassName" row-key="id" border default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column fixed prop="date" label="部门" width="100"> </el-table-column>
            <el-table-column prop="name" label="50%复工率保本点"  width="100"> </el-table-column>
            <el-table-column prop="address" label="自坏视为成本保本点（50%）" width="120"> </el-table-column>
            <el-table-column prop="toTaday" label="自坏视为成本保本点"  width="100"> </el-table-column>
            <el-table-column prop="province" label="打卡人数" width="80"> </el-table-column>
            <el-table-column prop="city" label="月复工率" width="80"> </el-table-column>
            <el-table-column prop="zip" label="各部门反馈目标值"> </el-table-column>
        </el-table>
      </el-tab-pane>-->
    </el-tabs>     
  </el-main>
  <go-top></go-top>
</el-container>
</template>

<script>
import qs from 'qs'
import { Loading } from 'element-ui';
import goTop from './goTop'
export default {
  name:'index',
  components:{
    goTop
  },
  data() {
    return {
      timePart:[ "今日", "昨日", "本月", "上月", "本年" ],
      timeClick:'0',
      defaultDate: [],
      maxDate: '',

      timeDeg: '日均',
      monthDay:'',
      receivableTarget:0,
      receiptsTarget:0,
      percentage1: 0,
      percentage2: 0,
      receivableInfo: false,

      drawer: false,
      direction: 'btt',
      looktime: '今日',
      startTime: '',
      endTime: '',

      activeName: 'second',
      receivableAll: {commission : 0, sum : 0, amount : 0, area : 0},
      receivable:[],
      humanResourceAll:{
        onJobCount : 0, entryCount : 0, dimissionCount : 0, dimissionRate : 0, sellCount : 0, planningCount : 0
      },
      humanResource:[],
      receiptsdetails:[],
      receiptsAll:{commission : 0, amount : 0},
      receipts:[],
      tableData4: [
      ]
    }
  },
  mounted () {   
    this.upMonth(this.looktime);
    let nowDate = this.startTime
    this.maxDate = nowDate
    this.defaultDate = [nowDate, nowDate]
    this.getBaseDate(this.startTime, this.endTime)
    let drawerGao = document.getElementsByClassName("el-drawer")[0]
    drawerGao.style.height = 420+"px"
  },
  methods: {
    // 弹出时间框
    ejectFrame(){
      this.drawer = true;
      if (this.looktime.length>3) {
        $(".el-button").removeClass("active")
      }
    },
    // 自定义时间段
    onChange(date) {
      let sdate = JSON.stringify(date.map((item) => item.format('YYYY-MM-DD')));
      var d = JSON.parse(sdate);
      console.log(d)
      if(d.length == 1){
        this.startTime = d[0];
        this.endTime = d[0];
      }else{
        this.startTime = d[0];
        this.endTime = d[1];
      }
    },
    // 快捷时间段
    setTimeFilter (time, index) {
      this.timeClick = index
      this.looktime = time
      this.cancelForm()
      this.upMonth (this.looktime)
      console.log("快捷："+this.startTime+" "+this.endTime)
      this.$refs.myCalendar.changeDate([this.startTime, this.endTime])
      this.getBaseDate(this.startTime, this.endTime)

      $(".allprogress").show()
    },
    // 时间选段确定
    determine() {
      this.drawer = false;
      $(".allprogress").hide()
      this.looktime = this.startTime+" 至 "+this.endTime
      this.getBaseDate(this.startTime, this.endTime)
    },
    // 时间选段取消
    cancelForm() {
      this.drawer = false;
    },
    // 时间段日期
    upMonth (report) {
      let beginTime = '', endTime = '';
      var myDate = new Date();
      var oYear = myDate.getFullYear();
      var oMonth = myDate.getMonth();
      this.monthDay = new Date(oYear,formatTen( (oMonth+1) ),0);
      var lastDateMonth = this.monthDay.getDate()

      if (report == '昨日') {
        myDate.setTime(myDate.getTime()-24*3600*1000);
        beginTime = oYear+"-" + formatTen( (oMonth+1) ) + "-" + formatTen(myDate.getDate());
        endTime = beginTime; 

      } else if (report == '今日') {
        myDate.setTime(myDate.getTime());
        beginTime = oYear+"-" + formatTen((oMonth+1)) + "-" + formatTen(myDate.getDate());
        endTime = beginTime;
        
      }else if (report == '本月') {
        beginTime = oYear+'-'+formatTen( (oMonth+1) )+'-01';
        endTime = oYear+'-'+formatTen( (oMonth+1) )+'-'+lastDateMonth;

      } else if (report == '上月') {
        if (oMonth === 0) {
            oMonth = 12;
            oYear = oYear-1;
        } else if (oMonth < 10) {
            oMonth = '0'+oMonth;
        }
        var monthDate = new Date(oYear, oMonth, 0);
        beginTime = oYear+'-'+oMonth+'-01';
        endTime = oYear+'-'+oMonth+'-'+formatTen(monthDate.getDate());

      }else if (report == '本年') {
        beginTime = oYear+'-01-01';
        endTime = oYear+'-12-31';
      }
      this.startTime = beginTime;
      this.endTime =endTime;

      function formatTen(num) {
        return num > 9 ? (num + "") : ("0" + num);
      }
    },

    //进度条颜色改变
    colorMethod(percentage) {
      if (percentage < 33) {
        return '#f56c6c';
      } else if (percentage < 66) {
        return '#E6A23C';
      } else {
        return '#67c23a';
      }
    },
    //应收列表的切换
    toggleReceivable(){
      if(this.receivableInfo){
        $(".card-content p i").css({"transform": "rotate(0deg)"})
        this.receivableInfo = false;
      }else{
        $(".card-content p i").css({"transform": "rotate(180deg)"})
        this.receivableInfo = true;
      } 
    },
    //特定行添加样式
    tableRowClassName({row, rowIndex}) {
      // console.log("行数：",row,rowIndex)
      if (row.children != null && row.children.length>=0) {
        return 'success-row';
      }
      return '';
    },
    // 单位换算
    unitConvert(obj, num) {
      let moneyUnits = [];
      if(obj == "元"){
        moneyUnits = ["元", "万", "亿", "万亿"]
      }else if(obj == "单"){
        moneyUnits = ["单", "万单"] 
      } else{
        moneyUnits = ["㎡", "万㎡"] 
      } 
      var dividend = 10000;
      let curentNum = num;
      //转换数字 
      var curentUnit = moneyUnits[0];
      //转换单位 
      for (var i = 0; i <4; i++) { 
          curentUnit = moneyUnits[i] 
          if(strNumSize(curentNum)<5){ break; }
          curentNum = curentNum / dividend 
      } 
      var m = {num: 0, unit: ""} 
      m.num = curentNum.toFixed(2)
      m.unit = curentUnit;
      // return m;
      return m.num+m.unit

      function strNumSize(tempNum){
        var stringNum = tempNum.toString() 
        var index = stringNum.indexOf(".") 
        var newNum = stringNum;
        if(index!=-1){ newNum = stringNum.substring(0,index) } 
        return newNum.length
      }
    },

    handleClick(tab, event) {
      //console.log(tab, event);
    },
    //获取树列表的所有节点
    getCheckedKeys (data, key) {
      var res = [];
      recursion(data, false);
      return res;
      function recursion (arr, isChild) {
        var aCheck = [];
        for ( var i = 0; i < arr.length; i++ ) {
          let obj = arr[i];
          aCheck[i] = false;
          if ( obj.children ) {
            aCheck[i] = recursion(obj.children, true) ? true : aCheck[i];
            if ( aCheck[i] ) { res.push(obj); }
          }
          aCheck[i] = true;
          if ( res.indexOf(obj[key]) == -1 ) { res.push(obj); }
        }
        if ( isChild ) { return aCheck.indexOf(true) != -1; }
      }
    },

    overview(obj){     
      if(obj.targetData){ //目标
        if(this.looktime.indexOf("日")>0){
          this.timeDeg = '日均'
          if(obj.targetData.receiptseTargetM >= 0){
            this.receiptsTarget = Math.round(obj.targetData.receiptseTargetM / this.monthDay.getDate()*100)/100 
          }
          if(obj.targetData.commissionTargetM >= 0){
            this.receivableTarget = Math.round(obj.targetData.commissionTargetM / this.monthDay.getDate()*100)/100 
          }
        }else if(this.looktime.indexOf("月")>0){
          this.timeDeg = '月度'
          if(obj.targetData.receiptseTargetM >= 0){
            this.receiptsTarget = Math.round(obj.targetData.receiptseTargetM*100)/100 
          }
          if(obj.targetData.commissionTargetM >= 0){
            this.receivableTarget = Math.round(obj.targetData.commissionTargetM*100)/100 
          }
        }else if(this.looktime.indexOf("年")>0){
          this.timeDeg = '年度'
          if(obj.targetData.receiptseTargetM >= 0){
            this.receiptsTarget = Math.round(obj.targetData.receiptseTargetY*100)/100 
          }
          if(obj.targetData.commissionTargetM >= 0){
            this.receivableTarget = Math.round(obj.targetData.commissionTargetY*100)/100 
          }
        }
      }else{
        this.receiptsTarget = 0
        this.receivableTarget = 0
      }
      if(obj.receivableData){ //应收
        this.receivableAll = {
          commission : this.unitConvert("元", obj.receivableData.commission),
          sum : this.unitConvert("元", obj.receivableData.sum),
          amount : this.unitConvert("单", obj.receivableData.amount),
          area : this.unitConvert("米", obj.receivableData.area)
        }
        if(this.receivableTarget>0){
          this.percentage1 = Math.round((obj.receivableData.commission / this.receivableTarget*100) *100)/100 
        } 
      }
      else{
        this.receivableAll= { commission : 0, sum : 0, amount : 0, area : 0 }
        this.percentage1 = 0
      }
      if(obj.humanResourceData){ //人员
        this.humanResourceAll = {
          onJobCount: obj.humanResourceData.onJobCount, 
          entryCount: obj.humanResourceData.entryCount,
          dimissionCount: obj.humanResourceData.dimissionCount, 
          dimissionRate: obj.humanResourceData.dimissionRate, 
          sellCount: obj.humanResourceData.sellCount, 
          planningCount: obj.humanResourceData.planningCount
        }; 
      }
      if(obj.receiptsData){ //实收
        this.receiptsAll = {
          commission : this.unitConvert("元", obj.receiptsData.commission),
          amount : this.unitConvert("单", obj.receiptsData.amount)
        }; 
        this.receiptsdetails = obj.receiptsData.details
        if(this.receiptsTarget>0){
          this.percentage2 = Math.round((obj.receiptsData.commission / this.receiptsTarget*100)*100)/100
        }
      }else{
        this.receiptsdetails = []
        this.receiptsAll = { commission : 0, amount : 0 }
        this.percentage2 = 0
      }
    },

    cellClick(row, column) {
      console.log('点击行：',row)
    },

    //获取初始数据
    getBaseDate(startDate, endDate){
      this.receivable = []
      this.receipts = []
      this.humanResource = []
      let loadingInstance = Loading.service({ text: "加载中...", background: "rgba(0,0,0,0.6)" });
      this.$axios.post('/data/data/getData.do',qs.stringify({
        id: '20200143',
        startDateStr: startDate,
        endDateStr: endDate
      })).then(res=>{
        //console.log(res); 
        if (res.data.state == 0) {           
          let allBase = res.data.data;
          this.overview(allBase.datastes)        
          console.log("第一层最大级",allBase);            
          let twoBase = allBase.children;
          console.log("第二层最大级",twoBase);
          for(var i=0; i<twoBase.length; i++){ 
            var list1 = this.judgeData(i, twoBase[i].deptName, twoBase[i].datastes.receivableData)              
            let threeBase=[];
            if (twoBase[i].children != null && twoBase[i].children.length>=0) {
              for(var j=0; j<twoBase[i].children.length; j++){
                let list1Progeny = this.judgeDataChild(i, j, twoBase[i].children[j].deptName, twoBase[i].children[j].datastes.receivableData);
                threeBase.push(list1Progeny)
              }                   
            }
            list1.children=threeBase;
            this.receivable.push(list1) 

            //实收
            /* var list2 = this.judgeDatav2(twoBase[i], twoBase[i].datastes.receiptsData)
            this.receipts.push(list2) */
            this.receipts.push(twoBase[i])

            // 人事
            // var list3 = this.judgeDatav(twoBase[i], twoBase[i].datastes.humanResourceData)
            //this.humanResource.push(list3)
            this.humanResource.push(twoBase[i])
          }
          //console.log("应收 receivable",this.receivable);  
          //console.log("人事 humanResource",this.humanResource); 
          this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();            
          });
        } else {
          this.$message({
            showClose: true, message: res.data.message, type: 'error', //duration: 0
          });
        }                      
      }).catch(error=>{
        //失败
        this.$message({showClose: true,  message: '请求出错，请联系后台人员！', type: 'error'});
      });
    },
    judgeDatav(obj, data){
      let back = '';
      if(data){
        back = {id: obj.id, deptName: obj.deptName, onJobCount: data.onJobCount, entryCount: data.entryCount,
          dimissionCount: data.dimissionCount, dimissionRate: data.dimissionRate, sellCount: obj.sellCount, planningCount: obj.planningCount,
          children:obj.children};             
      }else{
        back = {id: obj.id, deptName: obj.deptName, onJobCount: 0, entryCount: 0, dimissionCount: 0, dimissionRate: 0, sellCount: 0, planningCount: 0}; 
      }
      return back
    },
    judgeDatav2(obj, data){
      console.log('实收表',obj,data);
      let back = '';
      if(data){
        back = {id: obj.id, deptName: obj.deptName, commission: this.unitConvert("元", data.commission), amount: this.unitConvert("单", data.amount),
          children:obj.children};             
      }else{
        back = {id: obj.id, deptName: obj.deptName, commission: 0, amount: 0, children:obj.children}; 
      }
      return back
    },
    judgeData(x, name, data){
      let back = '';
      if(data){
        back = {id: "i"+x, deptName: name, commission: this.unitConvert("元", data.commission), sum: this.unitConvert("元", data.sum), amount: this.unitConvert("单", data.amount), area: this.unitConvert("米", data.area)};             
      }else{
        back = {id: "i"+x, deptName: name, commission: 0, sum: 0, amount: 0, area: 0};  
      }
      return back
    },
    judgeDataChild(x, y, name, data){
      let back = '';
      if(data){
        back = {id: x+ ''+y, deptName: name, commission: this.unitConvert("元", data.commission), sum: this.unitConvert("元", data.sum), amount: this.unitConvert("单", data.amount), area: this.unitConvert("米", data.area)};             
      }else{
        back = {id: x+ ''+y, deptName: name, commission: 0, sum: 0, amount: 0, area: 0};  
      }
      return back
    }
  }  
}
</script>

<style lang="less" scoped>
@import './../assets/baseLess.less';

// .el-container{background: #66b1ff;}
.el-container{background: #e9f0f6; height: 100%;}
.el-header{
  padding:0; font-size: 16px; text-align: center;
  /*background: #66b1ff; box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2); */ 
  h2{
    margin: 0; font-size: 16px; color: #606266;
    select{
      border: none; background: transparent; font-size: 16px; color: #606266; outline: none; font-weight: bold;
    }
  }
  p{
    margin: 10px 0 5px;
    span{
      color: @blue; display: inline-block;  margin: 0 5px; 
      border-bottom: 1px @blue solid;
    }
  }
}
/deep/ .el-drawer.btt{ //时间插件
  .timePart{
    margin: 10px;
    button{
      padding: 10px 15px;
    }
  }
  .demo-drawer__footer{
    margin: 10px;
    button{
      width: 48%;
    }
  }
  .m-popover{
    position: static;
    .m-popover-container {
      position: static;
    }
  }
  .active{
    color: #3a8ee6; border-color: #3a8ee6; background-color: #ecf5ff; outline: 0;
  }
}

ul, li{
  list-style: none; margin: 0; padding: 0;
}
a{
  text-decoration: none;
}
.el-main{
  padding: 0px; border-radius: 10px 10px 0 0; margin-top: 10px;
  
  .title{
    h2{
      padding: 1px 5px; margin: 0.5% 0 1.5%; border-left: 2px solid #53a8ff; font-weight: bold; font-size: 16px;
    }
    div{
      display: inline-table; margin-left: calc(100% - 151px);
    }
    div b{
      background: #e9f0f6; color: #53a8ff; border-radius: 10px; display: block; text-align: center; width: 70px; padding: 3px 0px;
      font-weight: inherit; font-size: 14px;
    }
  }

  .card{ //列表卡片
    padding: 8px; background: #ffffff; margin-bottom: 10px; border-radius: 5px; box-shadow: 0 2px 5px 0 #d0e1f3;
    .card-head{
      h3{
        margin: 0; display: inline-block; font-size: 14px;
      }
      span{
        color: #f56c6c;
      }
    } 
    .card-content{ //总数据
      display: flex; align-content: space-around; align-items: baseline;
      .item {
        padding-top: 10px; width: 22%; text-align: center; margin-right: 2%; border-radius: 4px; color: #909399;
        p{
          margin: 0 0 5px; color: #303133;
          i{
            font-weight: bold; font-size: 16px; color: @blue; transition: All 0.2s;
          }
        }
      }
      .item:last-child{
        margin-right: 0;
      }
    }
    .allInfo{ //嵌套表格
      /deep/ .el-table .cell{
        padding-right: 0;
      }
      /deep/ .el-table__expanded-cell[class*=cell] {
        padding: 0 10px;
      }
      /deep/ .demo-table-expand .el-form-item {
        margin-right: 0; margin-bottom: 0; width: 100%; 
        label {
          width: 70px; color: #99a9bf; text-align: right; line-height: 35px;
        }
        .el-form-item__content{
          line-height: 35px;
        }
      }
    }
    .allprogress{  //进度条
      margin: 10px 10px 0;
      p{
        margin:0; color: #909399; margin-bottom: 5px;
        span{
          float: right; 
        }
      }
      /deep/ .el-progress-bar{
        padding-right: 63px; margin-right: -63px;        
      }
      /deep/ .el-progress__text{
        font-size: 14px; float: right; margin-left: 5px;
      }
    }
  }
 
  .el-tabs{ //滑动门
    background: #ffffff; padding: 5px 10px; border-radius: 5px;    
    .current-row > td {
      background: rgba(0, 158, 250, 0.219) !important;
    }
    .el-table{
      border: 1px solid #ddd; border-radius: 4px;
    }
  }
}
</style>
