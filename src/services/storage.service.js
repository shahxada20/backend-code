const Imagekit = require("@imagekit/nodejs");


const imageKit_client = new Imagekit({
    privateKey: process.env['IMAGEKIT_PRIVATE_KEY']
});


async function uploadFile(buffer) {
    try {
        const response = await imageKit_client.files.upload({
            file: buffer.toString("base64"),
            fileName: `image_${Date.now()}.jpg`,
        });
        return response;
    }
    catch (error) {
        console.error("ImageKit SDK Internal Error Details: ", error.message);
        throw error;
    }
}

module.exports = { uploadFile }