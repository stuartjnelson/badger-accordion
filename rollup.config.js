import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';

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
    },
    plugins: [
        eslint({
            exclude: [
                'src/css/**',
                'src/scss/**'
            ]
        }),
        babel({
            exclude: 'node_modules/**',
        }),
    ],
};
