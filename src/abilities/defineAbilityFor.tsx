import {AbilityBuilder, Ability} from '@casl/ability'
import {User} from '../models/User';
import {Principal} from "../models/Principal";
import {Admin} from "../models/Admin";
import {Teacher} from "../models/Teacher";
import {Parent} from "../models/Parent";

export default function defineAbilityFor(user: User | null) {
    const {can, cannot, build} = new AbilityBuilder(Ability);
    if (!user) {
        return build();
    }
    // can('visit', 'login');
    if (user instanceof Admin) {
        can('visit', 'schools');
        can('visit', 'lessons');
        can(['create','update', 'delete','view'], 'curriculum');
        can(['create','update', 'delete','view'], 'term');
        can(['create','update', 'delete','view'], 'subject');
        can(['create','update', 'delete','view'], 'lesson');
        can(['create','update', 'delete','view'], 'file');
        can('visit', 'dashboard')
        can('visit', 'reports');
        can('visit', 'houses');


    } else if (user instanceof  Teacher) {
        can('visit', 'lessons');
        can('visit', 'reports');
        can('visit', 'dashboard')
        can('read', 'attendance');
        can('read', 'teacherDashboard')
    } else if (user instanceof Parent) {
        can('visit', 'dashboard')
        can('visit', 'parent');
    } else if (user instanceof Principal) {
        can('visit', 'dashboard')

    }

    return build();
}