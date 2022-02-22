import {Ability, AbilityBuilder} from '@casl/ability'
import {User} from "../API";

export default function DefineAbilityForUserInOrganization(user: User, organizationId: string) {
    const {can, cannot, build} = new AbilityBuilder(Ability);
    if (!user) {
        return build();
    }
    const isOwner = user.ownedOrganizations?.items.some(value => value?.id === organizationId);
    if (isOwner) {
        can('read', 'attendance');
        can('delete', 'lesson');
        can('rate', 'lesson');
        can('manage', 'organization');
        can('update', 'section');
        can('delete', 'section');
        can('create', 'lesson');
        can('update', 'lesson');
        can('delete', 'lesson');
        can('delete', 'file');
        can('read', 'attendance');
        can('create', 'section');
        can('upload', 'content');
        can('read', 'content');
        can('read', 'dashboard');
        return build();
    }
    const userInOrganization = user?.organizations?.items[0];
    if (!userInOrganization) {
        return build();
    }
    const permissions = userInOrganization?.roles?.items
        .map(value => value?.userRole)
        .flatMap((value) => {
            return value?.permissions;
        });
    if (permissions?.some((value) => value?.canAccessAttendanceSheet)) {
        can('read', 'attendance');
    }
    if (permissions?.some((value) => value?.canDeleteLessons)) {
        can('delete', 'lesson');
    }
    if (permissions?.some((value) => value?.canRateLessons)) {
        can('rate', 'lesson');
    }
    if (permissions?.some((value) => value?.canCreateLesson)) {
        can('create', 'lesson');
    }
    if (permissions?.some((value) => value?.canUpdateLesson)) {
        can('update', 'lesson');
    }
    if (permissions?.some((value) => value?.canUpdateLesson)) {
        can('upload', 'content');
    }
    if (permissions?.some((value) => value?.canViewContent)) {
        can('read', 'content');
    }
    if (permissions?.some((value) => value?.canCreateSection)) {
        can('create', 'section');
    }
    if (permissions?.some((value) => value?.canDeleteSection)) {
        can('delete', 'section');
    }
    if (permissions?.some((value) => value?.canUpdateSection)) {
        can('update', 'section');
    }
    if (permissions?.some((value) => value?.canViewDashboard)) {
        can('read', 'dashboard');
    }
    if (permissions?.some((value) => value?.canManageOrganization)) {
        can('manage', 'organization');
    }






    // can('visit', 'register');
    // can('visit', 'login');


    return build();
}