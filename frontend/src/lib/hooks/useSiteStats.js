"use client";

import { useEffect, useState } from "react";

const EMPTY_STATS = {
  activeEvStations: 0,
  totalEvStations: 0,
  citiesCovered: 0,
  completedProjects: 0,
  partnerEnquiries: 0,
};

/**
 * Fetches real, live company stats from the backend (no more hardcoded
 * marketing numbers). `loaded` is false until the request settles, so
 * callers can show "—" instead of a misleading "0" while loading.
 */
export function useSiteStats() {
  const [stats, setStats] = useState(EMPTY_STATS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const API = process.env.NEXT_PUBLIC_API_URL;
    if (!API) {
      setLoaded(true);
      return;
    }

    fetch(`${API}/api/v1/stats/`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) {
          setStats({
            activeEvStations: data.active_ev_stations ?? 0,
            totalEvStations: data.total_ev_stations ?? 0,
            citiesCovered: data.cities_covered ?? 0,
            completedProjects: data.completed_projects ?? 0,
            partnerEnquiries: data.partner_enquiries ?? 0,
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  return { stats, loaded };
}
