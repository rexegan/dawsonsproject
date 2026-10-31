// Fictional demo data: made-up customers, made-up VINs, made-up recall entries.
const daysAgo = (n) => {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toLocaleDateString('en-CA')
}

const V = [
  ['2015', 'C63 AMG S', '4.0L Twin-Turbo V8 AMG (M178)', '7-Speed AMG Speedshift MCT', 'RWD', 'Gasoline', 'Sedan', 'Obsidian Black', 'WDDSJ7HB5FN000101', 'Dave Hollis', '(555) 010-0101', 'dave.hollis@example.com', 'HLS 4821', 68250],
  ['2012', 'E350', '3.5L V6 (M276)', '7-Speed Automatic (7G-Tronic)', 'AWD / 4MATIC', 'Gasoline', 'Sedan', 'Iridium Silver', 'WDDHF8JB2CA000202', 'Marcy Tran', '(555) 010-0202', 'marcy.tran@example.com', 'TRN 9034', 112400],
  ['2009', 'ML350', '3.5L V6 (M272)', '7-Speed Automatic (7G-Tronic)', 'AWD / 4MATIC', 'Gasoline', 'SUV', 'Mojave Silver', '4JGBB86E49A000303', 'Carl Jenkins', '(555) 010-0303', 'cjenkins@example.com', 'CJK 7710', 148900],
  ['2014', 'GL350 BlueTEC', '3.0L Turbo Diesel V6 BlueTEC (OM642)', '7-Speed Automatic (7G-Tronic)', 'AWD / 4MATIC', 'Diesel', 'SUV', 'Polar White', '4JGDF2EE3EA000404', 'Priya Natarajan', '(555) 010-0404', 'priya.n@example.com', 'PNR 2255', 96300],
  ['2006', 'S500', '5.0L V8 (M113)', '7-Speed Automatic (7G-Tronic)', 'AWD / 4MATIC', 'Gasoline', 'Sedan', 'Graphite Grey', 'WDDNG86X36A000505', 'Walter Briggs', '(555) 010-0505', 'wbriggs@example.com', 'WBG 3318', 131750],
  ['2018', 'GLC300', '2.0L Turbo I4 (M274)', '9-Speed Automatic (9G-Tronic)', 'AWD / 4MATIC', 'Gasoline', 'SUV', 'Selenite Grey', 'WDC0G4KB1JV000606', 'Angela Ruiz', '(555) 010-0606', 'angela.ruiz@example.com', 'ARZ 6402', 54200],
  ['1991', '560SL', '5.6L V8 (M116/M117)', '4-Speed Automatic', 'RWD', 'Gasoline', 'Convertible / Roadster', 'Black', 'WDBBA48D5MA000707', 'Frank Delgado', '(555) 010-0707', 'fdelgado@example.com', 'CLASSIC1', 87600],
  ['2020', 'G550', '4.0L Twin-Turbo V8 (M176)', '9-Speed Automatic (9G-Tronic)', '4x4 (G-Class / Sprinter)', 'Gasoline', 'SUV', 'Designo Magno', 'W1NYC6BJ8LX000808', 'Brooke Lindqvist', '(555) 010-0808', 'brooke.l@example.com', 'BRK 0001', 31150],
  ['2017', 'Sprinter 2500', '3.0L Turbo Diesel V6 BlueTEC (OM642)', '7-Speed Automatic (7G-Tronic)', 'RWD', 'Diesel', 'Van', 'Polar White', 'WD3PE8CD7H5000909', "Rollins Plumbing Co.", '(555) 010-0909', 'office@rollinsplumbing.example.com', 'FLT 204', 189300],
  ['2013', 'SL550', '4.7L Twin-Turbo V8 (M278)', '7-Speed Automatic (7G-Tronic)', 'RWD', 'Gasoline', 'Convertible / Roadster', 'Cavansite Blue', 'WDDJK7DA3DF001010', 'Gloria Fenwick', '(555) 010-1010', 'gfenwick@example.com', 'GLF 5577', 42800],
  ['2008', 'C300', '3.0L V6 (M272)', '7-Speed Automatic (7G-Tronic)', 'AWD / 4MATIC', 'Gasoline', 'Sedan', 'Iridium Silver', 'WDDGF81X18F001111', 'Tyler Nakamura', '(555) 010-1111', 'tnakamura@example.com', 'TYN 8820', 123500],
  ['2016', 'E350 BlueTEC', '3.0L Turbo Diesel V6 BlueTEC (OM642)', '7-Speed Automatic (7G-Tronic)', 'RWD', 'Diesel', 'Sedan', 'Lunar Blue', 'WDDHF0EB9GB001212', 'Harold Pruitt', '(555) 010-1212', 'hpruitt@example.com', 'HRP 1943', 77900],
  ['2021', 'GLE450', '3.0L Turbo I6 + EQ Boost (M256)', '9-Speed Automatic (9G-Tronic)', 'AWD / 4MATIC', 'Gasoline', 'SUV', 'Cardinal Red', '4JGFB5KB4MA001313', 'Simone Okafor', '(555) 010-1313', 'simone.okafor@example.com', 'SMO 7001', 28400],
  ['2011', 'CLS550', '5.5L Twin-Turbo V8 (M157)', '7-Speed Automatic (7G-Tronic)', 'RWD', 'Gasoline', 'Sedan', 'Obsidian Black', 'WDDLJ7DB6BA001414', 'Victor Salazar', '(555) 010-1414', 'vsalazar@example.com', 'VSZ 3392', 99800],
  ['2004', 'E500', '5.0L V8 (M113)', '5-Speed Automatic (5G-Tronic)', 'RWD', 'Gasoline', 'Wagon', 'Brown', 'WDBUH70J84A001515', 'Nora Whitfield', '(555) 010-1515', 'nwhitfield@example.com', 'NRW 4466', 164200],
]

// vehicle index, days ago, category, status, concern, work, parts #s, parts $, hours, other $, payment, tech
const R = [
  [0, 400, 'Oil & Filter Service', 'Completed', 'Routine service', 'Changed oil and filter, reset service indicator.', 'A2781800009, A2781840025', 142, 0.8, 0, 'Paid in Full', 'Mitch'],
  [0, 40, 'Brakes – Pads & Rotors', 'Completed', 'Brake shudder at highway speed', 'Replaced front rotors and pads, bled system.', 'A0004211312', 868, 2.5, 0, 'Paid in Full', 'Mitch'],
  [0, 3, 'Software / Module Coding', 'In Progress', 'Customer wants updated infotainment', 'Updating COMAND head unit software.', '', 0, 1.0, 0, 'Unpaid', 'Luis'],
  [1, 250, 'Engine – Oil Leak (Valve Cover / Gaskets)', 'Completed', 'Oil smell, smoke from the exhaust', 'Replaced both valve cover gaskets and spark plug tube seals.', 'A2760160121, A2760160221', 96, 3.0, 0, 'Paid in Full', 'Mitch'],
  [1, 30, 'Transmission Service', 'Completed', 'Scheduled service', 'Fluid and filter service on the 7G-Tronic.', 'A2222700112', 128, 1.5, 0, 'Paid in Full', 'Luis'],
  [2, 365, 'Engine – Timing Chain / Cam Adjusters', 'Completed', 'Rattle on cold start, check engine light', 'Replaced timing chains, guides, tensioners and cam adjusters.', 'A2720500000 kit', 1450, 11, 0, 'Paid in Full', 'Mitch'],
  [2, 120, 'Suspension – Control Arms / Bushings / Shocks', 'Completed', 'Clunk over bumps', 'Replaced front lower control arms and sway-bar links.', 'A1643300307', 380, 2.8, 0, 'Paid in Full', 'Luis'],
  [2, 5, 'Check Engine Light Diagnosis', 'Waiting on Parts', 'Check engine light, rough idle', 'Intake manifold flap sensor failed — ordered part.', 'A2721400501', 0, 1.0, 0, 'Unpaid', 'Mitch'],
  [3, 60, 'Emissions – DPF / AdBlue / EGR', 'Completed', 'AdBlue warning, limp mode', 'Replaced NOx sensor and AdBlue heater.', 'A0009053703', 640, 3.2, 0, 'Paid in Full', 'Mitch'],
  [3, 2, 'Oil & Filter Service', 'Ready for Pickup', 'Routine service', 'Oil/filter, cabin filter, tire rotation.', 'A6421800009', 118, 1.2, 0, 'Unpaid', 'Luis'],
  [4, 500, 'Suspension – Airmatic / ABC', 'Completed', 'Rear sagging overnight', 'Replaced both rear air struts.', 'A2203205013', 1180, 3.5, 0, 'Paid in Full', 'Mitch'],
  [4, 90, 'A/C & Heating', 'Completed', 'A/C blows warm', 'Replaced condenser, evacuated and recharged.', 'A2205000054', 410, 2.5, 0, 'Paid in Full', 'Luis'],
  [4, 8, 'Cooling System – Radiator / Water Pump', 'Estimate', 'Coolant loss', 'Pressure test shows leaking water pump. Awaiting approval.', '', 0, 1.0, 0, 'Unpaid', 'Mitch'],
  [5, 180, 'Service A', 'Completed', 'Maintenance minder', 'Service A: oil, filter, brake fluid check, inspection.', '', 165, 1.5, 0, 'Paid in Full', 'Luis'],
  [5, 14, 'Recall Repair', 'Completed', 'Open recall', 'Performed recall remedy per campaign.', '', 0, 1.0, 0, 'Warranty / No Charge', 'Mitch'],
  [6, 300, 'Pre-Purchase Inspection', 'Completed', 'Prospective owner inspection', 'Full inspection; noted soft top motor slow and minor oil seep.', '', 0, 2.0, 0, 'Paid in Full', 'Mitch'],
  [6, 45, 'Fuel System / Injectors', 'Completed', 'Hard hot start, poor idle', 'Cleaned and flow-tested CIS-E injectors, replaced warm-up regulator.', 'A0000781960', 310, 4.5, 0, 'Paid in Full', 'Mitch'],
  [6, 1, 'Windows / Sunroof / Locks', 'In Progress', 'Convertible top slow to raise', 'Rebuilding top hydraulic pump and lines.', '', 520, 5.0, 0, 'Deposit Paid', 'Mitch'],
  [7, 200, 'Oil & Filter Service', 'Completed', 'Routine service', 'Oil/filter, air filter.', 'A2781800009', 156, 1.0, 0, 'Paid in Full', 'Luis'],
  [7, 20, 'Brake Fluid / Lines', 'Completed', 'Brake fluid flush', 'Flushed brake fluid, inspected lines.', '', 48, 0.8, 0, 'Paid in Full', 'Luis'],
  [8, 150, 'Engine – Misfire / Ignition / Spark Plugs', 'Completed', 'Misfire cylinder 3', 'Replaced injector and glow plug, cleaned EGR.', 'A6420701170', 590, 4.0, 0, 'Paid in Full', 'Mitch'],
  [8, 70, 'Tires / Alignment', 'Completed', 'Uneven tire wear', 'Four tires mounted, alignment performed.', '', 980, 1.5, 0, 'Paid in Full', 'Luis'],
  [8, 6, 'Emissions – DPF / AdBlue / EGR', 'In Progress', 'DPF regeneration failing', 'Forced regen failed; removing and cleaning DPF.', '', 0, 3.0, 0, 'Unpaid', 'Mitch'],
  [9, 210, 'Service B', 'Completed', 'Maintenance minder', 'Service B: oil, filters, brake fluid, inspection.', '', 330, 2.0, 0, 'Paid in Full', 'Mitch'],
  [9, 33, 'Electrical / Wiring', 'Completed', 'Battery drains overnight', 'Found faulty rear SAM; replaced and coded.', 'A0009002300', 880, 3.0, 0, 'Paid in Full', 'Mitch'],
  [10, 330, 'Engine – Mechanical', 'Completed', 'Balance shaft and cam adjuster noise', 'Replaced cam adjusters and balance shaft gear.', 'A2720500000', 780, 7.0, 0, 'Paid in Full', 'Mitch'],
  [10, 10, 'Battery / Starter / Alternator', 'Completed', 'Slow crank', 'Replaced AGM battery and registered.', 'A0009820008', 245, 0.8, 0, 'Paid in Full', 'Luis'],
  [11, 95, 'Oil & Filter Service', 'Completed', 'Routine service', 'Oil/filter and fuel filter.', 'A6421840125', 210, 1.5, 0, 'Paid in Full', 'Luis'],
  [11, 4, 'Transmission – Repair / Rebuild', 'Waiting on Parts', 'Harsh 2-3 shift', 'Valve body and conductor plate ordered.', 'A0335453332', 0, 1.0, 0, 'Unpaid', 'Mitch'],
  [12, 75, 'Oil & Filter Service', 'Completed', 'Routine service', 'Service A, tire rotation.', '', 160, 1.2, 0, 'Paid in Full', 'Luis'],
  [13, 160, 'Turbo / Supercharger', 'Completed', 'Loss of power, boost leak', 'Replaced charge-air hoses and wastegate actuator.', 'A2780900380', 720, 4.0, 0, 'Paid in Full', 'Mitch'],
  [13, 12, 'Lighting', 'Declined', 'Headlight foggy', 'Quoted headlight restoration; customer declined.', '', 0, 0.5, 0, 'Unpaid', 'Luis'],
  [14, 420, 'State Inspection', 'Completed', 'Annual inspection', 'Passed. Advised on control-arm bushings.', '', 0, 0.5, 35, 'Paid in Full', 'Luis'],
  [14, 18, 'Suspension – Control Arms / Bushings / Shocks', 'Completed', 'Wandering steering', 'Replaced front control arm bushings and tie rods; aligned.', 'A2113300107', 460, 5.0, 90, 'Paid in Full', 'Mitch'],
]

// vehicle index, campaign, component, status, summary, remedy, days ago completed
const RC = [
  [0, 'SAMPLE-RC-001', 'ELECTRICAL SYSTEM: SOFTWARE', 'Open', 'Sample recall entry for demonstration. Software may display incorrect information.', 'Dealer updates the software free of charge.', null],
  [1, 'SAMPLE-RC-002', 'FUEL SYSTEM, GASOLINE', 'Completed', 'Sample recall entry for demonstration. Fuel line may leak.', 'Replace affected fuel line.', 200],
  [2, 'SAMPLE-RC-003', 'AIR BAGS', 'Open', 'Sample recall entry for demonstration. Passenger airbag inflator may rupture.', 'Replace the airbag inflator.', null],
  [2, 'SAMPLE-RC-004', 'POWER TRAIN', 'Scheduled', 'Sample recall entry for demonstration. Transmission may shift unexpectedly.', 'Update transmission control software.', null],
  [3, 'SAMPLE-RC-005', 'ENGINE AND ENGINE COOLING', 'Open', 'Sample recall entry for demonstration. Coolant pump may fail.', 'Replace coolant pump.', null],
  [4, 'SAMPLE-RC-006', 'AIR BAGS', 'Completed', 'Sample recall entry for demonstration. Airbag inflator concern.', 'Replace inflator.', 600],
  [5, 'SAMPLE-RC-007', 'SEAT BELTS', 'Completed', 'Sample recall entry for demonstration. Seat belt buckle may not latch.', 'Replace buckle.', 14],
  [7, 'SAMPLE-RC-008', 'STEERING', 'Open', 'Sample recall entry for demonstration. Steering component may loosen.', 'Inspect and tighten or replace.', null],
  [8, 'SAMPLE-RC-009', 'FUEL SYSTEM, DIESEL', 'Scheduled', 'Sample recall entry for demonstration. Fuel pump concern on diesel models.', 'Replace fuel pump.', null],
  [9, 'SAMPLE-RC-010', 'ELECTRICAL SYSTEM', 'Open', 'Sample recall entry for demonstration. Rear camera may not display.', 'Update software.', null],
  [11, 'SAMPLE-RC-011', 'POWER TRAIN', 'Open', 'Sample recall entry for demonstration. Transmission may lose drive.', 'Replace control unit.', null],
  [12, 'SAMPLE-RC-012', 'STRUCTURE', 'Not Applicable', 'Sample recall entry for demonstration. Does not apply to this build date.', '', null],
]

export function buildSampleData() {
  const id = (p, i) => `sample-${p}-${i}`
  const vehicles = V.map((v, i) => ({
    id: id('v', i), createdAt: daysAgo(500 - i * 20),
    year: v[0], model: v[1], engine: v[2], transmission: v[3], drivetrain: v[4], fuel: v[5], body: v[6], color: v[7],
    vin: v[8], owner: v[9], phone: v[10], email: v[11], plate: v[12], mileage: v[13],
    notes: i === 6 ? 'Collector car. Customer wants OEM/NOS parts only.' : i === 8 ? 'Fleet vehicle — bill to company account.' : 'SAMPLE DATA (fictional customer and VIN).',
  }))
  const repairs = R.map((r, i) => ({
    id: id('r', i), vehicleId: id('v', r[0]), date: daysAgo(r[1]), mileage: Math.max(0, V[r[0]][13] - Math.round(r[1] * 22)),
    category: r[2], status: r[3], complaint: r[4], work: r[5], partsUsed: r[6],
    parts: r[7], laborHours: r[8], laborRate: 150, other: r[9], payment: r[10], tech: r[11],
  }))
  const recalls = RC.map((c, i) => ({
    id: id('c', i), vehicleId: id('v', c[0]), campaign: c[1], component: c[2], status: c[3], summary: c[4], remedy: c[5],
    completedDate: c[6] != null ? daysAgo(c[6]) : '',
  }))
  return { vehicles, repairs, recalls }
}
