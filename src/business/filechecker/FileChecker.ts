import AudioFile from "./AudioFile";

export default interface FileChecker{
    checkFiles: (fileArray: Array<AudioFile>) => Promise<boolean>;
}