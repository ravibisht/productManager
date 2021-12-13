
export default async (err, req, res, next) => {
    console.log(err)
    return res.status(4).json("")
}
