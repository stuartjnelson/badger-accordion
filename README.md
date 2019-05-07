# Badger Accordion
![Badger Accordion logo](http://ba.northernbadger.co.uk/images/badger-accordion-logo--half.png)
<br>
An accessible light weight, vanilla JavaScript accordion with an extensible API. Just 8.71kb and Gzipped 2.6kb!

<br>

 - [Demo site](http://ba.northernbadger.co.uk)    
 - [Codepen demo](https://codepen.io/stuartjnelson/full/WZpxqY)

---

**Contents**
  - [The idea](#the-idea)
    - [Key terminologies](#key-terminologies)
  - [Basic setup](#basic-setup)
    - [Download plugin](#download-plugin)
    - [Markup](#markup)
    - [Styles](#styles)
    - [Create new instance of Badger Accordion](#create-new-instance-of-badger-accordion)
    - [Create multiple instances of Badger Accordion](#create-multiple-instances-of-badger-accordion)
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
### Download plugin
You can download the plugin using NPM or direct download from Github
*   **NPM:**`npm i badger-accordion`
*   **Yarn:**`yarn add badger-accordion`
*   **Direct download:**[Direct download link](https://github.com/stuartjnelson/badger-accordion/archive/master.zip)

You'll need to import the plugin and create a new instance so you can use it. There is a working example in the `example` directory (shock horror!) if you'd like something to reference.

 1. Create your markup
 2. Include the basic styles (which are in `dist/badger-accordion.css` or `dist/badger-accordion.css`)
 3. Import `badger-accordion.js`
 4. Create new instance of the accordion

### Markup
There is no fixed structure required for your markup, in my examples I have used a dl (as the WAI-ARIA Authoring Practices guide used it in their example). You will need to add 5 selectors for the plugin to work. The selectors listed below are the default selectors but can all be over written using the plugins [options](#options).

 1. The containing element, dl, .js-badger-accordion
 2. The header element, button, .js-badger-accordion-header
 3. The panel element, dd, .js-badger-accordion-panel
 4. The panel inner element, div, .js-badger-accordion-panel-inner
 5. The panel element for targeting with CSS, div, .badger-accordion__panel .

While you could use the selector from point 3 I would not recommend doing this. For keeping everything nice and separated best to use a different selector for targeting with CSS & JS.
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

### Styles
I have created some simple CSS styles to help you with creating an accordion which are in `dist/badger-accordion-demo.css` or `dist/badger-accordion-demo.scss`. If you'd like some additional styles checkout the example dir.
```
.badger-accordion__panel {
    max-height: 75vh;
    overflow: hidden;
}

.badger-accordion__panel.-ba-is-hidden {
    max-height: 0 !important;
    visibility: hidden;
}

.badger-accordion--initialized .badger-accordion__panel {
    transition: all ease-in-out 0.2s;
}
```

### Create new instance of Badger Accordion
You just import Badger Accordion. Then you can either pass in a DOM node or CSS Selector. Passing in a DOM node as in the first example below is the best way to create a new instance.

Please note that currently the [Array.from polyfill](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#Polyfill) is being included as standard (but wrapped in a conditional check). If this is an issue for you or you have an awesome idea of how to include it please get in touch.
```
import BadgerAccordion from 'badger-accordion';

// Creating a new instance of the accordion
const accordionDomNode = document.querySelector('.js-badger-accordion');

const accordion = new BadgerAccordion(accordionDomNode);
```





### Create multiple instances of Badger Accordion
If you want to have multiple instances of the accordion in the same document you could do it like this by looping over the collection of DOM nodes.
```
<!-- HTML -->
<dl class="badger-accordion js-badger-accordion">
    <!-- Your markup -->
</dl>

<dl class="badger-accordion js-badger-accordion">
    <!-- Your markup -->
</dl>

<dl class="badger-accordion js-badger-accordion">
    <!-- Your markup -->
</dl>
```

```
// Importing accordion
import BadgerAccordion from 'dist/badger-accordion';

const accordions = document.querySelectorAll('.js-badger-accordion');

Array.from(accordions).forEach((accordion) => {
    const ba = new BadgerAccordion(accordion);

    // console.log(ba.getState([0]));
});
```


### Create a nested accordion
With release [1.2.0](https://github.com/stuartjnelson/badger-accordion/releases/tag/1.2.0) you can now created nested accordions. You don't need to do anything for this to work. Currently is you close a parent accordion then the child accordion will retain the previous state. Eg. if your child accordion has it's second item open, you close the parent then reopen the child accordion again it will have it's second item still open.




## Options

The accordion has a selection of options that you can overwrite. For example if you wanted to open the first and 4th panel when the accordion is initialized;

```
new BadgerAccordion('.js-badger-accordion', {
    openHeadersOnLoad: [0, 3],
    roles: {
        region: true
    }    
});
```

| Option             | Type    | Default                            | Description |
|---                 |---      |---                                 |---          |
| headerClass        | String  | `.js-badger-accordion-header`      | Class for panel's header |
| panelClass         | String  | `.js-badger-accordion-panel`       | Class for panel  |
| panelInnerClass    | String  | `.js-badger-accordion-panel-inner` | Class for panel inner container  |
| hiddenClass        | String  | `-ba-is-hidden`                    | Class added to panels that are hidden  |
| initializedClass    | String  | `badger-accordion--initialized`     | Class add to accordion when it has initialized   |
| headerDataAttr     | String  | `data-badger-accordion-header-id`  | Data attribute on each header   |
| openMultiplePanels | Boolean | `false`                            | Give you the ability to have mutiple panels open at one time. By default this is disabled  |
| roles              | Boolean or Object | `true`                   | Controls setting `presentation` role on the container element & `region` on the panel. By using a boolean value you will set both attributes. By settings this as an object you will be explicitly setting only that role. Any roles not included in the object will not be set. In the example above only the `region` role will be set. |
| addListenersOnInit   | Boolean  | `false`            | If set to `true` _EventListeners_ will not be added to each accordion header on initialization |
| hidenClass         | @Deprecated  | @Deprecated                   | This was a spelling mistake and has been deprecated. If you have used in from version < 1.0.29 then `hiddenClass` is now equal to `hidenClass`  |
| headerOpenLabel    | @Deprecated  | @Deprecated            | Aria lable has been removed see `Changelog.md` 1.1.5 |
| headerCloseLabel   | @Deprecated  | @Deprecated            | Aria lable has been removed see `Changelog.md` 1.1.5  |



## Methods

The accordion has a series of methods allowing you to have full control over extending the plugin. For example if you wanted to close all your accordion's panels;

```
accordion.closeAll();
```

| Method          | Arguments            | Description | Example |
|---              |---                   |---          |---          |
| `init()`        |                      | Fires off all methods needed to initialise the accordion. Can be used again after to re-initialise ||
| `getState()`    | headerId/s - `array` | Returns the state of a panel/s by passing in the _node item index/s_ as an array. |  Getting a single Id. `accordion.getState([0])`. <br> Getting multiple header's state `accordion.getState([0, 1, 2])` |
| `open()`        | headerIndex          | Opens a given panel using its `headerIndex`. Eg; ` accordion.open( 0 );` ||
| `close()`       | headerIndex          | Closes a given panel using its `headerIndex`. Eg; ` accordion.close( 0 );` ||
| `togglePanel()` | animationAction, headerIndex | Toggles panel into opening or closing. `animationAction` is either `open` or `closed` ||
| `openAll()`     |                      | Opens all accordion panels   ||
| `closeAll()`    |                      | Closes all accordion panels  ||
| `calculatePanelHeight()` |             | Calculates and sets a single panels height ||
| `calculateAllPanelsHeight()` |         | Calculates and sets all panels height      ||


## Sponsors
A massive thanks to [BrowserStack](https://www.browserstack.com) for supporting me by allowing me to use their platform for free. BrowserStack is a cloud based testing tool that lets you test websites on a wide range web browsers and real mobiles devices. This removes all the hassle of installing chunky VM's. BrowserStack has some great tools such as automated testing, testing local sites (via a browser extension) and taking screenshots.
![BrowserStack logo](https://digitalscientists.com/system/images/1448/original/logo-browserstack.png)


## Contributors
I've had some awesome people help me out building the accordion. I worked in part on this while working at [Mr B & Friends](https://www.mrbandfriends.co.uk/) big shout out to the digital team there. This wouldn't be anywhere near as good if it wasn't for the wise words of [Dave Smith](https://github.com/getdave). Finally my favourite digital designer [Taavi Kelle](https://twitter.com/taavetkelle) who created the AWESOME logo and gave my demo styles _some love_ <sup>Steve Richardson™</sup>.

Also to the following awesome people who have submitted PR's
 - [ikenfin](https://github.com/ikenfin)
 - [micmania1](https://github.com/micmania1)
 - [seanjhulse](https://github.com/seanjhulse)
 - [elbojoloco](https://github.com/elbojoloco)


## Roadmap
 - General performance & naming review
 - Create some mixins to help making custom themes quicker & easier
 - Create option for callback methods on each public method
 - Export an IE9 safe version in the repo
 - Create horizontal accordion option
