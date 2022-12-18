require('dotenv').config();

const { PORT, MONGODB_URI } = process.env;

export default { PORT, MONGODB_URI };
