var newSurvey = {
    name: "",
    desc: "",
    url1: "",
    url2: "",
    id: null,
    surveyId: null,
    survey: [],
    init: function() {
        this.bindEvents();
    },
    qr: function(url) {
        const QRious = require('qrious');
        let qr = new QRious({
          element: document.getElementById('qr'),
          value: url,
          backgroundAlpha: 0,
          size: 150
        })
    },
    crypt: function(id) {
        let CryptoJS = require("crypto-js");
        let ciphertext = CryptoJS.AES.encrypt(id, 'taam');
        return ciphertext;
    },
    validation: function() {
        if(($("#name").val().length != 0) && ($("#desc").val().length != 0)) {
            console.log("test");
            $("#step2").slideDown();
            $("#save").show();
            $("#addQuestion").show();
        }
        else {
            $("#step2").slideUp();
        }
    },
    save: function() {
        newSurvey.name = $("#name").val();
        newSurvey.desc = $("#desc").val();
        let questionnairInfo = {
            "kysely_nimi": newSurvey.name,
            "kuvaus": newSurvey.desc,
            "omistaja_id": 1
        };

        $("[data-type='q']").each(function() {
            let question = {
                "kysymys": $(this).val(),
                "kysymys_tyyppi": "yesno",
                "kysymys_info": "fuckpissshiet"
            };
            newSurvey.survey.push(question);
        });
        newSurvey.request(questionnairInfo, newSurvey.url1, "SAVE_INFO");
    },
    request: function(data, url, type) {
        function handleData(data) {
            console.log(data);
        } 

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
                  if (type === 'SAVE_INFO') {
                    let resp = jqXHR.responseText.split(" ");

                    newSurvey.surveyId = resp[2];
                    newSurvey.id = resp[5];
                    alert(newSurvey.id);

                    let qUrl = newSurvey.url2 +  newSurvey.id + "/lisaaKysymys";
                    for (var i = 0; i < newSurvey.survey.length; i++) {
                         newSurvey.request(newSurvey.survey[i], qUrl , "SAVE_Q");
                    }
                  }
                  else if (type === 'SAVE_Q') {
                    newSurvey.info();
                  }
                }   
            },       
            data: JSON.stringify(data)
        });
    },
    info: function(id) {
        $("#newSurvey").html("");
        $("#newSurvey").append("<div class='container'><div class='row'><div class='col-md-8 col-md-offset-2 col-xs-10 col-xs-offset-1 newContainer text-center'><h3>Congratuations you just created a new survey</h3><p>Your survey code is <h4><strong>#" + newSurvey.surveyId.toUpperCase() + "</strong></h4></p><p><canvas id='qr'></canvas></p></div></div></div>");
        newSurvey.qr(newSurvey.url2 + "#" + newSurvey.crypt(newSurvey.surveyId));
    },
    load: function(id) {  
        let xmlhttp = new XMLHttpRequest();
        let url = newSurvey.url2;
        url = url + "nkkxkf";
        
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

                console.log(xmlhttp.responseText);
                
            }
        }
        xmlhttp.open("GET", url, true);
        xmlhttp.send();

    },  
    bindEvents: function() {
        let question = $(".questionContainer").clone().hide();
        $( "#step1").keydown(function() {
          newSurvey.validation();
        });

        $("#addQuestion").on("click", function() {
            $("#step2").append(question.clone().show());
            $("html, body").animate({ scrollTop: $(document).height() }, 500);
        });
        $("#save").on("click", function() {
            console.log("save");
            newSurvey.save();
        });
        $(document).on('click', '.close', function() {
            $(this).parent().fadeOut().remove();
        });
       

       
    }
};

export default newSurvey;
module.exports =  newSurvey;