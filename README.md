# appscript-telegram-automation

Telegram bot Automation for Broadcasting using Appscript, Telegram, and adding email broadcasting.

## Description

This project automates the process of broadcasting messages to a Telegram bot using Google Apps Script. It allows users to send messages to multiple recipients through a Telegram bot, making it ideal for notifications, updates, and other broadcasting purposes.

## Features

- Automate message broadcasting through Telegram.
- Easy integration with Google Apps Script.
- Customizable message templates.
- Schedule broadcasts at specified intervals.

## Prerequisites

- A Google account.
- A Telegram bot (create one using BotFather on Telegram).
- Google Apps Script project.

## Setup

1. **Create a Telegram Bot**:
   - Open Telegram and search for BotFather.
   - Use `/newbot` command to create a new bot.
   - Follow the instructions to set up the bot and obtain the bot token.

2. **Set up Google Apps Script**:
   - Open Google Drive and create a new Google Apps Script project.
   - Copy the script from this repository into the Apps Script editor.

3. **Configure the Script**:
   - Set the `BOT_TOKEN` variable in the script to the token obtained from BotFather.
   - Add the chat IDs of the recipients to the `RECIPIENTS` array in the script.

4. **Authorize the Script**:
   - Run the script for the first time to authorize it to access your Google account.

## Usage

1. **Send a Test Message**:
   - Run the `sendTestMessage` function in the Apps Script editor to send a test message to the recipients.

2. **Schedule Broadcasts**:
   - Use the Apps Script triggers to schedule the `broadcastMessage` function to run at specified intervals (e.g., daily, weekly).

## Contributing

Feel free to contribute to this project by creating issues or submitting pull requests. Any contributions are welcome!

## License

This project is licensed under the MIT License.

For more details, visit the [project repository](https://github.com/lisaadnr/appscript-telegram-automation).
