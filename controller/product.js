import Product from "../models/product"

export const getAllProductsStatic = async (req, res) => {

    const productQuery = Product.find({}).select('name price')
    const products = await productQuery

    return res.status(200).json({ products })
}

export const getAllProducts = async (req, res) => {


    const { featured, name, company, sort, field, numaricFilters } = req.query
    const filterObject = {}


    if (featured) {
        filterObject.featured = featured === 'true' ? true : false
    }

    if (name) {
        filterObject.name = { $regex: name, $option: 'i' }
    }

    if (company) {
        filterObject.company = company
    }

    const sortList = sort ? sort.split(',').join(' ') : 'createdAt'

    if (numaricFilters) {

        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        }

        const options = ['price', 'rating']

        const regEx = /\b(<|>|>=|=|<|<=)\b/g

        let filters = numaricFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)

        console.log(`filters => ${filters}`)

        filters = filters.split(',').forEach(element => {
            const [field, operator, value] = element.split('-')
            if (options.includes(field)) {
                filterObject[field] = { [operator]: Number(value) }
            }
        });
    }

    console.log(filterObject)
    let result = Product.find(filterObject).sort(sortList)

    if (field) {
        result = result.select(field.split(',').join(' '))
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)






    const products = await result
    return res.status(200).json({ products, noOfProuct: products.length })
}