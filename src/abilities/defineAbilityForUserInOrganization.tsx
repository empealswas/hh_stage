import {AbilityBuilder, Ability} from '@casl/ability'
import {Principal} from "../models/Principal";
import {Admin} from "../models/Admin";
import {Teacher} from "../models/Teacher";
import {Parent} from "../models/Parent";
import {Organization} from "../models/Organization";
import {RolePermissions, User, UserInOrganization, UserRole} from "../API";

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


    // can('visit', 'register');
    // can('visit', 'login');


    return build();
}