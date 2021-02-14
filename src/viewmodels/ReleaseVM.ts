export default class ReleaseVM{
    private releaseId: number;
    private name: string;
    private description: string;
    private artistId: number;
    private artistName: string;
    private type: string;
    private date: Date;

    constructor(releaseId: number, name: string, description: string, artistId: number, artistName: string, type: string, date: Date) {
        this.releaseId = releaseId;
        this.name = name;
        this.description = description;
        this.artistId = artistId;
        this.artistName = artistName;
        this.type = type;
        this.date = date;
    }
}