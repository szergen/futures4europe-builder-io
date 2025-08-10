import { NextRequest, NextResponse } from 'next/server';
import { getWixClientServerData } from '@app/hooks/useWixClientServer';

export async function GET(req: NextRequest) {
  try {
    const wixClient = await getWixClientServerData();
    let allContacts = [];
    let skip = 0;
    const limit = 1000;
    let totalCount = 0;

    do {
      const result = await wixClient.contacts
        .queryContacts()
        .skip(skip)
        .limit(limit)
        .find();

      allContacts = [...allContacts, ...result.items];
      totalCount = result.totalCount || result.items.length; // Fallback in case totalCount is missing
      skip += limit;
    } while (skip < totalCount);

    return NextResponse.json(
      {
        success: true,
        contacts: allContacts,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { message: 'Error fetching contacts', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log('POST handler started');
    const wixClient = await getWixClientServerData();
    console.log('Wix client initialized');

    // Parse the request body
    let contactId, action, revision;
    try {
      const body = await req.json();
      contactId = body.contactId;
      action = body.action || 'removeLabel'; // Default to removeLabel for backward compatibility
      revision = body.revision; // Accept revision parameter from client
      console.log(
        'Request body parsed, contactId:',
        contactId,
        'action:',
        action,
        'revision:',
        revision
      );
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return NextResponse.json(
        { message: 'Invalid request body format' },
        { status: 400 }
      );
    }

    if (!contactId) {
      console.log('Missing contactId in request');
      return NextResponse.json(
        { message: 'Contact ID is required' },
        { status: 400 }
      );
    }

    // Get the current contact to verify it exists and check its labels
    console.log('Fetching contact with ID:', contactId);
    let contact;
    try {
      contact = await wixClient.contacts.getContact(contactId);
      console.log('Contact fetched successfully');
      console.log('Current label keys:', contact.info?.labelKeys?.items);
      console.log('Contact revision:', contact.revision);

      // If revision wasn't provided, use the one we just fetched
      if (revision === undefined) {
        revision = contact.revision;
        console.log('Using fetched revision:', revision);
      }

      // Log all labels for debugging
      const allLabels = contact.info?.labelKeys?.items || [];
      console.log('All labels on contact:', allLabels);

      // Check if the contact has the label
      const hasNoInfoPageLabel = allLabels.some(
        (label) =>
          label === 'custom.hasnoinfopage' ||
          label.toLowerCase() === 'custom.hasnoinfopage'
      );

      console.log(
        "Does contact have the 'custom.hasnoinfopage' label?",
        hasNoInfoPageLabel
      );

      // Handle the action based on whether the label exists and what action was requested
      if (action === 'addLabel') {
        if (hasNoInfoPageLabel) {
          console.log('Contact already has the label, no need to add');
          return NextResponse.json(
            {
              success: false,
              message: 'Label already exists on this contact',
            },
            { status: 400 }
          );
        }
      } else if (action === 'removeLabel') {
        if (!hasNoInfoPageLabel) {
          console.log("Contact doesn't have the label, no need to remove");
          return NextResponse.json(
            {
              success: true,
              message: 'No matching label found to remove',
            },
            { status: 200 }
          );
        }
      }
    } catch (getContactError: any) {
      console.error('Error fetching contact:', getContactError);
      return NextResponse.json(
        {
          message: 'Error fetching contact details',
          error: getContactError.message,
        },
        { status: 404 }
      );
    }

    // Perform the requested action
    try {
      if (action === 'addLabel') {
        console.log(
          "Adding label 'custom.hasnoinfopage' to contact",
          contactId
        );

        // The labelContact method expects an array of label keys
        await wixClient.contacts.labelContact(contactId, [
          'custom.hasnoinfopage',
        ]);

        console.log('Label addition operation completed');

        // Verify the label has been added
        const updatedContact = await wixClient.contacts.getContact(contactId);
        const hasLabel = updatedContact.info?.labelKeys?.items?.includes(
          'custom.hasnoinfopage'
        );
        console.log('After addition, does contact have the label?', hasLabel);

        if (!hasLabel) {
          console.warn(
            'Label addition reported success but label is not present'
          );
          return NextResponse.json(
            {
              success: false,
              message: 'Failed to add label',
            },
            { status: 500 }
          );
        }

        return NextResponse.json(
          {
            success: true,
            message: 'Label added successfully',
          },
          { status: 200 }
        );
      } else {
        // Default action: removeLabel
        console.log(
          "Removing label 'custom.hasnoinfopage' from contact",
          contactId
        );

        // The unlabelContact method expects an array of label keys
        await wixClient.contacts.unlabelContact(contactId, [
          'custom.hasnoinfopage',
        ]);

        console.log('Label removal operation completed');

        // Verify the label has been removed
        const updatedContact = await wixClient.contacts.getContact(contactId);
        const stillHasLabel = updatedContact.info?.labelKeys?.items?.includes(
          'custom.hasnoinfopage'
        );
        console.log(
          'After removal, does contact still have the label?',
          stillHasLabel
        );

        if (stillHasLabel) {
          console.warn('Label removal reported success but label still exists');

          // Try an alternative approach with explicit revision
          console.log('Trying alternative approach with explicit revision');

          try {
            // Use the updateContact method with explicit revision
            await wixClient.contacts.updateContact(
              contactId,
              {
                info: {
                  labelKeys: {
                    items: updatedContact.info.labelKeys.items.filter(
                      (label) => label !== 'custom.hasnoinfopage'
                    ),
                  },
                },
              },
              revision || updatedContact.revision,
              {
                allowDuplicates: false,
              }
            );

            // Verify the label has been removed with the alternative approach
            const finalContact = await wixClient.contacts.getContact(contactId);
            const stillHasLabelAfterAlternative =
              finalContact.info?.labelKeys?.items?.includes(
                'custom.hasnoinfopage'
              );

            if (stillHasLabelAfterAlternative) {
              console.warn('Alternative approach also failed to remove label');
              return NextResponse.json(
                {
                  success: false,
                  message: 'Failed to remove label with both methods',
                },
                { status: 500 }
              );
            } else {
              console.log(
                'Alternative approach successfully removed the label'
              );
            }
          } catch (alternativeError: any) {
            console.error('Error in alternative approach:', alternativeError);
            return NextResponse.json(
              {
                success: false,
                message: 'Failed to remove label with both methods',
                error: alternativeError.message,
              },
              { status: 500 }
            );
          }
        }

        return NextResponse.json(
          {
            success: true,
            message: 'Label removed successfully',
          },
          { status: 200 }
        );
      }
    } catch (apiError: any) {
      console.error('Error performing label operation:', apiError);
      return NextResponse.json(
        {
          message: `Error ${
            action === 'addLabel' ? 'adding' : 'removing'
          } label`,
          error: apiError.message,
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Unhandled error in POST handler:', error);
    return NextResponse.json(
      {
        message: 'Server error while processing request',
        error: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}
