import { prisma } from "../src/lib/prisma"
import { SITES } from "../src/config/sites"

async function main() {
  console.log('Seeding sites...')
  
  // Create a default user if none exists (required for site association)
  const user = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin',
    },
  })

  for (const site of SITES) {
    await prisma.site.upsert({
      where: { domain: site.domain },
      update: { name: site.name },
      create: {
        name: site.name,
        domain: site.domain,
        userId: user.id,
      },
    })
  }

  console.log('Seed complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
