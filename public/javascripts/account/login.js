var socket = io();

console.log("login.jsきたお");

// 登録されているユーザーリストを取得する
socket.emit('getUserList');

function pushLogin() {
    console.log("pushLoginきたお");
    const user = document.login.userName.value;
    const pass = document.login.password.value;
    console.log("ユーザー名" + user);
    console.log("パスワード" + pass);

    // 名前がuser.csvの中にあるかどうかの確認
    // パスワードが同一であるかの確認
    // ユーザー名をもった状態で次のページに行くよね。（値渡し）
    var userName = escape(user);
    //    ＆で連結
    var pram = "user=" + userName;

    location.href = "/users?" + pram;
    return false;
}
