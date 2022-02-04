$(document).ready(() => {
    $("#submitBtn").click((e) => {
        e.preventDefault();
        let stat = formValidation();
        let data = $('#contactForm').serialize();
        if (stat) {
            $("#submitBtn").prop('disabled', true);
            $.ajax({
                url: 'https://script.google.com/macros/s/AKfycbwRW4tqr14DmMW7aQ9Z7vRwHupXmItuy1qA3128xii5EEXIfg1ELLn0zG7iJQdyyg0HuQ/exec',
                method: 'POST',
                data: data,
                success: function (response) {
                    if (response.result == "success") {
                        $("#contactForm")[0].reset();
                        $("#form-submit-response").addClass('text-success');
                        $("#form-submit-response").text('Form Submitted Successfully');
                        $("#form-submit-response").show();
                        setTimeout(() => {
                            $("#form-submit-response").removeClass('text-success');
                            $("#form-submit-response").hide();
                            $("#submitBtn").prop('disabled', false);
                        }, 2000);
                    }
                    else {
                        $("#form-submit-response").addClass('text-danger');
                        $("#form-submit-response").text('Form not Submitted');
                        $("#form-submit-response").show();
                        setTimeout(() => {
                            $("#form-submit-response").removeClass('text-danger');
                            $("#form-submit-response").hide();
                            $("#submitBtn").prop('disabled', false);
                        }, 2000);
                    }
                },
                error: function (err) {
                    $("#form-submit-response").addClass('text-danger');
                    $("#form-submit-response").text('Form not Submitted');
                    $("#form-submit-response").show();
                    setTimeout(() => {
                        $("#form-submit-response").removeClass('text-danger');
                        $("#form-submit-response").hide();
                        $("#submitBtn").prop('disabled', false);
                    }, 2000);
                }
            })
        }
        else {

        }
    })

});
const formValidation = (() => {
    let nameFound = nameCheck();
    let numberFound = numberCheck();
    let emailFound = emailCheck();
    let messageFound = messageCheck();
    if (nameFound && numberFound && emailFound && messageFound) {
        return true;
    }
    else {
        return false;
    }
});
const messageCheck = (() => {
    let message = $("#message").val();
    message = message.replace(/  +/g, ' ');
    $("#message").val(message);
    var count = message.replace(/\s+/g, '').length;
    if (message.charCodeAt(0) == 32) {
        $('#messageErr').show();
        $("#messageErr").text("First letter not be a space");
        return false;
    }
    if (count > 12 && count < 250) {
        $('#messageErr').hide();
        return true;
    }
    else if (count < 12) {
        $('#messageErr').show();
        $("#messageErr").text("Minimum 12 characters needed");
        return false;
    }
    else if (count > 250) {
        $('#messageErr').show();
        $("#messageErr").text("Maximum 250 character allowed");
        return false;
    }
})

const emailCheck = (() => {
    let email = $('#email').val();
    filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (email.endsWith(" ")) {
        $("#emailErr").show();
        $("#emailErr").text("Last letter not be a space");
        return false;
    }
    else if (filter.test(email)) {
        $("#emailErr").hide();
        return true;
    }
    else {
        $("#emailErr").show();
        $("#emailErr").text("Enter the valid email address");
        return false;
    }
})
const numberCheck = (() => {
    let number = $("#number").val();
    var isNum = /^[0-9]+$/;
    if (number.match(isNum)) {
        if (number.length < 10) {
            $("#numberErr").show();
            $("#numberErr").text("Minimum 10 numbers needed");
            return false;
        }
        else if (number.length > 10) {
            $("#numberErr").show();
            $("#numberErr").text("Only 10 numbers allowed");
            return false;
        }
        else if (number.length == 10) {
            $("#numberErr").hide();
            return true;
        }
    }
    else {
        $("#numberErr").show();
        $("#numberErr").text("Please enter the number");
        return false;
    }
})
const nameCheck = (() => {
    let name = $("#name-input").val();
    name = name.replace(/  +/g, ' ');
    var reg_exp = /^[A-Za-z0-9 ]+$/;
    var is_valid = reg_exp.test(name);
    $("#name-input").val(name);
    if (name.charCodeAt(0) == 32) {
        $("#nameErr").show();
        $("#nameErr").text("First letter not be a space");
        return false;
    }
    else if (/\s$/.test(name)) {
        $("#nameErr").show();
        $("#nameErr").text("Last letter not be a space");
        return false;
    }
    else if (!is_valid) {
        $("#nameErr").show();
        $("#nameErr").text("Only characters allowed");
        return false;
    }
    else if (name.length >= 4 && name.length <= 12) {
        var hasNumber = /\d/;
        if (hasNumber.test(name)) {
            $("#nameErr").show();
            $("#nameErr").text("Only characters allowed");
            return false;
        }
        else {
            $("#nameErr").hide();
            return true;
        }
    }
    else if (name.length > 12) {
        $("#nameErr").show();
        $("#nameErr").text("Maximum 12 character allowed");
        return false;
    }
    else {
        $("#nameErr").show();
        $("#nameErr").text("Minimum 4 characters needed");
        return false;
    }
})

