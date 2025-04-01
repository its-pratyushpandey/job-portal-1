import mongoose from 'mongoose';
const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
    },
    website: {
        type: String,
        
    },
    location: {
        type: String,
    },
    logo: {
        type: String,
    },
    },{timestamps:true})
    export const Company = mongoose.model('Company', companySchema);