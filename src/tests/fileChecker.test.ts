import FileChecker from "../business/filechecker/FileChecker";
import FileCheckerWithFileType from "../business/filechecker/FileCheckerWithFileType";
import AudioFile from "../business/filechecker/AudioFile";
import * as fs from "fs";
import path from "path";

test('expect a empty File array to return true', async() => {
    const fileChecker: FileChecker = new FileCheckerWithFileType();
    const check = await fileChecker.checkFiles(new Array<AudioFile>());
    expect(check).toBe(true);
})

test('expect txt file to be false', async() => {
    const file = fs.readFileSync(path.join(__dirname,'../../testFiles/txtFile'));
    const txtFile = new AudioFile('test.txt', file);
    const fileArray = new Array<AudioFile>();
    fileArray.push(txtFile);
    const fileChecker: FileChecker = new FileCheckerWithFileType();
    const check = await fileChecker.checkFiles(fileArray);
    expect(check).toBe(false);
})

test('expect txt file and wav to be false', async() => {
    const fileTxt = fs.readFileSync(path.join(__dirname,'../../testFiles/txtFile'));
    const fileWav = fs.readFileSync(path.join(__dirname,'../../testFiles/fileWAV'));
    const txtFile = new AudioFile('test.txt', fileTxt);
    const wavFile = new AudioFile('test.wav', fileWav);
    const fileArray = new Array<AudioFile>();
    fileArray.push(txtFile);
    fileArray.push(wavFile);
    const fileChecker: FileChecker = new FileCheckerWithFileType();
    const check = await fileChecker.checkFiles(fileArray);
    expect(check).toBe(false);
})

test('expect exe file and mp3 to be false', async() => {
    const fileExe = fs.readFileSync(path.join(__dirname,'../../testFiles/exeFile'));
    const fileMp3 = fs.readFileSync(path.join(__dirname,'../../testFiles/fileMP3'));
    const exeFile = new AudioFile('test.exe', fileExe);
    const mp3File = new AudioFile('test.mp3', fileMp3);
    const fileArray = new Array<AudioFile>();
    fileArray.push(exeFile);
    fileArray.push(mp3File);
    const fileChecker: FileChecker = new FileCheckerWithFileType();
    const check = await fileChecker.checkFiles(fileArray);
    expect(check).toBe(false);
})

test('expect wav file and mp3 file to be true', async() => {
    const fileWav = fs.readFileSync(path.join(__dirname,'../../testFiles/fileWAV'));
    const fileMp3 = fs.readFileSync(path.join(__dirname,'../../testFiles/fileMP3'));
    const wavFile = new AudioFile('test.Wav', fileWav);
    const mp3File = new AudioFile('test.Mp3', fileMp3);
    const fileArray = new Array<AudioFile>();
    fileArray.push(wavFile);
    fileArray.push(mp3File);
    const fileChecker: FileChecker = new FileCheckerWithFileType();
    const check = await fileChecker.checkFiles(fileArray);
    expect(check).toBe(true);
})

test('expect wav file and mp3 file and exe file to be false', async() => {
    const fileExe = fs.readFileSync(path.join(__dirname,'../../testFiles/exeFile'));
    const fileWav = fs.readFileSync(path.join(__dirname,'../../testFiles/fileWAV'));
    const fileMp3 = fs.readFileSync(path.join(__dirname,'../../testFiles/fileMP3'));
    const exeFile = new AudioFile('test.exe', fileExe);
    const wavFile = new AudioFile('test.wav', fileWav);
    const mp3File = new AudioFile('test.mp3', fileMp3);
    const fileArray = new Array<AudioFile>();
    fileArray.push(exeFile);
    fileArray.push(wavFile);
    fileArray.push(mp3File);
    const fileChecker: FileChecker = new FileCheckerWithFileType();
    const check = await fileChecker.checkFiles(fileArray);
    expect(check).toBe(false);
})