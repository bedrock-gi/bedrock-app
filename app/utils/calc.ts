import { Location } from "@prisma/client";

export function mean(numbers: number[]) {
  return numbers.reduce((a, b) => a + b, 0) / numbers.length;
}

export function geoMidpoint(
  locations: Pick<Location, "latitude" | "longitude">[]
) {
  const latitude = mean(locations.map((l) => l.latitude));
  const longitude = mean(locations.map((l) => l.longitude));
  return { latitude, longitude };
}
