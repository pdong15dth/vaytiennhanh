/*==============================================================*/
// Evolta Contact Form  JS
/*==============================================================*/
(function ($) {
    "use strict"; // Start of use strict
    $("#contactForm").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            formError();
            submitMSG(false, "Bạn phải điền đầy đủ thông tin?");
        } else {
            // everything looks good!
            event.preventDefault();
            submitForm();
        }
    });


    function submitForm() {
        // Initiate Variables With Form Content
        var fullname = $("#fullname").val();
        var cmnd = $("#cmnd").val();
        var phone = $("#phone").val();
        var address = $("#address").val();

        console.log("fullname=" + fullname + "&cmnd=" + cmnd + "&phone=" + phone + "&address=" + address)
        $.ajax({
            type: "POST",
            url: "/api/tuyendung",
            data: "fullname=" + fullname + "&cmnd=" + cmnd + "&phone=" + phone + "&address=" + address,
            success: function (text) {
                console.log("success: ", text)
                if (text == "success") {
                    formSuccess();
                } else {
                    formError();
                    submitMSG(false, text);
                }
            }
        });
    }

    function formSuccess() {
        $("#contactForm")[0].reset();
        submitMSG(true, "Ứng tuyển thành công!")
    }

    function formError() {
        $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass();
        });
    }

    function submitMSG(valid, msg) {
        console.log("submitMSG:", valid, msg.id)
        if (msg.id != null) {
            var msgClasses = "h4 text-center tada animated text-success";
        } else {
            var msgClasses = "h4 text-center text-danger";
        }
        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg.id != null ? "Ứng tuyển thành công! Chúng tôi sẽ liên hệ lại với bạn" : msg);
    }
}(jQuery)); // End of use strict