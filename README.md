# Badger Accordion
An accessible vanilla JS accordion with extensible API


## The Idea
 - To make an accessible, animated, accordion with an extensible API
 - Make it using just plain vanilla JS
 - Ensure that it has just plain simple css. Enough to get it to work. Not too much that you have to spend ages overwriting it.


## Basic Setup

Firstly create the markup for your accordion. As a bare minimum you will need to create;

 * A container with your accordion class. Eg `js-badger-accordion`
 * A button (you could use another element but you should use a `button`) with your accordion header class. Eg `js-badger-accordion-header`
 * A panel with your accordion panel class. Eg `js-badger-accordion-panel`. This panel will need to have as a bare minimum `overflow: hidden` set.
 * A inner panel element. Eg `js-badger-accordion-panel-inner`

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

I have created some basic vanilla CSS styles to help you with creating an accordion. Using them will save some time!

```
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
```


Add Javascript & CSS source files
```
<script type="text/javascript" src="path/to/accordion.js"></script>

<link rel="stylesheet" type="text/css" href="path/to/accordion.css"/>
```

Just need to initalise a new instance of the accordion.
```
<script type="text/javascript">
    const accordion = new
</script>    
```


## Options ##

| Option             | Type    | Default                            | Description |
| ---                | ---     | ---                                | ---   |
| headerClass        | String  | `.js-badger-accordion-header`      | Class for panel's header  |
| panelClass         | String  | `.js-badger-accordion-panel`       | Class for panel  |
| panelInnerClass    | String  | `.js-badger-accordion-panel-inner` | Class for panel inner container  |
| hidenClass         | String  | `is-hidden`                        | Class added to panels that are hidden  |
| initalisedClass    | String  | `badger-accordion--initalised`     | Class add to accordion when it has initalised   |
| headerDataAttr     | String  | `data-badger-accordion-header-id`  | Data attribute on each header   |
| openMultiplePanels | Boolean | `false`                              | Give you the ability to have mutiple panels open at one time. By default this is disabled  |
| openHeadersOnLoad  | Array   | `[] `                                | Give you ability to specify a panel/s on initalisation  |


## Methods ##

The accordion has a series of methods allowing you to have full control over extending the plugin. For example if you wanted to close all your accordion's panels;

```
accordion.closeAll();
```


### Questions ###
1. Is my table logical below?
2. The id's are pretty crazy. Should you be able to target a panel/header by just its number in the node list. Say to open a panel just write `accordion.open(2)`. Should I document my _private_methods_?

| Method          | Arguments            | Description |
|---              |---                   |---          |
| `getState()`    | headerId/s - `array` | Returns the state of a panel/s by passing in the _node list id_.|
| `getHeaderId()` | header               |             |
| `open()`        | header               |
| `close()`       | header               | Closes a header
| `openAll()`     |                      | Opens all accordion panels
| `closeAll()`    |                      | Closes all accordion panels
|   |   |   |
|   |   |   |
|   |   |   |
|   |   |   |
|   |   |   |
|   |   |   |
|   |   |   |
|   |   |   |
|   |   |   |



### Private methods ###
 - _addListeners()
 - _finishInitalisation()
 - _initalState()

### Should be private methods? ###
 - insertDataAttrs()
 - setPanelHeight()
 - setStates(targetHeaderId)
 - setupHeaders()
 - setupPanels()
 - setupAttributes()
 - openHeadersOnLoad(headersToOpen)
 - renderDom()
 - | `togglePanel()` | animationAction, header |
 - | `toggleState()`                      | state      



### To Dos
 - Create IE9 compaitable version
