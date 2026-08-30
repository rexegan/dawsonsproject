const HDR = (title, sub) => `
  <div style="text-align:center;border-bottom:2px solid #1B4FA3;padding-bottom:12px;margin-bottom:18px;">
    <div style="font-size:17px;font-weight:800;color:#1B4FA3;letter-spacing:.3px;">YOUNG LIFE — JOHNSON COUNTY</div>
    <div style="font-size:14px;font-weight:700;margin-top:5px;text-transform:uppercase;letter-spacing:.5px;">${title}</div>
    ${sub ? `<div style="font-size:11px;color:#666;margin-top:4px;">${sub}</div>` : ''}
  </div>`

const SEC = (label) =>
  `<div style="font-weight:700;font-size:12px;background:#EEF3FB;padding:5px 10px;margin:14px 0 7px;border-radius:4px;color:#1B4FA3;text-transform:uppercase;letter-spacing:.4px;">${label}</div>`

const LINE = (label, w = '180px') =>
  `<span style="font-size:13px;">${label}: <span style="display:inline-block;border-bottom:1px solid #444;min-width:${w};vertical-align:bottom;">&nbsp;</span></span>`

const BOX = (label, h = '40px') =>
  `<div style="font-size:13px;margin-bottom:4px;">${label}:</div><div style="border:1px solid #ccc;border-radius:4px;min-height:${h};padding:4px;margin-bottom:10px;">&nbsp;</div>`

const ROW = (...cells) =>
  `<tr>${cells.map(c => `<td style="padding:5px 6px 5px 0;vertical-align:bottom;">${c}</td>`).join('')}</tr>`

const TABLE = (rows) => `<table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:6px;">${rows}</table>`

const SIG = (extra = '') => `
  ${SEC('SIGNATURE')}
  ${TABLE(
    ROW(LINE('Parent / Guardian Signature', '220px'), LINE('Date', '100px')) +
    ROW(LINE('Printed Name', '220px'), '') +
    (extra ? ROW(extra, '') : '')
  )}`

const FOOT = `<div style="font-size:10px;color:#999;text-align:center;margin-top:18px;border-top:1px solid #e0e0e0;padding-top:8px;">Young Life — Johnson County Area &nbsp;|&nbsp; Return to your Young Life leader &nbsp;|&nbsp; Questions? Contact your area director.</div>`

const WRAP = (html) => `<div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;color:#111;line-height:1.5;">${html}${FOOT}</div>`

// ─────────────────────────────────────────────────────────────────────────────
export const FORM_DOCS = {

  // pf1 ─ Medical Release
  pf1: WRAP(`
    ${HDR('Medical Release & Authorization Form', 'To be completed by parent or legal guardian — required before any participation')}
    ${SEC('Student Information')}
    ${TABLE(
      ROW(LINE('Student Full Name', '200px'), LINE('Date of Birth', '110px')) +
      ROW(LINE('School', '180px'), LINE('Grade', '50px'))
    )}
    ${SEC('Parent / Guardian Information')}
    ${TABLE(
      ROW(LINE('Parent / Guardian Name', '180px'), LINE('Relationship', '120px')) +
      ROW(LINE('Cell Phone', '160px'), LINE('Home Phone', '160px')) +
      ROW(LINE('Email', '260px'), LINE('Work Phone', '150px'))
    )}
    ${SEC('Insurance Information')}
    ${TABLE(
      ROW(LINE('Insurance Carrier / Company', '200px'), LINE('Policy #', '140px')) +
      ROW(LINE('Group #', '140px'), LINE('Subscriber Name', '160px'))
    )}
    ${SEC('Medical Information')}
    ${TABLE(ROW(LINE('Primary Physician', '190px'), LINE('Physician Phone', '160px')))}
    ${BOX('Known Allergies (list all, or write "None")', '36px')}
    ${BOX('Current Medications (list all, or write "None")', '36px')}
    ${BOX('Medical Conditions / Special Needs / Notes', '50px')}
    ${SEC('Emergency Contact (if parent / guardian cannot be reached)')}
    ${TABLE(
      ROW(LINE('Name', '200px'), LINE('Relationship', '130px')) +
      ROW(LINE('Phone', '180px'), '')
    )}
    ${SEC('Authorization')}
    <div style="font-size:12px;line-height:1.75;color:#333;padding:10px 12px;border:1px solid #d0d0d0;border-radius:6px;background:#FAFAFA;margin-bottom:4px;">
      I, the undersigned parent or legal guardian of the above-named student, authorize Young Life — Johnson County area leaders and staff to seek emergency medical treatment, including hospitalization and surgery, if I cannot be reached in a timely manner. I agree that I am responsible for all medical expenses incurred on behalf of my child. I certify that the information provided herein is accurate to the best of my knowledge. This authorization remains in effect for the current program year unless revoked in writing.
    </div>
    ${SIG()}
  `),

  // pf2 ─ General Permission Slip
  pf2: WRAP(`
    ${HDR('General Permission Slip', 'Club Nights & Weekly YoungLife / WyldLife Programs — School Year')}
    <div style="font-size:13px;color:#444;margin-bottom:10px;padding:8px 10px;background:#FFF8E7;border-left:3px solid #F59E0B;border-radius:0 4px 4px 0;">
      This permission slip covers your student's participation in regular Young Life club nights and on-campus events throughout the current school year. A separate form is required for overnight or off-campus travel events.
    </div>
    ${SEC('Student Information')}
    ${TABLE(
      ROW(LINE('Student Full Name', '200px'), LINE('Date of Birth', '110px')) +
      ROW(LINE('School', '200px'), LINE('Grade', '50px')) +
      ROW(LINE('Program', '140px') + ' &nbsp;<small style="color:#666">(YoungLife / WyldLife / Campaigners)</small>', '')
    )}
    ${SEC('Parent / Guardian Information')}
    ${TABLE(
      ROW(LINE('Parent / Guardian Name', '190px'), LINE('Relationship', '120px')) +
      ROW(LINE('Cell Phone', '160px'), LINE('Email', '180px'))
    )}
    ${SEC('Emergency Contact')}
    ${TABLE(
      ROW(LINE('Name', '200px'), LINE('Relationship', '120px')) +
      ROW(LINE('Phone', '180px'), '')
    )}
    ${SEC('Medical Notes (Optional)')}
    ${BOX('Known Allergies or Medical Conditions leaders should be aware of', '36px')}
    ${SEC('Permission')}
    <div style="font-size:12px;line-height:1.75;color:#333;padding:10px 12px;border:1px solid #d0d0d0;border-radius:6px;background:#FAFAFA;margin-bottom:4px;">
      I give permission for my student to participate in Young Life / WyldLife club meetings, Campaigners Bible study, and school-adjacent events throughout the current school year. I understand that Young Life is a Christian non-profit youth ministry. I authorize Young Life leaders to contact me at the phone and email provided. In the event of a medical emergency, I authorize leaders to seek care if I cannot be reached.
    </div>
    <div style="font-size:13px;margin:8px 0;">
      <input type="checkbox" disabled /> &nbsp; <strong>Yes</strong>, I give permission for my student to participate in Young Life programming this school year.
    </div>
    ${SIG()}
  `),

  // pf3 ─ Summer Camp
  pf3: WRAP(`
    ${HDR('Summer Camp Permission & Release Form', 'Frontier Ranch · Crooked Creek Ranch · Windy Gap · Washington Family Ranch')}
    <div style="font-size:13px;color:#444;margin-bottom:10px;padding:8px 10px;background:#FFF8E7;border-left:3px solid #F59E0B;border-radius:0 4px 4px 0;">
      This form is required for all students attending overnight Young Life summer camp. Please complete all sections fully. Incomplete forms may delay registration.
    </div>
    ${SEC('Camp Details')}
    ${TABLE(
      ROW(LINE('Camp Name', '200px'), LINE('Session Dates', '160px')) +
      ROW(LINE('Camp Location / State', '200px'), LINE('Departure City', '150px'))
    )}
    ${SEC('Student Information')}
    ${TABLE(
      ROW(LINE('Student Full Name', '200px'), LINE('Date of Birth', '110px')) +
      ROW(LINE('School', '180px'), LINE('Grade', '50px')) +
      ROW(LINE('Home Address', '260px'), '') +
      ROW(LINE('City', '140px'), LINE('State', '50px'), LINE('ZIP', '70px'))
    )}
    ${SEC('Parent / Guardian #1')}
    ${TABLE(
      ROW(LINE('Name', '200px'), LINE('Relationship', '120px')) +
      ROW(LINE('Cell Phone', '160px'), LINE('Email', '180px')) +
      ROW(LINE('Work Phone', '160px'), '')
    )}
    ${SEC('Parent / Guardian #2 (if applicable)')}
    ${TABLE(
      ROW(LINE('Name', '200px'), LINE('Relationship', '120px')) +
      ROW(LINE('Cell Phone', '160px'), LINE('Email', '180px'))
    )}
    ${SEC('Emergency Contact (if neither parent/guardian can be reached)')}
    ${TABLE(
      ROW(LINE('Name', '200px'), LINE('Relationship', '120px')) +
      ROW(LINE('Phone', '180px'), '')
    )}
    ${SEC('Insurance & Medical')}
    ${TABLE(
      ROW(LINE('Insurance Carrier', '180px'), LINE('Policy #', '130px')) +
      ROW(LINE('Group #', '120px'), LINE('Subscriber Name', '160px')) +
      ROW(LINE('Primary Physician', '190px'), LINE('Physician Phone', '155px'))
    )}
    ${BOX('Known Allergies — food, medication, environmental (or write "None")', '36px')}
    ${BOX('Current Medications — name, dosage, frequency (or write "None")', '36px')}
    ${BOX('Medical Conditions / Dietary Restrictions / Special Needs', '40px')}
    ${TABLE(
      ROW(LINE('Swim Ability', '120px') + ' &nbsp;<small>(Non-swimmer / Beginner / Intermediate / Strong)</small>', '') +
      ROW(LINE('Activity Restrictions (if any)', '260px'), '')
    )}
    ${SEC('Consents')}
    <div style="font-size:13px;margin:6px 0 4px;">
      <input type="checkbox" disabled /> &nbsp;<strong>Photo & Video Release:</strong> I consent to Young Life using photos/video of my student for ministry materials and social media.
    </div>
    <div style="font-size:13px;margin:4px 0;">
      <input type="checkbox" disabled /> &nbsp;<strong>Medical Authorization:</strong> I authorize Young Life staff to seek emergency medical care for my student if I cannot be reached.
    </div>
    <div style="font-size:13px;margin:4px 0;">
      <input type="checkbox" disabled /> &nbsp;<strong>Travel Authorization:</strong> I authorize transportation by Young Life-arranged vehicle, charter bus, or commercial airline.
    </div>
    ${SEC('Financial Agreement')}
    ${TABLE(
      ROW(LINE('Total Camp Cost', '100px'), LINE('Deposit Paid', '100px'), LINE('Balance Due', '100px')) +
      ROW(LINE('Balance Due Date', '140px'), '')
    )}
    <div style="font-size:12px;line-height:1.75;color:#333;padding:10px 12px;border:1px solid #d0d0d0;border-radius:6px;background:#FAFAFA;margin:8px 0;">
      I understand that the balance shown above is due prior to camp departure. I understand that cancellations made less than 30 days before camp may forfeit all or part of the deposit. I agree to the Young Life camp policies, conduct expectations, and financial terms outlined above. I release Young Life from liability for injuries sustained during normal camp activities and authorize emergency medical treatment for my student.
    </div>
    ${SIG()}
  `),

  // pf4 ─ Day Trip
  pf4: WRAP(`
    ${HDR('Day Trip Permission Slip', 'Single-Day Off-Campus Outing')}
    ${SEC('Event Details')}
    ${TABLE(
      ROW(LINE('Event Name', '220px'), LINE('Date', '120px')) +
      ROW(LINE('Destination / Location', '240px'), '') +
      ROW(LINE('Departure Location & Time', '200px'), LINE('Expected Return Time', '150px')) +
      ROW(LINE('Transportation Method', '180px'), LINE('Cost to Student', '100px'))
    )}
    ${SEC('Student Information')}
    ${TABLE(
      ROW(LINE('Student Full Name', '200px'), LINE('Date of Birth', '110px')) +
      ROW(LINE('School', '180px'), LINE('Grade', '50px'))
    )}
    ${SEC('Parent / Guardian Information')}
    ${TABLE(
      ROW(LINE('Parent / Guardian Name', '190px'), LINE('Relationship', '120px')) +
      ROW(LINE('Cell Phone', '160px'), LINE('Email', '180px'))
    )}
    ${SEC('Emergency Contact')}
    ${TABLE(
      ROW(LINE('Name', '200px'), LINE('Phone', '160px'))
    )}
    ${SEC('Permission')}
    <div style="font-size:12px;line-height:1.75;color:#333;padding:10px 12px;border:1px solid #d0d0d0;border-radius:6px;background:#FAFAFA;margin-bottom:8px;">
      I give permission for my student to attend the above event with Young Life — Johnson County. I understand that normal Young Life supervision and conduct expectations apply. In the event of a medical emergency and I cannot be reached, I authorize Young Life leaders to seek appropriate medical care.
    </div>
    ${SIG()}
  `),

  // pf5 ─ Overnight Trip
  pf5: WRAP(`
    ${HDR('Overnight Trip Permission Slip', 'Fall / Spring Weekend Events — Not Summer Camp')}
    ${SEC('Event Details')}
    ${TABLE(
      ROW(LINE('Event Name', '220px'), '') +
      ROW(LINE('Departure Date & Time', '190px'), LINE('Return Date & Time', '190px')) +
      ROW(LINE('Location / Facility', '240px'), '') +
      ROW(LINE('Adult Chaperones', '280px'), '')
    )}
    ${SEC('Student Information')}
    ${TABLE(
      ROW(LINE('Student Full Name', '200px'), LINE('Date of Birth', '110px')) +
      ROW(LINE('School', '180px'), LINE('Grade', '50px'))
    )}
    ${SEC('Parent / Guardian Information')}
    ${TABLE(
      ROW(LINE('Parent / Guardian Name', '190px'), LINE('Relationship', '120px')) +
      ROW(LINE('Cell Phone', '160px'), LINE('Email', '180px'))
    )}
    ${SEC('Emergency Contact (if parent/guardian cannot be reached)')}
    ${TABLE(
      ROW(LINE('Name', '200px'), LINE('Relationship', '110px')) +
      ROW(LINE('Phone', '180px'), '')
    )}
    ${SEC('Insurance & Medical')}
    ${TABLE(
      ROW(LINE('Insurance Carrier', '180px'), LINE('Policy #', '140px')) +
      ROW(LINE('Primary Physician', '190px'), LINE('Physician Phone', '155px'))
    )}
    ${BOX('Known Allergies or Medical Conditions', '36px')}
    ${BOX('Current Medications', '36px')}
    ${SEC('Permission')}
    <div style="font-size:12px;line-height:1.75;color:#333;padding:10px 12px;border:1px solid #d0d0d0;border-radius:6px;background:#FAFAFA;margin-bottom:8px;">
      I give my student permission to attend the overnight Young Life event listed above. I understand that students are under Young Life supervision and are expected to abide by conduct standards throughout the event. I authorize Young Life leaders to seek emergency medical care for my student in the event I cannot be reached. I understand that this is a Christian ministry event.
    </div>
    ${SIG()}
  `),

  // pf6 ─ Photo Release
  pf6: WRAP(`
    ${HDR('Photo & Video Release', 'Consent for Images & Media Use')}
    ${SEC('Student Information')}
    ${TABLE(
      ROW(LINE('Student Full Name', '200px'), LINE('Date of Birth', '110px')) +
      ROW(LINE('School', '180px'), LINE('Grade', '50px'))
    )}
    ${SEC('Parent / Guardian Information')}
    ${TABLE(
      ROW(LINE('Parent / Guardian Name', '200px'), LINE('Relationship', '120px')) +
      ROW(LINE('Cell Phone', '160px'), LINE('Email', '180px'))
    )}
    ${SEC('Consent — Please choose one')}
    <div style="font-size:13px;margin:8px 0;">
      <div style="margin-bottom:8px;">
        <input type="checkbox" disabled /> &nbsp;<strong>YES — I consent</strong> to Young Life — Johnson County photographing and/or filming my student and using those images/videos in the following ways:
      </div>
      <div style="margin-left:24px;margin-bottom:4px;font-size:12px;">
        <input type="checkbox" disabled /> Social media posts (Instagram, Facebook, etc.)<br/>
        <input type="checkbox" disabled /> Young Life website and digital materials<br/>
        <input type="checkbox" disabled /> Print materials — flyers, newsletters, donor reports<br/>
        <input type="checkbox" disabled /> Fundraising and promotional videos<br/>
        <input type="checkbox" disabled /> Internal training and ministry communications<br/>
      </div>
      <div style="margin-top:10px;">
        <input type="checkbox" disabled /> &nbsp;<strong>NO — I do not consent</strong> to the use of my student's image or likeness in any Young Life materials. I understand Young Life will make reasonable efforts to exclude my student from photos and videos.
      </div>
    </div>
    <div style="font-size:12px;line-height:1.75;color:#333;padding:10px 12px;border:1px solid #d0d0d0;border-radius:6px;background:#FAFAFA;margin:12px 0;">
      Young Life — Johnson County will not use images in a way that identifies a minor's full name, home address, or personal contact information without additional written consent. Images are used solely for Young Life ministry purposes and will not be sold to third parties. This release covers events during the current program year.
    </div>
    ${SIG()}
  `),

  // pf7 ─ Campaigners
  pf7: WRAP(`
    ${HDR('Campaigners / Bible Study Consent Form', 'Weekly Christian Small Group')}
    <div style="font-size:13px;color:#444;margin-bottom:10px;padding:8px 10px;background:#EEF3FB;border-left:3px solid #1B4FA3;border-radius:0 4px 4px 0;">
      <strong>What is Campaigners?</strong> Campaigners is a weekly small-group Bible study run by Young Life volunteer leaders for interested students. It is a voluntary, student-led Christian community meeting focused on scripture, discussion, and faith development. Attendance is by student invitation and choice.
    </div>
    ${SEC('Student Information')}
    ${TABLE(
      ROW(LINE('Student Full Name', '200px'), LINE('Date of Birth', '110px')) +
      ROW(LINE('School', '200px'), LINE('Grade', '50px'))
    )}
    ${SEC('Parent / Guardian Information')}
    ${TABLE(
      ROW(LINE('Parent / Guardian Name', '200px'), LINE('Relationship', '120px')) +
      ROW(LINE('Cell Phone', '160px'), LINE('Email', '180px'))
    )}
    ${SEC('Meeting Details')}
    ${TABLE(
      ROW(LINE('Meeting Day & Time', '200px'), LINE('Meeting Location', '180px')) +
      ROW(LINE('Young Life Leader Name', '220px'), LINE('Leader Phone', '155px'))
    )}
    ${SEC('Permission')}
    <div style="font-size:12px;line-height:1.75;color:#333;padding:10px 12px;border:1px solid #d0d0d0;border-radius:6px;background:#FAFAFA;margin-bottom:8px;">
      I acknowledge that Campaigners is a Christian small-group Bible study hosted by Young Life — Johnson County. I give permission for my student to attend Campaigners meetings throughout the current school year. I understand that my student's participation is entirely voluntary and that no student is pressured regarding religious beliefs or practices. I understand that the group is led by trained, screened Young Life volunteer leaders.
    </div>
    <div style="font-size:13px;margin:8px 0;">
      <input type="checkbox" disabled /> &nbsp;<strong>Yes</strong>, I give permission for my student to participate in Campaigners this school year.
    </div>
    ${SIG()}
  `),

  // pf8 ─ Volunteer Waiver
  pf8: WRAP(`
    ${HDR('Volunteer & Event Waiver', 'Fundraising Events — Clay Shoot · Golf Tournament · Banquet · Garage Sale')}
    ${SEC('Volunteer / Participant Information')}
    ${TABLE(
      ROW(LINE('Full Name', '200px'), LINE('Date of Birth', '110px')) +
      ROW(LINE('Address', '260px'), '') +
      ROW(LINE('City', '160px'), LINE('State', '50px'), LINE('ZIP', '70px')) +
      ROW(LINE('Cell Phone', '160px'), LINE('Email', '180px'))
    )}
    ${SEC('Event Information')}
    ${TABLE(
      ROW(LINE('Event Name', '200px'), LINE('Event Date', '120px')) +
      ROW(LINE('Role / Assignment', '260px'), '')
    )}
    ${SEC('Liability Waiver & Release')}
    <div style="font-size:12px;line-height:1.75;color:#333;padding:10px 12px;border:1px solid #d0d0d0;border-radius:6px;background:#FAFAFA;margin-bottom:8px;">
      In consideration for being permitted to volunteer at or participate in a Young Life — Johnson County fundraising event, I, on behalf of myself, my heirs, assigns, and personal representatives, hereby release, discharge, and hold harmless Young Life, its officers, employees, agents, and volunteers from any and all claims, damages, or liabilities arising from my participation in the event, including but not limited to injuries, accidents, and property damage. I acknowledge that I am voluntarily participating and that certain activities (clay shooting, golf, heavy lifting, vehicle operation) carry inherent risk. I agree to follow all safety instructions provided by event staff.
    </div>
    <div style="font-size:13px;margin:8px 0;">
      <input type="checkbox" disabled /> &nbsp;<strong>Photo Release:</strong> I consent to Young Life using photos/video of me from this event in ministry and fundraising materials.
    </div>
    ${SIG()}
  `),

  // pf9 ─ Scholarship Agreement
  pf9: WRAP(`
    ${HDR('Camp Scholarship Financial Agreement', 'For Students Receiving Financial Assistance')}
    ${SEC('Student Information')}
    ${TABLE(
      ROW(LINE('Student Full Name', '200px'), LINE('Date of Birth', '110px')) +
      ROW(LINE('School', '180px'), LINE('Grade', '50px'))
    )}
    ${SEC('Parent / Guardian Information')}
    ${TABLE(
      ROW(LINE('Parent / Guardian Name', '200px'), LINE('Relationship', '120px')) +
      ROW(LINE('Cell Phone', '160px'), LINE('Email', '180px'))
    )}
    ${SEC('Camp & Scholarship Details')}
    ${TABLE(
      ROW(LINE('Camp Name', '220px'), LINE('Camp Session Dates', '160px')) +
      ROW(LINE('Total Camp Cost', '120px') + ' &nbsp;&nbsp; ' + LINE('Scholarship Amount', '120px'), '') +
      ROW(LINE('Family Portion / Balance Due', '160px'), LINE('Balance Due Date', '140px'))
    )}
    ${BOX('Payment Plan (if applicable — describe installment schedule)', '36px')}
    ${SEC('Terms & Conditions')}
    <div style="font-size:12px;line-height:1.75;color:#333;padding:10px 12px;border:1px solid #d0d0d0;border-radius:6px;background:#FAFAFA;margin-bottom:8px;">
      I understand and agree to the following: (1) The scholarship amount listed above has been awarded from Young Life fundraising proceeds and donor contributions. (2) The family balance shown is due by the date indicated. Failure to pay the family balance may forfeit the student's camp registration. (3) Cancellations made less than 30 days before camp may result in forfeiture of all or part of the scholarship. (4) The scholarship is for the specific camp session listed and is non-transferable. (5) The student is expected to participate fully and abide by Young Life camp conduct standards. (6) Any refund issued for cancellation will be made first to the family portion paid.
    </div>
    <div style="font-size:13px;margin:8px 0;font-weight:700;">Young Life Representative:</div>
    ${TABLE(
      ROW(LINE('Name', '200px'), LINE('Title', '140px')) +
      ROW(LINE('Signature', '200px'), LINE('Date', '110px'))
    )}
    ${SIG()}
  `),

  // pf10 ─ Social Media Consent
  pf10: WRAP(`
    ${HDR('Social Media & Digital Communication Consent', 'Year-Round Digital Outreach — Instagram · Text · Snapchat')}
    <div style="font-size:13px;color:#444;margin-bottom:10px;padding:8px 10px;background:#EEF3FB;border-left:3px solid #1B4FA3;border-radius:0 4px 4px 0;">
      Young Life leaders build authentic friendships with students as part of their ministry. This sometimes includes following students on social media or sending encouraging messages. We want parents to be fully informed and to give explicit consent before any leader connects digitally with their student.
    </div>
    ${SEC('Student Information')}
    ${TABLE(
      ROW(LINE('Student Full Name', '200px'), LINE('Date of Birth', '110px')) +
      ROW(LINE('School', '180px'), LINE('Grade', '50px'))
    )}
    ${SEC('Parent / Guardian Information')}
    ${TABLE(
      ROW(LINE('Parent / Guardian Name', '200px'), LINE('Relationship', '120px')) +
      ROW(LINE('Cell Phone', '160px'), LINE('Email', '180px'))
    )}
    ${SEC('Young Life Leader Information')}
    ${TABLE(
      ROW(LINE('Leader Name', '200px'), LINE('Leader Phone', '155px')) +
      ROW(LINE('Leader Email', '220px'), '')
    )}
    ${SEC('Consent — Please check all that apply')}
    <div style="font-size:13px;margin:8px 0;">
      <div style="margin-bottom:6px;font-weight:700;">I consent to my student's Young Life leader:</div>
      <div style="margin-left:16px;line-height:2;">
        <div><input type="checkbox" disabled /> &nbsp;Following my student on <strong>Instagram</strong></div>
        <div><input type="checkbox" disabled /> &nbsp;Sending encouragement or event info via <strong>text message</strong></div>
        <div><input type="checkbox" disabled /> &nbsp;Connecting on <strong>Snapchat</strong></div>
        <div><input type="checkbox" disabled /> &nbsp;Sending messages via <strong>Facebook Messenger</strong></div>
        <div><input type="checkbox" disabled /> &nbsp;<strong>None</strong> — I prefer all communication go through me as parent/guardian</div>
      </div>
    </div>
    <div style="font-size:12px;line-height:1.75;color:#333;padding:10px 12px;border:1px solid #d0d0d0;border-radius:6px;background:#FAFAFA;margin:10px 0;">
      Young Life — Johnson County leaders are trained, background-checked volunteers and staff. All digital communication is expected to be appropriate, encouraging, and ministry-focused. Parents may request that a leader cease digital contact at any time. Young Life's policy requires that all leaders copy area leadership on any ongoing direct message conversations with students, and that leaders never communicate privately with students in a way that excludes parental oversight.
    </div>
    ${SIG()}
  `),
}
