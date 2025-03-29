const cloudinaryConfig = require('../config/cloudinary');

const cloudinary = cloudinaryConfig();

const uploadToCloudinary = async (file, oldPublicId, options = {}) => {
    try {
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: options.folder || 'uploads', // Mặc định folder là 'uploads'
                    public_id: options.publicId || `${Date.now()}_${Math.random().toString(36).substring(2)}`,
                    transformation: options.transformation || [{ width: 500, height: 500, crop: 'limit' }],
                    ...options.extra // Các tùy chọn bổ sung nếu có
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            uploadStream.end(file.buffer);
        });

        // Xóa ảnh cũ nếu có oldPublicId
        if (oldPublicId) {
            await cloudinary.uploader.destroy(oldPublicId);
        }

        return result;
    } catch (error) {
        throw new Error('Lỗi khi upload ảnh: ' + error.message);
    }
};


const deleteFromCloudinary = async (publicId) => {
    try {
        if (!publicId) {
            throw new Error('Public ID không hợp lệ');
        }

        const result = await cloudinary.uploader.destroy(publicId);

        if (result.result !== 'ok') {
            throw new Error('Xóa ảnh thất bại');
        }

        return { success: true, message: 'Ảnh đã được xóa' };
    } catch (error) {
        throw new Error('Lỗi khi xóa ảnh: ' + error.message);
    }
};

module.exports = {
    uploadToCloudinary,
    deleteFromCloudinary
};