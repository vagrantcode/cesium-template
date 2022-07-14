'use strict'
const path=require('path')
process.env.NODE_ENV = 'production'


let loadModule=async function (){
  const ora =await import('ora')
  const rm =await import('rimraf')
  const path =await import('path')
  const chalk =await import('chalk')
  const webpack =await import('webpack')
  const webpackConfig =await import('./webpack.prod.config.js')
  return {
    ora:ora.default,
    rm:rm.default,
    path,
    chalk:chalk.default,
    webpack:webpack.default,
    webpackConfig:webpackConfig.default
  }
}
loadModule().then(({
                     ora,
                     rm,
                     path,
                     chalk,
                     webpack,
                     webpackConfig
                   })=>{
  const spinner = ora('building for production...')
  spinner.start()
  rm(webpackConfig.output.path, err => {
    if (err) throw err
    webpack(webpackConfig, (err, stats) => {
      spinner.stop()
      if (err) throw err
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
        chunks: false,
        chunkModules: false
      }) + '\n\n')

      if (stats.hasErrors()) {
        console.log(chalk.red('  Build failed with errors.\n'))
        process.exit(1)
      }

      console.log(chalk.cyan('  Build complete.\n'))
      console.log(chalk.yellow(
          '  Tip: built files are meant to be served over an HTTP server.\n' +
          '  Opening index.html over file:// won\'t work.\n'
      ))
    })
  })
})





