module.exports = (image) => {
    return { 
        path: image.path.replace(/\\/g, '/'), 
        mimeType: image.mimetype 
    }
}