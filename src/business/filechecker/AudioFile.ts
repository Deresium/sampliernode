export default class AudioFile{
    private readonly name: string;
    private readonly buffer: Buffer;

    constructor(name: string, buffer: Buffer) {
        this.name = name;
        this.buffer = buffer;
    }

    getAudioFileName(){
        return this.name;
    }

    getAudioFileBuffer(){
        return this.buffer;
    }

    getExtension(){
        const splitName = this.name.split('.');
        return splitName[splitName.length - 1].toLowerCase();
    }
}