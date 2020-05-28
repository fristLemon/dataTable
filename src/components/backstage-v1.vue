<template>
  <div id="backstage">
    <h3>全部部门</h3>
    <el-table ref="multipleTable" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" tooltip-effect="dark" 
     @selection-change="handleSelectionChange" @cell-click="cellClick" :header-cell-style="{background:'#e9f0f6',color:'#606266'}" :row-class-name="tableRowShow"
     :row-key="handleReserve">
      <el-table-column  type="selection" width="55" reserve-selection> </el-table-column>
      <el-table-column label="部门" width="180" prop="deptName" :render-header="renderHeader">
        <template slot-scope="scope">
          <el-input v-model="scope.row.deptName" v-if="scope.row.seen" @blur="loseFcous(scope.$index, scope.row)" > </el-input>
          <span style="margin-left: 10px" v-else>{{ scope.row.deptName }}</span>
        </template>       
      </el-table-column>
      <el-table-column prop="fullName" label="全名" show-overflow-tooltip> </el-table-column>
      <el-table-column label="CCES部门">
        <template slot-scope="scope">
          <span  @click="changeDataES(scope.$index, scope.row)" >{{ scope.row.ccesName }}</span>        
          <el-popover placement="top-start" width="400" trigger="click">
            <div class="info">
              <p>CCES全称：{{ scope.row.ccesFullName }}</p>
              <el-tag v-if="scope.row.ccesStatus" type="info">{{ scope.row.ccesStatus }}</el-tag> 
              <el-tag v-if="scope.row.ccesAdditionalStatus" type="info">{{ scope.row.ccesAdditionalStatus }}</el-tag>
            </div>
            <i class="el-icon-warning-outline" slot="reference" style="color:#409eff; margin-left:5px; font-size:18px; font-weight: bold;"></i>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="cchr" label="CCHR部门">
        <template slot-scope="scope">
          <div v-if="scope.row.cchrName">
            <span  @click="changeDataHR(scope.$index, scope.row)" >{{ scope.row.cchrName }}</span>        
            <el-popover placement="top-start" width="400" trigger="click">
              <div class="info">
                <p>CCHR全称：{{ scope.row.cchrFullName }}</p>
              </div>
              <i class="el-icon-warning-outline" slot="reference" style="color:#409eff; margin-left:5px; font-size:18px; font-weight: bold;"></i>
            </el-popover>
          </div> 
          <div v-else>
            <el-input v-model="scope.row.cchrName" @focus="changeDataHR(scope.$index, scope.row)" placeholder="请选择cchr部门" readonly> </el-input>
          </div>        
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize"
      layout="total, prev, pager, next, jumper" :total="tableData.length">
    </el-pagination>

    <el-dialog title="CCES部门" :visible.sync="dialogTableVisible">
      <div style=" max-height: 60vh;  overflow: auto; margin-top: -20px;">
        <Department :deptlist="deptlist11" :deptCon="cces" :backShow="backShow" @deptFun = 'selectDept'></Department>
      </div>           
    </el-dialog>
    <el-dialog title="CCHR部门" :visible.sync="dialogTableVisibleHR">
      <div style=" max-height: 60vh;  overflow: auto; margin-top: -20px;">
        <Department :deptlist2="deptlist22" :backShow="backShow" @deptFun = 'selectDeptHR'></Department>
      </div>           
    </el-dialog>

    <!-- <el-table :data="tableData" border ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange" @cell-click="cellClick">
        <el-table-column label="日期" width="180">
            <template slot-scope="scope">
                <el-icon name="time"></el-icon> <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
        </el-table-column>
        <el-table-column label="姓名" width="180" >
            <template slot-scope="scope">
                <el-input v-model="scope.row.name" v-if="scope.row.seen" @blur="loseFcous(scope.$index, scope.row)" > </el-input>
                <span style="margin-left: 10px" v-else>{{ scope.row.name }}</span>
            </template>
        </el-table-column>
    </el-table> -->
    <el-divider><i class="el-icon-loading"></i></el-divider>
    <h3>选中需查看部门</h3>
    <el-table :data="changeTr.slice((currentPageZH-1)*pagesizeZH,currentPageZH*pagesizeZH)" 
     :header-cell-style="{color:'#606266'}">
      <el-table-column label="部门" width="180" prop="deptName"></el-table-column>
      <el-table-column prop="fullName" label="全名" show-overflow-tooltip> </el-table-column>
      <el-table-column label="CCES部门">
        <template slot-scope="scope">
          <span >{{ scope.row.ccesName }}</span>        
          <el-popover placement="top-start" width="400" trigger="click">
            <div class="info">
              <p>CCES全称：{{ scope.row.ccesFullName }}</p>
              <el-tag v-if="scope.row.ccesStatus" type="info">{{ scope.row.ccesStatus }}</el-tag> 
              <el-tag v-if="scope.row.ccesAdditionalStatus" type="info">{{ scope.row.ccesAdditionalStatus }}</el-tag>
            </div>
            <i class="el-icon-warning-outline" slot="reference" style="color:#409eff; margin-left:5px; font-size:18px; font-weight: bold;"></i>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="cchrName" label="CCHR部门">
        <template slot-scope="scope">
          <div v-if="scope.row.cchrName">
          <span>{{ scope.row.cchrName }}</span>        
          <el-popover placement="top-start" width="400" trigger="click">
            <div class="info">
              <p>CCHR全称：{{ scope.row.cchrFullName }}</p>
            </div>
            <i class="el-icon-warning-outline" slot="reference" style="color:#409eff; margin-left:5px; font-size:18px; font-weight: bold;"></i>
          </el-popover>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="handleCurrentChangeZH" :current-page="currentPageZH" :page-size="pagesizeZH"
      layout="total, prev, pager, next, jumper" :total="changeTr.length">
    </el-pagination>
    <el-button class="submit" @click="submit" type="primary">确定</el-button>   
  </div>  
</template>

<script type="text/javascript">

import qs from 'qs'
import Department from './department.vue'

export default {
  name: "backstage", 
  components: {
    Department
  },
  data() {
    return {
      input: '',
      restaurants: [],
      state: '',
      timeout:  null,
      pagesize:10,
      currentPage:1,
      pagesizeZH:10,
      currentPageZH:1,
      /* tableData: [
        {id:0, seen:false, deptName: '部门名称A', fullName: '王小虎/上海市普陀区金沙江路', cces: '上海市普陀区金沙江路', cchr: '王小虎/上海市普陀区' },
      ], */
      tableData: [],
      changeTr:[],
      multipleSelection: [],
      table: false,
      /* deptlist11: [
        {
          id: 1, label: '一级 11',
          children: [{
            id: 4, label: '二级 1-1',
            children: [{
              id: 9, label: '三级 1-1-1'
            }]
          }]
        }
      ], */
      deptlist11:[],
      cces: "cces",
      backShow:"",
      clickTr:[],
      deptlist22:[],
      dialogTableVisible: false,
      dialogTableVisibleHR: false
    }
  },
  watch: {},
  computed: {},
  methods: {
    // 表头添加图标
    renderHeader (h,{column}) { // h即为cerateElement的简写，具体可看vue官方文档
      return h('div',[ 
        h('span', column.label),
        h('i', {
        class:'el-icon-edit', style:'color:#409eff;margin-left:5px;'
        })
      ]);
    },
    // 部门框的显隐
    loseFcous(index, row) {
      // debugger
      row.seen=false;
    },
    cellClick(row, column) {
      // debugger
      if(column.property == 'deptName'){
        row.seen=true;
      }      
    },
    ///复选框状态改变
    handleSelectionChange(rows) {
      this.multipleSelection = rows; 
      this.changeTr = rows  
    },
    // 获取行数据
    changeDataES(index, row){
      console.log(index, row);
      this.clickTr = row;
      this.dialogTableVisible = true
      this.backShow = row.ccesID
    },
    changeDataHR(index, row){
      console.log(index, row);
      this.clickTr = row;
      this.dialogTableVisibleHR = true
      this.backShow = row.cchrID
    },  
    //获取部门
    selectDept(data){
      this.dialogTableVisible = false
      this.backShow = ""
      console.log(data.name)
      for (let i of this.tableData) {
        if(this.clickTr.id  == i.id){ 
          if(data){
            console.log(i.id)      
            i.ccesName = data.name
            i.ccesFullName = data.fullName
            i.ccesStatus = data.estateStatus
            i.ccesAdditionalStatus = data.estateAdditionalStatus
            i.ccesID = data.deptID
            i.ccesPath = data.path
            break
          }else{
            i.ccesName = ""
            i.ccesFullName = ""
            i.ccesStatus = ""
            i.ccesAdditionalStatus = ""
            i.ccesID = ""
            i.ccesPath = ""
            break
          }
        }       
      }
      this.clickTr=[]
    },  
    selectDeptHR(data){
      this.dialogTableVisibleHR = false
      this.backShow = ""      
      for (let i of this.tableData) {
        if(this.clickTr.id  == i.id){
          if(data){
            console.log(data.deptName)       
            i.cchrName = data.deptName
            i.cchrFullName = data.fullName
            i.cchrID = data.deptID
            i.cchrPath = data.path
            break
          }else{
            i.cchrName = ""
            i.cchrFullName = ""
            i.cchrID = ""
            i.cchrPath = ""
            break
          }       
        }
      }
      
      this.clickTr=[]     
    },      
    handleCurrentChange(val) {
      this.currentPage = val;
      // console.log(`当前页: ${val}`);
    },
    handleCurrentChangeZH(val) {
      this.currentPageZH = val;
      // console.log(`当前页: ${val}`);
    },
    // 翻页选中仍然有记忆功能
    handleReserve (row) {
      return row.id
    },
    // 提交
    submit(){
      console.log('选中行数：',this.multipleSelection);
      let submitData=[];
      for(let i of this.multipleSelection){
        i.showStatus=3;
        let {seen, ...Data} = i;
        submitData.push(Data);
      }
      console.log(JSON.stringify(submitData)  );
      /* var params = new URLSearchParams;
      params.append(submitData)  */
      let postData = qs.stringify({
        baseFrameworkDataSet: JSON.stringify(submitData) 
      })

      // http://10.39.1.234:8080/data/baseFramework//upDateBaseFrameworkList.do?baseFrameworkDataSet=
      this.$axios.post('/data/baseFramework//upDateBaseFrameworkList.do', postData).then(res=>{
        console.log(res);
        if (res.data.state == 0) {           
          let allBase = res.data.data; 
          console.log(allBase); 
          this.$message({
              showClose: true,  message: res.data.message, type: 'success', //duration: 0
          });       
        } else {
          this.$message({
            showClose: true, message: res.data.message, type: 'error', //duration: 0
          });
        }                              
      }).catch(error=>{
          this.$message({
              showClose: true,  message: '请求出错，自定义！', type: 'error', //duration: 0
          });
      });
    },
    // 获取部门架构
    getStructure(obj, url){
      this.$axios.post(url).then(res=>{
        console.log(res); 
        if (res.data.state == 0) {           
          let allBase = res.data.data; 
          console.log(obj,"第一层最大级",allBase);            
          let twoBase = allBase.children; console.log(obj,"第二层最大级",twoBase);
          let threeBase = allBase.children[0].children; 
          console.log(obj,"第三层最大级",threeBase);
          if (obj == "cces") {
            this.deptlist11 = twoBase;
          }else{
            this.deptlist22 = threeBase;
          }         
          /* for(let i=0; i<threeBase.length; i++){
            let level = { id:threeBase[i].deptID, label: threeBase[i].deptName  }
            if (threeBase[i].children != null && threeBase[i].children.length>=0) {             
              level.children=this.fillStructure(threeBase[i]);
            }             
            this.deptlist11.push(level) 
          }  */          
        } else {
          this.$message({
            showClose: true, message: res.data.message, type: 'error', //duration: 0
          });
        }                      
      }).catch(error=>{         
          console.log(error);//失败
          this.$message({
            showClose: true,  message: '请求出错，自定义！', type: 'error', //duration: 0
          });
      });
    },
    fillStructure(obj){
      let childs=[];
      //if (obj.children != null && obj.children.length>=0) {
          for(var j=0; j<obj.children.length; j++){
            let childsCon = { id:obj.children[j].deptID, label: obj.children[j].deptName };
            childs.push(childsCon)
          }                    
      //}
      return childs
    },
    tableRowShow({row, rowIndex}) {
      // console.log("行数：",row,rowIndex)
      /* if (row.showStatus >= 3 ) {
        return 'show-row';
      }
      return ''; */
    },
    toggle(data) {
      if (data.length) {
        this.$nextTick(function() {
          data.forEach(item => {
        //如果数据中的paid == 1的话 让这一列选中
            if (item.showStatus == 3) {
        //multipleTable 是这个表格的ref属性 true为选中状态
            this.$refs.multipleTable.toggleRowSelection(item, true);
            }
          })
        })
      }
    }
  },
  created() {},
  mounted() {  
    // http://10.39.1.234:8080/data/baseFramework/getBaseFrameworkList.do
    this.$axios.post('/data/baseFramework/getBaseFrameworkList.do').then(res=>{
      console.log(res); 
      if (res.data.state == 0) {           
        let allBase = res.data.data;          
        console.log("第一层最大级",allBase);
        for(let i=0; i<allBase.length; i++){
          /* let list = {
            id:allBase[i].id, trData:allBase[i], seen:false, deptName: allBase[i].deptName, fullName: allBase[i].fullName, 
            cces: allBase[i].ccesName, ccesFullName: allBase[i].ccesFullName, ccesStatus: allBase[i].ccesStatus, ccesAdditionalStatus: allBase[i].ccesAdditionalStatus,
            cchr: allBase[i].cchrName, cchrFullName: allBase[i].cchrFullName 
          } */
          let list = allBase[i];
          list.seen = false
          this.tableData.push(list)           
        } 
        this.toggle(this.tableData)  
        this.getStructure('cces', '/data/baseFramework/getBaseFramework.do?dataSource=CCES') 
        this.getStructure('cchr', '/data/baseFramework/getBaseFramework.do?dataSource=CCHR')      
      } else {
        this.$message({
          showClose: true, message: res.data.message, type: 'error',
          //duration: 0
        });
      }                      
    }).catch(error=>{
        //失败
        console.log(error);
        this.$message({
            showClose: true,  message: '请求出错，自定义！', type: 'error',
            //duration: 0
        });
    });
    
  }
}
</script>

<style scoped>
#backstage{
  padding: 0px 15px;
}
.el-table{
  width: 100%; margin: 0px 0px 10px; border: 1px solid #eeeeee;
}
.el-input__inner{
  border: none; 
}
.info p{
  font-weight: bold; color: #909399;
}

.el-pagination {
  text-align: right;
}
.submit{
  width: 10%; margin-left: 90%; margin-top: 10px;
}
.el-divider {
  background-color: #b3d8ff;
}
.el-divider i{
  color: #409eff;
}
</style>
