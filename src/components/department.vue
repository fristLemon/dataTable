<template>
  <div id="department">
    <div v-if="deptCon == 'cces'">
    <el-input placeholder="请输入需要搜索的部门名" v-model="filterText"> </el-input>
    <el-tree :data="deptlist" :filter-node-method="filterNode" ref="tree" :default-expanded-keys="[backShowES]" :default-checked-keys="[backShowES]"
     class="filter-tree" :props="defaultProps" node-key="deptID" show-checkbox @check-change="handleCheckChange" style="padding:10px 0"
    >
      <span class="custom-tree-node" slot-scope="{ node }" >
        <span>{{ node.data.name }}</span>       
      </span>
    </el-tree>
    </div>
    <div v-else>
      <el-input placeholder="请输入需要搜索的部门名" v-model="filterText2"> </el-input>
      <el-tree :data="deptlist2" :filter-node-method="filterNode2" ref="tree2" :default-expanded-keys="[backShowHR]" :default-checked-keys="[backShowHR]"
      class="filter-tree" :props="defaultProps" node-key="deptID" show-checkbox @check="handleCheckChangeHR" @check-change="handleCheckChange2" style="padding:10px 0"
      >
        <span class="custom-tree-node" slot-scope="{ node }" >
          <span>{{ node.data.deptName }}</span>       
        </span>
      </el-tree>
    </div>
    <div slot="footer" style="text-align: right" class="dialog-footer" >
      <!-- <el-button @click="dialogTableVisible = false">取 消</el-button> -->
      <el-button type="primary" style="width: 25%;" @click="emitParent">确 定</el-button>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "department",
  props: ['deptCon', 'backShowES','backShowHR','deptlist', 'deptlist2'],
  data() {
    return {
      // data: "",
      filterText: '',
      filterText2: '',
      dataList:[],
      mainText: " ",
      defaultProps: {
        children: 'children',
        label: 'label'
      },
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val); 
    },
    filterText2(val) {
      this.$refs.tree2.filter(val);
    }
  },
  computed: {},
  methods: {
    /* append(node, data) {
      console.log("点击能获取的数据", node, data);
      this.mainText = data.deptName;
      console.log("数据", this.$store.state.treeDataJson);
    }, */
    handleCheckChange (data, checked, node) {
      /* 主要通过checked进行判断 */
      if (checked) {
        console.log(data)
        let arr = [data.deptID];
        this.$refs.tree.setCheckedKeys(arr);
        /* this.checkedId = data.deptID
        this.$refs.tree.setCheckedKeys([data]); */
        /* 右侧列表相关的代码 */
        this.dataList = [];
        this.dataList.push(data);        
      }
    },
    handleCheckChange2 (data, checked, node) {
      /* 主要通过checked进行判断 */
      /* if (checked) {
        console.log(data)
        let arr = [data.deptID];
        this.$refs.tree2.setCheckedKeys(arr);
        this.dataList = [];
        this.dataList.push(data);
      } */
    },
    handleCheckChangeHR(data, node){
      console.log(data)
      let arr = [data.deptID];
      this.$refs.tree2.setCheckedKeys(arr);
      /* 右侧列表相关的代码 */
      this.dataList = [];
      this.dataList.push(data);
    },
    /* nodeClick(data, checked, node){
      this.checkedId = data.deptID
      this.$refs.tree.setCheckedKeys([data]);
    }, */
    emitParent(){
      console.log("组件里选中部门：",this.dataList[0])     
      this.$emit('deptFun',this.dataList[0])
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    filterNode2(value, data) {
      if (!value) return true;
      return data.deptName.indexOf(value) !== -1;
    }

  },
  created() {
  },
  mounted() {
    if(this.deptCon == 'cces'){
      console.log("es返显：", this.backShowES)
    }else{
      console.log("hr返显：", this.backShowHR)
    } 
    
  }
}
</script>

<style scoped>
.el-dialog__body{
  padding: 20px;
}
.custom-tree-node {
  /* width: 240px; */
  flex: 1;
  display: flex;
  justify-content: space-between;
  height: 40px;
  font-size: 16px;
  line-height: 40px;
  text-align: left;
  padding-right: 8px;
}
</style>
