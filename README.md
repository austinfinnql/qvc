# The Quicktime video converter

Convert `.mov` videos to `.mp4` so once uploaded to JIRA, they will play directly in the browser

## Prerequisites
- Make sure you have [NodeJs](https://nodejs.org/en/) installed
- Download and install [FFmpeg](https://ffmpeg.org/) 

        brew install ffmpeg

## How it works
- The tool listens for new `.mov` files added to a specific folder. It then automatically converts those files to an `.mp4` format


## Setup 
- Clone this repo
- In the same directory, run the below to install all dependencies

        npm i

- Start listenting for newly created `.mov` videos (the tool needs to run all the time)

        npm start
