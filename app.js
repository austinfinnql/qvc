#!/usr/bin/env node

const fs = require('fs')
const path = require('path');
const unix = require('./executeUnixCommand')
const chokidar = require('chokidar');

async function findNewestQuicktimeFile(){
    const sourceDirectory = `/Users/austinfinn/Desktop/`
    try {
        const finalList = []

        const allFiles = await fs.readdirSync(sourceDirectory)
        if(allFiles.length == 0) throw 'NO_FILES_IN_SOURCE_DIRECTORY'

        // only return files with a .mov file extension
        const movFiles = allFiles.filter((file) => {
            if(file.endsWith('.mov')){
                return file
            }
        })

        if(movFiles.length == 0) throw 'NO_MOV_FILES_IN_SOURCE_DIRECTORY'
    
        // get the last modified date of each file
        for(const file of movFiles){
            const result = await fs.statSync(`${sourceDirectory}${file}`)
            finalList.push({
                fileName: file,
                lastModifiedDate: result.mtime
            })
        };

        finalList.sort(sortByLastModifiedDate)
        finalList.reverse()

        // remove the file's extension
        const fileName = path.parse(finalList[0].fileName).name

        const command = `ffmpeg -i '${sourceDirectory}${fileName}.mov' '${sourceDirectory}${fileName}.mp4' -y`
        await unix.exec(command)

        console.info(` Successfully converted '${finalList[0].fileName}' to .mp4 format`)
        console.info(`\n Video location: ${sourceDirectory}\n`)
    } catch (error) {
        console.info()
        if(error == 'NO_FILES_IN_SOURCE_DIRECTORY'){
            console.info(` There are 0 files in ${sourceDirectory}`)
        } else if(error == 'NO_MOV_FILES_IN_SOURCE_DIRECTORY'){
            console.info(` There are 0 .mov files in ${sourceDirectory}`)
        } else {
            console.info(' Error occured ... ', error)
        }
        console.info()
    }
}

function sortByLastModifiedDate(a, b) {
    return a.lastModifiedDate - b.lastModifiedDate;
}

async function listenForMOVfiles(){
    const sourceDirectory = `/Users/austinfinn/Desktop/`

    try {
        const watcher = chokidar.watch(sourceDirectory, {
            ignored: /(^|[\/\\])\../, // ignore dotfiles
            ignoreInitial: true, // ignore file already in the directory
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