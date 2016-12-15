var kysely = {
    url: "",
    url2: "",
    hash: "",
    data: [],
    reply: [],
    index: 0,
    id: null,
    amt: 0,
    stat: [],
    init: function() {

        this.auth();
        //this.bindEvents();
        //this.cacheDom();
        $(".top").show();
        

    },
    auth: function() {
        var url = window.location.hash;
        var hash = url.substring(url.indexOf('#')+1);
        hash = kysely.crypt(hash);
        kysely.hash = hash;
        this.load(hash);
    },
    cacheDom: function() {

    },
    setQ: function() {
        let data = JSON.parse(kysely.data);
        let kysymys = data[kysely.index].kysymys; //kysymys_tyyppi
        $("#questionTopic").html(kysymys.kysymys);
        $("#questionAnswer").html(kysely.type(kysymys.kysymys_tyyppi));
        
        
    },
    crypt: function(hash) {
        let CryptoJS = require("crypto-js");
        let bytes  = CryptoJS.AES.decrypt(hash.toString(), 'taam');
        return bytes.toString(CryptoJS.enc.Utf8);
    },
    load: function(id) {  
        var xmlhttp = new XMLHttpRequest();
        var url = kysely.url;
        url = url + id;
        //url =  url.slice(0, -8) + id;
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

                //console.log(xmlhttp.responseText);
                kysely.data = xmlhttp.responseText;
                kysely.render(kysely.data);
            }
        }
        xmlhttp.open("GET", url, true);
        xmlhttp.send();

    },  
    getVastaus: function(id) {  
        var xmlhttp = new XMLHttpRequest();
        var url = kysely.url + "vastaukset/" + id;
        //url =  url.slice(0, -8) + id;
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

                //console.log(xmlhttp.responseText);
                kysely.collect(xmlhttp.responseText);

            }
        }
        xmlhttp.open("GET", url, true);
        xmlhttp.send();

    },  
    logout: function() {
        sessionStorage.clear();
        window.location.href = "/login.html";
    },
    next: function() {
        let data = JSON.parse(kysely.data);
        if (kysely.index < data.length - 1) {
            kysely.index++;
            kysely.setQ();
        }
       
    },
    prev: function() {
        let data = JSON.parse(kysely.data);
        if (kysely.index > 0) {
            kysely.index--;
            kysely.setQ();
        }
       
    },
    bindEvents: function() {

        $("input:checkbox").on('click', function() {
            console.log("click");
              // in the handler, 'this' refers to the box clicked on
              var $box = $(this);
              let boxParent = $box.closest(".question");
              let nextBox = boxParent.next(".question");
            
              if ($box.is(":checked")) {

                // the name of the box is retrieved using the .attr() method
                // as it is assumed and expected to be immutable
                var group = "input:checkbox[data-id='" + $box.data("id") + "']";
                // the checked state of the group/box on the other hand will change
                // and the current value is retrieved using .prop() method
                $(group).prop("checked", false);
                $box.prop("checked", true);
                
                kysely.show(nextBox);
              } else {
                $box.prop("checked", false);
                kysely.show(nextBox);
              }
        });
         $("#saveBtn").on("click", function() {
            kysely.save();

        });
    },
    show: function (nextBox) {
        nextBox.show();
        $("html, body").animate({ scrollTop: $(document).height() }, 500);
        if($('#survey').children(':hidden').length == 0) {
           $("#saveBtn").fadeIn(1700);
        }
         
    },
    type: function(type, id) {
        let questionAnswer = "";
        switch (type) {
            case 1:
                questionAnswer = "<button type='button' class='btn btn-success yesnoBtn' id='yes'>Yes</button><button type='button' class='btn btn-danger yesnoBtn' id='no'>No</button>";
                break;
            case 2:
                questionAnswer = "<select id='vast'>" + 
                                    "<option value='yes'>Yes</option>" +
                                    "<option value='no'>No</option>" +
                                  "</select>";
                break;
            case "yesno":
                questionAnswer ='<label class="checkbox-inline">' +
                                    '<input type="checkbox" value="yes" data-type="q" data-id="' + id + '">Yes' +
                                '</label>' +
                                '<label class="checkbox-inline">' +
                                    '<input type="checkbox" value="no" data-type="q" data-id="' + id + '">No' +
                                '</label>';
                break;
            case 3:
                questionAnswer = "Wednesday";
                break;
            case 4:
                questionAnswer = "Thursday";
                break;
            case 5:
                questionAnswer = "Friday";
                break;
            case 6:
                questionAnswer = "Saturday";
        }
        return questionAnswer;
    },
    login: function() {
        var userObject = sessionStorage.getItem('userObject');
        if((userObject == null) || (userObject.logged == false)) {
            
            window.location.href = "/login.html";
        }
    },
    save: function() {
        $("input:checkbox:checked").each(function() {
            if ($(this).prop( "checked" )) {
                console.log("checked");
                let url = kysely.url + "/kysymys/" + $(this).data("id") + "/lisaaVastaus/";
                let vastaus = 
                   {
                    "vastaus": $(this).val()
                    }; 
                console.log(vastaus);
                $.ajax({
                    type: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                         "postman-token": "c4ac53bd-fb61-5a1c-357f-1eae1738e634"
                    },
                    url: url,
                    dataType: "json",
                    crossDomain: true,
                    complete: function(jqXHR) {
                       if(jqXHR.readyState === 4) {
                          console.log("saved");
                          kysely.update();
                        }   
                    },       
                    data: JSON.stringify(vastaus)
                });
            }
            
            
        });    
    },
    vis: function(result) {
       let Chart =  require('chart.js');
       let index = 0;
        $(".myChart").each(function(i) {
            $(this).addClass("canvas" + i);
            index = i;
        });
       for (var i = 0; i <= index; i++) {
           let ctx = $(".canvas" + i);

           let data = {
                labels: [
                    "Yes",
                    "No"
                ],
                datasets: [
                    {
                        data: [result[i].yes, result[i].no],
                        backgroundColor: [
                            "#FF6384",
                            "#36A2EB"
                        ],
                        hoverBackgroundColor: [
                            "#FF6384",
                            "#36A2EB"
                        ]
                    }]
            };
           var myDoughnutChart = new Chart(ctx, {
                type: 'doughnut',
                data: data
            }); 
            } 
       
    },
    collect: function(data) {
        data = JSON.parse(data);
        console.log(data.length);
        let temp = [];
        for (var i = 0; i < kysely.amt; i++) {
            temp[i] = {yes: 0, no: 0};
        }
        let index = 0;
        let id = data[0].kysymys_id;
        for (var i = 0; i < data.length; i++) {
           if(data[i].kysymys_id == id) {
                if (data[i].vastaus == "yes") {
                    temp[index].yes++;    
                }
                if (data[i].vastaus == "no") {
                    temp[index].no++;    
                }
           }
           else {
                index++;
                id = data[i].kysymys_id;
                if (data[i].vastaus == "yes") {
                    temp[index].yes++;    
                }
                if (data[i].vastaus == "no") {
                    temp[index].no++;    
                }
            }

        }
        console.log(temp);
        this.vis(temp);
    },
    update: function() {
        kysely.getVastaus(kysely.kId);
         $("html, body").animate({ scrollTop: 0 }, 500);
    },
    render: function(dataIn) {
        let dataTemp = JSON.parse(dataIn);
        kysely.kId = dataTemp[0].kysely_id;
        kysely.amt = dataTemp.length;
        kysely.getVastaus(dataTemp[0].kysely_id);
        for (var i = 0; i < dataTemp.length; i++) {
            dataTemp[i].kysymys.kysymys_tyyppi = kysely.type(dataTemp[i].kysymys.kysymys_tyyppi, dataTemp[i].kysymys.kysymys_id);
            //console.log(dataTemp[i].kysymys);
        }
        $("#qTopic").html("<h3>" + dataTemp[0].kysely_nimi + "</h3>");
        //$("#qDesc").html("<h4>" + dataTemp[0].kysely_ + "</h4>");
        var data = {
            kyselyt: dataTemp,


        };
       

        //var tpl = '{{#kyselyt}}<div class="col-md-6 col-md-offset-3 col-xs-12"><div class="row"><div class="row"><div class="col-xs-12 text-center"><div class="questionTopic">{{kysymys.kysymys}}</div></div><div class="row"><div class="col-xs-12 text-center"><div class="questionAnswer">{{kysymys.kysymys_tyyppi}}</div></div></div></div></div></div></div>{{/kyselyt}}';
        let tpl = '{{#kyselyt}}<div class="container question col-md-6 col-md-offset-3 box">' + 
                                    '<div class="row">' + 
                                        '<div class="questionTopic col-md-6">{{kysymys.kysymys}}</div>' + 
                                    '</div>' + 
                                    '<div class="row">' +
                                        '<div class="col-xs-12 text-center">' + 
                                            '<div class="questionAnswer"><form data-kysymysid="{{kysymys.kysymys_id}}">{{{kysymys.kysymys_tyyppi}}}</form></div>' + 
                                        '</div>' + 
                                    '</div>' +
                                     '<div class="row text-center">' +
                                        '<div class="col-xs-12 text-center"><canvas class="myChart"></canvas></div>' +
                                    '</div>' +
                                '</div>{{/kyselyt}}'       
        var html = Mustache.to_html(tpl, data);
        $('#survey').html(html);
        $(".box").slice(1).hide();
        kysely.bindEvents();
        
    }
};

export default kysely;
module.exports = kysely;