/**
 *  ACCORDION
 *
 * A lightwight vanilla JS accordion with an exstensible API
 */

// import uuid from 'uuid/v4';
// const uuidV4 = uuid;
/* eslint-disable no-unused-vars */
import arrayFromPolyfill from 'array-from-polyfill';
import onCSSTransitionEnd from 'transition-end';

/**
 * CONSTRUCTOR
 * Initializes the object
 */
class BadgerAccordion {
    constructor(el, options) {
        const container = typeof el === 'string' ? document.querySelector(el) : el;

        // If el is not defined
        if (container == null) {
            return;
        }


        const defaults = {
            headerClass:        '.js-badger-accordion-header',
            panelClass:         '.js-badger-accordion-panel',
            panelInnerClass:    '.js-badger-accordion-panel-inner',
            hiddenClass:        '-ba-is-hidden',
            activeClass:        '-ba-is-active',
            get hidenClass() { return this.hiddenClass; },
            initializedClass:    'badger-accordion--initialized',
            get initalisedClass() { return this.initializedClass; },
            headerDataAttr:     'data-badger-accordion-header-id',
            openMultiplePanels: false,
            openHeadersOnLoad:  [],
            headersClickable:   true,
            headerOpenLabel:    '',
            headerCloseLabel:   '',
            roles:              true
            // toggleEl:            // If you want to use a different element to trigger the accordion
        };

        // Options
        this.settings = Object.assign({}, defaults, options);

        // Setting getting elements
        this.container = container;

        // Selecting children of the current accordion instance
        const children = Array.from(this.container.children);

        // Since the Accordions header button is nested inside an element with class
        // of `badger-accordion__header` it is a grandchild of the accordion instance.
        // In order to have nested accordions we need each to only get all the button
        // elements for this instance. Here an array is created to show all the children
        // of the element `badger-accordion__header`.
        const headerParent = children.filter(header => !header.classList.contains(this.settings.panelClass.substr(1)));

        // Creating an array of all DOM nodes that are Accordion headers
        this.headers = headerParent.reduce((acc, header) => {
            // Gets all the elements that have the headerClass
            const a = Array.from(header.children).filter( child => child.classList.contains( this.settings.headerClass.substr(1) ));

            // Merges the current `badger-accordion__header` accordion triggers
            // with all the others.
            acc = [].concat(...acc, a);

            return acc;
        }, []);

        // Creates an array of all panel elements for this instance of the accordion
        this.panels = children.filter(panel => panel.classList.contains( this.settings.panelClass.substr(1) ));

        this.toggleEl = this.settings.toggleEl !== undefined ? Array.from(this.container.querySelectorAll(this.settings.toggleEl)) : this.headers;


        // This is for managing state of the accordion. It by default sets
        // all accordion panels to be closed
        this.states = [].map.call(this.headers, () => {
            return { state: 'closed' };
        });

        this.ids = [].map.call(this.headers, () => {
            return { id: Math.floor((Math.random() * 1000000) + 1) };
        });

        // This is to ensure that once an open/close event has been fired
        // another cannot start until the first event has finished.
        // @TODO - get this working...
        this.toggling = false;

        // Initiating the accordion
        if( this.container ) {
            this.init();
        } else {
            /* eslint-disable no-console */
            console.log('Something is wrong with you markup...');
        }
    }


    /**
     *  INIT
     *
     *  Initalises the accordion
     */
    init() {
        // Sets up ID, aria attrs & data-attrs
        this._setupAttributes();

        // Setting up the inital view of the accordion
        this._initalState();

        // Setting the height of each panel
        this.calculateAllPanelsHeight();

        // Inserting data-attribute onto each `header`
        this._insertDataAttrs();

        // Adding listeners to headers
        this._addListeners();

        // Adds class to accordion for initalisation
        this._finishInitialization();
    }

    /**
     * CHECK ROLES ETTING
     * @return {[boolean]}
     * Checks roles setting for all roles or a single role.
     * First checks if a `boolean` has been used to set all
     * roles to either true or false. If the setting is an
     * object it will only set the attribute where each
     * attribute has explicitly been set as true, eg;
     * ```
     * roles: {
     *     region: true
     * }
     * ```
     */
    _setRole(role, el) {
        if(typeof this.settings.roles === 'boolean' && this.settings.roles || this.settings.roles[role] !== undefined && this.settings.roles[role] !== false) {
            el.setAttribute('role', role);
        }
    }


    /**
     *  INSERT DATA ATTRS
     *
     *  Updates state object for inital loading of the accordion
     */
    _initalState() {
        // Sets state object as per `this.settings.openHeadersOnLoad`
        const headersToOpen = this.settings.openHeadersOnLoad;

        if (headersToOpen.length) {
            this._openHeadersOnLoad(headersToOpen);
        }

        // Render DOM as per the updates `this.states` object
        this._renderDom();
    }


    /**
     *  INSERT DATA ATTRS
     *
     *  Adds `headerDataAttr` to all headers
     */
    _insertDataAttrs() {
        this.headers.forEach( (header, index) => {
            header.setAttribute(this.settings.headerDataAttr, index);
        });
    }


    /**
     *  FINISH INITALISATION
     *
     *  Adds in `initializedClass` to accordion
     */
    _finishInitialization() {
        this.container.classList.add(this.settings.initializedClass);
        this._setRole('presentation', this.container);
    }


    /**
     *  ADD LISTENERS
     *
     *  Adds click event to each header
     */
    _addListeners() {
        if (! this.settings.headersClickable) return;

        // So we can reference the badger-accordion object inside out eventListener
        const _this = this;

        // Adding click event to accordion
        this.headers.forEach((header, index) => {
            header.addEventListener('click', function() {
                // Getting the target of the click
                // const clickedEl = event.target;

                _this.handleClick(header, index);
            });
        });
    }


    /**
     *  HANDLE CLICK
     *
     *  Handles click and checks if click was on an header element
     *  @param {object} targetHeader - The header node you want to open
     */
    handleClick(targetHeader, headerIndex) {
        // Removing current `.` from `this.settings.headerClass` class so it can
        // be checked against the `targetHeader` classList
        const targetHeaderClass = this.settings.headerClass.substr(1);

        // Checking that the thing that was clicked on was the accordions header
        if (targetHeader.classList.contains(targetHeaderClass) && this.toggling === false) {
            this.toggling = true;

            // Updating states
            this.setState(headerIndex);

            // Render DOM as per the updates `this.states` object
            this._renderDom();
        }
    }


    /**
     *  SET STATES
     *
     *  Sets the state for all headers. The 'target header' will have its state toggeled
     *  @param {object} targetHeaderId - The header node you want to open
     */
    setState(targetHeaderId) {
        const states = this.getState();

        // If `this.settings.openMultiplePanels` is false we need to ensure only one panel
        // be can open at once. If it is false then all panels state APART from the one that
        // has just been clicked needs to be set to 'closed'.
        if (!this.settings.openMultiplePanels) {
            states.filter((state, index) => {
                if (index != targetHeaderId) {
                    state.state = 'closed';
                }
            });
        }

        // Toggles the state value of the target header. This was `array.find` but `find`
        // isnt supported in IE11
        states.filter((state, index) => {
            if (index == targetHeaderId) {
                const newState = this.toggleState(state.state);
                return (state.state = newState);
            }
        });
    }


    /**
     *  RENDER DOM
     *
     *  Renders the accordion in the DOM using the `this.states` object
     */
    _renderDom() {
        // Filter through all open headers and open them
        this.states.filter( (state, index) => {
            if(state.state === 'open') {
                // Opening the current panel but _NOT_ updating the state
                this.open(index, false);
            }
        });

        // Filter through all closed headers and closes them
        this.states.filter( (state, index) => {
            if(state.state === 'closed') {
                // Closing the current panel but _NOT_ updating the state
                this.close(index, false);
            }
        });
    }


    /**
     *  OPEN
     *
     *  Closes a specific panel
     *  @param {integer} headerIndex - The header node index you want to open
     */
    open(headerIndex, setState = true) {
        // 1. If being fired directly the state needs to be updated.
        if(setState) {
            this.setState(headerIndex);
        }

        this.togglePanel('open', headerIndex);
    }


    /**
     *  CLOSE
     *
     *  Closes a specific panel
     *  @param {integer} headerIndex - The header node index you want to close
     */
    close(headerIndex, setState = true) {
        // 1. If being fired directly the state needs to be updated.
        if(setState) {
            this.setState(headerIndex);
        }

        this.togglePanel('closed', headerIndex);
    }


    /**
     *  OPEN ALL
     *
     *  Opens all panels
     */
    openAll() {
        this.headers.forEach((header, headerIndex) => {
            this.togglePanel('open', headerIndex);
        });
    }


    /**
     *  CLOSE ALL
     *
     *  Closes all panels
     */
    closeAll() {
        this.headers.forEach((header, headerIndex) => {
            this.togglePanel('closed', headerIndex);
        });
    }


    /**
     *  GET STATE
     *
     *  Getting state of headers. By default gets state of all headers
     *  @param {string} animationAction - The animation you want to invoke
     *  @param {integer} headerIndex    - The header node index you want to animate
     */
    togglePanel(animationAction, headerIndex) {
        if(animationAction !== undefined && headerIndex !== undefined) {
            if(animationAction === 'closed') {
                // 1. Getting ID of panel that we want to close
                const header        = this.headers[headerIndex];
                const panelToClose  = this.panels[headerIndex];

                // 2. Closeing panel
                panelToClose.classList.add(this.settings.hiddenClass);

                // 3. Removing active classes
                panelToClose.classList.remove(this.settings.activeClass);
                header.classList.remove(this.settings.activeClass);

                // 4. Set aria attrs
                header.setAttribute('aria-expanded', false);

                // 5. Resetting toggling so a new event can be fired
                panelToClose.onCSSTransitionEnd(() => this.toggling = false );
            } else if(animationAction === 'open') {
                // 1. Getting ID of panel that we want to open
                const header      = this.headers[headerIndex];
                const panelToOpen = this.panels[headerIndex];

                // 2. Opening panel
                panelToOpen.classList.remove(this.settings.hiddenClass);

                // 3. Adding active classes
                panelToOpen.classList.add(this.settings.activeClass);
                header.classList.add(this.settings.activeClass);

                // 4. Set aria attrs
                header.setAttribute('aria-expanded', true);

                // 5. Resetting toggling so a new event can be fired
                panelToOpen.onCSSTransitionEnd(() => this.toggling = false );
            }
        }
    }


    // @TODO - is this needed anymore?
    // checkState(headerId) {
    //     let state = this.states[headerId].state;
    //
    //     if(state === 'closed') {
    //         return state;
    //     } else if(state === 'open') {
    //         return state;
    //     }
    // }


    /**
     *  GET STATE
     *
     *  Getting state of headers. By default gets state of all headers
     *  @param {array} headerIds - Id/'s of the headers you want to check
     */
    getState(headerIds = []) {
        if(headerIds.length && Array.isArray(headerIds)) {
            let states = headerIds.map( header => this.states[header] );

            return states;
        } else {
            return this.states;
        }
    }


    /**
     *  TOGGLE STATE
     *
     *  Toggling the state value
     *  @param {string} currentState - Current state value for a header
     */
    toggleState(currentState) {
        if(currentState !== undefined) {
            return (currentState === 'closed') ? 'open' : 'closed';
        }
    }



    /**
     *  HEADERS TO OPEN
     *
     *  Setting which headers should be open when accordion is initalised
     *  @param {array} headersToOpen - Array of ID's for the headers to be open
     */
    _openHeadersOnLoad(headersToOpen = []) {
        if (headersToOpen.length && Array.isArray(headersToOpen)) {
            let headers = headersToOpen.filter(header => header != undefined);

            headers.forEach(header => {
                this.setState(header);
            });
        }
    }


    /**
     *  SET UP ATTRIBUTES
     *
     *  Initalises accordion attribute methods
     */
    _setupAttributes() {
        // Adding ID & aria-controls
        this._setupHeaders();

        // Adding ID & aria-labelledby
        this._setupPanels();

        // Inserting data-attribute onto each `header`
        this._insertDataAttrs();
    }



    /**
     *  SET PANEL HEIGHT - ** DEPRICATED **
     *
     *  Depreicated as this method is becoming public and
     *  I want to name it something that lets devs know
     *  it's not just for using inside the `init()` method.
     */
    _setPanelHeight() {
        this.calculateAllPanelsHeight();
    }



    /**
     *  CALCULATE PANEL HEIGHT
     *
     *  Setting height for panels using pannels inner element
     */
    calculatePanelHeight(panel) {
        const panelInner = panel.querySelector(this.settings.panelInnerClass);

        let activeHeight = panelInner.offsetHeight;

        return panel.style.maxHeight = `${activeHeight}px`;
    }



    /**
     *  CALCULATE PANEL HEIGHT
     *
     *  Setting height for panels using pannels inner element
     */
    calculateAllPanelsHeight() {
        this.panels.forEach(panel => {
            this.calculatePanelHeight(panel);
        });
    }



    /**
     * SET UP HEADERS
     */
    _setupHeaders() {
        this.headers.forEach( (header, index) => {
            header.setAttribute('id', `badger-accordion-header-${this.ids[index].id}`);
            header.setAttribute('aria-controls', `badger-accordion-panel-${this.ids[index].id}`);
        });
    }


    /**
     * SET UP PANELS
     */
    _setupPanels() {
        this.panels.forEach( (panel, index) => {
            panel.setAttribute('id', `badger-accordion-panel-${this.ids[index].id}`);
            panel.setAttribute('aria-labelledby', `badger-accordion-header-${this.ids[index].id}`);
            if(this.settings.roles === true || this.settings.roles.region !== false) {
                this._setRole('region', panel);
            }
        });
    }
}


// Export
export default BadgerAccordion;
