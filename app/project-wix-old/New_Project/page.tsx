// 'use client';
import classNames from 'classnames';
import React from 'react';
import ProjectPageComponent from '@app/page-components/ProjectPageComponent/ProjectPageComponent';

export default async function PersonPage({ params }: any) {
  return (
    <div className={classNames('w-full')}>
      <ProjectPageComponent pageTitle={params.slug} project={{}} isNewPage />
    </div>
  );
}
