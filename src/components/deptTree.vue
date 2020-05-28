<template>
  <div id="deptTree">
    <div v-if="showdiv == 'all'">
    <el-input placeholder="请输入需要搜索的部门名" v-model="filterText"> </el-input>
    <el-tree :data="deptlist.allTree" :filter-node-method="filterNode" ref="tree" style="padding:10px 0" :default-checked-keys="backShow"
     class="filter-tree" :props="defaultProps" node-key="id" show-checkbox @check-change="handleCheckChange" check-strictly >
      <span class="custom-tree-node" slot-scope="{ node }" >
        <span>{{ node.data.deptName }}</span>       
      </span>
    </el-tree>
    </div>
    <div v-else>
    <el-input placeholder="请输入需要搜索的部门名" v-model="filterText2"> </el-input>
    <el-tree :data="deptlistO" :filter-node-method="filterNode2" ref="tree2" style="padding:10px 0" default-expand-all
     class="filter-tree" :props="defaultProps" node-key="id" show-checkbox @check-change="handleCheckChange2" >
      <span class="custom-tree-node" slot-scope="{ node }" >
        <span>{{ node.data.deptName }}</span>       
      </span>
    </el-tree>
    </div>
  </div>
</template>

<script type="text/javascript">

export default {
  name: "deptTree",
  props: ['deptlist', 'deptlistO', "unfold", 'showdiv'],
  data() {
    return {
      filterText: '',
      filterText2: '',
      backShow:[],
      dataList:[],
      dataListRemove:[],
      mainText: " ",
      defaultProps: {
        children: 'children',
        label: 'label',
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
    handleCheckChange (data, checked, node) {
      /* 主要通过checked进行判断 */
      if (checked) {
        /* let arr = [data.id];
        this.$refs.tree.setCheckedKeys(arr); */
        /* 右侧列表相关的代码 */
        if(!data.disabled){
          this.dataList = [];
          this.dataList.push(data);     
          this.$emit('deptFun',this.dataList[0]) 
        }
      }else{
        // console.log(data)
        this.dataListRemove = [];
        this.dataListRemove.push(data);     
        this.$emit('deptFunRemove',this.dataListRemove[0])  
      }
    },
    handleCheckChange2 (data, checked, node) {
      /* 主要通过checked进行判断 */
      if (!checked) {     
        this.dataList = [];
        this.dataList.push(data);     
        this.$emit('deptFun',this.dataList[0])   
      }else{
        this.dataListRemove = [];
        this.dataListRemove.push(data);     
        this.$emit('deptFunRemove',this.dataListRemove[0])  
      }
      // 全选 getCheckedKeys()
      // 半选 getHalfCheckedKeys()         
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.deptName.indexOf(value) !== -1;
    },
    filterNode2(value, data) {
      if (!value) return true;
      return data.deptName.indexOf(value) !== -1;
    },
    //获取树列表的所有节点
    getCheckedKeys (data, key) {
      var res = [];
      recursion(data, false);
      return res;
      function recursion (arr, isChild) {
          var aCheck = [];
          for ( var i = 0; i < arr.length; i++ ) {
              var obj = arr[i];
              aCheck[i] = false;

              if ( obj.children ) {
                  aCheck[i] = recursion(obj.children, true) ? true : aCheck[i];
                  if ( aCheck[i] ) {
                      res.push(obj);
                  }
              }
              aCheck[i] = true;
              if ( res.indexOf(obj[key]) == -1 ) {
                  res.push(obj);
              }
          }
          if ( isChild ) {
              return aCheck.indexOf(true) != -1;
          }
      }
    }
  },
  created() {},
  mounted() {
    if (this.showdiv == 'opt' ) {
      if(this.deptlistO){
        console.log('历史全选')
        this.$refs.tree2.setCheckedNodes(this.deptlistO);
      }           
    }else{
      if(this.deptlist.allTree && this.deptlist.selectAllTree){
        console.log('全部返显')
        var aKey = this.getCheckedKeys(this.deptlist.allTree, 'id');
        for(let j of this.deptlist.selectAllTree){
          for(let i of aKey){          
            if(i.id == j.id){
              this.backShow.push(j.id)
              i.disabled = true
            }               
            continue          
          }
        }
      }
      this.$refs.tree.setCheckedKeys(this.backShow);
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
