import { prisma } from "~/db.server";
import { Location } from "@prisma/client";

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

  // Central London BNG coordinates (Easting and Northing)
  const centralLondonCoordinates = {
    easting: 529000, // Central London Easting coordinate in BNG
    northing: 180000, // Central London Northing coordinate in BNG
  };

  const locations = [];
  for (let i = 0; i < 20; i++) {
    const location = await prisma.location.create({
      data: {
        name: `BH ${i + 1}`,
        project: {
          connect: {
            id: projectId,
          },
        },
        easting:
          centralLondonCoordinates.easting +
          Math.floor(Math.random() * 500) -
          250,
        northing:
          centralLondonCoordinates.northing +
          Math.floor(Math.random() * 500) -
          250,
      },
    });
    locations.push(location);
  }
}
