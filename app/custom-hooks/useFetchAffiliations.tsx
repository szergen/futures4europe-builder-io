import { useEffect, useState } from 'react';

const useFetchAffiliations = (refresh: boolean) => {
  const [affiliations, setAffiliations] = useState<any[]>([]);
  const [affiliationsFetched, setAffiliationsFetched] = useState(false);

  useEffect(() => {
    const fetchAffiliations = async () => {
      try {
        const allAffiliationsResponse = await fetch('/api/affiliations');
        const allAffiliations = await allAffiliationsResponse.json();

        setAffiliations(allAffiliations);
        setAffiliationsFetched(true);
      } catch (error) {
        console.error('Error fetching affiliations:', error);
      }
    };

    fetchAffiliations();
  }, [refresh]);

  return { affiliations, affiliationsFetched };
};

export default useFetchAffiliations;
