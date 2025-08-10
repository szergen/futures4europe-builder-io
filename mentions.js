const tagsSample = [
  {
    name: 'Michel Hery',
    _id: '5f7b0ee4-51f9-48e4-a46b-aec84039e384',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-30T16:36:25.460Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T16:36:25.460Z',
    },
    tagType: 'person',
  },
  {
    name: 'Lena Tsipouri',
    _id: '76c20084-2109-4007-b7ec-c19ba2bb4325',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-30T16:24:53.778Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T16:24:53.778Z',
    },
    tagType: 'person',
  },
  {
    name: 'Anna Gerbrandy',
    _id: 'd25cd16c-041f-4de0-bb8d-42e72d23aa56',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-30T16:24:14.789Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T16:24:14.789Z',
    },
    tagType: 'person',
  },
  {
    name: 'Daniele Archibugi',
    _id: '15251d63-0cf6-4e05-be9d-712221890838',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-30T16:23:13.335Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T16:23:13.335Z',
    },
    tagType: 'person',
  },
  {
    name: 'European R&I foresight and public engagement for Horizon Europe',
    _id: 'e65dc072-d2a2-4e4e-86e5-d8cd198ac8fc',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-30T15:58:05.133Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T16:13:08.903Z',
    },
    tagType: 'project',
    tagPageLink:
      '/project/european-ri-foresight-and-public-engagement-for-horizon-europe-bveiy',
  },
  {
    name: 'DGPDN',
    _id: '16187b18-bc41-46df-90f2-89b82e859937',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T15:29:29.005Z',
    },
    tagLine: 'Direção-Geral de Política de Defesa Nacional',
    _updatedDate: {
      $date: '2024-10-30T15:29:29.005Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'PlanAPP',
    _id: '33183905-387a-4f37-b7ce-f6ab2015fa0f',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T15:28:40.980Z',
    },
    tagLine:
      'Centro de Competências de Planeamento, de Políticas e de Prospetiva da Administração Pública',
    _updatedDate: {
      $date: '2024-10-30T15:28:40.980Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'MEGATRENDS 2050. THE CHANGING WORLD',
    _id: 'd3af95a2-30c9-4e1f-ab4d-3c5391af4f1b',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T15:23:09.494Z',
    },
    tagLine: 'Impacts in Portugal',
    _updatedDate: {
      $date: '2024-10-30T15:32:12.377Z',
    },
    picture:
      'https://static.wixstatic.com/media/471908_67dc73aedd1d4508b496e37ee8d5e57d~mv2.png',
    tagType: 'project',
    tagPageLink: '/project/megatrends-2050-the-changing-world-jc5sk',
  },
  {
    name: 'Mobility',
    _id: 'b343c328-93ce-4072-b852-979354883db8',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T15:19:57.147Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T15:19:57.147Z',
    },
    tagType: 'domain',
  },
  {
    name: 'Agri-food',
    _id: '0b4ebe18-ea9c-426c-970b-00f3b67a1334',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T15:19:41.796Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T15:19:41.796Z',
    },
    tagType: 'domain',
  },
  {
    name: 'Peter Larsen Kaffe',
    _id: '5e3c021a-8f0e-4ff6-bea7-4b374cdd4446',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T15:18:14.020Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T15:18:14.020Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'Michelin',
    _id: '1dce5504-5bcc-4643-8da3-1bd001177a2f',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T15:18:04.638Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T15:18:04.638Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'La Muu',
    _id: '12d9a2f9-046c-437f-862a-08dfc02ca28d',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T15:17:38.587Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T15:17:38.587Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'North Estonia Medical Centre',
    _id: '30a45453-f2b9-4498-8b7d-e91a3ec31d05',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T15:17:26.953Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T15:17:26.953Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'COMODULE',
    _id: 'f870937d-fc3f-4c7e-93f9-2a43df925230',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T15:17:11.904Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T15:17:11.904Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'Help Alliance',
    _id: '7eca8476-4b92-4aed-8785-19e21b345c2d',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T15:17:05.203Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T15:17:05.203Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'Nordic Foodtech',
    _id: '4840dc8b-4a3c-426a-8f32-d7c45ed5e603',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T15:16:56.041Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T15:16:56.041Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'MIDT',
    _id: 'e1e8b138-3873-471c-b8fa-d9595bc6446e',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T15:16:41.770Z',
    },
    tagLine: 'Region Midtjylland',
    _updatedDate: {
      $date: '2024-10-30T15:16:41.770Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'AIRBUS',
    _id: '20a23700-462e-466c-b802-d6d801a00e6e',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T15:16:22.907Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T15:16:22.907Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'TAL TECH',
    _id: '552be7da-8367-4d8b-8915-5b66e56687f1',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T15:16:11.904Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T15:16:11.904Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'EDHEC',
    _id: 'eea4c623-07c5-43ab-9c2e-011ebe354c8f',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T15:15:34.644Z',
    },
    tagLine: 'Business School',
    _updatedDate: {
      $date: '2024-10-30T15:15:34.644Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'Estonian Design Centre',
    _id: '04c5f705-a600-4a8c-9d29-2cb1eecfe4b2',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T15:15:19.442Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T15:15:19.442Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'Finland Futures Research Centre',
    _id: '4a24fbff-eab7-4ad8-b686-dbc8bfd0a495',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T15:14:58.367Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T15:14:58.367Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'Media University of Applied Sciences',
    _id: '026faf88-9bdc-47d8-9b81-3e4a7358c4bb',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T15:14:38.286Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T15:14:38.286Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'IZT',
    _id: '25d719d5-e1dc-447c-a162-db43b3f00bcc',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T15:13:41.597Z',
    },
    tagLine: 'Institute for Future Studies and Technology Assessment',
    _updatedDate: {
      $date: '2024-10-30T15:13:41.597Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'GEA College',
    _id: 'b8f5593f-cce9-416d-8219-e9ee55e3c6b0',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T15:13:11.876Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T15:13:11.876Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'ISPIM',
    _id: '5f459c96-4fb9-40e1-aa9d-0553ad7e997d',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T15:12:00.351Z',
    },
    tagLine: 'Connecting Innovation Professionals',
    _updatedDate: {
      $date: '2024-10-30T15:12:00.351Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'Designskolen Kolding',
    _id: '7147d72d-6982-460f-ad1d-0ba8b140b06e',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T15:11:05.714Z',
    },
    tagLine: 'Kolding School of Design',
    _updatedDate: {
      $date: '2024-10-30T15:11:05.714Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'Strategic Foresight for Sustainability',
    _id: '95c3bf6f-db55-41c2-80a7-f5ab9bbc38f3',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T15:05:55.234Z',
    },
    tagLine: 'SF4S',
    _updatedDate: {
      $date: '2024-10-30T15:14:21.102Z',
    },
    picture:
      'https://static.wixstatic.com/media/471908_4833db7f5f0b44dbaaf9f4e697aa2cfc~mv2.webp',
    tagType: 'project',
    tagPageLink: '/project/strategic-foresight-for-sustainability-m6jz8',
  },
  {
    name: 'Association for the Development of the Guadajoz and East Countryside of Córdoba',
    _id: '0b17e302-192e-4973-b0b1-9c0dd309d60c',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T15:04:27.382Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T15:04:27.382Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'KRITI',
    _id: '31c294c7-c0d1-4503-b7da-ae396f7a84bf',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T15:03:20.754Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T15:03:20.754Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'EGE University',
    _id: '66e071f7-2e1f-4cb2-907c-963dcc0cb80c',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T15:03:11.413Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T15:03:11.413Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'CNVP',
    _id: 'e78322c6-6382-4da9-bcc8-494c439d7980',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T15:02:36.290Z',
    },
    tagLine: 'Stichting Connecting Natural Values and People Foundation',
    _updatedDate: {
      $date: '2024-10-30T15:02:36.290Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'AREPO',
    _id: '4e92da64-9580-49e2-a3c7-27ecc5bda983',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T15:01:45.660Z',
    },
    tagLine: 'Association of European Regions for Products of Origin',
    _updatedDate: {
      $date: '2024-10-30T15:01:45.660Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'MENAGROUP',
    _id: '6e6a1598-5d2c-4294-92b5-71e42379ee77',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T15:01:17.302Z',
    },
    tagLine: 'Consultancy, Training & Translation',
    _updatedDate: {
      $date: '2024-10-30T15:01:17.302Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'Val de Drôme en Biovallée',
    _id: '7b248529-96b7-442b-b07a-6e4fefa0c837',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T15:00:40.173Z',
    },
    tagLine: 'Communauté de communes du Val de Drôme en Biovallée',
    _updatedDate: {
      $date: '2024-10-30T15:00:40.173Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'Origin for Sustainability',
    _id: '86f7cc23-e789-4cb4-a7f0-8a207a8e1571',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T14:54:25.044Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T14:54:25.044Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'University of Crete',
    _id: 'c30374a7-4906-4aeb-ad96-1d08cbf72c98',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T14:53:49.718Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T14:53:49.718Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'IFZ',
    _id: '3b00e3c7-b048-40bd-8841-4db86fec287a',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T14:53:35.005Z',
    },
    tagLine: 'Interdisciplinary Research Centre Austria',
    _updatedDate: {
      $date: '2024-10-30T14:53:35.005Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'AEIDL',
    _id: '00503fe2-8cfd-4b24-94a3-57bca230b651',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T14:52:24.432Z',
    },
    tagLine: 'European Association for Information on Local Development',
    _updatedDate: {
      $date: '2024-10-30T14:52:24.432Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'The James Hutton Institute',
    _id: '92fa4706-467e-4370-b1d2-4e8dfcc4bf86',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T14:51:54.809Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T14:51:54.809Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'Universidade de Evora',
    _id: 'cf34c0da-8e26-426d-af5a-11a848b3af3e',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T14:51:32.833Z',
    },
    tagLine: 'University of Evora',
    _updatedDate: {
      $date: '2024-10-30T14:51:32.833Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'HCC',
    _id: '1f2a6336-8199-4571-a598-f2b801ba5002',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T14:51:04.419Z',
    },
    tagLine: 'Highclere Consulting',
    _updatedDate: {
      $date: '2024-10-30T14:51:04.419Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'CZU',
    _id: 'ea02ef27-2c17-4d02-8e7d-c20dda9f0ec4',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T14:50:27.764Z',
    },
    tagLine: 'Czech University of Life Sciences Prague',
    _updatedDate: {
      $date: '2024-10-30T14:50:27.764Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'ZHAW',
    _id: '8117353f-eded-42d2-9170-156b89dcacb4',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T14:49:29.590Z',
    },
    tagLine: 'Zurich University of Applied Sciences',
    _updatedDate: {
      $date: '2024-10-30T14:49:29.590Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'University of Pisa',
    _id: '8a0205ef-82bc-4041-83e7-e515a55040ae',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T14:49:01.630Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T14:49:01.630Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'University of Córdoba',
    _id: '5ede7448-a1de-4800-9385-8e3f57445416',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T14:48:40.746Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T14:48:40.746Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'Rural areas',
    _id: '9f91d9c6-a706-4f99-9c23-fd725d1d39d1',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T14:47:43.512Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T14:47:43.512Z',
    },
    tagType: 'domain',
  },
  {
    name: 'Participatory multi-level foresight',
    _id: '6f371990-ffe7-4ded-8d1e-9e975d6df857',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T14:47:17.518Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T14:47:17.518Z',
    },
    tagType: 'foresight method',
  },
  {
    name: 'MOVING',
    _id: '281aa217-2e67-4ed9-b69f-45ddcbe9d130',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T14:45:42.852Z',
    },
    tagLine:
      'Mountain Valorization through Interconnectedness and Green Growth',
    _updatedDate: {
      $date: '2024-10-30T14:56:43.223Z',
    },
    picture:
      'https://static.wixstatic.com/media/471908_de03f4e18ad84986b02a82ef571864d2~mv2.webp',
    tagType: 'project',
    tagPageLink: '/project/moving-cwtyt',
  },
  {
    name: 'EIMO',
    _id: '1aadf5ad-788e-4fce-a2c5-23fe061a846e',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T14:42:54.739Z',
    },
    tagLine: 'Eurasian Institute of International Affairs',
    _updatedDate: {
      $date: '2024-10-30T14:42:54.739Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'EMEA',
    _id: '543e59fd-3946-4c08-bbf9-73f6c4b818d9',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T14:42:34.724Z',
    },
    tagLine: 'Euro Mediterranean Economists Association',
    _updatedDate: {
      $date: '2024-10-30T14:42:34.724Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'ESIDG',
    _id: 'a48cc720-bf78-424b-9222-7a0032297362',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T14:42:16.029Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T14:42:16.029Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'POLIMI',
    _id: 'd842a8a5-e90e-44fa-b8dc-8fe668cf57a9',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T14:41:56.930Z',
    },
    tagLine: 'Politecnico Milano',
    _updatedDate: {
      $date: '2024-10-30T14:41:56.930Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'TUM',
    _id: '9c5dfb57-17f2-4b76-b94f-e6937b8ca019',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T14:41:39.206Z',
    },
    tagLine: 'Technical University of Munich',
    _updatedDate: {
      $date: '2024-10-30T14:41:39.206Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'FUB',
    _id: '3762e27e-fa92-4490-a5bf-de61292c9a99',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T14:41:11.065Z',
    },
    tagLine: 'Freie Universität Berlin',
    _updatedDate: {
      $date: '2024-10-30T14:41:11.065Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'EUI',
    _id: '9be579e9-e60b-4ec9-8cde-9251ccc954da',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T14:40:48.165Z',
    },
    tagLine: 'European University Innitiative',
    _updatedDate: {
      $date: '2024-10-30T14:40:48.165Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'EPFL',
    _id: 'edfa02b4-97dd-49e4-a2da-94582821bd91',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T14:40:10.854Z',
    },
    tagLine: 'Swiss Institute of Technology in Lausanne',
    _updatedDate: {
      $date: '2024-10-30T14:40:10.854Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'ETLA',
    _id: '5ff85ccd-8cd2-47b6-9fbc-7616d80f5b42',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T14:39:32.034Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T14:39:32.034Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'SPI',
    _id: '959a75fe-432d-4372-8e1a-63d7f94fe274',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T14:39:13.628Z',
    },
    tagLine: 'Sociedade Portuguesa de Inovacao',
    _updatedDate: {
      $date: '2024-10-30T14:39:13.628Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'CEPS',
    _id: 'a48d4010-fad4-4c72-9f1d-22eba3e04e7b',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T14:38:30.233Z',
    },
    tagLine: 'Centre for European Policy Studies',
    _updatedDate: {
      $date: '2024-10-30T14:38:30.233Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'Global Governance',
    _id: '80af88dc-8fa2-4af9-a7e3-d35a4b3c9e58',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T14:32:33.828Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T14:32:33.828Z',
    },
    tagType: 'domain',
  },
  {
    name: 'TRIGGER',
    _id: '7784ef42-80d2-42a4-ba73-594ec319437e',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T14:31:42.671Z',
    },
    tagLine: "Trends in Global Governance and Europe's Role",
    _updatedDate: {
      $date: '2024-10-30T14:43:02.485Z',
    },
    picture:
      'https://static.wixstatic.com/media/471908_f6a0b22e12534f4aa843edb6b25304ce~mv2.png',
    tagType: 'project',
    tagPageLink: '/project/trigger-ccark',
  },
  {
    name: 'Global',
    _id: '1c0130dd-ea02-4659-a0f8-b9336c5cd3b2',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T14:29:53.204Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T14:29:53.204Z',
    },
    tagType: 'country',
  },
  {
    name: 'Earth4All',
    _id: 'aa505536-7d87-421a-8f78-8fd3079f65e1',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T14:26:52.689Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T14:30:00.836Z',
    },
    picture:
      'https://static.wixstatic.com/media/471908_976f998447554c16bc2e5180815be61d~mv2.webp',
    tagType: 'project',
    tagPageLink: '/project/earth4all-t4zky',
  },
  {
    name: 'Technology',
    _id: '368ca20a-2c71-4b52-887c-eb44b0782b61',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T14:20:05.324Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T14:20:05.324Z',
    },
    tagType: 'domain',
  },
  {
    name: 'Ars Electronica',
    _id: 'b1da9583-5677-42c5-8f20-43227ff358bd',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T14:19:43.798Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T14:19:43.798Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'STARTS EC(H)O',
    _id: '7ccff8ee-56d1-4e59-bbf8-fad4f01d2122',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T14:17:17.281Z',
    },
    tagLine:
      'Fostering ECOlogically conscious and Human compatible digital technology ',
    _updatedDate: {
      $date: '2024-10-30T14:17:17.281Z',
    },
    tagType: 'project',
  },
  {
    name: 'S+T+Arts',
    _id: 'e36c3384-0ec4-4ee4-9eb8-2cbaeef6b8d8',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T14:11:27.757Z',
    },
    tagLine: 'Science, Technology and Arts ',
    _updatedDate: {
      $date: '2024-10-30T14:24:16.450Z',
    },
    picture:
      'https://static.wixstatic.com/media/471908_f7db5aca5a5a40dcb9c208b945d93040~mv2.png',
    tagType: 'project',
    tagPageLink: '/project/starts-5mq0p',
  },
  {
    name: 'AgriFood Lithuania',
    _id: '494e118e-4add-44de-af2e-ecc0705f0060',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T14:07:03.851Z',
    },
    tagLine: 'The Future of Smart Agriculture is Now',
    _updatedDate: {
      $date: '2024-10-30T14:07:03.851Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'CTIFL',
    _id: 'b818e33d-d122-42b9-aff1-88e224dc55db',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T14:05:46.047Z',
    },
    tagLine: 'Interprofessional Technical Center for Fruits and Vegetables',
    _updatedDate: {
      $date: '2024-10-30T14:05:46.047Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'INTIA',
    _id: '0a0f2106-3ac9-4bb2-a210-ba993219cec5',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T14:04:49.302Z',
    },
    tagLine:
      'Instituto Navarro de Tecnologías e Infraestructuras Agroalimentarias',
    _updatedDate: {
      $date: '2024-10-30T14:04:49.302Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'ILVO Vlaanderen',
    _id: '586d63ad-2442-4fb9-ad8d-ecc2dbd1cfc0',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T14:03:19.813Z',
    },
    tagLine: 'Institute for Agriculture, Fisheries and Food Research',
    _updatedDate: {
      $date: '2024-10-30T14:03:19.813Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'SIMBIOTICA',
    _id: '48da22a2-deac-4894-97c4-fd47f97d0111',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T14:02:28.901Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T14:02:28.901Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'Future Impacts',
    _id: 'e41aace0-fbd1-497a-b0ae-ebce07475b59',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T14:02:10.758Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T14:02:10.758Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'LE Europe',
    _id: '7b5f65ac-92d0-4b4b-9533-257531c479d5',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T14:01:53.060Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T14:01:53.060Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'FOODSCALE HUB GREECE',
    _id: '6699ee61-f457-4145-bbca-45beb49a0a7b',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T14:01:13.046Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T14:01:13.046Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'GEOPONIKO PANEPISTIMION ATHINON',
    _id: '9ddaae5c-ee55-4e8a-9f8f-f83e0d8d0d7d',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T14:00:36.298Z',
    },
    tagLine: 'Agricultural University of Athens',
    _updatedDate: {
      $date: '2024-10-30T14:00:36.298Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'EVENFLOW',
    _id: 'f765435b-872e-497f-be7b-baca301c8d5a',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T13:59:18.713Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T13:59:18.713Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'Wageningen University & Research',
    _id: 'c20d7ac3-3cf5-4bd2-aaad-f338e10bb7f7',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T13:58:59.315Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T13:58:59.315Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'Digital Technologies',
    _id: '07e9b036-3282-484e-add9-8084663c060f',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T13:57:42.543Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T13:57:42.543Z',
    },
    tagType: 'domain',
  },
  {
    name: 'Forestry',
    _id: 'e2c7f170-5ed8-4d20-beae-c9806ab21b2d',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T13:57:01.225Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T13:57:01.225Z',
    },
    tagType: 'domain',
  },
  {
    name: '4Growth project',
    _id: '4267c0a9-4d16-4274-8696-c32929aff7d0',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T13:54:21.666Z',
    },
    tagLine: 'Understanding the Market to Forecast Future Growth',
    _updatedDate: {
      $date: '2024-10-30T14:07:55.629Z',
    },
    picture:
      'https://static.wixstatic.com/media/471908_61f83fe4a68c4dd78d4822b8d3f73ce4~mv2.png',
    tagType: 'project',
    tagPageLink: '/project/4growth-project-agirf',
  },
  {
    name: 'ICROFS',
    _id: 'a7218e54-b87a-4e66-b9a3-37c7d97dc5dd',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T13:40:52.320Z',
    },
    tagLine: 'International Centre for Research in Organic Food Systems',
    _updatedDate: {
      $date: '2024-10-30T13:40:52.320Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'LK Österreich',
    _id: 'b5eaf364-404d-4bdf-b081-82b846aa86fc',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T13:39:49.768Z',
    },
    tagLine: 'Landwirtschaftskammer Österreich',
    _updatedDate: {
      $date: '2024-10-30T13:39:49.768Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'IDDRI',
    _id: 'ca83a34b-de93-4935-b5a5-41d2624cd1c3',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T13:37:29.451Z',
    },
    tagLine: 'Sustainable Development & International Relations',
    _updatedDate: {
      $date: '2024-10-30T13:37:29.451Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'THUNEN',
    _id: 'fda015b2-f404-4489-a9cc-4d1cf32881c0',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T13:36:36.440Z',
    },
    tagLine: 'Thünen Institute',
    _updatedDate: {
      $date: '2024-10-30T13:36:36.440Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'Innovation Centre for Organic Farming',
    _id: '9a7a7fd4-4fe9-4849-a51d-1eff8503851d',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T13:32:43.261Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T13:32:43.261Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'CIHEAM BARI',
    _id: '85088151-2ff1-418f-8466-3f74433c2d07',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T13:31:49.559Z',
    },
    tagLine: 'Mediterranean Agronomic Institute of Bari',
    _updatedDate: {
      $date: '2024-10-30T13:31:49.559Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'OMKi',
    _id: '3c45ac67-57ab-4be4-9bfb-9f601d229035',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T13:30:37.844Z',
    },
    tagLine: 'Ecological Agricultural Research Institute',
    _updatedDate: {
      $date: '2024-10-30T13:30:37.844Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'ITAB',
    _id: '01102bed-c374-4b97-9e45-f856d5ce62dd',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T13:28:46.405Z',
    },
    tagLine: "Institut Technique de l'Agriculture Biologique",
    _updatedDate: {
      $date: '2024-10-30T13:28:46.405Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'FIBL',
    _id: 'c5dd9a9d-1714-405a-94d4-ffa6242a29b3',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T13:23:48.138Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T13:23:48.138Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'IFOAM Organics Europe',
    _id: '7b9ca0e9-07c9-466c-b601-d7cbfd84b2ae',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T13:21:45.754Z',
    },
    tagLine: 'Making Europe More Organic',
    _updatedDate: {
      $date: '2024-10-30T13:21:45.754Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'OrganicTargets4EU',
    _id: '27571e99-eaed-48f4-b700-10363e95aba2',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-30T13:05:25.271Z',
    },
    tagLine:
      'Transformation scenarios for boosting organic farming and aquaculture towards the Farm-to-fork targets',
    _updatedDate: {
      $date: '2024-10-30T13:25:40.426Z',
    },
    picture:
      'https://static.wixstatic.com/shapes/471908_595eda1ad2ae42c8bbc366903202775d.svg',
    tagType: 'project',
    tagPageLink: '/project/organictargets4eu-0ai6d',
  },
  {
    name: 'Engineering',
    _id: '6f5e327f-0f1e-4995-8932-f941bfeaa520',
    _owner: '41128e88-b88d-4244-96c8-af3a68b16ac3',
    _createdDate: {
      $date: '2024-10-30T11:31:19.531Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T11:31:19.531Z',
    },
    tagType: 'domain',
  },
  {
    name: 'Electronics',
    _id: '0fe6fdd7-847e-47f1-babf-0e674d7fb5e7',
    _owner: '41128e88-b88d-4244-96c8-af3a68b16ac3',
    _createdDate: {
      $date: '2024-10-30T11:30:45.757Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T11:30:45.757Z',
    },
    tagType: 'domain',
  },
  {
    name: 'Quantum Technologies',
    _id: '0b24717d-0d3a-4e74-94cd-138356cd50b9',
    _owner: '41128e88-b88d-4244-96c8-af3a68b16ac3',
    _createdDate: {
      $date: '2024-10-30T11:30:13.302Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T11:30:13.302Z',
    },
    tagType: 'domain',
  },
  {
    name: 'Space',
    _id: '9e022f69-5983-42e3-8646-a3c3f8696374',
    _owner: '41128e88-b88d-4244-96c8-af3a68b16ac3',
    _createdDate: {
      $date: '2024-10-30T11:29:48.223Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T11:29:48.223Z',
    },
    tagType: 'domain',
  },
  {
    name: 'Technology Roadmapping',
    _id: 'f8964bce-35ee-4ee6-89f0-6e4dd3a290d8',
    _owner: '41128e88-b88d-4244-96c8-af3a68b16ac3',
    _createdDate: {
      $date: '2024-10-30T11:28:30.993Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T11:28:30.993Z',
    },
    tagType: 'foresight method',
  },
  {
    name: 'Forecasting',
    _id: '5347877d-db51-45ad-8d2e-5d11f9a5f7c5',
    _owner: '41128e88-b88d-4244-96c8-af3a68b16ac3',
    _createdDate: {
      $date: '2024-10-30T11:28:09.165Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T11:28:09.165Z',
    },
    tagType: 'foresight method',
  },
  {
    name: 'Elahe Rajabiani',
    _id: 'e4fc8353-3ded-4d5b-95ca-6b4594f66100',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-30T10:55:14.670Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T10:55:14.670Z',
    },
    tagType: 'person',
  },
  {
    name: 'Aaron Rosa',
    _id: '3dab2841-4c4b-4d32-b4bf-308663e77bfb',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-30T10:54:01.231Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T10:54:01.231Z',
    },
    tagType: 'person',
  },
  {
    name: 'Liviu Andreescu',
    _id: '8ef442ba-d492-4cc3-b297-3f43d489785e',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-29T15:58:29.908Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-29T15:58:29.908Z',
    },
    tagType: 'person',
  },
  {
    name: 'Dynamic Argumentative Delphi',
    _id: '33bb4d88-50ec-475e-942e-482465054484',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-29T15:39:48.622Z',
    },
    tagLine: 'DAD',
    _updatedDate: {
      $date: '2024-10-29T15:39:48.622Z',
    },
    tagType: 'foresight method',
  },
  {
    name: 'Rosa Beckmann',
    _id: '570b5ac9-e495-4cfb-a307-6310287ffe59',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-29T08:58:30.253Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-29T08:58:30.253Z',
    },
    tagType: 'person',
  },
  {
    name: 'Jennifer Harper',
    _id: 'b7ee604b-d93b-4b43-b729-e7b5941aa62e',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-28T20:51:00.597Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-28T20:51:00.597Z',
    },
    tagType: 'person',
  },
  {
    name: 'Keith Smith',
    _id: '1b6a0fe8-cc3c-4810-9240-462b84dabcc2',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-28T20:50:41.504Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-28T20:50:41.504Z',
    },
    tagType: 'person',
  },
  {
    name: 'Cristiano Cagnin',
    _id: 'c6f7c013-7147-4930-8836-b2fdd7057295',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-28T20:49:54.624Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-28T20:49:54.624Z',
    },
    tagType: 'person',
  },
  {
    name: ' Luk Van Langenhove',
    _id: 'b541e1c7-be5d-4e7b-970a-671db3f7feb8',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-28T20:48:09.583Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-28T20:48:09.583Z',
    },
    tagType: 'person',
  },
  {
    name: 'DG RTD',
    _id: '7be555b9-5274-4e4f-b733-64969fdf8781',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-28T20:39:19.424Z',
    },
    tagLine:
      'Directorate-General for Research and Innovation of the European Commission',
    _updatedDate: {
      $date: '2024-10-28T20:39:19.424Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'CNIO ',
    _id: 'd84a7d7b-d29e-43b0-b9a7-6be3da35c2fa',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-28T20:34:24.769Z',
    },
    tagLine: 'Centro Nacional de Investigaciones Oncológicas',
    _updatedDate: {
      $date: '2024-10-28T20:34:24.769Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'Tallinn University of Technology',
    _id: 'd5c3438a-85b3-4436-be39-797a59676a77',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-28T20:32:48.370Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-28T20:32:48.370Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'Starlab Barcelona ',
    _id: '9c0e1b5e-8710-498a-b249-9a9fda046c47',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-28T20:32:34.984Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-28T20:32:34.984Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'Maria Blasco',
    _id: 'f8401cdc-4ad6-44d3-acef-79f452140deb',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-28T20:31:57.299Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-28T20:31:57.299Z',
    },
    tagType: 'person',
  },
  {
    name: 'Nils Heyen',
    _id: 'f76c2a11-ac56-486b-9c99-91664e04150e',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-28T20:31:43.341Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-28T20:31:43.341Z',
    },
    tagType: 'person',
  },
  {
    name: 'Maarja Kruusmaa',
    _id: 'c64fa7c9-846b-4f3e-a12b-63e3e047728e',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-28T20:31:27.333Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-28T20:31:27.333Z',
    },
    tagType: 'person',
  },
  {
    name: 'HERA',
    _id: '4aa3fb83-c1ff-4368-8f7f-fb231687623c',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-28T12:47:03.986Z',
    },
    tagLine: 'Health Emergency Preparedness and Response Authority',
    _updatedDate: {
      $date: '2024-10-28T12:47:03.986Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'ESPAS',
    _id: '25f6994f-107f-4970-a67b-65e1abc8b9e2',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-28T12:30:48.423Z',
    },
    tagLine: 'European Strategy and Policy Analysis System',
    _updatedDate: {
      $date: '2024-10-28T12:30:48.423Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'Food security',
    _id: 'a47f65f7-75e0-4a54-811f-9d5f40aabf8c',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-28T12:20:14.483Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-28T12:20:14.483Z',
    },
    tagType: 'domain',
  },
  {
    name: 'DG AGRI',
    _id: '30d2e0c4-1170-47e1-9088-7ff680612f94',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-28T12:19:17.635Z',
    },
    tagLine: 'DG for Agriculture and Rural Development',
    _updatedDate: {
      $date: '2024-10-28T12:19:17.635Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'Yulia Barabanova',
    _id: '314468ca-87a4-41bb-8008-90636a7f9a38',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-28T12:15:56.740Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-28T12:15:56.740Z',
    },
    tagType: 'person',
  },
  {
    name: 'AGRI',
    _id: 'eae686c0-caf7-491b-84dc-95e0cb05da43',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-28T11:17:19.117Z',
    },
    tagLine: 'Department for Agriculture and Rural Development',
    _updatedDate: {
      $date: '2024-10-28T11:17:19.117Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'Casual Layered Analysis',
    _id: '9ca11f1d-3d93-4275-8367-78608183ac74',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-28T11:15:04.559Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-28T11:15:04.559Z',
    },
    tagType: 'foresight method',
  },
  {
    name: 'Imoh Ilevbare',
    _id: 'b8d4aa18-f543-46af-a76a-28418f672465',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-28T10:26:56.758Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-28T10:26:56.758Z',
    },
    tagType: 'person',
  },
  {
    name: 'Per Dannemand Andersen',
    _id: '3a95d592-1766-496b-a558-3be8e09efd4e',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-28T10:26:13.428Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-28T10:26:13.428Z',
    },
    tagType: 'person',
  },
  {
    name: 'Alexandre Polvora',
    _id: 'dcb9c12b-d1ad-4b4d-88be-86151a52cefa',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-28T10:09:08.316Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-28T10:09:08.316Z',
    },
    tagType: 'person',
  },
  {
    name: 'Innovation and Growth',
    _id: 'e6beac1a-4187-4c7b-8cf1-53d374ef34a1',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-28T10:03:44.969Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-28T10:03:44.969Z',
    },
    tagType: 'domain',
  },
  {
    name: 'RWTH Aachen University',
    _id: '55be1cf9-6552-4930-8a39-a99d6b778593',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-28T09:19:12.879Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-28T09:19:12.879Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'The Responsible Research and Innovation Living Lab',
    _id: '3d05b33e-4c1a-44ca-aa67-522f7cf5cda8',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-28T09:06:30.057Z',
    },
    tagLine:
      'The Prospects of Institutionalizing the Values of Openness and Mutual Responsiveness in Science and Democracy',
    _updatedDate: {
      $date: '2024-10-28T09:34:42.701Z',
    },
    tagType: 'project',
    tagPageLink:
      '/project/the-responsible-research-and-innovation-living-lab-ue9by',
  },
  {
    name: 'Gesellschaft für Internationale Zusammenarbeit (GIZ) GmbH',
    _id: '86b66cd2-da21-496d-9d60-f0ff931cf43c',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-28T08:56:38.980Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-28T08:56:38.980Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'Tunisia',
    _id: 'a27bd3e5-2a2c-4aa4-a44c-0c0a688a03cd',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-28T08:49:50.218Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-28T08:49:50.218Z',
    },
    tagType: 'country',
  },
  {
    name: 'Smart Futures Tunisia',
    _id: '4a893880-17ae-4ebd-a511-32181487f2e1',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-28T08:44:18.871Z',
    },
    tagLine:
      'Exploring the digital skills of tomorrow (a foresight journey into the year 2035)',
    _updatedDate: {
      $date: '2024-10-28T08:47:52.348Z',
    },
    tagType: 'project',
    tagPageLink: '/project/smart-futures-tunisia-chsrs',
  },
  {
    name: 'i-Portunus Houses',
    _id: 'e3b24e71-f732-4db8-a79d-9c0b048542b7',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-28T08:31:34.950Z',
    },
    tagLine:
      'Kick-Start a Local Mobility Host Network for Artists & Cultural Professionals in AllCreative Europe Countries',
    _updatedDate: {
      $date: '2024-10-28T08:40:00.886Z',
    },
    picture:
      'https://static.wixstatic.com/media/471908_b6fb3c86ab9a44cb9f91cf88ec5fc63f~mv2.jpeg',
    tagType: 'project',
    tagPageLink: '/project/i-portunus-houses-h3g35',
  },
  {
    name: 'FEDORA',
    _id: '87c2e80d-69bc-42ed-9013-e756d3fe3f8c',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-28T08:17:50.606Z',
    },
    tagLine:
      'Responsibility and Engagement in the society of acceleration and uncertainty. ',
    _updatedDate: {
      $date: '2024-10-28T08:26:38.101Z',
    },
    picture:
      'https://static.wixstatic.com/shapes/471908_e3623cb23cb446468bc80dbe9224cc9c.svg',
    tagType: 'project',
    tagPageLink: '/project/fedora-jyedo',
  },
  {
    name: 'European urban mobility 2050: A horizon scanning project',
    _id: 'b6273354-68b5-43d2-b5b4-7b0db7701abb',
    _owner: 'e586b886-7d9c-42d0-b744-f73146a3862f',
    _createdDate: {
      $date: '2024-10-26T22:32:07.209Z',
    },
    tagLine: 'Sustainable transport – new urban mobility framework',
    _updatedDate: {
      $date: '2024-10-26T22:40:14.332Z',
    },
    picture:
      'https://static.wixstatic.com/media/471908_b6747b16c75e4883899afbda1d88e6ee~mv2.png',
    tagType: 'project',
    tagPageLink:
      '/project/european-urban-mobility-2050-a-horizon-scanning-project-w7hlg',
  },
  {
    name: 'EUARENAS',
    _id: '2e0a5e35-c3b4-41ab-ae70-9dc825ca4c1b',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-26T15:19:24.621Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-26T15:20:30.692Z',
    },
    picture:
      'https://static.wixstatic.com/media/471908_45ea460116064905b3063bd7a3b409e8~mv2.webp',
    tagType: 'project',
    tagPageLink: '/project/euarenas-vi8id',
  },
  {
    name: 'Foresight for Social Innovation',
    _id: '95a8911e-ed76-4699-9955-637d8514ca1f',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-26T15:07:43.870Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-26T15:09:47.426Z',
    },
    tagType: 'project',
    tagPageLink: '/project/foresight-for-social-innovation-4ncy0',
  },
  {
    name: 'Experts Consultation',
    _id: '592aecc5-c20f-49b7-b524-dddefa4ad04c',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-26T13:01:41.338Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-26T13:01:41.338Z',
    },
    tagType: 'foresight method',
  },
  {
    name: 'Expert Consultations',
    _id: '619268f4-d17b-44d3-83c5-25269c71831b',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-26T13:00:32.237Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-26T13:00:32.237Z',
    },
    tagType: 'foresight method',
  },
  {
    name: 'Actualization of Czech republic 2030 strategy',
    _id: 'c04a682a-4162-4c01-8ad0-10ed5ece8fe5',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-26T12:55:54.930Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-26T12:57:19.812Z',
    },
    tagType: 'project',
    tagPageLink: '/project/actualization-of-czech-republic-2030-strategy-63e2g',
  },
  {
    name: '123455',
    _id: '9cd0268a-4ad9-453b-9609-569bf12addc8',
    _owner: 'e13d3737-1a40-45be-85c9-7aa6247688c5',
    _createdDate: {
      $date: '2024-10-25T11:00:30.392Z',
    },
    tagLine: 'tagline asdasdad',
    _updatedDate: {
      $date: '2024-10-25T11:00:30.392Z',
    },
    tagType: 'project',
  },
  {
    name: 'backcasting',
    _id: 'dda76cda-872f-4340-9052-b1db8dec90f8',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-25T10:48:31.588Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-25T10:48:31.588Z',
    },
    tagType: 'foresight method',
  },
  {
    name: 'Proiect test Ionaa',
    _id: '00b3f513-30f4-4668-a32d-8cfdad8f082e',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-25T10:46:20.747Z',
    },
    tagLine: 'test2',
    _updatedDate: {
      $date: '2024-10-25T10:48:47.624Z',
    },
    tagType: 'project',
    tagPageLink: '/project/proiect-test-ionaa-0xo5d',
  },
  {
    name: 'AUT University',
    _id: '55f7766b-ce18-49d3-8785-d3cf5a2e38f4',
    _owner: 'e586b886-7d9c-42d0-b744-f73146a3862f',
    _createdDate: {
      $date: '2024-10-25T10:37:35.927Z',
    },
    tagLine: 'Auckland University of Technology is a university in New Zealand',
    _updatedDate: {
      $date: '2024-10-27T01:10:06.404Z',
    },
    picture:
      'https://static.wixstatic.com/media/471908_8acd227ce39b419a9b4a0609a4f8ead5~mv2.jpg',
    tagType: 'organisation',
    tagPageLink: '/organisation/aut-university-jcasn',
  },
  {
    name: 'FFRC ',
    _id: '9221c319-e827-45bc-8d09-980873412b82',
    _owner: 'e586b886-7d9c-42d0-b744-f73146a3862f',
    _createdDate: {
      $date: '2024-10-25T09:10:17.036Z',
    },
    tagLine:
      'In view of this, a Food Fortification Resource Centre funded by the Tata Trusts',
    _updatedDate: {
      $date: '2024-10-25T10:25:19.094Z',
    },
    picture:
      'https://static.wixstatic.com/media/471908_f5c11b9795144bb1af5adb7d97de0351~mv2.png',
    tagType: 'organisation',
    tagPageLink: '/organisation/ffrc-awjzf',
  },
  {
    name: 'ICHECHIM',
    _id: '8d0daff2-aa99-448e-8746-094e4456c6d9',
    _owner: 'e586b886-7d9c-42d0-b744-f73146a3862f',
    _createdDate: {
      $date: '2024-10-25T09:09:54.484Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-25T09:09:54.484Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'Project XYZ',
    _id: '22903751-66ee-4fe6-a3a4-618de61995c2',
    _owner: 'e13d3737-1a40-45be-85c9-7aa6247688c5',
    _createdDate: {
      $date: '2024-10-25T08:55:14.790Z',
    },
    tagLine: 'This is Project XYZ Timeline',
    _updatedDate: {
      $date: '2024-10-25T08:57:16.138Z',
    },
    picture:
      'https://static.wixstatic.com/media/471908_6b3e65c102cc42ee86e83551947225ab~mv2.webp',
    tagType: 'project',
    tagPageLink: '/project/project-xyz-xzaku',
  },
  {
    name: 'Vivian Efthimiopoulou',
    _id: 'c45fd531-4d62-437a-82d1-cfda226c2ba2',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-24T18:39:37.014Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-24T18:39:37.014Z',
    },
    tagType: 'person',
  },
  {
    name: 'Ioana Spanache',
    _id: '96f61b50-b22e-4d5b-8730-597ef586e951',
    _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
    _createdDate: {
      $date: '2024-10-24T11:09:20.706Z',
    },
    tagLine: 'When the path is blocked, create a new one.',
    _updatedDate: {
      $date: '2024-10-24T13:08:24.293Z',
    },
    tagType: 'person',
    tagPageLink: '/person/ioana-spanache-2u7zg',
  },
  {
    name: 'Time Capsule',
    _id: '1a5911b8-844c-476c-8615-5e786e8c665e',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-24T08:18:02.071Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-24T08:18:06.142Z',
    },
    tagType: 'project',
    tagPageLink: '/project/time-capsule-2q0pv',
  },
  {
    name: 'test bianca',
    _id: 'e279ff6d-4aba-41ec-b0b6-5d7cdfc428dd',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-24T08:10:08.561Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-24T08:10:16.321Z',
    },
    tagType: 'project',
    tagPageLink: '/project/test-bianca-yei1n',
  },
  {
    name: 'Backcasting',
    _id: '0e587277-12c5-43a7-9d16-a2669f6141f2',
    _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
    _createdDate: {
      $date: '2024-10-24T07:55:54.494Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-24T07:55:54.494Z',
    },
    tagType: 'foresight method',
  },
  {
    name: 'UN Foundation',
    _id: '7c378f10-f217-406e-a963-8657f34df7f1',
    _owner: 'd7b153b4-b43b-466c-9881-0d9d9466ab0b',
    _createdDate: {
      $date: '2024-10-24T07:49:41.543Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-24T07:49:41.543Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'Unlock the Future',
    _id: '9cea19fc-49a1-42fe-9a3e-fa2a386a6bfc',
    _owner: 'd7b153b4-b43b-466c-9881-0d9d9466ab0b',
    _createdDate: {
      $date: '2024-10-24T07:49:05.665Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-24T07:49:05.665Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'Foresight for Intergenerational Decision-Making',
    _id: 'c70a0b51-b3af-447c-b6db-ed2546a72762',
    _owner: 'd7b153b4-b43b-466c-9881-0d9d9466ab0b',
    _createdDate: {
      $date: '2024-10-24T07:26:47.338Z',
    },
    tagLine: 'Empowering Youth to Shape the Future',
    _updatedDate: {
      $date: '2024-10-24T07:51:06.918Z',
    },
    tagType: 'project',
    tagPageLink:
      '/project/foresight-for-intergenerational-decision-making-5g8w2',
  },
  {
    name: 'A. Prenner',
    _id: '118a57f4-06ff-4294-b90c-72aed16a60ed',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-23T13:51:57.965Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-23T13:51:57.965Z',
    },
    tagType: 'person',
  },
  {
    name: 'D. Ashour',
    _id: '12133a44-90cd-41e7-b90a-877b020198c2',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-23T13:51:38.617Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-23T13:51:38.617Z',
    },
    tagType: 'person',
  },
  {
    name: 'P. Colpo',
    _id: '06c43323-e906-4e6b-b08d-1f3016a93a3a',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-23T13:51:17.112Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-23T13:51:17.112Z',
    },
    tagType: 'person',
  },
  {
    name: 'F. roncari',
    _id: '97f06197-9063-44e3-bcc6-b4e90d03d422',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-23T13:50:51.950Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-23T13:50:51.950Z',
    },
    tagType: 'person',
  },
  {
    name: 'C. Desmet',
    _id: '986c213d-adc3-409d-8290-b9193d124791',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-23T13:50:30.869Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-23T13:50:30.869Z',
    },
    tagType: 'person',
  },
  {
    name: 'A. Valsesia',
    _id: 'ef525d1c-5bf1-442e-bfc8-2c2498ad4df2',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-23T13:50:02.384Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-23T13:50:02.384Z',
    },
    tagType: 'person',
  },
  {
    name: 'F. Fumagalli',
    _id: '3172d50c-6450-42c4-88d3-5c51d7d588d1',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-23T13:49:25.461Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-23T13:49:25.461Z',
    },
    tagType: 'person',
  },
  {
    name: 'Public Policy',
    _id: '2bb9642d-dc5a-4fc3-a812-9f98e987705e',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-23T13:38:45.867Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-23T13:38:45.867Z',
    },
    tagType: 'domain',
  },
  {
    name: 'FORPOL',
    _id: 'c1e81ff1-046d-4a5a-b7cd-61952f67a560',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-23T13:34:45.252Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-23T13:42:18.593Z',
    },
    picture:
      'https://static.wixstatic.com/media/471908_7414ddd0846c4a9691ee2f985b15b588~mv2.png',
    tagType: 'project',
    tagPageLink: '/project/forpol-m2fp5',
  },
  {
    name: 'EA Infrastructure Fund',
    _id: 'e41ccacf-4633-431e-8fb8-7727ab8d30ed',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-23T13:34:10.526Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-23T13:34:10.526Z',
    },
    tagType: 'project type',
  },
  {
    name: '4CF The Futures Literacy Company ',
    _id: '10a72944-404e-49a1-a60d-867cde630728',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-23T12:44:57.760Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-23T12:44:57.760Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'Joakim Skog',
    _id: '22e1e17e-930e-498d-b32d-1a3a3b47e4a5',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-23T09:31:02.715Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-23T09:31:02.715Z',
    },
    tagType: 'person',
  },
  {
    name: 'Marie Ségur',
    _id: '831d7150-d514-44f8-a8aa-8d2fd0c616fe',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-23T08:42:08.163Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-23T08:42:08.163Z',
    },
    tagType: 'person',
  },
  {
    name: 'Pier Francesco Moretti',
    _id: '649326a1-d0b4-4c62-9a4f-cb6775722bd9',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-23T08:34:42.029Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-23T08:34:42.029Z',
    },
    tagType: 'person',
  },
  {
    name: 'Knowledge',
    _id: '3856c25c-1224-40d0-bae6-666c37eec97e',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-23T08:29:56.782Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-23T08:29:56.782Z',
    },
    tagType: 'domain',
  },
  {
    name: 'Decarbonisation',
    _id: 'b17267c9-696c-4007-b97e-568deb8e7283',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-23T08:29:26.646Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-23T08:29:26.646Z',
    },
    tagType: 'domain',
  },
  {
    name: 'Emotions',
    _id: '2321cecb-186d-4aef-8903-195199d867a9',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-23T08:29:08.599Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-23T08:29:08.599Z',
    },
    tagType: 'domain',
  },
  {
    name: 'Diet',
    _id: '19ba2e76-07f4-43f3-9b7c-8b4aedff2fc0',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-23T08:28:50.225Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-23T08:28:50.225Z',
    },
    tagType: 'domain',
  },
  {
    name: 'Fashion',
    _id: '43307c72-8f16-49fd-91c1-9328aefcd933',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-23T08:28:36.134Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-23T08:28:36.134Z',
    },
    tagType: 'domain',
  },
  {
    name: 'Aging',
    _id: 'c0b23f07-22da-4931-a582-be2d2d7b3758',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-23T08:28:19.587Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-23T08:28:19.587Z',
    },
    tagType: 'domain',
  },
  {
    name: 'INESC TEC ',
    _id: 'ae50377f-3505-4c9a-9533-de657b0bcf05',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-22T16:42:43.792Z',
    },
    tagLine:
      'INESC TEC - Institute for Systems and Computer Engineering, Technology and Science',
    _updatedDate: {
      $date: '2024-10-29T11:58:49.591Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'Consiglio Nazionale delle Ricerche',
    _id: '8d9e6294-404a-432b-be15-2bacef51ab4e',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-22T16:38:34.536Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-22T16:38:34.536Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'coordinator',
    _id: '3ecedb5f-f96f-496e-b040-8d7b870250a8',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-22T16:36:59.821Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-22T16:36:59.821Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'Soil Health and Food',
    _id: 'dcc95f5a-b930-4388-96c0-ae4449301572',
    _owner: 'e13d3737-1a40-45be-85c9-7aa6247688c5',
    _createdDate: {
      $date: '2024-10-22T16:09:24.676Z',
    },
    tagLine:
      'Industry-Academia Forum to uncover the potential of emerging enabling technologies',
    _updatedDate: {
      $date: '2024-10-26T22:45:48.088Z',
    },
    picture:
      'https://static.wixstatic.com/media/471908_47fc0752aa4843feb8984b2766e722a3~mv2.png',
    tagType: 'project',
    tagPageLink:
      '/project/project-z-proaksj-aslkajda-asdkl-jas-dalksjda-lksdjalk-sdjaslkd--gaspf',
  },
  {
    name: 'Survey',
    _id: '3886c659-e84d-44eb-96b9-21acc6d65a09',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-22T13:17:14.384Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-22T13:17:14.384Z',
    },
    tagType: 'foresight method',
  },
  {
    name: 'Futures literacy',
    _id: 'b99431d0-ed19-4f73-bc7c-fae45125034a',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-22T13:11:34.619Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-22T13:11:34.619Z',
    },
    tagType: 'domain',
  },
  {
    name: 'How will we disgust our descendants?',
    _id: '03d3bb0f-f469-47e6-8bf1-755ac9741ab7',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-22T13:03:53.047Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-22T13:17:31.947Z',
    },
    tagType: 'project',
    tagPageLink: '/project/how-will-we-disgust-our-descendants-rvsft',
  },
  {
    name: 'Policy analysis',
    _id: '96eac4f5-c18b-4b73-a6fb-9c0ea2b5740c',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-22T12:59:51.058Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-22T12:59:51.058Z',
    },
    tagType: 'domain',
  },
  {
    name: 'ESPAS Horizon Scanning',
    _id: '768d06d7-153a-4f32-9988-b7fe13bb28c9',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-22T12:46:14.504Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-28T12:29:20.068Z',
    },
    picture:
      'https://static.wixstatic.com/media/471908_52a2303798fa412380bc9e03ff3b52e1~mv2.png',
    tagType: 'project',
    tagPageLink: '/project/espas-horizon-scanning-9rfpb',
  },
  {
    name: 'Digital Transition',
    _id: '8d336e96-95a1-4aa3-b704-8a3366a096c3',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-22T12:03:40.097Z',
    },
    tagLine:
      'Long-Term Implications of the Digital Transition for Farmers and Rural Communities',
    _updatedDate: {
      $date: '2024-10-28T11:07:46.336Z',
    },
    tagType: 'project',
    tagPageLink:
      '/project/long-term-implications-of-the-digital-transition-for-farmers-and-rural-communities-r55z7',
  },
  {
    name: 'Project Y',
    _id: '88eaf121-8b56-4fc9-b097-05f78b28c10c',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-22T11:53:15.551Z',
    },
    tagLine: 'This is Project Y',
    _updatedDate: {
      $date: '2024-10-22T11:57:16.882Z',
    },
    picture:
      'https://static.wixstatic.com/media/471908_ee6fb60339494d159b584a454ad2f997~mv2.jpg',
    tagType: 'project',
    tagPageLink: '/project/project-y-u3b3v',
  },
  {
    name: 'Policy scenarios',
    _id: '46852406-fd55-4a9a-8222-d91c3595110a',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-22T11:45:21.711Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-22T11:45:21.711Z',
    },
    tagType: 'foresight method',
  },
  {
    name: 'ReSChape ',
    _id: '96a77dca-6c54-4ef8-ae3f-46f3798edc2c',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-22T11:38:09.986Z',
    },
    tagLine: 'Reshaping Supply Chains for a Positive Social Impact',
    _updatedDate: {
      $date: '2024-10-28T10:58:21.362Z',
    },
    picture:
      'https://static.wixstatic.com/media/471908_9cb535f3a1aa498eb7154999541ebd2a~mv2.png',
    tagType: 'project',
    tagPageLink:
      '/project/reshaping-supply-chains-for-a-positive-social-impact-nn65i',
  },
  {
    name: 'ANTICIPINNOV',
    _id: '3eeaee95-a2fa-42df-9d39-dcdde8b934e1',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-22T11:17:22.221Z',
    },
    tagLine:
      'Anticipation and monitoring of emerging technologies and disruptive innovation',
    _updatedDate: {
      $date: '2024-10-23T12:46:42.996Z',
    },
    tagType: 'project',
    tagPageLink:
      '/project/anticipation-and-monitoring-of-emerging-technologies-and-disruptive-innovation-p8vkw',
  },
  {
    name: ' Lucia Vesnic-Alujevic',
    _id: 'c666d5d0-e20d-4c21-9e9b-ed16b197c869',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-22T11:01:16.051Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-22T11:01:16.051Z',
    },
    tagType: 'person',
  },
  {
    name: ' Marco Bevolo',
    _id: '3d429552-e826-4d77-b3e9-832b3bd15281',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-22T11:00:53.229Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-22T11:00:53.229Z',
    },
    tagType: 'person',
  },
  {
    name: ' Rafael Popper',
    _id: 'aa760464-1e38-4169-90f9-d380ce688327',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-22T11:00:38.580Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-22T11:00:38.580Z',
    },
    tagType: 'person',
  },
  {
    name: ' Matthew Spaniol',
    _id: '27bc640c-3c7d-4dbd-b5de-40a14abba514',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-22T11:00:26.519Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-22T11:00:26.519Z',
    },
    tagType: 'person',
  },
  {
    name: 'Antonia Mochan;  Alexandra de Maleville; Joao Farinha;Ana Ruiz Moreno; Dina Ashour',
    _id: '1549ff11-1212-4a6b-a54f-24a94fa4e7f4',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-22T10:43:00.046Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-22T10:43:00.046Z',
    },
    tagType: 'person',
  },
  {
    name: 'Emerging Technologies',
    _id: '414e11bd-1c1c-4d88-b63e-f24a3b2c711a',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-22T10:37:07.120Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-22T10:37:07.120Z',
    },
    tagType: 'domain',
  },
  {
    name: 'Health Emergency Preparedness and Response Authority (HERA)',
    _id: 'd0292a63-f3ee-4814-ae6f-3f7a8d8648a5',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-22T10:35:53.935Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-22T10:35:53.935Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'European Commission Joint Research Centre (JRC)',
    _id: 'fc7e688d-6537-4d39-b015-b6cb052f52d2',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-22T10:35:34.965Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-22T10:35:34.965Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'Ruiz-Moreno, A., Fumagalli, F., Valsesia, A., Desmet, C., Roncari, F., Colpo, P., Ashour, D., Prenner, A.,  de Maleville, A., Farinha, J., Mochan, A. ',
    _id: '2cabc3a3-f875-4515-affe-ee004840d537',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-22T10:29:18.075Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-22T10:29:18.075Z',
    },
    tagType: 'person',
  },
  {
    name: 'EU',
    _id: 'e1b13728-5253-484b-92d6-0c451813adff',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-22T10:28:23.621Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-22T10:28:23.621Z',
    },
    tagType: 'country',
  },
  {
    name: 'Suppressing indoor pathogen transmission',
    _id: '00ffc196-d25c-4890-8e70-8d417db09529',
    _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
    _createdDate: {
      $date: '2024-10-22T10:26:21.372Z',
    },
    tagLine: ' A Technology Foresight study',
    _updatedDate: {
      $date: '2024-10-22T10:26:21.372Z',
    },
    tagType: 'country',
  },
  {
    name: 'Speculative design',
    _id: '6cffa4fa-0c42-4736-a303-303f925373db',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-21T20:51:05.923Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-21T20:51:05.923Z',
    },
    tagType: 'foresight method',
  },
  {
    name: 'Futures Garden',
    _id: '8f7b4246-c936-44df-8e48-acdfd342dccf',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-21T20:36:57.587Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-21T20:51:43.951Z',
    },
    tagType: 'project',
    tagPageLink: '/project/Futures_Garden_bzm8d',
  },
  {
    name: 'Austrian Institute of Technology',
    _id: 'e425fce1-879a-42b8-b154-b5590cb1cd71',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-21T18:09:57.361Z',
    },
    tagLine: 'AIT',
    _updatedDate: {
      $date: '2024-10-21T18:09:57.361Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'European Environment Agency',
    _id: 'f3dc27f9-bcdf-4c71-bca9-d0f743a5ec43',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-21T18:06:25.276Z',
    },
    tagLine: 'EEA',
    _updatedDate: {
      $date: '2024-10-21T18:06:25.276Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'ISINNOVA',
    _id: 'd3fb10bb-0c2b-4902-b677-d43970198c35',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-19T17:25:16.424Z',
    },
    tagLine: 'Institute of Studies for the Integration of Systems',
    _updatedDate: {
      $date: '2024-10-19T17:25:16.424Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'Reimagining the Food System',
    _id: 'ce3c81ca-8323-409a-b3e9-b155bf7b1756',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-19T17:17:03.253Z',
    },
    tagLine: 'Scanning the horizon for emerging social innovations',
    _updatedDate: {
      $date: '2024-10-19T17:31:22.773Z',
    },
    tagType: 'project',
    tagPageLink: '/project/Reimagining_the_Food_System_i308i',
  },
  {
    name: '#OurFutures',
    _id: '612a7547-db2c-49b7-8b05-576dbc951324',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-17T12:43:06.796Z',
    },
    tagLine:
      'Collecting stories from citizens of Europe, indicating their desirable futures.',
    _updatedDate: {
      $date: '2024-10-18T08:49:56.859Z',
    },
    tagType: 'project',
    tagPageLink: '/project/OurFutures_wgft5',
  },
  {
    name: 'roadmapping',
    _id: '19a0517e-64e5-48f8-823e-f8ca544c6447',
    _owner: '4719082d-ae14-4ecd-924b-bf55a28b8479',
    _createdDate: {
      $date: '2024-10-17T10:44:01.075Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-17T10:44:01.075Z',
    },
    tagType: 'foresight method',
  },
  {
    name: 'CIMULACT',
    _id: '6bed0293-1da4-42c6-aeb4-4e40bdfb91e6',
    _owner: '4719082d-ae14-4ecd-924b-bf55a28b8479',
    _createdDate: {
      $date: '2024-10-17T09:52:42.003Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-17T09:52:50.611Z',
    },
    tagType: 'project',
    tagPageLink: '/project/CIMULACT_5i78x',
  },
  {
    name: 'Project Z',
    _id: '9b1dbf7f-18d2-43b1-978f-9097d061e410',
    _owner: 'e13d3737-1a40-45be-85c9-7aa6247688c5',
    _createdDate: {
      $date: '2024-10-15T19:25:08.293Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-24T18:49:44.542Z',
    },
    tagType: 'project',
    tagPageLink: '/project/project-z-idlxk',
  },
  {
    name: 'Foresight on Demand',
    _id: 'b7d06104-8a2c-4cf5-a4f9-b522f48fef85',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-15T12:21:46.431Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-15T12:21:46.431Z',
    },
    tagType: 'domain',
  },
  {
    name: 'Project X',
    _id: '97992e40-17a3-4ad8-965c-d3d017bb63d6',
    _owner: 'e13d3737-1a40-45be-85c9-7aa6247688c5',
    _createdDate: {
      $date: '2024-10-15T11:19:22.720Z',
    },
    tagLine: 'Tagline for Project X',
    _updatedDate: {
      $date: '2024-10-17T22:46:49.092Z',
    },
    picture:
      'https://static.wixstatic.com/media/471908_47a4c55288e34366a212bc1996120bd9~mv2.jpeg',
    tagType: 'project',
    tagPageLink: '/project/Project_X_vyc86',
  },
  {
    popularity: 1,
    name: 'Eye of Europe',
    _id: 'a3da923c-66d3-46a7-8ab0-8d33424f3b80',
    _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
    _createdDate: {
      $date: '2024-10-15T11:02:13.126Z',
    },
    tagLine: 'The Research and Innovation Foresight Community',
    _updatedDate: {
      $date: '2024-10-25T11:17:57.445Z',
    },
    picture:
      'https://static.wixstatic.com/media/471908_3fc30f50bb3c467aa3213c444816d649~mv2.png',
    tagType: 'project',
    tagPageLink: '/project/Eye_of_Europe_6ft5d',
  },
  {
    name: 'RIBRI',
    _id: 'dd400918-86de-44c1-9db3-d1d51d34d0f8',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-15T09:42:57.914Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-15T09:42:57.914Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'Radu Gheorghiu',
    _id: '79e69062-1f22-4acd-bd5c-b4b0f17a3dad',
    _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
    _createdDate: {
      $date: '2024-10-15T09:06:25.839Z',
    },
    _updatedDate: {
      $date: '2024-10-15T09:06:25.839Z',
    },
    tagType: 'person',
  },
  {
    name: '4strat',
    _id: '3e0b1108-7d7c-412b-a02f-1573ec4a5d2f',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-15T08:46:04.126Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-15T08:46:04.126Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'Ana Keser',
    _id: '379a8461-7975-46b7-97f4-5c251faf464d',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-15T08:41:07.097Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-15T08:41:07.097Z',
    },
    tagType: 'person',
  },
  {
    name: 'Foresight towards the 2nd Strategic Plan for Horizon Europe',
    _id: 'b853a2cf-94b7-40b5-bb70-ee2a2dd53ce8',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-14T18:33:00.732Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-30T15:55:02.077Z',
    },
    tagType: 'project',
    tagPageLink:
      '/project/Foresight_towards_the_2nd_Strategic_Plan_for_Horizon_Europe_bzq9u',
  },
  {
    name: 'STI for 2050',
    _id: '8bf3fe7c-b066-4db9-a1d1-dd67e1247d54',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-14T18:31:31.897Z',
    },
    tagLine:
      'Science, technology, and innovation (STI) for ecosystem performance: Accelerating Sustainability transitions',
    _updatedDate: {
      $date: '2024-10-15T09:12:01.645Z',
    },
    tagType: 'project',
    tagPageLink: '/project/STI_for_2050_n9b8i',
  },
  {
    name: 'Foresight towards the 2nd Strategic Plan for Horizon Europe',
    _id: 'f2de1204-42d5-4f45-8fe6-eb493cba22d9',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-14T15:47:48.944Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-14T15:47:48.944Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'Reimagining the Food System: scanning the horizon for emerging social innovations',
    _id: '897c577d-90b1-4bc3-a5ca-73d49dd54087',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-14T15:47:08.514Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-14T15:47:08.514Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'S&T&I FOR 2050',
    _id: '004bb708-2cf1-44e0-84b9-52801822185e',
    _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
    _createdDate: {
      $date: '2024-10-14T15:44:14.464Z',
    },
    tagLine:
      '&T&I FOR 2050. Science, Technology and Innovation for Ecosystem Performance – Accelerating Sustainability Transitions',
    _updatedDate: {
      $date: '2024-10-14T15:44:14.464Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'Octavian Buiu',
    _id: '0507b2b5-9b7b-47ba-a026-3171f401f4c4',
    _owner: '4719082d-ae14-4ecd-924b-bf55a28b8479',
    _createdDate: {
      $date: '2024-10-14T15:05:29.137Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-14T15:05:29.137Z',
    },
    tagType: 'person',
  },
  {
    name: 'Romanian Ministry of Research, Innovation and Digitalization',
    _id: '6072e31f-19a7-4842-9088-e725b5ff1dcc',
    _owner: '4719082d-ae14-4ecd-924b-bf55a28b8479',
    _createdDate: {
      $date: '2024-10-14T15:04:09.694Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-14T15:04:09.694Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'Medeea Petrovan',
    _id: 'a7921ee8-9e82-46ef-9415-130f0cf76add',
    _owner: '4719082d-ae14-4ecd-924b-bf55a28b8479',
    _createdDate: {
      $date: '2024-10-14T15:02:11.063Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-14T15:02:11.063Z',
    },
    tagType: 'person',
  },
  {
    name: 'Cristina Serbanica',
    _id: '316cb213-7547-4551-a6b7-3424e68305b7',
    _owner: '4719082d-ae14-4ecd-924b-bf55a28b8479',
    _createdDate: {
      $date: '2024-10-14T15:01:49.554Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-14T15:01:49.554Z',
    },
    tagType: 'person',
  },
  {
    name: 'Roxana Dimitriu',
    _id: 'ee8a3332-2eb5-4eaf-8f83-a8b01444ee20',
    _owner: '4719082d-ae14-4ecd-924b-bf55a28b8479',
    _createdDate: {
      $date: '2024-10-14T15:01:39.396Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-14T15:01:39.396Z',
    },
    tagType: 'person',
  },
  {
    name: 'Adrian Curaj',
    _id: 'b5b6e3b9-0e09-4316-83cd-4f1409a902eb',
    _owner: '4719082d-ae14-4ecd-924b-bf55a28b8479',
    _createdDate: {
      $date: '2024-10-14T14:59:00.148Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-14T14:59:00.148Z',
    },
    tagType: 'person',
  },
  {
    name: 'Sergiu Ciobanasu test',
    _id: '8343b990-24b9-4ca5-b63d-02a091fedf77',
    _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
    _createdDate: {
      $date: '2024-10-14T11:29:33.493Z',
    },
    tagLine: 'This is a tagline edited',
    _updatedDate: {
      $date: '2024-10-28T21:45:14.222Z',
    },
    tagType: 'person',
    tagPageLink: '/person/Sergiu_Ciobanasu_fhbwz',
  },
  {
    name: 'Prospectiva',
    _id: '0a40b56c-b3ce-464f-9373-39d01bfdb09c',
    _owner: '4e87a317-884a-4be5-a4f2-a9a8cd641be3',
    _createdDate: {
      $date: '2024-10-14T10:49:49Z',
    },
    tagLine: 'Institutul de Prospectiva',
    _updatedDate: {
      $date: '2024-10-15T08:48:03.231Z',
    },
    picture:
      'https://static.wixstatic.com/media/471908_d73eb310112b41cb81a61667a4cc7421~mv2.png',
    tagType: 'organisation',
    tagPageLink: '/organisation/Prospectiva_fiw2n',
  },
  {
    name: 'Susana Nascimento',
    _id: '6993a778-6e93-47e7-b36c-38e9378d79cf',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.370Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.370Z',
    },
    tagType: 'person',
  },
  {
    name: 'Federico Di Gennaro',
    _id: '30f9dd93-6411-491e-a90f-0c910862e9bc',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.369Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.369Z',
    },
    tagType: 'person',
  },
  {
    name: 'Rodrigo Ataíde Dias',
    _id: 'e12761b5-90e5-4fa4-b448-c39fc467827d',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.368Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.368Z',
    },
    tagType: 'person',
  },
  {
    name: 'Oana Calugar',
    _id: '810f8db7-e003-4045-946e-50b585a69d82',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.367Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.367Z',
    },
    tagType: 'person',
  },
  {
    name: 'Teresa  de la Cruz',
    _id: '6f4b5f52-8e13-414e-85a1-d43ef8c02157',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.366Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.366Z',
    },
    tagType: 'person',
  },
  {
    name: 'Adam Gasparovic',
    _id: '84527001-c038-4015-93df-9279cafc28a3',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.365Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.365Z',
    },
    tagType: 'person',
  },
  {
    name: 'Iva Vancurova',
    _id: '805b8615-2c53-4abb-9abb-a225441972f9',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.364Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.364Z',
    },
    tagType: 'person',
  },
  {
    name: 'Maria Lucia Pittalis',
    _id: 'e8a06e30-1a57-4837-a349-d4e272879971',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.363Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.363Z',
    },
    tagType: 'person',
  },
  {
    name: 'Francesco Mureddu',
    _id: '39b4fd0c-0679-4e34-a1bf-ffe02a464bd4',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.362Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.362Z',
    },
    tagType: 'person',
  },
  {
    name: 'Cecilia Maronero',
    _id: '5236991f-33f6-433d-96db-5a42c8ae3683',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.361Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.361Z',
    },
    tagType: 'person',
  },
  {
    name: 'Kaloyan Ratchev',
    _id: 'aa5f2bc1-5bd8-4a6d-85e7-98d4dd2a91d4',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.360Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.360Z',
    },
    tagType: 'person',
  },
  {
    name: 'Jürgen Wengel',
    _id: '3e3ea179-2551-4a45-8577-8ba6c0661d43',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.359Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.359Z',
    },
    tagType: 'person',
  },
  {
    name: 'Florian Roth',
    _id: 'c6f9ff4c-4b99-4ade-b8ab-206924d4c61c',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.358Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.358Z',
    },
    tagType: 'person',
  },
  {
    name: 'Sophie Wulk',
    _id: '500215a8-1699-4817-86d7-a7dd1d7bdfc2',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.357Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.357Z',
    },
    tagType: 'person',
  },
  {
    name: 'Kea Stiewe',
    _id: 'a6cb2441-9f7c-4078-a33b-fe11d960cc12',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.356Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.356Z',
    },
    tagType: 'person',
  },
  {
    name: 'Olga Shaeva',
    _id: '560a240d-be8f-4148-b96d-8234126e876e',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.355Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.355Z',
    },
    tagType: 'person',
  },
  {
    name: 'katjapein',
    _id: '34a8b778-487e-4dbc-add9-e44ffee53d90',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.354Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.354Z',
    },
    tagType: 'person',
  },
  {
    name: 'Albert Norström',
    _id: 'ce93217a-92b0-49c4-9c61-2f30a458ca4a',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.353Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.353Z',
    },
    tagType: 'person',
  },
  {
    name: 'Henriette Kirch',
    _id: '1b34879e-01df-4bd3-807b-e1eabb1088ed',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.352Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.352Z',
    },
    tagType: 'person',
  },
  {
    name: 'Mira Yossifova',
    _id: '2b5b1a35-9c26-4da0-8c2b-7516272c2f46',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.351Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.351Z',
    },
    tagType: 'person',
  },
  {
    name: 'Juan Muzio',
    _id: 'b6ee74ab-1773-4658-80d5-59a802b345e3',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.350Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.350Z',
    },
    tagType: 'person',
  },
  {
    name: 'Giuliana Iannaccone',
    _id: '998aa04b-556c-4d58-b996-7ce1e4664bf2',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.349Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.349Z',
    },
    tagType: 'person',
  },
  {
    name: 'Thomas Deacon',
    _id: '1ecff52b-c08f-4c16-9bac-33e05b1b3662',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.348Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.348Z',
    },
    tagType: 'person',
  },
  {
    name: 'Maria Luísa Cavaco',
    _id: '743a0bd4-4b97-43fe-81ed-98e23443bb39',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.347Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.347Z',
    },
    tagType: 'person',
  },
  {
    name: 'Linas Eriksonas',
    _id: 'bf774282-9b4e-42ef-87a1-e9299eb19986',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.346Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.346Z',
    },
    tagType: 'person',
  },
  {
    name: 'Peter Lund',
    _id: '60011d01-171b-4eef-9f5e-239cb8cf5b06',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.345Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.345Z',
    },
    tagType: 'person',
  },
  {
    name: 'Bianca Dragomir',
    _id: '90c38dc0-018b-4d55-af76-e2b52130e029',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.344Z',
    },
    tagLine: 'Live deeply and tenderly',
    _updatedDate: {
      $date: '2024-10-14T18:29:46.298Z',
    },
    picture:
      'https://static.wixstatic.com/media/471908_957ec9dc2bb74b97b6166aab1d9d0840~mv2.jpg',
    tagType: 'person',
    tagPageLink: '/person/Bianca_Dragomir_q437h',
  },
  {
    name: 'Nicoletta Boldrini',
    _id: 'dcb7309d-29d0-4a90-adc7-37499cd40960',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.343Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.343Z',
    },
    tagType: 'person',
  },
  {
    name: 'Gabriele Songin',
    _id: 'd0dff3bf-80f9-4e14-9332-25241a67f41e',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.342Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.342Z',
    },
    tagType: 'person',
  },
  {
    name: 'Eirini Malliaraki',
    _id: 'a05f2b77-f149-497a-bab1-40ea05d083c6',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.341Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.341Z',
    },
    tagType: 'person',
  },
  {
    name: 'Jürgen Wengel',
    _id: '851c275d-9c47-4111-bf17-8b0f0227a635',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.340Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.340Z',
    },
    tagType: 'person',
  },
  {
    name: 'Alexandre Vacher',
    _id: '8907c051-9862-457e-bb3a-d06cb91955fb',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.339Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.339Z',
    },
    tagType: 'person',
  },
  {
    name: 'Isabel Fernandez',
    _id: 'f57700e0-f057-4123-822a-38214f25105a',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.338Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.338Z',
    },
    tagType: 'person',
  },
  {
    name: 'Karina Pastor',
    _id: 'f70f100b-a0f7-49d7-a1a3-1e4580f707da',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.337Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.337Z',
    },
    tagType: 'person',
  },
  {
    name: 'Jutta Kauppi',
    _id: '455c0c0b-a4b0-4fd6-9bc4-48cd5713404a',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.336Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.336Z',
    },
    tagType: 'person',
  },
  {
    name: 'Agne Paliokaite',
    _id: '7b44685e-aabc-4e34-84c1-b28f55046521',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.335Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.335Z',
    },
    tagType: 'person',
  },
  {
    name: 'Leena Sarvaranta',
    _id: 'ab41ab9d-69dd-43b2-b8d1-d7366e20b56b',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.334Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.334Z',
    },
    tagType: 'person',
  },
  {
    name: 'Visar Dobroshi',
    _id: '18e19422-a094-46cc-91ef-b84aa48a5c92',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.333Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.333Z',
    },
    tagType: 'person',
  },
  {
    name: 'Iuliana Nichersu',
    _id: '5747e8be-83ba-4249-a543-aa388946b94f',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.332Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.332Z',
    },
    tagType: 'person',
  },
  {
    name: 'Mohammad Hossein Tavangar',
    _id: '9674e5d0-9c69-413c-805e-2d5c080d443f',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.331Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.331Z',
    },
    tagType: 'person',
  },
  {
    name: 'Hanna Willman-Iivarinen',
    _id: '5a2b37cb-b01e-4c90-ae5d-04c6ed524fb8',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.330Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.330Z',
    },
    tagType: 'person',
  },
  {
    name: 'Matei Traistaru',
    _id: '48ce6f57-2813-4dc5-ab62-c6f5cd819296',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.329Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.329Z',
    },
    tagType: 'person',
  },
  {
    name: 'Tanja Schindler',
    _id: '257a5d59-0e45-4a4d-920e-914266f0b86b',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.328Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.328Z',
    },
    tagType: 'person',
  },
  {
    name: 'Thomas Arnold',
    _id: '9cd2bc4a-eaf8-4ec4-85ca-81740eb6bcdf',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.327Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.327Z',
    },
    tagType: 'person',
  },
  {
    name: 'Stephen Davies',
    _id: 'b4e97dba-b931-466b-9a60-a0d110c5ecbe',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.326Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.326Z',
    },
    tagType: 'person',
  },
  {
    name: 'Sean Pillot de Chenecey',
    _id: '5ecfbc43-4aec-45dd-ae56-067ba42f8132',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.325Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.325Z',
    },
    tagType: 'person',
  },
  {
    name: 'Kasia Murphy',
    _id: 'c616cb47-69a1-4694-90cb-f83ff4e913e5',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.324Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.324Z',
    },
    tagType: 'person',
  },
  {
    name: 'Anette Strömberg',
    _id: '3c74b34e-97aa-49e7-b49d-3c58dfd0639e',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.323Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.323Z',
    },
    tagType: 'person',
  },
  {
    name: 'Thomas Röblreiter',
    _id: '8c5884a5-f621-45f7-a454-f3135adb5c41',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.322Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.322Z',
    },
    tagType: 'person',
  },
  {
    name: 'Jan Arpe',
    _id: '97753da6-301c-4330-b766-f2db7c4c1055',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.321Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.321Z',
    },
    tagType: 'person',
  },
  {
    name: 'Elisavet Karaiskou',
    _id: '964a9faa-bd9a-43cf-8d60-e23f7a8499cb',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.320Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.320Z',
    },
    tagType: 'person',
  },
  {
    name: 'Anna Simandiraki-Grimshaw',
    _id: '1e905622-42b4-4206-9fdf-6198b0d6ebc1',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.319Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.319Z',
    },
    tagType: 'person',
  },
  {
    name: 'Jenny  Engström',
    _id: '958cffaf-997f-41fd-a9bc-a3c376a799c9',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.318Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.318Z',
    },
    tagType: 'person',
  },
  {
    name: 'Emma Mutch',
    _id: 'b7557e29-c979-4fbe-89e9-bfc292456e83',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.317Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.317Z',
    },
    tagType: 'person',
  },
  {
    name: 'Bridget Russell',
    _id: 'f76b2d13-04ee-4f0c-9aee-dc5587102dbd',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.316Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.316Z',
    },
    tagType: 'person',
  },
  {
    name: 'Jordi Vergés',
    _id: '6bcb8617-d628-4c79-b2bd-95e10250d1cc',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.315Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.315Z',
    },
    tagType: 'person',
  },
  {
    name: 'Susan Guthrie',
    _id: 'f0ed2490-c416-495e-bbca-b338742fd2ee',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.314Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.314Z',
    },
    tagType: 'person',
  },
  {
    name: 'Giovanna Guiffrè',
    _id: '9f43d0ff-05f5-45a0-a991-618ab5cb0375',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.313Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.313Z',
    },
    tagType: 'person',
  },
  {
    name: 'Jean SEVAL',
    _id: '3a297945-ad9a-44a7-ba62-b0c603a1fb45',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.312Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.312Z',
    },
    tagType: 'person',
  },
  {
    name: 'Guenter Clar',
    _id: '7bcdb80b-9582-449a-bcf9-d4dabd8309b2',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.311Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.311Z',
    },
    tagType: 'person',
  },
  {
    name: 'maciej.krzysztofowicz',
    _id: '75305f0f-cd6a-4eef-a1e5-f76e162d48d0',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.310Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.310Z',
    },
    tagType: 'person',
  },
  {
    name: 'Adrian Taylor',
    _id: 'e6846b1c-0a9d-4611-a52a-d385685c0f19',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.309Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.309Z',
    },
    tagType: 'person',
  },
  {
    name: 'Maja Fojud',
    _id: '16e53017-8d29-4454-856b-c3a5ee94ff6d',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.308Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.308Z',
    },
    tagType: 'person',
  },
  {
    name: 'Margherira Palmieri',
    _id: '2668da38-105a-43b1-9157-bcdc4403503c',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.306Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.306Z',
    },
    tagType: 'person',
  },
  {
    name: 'Bartosz Dziugiel',
    _id: 'f819482c-2f15-4c5d-ba10-d66b6ea54ed6',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.305Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.305Z',
    },
    tagType: 'person',
  },
  {
    name: 'Roman Retzbach (ProFuturist - Future Institute)',
    _id: 'cdb42a39-0f3e-472f-80e8-e78e42d34139',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.304Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.304Z',
    },
    tagType: 'person',
  },
  {
    name: 'Shruthi Venkat',
    _id: '7a8eafed-674e-4160-8c42-5792a5415c82',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.303Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.303Z',
    },
    tagType: 'person',
  },
  {
    name: 'Nina Husarcikova',
    _id: '27120c1f-c9fc-4961-acd9-0bdc17da36a5',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.302Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.302Z',
    },
    tagType: 'person',
  },
  {
    name: 'Johan Granberg',
    _id: 'bd762c6b-4b44-4b5b-8299-347997c9bf24',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.301Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.301Z',
    },
    tagType: 'person',
  },
  {
    name: 'N O R M A L S',
    _id: '58df6636-8686-49c4-9900-4bbed920b6bf',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.300Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.300Z',
    },
    tagType: 'person',
  },
  {
    name: 'Norbert Kołos',
    _id: '18cd0331-9798-4cc1-9e33-8e6f2c2dbff6',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.299Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.299Z',
    },
    tagType: 'person',
  },
  {
    name: 'Stefan Böschen',
    _id: '64a64606-e910-4d3b-8db1-f64c339e245b',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.298Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.298Z',
    },
    tagType: 'person',
  },
  {
    name: 'Alexandros Tzouanas',
    _id: '617ddb4c-b520-4d9d-91bf-d1774acd17cf',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.297Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.297Z',
    },
    tagType: 'person',
  },
  {
    name: 'Dave Shaw',
    _id: 'a65115a5-6db9-42d9-abfc-03eda3fc0535',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.296Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.296Z',
    },
    tagType: 'person',
  },
  {
    name: 'Adrian Lauer',
    _id: '0b308720-10f7-4c77-a771-74008771d619',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.295Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.295Z',
    },
    tagType: 'person',
  },
  {
    name: 'Jacqueline Whyte',
    _id: 'd27dc34d-abb6-4da8-b751-7d16c0ba82a1',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.294Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.294Z',
    },
    tagType: 'person',
  },
  {
    name: 'Jonathan Blanchard Smith',
    _id: 'b9bb26a7-b150-42a4-b36c-683d77d27b65',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.293Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.293Z',
    },
    tagType: 'person',
  },
  {
    name: 'Wolfgang Haider',
    _id: 'fcdb6b06-d07e-4ff8-b56e-b79be7798da2',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.292Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.292Z',
    },
    tagType: 'person',
  },
  {
    name: 'Brigita Jurisic',
    _id: '0e2d0dbf-1a2e-482a-88fc-1b27de52bb07',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.291Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.291Z',
    },
    tagType: 'person',
  },
  {
    name: 'George Plevris',
    _id: '4a75cf16-3b7b-4f39-bcd1-7aa94e0bce6f',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.290Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.290Z',
    },
    tagType: 'person',
  },
  {
    name: 'Elena Aminova',
    _id: '0be7e188-b098-49ad-815a-d3635746f787',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.289Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.289Z',
    },
    tagType: 'person',
  },
  {
    name: 'luena collini',
    _id: '5ea7c3c6-0ccb-4efc-aae0-c9b952570f9c',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.288Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.288Z',
    },
    tagType: 'person',
  },
  {
    name: 'Jimena Califa',
    _id: 'd833c4a9-6b3b-48e8-8610-89e947f21ac2',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.287Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.287Z',
    },
    tagType: 'person',
  },
  {
    name: 'Max Priebe',
    _id: 'bc9903dd-cd64-45c5-b4ca-b71f89a439db',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.286Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.286Z',
    },
    tagType: 'person',
  },
  {
    name: 'Emma Coroler',
    _id: 'f26c0884-2153-48c5-9a18-c60a191d75f0',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.285Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.285Z',
    },
    tagType: 'person',
  },
  {
    name: 'cvanhees',
    _id: 'bf8be90e-4867-4cb0-88c7-808d165f4488',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.284Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.284Z',
    },
    tagType: 'person',
  },
  {
    name: 'Ana-Maria Roata',
    _id: '09c369e3-426b-4154-9b8a-d0ec0d06e2c3',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.283Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.283Z',
    },
    tagType: 'person',
  },
  {
    name: 'Jeroen de Jong',
    _id: '8036baeb-b879-46e1-84ef-ac1d3c577b79',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.282Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.282Z',
    },
    tagType: 'person',
  },
  {
    name: 'Daniel Ferreira',
    _id: '286412e1-f4ba-4fce-8c6c-fbe82ff53747',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.281Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.281Z',
    },
    tagType: 'person',
  },
  {
    name: 'Shreya Thakkar',
    _id: '6b12b8ab-023a-4d0f-83b2-abea0448bbe8',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.280Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.280Z',
    },
    tagType: 'person',
  },
  {
    name: 'Marinella Ferrari',
    _id: '20d3c3db-65d2-4e7b-9972-ec585ac3ce5e',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.279Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.279Z',
    },
    tagType: 'person',
  },
  {
    name: 'Rainer Quitzow',
    _id: '04affdc8-35db-4387-b1a0-7b5dd02c2f91',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.278Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.278Z',
    },
    tagType: 'person',
  },
  {
    name: 'Michael Brugger',
    _id: 'fb45f359-b384-4a21-95c9-f1534da0db71',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.277Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.277Z',
    },
    tagType: 'person',
  },
  {
    name: 'Ellery Studio',
    _id: '93ab0763-2778-4a31-9688-97ed36856a60',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.276Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.276Z',
    },
    tagType: 'person',
  },
  {
    name: 'Francisco Alcaide-Monterrubio',
    _id: 'd3aa4017-8c26-4e78-93e9-24a1942237df',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.275Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.275Z',
    },
    tagType: 'person',
  },
  {
    name: 'Kaisa Lähteenmäki-Smith',
    _id: 'ed9be7ac-b22a-4d1a-917c-6e136e75765e',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.274Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.274Z',
    },
    tagType: 'person',
  },
  {
    name: 'Amber Desprets',
    _id: 'dde067ab-a208-4545-99b4-f3ce8992fa8f',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.273Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.273Z',
    },
    tagType: 'person',
  },
  {
    name: 'Sandra Fernandes',
    _id: 'a3dbd6e5-8a1a-4dd6-9836-f9dc2c5967fe',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.272Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.272Z',
    },
    tagType: 'person',
  },
  {
    name: 'Estefania Cristina Simon Sasyk',
    _id: '7912d2f9-d4c2-4b98-ae45-288561f85436',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.271Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.271Z',
    },
    tagType: 'person',
  },
  {
    name: 'Lorenz Erdmann',
    _id: 'f458e644-06ba-43b9-84ea-9bc97243b151',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.270Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.270Z',
    },
    tagType: 'person',
  },
  {
    name: 'António Eugénio',
    _id: '92cb97a0-9b23-423c-9d71-8bbb5579fb7e',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.269Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.269Z',
    },
    tagType: 'person',
  },
  {
    name: 'Stefan Muench',
    _id: '9e26c301-3c04-4043-bbbd-b614e4725123',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.268Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.268Z',
    },
    tagType: 'person',
  },
  {
    name: 'Sirkku Juhola',
    _id: 'c3e5dc6e-74a6-494d-b0a0-876db817e4cd',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.267Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.267Z',
    },
    tagType: 'person',
  },
  {
    name: 'Ķùps Mahñ',
    _id: 'ad5e08ba-956b-47ed-97da-4297e7298c58',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.266Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.266Z',
    },
    tagType: 'person',
  },
  {
    name: 'sietske Veenman',
    _id: '38370674-54cc-4404-ad53-bc2af7ab1bd0',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.265Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.265Z',
    },
    tagType: 'person',
  },
  {
    name: 'Rene von schomberg',
    _id: '75f837ad-c742-409b-b0e2-1128ee09f621',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.264Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.264Z',
    },
    tagType: 'person',
  },
  {
    name: 'Kacper Nosarzewski',
    _id: 'd5752311-737c-496c-8281-442602c78276',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.263Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.263Z',
    },
    tagType: 'person',
  },
  {
    name: 'isabelle hippolyte',
    _id: '23eee606-b68c-40b2-bc95-9714d0d0b439',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.262Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.262Z',
    },
    tagType: 'person',
  },
  {
    name: 'Andrzej Klimczuk',
    _id: 'f9d322e8-b9d1-411b-ba0f-7db1dafea071',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.261Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.261Z',
    },
    tagType: 'person',
  },
  {
    name: 'Hanna Jertz',
    _id: '04344b33-e637-43f4-832f-7da7bbbf9413',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.260Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.260Z',
    },
    tagType: 'person',
  },
  {
    name: 'Sandra Türk',
    _id: '81993ad6-a1e1-47db-85bf-33b2625f78d1',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.259Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.259Z',
    },
    tagType: 'person',
  },
  {
    name: 'Viorica Boaghi',
    _id: '1db633f0-e410-415a-b409-dc67077e900f',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.258Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.258Z',
    },
    tagType: 'person',
  },
  {
    name: 'Dimitris  Dimitriadis',
    _id: '43e2e70b-b28c-4237-a45e-586d1fbe761b',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.257Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.257Z',
    },
    tagType: 'person',
  },
  {
    name: 'Elena Amber',
    _id: '4651ffac-a40e-430a-a41b-adef0f1288a3',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.256Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.256Z',
    },
    tagType: 'person',
  },
  {
    name: 'Marjory Tucker',
    _id: 'a406308d-8dfa-4e5e-9909-07381c033220',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.255Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.255Z',
    },
    tagType: 'person',
  },
  {
    name: 'Sven-Volker Rehm',
    _id: '8e3c7a20-d53c-46dd-a01a-ea51cf04b7d1',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.254Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.254Z',
    },
    tagType: 'person',
  },
  {
    name: 'Steve Earl',
    _id: 'ce6b156b-83a7-4857-b9dc-4c72865b5699',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.253Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.253Z',
    },
    tagType: 'person',
  },
  {
    name: 'Le Aventurine',
    _id: 'e4664ebd-ce5e-44ed-aef4-17361500d3f6',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.252Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.252Z',
    },
    tagType: 'person',
  },
  {
    name: 'ralucaciobotaru7',
    _id: '092f3e3c-d3bd-45bb-aaff-b21fad8a612b',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.251Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.251Z',
    },
    tagType: 'person',
  },
  {
    name: 'Alberto Campos',
    _id: '2d9c9117-0e3b-4dee-acfd-16937a02bdfb',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.250Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.250Z',
    },
    tagType: 'person',
  },
  {
    name: 'Rosa Berndt',
    _id: 'fd90b55d-03fb-4207-be04-fad841db3074',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.249Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.249Z',
    },
    tagType: 'person',
  },
  {
    name: 'Anne Arvonen',
    _id: '698c44f6-3fbd-4801-b107-726b6287699e',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.248Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.248Z',
    },
    tagType: 'person',
  },
  {
    name: 'Elena Artiles Leyes',
    _id: '91c70b82-4115-417f-8ecf-a93eee2c74f1',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.247Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.247Z',
    },
    tagType: 'person',
  },
  {
    name: 'Seniha Gurban',
    _id: '304f0988-41a4-4d93-9518-debbe30bfa7b',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.246Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.246Z',
    },
    tagType: 'person',
  },
  {
    name: 'Dr Ronald Bradfield',
    _id: '211241aa-d4ba-4374-b71d-9bce8119cd9c',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.245Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.245Z',
    },
    tagType: 'person',
  },
  {
    name: 'Suzanne Whitby',
    _id: 'a2dc1b83-1118-4c25-b6da-59837b105797',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.244Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.244Z',
    },
    tagType: 'person',
  },
  {
    name: 'Sabine Hafner-Zimmermann',
    _id: 'a95cb141-c118-4566-801d-1074ab26221b',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.243Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.243Z',
    },
    tagType: 'person',
  },
  {
    name: 'Akis Kalamaras',
    _id: '3830521f-08d9-4a0a-b07d-4104dcf59139',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.242Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.242Z',
    },
    tagType: 'person',
  },
  {
    name: 'Sanja  Mancheva',
    _id: 'f6a6f042-6364-4bac-97f4-2bfa13f02b0b',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.241Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.241Z',
    },
    tagType: 'person',
  },
  {
    name: 'Vanja Karadzic',
    _id: '707fa5b5-dfc2-42b6-ae9a-1076f7b8a404',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.240Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.240Z',
    },
    tagType: 'person',
  },
  {
    name: 'Karol Wasilewski',
    _id: '8e7514a5-5d47-41fd-88ec-c55829a4cf27',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.239Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.239Z',
    },
    tagType: 'person',
  },
  {
    name: 'Daouia Chalali',
    _id: '8c0461d2-b8a9-4933-aec2-9df3a4724809',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.238Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.238Z',
    },
    tagType: 'person',
  },
  {
    name: 'Sofia Ferreira Fernandes',
    _id: '4d498706-47ab-4e97-810c-39c64a3c6737',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.237Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.237Z',
    },
    tagType: 'person',
  },
  {
    name: 'Kety Caceres Falcon',
    _id: '3a2dcc08-0e94-4390-bda7-09d44a60c13b',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.236Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.236Z',
    },
    tagType: 'person',
  },
  {
    name: 'Susanne Giesecke',
    _id: 'e0e6a5ef-ae5b-46e6-8e95-71c625b7f4c2',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.235Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.235Z',
    },
    tagType: 'person',
  },
  {
    name: 'Anne Madelin',
    _id: '1a2dc129-f373-4105-8312-5a567a687ca1',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.234Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.234Z',
    },
    tagType: 'person',
  },
  {
    name: 'Sophie Hechinger',
    _id: '94b59b44-952a-4f80-a815-c3eec2473cd2',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.233Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.233Z',
    },
    tagType: 'person',
  },
  {
    name: 'Paola Derudas ',
    _id: '00d5aa66-3b8d-4de5-9e0b-a2fc609bd75b',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.232Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.232Z',
    },
    tagType: 'person',
  },
  {
    name: 'Peter Spyns',
    _id: '4c7f57a1-409a-4324-a940-f389c797552c',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.231Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.231Z',
    },
    tagType: 'person',
  },
  {
    name: 'Ann Odell',
    _id: 'b7159bb0-921f-42ce-ac0c-ed9a2d8401d7',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.230Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.230Z',
    },
    tagType: 'person',
  },
  {
    name: 'Ioana Adochiei',
    _id: 'a0b9dcc5-b049-4bff-83e7-4813379065ff',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.229Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.229Z',
    },
    tagType: 'person',
  },
  {
    name: 'NIKOLETTA KOTRONAROU',
    _id: '06d5f976-4f0b-4a7d-bc82-9cee67e828e7',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.228Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.228Z',
    },
    tagType: 'person',
  },
  {
    name: 'Daniel Peterson',
    _id: '1bba2f2e-80e5-4ffe-9b07-7c64a1bc5481',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.227Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.227Z',
    },
    tagType: 'person',
  },
  {
    name: 'Joaquin Crespo Martin',
    _id: 'ef60ec13-e15e-47fe-817d-0e867407b377',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.226Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.226Z',
    },
    tagType: 'person',
  },
  {
    name: 'Elena Maffia',
    _id: '278c6815-b701-4564-b806-d60050e37f90',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.225Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.225Z',
    },
    tagType: 'person',
  },
  {
    name: 'Adam Barry',
    _id: 'fad60847-850c-45d5-be6c-658f791a12fd',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.224Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.224Z',
    },
    tagType: 'person',
  },
  {
    name: 'Aleksey Lipaev',
    _id: 'c96fb8bb-7dce-4922-b84c-e64d2c90582e',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.223Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.223Z',
    },
    tagType: 'person',
  },
  {
    name: 'Mikkel Knudsen',
    _id: 'bb6d79aa-1062-45eb-b889-1f509e9db78d',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.222Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.222Z',
    },
    tagType: 'person',
  },
  {
    name: 'Maria Santos',
    _id: '0a827fb3-b8ac-4cb3-bf55-090801158e69',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.221Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.221Z',
    },
    tagType: 'person',
  },
  {
    name: 'Alexandra-Elena Vitel',
    _id: 'a16ccad5-7020-406f-a9c6-cfae3d3b2793',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.220Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.220Z',
    },
    tagType: 'person',
  },
  {
    name: 'Dariusz Kozdra',
    _id: '2205216a-e596-4b9e-b26b-bc36f86e18ee',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.219Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.219Z',
    },
    tagType: 'person',
  },
  {
    name: 'Patrick van der Duin',
    _id: 'c3488433-0826-47ef-afc8-c7dbdccee44e',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.218Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.218Z',
    },
    tagType: 'person',
  },
  {
    name: 'Audrey Béthinger',
    _id: '79e63e67-58b1-4b8d-b67a-e125d7fbc078',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.217Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.217Z',
    },
    tagType: 'person',
  },
  {
    name: 'Polle van Duuren',
    _id: '3b2a4889-c709-4829-a52e-6e07df2691c7',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.216Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.216Z',
    },
    tagType: 'person',
  },
  {
    name: 'Mike Parr',
    _id: 'f589cd7a-6f60-4c92-8c14-55f3336c8a14',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.215Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.215Z',
    },
    tagType: 'person',
  },
  {
    name: 'Dina Ashour',
    _id: '6b85900f-4865-4592-a851-45e25bd54445',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.214Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.214Z',
    },
    tagType: 'person',
  },
  {
    name: 'Alba Alba',
    _id: 'de499780-c8b7-4a1d-aa83-ab6bbb6727ef',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.213Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.213Z',
    },
    tagType: 'person',
  },
  {
    name: 'Philipp Brugner',
    _id: '240ff619-b5fe-45aa-b0b2-2882fa0a8852',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.212Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.212Z',
    },
    tagType: 'person',
  },
  {
    name: 'Renata Mandzhieva',
    _id: 'c14502d0-370d-4a94-b770-63ab1ddfc168',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.211Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.211Z',
    },
    tagType: 'person',
  },
  {
    name: 'rosabeckmann',
    _id: '3146f090-130a-4e41-84df-5f97013e6d5b',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.210Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.210Z',
    },
    tagType: 'person',
  },
  {
    name: 'Gerjon Ikink',
    _id: '71539769-048a-4604-ab6a-cba916cbd156',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.209Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.209Z',
    },
    tagType: 'person',
  },
  {
    name: 'Greta Hauer',
    _id: 'f21269cf-fc17-42d5-83dd-09fb2e70fcee',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.208Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.208Z',
    },
    tagType: 'person',
  },
  {
    name: 'Maria Comes Navarro',
    _id: '806dd084-a19d-4272-af47-51f484b05da8',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.207Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.207Z',
    },
    tagType: 'person',
  },
  {
    name: 'Ioana Marin',
    _id: '76849ad9-eeb7-4275-832d-918235b82b34',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.206Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.206Z',
    },
    tagType: 'person',
  },
  {
    name: 'Aleksander Valjamae',
    _id: '4fb1518b-64c9-4432-8f52-2927e14a2abb',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.205Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.205Z',
    },
    tagType: 'person',
  },
  {
    name: 'ENRIC BAS',
    _id: '7950d608-f7cc-4d81-babb-f4dfe55d0a57',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.204Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.204Z',
    },
    tagType: 'person',
  },
  {
    name: 'Matthias Weber',
    _id: 'b2da7e9b-60e0-4b13-853e-be09bf09b96a',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.203Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.203Z',
    },
    tagType: 'person',
  },
  {
    name: 'Vlad Enache',
    _id: 'ce71edfb-4ec5-464f-949d-1fb70140dccd',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.202Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.202Z',
    },
    tagType: 'person',
  },
  {
    name: 'Marina Costa lobo',
    _id: '73806d74-a330-4da8-9957-758d7e27583c',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.201Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.201Z',
    },
    tagType: 'person',
  },
  {
    name: 'Maciej Krzysztofowicz',
    _id: 'fbae3b6f-7629-4661-8cbf-6f49b1653601',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.200Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.200Z',
    },
    tagType: 'person',
  },
  {
    name: 'Melissa Levaillant',
    _id: '7d36f0cb-a80b-4314-b2de-39aec546b857',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.199Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.199Z',
    },
    tagType: 'person',
  },
  {
    name: 'Marta Jalšovec',
    _id: 'e4a60991-3654-48ba-adc4-59c19b40fa62',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.198Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.198Z',
    },
    tagType: 'person',
  },
  {
    name: 'Tereza Kochova',
    _id: '3da0ef6a-5300-4f59-b39a-6894c555646e',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.197Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.197Z',
    },
    tagType: 'person',
  },
  {
    name: 'Theo Zacharis',
    _id: '8642381a-7b49-45d9-9314-77d92486db3e',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.196Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.196Z',
    },
    tagType: 'person',
  },
  {
    name: 'Dimitris Kosmidis',
    _id: '94415543-d5b8-4e9f-8adb-1105f0b1b674',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.195Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.195Z',
    },
    tagType: 'person',
  },
  {
    name: 'Maria Pettersson',
    _id: 'e3e8f553-d822-48b9-8b6c-9878b4e12ccf',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.194Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.194Z',
    },
    tagType: 'person',
  },
  {
    name: 'paavo.lammert',
    _id: 'c2088690-b054-4021-9d1f-d6c13e3fd2c9',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.193Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.193Z',
    },
    tagType: 'person',
  },
  {
    name: 'Diana Stafie',
    _id: 'f1306486-d650-4562-8944-02b79bcc9ee3',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.192Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.192Z',
    },
    tagType: 'person',
  },
  {
    name: 'Juan Luis Valero',
    _id: '5af3aaad-d612-417e-804f-66f88c065f9b',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.191Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.191Z',
    },
    tagType: 'person',
  },
  {
    name: 'Jantje Meinzer',
    _id: '19875510-93c1-4c14-9390-1ca7b085889e',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.190Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.190Z',
    },
    tagType: 'person',
  },
  {
    name: 'Adam Lazarski',
    _id: 'a27891e9-0746-437b-a08b-0b163db61dfc',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.189Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.189Z',
    },
    tagType: 'person',
  },
  {
    name: 'kerstin.cuhls',
    _id: 'd370618b-7a98-4073-b4db-8fcfaae2da0e',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.188Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.188Z',
    },
    tagType: 'person',
  },
  {
    name: 'Gokhan Gokmen',
    _id: '38f407c1-fe79-471f-85d9-b389fc3ce228',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.187Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.187Z',
    },
    tagType: 'person',
  },
  {
    name: 'Petr Matolin',
    _id: 'b6450586-a78f-4a57-9358-cccf164d9a22',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.186Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.186Z',
    },
    tagType: 'person',
  },
  {
    name: 'info434710',
    _id: 'ee844c1c-d805-436c-b2a7-4bf3f8e87deb',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.185Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.185Z',
    },
    tagType: 'person',
  },
  {
    name: 'Eliza Savvopoulou',
    _id: 'c73438ff-0e92-4619-84b6-8ef01d6cb3f8',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.184Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.184Z',
    },
    tagType: 'person',
  },
  {
    name: 'Ana Ruiz Moreno',
    _id: '84962a09-475b-43c5-ac2b-a6a25a5353b2',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.183Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.183Z',
    },
    tagType: 'person',
  },
  {
    name: 'Carlos Manuel Coutinho Rodrigues',
    _id: '03ff04ee-6f9d-4f97-921e-d7ff239329ef',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.182Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.182Z',
    },
    tagType: 'person',
  },
  {
    name: 'Susana Garayoa',
    _id: '15958458-750f-4bfa-ba6d-5379d1cee7ba',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.181Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.181Z',
    },
    tagType: 'person',
  },
  {
    name: 'Vitalii Stoliarchuk',
    _id: '7d06ba05-43bc-4a7d-ab5d-1a28d5e29cac',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.180Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.180Z',
    },
    tagType: 'person',
  },
  {
    name: 'Juha Kaskinen',
    _id: 'a091dfa9-fdfe-4bbd-be7d-63394360f6ba',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.179Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.179Z',
    },
    tagType: 'person',
  },
  {
    name: 'Amaleehah Aslam-Forrester',
    _id: 'dffe04e8-5996-422d-a6f1-2c6d025ac1b1',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.178Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.178Z',
    },
    tagType: 'person',
  },
  {
    name: 'Futures4Europe Admin',
    _id: '57ff1ca7-69ef-4a7c-aef4-7bb76127c5bf',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.177Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.177Z',
    },
    tagType: 'person',
  },
  {
    name: 'Marina Dias',
    _id: '3e7ac87c-91a8-451a-ace3-9d842436f400',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.176Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.176Z',
    },
    tagType: 'person',
  },
  {
    name: 'Stefano Cominelli',
    _id: 'fff3f069-fd35-4345-b14c-bd8eaf6678f8',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.175Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.175Z',
    },
    tagType: 'person',
  },
  {
    name: 'laura danilaviciute',
    _id: 'c9d7d759-2bfe-465f-800c-36a574673809',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.174Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.174Z',
    },
    tagType: 'person',
  },
  {
    name: 'Desmond Mansfield',
    _id: '41049494-2f39-435c-a67b-0f616fcbbdff',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.173Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.173Z',
    },
    tagType: 'person',
  },
  {
    name: 'Anders Kamp Høst',
    _id: '607852bd-b5e5-42dd-bc2f-747c29e0cc7c',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.172Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.172Z',
    },
    tagType: 'person',
  },
  {
    name: 'Alexandros Georganas',
    _id: 'b8576519-3881-49bf-b90c-6a9dca0e9c78',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.171Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.171Z',
    },
    tagType: 'person',
  },
  {
    name: 'Bruna De Marchi',
    _id: '4fd97ebe-3505-46ab-b296-d41ba7b00dc2',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.170Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.170Z',
    },
    tagType: 'person',
  },
  {
    name: 'Dr. Attila Havas',
    _id: '63fd4e4a-559f-47e3-8b1b-59c443e7587e',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.169Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.169Z',
    },
    tagType: 'person',
  },
  {
    name: 'Rasmus Wiinstedt Tscherning',
    _id: '392e8a47-98c8-4a73-84c8-708dab840257',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.168Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.168Z',
    },
    tagType: 'person',
  },
  {
    name: 'Mikhail Pisani',
    _id: 'f0b8a4f0-8ad9-4ffe-9128-3173b8fced17',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.167Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.167Z',
    },
    tagType: 'person',
  },
  {
    name: 'Liisa Ukonmaanaho',
    _id: 'b6790ae0-105e-4413-a622-54bb88e6f95f',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.166Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.166Z',
    },
    tagType: 'person',
  },
  {
    name: 'Melissa  Ingaruca Moreno',
    _id: '5fb2ff9f-278e-4e1a-8686-d3728cf41ae3',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.165Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.165Z',
    },
    tagType: 'person',
  },
  {
    name: 'Pascale Junker',
    _id: 'd9f12415-a333-4626-b37f-a3967cde1ab7',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.164Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.164Z',
    },
    tagType: 'person',
  },
  {
    name: 'Thays Prado',
    _id: '6f9c70fd-e9c5-42bf-b880-fa7794cfbd90',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.163Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.163Z',
    },
    tagType: 'person',
  },
  {
    name: 'Jenny Sjöblom',
    _id: 'e2f723ad-8e94-4f2c-be14-12dab611ab2d',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.162Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.162Z',
    },
    tagType: 'person',
  },
  {
    name: 'Elsbeth Bembom',
    _id: '7aab894a-ce8f-4b9f-8226-37c396847581',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.161Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.161Z',
    },
    tagType: 'person',
  },
  {
    name: 'Dr Colin Russo',
    _id: '99a2e5cd-ba81-4f22-be0d-894a9cf630f5',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.160Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.160Z',
    },
    tagType: 'person',
  },
  {
    name: 'rosanna fornasiero',
    _id: '687c702c-c822-4808-a9ca-131411738705',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.159Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.159Z',
    },
    tagType: 'person',
  },
  {
    name: 'Rafael Popper',
    _id: '71feed1e-5151-45af-ad7d-13d9d4aabc04',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.158Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.158Z',
    },
    tagType: 'person',
  },
  {
    name: 'Mika Nieminen',
    _id: 'e7f65c58-1691-4355-9dbf-2ffb4b271c6d',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.157Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.157Z',
    },
    tagType: 'person',
  },
  {
    name: 'maia kim',
    _id: '4b8e184c-e892-4fb0-964f-2d1910fb19d2',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.156Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.156Z',
    },
    tagType: 'person',
  },
  {
    name: 'Philippe Destatte',
    _id: 'd6b361ab-b1fd-4910-ae40-115c4a971717',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.155Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.155Z',
    },
    tagType: 'person',
  },
  {
    name: 'Effie Amanatidou',
    _id: '7761c491-0adc-4c2f-aa91-599a3699f3fa',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.154Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.154Z',
    },
    tagType: 'person',
  },
  {
    name: 'Chloe Jerrard',
    _id: '71fcf79e-a2cb-4e63-b703-d1cd0061032d',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.153Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.153Z',
    },
    tagType: 'person',
  },
  {
    name: 'Lisa Szugfil',
    _id: 'd7d5bc23-3794-4cd0-ac3f-33026b543c5e',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.152Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.152Z',
    },
    tagType: 'person',
  },
  {
    name: 'Marcos Álvarez Díaz',
    _id: '3d15803b-8480-468d-a1c0-c17876538d9b',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.151Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.151Z',
    },
    tagType: 'person',
  },
  {
    name: 'Rose Capdevila',
    _id: '47a87ce2-d89b-43bd-9969-dbaf26164433',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.150Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.150Z',
    },
    tagType: 'person',
  },
  {
    name: 'Riitta Nieminen',
    _id: '8229119a-86bb-43b3-b043-870a3dea7e50',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.149Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.149Z',
    },
    tagType: 'person',
  },
  {
    name: 'Lukas Jung',
    _id: '40847f63-5921-44db-a32b-e1d786b24edc',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.148Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.148Z',
    },
    tagType: 'person',
  },
  {
    name: 'Iryna Gerasymenko ',
    _id: '3ef549aa-a683-4056-8eff-f213edf8d511',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.147Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.147Z',
    },
    tagType: 'person',
  },
  {
    name: 'Pascal Sanders',
    _id: '4352b8cf-bea6-4733-919e-623f50f77a3e',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.146Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.146Z',
    },
    tagType: 'person',
  },
  {
    name: 'Anna Kirstgen',
    _id: 'd94779f1-3350-4518-9418-3a214ea3d733',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.145Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.145Z',
    },
    tagType: 'person',
  },
  {
    name: 'Aksinya Samoylova',
    _id: '26f96655-ea55-451e-bad3-b2356c3c5ffe',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.144Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.144Z',
    },
    tagType: 'person',
  },
  {
    name: 'Cristina Plescan',
    _id: 'd5357589-65fd-456f-a506-7a4d1275451c',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.143Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.143Z',
    },
    tagType: 'person',
  },
  {
    name: 'Marco Letizi',
    _id: 'c2a6e29b-cd9a-48d7-b02d-48dd10ec8d11',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.142Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.142Z',
    },
    tagType: 'person',
  },
  {
    name: 'Heila Lotz-Sisitka',
    _id: '71069e4a-dfc4-453e-a365-d069fb170505',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.141Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.141Z',
    },
    tagType: 'person',
  },
  {
    name: 'SANDRA MARTINEZ',
    _id: 'c9476d12-5e62-4629-a511-f4b48bbcd08a',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.140Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.140Z',
    },
    tagType: 'person',
  },
  {
    name: 'Laurène Thil',
    _id: '1ffb1a7b-1050-41e0-9ca0-3f2374ff8fe0',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.139Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.139Z',
    },
    tagType: 'person',
  },
  {
    name: 'Klaudia Palczak',
    _id: 'dae18ea7-81b7-4005-96d0-8da8dea307c6',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.138Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.138Z',
    },
    tagType: 'person',
  },
  {
    name: 'Hayley Trowbridge',
    _id: '891adab9-d98b-4c92-9584-f4c10cc50a20',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.137Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.137Z',
    },
    tagType: 'person',
  },
  {
    name: 'Catalina Martinez',
    _id: '19a3a539-74c9-4904-86ec-3eef3dbbb3db',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.136Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.136Z',
    },
    tagType: 'person',
  },
  {
    name: 'Lucia Vesnic-Alujevic',
    _id: '7eb328bb-2d48-4581-a859-1fc0a79a06f3',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.135Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.135Z',
    },
    tagType: 'person',
  },
  {
    name: 'Adelina Dabu',
    _id: 'a0d2a0a9-900b-4fa3-af77-50d32949aa3a',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.134Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.134Z',
    },
    tagType: 'person',
  },
  {
    name: 'Elli Tzatzanis-Stepanovic',
    _id: '5c556a5c-0356-4548-aa6d-a5b281a955e6',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.133Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.133Z',
    },
    tagType: 'person',
  },
  {
    name: 'Irene Ropolo',
    _id: 'f6b5d136-0780-4401-ada9-7948de38e0df',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.132Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.132Z',
    },
    tagType: 'person',
  },
  {
    name: 'Pranjul Shah',
    _id: 'd1b70590-b619-4a3c-b211-e2ac5c4b9187',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.131Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.131Z',
    },
    tagType: 'person',
  },
  {
    name: 'Eckhard Störmer',
    _id: 'c424635c-1674-4a31-ab09-1e71e97210f4',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.130Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.130Z',
    },
    tagType: 'person',
  },
  {
    name: 'Fernando Almeida',
    _id: 'dd75ff79-75b0-4d07-978f-51ed3b2f04fd',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.129Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.129Z',
    },
    tagType: 'person',
  },
  {
    name: 'Mateus Panizzon',
    _id: 'd6b412b0-69d4-40e3-b909-b57a0817110b',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.128Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.128Z',
    },
    tagType: 'person',
  },
  {
    name: 'Marie Sophie Müller',
    _id: '7b0bacae-f25b-4199-850d-808227d23245',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.127Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.127Z',
    },
    tagType: 'person',
  },
  {
    name: 'Mihaela Rata',
    _id: '1d18f304-fa36-45e4-9c58-b4f418bdb071',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.126Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.126Z',
    },
    tagType: 'person',
  },
  {
    name: 'Mariagrazia Berardi',
    _id: '6c120ae2-1978-468d-9820-d3ddbc12617c',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.125Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.125Z',
    },
    tagType: 'person',
  },
  {
    name: 'Caitlin McDonald',
    _id: 'e8d86a97-fa99-4992-94f2-6a398696a4a6',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.124Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.124Z',
    },
    tagType: 'person',
  },
  {
    name: 'Umut Turksen',
    _id: '226a105d-5c46-4c60-93c0-0443b2e1dee4',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.123Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.123Z',
    },
    tagType: 'person',
  },
  {
    name: 'Sabina Mihailescu',
    _id: '63e5d19d-eb35-481e-a957-0d5d71feb1c5',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.122Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.122Z',
    },
    tagType: 'person',
  },
  {
    name: 'Epaminondas Christophilopoulos',
    _id: 'a9b64019-f422-4384-b1fa-f7e32d1d2c28',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.121Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.121Z',
    },
    tagType: 'person',
  },
  {
    name: 'Julian Joachim',
    _id: '369ae190-ef79-4599-b070-52e0eb19bd16',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.120Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.120Z',
    },
    tagType: 'person',
  },
  {
    name: 'Laurent Bontoux',
    _id: '0501aa04-a7f3-4acc-a2cf-c63fd8ab88a7',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.119Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.119Z',
    },
    tagType: 'person',
  },
  {
    name: 'Peggy Kelterborn',
    _id: '3813b3ac-3b7b-4a05-b0ab-c08f107bd20e',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.118Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.118Z',
    },
    tagType: 'person',
  },
  {
    name: 'Dominik Hajduk',
    _id: 'f8c9edd6-70d9-4211-b41e-c82003dee13d',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.117Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.117Z',
    },
    tagType: 'person',
  },
  {
    name: 'Kezia Barker',
    _id: '32e27dcf-4571-4056-8de1-720527c0dd16',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.116Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.116Z',
    },
    tagType: 'person',
  },
  {
    name: 'Sarah Rozenberg',
    _id: '498ef2cd-60e9-4f97-9ea1-beac2223b87e',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.115Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.115Z',
    },
    tagType: 'person',
  },
  {
    name: 'millan Myra',
    _id: 'af1fcc9d-cbdd-482e-a9a0-f2bf1aa71df4',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.114Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.114Z',
    },
    tagType: 'person',
  },
  {
    name: 'Nicole Anne Kahn Parreño',
    _id: '06f87866-70a0-4f02-b93e-19978941700c',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.113Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.113Z',
    },
    tagType: 'person',
  },
  {
    name: 'Okamura Asako',
    _id: '4f4a2daf-a002-4681-8693-2a9bcb00b707',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.112Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.112Z',
    },
    tagType: 'person',
  },
  {
    name: 'Giuliana Sabbatini',
    _id: '03a24db6-81f6-4cf3-bf9f-ff00e5f53155',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.111Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.111Z',
    },
    tagType: 'person',
  },
  {
    name: 'Holger NItsch',
    _id: '5f31d04f-8c20-4ead-ba33-674febfa771f',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.110Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.110Z',
    },
    tagType: 'person',
  },
  {
    name: 'Yannick Lenormand',
    _id: '98ff7958-11d6-442b-a781-a6038798cf6e',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.109Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.109Z',
    },
    tagType: 'person',
  },
  {
    name: 'Milena  Stefanova',
    _id: '23c7ea37-4873-4a3a-b02b-0d77292e5300',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.108Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.108Z',
    },
    tagType: 'person',
  },
  {
    name: 'Aistė Jotautytė',
    _id: '4654badd-ac2c-4b48-bf0a-22fbd88c95f5',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.107Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.107Z',
    },
    tagType: 'person',
  },
  {
    name: 'Lakin Anderson',
    _id: 'de7cc27d-5701-41b7-ae68-549807777d9a',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.106Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.106Z',
    },
    tagType: 'person',
  },
  {
    name: 'Roman Noetzel',
    _id: '85d3d3cd-31b7-4b58-ba7d-5afad39b783c',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.105Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.105Z',
    },
    tagType: 'person',
  },
  {
    name: 'Klaus Kubeczko',
    _id: 'adf54c66-0a7c-48fc-bfb9-4bfb410f935e',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.104Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.104Z',
    },
    tagType: 'person',
  },
  {
    name: 'Aleksandr Sorokin',
    _id: 'f3132399-ad4f-4aea-8cde-6080e00d0eaa',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.103Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.103Z',
    },
    tagType: 'person',
  },
  {
    name: 'Brigitte Weiss',
    _id: 'df4f1154-17a1-4364-9ebf-72fbdb5522e8',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.102Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.102Z',
    },
    tagType: 'person',
  },
  {
    name: 'erica.bol',
    _id: 'f8b1a292-9a56-4e1b-9e30-6ce4abda4c4b',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.101Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.101Z',
    },
    tagType: 'person',
  },
  {
    name: 'Carsten Claus',
    _id: 'f71ed6bc-a574-4885-8751-6346a44ad953',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.100Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.100Z',
    },
    tagType: 'person',
  },
  {
    name: 'thomasarnold229',
    _id: 'fb1fab30-9258-4ff2-b526-728ce9441bb9',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.099Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.099Z',
    },
    tagType: 'person',
  },
  {
    name: 'Susanna Bottaro',
    _id: '62f977b6-e3ef-4f6b-906d-66e498dd0483',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.098Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.098Z',
    },
    tagType: 'person',
  },
  {
    name: 'hoyunshiang',
    _id: '169b1886-cfa1-4cd0-8b0f-7bac4b515769',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.097Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.097Z',
    },
    tagType: 'person',
  },
  {
    name: 'Natalia Bolocan',
    _id: '8dc219b7-f327-4ce4-a43b-31bab238cab2',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.096Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.096Z',
    },
    tagType: 'person',
  },
  {
    name: 'Elisabeta Florescu',
    _id: 'b3dfab7a-54fb-4ad5-8892-c26dbc0474fa',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.095Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.095Z',
    },
    tagType: 'person',
  },
  {
    name: 'Ľubomír Šottník',
    _id: '7ebd8950-b92d-40b2-bec9-8de202c88732',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.094Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.094Z',
    },
    tagType: 'person',
  },
  {
    name: 'Mayya Hristova',
    _id: 'b8f13c77-ea13-4281-841d-1e870961e6d1',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.093Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.093Z',
    },
    tagType: 'person',
  },
  {
    name: 'Nikolay Khlopov',
    _id: '073ad899-9de0-4973-b300-8ef41a582aed',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.092Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.092Z',
    },
    tagType: 'person',
  },
  {
    name: 'Manasi Kumbhat',
    _id: '870f7c19-dcad-487e-a259-a62914f29583',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.091Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.091Z',
    },
    tagType: 'person',
  },
  {
    name: 'NATASSA LADOPOULOU',
    _id: '774c2332-e4bf-40b6-8e12-6c79ada36c01',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.090Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.090Z',
    },
    tagType: 'person',
  },
  {
    name: 'Paulo Carvalho',
    _id: 'fdebc1b1-5676-4bcf-a578-15af4357ade3',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.089Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.089Z',
    },
    tagType: 'person',
  },
  {
    name: 'Katerina Klimoska',
    _id: '00e80048-df28-4a67-a6bc-4c49ed53d761',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.088Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.088Z',
    },
    tagType: 'person',
  },
  {
    name: 'Tanja Schindler',
    _id: 'a0902767-9069-4943-a6f8-f747f5de4fe6',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.087Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.087Z',
    },
    tagType: 'person',
  },
  {
    name: 'Anke Herodek',
    _id: '015275e8-f3e1-4da9-b198-838c82f9cb52',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.086Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.086Z',
    },
    tagType: 'person',
  },
  {
    name: 'Minna Takala',
    _id: 'd2d377d5-d3da-4c69-8224-286884a335bf',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.085Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.085Z',
    },
    tagType: 'person',
  },
  {
    name: 'Dana Wasserbacher',
    _id: '8789f421-e784-48fa-a8ad-e877e00d9e7f',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.084Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.084Z',
    },
    tagType: 'person',
  },
  {
    name: 'Purvisha Sutaria',
    _id: 'a33730ae-149c-475c-b291-e1b5edd05d0e',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.083Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.083Z',
    },
    tagType: 'person',
  },
  {
    name: 'Jürgen Wengel',
    _id: 'a228e000-3ba7-4f16-b952-feec243839d9',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.082Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.082Z',
    },
    tagType: 'person',
  },
  {
    name: 'Hanna-Miina Sihvonen',
    _id: '321605fa-eb29-4b8e-8691-0d4dea9c33d2',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.081Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.081Z',
    },
    tagType: 'person',
  },
  {
    name: 'Jennifer Gidley, PhD',
    _id: '95dda315-0717-4f53-b6a5-d8f4f79ce255',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.080Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.080Z',
    },
    tagType: 'person',
  },
  {
    name: 'Lukas Schreck',
    _id: '57b102f9-f556-4b6f-a52c-3971d651b6aa',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.079Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.079Z',
    },
    tagType: 'person',
  },
  {
    name: 'Rocco Scolozzi',
    _id: '5d910c58-6110-4ac7-8068-4edf41c8f168',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.078Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.078Z',
    },
    tagType: 'person',
  },
  {
    name: 'Antonia Mochan',
    _id: 'c3ab2ca6-655e-448b-b5e1-1f2f9fafa7a9',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.077Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.077Z',
    },
    tagType: 'person',
  },
  {
    name: 'Anh Tuan Hoang',
    _id: '297e93b1-f76e-4591-87e2-baa2f2234011',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.076Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.076Z',
    },
    tagType: 'person',
  },
  {
    name: 'Giovanna Guiffrè & Valentina Malcotti',
    _id: 'f7c991b5-30fb-4b37-a3ff-026aee1e7261',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.075Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.075Z',
    },
    tagType: 'person',
  },
  {
    name: 'António Alvarenga',
    _id: 'f030877c-cd1e-41a8-a5d5-3880596b38de',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.074Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.074Z',
    },
    tagType: 'person',
  },
  {
    name: 'Frank Kumli',
    _id: '1f3e626c-ff3a-4a0e-9fb7-55c0d7ea304e',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.073Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.073Z',
    },
    tagType: 'person',
  },
  {
    name: 'Nicola Francesco Dotti',
    _id: 'bb5c6a05-385d-4fb0-a5db-d932724e4c90',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.072Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.072Z',
    },
    tagType: 'person',
  },
  {
    name: 'Thomas Steinmüller',
    _id: '7e39b24a-329a-4c87-9382-6c60b8b671cd',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.071Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.071Z',
    },
    tagType: 'person',
  },
  {
    name: 'Mirko Boehm',
    _id: '2abdc1e6-4be0-453a-a588-233121611076',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.070Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.070Z',
    },
    tagType: 'person',
  },
  {
    name: 'Marcin Maciejewski',
    _id: '0da27a64-2b57-4cde-b6c0-32d06fc0822f',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.069Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.069Z',
    },
    tagType: 'person',
  },
  {
    name: 'Montse Ollés Roig',
    _id: '8cad5f46-be5f-4684-af2a-a29c02f56544',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.068Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.068Z',
    },
    tagType: 'person',
  },
  {
    name: 'Niels Jansen',
    _id: '4b9aa6ee-d2ed-4297-bc82-9168962c4b18',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.067Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.067Z',
    },
    tagType: 'person',
  },
  {
    name: 'Valentina Malcotti',
    _id: '2865017b-34f3-43e5-9a3e-129b48af5e04',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.066Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.066Z',
    },
    tagType: 'person',
  },
  {
    name: 'Robert Kuenzel',
    _id: 'b920497e-26f2-4366-abc2-d4e80300f76e',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.065Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.065Z',
    },
    tagType: 'person',
  },
  {
    name: 'Wenzel Mehnert',
    _id: 'dd9f9585-cf78-4878-8689-83bf270b5c25',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.064Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.064Z',
    },
    tagType: 'person',
  },
  {
    name: 'Liselott Bergman',
    _id: 'ac10ee18-cc73-4441-b54a-46a7d7fb99b0',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.063Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.063Z',
    },
    tagType: 'person',
  },
  {
    name: 'Dr. Hale Cide Demir',
    _id: '1fabb087-a30a-4ae4-8e06-5956a68d7146',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.062Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.062Z',
    },
    tagType: 'person',
  },
  {
    name: 'Stavros Mantzanakis',
    _id: '9c57460e-ceb5-4eac-88e2-987c58d21415',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.061Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.061Z',
    },
    tagType: 'person',
  },
  {
    name: 'Pedro Caballero-Lozano',
    _id: '93e67778-9980-4431-97b8-ac4f7f47c0dd',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.060Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.060Z',
    },
    tagType: 'person',
  },
  {
    name: 'Silvia Vicente-Oliva',
    _id: '3de0bfe8-ff40-49f7-bcc8-441dcb774021',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.059Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.059Z',
    },
    tagType: 'person',
  },
  {
    name: 'Masafumi Nishi',
    _id: '98dbf692-1c5a-47f2-8b35-238ed1fb1275',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.058Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.058Z',
    },
    tagType: 'person',
  },
  {
    name: 'Sirkku Juhola',
    _id: '3fdc1ca8-80b6-4de3-ab20-b9230b525f1f',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.057Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.057Z',
    },
    tagType: 'person',
  },
  {
    name: 'Neslihan ÖNDER ÖZDEMİR',
    _id: 'f76f5bd4-54a2-4751-8c8a-05d0bf961ab3',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.056Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.056Z',
    },
    tagType: 'person',
  },
  {
    name: 'Paul Werbos',
    _id: 'c559d4ba-a470-484c-8ed1-0822d0adc064',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.055Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.055Z',
    },
    tagType: 'person',
  },
  {
    name: 'Dr. MUSTAFA AYKUT',
    _id: '6387fb88-6f88-4470-bc65-ffa0727b7683',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.054Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.054Z',
    },
    tagType: 'person',
  },
  {
    name: 'Corina Murafa',
    _id: '1b7270c4-70ac-435f-be8f-0931dcbbe8b8',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.053Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.053Z',
    },
    tagType: 'person',
  },
  {
    name: 'Dace Paule',
    _id: '282604d5-2f19-450f-9a8c-a0a3a3190870',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.052Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.052Z',
    },
    tagType: 'person',
  },
  {
    name: 'yair sharan',
    _id: 'c8989116-4343-4333-a524-7f63880fe828',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.051Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.051Z',
    },
    tagType: 'person',
  },
  {
    name: 'Sebastian Planck',
    _id: '88187b3f-d080-4f32-9a3d-eac82491f7cf',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.050Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.050Z',
    },
    tagType: 'person',
  },
  {
    name: 'Joseph Caristena',
    _id: '6ad7239a-6809-45c9-b892-032d9c5bcc4b',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.049Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.049Z',
    },
    tagType: 'person',
  },
  {
    name: 'MOH AWN',
    _id: '79a3f266-e37e-4724-b903-b47dbb3849ef',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.048Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.048Z',
    },
    tagType: 'person',
  },
  {
    name: 'Christian Naczinsky',
    _id: '5e7fe82f-1d8f-46f4-99f2-51fc71268045',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.047Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.047Z',
    },
    tagType: 'person',
  },
  {
    name: 'Miguel Riviere',
    _id: '0efccbe3-ef78-41e9-9252-8d017d9d1d98',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.046Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.046Z',
    },
    tagType: 'person',
  },
  {
    name: 'Emer Mackle',
    _id: 'ab04402a-27cb-462e-8bb8-a5b663e8c95b',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.045Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.045Z',
    },
    tagType: 'person',
  },
  {
    name: 'Dietmar Lampert',
    _id: '98a93d9c-2c01-474a-8390-4a2d85ac836d',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.044Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.044Z',
    },
    tagType: 'person',
  },
  {
    name: 'Francisco Alcaide-Monterrubio',
    _id: '00a531a6-8574-4bdf-9179-a25f65ffad11',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.043Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.043Z',
    },
    tagType: 'person',
  },
  {
    name: 'Laura Galante',
    _id: '48d3cceb-daf6-4a26-bef0-c6d0254dda2e',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.042Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.042Z',
    },
    tagType: 'person',
  },
  {
    name: 'Friederike Riemer',
    _id: '00f9ba63-4b14-43cb-b155-1c80b2cf4e23',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.041Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.041Z',
    },
    tagType: 'person',
  },
  {
    name: 'Julia Backhaus',
    _id: '4d9eaff7-6c5c-424a-96e7-fdd38220ad05',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.040Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.040Z',
    },
    tagType: 'person',
  },
  {
    name: 'Judy Trimble',
    _id: 'f14483e4-0a6f-4925-85bc-06d6343c3b9f',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.039Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.039Z',
    },
    tagType: 'person',
  },
  {
    name: 'Peter Lund',
    _id: 'b8b618c7-b123-4a74-aa22-6aac7dfac295',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.038Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.038Z',
    },
    tagType: 'person',
  },
  {
    name: 'tanschin',
    _id: '43425a6f-b734-4bd4-9af7-706adda804ad',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.037Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.037Z',
    },
    tagType: 'person',
  },
  {
    name: 'Luk Van Langenhove',
    _id: '8580a943-5375-4017-b47b-28190d1d2b86',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.036Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.036Z',
    },
    tagType: 'person',
  },
  {
    name: 'Oliver Lauenstein',
    _id: '1b10f86c-e3b8-46bd-bf7c-2072fac072fe',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.035Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.035Z',
    },
    tagType: 'person',
  },
  {
    name: 'Gwendolyn Bailey',
    _id: 'c1ecb2f3-4ff0-4a64-9bb1-0fc1a766ca1a',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.034Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.034Z',
    },
    tagType: 'person',
  },
  {
    name: 'Virginia Kokiou',
    _id: '5cd6c042-aa6b-4e98-843d-b2b8ccb1b069',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.033Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.033Z',
    },
    tagType: 'person',
  },
  {
    name: 'Gabriel Mohora',
    _id: '587c61d8-3002-49ca-aeb6-922f4dc307a9',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.032Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.032Z',
    },
    tagType: 'person',
  },
  {
    name: 'Tatiana Efremenko',
    _id: '1b80c6c3-65ed-4bc8-83c8-3177af553019',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.031Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.031Z',
    },
    tagType: 'person',
  },
  {
    name: 'Valentina Garonzi',
    _id: 'c4c6b0f0-d160-4a32-8ab0-d91cdcd82b1b',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.030Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.030Z',
    },
    tagType: 'person',
  },
  {
    name: 'Marlène  de Saussure',
    _id: '83001109-bdb0-4714-9745-831d82445ff4',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.029Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.029Z',
    },
    tagType: 'person',
  },
  {
    name: 'Laura Galante',
    _id: 'a85401f5-5c20-44d0-8bec-385abf5b92b0',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.028Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.028Z',
    },
    tagType: 'person',
  },
  {
    name: 'Gavin Moore',
    _id: '8d23c6b7-e092-4b8f-b8f3-6c20055045dc',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.027Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.027Z',
    },
    tagType: 'person',
  },
  {
    name: 'Doris Alexander',
    _id: 'e52e8fdb-4f9a-4939-9e9d-632a97f5ae53',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.026Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.026Z',
    },
    tagType: 'person',
  },
  {
    name: 'Jeremie Fontana',
    _id: 'a4e77872-2d74-4f6b-890e-de586212f639',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.025Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.025Z',
    },
    tagType: 'person',
  },
  {
    name: 'Christoph Kehl',
    _id: '2bdb97f2-a1c5-400b-8547-7d9d8ef25529',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.024Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.024Z',
    },
    tagType: 'person',
  },
  {
    name: 'Duncan McLaren',
    _id: '2f537c12-9bb2-49fa-b250-3ee7d239d1d9',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.023Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.023Z',
    },
    tagType: 'person',
  },
  {
    name: 'Nicholas  Rowland ',
    _id: '17dabb68-f575-4b8f-a24a-922da910733a',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.022Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.022Z',
    },
    tagType: 'person',
  },
  {
    name: 'Bettina Maisch',
    _id: '865b6c58-c82e-4416-a1d4-67b65e3e6756',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.021Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.021Z',
    },
    tagType: 'person',
  },
  {
    name: 'Mariam Umarji',
    _id: '16e47948-c150-4912-8fe8-74d2097905c3',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.020Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.020Z',
    },
    tagType: 'person',
  },
  {
    name: 'Sandro Mendonça',
    _id: '186bd531-df77-454e-9277-b20d1cb5e6da',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.019Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.019Z',
    },
    tagType: 'person',
  },
  {
    name: 'Ulli Lorenz',
    _id: '28df7a1a-e2c0-49f3-a5e6-957b64a92fd6',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.018Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.018Z',
    },
    tagType: 'person',
  },
  {
    name: 'Kathrine Jensen',
    _id: 'ec2336a9-2e82-4420-b6eb-3dae67a3b2f0',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.017Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.017Z',
    },
    tagType: 'person',
  },
  {
    name: 'Alexandre Reznikow',
    _id: '73678678-3b3a-4e11-8518-a26d05653614',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.016Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.016Z',
    },
    tagType: 'person',
  },
  {
    name: 'Jonas Drechsel',
    _id: '35d59921-d71b-417d-87f3-cf34727b86f5',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.015Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.015Z',
    },
    tagType: 'person',
  },
  {
    name: ' Dimitris  Triantafyllidis ',
    _id: '3528fb39-d35c-4e48-ae5b-9d1e7efe5b42',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.014Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.014Z',
    },
    tagType: 'person',
  },
  {
    name: 'Masafumi Nishi',
    _id: '6790e90e-36b7-48b3-8c85-11abb9581b64',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.013Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.013Z',
    },
    tagType: 'person',
  },
  {
    name: 'Joao Farinha',
    _id: '85737a3f-039a-438b-8ab9-d1b8f6cba4cf',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.012Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.012Z',
    },
    tagType: 'person',
  },
  {
    name: 'Beth McEvoy',
    _id: '47543b32-2401-4d1e-af67-f09d1dffe930',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.011Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.011Z',
    },
    tagType: 'person',
  },
  {
    name: 'Zoi Molochidou',
    _id: '1ca0ab21-e6a2-4b3b-80eb-d803a4b384ac',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.010Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.010Z',
    },
    tagType: 'person',
  },
  {
    name: 'Thomas Roeck',
    _id: '8a9966e6-b6ae-47be-a156-ce2061e2d2f8',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.009Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.009Z',
    },
    tagType: 'person',
  },
  {
    name: 'Michal Pazour',
    _id: 'c9926e3a-b03d-4926-a35c-f79b75616186',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.008Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.008Z',
    },
    tagType: 'person',
  },
  {
    name: 'Kwinten Corluy',
    _id: '68159145-312a-4537-bd69-64b7774d7e16',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.007Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.007Z',
    },
    tagType: 'person',
  },
  {
    name: 'Dr. Dorothea Hamilton',
    _id: 'bddf0907-8507-4163-bc11-fc014e935bee',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.006Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.006Z',
    },
    tagType: 'person',
  },
  {
    name: 'Nir Levi',
    _id: '756860b4-3c09-40e9-bcdf-b1904fe3a18e',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.005Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.005Z',
    },
    tagType: 'person',
  },
  {
    name: 'PETER BISHOP',
    _id: '5ab8d809-3446-4755-87c7-73a135f36f52',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.004Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.004Z',
    },
    tagType: 'person',
  },
  {
    name: 'Albert Bravo-Biosca',
    _id: '944a31ee-a0d2-471f-8663-322673b0971a',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.003Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.003Z',
    },
    tagType: 'person',
  },
  {
    name: 'Ollie Bream McIntosh',
    _id: 'c835d4e4-a984-45df-bdc8-422ea28bf5b9',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.002Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.002Z',
    },
    tagType: 'person',
  },
  {
    name: 'Yu-Chen Wu',
    _id: 'bd781790-50d5-471f-851d-76e41ab6e018',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39.001Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39.001Z',
    },
    tagType: 'person',
  },
  {
    name: 'damien heary',
    _id: '7f64d5aa-51f6-4085-88b9-7eebc74162f8',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:39Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:39Z',
    },
    tagType: 'person',
  },
  {
    name: 'Michal Habrman',
    _id: '13666b69-14e7-4948-861c-1067b3a18bf3',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.999Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.999Z',
    },
    tagType: 'person',
  },
  {
    name: 'Peter Dickinson',
    _id: '522f8876-c280-4f81-b5da-a026b8a6d9b2',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.998Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.998Z',
    },
    tagType: 'person',
  },
  {
    name: 'Lourdes Rodriguez ',
    _id: '6897675d-a61a-4c7e-a7e8-2b19f61bd2cd',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.997Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.997Z',
    },
    tagType: 'person',
  },
  {
    name: 'Ruby Schaap',
    _id: '90c4066d-949f-4a16-bfda-1bf16cef67cd',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.996Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.996Z',
    },
    tagType: 'person',
  },
  {
    name: 'Jan Berger',
    _id: 'ff060abd-67bd-49cb-9378-e64ecd73720d',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.995Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.995Z',
    },
    tagType: 'person',
  },
  {
    name: 'Nazareno Luca Santantonio',
    _id: 'fd3081b7-4725-43a6-8579-d80e91c687c9',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.994Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.994Z',
    },
    tagType: 'person',
  },
  {
    name: 'Erika Vaiginiene',
    _id: 'db78e989-6f84-421a-8836-747f63c0a49a',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.993Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.993Z',
    },
    tagType: 'person',
  },
  {
    name: 'Knut Blind',
    _id: '7d005afe-ab7f-44c4-8741-850ed1e4f78c',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.992Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.992Z',
    },
    tagType: 'person',
  },
  {
    name: 'Cristal  Armijo',
    _id: '5335ebf8-d13d-4180-afab-d462d66c2101',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.991Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.991Z',
    },
    tagType: 'person',
  },
  {
    name: 'Totti Könnölä',
    _id: '4bc3a4f3-f901-4670-80bf-f25ddd26163b',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.990Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.990Z',
    },
    tagType: 'person',
  },
  {
    name: 'Mattia Ceracchi',
    _id: 'd08f80c3-d9d8-4bc2-8e7a-8930390bdbbf',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.989Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.989Z',
    },
    tagType: 'person',
  },
  {
    name: 'Simon Winter',
    _id: 'cbe63717-6db0-4f50-8931-e38c37fd0c23',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.988Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.988Z',
    },
    tagType: 'person',
  },
  {
    name: 'Gustav Gustenau',
    _id: '9a5c7ed3-a506-4c2f-b02a-39f49a4b2026',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.987Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.987Z',
    },
    tagType: 'person',
  },
  {
    name: 'Chris Carbone',
    _id: '36ff3f32-94ce-4b6b-aa01-e05afb86e882',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.986Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.986Z',
    },
    tagType: 'person',
  },
  {
    name: 'Laura Galante & Hywel Jones',
    _id: '531cd97f-a923-4220-9699-693333fad2d2',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.985Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.985Z',
    },
    tagType: 'person',
  },
  {
    name: 'Mark Kelly',
    _id: 'a86caeee-6a97-4915-a946-7ccd1f9b6245',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.984Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.984Z',
    },
    tagType: 'person',
  },
  {
    name: 'Miranda Boettcher',
    _id: 'ffc14087-d6ed-41ea-8406-c854772cddf3',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.983Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.983Z',
    },
    tagType: 'person',
  },
  {
    name: 'Martin  Kruse',
    _id: 'ce529656-bacd-4afb-b671-301d464ec908',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.982Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.982Z',
    },
    tagType: 'person',
  },
  {
    name: 'Tudor Juravlea',
    _id: '8241cc38-51ab-4dc3-9791-aed1585ff176',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.981Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.981Z',
    },
    tagType: 'person',
  },
  {
    name: 'Serhat Çakır',
    _id: 'a238fa17-301b-4b6a-88fc-73b34b62c2c9',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.980Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.980Z',
    },
    tagType: 'person',
  },
  {
    name: 'Daniel Wiggins',
    _id: 'fa2cc0e5-8422-420b-8e6e-0703c260b0f5',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.979Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.979Z',
    },
    tagType: 'person',
  },
  {
    name: 'Philine Warnke',
    _id: '26c009a4-0699-45fa-8d60-16ebfe63cd90',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.978Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.978Z',
    },
    tagType: 'person',
  },
  {
    name: 'Cleo Silveira',
    _id: '11f015c8-4d14-4603-8c1a-a9930a684ff3',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.977Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.977Z',
    },
    tagType: 'person',
  },
  {
    name: 'Oriol Gómez i Soler',
    _id: '5f1a8545-6515-4684-bb61-96c5e6b19593',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.976Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.976Z',
    },
    tagType: 'person',
  },
  {
    name: 'Tiina Maria Honkanen',
    _id: '32d979b0-b7ba-48f8-ae8e-7bb040c7ea3e',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.975Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.975Z',
    },
    tagType: 'person',
  },
  {
    name: 'Ebru Metin',
    _id: '0eebbb27-5170-4bf6-b7d1-5b74f593755b',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.974Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.974Z',
    },
    tagType: 'person',
  },
  {
    name: 'Emma Coroler',
    _id: '1dbd577c-7118-4cec-a9d7-95a367422ca4',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.973Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.973Z',
    },
    tagType: 'person',
  },
  {
    name: 'Ileana-Sabina Chiaburu',
    _id: '4950ac96-4246-4a9e-8b33-13b8a79b997c',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.972Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.972Z',
    },
    tagType: 'person',
  },
  {
    name: 'Alexandra de Maleville',
    _id: 'd87bc7f2-0308-4088-bb3a-0cc6cb2f5ecd',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.971Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.971Z',
    },
    tagType: 'person',
  },
  {
    name: 'anhtuanhoang5',
    _id: 'b50aa871-506c-4c29-85c5-e9cc40f7d7aa',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.970Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.970Z',
    },
    tagType: 'person',
  },
  {
    name: 'Scott Smith',
    _id: 'bd218b3b-2e15-4c30-b391-4c96744761f1',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.969Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.969Z',
    },
    tagType: 'person',
  },
  {
    name: 'Georgios KOLLIARAKIS',
    _id: '70d7a165-c3a4-49cc-9d15-d056fd10b22a',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.968Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.968Z',
    },
    tagType: 'person',
  },
  {
    name: 'Pierre Bitard',
    _id: 'c478ce49-d300-4549-8cc3-36179d57eabb',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.967Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.967Z',
    },
    tagType: 'person',
  },
  {
    name: 'anakeser34',
    _id: '07ebf3e5-717e-411e-bdbd-babf25d1d041',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.966Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.966Z',
    },
    tagType: 'person',
  },
  {
    name: 'Attila Havas',
    _id: '75786c5d-3536-4dea-ad7a-2dee4b7ea2ff',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.965Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.965Z',
    },
    tagType: 'person',
  },
  {
    name: 'Marjolein Caniels',
    _id: '42e4ba40-ca96-4ae6-af21-416ddd8e8942',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.964Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.964Z',
    },
    tagType: 'person',
  },
  {
    name: 'Aureli SORIA-FRISCH',
    _id: '40d5d7fe-6745-4f91-9fd8-e5ce90b4fe2c',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.963Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.963Z',
    },
    tagType: 'person',
  },
  {
    name: 'Vania Ferreira',
    _id: '881130c0-87ee-41dc-8a72-fd20a58b9d9c',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.962Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.962Z',
    },
    tagType: 'person',
  },
  {
    name: 'Ricardo Pinheiro',
    _id: '4239d3a3-ed5f-420a-bc8c-d526e3e7b841',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.961Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.961Z',
    },
    tagType: 'person',
  },
  {
    name: 'Duncan McLaren',
    _id: '456701db-6281-4459-a915-bd487a3104ce',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.960Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.960Z',
    },
    tagType: 'person',
  },
  {
    name: 'Anna Sacio-Szymańska',
    _id: '43712f24-955c-46c7-ac85-8474c57788ea',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.959Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.959Z',
    },
    tagType: 'person',
  },
  {
    name: 'Wim Winderickx',
    _id: 'd84b30ac-a5fb-4f54-96b3-ddd61171a75b',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.958Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.958Z',
    },
    tagType: 'person',
  },
  {
    name: 'Mikko Dufva',
    _id: '0581386c-e6b4-403c-b2b0-e36558200c17',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.957Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.957Z',
    },
    tagType: 'person',
  },
  {
    name: 'Petra Goran',
    _id: 'ee2230c5-b02b-4d28-829f-2db164bae668',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.956Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.956Z',
    },
    tagType: 'person',
  },
  {
    name: 'Stefano Palmieri',
    _id: '9b961c64-b9b5-4066-9354-ea54930dad46',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.955Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.955Z',
    },
    tagType: 'person',
  },
  {
    name: 'simone.weske',
    _id: 'ce292bd1-97a1-4ccb-898c-53abdb889cb6',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.954Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.954Z',
    },
    tagType: 'person',
  },
  {
    name: 'Víctor Martínez',
    _id: '36c61969-8c12-4ff7-852d-5cb4cd5cffb4',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.953Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.953Z',
    },
    tagType: 'person',
  },
  {
    name: 'Thomas Kramer',
    _id: '86ce80a0-5cc2-453b-8328-ffbc65443656',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.952Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.952Z',
    },
    tagType: 'person',
  },
  {
    name: 'Sofia H Ribeiro',
    _id: '9700dcc1-1c24-4020-9935-5e95a112a93d',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.951Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.951Z',
    },
    tagType: 'person',
  },
  {
    name: 'Maija Knutti',
    _id: '2ce1087f-b775-422f-83b5-e222995e1fbc',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.950Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.950Z',
    },
    tagType: 'person',
  },
  {
    name: 'Saar van der Spek',
    _id: '1a0da9bf-8dcd-41f2-85f5-e51455e084f6',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.949Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.949Z',
    },
    tagType: 'person',
  },
  {
    name: 'Carlos Pacheco',
    _id: 'be991338-6bed-4a2e-b8ad-e412a8da795f',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.948Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.948Z',
    },
    tagType: 'person',
  },
  {
    name: 'giumanci',
    _id: '51a4c1d1-b57d-4ec2-aaf1-0e990f56e4ca',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.947Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.947Z',
    },
    tagType: 'person',
  },
  {
    name: 'Luke Georghiou ',
    _id: '87fb57c8-d9d5-41ab-88a6-8af205a60edc',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.945Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.945Z',
    },
    tagType: 'person',
  },
  {
    name: 'Sebastian Malzner',
    _id: 'bdec27af-ee29-4748-b56a-85da5f1e50ce',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.944Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.944Z',
    },
    tagType: 'person',
  },
  {
    name: 'Hywel Jones',
    _id: 'a93bee5b-c192-4466-b566-c598032481cd',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.943Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.943Z',
    },
    tagType: 'person',
  },
  {
    name: 'Bianca Archip',
    _id: '60e3ba03-b7e3-4da7-a34c-9b6f2ab45562',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.942Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.942Z',
    },
    tagType: 'person',
  },
  {
    name: 'Pit Prum',
    _id: 'c6084f55-825a-42fb-95db-e0101726bdb7',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.941Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.941Z',
    },
    tagType: 'person',
  },
  {
    name: 'Виктор Остапенко',
    _id: 'ea493f0f-f219-4368-935f-b269bbe36252',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.940Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.940Z',
    },
    tagType: 'person',
  },
  {
    name: 'Anita Silva',
    _id: '28b16bd0-ac07-421a-933c-e2b663afe15e',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.939Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.939Z',
    },
    tagType: 'person',
  },
  {
    name: 'Ivan Ebejer',
    _id: '0f87a497-245e-4ea1-beeb-3f5e006fc547',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.938Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.938Z',
    },
    tagType: 'person',
  },
  {
    name: 'Łukasz Macander',
    _id: '92e33451-8685-479c-b3f4-683e5f80bb38',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.937Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.937Z',
    },
    tagType: 'person',
  },
  {
    name: 'Jonas Gissel Mikkelsen',
    _id: '5a13fc14-3c84-42e4-b590-c49ea56398a4',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.936Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.936Z',
    },
    tagType: 'person',
  },
  {
    name: 'Kerstin Goluchowicz',
    _id: 'c1c18f41-3834-412c-b1da-56b6baf0c96d',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.935Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.935Z',
    },
    tagType: 'person',
  },
  {
    name: 'Lydia Caldana',
    _id: 'dd89a881-3fc0-4b26-b961-23af4fe9feff',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.934Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.934Z',
    },
    tagType: 'person',
  },
  {
    name: 'Charlotte Neipperg',
    _id: '46c70cc7-76f2-4407-a4e0-acc67e543d5c',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.932Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.932Z',
    },
    tagType: 'person',
  },
  {
    name: 'Erich Giordano',
    _id: '982fde45-a4dd-45dc-9019-642230156f0a',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.931Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.931Z',
    },
    tagType: 'person',
  },
  {
    name: 'cristianocagnin',
    _id: 'a7b925ad-9585-4d76-a255-be8ae31632b7',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.930Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.930Z',
    },
    tagType: 'person',
  },
  {
    name: 'Bartosz Frąckowiak',
    _id: 'a20f8512-f39f-4620-8d8e-7ecee6f9d35e',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.929Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.929Z',
    },
    tagType: 'person',
  },
  {
    name: 'Jacob Ohrvik-Stott',
    _id: '6c4c7fed-488a-495e-9437-bc9fae738193',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.928Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.928Z',
    },
    tagType: 'person',
  },
  {
    name: 'Marco Bevolo',
    _id: 'a6581c31-56c0-43f9-93aa-c37f67ce457f',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.927Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.927Z',
    },
    tagType: 'person',
  },
  {
    name: 'Mathias Behn Bjørnhof',
    _id: 'cd92f581-551c-4c0c-8c0e-4f7e749ee4a0',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.926Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.926Z',
    },
    tagType: 'person',
  },
  {
    name: 'Jene Van der Heide',
    _id: '64a54f61-a3e6-422c-95e1-d7fc9e7cf496',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.925Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.925Z',
    },
    tagType: 'person',
  },
  {
    name: 'Joern Geisselmann',
    _id: '53869047-1a5c-4df3-b1e5-6be24e7bb808',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.924Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.924Z',
    },
    tagType: 'person',
  },
  {
    name: 'Carla los',
    _id: 'f9f5b686-d0ee-4f08-8422-dd6b494fbcb6',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.923Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.923Z',
    },
    tagType: 'person',
  },
  {
    name: 'Matthew Spaniol',
    _id: 'fdd3ce47-ff2f-4e78-80b7-76df26c346e6',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.922Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.922Z',
    },
    tagType: 'person',
  },
  {
    name: 'Katrina Günther',
    _id: 'f50a58b3-f887-4fe7-9ff0-48132ebf08ef',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.921Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.921Z',
    },
    tagType: 'person',
  },
  {
    name: 'Lenka Hebakova',
    _id: '8815218d-6eb4-4ad9-a777-2e60d96c16b3',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.920Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.920Z',
    },
    tagType: 'person',
  },
  {
    name: 'Daniel Riveong',
    _id: 'ad73b1ad-6e7b-4c1b-99fa-4084cc9af7d4',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.919Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.919Z',
    },
    tagType: 'person',
  },
  {
    _id: '39c9be1e-c537-475a-bc7f-274dddaf34fc',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.918Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.918Z',
    },
    tagType: 'person',
  },
  {
    name: 'Hanna Tolonen',
    _id: 'e01696da-7d0b-4670-bef6-8c3bc2e57e0c',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.917Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.917Z',
    },
    tagType: 'person',
  },
  {
    name: 'Valentina Malcotti',
    _id: 'ccb296f1-1781-4e97-84f8-873102bb405e',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.916Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.916Z',
    },
    tagType: 'person',
  },
  {
    name: 'Jana Lingruen',
    _id: 'da474678-67a7-4214-bbe9-08514aa2d2e8',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.915Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.915Z',
    },
    tagType: 'person',
  },
  {
    name: 'Austeja Trinkunaite',
    _id: '3876f822-b54c-4b9c-a6bf-37bdd74ef362',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.914Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.914Z',
    },
    tagType: 'person',
  },
  {
    name: 'angela.schindler-daniels',
    _id: 'c4a4f5f8-5aa7-492a-9099-451c027e2f11',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.913Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.913Z',
    },
    tagType: 'person',
  },
  {
    name: 'Ada Lorena Niculita',
    _id: '975df6cd-a9fa-4867-92b2-1a0dbd6c5d03',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.912Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.912Z',
    },
    tagType: 'person',
  },
  {
    name: 'Agustín ALEMÁN GONZÁLEZ',
    _id: 'b8fad650-b05e-47aa-86f3-6d16270c91be',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.911Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.911Z',
    },
    tagType: 'person',
  },
  {
    name: 'Albert Norström',
    _id: '7c1380d8-4da6-44f5-8090-2b39ba0bd27a',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.910Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.910Z',
    },
    tagType: 'person',
  },
  {
    name: 'Dominika Kopeć',
    _id: '15838962-703c-4984-823e-4d8cb0f23ec5',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.909Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.909Z',
    },
    tagType: 'person',
  },
  {
    name: 'Abdi KURT',
    _id: 'd4cb6ec4-8532-4e65-96f6-a4a6f484dba3',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.908Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.908Z',
    },
    tagType: 'person',
  },
  {
    name: 'Kate Dearden',
    _id: '60f9d500-5c2c-4c49-9076-7d956f05fc2c',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.907Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.907Z',
    },
    tagType: 'person',
  },
  {
    name: 'Nella Resos',
    _id: '6be7d42f-ac83-4552-a1c9-a45ab181a319',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.906Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.906Z',
    },
    tagType: 'person',
  },
  {
    name: 'Moritz Hunger',
    _id: 'd60b3ee4-aa3e-414d-915b-e5b32ae414d8',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.905Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.905Z',
    },
    tagType: 'person',
  },
  {
    name: 'Anne Kantel',
    _id: 'a6fae5e9-6a2e-4e28-9b29-05a7d8d9eabb',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.903Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.903Z',
    },
    tagType: 'person',
  },
  {
    name: 'Erica Bol',
    _id: 'e8e5c580-f90e-4edc-bfc3-152d2614a4c8',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.902Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.902Z',
    },
    tagType: 'person',
  },
  {
    name: 'Corina Murafa',
    _id: 'dd76c765-f38d-4954-aca4-c720825a9ab9',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.901Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.901Z',
    },
    tagType: 'person',
  },
  {
    name: 'Afonso Duarte',
    _id: 'aeb7b1b9-0abe-4743-b8aa-fa1943b9218d',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.900Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.900Z',
    },
    tagType: 'person',
  },
  {
    name: 'cbonte',
    _id: '941c7b70-b9ec-416c-951f-7729b5843d23',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.899Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.899Z',
    },
    tagType: 'person',
  },
  {
    name: 'Sandra Fernandes',
    _id: '221dc399-d0d2-477a-bb76-ee0a652d6767',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.898Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.898Z',
    },
    tagType: 'person',
  },
  {
    name: 'Ahmet Alphan Sabancı',
    _id: '05d4be30-8557-41d3-8fe1-3799a02e8db3',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.897Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.897Z',
    },
    tagType: 'person',
  },
  {
    name: 'florasoyez',
    _id: 'cb0fdc16-86c8-45b4-a200-a7a0a868b4e5',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.896Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.896Z',
    },
    tagType: 'person',
  },
  {
    name: 'Benjamin Sovacool',
    _id: '631047dc-2318-408e-8197-8a6d709f01da',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.895Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.895Z',
    },
    tagType: 'person',
  },
  {
    name: 'ildiko meny',
    _id: '99bb1fe0-474f-447c-9621-a28bbd71bb65',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.894Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.894Z',
    },
    tagType: 'person',
  },
  {
    name: 'Abius Akwaake',
    _id: 'eb457865-20e1-4fa7-a6f7-1d7baf4c1d26',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.893Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.893Z',
    },
    tagType: 'person',
  },
  {
    name: 'Michael  Schels',
    _id: '06090ded-d6a6-4efd-851d-be1eedef3bec',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.892Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.892Z',
    },
    tagType: 'person',
  },
  {
    name: 'Olivier Mora',
    _id: 'f3ec1cb5-711a-4e90-ae42-3cfb30a304a9',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.891Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.891Z',
    },
    tagType: 'person',
  },
  {
    name: 'Carlos Pacheco',
    _id: '28ff3d05-ab52-4560-a2d8-84cdc5c0daa5',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.890Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.890Z',
    },
    tagType: 'person',
  },
  {
    name: 'Pop ADRIAN',
    _id: '0b7e18a6-aebb-466b-b46c-291ca1fb987c',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.889Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.889Z',
    },
    tagType: 'person',
  },
  {
    name: 'tugaycalhan',
    _id: '05969409-a493-4b54-958f-4815f2f04ea9',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.888Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.888Z',
    },
    tagType: 'person',
  },
  {
    name: 'Lilith Boettcher',
    _id: 'e3095ede-bb46-41f4-8a26-d4bdd3379dda',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.887Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.887Z',
    },
    tagType: 'person',
  },
  {
    name: 'Jorg Körner',
    _id: '73b9094f-62f0-46c0-9b0a-a106fc6750d4',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.886Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.886Z',
    },
    tagType: 'person',
  },
  {
    name: 'Alex Fotescu',
    _id: '65c8ef38-4452-416f-a445-2e0187803613',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.885Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.885Z',
    },
    tagType: 'person',
  },
  {
    name: 'Knut Blind',
    _id: '62f72bbb-4428-4ee5-87c5-28671232f543',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.884Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.884Z',
    },
    tagType: 'person',
  },
  {
    name: 'Elli B. Tzatzanis-Stepanovic',
    _id: '300f540f-d584-45a6-99e1-e0449a56f3c1',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.883Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.883Z',
    },
    tagType: 'person',
  },
  {
    name: 'Ton Koenraad',
    _id: '31190e2a-aa92-4059-b162-cb60d064e044',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.882Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.882Z',
    },
    tagType: 'person',
  },
  {
    name: 'Gabriela Henriques',
    _id: '13198f56-bcb9-4e7c-b8a7-6b759653bd74',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-14T09:09:38.881Z',
    },
    _updatedDate: {
      $date: '2024-10-14T09:09:38.881Z',
    },
    tagType: 'person',
  },
  {
    name: 'workshop',
    _id: 'da3cd684-d7c3-44de-b0f7-8efa7eec2b69',
    _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
    _createdDate: {
      $date: '2024-10-08T11:51:06.097Z',
    },
    tagLine: 'workshop',
    _updatedDate: {
      $date: '2024-10-08T11:51:06.097Z',
    },
    tagType: 'page type',
  },
  {
    name: 'news',
    _id: '1a7c1523-fbce-4551-9ed5-0153117bf7e8',
    _owner: 'a97cd116-3b37-412e-9aa9-114db659043f',
    _createdDate: {
      $date: '2024-10-08T07:17:13.608Z',
    },
    tagLine: 'the tagline should not be mandatory',
    _updatedDate: {
      $date: '2024-10-08T07:17:13.608Z',
    },
    tagType: 'page type',
  },
  {
    name: 'Adam',
    _id: 'df20b6bf-0db7-4f90-b6ef-d6b668643d93',
    _owner: 'e586b886-7d9c-42d0-b744-f73146a3862f',
    _createdDate: {
      $date: '2024-10-07T22:34:10.092Z',
    },
    tagLine: 'Eva',
    _updatedDate: {
      $date: '2024-10-07T22:34:10.092Z',
    },
    tagType: 'organisation',
  },
  {
    name: 'editorial',
    _id: '72fff3c3-4f54-418b-ac66-34d542d57da0',
    _owner: 'a97cd116-3b37-412e-9aa9-114db659043f',
    _createdDate: {
      $date: '2024-10-06T12:47:56.087Z',
    },
    tagLine: '  ',
    _updatedDate: {
      $date: '2024-10-06T12:47:56.087Z',
    },
    tagType: 'page type',
  },
  {
    name: 'Organisation X2',
    _id: '47b18b48-f543-4146-8bc5-adb8140866d8',
    _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
    _createdDate: {
      $date: '2024-10-05T09:42:39.486Z',
    },
    tagLine: 'This is a tagline for Organisation X',
    _updatedDate: {
      $date: '2024-10-28T23:23:20.992Z',
    },
    picture:
      'https://static.wixstatic.com/media/471908_d548d62205d04ecdab68ff86f34e19bc~mv2.webp',
    tagType: 'organisation',
    tagPageLink: '/organisation/organisation-x-rgzr7',
  },
  {
    name: 'Alexandru-Sergiu Ciobanasu',
    _id: '91a72bde-aabf-4fd9-b01c-8cb8d34ebdfe',
    _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
    _createdDate: {
      $date: '2024-10-01T22:05:18.462Z',
    },
    tagLine: 'Alexandru-Sergiu Ciobanasu tagline',
    _updatedDate: {
      $date: '2024-10-08T12:00:55.550Z',
    },
    picture:
      'https://static.wixstatic.com/media/471908_18bd827550114b98a31041feec80dc04~mv2.jpeg',
    tagType: 'person',
    tagPageLink: '/person/Alexandru-Sergiu_Ciobanasu_do62e',
  },
  {
    popularity: 167,
    name: 'CATALIN A SIRBU',
    _id: '6aab52e9-ff4e-4ed6-8f87-88a29e79c0de',
    _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
    _createdDate: {
      $date: '2024-10-01T21:39:31.534Z',
    },
    tagLine:
      'Sail away from the safe harbor - Catch the trade winds in your sails',
    _updatedDate: {
      $date: '2024-10-28T01:36:17.997Z',
    },
    picture:
      'https://static.wixstatic.com/media/471908_b62ca07ac0484eae93e7a732785223e1~mv2.jpg',
    tagType: 'person',
    tagPageLink: '/person/catalin-sirbu-nev6v',
  },
  {
    name: 'Vlad Enache The Second',
    _id: '397c9cb3-930b-40f4-891d-e46e8edd528d',
    _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
    _createdDate: {
      $date: '2024-10-01T21:39:09.335Z',
    },
    tagLine: 'Ho-ho-ho!',
    _updatedDate: {
      $date: '2024-10-06T14:09:18.448Z',
    },
    tagType: 'person',
    tagPageLink: '/person/Vlad_Enache_The_Second_6mee1',
  },
  {
    popularity: 1546,
    name: 'University of Bucharest',
    _id: '55025786-a61e-42d4-8475-6a9329958fa0',
    _owner: 'd63d4075-c493-4434-b07b-3455eb228b81',
    _createdDate: {
      $date: '2024-09-21T13:02:09.852Z',
    },
    tagLine: '',
    _updatedDate: {
      $date: '2024-10-13T14:15:55.224Z',
    },
    picture:
      'wix:image://v1/d63d40_9d7634ea23c545c183ff786706f9b911~mv2.png/Logo_Universitatea_din_Bucure%C8%99ti.png#originWidth=3238&originHeight=2684',
    tagType: 'organisation',
    tagPageLink: '/organisation/unibuc',
  },
  {
    popularity: 281,
    name: 'University of Copenhagen',
    _id: '6b2e158b-9110-4000-b3bb-d753ea856191',
    _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
    _createdDate: {
      $date: '2024-09-06T07:43:49.621Z',
    },
    tagLine:
      'Sail away from the safe harbor - Catch the trade winds in your sails',
    _updatedDate: {
      $date: '2024-09-21T13:00:19.761Z',
    },
    picture:
      'wix:image://v1/d63d40_6a44eaf2936846f595915ebc042393c7~mv2.jpg/university.jpg#originWidth=500&originHeight=500',
    tagType: 'organisation',
    tagPageLink: '/organisation/Organisation_X',
  },
  {
    popularity: 80,
    name: 'Julia Schifano',
    _id: '81cf12a9-4e2f-44f6-886c-af8bf7ae7a9d',
    _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
    _createdDate: {
      $date: '2024-09-03T06:40:37.780Z',
    },
    tagLine:
      'I am currently working at the Department of Behavioral Physiology, University of Hohenheim. My research interest is located at the intersections of Quantitative Social Research and Public Health.',
    _updatedDate: {
      $date: '2024-10-02T21:28:05.663Z',
    },
    picture:
      'wix:image://v1/d63d40_4fd61c63260546599e2104c17dc0e813~mv2.webp/konstanze-wagenhofer-portrait-hoch---(c)-carmen-trappenberg-klein.webp#originWidth=2176&originHeight=2809',
    tagType: 'person',
    tagPageLink: '/person/Eva_Pericolini',
  },
  {
    popularity: 184,
    name: 'info',
    _id: 'cdc11986-494b-4540-8b0a-72466edfbd10',
    _createdDate: {
      $date: '2024-08-27T09:51:01.717Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:51:01.717Z',
    },
    tagId: 252524,
    tagType: 'page type',
  },
  {
    popularity: 58,
    name: 'organisation info',
    _id: 'e0e12984-c4f3-4800-b201-3cdf4c4a01e8',
    _createdDate: {
      $date: '2024-08-27T09:51:01.716Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:51:01.716Z',
    },
    tagId: 252525,
    tagType: 'page type',
  },
  {
    popularity: 91,
    name: 'person info',
    _id: 'ff988067-2fee-41f2-9b33-7eb14d282b17',
    _createdDate: {
      $date: '2024-08-27T09:51:01.715Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:51:01.715Z',
    },
    tagId: 252526,
    tagType: 'page type',
  },
  {
    popularity: 35,
    name: 'project info',
    _id: 'fcb0cbbc-98a5-4743-8c8b-1cb1c8326a85',
    _createdDate: {
      $date: '2024-08-27T09:51:01.714Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:51:01.714Z',
    },
    tagId: 252527,
    tagType: 'page type',
  },
  {
    popularity: 253,
    name: 'post',
    _id: 'cc31afc1-a304-465a-be3e-a887b68884f3',
    _createdDate: {
      $date: '2024-08-27T09:51:01.713Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:51:01.713Z',
    },
    tagId: 252528,
    tagType: 'page type',
  },
  {
    popularity: 126,
    name: 'project result',
    _id: '649a0649-abfd-43c3-86d5-2765c99f7f31',
    _createdDate: {
      $date: '2024-08-27T09:51:01.712Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:51:01.712Z',
    },
    tagId: 252529,
    tagType: 'page type',
  },
  {
    popularity: 46,
    name: 'event',
    _id: '17c4547e-2219-49c8-8169-f68766c7c1d9',
    _createdDate: {
      $date: '2024-08-27T09:51:01.711Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:51:01.711Z',
    },
    tagId: 252530,
    tagType: 'page type',
  },
  {
    popularity: 8,
    name: 'foresight method',
    _id: 'aea99dd0-13d1-4231-96b4-b1da2d2f8401',
    _createdDate: {
      $date: '2024-08-27T09:51:01.710Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:51:01.710Z',
    },
    tagId: 252531,
    tagType: 'page type',
  },
  {
    popularity: 20,
    trend: '5',
    name: 'business',
    _id: '98b46eb1-0634-43cc-b749-47b2376d2296',
    _createdDate: {
      $date: '2024-08-27T09:48:25.145Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.145Z',
    },
    tagId: 111111,
    tagType: 'organisation type',
  },
  {
    popularity: 31,
    name: 'network',
    _id: '13c4e781-46aa-42b1-8f0f-fc4f64708f34',
    _createdDate: {
      $date: '2024-08-27T09:48:25.144Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.144Z',
    },
    tagId: 111112,
    tagType: 'organisation type',
  },
  {
    popularity: 21,
    name: 'foresight services provider',
    _id: '8b062988-719c-4090-b172-aeddf756ffa2',
    _createdDate: {
      $date: '2024-08-27T09:48:25.143Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.143Z',
    },
    tagId: 111113,
    tagType: 'organisation type',
  },
  {
    popularity: 30,
    name: 'regional public administration',
    _id: '2c4b5897-e58f-418f-af7a-c06cfd4600f6',
    _createdDate: {
      $date: '2024-08-27T09:48:25.142Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.142Z',
    },
    tagId: 111114,
    tagType: 'organisation type',
  },
  {
    popularity: 23,
    name: 'private research organisation',
    _id: '3bb47c34-b69e-4f67-96ce-46cfde43bac4',
    _createdDate: {
      $date: '2024-08-27T09:48:25.141Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.141Z',
    },
    tagType: 'organisation type',
  },
  {
    popularity: 27,
    name: 'consortium',
    _id: '71826aca-b6ae-45c7-89ca-8032abc6705c',
    _createdDate: {
      $date: '2024-08-27T09:48:25.140Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.140Z',
    },
    tagType: 'organisation type',
  },
  {
    popularity: 18,
    name: 'foresight training provider',
    _id: '94ee4b0b-959c-411b-8eea-bb40164b401a',
    _createdDate: {
      $date: '2024-08-27T09:48:25.139Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.139Z',
    },
    tagType: 'organisation type',
  },
  {
    popularity: 26,
    name: 'university',
    _id: '72f04fc6-0416-4536-96d2-847fe8b7f098',
    _createdDate: {
      $date: '2024-08-27T09:48:25.138Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.138Z',
    },
    tagType: 'organisation type',
  },
  {
    popularity: 19,
    name: 'press',
    _id: 'c80f7004-33f8-495b-85db-c102a5d91c49',
    _createdDate: {
      $date: '2024-08-27T09:48:25.137Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.137Z',
    },
    tagType: 'organisation type',
  },
  {
    popularity: 28,
    name: 'public research organisation',
    _id: 'a8eec1d7-45a8-4a70-93bb-cf0dfdbb9cb6',
    _createdDate: {
      $date: '2024-08-27T09:48:25.136Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.136Z',
    },
    tagType: 'organisation type',
  },
  {
    popularity: 24,
    name: 'NGO',
    _id: 'd4400ea2-3c15-49b8-85df-bc7fbbd8f889',
    _createdDate: {
      $date: '2024-08-27T09:48:25.135Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.135Z',
    },
    tagType: 'organisation type',
  },
  {
    popularity: 29,
    name: 'EU organisation',
    _id: '1479f9f5-e3fa-4b24-8d95-e1fb628871b6',
    _createdDate: {
      $date: '2024-08-27T09:48:25.134Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.134Z',
    },
    tagType: 'organisation type',
  },
  {
    popularity: 25,
    name: 'national public administration',
    _id: 'a4186815-449d-459c-8778-781d234d51db',
    _createdDate: {
      $date: '2024-08-27T09:48:25.133Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.133Z',
    },
    tagType: 'organisation type',
  },
  {
    popularity: 22,
    name: 'international organisation',
    _id: '139a7093-de74-414b-a3f8-1fe35ce5a340',
    _createdDate: {
      $date: '2024-08-27T09:48:25.132Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.132Z',
    },
    tagType: 'organisation type',
  },
  {
    popularity: 12,
    trend: '3',
    name: 'foresight expert',
    _id: '29107cef-e43b-486f-b06e-426011c5adaa',
    _createdDate: {
      $date: '2024-08-27T09:48:25.131Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.131Z',
    },
    tagType: 'person type',
  },
  {
    popularity: 25,
    name: 'foresight trainer',
    _id: '0328a866-26be-4e56-a301-4150e8e49637',
    _createdDate: {
      $date: '2024-08-27T09:48:25.130Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.130Z',
    },
    tagType: 'person type',
  },
  {
    popularity: 39,
    name: 'domain expert',
    _id: 'de346060-e0e7-42e5-ad3a-4c8c675f7f89',
    _createdDate: {
      $date: '2024-08-27T09:48:25.129Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.129Z',
    },
    tagType: 'person type',
  },
  {
    popularity: 14,
    name: 'futurist',
    _id: '74fbdf38-08bf-4cf3-8098-17cc3c6e78f6',
    _createdDate: {
      $date: '2024-08-27T09:48:25.128Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.128Z',
    },
    tagType: 'person type',
  },
  {
    popularity: 5,
    name: 'speculative design expert',
    _id: '9c426047-e22c-4b07-bf15-fcd4decd6bc8',
    _createdDate: {
      $date: '2024-08-27T09:48:25.127Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.127Z',
    },
    tagType: 'person type',
  },
  {
    popularity: 8,
    name: 'journalist',
    _id: 'd3ba924f-a934-4215-aa0d-65a05eaf2353',
    _createdDate: {
      $date: '2024-08-27T09:48:25.126Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.126Z',
    },
    tagType: 'person type',
  },
  {
    popularity: 7,
    name: 'R&I policy expert',
    _id: 'a5b67949-1c5b-4b2f-9840-5d982c3c8154',
    _createdDate: {
      $date: '2024-08-27T09:48:25.125Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.125Z',
    },
    tagType: 'person type',
  },
  {
    popularity: 8,
    name: 'impact assessment expert',
    _id: '09378014-4255-4aa7-8f54-202e1ddfb883',
    _createdDate: {
      $date: '2024-08-27T09:48:25.124Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.124Z',
    },
    tagType: 'person type',
  },
  {
    popularity: 49,
    name: 'foresight enthusiast',
    _id: 'e8cc1f1e-ad8e-4ffc-9818-32e1da9801eb',
    _createdDate: {
      $date: '2024-08-27T09:48:25.123Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.123Z',
    },
    tagType: 'person type',
  },
  {
    popularity: 10,
    name: 'future sensitive artist',
    _id: 'eaafcfca-9a7c-4552-b205-ab49fab72ff4',
    _createdDate: {
      $date: '2024-08-27T09:48:25.122Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.122Z',
    },
    tagType: 'person type',
  },
  {
    popularity: 5,
    name: 'SF writer',
    _id: 'b094289d-e2b1-4d0e-b43e-56e3c492ea8d',
    _createdDate: {
      $date: '2024-08-27T09:48:25.121Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.121Z',
    },
    tagType: 'person type',
  },
  {
    popularity: 3,
    name: 'foresight student',
    _id: 'c4f86855-c7f1-48d7-ac07-a5456fe04106',
    _createdDate: {
      $date: '2024-08-27T09:48:25.120Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.120Z',
    },
    tagType: 'person type',
  },
  {
    popularity: 27,
    name: 'EU funded',
    _id: 'f80d06e4-b326-4364-b250-0afa1fc777f3',
    _createdDate: {
      $date: '2024-08-27T09:48:25.119Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.119Z',
    },
    tagType: 'project type',
  },
  {
    popularity: 29,
    trend: '3',
    name: 'Agriculture',
    _id: '2ceb4abf-2b73-4a2d-b2c3-4d4468d94f4a',
    _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
    _createdDate: {
      $date: '2024-08-27T09:48:25.118Z',
    },
    _updatedDate: {
      $date: '2024-10-15T10:52:22.337Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 66,
    name: 'art',
    _id: 'ef4be6b1-f847-46ed-81bd-92d934f3dadc',
    _createdDate: {
      $date: '2024-08-27T09:48:25.117Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.117Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 34,
    name: 'AI',
    _id: 'cb0ba433-0940-4397-bce8-680c9229cbfb',
    _createdDate: {
      $date: '2024-08-27T09:48:25.116Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.116Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 54,
    name: 'awarness of the present',
    _id: '21e41bb4-9b7b-42fa-a874-afd553083d31',
    _createdDate: {
      $date: '2024-08-27T09:48:25.115Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.115Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 51,
    name: 'big tech',
    _id: '33dc2ff6-d497-4816-95ab-0e015ba0bd55',
    _createdDate: {
      $date: '2024-08-27T09:48:25.114Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.114Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 25,
    name: 'biodiversity',
    _id: 'b1f036d6-6af6-453c-aefa-4870afc67700',
    _createdDate: {
      $date: '2024-08-27T09:48:25.113Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.113Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 24,
    name: 'circular economy',
    _id: 'b9a9da6d-25f2-4cac-a9cf-5e9d1775d520',
    _createdDate: {
      $date: '2024-08-27T09:48:25.112Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.112Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 52,
    name: 'citizen engagement',
    _id: '3e20987c-c439-4214-bfff-515f49d8a65f',
    _createdDate: {
      $date: '2024-08-27T09:48:25.111Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.111Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 63,
    name: 'civic resilience',
    _id: '28025131-a87e-4bcc-b571-4c5396ef11f6',
    _createdDate: {
      $date: '2024-08-27T09:48:25.110Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.110Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 17,
    name: 'climate',
    _id: '7786f7cc-9cd1-430e-9d57-e83c033b3f2e',
    _createdDate: {
      $date: '2024-08-27T09:48:25.109Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.109Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 47,
    name: 'climate change',
    _id: '21181beb-717e-44c5-aa42-1497a9ab763c',
    _createdDate: {
      $date: '2024-08-27T09:48:25.108Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.108Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 12,
    name: 'coastal areas',
    _id: '423a2271-b2c9-4546-9935-91a192b31f48',
    _createdDate: {
      $date: '2024-08-27T09:48:25.107Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.107Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 59,
    name: 'community',
    _id: '1709ce5e-eb33-4986-89b7-4ed0084bf812',
    _createdDate: {
      $date: '2024-08-27T09:48:25.106Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.106Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 35,
    name: 'connection to nature',
    _id: '0e7fb0ef-1f7b-4417-9032-dca0dc78ae0f',
    _createdDate: {
      $date: '2024-08-27T09:48:25.105Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.105Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 70,
    name: 'criminality',
    _id: '819e4d3d-141b-4b05-8996-140308fb0db8',
    _createdDate: {
      $date: '2024-08-27T09:48:25.104Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.104Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 53,
    name: 'cybersecurity',
    _id: 'ab65d786-862a-4894-b81d-9719663319d7',
    _createdDate: {
      $date: '2024-08-27T09:48:25.103Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.103Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 15,
    name: 'data',
    _id: 'e5e74e65-1f51-46ee-a941-50b330481253',
    _createdDate: {
      $date: '2024-08-27T09:48:25.102Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.102Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 48,
    name: 'democracy',
    _id: 'b6eb6f2d-beae-4471-b980-95b11d48b675',
    _createdDate: {
      $date: '2024-08-27T09:48:25.101Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.101Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 39,
    name: 'digital',
    _id: '841ef237-37ee-4f15-9274-64ec7830f9d2',
    _createdDate: {
      $date: '2024-08-27T09:48:25.100Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.100Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 22,
    name: 'digitalisation',
    _id: 'b5791a5e-8819-4afe-b69b-97aaed7f7565',
    _createdDate: {
      $date: '2024-08-27T09:48:25.099Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.099Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 50,
    name: 'economic crime',
    _id: '9b797ea2-9623-4246-a538-f46e00443b75',
    _createdDate: {
      $date: '2024-08-27T09:48:25.098Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.098Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 11,
    name: 'economy',
    _id: '9f525e9f-9244-44cd-9518-a3833a60fd3c',
    _createdDate: {
      $date: '2024-08-27T09:48:25.097Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.097Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 64,
    name: 'ecosystems',
    _id: '2e9e1f8b-bc85-4f7a-a16b-91f106b4fa75',
    _createdDate: {
      $date: '2024-08-27T09:48:25.096Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.096Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 19,
    name: 'education',
    _id: 'fca15479-fa61-4bac-9600-c327f6ccb1c2',
    _createdDate: {
      $date: '2024-08-27T09:48:25.095Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.095Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 37,
    name: 'emerging technologies',
    _id: '6fd3da55-4094-4d1b-8385-b1a5125ff7b1',
    _createdDate: {
      $date: '2024-08-27T09:48:25.094Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.094Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 18,
    name: 'energy',
    _id: '160f556b-6e6f-4957-a2b6-12a30f8a2d58',
    _createdDate: {
      $date: '2024-08-27T09:48:25.093Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.093Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 56,
    name: 'ethics',
    _id: '181c91b0-ed13-40a9-8c45-077c30a6b4ad',
    _createdDate: {
      $date: '2024-08-27T09:48:25.092Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.092Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 67,
    name: 'EU R&I policy',
    _id: '74f1a07e-9754-4e06-9091-30d0d7d4e667',
    _createdDate: {
      $date: '2024-08-27T09:48:25.091Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.091Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 68,
    name: 'fairness',
    _id: 'bf9e79aa-543b-46cf-a108-9ceb46520d5e',
    _createdDate: {
      $date: '2024-08-27T09:48:25.090Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.090Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 57,
    name: 'food',
    _id: '9bc8de80-3e4f-4fe9-b5b7-f2453006d157',
    _createdDate: {
      $date: '2024-08-27T09:48:25.089Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.089Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 49,
    name: 'geoengineering',
    _id: '050855fa-fe84-4a04-84c2-f9b1298b7171',
    _createdDate: {
      $date: '2024-08-27T09:48:25.088Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.088Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 27,
    name: 'geopolitics',
    _id: '504908e9-94ee-41de-b2c3-4351b6152e0b',
    _createdDate: {
      $date: '2024-08-27T09:48:25.087Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.087Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 60,
    name: 'global commons',
    _id: '8821a181-fe19-4948-98b7-dbb83f9c7b59',
    _createdDate: {
      $date: '2024-08-27T09:48:25.086Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.086Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 58,
    name: 'green skills',
    _id: '4ff73370-83a5-46b0-9b07-f44fb938ef2d',
    _createdDate: {
      $date: '2024-08-27T09:48:25.085Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.085Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 14,
    name: 'health',
    _id: '255f22bd-fa84-4b93-a1f3-df2944b48ffa',
    _createdDate: {
      $date: '2024-08-27T09:48:25.084Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.084Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 38,
    name: 'human centered design',
    _id: '299c308f-63fe-4e1c-ba09-04a49068ce94',
    _createdDate: {
      $date: '2024-08-27T09:48:25.083Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.083Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 33,
    name: 'human connection',
    _id: 'c7b5dbd7-68b7-4531-a1f7-cd31e58e0a59',
    _createdDate: {
      $date: '2024-08-27T09:48:25.082Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.082Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 40,
    name: 'hydrogen',
    _id: '962519e8-b820-4294-9262-7baa3aeb8646',
    _createdDate: {
      $date: '2024-08-27T09:48:25.081Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.081Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 69,
    name: 'innovation',
    _id: 'fbc8b693-f1b1-496a-8591-769ad797ad0d',
    _createdDate: {
      $date: '2024-08-27T09:48:25.080Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.080Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 13,
    name: 'IPR regulation',
    _id: 'a446c451-868d-463d-b1a3-303e2c4cd8c5',
    _createdDate: {
      $date: '2024-08-27T09:48:25.079Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.079Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 62,
    name: 'labour',
    _id: 'e700ae98-8f34-42ee-bfce-88fadab6e2cf',
    _createdDate: {
      $date: '2024-08-27T09:48:25.078Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.078Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 16,
    name: 'land use',
    _id: '8969d9f3-9909-4594-8511-8ef3af793dbe',
    _createdDate: {
      $date: '2024-08-27T09:48:25.077Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.077Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 36,
    name: 'mobility in culture',
    _id: 'b7a75255-0e72-4a39-8baa-2c43226f28b3',
    _createdDate: {
      $date: '2024-08-27T09:48:25.076Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.076Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 41,
    name: 'oceans',
    _id: 'cfe6fa44-7469-4138-9db3-8dcebc0e9844',
    _createdDate: {
      $date: '2024-08-27T09:48:25.075Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.075Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 20,
    name: 'organic farming',
    _id: 'fae450e2-9a3c-4b00-b8ab-8e9eab67d1ec',
    _createdDate: {
      $date: '2024-08-27T09:48:25.074Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.074Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 46,
    name: 'political participation',
    _id: 'e03634a6-e859-45e3-bb69-6cc0b7d5f8d5',
    _createdDate: {
      $date: '2024-08-27T09:48:25.073Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.073Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 30,
    name: 'progressive education',
    _id: '9af6785c-4e06-40e9-80ac-f3378a8f6a2b',
    _createdDate: {
      $date: '2024-08-27T09:48:25.072Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.072Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 21,
    name: 'regenerative economy',
    _id: '02cfa0e4-9723-47f3-9b2d-b262242be010',
    _createdDate: {
      $date: '2024-08-27T09:48:25.071Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.071Z',
    },
    tagId: 1111,
    tagType: 'domain',
  },
  {
    popularity: 71,
    name: 'religion',
    _id: '6dca57ab-35d1-4e9d-afbb-a3c3eedf57d1',
    _createdDate: {
      $date: '2024-08-27T09:48:25.070Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.070Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 65,
    name: 'responsible research and innovation',
    _id: '20483ea8-1e97-4b0b-ad05-86fb7412749e',
    _createdDate: {
      $date: '2024-08-27T09:48:25.069Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.069Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 55,
    name: 'science',
    _id: '622a56c2-8a0b-4f2f-8df2-2f08463b104c',
    _createdDate: {
      $date: '2024-08-27T09:48:25.068Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.068Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 45,
    name: 'science for policy',
    _id: '0e1048be-630f-424c-806d-bb2aac576213',
    _createdDate: {
      $date: '2024-08-27T09:48:25.067Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.067Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 61,
    name: 'social confrontations',
    _id: '1d88c662-cc0a-4040-ad40-31b82e8fc648',
    _createdDate: {
      $date: '2024-08-27T09:48:25.066Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.066Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 31,
    name: 'social innovation',
    _id: 'dfef94c1-0a2b-4305-be91-66ace52b285b',
    _createdDate: {
      $date: '2024-08-27T09:48:25.065Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.065Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 44,
    name: 'social responsibility',
    _id: '6a6f11bf-1cfb-4bee-91d5-78af5917878c',
    _createdDate: {
      $date: '2024-08-27T09:48:25.064Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.064Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 26,
    name: 'sustainability',
    _id: 'b5ca1e23-5548-4d91-adfe-eeb08f2062a6',
    _createdDate: {
      $date: '2024-08-27T09:48:25.063Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.063Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 28,
    name: 'technological change',
    _id: '38c263dc-399a-4ffc-a02c-7d8541ca872c',
    _createdDate: {
      $date: '2024-08-27T09:48:25.062Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.062Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 42,
    name: 'tourism',
    _id: 'ef20972d-aee1-4dda-9d33-3ddd8cedfd32',
    _createdDate: {
      $date: '2024-08-27T09:48:25.061Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.061Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 43,
    name: 'transhumanism',
    _id: '4369e526-6267-4afc-a73c-af45bf2ef9e0',
    _createdDate: {
      $date: '2024-08-27T09:48:25.060Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.060Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 10,
    name: 'travel',
    _id: '8dbac654-381b-4d01-989e-5131efb1b022',
    _createdDate: {
      $date: '2024-08-27T09:48:25.059Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.059Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 23,
    name: 'value chains',
    _id: '31c256c4-c887-4f25-bfba-31430aa41b57',
    _createdDate: {
      $date: '2024-08-27T09:48:25.058Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.058Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 72,
    name: 'youth',
    _id: '33b27522-1873-45d3-9558-59b8031fcf3f',
    _createdDate: {
      $date: '2024-08-27T09:48:25.057Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:25.057Z',
    },
    tagType: 'domain',
  },
  {
    popularity: 39,
    trend: '9',
    name: 'Delphi',
    _id: '5debdc5d-652a-4130-a24b-49a3ec66ee66',
    _createdDate: {
      $date: '2024-08-27T09:48:24.966Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.966Z',
    },
    tagType: 'foresight method',
  },
  {
    popularity: 25,
    trend: '3',
    name: 'deep dive',
    _id: '1bd32d66-b4fe-4207-b371-157a41107d11',
    _createdDate: {
      $date: '2024-08-27T09:48:24.965Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.965Z',
    },
    tagType: 'foresight method',
  },
  {
    popularity: 44,
    name: 'driver-mapping',
    _id: '9f1bd70a-cea1-4a1a-8f71-948c94e00513',
    _createdDate: {
      $date: '2024-08-27T09:48:24.964Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.964Z',
    },
    tagType: 'foresight method',
  },
  {
    popularity: 28,
    name: 'expert panels',
    _id: 'd4dce5a9-3a98-4dab-8dc7-a73d3136ad8c',
    _createdDate: {
      $date: '2024-08-27T09:48:24.963Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.963Z',
    },
    tagType: 'foresight method',
  },
  {
    popularity: 33,
    name: 'expert workshops',
    _id: '6c84e284-84b3-49dd-938d-3a5d8a9f7259',
    _createdDate: {
      $date: '2024-08-27T09:48:24.962Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.962Z',
    },
    tagType: 'foresight method',
  },
  {
    popularity: 38,
    name: 'extrapolation',
    _id: 'd34444fb-f15b-4122-9aad-0732bab462b7',
    _createdDate: {
      $date: '2024-08-27T09:48:24.961Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.961Z',
    },
    tagType: 'foresight method',
  },
  {
    popularity: 31,
    name: 'forecasting tournaments',
    _id: 'd138ddf2-4561-4264-8080-cdfaa099ae04',
    _createdDate: {
      $date: '2024-08-27T09:48:24.960Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.960Z',
    },
    tagType: 'foresight method',
  },
  {
    popularity: 43,
    name: 'futures stories',
    _id: 'f17b8201-5b2f-4b91-914e-0d266ea1312a',
    _createdDate: {
      $date: '2024-08-27T09:48:24.958Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.958Z',
    },
    tagType: 'foresight method',
  },
  {
    popularity: 47,
    name: 'horizon scanning',
    _id: 'b1d63812-7f03-4fa0-bfc7-b8d89363baa8',
    _createdDate: {
      $date: '2024-08-27T09:48:24.957Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.957Z',
    },
    tagType: 'foresight method',
  },
  {
    popularity: 34,
    name: 'interviews',
    _id: '36e5f3ff-5089-46ea-8d43-ae291ee9bd24',
    _createdDate: {
      $date: '2024-08-27T09:48:24.955Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.955Z',
    },
    tagType: 'foresight method',
  },
  {
    popularity: 27,
    name: 'judgemental forecasting',
    _id: '98d2c2cd-7667-46fc-95d4-7d2f273e3a9c',
    _createdDate: {
      $date: '2024-08-27T09:48:24.954Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.954Z',
    },
    tagType: 'foresight method',
  },
  {
    popularity: 41,
    name: 'lived experience storytelling',
    _id: '5f178089-b2f1-4c4a-ad32-d60730f5652e',
    _createdDate: {
      $date: '2024-08-27T09:48:24.953Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.953Z',
    },
    tagType: 'foresight method',
  },
  {
    popularity: 32,
    name: 'media discourse analysis',
    _id: '3d5dedec-84aa-49e7-8bc4-d44812c99a97',
    _createdDate: {
      $date: '2024-08-27T09:48:24.952Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.952Z',
    },
    tagType: 'foresight method',
  },
  {
    popularity: 46,
    name: 'modelling',
    _id: '271e5e0e-1be8-42a3-8f0e-87d0f83f2e55',
    _createdDate: {
      $date: '2024-08-27T09:48:24.951Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.951Z',
    },
    tagType: 'foresight method',
  },
  {
    popularity: 26,
    name: 'policy stress-testing',
    _id: '2334e1f6-02d5-451a-bc36-b2af4777d99e',
    _createdDate: {
      $date: '2024-08-27T09:48:24.948Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.948Z',
    },
    tagId: 2222,
    tagType: 'foresight method',
  },
  {
    popularity: 36,
    name: 'scenarios',
    _id: '3c4917d4-7467-4fef-a6a3-af7b61b9e196',
    _createdDate: {
      $date: '2024-08-27T09:48:24.946Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.946Z',
    },
    tagType: 'foresight method',
  },
  {
    popularity: 30,
    name: 'social media analysis',
    _id: '2928594c-ac0f-40c2-b915-9d2abacf9804',
    _createdDate: {
      $date: '2024-08-27T09:48:24.945Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.945Z',
    },
    tagType: 'foresight method',
  },
  {
    popularity: 42,
    name: 'visioning',
    _id: '932d682a-b111-46b2-b6a5-aade8c598da6',
    _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
    _createdDate: {
      $date: '2024-08-27T09:48:24.944Z',
    },
    _updatedDate: {
      $date: '2024-10-15T10:56:02.615Z',
    },
    tagType: 'foresight method',
  },
  {
    popularity: 55,
    tagline:
      'Unitatea Executivă pentru Finanțarea Învățământului superior, a Cercetării, Dezvoltării și Inovării',
    trend: '5',
    name: 'UEFISCDI',
    _id: '95224d24-7699-4603-8d55-58c15794dd58',
    _owner: 'd63d4075-c493-4434-b07b-3455eb228b81',
    _createdDate: {
      $date: '2024-08-27T09:48:24.898Z',
    },
    tagLine:
      'The Executive Agency for Higher Education, Research, Development and Innovation Funding of Romania',
    linked: true,
    _updatedDate: {
      $date: '2024-10-29T10:45:39.420Z',
    },
    picture:
      'https://static.wixstatic.com/media/471908_f66da0478b09447ba0708a35af2af36c~mv2.png',
    tagType: 'organisation',
    tagPageLink: '/organisation/UEFISCDI_rloxg',
  },
  {
    popularity: 29,
    trend: '9',
    name: 'The Department of Socio-Economic Geography at the University of Gdansk',
    _id: 'aeeb3524-6f2f-4005-aba8-5a95d0e56cb7',
    _createdDate: {
      $date: '2024-08-27T09:48:24.897Z',
    },
    linked: true,
    _updatedDate: {
      $date: '2024-08-27T09:48:24.897Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 82,
    trend: '12',
    name: 'University of Oxford',
    _id: '6c8348bb-2c6c-47a5-8d6e-9bb9d9f5107e',
    _createdDate: {
      $date: '2024-08-27T09:48:24.896Z',
    },
    linked: true,
    _updatedDate: {
      $date: '2024-08-27T09:48:24.896Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 75,
    trend: '3',
    name: 'Fondazione Coispa ETS',
    _id: '3a440b29-2550-47d5-b351-b3a7f55fb423',
    _createdDate: {
      $date: '2024-08-27T09:48:24.895Z',
    },
    linked: true,
    _updatedDate: {
      $date: '2024-08-27T09:48:24.895Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 32,
    name: 'Engineering – Ingegneria Informatica Spa',
    _id: '04bfa5eb-e23e-42dd-b91c-cbf020475c4e',
    _createdDate: {
      $date: '2024-08-27T09:48:24.894Z',
    },
    linked: true,
    _updatedDate: {
      $date: '2024-08-27T09:48:24.894Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 65,
    name: 'Tipi',
    _id: '223fe2cc-7eaf-449c-9a00-14ebaa565a78',
    _createdDate: {
      $date: '2024-08-27T09:48:24.893Z',
    },
    linked: true,
    _updatedDate: {
      $date: '2024-08-27T09:48:24.893Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 81,
    name: 'Business Hippie Club',
    _id: '36f38adc-2ef7-44de-8f24-77dd771f107f',
    _createdDate: {
      $date: '2024-08-27T09:48:24.892Z',
    },
    linked: true,
    _updatedDate: {
      $date: '2024-08-27T09:48:24.892Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 88,
    tagline: 'Leibniz Institut fur Wirtschaftsforschung e.V.',
    name: 'RWI',
    _id: 'c57324ba-8a65-47a3-a5ba-a6d4b837556f',
    _createdDate: {
      $date: '2024-08-27T09:48:24.891Z',
    },
    linked: true,
    _updatedDate: {
      $date: '2024-08-27T09:48:24.891Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 104,
    name: 'Technische Universiteit Eindhoven',
    _id: 'eed1bcbc-80bf-4af9-bfc3-cac6e320663f',
    _createdDate: {
      $date: '2024-08-27T09:48:24.890Z',
    },
    linked: true,
    _updatedDate: {
      $date: '2024-08-27T09:48:24.890Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 108,
    name: 'Aarhus Universitet',
    _id: '6d0c5a80-b8e4-4429-b282-b73eb90770f2',
    _createdDate: {
      $date: '2024-08-27T09:48:24.889Z',
    },
    linked: true,
    _updatedDate: {
      $date: '2024-08-27T09:48:24.889Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 12,
    tagline: 'Consiglio Nazionale delle Ricerche',
    name: 'CNR',
    _id: 'c4b51c39-e9ba-4c5a-9a19-8033caf815c9',
    _createdDate: {
      $date: '2024-08-27T09:48:24.888Z',
    },
    linked: true,
    _updatedDate: {
      $date: '2024-08-27T09:48:24.888Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 13,
    name: 'European Union External Action Service',
    _id: '17162201-aee4-4121-9fd3-5ef41d8c545b',
    _createdDate: {
      $date: '2024-08-27T09:48:24.887Z',
    },
    linked: true,
    _updatedDate: {
      $date: '2024-08-27T09:48:24.887Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 93,
    name: 'STAM 123',
    _id: 'a7fd6938-177c-4128-9f50-2c97b6713d9f',
    _createdDate: {
      $date: '2024-08-27T09:48:24.886Z',
    },
    tagLine: 'STAM Tagline',
    linked: true,
    _updatedDate: {
      $date: '2024-10-05T13:11:23.411Z',
    },
    tagType: 'organisation',
    tagPageLink: 'STAM_vbcmz',
  },
  {
    popularity: 71,
    tagline:
      'Bundesforschungsinstitut Fuer Laendliche Raeume, Wald und Fischerei',
    name: 'Johann Heinrich Von Thuenen-Institut',
    _id: '8f2c2795-886d-49b9-8d70-f8fdbb8a03f1',
    _createdDate: {
      $date: '2024-08-27T09:48:24.885Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.885Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 101,
    name: 'University of Exeter',
    _id: '011082be-f603-46ee-8473-774a4672e94d',
    _createdDate: {
      $date: '2024-08-27T09:48:24.884Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.884Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 7,
    tagline: 'University of Social Sciences and Humanities',
    name: 'SWPS University',
    _id: '98a2bd49-b332-48ed-8c3e-a459ead1c590',
    _createdDate: {
      $date: '2024-08-27T09:48:24.883Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.883Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 25,
    name: 'Prasidentenkonferenz der Landwirtschaftskammern Osterreichs',
    _id: '0a2d3fdc-9d56-4316-b44f-e6d74655bfcb',
    _createdDate: {
      $date: '2024-08-27T09:48:24.882Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.882Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 45,
    name: 'Aston University',
    _id: '9a9be771-ac60-4743-8e69-d47188005903',
    _createdDate: {
      $date: '2024-08-27T09:48:24.881Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.881Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 78,
    name: 'Centro Internazionale di Altistudi Agronomici Mediterranei',
    _id: 'b18f438c-126b-4339-93d0-3cc50cd4a200',
    _createdDate: {
      $date: '2024-08-27T09:48:24.880Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.880Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 5,
    name: 'Futurlab',
    _id: 'f1c95512-8031-479d-8aab-063b21fb7663',
    _createdDate: {
      $date: '2024-08-27T09:48:24.879Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.879Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 55,
    name: 'formicablu',
    _id: '56947ac0-01f2-4e91-9811-2a8763c3f486',
    _createdDate: {
      $date: '2024-08-27T09:48:24.878Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.878Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 47,
    name: 'The Futures Literacy Company',
    _id: '30f6b8f5-8a4c-495c-87bc-9e777d266e20',
    _createdDate: {
      $date: '2024-08-27T09:48:24.877Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.877Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 85,
    name: 'Eutropian',
    _id: '8c61a25b-8809-4fb9-89fc-80145d953c95',
    _createdDate: {
      $date: '2024-08-27T09:48:24.876Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.876Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 17,
    name: 'European Investment Bank',
    _id: '16bd5378-7ec4-497f-8b6d-af98cfab11d4',
    _createdDate: {
      $date: '2024-08-27T09:48:24.875Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.875Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 40,
    tagline: 'European Commission Joint Research Centre',
    name: 'JRC',
    _id: '178e41df-b471-4a97-a4dc-03def92fbee6',
    _createdDate: {
      $date: '2024-08-27T09:48:24.874Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.874Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 114,
    tagline: 'UNIBO',
    name: 'The University of Bologna',
    _id: '889a4484-4dfd-4d0e-859d-7ce5aeab9a88',
    _createdDate: {
      $date: '2024-08-27T09:48:24.873Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.873Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 2,
    name: 'G.A.C. Group',
    _id: 'fa79f631-3dc6-4028-8bdb-2e057e291f13',
    _createdDate: {
      $date: '2024-08-27T09:48:24.872Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.872Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 50,
    name: 'Joint Research Center',
    _id: 'f85b3c01-69e8-4688-8766-14c3910bea1b',
    _createdDate: {
      $date: '2024-08-27T09:48:24.871Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.871Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 67,
    name: 'European Cultural Foundation',
    _id: '58a99a1a-76d0-4fc9-a58d-42b5624d79d3',
    _createdDate: {
      $date: '2024-08-27T09:48:24.870Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.870Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 38,
    name: 'Junior Academy of Sciences of Ukraine',
    _id: '4b313ed2-4721-4409-bb36-4bc67cb5b3f3',
    _createdDate: {
      $date: '2024-08-27T09:48:24.869Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.869Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 98,
    tagline: 'Comparative Research Network',
    name: 'CRN',
    _id: 'a620fe8c-7020-4e2c-9367-a352113f1b16',
    _createdDate: {
      $date: '2024-08-27T09:48:24.868Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.868Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 22,
    name: 'Universita degli Studi di Padova',
    _id: 'b88aab34-d3f3-4485-86a3-acaa7f68f5b8',
    _createdDate: {
      $date: '2024-08-27T09:48:24.867Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.867Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 9,
    tagline: 'Kozgazdasag - Es Regionalis Tudomanyi Kutatokozpont',
    name: 'CERS',
    _id: '9ba22c5b-5a22-44af-9e68-3ffaedd544f1',
    _createdDate: {
      $date: '2024-08-27T09:48:24.866Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.866Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 107,
    name: 'Universidad de la Iglesia de Deusto Entidad Religiosa',
    _id: 'd436274c-b042-4ce7-b2f7-ee9c9d7eec60',
    _createdDate: {
      $date: '2024-08-27T09:48:24.865Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.865Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 115,
    name: 'ARCTIK SRL',
    _id: '4ba5956d-b12b-4f95-813e-7a480bb36ab4',
    _createdDate: {
      $date: '2024-08-27T09:48:24.864Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.864Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 26,
    tagline: 'European Innovation Council',
    name: 'EIC',
    _id: '164e8a4a-f344-48cd-9947-8d94ba35caf2',
    _createdDate: {
      $date: '2024-08-27T09:48:24.863Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.863Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 80,
    name: 'European Union Institute for Security Studies',
    _id: 'b4930f84-f16b-4c97-a9e1-85655b0668b3',
    _createdDate: {
      $date: '2024-08-27T09:48:24.862Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.862Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 73,
    name: 'Elektrotehnicki Fakultet Univerzitet u Beogradu',
    _id: '0aed1ff5-a083-4530-b992-cba8faed9534',
    _createdDate: {
      $date: '2024-08-27T09:48:24.861Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.861Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 56,
    tagline: 'Verband fur Okologischen Landbau Ev',
    name: 'NATURLAND',
    _id: 'ec37b234-8f6d-4b3a-ba65-b95daa2a3752',
    _createdDate: {
      $date: '2024-08-27T09:48:24.860Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.860Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 97,
    name: 'Landwirtschaftskammer Niederoesterreich',
    _id: '0a453e4b-853b-47fc-a284-b4344a637490',
    _createdDate: {
      $date: '2024-08-27T09:48:24.859Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.859Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 87,
    name: 'Universita Politecnica delle Marche',
    _id: '13c5c12e-ac78-451c-a1f3-39ec45bd7fa3',
    _createdDate: {
      $date: '2024-08-27T09:48:24.858Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.858Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 96,
    name: 'Normals',
    _id: '24c6b00f-cde2-49a3-bcf0-b318f6b4ce55',
    _createdDate: {
      $date: '2024-08-27T09:48:24.857Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.857Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 105,
    name: 'University of Eastern Finland',
    _id: 'e2bcbb17-392f-44ad-b580-e26a0e7b1bb0',
    _createdDate: {
      $date: '2024-08-27T09:48:24.856Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.856Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 95,
    name: 'University College Dublin, National University of Ireland, Dublin',
    _id: '4059fb96-ef7b-47a4-97aa-58b005617c5a',
    _createdDate: {
      $date: '2024-08-27T09:48:24.855Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.855Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 118,
    name: 'People’s Voice Media',
    _id: 'f8e591df-1904-4622-8761-ea4d6541763e',
    _createdDate: {
      $date: '2024-08-27T09:48:24.854Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.854Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 43,
    name: 'Association TRACES',
    _id: '41b5f110-1546-4d67-977e-89d9971beaeb',
    _createdDate: {
      $date: '2024-08-27T09:48:24.853Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.853Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 110,
    name: 'i2CAT',
    _id: 'd34537e2-178c-4598-bcfb-d5d6d11a3cf6',
    _createdDate: {
      $date: '2024-08-27T09:48:24.852Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.852Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 117,
    name: 'Council of the European Union',
    _id: 'f04a61af-d373-40a4-9ffe-bc93b4284119',
    _createdDate: {
      $date: '2024-08-27T09:48:24.851Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.851Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 4,
    tagline:
      'non-governmental and non-profit think-tank of researchers and public sector experts',
    name: 'Ceske Priority',
    _id: '508dfceb-8f6c-454a-a30b-7e6441da6367',
    _createdDate: {
      $date: '2024-08-27T09:48:24.850Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.850Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 44,
    name: 'ESHA',
    _id: '8823eb6a-e9fb-4f9e-8bd8-9ba26d9839e3',
    _createdDate: {
      $date: '2024-08-27T09:48:24.849Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.849Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 119,
    name: 'Futures2all',
    _id: 'dfff2889-0a38-45a5-8e25-8c08deca0f92',
    _createdDate: {
      $date: '2024-08-27T09:48:24.848Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.848Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 112,
    name: 'University of Malta',
    _id: '9a52e1ae-b223-4d3c-8f58-434f5882d79b',
    _createdDate: {
      $date: '2024-08-27T09:48:24.847Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.847Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 103,
    tagline: 'Urad Vlady Slovenskej Republiky',
    name: 'UV SR',
    _id: '1e245cf6-eec8-4093-8caf-32e7171029a6',
    _createdDate: {
      $date: '2024-08-27T09:48:24.846Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.846Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 74,
    name: 'S. Mantzanakis KAI SIA O.E (Helenos)',
    _id: 'cc76eec4-212a-4650-bdc7-2cd4a8fd6f48',
    _createdDate: {
      $date: '2024-08-27T09:48:24.845Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.845Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 57,
    name: 'European Committee of the Regions',
    _id: '26600df6-3a86-4967-a4fd-79e9505b224e',
    _createdDate: {
      $date: '2024-08-27T09:48:24.844Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.844Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 28,
    name: 'The Municipality of Reggio Emilia',
    _id: 'e93bcc5d-7c91-44dc-8ed1-0a8b4c5c5486',
    _createdDate: {
      $date: '2024-08-27T09:48:24.843Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.843Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 60,
    tagline: 'The European Network for Science Centres and Museums',
    name: 'Ecsite',
    _id: 'c016100b-6586-48cf-9468-b9c4e903e9fb',
    _createdDate: {
      $date: '2024-08-27T09:48:24.842Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.842Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 91,
    name: 'Gdansk (Municipality?)',
    _id: '637f0722-6a17-4640-8e03-d06d174fc1d0',
    _createdDate: {
      $date: '2024-08-27T09:48:24.841Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.841Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 64,
    name: 'International Federation of Organic Agriculture Movements European Union Regional Group',
    _id: '7a3e8644-e8d6-4190-9198-915d3dafedac',
    _createdDate: {
      $date: '2024-08-27T09:48:24.840Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.840Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 68,
    tagline: 'Technologicke Centrum Praha ZSPO',
    name: 'TC Praha',
    _id: '6f52fb6e-0645-4571-91be-b61087dea931',
    _createdDate: {
      $date: '2024-08-27T09:48:24.839Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.839Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 34,
    name: 'Politecnico di Milano',
    _id: '1148e6cb-6e3e-465d-b442-40b936b78f2d',
    _createdDate: {
      $date: '2024-08-27T09:48:24.838Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.838Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 37,
    tagline: 'Centre for Social Innovation',
    name: 'ZSI',
    _id: 'fbf6fe92-1bc7-478e-89f2-dfb19c9ed93a',
    _createdDate: {
      $date: '2024-08-27T09:48:24.837Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.837Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 11,
    name: 'LUISS',
    _id: 'ce6b0050-4b68-483d-a409-0f737c69711a',
    _createdDate: {
      $date: '2024-08-27T09:48:24.836Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.836Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 39,
    tagline: 'UTU',
    name: 'Turun Yliopisto',
    _id: '7dfad0f1-9820-4f33-a922-3150776970bf',
    _createdDate: {
      $date: '2024-08-27T09:48:24.835Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.835Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 116,
    tagline:
      'Instituto de Engenhariade Sistemas e Computadores, Tecnologia e Ciencia',
    name: 'INSEC TEC',
    _id: 'fa692a60-7748-41f4-8c18-d877e8e94dcb',
    _createdDate: {
      $date: '2024-08-27T09:48:24.834Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.834Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 15,
    name: 'The University of Manchester',
    _id: '8b50d097-dd4c-4021-aed3-f7ff330adf55',
    _createdDate: {
      $date: '2024-08-27T09:48:24.833Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.833Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 51,
    name: 'AB.ACUS SRL',
    _id: '23b1743f-5bf2-4eef-b5e6-d0bbcae1e02f',
    _createdDate: {
      $date: '2024-08-27T09:48:24.832Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.832Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 20,
    tagline: 'BMZ',
    name: 'German Federal Ministry for Economic Cooperation and Development',
    _id: 'fee868de-8795-4dd6-a2d6-517f88c65a50',
    _createdDate: {
      $date: '2024-08-27T09:48:24.831Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.831Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 14,
    tagline:
      'Fraunhofer Gesellschaft Zur Forderung Der Angewandten Forschung EV',
    name: 'Fraunhofer',
    _id: 'd4d28752-82da-493b-9075-edb3cad6afd4',
    _createdDate: {
      $date: '2024-08-27T09:48:24.830Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.830Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 106,
    name: 'Fraunhofer ISI',
    _id: 'b83286d1-5153-4efa-b694-e1828ca61739',
    _createdDate: {
      $date: '2024-08-27T09:48:24.829Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.829Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 6,
    name: 'Aristotelio Panepistimio Thessalonikis',
    _id: 'aac27909-04f4-4ff7-9a65-625aed019f1d',
    _createdDate: {
      $date: '2024-08-27T09:48:24.828Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.828Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 89,
    name: 'MADE SCARL',
    _id: '8b8e2506-f74b-4502-ae7c-6c61145a2051',
    _createdDate: {
      $date: '2024-08-27T09:48:24.827Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.827Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 52,
    name: 'VTT',
    _id: 'd182861b-6b93-4489-9fec-b0ddfd76840e',
    _createdDate: {
      $date: '2024-08-27T09:48:24.826Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.826Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 92,
    name: 'European Commission',
    _id: '2202a680-08ba-4055-aa8d-bf6ea285978f',
    _createdDate: {
      $date: '2024-08-27T09:48:24.825Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.825Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 58,
    name: 'Iris Technology Solutions Sociedad Limitada',
    _id: '6e643107-5b0e-4a85-acfc-69326654259b',
    _createdDate: {
      $date: '2024-08-27T09:48:24.824Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.824Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 21,
    tagline: 'Deutsches Zentrum Fur Luft - Und Raumfahrt',
    name: 'DLR',
    _id: '902becad-0a91-4957-95de-c83c65e80b0f',
    _createdDate: {
      $date: '2024-08-27T09:48:24.823Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.823Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 70,
    name: 'Panteion',
    _id: '36e3c79f-6177-432a-9ded-50de529dd119',
    _createdDate: {
      $date: '2024-08-27T09:48:24.822Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.822Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 59,
    name: 'European Parliament',
    _id: '4b4ea29e-21a4-454f-9ad0-34014bfa83f3',
    _createdDate: {
      $date: '2024-08-27T09:48:24.821Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.821Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 42,
    name: 'Development Centre of Võru County',
    _id: 'ee634392-1cbc-4ae4-8a6e-457c9bf2bd3d',
    _createdDate: {
      $date: '2024-08-27T09:48:24.820Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.820Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 31,
    name: 'European Commission, Research and innovation, Policy Support Facility',
    _id: '78d5a9dc-6754-4d8f-86d8-231c6b857179',
    _createdDate: {
      $date: '2024-08-27T09:48:24.819Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.819Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 62,
    tagline: 'Gesellschaft für Internationale Zusammenarbeit GmbH',
    name: 'GIZ',
    _id: 'f1f72e99-d4b1-414e-87db-bd2311bd35dc',
    _createdDate: {
      $date: '2024-08-27T09:48:24.818Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.818Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 99,
    name: 'Modem',
    _id: '144f9bb3-9158-4436-a0f9-32be481777eb',
    _createdDate: {
      $date: '2024-08-27T09:48:24.817Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.817Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 94,
    name: 'European Court of Auditors',
    _id: 'f785c3bf-3cce-45f1-a1dd-685574cc683f',
    _createdDate: {
      $date: '2024-08-27T09:48:24.816Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.816Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 63,
    name: 'Copernicus Science Centre',
    _id: 'a493263a-0ae2-4e8b-b18c-13436cdbffaf',
    _createdDate: {
      $date: '2024-08-27T09:48:24.815Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.815Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 1,
    tagline: 'VDI/VDE Innovation + Technik GmbH',
    name: 'VDI/VDE IT',
    _id: '1c6695d3-0ea3-448f-b229-ca0381e6502e',
    _createdDate: {
      $date: '2024-08-27T09:48:24.814Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.814Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 53,
    name: 'GLUON',
    _id: '60acdc2e-5b45-4e88-a671-f2d5c1a83eb4',
    _createdDate: {
      $date: '2024-08-27T09:48:24.813Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.813Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 79,
    name: 'Future Based',
    _id: '3a28ca3d-4b47-474d-a741-8d3e8da1f392',
    _createdDate: {
      $date: '2024-08-27T09:48:24.812Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.812Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 30,
    tagline: 'Insight Foresight Institute SL',
    name: 'IFI',
    _id: '76749d48-09c7-4023-9741-baacc42ab6fc',
    _createdDate: {
      $date: '2024-08-27T09:48:24.811Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.811Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 19,
    tagline: 'Fundacao Para A Ciencia E A Tecnologia',
    name: 'FCT',
    _id: '52f1932c-db39-431e-94d9-07cbd873c666',
    _createdDate: {
      $date: '2024-08-27T09:48:24.810Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.810Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 16,
    name: 'APRE',
    _id: '758ceb1a-a484-4068-9910-dab909cdece5',
    _createdDate: {
      $date: '2024-08-27T09:48:24.809Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.809Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 23,
    name: 'PAL Robotics SL',
    _id: '48601756-1b8a-4b20-856d-e7ce0329136a',
    _createdDate: {
      $date: '2024-08-27T09:48:24.808Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.808Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 90,
    name: 'Lisbon Council for Economic Competitiveness',
    _id: '7c8f123e-6914-4c85-ad20-e1aeeddf46ed',
    _createdDate: {
      $date: '2024-08-27T09:48:24.807Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.807Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 46,
    name: 'European Economic and Social Committee',
    _id: 'f454a1c5-c3e3-4f27-996d-4f7680182421',
    _createdDate: {
      $date: '2024-08-27T09:48:24.806Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.806Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 61,
    name: 'MitOst e.V.',
    _id: 'ee1d7957-3a52-4ca4-9963-cf3d9a1bc5c1',
    _createdDate: {
      $date: '2024-08-27T09:48:24.805Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.805Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 3,
    name: 'Kultura Nova Foundation',
    _id: '83f7fdef-eb5d-4e7c-8b8d-aa7b576d0b7d',
    _createdDate: {
      $date: '2024-08-27T09:48:24.804Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.804Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 76,
    name: 'Technopolis',
    _id: 'dadcf68f-2f7e-44ae-a10e-d53e570c225a',
    _createdDate: {
      $date: '2024-08-27T09:48:24.803Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.803Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 54,
    name: 'Teach the Future',
    _id: 'e0b39024-785a-4e1a-8832-93c24e96970e',
    _createdDate: {
      $date: '2024-08-27T09:48:24.802Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.802Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 10,
    name: 'Fundacion Zaragoza Logistics Center',
    _id: '5335be58-44c7-4c00-a18e-fab4dc17e924',
    _createdDate: {
      $date: '2024-08-27T09:48:24.800Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.800Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 100,
    name: 'Universitatea Spiru Haret',
    _id: 'd3297b45-14d1-4161-b781-7de92d00e9f5',
    _createdDate: {
      $date: '2024-08-27T09:48:24.799Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.799Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 41,
    name: 'Science View',
    _id: '5e708048-bd94-4063-a8cc-75172de45701',
    _createdDate: {
      $date: '2024-08-27T09:48:24.798Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.798Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 113,
    tagline: 'Consultoria Agroindustrial LDA',
    name: 'CONSULAI',
    _id: '44df82b2-6b90-4fc8-998e-a358bae1e212',
    _createdDate: {
      $date: '2024-08-27T09:48:24.797Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.797Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 102,
    name: 'Fondation Institut de Recherche pour le Developpement Durable et les Relations Internationales',
    _id: '9f44723b-1868-4cb1-b8c2-3f10bec88302',
    _createdDate: {
      $date: '2024-08-27T09:48:24.796Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.796Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 83,
    name: 'Ministry of Labour and Social Affairs from Czech Republic',
    _id: '246af3af-a9b4-4342-bcba-5b79d2d6c315',
    _createdDate: {
      $date: '2024-08-27T09:48:24.795Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.795Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 49,
    tagline: 'Austrian Institute Of Technology GmbH',
    name: 'AIT',
    _id: 'f959a48e-b278-4676-adbf-5d086f6d1572',
    _createdDate: {
      $date: '2024-08-27T09:48:24.794Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.794Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 111,
    name: 'Kaunas University of Technology',
    _id: '193f7117-351d-45e9-8a03-90ece06a4ad7',
    _createdDate: {
      $date: '2024-08-27T09:48:24.793Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.793Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 72,
    tagline: 'Agenția Națională pentru Cercetare și Dezvoltare',
    name: 'ANCD',
    _id: '4f4e160f-2cb7-4315-b518-9bbecefa5ca7',
    _createdDate: {
      $date: '2024-08-27T09:48:24.792Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.792Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 120,
    name: 'Institut Technique de l Agriculture Biologique',
    _id: 'b630b68a-b1bf-4f07-8dbe-a99e32492a7b',
    _createdDate: {
      $date: '2024-08-27T09:48:24.791Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.791Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 77,
    name: 'PROSPER Network',
    _id: '5e265658-e669-4934-a235-a1e663324062',
    _createdDate: {
      $date: '2024-08-27T09:48:24.790Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.790Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 84,
    tagline:
      "Institut National De Recherche Pour L'agriculture, L'alimentation Et L'environnement",
    name: 'INRAE',
    _id: 'b745b59c-35c0-4a06-bf42-7a4be0c46c0c',
    _createdDate: {
      $date: '2024-08-27T09:48:24.789Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.789Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 69,
    tagline: 'Forschungsinstitutfur Biologischen Landbau in Europa',
    name: 'FIBL Europe',
    _id: 'b0e78ac1-5ef1-49bf-bbdf-1088552e002a',
    _createdDate: {
      $date: '2024-08-27T09:48:24.788Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.788Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 33,
    name: 'Futures Probes',
    _id: 'aab3890c-bdb1-4b3a-a2fb-20ab83271ac6',
    _createdDate: {
      $date: '2024-08-27T09:48:24.787Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.787Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 86,
    tagline: 'International Iberian Nanotechnology Laboratory',
    name: 'INL',
    _id: 'b60f2ebc-ed4a-4b03-b37d-51083fc25751',
    _createdDate: {
      $date: '2024-08-27T09:48:24.786Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.786Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 109,
    name: 'Policy Lab',
    _id: 'dccbb6dd-0eed-4e5e-98a9-2749ceafac12',
    _createdDate: {
      $date: '2024-08-27T09:48:24.785Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.785Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 36,
    name: 'Forschungsinstitut fur Biologischen Landbau Stiftung',
    _id: '6aa20ff9-2167-42f4-9f05-c7355fdacad4',
    _createdDate: {
      $date: '2024-08-27T09:48:24.784Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.784Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 27,
    tagline: 'Nonprofit Kft',
    name: 'Okologiai Mezogazdasagi Kutatointezet Kozhasznu',
    _id: '1fc5ed76-716f-40f7-a1a5-5f69f23b11b9',
    _createdDate: {
      $date: '2024-08-27T09:48:24.783Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.783Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 48,
    name: 'The University of Helsinki',
    _id: '0ff668d3-84c2-4323-becb-1c96d2d3a320',
    _createdDate: {
      $date: '2024-08-27T09:48:24.782Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.782Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 66,
    name: 'Ellinogermaniki Agogi',
    _id: '30c9c68d-7e25-4f83-8386-0ca2058a3e64',
    _createdDate: {
      $date: '2024-08-27T09:48:24.781Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.781Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 18,
    name: 'Innovationscenter for Okologisk Landbrug P/S',
    _id: '118bdc30-36c0-4cf5-9126-8dbf46f511c2',
    _createdDate: {
      $date: '2024-08-27T09:48:24.780Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.780Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 8,
    tagline: 'online forecasting platform and aggregation engine',
    name: 'Metaculus',
    _id: '8770a144-c599-430e-b41e-0c2e65474ecf',
    _createdDate: {
      $date: '2024-08-27T09:48:24.779Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.779Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 24,
    name: 'Universitat de Barcelona',
    _id: '9036d932-45c5-434e-b17c-18abbcce1e88',
    _createdDate: {
      $date: '2024-08-27T09:48:24.778Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.778Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 9,
    name: 'Cyprus',
    _id: '1a246b21-0ef3-422a-b4ed-d9e4938d0f79',
    _createdDate: {
      $date: '2024-08-27T09:48:24.777Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.777Z',
    },
    tagType: 'country',
  },
  {
    popularity: 3,
    name: 'Iceland',
    _id: '8a8831dc-1b37-4457-8ad2-725241f1f906',
    _createdDate: {
      $date: '2024-08-27T09:48:24.776Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.776Z',
    },
    tagType: 'country',
  },
  {
    popularity: 14,
    name: 'Austria',
    _id: '77164e27-9402-4336-bc1f-84b08612a080',
    _createdDate: {
      $date: '2024-08-27T09:48:24.775Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.775Z',
    },
    tagType: 'country',
  },
  {
    popularity: 18,
    name: 'Armenia',
    _id: 'fe9f9c77-5a2b-4b46-95e9-d9d8901d3373',
    _createdDate: {
      $date: '2024-08-27T09:48:24.774Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.774Z',
    },
    tagType: 'country',
  },
  {
    popularity: 33,
    name: 'Spain',
    _id: 'e0b7f833-7a38-4338-90f2-d0ce0a8f86b1',
    _createdDate: {
      $date: '2024-08-27T09:48:24.773Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.773Z',
    },
    tagType: 'country',
  },
  {
    popularity: 46,
    name: 'Montenegro',
    _id: 'f4c53f75-0cd8-4861-a500-2a50fd928337',
    _createdDate: {
      $date: '2024-08-27T09:48:24.772Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.772Z',
    },
    tagType: 'country',
  },
  {
    popularity: 28,
    name: 'Ukraine',
    _id: 'e193c711-0ac0-494e-bcc2-8ce045f23001',
    _createdDate: {
      $date: '2024-08-27T09:48:24.771Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.771Z',
    },
    tagType: 'country',
  },
  {
    popularity: 42,
    name: 'Finland',
    _id: '640a7a20-7496-4b99-b7b9-49902028b577',
    _createdDate: {
      $date: '2024-08-27T09:48:24.770Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.770Z',
    },
    tagType: 'country',
  },
  {
    popularity: 37,
    name: 'San Marino',
    _id: '7a0f7b74-f1d5-4887-91bb-72c98cb9d1b5',
    _createdDate: {
      $date: '2024-08-27T09:48:24.769Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.769Z',
    },
    tagType: 'country',
  },
  {
    popularity: 1,
    name: 'Norway',
    _id: '0f947ff0-89e9-4aaa-bbe0-d245ebc851fa',
    _createdDate: {
      $date: '2024-08-27T09:48:24.768Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.768Z',
    },
    tagType: 'country',
  },
  {
    popularity: 17,
    name: 'Bosnia and Herzegovina',
    _id: 'e039ba86-0276-49c0-a712-d58c25148ea8',
    _createdDate: {
      $date: '2024-08-27T09:48:24.767Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.767Z',
    },
    tagType: 'country',
  },
  {
    popularity: 15,
    name: 'Romania',
    _id: 'e4cab9c4-7f21-4ec6-88ad-7aa8698612f4',
    _createdDate: {
      $date: '2024-08-27T09:48:24.766Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.766Z',
    },
    tagType: 'country',
  },
  {
    popularity: 38,
    name: 'Ireland',
    _id: '8149fb36-b876-4dd4-9f74-039a782ae06f',
    _createdDate: {
      $date: '2024-08-27T09:48:24.765Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.765Z',
    },
    tagType: 'country',
  },
  {
    popularity: 34,
    name: 'Kosovo',
    _id: '4f720692-bdf3-4567-b165-579cc0f6cd62',
    _createdDate: {
      $date: '2024-08-27T09:48:24.764Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.764Z',
    },
    tagType: 'country',
  },
  {
    popularity: 43,
    name: 'Serbia',
    _id: '4b5b3f38-cdb8-4668-bac0-f5fe4b8f348f',
    _createdDate: {
      $date: '2024-08-27T09:48:24.763Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.763Z',
    },
    tagType: 'country',
  },
  {
    popularity: 36,
    name: 'Malta',
    _id: '3d8c9f82-99cb-4d39-b259-91c46dc957c4',
    _createdDate: {
      $date: '2024-08-27T09:48:24.762Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.762Z',
    },
    tagType: 'country',
  },
  {
    popularity: 11,
    name: 'Lithuania',
    _id: 'aec8813f-e71d-43b1-ba86-e869fb65e4e9',
    _createdDate: {
      $date: '2024-08-27T09:48:24.761Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.761Z',
    },
    tagType: 'country',
  },
  {
    popularity: 6,
    name: 'United Kingdom',
    _id: '4f54955a-fc9f-4d1b-9058-88ddb2835ee2',
    _createdDate: {
      $date: '2024-08-27T09:48:24.760Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.760Z',
    },
    tagType: 'country',
  },
  {
    popularity: 19,
    name: 'Portugal',
    _id: 'b4f2e746-15b1-49f1-a1f8-3240135e6a1d',
    _createdDate: {
      $date: '2024-08-27T09:48:24.759Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.759Z',
    },
    tagType: 'country',
  },
  {
    popularity: 22,
    name: 'Greece',
    _id: '14ee4760-9a21-41f2-9395-378444824e8f',
    _createdDate: {
      $date: '2024-08-27T09:48:24.758Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.758Z',
    },
    tagType: 'country',
  },
  {
    popularity: 20,
    name: 'Estonia',
    _id: '4d6d6933-5d67-4a2d-bd39-c9e13c2cb79e',
    _createdDate: {
      $date: '2024-08-27T09:48:24.757Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.757Z',
    },
    tagType: 'country',
  },
  {
    popularity: 12,
    name: 'Slovakia',
    _id: 'fdefc7ee-f073-4ddd-90ff-7d43b91baa37',
    _createdDate: {
      $date: '2024-08-27T09:48:24.756Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.756Z',
    },
    tagType: 'country',
  },
  {
    popularity: 24,
    name: 'Turkey',
    _id: 'fe4aa5b6-815d-4e4a-8f1b-d387047c0d12',
    _createdDate: {
      $date: '2024-08-27T09:48:24.755Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.755Z',
    },
    tagType: 'country',
  },
  {
    popularity: 48,
    name: 'Italy',
    _id: 'f1763107-ed68-48ce-96ee-53480a677461',
    _createdDate: {
      $date: '2024-08-27T09:48:24.754Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.754Z',
    },
    tagType: 'country',
  },
  {
    popularity: 4,
    name: 'Former Yugoslav Republic of Macedonia',
    _id: '41ad302d-2f6a-46f4-9890-f6d193061aab',
    _createdDate: {
      $date: '2024-08-27T09:48:24.753Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.753Z',
    },
    tagType: 'country',
  },
  {
    popularity: 39,
    name: 'Denmark',
    _id: '9a950cb8-7b45-412c-9b50-9b326292e09e',
    _createdDate: {
      $date: '2024-08-27T09:48:24.752Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.752Z',
    },
    tagType: 'country',
  },
  {
    popularity: 23,
    name: 'Georgia',
    _id: 'a9b7e0d9-d6c8-4727-909e-2cd64090db64',
    _createdDate: {
      $date: '2024-08-27T09:48:24.751Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.751Z',
    },
    tagType: 'country',
  },
  {
    popularity: 26,
    name: 'Croatia',
    _id: 'dd56794d-c6ea-4462-a5db-ed6def91b6b2',
    _createdDate: {
      $date: '2024-08-27T09:48:24.750Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.750Z',
    },
    tagType: 'country',
  },
  {
    popularity: 45,
    name: 'Germany',
    _id: '24e5e426-7a0f-46eb-80e5-f4f6c46bdfff',
    _createdDate: {
      $date: '2024-08-27T09:48:24.749Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.749Z',
    },
    tagType: 'country',
  },
  {
    popularity: 47,
    name: 'Luxembourg',
    _id: '88d18a45-d9a7-4cfe-91d3-2564fbf03662',
    _createdDate: {
      $date: '2024-08-27T09:48:24.748Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.748Z',
    },
    tagType: 'country',
  },
  {
    popularity: 2,
    name: 'Latvia',
    _id: '3bf7a25e-5059-4d20-b324-928fcc493118',
    _createdDate: {
      $date: '2024-08-27T09:48:24.747Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.747Z',
    },
    tagType: 'country',
  },
  {
    popularity: 21,
    name: 'Monaco',
    _id: '15e60811-8c85-4f49-9609-b157cc627c40',
    _createdDate: {
      $date: '2024-08-27T09:48:24.746Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.746Z',
    },
    tagType: 'country',
  },
  {
    popularity: 16,
    name: 'Poland',
    _id: 'b3b82460-bfb0-4c02-a1ec-e856c29c2eea',
    _createdDate: {
      $date: '2024-08-27T09:48:24.745Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.745Z',
    },
    tagType: 'country',
  },
  {
    popularity: 7,
    name: 'Azerbaijan',
    _id: '36faa453-2d75-4575-8202-4a1af2b3d96d',
    _createdDate: {
      $date: '2024-08-27T09:48:24.744Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.744Z',
    },
    tagType: 'country',
  },
  {
    popularity: 40,
    name: 'Sweden',
    _id: '4e144877-22d0-4625-b7d0-f40683982c80',
    _createdDate: {
      $date: '2024-08-27T09:48:24.743Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.743Z',
    },
    tagType: 'country',
  },
  {
    popularity: 41,
    name: 'Liechtenstein',
    _id: 'b6f5e460-f17e-4275-a30d-21f83b8094a2',
    _createdDate: {
      $date: '2024-08-27T09:48:24.742Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.742Z',
    },
    tagType: 'country',
  },
  {
    popularity: 30,
    name: 'Sweden',
    _id: '34d975ce-0877-4dc3-a38b-ed662c6aeebc',
    _createdDate: {
      $date: '2024-08-27T09:48:24.741Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.741Z',
    },
    tagType: 'country',
  },
  {
    popularity: 27,
    name: 'Slovenia',
    _id: '54161b5d-61c7-44fd-a794-1a5a76c2bec2',
    _createdDate: {
      $date: '2024-08-27T09:48:24.740Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.740Z',
    },
    tagType: 'country',
  },
  {
    popularity: 13,
    name: 'Netherlands',
    _id: '3cf5f1b1-e9af-498c-a981-2c9eff9da408',
    _createdDate: {
      $date: '2024-08-27T09:48:24.739Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.739Z',
    },
    tagType: 'country',
  },
  {
    popularity: 49,
    name: 'Russia',
    _id: '5758fc8e-9edd-4568-8099-fbdf4af77afc',
    _createdDate: {
      $date: '2024-08-27T09:48:24.738Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.738Z',
    },
    tagType: 'country',
  },
  {
    popularity: 50,
    name: 'Hungary',
    _id: '1fe973f4-8a84-40ef-9fe5-273e0e1a8171',
    _createdDate: {
      $date: '2024-08-27T09:48:24.737Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.737Z',
    },
    tagType: 'country',
  },
  {
    popularity: 29,
    name: 'Switzerland',
    _id: '2b308a3f-8ed6-4288-88a7-2d685d3a22ba',
    _createdDate: {
      $date: '2024-08-27T09:48:24.736Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.736Z',
    },
    tagType: 'country',
  },
  {
    popularity: 25,
    name: 'Czech Republic',
    _id: '870d0d9e-5988-4ad5-a4d4-8293d035a290',
    _createdDate: {
      $date: '2024-08-27T09:48:24.735Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.735Z',
    },
    tagType: 'country',
  },
  {
    popularity: 32,
    name: 'France',
    _id: 'f7eb1aa9-cd72-4449-89ae-daca79c07377',
    _createdDate: {
      $date: '2024-08-27T09:48:24.734Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.734Z',
    },
    tagType: 'country',
  },
  {
    popularity: 10,
    name: 'Bulgaria',
    _id: '111ecde6-0d3d-48cd-b0cb-6a38d63bcd90',
    _createdDate: {
      $date: '2024-08-27T09:48:24.733Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.733Z',
    },
    tagType: 'country',
  },
  {
    popularity: 5,
    name: 'Belgium',
    _id: '4adca122-9621-47ea-bb41-1079a3cf4219',
    _createdDate: {
      $date: '2024-08-27T09:48:24.732Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.732Z',
    },
    tagType: 'country',
  },
  {
    popularity: 44,
    name: 'Andorra',
    _id: '40ab66c8-bb1f-4664-b3db-e7cf2dc3447d',
    _createdDate: {
      $date: '2024-08-27T09:48:24.731Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.731Z',
    },
    tagType: 'country',
  },
  {
    popularity: 8,
    name: 'Albania',
    _id: '89aae8bf-55c7-41e5-aea6-5bca3ed30f46',
    _createdDate: {
      $date: '2024-08-27T09:48:24.730Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.730Z',
    },
    tagType: 'country',
  },
  {
    popularity: 31,
    name: 'Belarus',
    _id: 'aa9e73b8-9664-4f3f-9a40-91d5213e3f1d',
    _createdDate: {
      $date: '2024-08-27T09:48:24.729Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.729Z',
    },
    tagType: 'country',
  },
  {
    popularity: 35,
    name: 'Moldova',
    _id: 'd645a9bd-e7bd-4689-a26c-cdc7fbca73fe',
    _createdDate: {
      $date: '2024-08-27T09:48:24.728Z',
    },
    _updatedDate: {
      $date: '2024-08-27T09:48:24.728Z',
    },
    tagType: 'country',
  },
  {
    popularity: 29,
    trend: '9',
    name: 'The Department of Socio-Economic Geography at the University of Gdansk',
    _id: 'da1586a1-794a-4b9c-8672-87ddafccd643',
    _createdDate: {
      $date: '2024-08-26T06:42:34.903Z',
    },
    linked: true,
    _updatedDate: {
      $date: '2024-08-26T06:42:34.903Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 82,
    trend: '12',
    name: 'University of Oxford',
    _id: '96e7b955-987b-443a-9659-b5050ed07912',
    _createdDate: {
      $date: '2024-08-26T06:42:34.902Z',
    },
    linked: true,
    _updatedDate: {
      $date: '2024-08-26T06:42:34.902Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 75,
    trend: '3',
    name: 'Fondazione Coispa ETS',
    _id: '043579c3-2352-47a0-a172-3ce24bc0ad10',
    _createdDate: {
      $date: '2024-08-26T06:42:34.901Z',
    },
    linked: true,
    _updatedDate: {
      $date: '2024-08-26T06:42:34.901Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 32,
    name: 'Engineering – Ingegneria Informatica Spa',
    _id: 'f85058d8-954a-4791-9443-9493403ba043',
    _createdDate: {
      $date: '2024-08-26T06:42:34.900Z',
    },
    linked: true,
    _updatedDate: {
      $date: '2024-08-26T06:42:34.900Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 65,
    name: 'Tipi',
    _id: '4b99e72b-4f6f-45c3-8e34-8b8cf97ed8e1',
    _createdDate: {
      $date: '2024-08-26T06:42:34.899Z',
    },
    linked: true,
    _updatedDate: {
      $date: '2024-08-26T06:42:34.899Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 81,
    name: 'Business Hippie Club',
    _id: '8d8c95e3-3513-43db-af27-65f29dfa4327',
    _createdDate: {
      $date: '2024-08-26T06:42:34.898Z',
    },
    linked: true,
    _updatedDate: {
      $date: '2024-08-26T06:42:34.898Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 88,
    tagline: 'Leibniz Institut fur Wirtschaftsforschung e.V.',
    name: 'RWI',
    _id: '82425911-a863-4ac2-82c4-16f770dc925e',
    _createdDate: {
      $date: '2024-08-26T06:42:34.897Z',
    },
    linked: true,
    _updatedDate: {
      $date: '2024-08-26T06:42:34.897Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 104,
    name: 'Technische Universiteit Eindhoven',
    _id: 'cf909afc-0892-4e4d-9348-1ade09e21304',
    _createdDate: {
      $date: '2024-08-26T06:42:34.896Z',
    },
    linked: true,
    _updatedDate: {
      $date: '2024-08-26T06:42:34.896Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 108,
    name: 'Aarhus Universitet',
    _id: 'd65a7e0f-9052-4727-9eec-30fa082f8659',
    _createdDate: {
      $date: '2024-08-26T06:42:34.895Z',
    },
    linked: true,
    _updatedDate: {
      $date: '2024-08-26T06:42:34.895Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 12,
    tagline: 'Consiglio Nazionale delle Ricerche',
    name: 'CNR',
    _id: '487aaadc-368b-4106-912b-d05a99b7b28e',
    _createdDate: {
      $date: '2024-08-26T06:42:34.894Z',
    },
    linked: true,
    _updatedDate: {
      $date: '2024-08-26T06:42:34.894Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 13,
    name: 'European Union External Action Service',
    _id: '0be55cf2-4f7a-488e-bf15-c277f37c8e81',
    _createdDate: {
      $date: '2024-08-26T06:42:34.893Z',
    },
    linked: true,
    _updatedDate: {
      $date: '2024-08-26T06:42:34.893Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 93,
    name: 'STAM',
    _id: '003de8bf-09ae-4c81-8c21-7d894e700a2f',
    _createdDate: {
      $date: '2024-08-26T06:42:34.892Z',
    },
    linked: true,
    _updatedDate: {
      $date: '2024-08-26T06:42:34.892Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 71,
    tagline:
      'Bundesforschungsinstitut Fuer Laendliche Raeume, Wald und Fischerei',
    name: 'Johann Heinrich Von Thuenen-Institut',
    _id: '79003e3d-8701-40b3-a8c1-c6acb02bfa6c',
    _createdDate: {
      $date: '2024-08-26T06:42:34.891Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.891Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 101,
    name: 'University of Exeter',
    _id: '984f647e-8ec3-49d7-8145-1d3f64bdd88f',
    _createdDate: {
      $date: '2024-08-26T06:42:34.890Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.890Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 7,
    tagline: 'University of Social Sciences and Humanities',
    name: 'SWPS University',
    _id: 'b17f5f88-80ce-4f9a-a806-3be7ec0660c4',
    _createdDate: {
      $date: '2024-08-26T06:42:34.889Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.889Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 25,
    name: 'Prasidentenkonferenz der Landwirtschaftskammern Osterreichs',
    _id: '696d221f-265e-406f-81c9-24a7f1cc1838',
    _createdDate: {
      $date: '2024-08-26T06:42:34.888Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.888Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 45,
    name: 'Aston University',
    _id: '12bcdae7-f990-419a-bf73-75bb25bc8f11',
    _createdDate: {
      $date: '2024-08-26T06:42:34.887Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.887Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 78,
    name: 'Centro Internazionale di Altistudi Agronomici Mediterranei',
    _id: '6369b836-b06d-4991-b521-0f56ecbac4b2',
    _createdDate: {
      $date: '2024-08-26T06:42:34.886Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.886Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 5,
    name: 'Futurlab',
    _id: '1166b0ea-c98f-4049-8934-ecf2cbc520f0',
    _createdDate: {
      $date: '2024-08-26T06:42:34.885Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.885Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 55,
    name: 'formicablu',
    _id: '09aaab33-1fce-4487-b393-ccc5d5708963',
    _createdDate: {
      $date: '2024-08-26T06:42:34.884Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.884Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 47,
    name: 'The Futures Literacy Company',
    _id: 'aa819a3f-5c15-4e03-8033-abe55a0c1ddb',
    _createdDate: {
      $date: '2024-08-26T06:42:34.883Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.883Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 85,
    name: 'Eutropian',
    _id: 'efea0a5f-31cc-4b30-ac10-82a55d958eae',
    _createdDate: {
      $date: '2024-08-26T06:42:34.882Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.882Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 17,
    name: 'European Investment Bank',
    _id: 'f9ecefe6-3cce-4a16-b50e-f15534041702',
    _createdDate: {
      $date: '2024-08-26T06:42:34.881Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.881Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 40,
    tagline: 'European Commission Joint Research Centre',
    name: 'JRC',
    _id: 'ab925964-f952-4b78-a3b6-42c55cd1c6be',
    _createdDate: {
      $date: '2024-08-26T06:42:34.880Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.880Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 114,
    tagline: 'UNIBO',
    name: 'The University of Bologna',
    _id: '64c1112e-cc3e-447a-877d-e81fc3bb4cb3',
    _createdDate: {
      $date: '2024-08-26T06:42:34.879Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.879Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 2,
    name: 'G.A.C. Group',
    _id: '13fb810d-4d16-46da-a18f-2ff4519edac6',
    _createdDate: {
      $date: '2024-08-26T06:42:34.878Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.878Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 50,
    name: 'Joint Research Center',
    _id: '488b1936-0466-4ea8-8c53-6188d3f17101',
    _createdDate: {
      $date: '2024-08-26T06:42:34.877Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.877Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 67,
    name: 'European Cultural Foundation',
    _id: 'bf99cc57-f7e6-4b80-9950-e7e224cec35f',
    _createdDate: {
      $date: '2024-08-26T06:42:34.876Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.876Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 38,
    name: 'Junior Academy of Sciences of Ukraine',
    _id: 'b16cf071-9306-49a0-9cb0-4a4af19bc376',
    _createdDate: {
      $date: '2024-08-26T06:42:34.875Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.875Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 98,
    tagline: 'Comparative Research Network',
    name: 'CRN',
    _id: 'ca3cfd5a-8c79-4796-bfa9-d326cd2798bd',
    _createdDate: {
      $date: '2024-08-26T06:42:34.874Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.874Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 22,
    name: 'Universita degli Studi di Padova',
    _id: '802fb8be-223c-47ec-8f65-5aa08d0cc690',
    _createdDate: {
      $date: '2024-08-26T06:42:34.873Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.873Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 9,
    tagline: 'Kozgazdasag - Es Regionalis Tudomanyi Kutatokozpont',
    name: 'CERS',
    _id: 'e17e834b-12a9-42e1-b6c1-96cafbec6b27',
    _createdDate: {
      $date: '2024-08-26T06:42:34.872Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.872Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 107,
    name: 'Universidad de la Iglesia de Deusto Entidad Religiosa',
    _id: '8f638644-1b3a-40c3-9ec6-5441da0392b3',
    _createdDate: {
      $date: '2024-08-26T06:42:34.871Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.871Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 115,
    name: 'ARCTIK SRL',
    _id: '3f546a61-3f11-4074-a606-a95b5485b2d5',
    _createdDate: {
      $date: '2024-08-26T06:42:34.870Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.870Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 26,
    tagline: 'European Innovation Council',
    name: 'EIC',
    _id: 'f721e23c-8513-4174-9d3e-0f7d8d925c5d',
    _createdDate: {
      $date: '2024-08-26T06:42:34.869Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.869Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 80,
    name: 'European Union Institute for Security Studies',
    _id: 'e8c9de31-9a22-4b00-ae7a-018b523c49c0',
    _createdDate: {
      $date: '2024-08-26T06:42:34.868Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.868Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 73,
    name: 'Elektrotehnicki Fakultet Univerzitet u Beogradu',
    _id: '0f5f2202-ca61-4a04-bf6d-967dd251e159',
    _createdDate: {
      $date: '2024-08-26T06:42:34.867Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.867Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 56,
    tagline: 'Verband fur Okologischen Landbau Ev',
    name: 'NATURLAND',
    _id: '7a69feda-a88f-41ba-adc3-5d9f4a4fe96c',
    _createdDate: {
      $date: '2024-08-26T06:42:34.866Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.866Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 97,
    name: 'Landwirtschaftskammer Niederoesterreich',
    _id: 'db95ef21-1d01-4738-8d33-6fd67ab1595a',
    _createdDate: {
      $date: '2024-08-26T06:42:34.865Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.865Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 87,
    name: 'Universita Politecnica delle Marche',
    _id: 'f8a7bc2a-ba50-4f05-8612-9fd9c7867770',
    _createdDate: {
      $date: '2024-08-26T06:42:34.864Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.864Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 96,
    name: 'Normals',
    _id: '436c1a92-2bbb-4bfa-97ca-38001173191b',
    _createdDate: {
      $date: '2024-08-26T06:42:34.863Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.863Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 105,
    name: 'University of Eastern Finland',
    _id: 'd4da732e-8dde-4381-8d1c-aadaaac3ff9d',
    _createdDate: {
      $date: '2024-08-26T06:42:34.862Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.862Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 95,
    name: 'University College Dublin, National University of Ireland, Dublin',
    _id: 'c13b5e47-076c-47ca-9549-2dc31496b3f7',
    _createdDate: {
      $date: '2024-08-26T06:42:34.861Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.861Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 118,
    name: 'People’s Voice Media',
    _id: '5982a7cc-473c-4427-8807-7f22de18c7af',
    _createdDate: {
      $date: '2024-08-26T06:42:34.860Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.860Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 43,
    name: 'Association TRACES',
    _id: '0bea6675-1251-4a8d-9b95-2a8429624a6c',
    _createdDate: {
      $date: '2024-08-26T06:42:34.859Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.859Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 110,
    name: 'i2CAT',
    _id: '140d28c9-3d1d-4ca6-8e87-24e2685e89f2',
    _createdDate: {
      $date: '2024-08-26T06:42:34.858Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.858Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 117,
    name: 'Council of the European Union',
    _id: '8d10f9c9-181f-4e22-9743-d7460fc7829d',
    _createdDate: {
      $date: '2024-08-26T06:42:34.857Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.857Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 4,
    tagline:
      'non-governmental and non-profit think-tank of researchers and public sector experts',
    name: 'Ceske Priority',
    _id: '8f9057f5-9e6e-4802-947b-442b268da887',
    _createdDate: {
      $date: '2024-08-26T06:42:34.856Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.856Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 44,
    name: 'ESHA',
    _id: '3bc046d1-fb23-4693-81e7-d621bc57f5d5',
    _createdDate: {
      $date: '2024-08-26T06:42:34.855Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.855Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 119,
    name: 'Futures2all',
    _id: '850a0e79-0491-4d95-a4e6-5c01775fc0eb',
    _createdDate: {
      $date: '2024-08-26T06:42:34.854Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.854Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 112,
    name: 'University of Malta',
    _id: '2f00b9a2-fc2f-4f89-8e28-002274ab4ba0',
    _createdDate: {
      $date: '2024-08-26T06:42:34.853Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.853Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 103,
    tagline: 'Urad Vlady Slovenskej Republiky',
    name: 'UV SR',
    _id: 'c1c77df4-ec15-48e2-9242-67449972fde6',
    _createdDate: {
      $date: '2024-08-26T06:42:34.852Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.852Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 74,
    name: 'S. Mantzanakis KAI SIA O.E (Helenos)',
    _id: 'd14e7183-601d-4711-90c8-715c4b498373',
    _createdDate: {
      $date: '2024-08-26T06:42:34.851Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.851Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 57,
    name: 'European Committee of the Regions',
    _id: 'b04b6b6d-c8c1-4f20-a23f-83ea57effa71',
    _createdDate: {
      $date: '2024-08-26T06:42:34.850Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.850Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 28,
    name: 'The Municipality of Reggio Emilia',
    _id: 'eb70f794-4b52-408e-aa3f-351e6c5dae6a',
    _createdDate: {
      $date: '2024-08-26T06:42:34.849Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.849Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 60,
    tagline: 'The European Network for Science Centres and Museums',
    name: 'Ecsite',
    _id: '899dffe2-d8ae-4cff-b730-3c977d9fc8fa',
    _createdDate: {
      $date: '2024-08-26T06:42:34.848Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.848Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 91,
    name: 'Gdansk (Municipality?)',
    _id: '0605c3b1-8f77-4003-a5f2-6146fb620b4c',
    _createdDate: {
      $date: '2024-08-26T06:42:34.847Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.847Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 64,
    name: 'International Federation of Organic Agriculture Movements European Union Regional Group',
    _id: '38b77854-d425-4a45-8ea8-246aa4921341',
    _createdDate: {
      $date: '2024-08-26T06:42:34.846Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.846Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 68,
    tagline: 'Technologicke Centrum Praha ZSPO',
    name: 'TC Praha',
    _id: 'e556ea2c-0248-46c8-8ea3-7021a3a29599',
    _createdDate: {
      $date: '2024-08-26T06:42:34.845Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.845Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 34,
    name: 'Politecnico di Milano',
    _id: '44c6052d-e4f6-476c-9894-d66be71478d0',
    _createdDate: {
      $date: '2024-08-26T06:42:34.844Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.844Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 37,
    tagline: 'Centre for Social Innovation',
    name: 'ZSI',
    _id: '8c074515-7f30-4c99-95cb-dbdb13356a54',
    _createdDate: {
      $date: '2024-08-26T06:42:34.843Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.843Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 11,
    name: 'LUISS',
    _id: '83366bcd-7818-4477-9960-c5e41dfd59d2',
    _createdDate: {
      $date: '2024-08-26T06:42:34.842Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.842Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 39,
    tagline: 'UTU',
    name: 'Turun Yliopisto',
    _id: 'a4aed39c-b6a1-431b-bda8-5b3512540cd5',
    _createdDate: {
      $date: '2024-08-26T06:42:34.841Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.841Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 116,
    tagline:
      'Instituto de Engenhariade Sistemas e Computadores, Tecnologia e Ciencia',
    name: 'INSEC TEC',
    _id: 'cbc80cf6-78e2-40ca-acdd-2e156c91071f',
    _createdDate: {
      $date: '2024-08-26T06:42:34.840Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.840Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 15,
    name: 'The University of Manchester',
    _id: '2dc270cc-eb4f-4d95-94dc-c63ea696bd17',
    _createdDate: {
      $date: '2024-08-26T06:42:34.839Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.839Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 51,
    name: 'AB.ACUS SRL',
    _id: '834531e4-d19a-4890-ba11-2fdc51f3464c',
    _createdDate: {
      $date: '2024-08-26T06:42:34.838Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.838Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 20,
    tagline: 'BMZ',
    name: 'German Federal Ministry for Economic Cooperation and Development',
    _id: 'e259afc5-a75a-4a8c-9cf2-2c5197a0ea3a',
    _createdDate: {
      $date: '2024-08-26T06:42:34.837Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.837Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 14,
    tagline:
      'Fraunhofer Gesellschaft Zur Forderung Der Angewandten Forschung EV',
    name: 'Fraunhofer',
    _id: 'ddcbafdf-6e40-48d5-bf89-8382b8403c85',
    _createdDate: {
      $date: '2024-08-26T06:42:34.836Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.836Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 106,
    name: 'Fraunhofer ISI',
    _id: '19bec9c8-f039-4c84-aebc-54738b0394ac',
    _createdDate: {
      $date: '2024-08-26T06:42:34.835Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.835Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 6,
    name: 'Aristotelio Panepistimio Thessalonikis',
    _id: '2988888d-2f07-491e-a85f-e284eacb5e97',
    _createdDate: {
      $date: '2024-08-26T06:42:34.834Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.834Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 89,
    name: 'MADE SCARL',
    _id: '4d80679f-0375-4b47-ad53-96d73aad8e20',
    _createdDate: {
      $date: '2024-08-26T06:42:34.833Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.833Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 52,
    name: 'VTT',
    _id: 'fed6b011-e613-4d9b-8288-38af364b0a56',
    _createdDate: {
      $date: '2024-08-26T06:42:34.832Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.832Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 92,
    name: 'European Commission',
    _id: '55f04dea-701d-4940-a144-e3c79ab6b16f',
    _createdDate: {
      $date: '2024-08-26T06:42:34.831Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.831Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 58,
    name: 'Iris Technology Solutions Sociedad Limitada',
    _id: '3dc7c71f-d532-4d67-81c5-c96c6445caf5',
    _createdDate: {
      $date: '2024-08-26T06:42:34.830Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.830Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 21,
    tagline: 'Deutsches Zentrum Fur Luft - Und Raumfahrt',
    name: 'DLR',
    _id: 'f07bb6bd-8266-4cce-aebf-7eaf90cca7e5',
    _createdDate: {
      $date: '2024-08-26T06:42:34.829Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.829Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 70,
    name: 'Panteion',
    _id: '08f94f8c-8c74-47a3-8f49-5bf1c9afb769',
    _createdDate: {
      $date: '2024-08-26T06:42:34.828Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.828Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 59,
    name: 'European Parliament',
    _id: '9f9409c2-3d8e-4a5b-9e98-756ad6498f7d',
    _createdDate: {
      $date: '2024-08-26T06:42:34.827Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.827Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 42,
    name: 'Development Centre of Võru County',
    _id: '28190079-61bf-42d1-a5d1-3c8206d79cba',
    _createdDate: {
      $date: '2024-08-26T06:42:34.826Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.826Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 31,
    name: 'European Commission, Research and innovation, Policy Support Facility',
    _id: 'c1c0a68b-1005-4e74-9578-c89998d2f1c4',
    _createdDate: {
      $date: '2024-08-26T06:42:34.825Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.825Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 62,
    tagline: 'Gesellschaft für Internationale Zusammenarbeit GmbH',
    name: 'GIZ',
    _id: 'e995930e-48f9-4af5-8f48-43ef744d443e',
    _createdDate: {
      $date: '2024-08-26T06:42:34.824Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.824Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 99,
    name: 'Modem',
    _id: '31762c1b-462e-4f29-bbf3-6d0d194d5ce9',
    _createdDate: {
      $date: '2024-08-26T06:42:34.823Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.823Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 94,
    name: 'European Court of Auditors',
    _id: '9c3c3660-91ef-4253-a6ea-92deea598f4f',
    _createdDate: {
      $date: '2024-08-26T06:42:34.822Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.822Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 63,
    name: 'Copernicus Science Centre',
    _id: 'd1446722-003c-4918-8ff1-7521dd1414ce',
    _createdDate: {
      $date: '2024-08-26T06:42:34.821Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.821Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 1,
    tagline: 'VDI/VDE Innovation + Technik GmbH',
    name: 'VDI/VDE IT',
    _id: '63edeae7-7293-4213-a3fa-d356bac8a981',
    _createdDate: {
      $date: '2024-08-26T06:42:34.820Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.820Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 53,
    name: 'GLUON',
    _id: '3c8be167-afc6-4a6b-9f79-38c232a76438',
    _createdDate: {
      $date: '2024-08-26T06:42:34.819Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.819Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 79,
    name: 'Future Based',
    _id: '63d31147-8884-4ea4-967b-0f401fe5484e',
    _createdDate: {
      $date: '2024-08-26T06:42:34.818Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.818Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 30,
    tagline: 'Insight Foresight Institute SL',
    name: 'IFI',
    _id: 'f1403f60-83ef-407b-9394-b66789288bf4',
    _createdDate: {
      $date: '2024-08-26T06:42:34.817Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.817Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 19,
    tagline: 'Fundacao Para A Ciencia E A Tecnologia',
    name: 'FCT',
    _id: '7628abf2-e441-489d-bca8-f667bbafd05e',
    _createdDate: {
      $date: '2024-08-26T06:42:34.816Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.816Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 16,
    name: 'APRE',
    _id: '62844951-546b-4b29-8138-0ae4498bec1a',
    _createdDate: {
      $date: '2024-08-26T06:42:34.815Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.815Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 23,
    name: 'PAL Robotics SL',
    _id: '44156040-2d11-4dd9-91c4-61ae162df93f',
    _createdDate: {
      $date: '2024-08-26T06:42:34.814Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.814Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 90,
    name: 'Lisbon Council for Economic Competitiveness',
    _id: 'd0b4587f-21a1-4146-bcc4-e51452baff1b',
    _createdDate: {
      $date: '2024-08-26T06:42:34.813Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.813Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 46,
    name: 'European Economic and Social Committee',
    _id: '0323d021-84ea-4ee8-8ab5-baff41e7d62e',
    _createdDate: {
      $date: '2024-08-26T06:42:34.812Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.812Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 61,
    name: 'MitOst e.V.',
    _id: '0c0b6e01-bcb9-4b91-99b6-2dfedc5f3cce',
    _createdDate: {
      $date: '2024-08-26T06:42:34.811Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.811Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 3,
    name: 'Kultura Nova Foundation',
    _id: '4b07b32b-91ef-4a42-8a17-1a44e6ad6fa3',
    _createdDate: {
      $date: '2024-08-26T06:42:34.810Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.810Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 76,
    name: 'Technopolis',
    _id: '06c67593-1cf0-4f1d-8687-3a1022489987',
    _createdDate: {
      $date: '2024-08-26T06:42:34.809Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.809Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 54,
    name: 'Teach the Future',
    _id: '94326a5d-45d6-4f38-b472-f31d54795780',
    _createdDate: {
      $date: '2024-08-26T06:42:34.808Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.808Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 10,
    name: 'Fundacion Zaragoza Logistics Center',
    _id: 'f5e07755-5d95-43d3-b0df-41e8521b3873',
    _createdDate: {
      $date: '2024-08-26T06:42:34.806Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.806Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 100,
    name: 'Universitatea Spiru Haret',
    _id: 'b1e0a933-5361-40d0-b166-5ac6d8143d91',
    _createdDate: {
      $date: '2024-08-26T06:42:34.805Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.805Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 41,
    name: 'Science View',
    _id: '53c1e793-3c52-45c3-9cae-d8a97c838661',
    _createdDate: {
      $date: '2024-08-26T06:42:34.804Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.804Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 113,
    tagline: 'Consultoria Agroindustrial LDA',
    name: 'CONSULAI',
    _id: '6873d957-324c-443b-9a64-a284c85623d1',
    _createdDate: {
      $date: '2024-08-26T06:42:34.803Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.803Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 102,
    name: 'Fondation Institut de Recherche pour le Developpement Durable et les Relations Internationales',
    _id: 'd29afcf5-1f8a-4ba3-bcfe-49b905962145',
    _createdDate: {
      $date: '2024-08-26T06:42:34.802Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.802Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 83,
    name: 'Ministry of Labour and Social Affairs from Czech Republic',
    _id: '684f22d1-323d-4da2-93d8-9b3ca4572c2b',
    _createdDate: {
      $date: '2024-08-26T06:42:34.801Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.801Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 49,
    tagline: 'Austrian Institute Of Technology GmbH',
    name: 'AIT',
    _id: '2ce1b1c8-3ba1-4762-bb74-1ae39383bf7f',
    _createdDate: {
      $date: '2024-08-26T06:42:34.800Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.800Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 111,
    name: 'Kaunas University of Technology',
    _id: '13b9116a-6355-4d8c-9725-971bdd292e21',
    _createdDate: {
      $date: '2024-08-26T06:42:34.799Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.799Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 72,
    tagline: 'Agenția Națională pentru Cercetare și Dezvoltare',
    name: 'ANCD',
    _id: 'dbbff414-a129-4388-9dff-4b87d96f0c80',
    _createdDate: {
      $date: '2024-08-26T06:42:34.798Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.798Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 120,
    name: 'Institut Technique de l Agriculture Biologique',
    _id: '827630fd-edf2-4dcf-9c2c-742f6be18b5d',
    _createdDate: {
      $date: '2024-08-26T06:42:34.797Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.797Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 77,
    name: 'PROSPER Network',
    _id: '899791fe-9537-4bb0-8f93-2216d8ae9cb1',
    _createdDate: {
      $date: '2024-08-26T06:42:34.796Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.796Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 84,
    tagline:
      "Institut National De Recherche Pour L'agriculture, L'alimentation Et L'environnement",
    name: 'INRAE',
    _id: '213b14dd-9757-40fb-a9f2-15483759f515',
    _createdDate: {
      $date: '2024-08-26T06:42:34.795Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.795Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 69,
    tagline: 'Forschungsinstitutfur Biologischen Landbau in Europa',
    name: 'FIBL Europe',
    _id: 'bc1a9588-9c0c-40a8-9795-577205bda8b5',
    _createdDate: {
      $date: '2024-08-26T06:42:34.794Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.794Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 33,
    name: 'Futures Probes',
    _id: '7f871e71-69ff-4849-9cf5-fff91621a9ab',
    _createdDate: {
      $date: '2024-08-26T06:42:34.793Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.793Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 86,
    tagline: 'International Iberian Nanotechnology Laboratory',
    name: 'INL',
    _id: '58172d92-6266-4015-a3b0-e680818c4c01',
    _createdDate: {
      $date: '2024-08-26T06:42:34.792Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.792Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 109,
    name: 'Policy Lab',
    _id: 'e107e395-d8db-48d2-9bf1-d33362353581',
    _createdDate: {
      $date: '2024-08-26T06:42:34.791Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.791Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 36,
    name: 'Forschungsinstitut fur Biologischen Landbau Stiftung',
    _id: '10a133a2-0160-4f38-9e8e-ef209aa4ffc3',
    _createdDate: {
      $date: '2024-08-26T06:42:34.790Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.790Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 27,
    tagline: 'Nonprofit Kft',
    name: 'Okologiai Mezogazdasagi Kutatointezet Kozhasznu',
    _id: 'd23654f0-f46f-427c-bb7a-5c34cb9b36f7',
    _createdDate: {
      $date: '2024-08-26T06:42:34.789Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.789Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 48,
    name: 'The University of Helsinki',
    _id: '8403658f-bba0-4b6d-b04d-732052761b9d',
    _createdDate: {
      $date: '2024-08-26T06:42:34.788Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.788Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 66,
    name: 'Ellinogermaniki Agogi',
    _id: '0a1d9873-a175-439a-8693-147efe4dd05d',
    _createdDate: {
      $date: '2024-08-26T06:42:34.787Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.787Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 18,
    name: 'Innovationscenter for Okologisk Landbrug P/S',
    _id: 'f6357fc9-2ba5-4439-ae8c-ab719431fcb0',
    _createdDate: {
      $date: '2024-08-26T06:42:34.786Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.786Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 8,
    tagline: 'online forecasting platform and aggregation engine',
    name: 'Metaculus',
    _id: 'e009510d-3403-4553-a51c-fb261062aab1',
    _createdDate: {
      $date: '2024-08-26T06:42:34.785Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.785Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 24,
    name: 'Universitat de Barcelona',
    _id: 'fbd52732-fdc2-4848-9cbd-8ed4f1f4930c',
    _createdDate: {
      $date: '2024-08-26T06:42:34.784Z',
    },
    _updatedDate: {
      $date: '2024-08-26T06:42:34.784Z',
    },
    tagType: 'organisation',
  },
  {
    popularity: 7500,
    name: 'Travel',
    _id: '16623a53-2e65-4cb1-ba08-8c542428d44b',
    _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
    _createdDate: {
      $date: '2024-08-18T20:23:15.597Z',
    },
    tagLine: 'Explore the world',
    _updatedDate: {
      $date: '2024-08-18T20:23:15.597Z',
    },
    picture:
      'https://static.wixstatic.com/media/11062b_d0dbaeda327846e698a927a99bd8acf9~mv2.jpg',
    tagType: 'Interest',
    tagPageLink: 'http://example.com/tags/travel',
  },
  {
    popularity: 12000,
    name: 'Food',
    _id: 'e3c3b179-000c-4fe0-ae2a-c9f1a8fe787a',
    _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
    _createdDate: {
      $date: '2024-08-18T20:23:15.596Z',
    },
    tagLine: 'Delicious dishes around the world',
    _updatedDate: {
      $date: '2024-08-18T20:23:15.596Z',
    },
    picture:
      'https://static.wixstatic.com/media/11062b_5ad669c51add40e9aefc1ef35e80345c~mv2.jpg',
    tagType: 'Category',
    tagPageLink: 'http://example.com/tags/food',
  },
  {
    popularity: 5000,
    name: 'Fitness',
    _id: '41e9290d-63ef-4aa3-ab20-5a9c804e9eba',
    _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
    _createdDate: {
      $date: '2024-08-18T20:23:15.595Z',
    },
    tagLine: 'Stay active and healthy',
    _updatedDate: {
      $date: '2024-08-18T20:23:15.595Z',
    },
    picture:
      'https://static.wixstatic.com/media/11062b_a54b4951d3524d56a0bc17835cc7d288~mv2.jpg',
    tagType: 'Activity',
    tagPageLink: 'http://example.com/tags/fitness',
  },
  {
    popularity: 9500,
    name: 'Fashion',
    _id: '48f63b1c-1e78-480e-8d5a-c268ba8faeb5',
    _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
    _createdDate: {
      $date: '2024-08-18T20:23:15.594Z',
    },
    tagLine: 'Latest trends and styles',
    _updatedDate: {
      $date: '2024-08-18T20:23:15.594Z',
    },
    picture:
      'https://static.wixstatic.com/media/11062b_6d6eab866b474a058ada40a5bedcf74a~mv2.jpg',
    tagType: 'Industry',
    tagPageLink: 'http://example.com/tags/fashion',
  },
  {
    popularity: 18000,
    name: 'Music',
    _id: '3bd741bb-851b-4c23-b59a-5dc9b985dd39',
    _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
    _createdDate: {
      $date: '2024-08-18T20:23:15.593Z',
    },
    tagLine: 'Enjoy the rhythm and beats',
    _updatedDate: {
      $date: '2024-08-18T20:23:15.593Z',
    },
    picture:
      'https://static.wixstatic.com/media/5e4e1b6783ea289303c5e6bc2acf5d91.jpg',
    tagType: 'Entertainment',
    tagPageLink: 'http://example.com/tags/music',
  },
];

const infoPagesSample = [
  {
    dataCollectionId: 'InfoPages',
    data: {
      projectParticipantTeam: [
        {
          name: 'Totti Könnölä',
          _id: '4bc3a4f3-f901-4670-80bf-f25ddd26163b',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:38.990Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:38.990Z',
          },
          tagType: 'person',
        },
        {
          name: 'Susanne Giesecke',
          _id: 'e0e6a5ef-ae5b-46e6-8e95-71c625b7f4c2',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.235Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.235Z',
          },
          tagType: 'person',
        },
        {
          name: 'Dana Wasserbacher',
          _id: '8789f421-e784-48fa-a8ad-e877e00d9e7f',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.084Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.084Z',
          },
          tagType: 'person',
        },
        {
          name: 'Attila Havas',
          _id: '75786c5d-3536-4dea-ad7a-2dee4b7ea2ff',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:38.965Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:38.965Z',
          },
          tagType: 'person',
        },
        {
          name: 'Rosa Beckmann',
          _id: '570b5ac9-e495-4cfb-a307-6310287ffe59',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-29T08:58:30.253Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-29T08:58:30.253Z',
          },
          tagType: 'person',
        },
        {
          name: 'Jonas Drechsel',
          _id: '35d59921-d71b-417d-87f3-cf34727b86f5',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.015Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.015Z',
          },
          tagType: 'person',
        },
        {
          name: 'Radu Gheorghiu',
          _id: '79e69062-1f22-4acd-bd5c-b4b0f17a3dad',
          _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
          _createdDate: {
            $date: '2024-10-15T09:06:25.839Z',
          },
          _updatedDate: {
            $date: '2024-10-15T09:06:25.839Z',
          },
          tagType: 'person',
        },
        {
          name: 'Bianca Dragomir',
          _id: '90c38dc0-018b-4d55-af76-e2b52130e029',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.344Z',
          },
          tagLine: 'Live deeply and tenderly',
          _updatedDate: {
            $date: '2024-10-14T18:29:46.298Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_957ec9dc2bb74b97b6166aab1d9d0840~mv2.jpg',
          tagType: 'person',
          tagPageLink: '/person/Bianca_Dragomir_q437h',
        },
        {
          name: 'Giovanna Guiffrè',
          _id: '9f43d0ff-05f5-45a0-a991-618ab5cb0375',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.313Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.313Z',
          },
          tagType: 'person',
        },
        {
          name: 'Laura Galante',
          _id: '48d3cceb-daf6-4a26-bef0-c6d0254dda2e',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.042Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.042Z',
          },
          tagType: 'person',
        },
        {
          name: 'Valentina Malcotti',
          _id: '2865017b-34f3-43e5-9a3e-129b48af5e04',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.066Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.066Z',
          },
          tagType: 'person',
        },
        {
          name: 'Hywel Jones',
          _id: 'a93bee5b-c192-4466-b566-c598032481cd',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:38.943Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:38.943Z',
          },
          tagType: 'person',
        },
        {
          name: 'Masafumi Nishi',
          _id: '98dbf692-1c5a-47f2-8b35-238ed1fb1275',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.058Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.058Z',
          },
          tagType: 'person',
        },
        {
          name: 'Jana Lingruen',
          _id: 'da474678-67a7-4214-bbe9-08514aa2d2e8',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:38.915Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:38.915Z',
          },
          tagType: 'person',
        },
      ],
      organisation: [],
      organisationProject: [],
      postImage2: {
        url: ' ',
        caption: '',
      },
      postContentRIch2:
        '<p>This project aims at:<br><br>i) providing timely foresight intelligence and forward-looking policy briefs to the European Commission for purposes of R&amp;I policy on the following topics:</p>\n<ul>\n<li>Futures of interpenetration of criminal and lawful economic activities&nbsp;</li>\n<li>Futures of Science for Policy in Europe&nbsp;</li>\n<li>Futures of using nature in rural and marine contexts in Europe</li>\n<li>Futures of Social Confrontations</li>\n<li>Futures of Green Skills and Jobs</li>\n<li>Futures of Big Tech</li>\n<li>Futures of innovation and IP regulation</li>\n</ul>\n<p>ii) providing a hub for Europe’s R&amp;I foresight community and a space in which foresight agencies and researchers can share knowledge and tools;<br><br>iii) networking EU supported R&amp;I projects with important foresight elements and promoting their results to policymakers, including via Horizon Futures Watch quarterly newsletters;<br><br>iv) promoting broad public engagement with foresight for R&amp;I policy, including stakeholders as well as the public and covering all sections of society, from scientists and engineers to policy-makers, artists, intellectuals and engaged citizens.<br></p>\n',
      methods: [],
      pageTypes: [
        {
          popularity: 35,
          name: 'project info',
          _id: 'fcb0cbbc-98a5-4743-8c8b-1cb1c8326a85',
          _createdDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          tagId: 252527,
          tagType: 'page type',
        },
      ],
      projectCoordinator: [],
      _id: '95723f57-03d7-4280-9fb4-f3018632dfe1',
      _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
      _createdDate: {
        $date: '2024-10-30T16:13:03.678Z',
      },
      organisationType: [],
      postContentRIch3: '<p></p>\n',
      domains: [
        {
          popularity: 67,
          name: 'EU R&I policy',
          _id: '74f1a07e-9754-4e06-9091-30d0d7d4e667',
          _createdDate: {
            $date: '2024-08-27T09:48:25.091Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.091Z',
          },
          tagType: 'domain',
        },
      ],
      personOrganisationFormer: [],
      personProjectParticipation: [],
      postImage1: {
        url: 'https://static.wixstatic.com/media/471908_e1a2cd19bb0d4cd59f888efbef2cda5e~mv2.webp',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-30T16:31:10.025Z',
      },
      slug: 'european-ri-foresight-and-public-engagement-for-horizon-europe-bveiy',
      mediaFiles: [
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      Project: [
        {
          name: 'European R&I foresight and public engagement for Horizon Europe',
          _id: 'e65dc072-d2a2-4e4e-86e5-d8cd198ac8fc',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-30T15:58:05.133Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T16:13:08.903Z',
          },
          tagType: 'project',
          tagPageLink:
            '/project/european-ri-foresight-and-public-engagement-for-horizon-europe-bveiy',
        },
      ],
      projectOrganisationRoles: [
        {
          organisation: 'DG RTD',
          role: 'Client',
        },
        {
          role: '',
        },
      ],
      projectOrganisation: [
        {
          name: 'DG RTD',
          _id: '7be555b9-5274-4e4f-b733-64969fdf8781',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-28T20:39:19.424Z',
          },
          tagLine:
            'Directorate-General for Research and Innovation of the European Commission',
          _updatedDate: {
            $date: '2024-10-28T20:39:19.424Z',
          },
          tagType: 'organisation',
        },
      ],
      personProjectCoordonation: [],
      person: [],
      personOrganisation: [],
      postContentRIch1: '<p></p>\n',
      countryTag: [
        {
          name: 'EU',
          _id: 'e1b13728-5253-484b-92d6-0c451813adff',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T10:28:23.621Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-22T10:28:23.621Z',
          },
          tagType: 'country',
        },
      ],
      title: 'European R&I foresight and public engagement for Horizon Europe',
      internalLinks: [],
      organisationMemberOf: [],
      activity: [],
      projectFunded: [
        {
          popularity: 27,
          name: 'EU funded',
          _id: 'f80d06e4-b326-4364-b250-0afa1fc777f3',
          _createdDate: {
            $date: '2024-08-27T09:48:25.119Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.119Z',
          },
          tagType: 'project type',
        },
      ],
      organisationHasMember: [],
      organisationPeople: [],
    },
    _id: '95723f57-03d7-4280-9fb4-f3018632dfe1',
  },
  {
    dataCollectionId: 'InfoPages',
    data: {
      projectParticipantTeam: [
        {
          name: 'Daniel Ferreira',
          _id: '286412e1-f4ba-4fce-8c6c-fbe82ff53747',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.281Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.281Z',
          },
          tagType: 'person',
        },
        {
          name: 'Sandra Fernandes',
          _id: 'a3dbd6e5-8a1a-4dd6-9836-f9dc2c5967fe',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.272Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.272Z',
          },
          tagType: 'person',
        },
      ],
      organisation: [],
      organisationProject: [],
      postImage2: {
        url: ' ',
        caption: '',
      },
      postContentRIch2:
        '<p>The identification and description of megatrends for Portugal is a work in progress, based on a collaborative, systematic and open process. During this year, with the aim of producing a report and supporting the formulation of public policies, this process will be deepened with workshops, expert consultation and citizen participation. The list of partner institutions may still be extended until the end of the process and does not include the experts from academia and civil society who have been taking part in the workshops and interviews.<br>The list of partner institutions may still be extended until the end of the process and does not include the experts from academia and civil society who have been taking part in the workshops and interviews.</p>\n',
      methods: [],
      pageTypes: [
        {
          popularity: 35,
          name: 'project info',
          _id: 'fcb0cbbc-98a5-4743-8c8b-1cb1c8326a85',
          _createdDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          tagId: 252527,
          tagType: 'page type',
        },
      ],
      projectCoordinator: [],
      _id: 'a1300ba8-3fe5-4b15-a895-5f7610f41ed1',
      _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
      _createdDate: {
        $date: '2024-10-30T15:32:09.127Z',
      },
      organisationType: [],
      postContentRIch3: '<p></p>\n',
      domains: [],
      personOrganisationFormer: [],
      personProjectParticipation: [],
      postImage1: {
        url: 'https://static.wixstatic.com/media/471908_8eac3783385d46b4982c56e833fcf2dd~mv2.webp',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-30T15:32:09.127Z',
      },
      slug: 'megatrends-2050-the-changing-world-jc5sk',
      mediaFiles: [
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      projectEndDate: '2025-03-31T21:00:00.000Z',
      projectStartDate: '2023-05-31T21:00:00.000Z',
      Project: [
        {
          name: 'MEGATRENDS 2050. THE CHANGING WORLD',
          _id: 'd3af95a2-30c9-4e1f-ab4d-3c5391af4f1b',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T15:23:09.494Z',
          },
          tagLine: 'Impacts in Portugal',
          _updatedDate: {
            $date: '2024-10-30T15:32:12.377Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_67dc73aedd1d4508b496e37ee8d5e57d~mv2.png',
          tagType: 'project',
          tagPageLink: '/project/megatrends-2050-the-changing-world-jc5sk',
        },
      ],
      projectOrganisationRoles: [
        {
          organisation: 'PlanAPP',
          role: 'Lead',
        },
        {
          organisation: 'DGPDN',
          role: 'Lead',
        },
        {
          organisation: 'Origin for Sustainability',
          role: '',
        },
        {
          organisation: '',
          role: '',
        },
      ],
      projectOrganisation: [
        {
          name: 'PlanAPP',
          _id: '33183905-387a-4f37-b7ce-f6ab2015fa0f',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T15:28:40.980Z',
          },
          tagLine:
            'Centro de Competências de Planeamento, de Políticas e de Prospetiva da Administração Pública',
          _updatedDate: {
            $date: '2024-10-30T15:28:40.980Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'DGPDN',
          _id: '16187b18-bc41-46df-90f2-89b82e859937',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T15:29:29.005Z',
          },
          tagLine: 'Direção-Geral de Política de Defesa Nacional',
          _updatedDate: {
            $date: '2024-10-30T15:29:29.005Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'Origin for Sustainability',
          _id: '86f7cc23-e789-4cb4-a7f0-8a207a8e1571',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T14:54:25.044Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T14:54:25.044Z',
          },
          tagType: 'organisation',
        },
      ],
      personProjectCoordonation: [],
      person: [],
      personOrganisation: [],
      postContentRIch1:
        '<p>The digital brochure "Megatrends 2050, Changing World: Impacts on Portugal - a Brief Introduction" is now available. This is a publication by the Planning and Foresight Services Network of the Public Administration (RePLAN), as part of the activities carried out by the Multisectoral Foresight Team. RePLAN is chaired by the Public Administration Planning, Policy and Foresight Competence Center (PlanAPP), in which the FCT participates.Duration of the study: The project was launched in June 2023 and will be concluded with the launch of the final report in April 2025.<br>The document, available on the PlanAPP website, is a brief introduction to the 2050 Megatrends Report for Portugal, to be published by the end of year 2024. It presents, in a brief and preliminary way, the nine megatrends that are likely to shape the future of our country, with a general description and a list of the most relevant potential impacts: Worsening climate change; Growing pressure on natural resources; Diversifying and changing economic models; Diverging demographic trends; A more urban world; A more digital world; Accelerating technological development; A multipolar world and New challenges to democracy.</p>\n',
      countryTag: [
        {
          popularity: 19,
          name: 'Portugal',
          _id: 'b4f2e746-15b1-49f1-a1f8-3240135e6a1d',
          _createdDate: {
            $date: '2024-08-27T09:48:24.759Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.759Z',
          },
          tagType: 'country',
        },
      ],
      title: 'MEGATRENDS 2050. THE CHANGING WORLD',
      internalLinks: [],
      organisationMemberOf: [],
      activity: [],
      projectFunded: [],
      organisationHasMember: [],
      organisationPeople: [],
    },
    _id: 'a1300ba8-3fe5-4b15-a895-5f7610f41ed1',
  },
  {
    dataCollectionId: 'InfoPages',
    data: {
      projectParticipantTeam: [
        {
          name: 'Mikkel Knudsen',
          _id: 'bb6d79aa-1062-45eb-b889-1f509e9db78d',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.222Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.222Z',
          },
          tagType: 'person',
        },
      ],
      organisation: [],
      organisationProject: [],
      postImage2: {
        url: ' ',
        caption: '',
      },
      postContentRIch2:
        '<p>Carried out between July 2022 - June 2025,  SF4S supports our transition to a more sustainable European economy by helping to address the lack of green, digital and future (i.e. sustainability foresight) skills among students and professionals and by connecting knowledge flows between HEI, VET and industry actors that are necessary for Europe to develop cooperative solutions on a large-scale and support the recommendations for action in the major reports and initiatives: Green Deal, NextGenerationEU, European Skills Agenda and OECD Future of Education and Skills 2030.</p>\n',
      methods: [],
      pageTypes: [
        {
          popularity: 35,
          name: 'project info',
          _id: 'fcb0cbbc-98a5-4743-8c8b-1cb1c8326a85',
          _createdDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          tagId: 252527,
          tagType: 'page type',
        },
      ],
      projectCoordinator: [],
      _id: '27c14600-5f0e-4f3b-a484-bac1c667e354',
      _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
      _createdDate: {
        $date: '2024-10-30T15:14:18.070Z',
      },
      organisationType: [],
      postContentRIch3: '<p></p>\n',
      domains: [
        {
          name: 'Agri-food',
          _id: '0b4ebe18-ea9c-426c-970b-00f3b67a1334',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T15:19:41.796Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T15:19:41.796Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 14,
          name: 'health',
          _id: '255f22bd-fa84-4b93-a1f3-df2944b48ffa',
          _createdDate: {
            $date: '2024-08-27T09:48:25.084Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.084Z',
          },
          tagType: 'domain',
        },
        {
          name: 'Mobility',
          _id: 'b343c328-93ce-4072-b852-979354883db8',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T15:19:57.147Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T15:19:57.147Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 19,
          name: 'education',
          _id: 'fca15479-fa61-4bac-9600-c327f6ccb1c2',
          _createdDate: {
            $date: '2024-08-27T09:48:25.095Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.095Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 29,
          trend: '3',
          name: 'Agriculture',
          _id: '2ceb4abf-2b73-4a2d-b2c3-4d4468d94f4a',
          _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
          _createdDate: {
            $date: '2024-08-27T09:48:25.118Z',
          },
          _updatedDate: {
            $date: '2024-10-15T10:52:22.337Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 22,
          name: 'digitalisation',
          _id: 'b5791a5e-8819-4afe-b69b-97aaed7f7565',
          _createdDate: {
            $date: '2024-08-27T09:48:25.099Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.099Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 26,
          name: 'sustainability',
          _id: 'b5ca1e23-5548-4d91-adfe-eeb08f2062a6',
          _createdDate: {
            $date: '2024-08-27T09:48:25.063Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.063Z',
          },
          tagType: 'domain',
        },
      ],
      personOrganisationFormer: [],
      personProjectParticipation: [],
      postImage1: {
        url: 'https://static.wixstatic.com/media/471908_c88b1065018a4ee78fd9c38ffb25b597~mv2.webp',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-30T15:20:50.907Z',
      },
      slug: 'strategic-foresight-for-sustainability-m6jz8',
      mediaFiles: [
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      projectEndDate: '2025-05-31T21:00:00.000Z',
      projectStartDate: '2022-06-30T21:00:00.000Z',
      Project: [
        {
          name: 'Strategic Foresight for Sustainability',
          _id: '95c3bf6f-db55-41c2-80a7-f5ab9bbc38f3',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T15:05:55.234Z',
          },
          tagLine: 'SF4S',
          _updatedDate: {
            $date: '2024-10-30T15:14:21.102Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_4833db7f5f0b44dbaaf9f4e697aa2cfc~mv2.webp',
          tagType: 'project',
          tagPageLink: '/project/strategic-foresight-for-sustainability-m6jz8',
        },
      ],
      projectOrganisationRoles: [
        {
          organisation: 'Designskolen Kolding',
          role: 'Lead',
        },
        {
          organisation: 'ISPIM',
          role: '',
        },
        {
          organisation: 'GEA College',
          role: '',
        },
        {
          organisation: 'IZT',
          role: '',
        },
        {
          organisation: 'Media University of Applied Sciences',
          role: '',
        },
        {
          organisation: 'Finland Futures Research Centre',
          role: '',
        },
        {
          organisation: 'Estonian Design Centre',
          role: '',
        },
        {
          organisation: 'EDHEC',
          role: '',
        },
        {
          organisation: 'TAL TECH',
          role: '',
        },
        {
          organisation: 'AIRBUS',
          role: '',
        },
        {
          organisation: 'MIDT',
          role: '',
        },
        {
          organisation: 'Nordic Foodtech',
          role: '',
        },
        {
          organisation: 'Help Alliance',
          role: '',
        },
        {
          organisation: 'COMODULE',
          role: '',
        },
        {
          organisation: 'North Estonia Medical Centre',
          role: '',
        },
        {
          organisation: 'La Muu',
          role: '',
        },
        {
          organisation: 'Michelin',
          role: '',
        },
        {
          organisation: 'Peter Larsen Kaffe',
          role: '',
        },
        {
          organisation: '',
          role: '',
        },
      ],
      projectOrganisation: [
        {
          name: 'Designskolen Kolding',
          _id: '7147d72d-6982-460f-ad1d-0ba8b140b06e',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T15:11:05.714Z',
          },
          tagLine: 'Kolding School of Design',
          _updatedDate: {
            $date: '2024-10-30T15:11:05.714Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'ISPIM',
          _id: '5f459c96-4fb9-40e1-aa9d-0553ad7e997d',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T15:12:00.351Z',
          },
          tagLine: 'Connecting Innovation Professionals',
          _updatedDate: {
            $date: '2024-10-30T15:12:00.351Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'GEA College',
          _id: 'b8f5593f-cce9-416d-8219-e9ee55e3c6b0',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T15:13:11.876Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T15:13:11.876Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'IZT',
          _id: '25d719d5-e1dc-447c-a162-db43b3f00bcc',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T15:13:41.597Z',
          },
          tagLine: 'Institute for Future Studies and Technology Assessment',
          _updatedDate: {
            $date: '2024-10-30T15:13:41.597Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'Media University of Applied Sciences',
          _id: '026faf88-9bdc-47d8-9b81-3e4a7358c4bb',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T15:14:38.286Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T15:14:38.286Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'Finland Futures Research Centre',
          _id: '4a24fbff-eab7-4ad8-b686-dbc8bfd0a495',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T15:14:58.367Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T15:14:58.367Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'Estonian Design Centre',
          _id: '04c5f705-a600-4a8c-9d29-2cb1eecfe4b2',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T15:15:19.442Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T15:15:19.442Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'EDHEC',
          _id: 'eea4c623-07c5-43ab-9c2e-011ebe354c8f',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T15:15:34.644Z',
          },
          tagLine: 'Business School',
          _updatedDate: {
            $date: '2024-10-30T15:15:34.644Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'TAL TECH',
          _id: '552be7da-8367-4d8b-8915-5b66e56687f1',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T15:16:11.904Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T15:16:11.904Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'AIRBUS',
          _id: '20a23700-462e-466c-b802-d6d801a00e6e',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T15:16:22.907Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T15:16:22.907Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'MIDT',
          _id: 'e1e8b138-3873-471c-b8fa-d9595bc6446e',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T15:16:41.770Z',
          },
          tagLine: 'Region Midtjylland',
          _updatedDate: {
            $date: '2024-10-30T15:16:41.770Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'Nordic Foodtech',
          _id: '4840dc8b-4a3c-426a-8f32-d7c45ed5e603',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T15:16:56.041Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T15:16:56.041Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'Help Alliance',
          _id: '7eca8476-4b92-4aed-8785-19e21b345c2d',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T15:17:05.203Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T15:17:05.203Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'COMODULE',
          _id: 'f870937d-fc3f-4c7e-93f9-2a43df925230',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T15:17:11.904Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T15:17:11.904Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'North Estonia Medical Centre',
          _id: '30a45453-f2b9-4498-8b7d-e91a3ec31d05',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T15:17:26.953Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T15:17:26.953Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'La Muu',
          _id: '12d9a2f9-046c-437f-862a-08dfc02ca28d',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T15:17:38.587Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T15:17:38.587Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'Michelin',
          _id: '1dce5504-5bcc-4643-8da3-1bd001177a2f',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T15:18:04.638Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T15:18:04.638Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'Peter Larsen Kaffe',
          _id: '5e3c021a-8f0e-4ff6-bea7-4b374cdd4446',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T15:18:14.020Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T15:18:14.020Z',
          },
          tagType: 'organisation',
        },
      ],
      personProjectCoordonation: [],
      person: [],
      personOrganisation: [],
      postContentRIch1:
        '<p>SF4S is a collaborative action with partners from <a href="https://academiccareermaps.org/glossary/higher-education-institution-hei" target="_blank">Higher Education institutions</a>  (HEIs), Vocational Education and Training (VET) providers, innovation networks and business entities from the Agri-food, Health and the Mobility sectors.</p>\n',
      countryTag: [
        {
          popularity: 39,
          name: 'Denmark',
          _id: '9a950cb8-7b45-412c-9b50-9b326292e09e',
          _createdDate: {
            $date: '2024-08-27T09:48:24.752Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.752Z',
          },
          tagType: 'country',
        },
      ],
      title: 'Strategic Foresight for Sustainability',
      internalLinks: [],
      organisationMemberOf: [],
      activity: [],
      projectFunded: [
        {
          popularity: 27,
          name: 'EU funded',
          _id: 'f80d06e4-b326-4364-b250-0afa1fc777f3',
          _createdDate: {
            $date: '2024-08-27T09:48:25.119Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.119Z',
          },
          tagType: 'project type',
        },
      ],
      organisationHasMember: [],
      organisationPeople: [],
    },
    _id: '27c14600-5f0e-4f3b-a484-bac1c667e354',
  },
  {
    dataCollectionId: 'InfoPages',
    data: {
      projectParticipantTeam: [
        {
          name: 'Chris Carbone',
          _id: '36ff3f32-94ce-4b6b-aa01-e05afb86e882',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:38.986Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:38.986Z',
          },
          tagType: 'person',
        },
      ],
      organisation: [],
      organisationProject: [],
      postImage2: {
        url: ' ',
        caption: '',
      },
      postContentRIch2:
        '<p>The EU-funded MOVING project will build capacities and co-develop policy frameworks across Europe. It will establish new or upscaled value chains to boost resilience and sustainability of mountain areas. The first step will be to screen traditional and emerging value chains in all European mountain areas. The next step will involve in-depth assessment of vulnerability and resilience of land use, production systems and value chains in 23 mountain regions. The project will use a virtual research environment to promote online interactions amongst actors and new tools to ensure information is accessible by different audiences.</p>\n',
      methods: [
        {
          name: 'Participatory multi-level foresight',
          _id: '6f371990-ffe7-4ded-8d1e-9e975d6df857',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T14:47:17.518Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T14:47:17.518Z',
          },
          tagType: 'foresight method',
        },
      ],
      pageTypes: [
        {
          popularity: 35,
          name: 'project info',
          _id: 'fcb0cbbc-98a5-4743-8c8b-1cb1c8326a85',
          _createdDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          tagId: 252527,
          tagType: 'page type',
        },
      ],
      projectCoordinator: [],
      _id: 'c0ac92dd-18d6-4b49-976d-eb27404f7b92',
      _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
      _createdDate: {
        $date: '2024-10-30T14:54:31.803Z',
      },
      organisationType: [],
      postContentRIch3: '<p></p>\n',
      domains: [
        {
          popularity: 17,
          name: 'climate',
          _id: '7786f7cc-9cd1-430e-9d57-e83c033b3f2e',
          _createdDate: {
            $date: '2024-08-27T09:48:25.109Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.109Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 42,
          name: 'tourism',
          _id: 'ef20972d-aee1-4dda-9d33-3ddd8cedfd32',
          _createdDate: {
            $date: '2024-08-27T09:48:25.061Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.061Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 57,
          name: 'food',
          _id: '9bc8de80-3e4f-4fe9-b5b7-f2453006d157',
          _createdDate: {
            $date: '2024-08-27T09:48:25.089Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.089Z',
          },
          tagType: 'domain',
        },
        {
          name: 'Rural areas',
          _id: '9f91d9c6-a706-4f99-9c23-fd725d1d39d1',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T14:47:43.512Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T14:47:43.512Z',
          },
          tagType: 'domain',
        },
      ],
      personOrganisationFormer: [],
      personProjectParticipation: [],
      postImage1: {
        url: 'https://static.wixstatic.com/media/471908_60a928e2259f477aa06279aad1ec4c81~mv2.webp',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-30T15:04:31.328Z',
      },
      slug: 'moving-cwtyt',
      mediaFiles: [
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      projectStartDate: '2020-09-30T21:00:00.000Z',
      Project: [
        {
          name: 'MOVING',
          _id: '281aa217-2e67-4ed9-b69f-45ddcbe9d130',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T14:45:42.852Z',
          },
          tagLine:
            'Mountain Valorization through Interconnectedness and Green Growth',
          _updatedDate: {
            $date: '2024-10-30T14:56:43.223Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_de03f4e18ad84986b02a82ef571864d2~mv2.webp',
          tagType: 'project',
          tagPageLink: '/project/moving-cwtyt',
        },
      ],
      projectOrganisationRoles: [
        {
          organisation: 'University of Córdoba',
          role: 'Lead',
        },
        {
          organisation: 'University of Pisa',
          role: '',
        },
        {
          organisation: 'ZHAW',
          role: '',
        },
        {
          organisation: 'CZU',
          role: '',
        },
        {
          organisation: 'HCC',
          role: '',
        },
        {
          organisation: 'Universidade de Evora',
          role: '',
        },
        {
          organisation: 'The James Hutton Institute',
          role: '',
        },
        {
          organisation: 'INRAE',
          role: '',
        },
        {
          organisation: 'AEIDL',
          role: '',
        },
        {
          organisation: 'CNR',
          role: '',
        },
        {
          organisation: 'IFZ',
          role: '',
        },
        {
          organisation: 'University of Crete',
          role: '',
        },
        {
          organisation: 'Origin for Sustainability',
          role: '',
        },
        {
          organisation: 'Val de Drôme en Biovallée',
          role: '',
        },
        {
          organisation: 'MENAGROUP',
          role: '',
        },
        {
          organisation: 'AREPO',
          role: '',
        },
        {
          organisation: 'CNVP',
          role: '',
        },
        {
          organisation: 'AREPO',
          role: '',
        },
        {
          organisation: 'EGE University',
          role: '',
        },
        {
          organisation: 'KRITI',
          role: '',
        },
        {
          organisation:
            'Association for the Development of the Guadajoz and East Countryside of Córdoba',
          role: '',
        },
        {
          organisation: '',
          role: '',
        },
      ],
      projectOrganisation: [
        {
          name: 'University of Córdoba',
          _id: '5ede7448-a1de-4800-9385-8e3f57445416',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T14:48:40.746Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T14:48:40.746Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'University of Pisa',
          _id: '8a0205ef-82bc-4041-83e7-e515a55040ae',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T14:49:01.630Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T14:49:01.630Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'ZHAW',
          _id: '8117353f-eded-42d2-9170-156b89dcacb4',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T14:49:29.590Z',
          },
          tagLine: 'Zurich University of Applied Sciences',
          _updatedDate: {
            $date: '2024-10-30T14:49:29.590Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'CZU',
          _id: 'ea02ef27-2c17-4d02-8e7d-c20dda9f0ec4',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T14:50:27.764Z',
          },
          tagLine: 'Czech University of Life Sciences Prague',
          _updatedDate: {
            $date: '2024-10-30T14:50:27.764Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'HCC',
          _id: '1f2a6336-8199-4571-a598-f2b801ba5002',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T14:51:04.419Z',
          },
          tagLine: 'Highclere Consulting',
          _updatedDate: {
            $date: '2024-10-30T14:51:04.419Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'Universidade de Evora',
          _id: 'cf34c0da-8e26-426d-af5a-11a848b3af3e',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T14:51:32.833Z',
          },
          tagLine: 'University of Evora',
          _updatedDate: {
            $date: '2024-10-30T14:51:32.833Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'The James Hutton Institute',
          _id: '92fa4706-467e-4370-b1d2-4e8dfcc4bf86',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T14:51:54.809Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T14:51:54.809Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 84,
          tagline:
            "Institut National De Recherche Pour L'agriculture, L'alimentation Et L'environnement",
          name: 'INRAE',
          _id: 'b745b59c-35c0-4a06-bf42-7a4be0c46c0c',
          _createdDate: {
            $date: '2024-08-27T09:48:24.789Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.789Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'AEIDL',
          _id: '00503fe2-8cfd-4b24-94a3-57bca230b651',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T14:52:24.432Z',
          },
          tagLine: 'European Association for Information on Local Development',
          _updatedDate: {
            $date: '2024-10-30T14:52:24.432Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 12,
          tagline: 'Consiglio Nazionale delle Ricerche',
          name: 'CNR',
          _id: 'c4b51c39-e9ba-4c5a-9a19-8033caf815c9',
          _createdDate: {
            $date: '2024-08-27T09:48:24.888Z',
          },
          linked: true,
          _updatedDate: {
            $date: '2024-08-27T09:48:24.888Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'IFZ',
          _id: '3b00e3c7-b048-40bd-8841-4db86fec287a',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T14:53:35.005Z',
          },
          tagLine: 'Interdisciplinary Research Centre Austria',
          _updatedDate: {
            $date: '2024-10-30T14:53:35.005Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'University of Crete',
          _id: 'c30374a7-4906-4aeb-ad96-1d08cbf72c98',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T14:53:49.718Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T14:53:49.718Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'Origin for Sustainability',
          _id: '86f7cc23-e789-4cb4-a7f0-8a207a8e1571',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T14:54:25.044Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T14:54:25.044Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'Val de Drôme en Biovallée',
          _id: '7b248529-96b7-442b-b07a-6e4fefa0c837',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T15:00:40.173Z',
          },
          tagLine: 'Communauté de communes du Val de Drôme en Biovallée',
          _updatedDate: {
            $date: '2024-10-30T15:00:40.173Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'MENAGROUP',
          _id: '6e6a1598-5d2c-4294-92b5-71e42379ee77',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T15:01:17.302Z',
          },
          tagLine: 'Consultancy, Training & Translation',
          _updatedDate: {
            $date: '2024-10-30T15:01:17.302Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'AREPO',
          _id: '4e92da64-9580-49e2-a3c7-27ecc5bda983',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T15:01:45.660Z',
          },
          tagLine: 'Association of European Regions for Products of Origin',
          _updatedDate: {
            $date: '2024-10-30T15:01:45.660Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'CNVP',
          _id: 'e78322c6-6382-4da9-bcc8-494c439d7980',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T15:02:36.290Z',
          },
          tagLine: 'Stichting Connecting Natural Values and People Foundation',
          _updatedDate: {
            $date: '2024-10-30T15:02:36.290Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'EGE University',
          _id: '66e071f7-2e1f-4cb2-907c-963dcc0cb80c',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T15:03:11.413Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T15:03:11.413Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'KRITI',
          _id: '31c294c7-c0d1-4503-b7da-ae396f7a84bf',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T15:03:20.754Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T15:03:20.754Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'Association for the Development of the Guadajoz and East Countryside of Córdoba',
          _id: '0b17e302-192e-4973-b0b1-9c0dd309d60c',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T15:04:27.382Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T15:04:27.382Z',
          },
          tagType: 'organisation',
        },
      ],
      personProjectCoordonation: [],
      person: [],
      personOrganisation: [],
      postContentRIch1:
        '<p>European mountain areas play a central role in the well-being of many highly populated European regions. The big question is how these mountain areas are being impacted by climate change.&nbsp;</p>\n',
      countryTag: [
        {
          popularity: 33,
          name: 'Spain',
          _id: 'e0b7f833-7a38-4338-90f2-d0ce0a8f86b1',
          _createdDate: {
            $date: '2024-08-27T09:48:24.773Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.773Z',
          },
          tagType: 'country',
        },
      ],
      title: 'MOVING',
      internalLinks: [],
      organisationMemberOf: [],
      activity: [],
      projectFunded: [
        {
          popularity: 27,
          name: 'EU funded',
          _id: 'f80d06e4-b326-4364-b250-0afa1fc777f3',
          _createdDate: {
            $date: '2024-08-27T09:48:25.119Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.119Z',
          },
          tagType: 'project type',
        },
      ],
      organisationHasMember: [],
      organisationPeople: [],
    },
    _id: 'c0ac92dd-18d6-4b49-976d-eb27404f7b92',
  },
  {
    dataCollectionId: 'InfoPages',
    data: {
      projectParticipantTeam: [],
      organisation: [],
      organisationProject: [],
      postImage2: {
        url: ' ',
        caption: '',
      },
      postContentRIch2:
        '<p><strong>TRIGGER specific objectives are:</strong></p>\n<ul>\n<li>Advance the state of the art in understanding global governance;</li>\n<li>Evolution of the EU’s interaction with global governance, in particular so-called “actorness” and “effectiveness” of the EU;</li>\n<li>Understand how global governance and emerging technologies interact, and what role the EU plays in this respect, in particular as “regulatory superpower”;</li>\n<li>Identify emerging trends that strengthen / loosen deeper global governance and cooperation;</li>\n<li>Build capacity for strategic foresight and public engagement inside EU institutions.</li>\n</ul>\n<p>The TRIGGER consortium is composed of 14 partners, including four non-EU countries. TRIGGER will achieve its objectives thanks to the combined effort of four research sub-groups:</p>\n<ul>\n<li>a group focused on global and EU governance, which will create an unprecedented Atlas of Global Governance REGulation and Europe’s AcTORness (AGGREGATOR);</li>\n<li>a group focused on the relationship between governance and emerging technologies;&nbsp;</li>\n<li>a group dedicated to strategic foresight and public engagement, which will use new techniques such as AI-enabled sentiment analysis and innovative public engagement methods to develop a tool on Co-Creating the European Union (COCTEAU); and</li>\n<li>a group specialised in dissemination and communication. All major deliverables will eventually be merged into a toolkit dedicated to Public Engagement for Responsive and Shared EU Strategies (PERSEUS).</li>\n</ul>\n',
      methods: [
        {
          popularity: 36,
          name: 'scenarios',
          _id: '3c4917d4-7467-4fef-a6a3-af7b61b9e196',
          _createdDate: {
            $date: '2024-08-27T09:48:24.946Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.946Z',
          },
          tagType: 'foresight method',
        },
      ],
      pageTypes: [
        {
          popularity: 35,
          name: 'project info',
          _id: 'fcb0cbbc-98a5-4743-8c8b-1cb1c8326a85',
          _createdDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          tagId: 252527,
          tagType: 'page type',
        },
      ],
      projectCoordinator: [],
      _id: '164a5e35-17a4-47a1-a338-5687ec62372c',
      _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
      _createdDate: {
        $date: '2024-10-30T14:42:59.114Z',
      },
      organisationType: [],
      postContentRIch3: '<p></p>\n',
      domains: [
        {
          name: 'Global Governance',
          _id: '80af88dc-8fa2-4af9-a7e3-d35a4b3c9e58',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T14:32:33.828Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T14:32:33.828Z',
          },
          tagType: 'domain',
        },
      ],
      personOrganisationFormer: [],
      personProjectParticipation: [],
      postImage1: {
        url: 'https://static.wixstatic.com/media/471908_b3cd168a700548fe97baa71785b7a264~mv2.webp',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-30T14:42:59.114Z',
      },
      slug: 'trigger-ccark',
      mediaFiles: [
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      projectEndDate: '2022-04-30T21:00:00.000Z',
      projectStartDate: '2018-11-30T22:00:00.000Z',
      Project: [
        {
          name: 'TRIGGER',
          _id: '7784ef42-80d2-42a4-ba73-594ec319437e',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T14:31:42.671Z',
          },
          tagLine: "Trends in Global Governance and Europe's Role",
          _updatedDate: {
            $date: '2024-10-30T14:43:02.485Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_f6a0b22e12534f4aa843edb6b25304ce~mv2.png',
          tagType: 'project',
          tagPageLink: '/project/trigger-ccark',
        },
      ],
      projectOrganisationRoles: [
        {
          organisation: 'CEPS',
          role: 'Lead',
        },
        {
          organisation: 'Fraunhofer ISI',
          role: '',
        },
        {
          organisation: 'SPI',
          role: '',
        },
        {
          organisation: 'ISINNOVA',
          role: '',
        },
        {
          organisation: 'ETLA',
          role: '',
        },
        {
          organisation: 'EPFL',
          role: '',
        },
        {
          organisation: 'EUI',
          role: '',
        },
        {
          organisation: 'FUB',
          role: '',
        },
        {
          organisation: 'TUM',
          role: '',
        },
        {
          organisation: 'POLIMI',
          role: '',
        },
        {
          organisation: 'ESIDG',
          role: '',
        },
        {
          organisation: 'EMEA',
          role: '',
        },
        {
          organisation: 'EIMO',
          role: '',
        },
        {
          organisation: '',
          role: '',
        },
      ],
      projectOrganisation: [
        {
          name: 'CEPS',
          _id: 'a48d4010-fad4-4c72-9f1d-22eba3e04e7b',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T14:38:30.233Z',
          },
          tagLine: 'Centre for European Policy Studies',
          _updatedDate: {
            $date: '2024-10-30T14:38:30.233Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 106,
          name: 'Fraunhofer ISI',
          _id: 'b83286d1-5153-4efa-b694-e1828ca61739',
          _createdDate: {
            $date: '2024-08-27T09:48:24.829Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.829Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'SPI',
          _id: '959a75fe-432d-4372-8e1a-63d7f94fe274',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T14:39:13.628Z',
          },
          tagLine: 'Sociedade Portuguesa de Inovacao',
          _updatedDate: {
            $date: '2024-10-30T14:39:13.628Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'ISINNOVA',
          _id: 'd3fb10bb-0c2b-4902-b677-d43970198c35',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-19T17:25:16.424Z',
          },
          tagLine: 'Institute of Studies for the Integration of Systems',
          _updatedDate: {
            $date: '2024-10-19T17:25:16.424Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'ETLA',
          _id: '5ff85ccd-8cd2-47b6-9fbc-7616d80f5b42',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T14:39:32.034Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T14:39:32.034Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'EPFL',
          _id: 'edfa02b4-97dd-49e4-a2da-94582821bd91',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T14:40:10.854Z',
          },
          tagLine: 'Swiss Institute of Technology in Lausanne',
          _updatedDate: {
            $date: '2024-10-30T14:40:10.854Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'EUI',
          _id: '9be579e9-e60b-4ec9-8cde-9251ccc954da',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T14:40:48.165Z',
          },
          tagLine: 'European University Innitiative',
          _updatedDate: {
            $date: '2024-10-30T14:40:48.165Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'FUB',
          _id: '3762e27e-fa92-4490-a5bf-de61292c9a99',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T14:41:11.065Z',
          },
          tagLine: 'Freie Universität Berlin',
          _updatedDate: {
            $date: '2024-10-30T14:41:11.065Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'TUM',
          _id: '9c5dfb57-17f2-4b76-b94f-e6937b8ca019',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T14:41:39.206Z',
          },
          tagLine: 'Technical University of Munich',
          _updatedDate: {
            $date: '2024-10-30T14:41:39.206Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'POLIMI',
          _id: 'd842a8a5-e90e-44fa-b8dc-8fe668cf57a9',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T14:41:56.930Z',
          },
          tagLine: 'Politecnico Milano',
          _updatedDate: {
            $date: '2024-10-30T14:41:56.930Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'ESIDG',
          _id: 'a48cc720-bf78-424b-9222-7a0032297362',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T14:42:16.029Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T14:42:16.029Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'EMEA',
          _id: '543e59fd-3946-4c08-bbf9-73f6c4b818d9',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T14:42:34.724Z',
          },
          tagLine: 'Euro Mediterranean Economists Association',
          _updatedDate: {
            $date: '2024-10-30T14:42:34.724Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'EIMO',
          _id: '1aadf5ad-788e-4fce-a2c5-23fe061a846e',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T14:42:54.739Z',
          },
          tagLine: 'Eurasian Institute of International Affairs',
          _updatedDate: {
            $date: '2024-10-30T14:42:54.739Z',
          },
          tagType: 'organisation',
        },
      ],
      personProjectCoordonation: [],
      person: [],
      personOrganisation: [],
      postContentRIch1:
        '<p>The ultimate objectives of TRIGGER are to provide EU institutions with knowledge and tools to enhance their actorness, effectiveness and influence in global governance; and to develop new ways to harness the potential of public engagement and participatory foresight in complex governance decisions, thereby also tackling emerging trends such as nationalism, regionalism and protectionism.</p>\n',
      countryTag: [],
      title: 'TRIGGER',
      internalLinks: [],
      organisationMemberOf: [],
      activity: [],
      projectFunded: [],
      organisationHasMember: [],
      organisationPeople: [],
    },
    _id: '164a5e35-17a4-47a1-a338-5687ec62372c',
  },
  {
    dataCollectionId: 'InfoPages',
    data: {
      projectParticipantTeam: [],
      organisation: [],
      organisationProject: [],
      postImage2: {
        url: ' ',
        caption: '',
      },
      postContentRIch2:
        '<p>Earth4All started as a vibrant collective of leading economic thinkers, scientists, policy leaders, and advocates, convened by The Club of Rome, the Potsdam Institute for Climate Impact Research, the Stockholm Resilience Centre and the Norwegian Business School.</p>\n<p>Building on the legacies of The Limits to Growth and the Planetary Boundaries frameworks, science is at the heart of our work. Leading scientists have developed state of the art systems dynamic models and run different scenarios for possible plausible futures.<br><br>Earth4All is guided by a Transformational Economics Commission, made up of economic thinkers from across the globe to explore new economic thinking and test the model outcomes.<br><br>The third pillar is a global campaign that aims to make the Earth4All vision a reality, advocating for governments to adopt policies that will enable resilient and healthy societies.<br><br>We are providing a platform to connect and amplify the voices of people and organisations who want to upgrade our economies. The momentum is growing, with communities and policy makers around the world pushing for economic systems change.</p>\n',
      methods: [
        {
          popularity: 36,
          name: 'scenarios',
          _id: '3c4917d4-7467-4fef-a6a3-af7b61b9e196',
          _createdDate: {
            $date: '2024-08-27T09:48:24.946Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.946Z',
          },
          tagType: 'foresight method',
        },
      ],
      pageTypes: [
        {
          popularity: 35,
          name: 'project info',
          _id: 'fcb0cbbc-98a5-4743-8c8b-1cb1c8326a85',
          _createdDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          tagId: 252527,
          tagType: 'page type',
        },
      ],
      projectCoordinator: [],
      _id: '63c19922-1f4e-4265-ab0c-23e94ae5a49c',
      _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
      _createdDate: {
        $date: '2024-10-30T14:29:58.291Z',
      },
      organisationType: [],
      postContentRIch3: '<p></p>\n',
      domains: [
        {
          popularity: 21,
          name: 'regenerative economy',
          _id: '02cfa0e4-9723-47f3-9b2d-b262242be010',
          _createdDate: {
            $date: '2024-08-27T09:48:25.071Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.071Z',
          },
          tagId: 1111,
          tagType: 'domain',
        },
        {
          popularity: 47,
          name: 'climate change',
          _id: '21181beb-717e-44c5-aa42-1497a9ab763c',
          _createdDate: {
            $date: '2024-08-27T09:48:25.108Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.108Z',
          },
          tagType: 'domain',
        },
      ],
      personOrganisationFormer: [],
      personProjectParticipation: [],
      postImage1: {
        url: 'https://static.wixstatic.com/media/471908_b6c26eb3d2e945d18b6dce996b516294~mv2.webp',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-30T14:29:58.291Z',
      },
      slug: 'earth4all-t4zky',
      mediaFiles: [
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      Project: [
        {
          name: 'Earth4All',
          _id: 'aa505536-7d87-421a-8f78-8fd3079f65e1',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T14:26:52.689Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T14:30:00.836Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_976f998447554c16bc2e5180815be61d~mv2.webp',
          tagType: 'project',
          tagPageLink: '/project/earth4all-t4zky',
        },
      ],
      projectOrganisationRoles: [
        {
          organisation: '',
          role: '',
        },
      ],
      projectOrganisation: [],
      personProjectCoordonation: [],
      person: [],
      personOrganisation: [],
      postContentRIch1:
        '<p>Earth4All is an international initiative to accelerate the systems-change we need for an equitable future on a finite planet.  Our analysis combines the best available science with new economic thinking. We found that the next ten years must see the fastest economic transformation in history if we want to steer humanity away from social and ecological catastrophe.&nbsp;</p>\n',
      countryTag: [
        {
          name: 'Global',
          _id: '1c0130dd-ea02-4659-a0f8-b9336c5cd3b2',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T14:29:53.204Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T14:29:53.204Z',
          },
          tagType: 'country',
        },
      ],
      title: 'Earth4All',
      internalLinks: [],
      organisationMemberOf: [],
      activity: [],
      projectFunded: [],
      organisationHasMember: [],
      organisationPeople: [],
    },
    _id: '63c19922-1f4e-4265-ab0c-23e94ae5a49c',
  },
  {
    dataCollectionId: 'InfoPages',
    data: {
      projectParticipantTeam: [],
      organisation: [],
      organisationProject: [],
      postImage2: {
        url: ' ',
        caption: '',
      },
      postContentRIch2:
        '<p><strong>MISSION</strong><br>Science, technology and arts (STARTS for short) limn a nexus at which insightful observers have identified extraordinarily high potential for innovation. And innovation is precisely what’s called for if we’re to master the social, ecological and economic challenges that Europe will be facing in the near future. With the S+T+ARTS initiative, the European Commission’s focus is on projects and people that have the potential to make meaningful contributions to this effort.</p>\n<p><strong>VISION</strong><br>S+T+ARTS is driven by the conviction that science and technology combined with an artistic viewpoint also open valuable perspectives for research and business, through a holistic and human-centered approach.</p>\n<p><strong>STRATEGY</strong><br>S+T+ARTS is sustained by the STARTS Pillars that represent all the dimensions STARTS works with. Different funded projects offer complementary opportunities and services.</p>\n',
      methods: [],
      pageTypes: [
        {
          popularity: 35,
          name: 'project info',
          _id: 'fcb0cbbc-98a5-4743-8c8b-1cb1c8326a85',
          _createdDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          tagId: 252527,
          tagType: 'page type',
        },
      ],
      projectCoordinator: [],
      _id: '45632c9b-452e-48f0-9f28-77507d88b239',
      _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
      _createdDate: {
        $date: '2024-10-30T14:22:05.738Z',
      },
      organisationType: [],
      postContentRIch3: '<p></p>\n',
      domains: [
        {
          popularity: 55,
          name: 'science',
          _id: '622a56c2-8a0b-4f2f-8df2-2f08463b104c',
          _createdDate: {
            $date: '2024-08-27T09:48:25.068Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.068Z',
          },
          tagType: 'domain',
        },
        {
          name: 'Technology',
          _id: '368ca20a-2c71-4b52-887c-eb44b0782b61',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T14:20:05.324Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T14:20:05.324Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 66,
          name: 'art',
          _id: 'ef4be6b1-f847-46ed-81bd-92d934f3dadc',
          _createdDate: {
            $date: '2024-08-27T09:48:25.117Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.117Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 69,
          name: 'innovation',
          _id: 'fbc8b693-f1b1-496a-8591-769ad797ad0d',
          _createdDate: {
            $date: '2024-08-27T09:48:25.080Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.080Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 28,
          name: 'technological change',
          _id: '38c263dc-399a-4ffc-a02c-7d8541ca872c',
          _createdDate: {
            $date: '2024-08-27T09:48:25.062Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.062Z',
          },
          tagType: 'domain',
        },
      ],
      personOrganisationFormer: [],
      personProjectParticipation: [],
      postImage1: {
        url: 'https://static.wixstatic.com/media/471908_3d8bdaf259ce44759805a6502ab2f296~mv2.webp',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-30T14:24:16.768Z',
      },
      slug: 'starts-5mq0p',
      mediaFiles: [
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      projectEndDate: '2026-11-30T22:00:00.000Z',
      projectStartDate: '2023-12-31T22:00:00.000Z',
      Project: [
        {
          name: 'S+T+Arts',
          _id: 'e36c3384-0ec4-4ee4-9eb8-2cbaeef6b8d8',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T14:11:27.757Z',
          },
          tagLine: 'Science, Technology and Arts ',
          _updatedDate: {
            $date: '2024-10-30T14:24:16.450Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_f7db5aca5a5a40dcb9c208b945d93040~mv2.png',
          tagType: 'project',
          tagPageLink: '/project/starts-5mq0p',
        },
      ],
      projectOrganisationRoles: [
        {
          organisation: 'European Commission',
          role: '',
        },
        {
          organisation: 'Ars Electronica',
          role: '',
        },
        {
          role: '',
        },
      ],
      projectOrganisation: [
        {
          popularity: 92,
          name: 'European Commission',
          _id: '2202a680-08ba-4055-aa8d-bf6ea285978f',
          _createdDate: {
            $date: '2024-08-27T09:48:24.825Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.825Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'Ars Electronica',
          _id: 'b1da9583-5677-42c5-8f20-43227ff358bd',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T14:19:43.798Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T14:19:43.798Z',
          },
          tagType: 'organisation',
        },
      ],
      personProjectCoordonation: [],
      person: [],
      personOrganisation: [],
      postContentRIch1:
        '<p>S+T+ARTS is an initiative of the European Commission, launched under the Horizon 2020 research and innovation programme to support collaborations between artists, scientists, engineers and researchers.</p>\n',
      countryTag: [],
      title: 'S+T+Arts',
      internalLinks: [],
      organisationMemberOf: [],
      activity: [],
      projectFunded: [
        {
          popularity: 27,
          name: 'EU funded',
          _id: 'f80d06e4-b326-4364-b250-0afa1fc777f3',
          _createdDate: {
            $date: '2024-08-27T09:48:25.119Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.119Z',
          },
          tagType: 'project type',
        },
      ],
      organisationHasMember: [],
      organisationPeople: [],
    },
    _id: '45632c9b-452e-48f0-9f28-77507d88b239',
  },
  {
    dataCollectionId: 'InfoPages',
    data: {
      projectParticipantTeam: [
        {
          name: 'Eckhard Störmer',
          _id: 'c424635c-1674-4a31-ab09-1e71e97210f4',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.130Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.130Z',
          },
          tagType: 'person',
        },
      ],
      organisation: [],
      organisationProject: [],
      postImage2: {
        url: ' ',
        caption: '',
      },
      postContentRIch2:
        '<p>This 3-year Horizon Europe project, funded by the European Commission, brings together 13 partners with the aim of understanding where, how and to what extent digital technologies and data are being adopted within the agricultural and forestry sectors. The project started in January 2024 and will end in December 2026.</p>\n',
      methods: [
        {
          popularity: 36,
          name: 'scenarios',
          _id: '3c4917d4-7467-4fef-a6a3-af7b61b9e196',
          _createdDate: {
            $date: '2024-08-27T09:48:24.946Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.946Z',
          },
          tagType: 'foresight method',
        },
        {
          popularity: 47,
          name: 'horizon scanning',
          _id: 'b1d63812-7f03-4fa0-bfc7-b8d89363baa8',
          _createdDate: {
            $date: '2024-08-27T09:48:24.957Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.957Z',
          },
          tagType: 'foresight method',
        },
      ],
      pageTypes: [
        {
          popularity: 35,
          name: 'project info',
          _id: 'fcb0cbbc-98a5-4743-8c8b-1cb1c8326a85',
          _createdDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          tagId: 252527,
          tagType: 'page type',
        },
      ],
      projectCoordinator: [],
      _id: '570b4291-975f-46f1-9979-8aacbbce40db',
      _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
      _createdDate: {
        $date: '2024-10-30T14:07:51.878Z',
      },
      organisationType: [],
      postContentRIch3: '<p></p>\n',
      domains: [
        {
          popularity: 22,
          name: 'digitalisation',
          _id: 'b5791a5e-8819-4afe-b69b-97aaed7f7565',
          _createdDate: {
            $date: '2024-08-27T09:48:25.099Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.099Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 29,
          trend: '3',
          name: 'Agriculture',
          _id: '2ceb4abf-2b73-4a2d-b2c3-4d4468d94f4a',
          _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
          _createdDate: {
            $date: '2024-08-27T09:48:25.118Z',
          },
          _updatedDate: {
            $date: '2024-10-15T10:52:22.337Z',
          },
          tagType: 'domain',
        },
        {
          name: 'Forestry',
          _id: 'e2c7f170-5ed8-4d20-beae-c9806ab21b2d',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T13:57:01.225Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T13:57:01.225Z',
          },
          tagType: 'domain',
        },
        {
          name: 'Digital Technologies',
          _id: '07e9b036-3282-484e-add9-8084663c060f',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T13:57:42.543Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T13:57:42.543Z',
          },
          tagType: 'domain',
        },
      ],
      personOrganisationFormer: [],
      personProjectParticipation: [],
      postImage1: {
        url: 'https://static.wixstatic.com/media/471908_6971787f98254883b6bc859af488500e~mv2.webp',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-30T14:07:51.878Z',
      },
      slug: '4growth-project-agirf',
      mediaFiles: [
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      projectEndDate: '2026-11-30T22:00:00.000Z',
      projectStartDate: '2023-12-31T22:00:00.000Z',
      Project: [
        {
          name: '4Growth project',
          _id: '4267c0a9-4d16-4274-8696-c32929aff7d0',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T13:54:21.666Z',
          },
          tagLine: 'Understanding the Market to Forecast Future Growth',
          _updatedDate: {
            $date: '2024-10-30T14:07:55.629Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_61f83fe4a68c4dd78d4822b8d3f73ce4~mv2.png',
          tagType: 'project',
          tagPageLink: '/project/4growth-project-agirf',
        },
      ],
      projectOrganisationRoles: [
        {
          organisation: 'Wageningen University & Research',
          role: 'Lead',
        },
        {
          organisation: 'EVENFLOW',
          role: 'Technical Managers',
        },
        {
          organisation: 'GEOPONIKO PANEPISTIMION ATHINON',
          role: '',
        },
        {
          organisation: 'FOODSCALE HUB GREECE',
          role: '',
        },
        {
          organisation: 'LE Europe',
          role: '',
        },
        {
          organisation: 'Future Impacts',
          role: '',
        },
        {
          organisation: 'SIMBIOTICA',
          role: '',
        },
        {
          organisation: 'ILVO Vlaanderen',
          role: '',
        },
        {
          organisation: 'INTIA',
          role: '',
        },
        {
          organisation: 'CTIFL',
          role: '',
        },
        {
          organisation: 'VTT',
          role: '',
        },
        {
          organisation: 'AgriFood Lithuania',
          role: '',
        },
        {
          organisation: 'Aristotelio Panepistimio Thessalonikis',
          role: '',
        },
        {
          organisation: '',
          role: '',
        },
      ],
      projectOrganisation: [
        {
          name: 'Wageningen University & Research',
          _id: 'c20d7ac3-3cf5-4bd2-aaad-f338e10bb7f7',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T13:58:59.315Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T13:58:59.315Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'EVENFLOW',
          _id: 'f765435b-872e-497f-be7b-baca301c8d5a',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T13:59:18.713Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T13:59:18.713Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'GEOPONIKO PANEPISTIMION ATHINON',
          _id: '9ddaae5c-ee55-4e8a-9f8f-f83e0d8d0d7d',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T14:00:36.298Z',
          },
          tagLine: 'Agricultural University of Athens',
          _updatedDate: {
            $date: '2024-10-30T14:00:36.298Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'FOODSCALE HUB GREECE',
          _id: '6699ee61-f457-4145-bbca-45beb49a0a7b',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T14:01:13.046Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T14:01:13.046Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'LE Europe',
          _id: '7b5f65ac-92d0-4b4b-9533-257531c479d5',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T14:01:53.060Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T14:01:53.060Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'Future Impacts',
          _id: 'e41aace0-fbd1-497a-b0ae-ebce07475b59',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T14:02:10.758Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T14:02:10.758Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'SIMBIOTICA',
          _id: '48da22a2-deac-4894-97c4-fd47f97d0111',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T14:02:28.901Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T14:02:28.901Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'ILVO Vlaanderen',
          _id: '586d63ad-2442-4fb9-ad8d-ecc2dbd1cfc0',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T14:03:19.813Z',
          },
          tagLine: 'Institute for Agriculture, Fisheries and Food Research',
          _updatedDate: {
            $date: '2024-10-30T14:03:19.813Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'INTIA',
          _id: '0a0f2106-3ac9-4bb2-a210-ba993219cec5',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T14:04:49.302Z',
          },
          tagLine:
            'Instituto Navarro de Tecnologías e Infraestructuras Agroalimentarias',
          _updatedDate: {
            $date: '2024-10-30T14:04:49.302Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'CTIFL',
          _id: 'b818e33d-d122-42b9-aff1-88e224dc55db',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T14:05:46.047Z',
          },
          tagLine:
            'Interprofessional Technical Center for Fruits and Vegetables',
          _updatedDate: {
            $date: '2024-10-30T14:05:46.047Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 52,
          name: 'VTT',
          _id: 'd182861b-6b93-4489-9fec-b0ddfd76840e',
          _createdDate: {
            $date: '2024-08-27T09:48:24.826Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.826Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'AgriFood Lithuania',
          _id: '494e118e-4add-44de-af2e-ecc0705f0060',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T14:07:03.851Z',
          },
          tagLine: 'The Future of Smart Agriculture is Now',
          _updatedDate: {
            $date: '2024-10-30T14:07:03.851Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 6,
          name: 'Aristotelio Panepistimio Thessalonikis',
          _id: 'aac27909-04f4-4ff7-9a65-625aed019f1d',
          _createdDate: {
            $date: '2024-08-27T09:48:24.828Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.828Z',
          },
          tagType: 'organisation',
        },
      ],
      personProjectCoordonation: [],
      person: [],
      personOrganisation: [],
      postContentRIch1:
        '<p>4Growth will showcase the uptake of digital technologies and data through the “4Growth Visualisation Platform” that will combine powerful storytelling with advanced visualisations of the market.</p>\n',
      countryTag: [
        {
          popularity: 13,
          name: 'Netherlands',
          _id: '3cf5f1b1-e9af-498c-a981-2c9eff9da408',
          _createdDate: {
            $date: '2024-08-27T09:48:24.739Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.739Z',
          },
          tagType: 'country',
        },
      ],
      title: '4Growth project',
      internalLinks: [],
      organisationMemberOf: [],
      activity: [],
      projectFunded: [
        {
          popularity: 27,
          name: 'EU funded',
          _id: 'f80d06e4-b326-4364-b250-0afa1fc777f3',
          _createdDate: {
            $date: '2024-08-27T09:48:25.119Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.119Z',
          },
          tagType: 'project type',
        },
      ],
      organisationHasMember: [],
      organisationPeople: [],
    },
    _id: '570b4291-975f-46f1-9979-8aacbbce40db',
  },
  {
    dataCollectionId: 'InfoPages',
    data: {
      projectParticipantTeam: [
        {
          name: 'Giovanna Guiffrè',
          _id: '9f43d0ff-05f5-45a0-a991-618ab5cb0375',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.313Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.313Z',
          },
          tagType: 'person',
        },
        {
          name: 'Valentina Malcotti',
          _id: '2865017b-34f3-43e5-9a3e-129b48af5e04',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.066Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.066Z',
          },
          tagType: 'person',
        },
      ],
      organisation: [],
      organisationProject: [],
      postImage2: {
        url: ' ',
        caption: '',
      },
      postContentRIch2:
        '<p><strong>Activities</strong></p>\n<p>OrganicTargets4EU for reaching these targets and identifies key drivers and lock-ins affecting the development of organic agriculture and aquaculture in 29 countries (EU-27+CH+NO).&nbsp;</p>\n<p><strong>Production and Market analysis</strong> of the identified scenarios to provide a picture of:</p>\n<ul>\n<li>Where increases in organic farmland can be achieved</li>\n<li>The socio-economic impacts of these increases at the level of primary production, value chains, and markets</li>\n<li>The mechanisms that can drive demand for organic food&nbsp;</li>\n</ul>\n<p><strong>Knowledge &amp; Innovation actions to:</strong></p>\n<ul>\n<li>Identify opportunities to strengthen organic advisory services</li>\n<li>Stimulate the exchange of scientific and practical knowledge</li>\n<li>Increase and coordinate R&amp;I investments in the organic sector&nbsp;</li>\n</ul>\n<p>Policy work facilitating a <strong>multi-actor policy dialogue</strong> to:</p>\n<ul>\n<li>Assess the feasibility of the organic Farm-to-Fork targets</li>\n<li>Supports the implementation of the Common Agricultural Policy (CAP), EU Organic Regulation, Organic Action Plan</li>\n<li>Provide short-term policy options (policy framework up to 2027) and policy recommendations in the next policy reform (from 2028 onwards).</li>\n</ul>\n',
      methods: [
        {
          popularity: 36,
          name: 'scenarios',
          _id: '3c4917d4-7467-4fef-a6a3-af7b61b9e196',
          _createdDate: {
            $date: '2024-08-27T09:48:24.946Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.946Z',
          },
          tagType: 'foresight method',
        },
      ],
      pageTypes: [
        {
          popularity: 35,
          name: 'project info',
          _id: 'fcb0cbbc-98a5-4743-8c8b-1cb1c8326a85',
          _createdDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          tagId: 252527,
          tagType: 'page type',
        },
      ],
      projectCoordinator: [],
      _id: 'a46a5435-01f2-419e-b96f-16551200d03b',
      _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
      _createdDate: {
        $date: '2024-10-30T13:06:45.181Z',
      },
      organisationType: [],
      postContentRIch3: '<p></p>\n',
      domains: [
        {
          popularity: 29,
          trend: '3',
          name: 'Agriculture',
          _id: '2ceb4abf-2b73-4a2d-b2c3-4d4468d94f4a',
          _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
          _createdDate: {
            $date: '2024-08-27T09:48:25.118Z',
          },
          _updatedDate: {
            $date: '2024-10-15T10:52:22.337Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 20,
          name: 'organic farming',
          _id: 'fae450e2-9a3c-4b00-b8ab-8e9eab67d1ec',
          _createdDate: {
            $date: '2024-08-27T09:48:25.074Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.074Z',
          },
          tagType: 'domain',
        },
      ],
      personOrganisationFormer: [],
      personProjectParticipation: [],
      postImage1: {
        url: 'https://static.wixstatic.com/media/471908_e3a856b26ca5441cbeb4e2d5ac3b6560~mv2.webp',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-30T13:47:14.260Z',
      },
      slug: 'organictargets4eu-0ai6d',
      mediaFiles: [
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      projectEndDate: '2026-01-31T22:00:00.000Z',
      projectStartDate: '2022-08-31T21:00:00.000Z',
      Project: [
        {
          name: 'OrganicTargets4EU',
          _id: '27571e99-eaed-48f4-b700-10363e95aba2',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T13:05:25.271Z',
          },
          tagLine:
            'Transformation scenarios for boosting organic farming and aquaculture towards the Farm-to-fork targets',
          _updatedDate: {
            $date: '2024-10-30T13:25:40.426Z',
          },
          picture:
            'https://static.wixstatic.com/shapes/471908_595eda1ad2ae42c8bbc366903202775d.svg',
          tagType: 'project',
          tagPageLink: '/project/organictargets4eu-0ai6d',
        },
      ],
      projectOrganisationRoles: [
        {
          organisation: 'IFOAM Organics Europe',
          role: 'Lead',
        },
        {
          organisation: 'FIBL Europe',
          role: '',
        },
        {
          organisation: 'INRAE',
          role: '',
        },
        {
          organisation: 'NATURLAND',
          role: '',
        },
        {
          organisation: 'FIBL',
          role: '',
        },
        {
          organisation: 'Aristotelio Panepistimio Thessalonikis',
          role: '',
        },
        {
          organisation: 'ITAB',
          role: '',
        },
        {
          organisation: 'OMKi',
          role: '',
        },
        {
          organisation: 'CIHEAM BARI',
          role: '',
        },
        {
          organisation: 'Innovation Centre for Organic Farming',
          role: '',
        },
        {
          organisation: 'Landwirtschaftskammer Niederoesterreich',
          role: '',
        },
        {
          organisation: 'THUNEN',
          role: '',
        },
        {
          organisation: 'Fondazione Coispa ETS',
          role: '',
        },
        {
          organisation: 'IDDRI',
          role: '',
        },
        {
          organisation: 'LK Österreich',
          role: '',
        },
        {
          organisation: 'Universita Politecnica delle Marche',
          role: '',
        },
        {
          organisation: 'CONSULAI',
          role: '',
        },
        {
          organisation: 'ICROFS',
          role: '',
        },
        {
          organisation: 'Aarhus Universitet',
          role: '',
        },
        {
          organisation: 'Universitatea Spiru Haret',
          role: '',
        },
        {
          organisation: '',
          role: '',
        },
      ],
      projectOrganisation: [
        {
          name: 'IFOAM Organics Europe',
          _id: '7b9ca0e9-07c9-466c-b601-d7cbfd84b2ae',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T13:21:45.754Z',
          },
          tagLine: 'Making Europe More Organic',
          _updatedDate: {
            $date: '2024-10-30T13:21:45.754Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 69,
          tagline: 'Forschungsinstitutfur Biologischen Landbau in Europa',
          name: 'FIBL Europe',
          _id: 'b0e78ac1-5ef1-49bf-bbdf-1088552e002a',
          _createdDate: {
            $date: '2024-08-27T09:48:24.788Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.788Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 84,
          tagline:
            "Institut National De Recherche Pour L'agriculture, L'alimentation Et L'environnement",
          name: 'INRAE',
          _id: 'b745b59c-35c0-4a06-bf42-7a4be0c46c0c',
          _createdDate: {
            $date: '2024-08-27T09:48:24.789Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.789Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 56,
          tagline: 'Verband fur Okologischen Landbau Ev',
          name: 'NATURLAND',
          _id: 'ec37b234-8f6d-4b3a-ba65-b95daa2a3752',
          _createdDate: {
            $date: '2024-08-27T09:48:24.860Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.860Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'FIBL',
          _id: 'c5dd9a9d-1714-405a-94d4-ffa6242a29b3',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T13:23:48.138Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T13:23:48.138Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 6,
          name: 'Aristotelio Panepistimio Thessalonikis',
          _id: 'aac27909-04f4-4ff7-9a65-625aed019f1d',
          _createdDate: {
            $date: '2024-08-27T09:48:24.828Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.828Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'ITAB',
          _id: '01102bed-c374-4b97-9e45-f856d5ce62dd',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T13:28:46.405Z',
          },
          tagLine: "Institut Technique de l'Agriculture Biologique",
          _updatedDate: {
            $date: '2024-10-30T13:28:46.405Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'OMKi',
          _id: '3c45ac67-57ab-4be4-9bfb-9f601d229035',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T13:30:37.844Z',
          },
          tagLine: 'Ecological Agricultural Research Institute',
          _updatedDate: {
            $date: '2024-10-30T13:30:37.844Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'CIHEAM BARI',
          _id: '85088151-2ff1-418f-8466-3f74433c2d07',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T13:31:49.559Z',
          },
          tagLine: 'Mediterranean Agronomic Institute of Bari',
          _updatedDate: {
            $date: '2024-10-30T13:31:49.559Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'Innovation Centre for Organic Farming',
          _id: '9a7a7fd4-4fe9-4849-a51d-1eff8503851d',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T13:32:43.261Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T13:32:43.261Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 97,
          name: 'Landwirtschaftskammer Niederoesterreich',
          _id: '0a453e4b-853b-47fc-a284-b4344a637490',
          _createdDate: {
            $date: '2024-08-27T09:48:24.859Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.859Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'THUNEN',
          _id: 'fda015b2-f404-4489-a9cc-4d1cf32881c0',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T13:36:36.440Z',
          },
          tagLine: 'Thünen Institute',
          _updatedDate: {
            $date: '2024-10-30T13:36:36.440Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 75,
          trend: '3',
          name: 'Fondazione Coispa ETS',
          _id: '3a440b29-2550-47d5-b351-b3a7f55fb423',
          _createdDate: {
            $date: '2024-08-27T09:48:24.895Z',
          },
          linked: true,
          _updatedDate: {
            $date: '2024-08-27T09:48:24.895Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'IDDRI',
          _id: 'ca83a34b-de93-4935-b5a5-41d2624cd1c3',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T13:37:29.451Z',
          },
          tagLine: 'Sustainable Development & International Relations',
          _updatedDate: {
            $date: '2024-10-30T13:37:29.451Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'LK Österreich',
          _id: 'b5eaf364-404d-4bdf-b081-82b846aa86fc',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T13:39:49.768Z',
          },
          tagLine: 'Landwirtschaftskammer Österreich',
          _updatedDate: {
            $date: '2024-10-30T13:39:49.768Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 87,
          name: 'Universita Politecnica delle Marche',
          _id: '13c5c12e-ac78-451c-a1f3-39ec45bd7fa3',
          _createdDate: {
            $date: '2024-08-27T09:48:24.858Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.858Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 113,
          tagline: 'Consultoria Agroindustrial LDA',
          name: 'CONSULAI',
          _id: '44df82b2-6b90-4fc8-998e-a358bae1e212',
          _createdDate: {
            $date: '2024-08-27T09:48:24.797Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.797Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'ICROFS',
          _id: 'a7218e54-b87a-4e66-b9a3-37c7d97dc5dd',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-30T13:40:52.320Z',
          },
          tagLine: 'International Centre for Research in Organic Food Systems',
          _updatedDate: {
            $date: '2024-10-30T13:40:52.320Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 108,
          name: 'Aarhus Universitet',
          _id: '6d0c5a80-b8e4-4429-b282-b73eb90770f2',
          _createdDate: {
            $date: '2024-08-27T09:48:24.889Z',
          },
          linked: true,
          _updatedDate: {
            $date: '2024-08-27T09:48:24.889Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 100,
          name: 'Universitatea Spiru Haret',
          _id: 'd3297b45-14d1-4161-b781-7de92d00e9f5',
          _createdDate: {
            $date: '2024-08-27T09:48:24.799Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.799Z',
          },
          tagType: 'organisation',
        },
      ],
      personProjectCoordonation: [],
      person: [],
      personOrganisation: [],
      postContentRIch1:
        "<p>OrganicTargets4EU supports the Farm-to-Fork Strategy in achieving the targets of at least 25% of the EU's agricultural land under organic farming and a significant increase in organic aquaculture by 2030.</p>\n",
      countryTag: [
        {
          popularity: 45,
          name: 'Germany',
          _id: '24e5e426-7a0f-46eb-80e5-f4f6c46bdfff',
          _createdDate: {
            $date: '2024-08-27T09:48:24.749Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.749Z',
          },
          tagType: 'country',
        },
      ],
      title: 'OrganicTargets4EU',
      internalLinks: [],
      organisationMemberOf: [],
      activity: [],
      projectFunded: [
        {
          popularity: 27,
          name: 'EU funded',
          _id: 'f80d06e4-b326-4364-b250-0afa1fc777f3',
          _createdDate: {
            $date: '2024-08-27T09:48:25.119Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.119Z',
          },
          tagType: 'project type',
        },
      ],
      organisationHasMember: [],
      organisationPeople: [],
    },
    _id: 'a46a5435-01f2-419e-b96f-16551200d03b',
  },
  {
    dataCollectionId: 'InfoPages',
    data: {
      projectParticipantTeam: [],
      organisation: [],
      organisationProject: [],
      postImage2: {
        url: ' ',
        caption: '',
      },
      postContentRIch2:
        "<p>This dedicated ling lab is contextualised in a broader context of a deliberative democracy: Living Labs can be seen as spaces for Organisational Learning and Collective Experimentation:Living Labs: ‘real-life test and experimentation environments that foster co-creation and open innovation among the main actors of the Quadruple Helix Model, namely: Citizens, Governmental Organisations, Industrial organisations and Academia’ (ENoLL 2024)It operationalises an important feature of Responsible Research and Innovation: Making stakeholders co-responsible and mutually responsive to each other by engaging them in an open co-creation/ co-enquiry process. (among other on the basis of participatory foresight of emerging technologies and innovations)The idea of 'openess' and 'mutual reponsiveness' as values of actors and institutions will also be subject of analysis.Science and innovation can be better fostered in an open, democratic society than in other types of societies. The norm of civic participation in a ‘democracy’ is a lived ideal for citizens, just as the norm of ‘communalism’ is a lived ideal for the scientific community. Both norms presuppose the values of ‘openness’ and 'mutual responsiveness' among scientist and citizens.This highlights ‘openness’ not as a prescriptive norm but as a value of the institution of science. Simultaneously, ‘openness’ is also an institutional value of a democracy. However, science and democracy are dependent on the extent to which scientist and citizens engage on the basis of these norms. How can we best encourage and incentivise those?</p>\n",
      methods: [],
      pageTypes: [
        {
          popularity: 35,
          name: 'project info',
          _id: 'fcb0cbbc-98a5-4743-8c8b-1cb1c8326a85',
          _createdDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          tagId: 252527,
          tagType: 'page type',
        },
      ],
      projectCoordinator: [],
      _id: 'a1def267-5f32-4865-80cb-7855ba956d61',
      _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
      _createdDate: {
        $date: '2024-10-28T09:34:38.579Z',
      },
      organisationType: [],
      postContentRIch3: '<p></p>\n',
      domains: [
        {
          popularity: 48,
          name: 'democracy',
          _id: 'b6eb6f2d-beae-4471-b980-95b11d48b675',
          _createdDate: {
            $date: '2024-08-27T09:48:25.101Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.101Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 45,
          name: 'science for policy',
          _id: '0e1048be-630f-424c-806d-bb2aac576213',
          _createdDate: {
            $date: '2024-08-27T09:48:25.067Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.067Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 65,
          name: 'responsible research and innovation',
          _id: '20483ea8-1e97-4b0b-ad05-86fb7412749e',
          _createdDate: {
            $date: '2024-08-27T09:48:25.069Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.069Z',
          },
          tagType: 'domain',
        },
      ],
      personOrganisationFormer: [],
      personProjectParticipation: [],
      postImage1: {
        url: 'https://static.wixstatic.com/media/471908_04a986dfb6f14ec680f512e1773b381d~mv2.webp',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-28T09:34:38.579Z',
      },
      slug: 'the-responsible-research-and-innovation-living-lab-ue9by',
      mediaFiles: [
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      projectEndDate: '2027-03-31T21:00:00.000Z',
      projectStartDate: '2022-12-31T22:00:00.000Z',
      Project: [
        {
          name: 'The Responsible Research and Innovation Living Lab',
          _id: '3d05b33e-4c1a-44ca-aa67-522f7cf5cda8',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-28T09:06:30.057Z',
          },
          tagLine:
            'The Prospects of Institutionalizing the Values of Openness and Mutual Responsiveness in Science and Democracy',
          _updatedDate: {
            $date: '2024-10-28T09:34:42.701Z',
          },
          tagType: 'project',
          tagPageLink:
            '/project/the-responsible-research-and-innovation-living-lab-ue9by',
        },
      ],
      projectOrganisationRoles: [
        {
          organisation: 'RWTH Aachen University',
          role: '',
        },
        {
          organisation: '',
          role: '',
        },
      ],
      projectOrganisation: [
        {
          name: 'RWTH Aachen University',
          _id: '55be1cf9-6552-4930-8a39-a99d6b778593',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-28T09:19:12.879Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-28T09:19:12.879Z',
          },
          tagType: 'organisation',
        },
      ],
      personProjectCoordonation: [],
      person: [],
      personOrganisation: [],
      postContentRIch1:
        '<p>The establishment of responsible innovation requires four key institutional changes. First, innovation must be value-driven. Second, an ethics of co-responsibility among stakeholders must be implemented. Third, innovation should be made directional and manageable. Fourth, market failures need to be addressed to facilitate necessary transformative changes, especially with regard to the Sustainable Development Goals (SDGs). This research project will take into account the evolution of Living Labs and various specialized Living Labs (e.g., urban labs, social labs, and responsible Living Labs) to assess to what extent they address these institutional requirements. On this basis, the concept of a new dedicated Living Lab: a Responsible Research and Innovation Lab for Engineering Practices will be introduced. Subsequently this dedicated Living Lab will be operationalised on a theme from the engineering sciences. We will consider innovations stemming from digital tech for Health issues, additive manufacturing or other engineering pratices. We will deploy participatory foresight, to enable a form of anticipatory governance of emerging new innovations.</p>\n',
      countryTag: [
        {
          popularity: 45,
          name: 'Germany',
          _id: '24e5e426-7a0f-46eb-80e5-f4f6c46bdfff',
          _createdDate: {
            $date: '2024-08-27T09:48:24.749Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.749Z',
          },
          tagType: 'country',
        },
      ],
      title: 'The Responsible Research and Innovation Living Lab',
      internalLinks: [],
      organisationMemberOf: [],
      activity: [],
      projectFunded: [],
      organisationHasMember: [],
      organisationPeople: [],
    },
    _id: 'a1def267-5f32-4865-80cb-7855ba956d61',
  },
  {
    dataCollectionId: 'InfoPages',
    data: {
      projectParticipantTeam: [
        {
          name: 'Lukas Jung',
          _id: '40847f63-5921-44db-a32b-e1d786b24edc',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.148Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.148Z',
          },
          tagType: 'person',
        },
        {
          name: 'Moritz Hunger',
          _id: 'd60b3ee4-aa3e-414d-915b-e5b32ae414d8',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:38.905Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:38.905Z',
          },
          tagType: 'person',
        },
      ],
      organisation: [],
      organisationProject: [],
      postImage2: {
        url: ' ',
        caption: '',
      },
      postContentRIch2:
        '<p>The results are based on a three-stage methodology approach:<br></p>\n<ul>\n<li>First, key thematic areas were outlined through baseline research and expert interviews.</li>\n<li>Second, a foresight workshop was conducted to create a room to elaborate on different future scenarios and job profiles while also developing a digital skills map and initially discuss recommendations.&nbsp;</li>\n<li>Third, the results were refined through expert validation loops and expert interviews.</li>\n</ul>\n<p>The <strong><em>future scenarios </em></strong>were created to explore what urban areas, smaller cities and rural areas might look like in 2035. A future is drawn in which Tunisia is characterized by smart and self-powered buildings, increasing e-mobility, and public services delivered digitally. Apart from that, digital progress offers the opportunity to provide more equitable education, to conduct various types of commercial activities via e-commerce, and to improve access to health. Such a future in its variety of facets has been visually depicted in the graphic above.</p>\n<p><br>Furthermore, <strong><em>future job profiles</em></strong> are derived on this basis. In a desirable Tunisian development, these will be found primarily in the areas of food production, fintech, e-commerce, health tech, mobility, ed-, gov-, and green tech. Specific job profiles range from farm drone operators, who operate and maintain drones that monitor, measure and analyze crop growth and health, to cybersecurity experts, who protect government data from digital attacks. To be prepared for the changing profiles, digital competencies need to be developed, which can be categorized into the following four pillars: digital literacy and data literacy, technology-specific skills, digital product literacy, and digital transformation literacy.</p>\n<p><br>After developing future scenarios and outlining future job profiles, <strong><em>recommendations</em></strong> were finally drawn up that will enable Tunisia to proactively strive for the future outlined. General recommendations manifest themselves, for example, in the promotion of a "digital culture" that includes all strata of the population in order to make appropriate use of the potential of digitization. A specific example of a topic area recommendation is to strive for leadership in green tech solutions. Here, it is recommended to promote green tech culture, for example by including environmental sustainability and green tech solutions in education and public campaigns. In addition to content recommendations, Foresight Journey recommendations aim to improve and deepen the methodological applications of foresight for potential future ventures in this thematic field.</p>\n<p><br><em>Smart Futures Tunisia is part of the Special Initiative “Decent Work for a Just Transition” Invest for Jobs of the German Federal Ministry for Economic Cooperation and Development (BMZ) and implemented by the Digital Transformation Programme Tunisia of the Gesellschaft für Internationale Zusammenarbeit (GIZ) GmbH. Invest for Jobs aims to team up with companies to create good jobs in eight African partner countries and to improve local working conditions.</em></p>\n',
      methods: [
        {
          popularity: 36,
          name: 'scenarios',
          _id: '3c4917d4-7467-4fef-a6a3-af7b61b9e196',
          _createdDate: {
            $date: '2024-08-27T09:48:24.946Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.946Z',
          },
          tagType: 'foresight method',
        },
      ],
      pageTypes: [
        {
          popularity: 35,
          name: 'project info',
          _id: 'fcb0cbbc-98a5-4743-8c8b-1cb1c8326a85',
          _createdDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          tagId: 252527,
          tagType: 'page type',
        },
      ],
      projectCoordinator: [],
      _id: '7a4e943a-1f5d-422a-bf9a-9bc7e15c626d',
      _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
      _createdDate: {
        $date: '2024-10-28T08:47:50.062Z',
      },
      organisationType: [],
      postContentRIch3: '<p></p>\n',
      domains: [
        {
          popularity: 62,
          name: 'labour',
          _id: 'e700ae98-8f34-42ee-bfce-88fadab6e2cf',
          _createdDate: {
            $date: '2024-08-27T09:48:25.078Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.078Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 39,
          name: 'digital',
          _id: '841ef237-37ee-4f15-9274-64ec7830f9d2',
          _createdDate: {
            $date: '2024-08-27T09:48:25.100Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.100Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 26,
          name: 'sustainability',
          _id: 'b5ca1e23-5548-4d91-adfe-eeb08f2062a6',
          _createdDate: {
            $date: '2024-08-27T09:48:25.063Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.063Z',
          },
          tagType: 'domain',
        },
      ],
      personOrganisationFormer: [],
      personProjectParticipation: [],
      postImage1: {
        url: 'https://static.wixstatic.com/media/471908_4e59d601f8fe4f569dc0f74d14201a2f~mv2.webp',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-28T08:56:43.236Z',
      },
      slug: 'smart-futures-tunisia-chsrs',
      mediaFiles: [
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      Project: [
        {
          name: 'Smart Futures Tunisia',
          _id: '4a893880-17ae-4ebd-a511-32181487f2e1',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-28T08:44:18.871Z',
          },
          tagLine:
            'Exploring the digital skills of tomorrow (a foresight journey into the year 2035)',
          _updatedDate: {
            $date: '2024-10-28T08:47:52.348Z',
          },
          tagType: 'project',
          tagPageLink: '/project/smart-futures-tunisia-chsrs',
        },
      ],
      projectOrganisationRoles: [
        {
          organisation:
            'German Federal Ministry for Economic Cooperation and Development',
          role: '',
        },
        {
          organisation:
            'Gesellschaft für Internationale Zusammenarbeit (GIZ) GmbH',
          role: '',
        },
        {
          organisation: '',
          role: '',
        },
      ],
      projectOrganisation: [
        {
          popularity: 20,
          tagline: 'BMZ',
          name: 'German Federal Ministry for Economic Cooperation and Development',
          _id: 'fee868de-8795-4dd6-a2d6-517f88c65a50',
          _createdDate: {
            $date: '2024-08-27T09:48:24.831Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.831Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'Gesellschaft für Internationale Zusammenarbeit (GIZ) GmbH',
          _id: '86b66cd2-da21-496d-9d60-f0ff931cf43c',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-28T08:56:38.980Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-28T08:56:38.980Z',
          },
          tagType: 'organisation',
        },
      ],
      personProjectCoordonation: [],
      person: [],
      personOrganisation: [],
      postContentRIch1:
        '<p><em>Smart Futures Tunisia</em> aims to explore what Tunisia and its digital economy could and should look like in 2035. For this purpose, normative future scenarios were created from which inspiring future job profiles could be derived. In a final step, recommendations identify options for action through which the envisioned future can be approximated.</p>\n',
      countryTag: [
        {
          name: 'Tunisia',
          _id: 'a27bd3e5-2a2c-4aa4-a44c-0c0a688a03cd',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-28T08:49:50.218Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-28T08:49:50.218Z',
          },
          tagType: 'country',
        },
      ],
      title: 'Smart Futures Tunisia',
      internalLinks: [],
      organisationMemberOf: [],
      activity: [],
      projectFunded: [],
      organisationHasMember: [],
      organisationPeople: [],
    },
    _id: '7a4e943a-1f5d-422a-bf9a-9bc7e15c626d',
  },
  {
    dataCollectionId: 'InfoPages',
    data: {
      projectParticipantTeam: [],
      organisation: [],
      organisationProject: [],
      postImage2: {
        url: ' ',
        caption: '',
      },
      postContentRIch2:
        '<p>In the research, the mobility of artists and cultural professionals is understood as the temporary, cross-border travel of artists and cultural professionals with the purpose of creating, connecting, exploring and learning. The research was carried out by experts from different disciplines with Dea Vidović being the research leader. As a result of the aforementioned research, in 2022 Kultura Nova Foundation published a 4-volume publication. Each volume represents one of the research sections:&nbsp;</p>\n<p>(1) conceptual framework of mobility in culture;&nbsp;</p>\n<p>(2) the study on mobility in culture from the perspectives of artists, cultural professionals, hosts and funders;&nbsp;</p>\n<p>(3) an evaluation of i-Portunus Houses mobility grant scheme and&nbsp;</p>\n<p>(4) scenario for the future of mobility in culture.&nbsp;&nbsp;</p>\n<p>The research covers a wide range of topics related to mobility in culture, such as its participatory and networking dimension, its digital dimension and virtual mobility, as well as its green dimension. The culmination of the research, alongside extensive recommendations and action points for sustainable mobility, is Scenario for the Future which introduces a new concept of "slow mobility".</p>\n<p>https://culturalfoundation.eu/programmes/i-portunus-houses/&nbsp;</p>\n<p>https://kulturanova.hr/eng/rampd/projects/i-portunus-houses</p>\n',
      methods: [],
      pageTypes: [
        {
          popularity: 35,
          name: 'project info',
          _id: 'fcb0cbbc-98a5-4743-8c8b-1cb1c8326a85',
          _createdDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          tagId: 252527,
          tagType: 'page type',
        },
      ],
      projectCoordinator: [],
      _id: 'e8d013ac-f377-47ac-bac3-b792aa829851',
      _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
      _createdDate: {
        $date: '2024-10-28T08:33:59.784Z',
      },
      organisationType: [],
      postContentRIch3: '<p></p>\n',
      domains: [
        {
          popularity: 36,
          name: 'mobility in culture',
          _id: 'b7a75255-0e72-4a39-8baa-2c43226f28b3',
          _createdDate: {
            $date: '2024-08-27T09:48:25.076Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.076Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 45,
          name: 'science for policy',
          _id: '0e1048be-630f-424c-806d-bb2aac576213',
          _createdDate: {
            $date: '2024-08-27T09:48:25.067Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.067Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 66,
          name: 'art',
          _id: 'ef4be6b1-f847-46ed-81bd-92d934f3dadc',
          _createdDate: {
            $date: '2024-08-27T09:48:25.117Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.117Z',
          },
          tagType: 'domain',
        },
      ],
      personOrganisationFormer: [],
      personProjectParticipation: [],
      postImage1: {
        url: 'https://static.wixstatic.com/media/471908_dff452142315455d8d9654c1385f3c83~mv2.webp',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-28T08:41:46.189Z',
      },
      slug: 'i-portunus-houses-h3g35',
      mediaFiles: [
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      Project: [
        {
          name: 'i-Portunus Houses',
          _id: 'e3b24e71-f732-4db8-a79d-9c0b048542b7',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-28T08:31:34.950Z',
          },
          tagLine:
            'Kick-Start a Local Mobility Host Network for Artists & Cultural Professionals in AllCreative Europe Countries',
          _updatedDate: {
            $date: '2024-10-28T08:40:00.886Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_b6fb3c86ab9a44cb9f91cf88ec5fc63f~mv2.jpeg',
          tagType: 'project',
          tagPageLink: '/project/i-portunus-houses-h3g35',
        },
      ],
      projectOrganisationRoles: [
        {
          organisation: 'European Cultural Foundation',
          role: 'Coordinator',
        },
        {
          organisation: 'MitOst e.V.',
          role: '',
        },
        {
          organisation: 'Kultura Nova Foundation',
          role: '',
        },
        {
          organisation: '',
          role: '',
        },
      ],
      projectOrganisation: [
        {
          popularity: 67,
          name: 'European Cultural Foundation',
          _id: '58a99a1a-76d0-4fc9-a58d-42b5624d79d3',
          _createdDate: {
            $date: '2024-08-27T09:48:24.870Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.870Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 61,
          name: 'MitOst e.V.',
          _id: 'ee1d7957-3a52-4ca4-9963-cf3d9a1bc5c1',
          _createdDate: {
            $date: '2024-08-27T09:48:24.805Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.805Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 3,
          name: 'Kultura Nova Foundation',
          _id: '83f7fdef-eb5d-4e7c-8b8d-aa7b576d0b7d',
          _createdDate: {
            $date: '2024-08-27T09:48:24.804Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.804Z',
          },
          tagType: 'organisation',
        },
      ],
      personProjectCoordonation: [],
      person: [],
      personOrganisation: [],
      postContentRIch1:
        '<p>The i-Portunus Houses project, implemented on behalf of the European Commission by a consortium of three partners – the European Cultural Foundation (coordinator), MitOst, and Kultura Nova Foundation – was dedicated to testing and analysing diverse transnational mobility schemes for the cultural sector. Apart from granting support for local hosts from all Creative Europe countries for the mobility of artists and cultural professionals, the project also included research on mobility in culture and the design of policy recommendations.</p>\n',
      countryTag: [],
      title: 'i-Portunus Houses',
      internalLinks: [],
      organisationMemberOf: [],
      activity: [],
      projectFunded: [],
      organisationHasMember: [],
      organisationPeople: [],
    },
    _id: 'e8d013ac-f377-47ac-bac3-b792aa829851',
  },
  {
    dataCollectionId: 'InfoPages',
    data: {
      projectParticipantTeam: [],
      organisation: [],
      organisationProject: [],
      postImage2: {
        url: ' ',
        caption: '',
      },
      postContentRIch2:
        '<p>Regenerating the ecosystem of science learning by developing a future-oriented model to enable creative thinking, foresight and active hope as skills needed in formal and informal science education.</p>\n<p>FEDORA was a 3-year EU-funded project, which started in September 2020 and deployed its activities until August 2023. It gathered 6 partner institutions from 5 European countries. It conducted reasearch and practice towards the regeneration of the ecosystem of science learning, by developing a future-oriented model to enable creative thinking, foresight and active hope, as skills needed in formal and informal science education.</p>\n<p></p>\n<p>https://www.fedora-project.eu/</p>\n',
      methods: [],
      pageTypes: [
        {
          popularity: 35,
          name: 'project info',
          _id: 'fcb0cbbc-98a5-4743-8c8b-1cb1c8326a85',
          _createdDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          tagId: 252527,
          tagType: 'page type',
        },
      ],
      projectCoordinator: [],
      _id: 'e00fc477-ee88-4d56-b739-b285fadfff3a',
      _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
      _createdDate: {
        $date: '2024-10-28T08:19:50.653Z',
      },
      organisationType: [],
      postContentRIch3: '<p></p>\n',
      domains: [
        {
          popularity: 55,
          name: 'science',
          _id: '622a56c2-8a0b-4f2f-8df2-2f08463b104c',
          _createdDate: {
            $date: '2024-08-27T09:48:25.068Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.068Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 19,
          name: 'education',
          _id: 'fca15479-fa61-4bac-9600-c327f6ccb1c2',
          _createdDate: {
            $date: '2024-08-27T09:48:25.095Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.095Z',
          },
          tagType: 'domain',
        },
      ],
      personOrganisationFormer: [],
      personProjectParticipation: [],
      postImage1: {
        url: 'https://static.wixstatic.com/media/471908_ac0723da5792436eb019d25929a831ea~mv2.webp',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-28T08:26:38.474Z',
      },
      slug: 'fedora-jyedo',
      mediaFiles: [
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      projectEndDate: '2023-07-31T21:00:00.000Z',
      projectStartDate: '2020-08-31T21:00:00.000Z',
      Project: [
        {
          name: 'FEDORA',
          _id: '87c2e80d-69bc-42ed-9013-e756d3fe3f8c',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-28T08:17:50.606Z',
          },
          tagLine:
            'Responsibility and Engagement in the society of acceleration and uncertainty. ',
          _updatedDate: {
            $date: '2024-10-28T08:26:38.101Z',
          },
          picture:
            'https://static.wixstatic.com/shapes/471908_e3623cb23cb446468bc80dbe9224cc9c.svg',
          tagType: 'project',
          tagPageLink: '/project/fedora-jyedo',
        },
      ],
      projectOrganisationRoles: [
        {
          organisation: 'The University of Bologna',
          role: 'Coordinator',
        },
        {
          organisation: 'Kaunas University of Technology',
          role: '',
        },
        {
          organisation: 'The University of Helsinki',
          role: '',
        },
        {
          organisation: 'University of Oxford',
          role: '',
        },
        {
          organisation: 'Teach the Future',
          role: '',
        },
        {
          organisation: 'formicablu',
          role: '',
        },
        {
          organisation: '',
          role: '',
        },
      ],
      projectOrganisation: [
        {
          popularity: 114,
          tagline: 'UNIBO',
          name: 'The University of Bologna',
          _id: '889a4484-4dfd-4d0e-859d-7ce5aeab9a88',
          _createdDate: {
            $date: '2024-08-27T09:48:24.873Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.873Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 111,
          name: 'Kaunas University of Technology',
          _id: '193f7117-351d-45e9-8a03-90ece06a4ad7',
          _createdDate: {
            $date: '2024-08-27T09:48:24.793Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.793Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 48,
          name: 'The University of Helsinki',
          _id: '0ff668d3-84c2-4323-becb-1c96d2d3a320',
          _createdDate: {
            $date: '2024-08-27T09:48:24.782Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.782Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 82,
          trend: '12',
          name: 'University of Oxford',
          _id: '6c8348bb-2c6c-47a5-8d6e-9bb9d9f5107e',
          _createdDate: {
            $date: '2024-08-27T09:48:24.896Z',
          },
          linked: true,
          _updatedDate: {
            $date: '2024-08-27T09:48:24.896Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 54,
          name: 'Teach the Future',
          _id: 'e0b39024-785a-4e1a-8832-93c24e96970e',
          _createdDate: {
            $date: '2024-08-27T09:48:24.802Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.802Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 55,
          name: 'formicablu',
          _id: '56947ac0-01f2-4e91-9811-2a8763c3f486',
          _createdDate: {
            $date: '2024-08-27T09:48:24.878Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.878Z',
          },
          tagType: 'organisation',
        },
      ],
      personProjectCoordonation: [],
      person: [],
      personOrganisation: [],
      postContentRIch1: '<p></p>\n',
      countryTag: [
        {
          popularity: 48,
          name: 'Italy',
          _id: 'f1763107-ed68-48ce-96ee-53480a677461',
          _createdDate: {
            $date: '2024-08-27T09:48:24.754Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.754Z',
          },
          tagType: 'country',
        },
      ],
      title: 'FEDORA',
      internalLinks: [],
      organisationMemberOf: [],
      activity: [],
      projectFunded: [
        {
          popularity: 27,
          name: 'EU funded',
          _id: 'f80d06e4-b326-4364-b250-0afa1fc777f3',
          _createdDate: {
            $date: '2024-08-27T09:48:25.119Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.119Z',
          },
          tagType: 'project type',
        },
      ],
      organisationHasMember: [],
      organisationPeople: [],
    },
    _id: 'e00fc477-ee88-4d56-b739-b285fadfff3a',
  },
  {
    dataCollectionId: 'InfoPages',
    data: {
      projectParticipantTeam: [],
      organisation: [
        {
          popularity: 55,
          tagline:
            'Unitatea Executivă pentru Finanțarea Învățământului superior, a Cercetării, Dezvoltării și Inovării',
          trend: '5',
          name: 'UEFISCDI',
          _id: '95224d24-7699-4603-8d55-58c15794dd58',
          _owner: 'd63d4075-c493-4434-b07b-3455eb228b81',
          _createdDate: {
            $date: '2024-08-27T09:48:24.898Z',
          },
          tagLine:
            'The Executive Agency for Higher Education, Research, Development and Innovation Funding of Romania',
          linked: true,
          _updatedDate: {
            $date: '2024-10-29T10:45:39.420Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_f66da0478b09447ba0708a35af2af36c~mv2.png',
          tagType: 'organisation',
          tagPageLink: '/organisation/UEFISCDI_rloxg',
        },
      ],
      organisationProject: [
        {
          popularity: 1,
          name: 'Eye of Europe',
          _id: 'a3da923c-66d3-46a7-8ab0-8d33424f3b80',
          _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
          _createdDate: {
            $date: '2024-10-15T11:02:13.126Z',
          },
          tagLine: 'The Research and Innovation Foresight Community',
          _updatedDate: {
            $date: '2024-10-25T11:17:57.445Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_3fc30f50bb3c467aa3213c444816d649~mv2.png',
          tagType: 'project',
          tagPageLink: '/project/Eye_of_Europe_6ft5d',
        },
      ],
      methods: [
        {
          name: 'Experts Consultation',
          _id: '592aecc5-c20f-49b7-b524-dddefa4ad04c',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-26T13:01:41.338Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-26T13:01:41.338Z',
          },
          tagType: 'foresight method',
        },
        {
          name: 'backcasting',
          _id: 'dda76cda-872f-4340-9052-b1db8dec90f8',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-25T10:48:31.588Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-25T10:48:31.588Z',
          },
          tagType: 'foresight method',
        },
        {
          popularity: 28,
          name: 'expert panels',
          _id: 'd4dce5a9-3a98-4dab-8dc7-a73d3136ad8c',
          _createdDate: {
            $date: '2024-08-27T09:48:24.963Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.963Z',
          },
          tagType: 'foresight method',
        },
      ],
      pageTypes: [
        {
          popularity: 58,
          name: 'organisation info',
          _id: 'e0e12984-c4f3-4800-b201-3cdf4c4a01e8',
          _createdDate: {
            $date: '2024-08-27T09:51:01.716Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.716Z',
          },
          tagId: 252525,
          tagType: 'page type',
        },
      ],
      projectCoordinator: [],
      description:
        '<p>The Executive Agency for Higher Education, Research, Development and Innovation Funding (UEFISCDI) is a public institution with legal personality subordinate to the Ministry of National Education in Romania.</p>\n<p>Attributions</p>\n<ul>\n<li>we assist the National Council for the Financing of Higher Education (CNFIS) in the elaboration of proposals for methodologies and documentation related to the financing of higher education;</li>\n<li>we coordinate, under the scientific guidance of the advisory councils of the Ministry of Education with responsibilities in R&amp;I, programs within the National Plan for Research, Development and Innovation;</li>\n<li>we carry out and implement institutional and system development projects, related to higher education, research, development or innovation, with national and international funding, with the approval of the Ministry of Education;</li>\n<li>we offer consultancy and technical assistance for the development and management of projects within the domestic and international programs of scientific research, technological development and stimulation of innovation.</li>\n</ul>\n',
      _id: 'f102e916-6d94-4683-924c-26004920579f',
      _owner: 'e586b886-7d9c-42d0-b744-f73146a3862f',
      _createdDate: {
        $date: '2024-10-28T01:25:31.743Z',
      },
      organisationType: [
        {
          popularity: 25,
          name: 'national public administration',
          _id: 'a4186815-449d-459c-8778-781d234d51db',
          _createdDate: {
            $date: '2024-08-27T09:48:25.133Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.133Z',
          },
          tagType: 'organisation type',
        },
      ],
      domains: [
        {
          popularity: 19,
          name: 'education',
          _id: 'fca15479-fa61-4bac-9600-c327f6ccb1c2',
          _createdDate: {
            $date: '2024-08-27T09:48:25.095Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.095Z',
          },
          tagType: 'domain',
        },
        {
          name: 'Policy analysis',
          _id: '96eac4f5-c18b-4b73-a6fb-9c0ea2b5740c',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T12:59:51.058Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-22T12:59:51.058Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 65,
          name: 'responsible research and innovation',
          _id: '20483ea8-1e97-4b0b-ad05-86fb7412749e',
          _createdDate: {
            $date: '2024-08-27T09:48:25.069Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.069Z',
          },
          tagType: 'domain',
        },
      ],
      personOrganisationFormer: [],
      personProjectParticipation: [],
      _updatedDate: {
        $date: '2024-10-29T23:37:08.795Z',
      },
      slug: 'uefiscdi-kp7s3',
      organisationEstablishedDate: '1999',
      mediaFiles: [
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      Project: [],
      projectOrganisation: [],
      personProjectCoordonation: [],
      organisationProjectRoles: [
        {
          project: 'Eye of Europe',
          role: 'Coordinator',
        },
        {
          role: '',
        },
      ],
      person: [],
      personOrganisation: [],
      countryTag: [
        {
          popularity: 15,
          name: 'Romania',
          _id: 'e4cab9c4-7f21-4ec6-88ad-7aa8698612f4',
          _createdDate: {
            $date: '2024-08-27T09:48:24.766Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.766Z',
          },
          tagType: 'country',
        },
      ],
      title: 'UEFISCDI',
      internalLinks: [],
      organisationMemberOf: [],
      organisationPeopleRoles: [
        {
          person: 'Radu Gheorghiu',
          role: 'Expert',
        },
        {
          person: 'Bianca Dragomir',
          role: 'Expert',
        },
        {
          person: 'Ioana Spanache',
          role: 'Expert',
        },
        {
          role: '',
        },
      ],
      activity: [],
      projectFunded: [],
      organisationHasMember: [],
      organisationPeople: [
        {
          name: 'Radu Gheorghiu',
          _id: '79e69062-1f22-4acd-bd5c-b4b0f17a3dad',
          _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
          _createdDate: {
            $date: '2024-10-15T09:06:25.839Z',
          },
          _updatedDate: {
            $date: '2024-10-15T09:06:25.839Z',
          },
          tagType: 'person',
        },
        {
          name: 'Bianca Dragomir',
          _id: '90c38dc0-018b-4d55-af76-e2b52130e029',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.344Z',
          },
          tagLine: 'Live deeply and tenderly',
          _updatedDate: {
            $date: '2024-10-14T18:29:46.298Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_957ec9dc2bb74b97b6166aab1d9d0840~mv2.jpg',
          tagType: 'person',
          tagPageLink: '/person/Bianca_Dragomir_q437h',
        },
        {
          name: 'Ioana Spanache',
          _id: '96f61b50-b22e-4d5b-8730-597ef586e951',
          _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
          _createdDate: {
            $date: '2024-10-24T11:09:20.706Z',
          },
          tagLine: 'When the path is blocked, create a new one.',
          _updatedDate: {
            $date: '2024-10-24T13:08:24.293Z',
          },
          tagType: 'person',
          tagPageLink: '/person/ioana-spanache-2u7zg',
        },
      ],
    },
    _id: 'f102e916-6d94-4683-924c-26004920579f',
  },
  {
    dataCollectionId: 'InfoPages',
    data: {
      projectParticipantTeam: [
        {
          name: 'Hayley Trowbridge',
          _id: '891adab9-d98b-4c92-9584-f4c10cc50a20',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.137Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.137Z',
          },
          tagType: 'person',
        },
      ],
      organisation: [],
      organisationProject: [],
      postImage2: {
        url: ' ',
        caption: '',
      },
      postContentRIch2:
        "<p>Foresight is one of the research strands present in <strong>EUARENAS</strong>. In this project, foresight is both a tool for understanding democratic innovations as they emerge, and for engaging citizens and other actors in such innovations within the participatory and deliberative realms. Mixed method approaches to foresight that incorporate a diversity of activities such as media discourse analysis, lived experience storytelling, social media analysis, three horizons mapping, driver-mapping, scenario and visioning exercises and policy stress- testing have been used in <strong>EUARENAS</strong> to investigate and hypothesise over future trends and scenarios in participatory democracies.&nbsp;</p>\n<p>From this work, we propose the following recommendations for Cities wanting to strive towards more equitable local democracies:</p>\n<ol>\n<li>Address structural barriers to participation</li>\n<li>Build relationships of trust</li>\n<li>Invest in formal and civic education</li>\n<li>Make decisions for the long-term</li>\n</ol>\n<p>A more equitable, inclusive local democracy landscape is not too far in the distance for us to conceive it being possible. In fact, <strong>the future is now</strong> – the seeds to create it are already being planted, they just need nurturing by:<br></p>\n<ul>\n<li>Scaling and mainstreaming existing pilot or niche practices that are working locally – whether that beparticipatory budgeting, citizen assemblies or other smaller-scale projects – so that these become thenew ‘status quo’</li>\n<li>Adopting test and learn approaches to promote experimentation and on-going learning – this will enableongoing innovation and be responsive to society's needs</li>\n<li>Finding ways to celebrate and connect-up the small changes that are taking place - this will help people see that progress is being made, even when it feels like things are changing too slow</li>\n</ul>\n<p></p>\n",
      methods: [
        {
          popularity: 41,
          name: 'lived experience storytelling',
          _id: '5f178089-b2f1-4c4a-ad32-d60730f5652e',
          _createdDate: {
            $date: '2024-08-27T09:48:24.953Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.953Z',
          },
          tagType: 'foresight method',
        },
        {
          popularity: 32,
          name: 'media discourse analysis',
          _id: '3d5dedec-84aa-49e7-8bc4-d44812c99a97',
          _createdDate: {
            $date: '2024-08-27T09:48:24.952Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.952Z',
          },
          tagType: 'foresight method',
        },
        {
          popularity: 30,
          name: 'social media analysis',
          _id: '2928594c-ac0f-40c2-b915-9d2abacf9804',
          _createdDate: {
            $date: '2024-08-27T09:48:24.945Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.945Z',
          },
          tagType: 'foresight method',
        },
        {
          popularity: 47,
          name: 'horizon scanning',
          _id: 'b1d63812-7f03-4fa0-bfc7-b8d89363baa8',
          _createdDate: {
            $date: '2024-08-27T09:48:24.957Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.957Z',
          },
          tagType: 'foresight method',
        },
        {
          popularity: 44,
          name: 'driver-mapping',
          _id: '9f1bd70a-cea1-4a1a-8f71-948c94e00513',
          _createdDate: {
            $date: '2024-08-27T09:48:24.964Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.964Z',
          },
          tagType: 'foresight method',
        },
        {
          popularity: 36,
          name: 'scenarios',
          _id: '3c4917d4-7467-4fef-a6a3-af7b61b9e196',
          _createdDate: {
            $date: '2024-08-27T09:48:24.946Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.946Z',
          },
          tagType: 'foresight method',
        },
        {
          popularity: 42,
          name: 'visioning',
          _id: '932d682a-b111-46b2-b6a5-aade8c598da6',
          _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
          _createdDate: {
            $date: '2024-08-27T09:48:24.944Z',
          },
          _updatedDate: {
            $date: '2024-10-15T10:56:02.615Z',
          },
          tagType: 'foresight method',
        },
        {
          popularity: 26,
          name: 'policy stress-testing',
          _id: '2334e1f6-02d5-451a-bc36-b2af4777d99e',
          _createdDate: {
            $date: '2024-08-27T09:48:24.948Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.948Z',
          },
          tagId: 2222,
          tagType: 'foresight method',
        },
      ],
      pageTypes: [
        {
          popularity: 35,
          name: 'project info',
          _id: 'fcb0cbbc-98a5-4743-8c8b-1cb1c8326a85',
          _createdDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          tagId: 252527,
          tagType: 'page type',
        },
      ],
      projectCoordinator: [],
      _id: 'e3784748-50fb-4b76-9709-794c2d53a64c',
      _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
      _createdDate: {
        $date: '2024-10-26T15:20:03.028Z',
      },
      organisationType: [],
      postContentRIch3: '<p></p>\n',
      domains: [
        {
          popularity: 52,
          name: 'citizen engagement',
          _id: '3e20987c-c439-4214-bfff-515f49d8a65f',
          _createdDate: {
            $date: '2024-08-27T09:48:25.111Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.111Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 48,
          name: 'democracy',
          _id: 'b6eb6f2d-beae-4471-b980-95b11d48b675',
          _createdDate: {
            $date: '2024-08-27T09:48:25.101Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.101Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 46,
          name: 'political participation',
          _id: 'e03634a6-e859-45e3-bb69-6cc0b7d5f8d5',
          _createdDate: {
            $date: '2024-08-27T09:48:25.073Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.073Z',
          },
          tagType: 'domain',
        },
      ],
      personOrganisationFormer: [],
      personProjectParticipation: [],
      postImage1: {
        url: 'https://static.wixstatic.com/media/471908_77b2ade5950c4b309f9f810ce6218064~mv2.webp',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-30T12:59:40.495Z',
      },
      slug: 'euarenas-vi8id',
      mediaFiles: [
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      projectEndDate: '2024-09-30T21:00:00.000Z',
      projectStartDate: '2020-12-31T22:00:00.000Z',
      Project: [
        {
          name: 'EUARENAS',
          _id: '2e0a5e35-c3b4-41ab-ae70-9dc825ca4c1b',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-26T15:19:24.621Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-26T15:20:30.692Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_45ea460116064905b3063bd7a3b409e8~mv2.webp',
          tagType: 'project',
          tagPageLink: '/project/euarenas-vi8id',
        },
      ],
      projectOrganisationRoles: [
        {
          organisation: 'University of Eastern Finland',
          role: 'Lead',
        },
        {
          organisation: 'LUISS',
          role: '',
        },
        {
          organisation: 'Eutropian',
          role: '',
        },
        {
          organisation: 'Gdansk (Municipality?)',
          role: '',
        },
        {
          organisation: 'People’s Voice Media',
          role: '',
        },
        {
          organisation: 'CRN',
          role: '',
        },
        {
          organisation:
            'The Department of Socio-Economic Geography at the University of Gdansk',
          role: '',
        },
        {
          organisation: 'Development Centre of Võru County',
          role: '',
        },
        {
          organisation: 'SWPS University',
          role: '',
        },
        {
          organisation: 'The Municipality of Reggio Emilia',
          role: '',
        },
        {
          role: '',
        },
      ],
      projectOrganisation: [
        {
          popularity: 105,
          name: 'University of Eastern Finland',
          _id: 'e2bcbb17-392f-44ad-b580-e26a0e7b1bb0',
          _createdDate: {
            $date: '2024-08-27T09:48:24.856Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.856Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 11,
          name: 'LUISS',
          _id: 'ce6b0050-4b68-483d-a409-0f737c69711a',
          _createdDate: {
            $date: '2024-08-27T09:48:24.836Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.836Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 85,
          name: 'Eutropian',
          _id: '8c61a25b-8809-4fb9-89fc-80145d953c95',
          _createdDate: {
            $date: '2024-08-27T09:48:24.876Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.876Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 91,
          name: 'Gdansk (Municipality?)',
          _id: '637f0722-6a17-4640-8e03-d06d174fc1d0',
          _createdDate: {
            $date: '2024-08-27T09:48:24.841Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.841Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 118,
          name: 'People’s Voice Media',
          _id: 'f8e591df-1904-4622-8761-ea4d6541763e',
          _createdDate: {
            $date: '2024-08-27T09:48:24.854Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.854Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 98,
          tagline: 'Comparative Research Network',
          name: 'CRN',
          _id: 'a620fe8c-7020-4e2c-9367-a352113f1b16',
          _createdDate: {
            $date: '2024-08-27T09:48:24.868Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.868Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 29,
          trend: '9',
          name: 'The Department of Socio-Economic Geography at the University of Gdansk',
          _id: 'aeeb3524-6f2f-4005-aba8-5a95d0e56cb7',
          _createdDate: {
            $date: '2024-08-27T09:48:24.897Z',
          },
          linked: true,
          _updatedDate: {
            $date: '2024-08-27T09:48:24.897Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 42,
          name: 'Development Centre of Võru County',
          _id: 'ee634392-1cbc-4ae4-8a6e-457c9bf2bd3d',
          _createdDate: {
            $date: '2024-08-27T09:48:24.820Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.820Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 7,
          tagline: 'University of Social Sciences and Humanities',
          name: 'SWPS University',
          _id: '98a2bd49-b332-48ed-8c3e-a459ead1c590',
          _createdDate: {
            $date: '2024-08-27T09:48:24.883Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.883Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 28,
          name: 'The Municipality of Reggio Emilia',
          _id: 'e93bcc5d-7c91-44dc-8ed1-0a8b4c5c5486',
          _createdDate: {
            $date: '2024-08-27T09:48:24.843Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.843Z',
          },
          tagType: 'organisation',
        },
      ],
      personProjectCoordonation: [],
      person: [],
      personOrganisation: [],
      postContentRIch1:
        '<p>Democracy across Europe has experienced immense challenge, change and uncertainty in recent years (Canal 2014; European Commission &amp; Merkel; 2019) - from the rise of populism to decreasing levels of public trust in governance institutions and processes, to the war in Ukraine. Set against the backdrop of these issues, <strong>EUARENAS</strong> has been investigating how cities and urban spaces can strengthen legitimacy, identification and engagement within the democratic public sphere. Specifically, <strong>EUARENAS </strong>has been exploring how participation and deliberation in democracy and decision-making can be increased, and how voices and communities who are excluded from such arenas can be more actively involved.</p>\n',
      countryTag: [
        {
          popularity: 42,
          name: 'Finland',
          _id: '640a7a20-7496-4b99-b7b9-49902028b577',
          _createdDate: {
            $date: '2024-08-27T09:48:24.770Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.770Z',
          },
          tagType: 'country',
        },
      ],
      title: 'EUARENAS',
      internalLinks: [],
      organisationMemberOf: [],
      activity: [],
      projectFunded: [
        {
          popularity: 27,
          name: 'EU funded',
          _id: 'f80d06e4-b326-4364-b250-0afa1fc777f3',
          _createdDate: {
            $date: '2024-08-27T09:48:25.119Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.119Z',
          },
          tagType: 'project type',
        },
      ],
      organisationHasMember: [],
      organisationPeople: [],
    },
    _id: 'e3784748-50fb-4b76-9709-794c2d53a64c',
  },
  {
    dataCollectionId: 'InfoPages',
    data: {
      projectParticipantTeam: [
        {
          name: 'Alexandre Reznikow',
          _id: '73678678-3b3a-4e11-8518-a26d05653614',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.016Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.016Z',
          },
          tagType: 'person',
        },
      ],
      organisation: [],
      organisationProject: [],
      postImage2: {
        url: ' ',
        caption: '',
      },
      postContentRIch2:
        "<p>The learning process itself was also a framing goal of this collaboration, where the unit team wanted to learn some foresight methods and implement them into certain processes of the department's work. The project involved desk research, two expert workshops, expert interviews, and also working closely with leading experts on social issues to develop a set of social issue cards. The final list of social time bombs was used by the unit to define calls for grant programs for nonprofits seeking to address diverse problems through social innovation. Foresight was thus used in this case to direct public funds more effectively, thereby addressing the problems that need to be focused on with an eye to the future.</p>\n<p>https://www.ceskepriority.cz/foresight#co_je_foresight</p>\n",
      methods: [
        {
          popularity: 33,
          name: 'expert workshops',
          _id: '6c84e284-84b3-49dd-938d-3a5d8a9f7259',
          _createdDate: {
            $date: '2024-08-27T09:48:24.962Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.962Z',
          },
          tagType: 'foresight method',
        },
        {
          popularity: 34,
          name: 'interviews',
          _id: '36e5f3ff-5089-46ea-8d43-ae291ee9bd24',
          _createdDate: {
            $date: '2024-08-27T09:48:24.955Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.955Z',
          },
          tagType: 'foresight method',
        },
        {
          popularity: 46,
          name: 'modelling',
          _id: '271e5e0e-1be8-42a3-8f0e-87d0f83f2e55',
          _createdDate: {
            $date: '2024-08-27T09:48:24.951Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.951Z',
          },
          tagType: 'foresight method',
        },
        {
          popularity: 38,
          name: 'extrapolation',
          _id: 'd34444fb-f15b-4122-9aad-0732bab462b7',
          _createdDate: {
            $date: '2024-08-27T09:48:24.961Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.961Z',
          },
          tagType: 'foresight method',
        },
        {
          popularity: 43,
          name: 'futures stories',
          _id: 'f17b8201-5b2f-4b91-914e-0d266ea1312a',
          _createdDate: {
            $date: '2024-08-27T09:48:24.958Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.958Z',
          },
          tagType: 'foresight method',
        },
      ],
      pageTypes: [
        {
          popularity: 35,
          name: 'project info',
          _id: 'fcb0cbbc-98a5-4743-8c8b-1cb1c8326a85',
          _createdDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          tagId: 252527,
          tagType: 'page type',
        },
      ],
      projectCoordinator: [],
      _id: 'aa0d3565-db93-4a24-a3c2-abd7706c2f11',
      _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
      _createdDate: {
        $date: '2024-10-26T15:09:44.461Z',
      },
      organisationType: [],
      postContentRIch3: '<p></p>\n',
      domains: [
        {
          popularity: 31,
          name: 'social innovation',
          _id: 'dfef94c1-0a2b-4305-be91-66ace52b285b',
          _createdDate: {
            $date: '2024-08-27T09:48:25.065Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.065Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 62,
          name: 'labour',
          _id: 'e700ae98-8f34-42ee-bfce-88fadab6e2cf',
          _createdDate: {
            $date: '2024-08-27T09:48:25.078Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.078Z',
          },
          tagType: 'domain',
        },
      ],
      personOrganisationFormer: [],
      personProjectParticipation: [],
      postImage1: {
        url: 'https://static.wixstatic.com/media/471908_3750a6a3d1cb41b18285a52df09a2269~mv2.webp',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-26T15:14:37.337Z',
      },
      slug: 'foresight-for-social-innovation-4ncy0',
      mediaFiles: [
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      projectEndDate: '2023-03-31T21:00:00.000Z',
      projectStartDate: '2022-12-31T22:00:00.000Z',
      Project: [
        {
          name: 'Foresight for Social Innovation',
          _id: '95a8911e-ed76-4699-9955-637d8514ca1f',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-26T15:07:43.870Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-26T15:09:47.426Z',
          },
          tagType: 'project',
          tagPageLink: '/project/foresight-for-social-innovation-4ncy0',
        },
      ],
      projectOrganisationRoles: [
        {
          organisation: 'Ceske Priority',
          role: '',
        },
        {
          organisation:
            'Ministry of Labour and Social Affairs from Czech Republic',
          role: '',
        },
        {
          organisation: '',
          role: '',
        },
      ],
      projectOrganisation: [
        {
          popularity: 4,
          tagline:
            'non-governmental and non-profit think-tank of researchers and public sector experts',
          name: 'Ceske Priority',
          _id: '508dfceb-8f6c-454a-a30b-7e6441da6367',
          _createdDate: {
            $date: '2024-08-27T09:48:24.850Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.850Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 83,
          name: 'Ministry of Labour and Social Affairs from Czech Republic',
          _id: '246af3af-a9b4-4342-bcba-5b79d2d6c315',
          _createdDate: {
            $date: '2024-08-27T09:48:24.795Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.795Z',
          },
          tagType: 'organisation',
        },
      ],
      personProjectCoordonation: [],
      person: [],
      personOrganisation: [],
      postContentRIch1:
        '<p>We implemented the ForSI (<strong>For</strong>esight for <strong>S</strong>ocial <strong>I</strong>nnovation) project with the Ministry of Labour and Social Affairs, with the Unit of Social Innovation. The aim of this collaboration was to identify so-called social time bombs - in our definition, problems that will be significant in the future or are already known today, but not yet sufficiently addressed by the state administration.&nbsp;</p>\n',
      countryTag: [
        {
          popularity: 25,
          name: 'Czech Republic',
          _id: '870d0d9e-5988-4ad5-a4d4-8293d035a290',
          _createdDate: {
            $date: '2024-08-27T09:48:24.735Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.735Z',
          },
          tagType: 'country',
        },
      ],
      title: 'Foresight for Social Innovation',
      internalLinks: [],
      organisationMemberOf: [],
      activity: [],
      projectFunded: [],
      organisationHasMember: [],
      organisationPeople: [],
    },
    _id: 'aa0d3565-db93-4a24-a3c2-abd7706c2f11',
  },
  {
    dataCollectionId: 'InfoPages',
    data: {
      projectParticipantTeam: [
        {
          name: 'Alexandre Reznikow',
          _id: '73678678-3b3a-4e11-8518-a26d05653614',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.016Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.016Z',
          },
          tagType: 'person',
        },
      ],
      organisation: [],
      organisationProject: [],
      postImage2: {
        url: ' ',
        caption: '',
      },
      postContentRIch2:
        '<p>The aim of this study was to serve as one of the inputs to the update and to initiate a discussion on the possibilities of updating the Czech republic 2030 strategy. In order to ensure that this strategic document reflects the dynamic developments on the global and domestic scene, mechanisms for regular reviews and updates of the objectives and measures have been proposed. Given the events of the last 3 years (especially the Covid-19 pandemic and the Russian invasion of Ukraine), it is relevant to review the relevance of the assumptions regarding the long-term development of the Czech Republic, which served as the basis for the original wording of the strategic objectives and targeting of the document.<br>The role of České priority was to provide foresight exercises in order to reach two goals:</p>\n<ul>\n<li><strong>Assess the relevance of existing goals:</strong> the problems and challenges facing society are changing and so are the definition of objectives for further development. The task of this section is therefore also to determine whether the original ČR 2030 goals are still relevant in the context of change and respond to the major challenges that society is facing and will continue to face in the coming decades.</li>\n<li><strong>Identify blind spots: </strong>there may be issues or opportunities that the document does not cover - i.e. blind spots. The next task of this part of the update is to identify such gaps to increase the comprehensiveness of the document.</li>\n</ul>\n<p>The project was implemented in the form of workshops, which were attended by experts and representatives of public institutions and ministries. On the basis of pre-prepared scenarios of development, the participants had to identify the resulting challenges, opportunities and areas that have not yet been covered in the CR 2030. The list of these areas was subsequently consulted with representatives of public institutions. These expert consultations were complemented by input from the general public through a creative competition held in September 2022.</p>\n<p>https://www.ceskepriority.cz/foresight#co_je_foresight&nbsp;</p>\n',
      methods: [
        {
          popularity: 36,
          name: 'scenarios',
          _id: '3c4917d4-7467-4fef-a6a3-af7b61b9e196',
          _createdDate: {
            $date: '2024-08-27T09:48:24.946Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.946Z',
          },
          tagType: 'foresight method',
        },
        {
          name: 'Expert Consultations',
          _id: '619268f4-d17b-44d3-83c5-25269c71831b',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-26T13:00:32.237Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-26T13:00:32.237Z',
          },
          tagType: 'foresight method',
        },
      ],
      pageTypes: [
        {
          popularity: 35,
          name: 'project info',
          _id: 'fcb0cbbc-98a5-4743-8c8b-1cb1c8326a85',
          _createdDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          tagId: 252527,
          tagType: 'page type',
        },
      ],
      projectCoordinator: [],
      _id: '2e2eb743-c070-4f7a-9017-6c5446a57ac9',
      _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
      _createdDate: {
        $date: '2024-10-26T12:57:17.187Z',
      },
      organisationType: [],
      postContentRIch3: '<p></p>\n',
      domains: [
        {
          name: 'Public Policy',
          _id: '2bb9642d-dc5a-4fc3-a812-9f98e987705e',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-23T13:38:45.867Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-23T13:38:45.867Z',
          },
          tagType: 'domain',
        },
      ],
      personOrganisationFormer: [],
      personProjectParticipation: [],
      postImage1: {
        url: 'https://static.wixstatic.com/media/471908_878d8d8d74b44dd88368927310ab8e36~mv2.webp',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-26T13:09:06.084Z',
      },
      slug: 'actualization-of-czech-republic-2030-strategy-63e2g',
      mediaFiles: [
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      Project: [
        {
          name: 'Actualization of Czech republic 2030 strategy',
          _id: 'c04a682a-4162-4c01-8ad0-10ed5ece8fe5',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-26T12:55:54.930Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-26T12:57:19.812Z',
          },
          tagType: 'project',
          tagPageLink:
            '/project/actualization-of-czech-republic-2030-strategy-63e2g',
        },
      ],
      projectOrganisationRoles: [
        {
          organisation: 'Ceske Priority',
          role: '',
        },
        {
          role: '',
        },
      ],
      projectOrganisation: [
        {
          popularity: 4,
          tagline:
            'non-governmental and non-profit think-tank of researchers and public sector experts',
          name: 'Ceske Priority',
          _id: '508dfceb-8f6c-454a-a30b-7e6441da6367',
          _createdDate: {
            $date: '2024-08-27T09:48:24.850Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.850Z',
          },
          tagType: 'organisation',
        },
      ],
      personProjectCoordonation: [],
      person: [],
      personOrganisation: [],
      postContentRIch1: '<p></p>\n',
      countryTag: [
        {
          popularity: 25,
          name: 'Czech Republic',
          _id: '870d0d9e-5988-4ad5-a4d4-8293d035a290',
          _createdDate: {
            $date: '2024-08-27T09:48:24.735Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.735Z',
          },
          tagType: 'country',
        },
      ],
      title: 'Actualization of Czech republic 2030 strategy',
      internalLinks: [],
      organisationMemberOf: [],
      activity: [],
      projectFunded: [],
      organisationHasMember: [],
      organisationPeople: [],
    },
    _id: '2e2eb743-c070-4f7a-9017-6c5446a57ac9',
  },
  {
    dataCollectionId: 'InfoPages',
    data: {
      projectParticipantTeam: [],
      organisation: [],
      personOrganisationRoles: [
        {
          organisation: 'UEFISCDI',
          role: '',
        },
        {
          organisation: '',
          role: '',
        },
      ],
      organisationProject: [],
      methods: [
        {
          name: 'roadmapping',
          _id: '19a0517e-64e5-48f8-823e-f8ca544c6447',
          _owner: '4719082d-ae14-4ecd-924b-bf55a28b8479',
          _createdDate: {
            $date: '2024-10-17T10:44:01.075Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-17T10:44:01.075Z',
          },
          tagType: 'foresight method',
        },
      ],
      pageTypes: [
        {
          popularity: 91,
          name: 'person info',
          _id: 'ff988067-2fee-41f2-9b33-7eb14d282b17',
          _createdDate: {
            $date: '2024-08-27T09:51:01.715Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.715Z',
          },
          tagId: 252526,
          tagType: 'page type',
        },
      ],
      projectCoordinator: [],
      description: '<p></p>\n',
      _id: '1461e0d6-076e-484e-b522-b204b4dd3bb0',
      _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
      _createdDate: {
        $date: '2024-10-24T13:08:19.922Z',
      },
      organisationType: [],
      domains: [
        {
          name: 'Public Policy',
          _id: '2bb9642d-dc5a-4fc3-a812-9f98e987705e',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-23T13:38:45.867Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-23T13:38:45.867Z',
          },
          tagType: 'domain',
        },
      ],
      personOrganisationFormer: [],
      personProjectParticipation: [
        {
          popularity: 1,
          name: 'Eye of Europe',
          _id: 'a3da923c-66d3-46a7-8ab0-8d33424f3b80',
          _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
          _createdDate: {
            $date: '2024-10-15T11:02:13.126Z',
          },
          tagLine: 'The Research and Innovation Foresight Community',
          _updatedDate: {
            $date: '2024-10-25T11:17:57.445Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_3fc30f50bb3c467aa3213c444816d649~mv2.png',
          tagType: 'project',
          tagPageLink: '/project/Eye_of_Europe_6ft5d',
        },
      ],
      _updatedDate: {
        $date: '2024-10-24T13:08:19.922Z',
      },
      slug: 'ioana-spanache-2u7zg',
      mediaFiles: [
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      Project: [],
      projectOrganisation: [],
      personProjectCoordonation: [],
      person: [
        {
          name: 'Ioana Spanache',
          _id: '96f61b50-b22e-4d5b-8730-597ef586e951',
          _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
          _createdDate: {
            $date: '2024-10-24T11:09:20.706Z',
          },
          tagLine: 'When the path is blocked, create a new one.',
          _updatedDate: {
            $date: '2024-10-24T13:08:24.293Z',
          },
          tagType: 'person',
          tagPageLink: '/person/ioana-spanache-2u7zg',
        },
      ],
      personOrganisation: [
        {
          popularity: 55,
          tagline:
            'Unitatea Executivă pentru Finanțarea Învățământului superior, a Cercetării, Dezvoltării și Inovării',
          trend: '5',
          name: 'UEFISCDI',
          _id: '95224d24-7699-4603-8d55-58c15794dd58',
          _owner: 'd63d4075-c493-4434-b07b-3455eb228b81',
          _createdDate: {
            $date: '2024-08-27T09:48:24.898Z',
          },
          tagLine:
            'The Executive Agency for Higher Education, Research, Development and Innovation Funding of Romania',
          linked: true,
          _updatedDate: {
            $date: '2024-10-29T10:45:39.420Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_f66da0478b09447ba0708a35af2af36c~mv2.png',
          tagType: 'organisation',
          tagPageLink: '/organisation/UEFISCDI_rloxg',
        },
      ],
      countryTag: [
        {
          popularity: 15,
          name: 'Romania',
          _id: 'e4cab9c4-7f21-4ec6-88ad-7aa8698612f4',
          _createdDate: {
            $date: '2024-08-27T09:48:24.766Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.766Z',
          },
          tagType: 'country',
        },
      ],
      title: 'Ioana Spanache',
      internalLinks: [],
      organisationMemberOf: [],
      activity: [
        {
          popularity: 12,
          trend: '3',
          name: 'foresight expert',
          _id: '29107cef-e43b-486f-b06e-426011c5adaa',
          _createdDate: {
            $date: '2024-08-27T09:48:25.131Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.131Z',
          },
          tagType: 'person type',
        },
      ],
      projectFunded: [],
      organisationHasMember: [],
      organisationPeople: [],
      personOrganisationRolesFormer: [
        {
          organisation: '',
          role: '',
        },
      ],
    },
    _id: '1461e0d6-076e-484e-b522-b204b4dd3bb0',
  },
  {
    dataCollectionId: 'InfoPages',
    data: {
      projectParticipantTeam: [],
      organisation: [],
      personOrganisationRoles: [
        {
          organisation: 'DG RTD',
          role: 'CTO',
        },
        {
          organisation: 'CNIO ',
          role: 'CFO',
        },
        {
          organisation: '',
          role: '',
        },
      ],
      organisationProject: [],
      methods: [
        {
          name: 'Experts Consultation',
          _id: '592aecc5-c20f-49b7-b524-dddefa4ad04c',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-26T13:01:41.338Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-26T13:01:41.338Z',
          },
          tagType: 'foresight method',
        },
      ],
      pageTypes: [
        {
          popularity: 91,
          name: 'person info',
          _id: 'ff988067-2fee-41f2-9b33-7eb14d282b17',
          _createdDate: {
            $date: '2024-08-27T09:51:01.715Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.715Z',
          },
          tagId: 252526,
          tagType: 'page type',
        },
      ],
      projectCoordinator: [],
      description:
        "<p><strong>Foresight Training</strong><br><br>In this dynamically changing environment, leaders need to be equipped to think effectively about what's next. Our tailored trainings are designed to spark insight and catalyze new ways of thinking that can be readily applied within the context of day-to-day operations.</p>\n",
      _id: '3fbd3f0b-54c1-4bdb-a51a-fa351350538e',
      _owner: '061b4912-4828-4dbb-9d88-bddccf2226a4',
      _createdDate: {
        $date: '2024-10-24T08:42:48.322Z',
      },
      organisationType: [],
      domains: [
        {
          name: 'Food security',
          _id: 'a47f65f7-75e0-4a54-811f-9d5f40aabf8c',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-28T12:20:14.483Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-28T12:20:14.483Z',
          },
          tagType: 'domain',
        },
        {
          name: 'Knowledge',
          _id: '3856c25c-1224-40d0-bae6-666c37eec97e',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-23T08:29:56.782Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-23T08:29:56.782Z',
          },
          tagType: 'domain',
        },
      ],
      personOrganisationFormer: [
        {
          name: 'CNIO ',
          _id: 'd84a7d7b-d29e-43b0-b9a7-6be3da35c2fa',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-28T20:34:24.769Z',
          },
          tagLine: 'Centro Nacional de Investigaciones Oncológicas',
          _updatedDate: {
            $date: '2024-10-28T20:34:24.769Z',
          },
          tagType: 'organisation',
        },
      ],
      personProjectParticipation: [
        {
          name: 'The Responsible Research and Innovation Living Lab',
          _id: '3d05b33e-4c1a-44ca-aa67-522f7cf5cda8',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-28T09:06:30.057Z',
          },
          tagLine:
            'The Prospects of Institutionalizing the Values of Openness and Mutual Responsiveness in Science and Democracy',
          _updatedDate: {
            $date: '2024-10-28T09:34:42.701Z',
          },
          tagType: 'project',
          tagPageLink:
            '/project/the-responsible-research-and-innovation-living-lab-ue9by',
        },
        {
          name: 'FEDORA',
          _id: '87c2e80d-69bc-42ed-9013-e756d3fe3f8c',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-28T08:17:50.606Z',
          },
          tagLine:
            'Responsibility and Engagement in the society of acceleration and uncertainty. ',
          _updatedDate: {
            $date: '2024-10-28T08:26:38.101Z',
          },
          picture:
            'https://static.wixstatic.com/shapes/471908_e3623cb23cb446468bc80dbe9224cc9c.svg',
          tagType: 'project',
          tagPageLink: '/project/fedora-jyedo',
        },
        {
          name: 'European urban mobility 2050: A horizon scanning project',
          _id: 'b6273354-68b5-43d2-b5b4-7b0db7701abb',
          _owner: 'e586b886-7d9c-42d0-b744-f73146a3862f',
          _createdDate: {
            $date: '2024-10-26T22:32:07.209Z',
          },
          tagLine: 'Sustainable transport – new urban mobility framework',
          _updatedDate: {
            $date: '2024-10-26T22:40:14.332Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_b6747b16c75e4883899afbda1d88e6ee~mv2.png',
          tagType: 'project',
          tagPageLink:
            '/project/european-urban-mobility-2050-a-horizon-scanning-project-w7hlg',
        },
        {
          name: 'EUARENAS',
          _id: '2e0a5e35-c3b4-41ab-ae70-9dc825ca4c1b',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-26T15:19:24.621Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-26T15:20:30.692Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_45ea460116064905b3063bd7a3b409e8~mv2.webp',
          tagType: 'project',
          tagPageLink: '/project/euarenas-vi8id',
        },
        {
          name: 'i-Portunus Houses',
          _id: 'e3b24e71-f732-4db8-a79d-9c0b048542b7',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-28T08:31:34.950Z',
          },
          tagLine:
            'Kick-Start a Local Mobility Host Network for Artists & Cultural Professionals in AllCreative Europe Countries',
          _updatedDate: {
            $date: '2024-10-28T08:40:00.886Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_b6fb3c86ab9a44cb9f91cf88ec5fc63f~mv2.jpeg',
          tagType: 'project',
          tagPageLink: '/project/i-portunus-houses-h3g35',
        },
        {
          name: 'Smart Futures Tunisia',
          _id: '4a893880-17ae-4ebd-a511-32181487f2e1',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-28T08:44:18.871Z',
          },
          tagLine:
            'Exploring the digital skills of tomorrow (a foresight journey into the year 2035)',
          _updatedDate: {
            $date: '2024-10-28T08:47:52.348Z',
          },
          tagType: 'project',
          tagPageLink: '/project/smart-futures-tunisia-chsrs',
        },
      ],
      _updatedDate: {
        $date: '2024-10-30T01:25:28.113Z',
      },
      slug: 'catalin-sirbu-nev6v',
      mediaFiles: [
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      Project: [],
      projectOrganisation: [],
      personProjectCoordonation: [
        {
          name: 'The Responsible Research and Innovation Living Lab',
          _id: '3d05b33e-4c1a-44ca-aa67-522f7cf5cda8',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-28T09:06:30.057Z',
          },
          tagLine:
            'The Prospects of Institutionalizing the Values of Openness and Mutual Responsiveness in Science and Democracy',
          _updatedDate: {
            $date: '2024-10-28T09:34:42.701Z',
          },
          tagType: 'project',
          tagPageLink:
            '/project/the-responsible-research-and-innovation-living-lab-ue9by',
        },
        {
          name: 'i-Portunus Houses',
          _id: 'e3b24e71-f732-4db8-a79d-9c0b048542b7',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-28T08:31:34.950Z',
          },
          tagLine:
            'Kick-Start a Local Mobility Host Network for Artists & Cultural Professionals in AllCreative Europe Countries',
          _updatedDate: {
            $date: '2024-10-28T08:40:00.886Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_b6fb3c86ab9a44cb9f91cf88ec5fc63f~mv2.jpeg',
          tagType: 'project',
          tagPageLink: '/project/i-portunus-houses-h3g35',
        },
        {
          name: 'European urban mobility 2050: A horizon scanning project',
          _id: 'b6273354-68b5-43d2-b5b4-7b0db7701abb',
          _owner: 'e586b886-7d9c-42d0-b744-f73146a3862f',
          _createdDate: {
            $date: '2024-10-26T22:32:07.209Z',
          },
          tagLine: 'Sustainable transport – new urban mobility framework',
          _updatedDate: {
            $date: '2024-10-26T22:40:14.332Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_b6747b16c75e4883899afbda1d88e6ee~mv2.png',
          tagType: 'project',
          tagPageLink:
            '/project/european-urban-mobility-2050-a-horizon-scanning-project-w7hlg',
        },
        {
          name: 'Smart Futures Tunisia',
          _id: '4a893880-17ae-4ebd-a511-32181487f2e1',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-28T08:44:18.871Z',
          },
          tagLine:
            'Exploring the digital skills of tomorrow (a foresight journey into the year 2035)',
          _updatedDate: {
            $date: '2024-10-28T08:47:52.348Z',
          },
          tagType: 'project',
          tagPageLink: '/project/smart-futures-tunisia-chsrs',
        },
        {
          name: 'Soil Health and Food',
          _id: 'dcc95f5a-b930-4388-96c0-ae4449301572',
          _owner: 'e13d3737-1a40-45be-85c9-7aa6247688c5',
          _createdDate: {
            $date: '2024-10-22T16:09:24.676Z',
          },
          tagLine:
            'Industry-Academia Forum to uncover the potential of emerging enabling technologies',
          _updatedDate: {
            $date: '2024-10-26T22:45:48.088Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_47fc0752aa4843feb8984b2766e722a3~mv2.png',
          tagType: 'project',
          tagPageLink:
            '/project/project-z-proaksj-aslkajda-asdkl-jas-dalksjda-lksdjalk-sdjaslkd--gaspf',
        },
      ],
      person: [
        {
          popularity: 167,
          name: 'CATALIN A SIRBU',
          _id: '6aab52e9-ff4e-4ed6-8f87-88a29e79c0de',
          _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
          _createdDate: {
            $date: '2024-10-01T21:39:31.534Z',
          },
          tagLine:
            'Sail away from the safe harbor - Catch the trade winds in your sails',
          _updatedDate: {
            $date: '2024-10-28T01:36:17.997Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_b62ca07ac0484eae93e7a732785223e1~mv2.jpg',
          tagType: 'person',
          tagPageLink: '/person/catalin-sirbu-nev6v',
        },
      ],
      personOrganisation: [
        {
          name: 'DG RTD',
          _id: '7be555b9-5274-4e4f-b733-64969fdf8781',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-28T20:39:19.424Z',
          },
          tagLine:
            'Directorate-General for Research and Innovation of the European Commission',
          _updatedDate: {
            $date: '2024-10-28T20:39:19.424Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'CNIO ',
          _id: 'd84a7d7b-d29e-43b0-b9a7-6be3da35c2fa',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-28T20:34:24.769Z',
          },
          tagLine: 'Centro Nacional de Investigaciones Oncológicas',
          _updatedDate: {
            $date: '2024-10-28T20:34:24.769Z',
          },
          tagType: 'organisation',
        },
      ],
      countryTag: [
        {
          name: 'Tunisia',
          _id: 'a27bd3e5-2a2c-4aa4-a44c-0c0a688a03cd',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-28T08:49:50.218Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-28T08:49:50.218Z',
          },
          tagType: 'country',
        },
      ],
      title: 'CATALIN A SIRBU',
      internalLinks: [],
      organisationMemberOf: [],
      activity: [
        {
          popularity: 25,
          name: 'foresight trainer',
          _id: '0328a866-26be-4e56-a301-4150e8e49637',
          _createdDate: {
            $date: '2024-08-27T09:48:25.130Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.130Z',
          },
          tagType: 'person type',
        },
        {
          popularity: 39,
          name: 'domain expert',
          _id: 'de346060-e0e7-42e5-ad3a-4c8c675f7f89',
          _createdDate: {
            $date: '2024-08-27T09:48:25.129Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.129Z',
          },
          tagType: 'person type',
        },
        {
          popularity: 14,
          name: 'futurist',
          _id: '74fbdf38-08bf-4cf3-8098-17cc3c6e78f6',
          _createdDate: {
            $date: '2024-08-27T09:48:25.128Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.128Z',
          },
          tagType: 'person type',
        },
        {
          popularity: 5,
          name: 'speculative design expert',
          _id: '9c426047-e22c-4b07-bf15-fcd4decd6bc8',
          _createdDate: {
            $date: '2024-08-27T09:48:25.127Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.127Z',
          },
          tagType: 'person type',
        },
        {
          popularity: 7,
          name: 'R&I policy expert',
          _id: 'a5b67949-1c5b-4b2f-9840-5d982c3c8154',
          _createdDate: {
            $date: '2024-08-27T09:48:25.125Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.125Z',
          },
          tagType: 'person type',
        },
        {
          popularity: 8,
          name: 'journalist',
          _id: 'd3ba924f-a934-4215-aa0d-65a05eaf2353',
          _createdDate: {
            $date: '2024-08-27T09:48:25.126Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.126Z',
          },
          tagType: 'person type',
        },
        {
          popularity: 8,
          name: 'impact assessment expert',
          _id: '09378014-4255-4aa7-8f54-202e1ddfb883',
          _createdDate: {
            $date: '2024-08-27T09:48:25.124Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.124Z',
          },
          tagType: 'person type',
        },
        {
          popularity: 10,
          name: 'future sensitive artist',
          _id: 'eaafcfca-9a7c-4552-b205-ab49fab72ff4',
          _createdDate: {
            $date: '2024-08-27T09:48:25.122Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.122Z',
          },
          tagType: 'person type',
        },
        {
          popularity: 3,
          name: 'foresight student',
          _id: 'c4f86855-c7f1-48d7-ac07-a5456fe04106',
          _createdDate: {
            $date: '2024-08-27T09:48:25.120Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.120Z',
          },
          tagType: 'person type',
        },
      ],
      projectFunded: [],
      organisationHasMember: [],
      linkedinLink:
        'https://www.linkedin.com/company/executive-agency-for-higher-education-research-development-and-innovation-funding/about/',
      organisationPeople: [],
      personOrganisationRolesFormer: [
        {
          organisation: 'CNIO ',
          role: 'Professor',
        },
        {
          organisation: '',
          role: '',
        },
      ],
    },
    _id: '3fbd3f0b-54c1-4bdb-a51a-fa351350538e',
  },
  {
    dataCollectionId: 'InfoPages',
    data: {
      projectParticipantTeam: [],
      organisation: [],
      organisationProject: [],
      postContentRIch2: '<p></p>\n',
      methods: [],
      pageTypes: [
        {
          popularity: 35,
          name: 'project info',
          _id: 'fcb0cbbc-98a5-4743-8c8b-1cb1c8326a85',
          _createdDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          tagId: 252527,
          tagType: 'page type',
        },
      ],
      projectCoordinator: [],
      _id: '079a41f1-1ce0-4cd5-b446-dcf65c735962',
      _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
      _createdDate: {
        $date: '2024-10-24T08:18:04.472Z',
      },
      organisationType: [],
      domains: [],
      personOrganisationFormer: [],
      personProjectParticipation: [],
      postImage1: {
        url: ' ',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-24T08:18:04.472Z',
      },
      slug: 'time-capsule-2q0pv',
      mediaFiles: [
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      Project: [
        {
          name: 'Time Capsule',
          _id: '1a5911b8-844c-476c-8615-5e786e8c665e',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-24T08:18:02.071Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-24T08:18:06.142Z',
          },
          tagType: 'project',
          tagPageLink: '/project/time-capsule-2q0pv',
        },
      ],
      projectOrganisationRoles: [
        {
          organisation: '',
          role: '',
        },
      ],
      projectOrganisation: [],
      personProjectCoordonation: [],
      person: [],
      personOrganisation: [],
      postContentRIch1: '<p></p>\n',
      countryTag: [],
      title: 'Time Capsule',
      internalLinks: [],
      organisationMemberOf: [],
      activity: [],
      projectFunded: [],
      organisationHasMember: [],
      organisationPeople: [],
    },
    _id: '079a41f1-1ce0-4cd5-b446-dcf65c735962',
  },
  {
    dataCollectionId: 'InfoPages',
    data: {
      projectParticipantTeam: [],
      organisation: [],
      organisationProject: [],
      postImage2: {
        url: ' ',
        caption: '',
      },
      postContentRIch2:
        '<p><strong>Imagine a world where young people are not just the leaders of tomorrow, but the co-creators of today. </strong></p>\n<p>That\'s the vision behind the <strong>Foresight for Intergenerational Decision-Making</strong> initiative, a brainchild of the Big Brainstorm project run by the Unlock the Future coalition, under the umbrella of the UN Foundation. The Big Brainstorm is like a global talent show on ideas. Young innovators from every corner of the world come together to brainstorm, design, and launch initiatives to tackle some of the biggest challenges humanity faces. This year, over 2,000 young minds have joined the Big Brainstorm, with nearly half of them proposing initiatives to speed up action towards the Sustainable Development Goals (SDGs).&nbsp;</p>\n<p>Out of these, twenty initiatives were selected, and one of them is the <strong>Foresight for Intergenerational Decision-Making</strong>. The heart of this initiative is a <strong>toolkit designed to run multi-stakeholder Foresight exercises</strong>. Think of it as a DIY kit for the future, helping young people to build meaningful spaces where they can engage with adults, particularly decision-makers and the private sector, to co-create their vision for the future. The initiative is based on the belief that young people have innovative ideas and stories that can help shape the future. By using Foresight tools, they can engage in a process of co-creation, sharing their perspectives and visions for the future with decision-makers, and learning to anticipate both the opportunities and threats behind different scenarios.&nbsp;</p>\n<p>This summer, the toolkit will be put to the test different locations. It\'s like a world tour for the future, with young leaders from the United Nations Foundation’s Big Brainstorm leading the charge. The toolkit is being designed with the help of Foresight practitioners who have hands-on experience in intergenerational spaces and field experience in the Majority World.&nbsp;</p>\n<p>Currently, the forward thinkers behind the initiative have launched a global survey and conduct interviews to understand the fears and hopes of young people.&nbsp;</p>\n<p><strong>Want to get involved ? You can </strong><a href="https://forms.gle/osmz4fLEUqucTaos8" target="_blank"><strong>complete the survey here</strong></a><strong>  and have the chance to connect with us at the end of the survey! </strong></p>\n<p>The Foresight for Intergenerational Decision-Making initiative is a big step towards a future-focused approach. It aims to provide young people with a toolkit for creating meaningful intergenerational spaces, create a platform for adolescents, young people, and Foresight practitioners to brainstorm together, and showcase examples of good practice that can be replicated across the world. The initiative is open to all young people and their allies who are willing to contribute to its goals and offer fresh insights. <strong>Any youth networks interested in leading the organization of piloting experiences are encouraged to get in touch with the Action Group. </strong></p>\n<p>In a nutshell, the Foresight for Intergenerational Decision-Making initiative is all about empowering young people to shape their futures. By giving them the tools and platforms to engage with decision-makers and the private sector, the initiative is nurturing a new generation of changemakers who are ready to tackle the world\'s most pressing challenges. The future is in our hands, and with the help of this initiative, young people are being given the tools to shape it.&nbsp;</p>\n<p><strong>So, let\'s roll up our sleeves and get ready to shape the future together! </strong></p>\n<p><strong>Contact the coordination team:</strong> felibosch3@gmail.com / chalalidaouia@hotmail.fr / salifi.alimou@gmail.com / Claudette.salinas10@gmail.com&nbsp;</p>\n<p><em>The future generations movement has been growing for almost thirty years and was given a new lease of life after the 2021 report Our Common Agenda. The UN Secretary General has called for a multilateral system that incorporates long-term thinking. This has sparked a momentum in the United Nations, leading to plans for a Summit of the Future in 2024, a Declaration on Future Generations, and a recommendation to appoint a Special Envoy for Future Generations.</em></p>\n',
      methods: [],
      pageTypes: [
        {
          popularity: 35,
          name: 'project info',
          _id: 'fcb0cbbc-98a5-4743-8c8b-1cb1c8326a85',
          _createdDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          tagId: 252527,
          tagType: 'page type',
        },
      ],
      projectCoordinator: [
        {
          name: 'Daouia Chalali',
          _id: '8c0461d2-b8a9-4933-aec2-9df3a4724809',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.238Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.238Z',
          },
          tagType: 'person',
        },
      ],
      _id: '49e538d2-5933-48f0-89f4-927f56e2af0d',
      _owner: 'd7b153b4-b43b-466c-9881-0d9d9466ab0b',
      _createdDate: {
        $date: '2024-10-24T07:51:03.584Z',
      },
      organisationType: [],
      postContentRIch3: '<p></p>\n',
      domains: [
        {
          popularity: 72,
          name: 'youth',
          _id: '33b27522-1873-45d3-9558-59b8031fcf3f',
          _createdDate: {
            $date: '2024-08-27T09:48:25.057Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.057Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 19,
          name: 'education',
          _id: 'fca15479-fa61-4bac-9600-c327f6ccb1c2',
          _createdDate: {
            $date: '2024-08-27T09:48:25.095Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.095Z',
          },
          tagType: 'domain',
        },
      ],
      personOrganisationFormer: [],
      personProjectParticipation: [],
      postImage1: {
        url: 'https://static.wixstatic.com/media/471908_c109baa96c9841b995acd8ab880df763~mv2.webp',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-29T10:34:06.352Z',
      },
      slug: 'foresight-for-intergenerational-decision-making-5g8w2',
      mediaFiles: [
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      Project: [
        {
          name: 'Foresight for Intergenerational Decision-Making',
          _id: 'c70a0b51-b3af-447c-b6db-ed2546a72762',
          _owner: 'd7b153b4-b43b-466c-9881-0d9d9466ab0b',
          _createdDate: {
            $date: '2024-10-24T07:26:47.338Z',
          },
          tagLine: 'Empowering Youth to Shape the Future',
          _updatedDate: {
            $date: '2024-10-24T07:51:06.918Z',
          },
          tagType: 'project',
          tagPageLink:
            '/project/foresight-for-intergenerational-decision-making-5g8w2',
        },
      ],
      projectOrganisationRoles: [
        {
          organisation: 'Unlock the Future',
          role: '',
        },
        {
          organisation: 'UN Foundation',
          role: '',
        },
        {
          organisation: '',
          role: '',
        },
      ],
      projectOrganisation: [
        {
          name: 'Unlock the Future',
          _id: '9cea19fc-49a1-42fe-9a3e-fa2a386a6bfc',
          _owner: 'd7b153b4-b43b-466c-9881-0d9d9466ab0b',
          _createdDate: {
            $date: '2024-10-24T07:49:05.665Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-24T07:49:05.665Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'UN Foundation',
          _id: '7c378f10-f217-406e-a963-8657f34df7f1',
          _owner: 'd7b153b4-b43b-466c-9881-0d9d9466ab0b',
          _createdDate: {
            $date: '2024-10-24T07:49:41.543Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-24T07:49:41.543Z',
          },
          tagType: 'organisation',
        },
      ],
      personProjectCoordonation: [],
      person: [],
      personOrganisation: [],
      postContentRIch1: '<p></p>\n',
      countryTag: [],
      title: 'Foresight for Intergenerational Decision-Making',
      internalLinks: [],
      organisationMemberOf: [],
      activity: [],
      projectFunded: [],
      organisationHasMember: [],
      organisationPeople: [],
    },
    _id: '49e538d2-5933-48f0-89f4-927f56e2af0d',
  },
  {
    dataCollectionId: 'InfoPages',
    data: {
      projectParticipantTeam: [
        {
          name: 'Dominik Hajduk',
          _id: 'f8c9edd6-70d9-4211-b41e-c82003dee13d',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.117Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.117Z',
          },
          tagType: 'person',
        },
      ],
      organisation: [],
      organisationProject: [],
      postContentRIch2: '<p></p>\n',
      methods: [
        {
          popularity: 31,
          name: 'forecasting tournaments',
          _id: 'd138ddf2-4561-4264-8080-cdfaa099ae04',
          _createdDate: {
            $date: '2024-08-27T09:48:24.960Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.960Z',
          },
          tagType: 'foresight method',
        },
        {
          name: 'Survey',
          _id: '3886c659-e84d-44eb-96b9-21acc6d65a09',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T13:17:14.384Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-22T13:17:14.384Z',
          },
          tagType: 'foresight method',
        },
      ],
      pageTypes: [
        {
          popularity: 35,
          name: 'project info',
          _id: 'fcb0cbbc-98a5-4743-8c8b-1cb1c8326a85',
          _createdDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          tagId: 252527,
          tagType: 'page type',
        },
      ],
      projectCoordinator: [],
      _id: '06143814-203d-495e-8df3-00a01f6266b8',
      _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
      _createdDate: {
        $date: '2024-10-23T13:39:48.541Z',
      },
      organisationType: [],
      domains: [
        {
          name: 'Public Policy',
          _id: '2bb9642d-dc5a-4fc3-a812-9f98e987705e',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-23T13:38:45.867Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-23T13:38:45.867Z',
          },
          tagType: 'domain',
        },
      ],
      personOrganisationFormer: [],
      personProjectParticipation: [],
      postImage1: {
        url: ' ',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-24T08:25:25.522Z',
      },
      slug: 'forpol-m2fp5',
      mediaFiles: [
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      projectEndDate: '2023-02-28T22:00:00.000Z',
      projectStartDate: '2022-09-30T21:00:00.000Z',
      Project: [
        {
          name: 'FORPOL',
          _id: 'c1e81ff1-046d-4a5a-b7cd-61952f67a560',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-23T13:34:45.252Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-23T13:42:18.593Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_7414ddd0846c4a9691ee2f985b15b588~mv2.png',
          tagType: 'project',
          tagPageLink: '/project/forpol-m2fp5',
        },
      ],
      projectOrganisationRoles: [
        {
          organisation: 'Ceske Priority',
          role: '',
        },
        {
          organisation: 'Metaculus',
          role: '',
        },
        {
          role: '',
        },
      ],
      projectOrganisation: [
        {
          popularity: 4,
          tagline:
            'non-governmental and non-profit think-tank of researchers and public sector experts',
          name: 'Ceske Priority',
          _id: '508dfceb-8f6c-454a-a30b-7e6441da6367',
          _createdDate: {
            $date: '2024-08-27T09:48:24.850Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.850Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 8,
          tagline: 'online forecasting platform and aggregation engine',
          name: 'Metaculus',
          _id: '8770a144-c599-430e-b41e-0c2e65474ecf',
          _createdDate: {
            $date: '2024-08-27T09:48:24.779Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.779Z',
          },
          tagType: 'organisation',
        },
      ],
      personProjectCoordonation: [],
      person: [],
      personOrganisation: [],
      postContentRIch1:
        '<p>From October 2022 to March 2023, we ran a forecasting tournament with a total of 54 questions. Almost all of our forecasting questions were developed in cooperation with 16 different public institutions and ministerial departments. Each institution or department defined its most useful forecasting topics, participated in a workshop to define specific questions with us, and was later provided with the results. This was intended as a proof of concept of one possible approach to incorporating forecasting in public decision-making.</p>\n<p><br>Once defined, our forecasting questions were then posted on a private Metaculus sub-domain (in Czech), where an average of 72 forecasters had the opportunity to address them as they would any other question on Metaculus (median of 18 predictions per user). Throughout the tournament, we produced 16 reports detailing the rationales and forecasts, to be used by the cooperating institutions.<br>A handful of our partners have already reported acting on the information/judgment presented in our reports. This has concerned, for example, the national foreclosure issue (some 6% of the total population have debts in arrears) where the debt relief process is being redesigned midst strong lobbying and insufficient personal capacities; or the probabilities of outlier scenarios for European macroeconomic development, which was requested by the Slovak Ministry of Finance to help calibrate their existing judgements.</p>\n<p><br>It also seems useful to explore various approaches to grow the number of policymakers with personal experience and skills in forecasting. In our case, we found curiosity and willingness to try forecasting even in unexpected institutional locations (i.e. the Czech R&amp;amp;I funding body). This makes us more confident that the “external forecasts” approach (as compared to building internal prediction tournaments or focusing on advancing forecasting skills of public servants) is worth investigating further precisely because it allows us to detect and draw on this interest irrespective of institutional and seniority distinctions and resource constraints.<br>While we hope that any readers with an interest in forecasting may find our experience useful, we expect that both this and any future projects of ours make it easier for other teams to work towards similar goals. To that effect, the write-up also contains an Annex of “Methodological Guidelines,” where we outline in more explicit terms the questions and decisions that we found were important to tackle when running the project, and what they may entail.</p>\n<p></p>\n<p>de introdus homepage</p>\n',
      countryTag: [
        {
          popularity: 25,
          name: 'Czech Republic',
          _id: '870d0d9e-5988-4ad5-a4d4-8293d035a290',
          _createdDate: {
            $date: '2024-08-27T09:48:24.735Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.735Z',
          },
          tagType: 'country',
        },
      ],
      title: 'FORPOL',
      internalLinks: [],
      organisationMemberOf: [],
      activity: [],
      projectFunded: [
        {
          name: 'EA Infrastructure Fund',
          _id: 'e41ccacf-4633-431e-8fb8-7727ab8d30ed',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-23T13:34:10.526Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-23T13:34:10.526Z',
          },
          tagType: 'project type',
        },
      ],
      organisationHasMember: [],
      organisationPeople: [],
    },
    _id: '06143814-203d-495e-8df3-00a01f6266b8',
  },
  {
    dataCollectionId: 'InfoPages',
    data: {
      projectParticipantTeam: [
        {
          name: 'Norbert Kołos',
          _id: '18cd0331-9798-4cc1-9e33-8e6f2c2dbff6',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.299Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.299Z',
          },
          tagType: 'person',
        },
      ],
      organisation: [],
      organisationProject: [],
      postImage2: {
        url: ' ',
        caption: '',
      },
      postContentRIch2: '<p></p>\n',
      methods: [
        {
          name: 'Survey',
          _id: '3886c659-e84d-44eb-96b9-21acc6d65a09',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T13:17:14.384Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-22T13:17:14.384Z',
          },
          tagType: 'foresight method',
        },
      ],
      pageTypes: [
        {
          popularity: 35,
          name: 'project info',
          _id: 'fcb0cbbc-98a5-4743-8c8b-1cb1c8326a85',
          _createdDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          tagId: 252527,
          tagType: 'page type',
        },
      ],
      projectCoordinator: [],
      _id: 'f9fd3498-672c-45ba-a9f8-053691e04385',
      _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
      _createdDate: {
        $date: '2024-10-22T13:17:28.273Z',
      },
      organisationType: [],
      postContentRIch3: '<p></p>\n',
      domains: [
        {
          popularity: 56,
          name: 'ethics',
          _id: '181c91b0-ed13-40a9-8c45-077c30a6b4ad',
          _createdDate: {
            $date: '2024-08-27T09:48:25.092Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.092Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 68,
          name: 'fairness',
          _id: 'bf9e79aa-543b-46cf-a108-9ceb46520d5e',
          _createdDate: {
            $date: '2024-08-27T09:48:25.090Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.090Z',
          },
          tagType: 'domain',
        },
        {
          name: 'Futures literacy',
          _id: 'b99431d0-ed19-4f73-bc7c-fae45125034a',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T13:11:34.619Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-22T13:11:34.619Z',
          },
          tagType: 'domain',
        },
      ],
      personOrganisationFormer: [],
      personProjectParticipation: [],
      postImage1: {
        url: 'https://static.wixstatic.com/media/471908_71a5d4695fea470ca892be99492b290f~mv2.webp',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-23T12:45:12.427Z',
      },
      slug: 'how-will-we-disgust-our-descendants-rvsft',
      mediaFiles: [
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      Project: [
        {
          name: 'How will we disgust our descendants?',
          _id: '03d3bb0f-f469-47e6-8bf1-755ac9741ab7',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T13:03:53.047Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-22T13:17:31.947Z',
          },
          tagType: 'project',
          tagPageLink: '/project/how-will-we-disgust-our-descendants-rvsft',
        },
      ],
      projectOrganisationRoles: [
        {
          organisation: '4CF The Futures Literacy Company ',
          role: 'Coordinator',
        },
        {
          organisation: '',
          role: '',
        },
      ],
      projectOrganisation: [
        {
          name: '4CF The Futures Literacy Company ',
          _id: '10a72944-404e-49a1-a60d-867cde630728',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-23T12:44:57.760Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-23T12:44:57.760Z',
          },
          tagType: 'organisation',
        },
      ],
      personProjectCoordonation: [],
      person: [],
      personOrganisation: [],
      postContentRIch1:
        '<p>It would be short-sighted to assume that we, as humanity, have reached such a level of maturity that our descendants will not find some aspects of our – apparently civilised – everyday life repulsive and sad. <br>So we asked 60 futurists from around the world: “<strong>What will we disgust our descendants with?</strong>”<br>Many of the submitted ideas are already present in public discourse and confirm areas in which we need to change. But we were especially interested in <strong>novel barbarisms that humanity is still largely oblivious to.</strong><br>The resulting infographic shows the futurists’ answers grouped into 93 contemporary barbarisms ranked in a public vote according to how eye-opening they are.</p>\n<p><a href="https://4cf.eu/how-will-we-disgust-our-descendants/" target="_blank">4CF The Futures Literacy Company</a>&nbsp;</p>\n',
      countryTag: [],
      title: 'How will we disgust our descendants?',
      internalLinks: [],
      organisationMemberOf: [],
      activity: [],
      projectFunded: [
        {
          popularity: 27,
          name: 'EU funded',
          _id: 'f80d06e4-b326-4364-b250-0afa1fc777f3',
          _createdDate: {
            $date: '2024-08-27T09:48:25.119Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.119Z',
          },
          tagType: 'project type',
        },
      ],
      organisationHasMember: [],
      organisationPeople: [],
    },
    _id: 'f9fd3498-672c-45ba-a9f8-053691e04385',
  },
  {
    dataCollectionId: 'InfoPages',
    data: {
      projectParticipantTeam: [
        {
          name: 'Maciej Krzysztofowicz',
          _id: 'fbae3b6f-7629-4661-8cbf-6f49b1653601',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.200Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.200Z',
          },
          tagType: 'person',
        },
        {
          name: 'Maija Knutti',
          _id: '2ce1087f-b775-422f-83b5-e222995e1fbc',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:38.950Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:38.950Z',
          },
          tagType: 'person',
        },
        {
          name: 'Kathrine Jensen',
          _id: 'ec2336a9-2e82-4420-b6eb-3dae67a3b2f0',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.017Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.017Z',
          },
          tagType: 'person',
        },
      ],
      organisation: [],
      organisationProject: [],
      postImage2: {
        url: ' ',
        caption: '',
      },
      postContentRIch2:
        '<p>Thirdly, future impact workshops, conceived as exploratory and prioritisation workshops are organised after conducting a few sense-making workshops. These workshops also include the participation of officials across all ESPAS institutions and aim to prioritise the three potentially most impactful ‘signals of change’ from among those identified at an earlier stage.<br>This careful process results in Horizon Scanning newsletters providing a broader perspective on policy making.</p>\n<p>Read the latest newsletters here: <a href="https://espas.eu/horizon.html#Publications" target="_blank">Horizon Scanning | ESPAS</a></p>\n<p><a href="https://policy-lab.ec.europa.eu/news/spotting-future-how-horizon-scanning-can-help-shape-eu-policy-2024-01-19_en" target="_blank">See also blog post describing the project and its role in EU : Spotting the Future: How Horizon Scanning can help shape EU Policy - European Commission (europa.eu)</a>&nbsp;</p>\n<p>ESPAS Horizon Scanning feeds to other ESPAS projects. Read the <a href="https://espas.eu/gtr.html" target="_blank">Global Trends Reports</a>  published every five years.</p>\n<p><strong>Partners:</strong></p>\n<p>European Strategy and Policy Analysis System (ESPAS)<br>Joint Research Centre of the European Commission (JRC) <br>European Parliamentary Research Services (EPRS)</p>\n<p></p>\n',
      methods: [
        {
          popularity: 47,
          name: 'horizon scanning',
          _id: 'b1d63812-7f03-4fa0-bfc7-b8d89363baa8',
          _createdDate: {
            $date: '2024-08-27T09:48:24.957Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.957Z',
          },
          tagType: 'foresight method',
        },
      ],
      pageTypes: [
        {
          popularity: 35,
          name: 'project info',
          _id: 'fcb0cbbc-98a5-4743-8c8b-1cb1c8326a85',
          _createdDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          tagId: 252527,
          tagType: 'page type',
        },
      ],
      projectCoordinator: [],
      _id: '9e5cd289-31f1-41bd-9343-3b2874804071',
      _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
      _createdDate: {
        $date: '2024-10-22T13:00:57.424Z',
      },
      organisationType: [],
      postContentRIch3: '<p></p>\n',
      domains: [
        {
          name: 'Policy analysis',
          _id: '96eac4f5-c18b-4b73-a6fb-9c0ea2b5740c',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T12:59:51.058Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-22T12:59:51.058Z',
          },
          tagType: 'domain',
        },
      ],
      personOrganisationFormer: [],
      personProjectParticipation: [],
      postImage1: {
        url: 'https://static.wixstatic.com/media/471908_8525886be7c745a59895848e56376a6f~mv2.webp',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-28T12:33:12.124Z',
      },
      slug: 'espas-horizon-scanning-9rfpb',
      mediaFiles: [
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      Project: [
        {
          name: 'ESPAS Horizon Scanning',
          _id: '768d06d7-153a-4f32-9988-b7fe13bb28c9',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T12:46:14.504Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-28T12:29:20.068Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_52a2303798fa412380bc9e03ff3b52e1~mv2.png',
          tagType: 'project',
          tagPageLink: '/project/espas-horizon-scanning-9rfpb',
        },
      ],
      projectOrganisationRoles: [
        {
          organisation: 'ESPAS',
          role: '',
        },
        {
          organisation: 'Joint Research Center',
          role: '',
        },
        {
          organisation: '',
          role: '',
        },
      ],
      projectOrganisation: [
        {
          name: 'ESPAS',
          _id: '25f6994f-107f-4970-a67b-65e1abc8b9e2',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-28T12:30:48.423Z',
          },
          tagLine: 'European Strategy and Policy Analysis System',
          _updatedDate: {
            $date: '2024-10-28T12:30:48.423Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 50,
          name: 'Joint Research Center',
          _id: 'f85b3c01-69e8-4688-8766-14c3910bea1b',
          _createdDate: {
            $date: '2024-08-27T09:48:24.871Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.871Z',
          },
          tagType: 'organisation',
        },
      ],
      personProjectCoordonation: [],
      person: [],
      personOrganisation: [],
      postContentRIch1:
        '<p>The ongoing inter-institutional European Strategy and Policy Analysis System (ESPAS) <a href="https://espas.eu/horizon.html" target="_blank">Horizon Scanning</a> activity is led since  2022 by the Joint Research Centre of the European Commission and the European Parliamentary Research Services. An iterative methodology is rolled out at three successive levels, involving experts in a variety of policy areas and across several EU institutions.</p>\n<p><br>Firstly, at the outset, this exercise builds a wider EU community engaged in horizon scanning. Their task at a first level has involved looking for future developments that sit at the margins of current thinking and planning, the so-called ‘signs of new’.</p>\n<p><br>Secondly, sense-making workshops are organised on a monthly basis to consider through new lenses the identified ‘signs of new’ collected over the month and find links and interconnections among them across policies and sectors. The aim of these second-level workshops is thus to imagine possible impactful future developments, ‘signals of change’, using the collected signs as prompts.<br></p>\n',
      countryTag: [
        {
          name: 'EU',
          _id: 'e1b13728-5253-484b-92d6-0c451813adff',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T10:28:23.621Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-22T10:28:23.621Z',
          },
          tagType: 'country',
        },
      ],
      title: 'ESPAS Horizon Scanning',
      internalLinks: [],
      organisationMemberOf: [],
      activity: [],
      projectFunded: [
        {
          popularity: 27,
          name: 'EU funded',
          _id: 'f80d06e4-b326-4364-b250-0afa1fc777f3',
          _createdDate: {
            $date: '2024-08-27T09:48:25.119Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.119Z',
          },
          tagType: 'project type',
        },
      ],
      organisationHasMember: [],
      organisationPeople: [],
    },
    _id: '9e5cd289-31f1-41bd-9343-3b2874804071',
  },
  {
    dataCollectionId: 'InfoPages',
    data: {
      projectParticipantTeam: [
        {
          name: 'Maciej Krzysztofowicz',
          _id: 'fbae3b6f-7629-4661-8cbf-6f49b1653601',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.200Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.200Z',
          },
          tagType: 'person',
        },
      ],
      organisation: [],
      organisationProject: [],
      postImage2: {
        url: ' ',
        caption: '',
      },
      postContentRIch2:
        '<p><strong>Science for Policy Report </strong></p>\n<p>Based on a participatory foresight process, the Digital transition: Long-term implications for EU farmers and rural communities - report presents the outcomes of this exploration, proposing building blocks for an effective EU digital transition strategy for agriculture and rural areas supported by a hands-on policymaker’s toolkit.</p>\n<p><strong> Toolkit </strong></p>\n<p>The toolkit can help decision makers engage in strategic conversations about the implications of digital transition for farmers and rural communities. The tookit includes questions and activities to inform a digital strategy for agriculture and rural areas.The toolkit can help to:<br>Uncover key issues to reflect on when building a digitalisation vision and strategy.<br>Engage stakeholders to develop or improve the existing digital strategy.<br>Increase your anticipatory capacity and future-proof your digital transition strategy.<br>Learn more and <a href="https://knowledge4policy.ec.europa.eu/foresight/topic/digital-transition-toolkit_en" target="_blank"><strong>download the toolkit. </strong></a>&nbsp;</p>\n<p><strong>Interactive Vision Framework </strong></p>\n<p>The vision framework outlines the key elements that can support the digital transition of agriculture and rural areas.What is the purpose of digital transition from the perspectives of farmers and rural communities? Which values and principles should guide it? What are the enablers for the adoption and use of digital technologies? <a href="https://knowledge4policy.ec.europa.eu/visualisation/digital-transition-agriculture-rural-areas-vision-framework_en" target="_blank"><strong>Explore the interactive Vision Framework</strong></a>&nbsp;</p>\n',
      methods: [
        {
          popularity: 36,
          name: 'scenarios',
          _id: '3c4917d4-7467-4fef-a6a3-af7b61b9e196',
          _createdDate: {
            $date: '2024-08-27T09:48:24.946Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.946Z',
          },
          tagType: 'foresight method',
        },
        {
          name: 'Casual Layered Analysis',
          _id: '9ca11f1d-3d93-4275-8367-78608183ac74',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-28T11:15:04.559Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-28T11:15:04.559Z',
          },
          tagType: 'foresight method',
        },
      ],
      pageTypes: [
        {
          popularity: 35,
          name: 'project info',
          _id: 'fcb0cbbc-98a5-4743-8c8b-1cb1c8326a85',
          _createdDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          tagId: 252527,
          tagType: 'page type',
        },
      ],
      projectCoordinator: [],
      _id: '06533b42-679c-4fac-8c34-d9188b6d2b54',
      _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
      _createdDate: {
        $date: '2024-10-22T12:04:13.654Z',
      },
      organisationType: [],
      postContentRIch3: '<p></p>\n',
      domains: [
        {
          popularity: 22,
          name: 'digitalisation',
          _id: 'b5791a5e-8819-4afe-b69b-97aaed7f7565',
          _createdDate: {
            $date: '2024-08-27T09:48:25.099Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.099Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 29,
          trend: '3',
          name: 'Agriculture',
          _id: '2ceb4abf-2b73-4a2d-b2c3-4d4468d94f4a',
          _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
          _createdDate: {
            $date: '2024-08-27T09:48:25.118Z',
          },
          _updatedDate: {
            $date: '2024-10-15T10:52:22.337Z',
          },
          tagType: 'domain',
        },
      ],
      personOrganisationFormer: [],
      personProjectParticipation: [],
      postImage1: {
        url: 'https://static.wixstatic.com/media/471908_841914053ea94ff18b9dd9d8efbf806c~mv2.webp',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-28T12:24:20.225Z',
      },
      slug: 'long-term-implications-of-the-digital-transition-for-farmers-and-rural-communities-r55z7',
      mediaFiles: [
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      Project: [
        {
          name: 'Digital Transition',
          _id: '8d336e96-95a1-4aa3-b704-8a3366a096c3',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T12:03:40.097Z',
          },
          tagLine:
            'Long-Term Implications of the Digital Transition for Farmers and Rural Communities',
          _updatedDate: {
            $date: '2024-10-28T11:07:46.336Z',
          },
          tagType: 'project',
          tagPageLink:
            '/project/long-term-implications-of-the-digital-transition-for-farmers-and-rural-communities-r55z7',
        },
      ],
      projectOrganisationRoles: [
        {
          organisation: 'Policy Lab',
          role: 'Lead',
        },
        {
          organisation: 'DG AGRI',
          role: '',
        },
        {
          role: '',
        },
      ],
      projectOrganisation: [
        {
          popularity: 109,
          name: 'Policy Lab',
          _id: 'dccbb6dd-0eed-4e5e-98a9-2749ceafac12',
          _createdDate: {
            $date: '2024-08-27T09:48:24.785Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.785Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'DG AGRI',
          _id: '30d2e0c4-1170-47e1-9088-7ff680612f94',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-28T12:19:17.635Z',
          },
          tagLine: 'DG for Agriculture and Rural Development',
          _updatedDate: {
            $date: '2024-10-28T12:19:17.635Z',
          },
          tagType: 'organisation',
        },
      ],
      personProjectCoordonation: [],
      person: [],
      personOrganisation: [],
      postContentRIch1:
        '<p><strong>Project</strong></p>\n<p>Successfully managing the green and digital transitions is a crucial factor that could increase the resilience and strategic autonomy of the EU and shape its future. Yet the digitalisation of agriculture and rural areas raises vital questions about winners and losers, costs, benefits, and long-term implications.&nbsp;</p>\n<p>European Commission’s foresight project coordinated by <a href="https://policy-lab.ec.europa.eu/index_en" target="_blank">EU Policy Lab</a> together with the Department for Agriculture and Rural Development (AGRI) in 2023-2024 explored the interplay between digital transition, policies and the resilience of the agricultural sector and rural areas, against the backdrop of potential disruptive and transformative changes.&nbsp;</p>\n<p>The digital transition will occur in a rapidly changing world faced with climate change, environmental degradation, geopolitical instability, shifting supply networks, and evolving consumer demand. This study\'s foresight scenarios suggest that digitalisation can catalyse transformation, aiding in coping with shocks, knowledge acquisition, community building, and system-related thinking. But at the same time, it can also reinforce inequalities and introduce rigidities. Therefore, digitalisation support should aim to create sustainable food systems and robust, connected, and prosperous rural areas and communities.&nbsp;</p>\n<p>A sound digital transition strategy should promote agricultural and rural resilience, green transition, digital citizenship for farmers and communities, and overall well-being. Digitalisation should uphold values like trust, equality, power, sovereignty, and care. Its execution should prioritise collaboration, accessibility, people-centric design, and circularity. Key enablers for a successful digital transition include capacity building for digital skills, fostering a robust digital ecosystem, investing in infrastructure and connectivity, and securing sufficient funding.&nbsp;</p>\n<p>Read the <a href="https://policy-lab.ec.europa.eu/news/vision-support-digital-transition-agricultural-rural-communities-2023-07-19_en" target="_blank">blog post</a> to learn  more about the project.<br></p>\n',
      countryTag: [
        {
          name: 'EU',
          _id: 'e1b13728-5253-484b-92d6-0c451813adff',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T10:28:23.621Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-22T10:28:23.621Z',
          },
          tagType: 'country',
        },
      ],
      title: 'Digital Transition',
      internalLinks: [],
      organisationMemberOf: [],
      activity: [],
      projectFunded: [
        {
          popularity: 27,
          name: 'EU funded',
          _id: 'f80d06e4-b326-4364-b250-0afa1fc777f3',
          _createdDate: {
            $date: '2024-08-27T09:48:25.119Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.119Z',
          },
          tagType: 'project type',
        },
      ],
      organisationHasMember: [],
      organisationPeople: [],
    },
    _id: '06533b42-679c-4fac-8c34-d9188b6d2b54',
  },
  {
    dataCollectionId: 'InfoPages',
    data: {
      projectParticipantTeam: [
        {
          name: 'Totti Könnölä',
          _id: '4bc3a4f3-f901-4670-80bf-f25ddd26163b',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:38.990Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:38.990Z',
          },
          tagType: 'person',
        },
        {
          name: 'rosanna fornasiero',
          _id: '687c702c-c822-4808-a9ca-131411738705',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.159Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.159Z',
          },
          tagType: 'person',
        },
      ],
      organisation: [],
      organisationProject: [],
      postImage2: {
        url: ' ',
        caption: '',
      },
      postContentRIch2:
        '<p>The aims of this proposal are:<br>• To analyse social, economic and environmental changes and disruptions (including covid) and evaluate their impact on SCs, identifying related challenges in terms of relationship between countries, configuration of the network, impact on employment.</p>\n<p><br>• To study and propose a set of SC models for the evolution of global SC integrating strategies like resource efficient, closed-loop and humanitarian as a way to increase EU resilience and sustainability. Particular attention will be given to the role of digitalization as a way to establish new paths for social inclusion taking into consideration the needs of urban and rural areas. Some important European sectors like fashion, automotive, medical and machine tools will be analysed with case studies and survey.</p>\n<p><br>• To develop Innovative tools for monitoring and assessing sectoral trade patterns and defining mechanisms to evaluate relationship of disruptions like pandemic and global value chains taking into consideration impact on employment, economic growth, incomes etc also in the long term. Moreover, it will be analysed the impact of different trade patterns, on the EU value added of sectoral and countries with a specific focus on analyzing income inequalities and proposition of decent work and social cohesion. Particular attention will be gives to gender issues and social disparities.</p>\n<p><br>• To develop innovative policy scenarios with recommendations for future global value chains: policy scenarios will be based on Key horizontal issues impacting on several sectors and will provide recommendations for EU, national and sectoral strategies, policy measures and targeted actions aimed at shaping fair, inclusive and sustainable trade patterns, value and supply chains as well as production networks.</p>\n',
      methods: [
        {
          name: 'Policy scenarios',
          _id: '46852406-fd55-4a9a-8222-d91c3595110a',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T11:45:21.711Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-22T11:45:21.711Z',
          },
          tagType: 'foresight method',
        },
      ],
      pageTypes: [
        {
          popularity: 35,
          name: 'project info',
          _id: 'fcb0cbbc-98a5-4743-8c8b-1cb1c8326a85',
          _createdDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          tagId: 252527,
          tagType: 'page type',
        },
      ],
      projectCoordinator: [],
      _id: '8977e0da-4dc3-46be-8b94-d7c48bc3960e',
      _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
      _createdDate: {
        $date: '2024-10-22T11:43:02.716Z',
      },
      organisationType: [],
      postContentRIch3: '<p></p>\n',
      domains: [
        {
          popularity: 23,
          name: 'value chains',
          _id: '31c256c4-c887-4f25-bfba-31430aa41b57',
          _createdDate: {
            $date: '2024-08-27T09:48:25.058Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.058Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 22,
          name: 'digitalisation',
          _id: 'b5791a5e-8819-4afe-b69b-97aaed7f7565',
          _createdDate: {
            $date: '2024-08-27T09:48:25.099Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.099Z',
          },
          tagType: 'domain',
        },
      ],
      personOrganisationFormer: [],
      personProjectParticipation: [],
      postImage1: {
        url: 'https://static.wixstatic.com/media/471908_0026b57734484a9684fa7cf0e114ee67~mv2.webp',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-29T11:51:44.094Z',
      },
      slug: 'reshaping-supply-chains-for-a-positive-social-impact-nn65i',
      mediaFiles: [
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      projectEndDate: '2025-08-31T21:00:00.000Z',
      projectStartDate: '2022-09-30T21:00:00.000Z',
      Project: [
        {
          name: 'ReSChape ',
          _id: '96a77dca-6c54-4ef8-ae3f-46f3798edc2c',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T11:38:09.986Z',
          },
          tagLine: 'Reshaping Supply Chains for a Positive Social Impact',
          _updatedDate: {
            $date: '2024-10-28T10:58:21.362Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_9cb535f3a1aa498eb7154999541ebd2a~mv2.png',
          tagType: 'project',
          tagPageLink:
            '/project/reshaping-supply-chains-for-a-positive-social-impact-nn65i',
        },
      ],
      projectOrganisationRoles: [
        {
          organisation: 'Consiglio Nazionale delle Ricerche',
          role: 'Lead',
        },
        {
          organisation: 'Universita degli Studi di Padova',
          role: '',
        },
        {
          organisation: 'INESC TEC ',
          role: '',
        },
        {
          organisation: 'Fraunhofer',
          role: '',
        },
        {
          organisation: 'Fundacion Zaragoza Logistics Center',
          role: '',
        },
        {
          organisation: 'RWI',
          role: '',
        },
        {
          organisation: 'Universidad de la Iglesia de Deusto Entidad Religiosa',
          role: '',
        },
        {
          organisation: 'Technische Universiteit Eindhoven',
          role: '',
        },
        {
          organisation: 'Iris Technology Solutions Sociedad Limitada',
          role: '',
        },
        {
          organisation: 'Aston University',
          role: '',
        },
        {
          organisation: 'RWTH Aachen University',
          role: '',
        },
        {
          role: '',
        },
      ],
      projectOrganisation: [
        {
          name: 'Consiglio Nazionale delle Ricerche',
          _id: '8d9e6294-404a-432b-be15-2bacef51ab4e',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T16:38:34.536Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-22T16:38:34.536Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 22,
          name: 'Universita degli Studi di Padova',
          _id: 'b88aab34-d3f3-4485-86a3-acaa7f68f5b8',
          _createdDate: {
            $date: '2024-08-27T09:48:24.867Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.867Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'INESC TEC ',
          _id: 'ae50377f-3505-4c9a-9533-de657b0bcf05',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T16:42:43.792Z',
          },
          tagLine:
            'INESC TEC - Institute for Systems and Computer Engineering, Technology and Science',
          _updatedDate: {
            $date: '2024-10-29T11:58:49.591Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 14,
          tagline:
            'Fraunhofer Gesellschaft Zur Forderung Der Angewandten Forschung EV',
          name: 'Fraunhofer',
          _id: 'd4d28752-82da-493b-9075-edb3cad6afd4',
          _createdDate: {
            $date: '2024-08-27T09:48:24.830Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.830Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 10,
          name: 'Fundacion Zaragoza Logistics Center',
          _id: '5335be58-44c7-4c00-a18e-fab4dc17e924',
          _createdDate: {
            $date: '2024-08-27T09:48:24.800Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.800Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 88,
          tagline: 'Leibniz Institut fur Wirtschaftsforschung e.V.',
          name: 'RWI',
          _id: 'c57324ba-8a65-47a3-a5ba-a6d4b837556f',
          _createdDate: {
            $date: '2024-08-27T09:48:24.891Z',
          },
          linked: true,
          _updatedDate: {
            $date: '2024-08-27T09:48:24.891Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 107,
          name: 'Universidad de la Iglesia de Deusto Entidad Religiosa',
          _id: 'd436274c-b042-4ce7-b2f7-ee9c9d7eec60',
          _createdDate: {
            $date: '2024-08-27T09:48:24.865Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.865Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 104,
          name: 'Technische Universiteit Eindhoven',
          _id: 'eed1bcbc-80bf-4af9-bfc3-cac6e320663f',
          _createdDate: {
            $date: '2024-08-27T09:48:24.890Z',
          },
          linked: true,
          _updatedDate: {
            $date: '2024-08-27T09:48:24.890Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 58,
          name: 'Iris Technology Solutions Sociedad Limitada',
          _id: '6e643107-5b0e-4a85-acfc-69326654259b',
          _createdDate: {
            $date: '2024-08-27T09:48:24.824Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.824Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 45,
          name: 'Aston University',
          _id: '9a9be771-ac60-4743-8e69-d47188005903',
          _createdDate: {
            $date: '2024-08-27T09:48:24.881Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.881Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'RWTH Aachen University',
          _id: '55be1cf9-6552-4930-8a39-a99d6b778593',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-28T09:19:12.879Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-28T09:19:12.879Z',
          },
          tagType: 'organisation',
        },
      ],
      personProjectCoordonation: [],
      person: [],
      personOrganisation: [],
      postContentRIch1:
        '<p><br>As a result of the recent pandemic, global value chains have completely transformed. This has raised concerns over the ensuing social, economic and environmental trends and related impact on the way supply chains are organised. In this context, the <strong>EU-funded ReSChape project</strong> will analyse social, economic and environmental changes and disruptions, including the COVID-19 pandemic, and evaluate their impact on supply chains. New supply chain models will be proposed, aiming towards a more streamlined supply chain process to assure humans (workers, consumers and in general citizens) to be at the center of the business also thanks to new digital technologies. It will be studied how to <strong>assure a positive social impact</strong> and innovative policy scenarios will be developed with recommendations to support the future supply chains.</p>\n',
      countryTag: [],
      title: 'ReSChape ',
      internalLinks: [],
      organisationMemberOf: [],
      activity: [],
      projectFunded: [
        {
          popularity: 27,
          name: 'EU funded',
          _id: 'f80d06e4-b326-4364-b250-0afa1fc777f3',
          _createdDate: {
            $date: '2024-08-27T09:48:25.119Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.119Z',
          },
          tagType: 'project type',
        },
      ],
      organisationHasMember: [],
      organisationPeople: [],
    },
    _id: '8977e0da-4dc3-46be-8b94-d7c48bc3960e',
  },
  {
    dataCollectionId: 'InfoPages',
    data: {
      projectParticipantTeam: [
        {
          name: ' Matthew Spaniol',
          _id: '27bc640c-3c7d-4dbd-b5de-40a14abba514',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T11:00:26.519Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-22T11:00:26.519Z',
          },
          tagType: 'person',
        },
        {
          name: ' Rafael Popper',
          _id: 'aa760464-1e38-4169-90f9-d380ce688327',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T11:00:38.580Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-22T11:00:38.580Z',
          },
          tagType: 'person',
        },
        {
          name: ' Marco Bevolo',
          _id: '3d429552-e826-4d77-b3e9-832b3bd15281',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T11:00:53.229Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-22T11:00:53.229Z',
          },
          tagType: 'person',
        },
        {
          name: 'Joao Farinha',
          _id: '85737a3f-039a-438b-8ab9-d1b8f6cba4cf',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.012Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.012Z',
          },
          tagType: 'person',
        },
        {
          name: ' Lucia Vesnic-Alujevic',
          _id: 'c666d5d0-e20d-4c21-9e9b-ed16b197c869',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T11:01:16.051Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-22T11:01:16.051Z',
          },
          tagType: 'person',
        },
        {
          name: 'António Alvarenga',
          _id: 'f030877c-cd1e-41a8-a5d5-3880596b38de',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.074Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.074Z',
          },
          tagType: 'person',
        },
      ],
      organisation: [],
      organisationProject: [],
      postImage2: {
        url: ' ',
        caption: '',
      },
      postContentRIch2:
        '<p><strong>Scanning deep tech horizons: Participatory collection and assessment of signals and trends </strong></p>\n<p>The Joint Research Centre (JRC) and the European Innovation Council (EIC) conducted a series of Horizon Scanning exercises across six EIC programme managers’ (PM) portfolios as part of an ongoing collaborative effort to strengthen EIC strategic intelligence capacity through the use and development of anticipatory approaches. The fields covered include: Space Systems &amp; Technologies; Quantum Technologies; Agriculture &amp; Food; Solar Fuels &amp; Chemicals; Responsible Electronics and Architecture, Engineering &amp; Construction. The main findings of this Horizon Scanning – the identification and analysis of ‘signals’ from nascent research, technologies, or trends on the periphery of the mainstream – show opportunities for investment in emerging technologies and breakthrough innovations that can advance EU competitiveness while also serving to support the EU’s long-term policy and societal visions.Other insights were taken from this exercise, namely the identification of drivers, enablers and barriers to technology development and adoption, that could be the starting ground of further foresight exercises and policy initiatives. The report highlights three main themes – sustainability, energy, and scalability, which are overarching across signals, drivers, enablers and barriers. And concludes with a series of recommendations to streamline Horizon Scanning activities in the specific context and needs of the EIC.&nbsp;</p>\n<p>Read EU Policy Lab  blog post: <a href="https://policy-lab.ec.europa.eu/news/technology-foresight-anticipating-innovations-tomorrow-2023-05-26_en" target="_blank"><em>Technology foresight: anticipating the innovations of tomorrow</em></a>&nbsp;</p>\n<p></p>\n<p><strong>Technology Foresight for Public Funding of Innovation: Methods and Best Practices</strong></p>\n<p>&nbsp;In times of growing uncertainties and complexities, anticipatory thinking is essential for policymakers<strong>. </strong>Technology foresight explores the longer-term futures of Science, Technology and Innovation. It can be used as a tool to create effective policy responses, including in technology and innovation policies, and to shape technological change. In this report we present six anticipatory and technology foresight methods that can contribute to anticipatory intelligence in terms of public funding of innovation: the Delphi survey, genius forecasting, technology roadmapping, large language models used in foresight, horizon scanning and scenario planning. Each chapter provides a brief overview of the method with case studies and recommendations.The insights from this report show that only by combining different anticipatory viewpoints and approaches to spotting, understanding and shaping emergent technologies, can public funders such as the European Innovation Council improve their proactive approaches to supporting ground-breaking technologies. In this way, they will help innovation ecosystems to develop.&nbsp;</p>\n<p></p>\n',
      methods: [
        {
          popularity: 47,
          name: 'horizon scanning',
          _id: 'b1d63812-7f03-4fa0-bfc7-b8d89363baa8',
          _createdDate: {
            $date: '2024-08-27T09:48:24.957Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.957Z',
          },
          tagType: 'foresight method',
        },
        {
          popularity: 39,
          trend: '9',
          name: 'Delphi',
          _id: '5debdc5d-652a-4130-a24b-49a3ec66ee66',
          _createdDate: {
            $date: '2024-08-27T09:48:24.966Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.966Z',
          },
          tagType: 'foresight method',
        },
        {
          name: 'Forecasting',
          _id: '5347877d-db51-45ad-8d2e-5d11f9a5f7c5',
          _owner: '41128e88-b88d-4244-96c8-af3a68b16ac3',
          _createdDate: {
            $date: '2024-10-30T11:28:09.165Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T11:28:09.165Z',
          },
          tagType: 'foresight method',
        },
        {
          name: 'Technology Roadmapping',
          _id: 'f8964bce-35ee-4ee6-89f0-6e4dd3a290d8',
          _owner: '41128e88-b88d-4244-96c8-af3a68b16ac3',
          _createdDate: {
            $date: '2024-10-30T11:28:30.993Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T11:28:30.993Z',
          },
          tagType: 'foresight method',
        },
        {
          popularity: 36,
          name: 'scenarios',
          _id: '3c4917d4-7467-4fef-a6a3-af7b61b9e196',
          _createdDate: {
            $date: '2024-08-27T09:48:24.946Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.946Z',
          },
          tagType: 'foresight method',
        },
      ],
      pageTypes: [
        {
          popularity: 35,
          name: 'project info',
          _id: 'fcb0cbbc-98a5-4743-8c8b-1cb1c8326a85',
          _createdDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          tagId: 252527,
          tagType: 'page type',
        },
      ],
      projectCoordinator: [],
      _id: '780bed80-95f8-4c16-8455-dcb757f91ff6',
      _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
      _createdDate: {
        $date: '2024-10-22T11:26:19.250Z',
      },
      organisationType: [],
      postContentRIch3: '<p></p>\n',
      domains: [
        {
          name: 'Emerging Technologies',
          _id: '414e11bd-1c1c-4d88-b63e-f24a3b2c711a',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T10:37:07.120Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-22T10:37:07.120Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 67,
          name: 'EU R&I policy',
          _id: '74f1a07e-9754-4e06-9091-30d0d7d4e667',
          _createdDate: {
            $date: '2024-08-27T09:48:25.091Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.091Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 26,
          name: 'sustainability',
          _id: 'b5ca1e23-5548-4d91-adfe-eeb08f2062a6',
          _createdDate: {
            $date: '2024-08-27T09:48:25.063Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.063Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 18,
          name: 'energy',
          _id: '160f556b-6e6f-4957-a2b6-12a30f8a2d58',
          _createdDate: {
            $date: '2024-08-27T09:48:25.093Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.093Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 29,
          trend: '3',
          name: 'Agriculture',
          _id: '2ceb4abf-2b73-4a2d-b2c3-4d4468d94f4a',
          _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
          _createdDate: {
            $date: '2024-08-27T09:48:25.118Z',
          },
          _updatedDate: {
            $date: '2024-10-15T10:52:22.337Z',
          },
          tagType: 'domain',
        },
        {
          name: 'Space',
          _id: '9e022f69-5983-42e3-8646-a3c3f8696374',
          _owner: '41128e88-b88d-4244-96c8-af3a68b16ac3',
          _createdDate: {
            $date: '2024-10-30T11:29:48.223Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T11:29:48.223Z',
          },
          tagType: 'domain',
        },
        {
          name: 'Quantum Technologies',
          _id: '0b24717d-0d3a-4e74-94cd-138356cd50b9',
          _owner: '41128e88-b88d-4244-96c8-af3a68b16ac3',
          _createdDate: {
            $date: '2024-10-30T11:30:13.302Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T11:30:13.302Z',
          },
          tagType: 'domain',
        },
        {
          name: 'Electronics',
          _id: '0fe6fdd7-847e-47f1-babf-0e674d7fb5e7',
          _owner: '41128e88-b88d-4244-96c8-af3a68b16ac3',
          _createdDate: {
            $date: '2024-10-30T11:30:45.757Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T11:30:45.757Z',
          },
          tagType: 'domain',
        },
        {
          name: 'Engineering',
          _id: '6f5e327f-0f1e-4995-8932-f941bfeaa520',
          _owner: '41128e88-b88d-4244-96c8-af3a68b16ac3',
          _createdDate: {
            $date: '2024-10-30T11:31:19.531Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T11:31:19.531Z',
          },
          tagType: 'domain',
        },
      ],
      personOrganisationFormer: [],
      personProjectParticipation: [],
      postImage1: {
        url: 'https://static.wixstatic.com/media/471908_4ce1f19ebeb54f6b962275654ea49fef~mv2.webp',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-30T11:37:00.069Z',
      },
      slug: 'anticipation-and-monitoring-of-emerging-technologies-and-disruptive-innovation-p8vkw',
      mediaFiles: [
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      projectEndDate: '2024-11-30T22:00:00.000Z',
      projectStartDate: '2021-12-31T22:00:00.000Z',
      Project: [
        {
          name: 'ANTICIPINNOV',
          _id: '3eeaee95-a2fa-42df-9d39-dcdde8b934e1',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T11:17:22.221Z',
          },
          tagLine:
            'Anticipation and monitoring of emerging technologies and disruptive innovation',
          _updatedDate: {
            $date: '2024-10-23T12:46:42.996Z',
          },
          tagType: 'project',
          tagPageLink:
            '/project/anticipation-and-monitoring-of-emerging-technologies-and-disruptive-innovation-p8vkw',
        },
      ],
      projectOrganisationRoles: [
        {
          role: '',
        },
      ],
      projectOrganisation: [],
      personProjectCoordonation: [],
      person: [],
      personOrganisation: [],
      postContentRIch1:
        '<p>Anticipatin and monitoring of emerging technologies and disruptive innovation (ANTICIPINNOV) project is a collaboration between the European Commission Joint Research Centre (JRC) with the European Innovation Council (EIC) 2023-2024 to strengthen strategic intelligence capacity through the use and development of anticipatory approaches. Learn more about the project from its\'s three different branches.&nbsp;</p>\n<p><strong>Everybody is looking into the Future! A literature review of reports on emerging technologies and disruptive innovation </strong></p>\n<p>Growing volatility, uncertainty, complexity and ambiguity, present leading challenges in policy-making nowadays. Anticipatory thinking and foresight are of utmost importance to help explore trends, risks, emerging issues, and their potential implications and opportunities in order to draw useful insights for strategic planning, policy-making and preparedness. The findings include a set of 106 signals and trends on emerging technologies and disruptive innovations across several areas of application based on a review of key reports on technology and innovation trends and signals produced by public and private entities outside of the EU institutions. Its goal is to strengthen the EIC’s strategic intelligence capacity through the use and development of anticipatory approaches that will - among other goals – support innovation funding prioritisation. Other insights were extracted, namely those related with the scope of the EIC Programme Manager portfolios.&nbsp;</p>\n<p>Read EU Policy Lab  blog post :<a href="https://policy-lab.ec.europa.eu/news/everybody-looking-future-technology-foresight-perspective-2023-10-10_en" target="_blank"><em>Everybody is looking into the future: a technology foresight perspective</em></a>&nbsp;</p>\n',
      countryTag: [
        {
          name: 'EU',
          _id: 'e1b13728-5253-484b-92d6-0c451813adff',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T10:28:23.621Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-22T10:28:23.621Z',
          },
          tagType: 'country',
        },
      ],
      title: 'ANTICIPINNOV',
      internalLinks: [],
      organisationMemberOf: [],
      activity: [],
      projectFunded: [
        {
          popularity: 27,
          name: 'EU funded',
          _id: 'f80d06e4-b326-4364-b250-0afa1fc777f3',
          _createdDate: {
            $date: '2024-08-27T09:48:25.119Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.119Z',
          },
          tagType: 'project type',
        },
      ],
      organisationHasMember: [],
      organisationPeople: [],
    },
    _id: '780bed80-95f8-4c16-8455-dcb757f91ff6',
  },
  {
    dataCollectionId: 'InfoPages',
    data: {
      projectParticipantTeam: [
        {
          name: 'Erica Bol',
          _id: 'e8e5c580-f90e-4edc-bfc3-152d2614a4c8',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:38.902Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:38.902Z',
          },
          tagType: 'person',
        },
        {
          name: 'Maciej Krzysztofowicz',
          _id: 'fbae3b6f-7629-4661-8cbf-6f49b1653601',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.200Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.200Z',
          },
          tagType: 'person',
        },
        {
          name: 'Elahe Rajabiani',
          _id: 'e4fc8353-3ded-4d5b-95ca-6b4594f66100',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-30T10:55:14.670Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T10:55:14.670Z',
          },
          tagType: 'person',
        },
        {
          name: 'Radu Gheorghiu',
          _id: '79e69062-1f22-4acd-bd5c-b4b0f17a3dad',
          _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
          _createdDate: {
            $date: '2024-10-15T09:06:25.839Z',
          },
          _updatedDate: {
            $date: '2024-10-15T09:06:25.839Z',
          },
          tagType: 'person',
        },
        {
          name: 'Bianca Dragomir',
          _id: '90c38dc0-018b-4d55-af76-e2b52130e029',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.344Z',
          },
          tagLine: 'Live deeply and tenderly',
          _updatedDate: {
            $date: '2024-10-14T18:29:46.298Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_957ec9dc2bb74b97b6166aab1d9d0840~mv2.jpg',
          tagType: 'person',
          tagPageLink: '/person/Bianca_Dragomir_q437h',
        },
        {
          name: 'Wenzel Mehnert',
          _id: 'dd9f9585-cf78-4878-8689-83bf270b5c25',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.064Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.064Z',
          },
          tagType: 'person',
        },
        {
          name: 'Tanja Schindler',
          _id: '257a5d59-0e45-4a4d-920e-914266f0b86b',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.328Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.328Z',
          },
          tagType: 'person',
        },
        {
          name: 'Aaron Rosa',
          _id: '3dab2841-4c4b-4d32-b4bf-308663e77bfb',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-30T10:54:01.231Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T10:54:01.231Z',
          },
          tagType: 'person',
        },
      ],
      organisation: [],
      organisationProject: [],
      postImage2: {
        url: 'https://static.wixstatic.com/media/471908_45e813bb837640b8b9623daa4a3a8ae2~mv2.png',
        caption: '',
      },
      postContentRIch2: '<p></p>\n',
      methods: [
        {
          popularity: 47,
          name: 'horizon scanning',
          _id: 'b1d63812-7f03-4fa0-bfc7-b8d89363baa8',
          _createdDate: {
            $date: '2024-08-27T09:48:24.957Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.957Z',
          },
          tagType: 'foresight method',
        },
        {
          name: 'Speculative design',
          _id: '6cffa4fa-0c42-4736-a303-303f925373db',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-21T20:51:05.923Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-21T20:51:05.923Z',
          },
          tagType: 'foresight method',
        },
      ],
      pageTypes: [
        {
          popularity: 35,
          name: 'project info',
          _id: 'fcb0cbbc-98a5-4743-8c8b-1cb1c8326a85',
          _createdDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          tagId: 252527,
          tagType: 'page type',
        },
      ],
      projectCoordinator: [],
      _id: 'c1ee9ea1-cb02-47f9-a3f7-cac7ad954059',
      _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
      _createdDate: {
        $date: '2024-10-21T20:51:39.821Z',
      },
      organisationType: [],
      postContentRIch3: '<p></p>\n',
      domains: [
        {
          popularity: 33,
          name: 'human connection',
          _id: 'c7b5dbd7-68b7-4531-a1f7-cd31e58e0a59',
          _createdDate: {
            $date: '2024-08-27T09:48:25.082Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.082Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 35,
          name: 'connection to nature',
          _id: '0e7fb0ef-1f7b-4417-9032-dca0dc78ae0f',
          _createdDate: {
            $date: '2024-08-27T09:48:25.105Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.105Z',
          },
          tagType: 'domain',
        },
      ],
      personOrganisationFormer: [],
      personProjectParticipation: [],
      postImage1: {
        url: 'https://static.wixstatic.com/media/471908_4bde82fd63254a6a95561068a087228a~mv2.png',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-30T11:06:42.037Z',
      },
      slug: 'Futures_Garden_bzm8d',
      mediaFiles: [
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      postContentRIch4: '<p></p>\n',
      projectEndDate: '2023-11-30T22:00:00.000Z',
      projectStartDate: '2023-02-28T22:00:00.000Z',
      Project: [
        {
          name: 'Futures Garden',
          _id: '8f7b4246-c936-44df-8e48-acdfd342dccf',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-21T20:36:57.587Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-21T20:51:43.951Z',
          },
          tagType: 'project',
          tagPageLink: '/project/Futures_Garden_bzm8d',
        },
      ],
      projectOrganisationRoles: [
        {
          organisation: 'Joint Research Center',
          role: 'Initiator',
        },
        {
          organisation: 'DG RTD',
          role: 'Commissioned by',
        },
        {
          organisation: 'Prospectiva',
          role: 'Lead of pilot project',
        },
        {
          organisation: 'Austrian Institute of Technology',
          role: '',
        },
        {
          organisation: 'Fraunhofer ISI',
          role: '',
        },
        {
          organisation: 'Futures2all',
          role: '',
        },
        {
          organisation: 'Futurlab',
          role: '',
        },
        {
          organisation: 'Normals',
          role: '',
        },
        {
          organisation: 'Modem',
          role: '',
        },
        {
          role: '',
        },
      ],
      projectOrganisation: [
        {
          popularity: 50,
          name: 'Joint Research Center',
          _id: 'f85b3c01-69e8-4688-8766-14c3910bea1b',
          _createdDate: {
            $date: '2024-08-27T09:48:24.871Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.871Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'DG RTD',
          _id: '7be555b9-5274-4e4f-b733-64969fdf8781',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-28T20:39:19.424Z',
          },
          tagLine:
            'Directorate-General for Research and Innovation of the European Commission',
          _updatedDate: {
            $date: '2024-10-28T20:39:19.424Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'Prospectiva',
          _id: '0a40b56c-b3ce-464f-9373-39d01bfdb09c',
          _owner: '4e87a317-884a-4be5-a4f2-a9a8cd641be3',
          _createdDate: {
            $date: '2024-10-14T10:49:49Z',
          },
          tagLine: 'Institutul de Prospectiva',
          _updatedDate: {
            $date: '2024-10-15T08:48:03.231Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_d73eb310112b41cb81a61667a4cc7421~mv2.png',
          tagType: 'organisation',
          tagPageLink: '/organisation/Prospectiva_fiw2n',
        },
        {
          name: 'Austrian Institute of Technology',
          _id: 'e425fce1-879a-42b8-b154-b5590cb1cd71',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-21T18:09:57.361Z',
          },
          tagLine: 'AIT',
          _updatedDate: {
            $date: '2024-10-21T18:09:57.361Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 106,
          name: 'Fraunhofer ISI',
          _id: 'b83286d1-5153-4efa-b694-e1828ca61739',
          _createdDate: {
            $date: '2024-08-27T09:48:24.829Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.829Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 119,
          name: 'Futures2all',
          _id: 'dfff2889-0a38-45a5-8e25-8c08deca0f92',
          _createdDate: {
            $date: '2024-08-27T09:48:24.848Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.848Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 5,
          name: 'Futurlab',
          _id: 'f1c95512-8031-479d-8aab-063b21fb7663',
          _createdDate: {
            $date: '2024-08-27T09:48:24.879Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.879Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 96,
          name: 'Normals',
          _id: '24c6b00f-cde2-49a3-bcf0-b318f6b4ce55',
          _createdDate: {
            $date: '2024-08-27T09:48:24.857Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.857Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 99,
          name: 'Modem',
          _id: '144f9bb3-9158-4436-a0f9-32be481777eb',
          _createdDate: {
            $date: '2024-08-27T09:48:24.817Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.817Z',
          },
          tagType: 'organisation',
        },
      ],
      personProjectCoordonation: [],
      person: [],
      personOrganisation: [],
      postContentRIch1:
        '<p><strong>Futures Garden: Pioneering Policy Innovation through Speculative Design</strong></p>\n<p>At Futures Garden, we embark on a visionary journey to redefine policy-making for Europe\'s future. Our unique platform collaborates with leading futurists, innovative designers, and engaged EU citizens to envision a Europe enriched by diverse potential futures, each with its own opportunities and challenges. Our mission? To revolutionize policy creation by intertwining speculative design with creativity, empathy, and analytical insight. Our four-step approach ensures a comprehensive and impactful exploration:</p>\n<ul>\n<li><strong>Horizon Scanning</strong>: We dive into cutting-edge ideas and emerging trends, identifying opportunities that could shape Europe\'s future.</li>\n<li><strong>Speculative Design</strong>: Our creative process transforms abstract concepts into tangible, thought-provoking scenarios, making future possibilities more accessible and engaging.</li>\n<li><strong>Citizen Engagement</strong>: We delve into the societal implications of these speculative scenarios, gathering diverse perspectives and insights from EU citizens.</li>\n<li><strong>Policy Reflection</strong>: The final step involves analyzing the potential impact of these innovative ideas on policy-making, ensuring that future EU policies are forward-thinking, inclusive, and impactful.<br></li>\n</ul>\n<p><strong>Creating fictional artifacts through speculative design</strong><br></p>\n<p>Futures Garden aims at creating inspiring alternative future scenarios through the use of fictional future artifacts that invite to reflection and debate. The pilot project took place in 2023 and addressed two themes:</p>\n<ul>\n<li><strong>“Dealing with future selves”</strong> explores new ways of being, individually and collectively, examines new practices and technologies that enhance self-reflection and sharing of emotions, which help shape our choices in life and nurture a renewed sense of togetherness.</li>\n<li><strong>“Extending human perception to new scales”</strong> explores the richness of non-human intelligences, expanding our attention and appreciation for their unique sensory worlds, their “umwelt” – what they “feel” and how they “think”. In doing so it departs from the human-centric worldview towards a deeper understanding and celebration of life on Earth.</li>\n</ul>\n<p>The resulting fictional artifacts took the form of short, thought-provoking movies – <strong><em>Inwards</em></strong> and <strong><em>Symbiotic</em></strong> – which render the imagined future scenarios more tangible, immersive and engaging.&nbsp;&nbsp;</p>\n<p><a href="https://www.futuresgarden.eu/artefacts/inwards" target="_blank"><strong>Watch </strong><strong><em>"Inwards"</em></strong> </a> - <em>The 2050s a re a time of deep social reconfiguration. No longer believing in the myth of perpetual economic growth, recipes for self-empowerment, and technological fixes, citizens of Europe seek to regain agency by turning inwards.</em><br><em>New cultures of emotional excellence and material minimalism emerge, supported by tools for assisted introspection and emotion sharing. In the wake of this quiet revolution, the social contract progressively integrates a renewed sense of togetherness. </em><br><br><a href="https://www.futuresgarden.eu/artefacts/symbiotic" target="_blank"><strong>Watch </strong><strong><em>"Symbiotic</em></strong></a><strong><em>"</em></strong>  - <em>Set in  the Symbiocene era of the 2050s, a time marked by an expanded understanding of intelligence beyond human confines, Symbiotic explores a revolutionary breakthrough. Scientists have created a device that allows humans to experience the perceptions and sensory worlds of other intelligent beings, immersing them in the \'umwelt\' of these creatures. This film documents the first groundbreaking experiences through the device, capturing the profound experiences of those who ventured into these new realms of intelligence.</em></p>\n<p></p>\n',
      countryTag: [],
      title: 'Futures Garden',
      internalLinks: [],
      organisationMemberOf: [],
      activity: [],
      projectFunded: [
        {
          popularity: 27,
          name: 'EU funded',
          _id: 'f80d06e4-b326-4364-b250-0afa1fc777f3',
          _createdDate: {
            $date: '2024-08-27T09:48:25.119Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.119Z',
          },
          tagType: 'project type',
        },
      ],
      organisationHasMember: [],
      postImage3: {
        url: ' ',
        caption: '',
      },
      organisationPeople: [],
    },
    _id: 'c1ee9ea1-cb02-47f9-a3f7-cac7ad954059',
  },
  {
    dataCollectionId: 'InfoPages',
    data: {
      projectParticipantTeam: [
        {
          name: 'Matthias Weber',
          _id: 'b2da7e9b-60e0-4b13-853e-be09bf09b96a',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.203Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.203Z',
          },
          tagType: 'person',
        },
        {
          name: 'Dana Wasserbacher',
          _id: '8789f421-e784-48fa-a8ad-e877e00d9e7f',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.084Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.084Z',
          },
          tagType: 'person',
        },
        {
          name: 'Susanne Giesecke',
          _id: 'e0e6a5ef-ae5b-46e6-8e95-71c625b7f4c2',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.235Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.235Z',
          },
          tagType: 'person',
        },
        {
          name: 'Bianca Dragomir',
          _id: '90c38dc0-018b-4d55-af76-e2b52130e029',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.344Z',
          },
          tagLine: 'Live deeply and tenderly',
          _updatedDate: {
            $date: '2024-10-14T18:29:46.298Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_957ec9dc2bb74b97b6166aab1d9d0840~mv2.jpg',
          tagType: 'person',
          tagPageLink: '/person/Bianca_Dragomir_q437h',
        },
        {
          name: 'Radu Gheorghiu',
          _id: '79e69062-1f22-4acd-bd5c-b4b0f17a3dad',
          _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
          _createdDate: {
            $date: '2024-10-15T09:06:25.839Z',
          },
          _updatedDate: {
            $date: '2024-10-15T09:06:25.839Z',
          },
          tagType: 'person',
        },
        {
          name: 'Ulli Lorenz',
          _id: '28df7a1a-e2c0-49f3-a5e6-957b64a92fd6',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.018Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.018Z',
          },
          tagType: 'person',
        },
        {
          name: 'Attila Havas',
          _id: '75786c5d-3536-4dea-ad7a-2dee4b7ea2ff',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:38.965Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:38.965Z',
          },
          tagType: 'person',
        },
        {
          name: 'kerstin.cuhls',
          _id: 'd370618b-7a98-4073-b4db-8fcfaae2da0e',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.188Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.188Z',
          },
          tagType: 'person',
        },
      ],
      organisation: [],
      organisationProject: [],
      postContentRIch2: '<p></p>\n',
      methods: [
        {
          popularity: 39,
          trend: '9',
          name: 'Delphi',
          _id: '5debdc5d-652a-4130-a24b-49a3ec66ee66',
          _createdDate: {
            $date: '2024-08-27T09:48:24.966Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.966Z',
          },
          tagType: 'foresight method',
        },
        {
          popularity: 36,
          name: 'scenarios',
          _id: '3c4917d4-7467-4fef-a6a3-af7b61b9e196',
          _createdDate: {
            $date: '2024-08-27T09:48:24.946Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.946Z',
          },
          tagType: 'foresight method',
        },
      ],
      pageTypes: [
        {
          popularity: 35,
          name: 'project info',
          _id: 'fcb0cbbc-98a5-4743-8c8b-1cb1c8326a85',
          _createdDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          tagId: 252527,
          tagType: 'page type',
        },
      ],
      projectCoordinator: [],
      _id: '1d38c642-f5e7-4a65-a455-8f9d2af765f7',
      _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
      _createdDate: {
        $date: '2024-10-21T20:01:07.210Z',
      },
      organisationType: [],
      domains: [
        {
          popularity: 67,
          name: 'EU R&I policy',
          _id: '74f1a07e-9754-4e06-9091-30d0d7d4e667',
          _createdDate: {
            $date: '2024-08-27T09:48:25.091Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.091Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 47,
          name: 'climate change',
          _id: '21181beb-717e-44c5-aa42-1497a9ab763c',
          _createdDate: {
            $date: '2024-08-27T09:48:25.108Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.108Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 40,
          name: 'hydrogen',
          _id: '962519e8-b820-4294-9262-7baa3aeb8646',
          _createdDate: {
            $date: '2024-08-27T09:48:25.081Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.081Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 27,
          name: 'geopolitics',
          _id: '504908e9-94ee-41de-b2c3-4351b6152e0b',
          _createdDate: {
            $date: '2024-08-27T09:48:25.087Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.087Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 70,
          name: 'criminality',
          _id: '819e4d3d-141b-4b05-8996-140308fb0db8',
          _createdDate: {
            $date: '2024-08-27T09:48:25.104Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.104Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 14,
          name: 'health',
          _id: '255f22bd-fa84-4b93-a1f3-df2944b48ffa',
          _createdDate: {
            $date: '2024-08-27T09:48:25.084Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.084Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 61,
          name: 'social confrontations',
          _id: '1d88c662-cc0a-4040-ad40-31b82e8fc648',
          _createdDate: {
            $date: '2024-08-27T09:48:25.066Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.066Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 34,
          name: 'AI',
          _id: 'cb0ba433-0940-4397-bce8-680c9229cbfb',
          _createdDate: {
            $date: '2024-08-27T09:48:25.116Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.116Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 43,
          name: 'transhumanism',
          _id: '4369e526-6267-4afc-a73c-af45bf2ef9e0',
          _createdDate: {
            $date: '2024-08-27T09:48:25.060Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.060Z',
          },
          tagType: 'domain',
        },
      ],
      personOrganisationFormer: [],
      personProjectParticipation: [],
      postImage1: {
        url: ' ',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-30T15:55:02.782Z',
      },
      slug: 'Foresight_towards_the_2nd_Strategic_Plan_for_Horizon_Europe_bzq9u',
      mediaFiles: [
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      projectEndDate: '2023-05-31T21:00:00.000Z',
      projectStartDate: '2021-06-30T21:00:00.000Z',
      Project: [
        {
          name: 'Foresight towards the 2nd Strategic Plan for Horizon Europe',
          _id: 'b853a2cf-94b7-40b5-bb70-ee2a2dd53ce8',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-14T18:33:00.732Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T15:55:02.077Z',
          },
          tagType: 'project',
          tagPageLink:
            '/project/Foresight_towards_the_2nd_Strategic_Plan_for_Horizon_Europe_bzq9u',
        },
      ],
      projectOrganisationRoles: [
        {
          organisation: 'Austrian Institute of Technology',
          role: '',
        },
        {
          organisation: 'IFI',
          role: '',
        },
        {
          organisation: 'Fraunhofer ISI',
          role: '',
        },
        {
          organisation: 'ISINNOVA',
          role: '',
        },
        {
          organisation: 'Prospectiva',
          role: '',
        },
        {
          organisation: 'Technopolis',
          role: '',
        },
        {
          organisation: '4strat',
          role: '',
        },
        {
          organisation: 'ARCTIK SRL',
          role: '',
        },
        {
          role: '',
        },
      ],
      projectOrganisation: [
        {
          name: 'Austrian Institute of Technology',
          _id: 'e425fce1-879a-42b8-b154-b5590cb1cd71',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-21T18:09:57.361Z',
          },
          tagLine: 'AIT',
          _updatedDate: {
            $date: '2024-10-21T18:09:57.361Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 30,
          tagline: 'Insight Foresight Institute SL',
          name: 'IFI',
          _id: '76749d48-09c7-4023-9741-baacc42ab6fc',
          _createdDate: {
            $date: '2024-08-27T09:48:24.811Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.811Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 106,
          name: 'Fraunhofer ISI',
          _id: 'b83286d1-5153-4efa-b694-e1828ca61739',
          _createdDate: {
            $date: '2024-08-27T09:48:24.829Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.829Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'ISINNOVA',
          _id: 'd3fb10bb-0c2b-4902-b677-d43970198c35',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-19T17:25:16.424Z',
          },
          tagLine: 'Institute of Studies for the Integration of Systems',
          _updatedDate: {
            $date: '2024-10-19T17:25:16.424Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'Prospectiva',
          _id: '0a40b56c-b3ce-464f-9373-39d01bfdb09c',
          _owner: '4e87a317-884a-4be5-a4f2-a9a8cd641be3',
          _createdDate: {
            $date: '2024-10-14T10:49:49Z',
          },
          tagLine: 'Institutul de Prospectiva',
          _updatedDate: {
            $date: '2024-10-15T08:48:03.231Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_d73eb310112b41cb81a61667a4cc7421~mv2.png',
          tagType: 'organisation',
          tagPageLink: '/organisation/Prospectiva_fiw2n',
        },
        {
          popularity: 76,
          name: 'Technopolis',
          _id: 'dadcf68f-2f7e-44ae-a10e-d53e570c225a',
          _createdDate: {
            $date: '2024-08-27T09:48:24.803Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.803Z',
          },
          tagType: 'organisation',
        },
        {
          name: '4strat',
          _id: '3e0b1108-7d7c-412b-a02f-1573ec4a5d2f',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-15T08:46:04.126Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-15T08:46:04.126Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 115,
          name: 'ARCTIK SRL',
          _id: '4ba5956d-b12b-4f95-813e-7a480bb36ab4',
          _createdDate: {
            $date: '2024-08-27T09:48:24.864Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.864Z',
          },
          tagType: 'organisation',
        },
      ],
      personProjectCoordonation: [],
      person: [],
      personOrganisation: [],
      postContentRIch1:
        '<p>This foresight study aimed at supporting the development of the Strategic Plan of Horizon Europe (2025-2027), by providing early-stage strategic intelligence and sense-making that could contribute novel elements to the processes of strategic planning.</p>\n<p>The study, which was launched in mid-2021 and lasted almost two years, has been the most widely engaging foresight exercise yet aiming to support EU R&amp;I policy. Through this broad engagement, the study did not only develop intelligence for the 2nd Strategic Plan of Horizon Europe but also contributed to the development of an EU R&amp;I foresight community hosted by futures4europe.eu, one that is an asset for future R&amp;I policies across Europe.</p>\n<p>The foresight process in support of the 2nd Strategic Plan comprised a wide spectrum of activities:</p>\n<ul>\n<li>As a reference point for the exploratory work, the explicit and implicit impact assumptions of the 1st Strategic Plan were identified and visualised with the help of a qualitative system analysis and modelling tool for causal loop analysis.<br><br></li>\n<li>An exploratory analysis of forward-looking sources (e.g. foresight reports, web-based horizon scanning) was conducted to identify relevant trends and signals of unexpected developments. These were discussed in online workshops and on the online platform futures4europe.eu.<br><br></li>\n<li>An outlook on emerging developments in the global and European context of EU R&amp;I policy was developed drawing on a major online workshop in autumn 2021 with some 60 participants, experts and policy makers, who worked with multi-level context scenarios and specific context narratives about emerging disruptions.<br><br></li>\n<li>On that basis and in close consultation with the European Commission involving another major workshop in February 2022 which brought together 80 participants, Expert Teams were set up to develop disruptive scenarios in five areas of major interest. Each team ran several internal workshops but also involved further experts and Commission staff in their work, both through the online platform and through a final policy-oriented workshop. The foresight work within the five areas of interest resulted in deep dives on the following topics:<br>&gt; <em>Climate change, Research, and Innovation: Radical Options from Social Change to Geoengineering</em><br>&gt; <em>Hydrogen Economy – A radical alternative</em><br>&gt; <em>The EU in a Volatile New World - The challenge of global leadership</em> <br>&gt; <em>Global Commons</em><br>&gt; <em>Transhumanist Revolutions</em><br><br></li>\n<li>Further areas of interest identified were explored through review papers aiming to capture major trends, developments and scenario sketches in relation to further disruptive developments:<br>    &gt; <em>Social Confrontations</em><br>    &gt; <em>Artificial General Intelligence: Issues and Opportunities</em><br>    &gt; <em>The Interpenetration of Criminal and Lawful Economic Activities </em><br>    &gt; <em>The Future of Health</em><br><br></li>\n<li>A third major workshop took place in October 2022 bringing together all the thematic strands of work and addressing possible R&amp;I policy implications from this work. Participation in this workshop reached 250 individuals over 2 days.<br><br></li>\n<li>Building on the workshop, the online Dynamic Argumentative Delphi survey Research4Futures collected suggestions from almost 950 contributors from Europe and beyond about the implications of this foresight work for the priorities of EU R&amp;I policy.</li>\n</ul>\n<p>The detailed description of the foresight work and the resulting outputs are available in the final report of the project.&nbsp;</p>\n<p>This foresight study has been implemented through the Foresight on Demand framework contract, by a team of 40 experts. About 300 additional experts contributed to the project through its numerous workshops that helped shape the scenarios and their policy implications.&nbsp;</p>\n',
      countryTag: [],
      title: 'Foresight towards the 2nd Strategic Plan for Horizon Europe',
      internalLinks: [],
      organisationMemberOf: [],
      activity: [],
      projectFunded: [
        {
          popularity: 27,
          name: 'EU funded',
          _id: 'f80d06e4-b326-4364-b250-0afa1fc777f3',
          _createdDate: {
            $date: '2024-08-27T09:48:25.119Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.119Z',
          },
          tagType: 'project type',
        },
      ],
      organisationHasMember: [],
      organisationPeople: [],
    },
    _id: '1d38c642-f5e7-4a65-a455-8f9d2af765f7',
  },
  {
    dataCollectionId: 'InfoPages',
    data: {
      projectParticipantTeam: [
        {
          name: 'Bianca Dragomir',
          _id: '90c38dc0-018b-4d55-af76-e2b52130e029',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.344Z',
          },
          tagLine: 'Live deeply and tenderly',
          _updatedDate: {
            $date: '2024-10-14T18:29:46.298Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_957ec9dc2bb74b97b6166aab1d9d0840~mv2.jpg',
          tagType: 'person',
          tagPageLink: '/person/Bianca_Dragomir_q437h',
        },
        {
          name: 'Totti Könnölä',
          _id: '4bc3a4f3-f901-4670-80bf-f25ddd26163b',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:38.990Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:38.990Z',
          },
          tagType: 'person',
        },
      ],
      organisation: [],
      organisationProject: [],
      postImage2: {
        url: ' ',
        caption: '',
      },
      postContentRIch2:
        '<ul>\n<li>Next, 21 representatives from civil society organisations, business, academia and government discussed these issues at a sense-making workshop in September 2021;</li>\n<li>Following the workshop, 10 emerging issues were prioritised for characterisation. The characterisation was based on desk research and 11 semi-structured interviews with experts in the field. The 10 selected emerging issues include developments in new foods, products, services, and business and governance models. These issues have often been enabled by existing technologies and new forms of local partnerships, involving a variety of engaged stakeholders. They vary in their degree of maturity and novelty: some are relatively new developments, while others lend new perspectives to known subjects. Moreover, some provide new combinations of existing elements, while others are niche practices beginning to filter into the mainstream:<br><br>1. Agroecology: a way of producing food and living, a science and a movement for change<br>2. Soulful soil: alternative methods for nutrient and pest management<br>3. The power of many: community-supported agriculture networks and initiatives<br>4. Food-growing cities: urban farming, integrated food policies and citizen involvement<br>5. Muscle-up: alternative protein sources for human consumption<br>6. Knowledge is power: ensuring traceability and informing consumers<br>7. Reclaiming retail: (re)connecting farmers with consumers and businesses<br>8. Procurement strategies supporting sustainable agricultural and fishing practices<br>9. Menu for change: restaurants feed appetite for sustainability<br>10. The gift that keeps on giving: upcycled foods and food into energy</li>\n</ul>\n<p>Read the European Environment Agency\'s briefing building on key findings of the project:  <a href="https://www.eea.europa.eu/publications/reimagining-the-food-system-the" target="_blank">Reimagining the food system through social innovations — European Environment Agency (europa.eu)</a>&nbsp;</p>\n',
      methods: [
        {
          popularity: 47,
          name: 'horizon scanning',
          _id: 'b1d63812-7f03-4fa0-bfc7-b8d89363baa8',
          _createdDate: {
            $date: '2024-08-27T09:48:24.957Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.957Z',
          },
          tagType: 'foresight method',
        },
      ],
      pageTypes: [
        {
          popularity: 35,
          name: 'project info',
          _id: 'fcb0cbbc-98a5-4743-8c8b-1cb1c8326a85',
          _createdDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          tagId: 252527,
          tagType: 'page type',
        },
      ],
      projectCoordinator: [
        {
          name: 'Giovanna Guiffrè',
          _id: '9f43d0ff-05f5-45a0-a991-618ab5cb0375',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.313Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.313Z',
          },
          tagType: 'person',
        },
      ],
      _id: '71cfc285-a610-42c2-9aa8-cf45356099ae',
      _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
      _createdDate: {
        $date: '2024-10-19T17:31:18.327Z',
      },
      organisationType: [],
      postContentRIch3: '<p></p>\n',
      domains: [
        {
          popularity: 57,
          name: 'food',
          _id: '9bc8de80-3e4f-4fe9-b5b7-f2453006d157',
          _createdDate: {
            $date: '2024-08-27T09:48:25.089Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.089Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 31,
          name: 'social innovation',
          _id: 'dfef94c1-0a2b-4305-be91-66ace52b285b',
          _createdDate: {
            $date: '2024-08-27T09:48:25.065Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.065Z',
          },
          tagType: 'domain',
        },
      ],
      personOrganisationFormer: [],
      personProjectParticipation: [],
      postImage1: {
        url: 'https://static.wixstatic.com/media/471908_e80d1d259ca945899f51b7b200089fd3~mv2.png',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-29T13:26:09.943Z',
      },
      slug: 'Reimagining_the_Food_System_i308i',
      mediaFiles: [
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      projectEndDate: '2021-11-30T22:00:00.000Z',
      projectStartDate: '2021-06-30T21:00:00.000Z',
      Project: [
        {
          name: 'Reimagining the Food System',
          _id: 'ce3c81ca-8323-409a-b3e9-b155bf7b1756',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-19T17:17:03.253Z',
          },
          tagLine: 'Scanning the horizon for emerging social innovations',
          _updatedDate: {
            $date: '2024-10-19T17:31:22.773Z',
          },
          tagType: 'project',
          tagPageLink: '/project/Reimagining_the_Food_System_i308i',
        },
      ],
      projectOrganisationRoles: [
        {
          organisation: 'ISINNOVA',
          role: 'Project lead',
        },
        {
          organisation: 'Prospectiva',
          role: '',
        },
        {
          organisation: 'European Environment Agency',
          role: 'Client',
        },
        {
          organisation: 'IFI',
          role: '',
        },
        {
          organisation: 'Austrian Institute of Technology',
          role: '',
        },
        {
          role: '',
        },
      ],
      projectOrganisation: [
        {
          name: 'ISINNOVA',
          _id: 'd3fb10bb-0c2b-4902-b677-d43970198c35',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-19T17:25:16.424Z',
          },
          tagLine: 'Institute of Studies for the Integration of Systems',
          _updatedDate: {
            $date: '2024-10-19T17:25:16.424Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'Prospectiva',
          _id: '0a40b56c-b3ce-464f-9373-39d01bfdb09c',
          _owner: '4e87a317-884a-4be5-a4f2-a9a8cd641be3',
          _createdDate: {
            $date: '2024-10-14T10:49:49Z',
          },
          tagLine: 'Institutul de Prospectiva',
          _updatedDate: {
            $date: '2024-10-15T08:48:03.231Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_d73eb310112b41cb81a61667a4cc7421~mv2.png',
          tagType: 'organisation',
          tagPageLink: '/organisation/Prospectiva_fiw2n',
        },
        {
          name: 'European Environment Agency',
          _id: 'f3dc27f9-bcdf-4c71-bca9-d0f743a5ec43',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-21T18:06:25.276Z',
          },
          tagLine: 'EEA',
          _updatedDate: {
            $date: '2024-10-21T18:06:25.276Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 30,
          tagline: 'Insight Foresight Institute SL',
          name: 'IFI',
          _id: '76749d48-09c7-4023-9741-baacc42ab6fc',
          _createdDate: {
            $date: '2024-08-27T09:48:24.811Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.811Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'Austrian Institute of Technology',
          _id: 'e425fce1-879a-42b8-b154-b5590cb1cd71',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-21T18:09:57.361Z',
          },
          tagLine: 'AIT',
          _updatedDate: {
            $date: '2024-10-21T18:09:57.361Z',
          },
          tagType: 'organisation',
        },
      ],
      personProjectCoordonation: [],
      person: [],
      personOrganisation: [],
      postContentRIch1:
        '<p>Food systems require urgent and profound transformation to become sustainable, both in Europe and worldwide. Social innovation plays a pivotal role in transforming today’s food systems into ones that are economically and socially feasible, and sustainable within planetary boundaries. <br><br>The project <em>Reimagining the Food System: scanning the horizon for emerging social innovations </em>was conducted by the Foresight on Demand consortium between July - December 2021, on behalf of the European Environment Agency. It engaged in a systemic examination of emerging social innovations across the food chain, conducted using horizon scanning, a tool to detect early signs of potentially important developments. Thus, it offers insights into the experimentation taking place in alternative ways to produce, trade and consume food.<br><br>Project phases:</p>\n<ul>\n<li>The horizon-scanning combined web mining with a filtering and validation process, using machine learning and human evaluation. The exercise identified over 240 weak (or early) signals from a variety of news articles, blogs and grey literature published in English between 2017 and 2021. The signals were aggregated into 24 closely related subsets, with each cluster hinting at a potential emerging issue (see image below);</li>\n</ul>\n',
      countryTag: [],
      title: 'Reimagining the Food System',
      internalLinks: [],
      organisationMemberOf: [],
      activity: [],
      projectFunded: [
        {
          popularity: 27,
          name: 'EU funded',
          _id: 'f80d06e4-b326-4364-b250-0afa1fc777f3',
          _createdDate: {
            $date: '2024-08-27T09:48:25.119Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.119Z',
          },
          tagType: 'project type',
        },
      ],
      organisationHasMember: [],
      organisationPeople: [],
    },
    _id: '71cfc285-a610-42c2-9aa8-cf45356099ae',
  },
  {
    dataCollectionId: 'InfoPages',
    data: {
      projectParticipantTeam: [],
      organisation: [],
      organisationProject: [],
      postImage2: {
        url: 'https://static.wixstatic.com/media/471908_75052900e2d541ceb75028add91e34f5~mv2.png',
        caption: 'Examples of future visions shared on #OurFutures',
      },
      postContentRIch2:
        '<p>The future is a co-creation. Share your visions of tomorrow and join us in creating a narrative that inspires citizens, policymakers, and foresight experts:</p>\n<ul>\n<li><a href="https://collector.sensemaker-suite.com/collector?projectID=cc79e676-e7ad-46e7-93ad-66670f258f27" target="_blank">Write your future story and answer a few questions</a>  - share your preferred future with the rest of the world. Allow your vision to inspire others and fuel a meaningful conversation across Europe.<br>&nbsp;&nbsp;</li>\n<li><a href="https://ourfutures.dashboard.voicesthatcount.net/" target="_blank">Take a look at the #ourfutures dashboard</a> - explore future visions shared  by hundreds of contributors and check out stats and graphs that synthetise this rich content.&nbsp;</li>\n</ul>\n',
      methods: [
        {
          popularity: 42,
          name: 'visioning',
          _id: '932d682a-b111-46b2-b6a5-aade8c598da6',
          _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
          _createdDate: {
            $date: '2024-08-27T09:48:24.944Z',
          },
          _updatedDate: {
            $date: '2024-10-15T10:56:02.615Z',
          },
          tagType: 'foresight method',
        },
      ],
      pageTypes: [
        {
          popularity: 35,
          name: 'project info',
          _id: 'fcb0cbbc-98a5-4743-8c8b-1cb1c8326a85',
          _createdDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          tagId: 252527,
          tagType: 'page type',
        },
      ],
      projectCoordinator: [],
      _id: '0944565d-0a94-4a14-820f-baa46456ce4c',
      _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
      _createdDate: {
        $date: '2024-10-18T07:53:52.772Z',
      },
      organisationType: [],
      postContentRIch3: '<p></p>\n',
      domains: [
        {
          popularity: 52,
          name: 'citizen engagement',
          _id: '3e20987c-c439-4214-bfff-515f49d8a65f',
          _createdDate: {
            $date: '2024-08-27T09:48:25.111Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.111Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 48,
          name: 'democracy',
          _id: 'b6eb6f2d-beae-4471-b980-95b11d48b675',
          _createdDate: {
            $date: '2024-08-27T09:48:25.101Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.101Z',
          },
          tagType: 'domain',
        },
      ],
      personOrganisationFormer: [],
      personProjectParticipation: [],
      postImage1: {
        url: 'https://static.wixstatic.com/media/471908_d0b4b199cd5b4b7881edaa55a6173629~mv2.png',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-30T12:30:34.017Z',
      },
      slug: 'OurFutures_wgft5',
      mediaFiles: [
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      postContentRIch4: '<p></p>\n',
      Project: [
        {
          name: '#OurFutures',
          _id: '612a7547-db2c-49b7-8b05-576dbc951324',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-17T12:43:06.796Z',
          },
          tagLine:
            'Collecting stories from citizens of Europe, indicating their desirable futures.',
          _updatedDate: {
            $date: '2024-10-18T08:49:56.859Z',
          },
          tagType: 'project',
          tagPageLink: '/project/OurFutures_wgft5',
        },
      ],
      projectOrganisationRoles: [
        {
          organisation: 'Joint Research Center',
          role: '',
        },
        {
          role: '',
        },
      ],
      projectOrganisation: [
        {
          popularity: 50,
          name: 'Joint Research Center',
          _id: 'f85b3c01-69e8-4688-8766-14c3910bea1b',
          _createdDate: {
            $date: '2024-08-27T09:48:24.871Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.871Z',
          },
          tagType: 'organisation',
        },
      ],
      personProjectCoordonation: [],
      person: [],
      personOrganisation: [],
      postContentRIch1:
        '<p><strong>#OurFutures invites people across the EU to share their imagined futures.</strong></p>\n<p>The project supports and inspires a collective dialogue about the future of Europe and its visions for the future.&nbsp;</p>\n<p>We welcome your short story expressing what you would like to see in the Europe of the future, making explicit your hopes, aspirations, but also uncertainties.<br><br>The visions you and other citizens submit will be analysed and shared with EU policy makers. We will look for early signs of potentially important developments, persistent problems, novel and unexpected issues. These outcomes will serve to generate actual, future-oriented recommendations for EU action to build together the Europe that we want.<br></p>\n',
      countryTag: [
        {
          name: 'EU',
          _id: 'e1b13728-5253-484b-92d6-0c451813adff',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T10:28:23.621Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-22T10:28:23.621Z',
          },
          tagType: 'country',
        },
      ],
      title: '#OurFutures',
      internalLinks: [],
      organisationMemberOf: [],
      activity: [],
      projectFunded: [],
      organisationHasMember: [],
      postImage3: {
        url: ' ',
        caption: '',
      },
      organisationPeople: [],
    },
    _id: '0944565d-0a94-4a14-820f-baa46456ce4c',
  },
  {
    dataCollectionId: 'InfoPages',
    data: {
      projectParticipantTeam: [],
      organisation: [],
      personOrganisationRoles: [
        {
          organisation: 'UEFISCDI',
          role: '',
        },
        {
          organisation: 'Prospectiva',
          role: '',
        },
        {
          organisation: '',
          role: '',
        },
      ],
      organisationProject: [],
      methods: [],
      pageTypes: [],
      projectCoordinator: [],
      description: '<p></p>\n',
      _id: 'c8b943b4-9f19-49f5-a78f-07b3b2e223eb',
      _owner: '4719082d-ae14-4ecd-924b-bf55a28b8479',
      _createdDate: {
        $date: '2024-10-17T10:44:57.821Z',
      },
      organisationType: [],
      domains: [],
      personOrganisationFormer: [],
      personProjectParticipation: [],
      _updatedDate: {
        $date: '2024-10-17T10:44:57.821Z',
      },
      slug: 'Radu_Gheorghiu_nxuzu',
      Project: [],
      projectOrganisation: [],
      personProjectCoordonation: [],
      person: [
        {
          name: 'Radu Gheorghiu',
          _id: '79e69062-1f22-4acd-bd5c-b4b0f17a3dad',
          _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
          _createdDate: {
            $date: '2024-10-15T09:06:25.839Z',
          },
          _updatedDate: {
            $date: '2024-10-15T09:06:25.839Z',
          },
          tagType: 'person',
        },
      ],
      personOrganisation: [],
      countryTag: [],
      title: 'Radu Gheorghiu',
      internalLinks: [],
      organisationMemberOf: [],
      activity: [],
      projectFunded: [],
      organisationHasMember: [],
      organisationPeople: [],
      personOrganisationRolesFormer: [
        {
          organisation: '',
          role: '',
        },
      ],
    },
    _id: 'c8b943b4-9f19-49f5-a78f-07b3b2e223eb',
  },
  {
    dataCollectionId: 'InfoPages',
    data: {
      projectParticipantTeam: [],
      organisation: [],
      personOrganisationRoles: [
        {
          organisation: 'Prospectiva',
          role: 'Vice-president, foresight expert',
        },
        {
          organisation: 'UEFISCDI',
          role: 'Foresight expert',
        },
        {
          role: '',
        },
      ],
      organisationProject: [],
      methods: [
        {
          popularity: 47,
          name: 'horizon scanning',
          _id: 'b1d63812-7f03-4fa0-bfc7-b8d89363baa8',
          _createdDate: {
            $date: '2024-08-27T09:48:24.957Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.957Z',
          },
          tagType: 'foresight method',
        },
        {
          popularity: 36,
          name: 'scenarios',
          _id: '3c4917d4-7467-4fef-a6a3-af7b61b9e196',
          _createdDate: {
            $date: '2024-08-27T09:48:24.946Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.946Z',
          },
          tagType: 'foresight method',
        },
        {
          name: 'Speculative design',
          _id: '6cffa4fa-0c42-4736-a303-303f925373db',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-21T20:51:05.923Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-21T20:51:05.923Z',
          },
          tagType: 'foresight method',
        },
        {
          name: 'roadmapping',
          _id: '19a0517e-64e5-48f8-823e-f8ca544c6447',
          _owner: '4719082d-ae14-4ecd-924b-bf55a28b8479',
          _createdDate: {
            $date: '2024-10-17T10:44:01.075Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-17T10:44:01.075Z',
          },
          tagType: 'foresight method',
        },
        {
          name: 'Dynamic Argumentative Delphi',
          _id: '33bb4d88-50ec-475e-942e-482465054484',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-29T15:39:48.622Z',
          },
          tagLine: 'DAD',
          _updatedDate: {
            $date: '2024-10-29T15:39:48.622Z',
          },
          tagType: 'foresight method',
        },
        {
          name: 'backcasting',
          _id: 'dda76cda-872f-4340-9052-b1db8dec90f8',
          _owner: 'd3268e01-e2ba-455a-81c4-d86515cf97f8',
          _createdDate: {
            $date: '2024-10-25T10:48:31.588Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-25T10:48:31.588Z',
          },
          tagType: 'foresight method',
        },
      ],
      pageTypes: [
        {
          popularity: 91,
          name: 'person info',
          _id: 'ff988067-2fee-41f2-9b33-7eb14d282b17',
          _createdDate: {
            $date: '2024-08-27T09:51:01.715Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.715Z',
          },
          tagId: 252526,
          tagType: 'page type',
        },
      ],
      projectCoordinator: [],
      description:
        '<p>Bianca Dragomir, vice-president of Prospectiva - short for Institutul de Prospectiva (prospectiva.ro) - has been working in foresight for the last ten years, especially within the field of Research and Innovation. She’s been involved in designing and implementing complex foresight projects, at national and European level, with components such as horizon scanning, scenario and vision building, large online expert consultations, speculative design, citizen participation, futures education. She is currently contributing to maturing a Europe-wide foresight community hosted by futures4europe.eu</p>\n<p>Her practice of foresight - particularly its functions of imagining and deliberating potential futures - capitalises on her extensive experience in academic and public debate: a former national debate champion and European vice-champion, Bianca has taught debate to students from Europe, the Middle East, and South-East Asia, and has represented Romania as a youth delegate to the United Nations.</p>\n',
      _id: '277c565a-f1bb-42e8-95c5-d01c0d0773ec',
      _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
      _createdDate: {
        $date: '2024-10-14T17:08:20.295Z',
      },
      organisationType: [],
      domains: [
        {
          name: 'Futures literacy',
          _id: 'b99431d0-ed19-4f73-bc7c-fae45125034a',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T13:11:34.619Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-22T13:11:34.619Z',
          },
          tagType: 'domain',
        },
        {
          name: 'Emerging Technologies',
          _id: '414e11bd-1c1c-4d88-b63e-f24a3b2c711a',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T10:37:07.120Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-22T10:37:07.120Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 43,
          name: 'transhumanism',
          _id: '4369e526-6267-4afc-a73c-af45bf2ef9e0',
          _createdDate: {
            $date: '2024-08-27T09:48:25.060Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.060Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 28,
          name: 'technological change',
          _id: '38c263dc-399a-4ffc-a02c-7d8541ca872c',
          _createdDate: {
            $date: '2024-08-27T09:48:25.062Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.062Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 45,
          name: 'science for policy',
          _id: '0e1048be-630f-424c-806d-bb2aac576213',
          _createdDate: {
            $date: '2024-08-27T09:48:25.067Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.067Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 67,
          name: 'EU R&I policy',
          _id: '74f1a07e-9754-4e06-9091-30d0d7d4e667',
          _createdDate: {
            $date: '2024-08-27T09:48:25.091Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.091Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 52,
          name: 'citizen engagement',
          _id: '3e20987c-c439-4214-bfff-515f49d8a65f',
          _createdDate: {
            $date: '2024-08-27T09:48:25.111Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.111Z',
          },
          tagType: 'domain',
        },
      ],
      personOrganisationFormer: [],
      personProjectParticipation: [
        {
          popularity: 1,
          name: 'Eye of Europe',
          _id: 'a3da923c-66d3-46a7-8ab0-8d33424f3b80',
          _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
          _createdDate: {
            $date: '2024-10-15T11:02:13.126Z',
          },
          tagLine: 'The Research and Innovation Foresight Community',
          _updatedDate: {
            $date: '2024-10-25T11:17:57.445Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_3fc30f50bb3c467aa3213c444816d649~mv2.png',
          tagType: 'project',
          tagPageLink: '/project/Eye_of_Europe_6ft5d',
        },
        {
          name: 'Futures Garden',
          _id: '8f7b4246-c936-44df-8e48-acdfd342dccf',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-21T20:36:57.587Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-21T20:51:43.951Z',
          },
          tagType: 'project',
          tagPageLink: '/project/Futures_Garden_bzm8d',
        },
        {
          name: 'Foresight towards the 2nd Strategic Plan for Horizon Europe',
          _id: 'b853a2cf-94b7-40b5-bb70-ee2a2dd53ce8',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-14T18:33:00.732Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T15:55:02.077Z',
          },
          tagType: 'project',
          tagPageLink:
            '/project/Foresight_towards_the_2nd_Strategic_Plan_for_Horizon_Europe_bzq9u',
        },
        {
          name: 'Reimagining the Food System',
          _id: 'ce3c81ca-8323-409a-b3e9-b155bf7b1756',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-19T17:17:03.253Z',
          },
          tagLine: 'Scanning the horizon for emerging social innovations',
          _updatedDate: {
            $date: '2024-10-19T17:31:22.773Z',
          },
          tagType: 'project',
          tagPageLink: '/project/Reimagining_the_Food_System_i308i',
        },
      ],
      _updatedDate: {
        $date: '2024-10-30T01:30:49.104Z',
      },
      slug: 'Bianca_Dragomir_q437h',
      mediaFiles: [
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      websiteLink: 'https://www.prospectiva.ro/team/',
      Project: [],
      projectOrganisation: [],
      personProjectCoordonation: [],
      person: [
        {
          name: 'Bianca Dragomir',
          _id: '90c38dc0-018b-4d55-af76-e2b52130e029',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.344Z',
          },
          tagLine: 'Live deeply and tenderly',
          _updatedDate: {
            $date: '2024-10-14T18:29:46.298Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_957ec9dc2bb74b97b6166aab1d9d0840~mv2.jpg',
          tagType: 'person',
          tagPageLink: '/person/Bianca_Dragomir_q437h',
        },
      ],
      personOrganisation: [
        {
          name: 'Prospectiva',
          _id: '0a40b56c-b3ce-464f-9373-39d01bfdb09c',
          _owner: '4e87a317-884a-4be5-a4f2-a9a8cd641be3',
          _createdDate: {
            $date: '2024-10-14T10:49:49Z',
          },
          tagLine: 'Institutul de Prospectiva',
          _updatedDate: {
            $date: '2024-10-15T08:48:03.231Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_d73eb310112b41cb81a61667a4cc7421~mv2.png',
          tagType: 'organisation',
          tagPageLink: '/organisation/Prospectiva_fiw2n',
        },
        {
          popularity: 55,
          tagline:
            'Unitatea Executivă pentru Finanțarea Învățământului superior, a Cercetării, Dezvoltării și Inovării',
          trend: '5',
          name: 'UEFISCDI',
          _id: '95224d24-7699-4603-8d55-58c15794dd58',
          _owner: 'd63d4075-c493-4434-b07b-3455eb228b81',
          _createdDate: {
            $date: '2024-08-27T09:48:24.898Z',
          },
          tagLine:
            'The Executive Agency for Higher Education, Research, Development and Innovation Funding of Romania',
          linked: true,
          _updatedDate: {
            $date: '2024-10-29T10:45:39.420Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_f66da0478b09447ba0708a35af2af36c~mv2.png',
          tagType: 'organisation',
          tagPageLink: '/organisation/UEFISCDI_rloxg',
        },
      ],
      countryTag: [
        {
          popularity: 15,
          name: 'Romania',
          _id: 'e4cab9c4-7f21-4ec6-88ad-7aa8698612f4',
          _createdDate: {
            $date: '2024-08-27T09:48:24.766Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.766Z',
          },
          tagType: 'country',
        },
      ],
      title: 'Bianca Dragomir',
      internalLinks: [],
      organisationMemberOf: [],
      activity: [],
      projectFunded: [],
      organisationHasMember: [],
      linkedinLink: 'https://www.linkedin.com/in/bianca-dragomir-a0580648/',
      organisationPeople: [],
      personOrganisationRolesFormer: [
        {
          role: '',
        },
      ],
    },
    _id: '277c565a-f1bb-42e8-95c5-d01c0d0773ec',
  },
  {
    dataCollectionId: 'InfoPages',
    data: {
      projectParticipantTeam: [
        {
          name: 'Radu Gheorghiu',
          _id: '79e69062-1f22-4acd-bd5c-b4b0f17a3dad',
          _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
          _createdDate: {
            $date: '2024-10-15T09:06:25.839Z',
          },
          _updatedDate: {
            $date: '2024-10-15T09:06:25.839Z',
          },
          tagType: 'person',
        },
        {
          name: 'Philine Warnke',
          _id: '26c009a4-0699-45fa-8d60-16ebfe63cd90',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:38.978Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:38.978Z',
          },
          tagType: 'person',
        },
        {
          name: 'Totti Könnölä',
          _id: '4bc3a4f3-f901-4670-80bf-f25ddd26163b',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:38.990Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:38.990Z',
          },
          tagType: 'person',
        },
        {
          name: 'Dana Wasserbacher',
          _id: '8789f421-e784-48fa-a8ad-e877e00d9e7f',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.084Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.084Z',
          },
          tagType: 'person',
        },
        {
          name: 'Matthias Weber',
          _id: 'b2da7e9b-60e0-4b13-853e-be09bf09b96a',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.203Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.203Z',
          },
          tagType: 'person',
        },
        {
          name: 'Mikkel Knudsen',
          _id: 'bb6d79aa-1062-45eb-b889-1f509e9db78d',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.222Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.222Z',
          },
          tagType: 'person',
        },
        {
          name: 'Susanne Giesecke',
          _id: 'e0e6a5ef-ae5b-46e6-8e95-71c625b7f4c2',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.235Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.235Z',
          },
          tagType: 'person',
        },
        {
          name: 'Juha Kaskinen',
          _id: 'a091dfa9-fdfe-4bbd-be7d-63394360f6ba',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.179Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.179Z',
          },
          tagType: 'person',
        },
        {
          name: 'Lenka Hebakova',
          _id: '8815218d-6eb4-4ad9-a777-2e60d96c16b3',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:38.920Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:38.920Z',
          },
          tagType: 'person',
        },
        {
          name: 'Eliza Savvopoulou',
          _id: 'c73438ff-0e92-4619-84b6-8ef01d6cb3f8',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.184Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.184Z',
          },
          tagType: 'person',
        },
        {
          name: 'Daniel Ferreira',
          _id: '286412e1-f4ba-4fce-8c6c-fbe82ff53747',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.281Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.281Z',
          },
          tagType: 'person',
        },
        {
          name: 'Attila Havas',
          _id: '75786c5d-3536-4dea-ad7a-2dee4b7ea2ff',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:38.965Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:38.965Z',
          },
          tagType: 'person',
        },
      ],
      organisation: [],
      organisationProject: [],
      postContentRIch2:
        '<p>As a Coordination and Support Action funded, project “Eye of Europe” aims to enhance the integration of foresight practices into Research and Innovation (R&amp;I) policy making across Europe. Ultimately, the project envisions a more cohesive and influential R&amp;I foresight community that contributes significantly, as a collective intelligence, to shaping and guiding policy decisions.</p>\n<p><br>To this end, Eye of Europe builds on existing initiatives and experiences to foster knowledge-sharing between foresight practitioners and policy makers, attract domain experts in foresight endeavours, and engage a broader audience in futures thinking. Nurturing futures4europe as the online home for the community and running various face-to-face events with different stakeholders will underpin these ambitions.<br>Methodologically, the project relies on the following building blocks:<br></p>\n<ul>\n<li><strong>futures4europe.eu as the online hub for the R&amp;I foresight community in Europe</strong>: The platform accommodates the interests of various stakeholders such as foresight experts, beneficiaries, domain experts, and an active audience. It operates on multiple integration levels, from mapping organizations and experts to sharing foresight results and capabilities. Moreover, it acts as the communication gateway for ongoing foresight activities, events, educational and inspirational materials. <br><br></li>\n<li><strong>Sharing of practices</strong>: This entails mapping institutions engaged in R&amp;I foresight activities, promoting mutual learning through interactive formats, developing shared visions for the future of foresight in R&amp;I policy within the European Research Area (ERA), fostering exchanges among the foresight in R&amp;I policy community through conferences, encouraging dialogues between futurist/expert communities, academics and policy practitioners.<br><em>Key figures: 5 mutual learning events (MLE): 2 online, 3 face-to-face events; 1 vision building event for the Future of R&amp;I Foresight in ERA; 2 conferences</em><br><br></li>\n<li><strong>Running foresight pilots</strong>: Conducting a series of pilot workshops and online consultations with diverse formats, methodologies, and participants. This involves identifying topics of common interest within the European Research Area (ERA), where foresight perspectives offer added value, designing and implementing tailored pilot foresight activities involving various stakeholders, harnessing lessons learnt and feeding them into the platform and other dissemination channels.<br><em>Key figures: 11 Foresight pilot processes: 3 exclusively with citizens, 4  mainly with experts and researchers tackling specific R&amp;I topics, 4 involving a bespoke group of participants. Out of the 11 events,  8 will be face-to-face events, and 3 pilots will take place online</em><br><br></li>\n<li><strong>Boosting futures literacy</strong>: The project encourages meaningful engagement with diverse audiences, from foresight professionals, researchers, policy-makers to various futures sensitive profiles (e.g. entrepreneurs, journalists, artists) and the wider civil society. The project will provide guides, methodology toolboxes, and training modules for R&amp;I foresight and futures literacy, incorporating written and multimedia content.<br><em>Key figures: 5-10 short training sets for participants in foresight exercises; 1 training module for foresight beneficiaries; 1 foresight training for early career researchers, 1 Massive Open Online Course (MOOC) on R&amp;I foresight; 12 conversational podcasts; 6-8 Short videos and/or animated materials showcasing foresight processes and outcomes<br></em><br></li>\n<li><strong>Fueling the public discourse around future</strong>s: Promoting the project and fostering the foresight community via the online platform futures4europe.eu and complementary channels such as social media and a dedicated newsletter. In addition to highlighting the project\'s own initiatives, Eye of Europe will also aim to promote foresight content developed in other projects, showcasing a diverse range of perspectives and insights within the foresight field. The quarterly newsletter will feature various content types like interviews, project updates, and foresight-related articles. Social media, particularly <a href="https://www.linkedin.com/company/futures4europe/?viewAsMember=true" target="_blank">Futures4Europe\'s LinkedIn page</a>, will be used to engage professional communities and wider audiences, with a focus on sharing project activities and fostering discussions.</li>\n</ul>\n',
      methods: [
        {
          popularity: 47,
          name: 'horizon scanning',
          _id: 'b1d63812-7f03-4fa0-bfc7-b8d89363baa8',
          _createdDate: {
            $date: '2024-08-27T09:48:24.957Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.957Z',
          },
          tagType: 'foresight method',
        },
        {
          popularity: 36,
          name: 'scenarios',
          _id: '3c4917d4-7467-4fef-a6a3-af7b61b9e196',
          _createdDate: {
            $date: '2024-08-27T09:48:24.946Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.946Z',
          },
          tagType: 'foresight method',
        },
        {
          popularity: 33,
          name: 'expert workshops',
          _id: '6c84e284-84b3-49dd-938d-3a5d8a9f7259',
          _createdDate: {
            $date: '2024-08-27T09:48:24.962Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.962Z',
          },
          tagType: 'foresight method',
        },
      ],
      pageTypes: [
        {
          popularity: 35,
          name: 'project info',
          _id: 'fcb0cbbc-98a5-4743-8c8b-1cb1c8326a85',
          _createdDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.714Z',
          },
          tagId: 252527,
          tagType: 'page type',
        },
      ],
      projectCoordinator: [
        {
          name: 'Radu Gheorghiu',
          _id: '79e69062-1f22-4acd-bd5c-b4b0f17a3dad',
          _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
          _createdDate: {
            $date: '2024-10-15T09:06:25.839Z',
          },
          _updatedDate: {
            $date: '2024-10-15T09:06:25.839Z',
          },
          tagType: 'person',
        },
      ],
      description:
        '<p class="font_8">As a Coordination and Support Action funded by the EU, project “Eye of Europe” aims to enhance the integration of foresight practices into Research and Innovation (R&amp;I) policy making across Europe. Ultimately, the project envisions a more cohesive and influential R&amp;I foresight community that contributes significantly, as a collective intelligence, to shaping and guiding policy decisions.</p>\n<p class="font_8">To this end, Eye of Europe builds on existing initiatives and experiences to foster knowledge-sharing between foresight practitioners and policy makers, attract domain experts in foresight endeavours, and engage a broader audience in futures thinking. Nurturing futures4europe as the online home for the community and running various face-to-face events with different stakeholders will underpin these ambitions.</p>\n<p class="font_8">Methodologically, the project relies on the following building blocks:</p>\n<ul class="font_8">\n  <li><p class="font_8"><strong>Futures4Europe.eu as the online hub for the R&amp;I foresight community in Europe</strong>: The platform accommodates the interests of various stakeholders such as foresight experts, beneficiaries, domain experts, and an active audience. It operatse on multiple integration levels, from mapping organizations and experts to sharing foresight results and capabilities. Moreover, it acts as the communication gateway for ongoing foresight activities, events, educational and inspirational materials.&nbsp;</p></li>\n  <li><p class="font_8"><strong>Sharing of practices</strong>: This entails mapping institutions engaged in R&amp;I foresight activities, promoting mutual learning through interactive formats, developing shared visions for the future of foresight in R&amp;I policy within the European Research Area (ERA), fostering exchanges among the foresight in R&amp;I policy community through conferences, encouraging dialogues between futurist/expert communities, academics and policy practitioners.</p></li>\n</ul>\n<p class="font_8"><em>Key figures</em>: <em>5 mutual learning events (MLE): 2 online, 3 face-to-face events; 1 vision building event for the Future of R&amp;I Foresight in ERA; 2 conferences</em></p>\n<ul class="font_8">\n  <li><p class="font_8"><strong>Running foresight pilots</strong>: Conducting a series of pilot workshops and online consultations with diverse formats, methodologies, and participants. This involves identifying topics of common interest within the European Research Area (ERA), where foresight perspectives offer added value, designing and implementing tailored pilot foresight activities involving various stakeholders, harnessing lessons learnt and feeding them into the platform and other dissemination channels.</p></li>\n</ul>\n<p class="font_8"><em>Key figures</em>: <em>11 Foresight pilot processes: 3 exclusively with citizens, 4 mainly with experts and researchers tackling specific R&amp;I topics, 4 involving a bespoke group of participants. Out of the 11 events, 8 will be face-to-face events, and 3 pilots will take place online</em></p>\n<p class="font_8"><strong>Boosting futures literacy</strong>: The project encourages meaningful engagement with diverse audiences, from foresight professionals, researchers, policy-makers to various futures sensitive profiles (e.g. entrepreneurs, journalists, artists) and the wider civil society. The project will provide guides, methodology toolboxes, and training modules for R&amp;I foresight and futures literacy, incorporating written and multimedia content.</p>\n<p class="font_8"><em>Key figures</em>: <em>5-10 short training sets for participants in foresight exercises; 1 training module for foresight beneficiaries; 1 foresight training for early career researchers, 1 Massive Open Online Course (MOOC) on R&amp;I foresight; 12 conversational podcasts; 6-8 Short videos and/or animated materials showcasing foresight processes and outcomes</em></p>\n<p class="font_8"><strong>Fueling the public discourse around futures</strong>: Promoting the project and fostering the foresight community via the online platform Futures4Europe and complementary channels such as social media and a dedicated newsletter. In addition to highlighting the project\'s own initiatives, Eye of Europe will also aim to promote foresight content developed in other projects, showcasing a diverse range of perspectives and insights within the foresight field. The quarterly newsletter will feature various content types like interviews, project updates, and foresight-related articles. Social media, particularly futures4europe\'s LinkedIn page, will be used to engage professional communities and wider audiences, with a focus on sharing project activities and fostering discussions.</p>\n<p class="font_8">Eye of Europe leverages the experience of 18 partners from across Europe coming from all walks of foresight expertise and practice. The organizations stem from the countries marked below:</p>\n<p class="font_8"><br></p>',
      _id: '82a7d80f-6102-4b18-8752-8e0d0129b646',
      _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
      _createdDate: {
        $date: '2024-10-14T16:22:12.507Z',
      },
      organisationType: [],
      postContentRIch3: '<p></p>\n',
      domains: [
        {
          popularity: 67,
          name: 'EU R&I policy',
          _id: '74f1a07e-9754-4e06-9091-30d0d7d4e667',
          _createdDate: {
            $date: '2024-08-27T09:48:25.091Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.091Z',
          },
          tagType: 'domain',
        },
      ],
      personOrganisationFormer: [],
      personProjectParticipation: [],
      postImage1: {
        url: ' ',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-28T21:27:35.773Z',
      },
      slug: 'Eye_of_Europe_6ft5d',
      mediaFiles: [
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      projectEndDate: '2026-10-31T12:06:13.000Z',
      projectStartDate: '2023-11-01T12:06:13.000Z',
      Project: [
        {
          popularity: 1,
          name: 'Eye of Europe',
          _id: 'a3da923c-66d3-46a7-8ab0-8d33424f3b80',
          _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
          _createdDate: {
            $date: '2024-10-15T11:02:13.126Z',
          },
          tagLine: 'The Research and Innovation Foresight Community',
          _updatedDate: {
            $date: '2024-10-25T11:17:57.445Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_3fc30f50bb3c467aa3213c444816d649~mv2.png',
          tagType: 'project',
          tagPageLink: '/project/Eye_of_Europe_6ft5d',
        },
      ],
      projectOrganisationRoles: [
        {
          organisation: 'UEFISCDI',
          role: 'Lead',
        },
        {
          organisation: 'Fraunhofer ISI',
          role: 'Work Package lead',
        },
        {
          organisation: 'CNR',
          role: ' Contributor',
        },
        {
          organisation: 'TC Praha',
          role: 'Contributor',
        },
        {
          organisation: 'Prospectiva',
          role: 'Contributor',
        },
        {
          organisation: 'Technopolis',
          role: '',
        },
        {
          organisation: 'INRAE',
          role: 'Contributor',
        },
        {
          organisation: 'IFI',
          role: 'Contributor',
        },
        {
          organisation: 'DLR',
          role: 'Contributor',
        },
        {
          organisation: 'FCT',
          role: 'Contributor',
        },
        {
          organisation: 'AIT',
          role: 'Work Package lead',
        },
        {
          organisation: 'VDI/VDE IT',
          role: 'Contributor',
        },
        {
          organisation: 'ARCTIK SRL',
          role: '',
        },
        {
          role: '',
        },
      ],
      projectOrganisation: [
        {
          popularity: 55,
          tagline:
            'Unitatea Executivă pentru Finanțarea Învățământului superior, a Cercetării, Dezvoltării și Inovării',
          trend: '5',
          name: 'UEFISCDI',
          _id: '95224d24-7699-4603-8d55-58c15794dd58',
          _owner: 'd63d4075-c493-4434-b07b-3455eb228b81',
          _createdDate: {
            $date: '2024-08-27T09:48:24.898Z',
          },
          tagLine:
            'The Executive Agency for Higher Education, Research, Development and Innovation Funding of Romania',
          linked: true,
          _updatedDate: {
            $date: '2024-10-29T10:45:39.420Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_f66da0478b09447ba0708a35af2af36c~mv2.png',
          tagType: 'organisation',
          tagPageLink: '/organisation/UEFISCDI_rloxg',
        },
        {
          popularity: 106,
          name: 'Fraunhofer ISI',
          _id: 'b83286d1-5153-4efa-b694-e1828ca61739',
          _createdDate: {
            $date: '2024-08-27T09:48:24.829Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.829Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 12,
          tagline: 'Consiglio Nazionale delle Ricerche',
          name: 'CNR',
          _id: 'c4b51c39-e9ba-4c5a-9a19-8033caf815c9',
          _createdDate: {
            $date: '2024-08-27T09:48:24.888Z',
          },
          linked: true,
          _updatedDate: {
            $date: '2024-08-27T09:48:24.888Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'Prospectiva',
          _id: '0a40b56c-b3ce-464f-9373-39d01bfdb09c',
          _owner: '4e87a317-884a-4be5-a4f2-a9a8cd641be3',
          _createdDate: {
            $date: '2024-10-14T10:49:49Z',
          },
          tagLine: 'Institutul de Prospectiva',
          _updatedDate: {
            $date: '2024-10-15T08:48:03.231Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_d73eb310112b41cb81a61667a4cc7421~mv2.png',
          tagType: 'organisation',
          tagPageLink: '/organisation/Prospectiva_fiw2n',
        },
        {
          popularity: 76,
          name: 'Technopolis',
          _id: 'dadcf68f-2f7e-44ae-a10e-d53e570c225a',
          _createdDate: {
            $date: '2024-08-27T09:48:24.803Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.803Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 68,
          tagline: 'Technologicke Centrum Praha ZSPO',
          name: 'TC Praha',
          _id: '6f52fb6e-0645-4571-91be-b61087dea931',
          _createdDate: {
            $date: '2024-08-27T09:48:24.839Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.839Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 84,
          tagline:
            "Institut National De Recherche Pour L'agriculture, L'alimentation Et L'environnement",
          name: 'INRAE',
          _id: 'b745b59c-35c0-4a06-bf42-7a4be0c46c0c',
          _createdDate: {
            $date: '2024-08-27T09:48:24.789Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.789Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 30,
          tagline: 'Insight Foresight Institute SL',
          name: 'IFI',
          _id: '76749d48-09c7-4023-9741-baacc42ab6fc',
          _createdDate: {
            $date: '2024-08-27T09:48:24.811Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.811Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 21,
          tagline: 'Deutsches Zentrum Fur Luft - Und Raumfahrt',
          name: 'DLR',
          _id: '902becad-0a91-4957-95de-c83c65e80b0f',
          _createdDate: {
            $date: '2024-08-27T09:48:24.823Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.823Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 19,
          tagline: 'Fundacao Para A Ciencia E A Tecnologia',
          name: 'FCT',
          _id: '52f1932c-db39-431e-94d9-07cbd873c666',
          _createdDate: {
            $date: '2024-08-27T09:48:24.810Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.810Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 49,
          tagline: 'Austrian Institute Of Technology GmbH',
          name: 'AIT',
          _id: 'f959a48e-b278-4676-adbf-5d086f6d1572',
          _createdDate: {
            $date: '2024-08-27T09:48:24.794Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.794Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 1,
          tagline: 'VDI/VDE Innovation + Technik GmbH',
          name: 'VDI/VDE IT',
          _id: '1c6695d3-0ea3-448f-b229-ca0381e6502e',
          _createdDate: {
            $date: '2024-08-27T09:48:24.814Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.814Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 115,
          name: 'ARCTIK SRL',
          _id: '4ba5956d-b12b-4f95-813e-7a480bb36ab4',
          _createdDate: {
            $date: '2024-08-27T09:48:24.864Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.864Z',
          },
          tagType: 'organisation',
        },
      ],
      personProjectCoordonation: [],
      person: [],
      personOrganisation: [],
      postContentRIch1: '',
      countryTag: [],
      title: 'Eye of Europe',
      internalLinks: [],
      organisationMemberOf: [],
      activity: [],
      projectFunded: [
        {
          popularity: 27,
          name: 'EU funded',
          _id: 'f80d06e4-b326-4364-b250-0afa1fc777f3',
          _createdDate: {
            $date: '2024-08-27T09:48:25.119Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.119Z',
          },
          tagType: 'project type',
        },
      ],
      organisationHasMember: [],
      organisationPeople: [],
    },
    _id: '82a7d80f-6102-4b18-8752-8e0d0129b646',
  },
  {
    dataCollectionId: 'InfoPages',
    data: {
      projectParticipantTeam: [],
      organisation: [
        {
          name: 'Prospectiva',
          _id: '0a40b56c-b3ce-464f-9373-39d01bfdb09c',
          _owner: '4e87a317-884a-4be5-a4f2-a9a8cd641be3',
          _createdDate: {
            $date: '2024-10-14T10:49:49Z',
          },
          tagLine: 'Institutul de Prospectiva',
          _updatedDate: {
            $date: '2024-10-15T08:48:03.231Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_d73eb310112b41cb81a61667a4cc7421~mv2.png',
          tagType: 'organisation',
          tagPageLink: '/organisation/Prospectiva_fiw2n',
        },
      ],
      organisationProject: [
        {
          name: 'Futures Garden',
          _id: '8f7b4246-c936-44df-8e48-acdfd342dccf',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-21T20:36:57.587Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-21T20:51:43.951Z',
          },
          tagType: 'project',
          tagPageLink: '/project/Futures_Garden_bzm8d',
        },
        {
          popularity: 1,
          name: 'Eye of Europe',
          _id: 'a3da923c-66d3-46a7-8ab0-8d33424f3b80',
          _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
          _createdDate: {
            $date: '2024-10-15T11:02:13.126Z',
          },
          tagLine: 'The Research and Innovation Foresight Community',
          _updatedDate: {
            $date: '2024-10-25T11:17:57.445Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_3fc30f50bb3c467aa3213c444816d649~mv2.png',
          tagType: 'project',
          tagPageLink: '/project/Eye_of_Europe_6ft5d',
        },
        {
          name: 'S&T&I FOR 2050',
          _id: '004bb708-2cf1-44e0-84b9-52801822185e',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-14T15:44:14.464Z',
          },
          tagLine:
            '&T&I FOR 2050. Science, Technology and Innovation for Ecosystem Performance – Accelerating Sustainability Transitions',
          _updatedDate: {
            $date: '2024-10-14T15:44:14.464Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'Reimagining the Food System: scanning the horizon for emerging social innovations',
          _id: '897c577d-90b1-4bc3-a5ca-73d49dd54087',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-14T15:47:08.514Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-14T15:47:08.514Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'Foresight towards the 2nd Strategic Plan for Horizon Europe',
          _id: 'f2de1204-42d5-4f45-8fe6-eb493cba22d9',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-14T15:47:48.944Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-14T15:47:48.944Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'CIMULACT',
          _id: '6bed0293-1da4-42c6-aeb4-4e40bdfb91e6',
          _owner: '4719082d-ae14-4ecd-924b-bf55a28b8479',
          _createdDate: {
            $date: '2024-10-17T09:52:42.003Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-17T09:52:50.611Z',
          },
          tagType: 'project',
          tagPageLink: '/project/CIMULACT_5i78x',
        },
      ],
      methods: [
        {
          name: 'Dynamic Argumentative Delphi',
          _id: '33bb4d88-50ec-475e-942e-482465054484',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-29T15:39:48.622Z',
          },
          tagLine: 'DAD',
          _updatedDate: {
            $date: '2024-10-29T15:39:48.622Z',
          },
          tagType: 'foresight method',
        },
        {
          popularity: 47,
          name: 'horizon scanning',
          _id: 'b1d63812-7f03-4fa0-bfc7-b8d89363baa8',
          _createdDate: {
            $date: '2024-08-27T09:48:24.957Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.957Z',
          },
          tagType: 'foresight method',
        },
        {
          popularity: 36,
          name: 'scenarios',
          _id: '3c4917d4-7467-4fef-a6a3-af7b61b9e196',
          _createdDate: {
            $date: '2024-08-27T09:48:24.946Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.946Z',
          },
          tagType: 'foresight method',
        },
        {
          popularity: 42,
          name: 'visioning',
          _id: '932d682a-b111-46b2-b6a5-aade8c598da6',
          _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
          _createdDate: {
            $date: '2024-08-27T09:48:24.944Z',
          },
          _updatedDate: {
            $date: '2024-10-15T10:56:02.615Z',
          },
          tagType: 'foresight method',
        },
        {
          name: 'roadmapping',
          _id: '19a0517e-64e5-48f8-823e-f8ca544c6447',
          _owner: '4719082d-ae14-4ecd-924b-bf55a28b8479',
          _createdDate: {
            $date: '2024-10-17T10:44:01.075Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-17T10:44:01.075Z',
          },
          tagType: 'foresight method',
        },
      ],
      pageTypes: [
        {
          popularity: 58,
          name: 'organisation info',
          _id: 'e0e12984-c4f3-4800-b201-3cdf4c4a01e8',
          _createdDate: {
            $date: '2024-08-27T09:51:01.716Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.716Z',
          },
          tagId: 252525,
          tagType: 'page type',
        },
      ],
      projectCoordinator: [],
      description:
        '<p>Institutul de Prospectiva is a research organisation (NGO) with the mission to stimulate future-awareness aimed at addressing the challenges of contemporary societies. To this end, we implement tailored foresight exercises supporting strategic orientation in the public sector, with a focus on foresight for R&amp;I policy at European and national level.</p>\n<p>Prospectiva is part of the Foresight-on-Demand (FOD) consortium, tasked with advising the European Commission and fourteen other EU organisations on science and technology policy programming for a period of four years (April 2014 – March 2028).<br>This is an extension of the previous successful cooperation within the Foresight on Demand framework contract (2019-2023); during this period Prospectiva has contributed to numerous projects, on components related to horizon scanning, large scale Delphi consultations, scenario building, co-creation workshops, speculative design, and the elaboration of various briefs, in-depth case studies and reports. These projects addressed a range of themes, among which the future of food, of retail, of ecosystems’ flourishing, and even of the human condition.</p>\n',
      _id: 'd116a5eb-8c21-4827-a369-8edaae3850a5',
      _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
      _createdDate: {
        $date: '2024-10-14T15:49:24.935Z',
      },
      organisationType: [],
      domains: [
        {
          name: 'Emerging Technologies',
          _id: '414e11bd-1c1c-4d88-b63e-f24a3b2c711a',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T10:37:07.120Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-22T10:37:07.120Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 64,
          name: 'ecosystems',
          _id: '2e9e1f8b-bc85-4f7a-a16b-91f106b4fa75',
          _createdDate: {
            $date: '2024-08-27T09:48:25.096Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.096Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 45,
          name: 'science for policy',
          _id: '0e1048be-630f-424c-806d-bb2aac576213',
          _createdDate: {
            $date: '2024-08-27T09:48:25.067Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.067Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 67,
          name: 'EU R&I policy',
          _id: '74f1a07e-9754-4e06-9091-30d0d7d4e667',
          _createdDate: {
            $date: '2024-08-27T09:48:25.091Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.091Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 52,
          name: 'citizen engagement',
          _id: '3e20987c-c439-4214-bfff-515f49d8a65f',
          _createdDate: {
            $date: '2024-08-27T09:48:25.111Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.111Z',
          },
          tagType: 'domain',
        },
      ],
      personOrganisationFormer: [],
      personProjectParticipation: [],
      _updatedDate: {
        $date: '2024-10-29T16:14:18.185Z',
      },
      slug: 'Prospectiva_fiw2n',
      organisationEstablishedDate: '2012',
      mediaFiles: [
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      Project: [],
      projectOrganisation: [],
      personProjectCoordonation: [],
      organisationProjectRoles: [
        {
          project: 'Futures Garden',
          role: 'Project pilot lead',
        },
        {
          project: 'Eye of Europe',
          role: ' Contributor',
        },
        {
          project: 'S&T&I FOR 2050',
          role: 'Contributor',
        },
        {
          project:
            'Reimagining the Food System: scanning the horizon for emerging social innovations',
          role: 'Contributor',
        },
        {
          project:
            'Foresight towards the 2nd Strategic Plan for Horizon Europe',
          role: 'Contributor',
        },
        {
          project: 'CIMULACT',
          role: 'Contributor',
        },
        {
          role: '',
        },
      ],
      person: [],
      personOrganisation: [],
      countryTag: [
        {
          popularity: 15,
          name: 'Romania',
          _id: 'e4cab9c4-7f21-4ec6-88ad-7aa8698612f4',
          _createdDate: {
            $date: '2024-08-27T09:48:24.766Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.766Z',
          },
          tagType: 'country',
        },
      ],
      title: 'Prospectiva',
      internalLinks: [],
      organisationMemberOf: [
        {
          name: 'Foresight on Demand',
          _id: 'b7d06104-8a2c-4cf5-a4f9-b522f48fef85',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-15T12:21:46.431Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-15T12:21:46.431Z',
          },
          tagType: 'domain',
        },
      ],
      organisationPeopleRoles: [
        {
          person: 'Radu Gheorghiu',
          role: 'President',
        },
        {
          person: 'Bianca Dragomir',
          role: 'Vice-president',
        },
        {
          person: 'Liviu Andreescu',
          role: '',
        },
        {
          person: 'Roxana Dimitriu',
          role: '',
        },
        {
          person: 'Roxana Dimitriu',
          role: '',
        },
        {
          role: '',
        },
      ],
      activity: [],
      projectFunded: [],
      organisationHasMember: [],
      organisationPeople: [
        {
          name: 'Radu Gheorghiu',
          _id: '79e69062-1f22-4acd-bd5c-b4b0f17a3dad',
          _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
          _createdDate: {
            $date: '2024-10-15T09:06:25.839Z',
          },
          _updatedDate: {
            $date: '2024-10-15T09:06:25.839Z',
          },
          tagType: 'person',
        },
        {
          name: 'Bianca Dragomir',
          _id: '90c38dc0-018b-4d55-af76-e2b52130e029',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.344Z',
          },
          tagLine: 'Live deeply and tenderly',
          _updatedDate: {
            $date: '2024-10-14T18:29:46.298Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_957ec9dc2bb74b97b6166aab1d9d0840~mv2.jpg',
          tagType: 'person',
          tagPageLink: '/person/Bianca_Dragomir_q437h',
        },
        {
          name: 'Liviu Andreescu',
          _id: '8ef442ba-d492-4cc3-b297-3f43d489785e',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-29T15:58:29.908Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-29T15:58:29.908Z',
          },
          tagType: 'person',
        },
        {
          name: 'Roxana Dimitriu',
          _id: 'ee8a3332-2eb5-4eaf-8f83-a8b01444ee20',
          _owner: '4719082d-ae14-4ecd-924b-bf55a28b8479',
          _createdDate: {
            $date: '2024-10-14T15:01:39.396Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-14T15:01:39.396Z',
          },
          tagType: 'person',
        },
        {
          _id: '39c9be1e-c537-475a-bc7f-274dddaf34fc',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:38.918Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:38.918Z',
          },
          tagType: 'person',
        },
      ],
    },
    _id: 'd116a5eb-8c21-4827-a369-8edaae3850a5',
  },
  {
    dataCollectionId: 'InfoPages',
    data: {
      projectParticipantTeam: [],
      organisation: [],
      personOrganisationRoles: [
        {
          organisation: 'UEFISCDI',
          role: 'Software Developer',
        },
        {
          organisation: 'University of Bucharest',
          role: 'Test',
        },
        {
          organisation: 'Organisation X',
          role: 'Software Engineer',
        },
        {
          role: '',
        },
      ],
      organisationProject: [],
      methods: [],
      pageTypes: [
        {
          popularity: 91,
          name: 'person info',
          _id: 'ff988067-2fee-41f2-9b33-7eb14d282b17',
          _createdDate: {
            $date: '2024-08-27T09:51:01.715Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.715Z',
          },
          tagId: 252526,
          tagType: 'page type',
        },
      ],
      projectCoordinator: [],
      description: '<p>123 test</p>\n',
      _id: '508173bf-78c8-432d-a5ab-5deb2d035baa',
      _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
      _createdDate: {
        $date: '2024-10-02T20:32:58.904Z',
      },
      organisationType: [],
      domains: [],
      personOrganisationFormer: [],
      personProjectParticipation: [],
      _updatedDate: {
        $date: '2024-10-13T17:51:35.268Z',
      },
      slug: 'Alexandru-Sergiu_Ciobanasu_do62e',
      Project: [],
      projectOrganisation: [],
      personProjectCoordonation: [],
      person: [
        {
          name: 'Alexandru-Sergiu Ciobanasu',
          _id: '91a72bde-aabf-4fd9-b01c-8cb8d34ebdfe',
          _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
          _createdDate: {
            $date: '2024-10-01T22:05:18.462Z',
          },
          tagLine: 'Alexandru-Sergiu Ciobanasu tagline',
          _updatedDate: {
            $date: '2024-10-08T12:00:55.550Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_18bd827550114b98a31041feec80dc04~mv2.jpeg',
          tagType: 'person',
          tagPageLink: '/person/Alexandru-Sergiu_Ciobanasu_do62e',
        },
      ],
      personOrganisation: [
        {
          popularity: 55,
          tagline:
            'Unitatea Executivă pentru Finanțarea Învățământului superior, a Cercetării, Dezvoltării și Inovării',
          trend: '5',
          name: 'UEFISCDI',
          _id: '95224d24-7699-4603-8d55-58c15794dd58',
          _owner: 'd63d4075-c493-4434-b07b-3455eb228b81',
          _createdDate: {
            $date: '2024-08-27T09:48:24.898Z',
          },
          tagLine:
            'The Executive Agency for Higher Education, Research, Development and Innovation Funding of Romania',
          linked: true,
          _updatedDate: {
            $date: '2024-10-29T10:45:39.420Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_f66da0478b09447ba0708a35af2af36c~mv2.png',
          tagType: 'organisation',
          tagPageLink: '/organisation/UEFISCDI_rloxg',
        },
        {
          popularity: 1546,
          name: 'University of Bucharest',
          _id: '55025786-a61e-42d4-8475-6a9329958fa0',
          _owner: 'd63d4075-c493-4434-b07b-3455eb228b81',
          _createdDate: {
            $date: '2024-09-21T13:02:09.852Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-13T14:15:55.224Z',
          },
          picture:
            'wix:image://v1/d63d40_9d7634ea23c545c183ff786706f9b911~mv2.png/Logo_Universitatea_din_Bucure%C8%99ti.png#originWidth=3238&originHeight=2684',
          tagType: 'organisation',
          tagPageLink: '/organisation/unibuc',
        },
        {
          name: 'Organisation X2',
          _id: '47b18b48-f543-4146-8bc5-adb8140866d8',
          _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
          _createdDate: {
            $date: '2024-10-05T09:42:39.486Z',
          },
          tagLine: 'This is a tagline for Organisation X',
          _updatedDate: {
            $date: '2024-10-28T23:23:20.992Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_d548d62205d04ecdab68ff86f34e19bc~mv2.webp',
          tagType: 'organisation',
          tagPageLink: '/organisation/organisation-x-rgzr7',
        },
      ],
      countryTag: [
        {
          popularity: 42,
          name: 'Finland',
          _id: '640a7a20-7496-4b99-b7b9-49902028b577',
          _createdDate: {
            $date: '2024-08-27T09:48:24.770Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.770Z',
          },
          tagType: 'country',
        },
      ],
      title: 'Alexandru-Sergiu Ciobanasu',
      internalLinks: [],
      organisationMemberOf: [],
      activity: [
        {
          popularity: 14,
          name: 'futurist',
          _id: '74fbdf38-08bf-4cf3-8098-17cc3c6e78f6',
          _createdDate: {
            $date: '2024-08-27T09:48:25.128Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.128Z',
          },
          tagType: 'person type',
        },
      ],
      projectFunded: [],
      organisationHasMember: [],
      organisationPeople: [],
      personOrganisationRolesFormer: [
        {
          role: '',
        },
      ],
    },
    _id: '508173bf-78c8-432d-a5ab-5deb2d035baa',
  },
];

const postPagesSample = [
  {
    dataCollectionId: 'PostPages',
    data: {
      projectResultPublicationDate: '2023-11-30T22:00:00.000Z',
      subtitle: 'Scenario and Policy Implications',
      author: [
        {
          name: 'Bianca Dragomir',
          _id: '90c38dc0-018b-4d55-af76-e2b52130e029',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.344Z',
          },
          tagLine: 'Live deeply and tenderly',
          _updatedDate: {
            $date: '2024-10-14T18:29:46.298Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_957ec9dc2bb74b97b6166aab1d9d0840~mv2.jpg',
          tagType: 'person',
          tagPageLink: '/person/Bianca_Dragomir_q437h',
        },
      ],
      people: [],
      postImage2: {
        url: ' ',
        caption: '',
      },
      postContentRIch2: '<p></p>\n',
      methods: [
        {
          popularity: 36,
          name: 'scenarios',
          _id: '3c4917d4-7467-4fef-a6a3-af7b61b9e196',
          _createdDate: {
            $date: '2024-08-27T09:48:24.946Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.946Z',
          },
          tagType: 'foresight method',
        },
      ],
      pageTypes: [
        {
          popularity: 126,
          name: 'project result',
          _id: '649a0649-abfd-43c3-86d5-2765c99f7f31',
          _createdDate: {
            $date: '2024-08-27T09:51:01.712Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.712Z',
          },
          tagId: 252529,
          tagType: 'page type',
        },
      ],
      _id: '7e40ac2a-95b2-40cd-b97f-793dfd7ff333',
      _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
      _createdDate: {
        $date: '2024-10-30T16:44:37.850Z',
      },
      postContentRIch3: '<p></p>\n',
      domains: [
        {
          popularity: 47,
          name: 'climate change',
          _id: '21181beb-717e-44c5-aa42-1497a9ab763c',
          _createdDate: {
            $date: '2024-08-27T09:48:25.108Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.108Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 58,
          name: 'green skills',
          _id: '4ff73370-83a5-46b0-9b07-f44fb938ef2d',
          _createdDate: {
            $date: '2024-08-27T09:48:25.085Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.085Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 67,
          name: 'EU R&I policy',
          _id: '74f1a07e-9754-4e06-9091-30d0d7d4e667',
          _createdDate: {
            $date: '2024-08-27T09:48:25.091Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.091Z',
          },
          tagType: 'domain',
        },
      ],
      postImage1: {
        url: 'https://static.wixstatic.com/media/471908_47411f9857d54622872d071b2e4c3b72~mv2.webp',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-30T16:44:37.850Z',
      },
      slug: 'futures-of-green-skills-and-jobs-in-europe-in-2050-8phsp',
      mediaFiles: [
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      moderators: [],
      speakers: [],
      organisations: [
        {
          name: 'DG RTD',
          _id: '7be555b9-5274-4e4f-b733-64969fdf8781',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-28T20:39:19.424Z',
          },
          tagLine:
            'Directorate-General for Research and Innovation of the European Commission',
          _updatedDate: {
            $date: '2024-10-28T20:39:19.424Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 30,
          tagline: 'Insight Foresight Institute SL',
          name: 'IFI',
          _id: '76749d48-09c7-4023-9741-baacc42ab6fc',
          _createdDate: {
            $date: '2024-08-27T09:48:24.811Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.811Z',
          },
          tagType: 'organisation',
        },
      ],
      postContentRIch1:
        '<p>Climate change and environmental degradation are an existential threat to the European Union and to the world. As a response, among other things, the European Green Deal aims to make Europe climate-neutral by 2050, boost the economy through green technology, create sustainable industry and transport, and cut pollution. The transition towards greener and more sustainable economies is a game changer in the EU labour market alongside digitalisation and automation. Skill needs will change with impacts far beyond the key occupations driving them, affecting all economic sectors.<br><br>Europe needs to promote and support green employment, address the skilling and reskilling of workers, and anticipate changes in workplaces of the future. In order to get a better grasp on potential future outcomes, and better anticipate their potential policy implications, a foresight Deep Dive has been carried out. The Deep Dive uses a broad conceptualization of skills that encompasses the full palette from scientific and engineering skills to vocational and crafts-like skills. All are needed in the green labour market, although the scenario-led focus here for the most part is on skills of vocational professions. This policy brief presents the main findings.<br><br>A set of four different scenarios for the futures of green skills and jobs in Europe in 2050 were crafted:<br></p>\n<ul>\n<li>Scenario A: Green technology-intensive Europe: Struggling to fill all the green jobs</li>\n<li>Scenario B: Apocalypse Soon: Fighting skills mismatches in a degraded environment\r</li>\n<li>Scenario C: Feeling the pain: A workforce left behind in a non-green world</li>\n<li>Scenario D: Green leapfrogging: Old, mismatched Europe surrounded by new green giants</li>\n</ul>\n',
      projects: [
        {
          name: 'European R&I foresight and public engagement for Horizon Europe',
          _id: 'e65dc072-d2a2-4e4e-86e5-d8cd198ac8fc',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-30T15:58:05.133Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T16:13:08.903Z',
          },
          tagType: 'project',
          tagPageLink:
            '/project/european-ri-foresight-and-public-engagement-for-horizon-europe-bveiy',
        },
      ],
      countryTag: [
        {
          name: 'EU',
          _id: 'e1b13728-5253-484b-92d6-0c451813adff',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T10:28:23.621Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-22T10:28:23.621Z',
          },
          tagType: 'country',
        },
      ],
      title: 'Futures of Green Skills and Jobs in Europe in 2050',
      projectResultMedia: {
        url: 'https://0bbe2e34-e503-441a-af9e-4fc70c17e6af.usrfiles.com/ugd/471908_21fc8fe4440a499eb099cb9b533b4584.pdf',
        fileName:
          'Futures of Green Skills and Jobs in Europe in 2050_Scenario and Policy Implications.pdf',
        thumbnail:
          'https://static.wixstatic.com/media/471908_a02bfdf338034c719696bf9f2c58a28d~mv2.jpeg',
        sizeInBytes: '1085552',
        type: 'document',
      },
      internalLinks: [],
      projectResultAuthor: [
        {
          name: 'Mikkel Knudsen',
          _id: 'bb6d79aa-1062-45eb-b889-1f509e9db78d',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.222Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.222Z',
          },
          tagType: 'person',
        },
        {
          name: 'Marjolein Caniels',
          _id: '42e4ba40-ca96-4ae6-af21-416ddd8e8942',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:38.964Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:38.964Z',
          },
          tagType: 'person',
        },
        {
          name: 'Peter Dickinson',
          _id: '522f8876-c280-4f81-b5da-a026b8a6d9b2',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:38.998Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:38.998Z',
          },
          tagType: 'person',
        },
        {
          name: 'Michel Hery',
          _id: '5f7b0ee4-51f9-48e4-a46b-aec84039e384',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-30T16:36:25.460Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T16:36:25.460Z',
          },
          tagType: 'person',
        },
        {
          name: 'Totti Könnölä',
          _id: '4bc3a4f3-f901-4670-80bf-f25ddd26163b',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:38.990Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:38.990Z',
          },
          tagType: 'person',
        },
        {
          name: 'Heila Lotz-Sisitka',
          _id: '71069e4a-dfc4-453e-a365-d069fb170505',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.141Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.141Z',
          },
          tagType: 'person',
        },
      ],
    },
    _id: '7e40ac2a-95b2-40cd-b97f-793dfd7ff333',
  },
  {
    dataCollectionId: 'PostPages',
    data: {
      projectResultPublicationDate: '2023-12-31T22:00:00.000Z',
      subtitle: 'Scenarios and Policy Implications',
      author: [
        {
          name: 'Bianca Dragomir',
          _id: '90c38dc0-018b-4d55-af76-e2b52130e029',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.344Z',
          },
          tagLine: 'Live deeply and tenderly',
          _updatedDate: {
            $date: '2024-10-14T18:29:46.298Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_957ec9dc2bb74b97b6166aab1d9d0840~mv2.jpg',
          tagType: 'person',
          tagPageLink: '/person/Bianca_Dragomir_q437h',
        },
      ],
      people: [],
      postImage2: {
        url: ' ',
        caption: '',
      },
      postContentRIch2:
        '<p>Large R&amp;D-based companies (Big Tech) have risen as major institutions driving technology, defining networks, shaping markets and influencing the ways we live. These companies are heavily concen-trated in some parts of the world, most of them within the West Coast of the United States, with a few emerging challengers in Mainland China, Taiwan and elsewhere. Other continents, including Europe, participate marginally in the development of the knowledge-bases which, apparently, may well come to dominate the future. Societies have come to rely on Big Tech from how we do business to how we consume and connect with others. And decision-makers, regulators and stakeholders grapple with breakthrough innovations, enhanced connectivity, lopsided competition and a number of ethical and political implications for how societies govern themselves.<br><br>Organised societies face difficult choices. Should Big Tech be let free to carry on unimpeded? Should government break them up or try to tame them by imposing detailed standards of conduct? Should national and supra-national authorities aim at giving rise to new and alternative undertakings able to develop at far-reaching scale and scope? Or should policy actors give priority to an economic fabric full of smaller-sized enterprises that are alive and adaptive at the local level? <br><br>As many times in the past, the configuration of the present seems stiff and self-reinforcing. But a foresight perspective invites an awareness of the possibility of disruptions or genuine novelty in things to come. It is uncertain if current trends will be sustained over time or how they will be accommodated. Probing into the unknown can be inspiring and increase panoramic awareness. It also sets a base for being pro-active about destiny. Thus, studying the future(s) is a deliberation to be already being on the move. That is a productive, non-neutral and liberating attitude. A chance for aligning the possible with the desirable.<br><br><strong>This policy brief addresses the challenge of anticipating of what “Big Tech” will imply for the future of Europe. In our deep dive we project towards 2040 and explore the implications to Europe emphasising research and innovation policy. <br><br></strong>The <strong>scenario work</strong>, that comprises the bulk of this report, frames debates about industrial change and international political economy with the overarching vector of high-tech activities and offers a balancing, hopefully also piercing, view. We derive <strong>policy options</strong> for each scenario but also draw cross-cut-ting implications. Could tech-driven large companies be instruments for the European Union (EU) to respond effectively to the challenges of the future economy? Is this a viable, feasible option? Conversely, have foreign-owned Big Tech already won and will the EU be hostage to the tentacles of such sprawling giants? Can it adapt through bottom-up economic action? For all this, it was about time to tackle these pressing issues.</p>\n',
      methods: [
        {
          popularity: 36,
          name: 'scenarios',
          _id: '3c4917d4-7467-4fef-a6a3-af7b61b9e196',
          _createdDate: {
            $date: '2024-08-27T09:48:24.946Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.946Z',
          },
          tagType: 'foresight method',
        },
      ],
      pageTypes: [
        {
          popularity: 126,
          name: 'project result',
          _id: '649a0649-abfd-43c3-86d5-2765c99f7f31',
          _createdDate: {
            $date: '2024-08-27T09:51:01.712Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.712Z',
          },
          tagId: 252529,
          tagType: 'page type',
        },
      ],
      _id: '9653bcea-7934-41d1-8cf4-67c96cd6235f',
      _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
      _createdDate: {
        $date: '2024-10-30T16:18:10.301Z',
      },
      postContentRIch3: '<p></p>\n',
      domains: [
        {
          popularity: 51,
          name: 'big tech',
          _id: '33dc2ff6-d497-4816-95ab-0e015ba0bd55',
          _createdDate: {
            $date: '2024-08-27T09:48:25.114Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.114Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 67,
          name: 'EU R&I policy',
          _id: '74f1a07e-9754-4e06-9091-30d0d7d4e667',
          _createdDate: {
            $date: '2024-08-27T09:48:25.091Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.091Z',
          },
          tagType: 'domain',
        },
      ],
      postImage1: {
        url: ' ',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-30T16:30:22.537Z',
      },
      slug: 'futures-of-big-tech-7ujka',
      mediaFiles: [
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      moderators: [],
      speakers: [],
      organisations: [
        {
          name: 'DG RTD',
          _id: '7be555b9-5274-4e4f-b733-64969fdf8781',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-28T20:39:19.424Z',
          },
          tagLine:
            'Directorate-General for Research and Innovation of the European Commission',
          _updatedDate: {
            $date: '2024-10-28T20:39:19.424Z',
          },
          tagType: 'organisation',
        },
      ],
      postContentRIch1: '<p></p>\n',
      projects: [
        {
          name: 'European R&I foresight and public engagement for Horizon Europe',
          _id: 'e65dc072-d2a2-4e4e-86e5-d8cd198ac8fc',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-30T15:58:05.133Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T16:13:08.903Z',
          },
          tagType: 'project',
          tagPageLink:
            '/project/european-ri-foresight-and-public-engagement-for-horizon-europe-bveiy',
        },
      ],
      countryTag: [
        {
          name: 'EU',
          _id: 'e1b13728-5253-484b-92d6-0c451813adff',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T10:28:23.621Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-22T10:28:23.621Z',
          },
          tagType: 'country',
        },
      ],
      title: 'Futures of Big Tech',
      projectResultMedia: {
        url: 'https://0bbe2e34-e503-441a-af9e-4fc70c17e6af.usrfiles.com/ugd/471908_b4aa933ca031495eadc55b3363457566.pdf',
        fileName:
          'Futures of Big Tech in Europe. Scenarios and Policy Implications (2).pdf',
        thumbnail:
          'https://static.wixstatic.com/media/471908_3dac368ed66c4d22a5a90d98fb15552d~mv2.jpeg',
        sizeInBytes: '2072892',
        type: 'document',
      },
      internalLinks: [],
      projectResultAuthor: [
        {
          name: 'Sandro Mendonça',
          _id: '186bd531-df77-454e-9277-b20d1cb5e6da',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.019Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.019Z',
          },
          tagType: 'person',
        },
        {
          name: 'Daniele Archibugi',
          _id: '15251d63-0cf6-4e05-be9d-712221890838',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-30T16:23:13.335Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T16:23:13.335Z',
          },
          tagType: 'person',
        },
        {
          name: 'Anna Gerbrandy',
          _id: 'd25cd16c-041f-4de0-bb8d-42e72d23aa56',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-30T16:24:14.789Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T16:24:14.789Z',
          },
          tagType: 'person',
        },
        {
          name: 'Lena Tsipouri',
          _id: '76c20084-2109-4007-b7ec-c19ba2bb4325',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-30T16:24:53.778Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T16:24:53.778Z',
          },
          tagType: 'person',
        },
      ],
    },
    _id: '9653bcea-7934-41d1-8cf4-67c96cd6235f',
  },
  {
    dataCollectionId: 'PostPages',
    data: {
      projectResultPublicationDate: '2022-10-31T22:00:00.000Z',
      author: [
        {
          name: 'Bianca Dragomir',
          _id: '90c38dc0-018b-4d55-af76-e2b52130e029',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.344Z',
          },
          tagLine: 'Live deeply and tenderly',
          _updatedDate: {
            $date: '2024-10-14T18:29:46.298Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_957ec9dc2bb74b97b6166aab1d9d0840~mv2.jpg',
          tagType: 'person',
          tagPageLink: '/person/Bianca_Dragomir_q437h',
        },
      ],
      people: [
        {
          name: 'Totti Könnölä',
          _id: '4bc3a4f3-f901-4670-80bf-f25ddd26163b',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:38.990Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:38.990Z',
          },
          tagType: 'person',
        },
        {
          name: 'Albert Norström',
          _id: 'ce93217a-92b0-49c4-9c61-2f30a458ca4a',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.353Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.353Z',
          },
          tagType: 'person',
        },
        {
          name: 'Benjamin Sovacool',
          _id: '631047dc-2318-408e-8197-8a6d709f01da',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:38.895Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:38.895Z',
          },
          tagType: 'person',
        },
        {
          name: 'Duncan McLaren',
          _id: '2f537c12-9bb2-49fa-b250-3ee7d239d1d9',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.023Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.023Z',
          },
          tagType: 'person',
        },
        {
          name: 'Sirkku Juhola',
          _id: 'c3e5dc6e-74a6-494d-b0a0-876db817e4cd',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.267Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.267Z',
          },
          tagType: 'person',
        },
      ],
      postImage2: {
        url: ' ',
        caption: '',
      },
      postContentRIch2:
        '<p>Climate change impacts are one of the main threats to human society and natural ecosystems. Even though natural dynamics also have a substantial effect on climate, there is no doubt that current alterations of climate with the correlated impacts are manmade. Alongside continuing efforts to reduce emissions and adapt to climate change, there may be possibilities to geoengineer climate systems to reduce or mask the impacts of climate change. There are also strong arguments for large-scale changes in social practices for adapting to and mitigating climate change. The big challenge comes with the necessary scale of interventions as those changes need to be large-scale and global, putting new challenges to all levels of governance from local to global.</p>\n<p>Many present drivers seem to indicate a gloomy future for the climate. The current individualistic mindsets drive overconsumption and overproduction. The offsetting of carbon emissions is sometimes used to compensate for dirty activities. Intense competition for natural resources is not safeguarding their sustainability. Bio-holistic worldviews confront anthropocentric views, but climate delay has emerged as the new denial and the lack of courage to address climate supremacists, i.e. the global wealthy, shows little change of direction. According to a 2020 report from Oxfam and the Stockholm Environment Institute, the wealthiest top 1% were responsible for 15% of global emissions, nearly twice as much as the world’s poorest 50%, who were responsible for just 7%. Overly optimistic beliefs in tech or social transformation to solve it prevail, and there is a wide reluctance to consider broad system change.</p>\n<p>There are also drivers towards desired futures. Improved understanding of climate and global change and the capacity and knowledge to purposefully shape nature and society provide better means to address climate change. Climate anxiety and perception of government inaction have triggered, for instance, the ‘Fridays for future’ movement, which contributes to the emergence of global conscience on the climate and biodiversity crisis and the need for justice. New understandings of human purpose and fairness also encourage the development of a wider range of responses like de-desertification, seaweed permaculture, ocean fertilization, carbon capture and storage, and solar radiation management. We may learn to protect the global commons, including indigenous cultures and atmospheric commons.</p>\n<p>Economic growth in societies based on individual material gain, here-and-now-thinking, short political cycles, and lack of broad political agreement on alternative paths seem to keep us on the path to the climate crisis. Furthermore, exacerbated social inequalities may lead many to have no willingness or ability to participate in transitions. While we are overconfident with systems’ design, we underestimate natural forces and ecosystems. Emerging options for large-scale ‘geoengineering’ interventions in the climate system promise new opportunities and new risks, including novel geopolitical tensions.There are diverse perceptions on geoengineering and possible social change towards potential acceptance or societal rejection. The planet lacks a fair and appropriate governance structure providing a framework on who might be entitled to carry out geoengineering projects in the name of the planet and what their responsibility is. There is no sufficient dialogue on what it means to be a responsible company, researcher, research organisation, or policy-maker in this context.</p>\n<p>This deep dive is part of the Foresight towards the 2nd Strategic Plan of Horizon Europe project.</p>\n',
      methods: [
        {
          popularity: 36,
          name: 'scenarios',
          _id: '3c4917d4-7467-4fef-a6a3-af7b61b9e196',
          _createdDate: {
            $date: '2024-08-27T09:48:24.946Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.946Z',
          },
          tagType: 'foresight method',
        },
      ],
      pageTypes: [
        {
          popularity: 126,
          name: 'project result',
          _id: '649a0649-abfd-43c3-86d5-2765c99f7f31',
          _createdDate: {
            $date: '2024-08-27T09:51:01.712Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.712Z',
          },
          tagId: 252529,
          tagType: 'page type',
        },
      ],
      _id: 'fdca3685-ae0e-4dc4-9f62-fd2de2046be1',
      _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
      _createdDate: {
        $date: '2024-10-28T21:17:09.665Z',
      },
      postContentRIch3: '<p></p>\n',
      domains: [
        {
          popularity: 47,
          name: 'climate change',
          _id: '21181beb-717e-44c5-aa42-1497a9ab763c',
          _createdDate: {
            $date: '2024-08-27T09:48:25.108Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.108Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 49,
          name: 'geoengineering',
          _id: '050855fa-fe84-4a04-84c2-f9b1298b7171',
          _createdDate: {
            $date: '2024-08-27T09:48:25.088Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.088Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 64,
          name: 'ecosystems',
          _id: '2e9e1f8b-bc85-4f7a-a16b-91f106b4fa75',
          _createdDate: {
            $date: '2024-08-27T09:48:25.096Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.096Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 67,
          name: 'EU R&I policy',
          _id: '74f1a07e-9754-4e06-9091-30d0d7d4e667',
          _createdDate: {
            $date: '2024-08-27T09:48:25.091Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.091Z',
          },
          tagType: 'domain',
        },
      ],
      postImage1: {
        url: 'https://static.wixstatic.com/media/471908_c0d0ebcfdcca4182b6d4a6c225c2c010~mv2.webp',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-29T10:46:47.076Z',
      },
      slug: 'deep-dive-climate-geo-engineering-jhbrh',
      mediaFiles: [
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      moderators: [],
      speakers: [],
      organisations: [
        {
          popularity: 30,
          tagline: 'Insight Foresight Institute SL',
          name: 'IFI',
          _id: '76749d48-09c7-4023-9741-baacc42ab6fc',
          _createdDate: {
            $date: '2024-08-27T09:48:24.811Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.811Z',
          },
          tagType: 'organisation',
        },
      ],
      postContentRIch1: '<p></p>\n',
      projects: [
        {
          name: 'Foresight towards the 2nd Strategic Plan for Horizon Europe',
          _id: 'b853a2cf-94b7-40b5-bb70-ee2a2dd53ce8',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-14T18:33:00.732Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T15:55:02.077Z',
          },
          tagType: 'project',
          tagPageLink:
            '/project/Foresight_towards_the_2nd_Strategic_Plan_for_Horizon_Europe_bzq9u',
        },
      ],
      countryTag: [
        {
          name: 'EU',
          _id: 'e1b13728-5253-484b-92d6-0c451813adff',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T10:28:23.621Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-22T10:28:23.621Z',
          },
          tagType: 'country',
        },
      ],
      title: 'Deep Dive: Climate & Geo-Engineering',
      projectResultMedia: {
        url: 'https://0bbe2e34-e503-441a-af9e-4fc70c17e6af.usrfiles.com/ugd/471908_fafdf5499d934086ae2b46ea51a73b04.pdf',
        fileName: 'Climate Change, R',
        thumbnail:
          'https://static.wixstatic.com/media/471908_142c25f1df2b442cb3779b7881d82f36~mv2.jpeg',
        sizeInBytes: '2940855',
        type: 'document',
      },
      internalLinks: [],
      projectResultAuthor: [
        {
          name: 'Totti Könnölä',
          _id: '4bc3a4f3-f901-4670-80bf-f25ddd26163b',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:38.990Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:38.990Z',
          },
          tagType: 'person',
        },
      ],
    },
    _id: 'fdca3685-ae0e-4dc4-9f62-fd2de2046be1',
  },
  {
    dataCollectionId: 'PostPages',
    data: {
      projectResultPublicationDate: '2022-10-31T22:00:00.000Z',
      author: [
        {
          name: 'Bianca Dragomir',
          _id: '90c38dc0-018b-4d55-af76-e2b52130e029',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.344Z',
          },
          tagLine: 'Live deeply and tenderly',
          _updatedDate: {
            $date: '2024-10-14T18:29:46.298Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_957ec9dc2bb74b97b6166aab1d9d0840~mv2.jpg',
          tagType: 'person',
          tagPageLink: '/person/Bianca_Dragomir_q437h',
        },
      ],
      people: [
        {
          name: 'Susanne Giesecke',
          _id: 'e0e6a5ef-ae5b-46e6-8e95-71c625b7f4c2',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.235Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.235Z',
          },
          tagType: 'person',
        },
        {
          name: 'Jennifer Harper',
          _id: 'b7ee604b-d93b-4b43-b729-e7b5941aa62e',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-28T20:51:00.597Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-28T20:51:00.597Z',
          },
          tagType: 'person',
        },
        {
          name: 'Dana Wasserbacher',
          _id: '8789f421-e784-48fa-a8ad-e877e00d9e7f',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.084Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.084Z',
          },
          tagType: 'person',
        },
        {
          name: 'Cristiano Cagnin',
          _id: 'c6f7c013-7147-4930-8836-b2fdd7057295',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-28T20:49:54.624Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-28T20:49:54.624Z',
          },
          tagType: 'person',
        },
        {
          name: 'kerstin.cuhls',
          _id: 'd370618b-7a98-4073-b4db-8fcfaae2da0e',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.188Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.188Z',
          },
          tagType: 'person',
        },
        {
          name: 'Luke Georghiou ',
          _id: '87fb57c8-d9d5-41ab-88a6-8af205a60edc',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:38.945Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:38.945Z',
          },
          tagType: 'person',
        },
        {
          name: 'Keith Smith',
          _id: '1b6a0fe8-cc3c-4810-9240-462b84dabcc2',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-28T20:50:41.504Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-28T20:50:41.504Z',
          },
          tagType: 'person',
        },
        {
          name: 'Luk Van Langenhove',
          _id: '8580a943-5375-4017-b47b-28190d1d2b86',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.036Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.036Z',
          },
          tagType: 'person',
        },
      ],
      postImage2: {
        url: ' ',
        caption: '',
      },
      postContentRIch2:
        "<p>The concept of the global commons refers to resource domains that fall outside national jurisdiction, to which all have access, including high seas, airspace, outer space, and cyberspace. Given the growing significance of these domains and related resources for states and other global and local players across a range of purposes, defining the concept of the global commons has become more complex. The Global Commons Alliance network of concerned organisations refers to two definitions of the concept.</p>\n<p><br>The first is based on geopolitics, where the global commons are areas whose potential economic resources lie beyond national jurisdiction: the atmosphere, the high seas, Antarctica, and outer space. The second definition has its roots more in economics and how shared resources can be overused by some at the expense of others, regardless of national jurisdiction. The strategic access and use of resource domains for military/commercial purposes put pressure on their status. Recent geopolitical developments highlight the need for exploring appropriate forms of global governance or stewardship to ensure responsible (sustainable) management to benefit present and future generations.</p>\n<p>This deep dive aims to address the following questions:<br></p>\n<ul>\n<li><strong>What constitutes a global commons?</strong> How do global commons differ? How is the concept of global commons likely to evolve up to 2040? Adapting a taxonomy of global commons for the emerging geopolitical, environmental, and economic context.</li>\n<li><strong>What are the main emerging disruptors of global commons up to 2040?</strong> What could change and upset established global commons regimes? How can laws be introduced and implemented in emerging global commons? The emphasis is on geopolitics and how legal frameworks can survive technological change. How can innovation reinforce the commons?</li>\n<li><strong>How is the economics of common property evolving </strong>(from Hardin's very influential work to the massive critique of Hardin by Elinor Ostrom)? linking to major policy debates such as privatisation. Can Ostrom’s approach be scaled up to the level of states? and extended to the common property of the atmosphere or oceans? What would be necessary for such a large-scale negotiation process?</li>\n<li><strong>How can we govern the commons as a different type of ownership?</strong> The emergence of global commons-orientation in innovation? In particular mission-oriented innovation. Exploring the rights and personality of ecosystems and other entities as right holders. Ecological services as transversal.</li>\n<li><strong>How can we make the global commons work?</strong> - the need for cooperative behaviour if global commons and sustainability are to be achieved. Multilateralism 2.0. and emerging role of science diplomacy up to 2040.  Ukraine war as an epochal war: the dangers of the war (state of permanent cold war) for acting seriously on the global commons. Potential split with China and new hegemonies in Africa (e.g Belt and Road debt).<br><br><br>The aim is to identify cross impacts of the global commons areas and key drivers.</li>\n</ul>\n",
      methods: [
        {
          popularity: 36,
          name: 'scenarios',
          _id: '3c4917d4-7467-4fef-a6a3-af7b61b9e196',
          _createdDate: {
            $date: '2024-08-27T09:48:24.946Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.946Z',
          },
          tagType: 'foresight method',
        },
      ],
      pageTypes: [
        {
          popularity: 126,
          name: 'project result',
          _id: '649a0649-abfd-43c3-86d5-2765c99f7f31',
          _createdDate: {
            $date: '2024-08-27T09:51:01.712Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.712Z',
          },
          tagId: 252529,
          tagType: 'page type',
        },
      ],
      _id: 'b8e3da44-af14-4655-bf1f-1fa5eff8c64b',
      _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
      _createdDate: {
        $date: '2024-10-28T20:59:54.056Z',
      },
      postContentRIch3: '<p></p>\n',
      domains: [
        {
          popularity: 67,
          name: 'EU R&I policy',
          _id: '74f1a07e-9754-4e06-9091-30d0d7d4e667',
          _createdDate: {
            $date: '2024-08-27T09:48:25.091Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.091Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 60,
          name: 'global commons',
          _id: '8821a181-fe19-4948-98b7-dbb83f9c7b59',
          _createdDate: {
            $date: '2024-08-27T09:48:25.086Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.086Z',
          },
          tagType: 'domain',
        },
      ],
      postImage1: {
        url: 'https://static.wixstatic.com/media/471908_5bd974c8e7084cafa54f35c6c7ae2269~mv2.webp',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-29T10:46:56.189Z',
      },
      slug: 'deep-dive-the-emergence-of-global-commons-a-new-opportunity-for-science-business-and-governance-m3iwk',
      mediaFiles: [
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      moderators: [],
      speakers: [],
      organisations: [
        {
          name: 'Austrian Institute of Technology',
          _id: 'e425fce1-879a-42b8-b154-b5590cb1cd71',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-21T18:09:57.361Z',
          },
          tagLine: 'AIT',
          _updatedDate: {
            $date: '2024-10-21T18:09:57.361Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 106,
          name: 'Fraunhofer ISI',
          _id: 'b83286d1-5153-4efa-b694-e1828ca61739',
          _createdDate: {
            $date: '2024-08-27T09:48:24.829Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.829Z',
          },
          tagType: 'organisation',
        },
      ],
      postContentRIch1: '<p></p>\n',
      projects: [
        {
          name: 'Foresight towards the 2nd Strategic Plan for Horizon Europe',
          _id: 'b853a2cf-94b7-40b5-bb70-ee2a2dd53ce8',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-14T18:33:00.732Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T15:55:02.077Z',
          },
          tagType: 'project',
          tagPageLink:
            '/project/Foresight_towards_the_2nd_Strategic_Plan_for_Horizon_Europe_bzq9u',
        },
      ],
      countryTag: [
        {
          name: 'EU',
          _id: 'e1b13728-5253-484b-92d6-0c451813adff',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T10:28:23.621Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-22T10:28:23.621Z',
          },
          tagType: 'country',
        },
      ],
      title:
        'Deep Dive: The emergence of global commons: A new opportunity for science, business, and governance',
      projectResultMedia: {
        url: 'https://0bbe2e34-e503-441a-af9e-4fc70c17e6af.usrfiles.com/ugd/471908_d6387fb91dd645268b7d9f5dac71c9ec.pdf',
        fileName: 'Deep Dive Global Commons_Final report_draft.pdf',
        thumbnail:
          'https://static.wixstatic.com/media/471908_0a5df975db074b44a9fcfcb6fa1aa65d~mv2.jpeg',
        sizeInBytes: '731433',
        type: 'document',
      },
      internalLinks: [],
      projectResultAuthor: [
        {
          name: 'Dana Wasserbacher',
          _id: '8789f421-e784-48fa-a8ad-e877e00d9e7f',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.084Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.084Z',
          },
          tagType: 'person',
        },
      ],
    },
    _id: 'b8e3da44-af14-4655-bf1f-1fa5eff8c64b',
  },
  {
    dataCollectionId: 'PostPages',
    data: {
      projectResultPublicationDate: '2022-12-31T22:00:00.000Z',
      author: [
        {
          name: 'Bianca Dragomir',
          _id: '90c38dc0-018b-4d55-af76-e2b52130e029',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.344Z',
          },
          tagLine: 'Live deeply and tenderly',
          _updatedDate: {
            $date: '2024-10-14T18:29:46.298Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_957ec9dc2bb74b97b6166aab1d9d0840~mv2.jpg',
          tagType: 'person',
          tagPageLink: '/person/Bianca_Dragomir_q437h',
        },
      ],
      people: [
        {
          name: 'Bianca Dragomir',
          _id: '90c38dc0-018b-4d55-af76-e2b52130e029',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.344Z',
          },
          tagLine: 'Live deeply and tenderly',
          _updatedDate: {
            $date: '2024-10-14T18:29:46.298Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_957ec9dc2bb74b97b6166aab1d9d0840~mv2.jpg',
          tagType: 'person',
          tagPageLink: '/person/Bianca_Dragomir_q437h',
        },
        {
          name: 'Radu Gheorghiu',
          _id: '79e69062-1f22-4acd-bd5c-b4b0f17a3dad',
          _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
          _createdDate: {
            $date: '2024-10-15T09:06:25.839Z',
          },
          _updatedDate: {
            $date: '2024-10-15T09:06:25.839Z',
          },
          tagType: 'person',
        },
        {
          name: 'Aureli SORIA-FRISCH',
          _id: '40d5d7fe-6745-4f91-9fd8-e5ce90b4fe2c',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:38.963Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:38.963Z',
          },
          tagType: 'person',
        },
        {
          name: 'Maarja Kruusmaa',
          _id: 'c64fa7c9-846b-4f3e-a12b-63e3e047728e',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-28T20:31:27.333Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-28T20:31:27.333Z',
          },
          tagType: 'person',
        },
        {
          name: 'Nils Heyen',
          _id: 'f76c2a11-ac56-486b-9c99-91664e04150e',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-28T20:31:43.341Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-28T20:31:43.341Z',
          },
          tagType: 'person',
        },
        {
          name: 'Maria Blasco',
          _id: 'f8401cdc-4ad6-44d3-acef-79f452140deb',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-28T20:31:57.299Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-28T20:31:57.299Z',
          },
          tagType: 'person',
        },
      ],
      postImage2: {
        url: ' ',
        caption: '',
      },
      postContentRIch2:
        '<p>The twelve scenarios in this deep dive are informed by transhumanism, portraying futures in which the human condition – our bodies, functions, and lives – and the features of societies are fundamentally transformed by technology. Even though scenarios are built along the lines of particular scientific and/or technological advancements, the discussion spreads over sociotechnical ensembles and the re-conceptualization of the relationship between technology and society by 2040.</p>\n<p><br>The work leading to this report started with a horizon scanning exercise to identify a series of technological innovations and scientific breakthroughs that may be considered key factors towards re-engineering human nature. In parallel, the authors explored diverse narratives regarding the human condition and significance in the world, dreams and fears embodied in the so-called collective imaginary, echoing through myths and fantasies to literature, cinematography and the wider culture. At the intersection of these explorations, twelve topics were selected and further expanded into scenarios. They are not intended to cover the full spectrum of themes regarding human enhancement, but present a relevant ‘sample’ of potential future trajectories.</p>\n<p><br>We propose these narratives as<strong> exploratory scenarios</strong>, describing futures where both positive and negative consequences are palpable. They are not normative, outlininga vision of the future deemed desirable. We invite readers to regard them as devices for imagining the future and debating the future. They aim to nurture a reflection on the dynamics of change, future opportunities and potential threats, and in doing so they contribute to future preparedness.</p>\n<p><br>Three types of scenarios were developed:</p>\n<ul>\n<li>The first type describe futures where scientific and technological advancements <strong>enhance embodied experiences</strong>: <em>Sensory augmentation</em>:  extending human senses beyond the natural limits and adding sensorial modalities which are not native to humans. <em>Sensory and brain stimulation, psychedelic microdosin</em>g: inducing altered states of consciousness, for healing purposes or for fostering new perspectives on being human. <em>Molecular therapies for delaying aging</em>; and <em>new artificial reproductive technologies </em>allowing people to be fertile until much older age.</li>\n<li>The second type explore futures where human capabilities are <strong>extended by embodying non-biological means</strong>: a significant share of elderly people using <em>exoskeletons</em> for prolonging active life, for maintaining their mobility or as a form of assisted living; <em> brain-computer interfaces</em> leveraged in semi-automatized work environments, to improve learning outcomes, and to control smart devices;  <em>Brain to brain communication</em> supporting cognitive and emotion sharing, leading to the creation of ‘hive minds’ covering multiple aspects of life.</li>\n<li>The third type focus on the <strong>simulation and replication of the human body and mind</strong>:<em> Digital body twins</em> allowing alert signals for disease prevention and the simulation of the short- and long-term effects of a person’s behavior on their health and body; <em>Digital twins of the brain</em> allowing testing hypotheses in cognitive science, in mental health studies, responses to different types of treatments;  <em>Digital immersive worlds</em> – gaming/ fantasy worlds or ‘mirror worlds’ that are replicating real-life environments – hosting interactions among people and automated entities;  <em>Digital replicas of the deceased</em> changing the socio-political understanding of grief; and <em>Artificial agents</em> with complex underlying computational procedures (including e.g. self-reflection, development of value system, affective computing) and sophisticated interfaces calling for new theoretical frameworks of consciousness.<br><br><br>***<br>The twelve scenarios presented in this deep dive are part of the Foresight towards the 2nd Strategic Plan of Horizon Europe project, which was conducted by Foresight on Demand Consortium on behalf of the European Commission’s Directorate-General for Research and Innovation (DG RTD).</li>\n</ul>\n',
      methods: [
        {
          popularity: 47,
          name: 'horizon scanning',
          _id: 'b1d63812-7f03-4fa0-bfc7-b8d89363baa8',
          _createdDate: {
            $date: '2024-08-27T09:48:24.957Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.957Z',
          },
          tagType: 'foresight method',
        },
        {
          popularity: 36,
          name: 'scenarios',
          _id: '3c4917d4-7467-4fef-a6a3-af7b61b9e196',
          _createdDate: {
            $date: '2024-08-27T09:48:24.946Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.946Z',
          },
          tagType: 'foresight method',
        },
      ],
      pageTypes: [
        {
          popularity: 126,
          name: 'project result',
          _id: '649a0649-abfd-43c3-86d5-2765c99f7f31',
          _createdDate: {
            $date: '2024-08-27T09:51:01.712Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.712Z',
          },
          tagId: 252529,
          tagType: 'page type',
        },
      ],
      _id: 'ded259c3-c001-4e5c-95d0-08b4c8e524b8',
      _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
      _createdDate: {
        $date: '2024-10-28T20:39:28.266Z',
      },
      postContentRIch3: '<p></p>\n',
      domains: [
        {
          popularity: 43,
          name: 'transhumanism',
          _id: '4369e526-6267-4afc-a73c-af45bf2ef9e0',
          _createdDate: {
            $date: '2024-08-27T09:48:25.060Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.060Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 67,
          name: 'EU R&I policy',
          _id: '74f1a07e-9754-4e06-9091-30d0d7d4e667',
          _createdDate: {
            $date: '2024-08-27T09:48:25.091Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.091Z',
          },
          tagType: 'domain',
        },
      ],
      postImage1: {
        url: 'https://static.wixstatic.com/media/471908_7789b044f84542c299d23f18e938be7c~mv2.webp',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-28T20:39:28.266Z',
      },
      slug: 'deep-dive-transhumanist-revolutions-r7n0x',
      mediaFiles: [
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      moderators: [],
      speakers: [],
      organisations: [
        {
          name: 'Prospectiva',
          _id: '0a40b56c-b3ce-464f-9373-39d01bfdb09c',
          _owner: '4e87a317-884a-4be5-a4f2-a9a8cd641be3',
          _createdDate: {
            $date: '2024-10-14T10:49:49Z',
          },
          tagLine: 'Institutul de Prospectiva',
          _updatedDate: {
            $date: '2024-10-15T08:48:03.231Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_d73eb310112b41cb81a61667a4cc7421~mv2.png',
          tagType: 'organisation',
          tagPageLink: '/organisation/Prospectiva_fiw2n',
        },
        {
          name: 'Starlab Barcelona ',
          _id: '9c0e1b5e-8710-498a-b249-9a9fda046c47',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-28T20:32:34.984Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-28T20:32:34.984Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'Tallinn University of Technology',
          _id: 'd5c3438a-85b3-4436-be39-797a59676a77',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-28T20:32:48.370Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-28T20:32:48.370Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 106,
          name: 'Fraunhofer ISI',
          _id: 'b83286d1-5153-4efa-b694-e1828ca61739',
          _createdDate: {
            $date: '2024-08-27T09:48:24.829Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.829Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'CNIO ',
          _id: 'd84a7d7b-d29e-43b0-b9a7-6be3da35c2fa',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-28T20:34:24.769Z',
          },
          tagLine: 'Centro Nacional de Investigaciones Oncológicas',
          _updatedDate: {
            $date: '2024-10-28T20:34:24.769Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'DG RTD',
          _id: '7be555b9-5274-4e4f-b733-64969fdf8781',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-28T20:39:19.424Z',
          },
          tagLine:
            'Directorate-General for Research and Innovation of the European Commission',
          _updatedDate: {
            $date: '2024-10-28T20:39:19.424Z',
          },
          tagType: 'organisation',
        },
      ],
      postContentRIch1: '<p></p>\n',
      projects: [
        {
          name: 'Foresight towards the 2nd Strategic Plan for Horizon Europe',
          _id: 'b853a2cf-94b7-40b5-bb70-ee2a2dd53ce8',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-14T18:33:00.732Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T15:55:02.077Z',
          },
          tagType: 'project',
          tagPageLink:
            '/project/Foresight_towards_the_2nd_Strategic_Plan_for_Horizon_Europe_bzq9u',
        },
      ],
      countryTag: [
        {
          name: 'EU',
          _id: 'e1b13728-5253-484b-92d6-0c451813adff',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T10:28:23.621Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-22T10:28:23.621Z',
          },
          tagType: 'country',
        },
      ],
      title: 'Deep Dive: Transhumanist Revolutions',
      projectResultMedia: {
        url: 'https://0bbe2e34-e503-441a-af9e-4fc70c17e6af.usrfiles.com/ugd/471908_1e62853c6106410fb922ef320e4e5f49.pdf',
        fileName: 'Transhumanist revolutions deep dive (1).pdf',
        thumbnail:
          'https://static.wixstatic.com/media/471908_2fa3ef19f6c445009463403b737d4ecb~mv2.jpeg',
        sizeInBytes: '2268805',
        type: 'document',
      },
      internalLinks: [],
      projectResultAuthor: [
        {
          name: 'Bianca Dragomir',
          _id: '90c38dc0-018b-4d55-af76-e2b52130e029',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.344Z',
          },
          tagLine: 'Live deeply and tenderly',
          _updatedDate: {
            $date: '2024-10-14T18:29:46.298Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_957ec9dc2bb74b97b6166aab1d9d0840~mv2.jpg',
          tagType: 'person',
          tagPageLink: '/person/Bianca_Dragomir_q437h',
        },
      ],
    },
    _id: 'ded259c3-c001-4e5c-95d0-08b4c8e524b8',
  },
  {
    dataCollectionId: 'PostPages',
    data: {
      author: [
        {
          name: 'Cristina Plescan',
          _id: 'd5357589-65fd-456f-a506-7a4d1275451c',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.143Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.143Z',
          },
          tagType: 'person',
        },
      ],
      people: [],
      postContentRIch2: '<p></p>\n',
      methods: [
        {
          name: 'Survey',
          _id: '3886c659-e84d-44eb-96b9-21acc6d65a09',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T13:17:14.384Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-22T13:17:14.384Z',
          },
          tagType: 'foresight method',
        },
      ],
      pageTypes: [
        {
          popularity: 126,
          name: 'project result',
          _id: '649a0649-abfd-43c3-86d5-2765c99f7f31',
          _createdDate: {
            $date: '2024-08-27T09:51:01.712Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.712Z',
          },
          tagId: 252529,
          tagType: 'page type',
        },
      ],
      _id: '9b3712e0-e46e-4c93-a0b8-bc5a761eb73b',
      _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
      _createdDate: {
        $date: '2024-10-28T12:41:59.669Z',
      },
      domains: [
        {
          popularity: 56,
          name: 'ethics',
          _id: '181c91b0-ed13-40a9-8c45-077c30a6b4ad',
          _createdDate: {
            $date: '2024-08-27T09:48:25.092Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.092Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 68,
          name: 'fairness',
          _id: 'bf9e79aa-543b-46cf-a108-9ceb46520d5e',
          _createdDate: {
            $date: '2024-08-27T09:48:25.090Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.090Z',
          },
          tagType: 'domain',
        },
      ],
      postImage1: {
        url: ' ',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-28T12:41:59.669Z',
      },
      slug: 'how-will-we-disgust-our-descendants-jkb5s',
      mediaFiles: [
        {
          displayName: 'Report "How will we disgust our descendants"',
          url: 'https://0bbe2e34-e503-441a-af9e-4fc70c17e6af.usrfiles.com/ugd/471908_e902c841cc294613b709f1c88566afd9.pdf',
          fileName: 'Report_How will we disgust our descendants.pdf',
          thumbnail:
            'https://static.wixstatic.com/media/471908_749140fcb1704495896fe98e7659320e~mv2.jpeg',
          sizeInBytes: '3578791',
          type: 'document',
        },
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      moderators: [],
      speakers: [],
      organisations: [
        {
          name: '4CF The Futures Literacy Company ',
          _id: '10a72944-404e-49a1-a60d-867cde630728',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-23T12:44:57.760Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-23T12:44:57.760Z',
          },
          tagType: 'organisation',
        },
      ],
      postContentRIch1: '<p></p>\n',
      projects: [
        {
          name: 'How will we disgust our descendants?',
          _id: '03d3bb0f-f469-47e6-8bf1-755ac9741ab7',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T13:03:53.047Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-22T13:17:31.947Z',
          },
          tagType: 'project',
          tagPageLink: '/project/how-will-we-disgust-our-descendants-rvsft',
        },
      ],
      countryTag: [],
      title: 'How will we disgust our descendants',
      projectResultMedia: {
        url: 'https://0bbe2e34-e503-441a-af9e-4fc70c17e6af.usrfiles.com/ugd/471908_710cc3f7fdf847d7b91c256428cf0570.pdf',
        fileName: 'Report_How will we disgust our descendants.pdf',
        thumbnail:
          'https://static.wixstatic.com/media/471908_89b0a0ed9397487ca61ca1af728f7bfc~mv2.jpeg',
        sizeInBytes: '3578791',
        type: 'document',
      },
      internalLinks: [],
      projectResultAuthor: [],
    },
    _id: '9b3712e0-e46e-4c93-a0b8-bc5a761eb73b',
  },
  {
    dataCollectionId: 'PostPages',
    data: {
      projectResultPublicationDate: '2023-06-30T21:00:00.000Z',
      subtitle:
        'Long-Term Implications of the Digital Transition for Farmers and Rural Communities',
      author: [
        {
          name: 'Cristina Plescan',
          _id: 'd5357589-65fd-456f-a506-7a4d1275451c',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.143Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.143Z',
          },
          tagType: 'person',
        },
      ],
      people: [],
      postContentRIch2: '<p></p>\n',
      methods: [
        {
          popularity: 36,
          name: 'scenarios',
          _id: '3c4917d4-7467-4fef-a6a3-af7b61b9e196',
          _createdDate: {
            $date: '2024-08-27T09:48:24.946Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.946Z',
          },
          tagType: 'foresight method',
        },
        {
          name: 'Casual Layered Analysis',
          _id: '9ca11f1d-3d93-4275-8367-78608183ac74',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-28T11:15:04.559Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-28T11:15:04.559Z',
          },
          tagType: 'foresight method',
        },
      ],
      pageTypes: [
        {
          popularity: 126,
          name: 'project result',
          _id: '649a0649-abfd-43c3-86d5-2765c99f7f31',
          _createdDate: {
            $date: '2024-08-27T09:51:01.712Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.712Z',
          },
          tagId: 252529,
          tagType: 'page type',
        },
      ],
      _id: 'cf18e142-c981-4f45-8d84-a27fc3a9eb41',
      _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
      _createdDate: {
        $date: '2024-10-28T12:07:32.587Z',
      },
      domains: [
        {
          popularity: 45,
          name: 'science for policy',
          _id: '0e1048be-630f-424c-806d-bb2aac576213',
          _createdDate: {
            $date: '2024-08-27T09:48:25.067Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.067Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 29,
          trend: '3',
          name: 'Agriculture',
          _id: '2ceb4abf-2b73-4a2d-b2c3-4d4468d94f4a',
          _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
          _createdDate: {
            $date: '2024-08-27T09:48:25.118Z',
          },
          _updatedDate: {
            $date: '2024-10-15T10:52:22.337Z',
          },
          tagType: 'domain',
        },
        {
          name: 'Food security',
          _id: 'a47f65f7-75e0-4a54-811f-9d5f40aabf8c',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-28T12:20:14.483Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-28T12:20:14.483Z',
          },
          tagType: 'domain',
        },
      ],
      postImage1: {
        url: ' ',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-28T12:23:19.458Z',
      },
      slug: 'digital-transition-u3r3n',
      mediaFiles: [
        {
          displayName: '',
          url: 'https://www.youtube.com/watch?v=wp14FnVPGzs',
          fileName: '',
          thumbnail: 'https://img.youtube.com/vi/wp14FnVPGzs/mqdefault.jpg',
          sizeInBytes: '',
          type: 'video',
        },
        {
          displayName:
            'Digital Transition: Long-Term Implications of the Digital Transition for Farmers and Rural Communities',
          url: 'https://0bbe2e34-e503-441a-af9e-4fc70c17e6af.usrfiles.com/ugd/471908_096fb7f417bd41658ec61242e81fa9bf.pdf',
          fileName:
            'Digital transition_Long-term implications for EU farmers and rural communities.pdf',
          thumbnail:
            'https://static.wixstatic.com/media/471908_643554f7307f4bf2b7cbc76ee8d99b3f~mv2.jpeg',
          sizeInBytes: '2161726',
          type: 'document',
        },
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      moderators: [],
      speakers: [],
      organisations: [
        {
          popularity: 50,
          name: 'Joint Research Center',
          _id: 'f85b3c01-69e8-4688-8766-14c3910bea1b',
          _createdDate: {
            $date: '2024-08-27T09:48:24.871Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.871Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'DG AGRI',
          _id: '30d2e0c4-1170-47e1-9088-7ff680612f94',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-28T12:19:17.635Z',
          },
          tagLine: 'DG for Agriculture and Rural Development',
          _updatedDate: {
            $date: '2024-10-28T12:19:17.635Z',
          },
          tagType: 'organisation',
        },
      ],
      postContentRIch1:
        '<p>Successfully managing the green and digital transitions is a crucial factor that could increase the resilience and strategic autonomy of the EU and shape its future. Yet digitalisation of agriculture and rural areas raises vital questions about winners and losers, costs, benefits, and long term implications.  <br><br><br>This foresight exercise explores the interplay between digital transition, policies and the resilience of the agricultural sector and rural areas, against the backdrop of potential disruptive and transformative changes. The report presents the outcomes of this exploration, proposing building blocks for an effective EU digital transition strategy for agriculture and rural areas supported by a hands-on policymaker’s toolkit</p>\n<p>The <a href="https://policy-lab.ec.europa.eu/news/vision-support-digital-transition-agricultural-rural-communities-2023-07-19_en" target="_blank">blog post</a> reveals  the goals and steps of the foresight process and explains how visioning can support transitions.&nbsp;</p>\n',
      projects: [
        {
          name: 'Digital Transition',
          _id: '8d336e96-95a1-4aa3-b704-8a3366a096c3',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T12:03:40.097Z',
          },
          tagLine:
            'Long-Term Implications of the Digital Transition for Farmers and Rural Communities',
          _updatedDate: {
            $date: '2024-10-28T11:07:46.336Z',
          },
          tagType: 'project',
          tagPageLink:
            '/project/long-term-implications-of-the-digital-transition-for-farmers-and-rural-communities-r55z7',
        },
      ],
      countryTag: [
        {
          name: 'EU',
          _id: 'e1b13728-5253-484b-92d6-0c451813adff',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T10:28:23.621Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-22T10:28:23.621Z',
          },
          tagType: 'country',
        },
      ],
      title: 'Digital Transition',
      projectResultMedia: {
        displayName: 'Based on artwork by Alexandra Paritzky',
        url: 'https://0bbe2e34-e503-441a-af9e-4fc70c17e6af.usrfiles.com/ugd/471908_4bd0166a936045f1a518f3a114833a57.pdf',
        fileName:
          'Digital transition_Long-term implications for EU farmers and rural communities.pdf',
        thumbnail:
          'https://static.wixstatic.com/media/471908_c0055874299b49d2814bf6735bd17e0b~mv2.jpeg',
        sizeInBytes: '2161726',
        type: 'document',
      },
      internalLinks: [],
      projectResultAuthor: [
        {
          name: 'Yulia Barabanova',
          _id: '314468ca-87a4-41bb-8008-90636a7f9a38',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-28T12:15:56.740Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-28T12:15:56.740Z',
          },
          tagType: 'person',
        },
        {
          name: 'Maciej Krzysztofowicz',
          _id: 'fbae3b6f-7629-4661-8cbf-6f49b1653601',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.200Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.200Z',
          },
          tagType: 'person',
        },
      ],
    },
    _id: 'cf18e142-c981-4f45-8d84-a27fc3a9eb41',
  },
  {
    dataCollectionId: 'PostPages',
    data: {
      projectResultPublicationDate: '2023-08-31T21:00:00.000Z',
      subtitle: 'Methods and Best Practices',
      author: [
        {
          name: 'Cristina Plescan',
          _id: 'd5357589-65fd-456f-a506-7a4d1275451c',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.143Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.143Z',
          },
          tagType: 'person',
        },
      ],
      people: [],
      postContentRIch2: '<p></p>\n',
      methods: [
        {
          popularity: 47,
          name: 'horizon scanning',
          _id: 'b1d63812-7f03-4fa0-bfc7-b8d89363baa8',
          _createdDate: {
            $date: '2024-08-27T09:48:24.957Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.957Z',
          },
          tagType: 'foresight method',
        },
        {
          popularity: 39,
          trend: '9',
          name: 'Delphi',
          _id: '5debdc5d-652a-4130-a24b-49a3ec66ee66',
          _createdDate: {
            $date: '2024-08-27T09:48:24.966Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.966Z',
          },
          tagType: 'foresight method',
        },
        {
          name: 'Forecasting',
          _id: '5347877d-db51-45ad-8d2e-5d11f9a5f7c5',
          _owner: '41128e88-b88d-4244-96c8-af3a68b16ac3',
          _createdDate: {
            $date: '2024-10-30T11:28:09.165Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T11:28:09.165Z',
          },
          tagType: 'foresight method',
        },
        {
          name: 'Technology Roadmapping',
          _id: 'f8964bce-35ee-4ee6-89f0-6e4dd3a290d8',
          _owner: '41128e88-b88d-4244-96c8-af3a68b16ac3',
          _createdDate: {
            $date: '2024-10-30T11:28:30.993Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-30T11:28:30.993Z',
          },
          tagType: 'foresight method',
        },
        {
          popularity: 36,
          name: 'scenarios',
          _id: '3c4917d4-7467-4fef-a6a3-af7b61b9e196',
          _createdDate: {
            $date: '2024-08-27T09:48:24.946Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.946Z',
          },
          tagType: 'foresight method',
        },
      ],
      pageTypes: [
        {
          popularity: 126,
          name: 'project result',
          _id: '649a0649-abfd-43c3-86d5-2765c99f7f31',
          _createdDate: {
            $date: '2024-08-27T09:51:01.712Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.712Z',
          },
          tagId: 252529,
          tagType: 'page type',
        },
      ],
      _id: 'c572d926-4fbe-463d-9078-5aef1df273e7',
      _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
      _createdDate: {
        $date: '2024-10-28T10:23:09.536Z',
      },
      domains: [
        {
          popularity: 45,
          name: 'science for policy',
          _id: '0e1048be-630f-424c-806d-bb2aac576213',
          _createdDate: {
            $date: '2024-08-27T09:48:25.067Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.067Z',
          },
          tagType: 'domain',
        },
        {
          name: 'Innovation and Growth',
          _id: 'e6beac1a-4187-4c7b-8cf1-53d374ef34a1',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-28T10:03:44.969Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-28T10:03:44.969Z',
          },
          tagType: 'domain',
        },
      ],
      postImage1: {
        url: ' ',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-30T11:40:21.496Z',
      },
      slug: 'technology-foresight-for-public-funding-of-innovation-bjjyf',
      mediaFiles: [
        {
          displayName: 'Technology Foresight for Public Funding of Innovation',
          url: 'https://0bbe2e34-e503-441a-af9e-4fc70c17e6af.usrfiles.com/ugd/471908_845a2d06eaba4ebfaf22f9a946991cb8.pdf',
          fileName: 'Technology foresight for public funding of innovation.pdf',
          thumbnail:
            'https://static.wixstatic.com/media/471908_bdb6f263a66244af84243c3a94ea49b8~mv2.jpeg',
          sizeInBytes: '2592824',
          type: 'document',
        },
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      moderators: [],
      speakers: [],
      organisations: [
        {
          popularity: 26,
          tagline: 'European Innovation Council',
          name: 'EIC',
          _id: '164e8a4a-f344-48cd-9947-8d94ba35caf2',
          _createdDate: {
            $date: '2024-08-27T09:48:24.863Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.863Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 50,
          name: 'Joint Research Center',
          _id: 'f85b3c01-69e8-4688-8766-14c3910bea1b',
          _createdDate: {
            $date: '2024-08-27T09:48:24.871Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.871Z',
          },
          tagType: 'organisation',
        },
      ],
      postContentRIch1:
        '<p>In times of growing uncertainties and complexities, anticipatory thinking is essential for policymakers.<br>Technology foresight explores the longer-term futures of Science, Technology and Innovation. It can be used<br>as a tool to create effective policy responses, including in technology and innovation policies, and to shape<br>technological change.</p>\n<p><br>In this report we present six anticipatory and technology foresight methods that can contribute to anticipatory<br>intelligence in terms of public funding of innovation: the Delphi survey, genius forecasting, technology roadmapping, large language models used in foresight, horizon scanning and scenario planning.</p>\n<p><br>Each chapter provides a brief overview of the method with case studies and recommendations.<br>The insights from this report show that only by combining different anticipatory viewpoints and approaches<br>to spotting, understanding and shaping emergent technologies, can public funders such as the European<br>Innovation Council improve their proactive approaches to supporting ground-breaking technologies. In this<br>way, they will help innovation ecosystems to develop.</p>\n',
      projects: [
        {
          name: 'ANTICIPINNOV',
          _id: '3eeaee95-a2fa-42df-9d39-dcdde8b934e1',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T11:17:22.221Z',
          },
          tagLine:
            'Anticipation and monitoring of emerging technologies and disruptive innovation',
          _updatedDate: {
            $date: '2024-10-23T12:46:42.996Z',
          },
          tagType: 'project',
          tagPageLink:
            '/project/anticipation-and-monitoring-of-emerging-technologies-and-disruptive-innovation-p8vkw',
        },
      ],
      countryTag: [
        {
          name: 'EU',
          _id: 'e1b13728-5253-484b-92d6-0c451813adff',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T10:28:23.621Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-22T10:28:23.621Z',
          },
          tagType: 'country',
        },
      ],
      title: 'Technology Foresight for Public Funding of Innovation',
      projectResultMedia: {
        url: 'https://0bbe2e34-e503-441a-af9e-4fc70c17e6af.usrfiles.com/ugd/471908_df3a195e646044ed959f48de26cebde2.pdf',
        fileName: 'Technology foresight for public funding of innovation.pdf',
        thumbnail:
          'https://static.wixstatic.com/media/471908_d9b7e13dec8d4cec8297ec90d3586d0f~mv2.jpeg',
        sizeInBytes: '2592824',
        type: 'document',
      },
      internalLinks: [],
      projectResultAuthor: [
        {
          name: 'Per Dannemand Andersen',
          _id: '3a95d592-1766-496b-a558-3be8e09efd4e',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-28T10:26:13.428Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-28T10:26:13.428Z',
          },
          tagType: 'person',
        },
        {
          name: ' Marco Bevolo',
          _id: '3d429552-e826-4d77-b3e9-832b3bd15281',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T11:00:53.229Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-22T11:00:53.229Z',
          },
          tagType: 'person',
        },
        {
          name: 'Imoh Ilevbare',
          _id: 'b8d4aa18-f543-46af-a76a-28418f672465',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-28T10:26:56.758Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-28T10:26:56.758Z',
          },
          tagType: 'person',
        },
        {
          name: 'Eirini Malliaraki',
          _id: 'a05f2b77-f149-497a-bab1-40ea05d083c6',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.341Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.341Z',
          },
          tagType: 'person',
        },
        {
          name: ' Rafael Popper',
          _id: 'aa760464-1e38-4169-90f9-d380ce688327',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T11:00:38.580Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-22T11:00:38.580Z',
          },
          tagType: 'person',
        },
        {
          name: ' Matthew Spaniol',
          _id: '27bc640c-3c7d-4dbd-b5de-40a14abba514',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T11:00:26.519Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-22T11:00:26.519Z',
          },
          tagType: 'person',
        },
      ],
    },
    _id: 'c572d926-4fbe-463d-9078-5aef1df273e7',
  },
  {
    dataCollectionId: 'PostPages',
    data: {
      projectResultPublicationDate: '2023-08-31T21:00:00.000Z',
      subtitle: 'Participatory Collection and Assessment of Signals and Trends',
      author: [
        {
          name: 'Cristina Plescan',
          _id: 'd5357589-65fd-456f-a506-7a4d1275451c',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.143Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.143Z',
          },
          tagType: 'person',
        },
      ],
      people: [],
      postContentRIch2: '<p></p>\n',
      methods: [
        {
          popularity: 47,
          name: 'horizon scanning',
          _id: 'b1d63812-7f03-4fa0-bfc7-b8d89363baa8',
          _createdDate: {
            $date: '2024-08-27T09:48:24.957Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.957Z',
          },
          tagType: 'foresight method',
        },
      ],
      pageTypes: [
        {
          popularity: 126,
          name: 'project result',
          _id: '649a0649-abfd-43c3-86d5-2765c99f7f31',
          _createdDate: {
            $date: '2024-08-27T09:51:01.712Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.712Z',
          },
          tagId: 252529,
          tagType: 'page type',
        },
      ],
      _id: '63b6a17b-79f3-40bb-9a0d-d1f3f61139f0',
      _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
      _createdDate: {
        $date: '2024-10-28T10:07:10.708Z',
      },
      domains: [
        {
          popularity: 45,
          name: 'science for policy',
          _id: '0e1048be-630f-424c-806d-bb2aac576213',
          _createdDate: {
            $date: '2024-08-27T09:48:25.067Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.067Z',
          },
          tagType: 'domain',
        },
        {
          name: 'Innovation and Growth',
          _id: 'e6beac1a-4187-4c7b-8cf1-53d374ef34a1',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-28T10:03:44.969Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-28T10:03:44.969Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 26,
          name: 'sustainability',
          _id: 'b5ca1e23-5548-4d91-adfe-eeb08f2062a6',
          _createdDate: {
            $date: '2024-08-27T09:48:25.063Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.063Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 18,
          name: 'energy',
          _id: '160f556b-6e6f-4957-a2b6-12a30f8a2d58',
          _createdDate: {
            $date: '2024-08-27T09:48:25.093Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.093Z',
          },
          tagType: 'domain',
        },
      ],
      postImage1: {
        url: ' ',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-30T11:43:59.972Z',
      },
      slug: 'scanning-deep-tech-horizons-participatory-collection-and-assessment-of-signals-and-trends-n65ky',
      mediaFiles: [
        {
          displayName: 'Scanning deep tech horizons',
          url: 'https://0bbe2e34-e503-441a-af9e-4fc70c17e6af.usrfiles.com/ugd/471908_6552c1e21a1f42d2ab823e1069f30ae2.pdf',
          fileName:
            'Scanning deep tech horizons_Participatory Collection and Assessment of Signals and Trends.pdf',
          thumbnail:
            'https://static.wixstatic.com/media/471908_43d3fc2bedcd487dbdd6029995c73b3d~mv2.jpeg',
          sizeInBytes: '1303948',
          type: 'document',
        },
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      moderators: [],
      speakers: [],
      organisations: [
        {
          popularity: 50,
          name: 'Joint Research Center',
          _id: 'f85b3c01-69e8-4688-8766-14c3910bea1b',
          _createdDate: {
            $date: '2024-08-27T09:48:24.871Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.871Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 26,
          tagline: 'European Innovation Council',
          name: 'EIC',
          _id: '164e8a4a-f344-48cd-9947-8d94ba35caf2',
          _createdDate: {
            $date: '2024-08-27T09:48:24.863Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.863Z',
          },
          tagType: 'organisation',
        },
      ],
      postContentRIch1:
        '<p>The Joint Research Centre (JRC) and the European Innovation Council (EIC) conducted a series of Horizon Scanning exercises across six EIC programme managers’ (PM) portfolios as part of an ongoing collaborative effort to strengthen EIC strategic intelligence capacity through the use and development of anticipatory approaches. The fields covered include: Space Systems &amp; Technologies; Quantum Technologies; Agriculture &amp; Food; Solar Fuels &amp; Chemicals; Responsible Electronics and Architecture, Engineering &amp; Construction.</p>\n<p><br>The main findings of this Horizon Scanning – the identification and analysis of ‘signals’ from nascent research, technologies, or trends on the periphery of the mainstream – show opportunities for investment in emerging technologies and breakthrough innovations that can advance EU competitiveness while also serving to support the EU’s long-term policy and societal visions.<br>Other insights were taken from this exercise, namely the identification of drivers, enablers and barriers to technology development and adoption, that could be the starting ground of further foresight exercises and policy initiatives.</p>\n<p><br>The report highlights three main themes – sustainability, energy, and scalability, which are overarching across signals, drivers, enablers and barriers. And concludes with a series of recommendations to streamline Horizon Scanning activities in the specific context and needs of the EIC.</p>\n',
      projects: [
        {
          name: 'ANTICIPINNOV',
          _id: '3eeaee95-a2fa-42df-9d39-dcdde8b934e1',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T11:17:22.221Z',
          },
          tagLine:
            'Anticipation and monitoring of emerging technologies and disruptive innovation',
          _updatedDate: {
            $date: '2024-10-23T12:46:42.996Z',
          },
          tagType: 'project',
          tagPageLink:
            '/project/anticipation-and-monitoring-of-emerging-technologies-and-disruptive-innovation-p8vkw',
        },
      ],
      countryTag: [
        {
          name: 'EU',
          _id: 'e1b13728-5253-484b-92d6-0c451813adff',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T10:28:23.621Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-22T10:28:23.621Z',
          },
          tagType: 'country',
        },
      ],
      title: 'Scanning Deep Tech Horizons',
      projectResultMedia: {
        url: 'https://0bbe2e34-e503-441a-af9e-4fc70c17e6af.usrfiles.com/ugd/471908_2e0ba990b3b44983bc1b8443349f58b5.pdf',
        fileName:
          'Scanning deep tech horizons_Participatory Collection and Assessment of Signals and Trends.pdf',
        thumbnail:
          'https://static.wixstatic.com/media/471908_48dcda9111a44ac5902841e7c8d13fe6~mv2.jpeg',
        sizeInBytes: '1303948',
        type: 'document',
      },
      internalLinks: [],
      projectResultAuthor: [
        {
          name: 'Joao Farinha',
          _id: '85737a3f-039a-438b-8ab9-d1b8f6cba4cf',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.012Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.012Z',
          },
          tagType: 'person',
        },
        {
          name: ' Lucia Vesnic-Alujevic',
          _id: 'c666d5d0-e20d-4c21-9e9b-ed16b197c869',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T11:01:16.051Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-22T11:01:16.051Z',
          },
          tagType: 'person',
        },
        {
          name: 'Alexandre Polvora',
          _id: 'dcb9c12b-d1ad-4b4d-88be-86151a52cefa',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-28T10:09:08.316Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-28T10:09:08.316Z',
          },
          tagType: 'person',
        },
      ],
    },
    _id: '63b6a17b-79f3-40bb-9a0d-d1f3f61139f0',
  },
  {
    dataCollectionId: 'PostPages',
    data: {
      projectResultPublicationDate: '2023-08-31T21:00:00.000Z',
      subtitle:
        'A literature review of reports on emerging technologies and disruptive innovation',
      author: [
        {
          name: 'Cristina Plescan',
          _id: 'd5357589-65fd-456f-a506-7a4d1275451c',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.143Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.143Z',
          },
          tagType: 'person',
        },
      ],
      people: [],
      postContentRIch2:
        '<p>Growing volatility, uncertainty, complexity and ambiguity, present leading challenges in policy-making nowadays. Anticipatory thinking and foresight are of utmost importance to help explore trends, risks, emerging issues, and their potential implications and opportunities in order to draw useful insights for strategic planning, policy-making and preparedness.</p>\n<p><br>This report is a part of the “Anticipation and monitoring of emerging technologies and disruptive innovation” (ANTICIPINNOV) project, a collaboration between the European Commission Joint Research Centre with the European Innovation Council (EIC).</p>\n<p><br>The findings include a set of 106 signals and trends on emerging technologies and disruptive innovations across several areas of application based on a review of key reports on technology and innovation trends and signals produced by public and private entities outside of the EU institutions. Its goal is to strengthen the EIC’s strategic intelligence capacity through the use and development of anticipatory approaches that will - among other goals – support innovation funding prioritisation. Other insights were extracted, namely those related with the scope of the EIC Programme Manager portfolios.</p>\n',
      methods: [
        {
          popularity: 47,
          name: 'horizon scanning',
          _id: 'b1d63812-7f03-4fa0-bfc7-b8d89363baa8',
          _createdDate: {
            $date: '2024-08-27T09:48:24.957Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.957Z',
          },
          tagType: 'foresight method',
        },
      ],
      pageTypes: [
        {
          popularity: 126,
          name: 'project result',
          _id: '649a0649-abfd-43c3-86d5-2765c99f7f31',
          _createdDate: {
            $date: '2024-08-27T09:51:01.712Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.712Z',
          },
          tagId: 252529,
          tagType: 'page type',
        },
      ],
      _id: '604ef2e9-a6e0-4ff8-bea6-974e035e3f86',
      _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
      _createdDate: {
        $date: '2024-10-28T10:05:07.703Z',
      },
      domains: [
        {
          popularity: 45,
          name: 'science for policy',
          _id: '0e1048be-630f-424c-806d-bb2aac576213',
          _createdDate: {
            $date: '2024-08-27T09:48:25.067Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.067Z',
          },
          tagType: 'domain',
        },
        {
          name: 'Innovation and Growth',
          _id: 'e6beac1a-4187-4c7b-8cf1-53d374ef34a1',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-28T10:03:44.969Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-28T10:03:44.969Z',
          },
          tagType: 'domain',
        },
        {
          name: 'Emerging Technologies',
          _id: '414e11bd-1c1c-4d88-b63e-f24a3b2c711a',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T10:37:07.120Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-22T10:37:07.120Z',
          },
          tagType: 'domain',
        },
      ],
      postImage1: {
        url: ' ',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-30T11:45:05.784Z',
      },
      slug: 'everybody-is-looking-into-the-future-rj8pw',
      mediaFiles: [
        {
          displayName: '',
          url: 'https://0bbe2e34-e503-441a-af9e-4fc70c17e6af.usrfiles.com/ugd/471908_2c1bab438f54425f9aa8e2e52872c4aa.pdf',
          fileName:
            'Everybody is looking into the future! A literature review of reports on emerging technologies and disruptive innovation.pdf',
          thumbnail:
            'https://static.wixstatic.com/media/471908_6e5d210fea6e4e83bfcc76da7d79b952~mv2.jpeg',
          sizeInBytes: '982169',
          type: 'document',
        },
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      moderators: [],
      speakers: [],
      organisations: [
        {
          popularity: 50,
          name: 'Joint Research Center',
          _id: 'f85b3c01-69e8-4688-8766-14c3910bea1b',
          _createdDate: {
            $date: '2024-08-27T09:48:24.871Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.871Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 26,
          tagline: 'European Innovation Council',
          name: 'EIC',
          _id: '164e8a4a-f344-48cd-9947-8d94ba35caf2',
          _createdDate: {
            $date: '2024-08-27T09:48:24.863Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.863Z',
          },
          tagType: 'organisation',
        },
      ],
      postContentRIch1: '<p></p>\n',
      projects: [
        {
          name: 'ANTICIPINNOV',
          _id: '3eeaee95-a2fa-42df-9d39-dcdde8b934e1',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T11:17:22.221Z',
          },
          tagLine:
            'Anticipation and monitoring of emerging technologies and disruptive innovation',
          _updatedDate: {
            $date: '2024-10-23T12:46:42.996Z',
          },
          tagType: 'project',
          tagPageLink:
            '/project/anticipation-and-monitoring-of-emerging-technologies-and-disruptive-innovation-p8vkw',
        },
      ],
      countryTag: [
        {
          name: 'EU',
          _id: 'e1b13728-5253-484b-92d6-0c451813adff',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T10:28:23.621Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-22T10:28:23.621Z',
          },
          tagType: 'country',
        },
      ],
      title: 'Everybody is looking into the future!',
      projectResultMedia: {
        url: 'https://0bbe2e34-e503-441a-af9e-4fc70c17e6af.usrfiles.com/ugd/471908_dc85d480cd274e9999f4a9dce0801f7f.pdf',
        fileName:
          'Everybody is looking into the future! A literature review of reports on emerging technologies and disruptive innovation.pdf',
        thumbnail:
          'https://static.wixstatic.com/media/471908_cd6fa3f246e74bc8906197027b04b720~mv2.jpeg',
        sizeInBytes: '982169',
        type: 'document',
      },
      internalLinks: [],
      projectResultAuthor: [
        {
          name: 'Joao Farinha',
          _id: '85737a3f-039a-438b-8ab9-d1b8f6cba4cf',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.012Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.012Z',
          },
          tagType: 'person',
        },
        {
          name: ' Lucia Vesnic-Alujevic',
          _id: 'c666d5d0-e20d-4c21-9e9b-ed16b197c869',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T11:01:16.051Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-22T11:01:16.051Z',
          },
          tagType: 'person',
        },
        {
          name: 'Alexandre Polvora',
          _id: 'dcb9c12b-d1ad-4b4d-88be-86151a52cefa',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-28T10:09:08.316Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-28T10:09:08.316Z',
          },
          tagType: 'person',
        },
      ],
    },
    _id: '604ef2e9-a6e0-4ff8-bea6-974e035e3f86',
  },
  {
    dataCollectionId: 'PostPages',
    data: {
      subtitle:
        'A portrait of how EU citizens imagine their futures - analysing stories collected through the #OurFutures project.',
      author: [
        {
          name: 'Bianca Dragomir',
          _id: '90c38dc0-018b-4d55-af76-e2b52130e029',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.344Z',
          },
          tagLine: 'Live deeply and tenderly',
          _updatedDate: {
            $date: '2024-10-14T18:29:46.298Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_957ec9dc2bb74b97b6166aab1d9d0840~mv2.jpg',
          tagType: 'person',
          tagPageLink: '/person/Bianca_Dragomir_q437h',
        },
      ],
      people: [
        {
          name: 'Epaminondas Christophilopoulos',
          _id: 'a9b64019-f422-4384-b1fa-f7e32d1d2c28',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.121Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.121Z',
          },
          tagType: 'person',
        },
        {
          name: 'Vivian Efthimiopoulou',
          _id: 'c45fd531-4d62-437a-82d1-cfda226c2ba2',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-24T18:39:37.014Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-24T18:39:37.014Z',
          },
          tagType: 'person',
        },
      ],
      postImage2: {
        url: ' ',
        caption: '',
      },
      postContentRIch2:
        '<p><strong>Why did the UNESCO team in Greece join the #OurFutures initiative? <br></strong><br><em>Epaminondas Christophilopoulos (EC)</em>: During the last 10 years, we have been systematically collaborating with the EU Policy Lab of the European Commission\'s Joint Research Centre (JRC) on various foresight initiatives. For example, we have extensively used the Scenario Exploration System (SES) in various projects, as a tool for communicating scenarios and for developing ideas for strategies. This is why we were excited to participate in the #OurFutures initiative, which offers people the opportunity to freely express their images of the future, their fears, hopes or anxieties.  <br><br>In most foresight projects we tend to collect the views and the future images of a rather small group of experts. The questionnaires used in these exercises are usually based on a specific set of questions and define a specific agenda of topics of interest. On the contrary, #OurFutures helps to \'decolonise\' the future, offering  participants the opportunity to select any topic of interest, both local and global - while also allowing them to self-evaluate their stories. <br><br>What is interesting with Greece is that most of the focus has and is being laid on the present and the past, but there are practically no studies exploring society’s views for the long-term future - this is why I like the #OurFutures project, which provides both the structure and the content for initiating a conversation among groups of participants.<br><br>We therefore decided to fully support the initiative, to use it in all our workshops and public events, and also to utilise the collected information in parallel with other studies we have been running in Greece, like Innovation 2040.&nbsp;</p>\n<p><strong>What key findings you were you able to draw from the stories #OurFutures collected so far from Greek participants?<br></strong> <br><em>Vivian Efthimiopoulou (VE)</em>: During these first months of the project, we have collected extremely interesting data on which we can base our further research, but we have already identified some telling insights.   <br><br>It was interesting to see that the future images are shaped mainly by personal experiences and social media. It comes as no surprise that younger people (18-25 year olds) believe that it is mainly their personal experiences which shape their future image. But as people get older, they probably learn to recognise most of the factors that shape their perception of the world, their future as well as their past.<br><br>Another important and optimistic, if I may say, finding is that the vast majority of respondents feel empowered to bring change. Especially after Greece\'s difficult past two decades, many of the participants were able to think not only positively, but also beyond their own county, imagining stories with a global interest.<br><br>Perhaps one of the main takeaways from this project is that most participants in the project believe that the responsibility for making change happen falls on politicians, businesspeople and scientists. Therefore, political and financial leadership is necessary for a better future: from where we can extrapolate a very positive element of this exercise, namely the belief and trust in public institutions, but who need to step up in the face of current crises.</p>\n<p><strong>As Chief Scientific Advisor on Strategic Foresight for the Presidency of the Greek Government, what policy-relevant insights can you draw? Why is the #OurFutures initiative valuable for policymakers and policymaking? <br></strong><br>EC: Greeks are very proud about their past. Even the recent, difficult periods of modern Greek history are present in a constant passionate and heated public discourse. <br><br>In this context, it came as a surprise for many - although not for us - to see that the #OurFutures survey generated such interest. This entire process has been extremely useful to demonstrate an alternative way to communicate and listen to what broader society has to say. <br><br>Another important finding, which can come in handy to any government, are the topics of interest that emerged and that are quite different from the ones usually brought up in the mainstream media. One example that springs to mind is migration: although Greece is on the eastern border of the EU and one of the main points of entry into Europe for a lot of migrants, migration scored very low as an issue for many respondents.<br><br>Another noteworthy takeaway is that most participants are very concerned about the future, underlining the need for politicians across the political spectrum to start addressing the serious environment challenges, societal imbalances and the impacts of technology. It also becomes clear that education systems need to invest more in the study of the future(s), not only of the past and to integrate futures literacy, in parallel with other soft skills, from primary and secondary education onwards.&nbsp;</p>\n<p>***<br><strong>Epaminondas Christophilopoulos</strong> <br>Epaminondas holds the UNESCO Chair on Futures Research at FORTH, he is Chief Scientific Advisor to the Special Secretariat for Foresight, at the Presidency of the Government, and President of the Metropolitan Organization of Visual Arts of Thessaloniki (MOMus). <br><br><strong>Vivian Efthimiopoulou</strong> <br>Vivian is an Athens-based communication expert working actively with clients across private sector industries and institutions on strategic planning and crisis management.&nbsp;</p>\n<p>***</p>\n<p>This post was originally published on 15 May 2023 on <a href="https://policy-lab.ec.europa.eu/news/future-europe-futures-imagined-greek-citizens-2023-05-15_en" target="_blank">policy-lab.ec.europa.eu</a>&nbsp;</p>\n',
      methods: [],
      pageTypes: [
        {
          popularity: 253,
          name: 'post',
          _id: 'cc31afc1-a304-465a-be3e-a887b68884f3',
          _createdDate: {
            $date: '2024-08-27T09:51:01.713Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.713Z',
          },
          tagId: 252528,
          tagType: 'page type',
        },
      ],
      _id: 'd2dcdccf-2245-4d4d-83e2-001d5bd4fc66',
      _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
      _createdDate: {
        $date: '2024-10-24T18:46:06.329Z',
      },
      postContentRIch3: '<p></p>\n',
      domains: [
        {
          popularity: 52,
          name: 'citizen engagement',
          _id: '3e20987c-c439-4214-bfff-515f49d8a65f',
          _createdDate: {
            $date: '2024-08-27T09:48:25.111Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.111Z',
          },
          tagType: 'domain',
        },
      ],
      postImage1: {
        url: 'https://static.wixstatic.com/media/471908_85b98d46d5124d899df7bae440ae9802~mv2.png',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-30T11:24:34.488Z',
      },
      slug: 'the-future-of-europe-futures-imagined-by-greek-citizens-bufnm',
      mediaFiles: [
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      moderators: [],
      speakers: [],
      organisations: [
        {
          popularity: 50,
          name: 'Joint Research Center',
          _id: 'f85b3c01-69e8-4688-8766-14c3910bea1b',
          _createdDate: {
            $date: '2024-08-27T09:48:24.871Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.871Z',
          },
          tagType: 'organisation',
        },
      ],
      postContentRIch1:
        "<p>What will Europe look like in 2040? How will we travel, how will our society be organised, how will our schools function and what kind of jobs will people have? These are just some of the questions we have been asking Europeans to reflect on as part of the #OurFutures project launched by the EU Policy Lab. Through it, we collect EU citizens' images through a narrative inquiry method.<br><br>We recently did this in Greece, in close collaboration with foresight experts in the Greek government by reaching out to Greek citizens to gain insights into how people in this part of Europe would like the future to look like.<br><br>We have spoken to <strong>Epaminondas Christophilopoulos</strong> (UNESCO chair on Futures research at the Foundation for Research and Technology) and <strong>Vivian Efthimiopoulou</strong> (communication expert), focusing on some of their findings which demonstrate the value of citizen-generated future images for developing people-centric policies at both national and EU level.</p>\n",
      projects: [
        {
          name: '#OurFutures',
          _id: '612a7547-db2c-49b7-8b05-576dbc951324',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-17T12:43:06.796Z',
          },
          tagLine:
            'Collecting stories from citizens of Europe, indicating their desirable futures.',
          _updatedDate: {
            $date: '2024-10-18T08:49:56.859Z',
          },
          tagType: 'project',
          tagPageLink: '/project/OurFutures_wgft5',
        },
      ],
      countryTag: [
        {
          popularity: 22,
          name: 'Greece',
          _id: '14ee4760-9a21-41f2-9395-378444824e8f',
          _createdDate: {
            $date: '2024-08-27T09:48:24.758Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.758Z',
          },
          tagType: 'country',
        },
      ],
      title: 'The future of Europe: futures imagined by Greek citizens',
      internalLinks: [],
      projectResultAuthor: [
        {
          name: 'Maija Knutti',
          _id: '2ce1087f-b775-422f-83b5-e222995e1fbc',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:38.950Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:38.950Z',
          },
          tagType: 'person',
        },
      ],
    },
    _id: 'd2dcdccf-2245-4d4d-83e2-001d5bd4fc66',
  },
  {
    dataCollectionId: 'PostPages',
    data: {
      subtitle:
        'Emerging Practices in Foresight for Research & Innovation policy',
      author: [
        {
          name: 'Bianca Dragomir',
          _id: '90c38dc0-018b-4d55-af76-e2b52130e029',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.344Z',
          },
          tagLine: 'Live deeply and tenderly',
          _updatedDate: {
            $date: '2024-10-14T18:29:46.298Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_957ec9dc2bb74b97b6166aab1d9d0840~mv2.jpg',
          tagType: 'person',
          tagPageLink: '/person/Bianca_Dragomir_q437h',
        },
      ],
      people: [
        {
          name: 'Radu Gheorghiu',
          _id: '79e69062-1f22-4acd-bd5c-b4b0f17a3dad',
          _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
          _createdDate: {
            $date: '2024-10-15T09:06:25.839Z',
          },
          _updatedDate: {
            $date: '2024-10-15T09:06:25.839Z',
          },
          tagType: 'person',
        },
        {
          name: 'Michal Pazour',
          _id: 'c9926e3a-b03d-4926-a35c-f79b75616186',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.008Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.008Z',
          },
          tagType: 'person',
        },
        {
          name: 'simone.weske',
          _id: 'ce292bd1-97a1-4ccb-898c-53abdb889cb6',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:38.954Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:38.954Z',
          },
          tagType: 'person',
        },
        {
          name: 'Michal Habrman',
          _id: '13666b69-14e7-4948-861c-1067b3a18bf3',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:38.999Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:38.999Z',
          },
          tagType: 'person',
        },
        {
          name: 'Juha Kaskinen',
          _id: 'a091dfa9-fdfe-4bbd-be7d-63394360f6ba',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.179Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.179Z',
          },
          tagType: 'person',
        },
        {
          name: 'Joakim Skog',
          _id: '22e1e17e-930e-498d-b32d-1a3a3b47e4a5',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-23T09:31:02.715Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-23T09:31:02.715Z',
          },
          tagType: 'person',
        },
        {
          name: 'Christian Naczinsky',
          _id: '5e7fe82f-1d8f-46f4-99f2-51fc71268045',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.047Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.047Z',
          },
          tagType: 'person',
        },
        {
          name: 'Lenka Hebakova',
          _id: '8815218d-6eb4-4ad9-a777-2e60d96c16b3',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:38.920Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:38.920Z',
          },
          tagType: 'person',
        },
      ],
      eventEndDate: '2024-05-23T14:00:00.000Z',
      postImage2: {
        url: 'https://static.wixstatic.com/media/471908_d6151e3d27cc4e90bd690bd5a3751fc3~mv2.jpeg',
        caption:
          'Participants at the R&I foresight masterclass preceding the MLE',
      },
      postContentRIch2:
        '<p>This MLE, organized by Technology Centre Prague (TC), focused on the identification of <strong>emerging needs and approaches in the practice of foresight for research and innovation</strong>.</p>\n<p>To this end, the MLE in Bratislava was structured along the following phases:<br></p>\n<ul>\n<li>Eye of Europe’s vision and main building blocks, presented by project coordinator Radu Gheorghiu</li>\n<li>The context and role of this MLE, and a brief overview of other mutual learning events that took place since 2020, presented by Michal Pazour&nbsp;</li>\n<li>Showcasing preliminary results of the <em>Stocktaking of the organisation of R&amp;I Foresight activities in the European Research Area  (ERA)</em>, by Simone Weske. The presentation highlighted key benefits of the R&amp;I foresight activities, constraints and bottlenecks, as perceived by the survey respondents.</li>\n<li>Four country studies - Slovakia, Finland, Austria and Sweden - have brought interesting insights and comparisons related to R&amp;I foresight uptake and potential for improvement:<br>Slovakia: Research and Innovation System and the potential for R&amp;I Foresight |Michal Habrman, Government Office of the Slovak Republic<br>Finland: Finnish national foresight ecosystem | Juha Kaskinen, FFRC University of Turku Finland<br>Sweden: Leading from the Future in Sweden | Joakim Skog, Vinnova Sweden<br>Austria: R&amp;I foresight | Christian Naczinsky, Austrian Ministry of Education</li>\n<li>Discussions in four participant groups on emerging functions and approaches of R&amp;I foresight. Overall, the group discussions touched on the dynamics of R&amp;I foresight demand and supply and on the diversification of tools and methods for establishing dialogue with policy-making.<br><br>This <a href="https://www.linkedin.com/posts/vaiask_eye-of-europe-intensive-foresight-training-activity-7202222897736663040-TlDK/?utm_source=share&utm_medium=member_desktop" target="_blank">video</a> crea ted by the event  host, Výskumná a inovačná autorita (VAIA), offers a glimpse into the spirit of both the MLE and the R&amp;I foresight masterclass that preceded it. The detailed outputs of the MLE will be published in a dedicated report. <br><br><br>***<br>Five MLEs are planned in the project, with the following one being held online in September 2024. All Eye of Europe MLEs are organized by Technology Centre Prague (TC), Eye of Europe partner and key Czech national think tank and academia based NGO with a rich experience with knowledge-based policy making support and (participatory as well as expert based) foresight activities.<br></li>\n</ul>\n',
      methods: [],
      pageTypes: [
        {
          popularity: 46,
          name: 'event',
          _id: '17c4547e-2219-49c8-8169-f68766c7c1d9',
          _createdDate: {
            $date: '2024-08-27T09:51:01.711Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.711Z',
          },
          tagId: 252530,
          tagType: 'page type',
        },
      ],
      _id: '91e6dbc0-0ee5-4875-959d-d7c6c852ca38',
      _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
      _createdDate: {
        $date: '2024-10-23T09:31:59.928Z',
      },
      postContentRIch3: '<ul>\n<li></li>\n</ul>\n',
      domains: [],
      postImage1: {
        url: 'https://static.wixstatic.com/media/471908_893e94514b0c42f6a1bbb104fb8029a4~mv2.jpg',
        caption:
          "Countries represented at Eye of Europe's first Mutual Learning Event",
      },
      _updatedDate: {
        $date: '2024-10-29T11:48:28.516Z',
      },
      slug: 'eye-of-europes-first-mutual-learning-event-6cpaf',
      mediaFiles: [
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      postContentRIch4: '<p></p>\n',
      moderators: [],
      eventStartDate: '2024-05-23T06:00:00.000Z',
      speakers: [],
      organisations: [
        {
          popularity: 68,
          tagline: 'Technologicke Centrum Praha ZSPO',
          name: 'TC Praha',
          _id: '6f52fb6e-0645-4571-91be-b61087dea931',
          _createdDate: {
            $date: '2024-08-27T09:48:24.839Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.839Z',
          },
          tagType: 'organisation',
        },
      ],
      postContentRIch1:
        '<p>The first Mutual Learning Event (MLE) took place on May 23, 2024 in Bratislava, Slovakia as part of the Horizon Europe project Eye of Europe, which aims to contribute to the maturing of a vibrant Research and Innovation (R&amp;I) foresight community in Europe and to support the integration of foresight practices into R&amp;I policy-making.<br><br><strong>Forty participants</strong> from partner organizations and external representatives of ministries, governmental bodies, R&amp;I funding agencies and the European institutions gathered in the premises of the Government Office of the Slovak Republic.</p>\n',
      projects: [
        {
          popularity: 1,
          name: 'Eye of Europe',
          _id: 'a3da923c-66d3-46a7-8ab0-8d33424f3b80',
          _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
          _createdDate: {
            $date: '2024-10-15T11:02:13.126Z',
          },
          tagLine: 'The Research and Innovation Foresight Community',
          _updatedDate: {
            $date: '2024-10-25T11:17:57.445Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_3fc30f50bb3c467aa3213c444816d649~mv2.png',
          tagType: 'project',
          tagPageLink: '/project/Eye_of_Europe_6ft5d',
        },
      ],
      countryTag: [
        {
          popularity: 12,
          name: 'Slovakia',
          _id: 'fdefc7ee-f073-4ddd-90ff-7d43b91baa37',
          _createdDate: {
            $date: '2024-08-27T09:48:24.756Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.756Z',
          },
          tagType: 'country',
        },
      ],
      title: "Eye of Europe's first Mutual Learning Event",
      internalLinks: [],
      projectResultAuthor: [
        {
          name: 'Bianca Dragomir',
          _id: '90c38dc0-018b-4d55-af76-e2b52130e029',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.344Z',
          },
          tagLine: 'Live deeply and tenderly',
          _updatedDate: {
            $date: '2024-10-14T18:29:46.298Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_957ec9dc2bb74b97b6166aab1d9d0840~mv2.jpg',
          tagType: 'person',
          tagPageLink: '/person/Bianca_Dragomir_q437h',
        },
      ],
      postImage3: {
        url: ' ',
        caption: '',
      },
    },
    _id: '91e6dbc0-0ee5-4875-959d-d7c6c852ca38',
  },
  {
    dataCollectionId: 'PostPages',
    data: {
      subtitle: 'Policy Oriented Communication of Foresight Results',
      author: [
        {
          name: 'Bianca Dragomir',
          _id: '90c38dc0-018b-4d55-af76-e2b52130e029',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.344Z',
          },
          tagLine: 'Live deeply and tenderly',
          _updatedDate: {
            $date: '2024-10-14T18:29:46.298Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_957ec9dc2bb74b97b6166aab1d9d0840~mv2.jpg',
          tagType: 'person',
          tagPageLink: '/person/Bianca_Dragomir_q437h',
        },
      ],
      people: [],
      eventEndDate: '2024-09-26T13:00:00.000Z',
      postContentRIch2: '<p></p>\n',
      methods: [],
      pageTypes: [
        {
          popularity: 46,
          name: 'event',
          _id: '17c4547e-2219-49c8-8169-f68766c7c1d9',
          _createdDate: {
            $date: '2024-08-27T09:51:01.711Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.711Z',
          },
          tagId: 252530,
          tagType: 'page type',
        },
      ],
      _id: '412edd3a-bd46-4abb-8179-197455783f87',
      _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
      _createdDate: {
        $date: '2024-10-23T08:38:13.157Z',
      },
      domains: [],
      postImage1: {
        url: ' ',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-29T11:51:15.109Z',
      },
      slug: 'eye-of-europes-second-mutual-learning-event-4pzed',
      mediaFiles: [
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      moderators: [
        {
          name: 'Lenka Hebakova',
          _id: '8815218d-6eb4-4ad9-a777-2e60d96c16b3',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:38.920Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:38.920Z',
          },
          tagType: 'person',
        },
        {
          name: 'Michal Pazour',
          _id: 'c9926e3a-b03d-4926-a35c-f79b75616186',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.008Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.008Z',
          },
          tagType: 'person',
        },
      ],
      eventStartDate: '2024-09-26T06:00:00.000Z',
      speakers: [
        {
          name: 'Mikko Dufva',
          _id: '0581386c-e6b4-403c-b2b0-e36558200c17',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:38.957Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:38.957Z',
          },
          tagType: 'person',
        },
        {
          name: 'Bianca Dragomir',
          _id: '90c38dc0-018b-4d55-af76-e2b52130e029',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.344Z',
          },
          tagLine: 'Live deeply and tenderly',
          _updatedDate: {
            $date: '2024-10-14T18:29:46.298Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_957ec9dc2bb74b97b6166aab1d9d0840~mv2.jpg',
          tagType: 'person',
          tagPageLink: '/person/Bianca_Dragomir_q437h',
        },
        {
          name: 'Totti Könnölä',
          _id: '4bc3a4f3-f901-4670-80bf-f25ddd26163b',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:38.990Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:38.990Z',
          },
          tagType: 'person',
        },
        {
          name: 'Marie Ségur',
          _id: '831d7150-d514-44f8-a8aa-8d2fd0c616fe',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-23T08:42:08.163Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-23T08:42:08.163Z',
          },
          tagType: 'person',
        },
        {
          name: 'Radu Gheorghiu',
          _id: '79e69062-1f22-4acd-bd5c-b4b0f17a3dad',
          _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
          _createdDate: {
            $date: '2024-10-15T09:06:25.839Z',
          },
          _updatedDate: {
            $date: '2024-10-15T09:06:25.839Z',
          },
          tagType: 'person',
        },
      ],
      organisations: [
        {
          popularity: 68,
          tagline: 'Technologicke Centrum Praha ZSPO',
          name: 'TC Praha',
          _id: '6f52fb6e-0645-4571-91be-b61087dea931',
          _createdDate: {
            $date: '2024-08-27T09:48:24.839Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.839Z',
          },
          tagType: 'organisation',
        },
      ],
      postContentRIch1:
        '<p>The second Mutual Learning Event (MLE) took place online on September 26, 2024,  as part of Eye of Europe, a Horizon Europe project which aims to enhance the integration of foresight practices into Research and Innovation (R&amp;I) policy-making across Europe and to nurture a vibrant, cohesive R&amp;I foresight community that contributes significantly, as a collective intelligence, to shaping and guiding policy decisions.<br><br>The online MLE brought together <strong>fifty participants</strong> from diverse stakeholder groups: Eye of Europe partner organizations, the European Commission, R&amp;I funding agencies, representatives of governmental bodies. The event, organized by Technology Centre Prague (TC), focused on the topic of policy oriented communication of foresight results. Group and plenary discussions in three interactive sessions were framed by expert presentations showcasing diverse practices in the application and communication of foresight.<br><br>Presentations:<br></p>\n<ul>\n<li><strong>Michal Pazour</strong> (TC Prague, Czech Republic) introduced the Eye of Europe project and the context of this second Mutual Learning Event.</li>\n<li>Moderator of the event <strong>Lenka Hebáková</strong> (TC Prague, Czech Republic) followed up with an introduction to the event’s aims and agenda.</li>\n<li><strong>Mikko Dufva</strong> (SITRA, Finland) – “Communicating foresight. From knowing it all to empowering change”. The presentation included three case studies: SITRA’s decade long experience with megatrends as a platform for dialogue, their work on weak signals as an invitation to broaden futures thinking in a “what if?” spirit and, finally, their efforts to empower others to define futures bottom-up, through small funding to diverse teams across Finland.</li>\n<li>“Communicating foresight in the European Commission” presented by <strong>Maia Knutti</strong> and <strong>Teodora Garbovan</strong> (EU Policy Lab, European Commission) brought insights into how, in the European Commission context, foresight is employed and linked with the policy cycle. Examples covered foresight content (e.g. Strategic Foresight Reports) and engagement tools (e.g. megatrends hub, scenario exploration system) that are serving different stakeholder groups across multiple channels.</li>\n<li><strong>Bianca Dragomir</strong> (Institutul de Prospectiva, Romania) discussed a case study on embedding foresight into policy making in the context of developing the Strategy for Fishing and Aquaculture 2035 in Romania. Moreover, she shared about embedding foresight into both policy making and societal conversation, discussing two Foresight on Demand projects: Scenarios on “Transhumanist Revolutions” and foresight-meets-speculative-design project “Futures Garden”.</li>\n<li><strong>Totti Könnölä</strong> (Insight Foresight Institute, Spain) shared about the Foresight on Demand project "European R&amp;I foresight and public engagement for Horizon Europe" that advanced several objectives: generating foresight intelligence, i.e. through forward-looking policy briefs; monitoring of foresight activities and providing support for exploitation (Horizon Futures Watch); laying the building blocks for a European foresight community supported by an online platform.</li>\n<li><strong>Marie Ségur</strong> (Futuribles, France) presented a case study on “Future of social work in France to 2035-2050” and the methods employed throughout the process: using surveys to motivate engagement with futures thinking, scenario building that may inform strategic choices and guide towards a vision and, finally, communicating outcomes in a synthetic manner, that may contribute to a wider discussion around the topic.</li>\n<li>Eye of Europe project coordinator <strong>Radu Gheorghiu</strong> (UEFISCDI, Romania) shared previews of the upcoming upgrade of the futures4europe.eu platform, with its new look and extended features.<br><br><br><br><em>This event is the second in a series of five MLEs planned in the project; the following event will be held in January 2025 also in an online format. All Eye of Europe MLEs are organized by Technology Centre Prague (TC), Eye of Europe partner and key Czech national think tank and academia based NGO with a rich experience with knowledge-based policy making support and (participatory as well as expert based) foresight activities.</em></li>\n</ul>\n',
      projects: [
        {
          popularity: 1,
          name: 'Eye of Europe',
          _id: 'a3da923c-66d3-46a7-8ab0-8d33424f3b80',
          _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
          _createdDate: {
            $date: '2024-10-15T11:02:13.126Z',
          },
          tagLine: 'The Research and Innovation Foresight Community',
          _updatedDate: {
            $date: '2024-10-25T11:17:57.445Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_3fc30f50bb3c467aa3213c444816d649~mv2.png',
          tagType: 'project',
          tagPageLink: '/project/Eye_of_Europe_6ft5d',
        },
      ],
      countryTag: [],
      title: "Eye of Europe's second Mutual Learning Event",
      internalLinks: [],
      projectResultAuthor: [
        {
          name: 'Iva Vancurova',
          _id: '805b8615-2c53-4abb-9abb-a225441972f9',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.364Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.364Z',
          },
          tagType: 'person',
        },
      ],
    },
    _id: '412edd3a-bd46-4abb-8179-197455783f87',
  },
  {
    dataCollectionId: 'PostPages',
    data: {
      projectResultPublicationDate: '2024-07-03T00:00:00.000Z',
      subtitle:
        'Eleven exciting topics have been selected by the Eye of Europe Consortium for Foresight Workshops to take place in 2025-2026',
      author: [
        {
          name: 'Bianca Dragomir',
          _id: '90c38dc0-018b-4d55-af76-e2b52130e029',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.344Z',
          },
          tagLine: 'Live deeply and tenderly',
          _updatedDate: {
            $date: '2024-10-14T18:29:46.298Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_957ec9dc2bb74b97b6166aab1d9d0840~mv2.jpg',
          tagType: 'person',
          tagPageLink: '/person/Bianca_Dragomir_q437h',
        },
      ],
      people: [
        {
          name: 'Pier Francesco Moretti',
          _id: '649326a1-d0b4-4c62-9a4f-cb6775722bd9',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-23T08:34:42.029Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-23T08:34:42.029Z',
          },
          tagType: 'person',
        },
        {
          name: 'Philine Warnke',
          _id: '26c009a4-0699-45fa-8d60-16ebfe63cd90',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:38.978Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:38.978Z',
          },
          tagType: 'person',
        },
      ],
      postContentRIch2: '<p></p>\n',
      methods: [],
      pageTypes: [
        {
          popularity: 126,
          name: 'project result',
          _id: '649a0649-abfd-43c3-86d5-2765c99f7f31',
          _createdDate: {
            $date: '2024-08-27T09:51:01.712Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.712Z',
          },
          tagId: 252529,
          tagType: 'page type',
        },
      ],
      _id: '5733cea0-3205-4f9b-9981-29a3a5ef1185',
      _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
      _createdDate: {
        $date: '2024-10-23T08:30:31.090Z',
      },
      domains: [
        {
          popularity: 48,
          name: 'democracy',
          _id: 'b6eb6f2d-beae-4471-b980-95b11d48b675',
          _createdDate: {
            $date: '2024-08-27T09:48:25.101Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.101Z',
          },
          tagType: 'domain',
        },
        {
          name: 'Aging',
          _id: 'c0b23f07-22da-4931-a582-be2d2d7b3758',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-23T08:28:19.587Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-23T08:28:19.587Z',
          },
          tagType: 'domain',
        },
        {
          name: 'Fashion',
          _id: '43307c72-8f16-49fd-91c1-9328aefcd933',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-23T08:28:36.134Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-23T08:28:36.134Z',
          },
          tagType: 'domain',
        },
        {
          name: 'Diet',
          _id: '19ba2e76-07f4-43f3-9b7c-8b4aedff2fc0',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-23T08:28:50.225Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-23T08:28:50.225Z',
          },
          tagType: 'domain',
        },
        {
          name: 'Emotions',
          _id: '2321cecb-186d-4aef-8903-195199d867a9',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-23T08:29:08.599Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-23T08:29:08.599Z',
          },
          tagType: 'domain',
        },
        {
          name: 'Decarbonisation',
          _id: 'b17267c9-696c-4007-b97e-568deb8e7283',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-23T08:29:26.646Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-23T08:29:26.646Z',
          },
          tagType: 'domain',
        },
        {
          name: 'Knowledge',
          _id: '3856c25c-1224-40d0-bae6-666c37eec97e',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-23T08:29:56.782Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-23T08:29:56.782Z',
          },
          tagType: 'domain',
        },
      ],
      postImage1: {
        url: ' ',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-23T08:35:35.423Z',
      },
      slug: 'eye-of-europe-foresight-pilot-topics-ur2q3',
      mediaFiles: [
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      moderators: [],
      speakers: [],
      organisations: [
        {
          name: 'Consiglio Nazionale delle Ricerche',
          _id: '8d9e6294-404a-432b-be15-2bacef51ab4e',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T16:38:34.536Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-22T16:38:34.536Z',
          },
          tagType: 'organisation',
        },
        {
          popularity: 106,
          name: 'Fraunhofer ISI',
          _id: 'b83286d1-5153-4efa-b694-e1828ca61739',
          _createdDate: {
            $date: '2024-08-27T09:48:24.829Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.829Z',
          },
          tagType: 'organisation',
        },
      ],
      postContentRIch1:
        '<p>The Eye of Europe (EoE) project has reached an important milestone: Using an interactive approach,  the members of the consortium came up with eleven exciting topics that will be addressed in Foresight Workshops with experts, citizens, entrepreneurs, scientists, policymakers, journalists and many other stakeholder groups within the coming 16 months. In the workshops, Eye of Europe partners will apply both established and novel Foresight approaches to dive deep into topics of common interest to stakeholders across the European Research Area. These workshops will take place in cities such as Madrid, Prague, Berlin, Bucharest, Paris and Thessaloniki, as well as online. <br><br>The final set of topics for EoE pilot workshops is as follows:<br></p>\n<ul>\n<li><strong>Democracy – a long term Project</strong>: This online workshop will gather domain experts to shed light on a large spectrum of future challenges to democracy.</li>\n<li><strong>The Knowledge of our Civilisation(s) in 2040</strong>: In this two-day Berlin based workshop participants with diverse domain expertise will explore the future of knowledge in human civilisation in the face of multiple drivers of change.</li>\n<li><strong>European Industrial Decarbonisation</strong>: This two-day workshop in Madrid will gather diverse stakeholders to debate alternative pathways of industrial decarbonisation for Europe in the face of different geopolitical scenarios.</li>\n<li><strong>Emotion Ecosystems</strong>: This Bucharest based two-day workshop will investigate the impact of technologies like affective computing and brain-machine interface on individuals and collectives with different stakeholder groups.</li>\n<li><strong>Democracy and Technology</strong>: In this workshop citizens in Prague will jointly reflect on democratic approaches to risks connected with new technologies and their impacts on various societal groups.</li>\n<li><strong>Aging and Assisted Living Technologies</strong>: This workshop in Berlin with international research and policy actors is dedicated to future ways of integrating smart and digital technologies into assisted living and care for older adults.</li>\n<li><strong>Fashion Futures</strong>: In two Thessaloniki based workshops citizens and domain experts will explore the future of sustainable fashion in interaction with values and identities both with a regional and international perspective.</li>\n<li><strong>Public Policy and Change of Diets</strong>: In this workshop in Paris a diverse group of citizens will reflect on policy inroads into future pathways towards healthy and sustainable diets.</li>\n<li><strong>Science and Conflicts</strong>: In this online workshop, experts and actors of the science system will jointly dive into possible implications of growing geopolitical tensions for science.</li>\n<li><strong>Future of Knowledge and Emotions</strong>: This futures survey will provide input for the two interrelated topics the future of knowledge and the future of emotion ecosystems that will feed the respective workshops.<br><br><br>These Eye of Europe Foresight pilot workshops have a twofold purpose.<br><br>First of all, the workshops serve the project’s aspirations expressed by Eye of Europe coordinator, Radu Gheorghiu, namely to  nurture the “vibrant community of individuals engaging in a conversation about our collective future” and to fuel the “continuous loop of dialogue, learning and inspiration”.<br><br>Secondly, by addressing topics of common interest to R&amp;I actors across ERA and major R&amp;I challenges, they aim to mobilise collective anticipatory intelligence. In particular, we hope to shed light on the evolution of research and innovation and its contribution to a wide range of important future questions.<br><br>How did the team arrive at these topics?<br><br>The topic generation process involved three major elements:<br></li>\n<li>Analysis of R&amp;I strategy documents from a range of different EU countries</li>\n<li>interviews with R&amp;I actors from different positions in ERA’s research and innovation ecosystem,</li>\n<li>and interactive discourse among EoE partner organisations.<br><br>It was important to the topic identification team, led by Pier Francesco Moretti from CNR - Consiglio Nazionale delle Ricerche in Italy, not to remain at the surface of the challenges that are expressed in key documents but to dive deeper into underlying root causes and dynamics. So when in the document analysis, topics like energy, artificial intelligence, digitalisation, health and security emerged at top positions, we strived to identify crosscutting underlying aspects.</li>\n</ul>\n',
      projects: [
        {
          popularity: 1,
          name: 'Eye of Europe',
          _id: 'a3da923c-66d3-46a7-8ab0-8d33424f3b80',
          _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
          _createdDate: {
            $date: '2024-10-15T11:02:13.126Z',
          },
          tagLine: 'The Research and Innovation Foresight Community',
          _updatedDate: {
            $date: '2024-10-25T11:17:57.445Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_3fc30f50bb3c467aa3213c444816d649~mv2.png',
          tagType: 'project',
          tagPageLink: '/project/Eye_of_Europe_6ft5d',
        },
      ],
      countryTag: [
        {
          name: 'EU',
          _id: 'e1b13728-5253-484b-92d6-0c451813adff',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T10:28:23.621Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-22T10:28:23.621Z',
          },
          tagType: 'country',
        },
      ],
      title: 'Eye of Europe Foresight Pilot Topics',
      projectResultMedia: {
        url: 'https://0bbe2e34-e503-441a-af9e-4fc70c17e6af.usrfiles.com/ugd/471908_f3488e3f37e247b8b590089e8a304ed3.pdf',
        fileName: 'Eye of Europe Foresight Pilot Topics.pdf',
        thumbnail:
          'https://static.wixstatic.com/media/471908_23626597bccf4f66bb49a9741c6d6cc2~mv2.jpeg',
        sizeInBytes: '1709991',
        type: 'document',
      },
      internalLinks: [],
      projectResultAuthor: [
        {
          name: 'Philine Warnke',
          _id: '26c009a4-0699-45fa-8d60-16ebfe63cd90',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:38.978Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:38.978Z',
          },
          tagType: 'person',
        },
      ],
    },
    _id: '5733cea0-3205-4f9b-9981-29a3a5ef1185',
  },
  {
    dataCollectionId: 'PostPages',
    data: {
      projectResultPublicationDate: null,
      subtitle: 'A Technology Foresight study',
      author: [
        {
          name: 'Cristina Plescan',
          _id: 'd5357589-65fd-456f-a506-7a4d1275451c',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.143Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.143Z',
          },
          tagType: 'person',
        },
      ],
      people: [],
      postContentRIch2: '<p></p>\n',
      methods: [
        {
          popularity: 36,
          name: 'scenarios',
          _id: '3c4917d4-7467-4fef-a6a3-af7b61b9e196',
          _createdDate: {
            $date: '2024-08-27T09:48:24.946Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.946Z',
          },
          tagType: 'foresight method',
        },
      ],
      pageTypes: [
        {
          popularity: 126,
          name: 'project result',
          _id: '649a0649-abfd-43c3-86d5-2765c99f7f31',
          _createdDate: {
            $date: '2024-08-27T09:51:01.712Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.712Z',
          },
          tagId: 252529,
          tagType: 'page type',
        },
      ],
      _id: 'f611dbc2-6c33-4ca8-b05c-c13e91a1e0f5',
      _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
      _createdDate: {
        $date: '2024-10-22T10:44:17.982Z',
      },
      domains: [
        {
          name: 'Emerging Technologies',
          _id: '414e11bd-1c1c-4d88-b63e-f24a3b2c711a',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T10:37:07.120Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-22T10:37:07.120Z',
          },
          tagType: 'domain',
        },
        {
          popularity: 14,
          name: 'health',
          _id: '255f22bd-fa84-4b93-a1f3-df2944b48ffa',
          _createdDate: {
            $date: '2024-08-27T09:48:25.084Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.084Z',
          },
          tagType: 'domain',
        },
      ],
      postImage1: {
        url: ' ',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-28T12:47:26.088Z',
      },
      slug: 'suppressing-indoor-pathogen-transmission-1tkhp',
      mediaFiles: [
        {
          displayName: 'Suppressing indoor pathogen transmission',
          url: 'https://0bbe2e34-e503-441a-af9e-4fc70c17e6af.usrfiles.com/ugd/471908_ff9170de02464a88a11e0c9f849758dc.pdf',
          fileName:
            'Suppressing indoor pathogen transmission_A Technology Foresight study.pdf',
          thumbnail:
            'https://static.wixstatic.com/media/471908_989b11b1fa8044088b8072b3623dfded~mv2.jpeg',
          sizeInBytes: '3179797',
          type: 'document',
        },
        {
          displayName: '',
          url: '',
          fileName: '',
          thumbnail: '',
          sizeInBytes: '',
          type: '',
        },
      ],
      moderators: [],
      speakers: [],
      organisations: [
        {
          popularity: 50,
          name: 'Joint Research Center',
          _id: 'f85b3c01-69e8-4688-8766-14c3910bea1b',
          _createdDate: {
            $date: '2024-08-27T09:48:24.871Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.871Z',
          },
          tagType: 'organisation',
        },
        {
          name: 'HERA',
          _id: '4aa3fb83-c1ff-4368-8f7f-fb231687623c',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-28T12:47:03.986Z',
          },
          tagLine: 'Health Emergency Preparedness and Response Authority',
          _updatedDate: {
            $date: '2024-10-28T12:47:03.986Z',
          },
          tagType: 'organisation',
        },
      ],
      postContentRIch1:
        '<p>Airborne transmission is considered one of the most common ways of transmitting respiratory viruses. The reach of airborne pathogens and persistence of aerosolized particles suspended in the air are a significant concern for the spread of pandemic and seasonal respiratory diseases. This is particularly relevant in indoor spaces where most respiratory infections occur.&nbsp;</p>\n<p>Controlling the transmission of airborne pathogens is therefore a cornerstone of public health efforts to manage and prevent the spread of infectious diseases, ensuring safety and health for individuals and communities. Technologies that allow such control are essential to address the challenge. This report is the output of a comprehensive study which evaluates the potential of the current technology landscape for suppressing indoor airborne pathogen transmission.&nbsp;</p>\n<p>The analysis outlines two main technology groups: those for detecting airborne pathogens and those for decontaminating air and surfaces. It identifies several key technologies in each group, and assesses their maturity, impact, and potential priority for funding. It outlines the drivers, enablers, and barriers for the development and adoption of these technologies, providing insights into factors that may influence their future implementation. It also explores forward-looking perspectives with scenarios for future health crises and offers recommendations for policy and research to address the challenges and leverage the opportunities in the field of indoor air quality.&nbsp;</p>\n<p>The study was conducted during 2024 by European Commission Joint Research Centre (JRC) and Health Emergency Preparedness and Response Authority (HERA).</p>\n',
      projects: [],
      countryTag: [
        {
          name: 'EU',
          _id: 'e1b13728-5253-484b-92d6-0c451813adff',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T10:28:23.621Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-22T10:28:23.621Z',
          },
          tagType: 'country',
        },
      ],
      title: 'Suppressing indoor pathogen transmission',
      projectResultMedia: {
        url: 'https://0bbe2e34-e503-441a-af9e-4fc70c17e6af.usrfiles.com/ugd/471908_f6683daf65cc495181db31b40ab85ab5.pdf',
        fileName: '471908_ff9170de02464a88a11e0c9f849758dc.pdf',
        thumbnail:
          'https://static.wixstatic.com/media/471908_18d1816dfccc45a4b86d1bfb7049a291~mv2.jpeg',
        sizeInBytes: '3179797',
        type: 'document',
      },
      internalLinks: [],
      projectResultAuthor: [
        {
          name: 'Ana Ruiz Moreno',
          _id: '84962a09-475b-43c5-ac2b-a6a25a5353b2',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.183Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.183Z',
          },
          tagType: 'person',
        },
        {
          name: 'F. Fumagalli',
          _id: '3172d50c-6450-42c4-88d3-5c51d7d588d1',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-23T13:49:25.461Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-23T13:49:25.461Z',
          },
          tagType: 'person',
        },
        {
          name: 'F. roncari',
          _id: '97f06197-9063-44e3-bcc6-b4e90d03d422',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-23T13:50:51.950Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-23T13:50:51.950Z',
          },
          tagType: 'person',
        },
        {
          name: 'P. Colpo',
          _id: '06c43323-e906-4e6b-b08d-1f3016a93a3a',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-23T13:51:17.112Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-23T13:51:17.112Z',
          },
          tagType: 'person',
        },
        {
          name: 'D. Ashour',
          _id: '12133a44-90cd-41e7-b90a-877b020198c2',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-23T13:51:38.617Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-23T13:51:38.617Z',
          },
          tagType: 'person',
        },
        {
          name: 'A. Prenner',
          _id: '118a57f4-06ff-4294-b90c-72aed16a60ed',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-23T13:51:57.965Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-23T13:51:57.965Z',
          },
          tagType: 'person',
        },
        {
          name: 'Alexandra de Maleville',
          _id: 'd87bc7f2-0308-4088-bb3a-0cc6cb2f5ecd',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:38.971Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:38.971Z',
          },
          tagType: 'person',
        },
        {
          name: 'Joao Farinha',
          _id: '85737a3f-039a-438b-8ab9-d1b8f6cba4cf',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.012Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.012Z',
          },
          tagType: 'person',
        },
        {
          name: 'Antonia Mochan',
          _id: 'c3ab2ca6-655e-448b-b5e1-1f2f9fafa7a9',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.077Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.077Z',
          },
          tagType: 'person',
        },
      ],
    },
    _id: 'f611dbc2-6c33-4ca8-b05c-c13e91a1e0f5',
  },
  {
    dataCollectionId: 'PostPages',
    data: {
      subtitle: 'Futures4Europe conversations',
      author: [
        {
          name: 'Bianca Dragomir',
          _id: '90c38dc0-018b-4d55-af76-e2b52130e029',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.344Z',
          },
          tagLine: 'Live deeply and tenderly',
          _updatedDate: {
            $date: '2024-10-14T18:29:46.298Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_957ec9dc2bb74b97b6166aab1d9d0840~mv2.jpg',
          tagType: 'person',
          tagPageLink: '/person/Bianca_Dragomir_q437h',
        },
      ],
      people: [
        {
          name: 'Bianca Dragomir',
          _id: '90c38dc0-018b-4d55-af76-e2b52130e029',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.344Z',
          },
          tagLine: 'Live deeply and tenderly',
          _updatedDate: {
            $date: '2024-10-14T18:29:46.298Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_957ec9dc2bb74b97b6166aab1d9d0840~mv2.jpg',
          tagType: 'person',
          tagPageLink: '/person/Bianca_Dragomir_q437h',
        },
        {
          name: 'PETER BISHOP',
          _id: '5ab8d809-3446-4755-87c7-73a135f36f52',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.004Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.004Z',
          },
          tagType: 'person',
        },
      ],
      postContentRIch2: '<p></p>\n',
      methods: [],
      pageTypes: [
        {
          popularity: 126,
          name: 'project result',
          _id: '649a0649-abfd-43c3-86d5-2765c99f7f31',
          _createdDate: {
            $date: '2024-08-27T09:51:01.712Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.712Z',
          },
          tagId: 252529,
          tagType: 'page type',
        },
      ],
      _id: '921a5896-8da7-469c-be25-51cbc782307c',
      _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
      _createdDate: {
        $date: '2024-10-21T21:08:42.629Z',
      },
      domains: [],
      postImage1: {
        url: ' ',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-21T21:08:42.629Z',
      },
      slug: 'On_engaging_meaningfully_with_futures_2iaaa',
      moderators: [],
      speakers: [],
      organisations: [
        {
          name: 'Prospectiva',
          _id: '0a40b56c-b3ce-464f-9373-39d01bfdb09c',
          _owner: '4e87a317-884a-4be5-a4f2-a9a8cd641be3',
          _createdDate: {
            $date: '2024-10-14T10:49:49Z',
          },
          tagLine: 'Institutul de Prospectiva',
          _updatedDate: {
            $date: '2024-10-15T08:48:03.231Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_d73eb310112b41cb81a61667a4cc7421~mv2.png',
          tagType: 'organisation',
          tagPageLink: '/organisation/Prospectiva_fiw2n',
        },
        {
          popularity: 54,
          name: 'Teach the Future',
          _id: 'e0b39024-785a-4e1a-8832-93c24e96970e',
          _createdDate: {
            $date: '2024-08-27T09:48:24.802Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.802Z',
          },
          tagType: 'organisation',
        },
      ],
      postContentRIch1:
        "<p>This is the first episode of <strong>Futures4Europe conversations</strong>, initiated by the Eye of Europe project – a series of dialogues between Bianca Dragomir and professionals from all over the world, who engage in work that is future sensitive.</p>\n<p><strong>About this episode - On engaging meaningfully with futures</strong></p>\n<p>Often framed as a professional activity essential for 'planning', guiding 'decision making' or 'orienting strategies', futures studies could be more generously placed in the realm of humanities where, along other human capacities, imagination and anticipation should be nurtured and celebrated.<br><br>In this light, futures education is more like a tending a garden. Like doing the soil work that turns it into the fertile ground for seeds to grow into 'flowers' such as human creativity, a heightened awareness of the mechanisms of change, agency coupled with humility, a sense of taking part into shaping something yet non-existent.<br><br>Peter Bishop, founder of Teach the Future, argues that this garden should be welcoming everyone, including young people, or perhaps especially them.</p>\n",
      projects: [
        {
          popularity: 1,
          name: 'Eye of Europe',
          _id: 'a3da923c-66d3-46a7-8ab0-8d33424f3b80',
          _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
          _createdDate: {
            $date: '2024-10-15T11:02:13.126Z',
          },
          tagLine: 'The Research and Innovation Foresight Community',
          _updatedDate: {
            $date: '2024-10-25T11:17:57.445Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_3fc30f50bb3c467aa3213c444816d649~mv2.png',
          tagType: 'project',
          tagPageLink: '/project/Eye_of_Europe_6ft5d',
        },
      ],
      countryTag: [],
      title: 'On engaging meaningfully with futures',
      projectResultMedia: {
        url: 'https://www.youtube.com/watch?v=RRk_s4KQqb0&t=187s',
        fileName: '',
        thumbnail: 'https://img.youtube.com/vi/RRk_s4KQqb0/mqdefault.jpg',
        sizeInBytes: '',
        type: 'video',
      },
      internalLinks: [],
      projectResultAuthor: [
        {
          name: 'Bianca Dragomir',
          _id: '90c38dc0-018b-4d55-af76-e2b52130e029',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.344Z',
          },
          tagLine: 'Live deeply and tenderly',
          _updatedDate: {
            $date: '2024-10-14T18:29:46.298Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_957ec9dc2bb74b97b6166aab1d9d0840~mv2.jpg',
          tagType: 'person',
          tagPageLink: '/person/Bianca_Dragomir_q437h',
        },
      ],
    },
    _id: '921a5896-8da7-469c-be25-51cbc782307c',
  },
  {
    dataCollectionId: 'PostPages',
    data: {
      subtitle:
        'A portrait of how EU citizens imagine their futures; analysis of stories collected by #OurFutures',
      author: [
        {
          name: 'Bianca Dragomir',
          _id: '90c38dc0-018b-4d55-af76-e2b52130e029',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.344Z',
          },
          tagLine: 'Live deeply and tenderly',
          _updatedDate: {
            $date: '2024-10-14T18:29:46.298Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_957ec9dc2bb74b97b6166aab1d9d0840~mv2.jpg',
          tagType: 'person',
          tagPageLink: '/person/Bianca_Dragomir_q437h',
        },
      ],
      people: [],
      postImage2: {
        url: ' ',
        caption: '',
      },
      postContentRIch2:
        '<p><strong>What are the key insights we gain from people’s #OurFutures stories? </strong> <br>What are people\'s hopes, concerns and ideas for our future in Europe and beyond? We will highlight some of the most interesting findings. They shall inspire you to help build the future of Europe. You might be a curious individual, researcher, entrepreneur or policymaker: all contribute to shape the future.</p>\n<p><strong>High hopes and high concerns for the future of our planet </strong><br>The overwhelming majority of the participants are hopeful and inspired by the future images they shared, and positive feelings are mostly associated to stories about nature, fairness and well-being. Interestingly enough, these topics are also leading the minority of less positive stories. <br><br>More than 40% of the participants talk about climate and nature issues. They imagine greener cities and a circular economy, show attention to the need to preserve biodiversity, to pursue more sustainable mobility etc. When people talk about caring for each other or health issues, they very often give it an environmental flavour: our health depends on the health of planet Earth and the need to protect it.&nbsp;</p>\n<p><em>“Seventeen years from now, I would like the world to be […] a place where everything is in balance, especially the climate. Seventeen years from now I would like to see diesel or petrol cars abolished, factory emissions reduced and nature and greenery allowed to enter cities more efficiently. I would like the pavements to be cultivated, so as to support 0-impact mobility, and I would also like all houses to have an A grade or higher, so as to preserve the environment.” </em></p>\n<p>Participants do not believe that their future will happen by itself. It will take strengthening human connections, relationships, communication and empathy. In addition, the need for a stronger connection with nature and with the local context emerge from the stories. <br><br>Even though their images are mostly positive, respondents are quite concerned about the future. They show a rather pessimistic view of our ability to tackle climate-related and other environmental challenges: often the future they describe is seen as only possible in a utopian world. They especially express concern, powerlessness and fear when their stories are less about the future and more about a depiction of our current times.&nbsp;</p>\n<p><em>“The golden age is over. With inevitable climate change a centuries long age of decline has begun.” ”There is essentially no hope for our future on this planet.” </em></p>\n<p>Generally, though, the younger generation shares optimistic stories about the environment and the future of the planet, and believe that their perception will happen. Their images talk about de-growth, sustainable lifestyles, less individualism and more attention to the relationships among communities.&nbsp;</p>\n<p><em>“One of the most important changes I would like to see in the future has to do with our energy consumption and production. It is vital that we switch to renewable sources of energy soon, as it is severely harmful to the environment.”  </em></p>\n<p>However, they seem to believe less in their own ability to shape that future in comparison to other age groups.&nbsp;</p>\n<p><strong>Social issues: what is included and what is absent in the stories?</strong>&nbsp;</p>\n<p>Social dimensions are very much present in the images of the respondents - especially in those shared by women. Many stories mention a strong wish for a world without any discrimination based on gender, colour, and sexual orientation, and a fair Europe in which everyone has access to the same opportunities regardless of their background.&nbsp;</p>\n<p><em>“I wish that minorities will no longer be singled out, but that it will become normal for them to have respectable positions in society.” </em></p>\n<p>The strong focus on zero discrimination, social justice and solidarity, is also present in the few future images related to migration. Only 6% of the people connect their story to ‘migration’, and in those few stories that do talk about refugees, the topic is generally taken up from a positive stand: a plea for open borders, the need to care for migrants, and the wish to fully include them in the socio-economic space.&nbsp;</p>\n<p><em>“In my vision of an ideal 2040, freedom of movement should be open to all - not a headache for those who need to flee or a utopia for those who cannot afford it.” </em></p>\n<p><em>“Climate refugees will be welcomed and integrated in the villages and co-living projects.”  </em></p>\n<p>An overall desire for more economic well-being for everyone is common in stories related to the economy, and ‘work’ doesn’t seem to be top of mind when thinking about the future: very few people (only 8%) tagged their stories as related to ‘work/occupation’. This might also have to do with the fact that financially insecure, unemployed (and retired) people are at the moment underrepresented in this exercise.&nbsp;&nbsp;</p>\n<p><strong>Politicians, business people and citizens together can make a better future happen – but citizens see themselves acting first </strong><br>The future is shaped by today’s actions. But who are the people that need to act to realise these desirable futures?  <br><br>The majority of contributors feel that government leaders, business people, scientists and citizens will need to work together to make the change happen. A clear trend, however, shows how important citizens or citizen groups are as changemakers. This pattern remains the same no matter what age group. Consequently, people feel that their own role in creating their future is quite substantial. Especially people that connect a positive feeling to their story believe in their ability to co-create their imagined future.&nbsp;&nbsp;</p>\n<p><em>“Surrounded with a community of people who have positive attitude to make the society better. Be a conscious global citizen and sustainable life style (SDGS#12), intergenerational community, less spiritual-material divide, simple life style” </em></p>\n<p><strong>Strong belief in technology and science </strong><br>For people that are confident about the achievability of their future, technology plays a crucial role. Science and technology will help to find solutions to the major challenges of our world: it will enable economic well-being and high-quality life for everyone while protecting the environment. It will solve current challenges or strengthen new pathways in different sectors (communication, transport, employment, medicine, etc.). <br><br>Technology enjoys a very positive and optimistic flavour, especially when it comes to healthcare (Covid-19 was still very much present at the start of the story collection): it can enable more advanced surgeries and treatments for incurable diseases, further increasing life expectancy. <br><br>Reading the stories in which ‘business people &amp; scientists’ were seen as crucial to making that future happen, digitisation at all levels is the top topic. There seems to be a big hope in a high-tech future, ranging from technologies that attempt to divert climate change to the complete digitisation of our society, in which robots replace almost everything.&nbsp;&nbsp;</p>\n<p><em>“I see a future where people live in two domains, the physical and the metaverse. The metaverse will have much more relevance in the future. In some occasions, it will have prevalence regarding the physical world. The interplay between AI, Virtual Reality, Metaverse, Augmented reality will bring a new dimension in human life, even in longevity. Regarding the longevity, some of us will life as an avatar in a metaverse enabled by several companies that provide that service.” </em>&nbsp;</p>\n<p>Some other stories describe how technology will affect daily life.</p>\n<p><em>“Superfast internet will make it possible to visit other countries staying at home in virtual reality.”  </em></p>\n<p><em>“With the development of technology, many things have changed in our lives. People are now lazier because of this. They are lazier to do things and this affects the life of the whole world.”</em>&nbsp;</p>\n<p>The increased presence of technology in our lives is seen as a negative evolution only in a few stories. Single cases describe how applications might take control over our societies and evolve towards a totalitarian state.&nbsp;</p>\n<p><strong>The relevance of local communities</strong> <br>The majority of respondents (more than 60%) consider their future images influenced by worldwide challenges, while European issues play a role in every sixth contribution. This corresponds with the high focus on climate change and global justice reflected in the stories, and, as the word ‘war’ is present in 49 stories, undoubtedly the war in Ukraine also influenced people\'s future thinking.  <br><br>National and local challenges each are considered to influence the future image only in every tenth story; however, community action at the local level is seen as the key driver to actively shape the future in nearly one third of the stories.   <br><br>Contributors see a significant role for themselves in strengthening human connections, creating better relationships in their neighbourhoods, or call for more empathy towards those who are seen as ‘different’ (in terms of ethnic background, gender, etc.).&nbsp;</p>\n<p><em>“I would like to see as many people as possible volunteering to help individuals in their community. E.g. helping the elderly and the disabled with grocery deliveries, transport. Helping children to learn, volunteering in schools to help with sports and other activities organised by the school, etc.”  </em></p>\n<p>A closer connection with nature is also reflected in local stories: from the need to change personal behaviours, to changes surroundings as through urban planning. <br><br>A small but still substantial number of stories talks about young people’s very personal concerns related to housing, finding a job, and having a pension.&nbsp;</p>\n<p><em>“It\'s no secret that the younger generation has been dealt a tough hand.”  </em></p>\n<p><em>“In the future, I would like everyone to be able to live in as little deprivation as possible; or for young people to be able to live as normally as possible; or to make the transition from adolescence to adulthood without major deprivation. By this I mean, above all, making it easier to become independent or to start life on one\'s own, where the housing would be reasonably priced or the rent would not be too high, and would enable the individual to live more easily and save money.” </em></p>\n<p><strong>General concern without losing hope? </strong><br>Although 70% of the people associate the image of their future with only positive feelings, people are clearly concerned about the future: 50% of the respondents have indicated high levels of concern.  <br><br>Still, their concern is not hopeless: a lot seems to be possible at local level if people act together, with technology as an ally.  <br><br>In the perspective offered by the stories collected, the challenge for decision makers and for policy makers becomes to enable a collaborative exchange among businesses, policymakers and citizens. Their combined efforts are in fact crucial to enable the overwhelming majority of positive societal and environmental scenarios shared in this exercise.&nbsp;&nbsp;</p>\n<p>***</p>\n<p><em>#OurFutures is an </em><a href="https://ourfutures.dashboard.voicesthatcount.net/" target="_blank"><em>open-data base</em></a><em>, designed by  the </em><a href="https://knowledge4policy.ec.europa.eu/foresight_en" target="_blank"><em>Competence Centre of Foresight</em></a><em>  of the Joint Research Centre of the European Commission, to inspire a collective dialogue about the future of Europe.</em></p>\n<p><em>The first Futures Stories (591) were collected from 1 June 2021 till 30 May 2022 (start-up phase of the project). For more information, check out our full report or </em><a href="https://ourfutures.dashboard.voicesthatcount.net/" target="_blank"><em>open database</em></a>&nbsp;</p>\n<p>***</p>\n<p>This post was originally posted on May 9, 2023, <a href="https://policy-lab.ec.europa.eu/news/future-europe-what-do-you-imagine-it-will-look-2023-05-09_en" target="_blank">on policy-lab.ec.europa.eu</a>&nbsp;</p>\n<p></p>\n',
      methods: [],
      pageTypes: [
        {
          popularity: 253,
          name: 'post',
          _id: 'cc31afc1-a304-465a-be3e-a887b68884f3',
          _createdDate: {
            $date: '2024-08-27T09:51:01.713Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.713Z',
          },
          tagId: 252528,
          tagType: 'page type',
        },
      ],
      _id: 'afc2a002-cf65-4c27-a0b9-d3c4fb1fd11c',
      _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
      _createdDate: {
        $date: '2024-10-18T10:08:52.304Z',
      },
      postContentRIch3: '<p></p>\n',
      domains: [],
      postImage1: {
        url: 'https://static.wixstatic.com/media/471908_b9154c3e79da4fb3867983755e989f3d~mv2.png',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-21T19:47:29.466Z',
      },
      slug: 'The_future_of_Europe_what_do_you_imagine_it_will_look_like',
      moderators: [],
      speakers: [],
      organisations: [
        {
          popularity: 50,
          name: 'Joint Research Center',
          _id: 'f85b3c01-69e8-4688-8766-14c3910bea1b',
          _createdDate: {
            $date: '2024-08-27T09:48:24.871Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.871Z',
          },
          tagType: 'organisation',
        },
      ],
      postContentRIch1:
        '<p>We invited people across the EU to share their imagined futures. For this collection we, the European Commission’s Competence Centre on Foresight, used a narrative inquiry method. Instead of asking opinions about the future, we asked participants to share a story about their desirable future, followed by a few questions about that story, in order to more fully comprehend their thinking. In this process we were guided by Voices That Count.  <br><br>In this article, we’ll take a look at <strong>the first 591 stories of people that participated so far</strong>, mostly from Greece and Slovenia, followed by Germany, Spain and Italy. Approximately half of them are students, and the other half mainly consists of employed people.&nbsp;</p>\n<p>&nbsp;&nbsp;</p>\n',
      projects: [
        {
          name: '#OurFutures',
          _id: '612a7547-db2c-49b7-8b05-576dbc951324',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-17T12:43:06.796Z',
          },
          tagLine:
            'Collecting stories from citizens of Europe, indicating their desirable futures.',
          _updatedDate: {
            $date: '2024-10-18T08:49:56.859Z',
          },
          tagType: 'project',
          tagPageLink: '/project/OurFutures_wgft5',
        },
      ],
      countryTag: [],
      title: 'The future of Europe: what do you imagine it will look like?',
      internalLinks: [],
      projectResultAuthor: [
        {
          name: 'Maija Knutti',
          _id: '2ce1087f-b775-422f-83b5-e222995e1fbc',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:38.950Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:38.950Z',
          },
          tagType: 'person',
        },
      ],
    },
    _id: 'afc2a002-cf65-4c27-a0b9-d3c4fb1fd11c',
  },
  {
    dataCollectionId: 'PostPages',
    data: {
      subtitle:
        'A step-by-step guide to navigating the space between artificial and human intelligence',
      author: [
        {
          name: 'Bianca Dragomir',
          _id: '90c38dc0-018b-4d55-af76-e2b52130e029',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.344Z',
          },
          tagLine: 'Live deeply and tenderly',
          _updatedDate: {
            $date: '2024-10-14T18:29:46.298Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_957ec9dc2bb74b97b6166aab1d9d0840~mv2.jpg',
          tagType: 'person',
          tagPageLink: '/person/Bianca_Dragomir_q437h',
        },
      ],
      people: [],
      eventEndDate: {
        $date: '2024-09-24T09:53:58Z',
      },
      methods: [
        {
          popularity: 47,
          name: 'horizon scanning',
          _id: 'b1d63812-7f03-4fa0-bfc7-b8d89363baa8',
          _createdDate: {
            $date: '2024-08-27T09:48:24.957Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.957Z',
          },
          tagType: 'foresight method',
        },
      ],
      pageTypes: [
        {
          popularity: 46,
          name: 'event',
          _id: '17c4547e-2219-49c8-8169-f68766c7c1d9',
          _createdDate: {
            $date: '2024-08-27T09:51:01.711Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.711Z',
          },
          tagId: 252530,
          tagType: 'page type',
        },
      ],
      _id: '572f84fe-1b1f-48ee-b5b4-d8222cdec4ed',
      _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
      _createdDate: {
        $date: '2024-10-15T08:46:23.834Z',
      },
      domains: [],
      postImage1: {
        url: 'https://static.wixstatic.com/media/471908_cda864a44d4e454695ac862c14231785~mv2.png',
        caption: '',
      },
      _updatedDate: {
        $date: '2024-10-15T12:35:48.188Z',
      },
      slug: 'Webinar_Platform_driven_horizon_scanning_in_practice_6n0a2',
      moderators: [],
      eventStartDate: {
        $date: '2024-09-24T09:53:58Z',
      },
      speakers: [
        {
          name: 'Ulli Lorenz',
          _id: '28df7a1a-e2c0-49f3-a5e6-957b64a92fd6',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.018Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:39.018Z',
          },
          tagType: 'person',
        },
        {
          name: 'Ana Keser',
          _id: '379a8461-7975-46b7-97f4-5c251faf464d',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-15T08:41:07.097Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-15T08:41:07.097Z',
          },
          tagType: 'person',
        },
      ],
      organisations: [
        {
          name: '4strat',
          _id: '3e0b1108-7d7c-412b-a02f-1573ec4a5d2f',
          _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
          _createdDate: {
            $date: '2024-10-15T08:46:04.126Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-15T08:46:04.126Z',
          },
          tagType: 'organisation',
        },
      ],
      postContentRIch1:
        '<p>4strat is running an online session on Horizon Scanning as a method for navigating uncertainty and exploring emerging signals.&nbsp;</p>\n<p>Join foresight practitioners Ullrich Lorenz and Ana Z. Keser for a dive in into:</p>\n<p>🔎 Weak Signals &amp; Sense Making: How to identify early indicators of change and make sense of them in a complex environment.&nbsp;</p>\n<p>📌 Scanning sources &amp; practices: Explore best practices for gathering data from diverse sources to uncover opportunities and risks.</p>\n<p>🌐 Tools &amp; AI: Learn how AI and digital platforms are enhancing the scanning process, making it more efficient and insightful.&nbsp;&nbsp;&nbsp;</p>\n<p></p>\n<p>What to expect:&nbsp;</p>\n<p>▪️ Practical guidance on how Horizon Scanning can support strategic decision-making and long-term planning.</p>\n<p>▪️ In-depth insights from experienced foresight professionals on how to execute a platform-driven Horizon Scanning.&nbsp;</p>\n<p>▪️ A structured approach to integrating both human expertise and AI in identifying Weak Signals and emerging trends.</p>\n<p></p>\n<p>Interested in Joining this free webinar? Register <a href="https://events.teams.microsoft.com/event/6a87add7-6237-47e0-9cf0-eb4e813dc8ad@039a2a3c-c3a2-4397-bfd1-222a120c5ef6" target="_blank">here</a>.</p>\n',
      projects: [],
      countryTag: [],
      title: 'Webinar Platform driven horizon scanning in practice',
      internalLinks: [],
      projectResultAuthor: [],
    },
    _id: '572f84fe-1b1f-48ee-b5b4-d8222cdec4ed',
  },
  {
    dataCollectionId: 'PostPages',
    data: {
      projectResultPublicationDate: '2024-05-01T00:00:00.000Z',
      subtitle: 'A Stocktaking of R&I Foresight Practices in Europe',
      author: [
        {
          name: 'Bianca Dragomir',
          _id: '90c38dc0-018b-4d55-af76-e2b52130e029',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:39.344Z',
          },
          tagLine: 'Live deeply and tenderly',
          _updatedDate: {
            $date: '2024-10-14T18:29:46.298Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_957ec9dc2bb74b97b6166aab1d9d0840~mv2.jpg',
          tagType: 'person',
          tagPageLink: '/person/Bianca_Dragomir_q437h',
        },
      ],
      people: [],
      eventEndDate: {},
      postImage2: {
        url: ' ',
        caption: '',
      },
      postContentRIch2:
        "<p>This stocktaking, carried out by the DLR Projektträger in the framework of the Eye of Europe project, is based on a comprehensive survey of 43 R&amp;I foresight organisations in 16 ERA and four non-ERA countries. Interviews with renowned national foresight experts complement the findings. Similar response rates from government and academia, business and other organisations such as consultancies or NGOs allowed for a diverse snapshot of R&amp;I foresight approaches in Europe.</p>\n<p><strong>Highlighting flagship projects</strong></p>\n<p>For the preparation of the study, European foresight actors submitted 54 different R&amp;I foresight projects. These include projects that aim to anticipate technological and societal changes in order to inform national and regional R&amp;I strategies and make them more robust, or foresight projects that address complex global issues such as climate change, cancer or sustainable food security. Others seek to understand new developments, such as the digital transformation, and analyse the social and economic impact of these changes, or to develop and design new products.</p>\n<p>R&amp;I foresight projects are not only carried out at European and national level. The report additionally highlights sub-national champions such as the Friuli Venezia Giulia region and Sardinia in Italy, the Helsinki-Uusimaa region in Finland, Ostbelgien and the Flemish government in Belgium, or Hauts-de-France, to show how they have used foresight methods to advance their R&amp;I agendas.</p>\n<p><strong>What are critical success factors and bottlenecks for R&amp;I foresight projects in Europe?</strong></p>\n<p>Here is what the R&amp;I foresight experts believe contributed to the success of their projects: Top of the list of critical success factors - mentioned by almost all respondents - is high-level commitment and support from government representatives. Ensuring cross-sectoral stakeholder engagement was another frequently cited factor. Leveraging existing networks or databases of expertise was also cited as a critical success factor, as it enables the rapid mobilisation of the right experts. But how can we ensure that we reach the relevant people and keep them engaged?</p>\n<p>Several R&amp;I foresight experts stressed the importance of defining and communicating a clear purpose for the project and explaining why it is important and worth stakeholders' time, as well as demonstrating that foresight can add value in the context of today's R&amp;I challenges. What can foresight achieve and what are its limitations? Transparency of methods also contributes to credibility. Facilitating direct interaction between participants in creative settings has the potential to be beneficial, allowing for more dynamic and contextually rich foresight outcomes. The R&amp;I foresight experts noted that it is important to allow sufficient time for interactive discussions. Wherever possible, the setting should be face-to-face.</p>\n<p>Yet, these R&amp;I foresight projects have not always gone to plan. Bottlenecks identified include recurring ones such as insufficient time for comprehensive analysis and stakeholder engagement, or financial constraints that can prevent in-depth trend analysis and essential foresight activities. It can also be time-consuming to mobilise a diverse group of experts and policy-makers for participatory exercises, which can be a challenge in a time-critical project. Short-term thinking and a reluctance to challenge established beliefs can hinder the exploration of alternative futures and stifle innovative foresight efforts. Others reported the \"impact gap\" and their struggle to ensure that foresight results influence decision making, often exacerbated by an over-reliance on written summaries that lack engaging communication methods. Finally, maintaining objectivity in horizon-scanning activities and avoiding the pitfalls of techno-optimism can also be challenging.</p>\n<p><strong>What's next? Trends in R&amp;I foresight</strong></p>\n<p>The report provides answers to those curious about the new frontiers and trends in the use of R&amp;I foresight. Whether it's the integration of AI and machine learning technologies into foresight practices, the representation of future generations and nature in foresight processes, speculative and design-based approaches or debiasing techniques, the methods of R&amp;I foresight are constantly evolving.</p>\n<p>For those wishing to expand their networks, the report also provides an overview of international and European (R&amp;I) foresight networks, national (R&amp;I) foresight networks, networks focusing on technology assessment, and examples of regular (R&amp;I) foresight conferences or conferences with sessions dedicated to R&amp;I foresight.</p>\n<p>This stocktaking report is a snapshot of the status quo of R&amp;I foresight actors in Europe. However, new innovative projects are being implemented as you read this article. As the Eye of Europe project consortium, we are committed to strengthening fora for exchange among R&amp;I practitioners interested in foresight methodologies. Let's continue the lively discussions on the Futures4Europe platform to shape tomorrow's R&amp;I agendas together.</p>\n",
      methods: [],
      pageTypes: [
        {
          popularity: 126,
          name: 'project result',
          _id: '649a0649-abfd-43c3-86d5-2765c99f7f31',
          _createdDate: {
            $date: '2024-08-27T09:51:01.712Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:51:01.712Z',
          },
          tagId: 252529,
          tagType: 'page type',
        },
      ],
      _id: '4aff5bd1-9ae5-41fb-b30e-476ad2d91d9a',
      _owner: 'f677c1bb-4334-4039-a211-fdd89e013a3c',
      _createdDate: {
        $date: '2024-10-14T16:45:28.032Z',
      },
      postContentRIch3: '<p></p>\n',
      domains: [
        {
          popularity: 67,
          name: 'EU R&I policy',
          _id: '74f1a07e-9754-4e06-9091-30d0d7d4e667',
          _createdDate: {
            $date: '2024-08-27T09:48:25.091Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:25.091Z',
          },
          tagType: 'domain',
        },
      ],
      postImage1: {
        url: 'https://static.wixstatic.com/media/471908_7eb5dc3284a4490da0c64d78091b6da4~mv2.png',
        caption:
          'R&I foresight actors in Europe which contributed to this stocktaking exercise\n',
      },
      _updatedDate: {
        $date: '2024-10-23T08:12:33.238Z',
      },
      slug: 'Showcasing_Perspectives__hjkqa',
      moderators: [],
      eventStartDate: {},
      speakers: [],
      organisations: [
        {
          popularity: 21,
          tagline: 'Deutsches Zentrum Fur Luft - Und Raumfahrt',
          name: 'DLR',
          _id: '902becad-0a91-4957-95de-c83c65e80b0f',
          _createdDate: {
            $date: '2024-08-27T09:48:24.823Z',
          },
          _updatedDate: {
            $date: '2024-08-27T09:48:24.823Z',
          },
          tagType: 'organisation',
        },
      ],
      postContentRIch1:
        '<p>The European foresight community has experienced remarkable growth in recent years. The newly published Eye of Europe report "Showcasing Perspectives: A Stocktaking of R&amp;I Foresight Practices in Europe" provides an assessment of just that, namely the actors, preferred methodologies, success factors and bottlenecks for effective R&amp;I foresight projects, as well as trends for future R&amp;I foresight projects in Europe.</p>\n',
      projects: [
        {
          popularity: 1,
          name: 'Eye of Europe',
          _id: 'a3da923c-66d3-46a7-8ab0-8d33424f3b80',
          _owner: '144948d0-9596-4eda-8135-9a6fec9d1330',
          _createdDate: {
            $date: '2024-10-15T11:02:13.126Z',
          },
          tagLine: 'The Research and Innovation Foresight Community',
          _updatedDate: {
            $date: '2024-10-25T11:17:57.445Z',
          },
          picture:
            'https://static.wixstatic.com/media/471908_3fc30f50bb3c467aa3213c444816d649~mv2.png',
          tagType: 'project',
          tagPageLink: '/project/Eye_of_Europe_6ft5d',
        },
      ],
      countryTag: [
        {
          name: 'EU',
          _id: 'e1b13728-5253-484b-92d6-0c451813adff',
          _owner: '89c27159-d0d6-4d08-bdc0-ea92984d69a8',
          _createdDate: {
            $date: '2024-10-22T10:28:23.621Z',
          },
          tagLine: '',
          _updatedDate: {
            $date: '2024-10-22T10:28:23.621Z',
          },
          tagType: 'country',
        },
      ],
      title: 'Showcasing Perspectives',
      projectResultMedia: {
        displayName: '',
        url: 'https://0bbe2e34-e503-441a-af9e-4fc70c17e6af.usrfiles.com/ugd/471908_3c57946b06b943b18ae324a5f912ce73.pdf',
        fileName: 'Showcasing Perspectives A Stocktaking of R',
        thumbnail:
          'https://static.wixstatic.com/media/471908_7e721715ccaa4e3289e07183cf28eef5~mv2.jpeg',
        sizeInBytes: '630316',
        type: 'document',
      },
      internalLinks: [],
      projectResultAuthor: [
        {
          name: 'Simon Winter',
          _id: 'cbe63717-6db0-4f50-8931-e38c37fd0c23',
          _owner: '0ef176d6-d78e-4088-a491-5f45fe28ad7c',
          _createdDate: {
            $date: '2024-10-14T09:09:38.988Z',
          },
          _updatedDate: {
            $date: '2024-10-14T09:09:38.988Z',
          },
          tagType: 'person',
        },
      ],
    },
    _id: '4aff5bd1-9ae5-41fb-b30e-476ad2d91d9a',
  },
];

function calculatePopularity(tagsSample, infoPagesSample, postPagesSample) {
  const popularityResults = [];

  const containsId = (obj, id) => {
    if (typeof obj === 'object' && obj !== null) {
      for (const key in obj) {
        if (key === 'pageOwner' || key === 'author') continue;
        if (obj[key] === id) return true;
        if (containsId(obj[key], id)) return true;
      }
    }
    return false;
  };

  tagsSample.forEach((tag) => {
    let count = 0;

    infoPagesSample.forEach((infoPage) => {
      if (containsId(infoPage, tag._id)) {
        count += 1;
      }
    });

    postPagesSample.forEach((postPage) => {
      if (containsId(postPage, tag._id)) {
        count += 1;
      }
    });

    popularityResults.push({ ...tag, mentions: count });
  });

  return popularityResults;
}

const tagsWithMentions = calculatePopularity(
  tagsSample,
  infoPagesSample,
  postPagesSample
);

const findProjectInfoTag = tagsWithMentions.find(
  (tag) => tag.name === 'project info'
);

console.log('findProjectInfoTag', findProjectInfoTag);
