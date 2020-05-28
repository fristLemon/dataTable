<template>
  <el-container class="treeDataBox">
    <div class="custom-tree-container">
      <div class="block">
        <el-input
          placeholder="输入关键字进行CCES过滤"
          v-model="filterText"
          style="width:98%;margin:5px 0;"
        >
        </el-input>

        <el-tree :data="data" :filter-node-method="filterNode" ref="tree" :expand-on-click-node="false" >
          <span class="custom-tree-node" slot-scope="{ node, data }" >
            <span>{{ node.data.name }}</span>
            <span class="checkIcon">
              <el-button type="text" size="mini" @click="() => append(node,data)" >
                <img class="treeMenuIcon" src="../assets/logo.png" >
              </el-button>
            </span>
          </span>
        </el-tree>
      </div>
    </div>
    <div class="custom-tree-container2">
      <div class="block">
        <el-input  placeholder="输入关键字进行CCHR过滤"  v-model="filterText2" style="width:98%;margin:5px 0;" > </el-input>
        <el-tree :data="data2" :filter-node-method="filterNode2" ref="tree2" :expand-on-click-node="false" >
          <span class="custom-tree-node2" slot-scope="{ node, data }"  >
            <span>{{ node.data.deptName }}</span>
            <span class="checkIcon">
              <el-button type="text" size="mini" @click="() => append(node,data)" >
                <img class="treeMenuIcon" src="../assets/logo.png" >
              </el-button>
            </span>
          </span>
        </el-tree>
      </div>
    </div>
    <div class="mainBox">
      “{{mainText}}”--详情页
    </div>
  </el-container>
</template>

<script>
let id = 1000;
import { Loading } from 'element-ui';
export default {
  data() {
    // const dataJson = [this.$store.state.treeDataJson.data, {
    //   id: 4,
    //   deptName: '二级 1-1',
    //   "children": [{
    //     id: 9,
    //     deptName: '三级 1-1-1'
    //   }, {
    //     id: 10,
    //     deptName: '三级 1-1-2'
    //   }]
    // }];
    return {
      data: "",
      data2:"",
      mainText: " ",
      filterText: "",
      filterText2: ""
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

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    filterNode2(value, data) {
      if (!value) return true;
      return data.deptName.indexOf(value) !== -1;
    },
    append(node, data) {
      console.log("点击能获取的数据", node, data);
      this.mainText = data.deptName;
      console.log("数据", this.$store.state.treeDataJson);
    }
  },
  mounted: function () {
    let loadingInstance = Loading.service({ target: ".indexMain", background: "rgba(0,0,0,0.6)" });
    let loadingInstance2 = Loading.service({ target: ".indexMain", background: "rgba(0,0,0,0.6)" });
    let config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
    this.$axios
      .post(
        "/data/baseFramework/getBaseFramework.do?dataSource=CCES", config
      ).then(result => {
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance.close();
        });
        console.log(result.data);
        switch (result.data.state) {
          case 0:
            if (result.data.state == 0) {
              console.log("CCES的数据",result);
              this.data = [result.data.data];
            } else {
              this.$message({
                message: result.data.message, type: "warning"
              });
            }
            break;
          case 1:
            this.$message.error(result.data.message);
            this.$forceUpdate();
            break;
        }
      })
      .catch(err => {
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance.close();
        });
        console.log(err);
        this.$message.error(err);
      });

    let config2 = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
    this.$axios
      .post(
        "/data/baseFramework/getBaseFramework.do?dataSource=CCHR", config
      ).then(result => {
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance2.close();
        });
        console.log(result.data);
        switch (result.data.state) {
          case 0:
            if (result.data.state == 0) {
              console.log("CCHR的数据",result);
              this.data2 = [result.data.data];
            } else {
              this.$message({
                message: result.data.message,
                type: "warning"
              });
            }
            break;
          case 1:
            this.$message.error(result.data.message);
            this.$forceUpdate();
            break;
        }
      })
      .catch(err => {
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance2.close();
        });
        console.log(err);
        this.$message.error(err);
      });
  }
};
</script>

<style>
.treeDataBox {
  width: 100%;
  margin-top: 30px;
}
.custom-tree-container {
  background: #fff;
  margin: 10px;;
}
.custom-tree-container2 {
  background: #fff;
  margin: 10px;;
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
.custom-tree-node2 {
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
.el-tree {
  height: 600px;
  overflow-y: auto;
}
.el-tree-node__content {
  height: 40px !important;
}
.checkIcon {
  margin-left: 10px;
}
.treeMenuIcon {
  height: 17px;
}
.mainBox {
  width: calc(100% - 340px);
  height: 300px;
  margin-left: 40px;
  background: #fff;
  color: red;
  font-size: 20px;
  display: none;
}
</style>