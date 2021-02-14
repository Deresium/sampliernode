import ReleaseVM from "../viewmodels/ReleaseVM";
import Release from "../models/Release";

const getAllReleases = async(): Promise<Array<ReleaseVM>> => {
    const releases = new Array<ReleaseVM>();
    try {
        const releasesDb = await Release.findAll({include: Release.associations.artist});
        for(const releaseDb of releasesDb){
            releases.push(new ReleaseVM(
                releaseDb.id,
                releaseDb.releaseName,
                releaseDb.releaseDescription,
                releaseDb.releaseArtistId,
                releaseDb.releaseArtistName,
                releaseDb.releaseType,
                releaseDb.releaseDate)
            );
        }
        return releases;
    }catch(error){
        return releases;
    }
}

const getRelease = async(releaseId: number): Promise<ReleaseVM | null> => {
    try {
        const releaseDb = await Release.findByPk(releaseId, {include: Release.associations.artist});
        return new ReleaseVM(
            releaseDb.id,
            releaseDb.releaseName,
            releaseDb.releaseDescription,
            releaseDb.releaseArtistId,
            releaseDb.releaseArtistName,
            releaseDb.releaseType,
            releaseDb.releaseDate
        );
    }catch(error){
        return null
    }
}

export{
    getAllReleases,
    getRelease
}