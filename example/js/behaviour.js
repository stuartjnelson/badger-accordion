'use strict';

// Importing accordion
/* eslint-disable no-unused-vars */
import pollyfill from 'dist/array-from-pollyfill';
import BadgerAccordion from 'dist/badger-accordion';

// Creating a new instance of the accordion
const accordion = new BadgerAccordion('.js-badger-accordion');

// API Examples
/* eslint-disable no-console */
console.log(accordion.getState( [0] ));
// accordion.open( document.querySelector('[data-badger-accordion-header-id="1"]') );
// accordion.close( 0 );
