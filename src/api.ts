import axios, { AxiosResponse } from 'axios';

const STRAVA_API_URL = 'https://www.strava.com/api/v3';

export class Strava {
  constructor(private accessToken: string) {}

  private async doRequest<T>(path: string, params?: object): Promise<T> {
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
   * Returns the currently authenticated athlete
   * @returns Returns the currently authenticated athlete.
   */
  async getLoggedInAthlete() {
    const path = 'athlete';

    return this.doRequest<DetailedAthlete>(path);
  }

  /**
   * Returns the activity stats of an athlete
   * @param id The identifier of the athlete.
   * @param page Page number.
   * @param perPage Number of items per page. Defaults to 30.
   * @returns Returns the activity stats of an athlete.
   */
  async getAthleteStats(id: number, page?: number, perPage?: number) {
    const path = `athletes/${id}/stats`;

    return this.doRequest<ActivityStats>(path, {
      page: page,
      per_page: perPage
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
      keys: keys.join(','),
      key_by_type: keyByType
    });
  }
}

interface ActivityStats {
  biggest_ride_distance: number;
  biggest_climb_elevation_gain: number;
  recent_ride_totals: ActivityTotal;
  recent_run_totals: ActivityTotal;
  recent_swim_totals: ActivityTotal;
  ytd_ride_totals: ActivityTotal;
  ytd_run_totals: ActivityTotal;
  ytd_swim_totals: ActivityTotal;
  all_ride_totals: ActivityTotal;
  all_run_totals: ActivityTotal;
  all_swim_totals: ActivityTotal;
}

interface ActivityTotal {
  count: number;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  elevation_gain: number;
  achievement_count: number;
}

enum ResourceState {
  Meta = 1,
  Summary = 2,
  Detail = 3
}

enum SportType {
  Cycling = 'cycling',
  Running = 'running',
  Triathlon = 'triathlon',
  Other = 'other'
}

enum Sex {
  Female = 'F',
  Male = 'M'
}

enum FollowerStatus {
  Pending = 'pending',
  Accepted = 'accepted',
  Blocked = 'blocked'
}

enum UnitSystem {
  Feet = 'feet',
  Meters = 'meters'
}

interface DetailedAthlete {
  id: number;
  resource_state: ResourceState;
  firstname: string;
  lastname: string;
  profile_medium: string;
  profile: string;
  city: string;
  state: string;
  country: string;
  sex: string;
  friend: FollowerStatus;
  follower: FollowerStatus;
  premium: boolean;
  created_at: Date;
  updated_at: Date;
  follower_count: number;
  friend_count: number;
  mutual_friend_count: number;
  measurement_preference: UnitSystem;
  email: string;
  ftp: number;
  weight: number;
  clubs: SummaryClub;
  bikes: SummaryGear;
  shoes: SummaryGear;
}

interface SummaryClub {
  id: number;
  resource_state: ResourceState;
  name: string;
  profile_medium: string;
  cover_photo: string;
  cover_photo_small: string;
  sport_type: SportType;
  city: string;
  state: string;
  country: string;
  private: boolean;
  member_count: number;
  featured: boolean;
  verified: boolean;
  url: string;
}

interface SummaryGear {
  id: string;
  resource_state: ResourceState;
  primary: boolean;
  name: string;
  distance: number;
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
