console.log("this is loaded");

exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
};
exports.band = {
    id: process.env.BANDS_API_KEY

};

exports.omdb = {
    id: process.env.OMDB_API_KEY

};
