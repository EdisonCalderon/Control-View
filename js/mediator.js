	
function begin (){
	workingNow();
	setInterval(workingNow, 3000);
	setInterval(function(){$("#debug").empty();}, 30000);
};

function workingNow(){
	var info = {
		ruta : "/workingNow",
		type : 'GET'
	};

	queryServer(info, function(error, users){
		if(error){
			showError(error.details);
		}
		else 
		{	
      		usersList = users;
			if(usersList){
				$("#working").empty();
				$("#working").append('<tr><td>Name</td><td>Working at</td></tr>');
				for (var i = usersList.length - 1; i >= 0; i--) {
					$("#working").append('<tr><td>'+ usersList[i].name 
						+'</td><td>' + usersList[i].state + '</td></tr>');
				};
			}
		}	
	});
};

function checkWorking(){
	var name = $("#name").val();
	for (var i = usersList.length - 1; i >= 0; i--) {
		if(usersList[i].name == name){
			if($("#labored").val() == null){
				$("#divLabored").append('<label class="col-md-4 control-label" for="Labored">Labored</label>'+
  				'<div class="col-md-4">' +
			    '<textarea class="form-control" id="labored" name="Labored" required=""></textarea>' +
			  	'</div>');
			}
			$("#SignIn").empty();
			$("#SignIn").append("Sign out");
			$("#SignIn").val(false);
			return
		}
		else
		{				
			if($("#SignIn").val() == "false"){	
				$("#divLabored").empty();			
				$("#SignIn").empty();
				$("#SignIn").append("Sign in");
				$("#SignIn").val(true);
			}
		}
	}
}

$(document).ready(function(){
	 $("#SignIn").click(function(){
       	var ruta ;

        if($("#SignIn").val()=="true"){
        	ruta = '/login';
        }else{    	
			ruta = '/logout';
        }

        var info = {
        	ruta : ruta,
        	type : 'POST',        	
        	data : {
        		"name" : $("#name").val(),
        		"password" : $("#password").val(),
        		"date" : new Date(),
        		"labored" :$("#labored").val()
        	}
        };
		queryServer(info, function(error, result){
			if(error){
				showError(error.details);
			}			
			else
			{
				showMessage(result);
			}
		});
    });
});

function queryServer (info, callback){
	var data = (info.data)?info.data : null;
	var	dataType = (data != null)?'json' : 'jsonp';
	$.ajax(
   	{	 	
    	url: hostserv + info.ruta,
        type: info.type,
        dataType: dataType,
        data: data,
        timeout: 15000,
        success: function(result) {  
			callback(null, result);
		 },   
         error: function(jqXHR, textStatus, error) {
         		var details = (jqXHR.responseText)? jQuery.parseJSON(JSON.stringify(jqXHR.responseText)) : "No connecion with the server"	
         		error={
         			jqXHR : jqXHR, 
         			textStatus : textStatus, 
         			details : details	
         		};
				callback(error, null);
         }
    });
}

function showMessage(message){
	$("#debug").empty();
	if(!message.error){
		var logoutb = ($("#SignIn").val() == "true")?true:false;
		$("#debug").append('<br><legend>' + message.name + ' </legend><br>' +
			((logoutb)?'Loged: ': 'Log out: ') + new Date(message.date) + ((logoutb)?' and lobored at: ' +  message.type:''));
	}else{
		showError(message);		
	}
	clear();

} 

function showError(error){
	$("#debug").empty();
	$("#debug").append('<br><legend>ERROR </legend><br>' + error);
}

function clear(){
	$("#name").val("");
	$("#password").val("");
	$("#divLabored").empty();
	$("#SignIn").empty();
	$("#SignIn").append("Sign in");
	$("#SignIn").val(true);
}

