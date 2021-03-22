import AudioFileVM from "./AudioFileVM";

export default class DropSongVM{
    private name: string;
    private email: string;
    private audioFileArray: Array<AudioFileVM>;

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
        this.audioFileArray = new Array<AudioFileVM>();
    }

    addAudioFile(audioFile: AudioFileVM){
        this.audioFileArray.push(audioFile);
    }
}