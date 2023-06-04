window.onload = () => {
  let listaVoti = $("#listaVoti")
  let listaAssenze = $("#listaAssenze")
  let listaMaterie = $("#listaMaterie")

  $('.voti').eq(0).hide()
  $('.assenze').eq(0).hide()
  $('.registro').eq(0).hide()

  $('#home').on('click', () => {
    $('#MainPage').show()
    $('.voti').eq(0).hide()
    $('.assenze').eq(0).hide()
    $('.registro').eq(0).hide()

  })
  $('#voti').on('click', () => {
    $('.voti').eq(0).show()
    $('.assenze').eq(0).hide()
    $('.registro').eq(0).hide()
    //richiedo dati dal db
    $('#MainPage').hide()
  })
  $('#votinav').on('click', () => {
    $('.voti').eq(0).show()
    $('.assenze').eq(0).hide()
    $('.registro').eq(0).hide()

    //richiedo dati dal db
    $('#MainPage').hide()
  })
  $('#assenze').on('click', () => {
    $('.assenze').eq(0).show()
    $('.voti').eq(0).hide()
    $('.registro').eq(0).hide()

    //richiedo dati dal db
    $('#MainPage').hide()
  })
  $('#assenzenav').on('click', () => {
    $('.assenze').eq(0).show()
    $('.voti').eq(0).hide()
    $('.registro').eq(0).hide()

    //richiedo dati dal db
    $('#MainPage').hide()
  })
  $('#registro').on('click', () => {
    $('.registro').eq(0).show()
    $('.assenze').eq(0).hide()
    $('.voti').eq(0).hide()

    $('#MainPage').hide()
  })
  $('#registronav').on('click', () => {
    $('.registro').eq(0).show()
    $('.assenze').eq(0).hide()
    $('.voti').eq(0).hide()

    $('#MainPage').hide()
  })

  inviaRichiesta("GET", "../Php/getUser.php").catch(errore).then(function (user_data) {
    user_data = user_data["data"]
    console.log(user_data)

    getMaterie(user_data)
    getVoti(user_data)
    getAssenze(user_data)
    //getArgomenti(user_data)
  })

  function getMaterie(user_data) {
    inviaRichiesta("GET", "../Php/getMaterieByClass.php", { "classe": user_data["classe"] }).catch(errore).then(function (materie) {
      let id_materie = JSON.parse(materie["data"]["materie"]) // prendo tutti i codici delle materie
      console.log(id_materie)

      for (let id of id_materie) {
        inviaRichiesta("GET", "../Php/getMateriaById.php", { id }).catch(errore).then(function (materie) {
          let nome_materia = materie["data"]["materia"]
          $("<a>").addClass("dropdown-item").appendTo(listaMaterie).text(nome_materia).on("click", function () {
            $("#btnMateria").text(nome_materia)
            getVoti(user_data, id, nome_materia)
          })
        })
      }
    })
  }

  function getVoti(user_data, id_materia = 0, nome_materia = "") {
    // Carica tasto "Seleziona i voti di tutte le materie"
    let tutteMaterie = $("<a>").appendTo(listaMaterie).addClass("dropdown-item getAll").text("Tutte").on("click", function () {
      getVoti(user_data, 0)
    })
    listaMaterie.append(tutteMaterie)
    // Carica tabella
    listaVoti.html("")
    // Richiesta per prendere dati
    if (id_materia == 0) { // ID=0 quando bisogna selezionarle tutte
      inviaRichiesta("GET", "../Php/getVoti.php", { "user": user_data["matricola"] }).catch(errore).then(function (voti) {
        console.log(voti["data"])
        for (let voto of voti["data"]) {
          let tr = $("<tr>").appendTo(listaVoti)
          inviaRichiesta("GET", "../Php/getMateriaById.php", { "id": voto["materia"] }).catch(errore).then(function (materia) {
            $("<td>").appendTo(tr).text(materia["data"]["materia"])
            $("<td>").appendTo(tr).text(voto["data"])
            $("<td>").appendTo(tr).text(voto["voto"])
          })
        }
      }
      )
    } else {
      inviaRichiesta("GET", "../Php/getVotiByMateria.php", { "id": id_materia }).catch(errore).then(function (voti) {
        for (let voto of voti["data"]) {
          let tr = $("<tr>").appendTo(listaVoti)
          $("<td>").appendTo(tr).text(nome_materia)
          $("<td>").appendTo(tr).text(voto["data"])
          $("<td>").appendTo(tr).text(voto["voto"])
        }
      })
    }
  }

  function getAssenze(user_data) {
    listaAssenze.html("")
    // Richiesta per prendere dati
    inviaRichiesta("GET", "../Php/getAssenze.php", { "user": user_data["matricola"] }).catch(errore).then(function (assenze) {
      assenze = assenze["data"]
      console.log(assenze)
      for (let assenza of assenze) {
        let tr = $("<tr>").appendTo(listaAssenze)
        $("<td>").appendTo(tr).text(assenza["data"])
        $("<td>").appendTo(tr).text(assenza["motivazione"])
        $("<td>").appendTo(tr).append($("<button>").addClass(assenza["giustificato"] == "1" ? "btn btn-success" : "btn btn-danger").prop("disabled", assenza["giustificato"] == "1" ? true : false).text("Giustifica").on("click", function () {
          Swal.fire({
            "title": "Giustifica assenze",
            "showCancelButton": true,
            "html": `
            <div>
              <input class="form-control" placeholder="Salute" id="motivazione">
            </div>`
          }).then(function (value) {
            if (value["isConfirmed"]) { // Quando schiaccia sull'OK della sweetAlert
              let motivazione = $("#motivazione").val()
              if (motivazione.trim() == "")
                motivazione = "Salute" // Di default metti come motivazione salute
              // Giustifica password
              inviaRichiesta("POST", "../Php/giustificaAssenza.php", { "id": assenza["id"], motivazione }).catch(errore).then(function () {
                Swal.fire({
                  "title": "Assenza giustificata correttamente!",
                  "icon": "success",
                  "timer": 1000
                })
                listaAssenze.empty()
                getAssenze(user_data)
              })
            }
          })
        }))
      }
    })
  }

}