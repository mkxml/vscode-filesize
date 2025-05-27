# filesize package for Visual Studio Code

This package is intended for use with the [Visual Studio Code](https://code.visualstudio.com) editor and it displays the size of the focused file in the status bar of the editor.

**Bonus:** If you click on the status bar component it will display more information about the file!

## Installation

In VS Code, press Ctrl-P or Cmd-P (Mac) and type in `ext install vscode-filesize`. Click install in the left bar. Once the extension is installed you will be prompted to restart Visual Studio Code.

Or you can just search for `filesize` in the extension search bar inside the editor.

## Screenshots

`filesize` with the status bar component active in simple view:

![status bar component](https://cldup.com/_Y52O-UfkK.jpg)

### **NEW!** Expanded view

`filesize` with the status bar component active in expanded view (with gzip enabled):

![status bar component](https://cldup.com/urhtudAVO3.jpg)

### Detailed view

To open the detailed view for the current file in focus you can just click at the size in the status bar or use `Crtl`-`shift`-`'` or `Cmd`-`shift`-`'` if you are on a Mac.

`filesize` with the detailed info panel open:

![detailed info](https://cldup.com/x6qsyVLtee.jpg)

## Settings

This package has the following user-configurable settings:

- `displayInfoOnTheRightSideOfStatusBar`: Show the status bar info on the right side instead of the left. (Default: `false`)
- `showBrotli`: Show the calculated brotli-compressed size in the detailed info view. (Default: `false`)
- `showGzip`: Show the calculated gzip-compressed size in the detailed info view. (Default: `true`)
- `showGzipInStatusBar`: Show the calculated gzip-compressed size directly in the status bar. (Default: `false`)
- `use24HourFormat`: Use the 24-hour clock format for time display; set to `false` for 12-hour format. (Default: `true`)
- `useDecimal`: Display file sizes using the [SI unit system](https://en.wikipedia.org/wiki/International_System_of_Units); set to `false` to use [IEC's](https://en.wikipedia.org/wiki/Binary_prefix) format. (Default: `false`)

## Contributing

You are welcome to send any issues or pull requests.

Please run eslint in the code and test it with Visual Studio Code before sending changes.

Any bugs? Please file an [issue](https://github.com/mkxml/vscode-filesize/issues/new).

Did something nice with the code? Please send a [pull request](https://github.com/mkxml/vscode-filesize/pulls).

## Authors

- [Matheus Kautzmann](https://github.com/mkxml)

## License

[MIT](LICENSE)
