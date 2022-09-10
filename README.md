<img src="docs/logo.svg" />

# SGi Hacker Tools

**SHT** is a web extension which improves UI of the [Small Games](https://small-games.info/) website. Small Games aka SGi is a russian website that was made in 2009. Its UI hasn't changed much, and it hasn't lots of important features. **SHT** add some new logic to the Small Games' UI and use the API of the website to provide some fun features.

## Features

### Core

1. **The counter of message characters.** There is a restriction of the count of characters that user can write in one message. The maximum should be 1000 characters, but the website has unstable behavior in this part and sometimes messages aren't sending even if the number of characters is greater than 950. **SHT** adds the counter, which text becomes orange when the number of characters is greater than 950 and becomes red when the number is greater than 1000. 
2. **Blocking users.** The extension allows users to block other users. When the user is blocked, you see the text `%username% wrote something...` instead of his or her messages. Also, you can hide your own messages the same way. **SHT** allows hiding only public comments, not private messages.
3. **Small messages button.** Small Games allows users to send small messages. When you send two regular messages in a row, you can't send the third regular message for some time, but you can send a small message. After that, you can write regular messages immediately. However, to send small message in vanilla Small Games UI, you need to write `/me` at the beginning of the message.

### Trivia

1. **Hiding chat option.**

### Fun

1. **Bot punishment.** There is a bot created by admins, and now you can send a humiliating message that will be shown in the bot's reputation history.
2. **Sadistic reputation changing option.** All the reputation changes which were made by you will be shown as they were made from the game named [Мясево](https://small-games.info/?go=game&c=4&i=7582) (Myasevo).

## Future Features

- [ ] User private messages blocking
- [ ] A special mode for fun features
- [ ] The option to add emoticons to the message

## How to Install

At this moment, you can install **SHT** only via the [GitHub release](https://github.com/VladislavMaksimov/sgi-hacker-tools/releases/tag/v1.0.0).

To do this in Chrome:
1. Download `sgi-hacker-tools.zip` from [the release](https://github.com/VladislavMaksimov/sgi-hacker-tools/releases/tag/v1.0.0).
2. Unzip it.
3. Open [the extensions tab](chrome://extensions/).
4. Enable developer mode.
5. Click `Load unpacked` and load the unpacked extension.

## Scripts

- `yarn` installs all the packages
- `yarn watch-build` watches for source code updates and builds the extension on each update
- `yarn build` builds the extension
- `yarn fix` formats .js, .ts and .css files via Prettier

## Versioning

**SHT** has a three-part version number `Major.Minor.Patch` like in SemVer scheme. However, the meaning of the numbers separated by dots is different:

- `Major` stands for adding / deleting features that radically change the UX and designed to be used frequently (such as option to block users).
- `Minor` stands for updating features or adding / deleting fun or small features (such as option to hide chat or button that make you able to decrease the reputation of the **Small Games** bot with a random quote from **I, Robot** as a commentary).
- `Patch` stands for fixes. That can be both bug fixes in the extension's code and fixes of **Small Games** problems (such as bugs, bad png icons instead of svg, distracting UI elements and other bad design decisions).
