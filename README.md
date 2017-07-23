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


## Methods

The accordion has a series of methods allowing you to have full control over extending the plugin.

 - _addListeners()
 - _finishInitalisation()
 - _initalState()

 - checkState(headerId)
 - getState(headerIds)
 - getHeaderId(header)

 - open(header)
 - close(header)
 - openAll()
 - closeAll()
 - togglePanel(animationAction, header)
 - toggleState(currentState)

 - insertDataAttrs()
 - setPanelHeight()
 - setStates(targetHeaderId)
 - setupHeaders()
 - setupPanels()
 - setupAttributes()
 - openHeadersOnLoad(headersToOpen)
 - renderDom()
