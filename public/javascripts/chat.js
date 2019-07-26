// chatの基本的な部分

var socket = io();

//ボタンを選択できる？
var button = document.querySelector('.sendButton');
console.log(button);

function sendRoomName(){
     // 送信するルーム名を決める
    // セレクトボックスの選択された値のインデックスを取ってそこから値をとってくる
    const groomList = document.roomList.nowRoom;
    const num = groomList.selectedIndex;
    const grn = groomList.options[num].value;
    let nRN = grn;

    console.log("ボタンが押されたお");
    console.log("選択されたセレクトボックスは" + nRN);
    return nRN;
};

// buttonがクリックされた時
button.addEventListener('click', (e) => {

    // console.log(roomName);
    socket.emit('roomJoin', sendRoomName());

    // フォームの画面更新をキャンセルする
    e.preventDefault();
    // メッセージボックスにtextの文字列を入れる
    var messageBox = document.querySelector("#m");
    // 受け取った内容をコンソールに出力
    console.log(messageBox.value);

    // 文字列を加工
    var sendMessage = (username + ",TIME:" + hour + "h" + minute + "m," + messageBox.value);
    // 配信する際にmessage(ul)に右側のを送っている、
    // ユーザーネーム＋時、分、秒＋入力された内容
    console.log(sendMessage);

    var res = sendMessage.indexOf('TIME:');
    // textを空にする
    if (res != -1) {
        //        送信する
        // socket.emit('message', sendMessage);
        //        ルームを選択して送信するイベントに送信する
               socket.emit("server_join", (sendMessage));
        // socket.emit("roomSendMessage", (roomName, sendMessage));

        // csvにメッセージを保存する
        socket.emit('sendCsv', sendMessage);
        console.log("ログに記入しました。");
    }

    //    サーバーに送信せず自分の画面にのみ書き込みをする
    funcMessage(sendMessage);

    //    メッセージボックスをクリア
    messageBox.value = "";
    //    終了
    return false;

}, false);

//サーバーからメッセージが来る
socket.on('server_mes', (sendMessage) => {
    funcMessage(sendMessage);
});


// messageはサーバーから送られてきた文字列が格納されている?
socket.on('message', (message) => {
    //    書き込み
    funcMessage(message);

    //    入力中メッセージの切替
    var p = document.querySelector('p');
    p.innerHTML = "入力中のユーザーはいません。";

});

// 文字列一時保存用変数
var tempText = "";

//書き込みをサーバーへ送信しなくてもいいようにする為に関数にした
function funcMessage(fSendMessage) {

    if (tempText == fSendMessage) {
        console.log("直近の内容と同一のものは入力できないです。");
    } else {
        tempText = fSendMessage;
        // これ全部ファンクションにして呼び出す形式にすればらくちんちん？？
        // 新しいliを生成する
        var li = document.createElement('li');
        // liにmessageを書き込む
        li.innerHTML = fSendMessage;
        // よくわからないけど文書内の最初のElementsを返すらしい
        var ul = document.querySelector('#messages');
        // 要素の末尾に入れる
        ul.appendChild(li);
    }
}
