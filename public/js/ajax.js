

function jsonUrl(obj){
	var arr = [];
	for(var key in obj){
		arr.push( key+'='+obj[key] );
	}
	return arr.join('&');
}

function ajax(json){

	if(!json.url)return;
	
	json.data = json.data||{};//默认数据为空
	json.type = json.type.toUpperCase()||'GET';
	json.timeout = json.timeout||1000;
	
	if(window.XMLHttpRequest){
		xhr = new XMLHttpRequest();
	}else{		//IE5 IE6
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}

	switch(json.type){
		case 'GET':
			xhr.open('GET',json.url+'?'+jsonUrl(json.data),true);
			xhr.send(null);
			break;
		case 'POST':
			xhr.open("POST",json.url,true);
			xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			xhr.send( jsonUrl(json.data) );
			break;
	}

	xhr.onreadystatechange = function(){
		if(xhr.readyState===4){
			if(xhr.status>=200 && xhr.status<300 || xhr.status===304){
				json.success && json.success(xhr.responseText);
			}else{
				json.error && josn.error(xhr.status)
			}
		}
	}
}


// ajax({
// 	url:'/localhost/8888',
// 	type:'POST',
// 	data:{
// 		user:user.value,
// 	},
// 	success:function (data) {
// 		var json = JSON.parse(data);
// 		console.log(json);
// 		if(json.ok){
// 		   alert('注册成功~~~');
// 		}else{
// 			alert('注册失败~~~'+json.msg);
// 		}
// 	},
// 	error:function () {
// 		alert('通信错误~~~');
// 	}
// })