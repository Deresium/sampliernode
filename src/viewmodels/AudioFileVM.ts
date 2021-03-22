export default class AudioFileVM{
    private idAudioFile: number;
    private fileName: string;

    constructor(idAudioFile: number, fileName: string) {
        this.idAudioFile = idAudioFile;
        this.fileName = fileName;
    }

    getFileName(){
        return this.fileName
    }

    getStockName(){
        return `${this.idAudioFile}_${this.fileName}`
    }
}