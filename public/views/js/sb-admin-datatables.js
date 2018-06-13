/*// Call the dataTables jQuery plugin
$(document).ready(function() {
   var table = $('#dataTable').DataTable();

    if ($(".filter").length) {
        $(".filter").on('change', function () {
            var searchText = "";
            $(".filter").each(function (key, value) {
                searchText += $(value).val() + " ";
            });
            $("#dataTable_filter .form-control").val(searchText);//.keyup().val("");
            table.search(searchText).draw();
            $("#dataTable_filter .form-control").val('');
        });

        $(".btn-clear-filter").on('click', function () {
            $("#dataTable_filter .form-control").val('');
            $(".filter").each(function (key, value) {
                $(value).val('');
            });
            table.search('').draw();
        });
    }
});
*/