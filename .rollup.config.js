import babel from 'rollup-plugin-babel'

export default {
  entry: 'src/scripts/app.js',
  format: 'cjs',
  plugins: [ babel({
    presets: ['es2015-rollup'],
    babelrc: false,
    minified: true
  }) ],
  dest: 'docs/app.js'
}
