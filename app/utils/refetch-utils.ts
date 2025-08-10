export async function refetchPosts() {
  const response = await fetch('/api/posts', {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Failed to refresh posts cache');
  }

  return response.json();
}

export async function refetchTags() {
  const response = await fetch('/api/tags', {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Failed to refresh tags cache');
  }

  return response.json();
}

export async function refetchInfoPages() {
  const response = await fetch('/api/infoPages', {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Failed to refresh infoPages cache');
  }

  return response.json();
}

export async function refetchAffiliations() {
  const response = await fetch('/api/affiliations', {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Failed to refresh affiliations cache');
  }

  return response.json();
}
