import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import includePaths from 'rollup-plugin-includepaths';
// import uglify from 'rollup-plugin-uglify';

export default {
    input: 'src/js/badger-accordion.js',
    // input: 'example/js/behaviour.js', // - for compling example
    sourcemap: 'false',
    name: 'BadgerAccordion',
    output: {
        file: 'dist/badger-accordion.js',
        // file: 'example/js/app.js', // - for compling example
        format: 'umd',
    },
    plugins: [
        resolve(),
        commonjs(),
        eslint({
            exclude: ['src/css/**', 'src/scss/**']
        }),
        babel({exclude: 'node_modules/**'}),
        includePaths(),
        // uglify()
    ]
};
