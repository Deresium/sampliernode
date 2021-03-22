import DropSong from "../business/filechecker/DropSong";
import DropSongVM from "../viewmodels/DropSongVM";
import AudioFile from "../business/filechecker/AudioFile";
import AudioFileVM from "../viewmodels/AudioFileVM";

export default interface IDropSongDataGateway{
    save: (dropSong: DropSong) => void;
    findAll: () => Promise<Array<DropSongVM>>;
    findAudioFileNameStock: (audioFileId: number) => Promise<AudioFileVM>;
}