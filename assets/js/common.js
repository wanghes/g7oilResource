function showSuccessToast(msg) {
    $().toastmessage('showSuccessToast', msg);
}
function showStickySuccessToast(msg) {
    $().toastmessage('showToast', {
        text     : msg,
        sticky   : true,
        position : 'top-right',
        type     : 'success',
        closeText: '',
        close    : function () {
            console.log("toast is closed ...");
        }
    });
}
function showNoticeToast(msg) {
    $().toastmessage('showNoticeToast', msg);
}
function showStickyNoticeToast(msg) {
    $().toastmessage('showToast', {
         text     : msg,
         sticky   : true,
         position : 'top-right',
         type     : 'notice',
         closeText: '',
         close    : function () {console.log("toast is closed ...");}
    });
}
function showWarningToast(msg) {
    $().toastmessage('showWarningToast', msg);
}
function showStickyWarningToast(msg) {
    $().toastmessage('showToast', {
        text     : msg,
        sticky   : true,
        position : 'top-right',
        type     : 'warning',
        closeText: '',
        close    : function () {
            console.log("toast is closed ...");
        }
    });
}
function showErrorToast(msg) {
    $().toastmessage('showErrorToast', msg);
}
function showStickyErrorToast(msg) {
    $().toastmessage('showToast', {
        text     : msg,
        sticky   : true,
        position : 'top-right',
        type     : 'error',
        closeText: '',
        close    : function () {
            console.log("toast is closed ...");
        }
    });
}
$(function(){
	$("#uploadSvgBtn").click(function(){
		var formData = new FormData($( "#uploadForm" )[0]);  
		$.ajax({  
	      url: '/uploadIcons' ,  
	      type: 'POST',  
	      data: formData,  
	      async: false,  
	      cache: false,  
	      contentType: false,  
	      processData: false,  
	      success: function (returndata) {  
	      	console.log(returndata)
	      	if(returndata.status){
	      		 showSuccessToast("上传成功"); 
	      	}else{
	      		 showErrorToast(returndata.message); 
	      	}  
	      },  
	      error: function (returndata) {  
	          showErrorToast(returndata); 
	      }  
	 });  
	})
})