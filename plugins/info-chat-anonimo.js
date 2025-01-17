import { xpRange } from '../lib/levelling.js'
import PhoneNumber from 'awesome-phonenumber'
import { promises } from 'fs'
import { join } from 'path'
let handler = async (m, { conn, usedPrefix, command, args, usedPrefix: _p, __dirname, isOwner, text, isAdmin, isROwner }) => {
  
  
const { levelling } = '../lib/levelling.js'
//let handler = async (m, { conn, usedPrefix, usedPrefix: _p, __dirname, text }) => {

let { exp, limit, level, role } = global.db.data.users[m.sender]
let { min, xp, max } = xpRange(level, global.multiplier)

let d = new Date(new Date + 3600000)
let locale = 'es'
let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
let week = d.toLocaleDateString(locale, { weekday: 'long' })
let date = d.toLocaleDateString(locale, {
day: 'numeric',
month: 'long',
year: 'numeric'
})
let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
day: 'numeric',
month: 'long',
year: 'numeric'
}).format(d)
let time = d.toLocaleTimeString(locale, {
hour: 'numeric',
minute: 'numeric',
second: 'numeric'
})
let _uptime = process.uptime() * 1000
let _muptime
if (process.send) {
process.send('uptime')
_muptime = await new Promise(resolve => {
process.once('message', resolve)
setTimeout(resolve, 1000)
}) * 1000
}
let { money } = global.db.data.users[m.sender]
let muptime = clockString(_muptime)
let uptime = clockString(_uptime)
let totalreg = Object.keys(global.db.data.users).length
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
let replace = {
'%': '%',
p: _p, uptime, muptime,
me: conn.getName(conn.user.jid),

exp: exp - min,
maxexp: xp,
totalexp: exp,
xp4levelup: max - exp,

level, limit, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
readmore: readMore
}
text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
  

let pp = './media/menus/Menu1.jpg'
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let mentionedJid = [who]
let username = conn.getName(who)

let chat = `馃懁 *El chat An贸nimo funciona solo al privado del Bot.*

馃懃 Consiste en usar el n煤mero del Bot para hablar con otras personas, es decir las dos personas estar谩n a la vez escribiendo por el chat privado del Bot, de esa manera ninguna 馃敀de las dos personas pueden ver su n煤mero, Foto, usuario, descripci贸n etc... 馃敀

鉁? Para poder hacer uso de esta funci贸n debes hacer lo siguiente:
鈿★笍 Ingresa al chat privado del Bot
鈿★笍 Escribe es siguiente comando
*#start*

鉁? Una vez hecho lo anterior solo tienes que tener paciencia a que otra persona use el mismo comando (#start) para poder ser vinculados por medio del n煤mero del Bot y empezar a interactuar 

鉁? Si dejas activado el #start tendr谩s m谩s posibilidades de interactuar con la otra persona de forma An贸nima 

馃毆 En caso que quieras salir del chat an贸nimo usa el siguiente comando 
*#leave* 

鉁? De esa forma ya dejar谩s de estar en el chat an贸nimo del Bot
鉂? No nos hacemos responsables del mal uso que le puedas dar a esta funci贸n del Bot.`

const fkontak = {
	"key": {
    "participants":"0@s.whatsapp.net",
		"remoteJid": "status@broadcast",
		"fromMe": false,
		"id": "Halo"
	},
	"message": {
		"contactMessage": {
			"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
		}
	},
	"participant": "0@s.whatsapp.net"
}

await conn.sendButton(m.chat, chat, wm, pp, [['饾檻饾櫎饾櫋饾櫕饾櫄饾櫑 饾櫀饾櫋 饾檲饾櫄饾櫍饾櫔虂 | 饾樈饾櫀饾櫂饾櫊 饾櫓饾櫎 饾檲饾櫄饾櫍饾櫔 鈽橈笍', '/menu'] ], fkontak, m)  
}

handler.command = /^(anonimochat|chatanonimo|AnonimoChat|ChatAnonimo|chatan贸nimo|an贸nimochat|anonimoch)$/i
handler.exp = 70
handler.register = true
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}
