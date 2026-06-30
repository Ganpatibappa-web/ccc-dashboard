//========================================
// CCC Dashboard v3.0
//========================================

// Global Variables

let reportRows = [];
let reportHeader = [];
let dashboard = {};


//========================================
// Page Load
//========================================

window.onload = function () {

    document.title = APP_TITLE;

    document.getElementById("title").innerHTML = APP_TITLE;

    document.getElementById("version").innerHTML =
        "Version " + APP_VERSION;

    document
        .getElementById("generateBtn")
        .addEventListener("click", loadReport);

    document
        .getElementById("search")
        .addEventListener("keyup", filterTable);

    document
        .getElementById("printBtn")
        .addEventListener("click", function () {

            window.print();

        });

    document
        .getElementById("excelBtn")
        .addEventListener("click", exportExcel);

    document
        .getElementById("closePopup")
        .addEventListener("click", function () {

            document.getElementById("popup").style.display = "none";

        });

};



//========================================
// Loader
//========================================

function showLoader(show){

    document.getElementById("loader").style.display =
        show ? "block" : "none";

}



//========================================
// Load Report
//========================================

async function loadReport(){

    let sheetUrl =
        document.getElementById("sheetUrl").value.trim();

    if(sheetUrl==""){

        alert("Paste Google Sheet Link");

        return;

    }

    let sheetId = extractSheetId(sheetUrl);

    if(!sheetId){

        alert("Invalid Google Sheet Link");

        return;

    }

    let gid = extractGid(sheetUrl);

    showLoader(true);

    try{

        const api =

            API_URL +

            "?sheetId=" +

            encodeURIComponent(sheetId) +

            "&gid=" +

            encodeURIComponent(gid);

        const response =
            await fetch(api);

        const json =
            await response.json();

        showLoader(false);

        if(!json.success){

            alert(json.message);

            return;

        }

        reportRows =
            json.rows;

        reportHeader =
            reportRows[0];

        buildDashboard();

    }

    catch(err){

        showLoader(false);

        alert(err);

    }

}



//========================================
// Extract Sheet ID
//========================================

function extractSheetId(url){

    let match =
        url.match(/\/d\/([^\/]+)/);

    if(match){

        return match[1];

    }

    return null;

}



//========================================
// Extract GID
//========================================

function extractGid(url){

    let match =
        url.match(/gid=(\d+)/);

    if(match){

        return match[1];

    }

    return "0";

}
