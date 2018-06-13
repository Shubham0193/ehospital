function myFunction() {
  var input, filter, table, tr, td, index;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (index = 0; index < tr.length; index++) {
    td = tr[index].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[index].style.display = "";
      } else {
        tr[index].style.display = "none";
      }
    }       
  }
}
