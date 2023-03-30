import dotenv from 'dotenv';

dotenv.config()

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });


const env = {
  odaAccessToken: process.env.ODA_ACCESS_TOKEN,
};

export default env;