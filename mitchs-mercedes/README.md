# Mitch's Mercedes

Repair, recall and history tracker for a Mercedes-Benz shop.

    cd mitchs-mercedes && npm install && npm run dev

- Vehicles with year/model/engine/transmission/etc. dropdowns, VIN decode (NHTSA vPIC)
- Repair orders per vehicle (category, status, parts, labor, payment)
- Recalls per vehicle, pulled from NHTSA by year/model, tracked Open → Completed
- Data stored in the browser (localStorage); JSON backup/restore and CSV export on the Backup tab
