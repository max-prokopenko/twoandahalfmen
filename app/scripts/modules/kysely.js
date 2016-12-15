var kysely = {
    url: "",
    init: function() {

        //this.login();
        this.load();
        this.cacheDom();


    },
    cacheDom: function() {

    },
    select: function(id) {  
        var xmlhttp = new XMLHttpRequest();
        var url = kysely.urlid;
        //url =  url.slice(0, -8) + id;
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

                kysely.setModal(xmlhttp.responseText);

            }
        }
        xmlhttp.open("GET", url, true);
        xmlhttp.send();

    },
    setModal: function(data) {
        data = JSON.parse(data);
        var output = "";
        for (var i = 0; i < data.length; i++) {
            var kysymys = data[i].kysymys;
            output = output + "<p>" + kysymys.kysymys + "</p>";
        }
        $("#kyselyBody").html(output);
        
    },
    load: function() {
        var xmlhttp = new XMLHttpRequest();
        var url = kysely.url;
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

                kysely.render(xmlhttp.responseText);



            }
        }
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    },
    logout: function() {
        sessionStorage.clear();
        window.location.href = "/login.html";
    },
    bindEvents: function() {
        $(".answer").on("click", function() {
            kysely.select($(this).data("id"));
        });
        $("#logout").on("click", function() {
            kysely.logout();
        });

    },
    login: function() {
        var userObject = sessionStorage.getItem('userObject');
        if((userObject == null) || (userObject.logged == false)) {
            
            window.location.href = "/login.html";
        }
    },
    render: function(dataIn) {
        var data = {
            kyselyt: JSON.parse(dataIn),


        };

        var tpl = "{{#kyselyt}}<div class='col-md-4'><div class='card-overlay'><div class='text-center'><div class='card-block'>" +
            "<h3 class='text-left'>{{kysely_nimi}}</h3>" +
            "<p class='text-left'>{{kysely_kuvaus}}</p>" +
            "<div class='btn btn-success text-center answer' data-toggle='modal' data-target='#kysely' data-id='{{kysely_id}}'>{{onclick}}Answer survey</div>" +
            "</div></div></div></div> {{/kyselyt}}";
        var html = Mustache.to_html(tpl, data);
        $('#kyselyt').html(html);
        kysely.bindEvents();
    }
};

export default kysely;
module.exports = kysely;