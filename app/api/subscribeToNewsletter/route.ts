import { NextRequest, NextResponse } from 'next/server';
import { createClient, ApiKeyStrategy } from '@wix/sdk';
import { marketingConsent } from '@wix/marketing';
import { submissions } from '@wix/forms'; // Add this import

export const POST = async (req: NextRequest) => {
  const { email } = await req.json();

  try {
    const { NEXT_PUBLIC_WIX_API_KEY, NEXT_PUBLIC_WIX_SITE_ID } = process.env;

    // Create client with both marketingConsent and forms modules
    const wixClient = createClient({
      modules: { marketingConsent, submissions },
      auth: ApiKeyStrategy({
        apiKey: NEXT_PUBLIC_WIX_API_KEY,
        siteId: NEXT_PUBLIC_WIX_SITE_ID,
      }),
    });

    // Create the marketing consent record
    const consentResult =
      await wixClient.marketingConsent.upsertMarketingConsent({
        details: {
          email,
          type: 'EMAIL',
        },
      });

    // Update subscription status to SUBSCRIBED
    let subscriptionUpdated = false;
    let subscriptionResponse = null;

    try {
      const response = await fetch(
        'https://www.wixapis.com/email-marketing/v1/email-subscriptions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${NEXT_PUBLIC_WIX_API_KEY}`,
            'wix-site-id': NEXT_PUBLIC_WIX_SITE_ID,
          },
          body: JSON.stringify({
            subscription: {
              email: email,
              subscriptionStatus: 'SUBSCRIBED',
            },
          }),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        subscriptionResponse = responseData;
        subscriptionUpdated = true;

        // Now create a form submission to trigger the welcome email
        try {
          // Create form submission using your actual form ID and field key
          const formSubmission = {
            formId: '70c1f23b-9a16-4b3d-a1ee-7db9fb52b0b3', // Your actual form ID
            submissions: {
              email_d45f: email, // Use your actual field key
            },
          };

          const submissionResult = await wixClient.submissions.createSubmission(
            formSubmission
          );
          console.log('Form submission created:', submissionResult);

          // If the submission status is PENDING, confirm it to ensure automations trigger
          if (submissionResult.status === 'PENDING' && submissionResult._id) {
            const confirmedSubmission =
              await wixClient.submissions.confirmSubmission(
                submissionResult._id
              );
            console.log('Submission confirmed:', confirmedSubmission);
          }
        } catch (formError) {
          console.error('Error submitting form:', formError);
        }
      }
    } catch (apiError) {
      console.error('API error:', apiError);
    }

    return NextResponse.json(
      {
        marketingConsent: consentResult,
        subscriptionUpdated,
        subscriptionResponse,
        message: 'Subscription processed successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error subscribing to newsletter for email ${email}:`, error);

    return NextResponse.json(
      { message: 'Internal server error', error: error.message },
      { status: 500 }
    );
  }
};

export const GET = () => {
  return NextResponse.json(
    { message: 'Method not allowed for getCollectionItemByTitle' },
    { status: 405 }
  );
};
