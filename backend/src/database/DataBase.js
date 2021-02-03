import mongoose from 'mongoose'

const run = () => {
    return new Promise(((resolve, reject) => {
        mongoose.connect(process.env.APP_MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
        const db = mongoose.connection;
        db.on('error', () => {
            console.error.bind(console, 'connection error:')
            reject(null)
        });
        db.once('open', function () {
            console.log('db connected')
            resolve(db)
        });
    }))

}

const DB = {
    connect: () => run()
}

export {
    DB as DataBase
}