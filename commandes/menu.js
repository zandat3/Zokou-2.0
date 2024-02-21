const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou({ nomCom: "menu", reaction:"📁",categorie: "Général" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = "public";
    
    if ((s.MODE).toLowerCase() != "oui") {
        mode = "privé";
    }

     

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Africa/Nairobi');

// Créer une date et une heure en GMT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

  let infoMsg =  `
*╔═════ •✧✧• ════╗*
┃ ➫  *Prefix* : ${s.PREFIXE}
┃ ➫  *Owner* : ${s.NOM_OWNER}
┃ ➫ *Mode* : ${mode}
┃ ➫  *Commands* : ${cm.length}
┃ ➫  *Date* : ${date}
┃ ➫  *Time* : ${temps}
┃ ➫  *Memory* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
┃ ➫  *Platform* : ${os.platform()}
┃ ➫  *Developer* : ✞⃟❐͜͡𝕯Я𝚺✘ ⃟ۣቾ ᭄ 
┃  & Mᮓ𝜩꣡𝐑𝐃
*╚═════ •✧✧• ════╝* \n\n`;
    
let menuMsg = `
👋 hi ${nomAuteurMessage} 👋
I am *${s.BOT}*, a bot developed by *The ᮓ𝜩꣡𝐑𝐃𝐒 team*.

*Here is the list of my orders:*
◇                             ◇
`;

    for (const cat in coms) {
        menuMsg += `*╔══✵* *${cat}*  *✵ ══╗*`;
        for (const cmd of coms[cat]) {
            menuMsg += `
*✗✪* ${cmd}`;
        }
        menuMsg += `
*╚════ ✵ ✵ ═══╝* \n`
    }

    menuMsg += `
◇            ◇
*»»————— ★ —————««*
To use a command, type ${prefix}"command name"

 *『✞⃟❐͜͡𝕯Я𝚺✘ ⃟ۣቾ ᭄ ᮓ𝜩꣡𝐑𝐃*
                                                
*»»————— ★ —————««*
`;

   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Zokou-MD*, développé par Djalega++" , gifPlayback : true}, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Zokou-MD*, développé par Djalega++" }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    
    repondre(infoMsg + menuMsg);
    
}

});
