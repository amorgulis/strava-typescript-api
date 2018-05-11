# strava-typescript-api

TypeScript wrapper for the Strava V3 API.

## Installing

Install with npm:

```
npm install strava-typescript-api
```

## Usage

```
import * as dotenv from 'dotenv';
import { Strava } from 'strava-typescript-api';

dotenv.config();

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

(async function() {
  const strava = new Strava(ACCESS_TOKEN);
  const athlete = await stravaApi.getLoggedInAthlete();

  // ...
})();
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
