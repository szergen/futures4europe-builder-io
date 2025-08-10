const mockPost = (pageTitle: string) => {
  return {
    title: pageTitle,
    pageType: 'Event',
    postType: ['Editorial', 'Event'],
    eventDate: {
      start: '2021-10-10',
      end: '2021-10-12',
    },
    registrationLink: ' ',
    postDate: '2021-10-09',
    subtitle:
      'Deep-Learning and HPC to Boost Biomedical Applications for Health',
    content: `
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit
    <a tagPageLink="https://google.com">https://google.com</a></p>
    <p>https://google.com</p>
    <p>https://google.com</p>
    `,
    countryTag: {
      name: 'Italy',
      popularity: 253,
    },
    recommendations: {
      number: 3,
      images: [
        'https://picsum.photos/id/192/30/30',
        'https://picsum.photos/id/190/30/30',
        'https://picsum.photos/id/193/30/30',
      ],
    },
    views: 320,
    authors: [
      {
        name: 'Eva Pericolini',
        picture: 'https://picsum.photos/id/155/147/147',
        tagPageLink: '/person/Eva_Pericolini',
      },
    ],
    projectAuthors: [
      {
        name: 'Eva Pericolini',
        picture: 'https://picsum.photos/id/155/147/147',
        tagPageLink: '/person/Eva_Pericolini',
      },
      {
        name: 'Dan Lardsen',
        picture: 'https://picsum.photos/id/165/147/147',
        tagPageLink: '/person/Eva_Pericolini',
      },
      {
        name: 'Ava Pericolini',
        picture: 'https://picsum.photos/id/175/147/147',
        tagPageLink: '/person/Eva_Pericolini',
      },
    ],
    project: {
      name: 'Project H2020',
      popularity: 253,
      picture: 'https://picsum.photos/id/155/147/147',
      tagPageLink: '/project/H2020',
    },
    organisation: {
      name: 'ISINOVA',
      popularity: 253,
      picture: 'https://picsum.photos/id/155/147/147',
      tagPageLink: '/organisation/ISINOVA',
    },
    eventSpeakers: [
      {
        name: 'Eva Pericolini',
        picture: 'https://picsum.photos/id/155/147/147',
        tagPageLink: '/person/Eva_Pericolini',
      },
      {
        name: 'Eva Pericolini',
        picture: 'https://picsum.photos/id/155/147/147',
        tagPageLink: '/person/Eva_Pericolini',
      },
      {
        name: 'Eva Pericolini',
        picture: 'https://picsum.photos/id/155/147/147',
        tagPageLink: '/person/Eva_Pericolini',
      },
    ],
    foreSightMethods: [
      {
        name: 'Horizon Scanning',
        popularity: 253,
      },
      {
        name: 'Delphi Method',
        popularity: 153,
        tagPageLink: 'https://google.com',
        picture: 'https://picsum.photos/id/185/300/300',
      },
    ],
    domains: [
      {
        name: 'Biology',
        popularity: 253,
      },
      {
        name: 'Infectious Diseases',
        popularity: 153,
      },
      {
        name: 'Imune Response',
        popularity: 73,
      },
      {
        name: 'Innate Immunity',
        popularity: 55,
      },
      {
        name: 'Cell Culture',
        popularity: 45,
      },
      {
        name: 'T Cells',
        popularity: 23,
      },
    ],
    files: [
      {
        tagPageLink: '/files/1.pdf',
        title: 'Styleguide',
        fileSize: '2.3 MB',
        format: 'PDF',
      },
      {
        tagPageLink: '/files/2.pdf',
        title: 'Description',
        fileSize: '2.1 MB',
        format: 'PDF',
      },
    ],
    projectResultMedia: {
      url: 'https://0bbe2e34-e503-441a-af9e-4fc70c17e6af.usrfiles.com/ugd/471908_91d10778997542a0a4552a485cfc3992.pdf',
      fileName: 'test.pdf',
      displayName: 'test display name',
      sizeInBytes: '1024',
      type: 'document',
      thumbnail: 'https://picsum.photos/id/155/147/147',
    },
    links: [
      {
        tagPageLink: 'https://google.com',
        description:
          'Anticipation and monitoring of emerging technologies and disruptive innovation',
      },
      {
        tagPageLink: 'https://google.com',
        description:
          'An Interview of transforming Innovation Ecosystems Towards Sustainability',
      },
      {
        tagPageLink: 'https://google.com',
        description: ' NEXT conference overview',
      },
    ],
    speakers: [
      {
        name: 'Eva Pericolini',
        picture: 'https://picsum.photos/id/155/147/147',
        tagPageLink: '/person/Eva_Pericolini',
      },
      {
        name: 'Eva Pericolini',
        picture: 'https://picsum.photos/id/155/147/147',
        tagPageLink: '/person/Eva_Pericolini',
      },
      {
        name: 'Eva Pericolini',
        picture: 'https://picsum.photos/id/155/147/147',
        tagPageLink: '/person/Eva_Pericolini',
      },
    ],
    eventHostOrganisations: [
      {
        name: 'European Commission',
        picture: 'https://picsum.photos/id/155/147/147',
        tagPageLink: '/organisation/European_Commission',
      },
      {
        name: 'French National Centre for Scientific Research',
        picture: 'https://picsum.photos/id/154/147/147',
        tagPageLink: '/organisation/European_Commission',
      },
      {
        name: 'ISINOVA',
        picture: 'https://picsum.photos/id/153/147/147',
        tagPageLink: '/organisation/European_Commission',
      },
    ],
    people: [
      {
        name: 'Eva Pericolini',
        picture: 'https://picsum.photos/id/155/147/147',
        tagPageLink: '/person/Eva_Pericolini',
      },
      {
        name: 'Dan Lardsen',
        picture: 'https://picsum.photos/id/165/147/147',
        tagPageLink: '/person/Eva_Pericolini',
      },
      {
        name: 'Ava Pericolini',
        picture: 'https://picsum.photos/id/175/147/147',
        tagPageLink: '/person/Eva_Pericolini',
      },
    ],
    participants: [
      {
        name: 'Eva Pericolini',
        picture: 'https://picsum.photos/id/155/147/147',
        tagPageLink: '/person/Eva_Pericolini',
      },
      {
        name: 'Dan Lardsen',
        picture: 'https://picsum.photos/id/165/147/147',
        tagPageLink: '/person/Eva_Pericolini',
      },
      {
        name: 'Ava Pericolini',
        picture: 'https://picsum.photos/id/175/147/147',
        tagPageLink: '/person/Eva_Pericolini',
      },
    ],
  };
};

const mockPerson = (pageTitle: string) => {
  return {
    title: pageTitle,
    tagLine:
      'Sail away from the safe harbor - Catch the trade winds in your sails',
    image: 'https://picsum.photos/id/155/147/147',
    personPopularity: 253,
    linkedinLink: 'https://facebook.com',
    researchGateLink: 'https://linkedin.com',
    orcidIDLink: 'https://orcid.com',
    pageType: 'Person Info',
    postType: 'Person',
    publishedDate: '2021-10-09',
    description:
      'Eva Pericolini graduated in Pharmacy in 2003 at the University of Perugia and obtained a Ph.D. in “Molecular pathogenesis, immunology and control of transmitting agents causing the principle diseases associated with poverty: malaria, AIDS and tuberculosis” in 2010 at the University of Perugia, Department of Experimental Medicine.',
    countryTag: {
      name: 'Italy',
      popularity: 253,
    },
    personRoles: [
      {
        name: 'Biology',
        popularity: 253,
      },
      {
        name: 'Infectious Diseases',
        popularity: 153,
      },
      {
        name: 'Imune Response',
        popularity: 153,
      },
    ],
    recommendations: {
      number: 3,
      images: [
        'https://picsum.photos/id/192/30/30',
        'https://picsum.photos/id/190/30/30',
        'https://picsum.photos/id/193/30/30',
      ],
    },
    views: 320,
    projectsCoordindation: [
      {
        name: 'Project H2020',
        popularity: 253,
        picture: 'https://picsum.photos/id/155/147/147',
        tagPageLink: '/project/H2020',
        arole: 'Coordinator',
      },
      {
        name: 'Project H2020',
        popularity: 253,
        picture: 'https://picsum.photos/id/155/147/147',
        tagPageLink: '/project/H2020',
        arole: '',
      },
      {
        name: 'Project H2020',
        popularity: 253,
        picture: 'https://picsum.photos/id/155/147/147',
        tagPageLink: '/project/H2020',
        arole: '',
      },
    ],
    projectsParticipation: [
      {
        name: 'Project H2020',
        popularity: 253,
        picture: 'https://picsum.photos/id/155/147/147',
        tagPageLink: '/project/H2020',
        arole: 'Coordinator',
      },
      {
        name: 'Project H2020',
        popularity: 253,
        picture: 'https://picsum.photos/id/155/147/147',
        tagPageLink: '/project/H2020',
        arole: '',
      },
      {
        name: 'Project H2020',
        popularity: 253,
        picture: 'https://picsum.photos/id/155/147/147',
        tagPageLink: '/project/H2020',
        arole: '',
      },
    ],
    currentAfiliations: [
      {
        name: 'ISINOVA',
        popularity: 253,
        picture: 'https://picsum.photos/id/155/147/147',
        tagPageLink: '/organisation/ISINOVA',
        arole: 'Professor of Foresight, Strategy and Innovation',
      },
      {
        name: 'UEFISCDI',
        popularity: 253,
        picture: 'https://picsum.photos/id/145/147/147',
        tagPageLink: '/organisation/ISINOVA',
        arole: 'Professor of Quantum Computing',
      },
    ],
    formerAfiliations: [
      {
        name: 'ISINOVA',
        popularity: 253,
        picture: 'https://picsum.photos/id/155/147/147',
        tagPageLink: '/organisation/ISINOVA',
        arole: 'Professor of Foresight, Strategy and Innovation',
      },
      {
        name: 'UEFISCDI',
        popularity: 253,
        picture: 'https://picsum.photos/id/145/147/147',
        tagPageLink: '/organisation/ISINOVA',
        arole: 'Professor of Quantum Computing',
      },
    ],
    foreSightMethods: [
      {
        name: 'Horizon Scanning',
        popularity: 253,
      },
      {
        name: 'Delphi Method',
        popularity: 153,
        tagPageLink: 'https://google.com',
        picture: 'https://picsum.photos/id/185/300/300',
      },
    ],
    domains: [
      {
        name: 'Biology',
        popularity: 253,
      },
      {
        name: 'Infectious Diseases',
        popularity: 153,
      },
      {
        name: 'Imune Response',
        popularity: 73,
      },
      {
        name: 'Innate Immunity',
        popularity: 55,
      },
      {
        name: 'Cell Culture',
        popularity: 45,
      },
      {
        name: 'T Cells',
        popularity: 23,
      },
    ],
    files: [
      {
        tagPageLink: '/files/1.pdf',
        title: 'Styleguide',
        fileSize: '2.3 MB',
        format: 'PDF',
      },
      {
        tagPageLink: '/files/2.pdf',
        title: 'Description',
        fileSize: '2.1 MB',
        format: 'PDF',
      },
    ],
    links: [
      {
        tagPageLink: 'https://google.com',
        description:
          'Anticipation and monitoring of emerging technologies and disruptive innovation',
      },
      {
        tagPageLink: 'https://google.com',
        description:
          'An Interview of transforming Innovation Ecosystems Towards Sustainability',
      },
      {
        tagPageLink: 'https://google.com',
        description: ' NEXT conference overview',
      },
    ],
  };
};

const mockOrganisation = (pageTitle: string) => {
  return {
    title: pageTitle,
    tagLine:
      'Driven by intellectual creativity and critical thinking since 1479',
    image: 'https://picsum.photos/id/136/147/147',
    organisationPopularity: 253,
    linkedinLink: 'https://facebook.com',
    organisationLink: 'https://linkedin.com',
    pageType: 'Organisation Info',
    postType: 'Organisation',
    publishedDate: '2021-10-09',
    establishedDate: '1999-10-09',
    description:
      'Driven by intellectual creativity and critical thinking since 1479, researchers and students at the University of Copenhagen have expanded horizons and contributed to moving the world forward. With its 5,000 researchers and 37,500 students, the University boasts an international research and study environment and is highly ranked among the worlds best universities.',
    countryTag: {
      name: 'Italy',
      popularity: 253,
    },
    recommendations: {
      number: 3,
      images: [
        'https://picsum.photos/id/192/30/30',
        'https://picsum.photos/id/190/30/30',
        'https://picsum.photos/id/193/30/30',
      ],
    },
    views: 320,
    projects: [
      {
        name: 'Project H2020',
        popularity: 253,
        picture: 'https://picsum.photos/id/155/147/147',
        tagPageLink: '/project/H2020',
        arole: 'Coordinator',
      },
      {
        name: 'Project H2020',
        popularity: 253,
        picture: 'https://picsum.photos/id/155/147/147',
        tagPageLink: '/project/H2020',
        arole: '',
      },
      {
        name: 'Project H2020',
        popularity: 253,
        picture: 'https://picsum.photos/id/155/147/147',
        tagPageLink: '/project/H2020',
        arole: '',
      },
    ],
    people: [
      {
        name: 'Eva Pericolini',
        popularity: 253,
        picture: 'https://picsum.photos/id/155/147/147',
        tagPageLink: '/organisation/ISINOVA',
        arole: 'Professor of Foresight, Strategy and Innovation',
      },
      {
        name: 'Dan Lardsen',
        popularity: 253,
        picture: 'https://picsum.photos/id/145/147/147',
        tagPageLink: '/organisation/ISINOVA',
        arole: 'Professor of Quantum Computing',
      },
    ],
    memberOrganisations: [
      {
        name: 'ISINOVA',
        popularity: 253,
        picture: 'https://picsum.photos/id/155/147/147',
        tagPageLink: '/organisation/ISINOVA',
        arole: 'Professor of Foresight, Strategy and Innovation',
      },
      {
        name: 'UEFISCDI',
        popularity: 253,
        picture: 'https://picsum.photos/id/145/147/147',
        tagPageLink: '/organisation/ISINOVA',
        arole: 'Professor of Quantum Computing',
      },
    ],
    memberOfOrganisations: [
      {
        name: 'Horizon Scanning',
        popularity: 253,
      },
      {
        name: 'Delphi Method',
        popularity: 153,
        tagPageLink: 'https://google.com',
        picture: 'https://picsum.photos/id/185/300/300',
      },
    ],
    domains: [
      {
        name: 'Biology',
        popularity: 253,
      },
      {
        name: 'Infectious Diseases',
        popularity: 153,
      },
      {
        name: 'Imune Response',
        popularity: 73,
      },
      {
        name: 'Innate Immunity',
        popularity: 55,
      },
      {
        name: 'Cell Culture',
        popularity: 45,
      },
      {
        name: 'T Cells',
        popularity: 23,
      },
    ],
    foreSightMethods: [
      {
        name: 'Horizon Scanning',
        popularity: 253,
      },
      {
        name: 'Delphi Method',
        popularity: 153,
        tagPageLink: 'https://google.com',
        picture: 'https://picsum.photos/id/185/300/300',
      },
    ],
    files: [
      {
        tagPageLink: '/files/1.pdf',
        title: 'Styleguide',
        fileSize: '2.3 MB',
        format: 'PDF',
      },
      {
        tagPageLink: '/files/2.pdf',
        title: 'Description',
        fileSize: '2.1 MB',
        format: 'PDF',
      },
    ],
    links: [
      {
        tagPageLink: 'https://google.com',
        description:
          'Anticipation and monitoring of emerging technologies and disruptive innovation',
      },
      {
        tagPageLink: 'https://google.com',
        description:
          'An Interview of transforming Innovation Ecosystems Towards Sustainability',
      },
      {
        tagPageLink: 'https://google.com',
        description: ' NEXT conference overview',
      },
    ],
  };
};

const mockProject = (pageTitle: string) => {
  return {
    title: pageTitle,
    tagLine:
      'Deep-Learning and HPC to Boost Biomedical Applications for Health',
    image: 'https://picsum.photos/id/136/147/147',
    popularity: 253,
    euFunded: true,
    projectPeriod: {
      start: '2021-10-09',
      end: '2023-10-09',
    },
    linkedinLink: 'https://facebook.com',
    pageLink: 'https://linkedin.com',
    pageType: 'Project',
    publishedDate: '2021-10-09',
    establishedDate: '1999-10-09',
    description: `The so-called fourth paradigm of science is based on the unified
            environments of high-performance computing (HPC) and Big Data analytics.
            It is expected to considerably advance health scientific research and
            innovation. The EU-funded DeepHealth project will deliver HPC power at
            the service of biomedical applications and apply deep learning (DL)
            techniques on vast and compound biomedical data sets, aiming to underpin
            new and more effective methods of diagnosis, monitoring and treatment of
            diseases. The project will develop a resilient and scalable structure
            for the HPC + Big Data environment that will rely on two new libraries:
            the European Distributed Deep Learning Library (EDDLL) and the European
            Computer Vision Library (ECVL). The structure, after it is validated,
            will allow training of models and provide training data from different
            medical fields.`,
    countryTag: {
      name: 'Italy',
      popularity: 253,
    },
    recommendations: {
      number: 3,
      images: [
        'https://picsum.photos/id/192/30/30',
        'https://picsum.photos/id/190/30/30',
        'https://picsum.photos/id/193/30/30',
      ],
    },
    views: 320,
    coordinators: [
      {
        name: 'Project H2020',
        popularity: 253,
        picture: 'https://picsum.photos/id/155/147/147',
        tagPageLink: '/project/H2020',
        arole: 'Coordinator',
      },
      {
        name: 'Project H2020',
        popularity: 253,
        picture: 'https://picsum.photos/id/155/147/147',
        tagPageLink: '/project/H2020',
        arole: '',
      },
      {
        name: 'Project H2020',
        popularity: 253,
        picture: 'https://picsum.photos/id/155/147/147',
        tagPageLink: '/project/H2020',
        arole: '',
      },
    ],
    participants: [
      {
        name: 'Eva Pericolini',
        popularity: 253,
        picture: 'https://picsum.photos/id/155/147/147',
        tagPageLink: '/organisation/ISINOVA',
        arole: 'Professor of Foresight, Strategy and Innovation',
      },
      {
        name: 'Dan Lardsen',
        popularity: 253,
        picture: 'https://picsum.photos/id/145/147/147',
        tagPageLink: '/organisation/ISINOVA',
        arole: 'Professor of Quantum Computing',
      },
    ],
    organisations: [
      {
        name: 'ISINOVA',
        popularity: 253,
        picture: 'https://picsum.photos/id/155/147/147',
        tagPageLink: '/organisation/ISINOVA',
        arole: 'Coordintor',
      },
      {
        name: 'UEFISCDI',
        popularity: 253,
        picture: 'https://picsum.photos/id/145/147/147',
        tagPageLink: '/organisation/ISINOVA',
        arole: 'Partner',
      },
    ],
    domains: [
      {
        name: 'Biology',
        popularity: 253,
      },
      {
        name: 'Infectious Diseases',
        popularity: 153,
      },
      {
        name: 'Imune Response',
        popularity: 73,
      },
      {
        name: 'Innate Immunity',
        popularity: 55,
      },
      {
        name: 'Cell Culture',
        popularity: 45,
      },
      {
        name: 'T Cells',
        popularity: 23,
      },
    ],
    foreSightMethods: [
      {
        name: 'Horizon Scanning',
        popularity: 253,
      },
      {
        name: 'Delphi Method',
        popularity: 153,
        tagPageLink: 'https://google.com',
        picture: 'https://picsum.photos/id/185/300/300',
      },
    ],
    files: [
      {
        tagPageLink: '/files/1.pdf',
        title: 'Styleguide',
        fileSize: '2.3 MB',
        format: 'PDF',
      },
      {
        tagPageLink: '/files/2.pdf',
        title: 'Description',
        fileSize: '2.1 MB',
        format: 'PDF',
      },
    ],
    links: [
      {
        tagPageLink: 'https://google.com',
        description:
          'Anticipation and monitoring of emerging technologies and disruptive innovation',
      },
      {
        tagPageLink: 'https://google.com',
        description:
          'An Interview of transforming Innovation Ecosystems Towards Sustainability',
      },
      {
        tagPageLink: 'https://google.com',
        description: ' NEXT conference overview',
      },
    ],
  };
};

const posts = [
  {
    title: 'ORION: Meet Your Co-Pilot in Horizon Scanning 1',
    date: '12.02.2022',
    image: 'https://picsum.photos/id/193/180/180',
    text: 'Paulo Carvalho has been working in the field of futures and foresight for more than 25 years. On one hand, he is a professor in foresight, strategy and innovation at the Faculty of Economics and Management at the University of Lisbon.',
    tags: [
      { name: 'Emerging technologies', popularity: 253 },
      { name: 'EU&RI policy', popularity: 153 },
    ],
    recommendations: {
      number: 3,
      images: [
        'https://picsum.photos/id/192/30/30',
        'https://picsum.photos/id/190/30/30',
        'https://picsum.photos/id/193/30/30',
      ],
    },
  },
  {
    title: 'With Big Tech comes Big (Ethical) Responsibility',
    date: '12.02.2022',
    image: 'https://picsum.photos/id/191/180/180',
    text: 'Paulo Carvalho has been working in the field of futures and foresight for more than 25 years. On one hand, he is a professor in foresight, strategy and innovation ',
    tags: [
      { name: 'Emerging technologies', popularity: 253 },
      { name: 'EU&RI policy', popularity: 153 },
    ],
    recommendations: {
      number: 5,
      images: [
        'https://picsum.photos/id/192/30/30',
        'https://picsum.photos/id/190/30/30',
        'https://picsum.photos/id/191/30/30',
        'https://picsum.photos/id/195/30/30',
        'https://picsum.photos/id/196/30/30',
      ],
    },
  },
  {
    title:
      'Prevention and treatment of autoimmune diseases with plant virus nanoparticles',
    date: '12.02.2022',
    image: 'https://picsum.photos/id/194/180/180',
    text: 'Paulo Carvalho has been working in the field of futures',
    tags: [
      { name: 'Emerging technologies', popularity: 253 },
      { name: 'EU&RI policy', popularity: 153 },
      { name: 'Emerging technologies', popularity: 253 },
      { name: 'EU&RI policy', popularity: 153 },
      { name: 'Emerging technologies', popularity: 253 },
    ],
    recommendations: {
      number: 3,
      images: [
        'https://picsum.photos/id/192/30/30',
        'https://picsum.photos/id/190/30/30',
        'https://picsum.photos/id/191/30/30',
      ],
    },
  },
  {
    title: 'ORION: Meet Your Co-Pilot in Horizon Scanning',
    date: '12.02.2022',
    image: 'https://picsum.photos/id/199/180/180',
    text: 'Paulo Carvalho has been working in the field of futures and foresight for more than 25 years. On one hand, he is a professor in foresight, strategy and innovation at the Faculty of Economics and Management at the University of Lisbon.',
    tags: [
      { name: 'Emerging technologies', popularity: 253 },
      { name: 'EU&RI policy', popularity: 153 },
    ],
    recommendations: {
      number: 3,
      images: [
        'https://picsum.photos/id/192/30/30',
        'https://picsum.photos/id/190/30/30',
        'https://picsum.photos/id/191/30/30',
      ],
    },
  },
];

const projectResults = [
  {
    title: 'ORION: Meet Your Co-Pilot in Horizon Scanning',
    date: '12.02.2022',
    image: 'https://picsum.photos/id/193/180/180',
    project: {
      name: 'ORION',
      popularity: 253,
      picture: 'https://picsum.photos/id/125/500/500',
    },
    text: 'Paulo Carvalho has been working in the field of futures and foresight for more than 25 years. On one hand, he is a professor in foresight, strategy and innovation at the Faculty of Economics and Management at the University of Lisbon.',
    tags: [
      { name: 'Emerging technologies', popularity: 253 },
      { name: 'EU&RI policy', popularity: 153 },
    ],
    recommendations: {
      number: 3,
      images: [
        'https://picsum.photos/id/192/30/30',
        'https://picsum.photos/id/190/30/30',
        'https://picsum.photos/id/191/30/30',
      ],
    },
  },
  {
    title: 'Project Title',
    date: '12.02.2022',
    image: 'https://picsum.photos/id/201/180/180',
    project: {
      name: 'Project Tag',
      popularity: 253,
      picture: 'https://picsum.photos/id/127/500/500',
    },
    text: 'Project description goes here',
    tags: [
      { name: 'Tag 1', popularity: 253 },
      { name: 'Tag 2', popularity: 153 },
    ],
    recommendations: {
      number: 3,
      images: [
        'https://picsum.photos/id/192/30/30',
        'https://picsum.photos/id/190/30/30',
        'https://picsum.photos/id/191/30/30',
      ],
    },
  },
  {
    title: 'ORION: Meet Your Co-Pilot in Horizon Scanning',
    date: '12.02.2022',
    image: 'https://picsum.photos/id/193/180/180',
    project: {
      name: 'ORION',
      popularity: 253,
      picture: 'https://picsum.photos/id/125/500/500',
    },
    text: 'Paulo Carvalho has been working in the field of futures and foresight for more than 25 years. On one hand, he is a professor in foresight, strategy and innovation at the Faculty of Economics and Management at the University of Lisbon.',
    tags: [
      { name: 'Emerging technologies', popularity: 253 },
      { name: 'EU&RI policy', popularity: 153 },
    ],
    recommendations: {
      number: 3,
      images: [
        'https://picsum.photos/id/192/30/30',
        'https://picsum.photos/id/190/30/30',
        'https://picsum.photos/id/191/30/30',
      ],
    },
  },
  {
    title: 'ORION: Meet Your Co-Pilot in Horizon Scanning',
    date: '12.02.2022',
    image: 'https://picsum.photos/id/193/180/180',
    project: {
      name: 'ORION',
      popularity: 253,
      picture: 'https://picsum.photos/id/125/500/500',
    },
    text: 'Paulo Carvalho has been working in the field of futures and foresight for more than 25 years. On one hand, he is a professor in foresight, strategy and innovation at the Faculty of Economics and Management at the University of Lisbon.',
    tags: [
      { name: 'Emerging technologies', popularity: 253 },
      { name: 'EU&RI policy', popularity: 153 },
    ],
    recommendations: {
      number: 3,
      images: [
        'https://picsum.photos/id/192/30/30',
        'https://picsum.photos/id/190/30/30',
        'https://picsum.photos/id/191/30/30',
      ],
    },
  },
];
const events = [
  {
    role: 'Speaker',
    title: 'ORION: Meet Your Co-Pilot in Horizon Scanning',
    date: '12.02.2022',
    image: 'https://picsum.photos/id/193/180/180',
    project: {
      name: 'ORION',
      popularity: 253,
      picture: 'https://picsum.photos/id/125/500/500',
    },
    text: 'Paulo Carvalho has been working in the field of futures and foresight for more than 25 years. On one hand, he is a professor in foresight, strategy and innovation at the Faculty of Economics and Management at the University of Lisbon.',
    tags: [
      { name: 'Emerging technologies', popularity: 253 },
      { name: 'EU&RI policy', popularity: 153 },
    ],
    recommendations: {
      number: 3,
      images: [
        'https://picsum.photos/id/192/30/30',
        'https://picsum.photos/id/190/30/30',
        'https://picsum.photos/id/191/30/30',
      ],
    },
  },
  {
    role: 'Participant',
    title: 'ORION: Meet Your Co-Pilot in Horizon Scanning',
    date: '12.02.2022',
    image: 'https://picsum.photos/id/193/180/180',
    project: {
      name: 'ORION',
      popularity: 253,
      picture: 'https://picsum.photos/id/125/500/500',
    },
    text: 'Paulo Carvalho has been working in the field of futures and foresight for more than 25 years. On one hand, he is a professor in foresight, strategy and innovation at the Faculty of Economics and Management at the University of Lisbon.',
    tags: [
      { name: 'Emerging technologies', popularity: 253 },
      { name: 'EU&RI policy', popularity: 153 },
    ],
    recommendations: {
      number: 3,
      images: [
        'https://picsum.photos/id/192/30/30',
        'https://picsum.photos/id/190/30/30',
        'https://picsum.photos/id/191/30/30',
      ],
    },
  },
  {
    role: 'Speaker',
    title: 'ORION: Meet Your Co-Pilot in Horizon Scanning',
    date: '12.02.2022',
    image: 'https://picsum.photos/id/193/180/180',
    project: {
      name: 'ORION',
      popularity: 253,
      picture: 'https://picsum.photos/id/125/500/500',
    },
    text: 'Paulo Carvalho has been working in the field of futures and foresight for more than 25 years. On one hand, he is a professor in foresight, strategy and innovation at the Faculty of Economics and Management at the University of Lisbon.',
    tags: [
      { name: 'Emerging technologies', popularity: 253 },
      { name: 'EU&RI policy', popularity: 153 },
    ],
    recommendations: {
      number: 3,
      images: [
        'https://picsum.photos/id/192/30/30',
        'https://picsum.photos/id/190/30/30',
        'https://picsum.photos/id/191/30/30',
      ],
    },
  },
  {
    role: 'Speaker',
    title: 'ORION: Meet Your Co-Pilot in Horizon Scanning',
    date: '12.02.2022',
    image: 'https://picsum.photos/id/193/180/180',
    project: {
      name: 'ORION',
      popularity: 253,
      picture: 'https://picsum.photos/id/125/500/500',
    },
    text: 'Paulo Carvalho has been working in the field of futures and foresight for more than 25 years. On one hand, he is a professor in foresight, strategy and innovation at the Faculty of Economics and Management at the University of Lisbon.',
    tags: [
      { name: 'Emerging technologies', popularity: 253 },
      { name: 'EU&RI policy', popularity: 153 },
    ],
    recommendations: {
      number: 3,
      images: [
        'https://picsum.photos/id/192/30/30',
        'https://picsum.photos/id/190/30/30',
        'https://picsum.photos/id/191/30/30',
      ],
    },
  },
  {
    role: 'Speaker',
    title: 'ORION: Meet Your Co-Pilot in Horizon Scanning',
    date: '12.02.2022',
    image: 'https://picsum.photos/id/193/180/180',
    project: {
      name: 'ORION',
      popularity: 253,
      picture: 'https://picsum.photos/id/125/500/500',
    },
    text: 'Paulo Carvalho has been working in the field of futures and foresight for more than 25 years. On one hand, he is a professor in foresight, strategy and innovation at the Faculty of Economics and Management at the University of Lisbon.',
    tags: [
      { name: 'Emerging technologies', popularity: 253 },
      { name: 'EU&RI policy', popularity: 153 },
    ],
    recommendations: {
      number: 3,
      images: [
        'https://picsum.photos/id/192/30/30',
        'https://picsum.photos/id/190/30/30',
        'https://picsum.photos/id/191/30/30',
      ],
    },
  },
];

export {
  posts,
  projectResults,
  events,
  mockPost,
  mockPerson,
  mockOrganisation,
  mockProject,
};
