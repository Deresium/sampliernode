import AudioFile from "../business/filechecker/AudioFile";
import DropSong from "../business/filechecker/DropSong";
import FileCheckerWithFileType from "../business/filechecker/FileCheckerWithFileType";
import fs from "fs";
import path from "path";

test('drop song valid method return false when email missing', async() => {
    const email: string = undefined;
    const name: string = 'test'
    const dropSong = new DropSong(name, email, new Array<AudioFile>());
    const isValid = await dropSong.isValid(new FileCheckerWithFileType());
    expect(isValid).toBe(false);
})

test('drop song valid method return false when email empty', async() => {
    const email: string = '';
    const name: string = 'test'
    const dropSong = new DropSong(name, email, new Array<AudioFile>());
    const isValid = await dropSong.isValid(new FileCheckerWithFileType());
    expect(isValid).toBe(false);
})

test('drop song valid method return true when email and name', async() => {
    const email: string = 'dimitri.steinbusch@hotmail.com';
    const name: string = 'test'
    const dropSong = new DropSong(name, email, new Array<AudioFile>());
    const isValid = await dropSong.isValid(new FileCheckerWithFileType());
    expect(isValid).toBe(true);
})

test('drop song valid with wrong files expect to be false', async() => {
    const email: string = 'dimitri.steinbusch@hotmail.com';
    const name: string = 'test';

    const fileExe = fs.readFileSync(path.join(__dirname,'../../testFiles/exeFile'));
    const fileMp3 = fs.readFileSync(path.join(__dirname,'../../testFiles/fileMP3'));
    const exeFile = new AudioFile('test.exe', fileExe);
    const mp3File = new AudioFile('test.MP3', fileMp3);
    const fileArray = new Array<AudioFile>();
    fileArray.push(exeFile);
    fileArray.push(mp3File);

    const dropSong = new DropSong(name, email, fileArray);
    const isValid = await dropSong.isValid(new FileCheckerWithFileType());
    expect(isValid).toBe(false);
})

test('drop song valid with right files expect to be true', async() => {
    const email: string = 'dimitri.steinbusch@hotmail.com';
    const name: string = 'test';

    const fileWav = fs.readFileSync(path.join(__dirname,'../../testFiles/fileWAV'));
    const fileMp3 = fs.readFileSync(path.join(__dirname,'../../testFiles/fileMP3'));
    const wavFile = new AudioFile('test.WAV', fileWav);
    const mp3File = new AudioFile('test.MP3', fileMp3);
    const fileArray = new Array<AudioFile>();
    fileArray.push(wavFile);
    fileArray.push(mp3File);

    const dropSong = new DropSong(name, email, fileArray);
    const isValid = await dropSong.isValid(new FileCheckerWithFileType());
    expect(isValid).toBe(true);
})