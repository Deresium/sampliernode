import Artist from "../models/Artist";
import ArtistVM from "../viewmodels/ArtistVM";

const getAllArtists = async(): Promise<Array<ArtistVM>> => {
    const artists = new Array<ArtistVM>();
    try {
        const artistsDb = await Artist.findAll({include: Artist.associations.hashtags});
        for(const artistDb of artistsDb){
            const newArtist = new ArtistVM(artistDb.id, artistDb.artistName, artistDb.artistDescription);
            for(const hashtag of artistDb.artistHashtags){
                newArtist.addHashtag(hashtag.hashtagName);
            }
            artists.push(newArtist);
        }
    }catch(error){
        console.log(error);
    }
    return artists
}

const getArtist = async(artistId: number): Promise<ArtistVM | null> => {
    try{
        const artistDb = await Artist.findByPk(artistId, {include: Artist.associations.hashtags})
        const newArtist = new ArtistVM(artistDb.id, artistDb.artistName, artistDb.artistDescription);
        for(const hashtag of artistDb.artistHashtags){
            newArtist.addHashtag(hashtag.hashtagName);
        }
        return newArtist
    }catch(error){
        console.log(error);
        return null;
    }
}

export {
    getArtist,
    getAllArtists
}