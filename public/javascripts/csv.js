/*
最終課題のcsvファイルを操作する処理
ログの取得、ユーザーリストの取得などをこのファイルに書き込む
ゆーて、できることが少ない。
結局こっちに持ってきて、とか出力するからこれな、とかしかない
*/

// ログを保存しておく配列
var arrayLogMessage = [];
// それのインデックス
var a = 0;
//一回だけログ読み込んで出力するためだけの変数
var one = true;

//----ログ関係-----

//ログを配列に格納する
socket.on('loadLogMessage', (logMessage) => {
    console.log("次の「" + logMessage + "」を配列に格納します");

    arrayLogMessage[a] = logMessage;

    console.log("次の「" + arrayLogMessage[a] + "」を格納しました。");

    funcMessage(arrayLogMessage[a]);
    a++;
});

///*

function getLog() {
    console.log("log書き込み開始しやす");
    if (one) {
        for (var i = 0; i < arrayLogMessage.length; i++) {
            if (i == arrayLogMessage.length - 1) {
                one = false;
            }
            console.log("次のメッセージを出力します" + (i - 1) + "回目" + arrayLogMessage[i]);
            funcMessage(arrayLogMessage[i]);
        }
    }
}

//*/

// ログをcsvに保存する
socket.on('sendCsv', (msg) => {
    fSendMessage(msg);
});
