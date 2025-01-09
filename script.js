document.getElementById('execute').addEventListener('click', async () => {
    const botToken = document.getElementById('botToken').value;
    const serverId = document.getElementById('serverId').value;
    const channelIds = document.getElementById('channelId').value.split('\n').filter(id => id.trim() !== '');
    const messageContent = document.getElementById('messageContent').value;
    const delay = parseFloat(document.getElementById('delay').value) || 0.1;
    const sendToAllChannels = document.getElementById('sendToAllChannels').checked;
    const randomMention = document.getElementById('randomMention').checked;
    const rateLimit = document.getElementById('rateLimit').checked;
    const appendRandomString = document.getElementById('appendRandomString').checked;

    const statusElement = document.getElementById('status');

    if (!botToken || !serverId || (!channelIds.length && !sendToAllChannels)) {
        statusElement.textContent = 'ステータス: 必須項目を入力してください';
        return;
    }

    statusElement.textContent = 'ステータス: 実行中';

    try {
        for (let channelId of channelIds) {
            let finalMessage = messageContent;

            if (randomMention) {
                const randomUser = `<@${Math.floor(Math.random() * 10000)}>`;
                finalMessage += ` ${randomUser}`;
            }

            if (appendRandomString) {
                const randomString = Math.random().toString(36).substring(2, 7);
                finalMessage += ` ${randomString}`;
            }

            await sendMessage(botToken, channelId, finalMessage);
            statusElement.textContent = `ステータス: メッセージ送信中 (${channelId})`;
            await sleep(delay * 1000);
        }

        statusElement.textContent = 'ステータス: 完了しました';
    } catch (error) {
        console.error(error);
        statusElement.textContent = 'ステータス: エラーが発生しました';
    }
});

document.getElementById('stop').addEventListener('click', () => {
    statusElement.textContent = 'ステータス: 停止されました';
    // 実際の停止処理はここで実装します
});

async function sendMessage(botToken, channelId, message) {
    const response = await fetch(`https://discord.com/api/v9/channels/${channelId}/messages`, {
        method: 'POST',
        headers: {
            'Authorization': `Bot ${botToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: message })
    });

    if (!response.ok) {
        throw new Error(`Failed to send message: ${response.status} ${response.statusText}`);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
