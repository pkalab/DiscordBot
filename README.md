# DiscordBot BLZ
BLUZELLE DISCORD BOT

Bluzelle Discord Bot has 9 commands. It makes calls to Coingecko, Bluzelle testnet and Bluzelle mainnet. There is also 12 unit test cases included which run with Jest framework. 

This document will walk you through the process of deploying Bot on your server, setting up VPC to run your Bot 24/7 and testing with JEST




CREATE A BOT INSIDE DISCORD

Here are the step to creating a Discord Bot account.
1. Make sure you’re logged on to the Discord website.
2. Navigate to the application page.
3. Click on the “New Application” button.

4. Give the application a name and click “Create”.

5. Go to the “Bot” tab and then click “Add Bot”. You will have to confirm by clicking "Yes, do it!"

Keep the default settings for Public Bot (checked) and Require OAuth2 Code Grant (unchecked).
Your bot has been created. The next step is to copy the token.

This token is your bot's password so don't share it with anybody. It could allow someone to log in to the bot
How to Invite Your Bot to Join a Server
Now you have to get your Bot User into a server. To do this, you should create an invite URL for it.
Go to the "OAuth2" tab. Then select "bot" under the "scopes" section.

Now choose the permissions you want for the bot. Our bot is going to mainly use text messages so we don't need a lot of the permissions. You may need more depending on what you want your bot to do. Be careful with the "Administrator" permission.

After selecting the appropriate permissions, click the 'copy' button above the permissions. That will copy a URL which can be used to add the bot to a server.
Paste the URL into your browser, choose a server to invite the bot to, and click “Authorize”.
To add the bot, your account needs "Manage Server" permissions.



CODING BLZ BOT
I used Discord.js library with Axios to get API
You need to create .env file in your directory with TOKEN variable which will store Bot’s password 
Commands are:
touch .env
ls -a //to see all hidden .files in current directory
nano .env //to edit



CLONE GITHUB REPOSITORY 
https://github.com/pkalab/DiscordBot
1 git clone https://github.com/pkalab/DiscordBot.git
2 To initiate all dependancies run npm init 
If there are any issues try npm install discord.js. 
Check .env variable as wel. It should contain your unique bot token
3 To run bot type node bot2.js


1 Navigate to jest-unit-test folder 
cd jest-unit-test
2 Install ts-jest
npm install --save-dev jest typescript ts-jest @types/jest
3. To run test cases
npm test


*Note
Sometimes test cases run too slow and do not have time to synchronize correctly. It will output test failed for test #8 /block_hash command. Rerun it again




Install PM2.
PM2 provides an easy way to manage and daemonize applications (run them in the background as a service).
We will use npm, a package manager for Node modules that installs with Node.js, to install PM2 on our server. Use this command to install PM2
sudo npm install -g pm2
Now, we will use the pm2 start command to run our bot, bot.js, in the background
pm2 start bot2.js
[PM2] Starting /home/ubuntu/discord-greeter-bot/bot.js in fork_mode(1 instance)
[PM2] Done.
┌────┬────────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
│ id │ name │ mode │ ↺ │ status │ cpu │ memory > │
├────┼────────────────────┼──────────┼──────┼───────────┼──────────┼──────────┤
│ 0 │ bot │ fork │ 0 │ online │ 0% │ 40.4mb │
│ 1 │ bot │ fork │ 0 │ online │ 0% │ 24.5mb │
└────┴────────────────────┴──────────┴──────┴───────────┴──────────┴──────────┘
Applications that are running under PM2 will be restarted automatically if the application crashes or is killed, but an additional step needs to be taken to get the application to launch on system startup (boot or reboot). Luckily, PM2 provides an easy way to do this, the startup subcommand.
The startup subcommand generates and configures a startup script to launch PM2 and its managed processes on server boots:
pm2 startup systemd
The last line of the resulting output will include a command that you must run with superuser privileges:
Output
[PM2] Init System found: systemd
[PM2] You have to run this command as root. Execute the following command:
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -> -u ubuntu --hp /home/ubuntu
Run the command that was generated (similar to the highlighted output above, but with your username instead of ubuntu) to set PM2 up to start on boot (use the command from your own output):
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -> u ubuntu --hp /home/ubuntu




DESCRIPTION OF COMMANDS

Currently there are 9 main commands.
													
1. /help – will help to navigate
2. /validators_test – will make a call to BLZ testnet and GET number of active validators
3./latest_block_hash – will make a call to BLZ testnet and GET latest block hash
4./block_height_test – will make a call to BLZ testnet and GET block height 
5./price_to_usd – will make a call to Coingecko web site and get BLZ price in USD
6./block_height – will make a call to BLZ mainnet and GET block height
7. /validators – will make a call to BLZ mainnet and GET number of active validators
8./block_hash – will make a call to BLZ mainnet and GET latest block hash
9. /block_time_last – will make a call to BLZ mainnet and GET last block time
TESTING DISCORD BOT
