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
                var filteredData = data.data.filter(function (complain) {
                    return complain.completeUpdate;
                });
                LoadAllComplain(filteredData);
            }
        }
    });

}


function LoadAllComplain(Complaindata) {
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
        if (v.completeUpdate == true) {
            html += '<span class="badge badge-sm bg-gradient-success">Completed</span>';
        }
        if (v.completeUpdate == false) {
            html += '<span class="badge badge-sm bg-gradient-warning">Not Completed</span>';

        }
        html += '<td class="align-middle text-center">';

        html += '<span class="badge badge-sm bg-gradient-info">' + v.techComment + '</span>';

        html += '</td>';
        html += '<td class="align-middle text-center text-sm">';

        if (v.paymentStatus == true) {
            html += '<span class="badge badge-sm bg-gradient-success">Paid</span>';
        }
        if (v.paymentStatus == false) {
            html += '<span class="badge badge-sm bg-gradient-warning">UnPaid</span>';

        }

        html += '</td>';

        html += '</td>';
        html += '</tr>';
        $("#allComplains").append(html);
    });
}



