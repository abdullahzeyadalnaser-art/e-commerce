class ApiFeatures {
  constructor(mongoosQuery, queryString) {
    this.mongoosQuery = mongoosQuery;
    this.queryString = queryString;
  }
  filter() {
    const queryStringObj = { ...this.queryString };
    const excludesFields = ["page", "sort", "limit", "fields"];
    excludesFields.forEach((field) => delete queryStringObj[field]);

    //Apply filtration using [gte .gt .lte ,lt]
    let queryStr = JSON.stringify(queryStringObj);
    queryStr = queryStr.replace(/(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.mongoosQuery = this.mongoosQuery.find(JSON.parse(queryStr));
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      //price , -sold  ==> [price ,-sold]   price-sold
      const sortBy = req.query.sort.split(",").join(``);

      this.mongoosQuery = this.mongoosQuery.sort(sortBy);
    } else {
      this.mongoosQuery = this.mongoosQuery.sort(`-createAt`);
    }
    return this;
  }
  limitFfields() {
    if (this.queryString.fields) {
      //title,ratingsAverage,imageCover,price
      const fields = req.query.fields.split(",").join(` `);
      //title ratingsAverage imageCover price
      this.mongoosQuery = this.mongoosQuery.select(fields);
    } else {
      this.mongoosQuery = this.mongoosQuery.select(`-_v`);
    }
    return this;
  }
  search(modeName) {
    if (this.queryString.Keyword) {
      let query = {};
      if (modeName == "products") {
        query.$or = [
          { title: { $regex: req.query.Keyword, $option: "i" } },
          { description: { $regex: req.query.Keyword, $option: "i" } },
        ];
      } else {
        query = { name: { $regex: req.query.Keyword, $option: "i" } };
      }

      this.mongoosQuery = this.mongoosQuery.find(query);
    }
    return this;
  }
  paginate(couintDocument) {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 50;
    const skip = (page - 1) * limit;
    const endIndex = page * limit; //2 * 10  =20

    // pagination
    const pagination = {};
    pagination.currentPage = page;
    pagination.limit = limit;
    pagination.numberOfpahes = Math.ceil(couintDocument / limit); //الفنكشن للتقريب للرقم الاكبر

    //next page
    if (endIndex < couintDocument) {
      pagination.next = page + 1;
    }
    if (skip > 0) {
      pagination.prev = page - 1;
    }

    this.mongoosQuery = this.mongoosQuery.skip(skip).limit(limit);
    this.paginationResult = pagination;
    return this;
  }
}

module.exports = ApiFeatures;
