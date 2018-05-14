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

# Implementation Status

| API                        | Completed          |
| -------------------------- | :----------------: |
| Create an Activity         |                    |
| Get Activity               | :heavy_check_mark: |
| List Activity Comments     | :heavy_check_mark: |
| List Activity Kudoers      | :heavy_check_mark: |
| List Activity Laps         | :heavy_check_mark: |
| List Athlete Activities    | :heavy_check_mark: |
| Get Activity Zones         | :heavy_check_mark: |
| Update Activity            |                    |
| Get Authenticated Athlete  | :heavy_check_mark: |
| Get Zones                  | :heavy_check_mark: |
| Get Athlete Stats          | :heavy_check_mark: |
| Update Athlete             |
| List Club Activities       |
| List Club Administrators   |
| Get Club                   |
| List Club Members          |
| List Athlete Clubs         |
| Join Club                  |
| Leave Club                 |
| Get Equipment              | :heavy_check_mark: |
| Get Route                  |
| List Athlete Routes        |
| Get Running Race           |
| List Running Races         |
| List Segment Efforts       |
| Get Segment Effort         |
| Explore segments           |
| Get Segment Leaderboard    |
| List Starred Segments      |
| Get Segment                |
| Star Segment               |
| Get Activity Streams       | :heavy_check_mark: |
| Get segment effort streams |
| Get Segment Streams        |
| Upload Activity            |
| Get Upload                 |

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
