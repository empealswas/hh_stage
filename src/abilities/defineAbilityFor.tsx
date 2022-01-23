import {AbilityBuilder, Ability} from '@casl/ability'
import {User} from '../models/User';
import {Principal} from "../models/Principal";
import {Admin} from "../models/Admin";
import {Teacher} from "../models/Teacher";
import {Parent} from "../models/Parent";
import {Organization} from "../models/Organization";

export default function defineAbilityFor(user: User | null) {
    const {can, cannot, build} = new AbilityBuilder(Ability);
    if (!user) {
        return build();
    }
    // can('visit', 'register');
    // can('visit', 'login');
    if (user instanceof Admin) {
        can('visit', 'schools');
        can('visit', 'lessons');
        can(['create', 'update', 'delete', 'view'], 'curriculum');
        can(['create', 'update', 'delete', 'view'], 'term');
        can(['create', 'update', 'delete', 'view'], 'subject');
        can(['create', 'update', 'delete', 'view'], 'lesson');
        can(['create', 'update', 'delete', 'view'], 'file');
        can('visit', 'dashboard')
        can('visit', 'reports');
        can('visit', 'houses');
        can('visit', 'organizations');
        can('read', 'wearables');
        can('visit', 'wearables');
        can(['create', 'update', 'delete', 'view'], 'section');


    } else if (user instanceof Teacher) {
        can('visit', 'lessons');
        can('visit', 'dashboard');
        // can('visit', 'Organizations Search');
        can('visit', 'wearables');
        can('read', 'attendance');
        can('read', 'wearables');


    } else if (user instanceof Parent) {
        //todo remove
        can(['create', 'update', 'delete', 'view'], 'section');
        can(['create', 'update', 'delete', 'view'], 'lesson');

        can('visit', 'dashboard')
        can('visit', 'parent');
    } else if (user instanceof Principal) {
        can('read', 'wearables')
        can('visit', 'dashboard')
        can('visit', 'wearables');

    } else if (user instanceof Organization) {
        can('manage', 'pupilList');
        can('visit', 'Organization Manage');
        can('visit', 'dashboard')

        can(['create', 'update', 'delete', 'view'], 'lesson');
        can(['create', 'update', 'delete', 'view'], 'file');
        can(['create', 'update', 'delete', 'view'], 'section');

    }

    return build();
}