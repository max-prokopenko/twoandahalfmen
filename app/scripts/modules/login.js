var login = {
    url: "",
    urlReg: "",
    type: "",
    init: function() {

        this.bindEvents();
        console.log("login intit");


    },
    cacheDom: function() {

    },
    request: function(type) {
        let username = $("#user").val();
        let password = $("#password").val();
        


        let sendInfo = {
            "login": username,
            "password": password
        };

        $.ajax({
                    type: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                         "postman-token": "c4ac53bd-fb61-5a1c-357f-1eae1738e634"
                    },
                    url: login.url,
                    dataType: "json",
                    crossDomain: true,
                    complete: function(jqXHR) {
                        console.log(jqXHR);
                        let info = jqXHR.responseText.split(" ");
                        if ((info[0] > 0) && (info[1] == "True")) {
                            $("#login").hide();
                            $("#logout").show();
                            login.store(true, info[0]);
                            console.log(login.type);
                            $('#login-modal').modal('toggle');
                            if(login.type == "new") {
                                window.location.href = "/twoandahalfmen/new.html";
                            }
                        }
                        
                      

                    },       
                    data: JSON.stringify(sendInfo)
        });
    },
    login: function() {
        console.log("lgoin f");
        let userObject = sessionStorage.getItem('userObject');
         userObject = JSON.parse(userObject);

        if (userObject != null) {
            console.log(userObject);

            if(userObject[0] == false) {
                $("#modal").click();
            }
            else {
                window.location.href = "/twoandahalfmen/new.html";
               
            }
        }
        else {
            $("#modal").click();
        }
        
    },  
    store: function(boolean, id) {
    	let userObject = { 'logged': boolean , 'user_id': id};
    	
		sessionStorage.setItem('userObject', JSON.stringify(userObject));
    },
    reg: function() {
        let username = $("#user-reg").val();
        let password = $("#password-reg").val();
        


        let sendInfo = {
            "login": username,
            "password": password
        };

        $.ajax({
                    type: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                         "postman-token": "c4ac53bd-fb61-5a1c-357f-1eae1738e634"
                    },
                    url: login.urlReg,
                    dataType: "json",
                    crossDomain: true,
                    complete: function(jqXHR) {
                        console.log(jqXHR);
                        $('#reg-modal').modal('toggle');
                    },       
                    data: JSON.stringify(sendInfo)
        });
    },
    bindEvents: function() {
        $("#form").submit(function(e) {
            e.preventDefault();
            console.log("submit");
            login.request();

        });
        $("#form2").submit(function(e) {
            e.preventDefault();
            console.log("submit");
            login.reg();

        });
        $("#new").on("click", function() {
            login.type = "new";
            login.login();


        });
        $("#login").on("click", function() {
            login.type = "login";
            $("#modal").click();

        });
         $("#reg").on("click", function() {
            $("#modal2").click();

        });
        /*$('.login-form-1 .form-control').focus(function() {
            $(this).data('placeholder', $(this).attr('placeholder'))
                .attr('placeholder', '');
        }).blur(function() {
            $(this).attr('placeholder', $(this).data('placeholder'));
        });*/

    }
};

export default login;
module.exports = login;