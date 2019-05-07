# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

For more information about keeping good change logs please refer to [keep a changelog](https://github.com/olivierlacan/keep-a-changelog).

## Changelog


## [1.2.3] - 2019-5-7
### UPDATED
 - Security issue with `tar` package

### ADDED
 - Option `addListenersOnInit`. See [PR 26](https://github.com/stuartjnelson/badger-accordion/pull/26) for more info


## [1.2.2] - 2019-2-12
### Fixed
 - Running NPM audit to fix vulnerabilities


## [1.2.1] - 2019-2-9
### Fixed
 - Issue#24: Fixing setting for `hiddenClass` and `initializedClass`


## [1.2.0] - 2019-1-29
### Fixed
 - Issue#16: Properly hiding accordion content for all users
 - Issue#17: Removed aria-label and deprecated `headerOpenLabel` & `headerCloseLabel`
 - Merged in PR from `@micmania1` for the correct spelling of _aria-labelledby_

### Updated
 - Made NPM scripts bit nicer by calling each other. Also now compiling .css

### Added
 - Created the ability to have nested accordions. For this to happen I needed to change how a single accordion instance selected its headers & panels. Now the headers & panels selected are only 1 level deep.


## [1.1.4] - 2018-12-2
### Updated
 - Spelling of `initializedClass` so it is the American spelling


## [1.1.3] - 2018-11-27
### Fixed
 - Fixing demo styles <p>
 - Issue #14: [seanjhulse](https://github.com/seanjhulse) created a PR and patched this so openAll/closeAll works.

### Added
 - Issue #9 Active class to the open header & panel

### Changed
 - Deprecating `setPanelHeight()` in favour better name
   This method was “private” and not named great for it being used after the initialisation IMO. I have now called it `calculateAllPanelsHeight()` which I feel is more descriptive. Also created a method to calculate a single panel’s height `calculatePanelHeight()`. Also updated the docs.
 - Issue #8: Setting the roles.
   By default both the `presentation` role on the container element & `region` on the panel will be set. You can now using turn them both off `roles: false` or explicitly set one or both of the roles to be set.

   ```
     roles: {
       region: true
     }
   ```  
 - Issue #10 - Moved packages to devDependencies and cleaned up package.json


## [1.1.3] - 2018-11-26
### Updated
 - `_openHeadersOnLoad()` updates state with method
 - Updated NPM scripts

### Fixed
 - Issue#20: `Open()` & `Close()` methods were not correctly updating state and therefore if fired upon start the whole state object was incorrect and using the accordion was impossible.


## [1.1.2] - 2018-8-7
### Updated
 - Discarding some temporary changes


## [1.1.1] - 2018-6-12
### Updated
 - LICENSE so its correct...


## [1.1.0] - 2018-4-30
### Updated
 - Plugin so can now pass in a DOM node
 - README & example files
 - Tweaking minor Firefox CSS bug with the demo


## [1.0.30] - 2018-4-4
### Updated
 - NPM version


## [1.0.29] - 2018-4-4
### Updated
 - Deprecated `hidenClass` option. This was a spelling mistake and has been deprecated. If you have used in from version < 1.0.28 then `hiddenClass` is now equal to `hidenClass`
 - Compiled assets and updated readme


## [1.0.28] - 2018-4-4
### Updated
 - Updated default transition to be more specific


## [1.0.27] - 2018-4-4
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
