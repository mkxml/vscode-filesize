## 1.1.0 - Panel support and some fixes
- **Panel support!** Now the extension should have no problems dealing with more than one panel in screen. The focused one is considered active.
- Status bar element now keeps its place. Some users were experiencing problems when there were other
extensions present in the status bar. Place switching often occured, now we set a priority of 1 to the status-bar component so it should stay in place.
- Fixed bug where info would not appear after visiting certain parts of the editor and coming back like settings and etc.
- Fixed bug when switching files quickly would lead to file info queries being stacked, now new calls cancel old ones.

## 1.0.0 - First Version
- The first version of `vscode-filesize` is here!