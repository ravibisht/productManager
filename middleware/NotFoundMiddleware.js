import NotFoundException from "../exception/NotFoundException.js";

export default (req, res, next) => {
    const exception = new NotFoundException(`Request URL ${req.baseUrl}${req.url} Not Found`)
    return res.status(exception.statusCode).json(exception)
}
