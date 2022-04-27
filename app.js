const path = require('path');
const unix = require('./executeUnixCommand')
const chokidar = require('chokidar');

async function listenForMOVfiles(){
    try {
        const sourceDirectory = process.argv[2]
        if(!sourceDirectory) throw 'MISSING_WATCH_DIRECTORY'

        console.info(`\n Listening for new .mov files in '${sourceDirectory}'\n`)

        const watcher = chokidar.watch(sourceDirectory, {
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

                const command = `ffmpeg -i '${sourceDirectory}${fileName}.mov' '${sourceDirectory}${fileName}.mp4' -y`
                unix.exec(command)
            }
        })
    } catch (error) {
        if(error == 'MISSING_WATCH_DIRECTORY'){
            console.info('\n Please include the path to the direcyory where Quicktime videos are saved e.g. ~/Desktop\n')
        } else {
            console.log(error)
        }
    }
}

listenForMOVfiles()