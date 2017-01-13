# filesize package for Visual Studio Code

This package is intended for use with the [Visual Studio Code](https://code.visualstudio.com) editor and it displays the size of the focused file in the status bar of the editor.

**Bonus:** If you click on the status bar component it will display more information about the file!

## Installation

In VS Code, press Ctrl-P or Cmd-P (Mac) and type in `ext install vscode-filesize`. Click install in the left bar. Once the extension is installed you will be prompted to restart Visual Studio Code.

Or you can just search for `filesize` in the extension search bar inside the editor.

## Screenshots

`filesize` with the status bar component active:

![status bar component](https://cldup.com/_Y52O-UfkK.jpg)

### Detailed view

`filesize` with the detailed info panel open:

![detailed info](https://cldup.com/jznOci4OIP.jpg)

## Settings

This package has two user configurable settings:

- `useKibibyteRepresentation`: set to `true` if you want your size data to be displayed according to [IEC's](https://en.wikipedia.org/wiki/Binary_prefix) format (default), set to `false` if you want it to be displayed in the [SI unit system](https://en.wikipedia.org/wiki/International_System_of_Units).
- `use24HourFormat`: set to `true` to use the 24-hour clock, set to `false` to use the 12-hour clock.

## Contributing

You are welcome to send any issues or pull requests.

Please run eslint in the code and test it with Visual Studio Code before sending changes.

Any bugs? Please file an [issue](https://github.com/mkxml/vscode-filesize/issues/new).

Did something nice with the code? Please send a [pull request](https://github.com/mkxml/vscode-filesize/pulls).

## Authors

- [Matheus Kautzmann](https://github.com/mkxml)

## License

[MIT](LICENSE)
