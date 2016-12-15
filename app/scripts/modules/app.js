require('bootstrap');

import kysely from "./kysely2.js";
import login from "./login.js";
import initial from "./initial.js";
import newSurvey from "./new.js";

$(document).ready(function() {


    //-----------------SERVER URL LIST -----------------------------
    kysely.url = "http://localhost:8080/SOS_kysely/kyselyt/";
    //kysely.url = "http://proto433.haaga-helia.fi:8080/SOS_kysely/kyselyt/";
    
    login.url = "http://proto433.haaga-helia.fi:8080/SOS_kysely/login";

    newSurvey.url1 = "http://localhost:8080/SOS_kysely/kyselyt/lisaaKysely";
    //newSurvey.url1 = "http://proto433.haaga-helia.fi:8080/SOS_kysely/kyselyt/lisaaKysely";
    
    newSurvey.url2 = "http://localhost:8080/SOS_kysely/kyselyt/";
    //newSurvey.url2 = "http://proto433.haaga-helia.fi:8080/SOS_kysely/kyselyt/";

    
    //--------------------------------------------------------------
    let path = window.location.pathname;  
    if((path == "/index.html") || (path == "/")) {
    	initial.init();	
    }
    else if (path == "/new.html") {
    	newSurvey.init();
    }
    else {
        kysely.init();
    }
});