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
