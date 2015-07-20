var app= angular.module("Control-H3",[]);

app.controller("signUpController",function signUpController($scope){
    $scope.message= "";
    $scope.newUser={
        name: "",
        pass: ""
    };
    $scope.signUp= function(){        
        if($scope.newUser.name != ""  && $scope.newUser.pass!=""){
            var info = {
            ruta : "/user",
            type : 'POST',
            data : {
                "name" : $scope.newUser.name,
                "password" : $scope.newUser.pass                
            }           
            };
            console.log(info);
            queryServer(info, function(error, result){                
                if(error){                    
                    alert("Error: "+ error);
                }           
                else{                    
                    alert("User created successfully. Welcome!");
                    //Se envia la inforamcion del empleado a otra vista 
                }
            });
        }
        else{
            alert("Any field may be empty");
        }
    };
});

function queryServer (info, callback){
    var data = (info.data)?info.data : null;
    var dataType = (data != null)?'json' : 'jsonp';
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
                
                error={
                    jqXHR : jqXHR, 
                    textStatus : textStatus, 
                    error : error};
                callback(error, null);
         }
    });
}