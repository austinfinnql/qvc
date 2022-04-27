#!/usr/bin/env node

const chokidar = require('chokidar');
const helper = require('./helpers/helper')

async function watchForMOVfiles(){
    try {
        if(!process.argv[2]) throw 'MISSING_WATCH_PATH'

        const watchDirectory = helper.validateWatchDirectoryValue(process.argv[2])

        console.info(`\n Watching for new .mov files saved to '${watchDirectory}'\n`)

        const watcher = chokidar.watch(watchDirectory, {
            ignored: /(^|[\/\\])\../, // ignore dotfiles
            ignoreInitial: true, // ignore files already in the directory
            persistent: true
        })

        watcher.on('add', helper.convertVideoToMP4)

    } catch (error) {
        if(error == 'MISSING_WATCH_PATH'){
            console.info('\n Please include the path to the directory where Quicktime videos are saved')
            console.info('\n Example: qvc ~/Desktop/\n')
        } else {
            console.log(error)
        }
    }
}

watchForMOVfiles()

module.exports = { watchForMOVfiles }