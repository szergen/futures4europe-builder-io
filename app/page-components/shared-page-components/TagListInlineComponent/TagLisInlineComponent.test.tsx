// TagLisInlineComponent.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import TagLisInlineComponent from './TagLisInlineComponent';
import { TagLisInlineComponentProps, PostPage, InfoPage } from './types'; // Adjust the import path as needed

const mockPostPages: PostPage[] = [
  {
    data: {
      title: 'HORIZON FUTURES WATCH WORKSHOP #8: Futures of Civic Resilience',
      pageTypes: [{ name: 'event' }],
      pageOwner: [
        {
          name: 'Bianca Dragomir',
          picture:
            'https://static.wixstatic.com/media/471908_957ec9dc2bb74b97b6166aab1d9d0840~mv2.jpg',
          _id: '90c38dc0-018b-4d55-af76-e2b52130e029',
        },
      ],
      // Add other necessary fields if any
    },
    _id: '929ebbb3-c2aa-4854-ab39-e3a6016f3187',
  },
  // Add more PostPage objects as needed
];

const mockInfoPages: InfoPage[] = [
  {
    data: {
      title: 'Sample Person Info Page',
      pageTypes: [{ name: 'person info' }],
      person: [
        {
          name: 'John Doe',
          picture: 'https://example.com/john.jpg',
          _id: '1',
        },
      ],
      // Add other necessary fields if any
    },
    _id: 'info-page-1',
  },
  // Add more InfoPage objects as needed
];

const props: TagLisInlineComponentProps = {
  postPages: mockPostPages,
  postPageType: 'event',
  infoPages: mockInfoPages,
  infoPageType: 'person info',
};

describe('TagLisInlineComponent', () => {
  test('renders event tags correctly', () => {
    render(<TagLisInlineComponent {...props} />);

    // Check for event tags
    expect(screen.getByText('Bianca Dragomir')).toBeInTheDocument();

    // Check for info page tags
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  test('displays message when no event tags are found', () => {
    const emptyPostPages: PostPage[] = [];

    render(
      <TagLisInlineComponent
        postPages={emptyPostPages}
        postPageType="event"
        infoPages={mockInfoPages}
        infoPageType="person info"
      />
    );

    expect(
      screen.getByText('No posts found for the specified postPageType.')
    ).toBeInTheDocument();
  });
});
