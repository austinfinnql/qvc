#!/usr/bin/env node

const chokidar = require('chokidar');
const helper = require('./helpers/helper')

async function listenForMOVfiles(){
    try {
        if(!process.argv[2]) throw 'MISSING_WATCH_DIRECTORY'

        watchDirectory = helper.validateWatchDirectoryValue(process.argv[2])

        console.info(`\n Listening for new .mov files in '${watchDirectory}'\n`)

        const watcher = chokidar.watch(watchDirectory, {
            ignored: /(^|[\/\\])\../, // ignore dotfiles
            ignoreInitial: true, // ignore files already in the directory
            persistent: true
        })

        watcher.on('add', helper.convertVideoToMP4)

    } catch (error) {
        if(error == 'MISSING_WATCH_DIRECTORY'){
            console.info('\n Please include the path to the directory where Quicktime videos are saved e.g. ~/Desktop/\n')
        } else {
            console.log(error)
        }
    }
}

listenForMOVfiles()