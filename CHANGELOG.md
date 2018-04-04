# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

For more information about keeping good change logs please refer to [keep a changelog](https://github.com/olivierlacan/keep-a-changelog).

## Changelog


## [1.0.27] - 2018-3-22
### Updated
 - Improving SCSS comment
 - Updated rollup so default example styles are copied by rollup


## [1.0.26] - 2018-3-22
### Updated
 - NPM version


## [1.0.25] - 2018-4-4
### Updated
 - Dependancies
 - Updated essential SCSS/CSS. Renamed default hidden class. Removed some old unnecessary css.
 - Updated example SCSS
 - Ignored .sass-cache
 - Compiled assets


## [1.0.24] - 2018-3-22
### Updated
 - And this time updated `.babelrc`'s preset


## [1.0.23] - 2018-3-22
### Updated
 - Bable setup so it follows the latest standard as well as all dependencies. This should fix [Issue #4](https://github.com/stuartjnelson/badger-accordion/issues/4)


## [1.0.22] - 2018-3-21
### Changed
 - Adding `pre-pubish` npm script. This is a safty net to stop issues with `.esm` file that the `npm example` script was causing before publishing the plugin


## [1.0.21] - 2018-3-21
### Fixed
 - Fixing typo in `package.json` for module
 - Error with `npm run example` from inserting code don't want into `dist/northern-badger.esm.js`

### Added
 - Added `rollup-plugin-copy` to copy style files


## [1.0.20] - 2018-2-08
### Fixed
 - Fixed link to demo site in Readme


## [1.0.19] - 2018-1-31
### Updated
 - NPM version


## [1.0.18] - 2018-1-31
### Added
 - Added rol=“region” to accordion panel
 - Added rol=“presentation” to accordion

### Updated
 - Updated README
 - Compiled assets
 - Moved setAttributes method up


## [1.0.17] - 2018-1-1
### Updated
 - Importing array.from polyfill by default
 - Updated copy with new file size!


## [1.0.16] - 2018-1-1
### Updated
 - Tweaked example demo markup and styles
 - Updated packages for Rollup. Now have `umd` & `esm` versions transpiled

### Added
 - Created .esm files


## [1.0.15] - 2017-12-16
### Updated
 - Improving readme


## [1.0.14] - 2017-12-13
### Fixed
 - Fixed IE11 bug with object assign

### Updated
 - Babel plugins to fix IE11 bug
 - Updated README.md with download info


## [1.0.13] - 2017-12-12
### Fixed
 - Updated transitionEnd JS to ensure that `Object.defineProperty` is writable

### Updated
 - Updated issue template


## [1.0.12] - 2017-12-11
### Fixed
 - Issue #1: Conflict with jQuery as [raised here](https://github.com/stuartjnelson/badger-accordion/issues/1#issuecomment-350789280). After some investigation I found this [thread](https://stackoverflow.com/questions/21729895/jquery-conflict-with-native-prototype) - I updated the “transitionEnd” functions. This appears to have fixed the issue.

### Added
 - Main `dist/badger-accordion.js` is now not minifed and added a minifed version in `dist` directory.

### Updated
 - `rollup.config.js` so that srcmaps aren't included with complied JS files.


## [1.0.0] to [1.0.11] - 2017-12-11
### Added/Updated/Fixed
 - Just added this change log. Wont detail whats happened until now. Released the plugin and updated a bunch of things.
