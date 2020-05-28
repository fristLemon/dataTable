<template>
  <div id="search">
    <!-- 搜索框 -->
    <input 
        type="text" 
        v-model="selectVal"
        placeholder="搜索所在的银行机构" 
        @blur='queryData' 
        
        >
    <button @click="reset()">取消</button>
    <!-- 搜索机构列表 -->
    <div class="org">
        <div v-for="(item,index) in orgList" :key="index">
            {{item}}
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'search',
  data () {
    return {
        //orgList:搜索后显示的列表，初始值应该从后台拿取
        orgList:[],
        //全部的数据列表
        normal:[
            '江苏银行',
            '江苏农业银行',
            '上海银行',
            '苏州银行',
            '南京银行',
            '上海银行贷款部'
        ],
        selectVal:''//搜索关键字
    }
  },
  mounted () {
  },
  methods: {
    queryData(){
        //并没有输入关键字时，就不要再搜索了
        if(this.selectVal===''||this.selectVal==null){
            // this.orgList=JSON.parse(JSON.stringify(this.orgList));
            // this.orgList= ['无值'];
            return;
        }
        //搜索
        //let list=this.normal.filter(this.xuanze);
        let list=this.normal.filter(item=>item.indexOf(this.selectVal)>=0);
        console.log(list)
        if(list.length==0){
            this.orgList= ['暂无内容'];
        }else{
            this.orgList=list;
        }
        
        
    },
    xuanze(item){
        if(item.indexOf(this.selectVal)>=0){
            console.log(item)
            return item;
        }else{
            console.log(item)
            return false
        }
    },
    reset(){
        this.orgList=JSON.parse(JSON.stringify(this.normal))
    }
  }
}
</script>
