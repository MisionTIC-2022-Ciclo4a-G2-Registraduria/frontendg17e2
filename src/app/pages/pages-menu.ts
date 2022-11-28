import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  // application menu
  {
    title: 'Sistema Electoral',
    group: true,
  },
  {
    title: 'mesas',
    icon: 'edit-2-outline',
    link: '/pages/mesas/listar',
    home: true,
  },
  {
    title: 'Partidos politicos',
    icon: 'grid-outline',
    link: '/pages/partidospoliticos/listar',
  },
  {
    title: 'Candidatos',
    icon: 'map-outline',
    link: '/pages/candidatos/listar',
  },
  {
    title: 'Inscripciones',
    icon: 'layout-outline',
    link: '/pages/inscripciones/listar',
  },
  {
    title: 'Reportes',
    icon: 'pie-chart-outline',
    children: [
      {
        title: 'Mesas',
        link: '/pages/reportes/mesas',
      },
      {
        title: 'Candidatos',
        link: '/pages/reportes/candidatos',
      },
      {
        title: 'Partidos politicos',
        link: '/pages/reportes/partidospoliticos',
      },
    ],
  },
  {
    title: 'ADMINISTRACION',
    group: true,
  },
  {
    title: 'Usuarios',
    icon: 'browser-outline',
    link: '/pages/usuarios/listar',
  },
  {
    title: 'Roles',
    icon: 'lock-outline',
    link: '/pages/roles/listar',
  },
];
