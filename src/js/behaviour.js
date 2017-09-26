'use strict';

// Importing accordion
import pollyfill from 'array-from-pollyfill';
import BadgerAccordion from 'badger-accordion';

// Creating a new instance of the accordion
const accordion = new BadgerAccordion('.js-badger-accordion');

// API Examples
console.log(accordion.getState( [0] ));
// accordion.open( document.querySelector('[data-badger-accordion-header-id="1"]') );
// accordion.close( 0 );
