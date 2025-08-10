import { useEffect, useState } from 'react';

const useFetchInfoPages = (refresh: boolean) => {
  const [infoPages, setInfoPages] = useState<any[]>([]);
  const [infoPagesFetched, setInfoPagesFetched] = useState(false);

  useEffect(() => {
    const fetchInfoPages = async () => {
      try {
        const allInfoPagesResponse = await fetch('/api/infoPages');
        const allInfoPages = await allInfoPagesResponse.json();

        setInfoPages(allInfoPages);
        setInfoPagesFetched(true);
      } catch (error) {
        console.error('Error fetching info pages:', error);
      }
    };

    fetchInfoPages();
  }, [refresh]);

  return { infoPages, infoPagesFetched };
};

export default useFetchInfoPages;
