var login = {
    url: "",
    init: function() {

        this.bindEvents();
        console.log("login intit");


    },
    cacheDom: function() {

    },
    request: function() {
        var username = $("#lg_username").val();
        var password = $("#lg_password").val();


        var sendInfo = {
            "login": username,
            "password": password
        };

        $.ajax({
            type: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: login.url,
            dataType: "json",
            crossDomain: true,
            success: function(response) {
                if (response == true) {
                    window.location.href = "/index.html";
                } else {
                    alert("Cannot log");
                }
            },

            data: JSON.stringify(sendInfo)
        });
    },
    bindEvents: function() {
        $("#login-form").submit(function(e) {
            e.preventDefault();
            console.log("submit");
            login.request();

        });

        $('.login-form-1 .form-control').focus(function() {
            $(this).data('placeholder', $(this).attr('placeholder'))
                .attr('placeholder', '');
        }).blur(function() {
            $(this).attr('placeholder', $(this).data('placeholder'));
        });

    }
};

export default login;
module.exports = login;