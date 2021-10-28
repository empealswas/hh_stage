import {AbilityBuilder, Ability} from '@casl/ability'
import {User} from '../models/User';

export default function defineAbilityFor(user: User | null) {
    const {can, cannot, build} = new AbilityBuilder(Ability);
    if (!user) {
        return build();
    }
    // can('visit', 'login');
    if (user.isAdmin()) {
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


    } else if (user.isTeacher()) {
        can('visit', 'lessons');
        can('visit', 'reports');
        can('visit', 'dashboard')
        can('read', 'attendance');
        can('read', 'teacherDashboard')
    } else if (user.isParent()) {
        can('visit', 'dashboard')
        can('visit', 'parent');
    }

    return build();
}