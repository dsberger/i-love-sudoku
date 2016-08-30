import babel from 'rollup-plugin-babel'

export default {
  entry: 'src/scripts/app.js',
  format: 'cjs',
  plugins: [ babel({
    presets: ['es2015-rollup'],
    babelrc: false
  }) ],
  dest: 'docs/app.js'
}
