// require:importa una dependencia(paquete) de desarrollo o global de la carpeta node_modules
const { src, dest, watch, series, parallel } = require('gulp');
1
// CSS y SASS
const sass = require('gulp-sass')(require('sass'));// compilando sass copn gulp
const concat = require('gulp-concat');

// Utilidades CSS
const autoprefixer = require('autoprefixer');//agrega ciertos prefijos al css
const postcss = require('gulp-postcss');//hace un procesamiento al css
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

// Imagenes
const imagemin = require('gulp-imagemin');//para procesar imagenes
const webp = require('gulp-webp');
const avif = require('gulp-avif');

// Utilidades JS
const terser = require('gulp-terser-js');
const rename = require('gulp-rename')

const paths = {
    imagenes: 'src/img/**/*',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js'
}

function compilarSASS() {
    return src(paths.scss)
        .pipe( sourcemaps.init() )
        .pipe( sass({outputStyle: 'compressed'}) )
        .pipe( postcss([ autoprefixer(), cssnano() ]) )
        .pipe( sourcemaps.write('.'))
        .pipe( dest('build/css') )
}
function javascript() {
    return src(paths.js)
        .pipe(sourcemaps.init())
        .pipe( concat('bundle.js') ) // final output file name
        .pipe( terser() )
        .pipe(sourcemaps.write('.'))
        .pipe( rename({ suffix: '.min' }))
        .pipe( dest('build/js') )
}
function imagenes() {
    return src(paths.imagenes)
        .pipe( imagemin({ optimizationLevel: 3 }) )
        .pipe( dest('build/img') )
}

function versionWebp() {
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe( webp( opciones ) )
        .pipe( dest('build/img') )
}

function versionAvif() {
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe( avif( opciones ) )
        .pipe( dest('build/img'))
}

function watchArchivos(){
    watch(paths.scss,compilarSASS) //antes un cambio en cualquier archivo que termine en scss en esa ruta aplica la funcion css
    //*:carpeta actual - **:todos los archivos con esa extensión
    watch(paths.js, javascript);
    watch( paths.imagenes, imagenes );
    watch( paths.imagenes, versionWebp );
}

// exports.versionAvif = versionAvif;
// para exportar la tarea / hacer disponible nuestro código de forma externa // exports.nombre_de_la_tarea=nombre_de_la_funcion
exports.compilarSASS = compilarSASS;
exports.javascript = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.watchArchivos = watchArchivos;
exports.default = series(compilarSASS, javascript, imagenes, versionWebp, versionAvif, watchArchivos);//en el terminal solo se debe poner gulp para ejecutarlo

// series - Se inicia una tarea, y hasta que finaliza, inicia la siguiente
// parallel - Todas inician al mismo tiempo