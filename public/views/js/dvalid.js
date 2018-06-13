function validateDept()
{
	var validDname = validateDname();
	  
	if(validDname==true)
	{
		return true;
    }
	return false;
}


function validateDname(){
    var name = document.getElementById("dname");
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
	 	errorName.innerHTML="Please Check Department Name..!!!";
	 	return false;
	 }	
}
