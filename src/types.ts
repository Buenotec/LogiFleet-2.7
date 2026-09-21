export type DocumentStatus = 'vencido' | 'critico' | 'atencao' | 'ok' | 'pagos';

export interface Document {
  type: string;
  expiryDate: string;
  rawExpiryDate?: string;
  status: DocumentStatus;
  daysRemaining: number;
  validityPeriod?: string;
}

export interface Vehicle {
  id: string;
  fleet: string;
  plate: string;
  driver: string;
  operation: string;
  client: string;
  cityBase: string;
  vehicleType: string;
  status: string;
  hasBathroom?: string;
  documents: Document[];
  lastUpdate: string;
  origin: string;
  lat?: number;
  lng?: number;
  overallStatus: DocumentStatus;
  source?: "LICENCAS" | "DOCUMENTACAO";
  extraData?: any;
  isDefaultLocation?: boolean;
  isPreferredLocation?: boolean;
  defaultLocationName?: string;
  rawCity?: string;
  rawDriver?: string;
  resolvedCoords?: [number, number] | null;
}

export interface FleetStats {
  totalVehicles: number;
  activeOperations: number;
  expiringDocs: number;
  expiredDocs: number;
  ok: number;
  atencao: number;
  critico: number;
  vencido: number;
  expiredDocuments: { plate: string, type: string, expiryDate: string, driver: string }[];
}

export interface LicenseJustification {
  id: string;
  plate: string;
  fleet: string;
  operation: string;
  documentType: string;
  status: string;
  reason: string;
  authorizedBy: string;
  actionForecast: string;
  observations: string;
  updatedAt: string;
  updatedBy?: string;
}
