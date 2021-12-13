import mongoose from 'mongoose'

export default async (url) => {
    mongoose.connect(url)
}