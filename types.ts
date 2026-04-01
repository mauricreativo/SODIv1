
export interface PlanPermissions {
  // Visibilidad
  homeCarousel: boolean;
  topCategory: boolean;
  routeFeatured: boolean;
  // Funciones
  proGallery: boolean;
  historicalStory: boolean;
  campoMarSeal: boolean;
  // Tech
  posSync: boolean;
  metricsDashboard: boolean;
}

export interface SubscriptionPlan {
  id: number;
  name: string;
  price: number;
  durationInMonths: 1 | 3 | 12;
  permissions: PlanPermissions;
  color: 'gray' | 'blue' | 'orange'; // For badges
}

export enum Sector {
  EL_MORRO = 'El Morro',
  BELLAVISTA = 'Bellavista',
  COCHOLGUE = 'Cocholgüe',
  DICHATO = 'Dichato',
  RAFAEL = 'Rafael',
  MENQUE = 'Menque',
  CORONEY = 'Coroney',
  RINCO = 'Rinco',
  PISSIS = 'Pissis',
}

export enum PaymentStatus {
  AL_DIA = 'Al día',
  PENDIENTE = 'Pendiente',
}

export enum Category {
  RESTAURANTE = 'Restaurante',
  ALOJAMIENTO = 'Alojamiento',
  COMERCIO = 'Comercio',
  PANORAMA = 'Panorama',
}

export enum GeologicalDifficulty {
    BAJA = 'Baja',
    MEDIA = 'Media',
    ALTA = 'Alta',
}

export enum LandmarkStatus {
    HABILITADO = 'Habilitado',
    CERRADO = 'Cerrado por Clima',
}

export interface Specialty {
  photo: string; // URL or placeholder
  name: string;
  description: string;
  price: string;
  showPrice: boolean;
}

export interface Promotion {
  id: string;
  title: string;
  normalPrice: number;
  promoPrice: number;
  image: string;
  isActive: boolean;
  isFeatured: boolean;
}

export interface DaySchedule {
  day: string;
  opens: string;
  closes: string;
  closed: boolean;
}

export interface Attribute {
  id: number;
  name: string;
  categories: Category[];
}

export interface UnitType {
  name: string;
  capacity: string;
}

export interface GeologicalLandmark {
    id: number;
    name: string;
    gpsCoordinates: string;
    difficulty: GeologicalDifficulty;
    certifiedGuide: string;
    geologicalExplanation: string;
    status: LandmarkStatus;
}

export interface CulturalEvent {
    id: number;
    name: string;
    location: Sector;
    startDate: string; // YYYY-MM-DD
    endDate: string;   // YYYY-MM-DD
    linkedBusinesses: number[]; // Array of Business IDs
    promoBannerUrl: string;
}

export interface LocalPartner {
  partnerId: number;
  productProvided: string;
  partnerName: string;
  sector: string;
}

export interface Business {
  id: number;
  // Bloque 1: Gestión Administrativa
  ownerName: string;
  privateContactNumber: string;
  email: string;
  adminName: string;
  adminPhoneNumber: string;
  planName: string;
  
  // Bloque 2: Información para la Web
  category: Category;
  name: string; // Nombre del Local (Público)
  whatsappNumber: string;
  phoneNumber: string; // Para llamadas directas
  googleMapsLink: string;
  
  // Bloque 3: Horarios
  hours: DaySchedule[];
  
  // Bloque 4: Lógica Especial (Restaurante)
  digitalMenuLink?: string;
  specialties?: Specialty[];

  // Bloque 4.5: Lógica Especial (Alojamiento)
  checkIn?: string;
  checkOut?: string;
  unitTypes?: UnitType[];

  // Bloque 5: Atributos
  serviceAttributes: string[];

  // Bloque 6: Medios
  heroImage: string; // URL or placeholder
  galleryImages: string[]; // Array of URLs or placeholders
  
  // Bloque 7: Promociones
  hasPromotionsActive?: boolean;
  promotions?: Promotion[];
  
  // PLADETUR Fields
  selloCampoMar?: boolean;
  productoEstrellaLocal?: string;
  relatoHistorico?: string;
  localPartners?: LocalPartner[];

  // Campos existentes
  shortDescription: string;
  longDescription: string;
  sector: Sector;
  paymentDate: string;
  paymentStatus: PaymentStatus;
  isActive: boolean;
  whatsappClicks: number;
}

export interface SectorData {
  id: Sector;
  name: string;
  heroTitle: string;
  backgroundImage: string;
}