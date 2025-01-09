let running = false;

function execute() {
  if (running) {
    alert("すでに実行中です。停止してください。");
    return;
  }
  running = true;
  document.getElementById("status").innerText = "ステータス: 実行中";

  const botToken = document.getElementById("botToken").value;
  const serverId = document.getElementById("serverId").value;
  const channelIds = document.getElementById("channelId").value.split("\n");
  const message = document.getElementById("message").value;
  const delay = parseFloat(document.getElementById("delay").value);

  const sendToAllChannels = document.getElementById("sendToAllChannels").checked;
  const randomMention = document.getElementById("randomMention").checked;
  const rateLimitBypass = document.getElementById("rateLimitBypass").checked;
  const addRandomSuffix = document.getElementById("addRandomSuffix").checked;

  console.log("実行中...");
  console.log({ botToken, serverId, channelIds, message, delay, sendToAllChannels, randomMention, rateLimitBypass, addRandomSuffix });

  // 実行処理（仮）
  channelIds.forEach((channelId, index) => {
    setTimeout(() => {
      if (!running) return;
      let finalMessage = message;
      if (randomMention) {
        finalMessage += " @ランダムユーザー";
      }
      if (addRandomSuffix) {
        finalMessage += ` #${Math.random().toString(36).substring(2, 6)}`;
      }
      console.log(`送信先: ${channelId}, メッセージ: ${finalMessage}`);
    }, delay * 1000 * index);
  });
}

function stop() {
  running = false;
  document.getElementById("status").innerText = "ステータス: 停止中";
  console.log("停止しました。");
}
