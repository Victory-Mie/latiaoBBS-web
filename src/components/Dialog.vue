<template>

  
    <el-dialog
      :model-value="centerDialogVisible"
      :title="title"
      :draggable="true"
      :close-on-click-modal="false"
      class="cust-dialog"
      :width="width"
      @close="close"
      align-centerl
    >
      <div class="dialog-body">
        <slot>

        </slot>

      </div>

      <template v-if="buttons&&buttons.length>0||showCancel">
        <div class="dialog-footer">
            <el-button  link @click="close" v-if="showCancel">cancel</el-button>
            <el-button color="#f6d365" v-for="btn in buttons" :type="btn.type" @click="btn.click">{{ btn.text }}</el-button>
        </div>
      </template>

    </el-dialog>
</template>

  <script setup>
    //import { ref } from 'vue'
    //const centerDialogVisible = ref(true)

    const props=defineProps({
    centerDialogVisible:{
        type:Boolean,
        default:false
    },
    title:{
        type:String,
        default:"Title"
    },
    width:{
        type:String,
        default:"40%"
    },
    buttons:{
        type:Array,
    },
    showCancel:{
        type:Boolean,
        default:true
    }

  })

  const emit=defineEmits();
  const close=()=>{
    emit("close");
  }

  </script>

  <style lang="scss">
  .cust-dialog{
   margin-top: 50px;
    .el-dialog_body{
        padding:0px;
    }
  
  .dialog-body{
    //padding-left:0x;
    min-height: 100px;
    max-height: calc(100vh - 200px);
    overflow: auto;
  }
  .dialog-footer{
    text-align: right;
    padding:0px 20px;
  }

  .dialog-footer button:first-child {
    margin-right: 10px;
  }
}
  </style>