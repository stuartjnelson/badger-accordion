'use strict';

// Importing accordion
import pollyfill from '../js/array-from-pollyfill';
import BadgerAccordion from '../js/badger-accordion';

// Creating a new instance of the accordion
const accordion = new BadgerAccordion('.js-badger-accordion');

// API Examples
accordion.open( document.querySelector('[data-badger-accordion-header-id="1"]') );
// accordion.openAll();
