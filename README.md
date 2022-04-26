# The Quicktime video converter

Convert `.mov` videos to `.mp4` so they will play directly in JIRA. Now people can watch your video in their Browser without needing to download it first!

## Prerequisites
- Make soure you have [NodeJs](https://nodejs.org/en/) installed
- Download and install [FFmpeg](https://ffmpeg.org/) 

        brew install ffmpeg

## How it works
- The tool listens for new `.mov` files added to a specific folder. It then automatically converts those files to an `.mp4` format


## Setup 
- Clone this repo
- In the same directory, run the below install all dependencies

        npm i

- Start listenting for newly created `.mov` videos. It needs to run all the time

        npm start
