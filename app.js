const path = require('path');
const unix = require('./executeUnixCommand')
const chokidar = require('chokidar');

async function listenForMOVfiles(){
    const sourceDirectory = `/Users/austinfinn/Desktop/`

    try {
        const watcher = chokidar.watch(sourceDirectory, {
            ignored: /(^|[\/\\])\../, // ignore dotfiles
            ignoreInitial: true, // ignore files already in the directory
            persistent: true
        })

        watcher.on('add', async (absoluteFilePath) => {

            const fileNameWithExtension = path.parse(absoluteFilePath).base
            
            if(fileNameWithExtension.endsWith('.mov')){
                const fileName = path.parse(absoluteFilePath).name

                console.info()
                console.info(` New .mov file found`)
                console.info(` Converting to .mp4; Please wait...`)
                console.info()

                const command = `ffmpeg -i '${sourceDirectory}${fileName}.mov' '${sourceDirectory}${fileName}.mp4' -y`
                await unix.exec(command)
            }
        })
    } catch (error) {
        console.log(error)
    }
}

listenForMOVfiles()