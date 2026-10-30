// Free, public NHTSA APIs (no key needed).
const BASE = 'https://api.nhtsa.gov'

// "C63 AMG S" -> "C63" style names NHTSA uses; strip AMG/BlueTEC suffixes for the search.
export function nhtsaModelName(model) {
  return model.replace(/\s*(AMG.*|BlueTEC|Maybach|Sedan|SUV|\(other\))$/i, '').trim()
}

export async function fetchRecalls({ year, model }) {
  const url = `${BASE}/recalls/recallsByVehicle?make=MERCEDES-BENZ&model=${encodeURIComponent(model)}&modelYear=${year}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`NHTSA returned ${res.status}`)
  const json = await res.json()
  return (json.results || []).map((r) => ({
    campaign: r.NHTSACampaignNumber,
    component: r.Component,
    summary: r.Summary,
    consequence: r.Consequence,
    remedy: r.Remedy,
    reportDate: r.ReportReceivedDate,
    mfrCampaign: r.Manufacturer,
  }))
}

export async function decodeVin(vin) {
  const res = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${encodeURIComponent(vin)}?format=json`)
  if (!res.ok) throw new Error(`VIN decoder returned ${res.status}`)
  const r = (await res.json()).Results?.[0] || {}
  return {
    year: r.ModelYear,
    model: r.Model,
    trim: r.Trim,
    displacement: r.DisplacementL,
    cylinders: r.EngineCylinders,
    fuel: r.FuelTypePrimary,
    body: r.BodyClass,
    drive: r.DriveType,
    plant: r.PlantCountry,
  }
}
