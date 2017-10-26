/* desc:easy ajax;
 * for example:
 * myAjax({
 * 		url:'',
 * 		method:'',
 * 		data:{},
 * 		success:function(data){
 * 	
 * 		}
 * })
 * 
 */
function myAjax(opt) {
    opt = opt || {};
    opt.method = opt.method || 'POST';
    opt.url = opt.url || '';
    opt.async = opt.async || true;
    opt.data = opt.data || null;
    opt.dataType = opt.dataType || 'JSON'
    opt.success = opt.success || function () {
      };
    createXHR();
    var params = [];
    for (var key in opt.data)params.push(key + '=' + opt.data[key]);
    var postData = params.join('&');
    if (opt.dataType === 'JSONP') {
        creatScript(opt.url, postData);
    } else {
        if (opt.method.toUpperCase() === 'POST') {
            xmlHttp.open(opt.method, opt.url, opt.async);
            xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
            xmlHttp.send(postData);
        }
        else if (opt.method.toUpperCase() === 'GET') {
            xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
            xmlHttp.send(null);
        }
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                if (opt.dataType === 'JSON') {
                    opt.success(xmlHttp.responseText);
                }
            }
        };
    }
}
//懒载入函数  穿建xmlhttp对象
function createXHR(){
	if (window.XMLHttpRequest) { 
		createXHR = function(){
			xmlHttp = new XMLHttpRequest();
			if(xmlHttp.overrideMimeType) {
				xmlHttp.overrideMimeType("text/xml");
			}
			return xmlHttp;
		}
    }
    else if (window.ActiveXObject){
		createXHR = function(){
			var activexName = ["MSXML2.XmlHttp.5.0","MSXML2.XmlHttp.4.0","MSXML2.XmlHttp.3.0","MSXML2.XmlHttp","Microsoft.XmlHttp"];
			for(var i = 0,len=activexName.length; i <len ; i++) {
				try {
					//取出一个控件名进行创建，如果创建成功就终止循环
					//如果创建失败，回抛出异常，然后可以继续循环，继续尝试创建
					return xmlHttp = new ActiveXObject(activexName[i]);
					if(xmlHttp) {
						break;
					}
				} catch(e) {}
			} 
		}
    	
    }else{
    	createXHR = function(){
    		throw new Error("no XHR object avilable")
    	}
    }
    return createXHR();
}
//跨域请求
function creatScript(url, data) {
    var oScript = document.createElement('script');
    oScript.src = url + '?' + data + '&callback=getEn';
    document.body.appendChild(oScript);
}
