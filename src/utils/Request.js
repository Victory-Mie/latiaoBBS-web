import axios from "axios";
//Loading 还可以以服务的方式调用。 你可以像这样引入 Loading 服务：
import { ElLoading } from "element-plus";
import Message from "@/utils/Message";

const contentTypeForm="application/x-www-form-urlencoded;charset=UTF-8"
const contentTypeJson="application/json"



//自定义配置新建一个实例
const instance = axios.create({
    baseURL:"/api",
    timeout:10*1000,
})

let loading=null;

//请求前过滤器
instance.interceptors.request.use((config)=>{
    // 在发送请求之前做些什么
    if(config.showLoading){
        loading=ElLoading.service({
            lock:true,
            text:"加载中......(●'◡'●)",
            background:'rgba(0,0,0,0,7)'
        })
    }
    return config;
},(error)=>{
    console.log("error")
    // 对请求错误做些什么
    if(error.config.showLoading&&loading){
        loading.close();
    }
    Message.error("请求发送失败。");
    return Promise.reject("请求发送失败");
});

//请求后过滤器
instance.interceptors.response.use((response)=>{
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    const {showLoading,errorCallback,showError}=response.config;
    if(showLoading&&loading){
        loading.close();
    }
    const responseData=response.data;
    if(responseData.code==200){
        return responseData;
    }else if(responseData.code==901){
        return Promise.reject({showError:false,msg:"登陆超时"});
    }else{
        if(errorCallback){
            errorCallback(responseData)
        }
        return Promise.reject({showError:showError,msg:responseData.info});
    }
},(error)=>{
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if(error.config.showLoading&&loading){
        loading.close();

    }
    return Promise.reject({showError:true,msg:"网络异常"});
});


const request=(config)=>{
    const{url,params,dataType,showLoading=true,errorCallback,showError=true}=config;
    let contentType=contentTypeForm;
    let formData=new FormData();
    for(let key in params){
        formData.append(key,params[key]==undefined? null:params[key]);
    }
    if(dataType!=null&&dataType==Json){
        contentType=contentTypeJson;
    }
    let header={
        'Content-Type':contentType,
        'X-Request-With':'XMLHttpRequest',
    }
    return instance.post(url,formData,{
        header:Headers,
        showLoading:showLoading,
        errorCallback:errorCallback,
        showError:showError,
    }).catch(error=>{
        if(error.showError){
            Message.error(error.msg);
        }
        return null;
    })

}

export default request;