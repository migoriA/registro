window.onload = () =>{
  $('.voti').eq(0).hide()
  $('#home').on('click',() =>{
    $('#MainPage').show()
    $('.voti').eq(0).hide()
  })
  $('#voti').on('click', ()=>{
    $('.voti').eq(0).show()
    //richiedo dati dal db
    $('#MainPage').hide()
  })
}