var initial = {
    init: function() {
        this.bindEvents();
        this.loginCheck();
    },
    logout: function() {
        sessionStorage.clear();
        $("#login").show();
         $("#logout").hide();
        //window.location.href = "/login.html";
    },
    loginCheck: function() {
        console.log("loginCheck");
        let userObject = sessionStorage.getItem('userObject');
         userObject = JSON.parse(userObject);

        if ((userObject != null) && (userObject.logged == true)) {
            $("#logout").show();
        }
        else {
                $("#login").show();
            }
        
    },
    login: function() {
        console.log("lgoin f");
        let userObject = sessionStorage.getItem('userObject');
         userObject = JSON.parse(userObject);

        if (userObject != null) {
            console.log(userObject);

            if(userObject[0] == false) {
                $("#login").click();
            }
            else {
                window.location.href = "/twoandahalfmen/new.html";
               
            }
        }
        else {
                
        }
        
    },  
    bindEvents: function() {
        $("#open").on("click", function() {
            //$("#first").fadeOut(500);
            setTimeout(function() {
                let hash = $("#surveyId").val();
                if( hash.charAt( 0 ) === '#' ) {
                    hash = hash.slice(1);
                    initial.redirect(hash);
                }
                else {
                    alert("Where is #, you idiot!");
                } 
            }, 0);
        });
        $("#logout").on("click", function() {
            initial.logout();

        });
        
    },
    redirect: function(id) {
        window.location.href = "/twoandahalfmen/survey.html#" + initial.crypt(id);
    },
    crypt: function(id) {
        let CryptoJS = require("crypto-js");
        let ciphertext = CryptoJS.AES.encrypt(id, 'taam');
        return ciphertext;
    }
};

export default initial;
module.exports = initial;