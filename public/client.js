
var msg, name
var ws = new WebSocket('ws://localhost:5000')

var input = document.getElementById('message')
input.addEventListener('keyup', function (e) {
    if (e.keyCode == 13) {
        document.getElementById('send_chat').click()
    }
})


window.onload = function () {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            name = JSON.parse(this.responseText).name
            document.getElementById('name').innerHTML = name;
            var user = JSON.stringify({
                name: name
            })
            ws.send(user)
        }
    }
    xhttp.open("post", '/user/name', true)
    xhttp.send()


}
ws.onmessage = function (evt) {
    var data = JSON.parse(evt.data)
    if (data.user) {
        data.data.forEach(e => {
            var tag = document.createElement('p')
            var br = document.createElement('br')
            var user = document.createTextNode(e)
            tag.append(user)

            var el = document.getElementById('user-box')
            el.append(user)
            el.append(br)
            console.log(data)
        });

    } else {
        // var message = data.name + ' says ' + data.msg
        // var tag = document.createElement('p')
        // var br = document.createElement('br')
        // var el_chat = document.createTextNode(message)
        // tag.append(el_chat)

        // var element = document.getElementById("chat-box")
        // element.append(el_chat)
        // element.append(br)
    }
    console.log(data)
}

ws.onclose = function(){
    ws.send('CLIENT KELUAR')
}
function send_chat() {
    var msg = document.getElementById('message').value

    var data = JSON.stringify({
        name: name,
        msg: msg
    })
    ws.send(data)
    document.getElementById('message').value = ''
}

