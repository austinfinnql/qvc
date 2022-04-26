# CVT - The Quicktime video converter

Convert `.mov` videos to `.mp4` so they will play directly in JIRA. Now people can watch your video in their Browser without needing to download it first!

## Prerequisites
- Make soure you have [NodeJs](https://nodejs.org/en/) installed
- Download and install [FFmpeg](https://ffmpeg.org/) to your machine - 

        brew install ffmpeg

## How it works
- This CLI tool will convert the most recent `.mov` file in a specified folder to a `.mp4` format


## Setup 
- Clone this repo
- In the same directory, run the below command to create a [symbolic link](https://en.wikipedia.org/wiki/Symbolic_link)

        npm link
- To convert your `.mov` video, enter

        cvt
