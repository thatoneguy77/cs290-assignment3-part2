window.onload = function(){
  var id = [];
  var g = 0;
  var h;
  for(var key in localStorage){
    h = key.split(" ");
    id[g] = parseInt(h[0], 10);
    g++;
  }
  var body = document.getElementsByTagName("body")[0];
  var list = document.getElementById("favorite-list");
  for(var i = 0; i < (localStorage.length); i++){
    var a = document.createElement("a");
    var listItem = document.createElement("li");
    var bttn = document.createElement("BUTTON");
    var bttnText = document.createTextNode("Un-Favorite");
    bttn.appendChild(bttnText);
    bttn.setAttribute("onclick", "unFavorite(this.id);");
    bttn.setAttribute("id", id[i] + " favoriteNum");
    a.textContent = localStorage.getItem(id[i] + " description") + '  ';
    a.setAttribute('href', localStorage.getItem(id[i] + " htmlUrl"));
    listItem.appendChild(a);
    listItem.appendChild(bttn);
    list.appendChild(listItem);
    i++;
    }
  body.appendChild(list);
};

function populateGists(numberOfPages, t, j) {
  var gistsRequest = new XMLHttpRequest();
  var URL = 'https://api.github.com/gists';
  var pageNum = '?page=' + numberOfPages;
  URL += pageNum;

  gistsRequest.onreadystatechange = function() {
    if(this.readyState === 4) {
      var descrip = [];
      var address = [];
      var gistInfo = JSON.parse(this.responseText);
      for(var i = 0; i < 30; i++){
        for (var fileName in gistInfo[i].files) {
          var oneFile = gistInfo[i].files[fileName];
          if(document.getElementsByName('Python')[0].checked === false && document.getElementsByName('JSON')[0].checked === false && document.getElementsByName('JavaScript')[0].checked === false && document.getElementsByName('SQL')[0].checked === false){
            descrip[i] = gistInfo[i].description;
            address[i] = gistInfo[i].html_url;
          }
          else if(document.getElementsByName('Python')[0].checked === true){
            if(oneFile.language == 'Python'){
              descrip[j] = gistInfo[i].description;
              address[j] = gistInfo[i].html_url;
              j++;
            }
          }
          else if(document.getElementsByName('JSON')[0].checked === true){
            if(oneFile.language == 'JSON'){
              descrip[j] = gistInfo[i].description;
              address[j] = gistInfo[i].html_url;
              j++;
            }
          }
          else if(document.getElementsByName('JavaScript')[0].checked === true){
            if(oneFile.language =='JavaScript'){
              descrip[j] = gistInfo[i].description;
              address[j] = gistInfo[i].html_url;
              j++;
            }
          }
          else if(document.getElementsByName('SQL')[0].checked === true){
            if(oneFile.language == 'SQL'){
              descrip[j] = gistInfo[i].description;
              address[j] = gistInfo[i].html_url;
              j++;
            }
          }
        }
      }
      generate_list(descrip, address, t);
    }
  };
  gistsRequest.open('GET', URL);
  gistsRequest.send();
}
function findPages(){
  var number = document.getElementsByName('how-many-pages')[0];
  number = number.value;
  var list = document.getElementById('gist-list');
  var j = list.getElementsByTagName('li');
  j = j.length;
  var t = 0;
  for(var i = 0; i < number; i++) {
    t = (30 * i);
    populateGists(i, t, j);
  }
}
function generate_list(descrip, address, t) {
  var body = document.getElementsByTagName("body")[0];
  var list = document.getElementById("gist-list");

  for(var i = 0; i < address.length; i++){
    var a = document.createElement("a");
    var listItem = document.createElement("li");
    var bttn = document.createElement("BUTTON");
    var bttnText = document.createTextNode("Favorite");
    bttn.appendChild(bttnText);
    bttn.setAttribute("onclick", "addToFavorite(this.id);");
    bttn.setAttribute("id", "buttonNum " + t);
    a.textContent = descrip[i] + '  ';
    a.setAttribute('href', address[i]);
    listItem.appendChild(a);
    listItem.appendChild(bttn);
    listItem.setAttribute("id", "liNum" + t);
    list.appendChild(listItem);
    t++;
  }
  body.appendChild(list);
}
function favoriteList(idHolder){
  var body = document.getElementsByTagName("body")[0];
  var list = document.getElementById("favorite-list");
  var a = document.createElement("a");
  var listItem = document.createElement("li");
  var bttn = document.createElement("BUTTON");
  var bttnText = document.createTextNode("Un-Favorite");
  bttn.appendChild(bttnText);
  bttn.setAttribute("onclick", "unFavorite(this.id);");
  bttn.setAttribute("id", idHolder + " favoriteNum");
  a.textContent = localStorage.getItem(idHolder + " description") + '  ';
  a.setAttribute('href', localStorage.getItem(idHolder + " htmlUrl"));
  listItem.appendChild(a);
  listItem.appendChild(bttn);
  list.appendChild(listItem);
  body.appendChild(list);
}
function addToFavorite(id){
  var descriptionHolder;
  var idHolder;
  var hUrl = id;
  idHolder = hUrl.split(" ");
  idHolder = parseInt(idHolder[1], 10);
  hUrl = document.getElementById("liNum" + idHolder).childNodes[0];
  descriptionHolder = document.getElementsByTagName("a");
  descriptionHolder = descriptionHolder[idHolder];//works, dont mess with.
  descriptionHolder = descriptionHolder.firstChild.data;//works, dont mess with.
  localStorage.setItem(idHolder + " htmlUrl", hUrl);
  localStorage.setItem(idHolder + " description", descriptionHolder);
  favoriteList(idHolder);
}
function unFavorite(id){
  var myList = document.getElementsByTagName("favorite-list");
  var idHolder;
  var hUrl = id;
  idHolder = hUrl.split(" ");
  idHolder = parseInt(idHolder[0], 10);
  localStorage.removeItem(idHolder + " htmlUrl");
  localStorage.removeItem(idHolder + " description");
}