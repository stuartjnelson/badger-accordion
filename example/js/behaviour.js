'use strict';

// Importing accordion
import BadgerAccordion from 'dist/badger-accordion';

// Creating a new instance of the accordion
// const accordions = document.querySelectorAll('.js-badger-accordion');
const accordions = document.querySelectorAll('.js-badger-accordion');

Array.from(accordions).forEach((accordion) => {
    const ba = new BadgerAccordion(accordion);
});

const accordionSingle = new BadgerAccordion('.js-badger-accordion');

// API Examples
/* eslint-disable no-console */
// console.log(baderAccordion.getState([0]));
console.log(accordionSingle);
console.log(accordions[0]);
console.log(accordions[0].getState([0]));
// accordion.open( document.querySelector('[data-badger-accordion-header-id="1"]') );
// accordion.close( 0 );
