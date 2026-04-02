
import type { Business, DaySchedule, SectorData, Attribute, GeologicalLandmark, CulturalEvent, SubscriptionPlan } from './types';
import { Sector, PaymentStatus, Category, GeologicalDifficulty, LandmarkStatus } from './types';

export const initialSubscriptionPlans: SubscriptionPlan[] = [
    {
        id: 1,
        name: 'Básico',
        price: 25000,
        durationInMonths: 1,
        freeMonths: 0,
        color: 'gray',
        permissions: {
            homeCarousel: false,
            topCategory: false,
            routeFeatured: false,
            published: true,
            proGallery: false,
            historicalStory: false,
            campoMarSeal: true,
            posSync: false,
            metricsDashboard: false,
        }
    },
    {
        id: 2,
        name: 'Premium',
        price: 50000,
        durationInMonths: 3,
        freeMonths: 0,
        color: 'blue',
        permissions: {
            homeCarousel: true,
            topCategory: true,
            routeFeatured: false,
            published: true,
            proGallery: true,
            historicalStory: true,
            campoMarSeal: true,
            posSync: false,
            metricsDashboard: true,
        }
    },
    {
        id: 3,
        name: 'Pro',
        price: 80000,
        durationInMonths: 12,
        freeMonths: 1,
        color: 'orange',
        permissions: {
            homeCarousel: true,
            topCategory: true,
            routeFeatured: true,
            published: true,
            proGallery: true,
            historicalStory: true,
            campoMarSeal: true,
            posSync: true,
            metricsDashboard: true,
        }
    }
];

export const initialSectors: SectorData[] = [
  { id: Sector.EL_MORRO, name: 'El Morro', heroTitle: 'El Morro: Tradición y Sabor', backgroundImage: '' },
  { id: Sector.BELLAVISTA, name: 'Bellavista', heroTitle: 'Bellavista: Vistas que Enamoran', backgroundImage: '' },
  { id: Sector.COCHOLGUE, name: 'Cocholgüe', heroTitle: 'Cocholgüe: Caleta de Pescadores', backgroundImage: '' },
  { id: Sector.DICHATO, name: 'Dichato', heroTitle: 'Dichato: Renacer Frente al Mar', backgroundImage: '' },
  { id: Sector.RAFAEL, name: 'Rafael', heroTitle: 'Rafael: Corazón Rural', backgroundImage: '' },
  { id: Sector.MENQUE, name: 'Menque', heroTitle: 'Menque: Tesoros Escondidos', backgroundImage: '' },
  { id: Sector.CORONEY, name: 'Coroney', heroTitle: 'Coroney: Naturaleza Pura', backgroundImage: '' },
  { id: Sector.RINCO, name: 'Rinco', heroTitle: 'Rinco: Tradición Campesina', backgroundImage: '' },
  { id: Sector.PISSIS, name: 'Pissis', heroTitle: 'Pissis: Vistas al Infinito', backgroundImage: '' },
];

export const initialAttributes: Attribute[] = [
    { id: 1, name: 'Terraza', categories: [Category.RESTAURANTE, Category.ALOJAMIENTO] },
    { id: 2, name: 'Wi-Fi', categories: [Category.RESTAURANTE, Category.ALOJAMIENTO, Category.COMERCIO] },
    { id: 3, name: 'Estacionamiento', categories: [Category.RESTAURANTE, Category.ALOJAMIENTO, Category.PANORAMA] },
    { id: 4, name: 'Accesibilidad', categories: [Category.RESTAURANTE, Category.ALOJAMIENTO, Category.COMERCIO, Category.PANORAMA] },
    { id: 5, name: 'Consumo en local', categories: [Category.RESTAURANTE] },
    { id: 6, name: 'Para llevar', categories: [Category.RESTAURANTE, Category.COMERCIO] },
    { id: 7, name: 'Menú Vegano', categories: [Category.RESTAURANTE] },
    { id: 8, name: 'Piscina', categories: [Category.ALOJAMIENTO] },
    { id: 9, name: 'Estacionamiento privado', categories: [Category.ALOJAMIENTO] },
    { id: 10, name: 'Check-in 24h', categories: [Category.ALOJAMIENTO] },
    { id: 11, name: 'Pet Friendly', categories: [Category.ALOJAMIENTO, Category.PANORAMA] },
    { id: 12, name: 'Desayuno incluido', categories: [Category.ALOJAMIENTO] },
    { id: 13, name: 'Tinajas/Hot Tubs', categories: [Category.ALOJAMIENTO] },
    { id: 14, name: 'Acceso a Playa', categories: [Category.ALOJAMIENTO, Category.PANORAMA] },
    { id: 15, name: 'Delivery', categories: [Category.RESTAURANTE, Category.COMERCIO] },
    { id: 16, name: 'Interés Geológico', categories: [Category.PANORAMA, Category.ALOJAMIENTO] },
    { id: 17, name: 'Patrimonio Textil', categories: [Category.COMERCIO] },
    { id: 18, name: 'Producción Agroecológica', categories: [Category.COMERCIO, Category.RESTAURANTE] },
    { id: 19, name: 'Turismo Rural', categories: [Category.ALOJAMIENTO, Category.PANORAMA] },
    { id: 20, name: 'Vino con Historia', categories: [Category.RESTAURANTE, Category.COMERCIO, Category.PANORAMA] },
];

export const certifiedGuides: string[] = [
    'Miriam Sandoval',
    'Carlos Rojas',
    'Equipo Geoparque',
    'Sin Asignar',
];

export const initialGeologicalLandmarks: GeologicalLandmark[] = [
    {
        id: 1,
        name: 'Arco de Piedra (Punta de Lobería)',
        gpsCoordinates: '-36.598, -72.991',
        difficulty: GeologicalDifficulty.MEDIA,
        certifiedGuide: 'Miriam Sandoval',
        geologicalExplanation: 'Formación de arco marino producto de la erosión diferencial en rocas sedimentarias del Cretácico Superior.',
        status: LandmarkStatus.HABILITADO,
    },
    {
        id: 2,
        name: 'Fósiles de Cocholgüe',
        gpsCoordinates: '-36.581, -72.978',
        difficulty: GeologicalDifficulty.BAJA,
        certifiedGuide: 'Equipo Geoparque',
        geologicalExplanation: 'Afloramiento de la Formación Quiriquina, rica en fósiles marinos del Maastrichtiano, incluyendo amonites y bivalvos.',
        status: LandmarkStatus.HABILITADO,
    },
     {
        id: 3,
        name: 'Acantilados de Dichato',
        gpsCoordinates: '-36.545, -72.923',
        difficulty: GeologicalDifficulty.ALTA,
        certifiedGuide: 'Sin Asignar',
        geologicalExplanation: 'Secuencia de terrazas marinas levantadas por la tectónica de placas, que evidencian la historia sísmica de la región.',
        status: LandmarkStatus.CERRADO,
    },
];


const defaultHours: DaySchedule[] = [
    { day: 'Lunes', opens: '09:00', closes: '20:00', closed: false },
    { day: 'Martes', opens: '09:00', closes: '20:00', closed: false },
    { day: 'Miércoles', opens: '09:00', closes: '20:00', closed: false },
    { day: 'Jueves', opens: '09:00', closes: '20:00', closed: false },
    { day: 'Viernes', opens: '09:00', closes: '22:00', closed: false },
    { day: 'Sábado', opens: '10:00', closes: '22:00', closed: false },
    { day: 'Domingo', opens: '', closes: '', closed: true },
];

export const initialBusinesses: Business[] = [
  { 
    id: 1, 
    ownerName: 'Juan Pérez', privateContactNumber: '+56912345678', email: 'juan.perez@cafe.cl',
    adminName: 'Ana Gómez', adminPhoneNumber: '+56987654321', planName: 'Premium',
    category: Category.RESTAURANTE, name: 'Café del Puerto',
    whatsappNumber: '+56911111111', phoneNumber: '+56412555555', googleMapsLink: 'https://maps.app.goo.gl/1',
    hours: defaultHours,
    digitalMenuLink: 'https://menu.cafe.cl',
    serviceAttributes: ['Terraza', 'Estacionamiento', 'Wi-Fi'],
    heroImage: '', galleryImages: ['', '', '', ''],
    specialties: [
      { photo: '', name: 'Latte Vainilla', description: 'Cremoso latte con un toque de vainilla.', price: '3.500', showPrice: true },
      { photo: '', name: 'Cheesecake Frutos Rojos', description: 'Suave cheesecake con mermelada casera.', price: '4.200', showPrice: true },
      { photo: '', name: 'Espresso Doble', description: 'Intenso y aromático café de grano.', price: '2.000', showPrice: false },
    ],
    hasPromotionsActive: true,
    promotions: [
        { id: 'promo-1-1', image: '', title: 'Promo Almuerzo Ejecutivo', normalPrice: 7000, promoPrice: 5000, isActive: true, isFeatured: true },
        { id: 'promo-1-2', image: '', title: '2x1 en Cafés de Especialidad', normalPrice: 5000, promoPrice: 2500, isActive: false, isFeatured: false },
        { id: 'promo-1-3', image: '', title: '', normalPrice: 0, promoPrice: 0, isActive: false, isFeatured: false },
    ],
    selloCampoMar: true,
    productoEstrellaLocal: 'Pastel de Jaiba Fresca',
    relatoHistorico: 'Desde 1985, nuestro café ha sido un punto de encuentro para los pescadores y familias de la zona, manteniendo viva la tradición del buen comer.',
    localPartners: [
      { partnerId: 2, partnerName: 'Artesanías El Faro', productProvided: 'Café de grano local', sector: Sector.EL_MORRO }
    ],
    shortDescription: 'El mejor café con vista al mar.',
    longDescription: 'Disfruta de nuestra selección de granos de especialidad y pastelería artesanal en un ambiente acogedor frente a la bahía. Perfecto para una pausa relajante.',
    sector: Sector.BELLAVISTA, paymentDate: '2024-08-01', 
    paymentStatus: PaymentStatus.AL_DIA, isActive: true, whatsappClicks: 152, 
  },
  { 
    id: 3,
    ownerName: 'María Soto', privateContactNumber: '+56923456789', email: 'maria.soto@lacaleta.cl',
    adminName: 'Carlos Ruiz', adminPhoneNumber: '+56976543210', planName: 'Pro',
    category: Category.RESTAURANTE, name: 'Restaurante La Caleta',
    whatsappNumber: '+56933333333', phoneNumber: '+56412666666', googleMapsLink: 'https://maps.app.goo.gl/3',
    hours: defaultHours.map(d => d.day === 'Lunes' ? {...d, closed: true} : d),
    digitalMenuLink: 'https://menu.lacaleta.cl',
    serviceAttributes: ['Accesibilidad', 'Consumo en local', 'Para llevar'],
    heroImage: '', galleryImages: ['', '', '', ''],
    specialties: [
      { photo: '', name: 'Pastel de Jaiba', description: 'Clásico pastel de jaiba gratinado.', price: '12.900', showPrice: true },
      { photo: '', name: 'Reineta a la Plancha', description: 'Acompañada de agregado a elección.', price: '10.500', showPrice: true },
      { photo: '', name: 'Paila Marina', description: 'Contundente y sabrosa, un clásico local.', price: '11.000', showPrice: true },
    ],
    hasPromotionsActive: false,
    promotions: [],
    shortDescription: 'Pescados y mariscos frescos.',
    longDescription: 'Directo del mar a tu mesa. Somos un restaurante familiar con décadas de tradición en la preparación de los frutos del mar más frescos de la región.',
    sector: Sector.COCHOLGUE, paymentDate: '2024-07-28', 
    paymentStatus: PaymentStatus.PENDIENTE, isActive: true, whatsappClicks: 215,
  },
  { 
    id: 4,
    ownerName: 'Ricardo Lagos', privateContactNumber: '+56934567890', email: 'ricardo.lagos@hotel.cl',
    adminName: 'Ricardo Lagos', adminPhoneNumber: '+56934567890', planName: 'Pro',
    category: Category.ALOJAMIENTO, name: 'Hotel Vista al Mar',
    whatsappNumber: '+56944444444', phoneNumber: '+56412777777', googleMapsLink: 'https://maps.app.goo.gl/4',
    hours: defaultHours.map(d => ({...d, opens: '00:00', closes: '00:00', closed: false})), // 24 horas
    checkIn: '15:00',
    checkOut: '12:00',
    unitTypes: [
      { name: 'Habitación Single', capacity: '1 Persona' },
      { name: 'Habitación Doble', capacity: '2 Personas' },
      { name: 'Suite Presidencial', capacity: '4 Personas' },
    ],
    digitalMenuLink: '',
    serviceAttributes: ['Estacionamiento privado', 'Check-in 24h', 'Wi-Fi', 'Desayuno incluido', 'Interés Geológico'],
    heroImage: '', galleryImages: ['', '', '', ''],
    specialties: [],
    hasPromotionsActive: false,
    promotions: [],
    relatoHistorico: 'Construido sobre los acantilados históricos de Dichato, nuestro hotel ofrece una vista privilegiada a formaciones geológicas únicas en la región.',
    shortDescription: 'Descanso y confort garantizado.',
    longDescription: 'Ofrecemos habitaciones cómodas con vistas espectaculares, desayuno incluido y una atención personalizada para que tu estadía en Tomé sea inolvidable.',
    sector: Sector.DICHATO, paymentDate: '2024-08-02', 
    paymentStatus: PaymentStatus.AL_DIA, isActive: true, whatsappClicks: 320,
  },
    { 
    id: 2,
    ownerName: 'Luisa Morales', privateContactNumber: '+56945678901', email: 'luisa.morales@art.cl',
    adminName: 'Luisa Morales', adminPhoneNumber: '+56945678901', planName: 'Básico',
    category: Category.COMERCIO, name: 'Artesanías El Faro',
    whatsappNumber: '+56922222222', phoneNumber: '+56412888888', googleMapsLink: 'https://maps.app.goo.gl/2',
    hours: defaultHours,
    digitalMenuLink: '',
    serviceAttributes: ['Para llevar'],
    heroImage: '', galleryImages: ['', ''],
    specialties: [],
    hasPromotionsActive: false,
    promotions: [],
    shortDescription: 'Recuerdos únicos de Tomé.',
    longDescription: 'Encuentra artesanía local hecha con materiales de la zona. Souvenirs, tejidos y figuras de madera talladas a mano por artistas locales.',
    sector: Sector.EL_MORRO, paymentDate: '2024-08-05', 
    paymentStatus: PaymentStatus.AL_DIA, isActive: true, whatsappClicks: 78,
  },
    { 
    id: 9,
    ownerName: 'Andrés Castro', privateContactNumber: '+56956789012', email: 'andres.castro@cabanas.cl',
    adminName: 'Andrés Castro', adminPhoneNumber: '+56956789012', planName: 'Premium',
    category: Category.ALOJAMIENTO, name: 'Cabañas El Descanso',
    whatsappNumber: '+56999999999', phoneNumber: '+56412999999', googleMapsLink: 'https://maps.app.goo.gl/9',
    hours: defaultHours,
    checkIn: '16:00',
    checkOut: '11:00',
    unitTypes: [
      { name: 'Cabaña 2 Personas', capacity: '2 Personas' },
      { name: 'Cabaña 4 Personas', capacity: '4 Personas' },
    ],
    digitalMenuLink: '',
    serviceAttributes: ['Estacionamiento privado', 'Terraza', 'Pet Friendly', 'Tinajas/Hot Tubs'],
    heroImage: '', galleryImages: ['', '', '', ''],
    specialties: [],
    hasPromotionsActive: true,
    promotions: [
        { id: 'promo-9-1', image: '', title: '10% Descuento en Temporada Baja', normalPrice: 60000, promoPrice: 54000, isActive: true, isFeatured: false },
        { id: 'promo-9-2', image: '', title: 'Noche Adicional Gratis (4+1)', normalPrice: 60000, promoPrice: 0, isActive: true, isFeatured: true },
        { id: 'promo-9-3', image: '', title: 'Tinaja Caliente Incluida', normalPrice: 20000, promoPrice: 0, isActive: false, isFeatured: false },
    ],
    shortDescription: 'Tu refugio en la naturaleza.',
    longDescription: 'Cabañas completamente equipadas para familias y parejas. Disfruta de la tranquilidad del bosque y la cercanía a las playas más hermosas.',
    sector: Sector.DICHATO, paymentDate: '2024-08-08', 
    paymentStatus: PaymentStatus.PENDIENTE, isActive: false, whatsappClicks: 140,
  },
];

export const initialCulturalEvents: CulturalEvent[] = [
    {
        id: 1,
        name: 'Fiesta de la Tortilla de Rescoldo',
        location: Sector.RINCO,
        startDate: '2024-10-12',
        endDate: '2024-10-13',
        linkedBusinesses: [3], // Restaurante La Caleta
        promoBannerUrl: '',
    },
    {
        id: 2,
        name: 'Semana de la Jaiba',
        location: Sector.COCHOLGUE,
        startDate: '2024-11-20',
        endDate: '2024-11-27',
        linkedBusinesses: [1, 3], // Café del Puerto, Restaurante La Caleta
        promoBannerUrl: '',
    },
    {
        id: 3,
        name: 'Festival de la Cerveza Artesanal',
        location: Sector.DICHATO,
        startDate: '2025-01-18',
        endDate: '2025-01-19',
        linkedBusinesses: [1, 4, 9], // Café del Puerto, Hotel Vista al Mar, Cabañas El Descanso
        promoBannerUrl: '',
    }
];