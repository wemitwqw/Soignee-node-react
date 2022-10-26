exports.getImage = async (req, res) => {
    const { filename } = req.params;
    res.sendFile( `${process.cwd()}/uploads/` + filename );
}