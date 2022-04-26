#!/usr/bin/env node

const fs = require('fs')
const path = require('path');
const unix = require('./executeUnixCommand')

async function findNewestQuicktimeFile(){
    try {
        const sourceDirectory = `/Users/austinfinn/Desktop/`
        const finalList = []

        const allFiles = await fs.readdirSync(sourceDirectory)

        // only return files with a .mov file extension
        const movFiles = allFiles.filter((file) => {
            if(file.endsWith('.mov')){
                return file
            }
        })

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
        console.log('Error occured ... ', error)
    }
}

function sortByLastModifiedDate(a, b) {
    return a.lastModifiedDate - b.lastModifiedDate;
}

findNewestQuicktimeFile()