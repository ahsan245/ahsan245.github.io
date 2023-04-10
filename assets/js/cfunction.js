// Project Base URL
let baseUrl = "https://theek-karo-api.herokuapp.com/";
var complain = "";
$(document).ready(function () {
    console.log('ahsan');

    LoadCategory();
});
function LoadCategory() {
    $.ajax({
        type: "GET",
        url: "https://theek-karo-api.herokuapp.com/api/category",
        success: function (data) {
            if (data.messege == "Success") {
                LoadAllCategory(data.data);
            }
        }
    });
}

function LoadAllCategory(CategoryData) {
    debugger;
    $("#allCategory tr").remove();
    $.each(CategoryData, function (k, v) {
        var html = '<tr>';
        html += '<td>';
        html += '<div class="d-flex px-2 py-1">';
        // html += '<div>';
        // // if (v.categoryImage == '' || v.categoryImage == null) {
        // //     html += '<img src="assets/img/team-2.jpg" class="avatar avatar-sm me-3" alt="user1">';

        // // }
        // // else {
        // //     html += '<img src="https://theek-karo-api.herokuapp.com' + v.categoryImage + '" class="avatar avatar-sm me-3" alt="user1">'; // baseUrl + v.complainImage
        // // }
        // html += '</div>';
        html += '<div class="d-flex flex-column justify-content-center">';
        html += '<h6 class="mb-0 text-sm">' + v.categoryName + '</h6>';
        html += '<p class="text-xs font-weight-bold mb-0">Category Id</p>';

        html += '<p class="text-xs text-secondary mb-0">' + v.categoryId + '</p>';

        html += '</div>';
        html += '</div>';
        html += '</td>';
        html += '<td class="align-middle text-center text-sm">';
        var description = v.categoryDescription;
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



        html += '<td class="align-middle text-center">';
        html += '<ul class="list-unstyled mb-0">';
        $.each(v.categoryCheckList, function (i, val) {
            html += '<li><span class="badge badge-sm bg-gradient-info">' + val + '</span></li>';
        });
        html += '</ul>';
        html += '</td>';
        html += '<td id="technician">';
        if (v.categoryCheckList != '' && v.categoryCheckList != null) {
            html += '<span class="badge badge-sm bg-gradient-faded-info" id="span-' + k + '">' + v.categoryName + '</span>';
            html += '<a href="#" id="edit-' + k + '" class="text-secondary font-weight-bold text-xs ml-2 d-inline-block" onclick="displayEdit(\'allTechnicians-' + k + '\',\'span-' + k + '\',\'edit-' + k + '\')">Add</a>';
            html += '<select id="allTechnicians-' + k + '" class="form-control d-none">';
            $.each(v.completeCheckList, function (i, val) {
                html += '<option value="' + val + '">' + val + '</option>';
            });
            html += '</select>';
            html += '<td class="align-middle d-none" id="assign-td-' + k + '">';
            html += '<a href="javascript:UpdateCategory(\'' + v.categoryId + '\',' + k + ')" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Assign Technician">';

            html += 'Assign';
            html += '</a>';
            html += '</td>';
        } else {
            html += '<select id="allTechnicians-' + k + '" class="form-control">';
            $.each(v.completeCheckList, function (i, val) {
                html += '<option value="' + val + '">' + val + '</option>';
            });
            html += '</select>';
        }



        html += '</td>';
        if (v.categoryCheckList == '' || v.categoryCheckList == null) {
            html += '<td class="align-middle">';
            html += '<a href="javascript:UpdateCategory(\'' + v.categoryId + '\',' + k + ')" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Assign Technician">';

            html += 'Assign';
            html += '</a>';
            html += '</td>';
        }


        html += '<td class="align-middle">';
        html += '<div class="d-flex">';
        html += '<button type="button" class="btn btn-link text-danger text-gradient px-3 mb-0" data-toggle="tooltip" data-original-title="Delete">';
        html += '<i class="far fa-trash-alt"></i>';
        html += '</button>';
        html += '</div>';
        html += '</td>';

        html += '</tr>';

        $("#allCategory").append(html);
    });
}

function UpdateCategory(categoryId, count) {
    var val = document.getElementById("allTechnicians-" + count);
    var catType = val.options[val.selectedIndex].value;
    $.ajax({
        type: "GET",
        url: "https://theek-karo-api.herokuapp.com/api/category/" + categoryId,
        success: function (data) {
            // Extract the current categoryCheckList and add the new category to it
            console.log(data)
            let categoryCheckList = data.data.categoryCheckList;

            debugger;
            categoryCheckList.push(catType);

            // Update the category with the new categoryCheckList
            $.ajax({
                type: "PUT",
                url: "https://theek-karo-api.herokuapp.com/api/category/" + categoryId,
                data: JSON.stringify({ categoryCheckList }),
                contentType: "application/json",
                success: function (data) {
                    console.log("Category updated successfully");
                    // Reload the category data
                    LoadCategory();
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