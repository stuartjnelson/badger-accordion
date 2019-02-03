'use strict';

// Importing accordion
import BadgerAccordion from 'dist/badger-accordion';

// Creating a new instance of the accordion usign DOM node
// ================================
// const accordionDomNode = document.querySelector('.js-badger-accordion');

// const accordion = new BadgerAccordion(accordionDomNode);

/* eslint-disable no-console */
// console.log(accordion.getState([0]));
// accordion.open(0); // Opens the first accordion panel




// Creating a new instance of the accordion usign DOM node
// ================================
const accordions = document.querySelectorAll('.js-badger-accordion');

Array.from(accordions).forEach((accordion) => {
    const ba = new BadgerAccordion(accordion);

    /* eslint-disable no-console */
    console.log(ba.getState([0]));
});





// Creating a new instance of the accordion usign CSS selector
// ================================
// const accordionCssSelector = new BadgerAccordion('.js-badger-accordion');

// API Examples
/* eslint-disable no-console */
// console.log(accordionCssSelector.getState([0]));
// accordionCssSelector.open( 0 );
