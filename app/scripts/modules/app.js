require('bootstrap');

import kysely from "./kysely.js";
import login from "./login.js";

$(document).ready(function() {


    //-----------------SERVER URL LIST -----------------------------
    kysely.url = "http://proto433.haaga-helia.fi:8080/SOS_kysely/kyselyt";
    login.url = "http://proto433.haaga-helia.fi:8080/SOS_kysely/login";
    //--------------------------------------------------------------

    login.init();
});