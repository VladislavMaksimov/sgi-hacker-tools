# SGi Hacker Tools

```
TO-DO: add the description, screens, logo
```

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
