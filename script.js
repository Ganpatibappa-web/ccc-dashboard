/* ==========================================
   CCC Recovery Dashboard v3.0
========================================== */

let reportData = [];
let header = [];
let cccData = {};


//=============================
// Generate Button
//=============================

document.addEventListener("DOMContentLoaded", function () {

    document
        .getElementById("generateBtn")
        .addEventListener("click", loadData);

    document
        .getElementById("excelBtn")
        .addEventListener("click", exportTableToExcel);

    document
        .getElementById("search")
        .addEventListener("keyup", filterTable);

});


//=============================
// Loader
//=============================

function showLoader(){

    document.getElementById("loader").style.display="block";

}

function hideLoader(){

    document.getElementById("loader").style.display="none";

}



//=============================
// Main Function
//=============================

async function loadData(){

    let sheetUrl =
        document.getElementById("sheetUrl").value.trim();

    if(sheetUrl==""){

        alert("Paste Google Sheet Link");

        return;

    }

    showLoader();

    try{

        const response =
            await fetch(API_URL,{
                method:"POST",
                body:JSON.stringify({
                    sheetUrl:sheetUrl
                })
            });

        const result =
            await response.json();

        hideLoader();

        if(!result.success){

            alert(result.message);

            return;

        }

        reportData =
            result.data;

        header =
            reportData[0];

        processData();

    }

    catch(err){

        hideLoader();

        alert(err);

    }

}
//==========================================
// Process Report
//==========================================

function processData() {

    cccData = {};

    let unitIdx = header.indexOf("UNIT_NAME");
    let paidIdx = header.indexOf("PAID DATE");
    let paidAmtIdx = header.indexOf("PAID AMOUNT");
    let govtIdx = header.indexOf("GOVT/GOVT SCHOOL");
    let discIdx = header.indexOf("DISCONNECTION DATE");
    let remarksIdx = header.indexOf("Remarks");

    for (let i = 1; i < reportData.length; i++) {

        let row = reportData[i];

        let ccc = clean(row[unitIdx]);

        if (ccc == "") continue;

        if (!cccData[ccc]) {

            cccData[ccc] = {

                defaulter: 0,
                disconnected: 0,
                paid: 0,
                govt: 0,
                disputes: 0,

                consumers: [],
                disputeList: [],
                yetList: [],
                paidList: [],
                govtList: [],
                disconnectedList: []

            };

        }

        let obj = cccData[ccc];

        obj.defaulter++;

        obj.consumers.push(row);

        let isGovt =
            clean(row[govtIdx]) != "";

        let isPaid =
            clean(row[paidIdx]) != "";

        let isDisconnected =
            clean(row[discIdx]) != "";

        let hasRemarks =
            clean(row[remarksIdx]) != "";

        let hasPaidAmount =
            clean(row[paidAmtIdx]) != "";



        //------------------------------------
        // Govt
        //------------------------------------

        if (isGovt) {

            obj.govt++;

            obj.govtList.push(row);

        }



        //------------------------------------
        // Paid
        //------------------------------------

        if (isPaid) {

            obj.paid++;

            obj.paidList.push(row);

        }



        //------------------------------------
        // Disconnected
        //------------------------------------

        if (isDisconnected) {

            obj.disconnected++;

            obj.disconnectedList.push(row);

        }



        //------------------------------------
        // Disputes
        //------------------------------------

        if (

            !isGovt &&

            !isPaid &&

            !hasPaidAmount &&

            !isDisconnected &&

            hasRemarks

        ) {

            obj.disputes++;

            obj.disputeList.push(row);

        }

    }

    renderDashboard();

}
//==========================================
// Process Report
//==========================================

function processData() {

    cccData = {};

    let unitIdx = header.indexOf("UNIT_NAME");
    let paidIdx = header.indexOf("PAID DATE");
    let paidAmtIdx = header.indexOf("PAID AMOUNT");
    let govtIdx = header.indexOf("GOVT/GOVT SCHOOL");
    let discIdx = header.indexOf("DISCONNECTION DATE");
    let remarksIdx = header.indexOf("Remarks");

    for (let i = 1; i < reportData.length; i++) {

        let row = reportData[i];

        let ccc = clean(row[unitIdx]);

        if (ccc == "") continue;

        if (!cccData[ccc]) {

            cccData[ccc] = {

                defaulter: 0,
                disconnected: 0,
                paid: 0,
                govt: 0,
                disputes: 0,

                consumers: [],
                disputeList: [],
                yetList: [],
                paidList: [],
                govtList: [],
                disconnectedList: []

            };

        }

        let obj = cccData[ccc];

        obj.defaulter++;

        obj.consumers.push(row);

        let isGovt =
            clean(row[govtIdx]) != "";

        let isPaid =
            clean(row[paidIdx]) != "";

        let isDisconnected =
            clean(row[discIdx]) != "";

        let hasRemarks =
            clean(row[remarksIdx]) != "";

        let hasPaidAmount =
            clean(row[paidAmtIdx]) != "";



        //------------------------------------
        // Govt
        //------------------------------------

        if (isGovt) {

            obj.govt++;

            obj.govtList.push(row);

        }



        //------------------------------------
        // Paid
        //------------------------------------

        if (isPaid) {

            obj.paid++;

            obj.paidList.push(row);

        }



        //------------------------------------
        // Disconnected
        //------------------------------------

        if (isDisconnected) {

            obj.disconnected++;

            obj.disconnectedList.push(row);

        }



        //------------------------------------
        // Disputes
        //------------------------------------

        if (

            !isGovt &&

            !isPaid &&

            !hasPaidAmount &&

            !isDisconnected &&

            hasRemarks

        ) {

            obj.disputes++;

            obj.disputeList.push(row);

        }

    }

    renderDashboard();

}
//==========================================
// Process Report
//==========================================

function processData() {

    cccData = {};

    let unitIdx = header.indexOf("UNIT_NAME");
    let paidIdx = header.indexOf("PAID DATE");
    let paidAmtIdx = header.indexOf("PAID AMOUNT");
    let govtIdx = header.indexOf("GOVT/GOVT SCHOOL");
    let discIdx = header.indexOf("DISCONNECTION DATE");
    let remarksIdx = header.indexOf("Remarks");

    for (let i = 1; i < reportData.length; i++) {

        let row = reportData[i];

        let ccc = clean(row[unitIdx]);

        if (ccc == "") continue;

        if (!cccData[ccc]) {

            cccData[ccc] = {

                defaulter: 0,
                disconnected: 0,
                paid: 0,
                govt: 0,
                disputes: 0,

                consumers: [],
                disputeList: [],
                yetList: [],
                paidList: [],
                govtList: [],
                disconnectedList: []

            };

        }

        let obj = cccData[ccc];

        obj.defaulter++;

        obj.consumers.push(row);

        let isGovt =
            clean(row[govtIdx]) != "";

        let isPaid =
            clean(row[paidIdx]) != "";

        let isDisconnected =
            clean(row[discIdx]) != "";

        let hasRemarks =
            clean(row[remarksIdx]) != "";

        let hasPaidAmount =
            clean(row[paidAmtIdx]) != "";



        //------------------------------------
        // Govt
        //------------------------------------

        if (isGovt) {

            obj.govt++;

            obj.govtList.push(row);

        }



        //------------------------------------
        // Paid
        //------------------------------------

        if (isPaid) {

            obj.paid++;

            obj.paidList.push(row);

        }



        //------------------------------------
        // Disconnected
        //------------------------------------

        if (isDisconnected) {

            obj.disconnected++;

            obj.disconnectedList.push(row);

        }



        //------------------------------------
        // Disputes
        //------------------------------------

        if (

            !isGovt &&

            !isPaid &&

            !hasPaidAmount &&

            !isDisconnected &&

            hasRemarks

        ) {

            obj.disputes++;

            obj.disputeList.push(row);

        }

    }

    renderDashboard();

}
//==========================================
// Process Report
//==========================================

function processData() {

    cccData = {};

    let unitIdx = header.indexOf("UNIT_NAME");
    let paidIdx = header.indexOf("PAID DATE");
    let paidAmtIdx = header.indexOf("PAID AMOUNT");
    let govtIdx = header.indexOf("GOVT/GOVT SCHOOL");
    let discIdx = header.indexOf("DISCONNECTION DATE");
    let remarksIdx = header.indexOf("Remarks");

    for (let i = 1; i < reportData.length; i++) {

        let row = reportData[i];

        let ccc = clean(row[unitIdx]);

        if (ccc == "") continue;

        if (!cccData[ccc]) {

            cccData[ccc] = {

                defaulter: 0,
                disconnected: 0,
                paid: 0,
                govt: 0,
                disputes: 0,

                consumers: [],
                disputeList: [],
                yetList: [],
                paidList: [],
                govtList: [],
                disconnectedList: []

            };

        }

        let obj = cccData[ccc];

        obj.defaulter++;

        obj.consumers.push(row);

        let isGovt =
            clean(row[govtIdx]) != "";

        let isPaid =
            clean(row[paidIdx]) != "";

        let isDisconnected =
            clean(row[discIdx]) != "";

        let hasRemarks =
            clean(row[remarksIdx]) != "";

        let hasPaidAmount =
            clean(row[paidAmtIdx]) != "";



        //------------------------------------
        // Govt
        //------------------------------------

        if (isGovt) {

            obj.govt++;

            obj.govtList.push(row);

        }



        //------------------------------------
        // Paid
        //------------------------------------

        if (isPaid) {

            obj.paid++;

            obj.paidList.push(row);

        }



        //------------------------------------
        // Disconnected
        //------------------------------------

        if (isDisconnected) {

            obj.disconnected++;

            obj.disconnectedList.push(row);

        }



        //------------------------------------
        // Disputes
        //------------------------------------

        if (

            !isGovt &&

            !isPaid &&

            !hasPaidAmount &&

            !isDisconnected &&

            hasRemarks

        ) {

            obj.disputes++;

            obj.disputeList.push(row);

        }

    }

    renderDashboard();

}
//==========================================
// Division Detection
//==========================================

function detectDivision() {

    let unitIdx = header.indexOf("UNIT_NAME");

    let heading = "CCC Wise Recovery Dashboard";

    for (let i = 1; i < reportData.length; i++) {

        let ccc = String(reportData[i][unitIdx]).toUpperCase();

        if (ccc.includes("GAJOL") || ccc.includes("GAZOLE")) {
            heading = "Gazole Division CCC Wise Recovery Dashboard";
            break;
        }

        if (ccc.includes("SAMSI")) {
            heading = "Chanchal Division CCC Wise Recovery Dashboard";
            break;
        }

        if (
            ccc.includes("RATHBARI") ||
            ccc.includes("OLD MALDA") ||
            ccc.includes("ENGLISH BAZAR")
        ) {
            heading = "Malda Division CCC Wise Recovery Dashboard";
            break;
        }

    }

    document.getElementById("reportHeading").innerHTML = heading;
    document.title = heading;

}



//==========================================
// Clean Function
//==========================================

function clean(value){

    if(value==null) return "";

    return String(value).trim();

}



//==========================================
// Close Popup by Outside Click
//==========================================

window.onclick=function(event){

    let popup=document.getElementById("popup");

    if(event.target==popup){

        popup.style.display="none";

    }

};



//==========================================
// ESC Key Close Popup
//==========================================

document.addEventListener("keydown",function(e){

    if(e.key==="Escape"){

        closePopup();

    }

});



//==========================================
// Loading Spinner
//==========================================

function showLoader(){

    document.getElementById("loader").innerHTML=
    `
    <div class="spinner"></div>
    <br>
    Loading Report...
    `;

    document.getElementById("loader").style.display="block";

}

function hideLoader(){

    document.getElementById("loader").style.display="none";

}



//==========================================
// Auto Detect Division After Processing
//==========================================

const oldProcessData = processData;

processData = function(){

    oldProcessData();

    detectDivision();

};



//==========================================
// End of File
//==========================================
