<template>
  <div id="backstage">
    <!-- 部门树状结构 -->
    <el-row :gutter="10" type="flex" justify="space-between">
      <el-col :span="12" class="halfdiv">
        <div class="top-head">
          <h3>全部部门架构</h3>
          <el-button class="submit" plain @click="replace" type="primary" title="更新选择部门">更新</el-button> 
        </div>
        <DeptTree class="bd" :deptlist="allOptTree" :showdiv='alldiv' v-if="flagDeptTreeALL" @deptFun = 'selectDeptALL' @deptFunRemove = 'selectDeptALLRemove'></DeptTree>
      </el-col>
      <el-col style="width:10px"></el-col>
      <el-col :span="12" class="halfdiv">       
        <div class="top-head">
          <h3>选中部门架构</h3>
          <el-button class="submit" plain @click="submit('cancel')" type="primary" title="取消选择部门">提交</el-button> 
        </div> 
        <DeptTree class="bd" :deptlistO="optTree" :showdiv='optdiv' v-if="flagDeptTree" @deptFun = 'selectDeptOPT' @deptFunRemove = 'selectDeptOPTRemove'></DeptTree>
      </el-col>
    </el-row>
    <!-- 部门表格结构 -->
    <el-row :gutter="10" type="flex" justify="space-between" style="margin-bottom:10px">
      <el-col :span="12" class="halfdiv">
        <div class="top-head">
          <h3>选中部门列表</h3>
          <el-button class="submit" plain @click="submit('now')" type="primary" title="提交选择部门">提交</el-button> 
        </div>       
        <el-table class="bd"  :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" tooltip-effect="dark" 
          @selection-change="handleSelectionChange" @cell-click="cellClick" :header-cell-style="{background:'#e9f0f6',color:'#606266'}"
          >
            <!-- <el-table-column  type="selection" width="55" reserve-selection> </el-table-column> -->
            <el-table-column label="部门" width="180" prop="deptName" :render-header="renderHeader">
              <template slot-scope="scope">
                <el-input v-model="scope.row.deptName" v-if="scope.row.seen" @blur="loseFcousNow(scope.$index, scope.row)" > </el-input>
                <span style="margin-left: 10px" v-else>{{ scope.row.deptName }}</span>
              </template>       
            </el-table-column>
            <el-table-column prop="fullName" label="全名" show-overflow-tooltip> </el-table-column>
            <el-table-column label="CCES部门">
              <template slot-scope="scope">
                <span  @click="changeDataES('now', scope.$index, scope.row)" >{{ scope.row.ccesName }}</span>        
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
                  <span  @click="changeDataHR('now', scope.$index, scope.row)" >{{ scope.row.cchrName }}</span>        
                  <el-popover placement="top-start" width="400" trigger="click">
                    <div class="info">
                      <p>CCHR全称：{{ scope.row.cchrFullName }}</p>
                    </div>
                    <i class="el-icon-warning-outline" slot="reference" style="color:#409eff; margin-left:5px; font-size:18px; font-weight: bold;"></i>
                  </el-popover>
                </div> 
                <div v-else>
                  <el-input v-model="scope.row.cchrName" @focus="changeDataHR('now', scope.$index, scope.row)" placeholder="请选择cchr部门" readonly> </el-input>
                </div>        
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize"
            layout="total, prev, pager, next, jumper" :total="tableData.length">
          </el-pagination>
      </el-col>
      <el-col style="width:10px"></el-col>
      <el-col :span="12" class="halfdiv">        
        <div class="top-head">
          <h3>历史选中部门列表</h3>
          <el-button class="submit" plain @click="submit('history')" type="primary" title="提交修改部门">提交</el-button> 
          <div class="searchInput">
            <el-input  placeholder="请输入内容" suffix-icon="el-icon-search" v-model="searchConent" @change="searchInput"> </el-input>
          </div> 
        </div>
        <el-table class="bd" :data="optList.slice((currentPage2-1)*pagesize2,currentPage2*pagesize2)" tooltip-effect="dark" 
          @selection-change="handleSelectionChange" @cell-click="cellClick" :header-cell-style="{background:'#e9f0f6',color:'#606266'}"
          >
            <!-- <el-table-column  type="selection" width="55" reserve-selection> </el-table-column> -->
            <el-table-column label="部门" width="180" prop="deptName" scoped-slot="renderHeader">
              <template slot-scope="scope">
                <el-input v-model="scope.row.deptName" v-if="scope.row.seen" @blur="loseFcous(scope.$index, scope.row)" > </el-input>
                <span style="margin-left: 10px" v-else>{{ scope.row.deptName }}</span>
              </template>       
            </el-table-column>
            <el-table-column prop="fullName"  width="200" label="全名" show-overflow-tooltip >
            <template slot-scope="scope">
              <el-input v-model="scope.row.fullName" v-if="scope.row.seenFull" @blur="loseFcous(scope.$index, scope.row)" > </el-input>
              <span style="margin-left: 10px" v-else >{{ scope.row.fullName }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="fullName" label="全名" show-overflow-tooltip > </el-table-column> -->
            <el-table-column label="CCES部门">
              <template slot-scope="scope">
                <span  @click="changeDataES('opt', scope.$index, scope.row)" >{{ scope.row.ccesName }}</span>        
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
                  <span  @click="changeDataHR('opt', scope.$index, scope.row)" >{{ scope.row.cchrName }}</span>        
                  <el-popover placement="top-start" width="400" trigger="click">
                    <div class="info">
                      <p>CCHR全称：{{ scope.row.cchrFullName }}</p>
                    </div>
                    <i class="el-icon-warning-outline" slot="reference" style="color:#409eff; margin-left:5px; font-size:18px; font-weight: bold;"></i>
                  </el-popover>
                </div> 
                <div v-else>
                  <el-input v-model="scope.row.cchrName" @focus="changeDataHR('opt', scope.$index, scope.row)" placeholder="请选择cchr部门" readonly> </el-input>
                </div>        
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @current-change="handleCurrentChange2" :current-page="currentPage2" :page-size="pagesize2"
            layout="total, prev, pager, next, jumper" :total="optList.length">
          </el-pagination>
      </el-col>
    </el-row>
    
    <el-dialog title="CCES部门" :visible.sync="dialogTableVisible">
      <div style=" max-height: 60vh;  overflow: auto; margin-top: -20px;">
        <Department :deptlist="deptlist11" :deptCon="cces" :backShowES="backShowES" @deptFun = 'selectDept'></Department>
      </div>           
    </el-dialog>
    <el-dialog title="CCHR部门" :visible.sync="dialogTableVisibleHR">
      <div style=" max-height: 60vh;  overflow: auto; margin-top: -20px;">
        <Department :deptlist2="deptlist22" :backShowHR="backShowHR" @deptFun = 'selectDeptHR'></Department>
      </div>           
    </el-dialog>
      
  </div>  
</template>

<script type="text/javascript">
import qs from 'qs'
import DeptTree from './deptTree.vue'
import Department from './department.vue'
import { Loading } from 'element-ui';
export default {
  name: "backstage", 
  inject:['reload'],
  components: {
    Department, DeptTree
  },
  data() {
    return {
      searchConent: '',
      flagDeptTreeALL: false,
      flagDeptTree: false,
      allOptTree: {
        allTree: [],
        selectAllTree: [],
      },
      optTree: [],
      allList: [],
      optList: [],
      optListVal: [],
      alldiv:'all',
      optdiv: 'opt',
      input: '',
      pagesize:10,
      currentPage:1,
      pagesize2:10,
      currentPage2:1,
      tableData: [],
      removeTr:[],
      changeTr:[],
      multipleSelection: [],
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
      backShowES:" ",
      backShowHR:" ",
      clickTr:[],
      editorTable:'',
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
    loseFcousNow(index, row) {
      // debugger 打断点
      row.seen=false;
      this.$forceUpdate()
    },
    loseFcous(index, row) {
      // debugger 打断点
      row.seen = false;
      row.seenFull = false;
      this.changeTr.push(row)
    },
    cellClick(row, column) {
      if (column.property == 'deptName') {
        row.seen = true;
        this.$forceUpdate()
      }
      if (column.property == 'fullName') {
        row.seenFull = true;
      }
    },
    
    ///复选框状态改变
     handleSelectionChange(rows) {
    /*  this.multipleSelection = rows;*/  
    }, 
    // 获取行数据
    changeDataES(obj,index, row){
      console.log(index, row);
      this.clickTr = row;
      this.editorTable = obj     
      this.dialogTableVisible = true
      if(row.ccesID){
        this.backShowES = row.ccesID
      }
    },
    changeDataHR(obj, index, row){
      console.log(index, row);
      this.clickTr = row;
      this.editorTable = obj
      this.dialogTableVisibleHR = true
      if(row.cchrID){
        this.backShowHR = row.cchrID
      }
    },  
    //获取子组件，CCES部门选中
    selectDept(data){
      this.dialogTableVisible = false
      
      if(this.editorTable == "opt"){
        this.judgeData(this.optList, data, 'opt')               
      }else{
        this.judgeData(this.tableData, data)
      }
      this.clickTr=[]
      this.backShowES = " "
    }, 
    judgeData(obj, data, jia){
      for (let i of obj) {
        if(this.clickTr.id  == i.id){ 
          if(data){
            console.log(i.id)      
            i.ccesName = data.name
            i.ccesFullName = data.fullName
            i.ccesStatus = data.estateStatus
            i.ccesAdditionalStatus = data.estateAdditionalStatus
            i.ccesID = data.deptID
            i.ccesPath = data.path
            if(jia){
              this.changeTr.push(i)
            }
            break
          }else{
            if(!this.clickTr.ccesName){
              i.ccesName = ""
              i.ccesFullName = ""
              i.ccesStatus = ""
              i.ccesAdditionalStatus = ""
              i.ccesID = ""
              i.ccesPath = ""
            }
            if(jia){
              this.changeTr.push(i)
            }         
            break
          } 
        }             
      }
    },  
    //获取子组件，CCHR部门选中
    selectDeptHR(data){
      this.dialogTableVisibleHR = false      
      if(this.editorTable == "opt"){
        this.judgeDataHR(this.optList, data, 'opt')
      }else{
        this.judgeDataHR(this.tableData, data)
      }
      this.clickTr=[]
      this.backShowHR = " "     
    },
    judgeDataHR(obj, data, jia){
      for (let i of obj) {
        if(this.clickTr.id  == i.id){
          if(data){
            console.log(data.deptName)       
            i.cchrName = data.deptName
            i.cchrFullName = data.fullName
            i.cchrID = data.deptID
            i.cchrPath = data.path
            if(jia){
              this.changeTr.push(i)
            }
            break
          }else{
            if(!this.clickTr.cchrName){
              i.cchrName = ""
              i.cchrFullName = ""
              i.cchrID = ""
              i.cchrPath = ""
            }
            if(jia){
              this.changeTr.push(i)
            }
            break
          }      
        }
      }
    },      
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleCurrentChange2(val) {
      this.currentPage2 = val;
    },
    
    // 提交
    submit(obj){      
      let submitData=[];      
      if(obj == "now"){
        for(let i of this.tableData){
          i.showStatus=3;
          let {seen, ...Data} = i;
          submitData.push(Data);
        }
        console.log('新增数：',submitData);
      }else if(obj == "history"){
        let oldData = []
        for(let i of this.changeTr){
          let { seen, ...Data1 } = i;
          let { seenFull, ...Data2 } = Data1;
          oldData.push(Data2);
        }
        let obj = {};
        submitData = oldData.reduce((cur,next) => {
            obj[next.id] ? "" : obj[next.id] = true && cur.push(next);
            return cur;
        },[]) //设置cur默认类型为数组，并且初始值为空的数组
        console.log('历史修改数：',submitData);
      }else{
        for(let i of this.removeTr){     
          if(!i.children){
            i.showStatus = 0;
            let {seen, ...Data} = i;
            submitData.push(Data);
          }                         
        }
        console.log('历史删除数：',submitData);
      }
      // http://10.39.1.234:8080/data/baseFramework//upDateBaseFrameworkList.do?baseFrameworkDataSet=
      this.$axios.post('/data/baseFramework//upDateBaseFrameworkList.do', qs.stringify({
          baseFrameworkDataSet: JSON.stringify(submitData) 
      })).then(res=>{
        if (res.data.state == 0) {           
          let allBase = res.data.data; 
          console.log(allBase); 
          this.$message({
              showClose: true,  message: res.data.message, type: 'success', //duration: 0              
          });   
          this.deptArchitecture('ALL', '/data/baseFramework/getBaseFrameworkList.do?scope=')
          this.deptArchitecture('OPT', '/data/baseFramework/getBaseFrameworkList.do?scope=')  
          this.reload()  //刷新当前页面，并重新加载页面数据      
        } else {
          this.$message({
            showClose: true, message: res.data.message, type: 'error', //duration: 0
          });
        }                              
      }).catch(error=>{
          this.$message({
              showClose: true,  message: '请求出错，自定义！', type: 'error', //duration: 0
          });
      })
    },
    // 获取cces和cchr部门架构
    getStructure(obj, url){
      this.$axios.post(url).then(res=>{
        if (res.data.state == 0) {           
          let allBase = res.data.data; 
          // console.log(obj,"第一层最大级",allBase);            
          let twoBase = allBase.children;
          console.log(obj,"第二层最大级",twoBase); 
          let threeBase = allBase.children[0].children; 
          // console.log(obj,"第三层最大级",threeBase);
          if (obj == "cces") {
            this.deptlist11 = twoBase;
          }else{
            this.deptlist22 = threeBase;
          }          
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
    //页面初始化， 获取部门架构
    deptArchitecture(val, url){
      let loadingInstance = Loading.service({ text: "加载中...", background: "rgba(0,0,0,0.6)" });
      this.$axios.post(url+val).then(res=>{
        if (res.data.state == 0) {           
          let allBase = res.data.data; 
          console.log(val,"第一层最大级",allBase);    
          if(val == "ALL"){
            this.allOptTree.allTree = allBase.mainDapartment.children
            this.allList = allBase.baseDeptFrameworkList
            this.flagDeptTreeALL = true;
          }else{
            this.optTree = allBase.mainDapartment.children
            for(let i=0; i<allBase.baseDeptFrameworkList.length; i++){
              let list = allBase.baseDeptFrameworkList[i];
              list.seen = false
              list.seenFull = false
              list.children = []
              this.optList.push(list) 
              this.allOptTree.selectAllTree.push(list)           
            } 
            this.optListVal = this.optList
            this.flagDeptTree = true;
          } 
          this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();            
          });
        } else {
          this.$message({
            showClose: true, message: res.data.message, type: 'error', //duration: 0
          });
        }                      
      }).catch(error=>{         
          this.$message({
            showClose: true,  message: '请求出错，请联系信息技术部！', type: 'error', //duration: 0
          });
      });
    },
    // 添加选中部门列表
    selectDeptALL(data){      
      this.tableData.push(data)
      this.tableData.forEach(item=>{
        // item.children = []
      }) 
    },
    // 移除选中部门列表
    selectDeptALLRemove(data){
      for (let [i, value] of this.tableData.entries()) {
        if(value.id  == data.id){
          this.tableData.splice(i, 1)
          break
        }
      }
    },
    // 移除选中历史部门架构
    selectDeptOPT(data){     
      this.removeTr.push(data)  
    },
    selectDeptOPTRemove(data){
      for (let [i, value] of this.removeTr.entries()) {
        if(value.id  == data.id){
          this.removeTr.splice(i, 1)
          break
        }
      }
    },
    // 更新全部部门架构
    replace(){
      this.flagDeptTreeALL = false;
      this.deptArchitecture('ALL', '/data/baseFramework/getBaseFrameworkList.do?scope=')
    },
    // 搜索框
    searchInput(){
      //并没有输入关键字时，就不要再搜索了
      if(this.searchConent===''||this.searchConent==null){
        this.optList=JSON.parse(JSON.stringify(this.optListVal));
        return;
      }
      //搜索
       // let list=this.optList.filter(item=>item.indexOf(this.selectVal)>=0);
      let list=this.optListVal.filter(item=>{
        console.log(item.fullName)
        let fullVal = item.fullName
        if(fullVal.indexOf(this.searchConent)>=0){
          return item
        }else{
          return false
        }  
      });
      console.log(list);
      if(list.length==0){
          this.optList= [];
      }else{
          this.optList=list;
      }
    }
  },
  created() {
    // http://10.39.1.234:8080/data/baseFramework/getBaseFrameworkList.do?scope=ALL or OPT
    this.deptArchitecture('ALL', '/data/baseFramework/getBaseFrameworkList.do?scope=')
    this.deptArchitecture('OPT', '/data/baseFramework/getBaseFrameworkList.do?scope=')
  },
  mounted() {      
    this.getStructure('cces', '/data/baseFramework/getBaseFramework.do?dataSource=CCES') 
    this.getStructure('cchr', '/data/baseFramework/getBaseFramework.do?dataSource=CCHR')     
  }
}
</script>

<style scoped>
#backstage{
  padding: 0px 15px; background: #f3f3f4;
}
.halfdiv{
  height: 650px; background: #fff; margin: 10px 0 0; border-radius: 5px;
  box-shadow: 0 2px 5px #ccc; padding-bottom: 10px; display: flex; flex-direction: column; 
}

.halfdiv h3{
  display: inline-block;
}
.top-head{
  flex: 0 0 60px
}
.bd{flex-grow: 1;overflow: auto;}
.bd::-webkit-scrollbar {/*滚动条整体样式*/
    width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
    border-left:1px #fff solid;
}
.bd::-webkit-scrollbar-thumb {  /*滚动条*/
    border-radius: 2px; background: #8cc5ff;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);    
}
.bd::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 2px; background: #DDDDDD;    
}
.el-table{
  width: 100%; margin: 0px 0px 10px; border: 1px solid #eeeeee; border-radius: 5px;
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
  width: 15%; margin: 10px 0 10px 10px; float: right;
}
.el-divider {
  background-color: #b3d8ff;
}
.el-divider i{
  color: #409eff;
}
.searchInput{
  float: right; margin: 10px 0 10px 10px;
}
</style>
