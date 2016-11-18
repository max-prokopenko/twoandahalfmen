//var loading = require("../../modules/leftside_modules/loading.js");

var kysely = {
        url: "",
        init: function() {
            
            this.load();
            this.cacheDom();
            this.bindEvents();
            
            
           
            

        },
        cacheDom: function() {
            
            

        },
       load: function() {
            var xmlhttp = new XMLHttpRequest();
            var url = kysely.url;
            //var url = "./scripts/php/menu_modules/examples.php";
            //var url = "/session-api/v1/exercises";
            
            
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                   
                    kysely.render(xmlhttp.responseText);
                    
                    
                    
                }
            }
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
        },
        bindEvents: function() {
            
        },
        render: function(dataIn) {
            var data = {
                kyselyt: JSON.parse(dataIn),
            };
            
            var tpl = "{{#kyselyt}}<div class='col-md-4'><div class='card-overlay'><div class='text-center'><div class='card-block'>" + 
                            "<h3 class='text-left'>{{kysely_nimi}}</h3>" + 
                            "<p class='text-left'>description</p>" +
                            "<div class='btn btn-success text-center'>Answer survey</div>" +
                        "</div></div></div></div> {{/kyselyt}}";
            var html = Mustache.to_html(tpl, data);
            $('#kyselyt').html(html);
        }
    };
   
export default kysely;
module.exports = kysely;
