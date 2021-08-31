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
        can('visit', 'parent');
        can('visit', 'lessons');
        can('create', 'curriculum');
        can('create', 'term');
        can('create', 'subject');
        can('create', 'lesson');
        can('visit', 'dashboard')
        can('visit', 'reports');


    } else if (user.isTeacher()) {
        can('visit', 'lessons');
        can('visit', 'reports');
        can('visit', 'dashboard')
        can('read', 'attendance');
        can('read', 'teacherDashboard')
    }

    return build();
}