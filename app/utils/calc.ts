import type { Location } from "@prisma/client";

export function mean(numbers: number[]) {
  return numbers.reduce((a, b) => a + b, 0) / numbers.length;
}

export function geoMidpoint(
  locations: Pick<Location, "latitude" | "longitude">[]
) {
  const latitude = mean(locations.map((l) => l.latitude ?? 0));
  const longitude = mean(locations.map((l) => l.longitude ?? 0));
  return { latitude, longitude };
}
