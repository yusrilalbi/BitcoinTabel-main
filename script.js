var reloadData = 10; // dalam detik
var timer;

beli = document.querySelector('#beli');
tes = document.querySelector('#tes');
cari = document.querySelector('#cari');
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
        row = `<tr>
              <td><a href="https://yusrilalbi.github.io/BitcoinAPI/"> ${key.toUpperCase()}</a></td>
              <td> ${data.tickers[key].last} </td>
              <td> ${data.tickers[key].buy} </td>
              <td> ${data.tickers[key].sell} </td>
              <td> ${data.tickers[key].high} </td>
              <td> ${data.tickers[key].low} </td>
            </tr>`
        $('#coins tr:last').after(row);
      }
    }
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
        row = `<tr>
              <td><a href="https://yusrilalbi.github.io/BitcoinAPI/"> ${key.toUpperCase()}</a></td>
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
function buy() {

  $.ajax({
    url: 'https://indodax.com/api/summaries',
    success: function(data) {
      var c = 0;
      var d = 0;
      for (var key in data.tickers) {
        if(tes.value==key){
          c = 1;
          d = data.tickers[key].buy;
        }
      }
      if(c==1){
        alert(`Selamat terbeli dengan harga ${d}`)
      } 
      else{
        alert(`Gagal`)
      }
    },
    error: function(err) {
      alert("Tidak bisa mengambil data API")
    }
  })
}
updateDataAPI()

exfun = () => {
  alert(tes.value)
}
$("#tes").on("change keyup paste", function(){
  findAPI()
})
cari.addEventListener('click',findAPI)

beli.addEventListener('click',buy)
