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
                LoadCategories(data.data);
            }
        }
    });
}

function LoadCategories(TechData) {
    $.ajax({
        type: "GET",
        url: "https://theek-karo-api.herokuapp.com/api/category",
        success: function (data) {
            if (data.messege == "Success") {
                LoadComplains(TechData, data.data);
            }
        }
    });
}

function LoadComplains(TechData, CategoryData) {
    $.ajax({
        type: "GET",
        url: "https://theek-karo-api.herokuapp.com/api/complain",
        success: function (data) {
            if (data.messege == "Success") {
                LoadAllComplain(data.data, TechData, CategoryData);
            }
        }
    });
}


function LoadAllComplain(Complaindata, Techniciandata, CategoryData) {
    debugger;
    $("#allComplains tr").remove();
    $.each(Complaindata, function (k, v) {
        var html = '<tr>';
        html += '<td>';
        html += '<div class="d-flex px-2 py-1">';
        // html += '<div>';
        // if (v.complainImage == '' || v.complainImage == null) {
        //     html += '<img src="assets/img/team-2.jpg" class="avatar avatar-sm me-3" alt="user1">';

        // }
        // else {
        //     html += '<img src="https://theek-karo-api.herokuapp.com' + v.complainImage + '" class="avatar avatar-sm me-3" alt="user1">'; // baseUrl + v.complainImage

        // }

        // html += '</div>';
        html += '<div class="d-flex flex-column justify-content-center">';
        html += '<h6 class="mb-0 text-sm">' + v.user.fullName + '</h6>';
        html += '<p class="text-xs text-secondary mb-0">' + v.user.email + '</p>';
        html += '</div>';
        html += '</div>';
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
        var description = v.complainDescription;
        if (description.length > 10) {
            var words = description.split(' ');
            var truncatedDescription = '';
            for (var i = 0; i < words.length; i++) {
                truncatedDescription += words[i] + ' ';
                if (i % 9 == 4) {
                    truncatedDescription += '<br/>';
                }
            }
            html += '<span class="text-xs font-weight-bold mb-0" style="white-space: pre-line;">' + truncatedDescription + '</span>';
        } else {
            html += '<span class="text-xs font-weight-bold mb-0" style="white-space: pre-line;">' + description + '</span>';
        }
        html += '</td>';
        html += '<td class="align-middle text-center text-sm">';
        if (v.complainStatus == true) {
            html += '<span class="badge badge-sm bg-gradient-success">Actice</span>';
        }
        if (v.complainStatus == false) {
            html += '<span class="badge badge-sm bg-gradient-warning">InActive</span>';

        }

        html += '</td>';

        html += '<td class="align-middle text-center">';
        html += '<ul class="list-unstyled mb-0">';
        if (v.complainCheckList.length > 0) {
            $.each(v.complainCheckList, function (i, val) {
                html += '<li><span class="badge badge-sm bg-gradient-info">' + val + '</span></li>';
            });
        } else {
            html += '<li><span class="badge badge-sm bg-gradient-info">' + v.complainCategory + '</span></li>';
        }
        html += '</ul>';
        html += '</td>';



        html += '<td id="technician">';
        if (v.complainCategory != '' && v.complainCategory != null) {


            html += '<span class="badge badge-sm bg-gradient-faded-info" id="span-' + k + '">' + v.complainCategory + '</span>';

            html += '<a href="#" id="edit-' + k + '" class="text-secondary font-weight-bold text-xs ml-2 d-inline-block" onclick="displayEdit(\'allTechnicians-' + k + '\',\'span-' + k + '\',\'edit-' + k + '\')">Add Now</a>';

            html += '<select id="allTechnicians-' + k + '" class="form-control d-none">';
            $.each(CategoryData, function (x, y) {
                $.each(y.completeCheckList, function (i, val) {
                    html += '<option value="' + val + '">' + val + '</option>';
                });
            });
            html += '</select>';
            html += '<td class="align-middle d-none" id="assign-td-' + k + '">';
            html += '<a href="javascript:UpdateComplain(\'' + v.complainId + '\',' + k + ')" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Assign Technician">';
            html += 'Add';
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










        html += '</tr>';
        $("#allComplains").append(html);
    });
}

function UpdateComplain(complainId, count) {
    var val = document.getElementById("allTechnicians-" + count);
    var catType = val.options[val.selectedIndex].value;
    complain = complainId;

    $.ajax({
        type: "GET",
        url: "https://theek-karo-api.herokuapp.com/api/complain/" + complain,
        success: function (data) {
            // Extract the current categoryCheckList and add the new category to it
            console.log(data)
            let complainCheckList = data.data.complainCheckList;

            debugger;
            complainCheckList.push(catType);

            $.ajax({
                type: "PUT",
                url: "https://theek-karo-api.herokuapp.com/api/complain/" + complain,
                data: JSON.stringify({ complainCheckList }),
                contentType: "application/json",
                processData: false,
                success: function (data) {
                    console.log("Category updated successfully");
                    // Reload the category data
                    LoadTechnicians();
                },
                error: function (err) {
                    console.error("Error updating category", err);
                },
            });
        },
        error: function (err) {
            console.error("Error getting category data", err);
        },
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