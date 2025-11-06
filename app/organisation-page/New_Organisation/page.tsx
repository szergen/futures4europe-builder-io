// 'use client';
import classNames from 'classnames';
import React from 'react';
import OrganisationPageComponent from '@app/page-components/OrganisationPageComponent/OrganisationPageComponent';

export default async function OrganisationPage({ params }: any) {
  console.log('Organisation Page Params', params.slug);

  return (
    <div className={classNames('w-full')}>
      <OrganisationPageComponent
        pageTitle={params.slug}
        organisation={{}}
        isNewPage
      />
    </div>
  );
}
