<template>
 <div id="demo">
    <el-table :data="tableData" border :summary-method="getSummaries1" show-summary style="width: 100%; margin-top: 20px">
      <el-table-column prop="id" label="ID" width="90"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column  prop="amount1" label="数值 1（元）"> </el-table-column>
      <el-table-column prop="amount2" label="数值 2（元）"> </el-table-column>
      <el-table-column prop="amount3" label="数值 3（元）"> </el-table-column>
    </el-table>
    
    <el-button @click="resetDateFilter">清除日期过滤器</el-button>
    <el-button @click="clearFilter">清除所有过滤器</el-button>

    <el-table ref="filterTable" :data="tableData2.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
      <el-table-column prop="date" label="日期" sortable width="180"  column-key="date"
        :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
        :filter-method="filterHandler" > </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">  </el-table-column>
      <el-table-column prop="address" label="地址" :formatter="formatter">  </el-table-column>
      <el-table-column prop="tag" label="标签" width="100" :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]" :filter-method="filterTag" filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag :type="scope.row.tag === '家' ? 'primary' : 'success'" disable-transitions>{{scope.row.tag}}</el-tag>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
      :page-size="pagesize" layout="total, prev, pager, next, jumper" :total="tableData2.length">
    </el-pagination>

  </div>
</template>
<script>
export default {
  name: 'table11',
  data() {
    return {
        pagesize:3,
        currentPage:1,
        tableData: [
          {
          id: '12987122',  name: '王小虎',  amount1: '10%', amount2: '3.2', amount3: 10
        }, {
          id: '12987123',  name: '王小虎',  amount1: '20%', amount2: '4.43',  amount3: -1.2
        }, 
        // {
        //   id: '12987124', name: '王小虎', amount1: '30%', amount2: '1.9', amount3: 9
        //  }, 
        // {
        //   id: '12987125', name: '王小虎', amount1: '621', amount2: '2.2', amount3: 17
        // }, {
        //   id: '12987126',  name: '王小虎', amount1: '539',  amount2: '4.1', amount3: 15
        // }
        ],
         tableData2: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          tag: '公司'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          tag: '家'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          tag: '公司'
        }]
      };
  },
  created() {},
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },

    resetDateFilter() {
      this.$refs.filterTable.clearFilter('date');
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },

    handelChange(date) {
      console.log(date.format('YY-MM-DD'));
    },
    getSummaries(param) {//自定义合计
      console.log('自定义合计参数：',param);
      const { columns, data } = param;
      const sums = [];
      console.log('自定义合计参数columns：',columns);
      columns.forEach((column, index) => {
        console.log('自定义合计参数columns-column：',column);
        if (index === 0) {
          sums[index] = '全公司';
          return;
        }
        console.log('自定义合计参数data：',data);
        console.log('自定义合计参数data-value：',column.property);
        const values = data.map(item => Number(item[column.property]));
        console.log('自定义合计参数values：',values);
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
          sums[index] = 'N/A';
        }
      });
      return sums;
    },
    getSummaries1(param) {
      const { columns, data } = param;
      const sums = [];
      console.log(columns);
      columns.forEach((column, index) => {
        console.log("原始数据", column);
        if (index === 0) {
          sums[index] = '总计';
          return;
        }
        
        const values = data.map(item => {
          console.log(item);
          console.log(item[column.property]);
          if (typeof(item[column.property]) == "string" && (item[column.property].indexOf("%") != -1)) {
            var item_x = item[column.property].split("%")[0];
            return item[column.property]
          }else{
            return Number(item[column.property])
          }          
        });
        console.log("第一次取数据",values);
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
          console.log(values);

          if (values.every(value => (typeof(value) == "string" && value.indexOf("%") != -1))) {
            console.log("出现问题的取数据",values);
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
            sums[index] = 'N/A';
          }

        }
      });
      return sums;
    }
  }
}
</script>
<style scoped></style>