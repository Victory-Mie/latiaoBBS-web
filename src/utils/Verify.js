const regs={
    email:/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
    number:/^\d{1,}$/,
    password:/^[\w_-]{6,18}$/,
}
const verify=(rule, value,reg,callback)=>{
    if (value==='') {
        callback();
      } else {
        if (reg.test(value)) {
          callback();
        }else{
            callback(new Error(rule.message));
        }
      }
}

export default{
    email(rule, value,callback){
        return verify(rule, value, regs.email,callback)
    },
    number(rule, value,callback){
        return verify(rule, value, regs.number,callback)
    },
    password(rule, value,callback){
        return verify(rule, value, regs.password,callback)
    },
    
}