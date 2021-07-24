
import { Message } from "discord.js";
import { messageHandler } from "../jest-unit-test";
const axios = require('axios');

//Message Handler that was imported from index.ts
//mocks Discord message funcionality
describe("Message Handler", () => {
  const message = ({
    channel: {
      send: jest.fn(),
    },
    content: "",
    author: {
      bot: false,
    },
  } as unknown) as Message;

  //clear message before every mock call
  beforeEach(() => {
    jest.clearAllMocks();
  });

  //Test command 
  it("it should send Pong!", async () => {
    //command that was send by client 
    message.content = "/ping";
    //message handler will autocomplete the message
    await messageHandler(message);
    //expected output is "pong"
    expect(message.channel.send).toHaveBeenCalledWith("pong");
    expect(message.channel.send).not.toHaveBeenCalledWith("Help Command");
  });

  //help command for navigation
  it("it should send 🙏 Commands 🙏", async () => {
    //on /help command
    message.content = "/help";
    //message handler will autocomplete the message
    await messageHandler(message);
    expect(message.channel.send).toHaveBeenCalledWith("🙏 Commands 🙏");;
    expect(message.channel.send).not.toHaveBeenCalledWith("Help Command");
  });

//USD price for BLZ
  it('it should send price USD', async () => {
    message.content = "/price_to_usd";
    //request to testnet  with axios
    const result = await axios.request({
      method: 'get',
      url: `https://api.coingecko.com/api/v3/simple/price?ids=bluzelle&vs_currencies=usd`
    });
    //variable that holds USD price
    let obj = JSON.parse(result.data.bluzelle.usd);
    console.log('2 ' + obj)
    //messageHandler will automcomplete the request 
    await messageHandler(message);
    //expected value should match variable
    expect(message.channel.send).toHaveBeenCalledWith(obj);

  });
//Number of validators on testnet
  it('it return number of validators on testnet', async () => {
    message.content = "/validators_test";
    //request to testnet with axios
    const response = await axios.request({
      method: 'get',
      url: `https://client.sentry.testnet.private.bluzelle.com:26657/validators`
    });
    //variable that holds number of validators
    let obj = response.data.result.total;
    console.log('2 ' + obj)
    //message handler will autocomplete the message
    await messageHandler(message);
    expect(message.channel.send).toHaveBeenCalledWith(obj);

  });

//Latest block hash on testnet
  it('it should return latest block hash on testnet', async () => {
    message.content = "/latest_block_hash_test";
    const response = await axios.request({
      method: 'get',
      url: `https://client.sentry.testnet.private.bluzelle.com:26657/status?`
    });
    //return string
    let obj = JSON.stringify(response.data.result.sync_info.latest_block_hash);
    console.log('2 ' + obj)
    await messageHandler(message);
    expect(message.channel.send).toHaveBeenCalledWith(obj);

  });

  //Block height on testnet
  it('it should return block height on testnet', async () => {
    message.content = "/block_height_test";
    const response = await axios.request({
      method: 'get',
      url: `https://client.sentry.testnet.private.bluzelle.com:26657/block?height`
    });
    let obj = response.data.result.block.header.version.block;
    console.log('2 ' + obj)
    await messageHandler(message);
    expect(message.channel.send).toHaveBeenCalledWith(obj);

  });

  // MAINNET

  // Block height on mainnet

  it('it should return block height on mainnet', async () => {
    message.content = "/block_height";
    const response = await axios.request({
      method: 'get',
      url: `http://sandbox.sentry.net.bluzelle.com:26657/validators`
    });
    let obj = response.data.result.block_height;
    console.log('2 ' + obj)
    await messageHandler(message);
    expect(message.channel.send).toHaveBeenCalledWith(obj);

  });

  //Return number of validators on Mainnet
  it('it should return number of validators on Mainnet', async () => {
    message.content = "/validators";
    const response = await axios.request({
      method: 'get',
      url: `http://sandbox.sentry.net.bluzelle.com:26657/validators`
    });
    let obj = response.data.result.count;
    console.log('2 ' + obj)
    await messageHandler(message);
    expect(message.channel.send).toHaveBeenCalledWith(obj);

  });

  //Last Block hash on mainnet
  it('it should return block hash on mainnet', async () => {
    message.content = "/block_hash";
    const response = await axios.request({
      method: 'get',
      url: `http://sandbox.sentry.net.bluzelle.com:26657/status?`
    });
    let obj = response.data.result.sync_info.latest_app_hash;
    console.log('2 ' + obj)
    await messageHandler(message);
    expect(message.channel.send).toHaveBeenCalledWith(obj);

  });

  //Block time hash on mainnet
  it('it should return last block time on mainnet', async () => {
    message.content = "/block_time_last";
    const response = await axios.request({
      method: 'get',
      url: `http://sandbox.sentry.net.bluzelle.com:26657/status?`
    });
    let obj = response.data.result.sync_info.latest_block_time;
    console.log('2 ' + obj)
    await messageHandler(message);
    expect(message.channel.send).toHaveBeenCalledWith(obj);

  });




  it("should throw an error when a bot sends a message", async () => {
    message.author.bot = true;
    try {
      await messageHandler(message);
    } catch (err) {
      expect(err).toBeDefined();
      expect(message.channel.send).not.toHaveBeenCalled();
    }
  });

  //called only on specific channel 
  it("should not call any channel.send()", async () => {
    message.author.bot = false;
    message.content = "!random";
    await messageHandler(message);
    expect(message.channel.send).toHaveBeenCalledWith("Command not found.");
    expect(message.channel.send).toHaveBeenCalledTimes(1);
  });
});
