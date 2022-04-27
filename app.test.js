const sinon = require('sinon')
const expect  = require('chai').expect;

const chokidar = require('chokidar');
const helper = require('./helpers/helper')

const {listenForMOVfiles} = require('./app');

describe('listenForMOVfiles()', () => {
    it(`should return watch for new .mov files added to a user specified directory`, () => {
        process.argv[2] = '/fake/path/'
        const watchDirectory = process.argv[2]

        const stubValidate = sinon.stub(helper, 'validateWatchDirectoryValue').returns(watchDirectory)
        const spyWatch = sinon.spy(chokidar, 'watch')
        sinon.stub(console, 'info')

        listenForMOVfiles()

        sinon.assert.calledOnceWithExactly(stubValidate, process.argv[2])
        sinon.assert.calledOnceWithExactly(spyWatch, watchDirectory, {
            ignored: /(^|[\/\\])\../,
            ignoreInitial: true,
            persistent: true
        })
        
        sinon.restore()
    })

    it(`should throw an error if the user does not provided a path to a directory`, () => {
        process.argv[2] = undefined

        const stubConsoleInfo = sinon.stub(console, 'info')

        try {
            listenForMOVfiles()
        } catch (error) {
            expect(error).to.equal('MISSING_WATCH_PATH')
        }
        
        sinon.assert.calledTwice(stubConsoleInfo)
        sinon.assert.calledWith(stubConsoleInfo.firstCall, '\n Please include the path to the directory where Quicktime videos are saved')
        sinon.assert.calledWith(stubConsoleInfo.secondCall, '\n Example: qvc ~/Desktop/\n')

        sinon.restore()
    })
})