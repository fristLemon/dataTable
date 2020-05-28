<template>
 <div id="demo">
    <!-- <el-table :data="listOne" border :summary-method="getSummaries1" show-summary style="width: 100%; margin-top: 20px" 
      row-key="id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}"> -->
    <el-table :data="listOne" :header-cell-style="{background:'#e6effd',color:'#606266'}" height="700" show-summary  :summary-method="getSummaries1"
        :row-class-name="tableRowClassName" row-key="id" border default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column prop="deptName" label="部门" fixed width="120"> </el-table-column>
      <el-table-column  prop="amount1" label="数值 1（元）"> </el-table-column>
      <el-table-column prop="amount2" label="数值 2（元）" sortable> </el-table-column>
      <el-table-column prop="amount3" label="数值 3（元）"> </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'ajax',
  data() {
    return {
        listOne:[],
        tableData: [{
          id: '12987122',  name: '王小虎',  amount1: '10%', amount2: '3.2', amount3: 10
        }, {
          id: '12987123',  name: '王小虎',  amount1: '20%', amount2: '4.43',  amount3: -1.2
        }, 
        //  {
        //   id: '12987126',  name: '王小虎', amount1: '539',  amount2: '4.1', amount3: 15
        // }
        ]
      };
  },
  created() {},
  mounted () {    
    this.$axios.post('http://10.39.1.234:8080/data/baseFramework/getBaseFramework.do?dataSource=  CCES  or  CCHR').then(res=>{
        console.log(res); 
        if (res.data.state == 0) {            
            let allBase = res.data.data;
            console.log(allBase);
            var allBase = res.data.data;              
            let oneBase = allBase.children[0];
            console.log("第一层最大级",oneBase);
            let twoBase = oneBase.children;
            console.log("第二层",twoBase);  
            for(var i=0; i<twoBase.length; i++){               
                let list = {id: "i"+i, deptName: twoBase[i].deptName, amount1: '10%', amount2: '3.2', amount3: 10};                
                let threeBase=[];
                if (twoBase[i].children != null && twoBase[i].children.length>=0) {
                    for(var j=0; j<twoBase[i].children.length; j++){
                        let listProgeny = {id: i+ ''+j, deptName: twoBase[i].children[j].deptName, amount1: '10%', amount2: '3.2', amount3: 10};
                        threeBase.push(listProgeny)
                    }
                    console.log(i+"第三层",threeBase);                     
                }
                list.children=threeBase;
                this.listOne.push(list)                
            }
            console.log("第二层listOne",this.listOne);  
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
    });
  },
  methods: {
    handelChange(date) {
      console.log(date.format('YY-MM-DD'));
    },
    tableRowClassName({row, rowIndex}) {
        console.log("行数：",row,rowIndex)
        if (row.children != null && row.children.length>=0) {
          return 'success-row';
        }
        return '';
    },
    getSummaries(param) {//自定义合计
      //console.log('自定义合计参数：',param);
      const { columns, data } = param;
      const sums = [];
      //console.log('自定义合计参数columns：',columns);
      columns.forEach((column, index) => {
        //console.log('自定义合计参数columns-column：',column);
        if (index === 0) {
          sums[index] = '全公司';
          return;
        }
        //console.log('自定义合计参数data：',data);
        //console.log('自定义合计参数data-value：',column.property);
        const values = data.map(item => Number(item[column.property]));
        //console.log('自定义合计参数values：',values);
        if (!values.every(value => isNaN(Number(value)))) {
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
          sums[index] = 'n/a';
        }
      });
      return sums;
    },
    getSummaries1(param) {
      const { columns, data } = param;
      const sums = [];
      //console.log(columns);
      columns.forEach((column, index) => {
        //console.log("原始数据", column);
        if (index === 0) {
          sums[index] = '总计';
          return;
        }
        
        const values = data.map(item => {
          //console.log(item);
          //console.log(item[column.property]);
          if (typeof(item[column.property]) == "string" && (item[column.property].indexOf("%") != -1)) {
            var item_x = item[column.property].split("%")[0];
            return item[column.property]
          }else{
            return Number(item[column.property])
          }          
        });
        //console.log("第一次取数据",values);
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
        } else {
          //console.log(values);

          if (values.every(value => (typeof(value) == "string" && value.indexOf("%") != -1))) {
            //console.log("出现问题的取数据",values);
            var arr_length = values.length;
            sums[index] = values.reduce((prev, curr, index, arr) => {
              curr = Number(curr.split("%")[0]);
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] = sums[index] / arr_length + "%";
          } else {
            sums[index] = '全公司';
          }

        }
      });
      return sums;
    }
  }
}
</script>
<style scoped>

</style>