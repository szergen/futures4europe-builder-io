const updateDataItem = async (
  collectionName: string,
  itemId: string,
  data: Record<string, any>
) => {
  try {
    const response = await fetch('/api/updateDataItem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ collectionName, itemId, data }),
    });

    if (!response.ok) {
      throw new Error('Failed to update data item');
    }

    const updatedItem = await response.json();
    return updatedItem;
  } catch (error) {
    console.error('Error updating data item', error);
  }
};

const getCollectionItemByTitle = async (
  collectionName: string,
  itemId: string
) => {
  try {
    const response = await fetch('/api/getCollectionItem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ collectionName, itemId }),
    });

    if (!response.ok) {
      throw new Error('Failed to get collection item');
    }

    const item = await response.json();
    return item;
  } catch (error) {
    console.error('Error getting collection item:', error);
  }
};

const getCollectionItems = async (collectionName: string) => {
  try {
    const response = await fetch('/api/getCollectionItems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ collectionName }),
    });

    if (!response.ok) {
      throw new Error('Failed to get collection items');
    }

    const item = await response.json();
    return item;
  } catch (error) {
    console.error('Error getting collection items:', error);
  }
};

const subscribeToNewsletter = async (email: string) => {
  try {
    const response = await fetch('/api/subscribeToNewsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error('Failed to subscribeToNewsletter');
    }

    const item = await response.json();
    return item;
  } catch (error) {
    console.error('Error getting collection items:', error);
  }
};

const getCollection = async (collectionName: string) => {
  try {
    const response = await fetch('/api/getCollection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ collectionName }),
    });

    if (!response.ok) {
      throw new Error('Failed to get collection');
    }

    const items = await response.json();
    return items;
  } catch (error) {
    console.error('Error getting collection:', error);
  }
};

const bulkInsertItems = async (
  collectionName: string,
  dataItems: Record<string, any>[]
) => {
  try {
    const response = await fetch('/api/bulkInsertItems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ collectionName, dataItems }),
    });

    if (!response.ok) {
      throw new Error('Failed to insert bulk data items');
    }

    const updatedItems = await response.json();
    return updatedItems;
  } catch (error) {
    console.error('Error inserting bulk items', error);
  }
};

const bulkRemoveItems = async (
  collectionName: string,
  dataItems: Record<string, any>[]
) => {
  try {
    const response = await fetch('/api/bulkRemoveItems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ collectionName, dataItems }),
    });

    if (!response.ok) {
      throw new Error('Failed to remove bulk data items');
    }

    const updatedItems = await response.json();
    return updatedItems;
  } catch (error) {
    console.error('Error removing bulk items', error);
  }
};

const bulkInsertDataItemReferences = async (
  collectionName: string,
  dataItemReferences: Record<string, any>[]
) => {
  try {
    const response = await fetch('/api/bulkInsertDataItemReferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ collectionName, dataItemReferences }),
    });

    if (!response.ok) {
      throw new Error('Failed to insert bulk references');
    }

    const updatedItems = await response.json();
    return updatedItems;
  } catch (error) {
    console.error('Error inserting bulk item references', error);
  }
};

const replaceDataItemReferences = async (
  collectionName: string,
  newReferencedItemIds: string[],
  referringItemFieldName: string,
  referringItemId: string
) => {
  try {
    const response = await fetch('/api/replaceDataItemReferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        collectionName,
        newReferencedItemIds,
        referringItemFieldName,
        referringItemId,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to insert bulk references');
    }

    const updatedItems = await response.json();
    return updatedItems;
  } catch (error) {
    console.error('Error inserting bulk item references', error);
  }
};

const getItemsForCurrentUser = async (
  collectionName: string,
  ownerId: string
) => {
  try {
    const response = await fetch('/api/getItemsForCurrentUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ collectionName, ownerId }),
    });

    if (!response.ok) {
      throw new Error('Failed to get items for current user');
    }

    const items = await response.json();
    return items;
  } catch (error) {
    console.error('Error getting items for current user:', error);
  }
};

const getContactsItem = async (itemId: string) => {
  try {
    const response = await fetch('/api/getContactsItem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemId }),
    });

    if (!response.ok) {
      throw new Error('Failed to update data item');
    }

    const updatedItem = await response.json();
    return updatedItem;
  } catch (error) {
    console.error(`Error getting contacts item for itemId: ${itemId}`, error);
  }
};

const getContactsItemByEmail = async (itemId: string) => {
  try {
    const response = await fetch('/api/getContactsItemByEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemId }),
    });

    if (!response.ok) {
      throw new Error('Failed to update data item');
    }

    const updatedItem = await response.json();
    return updatedItem;
  } catch (error) {
    console.error(`Error getting contacts item for itemId: ${itemId}`, error);
  }
};

const updateMember = async (contactId: string, nickname: string) => {
  try {
    const response = await fetch('/api/updateMember', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contactId, nickname }),
    });

    if (!response.ok) {
      throw new Error('Failed to update data item');
    }

    const updatedItem = await response.json();
    return updatedItem;
  } catch (error) {
    console.error(
      `Error updating contacts item for contactId: ${contactId} and nickname: ${nickname}`,
      error
    );
  }
};

const triggerForgotPasswordMail = async (
  email: string,
  redirectUrl: string
) => {
  try {
    const response = await fetch('/api/forgotPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, redirectUrl }),
    });

    if (!response.ok) {
      throw new Error('Failed to sendPassword Reset Mail');
    }

    const updatedItem = await response.json();
    return updatedItem;
  } catch (error) {
    console.error(`Error sedinding password reset mail for : ${email}`, error);
  }
};

const generateFileUploadUrl = async (
  mimeType: string,
  options: Record<string, any>
  // file: File
) => {
  try {
    const response = await fetch('/api/generateFileUploadUrl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mimeType,
        options,
        // file,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate file upload URL');
    }

    const updatedItems = await response.json();
    return updatedItems;
  } catch (error) {
    console.error('Error genering file upload URL', error);
  }
};

const revalidateDataItem = async (postSlug: string) => {
  try {
    const response = await fetch('/api/revalidate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postSlug: postSlug,
        secret: process.env.NEXT_PUBLIC_REVALIDATION_TOKEN,
      }),
    });

    const result = await response.json();
    console.log('revalidateDataItem result:', result);

    if (!response.ok) {
      throw new Error('Failed to revalidate data item');
    }

    if (!response.ok) {
      console.error('Revalidation failed:', result);
    } else {
      console.log('Page successfully revalidated.');
    }
    // const updatedItems = await response.json();
    // return updatedItems;
  } catch (error) {
    console.error('Error revalidating data item', error);
  }
};

export {
  updateDataItem,
  getCollectionItemByTitle,
  getCollection,
  bulkInsertItems,
  getItemsForCurrentUser,
  getContactsItem,
  bulkInsertDataItemReferences,
  replaceDataItemReferences,
  generateFileUploadUrl,
  revalidateDataItem,
  getCollectionItems,
  getContactsItemByEmail,
  subscribeToNewsletter,
  bulkRemoveItems,
  triggerForgotPasswordMail,
  updateMember,
};
