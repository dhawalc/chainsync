export interface Location {
  id: string;
  name: string;
  type: string;
  description: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  latitude: number;
  longitude: number;
  timezone: string;
  supplier?: string;
  isInternal: boolean;
  isActive: boolean;
  created_at: string;
  updated_at: string;
} 