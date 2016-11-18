require('bootstrap');

import kysely from "./kysely.js";

$(document).ready(function() {


//-----------------SERVER URL LIST -----------------------------
kysely.url = "http://proto433:8080/SOS_kysely/kyselyt";
//--------------------------------------------------------------

	kysely.init();
});
