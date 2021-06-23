import { Message } from "discord.js";
const axios = require('axios');
/**
 * Simple message event handler that checks if a message was sent by a bot.
 * It also checks two simple commands and sends a default message
 * if neither conditions were met.
 * @param message Message
 */


//This is mock calls to Discord Bot
//export message Handler 
export const messageHandler = async (message: Message) => {
  if (message.author.bot) {
    //message exported from discord.js
    //Message is element of discord 
    throw "Message sent by a bot.";
  }
  //If text message equals /ping
  if (message.content === "/ping") {
    //respond with pong
    message.channel.send("pong");
  } //mock call to /help command
  else if (message.content === "/help") {
    //respond with /help message body
    message.channel.send("🙏 Commands 🙏");
  } //mock call to Discord /price_to_usd command
  else if (message.content === "/price_to_usd") {
    //call to coingecko.com API with AXIOS 
    const result = await axios.request({
      method: 'get',
      url: `https://api.coingecko.com/api/v3/simple/price?ids=bluzelle&vs_currencies=usd`
    });
    //Variable that holds USD value from API
    let obj = result.data.bluzelle.usd
    console.log('3' + obj)
    //Send message with USD variable
    await message.channel.send(obj);
  }  //mock call to Discord with /validators_test 
  else if (message.content === "/validators_test") {
    //request with AXIOS
    const response = await axios.request({
      method: 'get',
      url: `https://client.sentry.testnet.private.bluzelle.com:26657/validators`
    });
    //variable that holds number of validators
    let obj = response.data.result.total
    console.log('3' + obj)
    //sending message to discord with validator's variable
    await message.channel.send(obj);
  } //mock call Discord with /lates_block_hash_test command
  else if (message.content === "/latest_block_hash_test") {
    //API call with AXIOS 
    const response = await axios.request({
      method: 'get',
      url: `https://client.sentry.testnet.private.bluzelle.com:26657/status?`
    });
    //Making string from API block hash variable 
    let obj = JSON.stringify(response.data.result.sync_info.latest_block_hash);
    console.log('3' + obj)
    //sending message to discord
    await message.channel.send(obj);
  } //Mock call to Discord with /block_height_test command
  else if (message.content === "/block_height_test") {
    //API call with AXIOS
    const response = await axios.request({
      method: 'get',
      url: `https://client.sentry.testnet.private.bluzelle.com:26657/block?height`
    });
    //variable that holds block height value
    let obj = response.data.result.block.header.version.block
    console.log('3' + obj)
    //sending message to discord
    await message.channel.send(obj);
  } //call Discord with /block_height command
  else if (message.content === "/block_height") {
    //API call with axios
    const response = await axios.request({
      method: 'get',
      url: `http://sandbox.sentry.net.bluzelle.com:26657/validators`
    });
    //variable that holds block height value 
    let obj = response.data.result.block_height
    console.log('3' + obj)
    //sending message to discord
    await message.channel.send(obj);
  } //call to Discord with /validators
  else if (message.content === "/validators") {
    //call BLZ mainnet with axios 
    const response = await axios.request({
      method: 'get',
      url: `http://sandbox.sentry.net.bluzelle.com:26657/validators`
    });
    //varialbe that holds validator value
    let obj = response.data.result.count
    console.log('3' + obj)
    //sending message to discord
    await message.channel.send(obj);
  } //call Discord with /block_hash
  else if (message.content === "/block_hash") {
    //call mainnet with AXIOS
    const response = await axios.request({
      method: 'get',
      url: `http://sandbox.sentry.net.bluzelle.com:26657/status?`
    });
    //variable that holds block hash
    let obj = response.data.result.sync_info.latest_app_hash
    console.log('3' + obj)
    //sending message to Discord
    await message.channel.send(obj);
  } //call Discord with /block_time_last
  else if (message.content === "/block_time_last") {
    //call mainnet with axios 
    const response = await axios.request({
      method: 'get',
      url: `http://sandbox.sentry.net.bluzelle.com:26657/status?`
    });
    //variable that holds block time last
    let obj = response.data.result.sync_info.latest_block_time
    console.log('3' + obj)
    //sending message to discord 
    await message.channel.send(obj);
  }  //send command not found if the command doesn't match
  else {
    message.channel.send("Command not found.");
  }
};
