// This matches the exact columns we will build in PostgreSQL
export interface Store {
  id: string; // UUID
  name: string; // VARCHAR
  latitude: number; // We will use decimals for GPS
  longitude: number; // We will use decimals for GPS
  created_at: Date; // TIMESTAMP
}
