import IDropSongDataGateway from "./IDropSongDataGateway";
import DropSong from "../business/filechecker/DropSong";
import DropSongEntity from "../models/DropSongEntity";
import {sequelize} from "../pgConnexion";
import {Transaction} from "sequelize";
import AudioFileEntity from "../models/AudioFileEntity";
import {getFromAWS, sendToAWS} from "../awsCalls";
import AudioFile from "../business/filechecker/AudioFile";
import DropSongVM from "../viewmodels/DropSongVM";
import AudioFileVM from "../viewmodels/AudioFileVM";

export default class DropSongDataGateway implements IDropSongDataGateway{
    async findAll(): Promise<Array<DropSongVM>> {
        const dropSongEntities = await DropSongEntity.findAll({include: DropSongEntity.associations.audioFiles, order: [['createdAt', 'DESC']]});
        const dropSongArray = new Array<DropSongVM>();
        for(const dropSongEntity of dropSongEntities)
            dropSongArray.push(this.constructDropSong(dropSongEntity))
        return dropSongArray;
    }

    private constructDropSong(dropSongEntity: DropSongEntity): DropSongVM{
        const dropSongVm = new DropSongVM(dropSongEntity.getName(), dropSongEntity.getEmail());
        for(const audioFileEntity of dropSongEntity.getAudioFiles()){
            dropSongVm.addAudioFile(new AudioFileVM(audioFileEntity.getAudioFileId(), audioFileEntity.getName()));
        }
        return dropSongVm;
    }

    async save(dropSong: DropSong): Promise<void> {
        await sequelize.transaction(async(t: Transaction) => {

            const savedDropSong = await DropSongEntity.create({
                name: dropSong.getName(),
                email: dropSong.getEmail()
            },{transaction: t})

            for(const file of dropSong.getAudioFiles()){
                const savedAudioFile = await AudioFileEntity.create({
                    name: file.getAudioFileName(),
                    dropSongId: savedDropSong.getDropSongId()
                },{transaction: t})
                await sendToAWS(file.getAudioFileBuffer(), `${savedAudioFile.getAudioFileId()}_${file.getAudioFileName()}`)
            }
        })
    }

    async findAudioFileNameStock(audioFileId: number): Promise<AudioFileVM> {
        const audioFile = await AudioFileEntity.findByPk(audioFileId);
        if(!audioFile)
            return null;
        return new AudioFileVM(audioFile.getAudioFileId(), audioFile.getName())
    }

}
