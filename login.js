window.onload = function () {
    let txtUser = $("#txtUser")
    let txtPassword = $("#txtPassword")

    $('#send').on('click', () => {
        checkLogin()
    })

    $(document).on('keydown', function (event) {
        if (event.keyCode == 13) // ENTER key
            checkLogin()
    })

    function checkLogin() {
        if (txtUser.val().trim().length < 4) {
            Swal.fire({
                "title": "Inserisci username valido!",
                "icon": "error",
                "showConfirmButton": false,
                "timer": 1000
            })
        }
        else if (txtPassword.val().trim().length < 7) {
            Swal.fire({
                "title": "Password troppo corta!",
                "icon": "error",
                "showConfirmButton": false,
                "timer": 1000
            })
        }
        else {
            let user = txtUser.val()
            let pass = CryptoJS.MD5(txtPassword.val()).toString()

            inviaRichiesta("POST", "Php/login.php", { user, pass }).catch(function (err) {
                if (err["response"] && err["response"]["status"] == 401) { // unauthorized
                    Swal.fire({
                        "title": err["response"]["data"],
                        "icon": "error",
                        "showConfirmButton": false,
                        "timer": 1200
                    })
                    window.location.href = "logIn.html"
                }
                else
                    errore(err)
            }).then(function () {
                inviaRichiesta("GET", "Php/getUser.php").catch(errore).then(function (response) { // prende utente dalla sessione
                    console.log(response)
                    if (response["data"]["docente"] == 0)
                        window.location.href = "mainPage/studente.html"
                    else window.location.href = "mainPage/docente.html"
                })
            })
        }
    }
}