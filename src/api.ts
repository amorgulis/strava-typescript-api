import axios, { AxiosResponse } from 'axios';

// TODO: move to config
const STRAVA_API_URL = 'https://www.strava.com/api/v3';

export class Strava {
  constructor(private stravaApiUrl: string, private accessToken: string) {}

  private async doRequest<T>(path: string, params): Promise<AxiosResponse<T>> {
    const url = `${this.stravaApiUrl}/${path}`;

    return axios.get<T>(url, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    });
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
      keys: keys,
      key_by_type: keyByType
    });
  }
}

export enum StreamKeys {
  Time,
  Distance,
  LatLng,
  Altitude,
  VelocitySmooth,
  Heartrate,
  Cadence,
  Watts,
  Temp,
  Moving,
  GradeSmooth
}

interface StreamSet {
  streams: Stream[];
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
