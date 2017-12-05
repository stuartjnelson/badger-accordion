# Badger Accordion
An accessible light weight, vanilla JavaScript accordion with an extensible API. Just 8.17kb Gzipped (2.49kb).
<br>
[Codepen demo](https://codepen.io/stuartjnelson/full/WZpxqY)
<br>

**Contents**
  - [The idea](#the-idea)
    - [Key terminologies](#key-terminologies)
  - [Basic setup](#basic-setup)
    - [How to use the plugin](#how-to-use-the-plugin)
    - [Styles](#styles)
  - [Options](#options)
  - [Methods](#methods)
  - [Sponsors](#sponsors)
  - [Contributors](#contributors)
  - [Roadmap](#roadmap)


## The idea
 - To make an accessible, animated, accordion with an extensible API.
 - Make it using just plain vanilla JavaScript.
 - Ensure that it has just plain simple css. Enough to get it to work. Not too much that you have to spend ages overwriting it.
 - Ensure that it is accessible as possible.


## Key terminologies
 - `panel`  - The section of the accordion than opens and closes
 - `header` - The button that opens an accordion panel


## Basic setup
You'll need to import the plugin and create a new instance so you can use it. There is a working example in the `example` directory (shock horror!) if you'd like something to reference.

 1. Import `badger-accordion.js`
 2. Create new instance of the accordion
 3. Include the basic styles (which are in `dist/badger-accordion.css` or `dist/badger-accordion.css`)

I'd recommend also importing the `Array.from` pollyfill so that your accordion will work for IE9+. The [pollyfill](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#Polyfill) only adds `0.93kb` (`0.34kb` gzipped).
```
import pollyfill from 'array-from-pollyfill';
import BadgerAccordion from 'badger-accordion';

// Creating a new instance of the accordion
const accordion = new BadgerAccordion('.js-badger-accordion');
```

Next you'll want to create your markup. This is the minimum markup you will need for your accordion. You can use any html elements you would like but you will need to follow the nesting in the example below. I have included the selector `badger-accordion__panel` as I feel it is best to use separate selectors for targeting an element with JavaScript and CSS.
```
<dl class="js-badger-accordion">
    <dt>
        <button class="js-badger-accordion-header">
            Header Content
        </button>
    </dt>
    <dd class="badger-accordion__panel js-badger-accordion-panel">
        <div class="js-badger-accordion-panel-inner">
            Panel Content
        </div>
    </dd>
</dl>
```

#### Styles
I have created some simple CSS styles to help you with creating an accordion which are in `dist/badger-accordion-demo.css` or `dist/badger-accordion-demo.scss`. If you'd like some additional styles checkout the example dir.



## Options

The accordion has a selection of options that you can overwrite. For example if you wanted to open the first and 4th panel when the accordion is initalised;

```
new BadgerAccordion('.js-badger-accordion', {
    openHeadersOnLoad: [0, 3]    
});
```

| Option             | Type    | Default                            | Description |
|---                 |---      |---                                 |---          |
| headerClass        | String  | `.js-badger-accordion-header`      | Class for panel's header |
| panelClass         | String  | `.js-badger-accordion-panel`       | Class for panel  |
| panelInnerClass    | String  | `.js-badger-accordion-panel-inner` | Class for panel inner container  |
| hidenClass         | String  | `is-hidden`                        | Class added to panels that are hidden  |
| initalisedClass    | String  | `badger-accordion--initalised`     | Class add to accordion when it has initalised   |
| headerDataAttr     | String  | `data-badger-accordion-header-id`  | Data attribute on each header   |
| openMultiplePanels | Boolean | `false`                            | Give you the ability to have mutiple panels open at one time. By default this is disabled  |
| headerOpenLabel    | String  | `Accordion open button`            | Value for header's `aria-label` when button is closed |
| headerCloseLabel   | String  | `Accordion close button`           | Value for header's `aria-label` when button is open  |



## Methods

The accordion has a series of methods allowing you to have full control over extending the plugin. For example if you wanted to close all your accordion's panels;

```
accordion.closeAll();
```

| Method          | Arguments            | Description | Example |
|---              |---                   |---          |---          |
| `getState()`    | headerId/s - `array` | Returns the state of a panel/s by passing in the _node item index/s_ as an array. |  Getting a single Id. `accordion.getState([0])`. <br> Getting multiple header's state `accordion.getState([0, 1, 2])` |
| `open()`        | headerIndex          | Opens a given panel using its `headerIndex`. Eg; ` accordion.open( 0 );` ||
| `close()`       | headerIndex          | Closes a given panel using its `headerIndex`. Eg; ` accordion.close( 0 );` ||
| `togglePanel()` | animationAction, headerIndex | Toggles panel into opening or closing. `animationAction` is either `open` or `closed`. ||
| `openAll()`     |                      | Opens all accordion panels   ||
| `closeAll()`    |                      | Closes all accordion panels  ||


## Sponsors
A massive thanks to [BrowserStack](https://www.browserstack.com) for supporting me by allowing me to use their platform for free. BrowserStack is a cloud based testing tool that lets you test websites on a wide range web browsers and real mobiles devices. This removes all the hassle of installing chunky VM's. BrowserStack has some great tools such as automated testing, testing local sites (via a browser extension) and taking screenshots.
![BrowserStack logo](https://digitalscientists.com/system/images/1448/original/logo-browserstack.png)


## Contributors
I've had some awesome people help me out building the accordion. I worked in part on this while working at [Mr B & Friends](https://www.mrbandfriends.co.uk/) big shout out to the digital team there. This wouldn't be anywhere near as good if it wasn't for the wise words of [Dave Smith](https://github.com/getdave). Finally my favourite digital designer [Taavi Kelle](https://twitter.com/taavetkelle) who gave my demo styles _some love_ <sup>Steve Richardson™</sup>.


## Roadmap
 - General performance & naming review
 - Create some mixins to help making custom themes quicker & easier
 - Create option for callback methods on each public method
 - Export an IE9 safe version in the repo
 - Create horizontal accordion option
