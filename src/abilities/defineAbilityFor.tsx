import {AbilityBuilder, Ability} from '@casl/ability'
import {User} from '../models/User';

export default function defineAbilityFor(user: User | null) {
    const {can, cannot, build} = new AbilityBuilder(Ability);
    if (!user) {
        return build();
    }
    // can('visit', 'register');
    // can('visit', 'login');
    if (user.isAdmin()) {
        can('visit', 'schools');
        can('visit', 'parent');
        can('visit', 'lessons');
        can(['create','update', 'delete','view'], 'curriculum');
        can(['create','update', 'delete','view'], 'term');
        can(['create','update', 'delete','view'], 'subject');
        can(['create','update', 'delete','view'], 'lesson');
        can('visit', 'class overview')
        can('visit', 'reports');
        can('visit', 'houses');


    } else if (user.isTeacher()) {
        can('visit', 'lessons');
        can('visit', 'reports');
        can('visit', 'class overview')
        can('read', 'attendance');
        can('read', 'teacherDashboard')
    }

    return build();
}