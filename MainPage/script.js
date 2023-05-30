window.onload = () =>{
  $('.voti').eq(0).hide()
  $('.assenze').eq(0).hide()
  $('.registro').eq(0).hide()

  $('#home').on('click',() =>{
    $('#MainPage').show()
    $('.voti').eq(0).hide()
    $('.assenze').eq(0).hide()
    $('.registro').eq(0).hide()

  })
  $('#voti').on('click', ()=>{
    $('.voti').eq(0).show()
    $('.assenze').eq(0).hide()
    $('.registro').eq(0).hide()
    //richiedo dati dal db
    $('#MainPage').hide()
  })
  $('#votinav').on('click',()=>{
    $('.voti').eq(0).show()
    $('.assenze').eq(0).hide()
    $('.registro').eq(0).hide()

    //richiedo dati dal db
    $('#MainPage').hide()
  })
  $('#assenze').on('click',()=>{
    $('.assenze').eq(0).show()
    $('.voti').eq(0).hide()
    $('.registro').eq(0).hide()

    //richiedo dati dal db
    $('#MainPage').hide()
  })
  $('#assenzenav').on('click',()=>{
    $('.assenze').eq(0).show()
    $('.voti').eq(0).hide()
    $('.registro').eq(0).hide()

    //richiedo dati dal db
    $('#MainPage').hide()
  })
  $('#registro').on('click',()=>{
    $('.registro').eq(0).show()
    $('.assenze').eq(0).hide()
    $('.voti').eq(0).hide()

    $('#MainPage').hide()
  })
  $('#registronav').on('click',()=>{
    $('.registro').eq(0).show()
    $('.assenze').eq(0).hide()
    $('.voti').eq(0).hide()

    $('#MainPage').hide()
  })
}