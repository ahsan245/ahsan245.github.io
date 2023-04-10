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
                LoadComplains(data.data);
            }
        }
    });
}



function LoadComplains(TechData) {
    $.ajax({
        type: "GET",
        url: "https://theek-karo-api.herokuapp.com/api/complain",
        success: function (data) {
            if (data.messege == "Success") {
                LoadAllComplain(data.data, TechData);
            }
        }
    });
}

function LoadAllComplain(Complaindata, Techniciandata) {
    debugger;
    $("#allComplains tr").remove();
    $.each(Complaindata, function (k, v) {
        var html = '<tr>';
        html += '<td>';
        html += '<div class="d-flex px-2 py-1">';
        html += '<div>';
        if (v.complainImage == '' || v.complainImage == null) {
            html += '<img src="assets/img/team-2.jpg" class="avatar avatar-sm me-3" alt="user1">';

        }
        else {
            html += '<img src="https://theek-karo-api.herokuapp.com' + v.complainImage + '" class="avatar avatar-sm me-3" alt="user1">'; // baseUrl + v.complainImage

        }

        html += '</div>';
        html += '<div class="d-flex flex-column justify-content-center">';
        html += '<h6 class="mb-0 text-sm">' + v.user.fullName + '</h6>';
        html += '<p class="text-xs text-secondary mb-0">' + v.user.email + '</p>';
        html += '</div>';
        html += '</div>';
        html += '</td>';
        html += '<td>';
        html += '<p class="text-xs font-weight-bold mb-0">' + v.userAddress + '</p>';
        html += '<p class="text-xs font-weight-bold mb-0">Contact</p>';
        if (v.user.contact == "" || v.user.contact == null) {
            html += '<p class="text-xs text-secondary mb-0"></p>';

        }
        else {
            html += '<p class="text-xs text-secondary mb-0">' + v.user.contact + '</p>';
        }
        html += '</td>';
        html += '<td>';
        html += '<p class="text-xs font-weight-bold mb-0">' + v.complainName + '</p>';
        if (v.complainCategory == "" || v.complainCategory == null) {
            html += '<p class="text-xs text-secondary mb-0"></p>';

        }
        else {
            html += '<p class="text-xs font-weight-bold mb-0">Complain Category</p>';

        }
        html += '<p class="text-xs text-secondary mb-0">' + v.complainCategory + '</p>';
        html += '</td>';
        html += '<td class="align-middle text-center text-sm">';
        html += '<span class="text-xs font-weight-bold mb-0">' + v.complainDescription + '</span>';
        html += '</td>';
        html += '<td class="align-middle text-center text-sm">';
        if (v.complainStatus == true) {
            html += '<span class="badge badge-sm bg-gradient-success">Actice</span>';
        }
        if (v.complainStatus == false) {
            html += '<span class="badge badge-sm bg-gradient-warning">InActive</span>';

        }

        html += '</td>';
        html += '<td id="technician">';
        if (v.assignedTech != '' && v.assignedTech != null) {


            html += '<span class="badge badge-sm bg-gradient-faded-info" id="span-' + k + '">' + v.assignedTech.techName + '</span>';

            html += '<a href="#" id="edit-' + k + '" class="text-secondary font-weight-bold text-xs ml-2 d-inline-block" onclick="displayEdit(\'allTechnicians-' + k + '\',\'span-' + k + '\',\'edit-' + k + '\')">Edit</a>';

            html += '<select id="allTechnicians-' + k + '" class="form-control d-none">';
            $.each(Techniciandata, function (x, y) {
                html += '<option value="' + y.techId + '">' + y.techName + '</option>';
            });
            html += '</select>';
            html += '<td class="align-middle d-none" id="assign-td-' + k + '">';
            html += '<a href="javascript:UpdateComplain(\'' + v.complainId + '\',' + k + ')" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Assign Technician">';
            html += 'Assign';
            html += '</a>';
            html += '</td>';



        }
        else {
            html += '<select id="allTechnicians-' + k + '" class="form-control">';
            $.each(Techniciandata, function (x, y) {
                html += '<option value="' + y.techId + '">' + y.techName + '</option>';
            });
            html += '</select>';
        }
        html += '</td>';
        if (v.assignedTech == '' || v.assignedTech == null) {
            html += '<td class="align-middle">';
            html += '<a href="javascript:UpdateComplain(\'' + v.complainId + '\',' + k + ')" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Assign Technician">';
            html += 'Assign';
            html += '</a>';
            html += '</td>';
        }







        html += '</tr>';
        $("#allComplains").append(html);
    });
}

function UpdateComplain(complainId, count) {
    var id = document.getElementById("allTechnicians-" + count);
    var technicianId = id.options[id.selectedIndex].value;
    complain = complainId;

    let formData = new FormData;
    formData.append('assignedTech', technicianId);

    $.ajax({
        type: "PUT",
        url: "https://theek-karo-api.herokuapp.com/api/complain/" + complain,
        data: formData,
        contentType: false,
        processData: false,
        success: function (data) {
            if (data.messege == "Success") {
                LoadTechnicians();
            }
        }
    });
}

function displayEdit(selectId, spanId, editId) {
    var select = document.getElementById(selectId);
    select.classList.remove("d-none");
    var td = document.getElementById("assign-td-" + selectId.split("-")[1]);
    td.classList.remove("d-none");
    var span = document.getElementById(spanId);
    span.classList.add("d-none");
    var editButton = document.getElementById(editId);
    editButton.classList.add("d-none");
}