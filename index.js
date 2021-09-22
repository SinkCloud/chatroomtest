const presets = {
    name:prompt("Enter Nickname"),
    avatarURL:prompt("Avatar URL \(Not required\)")
}
$("#loading-iirx").text = "Loading..."

function selectThis(num) {
 const selectedHubs = document.getElementsByClassName("selected")   
 for (var i = 0; i < selectedHubs.length; i++) { 
     selectedHubs[i].classList.remove("selected");
 }
  document.getElementById(`hub-`+num).classList.add("selected");
    
}
var socket = null
async function connect() {
socket = new WebSocket("wss://gateway.sinkcloud.com")
}
connect();
socket.onmessage = function (message) {
   const json = JSON.parse(message.data);
  const elemdiv = document.createElement("div");
  elemdiv.setAttribute("class","message");
  elemdiv.innerHTML = `<span style="background-image:url(${json.avatar});" class="avatar"></span><div class="rest"><div class="name">${json.name}</div><div class="message-content">${json.content}</div></div>`
  document.getElementById("index").appendChild(elemdiv);
  document.getElementById("index").scroll(0,1000000)  
}
socket.onopen = function () {
 document.getElementById("loader").style.display = "none";
    document.getElementById("textarea").style.display = "block"
    document.getElementById("index").style.display = "block"
}

socket.onclose = function () { 
 setTimeout(function() {
      connect();
    }, 1000);   
}
window.addEventListener('online', () => {
    connect()
    document.getElementById("loader").style.display = "none";
    document.getElementById("textarea").style.display = "block"
});
window.addEventListener('offline', () => {
    socket.close()
 document.getElementById("loader").style.display = "block";
    document.getElementById("textarea").style.display = "none"
});
const node = document.getElementById("arx");
node.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        if (document.getElementById("arx").value.length = 0) {
         return;   
        }
         const json = {type:"message",alias:presets.name,avatarURL:presets.avatarURL,content:document.getElementById("arx").value}
         socket.send(JSON.stringify(json))
         
         const elemdiv = document.createElement("div");
  elemdiv.setAttribute("class","message");
  elemdiv.innerHTML = `<span style="background-image:url(${presets.avatarURL});" class="avatar"></span><div class="rest"><div class="name">${presets.name}</div><div class="message-content">${document.getElementById("arx").value}</div></div>`
  document.getElementById("index").appendChild(elemdiv);
  document.getElementById("index").scroll(0,1000000)  
  document.getElementById("arx").value = "";
    }
});
