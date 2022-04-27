const path = require('path');
const unix = require('./executeUnixCommand')
const chokidar = require('chokidar');

async function listenForMOVfiles(){
    try {
        if(!process.argv[2]) throw 'MISSING_WATCH_DIRECTORY'

        watchDirectory = validateWatchDirectoryValue(process.argv[2])

        console.info(`\n Listening for new .mov files in '${watchDirectory}'\n`)

        const watcher = chokidar.watch(watchDirectory, {
            ignored: /(^|[\/\\])\../, // ignore dotfiles
            ignoreInitial: true, // ignore files already in the directory
            persistent: true
        })

        watcher.on('add', (absoluteFilePath) => {

            const fileNameWithExtension = path.parse(absoluteFilePath).base
            
            if(fileNameWithExtension.endsWith('.mov')){
                const fileName = path.parse(absoluteFilePath).name

                console.info()
                console.info(` New .mov file found`)
                console.info(` Converting to .mp4; Please wait...`)
                console.info()

                const command = `ffmpeg -i '${watchDirectory}${fileName}.mov' '${watchDirectory}${fileName}.mp4' -y`
                unix.exec(command)
            }
        })
    } catch (error) {
        if(error == 'MISSING_WATCH_DIRECTORY'){
            console.info('\n Please include the path to the direcyory where Quicktime videos are saved e.g. ~/Desktop/\n')
        } else {
            console.log(error)
        }
    }
}

function validateWatchDirectoryValue(watchDirectory) {
    if(!watchDirectory.endsWith('/')){
        return watchDirectory + '/'
    }
}

listenForMOVfiles()