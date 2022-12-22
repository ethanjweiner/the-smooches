require('dotenv').config();

const { PORT, MONGODB_URI, NODE_ENV, CLOUDFRONT_DIST_DOMAIN } = process.env;

export default { PORT, MONGODB_URI, NODE_ENV, CLOUDFRONT_DIST_DOMAIN };
