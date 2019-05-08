import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id      : 'admin',
        title   : 'Administración',
        type    : 'group',
        icon    : 'apps',
        roles   : ['promotor'],
        children: []
    }
];
