# QVC - The Quicktime video converter

Convert `.mov` videos to `.mp4` so, once uploaded to JIRA, they will play directly in the browser

## Prerequisites
- Make sure you have [NodeJs](https://nodejs.org/en/) installed
- Download and install [FFmpeg](https://ffmpeg.org/) 

        brew install ffmpeg

## How it works
- The tool listens for new `.mov` files added to a specific folder. Once it detects a new video, it automatically converts it to `.mp4`
- The videos will also be significantly reduced in size. They'll be anywhere from 5x to 10x smaller. Helpful with JIRAs 30MB max file size!


## Setup 
1. Clone this repo and the run the below to install all dependencies

        npm i

3. Run the below command to create a [symbolic link](https://en.wikipedia.org/wiki/Symbolic_link)

        npm link

4. Run the below to start the app (make sure to update the path value)

        qvc /path/to/quicktime/videos/

## Run application in the background

1. If you want to close your Terminal and still run the tool, you can install [pm2](https://pm2.keymetrics.io/)

        npm install pm2 -g

1. To start the tool in the background, run the below but make sure to update the path value

        pm2 start "qvc /path/to/quicktime/videos/"

1. To stop/kill the background process, run

        pm2 kill
