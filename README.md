# The Quicktime video converter

Convert `.mov` videos to `.mp4` so, once uploaded to JIRA, they will play directly in the browser

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

- Start listenting for newly created `.mov` videos

        npm start

## Run application in the background

- If you want to close your Terminal and still run the tool, you can install [pm2](https://pm2.keymetrics.io/)

        npm install pm2 -g

- To start the tool in the background, go to the project's root directory and run 

        pm2 start "npm start"

- To stop/kill the background process, run

        pm2 kill
