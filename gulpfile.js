'use strict'

const gulp = require('gulp')
const cheerio = require('gulp-cheerio')
const { folders, files, shapes } = require('./configuration/settings')

/**
 * fixElement removes any element attributes of a shape then adds the fm_fill class
 * and sets the fill attribute to Filemaker's grey color.
 * @param  {html} icon The icon to modify
 */
const fixElement = ($, icon) => {
  for (let shape of shapes) {
    let element = $(shape)
    element.attribs = {}
    element.addClass('fm_fill').attr('fill', '#ccc')
  }
}

gulp.task('add-fm-class', () => {
  console.log('icons converted - 🍺')
  gulp.src(`${folders.source}/*.svg`)
    .pipe(cheerio({
      run: ($, icon) => fixElement($, icon)
    }))
    .pipe(gulp.dest(folders.destination))
})

gulp.task('watch', () => {
  console.log(`👀   watching ./${folders.source} for icons. 👀`)
  return gulp.watch(files, ['add-fm-class'])
})

gulp.task('default', ['add-fm-class', 'watch'])
