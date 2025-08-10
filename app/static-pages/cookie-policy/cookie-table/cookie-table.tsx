import React from 'react';

const CookieTable = () => {
  const cookieData = [
    {
      name: 'f4e_wix_sessionToken',
      type: 'authentication',
      description:
        'Generated when authenticated in Wix through our website and stored for validating auth requests',
      necessary: 'Yes, for logging in',
      controller: 'Website/Sent to Wix for auth',
      expiry: 'Session cookie 8hrs max',
      information: 'Generated OAuth authentication tokens',
    },
    {
      name: 'f4e_wix_accessTokenAndRefreshToken',
      type: 'Refresh authentication',
      description:
        'Refresh token for OAuth. The session token is typically short-lived, while the refresh token allows renewing the session without forcing the user to log in again.',
      necessary: "Yes, for refreshing the user's session for when logged in",
      controller: 'Website/Sent to Wix for auth',
      expiry: '7days',
      information: 'Generated OAuth refresh tokens',
    },
    {
      name: '_ga',
      type: 'user-input',
      description: 'Third-party (Google Analytics)',
      necessary: 'No (for statistics only)',
      controller:
        "Third-party; Google LLC (outside the EU), Google Analytics' backend manages the data collected via cookies like _ga and uses it to provide analytics reports to website owners. Holding Marketing Department",
      expiry: '2 years',
      information: 'Id number',
    },
    {
      name: '_gid',
      type: 'user-input',
      description: 'Third-party (Google Analytics)',
      necessary: 'No (for statistics only)',
      controller:
        'Third-party; Google LLC (outside the EU), tracking users across page views within a single day, Holding Marketing Department',
      expiry: '24 hours',
      information: 'Id number',
    },
    {
      name: '_gat',
      type: 'user-input',
      description: 'Third-party (Google Analytics)',
      necessary: 'No (for statistics only)',
      controller:
        'Third-party; Google LLC (outside the EU), used for request rate throttling to manage and reduce the number of tracking requests sent to Google Analytics servers, Holding Marketing Department',
      expiry: '1 minute',
      information: 'Id number',
    },
    {
      name: '_csrf-[to be inserted] -exchange',
      type: 'user centric security',
      description: 'Cross-site request forgery protection token.',
      necessary: 'Yes (for security reasons)',
      controller: 'Website',
      expiry: 'Session cookie',
      information: 'Token',
    },
  ];

  const headers = [
    'Name of cookie',
    'Type of cookie',
    'Description',
    'Is it necessary?',
    'Who controls the information?',
    'Expiry period',
    'Type of information',
  ];

  return (
    <div className="w-full overflow-x-auto shadow-md rounded-lg">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-6 py-4 text-left text-sm font-semibold text-gray-900 bg-gray-100 border-b"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {cookieData.map((cookie, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
            >
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                {cookie.name}
              </td>
              <td className="px-6 py-4">{cookie.type}</td>
              <td className="px-6 py-4">{cookie.description}</td>
              <td className="px-6 py-4">{cookie.necessary}</td>
              <td className="px-6 py-4">{cookie.controller}</td>
              <td className="px-6 py-4">{cookie.expiry}</td>
              <td className="px-6 py-4">{cookie.information}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CookieTable;
