import {getCliClient} from 'sanity/cli'
import {
  copy,
  donateFunds,
  historyMilestones,
  hotels,
  kosherPlaces,
} from '../../web/src/content/copy'

const client = getCliClient({apiVersion: '2026-05-19'})

function isEmpty(value: unknown) {
  return value == null || value === '' || (Array.isArray(value) && value.length === 0)
}

async function upsert(id: string, type: string, fields: Record<string, unknown>) {
  const existing = await client.getDocument(id)
  if (!existing) {
    await client.create({_id: id, _type: type, ...fields})
    console.log(`created ${id}`)
    return
  }

  const patch: Record<string, unknown> = {}
  for (const [name, value] of Object.entries(fields)) {
    if (isEmpty(existing[name])) {
      patch[name] = value
    }
  }

  if (Object.keys(patch).length === 0) {
    console.log(`kept ${id}`)
    return
  }

  await client.patch(id).set(patch).commit()
  console.log(`filled ${id}: ${Object.keys(patch).join(', ')}`)
}

async function run() {
  await upsert('homepage', 'homepage', {
    tagline: copy.homeTagline,
    welcome: copy.welcomeClose,
    dailyServices: copy.dailyServices,
    doorsOpen: copy.doorsOpen,
    milestones: historyMilestones.map((item) => ({
      _key: `year-${item.year}`,
      year: item.year,
      body: item.body,
    })),
  })

  await upsert('aboutPage', 'aboutPage', {
    rabbiWelcome: copy.rabbiWelcome,
    rabbiBody: copy.rabbiBody,
    historyLead: copy.historyLead,
    facilities: copy.facilities,
    history1956: copy.history1956,
    rabbiToday: copy.rabbiToday,
    rabbiClose: copy.rabbiClose,
  })

  await upsert('visitPage', 'visitPage', {
    visitLead: copy.visitLead,
    visitBody: copy.visitBody,
    visitorCenter: copy.visitorCenter,
    visitCharm: copy.visitCharm,
    visitAmenities: [...copy.visitAmenities],
    visitHospitality: copy.visitHospitality,
    shabbosHouse: copy.shabbosHouse,
    shabbosHouseDetails: copy.shabbosHouseDetails,
    shabbosHouseReserve: copy.shabbosHouseReserve,
  })

  await upsert('communityPage', 'communityPage', {
    heroTitle: copy.communityHeroTitle,
    heroLede: copy.communityHeroLede,
    flyersLede: copy.communityFlyersLede,
    classesLede: copy.communityClassesLede,
    sisterhood: copy.sisterhood,
    brotherhood: copy.brotherhood,
    chevraKadisha: copy.chevraKadisha,
    chevraContact: copy.chevraContact,
    addlestone: copy.addlestone,
    preschool: copy.preschool,
    rentalsSanctuary: copy.rentalsSanctuary,
    rentalsHall: copy.rentalsHall,
  })

  await upsert('mikvahPage', 'mikvahPage', {
    mikvahLead: copy.mikvahLead,
    mikvahDishes: copy.mikvahDishes,
    mikvahQuestions: copy.mikvahQuestions,
  })

  await upsert('eruvPage', 'eruvPage', {
    eruvRabbi: copy.eruvRabbi,
    eruvDowntown: copy.eruvDowntown,
    eruvWest: copy.eruvWest,
    eruvPerimeter: copy.eruvPerimeter,
  })

  await upsert('remembrancePage', 'remembrancePage', {
    remembranceWall: copy.remembranceWall,
    remembranceTag: copy.remembranceTag,
    remembranceTitle: copy.remembranceTitle,
    remembranceFund: copy.remembranceFund,
    remembranceBody: copy.remembranceBody,
    remembranceLegacy: copy.remembranceLegacy,
    remembranceNote: copy.remembranceNote,
    remembranceContact: copy.remembranceContact,
    remembranceWhen: copy.remembranceWhen,
  })

  await upsert('locationsPage', 'locationsPage', {
    downtownLocation: copy.downtownLocation,
    minyanHouse: copy.minyanHouse,
    cemeteryLead: copy.cemeteryLead,
    cemeteryMaryville: copy.cemeteryMaryville,
    cemeteryBethIsrael: copy.cemeteryBethIsrael,
    cemeteryBrithSholom: copy.cemeteryBrithSholom,
    cemeteryNote: copy.cemeteryNote,
  })

  await upsert('membershipPage', 'membershipPage', {
    membershipLead: copy.membershipLead,
    membershipBody: copy.membershipBody,
    membershipApplicationNote: copy.membershipApplicationNote,
  })

  await upsert('donatePage', 'donatePage', {
    donateMember: copy.donateMember,
    donatePortalNote: copy.donatePortalNote,
    donateFunds: [...donateFunds],
  })

  await upsert('kosherPage', 'kosherPage', {
    chefLinda: copy.chefLinda,
    chefLindaContact: copy.chefLindaContact,
    kosherPlaces: kosherPlaces.map((place, index) => ({
      _key: `kosher-${index + 1}`,
      ...place,
    })),
  })

  await upsert('hotelsPage', 'hotelsPage', {
    hotels: hotels.map((hotel, index) => ({
      _key: `hotel-${index + 1}`,
      name: hotel.name,
      addr: hotel.addr,
      dist: hotel.dist,
      phone: hotel.phone,
      note: hotel.note,
      eruv: hotel.eruv ? 'inside' : 'outside',
    })),
  })
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
