"use strict"

$(document).ready(function() {
    
    //disable and enable new task input field depending if it is empty or not
    $("#newInputField").on("keyup", function() {
        var userInput = $("#newInputField").val();
        var trimmedInput = $.trim(userInput);
		if (trimmedInput == "") {
			$("#addButton").prop("disabled", true);
		} else {
            $("#addButton").prop("disabled", false);
		}
    });
    
    //when edit button clicked, show modal with current title and time spent
    $(".editButton").on("click", function() {
        var currentRow = $(this).closest("li");
        var id = currentRow.attr("data-id");
        var title = $(".displayTitle", currentRow).text();
        var time = $(".badge", currentRow).text();
        $("#id", "#editModal").val(id);
        $("#editTitleField", "#editModal").val(title);
        $("#editTimeField", "#editModal").val(time);
        $("div.alert").remove(); 
        $("#editModal").modal();
    });
    
    //POST request for adding new task when Add New button clicked
    $("#addButton").on("click", function() {
        var userInput = $("#newInputField").val();
        var trimmedInput = $.trim(userInput);
        var id = $("body").attr("data-id");
        if (trimmedInput != "") {
            $.ajax({
                type: "POST",
                url: "/todolist/" +id,
                data: {title: trimmedInput},
                error : function() {
                    $('html, body').css("cursor", "auto"); 
                },
                success : function(resp) {
                    $('html, body').css("cursor", "auto");
                    if (resp.statusCode == 200) {
                        location.reload();
                    }
                }
            });  
        }
    });
    
    //POST request for updating completion of a task whenever a checkbox is toggled
    $(':checkbox').change(function() {
        var currentRow = $(this).closest("li");
        var id = currentRow.attr("data-id");
        var checked = $(this).prop('checked');
        $.ajax({
            type: "POST",
            url: "/todolist/" +id +"/status",
            data: {checked: checked},
            error : function() {
                $("html, body").css("cursor", "auto"); 
            },
            success : function(resp) {
                $("html, body").css("cursor", "auto");
                if (resp.statusCode == 200) {
                    if (checked) {
                        currentRow.addClass("list-group-item-success");
                        currentRow.removeClass("list-group-item-danger");
                    } else {
                        currentRow.addClass("list-group-item-danger");
                        currentRow.removeClass("list-group-item-success");
                    }
                }
            }
        });
    }); 
    
    //POST request for submitting edit modal
    $("#saveButton").on("click", function(e) {
        e.preventDefault();
        $("div.alert").remove(); 
        var titleInput = $("#editTitleField").val();
        var trimmedTitleInput = $.trim(titleInput);
        if (trimmedTitleInput == null || trimmedTitleInput == "") {
            modalErrorAlert("div.alert", $(".error-panel", "#editForm"), "Please enter a title for the task."); 
            return false;
        }
        var timeInput = $("#editTimeField").val();
        var trimmedTimeInput = $.trim(timeInput);
        var timeInt = Math.floor(Number(trimmedTimeInput));
        if(String(timeInt) !== trimmedTimeInput || timeInt < 0 || timeInt > 2147483647) {
            modalErrorAlert("div.alert", $(".error-panel", "#editForm"), "Please enter a valid number between 0 and 2147483647 without commas."); 
            $("#editTimeField").val("");
            return false;
        }
        var id = $("#id", "#editModal").val();
        if(Math.floor(id) == id && $.isNumeric(id) && id >= 0) {
            $.ajax({
                type: "POST",
                url: "/todolist/" + id + "/update",
                data: {title: trimmedTitleInput,
                      time: timeInt},
                error : function() {
                    $('html, body').css("cursor", "auto"); 
                },
                success : function(resp) {
                    $('html, body').css("cursor", "auto");
                    if (resp.statusCode == 200) {
                        location.reload();
                    } else {
                        modalErrorAlert("div.alert", $(".error-panel", "#editForm"), resp.message); 
                    }
                }
            });  
            return false;
        }
    });
    
    //DELETE request when delete (trash) button clicked 
    $(".deleteButton").on("click", function() {
        var currentRow = $(this).closest("li");
        var id = currentRow.attr("data-id");
        if(Math.floor(id) == id && $.isNumeric(id) && id >= 0) {
            $.ajax({
                type: "DELETE",
                url: "/todolist/" +id,
                error : function() {
                    $('html, body').css("cursor", "auto"); 
                },
                success : function(resp) {
                    $('html, body').css("cursor", "auto");
                    if (resp.statusCode == 200) {
                        currentRow.remove();
                    }
                }
            });  
        } else {
            return false;
        }
    });
    
    //handles the error message inside edit modal
    function modalErrorAlert(alertDiv, panel, message) {
        $(alertDiv).remove();
        var closeButton = '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' + '<span>' + '&times;' + '</span></button>';
	    $(panel).append(
			'<div class="alert alert-danger alert-dismissible" role="alert">' + 
			closeButton + '<strong>There was an error processing your request.</strong> <br>'+ message + '</div>'
	    );
    }
});
