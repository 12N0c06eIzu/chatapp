// chatに対する拡張機能
var socket = io();
//var username = "テストマンなんだぜぃ";
var username = "";
// 最初に読み込む
//window.onload = name();
// window.confirm = roomCho();
//どのroomに入ったか
var roomEnter;
//roomの名前を入れる変数
var roomName = "";

//ルームへの入室決定confirm跡地

// タイムスタンプ用に色々追加（時、分、秒）
var time = new Date();
var hour = time.getHours();
var minute = time.getMinutes();
var second = time.getSeconds();

// window.onbeforeunload = function(username) {};

var userList = [];
var userNumber = -1;


console.log("nameイベントが来たぞ！にげろ！");

//    ここでパラメーターからユーザーIDを獲得できればいいのでは？
// code...
var pram = location.search;
console.log("パラメータ" + pram);

if (!pram) console.log("空じゃ");;
//    ?と=を削除
pram = pram.substring(1);
var pair = pram.split("&");

var k = temp = "";
for (k = 0; k < pair.length; k++) {
    temp = pair[k].split("=");
}
username = unescape(temp[1]);
console.log("ユーザー名は" + username);

console.log("過去ログを取得します");
// 過去ログを取得する
socket.emit('loadLogMessage', "store.csv");

console.log("ログを書き込む");
///*
//    ログを書き込む
if (one) {
    getLog();
    one = false;
}
// */
console.log("入室イベント１(175)");
// 入室メンバーイベント
socket.emit('nowUserList', username);

console.log("入室イベント２(205)");

// 入室イベント
socket.emit('enterUser', username);
//}

function nowWrite() {
    // これでクライアントからイベントを送信するらしい
    // 例では文字列を格納する変数を宣言していたが既にこちらではusername
    // を宣言しているので不要と判断
    // 誰が今書き込んでいるのかを表示下のイベント
    socket.emit('writer', (username));
}

function createRoom() {
    newRoomName = prompt("ルームの名前を入力してください");
    socket.emit(newRoom);
    // 追加するルーム名をサーバーに送信してそれを反映させる
}


// usrnameさんが入場しました。を行う
socket.on('enterUser', (username) => {
    var mes = username + "が入室しました";
    funcMessage(mes);
});

// 退出時のイベント
socket.on('exit', (exitMessage) => {
    // 今いるユーザーから削除する
    socket.emit('exit', username);
    // 退出メッセージの書き出し
    funcMessage(exitMessage);
});

/*入場してきたメンバーを表示する。
h1にmembersというidを付与してそこに文字列usernameを足していく
ここにliに対してusernameが入室しました。という一文を送信するものを足すのは有効かと
思ったがすでにusernameを加工したものが飛んでるので却下*/
socket.on('nowUserList', (userListAll) => {
    // ここでpushしても意味がないので削除

    var h1 = document.querySelector('h3');
    var list = document.getElementById('members');
    h1.innerHTML = "今いるメンバーは　：" + userListAll;
    // socket.on()
});

socket.on('writer', (username) => {
    // console.log(username);
    console.log(username + "さんが入力中です。");
    // io.emit('enterMember', "Members : " + username);
    var p = document.querySelector('p');
    p.innerHTML = username + "が入力中です。";
});





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
