import { Product, QuizQuestion } from './types';

export const HERO_PRODUCT: Product = {
  id: 'eclat_de_nuit',
  name: 'ÉCLAT DE NUIT',
  tagline: 'La nouvelle eau de parfum inspirée par Paris.',
  collection: 'Éditions Limitées',
  price: 185,
  image: '/src/assets/images/editions_limitees_1780835960654.png',
  description: 'Un éclat étincelant dans l\'obscurité parisienne. Éclat de Nuit marie le mystère captivant du safran et de l\'ambre liquide à la sensualité naturelle de la rose de Damas fraîchement éclose.',
  volume: ['50ml', '100ml'],
  notes: {
    top: 'Orange Amère, Safran de Grèce, Poivre Rose',
    heart: 'Jasmin Secret, Rose de Damas, Bois de Cèdre',
    base: 'Ambre Liquide, Gousse de Vanille, Patchouli Indien'
  },
  family: 'Warm & Spicy',
  intensity: 'Intense & Magnetic',
  character: 'Romantique, mystérieux, infiniment lumineux.'
};

export const PRODUCTS: Product[] = [
  {
    id: 'bleu_eternel',
    name: 'BLEU ÉTERNEL',
    tagline: 'L\'infini azuré capturé dans le cristal.',
    collection: 'Les Classiques Éternels',
    price: 145,
    image: '/src/assets/images/classiques_eternels_1780835908152.png',
    description: 'Une fraîcheur océanique d\'une élégance intemporelle. Les embruns marins rencontrent la vivacité de la bergamote de Calabre avant de s\'épanouir sur un fond minéral de mousse de chêne.',
    volume: ['50ml', '100ml', '200ml'],
    notes: {
      top: 'Bergamote de Calabre, Sel de Mer, Pamplemousse',
      heart: 'Figue Bleue, Romarin, Néroli des Indes',
      base: 'Vétiver Sombre, Musc Blanc, Mousse de Chêne'
    },
    family: 'Fresh & Citrusy',
    intensity: 'Moderate & Elegant',
    character: 'Calme, noble, souverain et vivifiant.'
  },
  {
    id: 'or_exquise',
    name: 'OR D\'EXQUISE',
    tagline: 'La quintessence de l\'opulence dorée.',
    collection: 'Les Signatures Exclusives',
    price: 210,
    image: '/src/assets/images/signatures_exclusives_1780835922976.png',
    description: 'Une fragrance d\'or pur et de feu liquide. Les épices précieuses se mêlent au bois d\'oud sensuel et au santal crémeux pour créer un sillage magnétique d\'une intensité absolue.',
    volume: ['50ml', '100ml'],
    notes: {
      top: 'Safran d\'Iran, Grains de Cardamome, Encens Royal',
      heart: 'Rose Turque, Ambre Sec, Écorce d\'Oud',
      base: 'Bois de Santal Noir, Patchouli d\'Indonésie, Vanille de Bourbon'
    },
    family: 'Woody & Smoky',
    intensity: 'Intense & Magnetic',
    character: 'Somptueux, hypnotique, boisé et enveloppant.'
  },
  {
    id: 'satin_noir',
    name: 'SATIN NOIR',
    tagline: 'La caresse d\'un velours olfactif.',
    collection: 'Les Soins Parfumés',
    price: 135,
    image: '/src/assets/images/soins_parfumes_1780835940114.png',
    description: 'Un parfum de peau délicat et intime. Comme une chemise en soie noire sur une peau encore chaude, il combine la douceur poudrée de l\'ambrette au fond noble de cashmeran.',
    volume: ['50ml', '100ml'],
    notes: {
      top: 'Pêche Veloutée, Graine d\'Ambrette',
      heart: 'Feuille de Violette, Rose Blanche, Cèdre Blanc',
      base: 'Bois de Cachemire, Musc Blanc Poudré, Santal Laiton'
    },
    family: 'Woody & Smoky',
    intensity: 'Soft & Intimate',
    character: 'Intime, mystérieux, propre et réconfortant.'
  }
];

// All products combined for reference
export const ALL_PRODUCTS = [HERO_PRODUCT, ...PRODUCTS];

export const ART_PILLARS = [
  {
    id: 'ingredients',
    title: 'INGRÉDIENTS D\'EXCEPTION',
    subtitle: 'Nectars précieux & Terroirs préservés',
    description: 'Chaque flacon abrite des absolus de fleurs de Grasse récoltées à l\'aube, associées à des essences de bois sauvages provenant de coopératives éthiques à travers le monde.',
    stats: '94% d\'ingrédients d\'origine naturelle'
  },
  {
    id: 'savoir_faire',
    title: 'SAVOIR-FAIRE ARTISANAL',
    subtitle: 'L\'excellence parfumante française',
    description: 'Nos jus vieillissent patiemment en cuve selon un procédé de macération traditionnel d\'un mois, orchestré par notre maître parfumeur à Grasse, garantissant une tenue incomparable.',
    stats: 'Macération de 28 jours en fût de chêne'
  },
  {
    id: 'durabilite',
    title: 'DURABILITÉ & ÉTHIQUE',
    subtitle: 'Concevoir pour les générations futures',
    description: 'Nos flacons précieux en verre strié sont éco-conçus pour être rechargeables à l\'infini. Nos coffrets sont façonnés à la main en France à partir de fibres recyclées locales.',
    stats: 'Flacons 100% rechargeables & recyclables'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: 'Quelle est l\'intensité que vous recherchez ?',
    subtitle: 'L\'empreinte olfactive que vous laissez derrière vous.',
    options: [
      {
        value: 'Soft & Intimate',
        label: 'Sillage de Peau',
        description: 'Discret, intime. Une fragrance qui chuchote et ne se révèle qu\'aux personnes proches.',
        iconName: 'Wind'
      },
      {
        value: 'Moderate & Elegant',
        label: 'Intensité Équilibrée',
        description: 'Une signature élégante qui vous accompagne au bureau et en soirée sans jamais s\'imposer.',
        iconName: 'Sparkles'
      },
      {
        value: 'Intense & Magnetic',
        label: 'Sillage Majestueux',
        description: 'Opulent, mémorable. Un sillage puissant et chaleureux qui marque les esprits.',
        iconName: 'Flame'
      }
    ]
  },
  {
    id: 2,
    text: 'Quel univers de fragrances résonne avec vous ?',
    subtitle: 'La famille de notes aromatiques qui éveille vos sens.',
    options: [
      {
        value: 'Woody & Smoky',
        label: 'Boisés & Cuivrés',
        description: 'Santal envoûtant, cèdre noble, résines chaudes, encens mystique.',
        iconName: 'Trees'
      },
      {
        value: 'Fresh & Citrusy',
        label: 'Aromatiques & Hespéridés',
        description: 'Pamplemousse pétillant, bergamote de Calabre, embruns salins frais.',
        iconName: 'Compass'
      },
      {
        value: 'Warm & Spicy',
        label: 'Ambrés & Épicés',
        description: 'Safran ensorcelant, gousse de vanille noire, cardamome enivrante.',
        iconName: 'Sun'
      }
    ]
  },
  {
    id: 3,
    text: 'Dans quel décor imaginaire aimeriez-vous vous évader ?',
    subtitle: 'La scène sensorielle idéale pour votre sillage.',
    options: [
      {
        value: 'eclat_de_nuit', // Perfect match for Éclat de Nuit
        label: 'Une nuit magique sous le ciel de Paris',
        description: 'Un dîner intime en terrasse avec vue sur les toits scintillants et la Seine.',
        iconName: 'Moon'
      },
      {
        value: 'bleu_eternel', // Perfect match for Bleu Éternel
        label: 'Un verger sauvage fouetté par les embruns amarante',
        description: 'Respirer l\'écume marine mêlée à la douceur d\'un arbre à figues au soleil.',
        iconName: 'Waves'
      },
      {
        value: 'or_exquise', // Perfect match for Or d'Exquise
        label: 'Une bibliothèque feutrée au coin d\'un feu crépitant',
        description: 'La chaleur des tapisseries anciennes, du bois ciré et d\'un thé noir fumant.',
        iconName: 'BookOpen'
      },
      {
        value: 'satin_noir', // Perfect match for Satin Noir
        label: 'Un cocon de draps de soie blanche au réveil',
        description: 'La lumière douce qui filtre à travers les voilages, le confort absolu.',
        iconName: 'Crown'
      }
    ]
  }
];
