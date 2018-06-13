<script>
function myFunction() {

    	var name = document.getElementById("prompt").value;
       
    var person = prompt("Please enter DepartName For update", name);
    if (person != null) {
       console.log(person);
    }
}
</script>