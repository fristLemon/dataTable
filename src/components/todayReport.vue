<template>
<el-container class="telWidth"> 
  <el-main>
  <div class="title">
    <b @click="goBack"><i class="el-icon-arrow-left"></i></b>
    <h2>事业一部—今日报表数据</h2>
  </div>
  <ul>
    <li class="card"> 
      <div class="card-head">
        <h3>应收</h3> <span>12345.6万</span>
      </div>
      <div class="card-content">
        <div class="text item"><p>1232.6万</p>净佣金</div>
        <div class="text item"><p>123.6单</p>单数</div>
        <div class="text item"><p>123.4㎡</p>面积</div>
      </div>
    </li>
    <li class="card"> 
      <div class="card-head">
        <h3>实收</h3> <span>12345.6万</span>
      </div>
      <div class="card-content">
        <div class="text item"><p>1232.6万</p>净佣金 </div>
        <div class="text item"><p>123.6单</p>单数</div>
        <div class="text item"><p>123.4㎡</p>面积</div>
      </div>
    </li>
    <li class="card"> 
      <div class="card-head">
        <h3>人员</h3> <span>1023人</span>
      </div>
      <div class="card-content">
        <div class="text item"><p>112人</p>入职 </div>
        <div class="text item"><p>1人</p>离职</div>
        <div class="text item"><p>10%</p>离职率</div>
        <div class="text item"><p>150人</p>销售 </div>
        <div class="text item"><p>162人</p>策划</div>
      </div>
    </li>
  </ul>
  </el-main>
</el-container>
</template>

<script>
import { Loading } from 'element-ui';
export default {
    name:'todayReport',
    data() {
      return {
      }
    },
    mounted () {   
      let nowDate = this.getNowFormatDate();
    },
    methods: {
      // 返回上一页
      goBack(){
        this.$router.go(-1);
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
              if(this.strNumSize(curentNum)<5){ break; }
              curentNum = curentNum / dividend 
          } 
          var m = {num: 0, unit: ""} 
          m.num = curentNum.toFixed(2)
          m.unit = curentUnit;
          // return m;
          return m.num+m.unit
      },
      strNumSize(tempNum){
          var stringNum = tempNum.toString() 
          var index = stringNum.indexOf(".") 
          var newNum = stringNum;
          if(index!=-1){ newNum = stringNum.substring(0,index) } 
          return newNum.length
      },
      //当前日期
      getNowFormatDate() {
          var date = new Date();
          var seperator1 = "-";
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var strDate = date.getDate();
          if (month >= 1 && month <= 9) {
              month = "0" + month;
          }
          if (strDate >= 0 && strDate <= 9) {
              strDate = "0" + strDate;
          }
          var currentdate = year + seperator1 + month + seperator1 + strDate;
          return currentdate;
      }
    }
}
</script>

<style lang="less" scoped>
@import './../assets/baseLess.less';
.el-container{background: #e9f0f6; height: 100%;}
.title{
  margin: 0 0 10px;
  i{
    font-weight: bold; font-size: 20px; 
  }
  h2{
    text-align: center; display: inline-block; margin: 0;  font-size: 18px; margin-left: calc(50% - 72px);
  }
}
.el-main{
  padding: 10px; border-radius: 10px 10px 0 0;
}
ul, li{
  list-style: none; margin: 0; padding: 0;
}
.card{
  padding: 8px; background: #ffffff; margin-bottom: 15px; border-radius: 5px; box-shadow: 0 2px 8px 0 #d0e1f3;
  .card-head{
    h3{
      margin: 0; display: inline-block; font-size: @font_16;
    }
    span{
      color: #f56c6c; font-size: @font_16;
    }
  } 
  .card-content{
    display: flex; align-content: space-around; align-items: baseline;
    .item {
      padding-top: 10px; width: 22%; text-align: center; margin-right: 2%; color: #666; border-radius: 4px; color: #909399;
      p{
        margin: 0 0 5px; font-size: @font_16; color: #303133;
      }
    }
    .item:last-child{
      margin-right: 0;
    }
  }
}
@media (max-width: 330px) {
}
 
</style>
