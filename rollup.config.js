export default {
    entry     : 'src/js/badger-accordion.js',
    dest      : 'dist/badger-accordion.min.js',
    format    : 'umd',
    sourceMap : 'inline',
    moduleName: 'BadgerAccordion',
    external  : ['uuid/v4', 'transition-end'],
    globals   : {
        'uuid/v4'        : 'uuidV4',
        'transition-end' : 'onCSSTransitionEnd'
    }
};
