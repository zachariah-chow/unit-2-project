module.exports.get404Page = (req, res) => {
    res.status(404).render('./errors/404');
}