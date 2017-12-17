# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

For more information about keeping good change logs please refer to [keep a changelog](https://github.com/olivierlacan/keep-a-changelog).

## Changelog

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
