function loadBooks() {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "books.json", true);
    xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhttp.send();
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState != 4) return;
      if (xhttp.status != 200) {
        alert(xhttp.status + ": " + xhr.statusText);
      } else {
        let books = JSON.parse(xhttp.responseText);
        insertBooks(books);
      }
    };
  }
  
  function insertBooks(books) {
    let str = `<div class="wrap">`;
    for (let i = 0; i < books.length; i++) {
      str += `<div class="bookWrap">`;
      str += `<div class="image"><img draggable="true" class="product" ondragstart="drag(event)" data-text="${books[i].name}" data-price="${books[i].price}" src="${books[i].imageCover}" /></div>`;
      str += `<h2 class = "name">${books[i].name}</h2>`;
      str += `<div>${books[i].price}</div>`;
      //str += `<button class="add_item" data-id="5">Добавить в корзину</button>`
      str += `</div>`;
    }
  
    str += `</div>`;
    document.getElementById("books").innerHTML = str;
  }


// -->
let button_order = document.getElementById("button_order");
button_order.addEventListener(
  "click",
  createLayer.bind(this, "order", "order")
);
function createLayer(nid, nclass) {
  let newLayer = document.createElement("div");
  newLayer.setAttribute("id", nid);
  newLayer.className = nclass;

  newLayer.innerHTML = "<span id='close'>X</span><h3>My Order</h3>";
  for (const flower in equivalents) {
    newLayer.innerHTML += flower + "<br>";
    for (let i = 0; i < equivalents[flower].length; i++)
      newLayer.innerHTML += equivalents[flower][i] + "<br>";
  }

  document.body.appendChild(newLayer);
}

//-->





var total = 0;
var equivalents = {};

function totalPrice() {
  var sum = 0;
  for (var flower in equivalents) {
    sum += equivalents[flower][0] * equivalents[flower][1];
  }
  return sum;
}

function setSum(iris) {
  var sum = 0;
  for (var flower in equivalents) {
  if (iris == flower)
    sum += equivalents[flower][0] * equivalents[flower][1];
  }
  return sum;
}

function countEquivalents(iris) {
  var c = 0;

  /*  for (var i = 0; i < equivalents.length; i++) {
     if (iris == equivalents[i])
       c++;
   } */
  for (var flower in equivalents) {
    if (iris == flower) {
      c = equivalents[flower][1];
    }
  }
  return c;
}

function setCountValue() {
  var irisesValue = document.querySelectorAll("input[id^='t']");
  var i = 0;
  for (var flower in equivalents) {
    irisesValue[i].value = equivalents[flower][1];
    i++;
  }
  //console.log();
}

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", '<img  src="'+ event.target.src + '"".jpg" class="mini" />' + ',' + event.target.dataset.text + ',' + event.target.dataset.price + ',' + event.target.id);
}

function drop(event) {
  event.preventDefault();
  var drop = document.getElementById('cart');
  var data = event.dataTransfer.getData("text");
  var arr_data = data.split(',');
  var sum = document.getElementById('sum');
  
  if (countEquivalents(arr_data[1]) == 0) {
    drop.innerHTML += arr_data[0] + arr_data[1] + ', $' + arr_data[2];
    var inp = document.createElement('input');
    inp.type = 'number';
    inp.id = 't' + arr_data[3];
    inp.value = '1';
    inp.size = 4;
    drop.appendChild(inp);
    //drop.innerHTML+="<p>Сумма: <span id='sum"+arr_data[0]+"'></span></p>";
    equivalents[arr_data[1]] = [arr_data[2], 1];
    console.log(equivalents);
  } else {
    equivalents[arr_data[1]][1] += 1;
    console.log(equivalents);
    //var valueIris = document.getElementById('t' + arr_data[3]);
    //valueIris.value = equivalents[arr_data[1]][1]; 
  }
  var sumIris = document.getElementById('sum'+arr_data[3]);
  sum.innerHTML = 'Сумма: $' + totalPrice();
  setCountValue();
  // equivalents.push(arr_data[1]);
  total += arr_data[2];
  console.log(equivalents);
  console.log(arr_data[1] + " " + countEquivalents(arr_data[1]));
}
