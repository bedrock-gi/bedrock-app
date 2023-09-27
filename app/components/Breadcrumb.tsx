import { useMatches } from "@remix-run/react";

export function Breadcrumb() {
  const matches = useMatches();

  return (
    <div className="breadcrumbs">
      <ul>
        {matches
          // skip routes that don't have a breadcrumb
          .filter((match) => match.handle && match.handle.breadcrumb)

          // render breadcrumbs!
          .map((match, index) => (
            <li key={index}>{match?.handle?.breadcrumb(match)}</li>
          ))}
      </ul>
    </div>
  );
}
