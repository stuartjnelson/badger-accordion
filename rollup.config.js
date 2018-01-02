import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import includePaths from 'rollup-plugin-includepaths';
import uglify from 'rollup-plugin-uglify-es';
import replace from 'rollup-plugin-replace';

export default {
    input: (process.env.NODE_ENV === 'example' && 'example/js/behaviour.js' || 'src/js/badger-accordion.js'),
    sourcemap: 'false',
    name: 'BadgerAccordion',
    output: [
        {
            file: (process.env.NODE_ENV === 'production' && 'dist/badger-accordion.min.js' || process.env.NODE_ENV === 'example' && 'example/js/app.js' || 'dist/badger-accordion.js'),
            format: 'umd'
        },
        {
            file: (process.env.NODE_ENV === 'production' && 'dist/badger-accordion.esm.min.js' || 'dist/badger-accordion.esm.js' ),
            format: 'es',
        }
    ],
    plugins: [
        resolve(),
        commonjs(),
        eslint({
            exclude: ['src/css/**', 'src/scss/**']
        }),
        babel({exclude: 'node_modules/**'}),
        includePaths(),
        replace({
            ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        }),
        (process.env.NODE_ENV === 'production' && uglify()),
    ]
};
