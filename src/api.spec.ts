import * as dotenv from 'dotenv';
import * as nconf from 'nconf';

dotenv.config();

nconf
  .argv()
  .env()
  .required(['ACCESS_TOKEN']);
