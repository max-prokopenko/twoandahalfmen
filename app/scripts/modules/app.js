require('bootstrap');

import kysely from "./kysely2.js";
import login from "./login.js";
import initial from "./initial.js";
import newSurvey from "./new.js";

$(document).ready(function() {


    //-----------------SERVER URL LIST -----------------------------
    
    //kysely.url = "http://localhost:8080/SOS_kysely/kyselyt/";
    kysely.url = "http://proto433.haaga-helia.fi:8080/SOS_kysely/kyselyt/";
    
    //login.url = "http://localhost:8080/SOS_kysely/login";
    login.url = "http://proto433.haaga-helia.fi:8080/SOS_kysely/login";

    //login.urlReg = "http://localhost:8080/SOS_kysely/user/register";
    login.urlReg = "http://proto433.haaga-helia.fi:8080/SOS_kysely/user/register";

    //newSurvey.urlMain = "http://localhost:8080/twoandahalfmen/";
    newSurvey.urlMain = "http://proto433.haaga-helia.fi:8080/twoandahalfmen/";
    
    //newSurvey.url1 = "http://localhost:8080/SOS_kysely/kyselyt/lisaaKysely";
    newSurvey.url1 = "http://proto433.haaga-helia.fi:8080/SOS_kysely/kyselyt/lisaaKysely";
    
    //newSurvey.url2 = "http://localhost:8080/SOS_kysely/kyselyt/";
    newSurvey.url2 = "http://proto433.haaga-helia.fi:8080/SOS_kysely/kyselyt/";

    
    //--------------------------------------------------------------
    let path = window.location.pathname;  
    if((path == "/twoandahalfmen/index.html") || (path == "/twoandahalfmen/")) {
    	initial.init();
        login.init();	
    }
    else if (path == "/twoandahalfmen/new.html") {
    	newSurvey.init();
    }
    else {
        kysely.init();
    }
});