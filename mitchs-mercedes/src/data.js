// Dropdown reference data for Mercedes-Benz vehicles.

export const YEARS = Array.from({ length: 2027 - 1975 + 1 }, (_, i) => 2027 - i)

// Grouped by class. `nhtsa` is the model name NHTSA's recall database most commonly uses.
export const MODEL_GROUPS = {
  'C-Class': ['C230', 'C240', 'C250', 'C280', 'C300', 'C320', 'C350', 'C43 AMG', 'C55 AMG', 'C63 AMG', 'C63 AMG S', 'C400', 'C450 AMG', 'C-Class (other)'],
  'E-Class': ['E320', 'E350', 'E400', 'E450', 'E500', 'E550', 'E53 AMG', 'E55 AMG', 'E63 AMG', 'E63 AMG S', 'E300', 'E250 BlueTEC', 'E350 BlueTEC', 'E-Class (other)'],
  'S-Class': ['S320', 'S350', 'S400', 'S430', 'S450', 'S500', 'S550', 'S560', 'S580', 'S600', 'S63 AMG', 'S65 AMG', 'S680 Maybach', 'S-Class (other)'],
  'A / CLA / CLS': ['A220', 'A35 AMG', 'CLA250', 'CLA45 AMG', 'CLS400', 'CLS450', 'CLS500', 'CLS550', 'CLS63 AMG', 'CLK320', 'CLK350', 'CLK430', 'CLK500', 'CLK550', 'CLK63 AMG'],
  'SUV – GLA / GLB / GLC': ['GLA250', 'GLA45 AMG', 'GLB250', 'GLC300', 'GLC350e', 'GLC43 AMG', 'GLC63 AMG', 'GLK250 BlueTEC', 'GLK350'],
  'SUV – GLE / ML / GLS / GL': ['ML250 BlueTEC', 'ML320', 'ML350', 'ML430', 'ML500', 'ML550', 'ML63 AMG', 'GLE350', 'GLE450', 'GLE53 AMG', 'GLE580', 'GLE63 AMG', 'GL320 BlueTEC', 'GL350 BlueTEC', 'GL450', 'GL550', 'GL63 AMG', 'GLS450', 'GLS580', 'GLS600 Maybach', 'GLS63 AMG'],
  'G-Class': ['G320', 'G500', 'G550', 'G55 AMG', 'G63 AMG', 'G65 AMG'],
  'SL / SLK / SLC / AMG GT': ['SL320', 'SL500', 'SL550', 'SL600', 'SL55 AMG', 'SL63 AMG', 'SL65 AMG', 'SLK230', 'SLK280', 'SLK300', 'SLK320', 'SLK350', 'SLK55 AMG', 'SLC300', 'SLC43 AMG', 'SLS AMG', 'AMG GT', 'AMG GT S', 'AMG GT R', 'AMG GT 4-Door'],
  'Vans / Trucks': ['Sprinter 1500', 'Sprinter 2500', 'Sprinter 3500', 'Metris', 'R350', 'R500'],
  'Electric (EQ)': ['EQB', 'EQE Sedan', 'EQE SUV', 'EQS Sedan', 'EQS SUV'],
  'Classic': ['190E', '190D', '240D', '300D', '300E', '300SD', '300SL', '300TE', '280SL', '280SE', '380SL', '380SE', '420SEL', '450SL', '450SEL', '500SEC', '560SL', '560SEL', '600SEL'],
  'Other': ['Other / not listed'],
}

// Grouped by configuration. Codes are the factory engine designations.
export const ENGINE_GROUPS = {
  'Gasoline – 4-cylinder': [
    '1.3L Turbo I4 (M282)',
    '1.6L I4 (M111)',
    '1.8L Supercharged I4 (M271 Kompressor)',
    '1.8L Turbo I4 (M271 Evo)',
    '2.0L Turbo I4 (M270)',
    '2.0L Turbo I4 (M274)',
    '2.0L Turbo I4 (M264)',
    '2.0L Turbo I4 (M254)',
    '2.0L Turbo I4 AMG (M133)',
    '2.0L Turbo I4 AMG (M139)',
    '2.3L I4 (M102)',
  ],
  'Gasoline – 6-cylinder': [
    '2.6L I6 (M103)',
    '2.8L I6 (M104)',
    '3.0L I6 (M103)',
    '3.2L I6 (M104)',
    '2.8L V6 (M112)',
    '3.2L V6 (M112)',
    '3.7L V6 (M112)',
    '2.5L V6 (M272)',
    '3.0L V6 (M272)',
    '3.5L V6 (M272)',
    '3.5L V6 (M276)',
    '3.0L Twin-Turbo V6 (M276)',
    '3.0L Turbo I6 + EQ Boost (M256)',
  ],
  'Gasoline – V8': [
    '3.8L V8 (M116)',
    '4.2L V8 (M116)',
    '5.0L V8 (M116)',
    '5.6L V8 (M116/M117)',
    '4.5L V8 (M117)',
    '5.0L V8 (M119)',
    '4.3L V8 (M113)',
    '5.0L V8 (M113)',
    '5.4L Supercharged V8 AMG (M113K)',
    '4.6L V8 (M273)',
    '5.5L V8 (M273)',
    '6.2L V8 AMG (M156)',
    '6.3L V8 AMG (M156)',
    '5.5L Twin-Turbo V8 (M157)',
    '4.7L Twin-Turbo V8 (M278)',
    '4.0L Twin-Turbo V8 (M176)',
    '4.0L Twin-Turbo V8 (M177)',
    '4.0L Twin-Turbo V8 AMG (M178)',
    '6.9L V8 (M100)',
  ],
  'Gasoline – V12': [
    '5.8L V12 (M137)',
    '6.0L V12 (M120)',
    '5.5L Twin-Turbo V12 (M275)',
    '6.0L Twin-Turbo V12 (M275)',
    '6.0L Twin-Turbo V12 (M277)',
  ],
  'Diesel': [
    '2.0L Turbo Diesel I4 (OM654)',
    '2.1L Turbo Diesel I4 (OM651)',
    '2.2L Diesel I4 (OM611)',
    '2.5L Turbo Diesel I5 (OM602)',
    '2.5L Turbo Diesel I5 (OM605)',
    '2.7L Turbo Diesel I5 (OM612)',
    '2.7L Turbo Diesel I5 (OM647)',
    '3.0L Turbo Diesel I6 (OM603)',
    '3.0L Turbo Diesel I6 (OM606)',
    '3.0L Turbo Diesel I6 (OM656)',
    '3.0L Turbo Diesel V6 BlueTEC (OM642)',
    '3.2L Turbo Diesel I6 (OM648)',
    '3.5L Turbo Diesel I6 (OM603)',
    '4.0L Twin-Turbo Diesel V8 (OM628)',
  ],
  'Hybrid / Plug-in': [
    'Plug-in Hybrid – 2.0L Turbo I4 + Electric',
    'Plug-in Hybrid – 3.0L Turbo I6 + Electric',
    'Hybrid – 3.5L V6 + Electric (S400 / ML450)',
  ],
  'Electric': [
    'Electric – Single Motor RWD',
    'Electric – Dual Motor 4MATIC',
    'Electric – AMG Dual Motor',
    'Electric – B-Class Electric Drive',
  ],
  'Other': ['Other / Unknown'],
}

export const TRANSMISSIONS = [
  '4-Speed Automatic', '5-Speed Automatic (5G-Tronic)', '6-Speed Manual', '6-Speed Automatic',
  '7-Speed Automatic (7G-Tronic)', '7-Speed Dual-Clutch (7G-DCT)', '8-Speed Dual-Clutch (8G-DCT)',
  '9-Speed Automatic (9G-Tronic)', '9-Speed AMG Speedshift MCT', '7-Speed AMG Speedshift MCT',
  '10-Speed Automatic', 'Single-Speed (Electric)', '5-Speed Manual', '4-Speed Manual', 'Other',
]

export const DRIVETRAINS = ['RWD', 'AWD / 4MATIC', '4x4 (G-Class / Sprinter)', 'FWD', 'Other']

export const FUEL_TYPES = ['Gasoline', 'Diesel', 'Hybrid', 'Plug-in Hybrid', 'Electric']

export const BODY_STYLES = ['Sedan', 'Coupe', 'Convertible / Roadster', 'Wagon', 'SUV', 'Van', 'Truck', 'Hatchback']

export const COLORS = [
  'Black', 'Obsidian Black', 'Polar White', 'Designo Diamond White', 'Iridium Silver', 'Selenite Grey',
  'Mojave Silver', 'Graphite Grey', 'Cavansite Blue', 'Lunar Blue', 'Brilliant Blue', 'Emerald Green',
  'Designo Magno', 'Cardinal Red', 'Jupiter Red', 'Brown', 'Gold', 'Tan / Beige', 'Other',
]

export const REPAIR_CATEGORIES = [
  'Oil & Filter Service', 'Service A', 'Service B', 'Brakes – Pads & Rotors', 'Brake Fluid / Lines',
  'Tires / Alignment', 'Suspension – Airmatic / ABC', 'Suspension – Control Arms / Bushings / Shocks',
  'Engine – Mechanical', 'Engine – Oil Leak (Valve Cover / Gaskets)', 'Engine – Timing Chain / Cam Adjusters',
  'Engine – Misfire / Ignition / Spark Plugs', 'Fuel System / Injectors', 'Turbo / Supercharger',
  'Transmission Service', 'Transmission – Repair / Rebuild', 'Transfer Case / Differential',
  'Cooling System – Radiator / Water Pump', 'Cooling – Thermostat / Hoses', 'A/C & Heating',
  'Electrical / Wiring', 'Battery / Starter / Alternator', 'Check Engine Light Diagnosis', 'Software / Module Coding',
  'Sensors (O2, MAF, NOx, Crank, Cam)', 'Emissions – DPF / AdBlue / EGR', 'Exhaust',
  'Steering – Rack / Pump / Tie Rods', 'Driveshaft / Axles', 'Interior / Trim', 'Body / Paint',
  'Windows / Sunroof / Locks', 'Lighting', 'Pre-Purchase Inspection', 'State Inspection', 'Recall Repair', 'Other',
]

export const REPAIR_STATUSES = ['Estimate', 'Waiting on Parts', 'In Progress', 'Ready for Pickup', 'Completed', 'Declined']

export const RECALL_STATUSES = ['Open', 'Scheduled', 'Completed', 'Not Applicable']

export const PAYMENT_STATUSES = ['Unpaid', 'Deposit Paid', 'Paid in Full', 'Warranty / No Charge']
