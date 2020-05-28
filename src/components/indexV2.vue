<template>
<el-container>
  <el-header style="height: 65px; padding:0 10px;">
      <!-- <p><span>业绩实时表</span></p> -->
      <div class="block">
          <el-date-picker class="time" v-model="value1" type="date" value-format="yyyy-MM-dd" placeholder="开始日期" :editable="false"> </el-date-picker>
          <span class="demonstration">-</span>
          <el-date-picker class="time" v-model="value2" type="date" value-format="yyyy-MM-dd" placeholder="结束日期" :editable="false"> </el-date-picker>
          <!-- <el-button type="primary" plain @click="open">查看</el-button> -->        
      </div>
       <p class="see" @click="open"><i  class="el-icon-search"></i> 查看</p>
  </el-header>    
  <el-main>
    <div class="box-card">
      <div class="header">
        <span>汇总消息</span>
      </div>
      <!-- <div style="display: flex; align-content: space-around;">
        <div class="text item">应收率<br><span>60%</span> </div>
        <div class="text item">实收率<br><span>60%</span></div>
        <div class="text item">人员数<br><span>60</span></div>
        <div class="text item">保本 | 复工<br><span>60% | 70%</span></div>
      </div>  -->    
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="成交应收" name="first">
        <div style="display: flex; align-content: space-around;">
        <div class="text item">净佣金<br><span>{{unitConvert(receivableAll.commission)}}</span> </div>
        <div class="text item">成交金额<br><span>{{unitConvert(receivableAll.sum)}}</span></div>
        <div class="text item">成交单数<br><span>{{amountUnitConvert(receivableAll.amount)}}</span></div>
        <div class="text item">成交面积<br><span>{{areaUnitConvert(receivableAll.area)}}</span></div>
      </div>
        <el-table :data="receivable" style="width: 100%;margin-bottom: 20px;" :header-cell-style="{background:'#e9f0f6',color:'#606266'}" show-summary max-height="90%"
          :row-class-name="tableRowClassName" row-key="id" border default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column class="bgFixed" fixed prop="deptName" label="部门" width="100" > </el-table-column>
            <el-table-column prop="commission" label="净佣金" sortable width="90"> </el-table-column>
            <el-table-column prop="sum" label="成交金额"> </el-table-column>
            <el-table-column prop="amount" label="成交单数"  width="100"> </el-table-column>
            <el-table-column prop="area" label="成交面积" width="80"> </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="实收" name="second">
          <el-table :data="tableData2" style="width: 100%;margin-bottom: 20px;" :header-cell-style="{background:'#eef1f6',color:'#606266'}"
            :row-class-name="tableRowClassName" row-key="id" border default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
              <el-table-column fixed prop="date" label="部门" width="100"> </el-table-column>
              <el-table-column prop="name" label="月实收"  width="90"> </el-table-column>
              <el-table-column prop="address" label="日实收"> </el-table-column>
              <el-table-column prop="toTaday" label="至今需完成"  width="100"> </el-table-column>
              <el-table-column prop="province" label="实际上数" width="80"> </el-table-column>
              <el-table-column prop="city" label="应实差额" width="80"> </el-table-column>
              <el-table-column prop="zip" label="月实收完成率" width="110"> </el-table-column>
          </el-table>
      </el-tab-pane>
      <el-tab-pane label="人员构成" name="third">
          <el-table :data="tableData3" style="width: 100%;margin-bottom: 20px;" :header-cell-style="{background:'#eef1f6',color:'#606266'}"
            :row-class-name="tableRowClassName" row-key="id" border default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
              <el-table-column fixed prop="date" label="部门" width="100"> </el-table-column>
              <el-table-column prop="name" label="在职"  width="90"> </el-table-column>
              <el-table-column prop="address" label="销售" width="80"> </el-table-column>
              <el-table-column prop="toTaday" label="策划"  width="80"> </el-table-column>
              <el-table-column prop="province" label="文员" width="80"> </el-table-column>
              <el-table-column prop="zip" label="管理"> </el-table-column>
          </el-table>
      </el-tab-pane>
      <el-tab-pane label="保本复工情况" name="fourth">
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
      </el-tab-pane>
    </el-tabs>     
  </el-main>
</el-container>
</template>

<script>

export default {
    name:'indexV2',
    data() {
      const item = { 
          date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        value1: '',
        value2: '',
        activeName: 'first',
        receivableAll:'',
        receivable:[],
        tableData: Array(10).fill(item), 

        tableData1: [{
          id: 1, date: '二级市场', name: '12', address: '15%', toTaday: '12', province: '0.5', city: '普陀区', zip: 200333,
          children: [{
              id: 11, date: '一部', name: '123', address: '15%', toTaday: '12', province: '1.5', city: '普陀区', zip: 200333
            }, {
              id: 12, date: '二部', name: '23', address: '15%', toTaday: '12', province: '1.5', city: '普陀区', zip: 200333
          }, {
              id: 13, date: '衡阳', name: '23', address: '15%', toTaday: '12', province: '1.5', city: '普陀区', zip: 200333
          }]
        }, {
          id: 2, date: '二级市场A', name: '23', address: '15%', toTaday: '12', province: '0.55', city: '普陀区', zip: 200333
        }, {
          id: 3, date: '株洲', name: '-13', address: '1%', toTaday: '12', province: '0.5', city: '普陀区', zip: 200333,          
        }, {
          id: 4, date: '海南', name: '23', address: '1%', toTaday: '12', province: '0.55', city: '普陀区', zip: 200333
        }],

        tableData2: [{
          id: 1, date: '合计', name: '13', address: '1518 弄', toTaday: '12', province: '上海', city: '普陀区', zip: 200333
        },{
          id: 2, date: '二级市场', name: '12', address: '1518 弄', toTaday: '12', province: '上海', city: '普陀区', zip: 200333,
          children: [{
              id: 21, date: '一部', name: '123', address: '1518 弄', toTaday: '12', province: '上海', city: '普陀区', zip: 200333
            }, {
              id: 22, date: '二部', name: '23', address: '1518 弄', toTaday: '12', province: '上海', city: '普陀区', zip: 200333
          }, {
              id: 23, date: '衡阳', name: '23', address: '1518 弄', toTaday: '12', province: '上海', city: '普陀区', zip: 200333
          }]
        }, {
          id: 3, date: '二级市场A', name: '23', address: '1518 弄', toTaday: '12', province: '上海', city: '普陀区', zip: 200333
        }, {
          id: 4, date: '株洲', name: '-13', address: '1518 弄', toTaday: '12', province: '上海', city: '普陀区', zip: 200333,          
        }, {
          id: 5, date: '海南', name: '23', address: '1518 弄', toTaday: '12', province: '上海', city: '普陀区', zip: 200333
        }],

        tableData3: [{
          id: 1, date: '合计', name: '13', address: '1518 弄', toTaday: '12', province: '上海', city: '普陀区', zip: 200333
        },{
          id: 2, date: '二级市场', name: '12', address: '1518 弄', toTaday: '12', province: '上海', city: '普陀区', zip: 200333,
          children: [{
              id: 21, date: '一部', name: '123', address: '1518 弄', toTaday: '12', province: '上海', city: '普陀区', zip: 200333
            }, {
              id: 22, date: '二部', name: '23', address: '1518 弄', toTaday: '12', province: '上海', city: '普陀区', zip: 200333
          }, {
              id: 23, date: '衡阳', name: '23', address: '1518 弄', toTaday: '12', province: '上海', city: '普陀区', zip: 200333
          }]
        }, {
          id: 3, date: '二级市场A', name: '23', address: '1518 弄', toTaday: '12', province: '上海', city: '普陀区', zip: 200333
        }, {
          id: 4, date: '株洲', name: '-13', address: '1518 弄', toTaday: '12', province: '上海', city: '普陀区', zip: 200333,          
        }, {
          id: 5, date: '海南', name: '23', address: '1518 弄', toTaday: '12', province: '上海', city: '普陀区', zip: 200333
        }],

        tableData4: [{
          id: 1, date: '合计', name: '13', address: '1518 弄', toTaday: '12', province: '上海', city: '普陀区', zip: 200333
        },{
          id: 2, date: '二级市场', name: '12', address: '1518 弄', toTaday: '12', province: '上海', city: '普陀区', zip: 200333,
          children: [{
              id: 21, date: '一部', name: '123', address: '1518 弄', toTaday: '12', province: '上海', city: '普陀区', zip: 200333
            }, {
              id: 22, date: '二部', name: '23', address: '1518 弄', toTaday: '12', province: '上海', city: '普陀区', zip: 200333
          }, {
              id: 23, date: '衡阳', name: '23', address: '1518 弄', toTaday: '12', province: '上海', city: '普陀区', zip: 200333
          }]
        }, {
          id: 3, date: '二级市场A', name: '23', address: '1518 弄', toTaday: '12', province: '上海', city: '普陀区', zip: 200333
        }, {
          id: 4, date: '株洲', name: '-13', address: '1518 弄', toTaday: '12', province: '上海', city: '普陀区', zip: 200333,          
        }, {
          id: 5, date: '海南', name: '23', address: '1518 弄', toTaday: '12', province: '上海', city: '普陀区', zip: 200333
        }]
      }
    },
    mounted () {    
      this.$axios.post('/data/data/getData.do?id=20200143').then(res=>{
        console.log(res); 
        if (res.data.state == 0) {            
            let allBase = res.data.data;
            this.receivableAll= allBase.datastes.receivableData
            console.log("第一层最大级",allBase); 
            console.log("第一层最大级all",this.receivableAll,this.receivableAll.commission);             
            let twoBase = allBase.children;
            console.log("第二层最大级",twoBase);
            for(var i=0; i<twoBase.length; i++){ 
                let trTd = "", list ="" ;
                if(twoBase[i].datastes != null){
                  trTd = twoBase[i].datastes.receivableData;
                  list = {id: "i"+i, deptName: twoBase[i].deptName, commission: this.unitConvert(trTd.commission), sum: this.unitConvert(trTd.sum), amount: this.amountUnitConvert(trTd.amount), area: this.areaUnitConvert(trTd.area)};
                }else{
                  list = {id: "i"+i, deptName: twoBase[i].deptName, commission: 0, sum: 0, amount: 0, area: 0};  
                }               
                console.log("成交应收数据",trTd);              
                              
                let threeBase=[];
                if (twoBase[i].children != null && twoBase[i].children.length>=0) {
                    for(var j=0; j<twoBase[i].children.length; j++){
                        let listProgeny = "";
                        if(twoBase[i].children[j].datastes != null){
                          trTd = twoBase[i].children[j].datastes.receivableData;
                          listProgeny = {id: i+ ''+j, deptName: twoBase[i].children[j].deptName, commission: this.unitConvert(trTd.commission), sum: this.unitConvert(trTd.sum), amount: this.unitConvert(trTd.commission), sum: this.unitConvert(trTd.sum), amount: this.amountUnitConvert(trTd.amount), area: this.areaUnitConvert(trTd.area)};
                        }else{
                          listProgeny = {id: i+ ''+j, deptName: twoBase[i].children[j].deptName, commission: 0, sum: 0, amount: 0, area: 0};  
                        } 
                        // let listProgeny = {id: i+ ''+j, deptName: twoBase[i].children[j].deptName, commission: '10%', sum: '3.2', amount: 10, area: 10};
                        threeBase.push(listProgeny)
                    }
                    //console.log(i+"第三层",threeBase);                     
                }
                list.children=threeBase;
                this.receivable.push(list)                
            }
            console.log("第二层receivable",this.receivable);  
        } else {
            this.$message({
                showClose: true,
                message: res.data.message,
                type: 'error',
                //duration: 0
            });
        }      
      }).catch(error=>{
          //失败
          console.log(error);
          this.$message({
              showClose: true,
              message: '请求出错，自定义！',
              type: 'error',
              //duration: 0
          });
      });

      var data=this.unitConvert(10015612324);
      console.log(data)
    },
    methods: {
      
      jia () {
        this.msg++
      },
      jian () {
        this.msg--
      },
      tableRowClassName({row, rowIndex}) {
        // console.log("行数：",row,rowIndex)
        if (row.children != null && row.children.length>=0) {
          return 'success-row';
        }
        return '';
      },
      // 面积单位换算
      areaUnitConvert(num) {
          let areaUnits = ["㎡", "万㎡"] 
          var dividend = 10000;
          let curentNum = num;
          //转换数字 
          var acurentUnit = areaUnits[0];
          //转换单位 
          for (var i = 0; i <4; i++) { 
              acurentUnit = areaUnits[i] 
              if(this.strNumSize(curentNum)<5){ 
                  break;
              }
              curentNum = curentNum / dividend 
          } 
          var am = {num: 0, unit: ""} 
          am.num = curentNum.toFixed(2)
          am.unit = acurentUnit;
          // return am;
          return am.num+am.unit
      },
      // 单量单位换算
      amountUnitConvert(num) {
          let amountUnits = ["单", "万单"] 
          var dividend = 10000;
          let curentNum = num;
          //转换数字 
          var acurentUnit = amountUnits[0];
          //转换单位 
          for (var i = 0; i <4; i++) { 
              acurentUnit = amountUnits[i] 
              if(this.strNumSize(curentNum)<5){ 
                  break;
              }
              curentNum = curentNum / dividend 
          } 
          var aum = {num: 0, unit: ""} 
          aum.num = curentNum.toFixed(2)
          aum.unit = acurentUnit;
          // return am;
          return aum.num+aum.unit
      },
      // 金额单位换算
      unitConvert(num) {
          let moneyUnits = ["元", "万", "亿", "万亿"] 
          var dividend = 10000;
          let curentNum = num;
          //转换数字 
          var curentUnit = moneyUnits[0];
          //转换单位 
          for (var i = 0; i <4; i++) { 
              curentUnit = moneyUnits[i] 
              if(this.strNumSize(curentNum)<5){ 
                  break;
              }
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
          if(index!=-1){
              newNum = stringNum.substring(0,index) 
          } 
          return newNum.length
      },
      open() {
        this.$message('这是时间段是：'+this.value1+this.value2);
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      /* tableRowClassName({row, rowIndex}) {
        //console.log("行数：",row,rowIndex)
        if (rowIndex === 0) {
          return 'success-row';
        }
        return '';
      }, */
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = 'N/A';
          }
        });

        return sums;
      }
    }
}
</script>

<style scoped>
  .el-container{background: #66b1ff;}
 .el-header{
    padding:0;  text-align: center; 
    /*background: #66b1ff; box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2); */
 }
 .demonstration{
   color: #ffffff;
 }
 /* .el-header p{
     color: #ffffff;  margin: 0;
    line-height: 48px;
    background-color: #53a8ff; font-size: 20px;
 } */
 .el-input--suffix .el-input__inner {
   padding-left: 20px; padding-right: 20px;
 }
 .see{
   float:right; font-size: 16px; margin: 10px 0;  color: #ffffff; line-height: 48px;
 }
 .block{
     margin: 10px 0; float: left; width: 81%;
 }
 .time{
     width: 46%!important;
 }
.el-input--suffix /deep/  .el-input__inner {
  padding-left: 25px; padding-right: 15px;
 }
 /deep/ .el-input__icon {
   width: 20px;
 }
 .el-main{
    padding: 10px; border-radius: 12px 12px 0 0;  background: #ffffff;
 }
  .box-card {
    /* width: 80%; margin:auto;  border: 1px solid #dddddd; */
    border-radius: 5px;
  }
  .header{
     padding: 1px 5px; margin: 0.5% 0 1.5%; border-left: 2px solid #53a8ff; font-weight: bold;
  }
  .item {
    font-size: 14px; padding: 2% 0; width: 22%; display: inline-block; text-align: center;  background-color: #e9f0f6;
    margin-bottom: 10px; margin-right: 2%; color: #666; border-radius: 4px;
  }
  .item:last-child{
    margin-right: 0; width: 28%;
  }
  .item span{
    color: #f56c6c; margin-top: 8px; display: inline-block; font-weight: bold; font-size: 16px;
  }

 .current-row > td {
   background: rgba(0, 158, 250, 0.219) !important;
}
 .el-table{
    border: 1px solid #ddd; border-radius: 4px;
 }
 @media (max-width: 330px) {
  .block{
     width: 82%;
  }
 }
 
</style>
