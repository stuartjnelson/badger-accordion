# Badger Accordion
An accessible vanilla JavaScript accordion with an extensible API


## The idea
 - To make an accessible, animated, accordion with an extensible API.
 - Make it using just plain vanilla JavaScript.
 - Ensure that it has just plain simple css. Enough to get it to work. Not too much that you have to spend ages overwriting it.
 - Ensure that it is accessible as possible.


## Key terminologies
 - `panel`  - The section of the accordion than opens and closes
 - `header` - The button that opens an accordion panel


## Basic setup

Firstly create the markup for your accordion. As a bare minimum you will need to create;

 * A container with your `accordion class`. This is required and will be passed into your accordion instance.
    * Default `accordion class`: `js-badger-accordion`.
 * A button with your accordion header class.
    * Default: `js-badger-accordion-header`.
 * A panel with your accordion panel class. This panel will need to have as a bare minimum css of having `overflow: hidden` set.
    * Default: `js-badger-accordion-panel`.
 * A inner panel element.
    * Default: `js-badger-accordion-panel-inner`.

### Basic markup example
Include Javascript & CSS source files
```
<script type="text/javascript" src="path/to/accordion.js"></script>

<link rel="stylesheet" type="text/css" href="path/to/accordion.css"/>
```

Create your markup. This is the minimum markup you will need for your accordion.
```
<dl class="js-badger-accordion">
    <dt>
        <button class="js-badger-accordion-header">
            <!-- Header Content -->
            Header
        </button>
    </dt>
    <dd class="js-badger-accordion-panel" style="overflow: hidden">
        <div class="js-badger-accordion-panel-inner">
            <!-- Panel Content -->
            Panel
        </div>
    </dd>
</dl>
```

#### Full basic example
I have created some basic vanilla CSS styles to help you with creating an accordion. Using this will save you some time. You can use the `scss`; this way you can take advantage of the `scss variables` and `mixins`
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Badger Accordion</title>

    <link rel="stylesheet" type="text/css" href="path/to/accordion.css"/>
</head>
<body>
    <dl class="badger-accordion js-badger-accordion">
        <dt>
            <button class="badger-accordion__header js-badger-accordion-header">
                <div class="badger-accordion__header-title">
                    Accordion Header
                </div>
                <div class="badger-accordion__header-icon">
                </div>
            </button>
        </dt>
        <dd class="badger-accordion__panel js-badger-accordion-panel">
            <div class="badger-accordion__panel-inner js-badger-accordion-panel-inner">
                Panel content
            </div>
        </dd>
    </dl>

    <script type="text/javascript" src="path/to/accordion.js"></script>
    <script type="text/javascript" src="path/to/accordion.js"></script>
</body>
</html>
```


Just need to initalise a new instance of the accordion.
```
<script type="text/javascript">
    const accordion = new BadgerAccordion('.js-badger-accordion');
</script>    
```


## Options

The accordion has a selection of options that you can overwrite. For example if you wanted to open the first and 4th panel when the accordion is initalised;

```
new BadgerAccordion('.js-badger-accordion', {
    openHeadersOnLoad: [0, 3]    
});
```

### Options
| Option             | Type    | Default                            | Description |
| ---                | ---     | ---                                | ---   |
| headerClass        | String  | `.js-badger-accordion-header`      | Class for panel's header  |
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


### Questions ###
1. Is my table logical below?
2. The id's are pretty crazy. Should you be able to target a panel/header by just its number in the node list. Say to open a panel just write `accordion.open(2)`. Should I document my _private_methods_?
3. At the top should I have a list of terminologies?

| Method          | Arguments            | Description | Example |
|---              |---                   |---          |---          |
| `getState()`    | headerId/s - `array` | Returns the state of a panel/s by passing in the _node item index/s_ as an array. |  Getting a single Id. `accordion.getState([0])`. <br> Getting multiple header's state `accordion.getState([0, 1, 2])` |
| `open()`        | headerIndex          | Opens a given panel using its `headerIndex`. Eg; ` accordion.open( 0 );`
| `close()`       | headerIndex          | Closes a given panel using its `headerIndex`. Eg; ` accordion.close( 0 );`
| `togglePanel()` | animationAction, headerIndex | Toggles panel into opening or closing. `animationAction` is either `open` or `closed`.
| `openAll()`     |                      | Opens all accordion panels
| `closeAll()`    |                      | Closes all accordion panels



### Roadmap
 - Create option for callback methods on each public method
 - Export an IE9 safe version in the repo
 - Create horizontal accordion option
