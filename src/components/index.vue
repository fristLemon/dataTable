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
      <div style="display: flex; align-content: space-around;">
        <div class="text item">应收率<br><span>60%</span> </div>
        <div class="text item">实收率<br><span>60%</span></div>
        <div class="text item">人员数<br><span>60</span></div>
        <div class="text item">保本 | 复工<br><span>60% | 70%</span></div>
      </div>     
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="应收" name="first">
          <el-table :data="tableData1" style="width: 100%;margin-bottom: 20px;" :header-cell-style="{background:'#eef1f6',color:'#606266'}" show-summary
            row-key="id" border default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
              <el-table-column class="bgFixed" fixed prop="date" label="部门" width="100" > </el-table-column>
              <el-table-column prop="name" label="月应收" sortable width="90"> </el-table-column>
              <el-table-column prop="address" label="日应收"> </el-table-column>
              <el-table-column prop="toTaday" label="至今需完成"  width="100"> </el-table-column>
              <el-table-column prop="province" label="实际上数" width="80"> </el-table-column>
              <el-table-column prop="city" label="应收差额" width="80"> </el-table-column>
              <el-table-column prop="zip" label="月应收完成率" width="110"> </el-table-column>
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
    name:'index',
    data() {
      const item = { 
          date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        value1: '',
        value2: '',
        activeName: 'first',
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
    methods: {
      open() {
        this.$message('这是时间段是：'+this.value1+this.value2);
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      tableRowClassName({row, rowIndex}) {
        //console.log("行数：",row,rowIndex)
        if (rowIndex === 0) {
          return 'success-row';
        }
        return '';
      },
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
    padding: 10px; border-radius: 15px 15px 0 0;  background: #ffffff;
 }
  .box-card {
    /* width: 80%; margin:auto;  border: 1px solid #dddddd; */
    border-radius: 5px;
  }
  .header{
     padding: 1px 5px; margin: 0.5% 0 1.5%; border-left: 2px solid #53a8ff; font-weight: bold;
  }
  .item {
    font-size: 14px; padding: 2% 0; width: 22%; display: inline-block; text-align: center; background:#eef1f6;
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
