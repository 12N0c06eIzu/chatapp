var socket = io();

console.log("login.jsきたお");

/*
// 登録されているユーザーリストを取得する
socket.emit('getUserList');
socket.on('loadUserList', (data) => {
    console.log(data);
    data.forEach(value => {
        console.log(
            value.username + ":" +
            value.userid + ":" +
            value.password
    );    
    });
});
*/
socket.emit('getUserList');


function pushLogin() {
    console.log("pushLoginきたお");
    const user = document.login.userName.value;
    const pass = document.login.password.value;
    console.log("ユーザー名" + user);
    console.log("パスワード" + pass);
    var a = false;
    socket.emit('getUserList');
    socket.on('loadUserList', (data) => {
        console.log(data);
        data.forEach(value => {
            console.log(
                value.username + ":" +
                value.userid + ":" +
                value.password
            );
            if (user == value.username) {
                console.log("unk");
                if (pass == value.password) {
                    console.log("pass ok");
                    a = true;
                    var userName = escape(user);

                    var pram = "user=" + userName;

                    location.href = "/users?" + pram;

                } else {
                    console.log("pass ng");
                    // continue;
                }
            }

        });
        // alert("存在しないユーザー名です。");
    });
   
    return false;
}
