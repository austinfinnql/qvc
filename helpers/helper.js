const path = require('path');
const unix = require('./executeUnixCommand')

function convertVideoToMP4(absoluteFilePath) {
    const watchDirectory = validateWatchDirectoryValue(process.argv[2])
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
}

function validateWatchDirectoryValue(watchDirectory) {
    if(!watchDirectory.endsWith('/')){
        return watchDirectory + '/'
    }

    return watchDirectory
}

module.exports = {
    validateWatchDirectoryValue,
    convertVideoToMP4
}