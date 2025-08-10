import { useEffect, useState } from 'react';

const useFetchPostPages = (refresh: boolean) => {
  const [postPages, setPostPages] = useState<any[]>([]);
  const [postPagesFetched, setPostPagesFetched] = useState(false);

  useEffect(() => {
    const fetchPostPages = async () => {
      try {
        const allPostPagesResponse = await fetch('/api/postPages');
        const allPostPages = await allPostPagesResponse.json();

        setPostPages(allPostPages);
        setPostPagesFetched(true);
      } catch (error) {
        console.error('Error fetching post pages:', error);
      }
    };

    fetchPostPages();
  }, [refresh]);

  return { postPages, postPagesFetched };
};

export default useFetchPostPages;
