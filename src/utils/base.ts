
//延迟执行方法
export const debounce = (func, delay, timer) => {
  if (timer) {
    clearTimeout(timer.current);
  }
  timer.current = setTimeout(() => {
    func();
  }, delay);
};

//错误方法
export const xerror = (params) => {
  let value = '';
  let error = {
		'401':'用户未提供身份验证凭据，或者没有通过身份验证',
    '403':'用户通过了身份验证，但是不具有访问资源所需的权限',
    '404':'资源，服务未找到',
    '500':'服务端抛出异常，系统内部错误，详见message'
  }
  for ( var key in error) {
    //通过遍历对象属性的方法，遍历键值对，获得key，然后通过 对象[key]获得对应的值
    if(key == params){
      value = error[key];
    }
  }
  return value
}


export const objectToQuery = (search = {})=> {
  return Object.entries(search).reduce(
    (t, v:any) => `${t}${v[0]}=${window.encodeURIComponent(v[1])}&`,
    Object.keys(search).length ? "?" : ""
  ).replace(/&$/, "");
}

