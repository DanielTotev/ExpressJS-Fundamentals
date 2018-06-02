const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");

gulp.task("minifyHtml", () => {
    return gulp.src("./views/*.html")
        .pipe(htmlmin({collapseWhitespace: true, minifyJS:true,removeComments:true}))
        .pipe(gulp.dest("./minifiedHtml"));
});