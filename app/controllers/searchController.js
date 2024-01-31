
function searchController(){
    return {
        searchPost(req, res){
            const goToProfile = req.body.search;

            res.redirect(`/profile/${goToProfile}`);
        },

        loadSearchProfile(req, res){
            const uniqueId = req.params.uniqueId;

            res.render(`search/profile`, {uniqueId: uniqueId})
        },

        loadHomeSearchProfile(req, res){
            const uniqueId = req.params.uniqueId;

            res.render(`home`, {userSeen: uniqueId})
        }
    }
}

module.exports = searchController;