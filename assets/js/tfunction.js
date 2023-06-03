$(document).ready(function () {
    LoadTechnicians();

    $("#addNewTechnicianBtn").click(function () {
        // Clear existing input fields
        $("#technicianName").val("");
        $("#categoryIdInput").val("");
        $("#techSalePrice").val("");
        $("#techPrice").val("");
        $("#techShortDescription").val("");
        $("#techStatus").val("");

        // Show the modal or form to add a new technician
        $("#addTechnicianModal").modal("show");
    });

    $("#addTechnicianBtn").click(function () {
        // Get the input field values
        var technicianName = $("#technicianName").val();
        var category = $("#categoryIdInput").val();
        var techSalePrice = $("#techSalePrice").val();
        var techPrice = $("#techPrice").val();
        var techShortDescription = $("#techShortDescription").val();
        var techStatus = $("#techStatus").val();

        // Create a new technician object
        var newTechnician = {
            techName: technicianName,
            category: category,
            techSalePrice: techSalePrice,
            techPrice: techPrice,
            techShortDescription: techShortDescription,
            techStatus: techStatus
        };

        // Send the fetch request to add a new technician
        fetch("https://theek-karo-api.herokuapp.com/api/tech", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTechnician)
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response
                if (data.message === "Success") {
                    // Reload the technicians list
                    LoadTechnicians();

                    // Hide the modal or form
                    $("#addTechnicianModal").modal("hide");
                } else {
                    // Handle the error
                    console.log("Error: " + data.message);
                }
            })
            .catch(error => {
                // Handle the error
                console.log("Error: " + error);
            });
    });

    function LoadTechnicians() {
        fetch("https://theek-karo-api.herokuapp.com/api/tech")
            .then(response => response.json())
            .then(techData => {
                debugger;
                if (techData.message === "Success") {
                    console.log("Tech data message: Success");
                    fetch("https://theek-karo-api.herokuapp.com/api/findtech")
                        .then(response => response.json())
                        .then(findTechData => {
                            console.log("Find tech data:", findTechData);
                            if (findTechData.messege === "Success") { // Fix typo here
                                console.log("Find tech data message: Success");
                                LoadAllTech(techData.data, findTechData.data);
                            }
                        })
                        .catch(error => {
                            // Handle the error
                            console.log("Error: " + error);
                        });
                }


            })
            .catch(error => {
                // Handle the error
                console.log("Error: " + error);
            });
    }


    function LoadAllTech(techData, findTechData) {
        console.log("Inside LoadAllTech function");
        console.log(findTechData);

        const registeredTechIds = findTechData.reduce((ids, item) => {
            if (item.techID && item.techID.techId) {
                ids.push(item.techID.techId);
            }
            return ids;
        }, []);

        // ...

        $.each(techData, function (k, v) {
            // ...

            if (registeredTechIds.includes(v.techId)) {
                console.log("ID");

            } else {
                console.log("no ID");

            }

            // ...
        });


        $("#allComplains tr").remove();
        $.each(techData, function (k, v) {
            var html = '<tr>';
            html += '<td>';
            html += '<div class="d-flex px-2 py-1">';
            html += '<div>';
            if (v.techImage === "" || v.techImage === null) {
                html += '<img src="assets/img/team-2.jpg" class="avatar avatar-sm me-3" alt="user1">';
            } else {
                html += '<img src="https://theek-karo-api.herokuapp.com' + v.techImage + '" class="avatar avatar-sm me-3" alt="user1">';
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
            if (v.techStatus === "" || v.techStatus === null) {
                html += '<span class="badge badge-sm bg-gradient-warning">InActive</span>';
            } else if (v.techStatus === false) {
                html += '<span class="badge badge-sm bg-gradient-success">InActive</span>';
            } else if (v.techStatus === true) {
                html += '<span class="badge badge-sm bg-gradient-success">Active</span>';
            }
            html += '</td>';
            html += '<td>';
            if (registeredTechIds.includes(v.techId)) {
                html += '<h6 class="mb-0"></h6>';
            } else {
                html += '<a href="#" class="btn btn-primary btn-sm add-tech-login" data-techid="' + v.techId + '">Register</a>';
            }

            html += '</td>';
            html += '</tr>';
            $("#allComplains").append(html);
        });

        $(".add-tech-login").click(function () {

            var techId = $(this).data("techid");
            $("#registerTechId").val(techId);
            debugger;

            $("#registerTechnicianModal").modal("show");

            $("#registerTechnicianBtn").click(function () {

                var email = $("#registerEmail").val();
                var password = $("#registerPassword").val();

                // Perform email and password validation using regex patterns
                var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

                if (!emailRegex.test(email)) {
                    alert("Please enter a valid email address.");
                    return;
                }

                if (!passwordRegex.test(password)) {
                    alert("Please enter a valid password. It must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number.");
                    return;
                }

                // Send the fetch request to register a technician
                fetch("https://theek-karo-api.herokuapp.com/api/registerTech", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ techID: techId, email: email, password: password })
                })
                    .then(response => response.json())
                    .then(data => {
                        // Handle the response
                        if (data.message === "Success") {
                            // Reload the technicians list
                            LoadTechnicians();
                            $("#registerTechnicianModal").modal("hide");

                        } else {
                            // Handle the error
                            console.log("Error: " + data.message);
                        }
                    })
                    .catch(error => {
                        // Handle the error
                        console.log("Error: " + error);
                    });
            });
        });

    }
});
