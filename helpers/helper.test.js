const sinon = require('sinon')
const expect  = require('chai').expect;

const unix = require('./executeUnixCommand')
const helper = require('./helper')

describe('convertVideoToMP4()', () => {
    it(`should successfully convert .mov files to .mp4`, () => {
        process.argv[2] = '/User/me/Downloads/'

        const fileName = 'myFirstVideo'
        const watchDirectory = process.argv[2]
        const absoluteFilePath = watchDirectory + fileName +'.mov'
        
        const stubUinxExec = sinon.stub(unix, 'exec')
        const stubConsoleInfo = sinon.stub(console, 'info')

        helper.convertVideoToMP4(absoluteFilePath)

        sinon.assert.calledOnceWithExactly(stubUinxExec, `ffmpeg -i '${watchDirectory}${fileName}.mov' '${watchDirectory}${fileName}.mp4' -y`)
        sinon.assert.callCount(stubConsoleInfo, 2)
        sinon.assert.calledWithExactly(stubConsoleInfo.firstCall, `\n New .mov file found`)
        sinon.assert.calledWithExactly(stubConsoleInfo.secondCall, ` Converting to .mp4; Please wait...\n`)
        sinon.restore()
    })

    it(`should ignore files that do not have a '.mov' file extension`, () => {
        process.argv[2] = '/User/you/Downloads/'

        const fileName = 'myFirstVideo'
        const watchDirectory = process.argv[2]
        const absoluteFilePath = watchDirectory + fileName +'.txt'
        
        const stubUinxExec = sinon.stub(unix, 'exec')
        sinon.stub(console, 'info')

        helper.convertVideoToMP4(absoluteFilePath)

        sinon.assert.notCalled(stubUinxExec)
        sinon.restore()
    })
})

describe('validateWatchDirectoryValue()', () => {
    it(`should add a '/' character to the end of the watchDirectory value if it is missing i.e. invalid file path`, () => {
        const watchDirectory = '/invalid/file/path'

        const result = helper.validateWatchDirectoryValue(watchDirectory)

        expect(result).to.equal(watchDirectory + '/')
    })

    it(`should return the same value if it ends with a '/' character i.e. valid file path`, () => {
        const watchDirectory = '/invalid/file/path/'

        const result = helper.validateWatchDirectoryValue(watchDirectory)

        expect(result).to.equal(watchDirectory)
    })
})