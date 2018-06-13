function chkbx() //////////////////////////////usev validations
{
    if (document.getElementById('idchkbox').checked) {
        var addr = document.getElementById('addr').value;
        var city = document.getElementById('idcity').value;
        var state = document.getElementById('idstate').value;
        var dist = document.getElementById('iddist').value;
        var pin = document.getElementById('idpin').value; 

        document.getElementById("permaddr").value = addr;
        document.getElementById("idpermcity").value = city;
        document.getElementById("idpermstate").value = state;
        document.getElementById("permdist").value = dist;
        document.getElementById("idpermpin").value = pin;
        
    } else {
        document.getElementById("permaddr").value ="";
        document.getElementById("idpermcity").value =""; 
        document.getElementById("idpermstate").value ="";
        document.getElementById("permdist").value ="";
        document.getElementById("idpermpin").value ="";
    }
}

function getAge()
{  
     var agespan = document.getElementById("agespan");   

    var today = new Date();
    var yyyy = today.getFullYear();

    var birthDate = document.getElementById('dob').value; 
    var dateAfterParse = Date.parse(birthDate);
    var dateAfterParse = new Date(dateAfterParse);     

    var yy = dateAfterParse.getFullYear();
    var age = yyyy - yy;   
   
    agespan.innerHTML = age;
    return true;

//---------------------------------------------------------------------
    // var birthDate = jQuery("#dob").val();
    // alert(birthDate);
    // birthDate = birthDate.split("-");  

    // dob = new Date(birthDate[2], birthDate[1] - 1, birthDate[0]);
    
    // alert(dob);

    // alert(birthDate[2]);
    // alert(birthDate[1]);
    // alert(birthDate[0]);

    // var today = new Date();
    // alert(today);
    // //console.log("today"+today);

    // //console.log("dob"+dob);

    // var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));

    // //console.log(age);
    // alert(age);

    // jQuery('#agespan').val()=age;


    //--------------------------------------------------------------------
//     var _MS_PER_DAY = 1000 * 60 * 60 * 24;

//     // a and b are javascript Date objects
//     function dateDiffInDays(a, b) {
//         // Discard the time and time-zone information.
//         var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
//         var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

//         return Math.floor((utc2 - utc1) / _MS_PER_DAY);
//     }

//     // test it
//     var a = new Date();

//     var birthDate = document.getElementById('dob').value;
//     var dateAfterParse = Date.parse(birthDate);
//     var b = new Date(dateAfterParse);   

//      //var   b = new Date("2017-07-25");
//       var  difference = dateDiffInDays(a, b);
//    //alert("res=>" + (difference / 365).toFixed(1));


//     function jarh(x) {
//         var y = 365;
//         var y2 = 31;
//         var remainder = x % y;
//         var casio = remainder % y2;
//         year = (x - remainder) / y;
//         month = (remainder - casio) / y2;

//         var result = " Year->" + year + " Month->" + month + " Day->" + casio;

//         return result;
//     }
//     var call = jarh(difference);
//     agespan.innerHTML = call;

    // alert(call);


}

/*-----------------------------------------------------------------------------------------
===========================================================================================
                   Dependent DropDown Filling Using Ajax And Jquery
===========================================================================================
-----------------------------------------------------------------------------------------*/

function districtList() {
    
    var StateId = jQuery("#idstate").val();
    performAjaxOperation(StateId);
}



function performAjaxOperation(StateId) {
    $.ajax({
            method: "GET",
            url: "/getdist",
            data: { state: StateId }
    }).done(function (dist) {
            var jsonData = $.parseJSON(JSON.stringify(dist));
            var distAdd = document.getElementById("iddist");
            document.getElementById("iddist").options.length = 0;
            for (index = 0; index < jsonData.length; index++) {
                var option = document.createElement("option");
                option.text = jsonData[index].name;
                distAdd.add(option);
            }
        });
}


