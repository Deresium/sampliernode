import FileChecker from "./FileChecker";
import FileType from "file-type"
import AudioFile from "./AudioFile";
import AcceptedFileType from "./AcceptedFileType";

export default class FileCheckerWithFileType implements FileChecker{
    async checkFiles(fileArray: Array<AudioFile>): Promise<boolean> {
        if(fileArray.length === 0)
            return true;

        for(const file of fileArray){
            const fileType = await FileType.fromBuffer(file.getAudioFileBuffer());
            if(!fileType || !AcceptedFileType.acceptFileType.includes(fileType.ext))
                return false
            if(!AcceptedFileType.acceptFileType.includes(file.getExtension()))
                return false
        }
        return true;
    }
}