#!/usr/bin/env node

const fs = require('fs')
const path = require('path');
const unix = require('./executeUnixCommand')

async function findNewestQuicktimeFile(){
    try {
        const sourceDirectory = `/Users/austinfinn/Desktdop/`
        const finalList = []

        const allFiles = await fs.readdirSync(sourceDirectory)

        const files = allFiles.filter((file) => {
            if(file.endsWith('.mov')){
                return file
            }
        })

        for(const file of files){
            const result = await fs.statSync(`${sourceDirectory}${file}`)
            finalList.push({
                fileName: file,
                lastModifiedDate: result.mtime
            })
        };

        finalList.sort(sortByLastModifiedDate)
        finalList.reverse()

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