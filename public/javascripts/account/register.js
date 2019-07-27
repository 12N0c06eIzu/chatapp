var socket = io();

console.log("login.jsきたお");

// 登録されているユーザーリストを取得する
socket.emit('getUserList');

function pushRegister() {
    console.log("pushLoginきたお");
    const user = document.register.userName.value;
    const pass = document.register.password.value;
    console.log("ユーザー名" + user);
    console.log("パスワード" + pass);

    // ここでcsvに書き込むのを送る
    if(user != null && pass != ""){
        socket.emit("addUser", ("username" + user + ",password" + pass));
    }else{
        console.log("データが不十分だお");
    }
    
    //    送られてきたユーザー情報をcsvに書き込んでログインページに切り替える
    var userName = escape(user);
    //    ＆で連結
    var pram = "user=" + userName;

    location.href = "../users?" + pram;
    return false;
    //    同一のユーザーがいた場合の処理も考えた方がイイのかもしれない。
}
