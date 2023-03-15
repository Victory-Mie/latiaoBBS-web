import { ElMessage} from "element-plus";

const MessageType=(msg,callback,type)=>{
    ElMessage({
        type:type,
        message:msg,
        duration:2000,
        onClose:()=>{
            if(callback){
                callback();
            }
        }
    })
}

const message={
    error:(msg,callback)=>{
        MessageType(msg,callback,'error')
    },
    success:(msg,callback)=>{
        MessageType(msg,callback,'success')
    },
    warning:(msg,callback)=>{
        MessageType(msg,callback,'warning')
    },

    
}

export default message;