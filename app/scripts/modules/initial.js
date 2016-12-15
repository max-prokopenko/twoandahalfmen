var initial = {
    init: function() {
        this.bindEvents();
    },
    logout: function() {
        sessionStorage.clear();
        window.location.href = "/login.html";
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
    },
    redirect: function(id) {
        window.location.href = "/survey.html#" + initial.crypt(id);
    },
    crypt: function(id) {
        let CryptoJS = require("crypto-js");
        let ciphertext = CryptoJS.AES.encrypt(id, 'taam');
        return ciphertext;
    }
};

export default initial;
module.exports = initial;