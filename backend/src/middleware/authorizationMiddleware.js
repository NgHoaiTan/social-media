const Bio = require("../models/Bio");
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const mongoose = require('mongoose')

const resourceModels = {
    Post,
    Comment,
    Bio
}

const restrictToOwner = (resourceType, idField = 'id') => {
    return async (req, res, next) => {
        try {
            const Model = resourceModels[resourceType];
            if (!Model) {
                return res.status(400).json({ message: `Invalid resource type: ${resourceType}` });
            }

            const resourceId = req.params[idField]; // Lấy ID từ params
            if (!mongoose.isValidObjectId(resourceId)) {
                return res.status(400).json({ message: `Invalid ${resourceType} ID format` });
            }

            const resource = await Model.findById(resourceId);
            if (!resource) {
                return res.status(404).json({ message: `${resourceType} not found` });
            }

            // Kiểm tra quyền sở hữu
            if (resource.author.toString() !== req.userId) {
                return res.status(403).json({
                    message: `You are not authorized to perform this action on this ${resourceType.toLowerCase()}`,
                });
            }
            next();
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    };
};

module.exports = restrictToOwner;