var reloadData = 10; // dalam detik
var timer;


tes = document.querySelector('#tes');
cari = document.querySelector('#cari');
icon = document.querySelector('#icon');
passing = document.querySelector('#passing')
ambildata = () => {
  tes = document.querySelector('#tes')
}
function updateDataAPI() {

  $.ajax({
    url: 'https://indodax.com/api/summaries',
    success: function(data) {
      var row;
      $('#coins').html(`<tr>
                          <th>Pairs</th>
                          <th>Harga</th> 
                          <th>Beli</th> 
                          <th>jual</th> 
                          <th>Tertinggi 24h</th>
                          <th>Terendah 24h</th>
                        </tr>`)
      for (var key in data.tickers) {
        if(key.includes(tes.value)){
        row = `<tr id=${key} onclick='exfun(id)' style="cursor: pointer;">
              <td style="color: blue;">${key.toUpperCase()}</td>
              <td> ${data.tickers[key].last} </td>
              <td> ${data.tickers[key].buy} </td>
              <td> ${data.tickers[key].sell} </td>
              <td> ${data.tickers[key].high} </td>
              <td> ${data.tickers[key].low} </td>
            </tr>`
        $('#coins tr:last').after(row);
      }
    }
      generate2()
      masukkanGambar2()
      clearTimeout(timer)
      $('#timer').html(reloadData)
      setTimeout(updateDataAPI, reloadData * 1000)
      updateTimer()
    },
    error: function(err) {
      alert("Tidak bisa mengambil data API")
    }
  })
}
function findAPI(){
  $.ajax({
    url: 'https://indodax.com/api/summaries',
    success: function(data) {
      var row;
      $('#coins').html(`<tr>
                          <th>Pairs</th>
                          <th>Harga</th> 
                          <th>Beli</th> 
                          <th>jual</th> 
                          <th>Tertinggi 24h</th>
                          <th>Terendah 24h</th>
                        </tr>`)
      for (var key in data.tickers) {
        if(key.includes(tes.value)){
        row = `<tr id=${key} onclick='exfun(id)' style="cursor: pointer;">
              <td style="color: blue;"> ${key.toUpperCase()}</td>
              <td> ${data.tickers[key].last} </td>
              <td> ${data.tickers[key].buy} </td>
              <td> ${data.tickers[key].sell} </td>
              <td> ${data.tickers[key].high} </td>
              <td> ${data.tickers[key].low} </td>
            </tr>`
        $('#coins tr:last').after(row);
      }
    }
    },
    error: function(err) {
      alert("Tidak bisa mengambil data API")
    }
  })
}
  
function updateTimer() {
  a = parseInt($('#timer').html())
  $('#timer').html(a - 1)
  if (a > 0)
    timer = setTimeout(updateTimer, 1000)
}
var relasi;

function generate2(){
  $.ajax({
    url: 'https://indodax.com/api/summaries',
    success: function(data) {
      var c = 0;
      var d = 0;
      $("#passing").html(`
                    <tr>
                    <th>Tukar</th>
                    <th>Harga</th>
                    <th>Beli</th>
                    </tr>
      `)
      for (var key in data.tickers) {
        if(globalklik==key){
          relasi = key
          d = data.tickers[key].buy;
          row = `<tr>
              <td style="color: blue;"> ${key.toUpperCase()}</td>
              <td> ${data.tickers[key].last} </td>
              <td> ${data.tickers[key].buy} </td>
            </tr>`
        $('#passing tr:last').after(row);
        }
      }
      
    },
    error: function(err) {
      alert("Tidak bisa mengambil data API")
    }
  })
}

function masukkanGambar2(){
  console.log("masuk")
  $.ajax({
    url : "https://indodax.com/api/pairs",
    success : function(data){
      console.log(data[0].url_logo_png)
      for(var keyGambar = 0; keyGambar< data.length; keyGambar++){
        if(relasi==data[keyGambar].ticker_id)
        icon.src = data[keyGambar].url_logo_png
      }
    },
    error : function(err){
        alert("data gambar gagal di ambil")
    }
  })
}

icon.src = "https://indodax.com/v2/logo/png/color/oneinch.png"

updateDataAPI()

var globalklik;
function exfun(a) {
  console.log("bro")
  globalklik = a
  generate2()
  masukkanGambar2()
}
$("#tes").on("change keyup paste", function(){
  findAPI()
})
$("#beli").on('click',function(){
  exfun(10)
})
cari.addEventListener('click',findAPI)
