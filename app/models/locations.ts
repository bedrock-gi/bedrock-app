import { prisma } from "~/db.server";

export async function getLocations(projectId: string) {
  return await prisma.location.findMany({
    where: {
      projectId,
    },
  });
}

export async function seedLocations(projectId: string) {
  const locs = await prisma.location.findMany({
    where: {
      projectId,
    },
  });
  if (locs.length > 0) {
    return;
  }

  const locations = [
    { lat: 51.509865, lng: -0.118092 },
    { lat: 51.497822, lng: -0.124665 },
    { lat: 51.510357, lng: -0.130382 },
    { lat: 51.517889, lng: -0.082144 },
    { lat: 51.509523, lng: -0.063607 },
    { lat: 51.503911, lng: -0.075622 },
    { lat: 51.511017, lng: -0.098777 },
    { lat: 51.496435, lng: -0.146858 },
    { lat: 51.520618, lng: -0.120746 },
    { lat: 51.507564, lng: -0.046589 },
    { lat: 51.494266, lng: -0.143283 },
    { lat: 51.518486, lng: -0.067655 },
    { lat: 51.502922, lng: -0.083377 },
    { lat: 51.523646, lng: -0.104158 },
    { lat: 51.512345, lng: -0.137273 },
    { lat: 51.509154, lng: -0.174242 },
    { lat: 51.502048, lng: -0.212908 },
    { lat: 51.528319, lng: -0.079741 },
    { lat: 51.495735, lng: -0.159203 },
    { lat: 51.514456, lng: -0.096071 },
  ];

  locations.forEach(async (location, i) => {
    await prisma.location.create({
      data: {
        latitude: location.lat,
        longitude: location.lng,
        name: `Location ${i + 1}`,
        project: {
          connect: {
            id: projectId,
          },
        },
      },
    });
  });
}
