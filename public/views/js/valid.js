function validateform() //////////////////////////////usev validations
{
	var validUname = validateUname();
	var validMail = validateEmail();
	var validPass = validatePass();
	var validPhone = validatePhone();
	var validAddress = validateAddress();
    var validConPass = ConfirmPassword();  
	if(validUname==true && validMail==true && validPass==true && validPhone==true && validAddress==true && validConPass==true)
	{
		return true;
    }
	return false;
}
function validateUname(){
    var name = document.getElementById("uname");
    var errorName = document.getElementById("errorName");
    var val=uname.value;
     if (/^[A-Za-z]+$/.test(val))
	 {
	    errorName.innerHTML="";
	    return true;
	 }
	 else
	 { 
        errorName.style.color="red";
	 	errorName.innerHTML="Please Check User Name..!!!";
	 	return false;
	 }	
}


   function validateEmail(){
    var emailId = document.getElementById("uemail");
	var errorMail = document.getElementById("errorMail");
    var val=uemail.value;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val))
	 {
	    errorMail.innerHTML="";
	    return true;
	 }
	 else
	 {
	 	errorMail.style.color="red";
	 	errorMail.innerHTML="Enter Correct EmailID..!!!";
	  return false;
	 }	
}

function validatePass(){
	var pass = document.getElementById("upass");
	var errorPass= document.getElementById("errorPass");
    var val=pass.value;
    if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/i.test(val))
	 {
	   errorPass.innerHTML="";
	   return true;
	 }
	 else
	 {
       errorPass.style.color="red";
 	   errorPass.innerHTML="Password should contain at least one special character, one number and length minimum 8 ..!!!";
	   return false;
	 }	
}

function validatePhone(){
    var phone = document.getElementById("umob");
	var errorPhone= document.getElementById("errorPhone");
    var val=umob.value;
    if (/^\d{10}$/.test(val))
	 {
	    errorPhone.innerHTML="";
	    return true;
	 }
	 else
	 {
        errorPhone.style.color="red";
        errorPhone.innerHTML="please enter 10 Digit Number..!!!";
	    return false;
	 }	
}   

function validateAddress() {
	var add = document.getElementById("uaddress");
	var errorAdd = document.getElementById("errorAdd");
	var val = add.value;
	val = val.trim();
	
	if (/^[A-Za-z0-9'\.\-\s\,]+$/.test(val)) {
		errorAdd.innerHTML = "";
		return true;
	}
	else {
		errorAdd.style.color = "red";
		errorAdd.innerHTML = "Please Check Address..!!!";
		return false;
	}
}

function ConfirmPassword()    
{  
	 var upass = document.getElementById("upass");
	 var conpass = document.getElementById("conpass");
     var errorCpass= document.getElementById("errorCpass");

	 if(conpass != upass)
     {   
     	errorCpass.innerHTML="";
  	    return true;
     }
     else
     {
        errorCpass.style.color="red";
 	    errorCpass.innerHTML="Password Not Matching ..!!!";
	    return false;
     }	
}  

////VALIDATIONSFOR DEPARTMENT//////////////////
function validateDname(){

    var name = document.getElementById("dname");
	var errorDname = document.getElementById("errorDname");
    var val=name.value;
     if (/^[A-Za-z\s]+$/.test(val))
	 {
		 errorDname.innerHTML="";
	    return true;
	 }
	 else
	 { 
		 errorDname.style.color="red";
		 errorDname.innerHTML="Please Check Department Name..!!!";
	 	return false;
	 }	
}
////////////////////VALIDATIONS FOR BRANCH/////////////////////

function validateBname(){
    var name = document.getElementById("bname");
    var errorName = document.getElementById("errorName");
    var val=name.value;
     if (/^[A-Za-z\s]+$/.test(val))
	 {
	    errorName.innerHTML="";
	    return true;
	 }
	 else
	 { 
        errorName.style.color="red";
	 	errorName.innerHTML="Please Check Branch Name..!!!";
	 	return false;
	 }	
}
///////////////////////////////////////////////////////validations for Doctor Category/////////////////////////
function validateCategory(){
    var name = document.getElementById("cname");
    var errorName = document.getElementById("errorName");
    var val=name.value;
     if (/^[A-Za-z\s]+$/.test(val))
	 { 
	    errorName.innerHTML="";
	    return true;
	 }
	 else
	 { 
        errorName.style.color="red";
	 	errorName.innerHTML="Please Check Doctor's Category Name..!!!";
	 	return false;
	 }	
}
/////////////////////////////////validations for Doctor module/////////////////// 
function validateDoctorForm() //////////////////////////////usev validations
{
	var validPrename = validatePreName();
	var validname = validateName();
	var validMail = validateDoctorEmail();
	var validMobile = validateMobile();
	var validPhoneOffice = validateTelephoneOffice();
	var validPhoneResident = validateTelephoneResident();
	var validAddress = validateDoctorAddress();
	var validDegree = validateDegree();
	if (validPrename == true && validname == true && validMail == true && validMobile == true && validPhoneOffice == true && validPhoneResident == true && validAddress == true && validDegree == true) {
		return true;
	}
	return false;
}



function validatePreName()
{    
	 var name = document.getElementById("idprename");
     var errorName = document.getElementById("errorprename");
     var val=name.value;
     if (/^[A-Za-z\s]+$/.test(val))
	 {
	    errorName.innerHTML="";
	    return true;
	 }
	 else
	 { 
        errorName.style.color="red";
	 	errorName.innerHTML="Please Check Pre Name..!!!";
	 	return false;
	 }	
}


function validateName(){
    var name = document.getElementById("idname");
    var errorName = document.getElementById("errorDocName");
    var val=name.value;
     if (/^[A-Za-z\s]+$/.test(val))
	 {
	    errorName.innerHTML="";
	    return true;
	 }
	 else
	 { 
        errorName.style.color="red";
	 	errorName.innerHTML="Please Check Doctor's Name..!!!";
	 	return false;
	 }	
}


function validateDegree() {
	var name = document.getElementById("iddegree");
	var errorName = document.getElementById("errordegree");
	var val = name.value;
	if (/^[A-Za-z\s]+$/.test(val)) {
		errorName.innerHTML = "";
		return true;
	}
	else {
		errorName.style.color = "red";
		errorName.innerHTML = "Please Check Degree..!!!";
		return false;
	}
}

function validateMobile() {
	var phone = document.getElementById("idmobile");
	var errorPhone = document.getElementById("errorPhone");
	var val = phone.value;
	if (/^\d{10}$/.test(val)) {
		errorPhone.innerHTML = "";
		return true;
	}
	else {
		errorPhone.style.color = "red";
		errorPhone.innerHTML = "please enter 10 Digit Number..!!!";
		return false;
	}
}  

function validateDoctorAddress() {
	var add = document.getElementById("idaddress");
	var errorAdd = document.getElementById("errorAdd");
	var val = add.value;
	if (/^[A-Za-z0-9'\.\-\s\,]+$/.test(val)) {
		errorAdd.innerHTML = "";
		return true;
	}
	else {
		errorAdd.style.color = "red";
		errorAdd.innerHTML = "Please Check Address..!!!";
		return false;
	}
}

function validateTelephoneResident() {
	var telphone = document.getElementById("idtelresident");
	var errortelphone = document.getElementById("errortelphone");
	var val = telphone.value;
	if (/^[0-9]\d{2,4}-\d{6,8}$/.test(val)) {
		errortelphone.innerHTML = "";
		return true;
	}
	else {
		errortelphone.style.color = "red";
		errortelphone.innerHTML = "Please Check Phone Number..!!!";
		return false;
	}
}

function validateTelephoneOffice() {
	var telphone = document.getElementById("idteloffice");
	var errortelphone = document.getElementById("errortelPhone1");
	var val = telphone.value;
	if (/^[0-9]\d{2,4}-\d{6,8}$/.test(val)) {
		errortelphone.innerHTML = "";
		return true;
	}
	else {
		errortelphone.style.color = "red";
		errortelphone.innerHTML = "Please Check Phone Number..!!!";
		return false;
	}
}

function validateDoctorEmail() {
	var emailId = document.getElementById("idemail");
	var errorMail = document.getElementById("errorMail");
	var val = emailId.value;
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)) {
		errorMail.innerHTML = "";
		return true;
	}
	else {
		errorMail.style.color = "red";
		errorMail.innerHTML = "Enter Correct EmailID..!!!";
		return false;
	}
}





// ^[a-zA-Z'.,-]{0,150}$



//"^[0-9]\d{2,4}-\d{6,8}$" 