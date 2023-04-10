// Project Base URL
let baseUrl = "https://theek-karo-api.herokuapp.com/";
var complain = "";
$(document).ready(function () {
    LoadTechnicians();
});

function LoadTechnicians() {
    $.ajax({
        type: "GET",
        url: "https://theek-karo-api.herokuapp.com/api/tech",
        success: function (data) {

            if (data.message == "Success") {
                LoadAllTech(data.data);
            }
        }
    });
}




function LoadAllTech(Techniciandata) {
    debugger;

    $("#allComplains tr").remove();
    $.each(Techniciandata, function (k, v) {
        var html = '<tr>';
        html += '<td>';
        html += '<div class="d-flex px-2 py-1">';
        html += '<div>';
        if (v.techImage == '' || v.techImage == null) {
            html += '<img src="assets/img/team-2.jpg" class="avatar avatar-sm me-3" alt="user1">';

        }
        else {
            html += '<img src="https://theek-karo-api.herokuapp.com' + v.techImage + '" class="avatar avatar-sm me-3" alt="user1">'; // baseUrl + v.complainImage
        }
        html += '</div>';
        html += '<div class="d-flex flex-column justify-content-center">';
        html += '<h6 class="mb-0 text-sm">' + v.techName + '</h6>';
        html += '<p class="text-xs text-secondary mb-0">' + v.techId + '</p>';
        html += '</div>';
        html += '</div>';
        html += '</td>';
        html += '<td>';
        html += '<p class="text-xs font-weight-bold mb-0">' + '<img src="assets/img/team-2.jpg" class="avatar avatar-sm me-3" alt="user1"></p>';
        html += '<p class="text-xs text-secondary mb-0">' + v.category.categoryId + '</p>';
        html += '</td>';
        html += '<td>';
        html += '<p class="text-xs font-weight-bold mb-0">' + v.category.categoryName + '</p>';
        html += '<p class="text-xs text-secondary mb-0">' + v.techSalePrice + '</p>';
        html += '<p class="text-xs text-secondary mb-0">' + v.techPrice + '</p>';
        html += '</td>';
        html += '<td class="align-middle text-center text-sm">';
        html += '<span class="text-xs font-weight-bold mb-0">' + v.techShortDescription + '</span>';
        html += '</td>';
        html += '<td id="technician">';
        if (v.techStatus == '' || v.techStatus == null) {
            html += '<span class="badge badge-sm bg-gradient-warning">InActive</span>';

        }
        if (v.techStatus == false) {
            html += '<span class="badge badge-sm bg-gradient-success">InActive</span>';

        }
        if (v.techStatus == true) {
            html += '<span class="badge badge-sm bg-gradient-success">Active</span>';
        }
        html += '</td>';
        html += '</td>';




        html += '</tr>';
        $("#allComplains").append(html);
    });
}
