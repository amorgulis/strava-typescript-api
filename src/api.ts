import axios, { AxiosResponse } from 'axios';

const STRAVA_API_URL = 'https://www.strava.com/api/v3';

export class Strava {
  constructor(private accessToken: string) { }

  private async doRequest<T>(path: string, params): Promise<T> {
    const url = `${STRAVA_API_URL}/${path}`;

    return axios
      .get<T>(url, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        },
        params: params
      })
      .then(res => res.data);
  }

  /**
   * Returns the given activity's streams
   * @param id The identifier of the activity.
   * @param keys Desired stream types.
   * @param keyByType Must be true.
   * @returns An array of the requested streams.
   */
  async getActivityStreams(
    id: number,
    keys: StreamKeys[],
    keyByType: boolean = true
  ) {
    const path = `activities/${id}/streams`;

    return this.doRequest<StreamSet>(path, {
      keys: keys.join(','),
      key_by_type: keyByType
    });
  }
}

export enum StreamKeys {
  Time = 'time',
  Distance = 'distance',
  LatLng = 'latlng',
  Altitude = 'altitude',
  VelocitySmooth = 'velocity_smooth',
  Heartrate = 'heartrate',
  Cadence = 'cadence',
  Watts = 'watts',
  Temp = 'temp',
  Moving = 'moving',
  GradeSmooth = 'grade_smooth'
}

interface StreamSet {
  time: Stream;
  distance: Stream;
  latlng: Stream;
  altitude: Stream;
  velocity_smooth: Stream;
  heartrate: Stream;
  cadence: Stream;
  watts: Stream;
  temp: Stream;
  moving: Stream;
  grade_smooth: Stream;
}

interface Stream {
  type:
  | 'time'
  | 'distance'
  | 'latlng'
  | 'altitude'
  | 'velocity_smooth'
  | 'heartrate'
  | 'cadence'
  | 'watts'
  | 'temp'
  | 'moving'
  | 'grade_smooth';
  original_size: number;
  resolution: 'low' | 'medium' | 'high';
  series_type: 'distance' | 'time';
  data: number[];
}
