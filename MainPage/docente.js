window.onload = () => {
    $('.voti').eq(0).hide()
    $('.assenze').eq(0).hide()
    $('.elenco').eq(0).hide()

    $('#home').on('click', () => {
        $('#MainPage').show()
        $('.voti').eq(0).hide()
        $('.assenze').eq(0).hide()
        $('.elenco').eq(0).hide()

    })
    $('#voti').on('click', () => {
        $('.voti').eq(0).show()
        $('.assenze').eq(0).hide()
        $('.elenco').eq(0).hide()
        //richiedo dati dal db
        $('#MainPage').hide()
    })
    $('#votinav').on('click', () => {
        $('.voti').eq(0).show()
        $('.assenze').eq(0).hide()
        $('.elenco').eq(0).hide()

        //richiedo dati dal db
        $('#MainPage').hide()
    })
    $('#assenze').on('click', () => {
        $('.assenze').eq(0).show()
        $('.voti').eq(0).hide()
        $('.elenco').eq(0).hide()

        //richiedo dati dal db
        $('#MainPage').hide()
    })
    $('#assenzenav').on('click', () => {
        $('.assenze').eq(0).show()
        $('.voti').eq(0).hide()
        $('.elenco').eq(0).hide()

        //richiedo dati dal db
        $('#MainPage').hide()
    })
    $('#elenco').on('click', () => {
        $('.elenco').eq(0).show()
        $('.assenze').eq(0).hide()
        $('.voti').eq(0).hide()

        $('#MainPage').hide()
    })
    $('#registronav').on('click', () => {
        $('.elenco').eq(0).show()
        $('.assenze').eq(0).hide()
        $('.voti').eq(0).hide()

        $('#MainPage').hide()
    })

    inviaRichiesta("GET", "../Php/getUser.php").catch(errore).then(function (user_data) {
        user_data = user_data["data"]
        console.log(user_data)

        $("#benvenuto").text("Benvenuto, " + user_data["nome"].toUpperCase() + " " + user_data["cognome"].toUpperCase())
        $("#LogOut").on("click", LogOut)

        getClassi(user_data)
        getStudenti("1A INF")

        $("#btnInserisci").on("click", inserisciVoto)
    })

    function getMaterie(classe) {
        $("#materie").empty()
        inviaRichiesta("GET", "../Php/getMaterieByClass.php", { classe }).catch(errore).then(function (materie) {
            let id_materie = JSON.parse(materie["data"]["materie"]) // prendo tutti i codici delle materie
            for (let id of id_materie) {
                inviaRichiesta("GET", "../Php/getMateriaById.php", { id }).catch(errore).then(function (materie) {
                    $("<li>").addClass("dropdown-item").appendTo($("#materie")).text(materie["data"]["materia"]).val(id).on("click", function () {
                        $("#btnMateria").text($(this).text()).val(id)
                    })
                })
            }
        })
    }

    function inserisciVoto(current_studente, voto) {
        if (voto > 1 && voto <= 10) {
            inviaRichiesta("POST", "../Php/inserisciVoto.php", { "matricola": current_studente, "materia": $("#btnMateria").val(), voto }).catch(errore).then(function () {
                Swal.fire({
                    "title": "Voto inserito correttamente!",
                    "icon": "success",
                    "timer": 1000,
                    "showCancelButton": false
                })
                getVoti(current_studente)
            })
        } else {
            Swal.fire({
                "title": "Inserisci un voto valido!",
                "icon": "error"
            })
        }
    }

    async function getVoti(matricolaStudente, container) {
        let idMateria = $("#btnMateria").val()
        console.log(idMateria)
        inviaRichiesta("GET", "../Php/getVotiByMatricolaAndMateria.php", { "user": matricolaStudente, idMateria }).catch(errore).then(function (voti) {
            voti = voti["data"]
            for (let voto of voti) {
                $("<button>").prop("disabled", true).addClass(parseFloat(voto["voto"]) >= 6 ? "btn btn-success" : "btn btn-danger").appendTo(container).text(voto["voto"])
            }
        })
    }

    function getClassi() {
        inviaRichiesta("GET", "../Php/getAllClasses.php").catch(errore).then(function (classi) {
            for (let classe of classi["data"]) {
                $("<li>").addClass("dropdown-item").appendTo($("#classe")).text(classe["nome"]).on("click", function () {
                    $("#btnClasse").text($(this).text())
                    getStudenti($(this).text())
                    getMaterie($(this).text())
                    $("#btnMateria").prop("disabled", false)
                })
            }
        })
    }

    function getStudenti(classe) {
        let selectStudenti = $("#elencoStudenti")
        inviaRichiesta("GET", "../Php/getStudentiByClasse.php", { "class": classe }).catch(errore).then(function (studenti) {
            studenti = studenti["data"]

            selectStudenti.empty()
            if (studenti.length == 0) {
                selectStudenti.text("Non ci sono studenti nella classe " + classe)
            } else {
                selectStudenti.prop("disabled", false)
                for (let studente of studenti) {
                    let tr = $("<tr>").appendTo($("#elencoStudenti"))
                    $("<td>").appendTo(tr).text(studente["nome"])
                    $("<td>").appendTo(tr).text(studente["cognome"])

                    let votiContainer = $("<div>").appendTo(tr).empty()
                    
                    $("<td>").appendTo(tr).append($("<button>").addClass("btn btn-light").text("+").on("click", function () {
                        Swal.fire({
                            "title": "Inserisci voto",
                            "html": `<div>
                                <input class="form-control" id="voto" min=1 max=10 required>
                            </div>`
                        }).then(async function (value) {
                            if (value["isConfirmed"]) {
                                inserisciVoto(studente["matricola"], $("#voto").val())
                                await getVoti(studente["matricola"], votiContainer.empty())
                            }
                        })
                    }))
                    getVoti(studente["matricola"], votiContainer)
                }
            }
        })
    }
}