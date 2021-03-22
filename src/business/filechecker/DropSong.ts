import AudioFile from "./AudioFile";
import FileChecker from "./FileChecker";

export default class DropSong{
    private readonly name: string;
    private readonly email: string;
    private readonly audioFiles: Array<AudioFile>;

    constructor(name: string, email: string, audioFiles: Array<AudioFile>) {
        this.name = name;
        this.email = email;
        this.audioFiles = audioFiles;
    }

    getName(){
        return this.name;
    }

    getEmail(){
        return this.email;
    }

    getAudioFiles(){
        return this.audioFiles;
    }

    async isValid(fileChecker: FileChecker): Promise<boolean>{
        if(!this.name || !this.email)
            return false;

        return await fileChecker.checkFiles(this.audioFiles);
    }
}