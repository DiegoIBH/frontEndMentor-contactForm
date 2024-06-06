$(function(){
    //Add and remove styles by :checked attr being true or false.
    $("input[name='exampleRadios']").on("change", function() {
        if ($("#exampleRadios1").is(":checked")) {
          $("#my-border1").addClass("my-border__focus");
          $("#my-border2").removeClass("my-border__focus");
        } else {
          $("#my-border2").addClass("my-border__focus");
          $("#my-border1").removeClass("my-border__focus");
        };
    });
    //The part below is a kaydown event that has user accesability features, in order to use "enter" or "spacing bar" for last checkbox.
    $('#flexCheckDefault, label[for="flexCheckDefault"]').on('keydown', function(event) {
        if (event.keyCode === 13 || event.keyCode === 32) {
            event.preventDefault();
            let checkbox = $('#flexCheckDefault');
            checkbox.prop('checked', !checkbox.prop('checked'));
        };
    });

    //Form control - Prevents user form inputing incorrect data and guides them to a proper submission
    $("#my-form").on("submit", function(event){
        event.preventDefault(); //Prevent the submitting event.
        $(".error").text(""); //Clears possible remaining error texts
        $("input , textarea").removeClass("border-error"); //Clear red border sytles for errors
        $(".my-border").removeClass("my-border__focus");
        
        //Set variables for recovering users data and outputing form control notifications
        let nameValue = $("#name").val();
        let lastNameValue = $("#last-name").val();
        let emailValue = $("#exampleFormControlInput1").val();
        let messageValue = $("#exampleFormControlTextarea1").val();
        var formOutput = $(".output");

        var hasError = false;//set a error variable to false in order to check if there is an error in the form.

        //All conditional below check for user input errors.
        if(nameValue == "" || nameValue == null || nameValue == undefined){
            $("#name").addClass("border-error");
            $("#nameError").html("This field is required");
            hasError = true;
        };

        if(lastNameValue == "" || lastNameValue == null || lastNameValue == undefined){
            $("#last-name").addClass("border-error");
            $("#last-nameError").html("This field is required");
            hasError = true;
        };

        if(emailValue == "" || emailValue == null || emailValue == undefined){
            $("#emailError").html("Please enter an email address");
            $("#exampleFormControlInput1").addClass("border-error");
            hasError = true;
        } else if(emailValue.indexOf("@") == -1){
            $("#emailError").html("Please enter a valid email address");
            $("#exampleFormControlInput1").addClass("border-error");
            hasError = true;
        };

        if(!$("input[name='exampleRadios']").is(":checked")){
            $("#queryError").html("Please select a query type");
            hasError = true;
        };

        if(messageValue == "" || messageValue == null || messageValue == undefined){
            $("#messageError").html("This field is required");
            $("#exampleFormControlTextarea1").addClass("border-error");
            hasError = true;
        };
        if(!$("input[type='checkbox']").is(":checked")){
            $("#check-boxError").html("<br>To submit this form, please consent to being contacted.");
            hasError = true;
        };

        $(".error").css("color", "hsl(0, 66%, 56%)");//give a style to the error messages
        //Conditional for showing one message or other depending on the error status.
        if(!hasError){
            let successMessage = `
                <div class="spam-card">
                    <p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" fill="none" viewBox="0 0 20 21">
                            <path fill="#fff" d="M14.28 7.72a.748.748 0 0 1 0 1.06l-5.25 5.25a.748.748 0 0 1-1.06 0l-2.25-2.25a.75.75 0 1 1 1.06-1.06l1.72 1.72 4.72-4.72a.75.75 0 0 1 1.06 0Zm5.47 2.78A9.75 9.75 0 1 1 10 .75a9.76 9.76 0 0 1 9.75 9.75Zm-1.5 0A8.25 8.25 0 1 0 10 18.75a8.26 8.26 0 0 0 8.25-8.25Z"/>
                        </svg>
                        <b>Message Sent!</b>
                    </p>
                    <p class="mb-0 fw-lighter">Thanks for completing the form. We'll be in touch soon!</p>
                </div>`;
            $(formOutput).html(successMessage);//add the success variable content in formOutput
            $("#my-form")[0].reset();
        }else{
            $(formOutput).html(`
                <div class="spam-card">
                    <p><b>Error in form!</b></p>
                    <p class="mb-0 fw-lighter">
                    Please fill or correct, the below spaces marked in red
                    </p>
                </div>
                `);
            $(".spam-card").css("background-color", "hsl(0, 66%, 56%)");//add the error content in formOutput
        };
    });
});