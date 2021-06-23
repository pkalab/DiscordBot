
const Discord = require("discord.js")
const client = new Discord.Client()

require('dotenv').config()
const axios = require('axios');

//to turn on the bot eun node + FILENAME.js
//when the bot is ready terminal will output ${client.user.tag}!
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

//On command /ping output pong
client.on('message', msg => {
    if (msg.content === '/ping') {
        msg.channel.send('pong ')
    }
})

client.on('message', msg => {
    //on command /help 
    if (msg.content === '/help') {
        //Formating message , UI components
        const embed = {
            "title": "🙏 Commands 🙏",
            "description": "Commands to help navigate",
            "color": 10933652,
            "image": {
                "url": "https://pbs.twimg.com/profile_images/1397885651547090944/yG9RdL1B_400x400.jpg"
            },
            "fields": [
                {
                    "name": "🤔",
                    "value": "Active validators on testnet: \n /validators_test"
                },
                {
                    "name": "🤔",
                    "value": "Latest block hash on testnet: \n /latest_block_hash_test"
                },
                {
                    "name": "🤔",
                    "value": "Block height on testnet : \n  /block_height_test"
                },
                {
                    "name": "🤔",
                    "value": "Price BLZ to usd : \n /price_to_usd"
                },
                {
                    "name": "🤔",
                    "value": "Block height on mainnet: \n /block_height"
                },
                {
                    "name": "🤔",
                    "value": "Number of validators: \n /validators"
                },
                {
                    "name": "🤔",
                    "value": "Last Block Hash: \n /block_hash "
                },
                {
                    "name": "🤔",
                    "value": "Last block time: \n /block_time_last"
                },
            ]
        }
        msg.channel.send({ embed });
    }
});
//Price in usd

client.on("message", async msg => {
    //On command /price_to_usd
    if (msg.content === "/price_to_usd") {
        //send reqest with axios to coingecko. Price in usd
        let getPrice = async () => {
            let response = await axios.get(
                'https://api.coingecko.com/api/v3/simple/price?ids=bluzelle&vs_currencies=usd'
            );
            //variable that holds usd price
            let BLZ = response.data.bluzelle.usd;
            return BLZ;

        };
        msg.channel.send("BLZ price").then(msg => {
            //initialize getPrice() function
            let BLZVal = getPrice();
            BLZVal.then(function (result) {
                //formating UI of the message
                //initialize Discord.MessageEmbed
                let embed = new Discord.MessageEmbed() 
                    .setColor('#0099ff')
                    .setTitle('🤑 BLZ PRICE IS 🤑')
                    .setDescription('in usd')
                    .addFields(
                        //
                        { name: "🤔🤔🤔", value: `BLZ is  ${result}` }
                    )
                    //implment changes
                msg.edit(embed)
            })
            console.log(BLZVal);

        })

    }
}
,)

//Request to testnet. How many active validators
client.on("message", async msg => {
    if (msg.content === "/validators_test") {
        let getVal = async () => {
            let response = await axios.get(
                'https://client.sentry.testnet.private.bluzelle.com:26657/validators'
            );
            let BLZ = response.data.result.total;
            return BLZ;
        };

        msg.channel.send("Validators").then(msg => {
            let BLZVal = getVal();
            BLZVal.then(function (result) {
                let embed = new Discord.MessageEmbed() 
                    .setTitle('🤓 ACTIVE VALIDATORS 🤓')
                    .setDescription('🤠🤠🤠testnet🤠🤠🤠')
                    .addFields(
                        { name: "Active validators", value: `  ${result}` }
                    )
                msg.edit(embed)
            })
            console.log(BLZVal);

        })

    }
}
,)
//Latest block hash on testnet
client.on("message", async msg => {
    if (msg.content === "/latest_block_hash_test") {
        let getBlock = async () => {
            let response = await axios.get(
                'https://client.sentry.testnet.private.bluzelle.com:26657/status?'
            );
            let BLZ = response.data.result.sync_info.latest_block_hash;
            return BLZ;
        };

        msg.channel.send("Latest block hash").then(msg => {
            let BLZVal = getBlock();
            BLZVal.then(function (result) {
                let embed = new Discord.MessageEmbed() 
                    .setColor('#0099ff')
                    .setTitle('🏗  Latest block hash 🏗 ')
                    .setDescription('😝😝😝testnet😝😝😝')
                    .addFields(
                        { name: "Latest block hash is ", value: `  ${result}` }
                    )
                msg.edit(embed)
            })
            console.log(BLZVal);

        })

    }
}
,)
//Block height on testnet
client.on("message", async msg => {
    if (msg.content === "/block_height_test") {
        let getBlockH = async () => {
            let response = await axios.get(
                'https://client.sentry.testnet.private.bluzelle.com:26657/block?height'
            );
            let BLZ = response.data.result.block.header.version.block;
            return BLZ;
        };
        msg.channel.send("Block height").then(msg => {
            let BLZVal = getBlockH();
            BLZVal.then(function (result) {
                let embed = new Discord.MessageEmbed() 
                    .setColor('#0099ff')
                    .setTitle('😲 Block height 😲')
                    .setDescription('🏛🏛🏛testnet🏛🏛🏛')
                    .addFields(
                        { name: "Block height is  ", value: `${result}` }
                    )
                msg.edit(embed)
            })
            console.log(BLZVal);

        })

    }
}
,)


//MAINNET

//Block height on mainnet

client.on("message", async msg => {
    if (msg.content === "/block_height") {
        let getBlock = async () => {
            let response = await axios.get(
                'http://sandbox.sentry.net.bluzelle.com:26657/validators'
            );
            let BLZ = response.data.result.block_height;
            return BLZ;
        };
        //Request to mainnet with axios
        msg.channel.send("Block height").then(msg => {
            let BLZVal = getBlock();
            BLZVal.then(function (result) {
                let embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('😃 Block height 😃')
                    .setDescription('🖥🖥🖥 mainnet 🖥🖥🖥')
                    .addFields(
                        { name: "Block height is  ", value: `${result}` }
                    )
                msg.edit(embed)
            })
            console.log(BLZVal);

        })

    }
}
,)

//Validators number on Mainnet
client.on("message", async msg => {
    if (msg.content === "/validators") {
        let getVal = async () => {
            let response = await axios.get(
                'http://sandbox.sentry.net.bluzelle.com:26657/validators'
            );
            let BLZ = response.data.result.count;
            return BLZ;
        };
        //Request to mainnet with axiox
        msg.channel.send("Validators").then(msg => {
            let BLZVal = getVal();
            BLZVal.then(function (result) {
                let embed = new Discord.MessageEmbed() 
                    .setColor('#0099ff')
                    .setTitle('😇 Active Validators 😇')
                    .setDescription('🔌🔌🔌mainnet 🔌🔌🔌')
                    .addFields(
                        { name: " Active validators  ", value: `${result}` }
                    )
                msg.edit(embed)
            })
            console.log(BLZVal);

        })

    }
}
,)

//Last block app hash
client.on("message", async msg => {
    if (msg.content === "/block_hash") {
        let getHash = async () => {
            let response = await axios.get(
                'http://sandbox.sentry.net.bluzelle.com:26657/status?'
            );
            let BLZ = response.data.result.sync_info.latest_app_hash;
            return BLZ;
        };
        msg.channel.send("Last block hash").then(msg => {
            let BLZVal = getHash();
            BLZVal.then(function (result) {
                let embed = new Discord.MessageEmbed() 
                    .setColor('#0099ff')
                    .setTitle('😎 Last Block Hash 😎')
                    .setDescription('💿💿💿 mainnet 💿💿💿')
                    .addFields(
                        { name: " Last Block Hash is  ", value: `${result}` }
                    )
                msg.edit(embed)
            })
            console.log(BLZVal);

        })

    }
}
,)


//Last block time
client.on("message", async msg => {
    if (msg.content === "/block_time_last") {

        let getTime = async () => {
            let response = await axios.get(
                'http://sandbox.sentry.net.bluzelle.com:26657/status?'
            );
            let BLZ = response.data.result.sync_info.latest_block_time;
            return BLZ;
        };

        msg.channel.send("Last block time").then(msg => {
            let BLZVal = getTime();
            BLZVal.then(function (result) {
                let embed = new Discord.MessageEmbed() 
                    .setColor('#0099ff')
                    .setTitle('⏰ Last Block Time ⏰')
                    .setDescription('😛😛😛 mainnet 😛😛😛')
                    .addFields(
                        { name: " Last block time is  ", value: `${result}` }
                    )
                msg.edit(embed)
            })
            console.log(BLZVal);

        })

    }
}
,)
//TOKEN variable stored in .env file
//TOKEN is Bot token string under Oath2 section
client.login(process.env.TOKEN)