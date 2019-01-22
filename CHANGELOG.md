## 2.1.2 - Updated dependencies
- Updated dependencies
## 2.1.1 - Fixed useDecimal comment and updates dependencies
- useDecimal comment is now indicating the use of the boolean config correctly. Thanks to @matthewfarlymn!
- Updated dependencies.
## 2.1.0 - Changed keyboard shortcut, updates dependencies
- We have a new keyboard shortcut for opening detailed info (Ctrl+Shift+') on Windows/Linux and (Cmd+Shift+') on Mac. Thanks @gonssal for the heads up!
- Updated dependencies
## 2.0.0 - Quicker, keyboard shortcut, absolute file info, new icon and more
- Extension now has an icon thanks to @coliff!
- Absolute file info now shows in the detailed view.
- Keyboard shortcut to toggle detailed view is now available. See README.
- Added `showGzip` config to enable toggling gzip info in detailed view.
- Changed `useKibibyteRepresentation` config to `useDecimal`, now set to `false` by default.
- Slightly faster code and bug fixes.

## 1.1.0 - Panel support and some fixes
- **Panel support!** Now the extension should have no problems dealing with more than one panel in screen. The focused one is considered active.
- Status bar element now keeps its place. Some users were experiencing problems when there were other
extensions present in the status bar. Place switching often occured, now we set a priority of 1 to the status-bar component so it should stay in place.
- Fixed bug where info would not appear after visiting certain parts of the editor and coming back like settings and etc.
- Fixed bug when switching files quickly would lead to file info queries being stacked, now new calls cancel old ones.

## 1.0.0 - First Version
- The first version of `vscode-filesize` is here!