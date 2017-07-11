/**
 *  ACCORDION
 *
 * A lightwight vanilla JS accordion with an exstensible API
 */

// import applyMixins from 'apply-mixins';
// import triggerCallback from 'mixins/trigger-callback';

/**
 * CONSTRUCTOR
 * initialises the object
 */
class BadgerAccordion {
    constructor(options) {

        const defaults = {
            container:         '.js-badger-accordion',
            header:            '.js-badger-accordion-header',
            panel:             '.js-badger-accordion-panel',
            panelInner:        '.js-badger-accordion-panel-inner',
            activeClass:       'is-active',
            hidenClass:        'is-hidden',
            initalisedClass:   'badger-accordion--initalised',
            headerDataAttr:    'data-badger-accordion-header-id',
            openAllPanels:     false,
            openHeadersOnLoad: []
        };

        // Options
        this.settings = Object.assign({}, defaults, options);

        // Setting getting elements
        this.container = document.querySelector(this.settings.container) !== undefined ? document.querySelector(this.settings.container) : undefined;
        this.headers   = document.querySelectorAll(this.settings.header);
        this.panels    = document.querySelectorAll(this.settings.panel);

        // This is for managing state of the accordion. It by default sets
        // all accordion panels to be closed
        this.states = [].map.call(this.headers, (header) => {
            return {state: 'closed'};
        });

        // This is to ensure that once an opne/close event has been fired
        // another cannot start until the first event has finished.
        // @TODO - get this working...
        this.toggling = false;

        // Initiating the accordion
        if( this.container !== null ) {
            this.init();
        } else {
            console.log('Something is wrong with you markup...');
        }
    }


    /**
     *  INSERT DATA ATTRS
     *
     *  Updates state object for the inital loading of the accordion
     */
    init() {
        // Setting up the inital view of the accordion
        this.initalState();


        // Setting the height of each panel
        this.setPanelHeight();


        // Adding listeners to headers
        this.addListeners();


        this.finishInitalisation();
    }


    /**
     *  INSERT DATA ATTRS
     *
     *  Updates state object for inital loading of the accordion
     */
    initalState() {
        // Sets state object as per `this.settings.openHeadersOnLoad`
        this.openHeaders(this.settings.openHeadersOnLoad);

        // Render DOM as per the updates `this.states` object
        this.renderDom();
    }


    /**
     *  INSERT DATA ATTRS
     *
     *  Adds `headerDataAttr` to all headers
     */
    insertDataAttrs() {
        this.headers.forEach( (header, index) => {
            header.setAttribute(this.settings.headerDataAttr, index);
        });
    }


    /**
     *  FINISH INITALISATION
     *
     *  Adds in `initalisedClass` to accordion
     */
    finishInitalisation() {
        document.querySelector(this.settings.container).classList.add(this.settings.initalisedClass);
    }


    /**
     *  ADD LISTENERS
     *
     *  Adds click event to each header
     */
    addListeners() {
        // So we can reference the badger-accordion object inside out eventListener
        const _this = this;

        // Adding click event to accordion
        // document.querySelector(this.settings.container).addEventListener('click', function(event) {
        //     // Getting the target of the click
        //     let clickedEl = event.target;
        //
        //     _this.handleClick(clickedEl);
        // });
        this.headers.forEach(header => {
            header.addEventListener('click', e => {
                e.preventDefault();

                this.handleClick(header);
            });
        });
    }


    /**
     *  HANDLE CLICK
     *
     *  //TODO - Add comment
     *  @param {object} targetHeader - The header node you want to open
     */
    handleClick(targetHeader) {
        // Removing current `.` from `this.settings.header` class so it can
        // be checked against the `targetHeader` classList
        //let targetHeaderClass = this.settings.header.substr(1);

        // Checking that the thing that was clicked on was the accordions header
        //if( targetHeader.classList.contains(this.settings.header.substr(1)) ) {
            // Getting data-ID of the header that has been clicked on
            let headerId = this.getHeaderId(targetHeader);

            // Updating states
            this.setStates(headerId);

            // Render DOM as per the updates `this.states` object
            this.renderDom();
        //} else {
            // console.log('it isnt the header!');
        //}
    }


    /**
     *  SET STATES
     *
     *  Sets the state for all headers. The 'target header' will have its state toggeled
     *  @param {object} targetHeaderId - The header node you want to open
     */
    setStates(targetHeaderId) {
        let states = this.getState();

        // TODO - improve this comment
        // If `this.settings.openAllPanels` is false we need to ensure only one panel
        // be can open at once. This will the state on all but the target header to 'closed'
        if(!this.settings.openAllPanels) {
            states.filter( (state, index) => {
                if(index != targetHeaderId) {
                    state.state = 'closed';
                }
            });
        }

        // Toggles the state value of the target header
        states.find( (state, index) => {
            if(index == targetHeaderId) {
                // TODO - is this a `const` or `let`?
                const newState = this.toggleState(state.state);
                return state.state = newState;
            }
        });
    }


    /**
     *  RENDER DOM
     *
     *  Renders the accordion in the DOM using the `this.states` object
     */
    renderDom() {
        let states = this.getState();


        // Sets up ID, aria attrs & data-attrs
        this.setupAttributes();


        // Filter through all open headers and open them
        this.states.filter( (state, index) => {
            if(state.state === 'open') {
                let header = this.headers[index];

                this.open(header);
            }
        });

        // Filter through all closed headers and closes them
        this.states.filter( (state, index) => {
            if(state.state === 'closed') {
                let header = this.headers[index];

                this.close(header);
            }
        });


        // Resetting toggling so a new event can be fired
        this.toggling = false;
    }


    /**
     *  OPEN
     *
     *  Closes a specific panel
     *  @param {object} header - The header node you want to open
     */
    open(header, headerId) {
        this.togglePanel('open', header);
    }


    /**
     *  CLOSE
     *
     *  Closes a specific panel
     *  @param {object} header - The header node you want to close
     */
    close(header) {
        this.togglePanel('closed', header);
    }


    /**
     *  OPEN ALL
     *
     *  Opens all panels
     */
    openAll() {
        this.headers.forEach( header => {
            this.togglePanel('open', header);
        });
    }


    /**
     *  CLOSE ALL
     *
     *  Closes all panels
     */
    closeAll() {
        this.headers.forEach( header => {
            this.togglePanel('closed', header);
        });
    }


    /**
     *  GET STATE
     *
     *  Getting state of headers. By default gets state of all headers
     *  @param {string} animationAction - The animation you want to invoke
     *  @param {object} header          - The header node you want to animate
     */
    togglePanel(animationAction, header) {
        if(animationAction && header) {
            if(animationAction === 'closed') {
                // Getting ID of panel that we want to close
                let panelId      = header.getAttribute('aria-controls'),
                    panelToClose = document.getElementById(panelId);

                // Closeing panel
                panelToClose.classList.add(this.settings.hidenClass);

                // Set aria attrs
                header.setAttribute('aria-expanded', false);
            } else if(animationAction === 'open') {
                // 1.
                // Getting ID of panel that we want to open
                let panelId     = header.getAttribute('aria-controls'),
                    panelToOpen = document.getElementById(panelId);

                // Opening panel
                panelToOpen.classList.remove(this.settings.hidenClass);

                // Set aria attrs
                header.setAttribute('aria-expanded', true);
            }
        }
    }


    // @TODO - is this needed anymore?
    checkState(headerId) {
        let state = this.states[headerId].state;

        if(state === 'closed') {
            return state;
        } else if(state === 'open') {
            return state;
        }
    }


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
     *  GET HEADER ID
     *
     *  Getting an ID for a header
     *  @param {array} header - Array of ID's for the headers to be open
     */
    getHeaderId(header) {
        if(header !== undefined) {
            return header.getAttribute(this.settings.headerDataAttr);
        }
    }


    /**
     *  HEADERS TO OPEN
     *
     *  Setting which headers should be open when accordion is initalised
     *  @param {array} headersToOpen - Array of ID's for the headers to be open
     */
    openHeaders(headersToOpen = []) {
        if(headersToOpen.length && Array.isArray(headersToOpen)) {
            let headers = headersToOpen.filter( header => header != undefined);

            headersToOpen.forEach( header => {
                return this.states[header].state = 'open';
            });
        }
    }


    /**
     *  SET PANEL HEIGHT
     *
     *  Setting height for panels using pannels inner element
     */
    setPanelHeight() {
        // [].forEach.(this.panels, (panel) => {
        this.panels.forEach(panel => {
            const panelInner = panel.querySelector(this.settings.panelInner);

            let activeHeight = panelInner.offsetHeight;

            return panel.style.maxHeight = `${activeHeight}px`;
        });
    }


    setupHeaders() {
        this.headers.forEach( (header, index) => {
            header.setAttribute('id', `badger-accordion-header-${index}`);
            header.setAttribute('aria-controls', `badger-accordion-panel-${index}`);
        });
    }



    setupPanels() {
        this.panels.forEach( (panel, index) => {
            panel.setAttribute('id', `badger-accordion-panel-${index}`);
            panel.setAttribute('aria-labeledby', `badger-accordion-header-${index}`);
        });
    }


    setupAttributes() {
        // Adding ID & aria-controls
        this.setupHeaders();

        // Adding ID & aria-labeledby
        this.setupPanels();

        // Inserting data-attribute onto each `header`
        this.insertDataAttrs();
    }
}


// Apply Mixins
// applyMixins(VideoPlayer, triggerCallback);


// Export
// export default BadgerAccordion;
