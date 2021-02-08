export default class ArtistVM{
    private artistId: number;
    private name: string;
    private description: string;
    private hashtags: string[];

    constructor(artistId: number, name: string, description: string) {
        this.hashtags = new Array<string>();
        this.artistId = artistId;
        this.name = name;
        this.description = description;
    }

    addHashtag(hashtag: string){
        this.hashtags.push(hashtag);
    }
}