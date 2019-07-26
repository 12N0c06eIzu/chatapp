var socket = io();

var username = "";
window.onload = name();
window.confirm = roomCho();

//どのroomに入ったか
var roomEnter;
//roomの名前を入れる変数
var roomName = "";

//ルームを選択するconfirm
function roomCho() {
    roomEnter = window.confirm("Test Room　へ入室しますか？");

    if (roomEnter) {
        roomName = "test";
    } else {
        roomName = "world";

    }
    //Testルームへ入室するかの判定を送る
    socket.emit('roomJoin', (roomName));

    //    console.log("roomEnter:" + roomCho);
    console.log(roomName);
};

console.log(username);

var one = true;

// タイムスタンプ用に色々追加（時、分、秒）
var time = new Date();
var hour = time.getHours();
var minute = time.getMinutes();
var second = time.getSeconds();

// window.onbeforeunload = function(username) {};

var userList = [];
var userNumber = -1;

function name() {

    // 同名でも問題なく取り扱われるがきもいのでそのうちなんとかする
    // おそらく先ほどのやつで重複しているという確認が取れなければwhile文を回すような感じにするとよい？
    username = prompt("username を入力してください！");
    if (username == "") {
        //- ページごとで変わってきて数字が重複するので削除
        username = "名無しの権兵衛さん";
    }
    // これでうちだけに送ってくれりゃいいんだからソケットあいでー使おうぜｗｗｗ
    socket.emit('loadLogMessage', );

    // 入室メンバーイベント
    socket.emit('members', username);


    // 入室イベント
    socket.emit('enter', username);
}



//ボタンを選択できる？
var button = document.querySelector('button');
console.log(button);

// buttonがクリックされた時
button.addEventListener('click', (e) => {
    const getRoomName = document.roomList.roomNames;
    const rnum = getRoomNames.selectedIndex;
    console.log(rnum);
    const rstr = getRoomName.option[rnum].value;
    console.log(rstr);
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
        socket.emit('message', sendMessage);
        //        ルームを選択して送信するイベントに送信する
        //        socket.emit("server_join", (sendMessage));
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

// csvに保存する
//socket.on('sendCsv', (msg) => {
//    fSendMessage(msg);
//});

var n = 0;

// usrnameさんが入場しました。を行う
socket.on('enter', (username) => {

    if (one) {
        for (var i = 0; i < arrayLogMessage.length; i++) {
            if (i == arrayLogMessage.length - 1) {
                one = false;
            }
            // console.log("次のメッセージを出力します"+ n + "回目" + arrayLogMessage[i]);
            funcMessage(arrayLogMessage[i]);
            n++
        }

    }

    var mes = username + "が入室しました";
    funcMessage(mes);
});


// 退出版
socket.on('exit', (exitMessage) => {

    socket.emit('exit', username);

    funcMessage(exitMessage);
});

/*入場してきたメンバーを表示する。
h1にmembersというidを付与してそこに文字列usernameを足していく
ここにliに対してusernameが入室しました。という一文を送信するものを足すのは有効かと
思ったがすでにusernameを加工したものが飛んでるので却下*/
socket.on('members', (userListAll) => {
    // ここでpushしても意味がないので削除

    var h1 = document.querySelector('h3');
    var list = document.getElementById('members');


    h1.innerHTML = "今いるメンバーは　：" + userListAll;
    // socket.on()
});

function nowWrite() {
    // これでクライアントからイベントを送信するらしい
    // 例では文字列を格納する変数を宣言していたが既にこちらではusername
    // を宣言しているので不要と判断
    socket.emit('writer', (username));

}

socket.on('writer', (username) => {
    // console.log(username);
    console.log(username + "さんが入力中です。");
    // io.emit('enterMember', "Members : " + username);
    var p = document.querySelector('p');
    p.innerHTML = username + "が入力中です。";
});


var arrayLogMessage = [];
var a = 0;


// socket.on('loadLogMessage', (logMessage) => {
socket.on('loadLogMessage', (logMessage) => {
    // console.log("次の「" + logMessage + "」というメッセージが入りました。");
    arrayLogMessage[a] = logMessage;
    a++;
});

var tempText = "";


//書き込み
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

        //        var res = fSendMessage.indexOf('TIME');
        //        if (res !== -1) {
        //            console.log("ログに記入しました。");
        //            // csvにメッセージを保存する
        //            socket.emit('sendCsv', fSendMessage);
        //        }
    }
}


/*
day9　Room追加について
ル―無機能といっていい程微妙な感じになってしまった。
動作確認の際３つ目のユーザーを追加するとなぜか２人目が送信されなかったり
微妙な挙動をしている。

３人目は別のルー無にいれたがおかしいので
なんとかしないといけない。。。
ちゃんと1人目はテストルー無に入れているので
３人目のメッセージは届かないので
ルームが機能しているのはわかる

もうすこし自分にもわかりやすいように
改修する必要がありそう


*/


/*イベントを追加する時のテンプレ
eventNameにイベント名を
argumentには引数を
codeには、、、
*/

// socket.on('eventName', (argument) => {
//   //code
// });

/*
socket.io Homework
ユーザー名の登録機能：OK
プロンプトで入力するようにした

入退出を表示：OK
ユーザー名が入力された後送信して書き換えるようにした
wwwで文字列を送信するようにして、membersのイベントを削除用に変更してexitで同時に呼び出すように変更した。

入力中を表示：一応OK
ユーザー名を送信して、文字列と連結して書き換えるようにした

直近の内容と同一のものは入力できない：OK
送った先で比較して分岐
保存も対応

耳打ち：x

サーバーに自分の文は送信せずにクライアントで更新：OK
functionで実装。

みんなに共有する：ｘ

追加機能
タイムスタンプ：OK
出力されるメッセージの前につけることにした。
基本的に文字数が変わらないのはタイムスタンプの方だから、、改行ができるなら、後ろにつけてもいいかもしれない。

csvにログを保存して読み書きする：OK
*/
