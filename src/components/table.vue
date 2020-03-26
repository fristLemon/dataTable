<template>
 <div id="demo">
    <el-table :data="tableData" border :summary-method="getSummaries1" show-summary style="width: 100%; margin-top: 20px">
      <el-table-column prop="id" label="ID" width="90"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column  prop="amount1" label="数值 1（元）"> </el-table-column>
      <el-table-column prop="amount2" label="数值 2（元）"> </el-table-column>
      <el-table-column prop="amount3" label="数值 3（元）"> </el-table-column>
    </el-table>
    <div style="height:15px; width:100%; color:#999">~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</div>
    <div class="loading">简单loading效果</div>
    <div style="height:15px; width:100%; color:#999">~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</div>
    <div class="wrap">
      <div class="ribbon">
        <a href="#">Fork me on GitHub</a>
      </div>
    </div>
    <div style="height:15px; width:100%; color:#999">~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</div>
    <input type="text" placeholder="我的默认样式"/>
    <div style="height:15px; width:100%; color:#999">~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</div>
    <div class="firstxia"> 首字下沉 要实现类似 word 中首字下沉的效果可以使用以下代码 </div>
    <div style="height:15px; width:100%; color:#999">~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</div>
    <div class="triangle"></div>
    <div class="triangle top"></div>
    <div class="triangle bottom "></div>
    <div class="triangle right"></div>
    <div class="triangle left"></div>
    <div style="height:15px; width:100%; color:#999">~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</div>   
    <div class="plus"></div>
    <div class="target"></div>
    <div style="height:15px; width:100%; color:#999">~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</div>   
    <div class="gradient"></div>
    <div class="cup"></div>
    <div class="moon"></div>
    <div class="heart"></div>
  </div>
</template>
<script>
export default {
  name: 'table11',
  data() {
    return {
        tableData: [{
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
        ]
      };
  },
  created() {},
  methods: {
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
<style scoped>
.loading{
  font-size: 20px;
}
.loading:after {
  display: inline-block;
  overflow: hidden;
  vertical-align: bottom;
  content: "\2026";
  -webkit-animation: ellipsis 2s infinite;
}
/* 动画部分 */
@-webkit-keyframes ellipsis {
  from {
    width: 2px;
  }
  to {
    width: 25px;
  }
}

/* 外层容器几本设置  */
.wrap {
  width: 160px;
  height: 160px;
  overflow: hidden;
  position: relative;
  background-color: #f3f3f3;
}
.ribbon {
  background-color: #a00;
  overflow: hidden;
  white-space: nowrap;
  position: absolute;
  /* shadom */
  -webkit-box-shadow: 0 0 10px #888;
  -moz-box-shadow: 0 0 10px #888;
  box-shadow: 0 0 10px #888;
  /* rotate */
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
  /* position */
  left: -50px;
  top: 40px;
}
.ribbon a {
  border: 1px solid #faa;
  color: #fff;
  display: block;
  font: bold 81.25% "Helvetica Neue", Helvetica, Arial, sans-serif;
  margin: 1px 0;
  padding: 10px 50px;
  text-align: center;
  text-decoration: none;
  /* shadow */
  text-shadow: 0 0 5px #444;
}

input::-webkit-input-placeholder {
  color: green;
  background-color: #f9f7f7;
  font-size: 14px;
}
input::-moz-input-placeholder {
  color: green;
  background-color: #f9f7f7;
  font-size: 14px;
}
input::-ms-input-placeholder {
  color: green;
  background-color: #f9f7f7;
  font-size: 14px;
}

.firstxia:first-letter {
  float: left;
  color: green;
  font-size: 20px;
}

.triangle {
  /* 基础样式 */
  border: solid 10px transparent;
}
/*下*/
.triangle.bottom {
  border-top-color: green;
}
/*上*/
.triangle.top {
  border-bottom-color: green;
}
/*左*/
.triangle.right {
  border-right-color: green;
}
/*右*/
.triangle.left {
  border-left-color: green;
}

.plus {
  width: 30px;
  height: 30px;
  margin-left: 50px; /*由于box-shadow不占空间，常常需要添加margin来校正位置*/
  background: #000;
  box-shadow: 0 -30px 0 red, 0 30px 0 red, -30px 0 0 red, 30px 0 0 red;
}
.target {
  width: 30px;
  height: 30px;
  background: #dddddd;
  border-radius: 50%;
  margin-left: 50px;
  box-shadow: 0 0 0 5px #ff1, 0 0 0 20px red, 0 0 0 30px rgb(223, 223, 151), 0 0 0 40px red;
}

.gradient {
  position: relative; display: inline-block;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: #33ddb3;
  background-image: linear-gradient(335deg, rgb(241, 151, 151) 23px, transparent 23px),
    linear-gradient(155deg, #ee0 23px, transparent 23px), 
    linear-gradient(335deg, #b00 23px, transparent 23px ), 
    linear-gradient(155deg, #d00 23px, transparent 23px);
  background-size: 58px 58px;
  background-position: 0px 2px, 4px 35px, 29px 31px, 34px 6px;
}
.moon {
  display: inline-block;
  height: 1.5em;
  width: 1.5em;
  box-shadow: inset -0.4em 0 0;
  border-radius: 2em;
  transform: rotate(20deg);
}
.cup {
  display: inline-block; position: relative;
  width: 1.5em;
  height: 1.5em;
  border: 0.25em solid;
  border-bottom: 1.1em solid;
  border-radius: 0 0 0.25em 0.25em;
}
.cup:before {
  position: absolute;
  right: -0.6em;
  top: 0;
  width: 0.3em;
  height: 0.8em;
  border: 0.25em solid;
  border-left: none;
  border-radius: 0 0.5em 0.5em 0;
  content: "";
}
.heart {
  display: inline-block;
  margin-top: 1.5em; margin-left: 1.5em;
  width: 50px;
  height: 50px;
  border-radius: 50% 50% 0 0;
  background: green; position: relative;
}
.heart:before,
.heart:after {
  position: absolute;
  width: 1em;
  height: 1.6em;
  background: green;
  border-radius: 50% 50% 0 0;
  content: ""; opacity: 0.8;
  top: 0;
}
.heart:before {
  -webkit-transform: rotate(45deg);
  -webkit-transform-origin: 100% 100%;
  right: 0;
}
.heart:after {
  -webkit-transform: rotate(-45deg);
  -webkit-transform-origin: 0 100%;
  left: 0;
}

</style>