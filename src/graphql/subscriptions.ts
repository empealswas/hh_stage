/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      firstName
      lastName
      email
      dependants {
        nextToken
      }
      organizations {
        nextToken
      }
      ownedOrganizations {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      firstName
      lastName
      email
      dependants {
        nextToken
      }
      organizations {
        nextToken
      }
      ownedOrganizations {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      firstName
      lastName
      email
      dependants {
        nextToken
      }
      organizations {
        nextToken
      }
      ownedOrganizations {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateDependantGuardian = /* GraphQL */ `
  subscription OnCreateDependantGuardian {
    onCreateDependantGuardian {
      guardian {
        id
        firstName
        lastName
        email
        createdAt
        updatedAt
      }
      dependant {
        id
        firstName
        lastName
        email
        createdAt
        updatedAt
      }
      id
      createdAt
      updatedAt
      userDependantsId
    }
  }
`;
export const onUpdateDependantGuardian = /* GraphQL */ `
  subscription OnUpdateDependantGuardian {
    onUpdateDependantGuardian {
      guardian {
        id
        firstName
        lastName
        email
        createdAt
        updatedAt
      }
      dependant {
        id
        firstName
        lastName
        email
        createdAt
        updatedAt
      }
      id
      createdAt
      updatedAt
      userDependantsId
    }
  }
`;
export const onDeleteDependantGuardian = /* GraphQL */ `
  subscription OnDeleteDependantGuardian {
    onDeleteDependantGuardian {
      guardian {
        id
        firstName
        lastName
        email
        createdAt
        updatedAt
      }
      dependant {
        id
        firstName
        lastName
        email
        createdAt
        updatedAt
      }
      id
      createdAt
      updatedAt
      userDependantsId
    }
  }
`;
export const onCreateUserInOrganization = /* GraphQL */ `
  subscription OnCreateUserInOrganization {
    onCreateUserInOrganization {
      userID
      organizationID
      user {
        id
        firstName
        lastName
        email
        createdAt
        updatedAt
      }
      organization {
        id
        name
        type
        createdAt
        updatedAt
        userOwnedOrganizationsId
        organizationLogoId
      }
      roles {
        nextToken
      }
      classrooms {
        nextToken
      }
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUserInOrganization = /* GraphQL */ `
  subscription OnUpdateUserInOrganization {
    onUpdateUserInOrganization {
      userID
      organizationID
      user {
        id
        firstName
        lastName
        email
        createdAt
        updatedAt
      }
      organization {
        id
        name
        type
        createdAt
        updatedAt
        userOwnedOrganizationsId
        organizationLogoId
      }
      roles {
        nextToken
      }
      classrooms {
        nextToken
      }
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUserInOrganization = /* GraphQL */ `
  subscription OnDeleteUserInOrganization {
    onDeleteUserInOrganization {
      userID
      organizationID
      user {
        id
        firstName
        lastName
        email
        createdAt
        updatedAt
      }
      organization {
        id
        name
        type
        createdAt
        updatedAt
        userOwnedOrganizationsId
        organizationLogoId
      }
      roles {
        nextToken
      }
      classrooms {
        nextToken
      }
      id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUserRole = /* GraphQL */ `
  subscription OnCreateUserRole {
    onCreateUserRole {
      id
      name
      organization {
        id
        name
        type
        createdAt
        updatedAt
        userOwnedOrganizationsId
        organizationLogoId
      }
      users {
        nextToken
      }
      permissions {
        canAccessAttendanceSheet
        canRateLessons
        canDeleteLessons
        id
        createdAt
        updatedAt
        rolePermissionsRoleId
      }
      createdAt
      updatedAt
      organizationRolesId
      userRolePermissionsId
    }
  }
`;
export const onUpdateUserRole = /* GraphQL */ `
  subscription OnUpdateUserRole {
    onUpdateUserRole {
      id
      name
      organization {
        id
        name
        type
        createdAt
        updatedAt
        userOwnedOrganizationsId
        organizationLogoId
      }
      users {
        nextToken
      }
      permissions {
        canAccessAttendanceSheet
        canRateLessons
        canDeleteLessons
        id
        createdAt
        updatedAt
        rolePermissionsRoleId
      }
      createdAt
      updatedAt
      organizationRolesId
      userRolePermissionsId
    }
  }
`;
export const onDeleteUserRole = /* GraphQL */ `
  subscription OnDeleteUserRole {
    onDeleteUserRole {
      id
      name
      organization {
        id
        name
        type
        createdAt
        updatedAt
        userOwnedOrganizationsId
        organizationLogoId
      }
      users {
        nextToken
      }
      permissions {
        canAccessAttendanceSheet
        canRateLessons
        canDeleteLessons
        id
        createdAt
        updatedAt
        rolePermissionsRoleId
      }
      createdAt
      updatedAt
      organizationRolesId
      userRolePermissionsId
    }
  }
`;
export const onCreateRolePermissions = /* GraphQL */ `
  subscription OnCreateRolePermissions {
    onCreateRolePermissions {
      role {
        id
        name
        createdAt
        updatedAt
        organizationRolesId
        userRolePermissionsId
      }
      canAccessAttendanceSheet
      canRateLessons
      canDeleteLessons
      id
      createdAt
      updatedAt
      rolePermissionsRoleId
    }
  }
`;
export const onUpdateRolePermissions = /* GraphQL */ `
  subscription OnUpdateRolePermissions {
    onUpdateRolePermissions {
      role {
        id
        name
        createdAt
        updatedAt
        organizationRolesId
        userRolePermissionsId
      }
      canAccessAttendanceSheet
      canRateLessons
      canDeleteLessons
      id
      createdAt
      updatedAt
      rolePermissionsRoleId
    }
  }
`;
export const onDeleteRolePermissions = /* GraphQL */ `
  subscription OnDeleteRolePermissions {
    onDeleteRolePermissions {
      role {
        id
        name
        createdAt
        updatedAt
        organizationRolesId
        userRolePermissionsId
      }
      canAccessAttendanceSheet
      canRateLessons
      canDeleteLessons
      id
      createdAt
      updatedAt
      rolePermissionsRoleId
    }
  }
`;
export const onCreateOrganization = /* GraphQL */ `
  subscription OnCreateOrganization {
    onCreateOrganization {
      id
      name
      owner {
        id
        firstName
        lastName
        email
        createdAt
        updatedAt
      }
      Principals {
        nextToken
      }
      WaitingForAcceptPupils {
        nextToken
      }
      AcceptedPupils {
        nextToken
      }
      Sections {
        nextToken
      }
      Teachers {
        nextToken
      }
      Classrooms {
        nextToken
      }
      members {
        nextToken
      }
      roles {
        nextToken
      }
      type
      logo {
        id
        key
        region
        bucket
        lessonID
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      userOwnedOrganizationsId
      organizationLogoId
    }
  }
`;
export const onUpdateOrganization = /* GraphQL */ `
  subscription OnUpdateOrganization {
    onUpdateOrganization {
      id
      name
      owner {
        id
        firstName
        lastName
        email
        createdAt
        updatedAt
      }
      Principals {
        nextToken
      }
      WaitingForAcceptPupils {
        nextToken
      }
      AcceptedPupils {
        nextToken
      }
      Sections {
        nextToken
      }
      Teachers {
        nextToken
      }
      Classrooms {
        nextToken
      }
      members {
        nextToken
      }
      roles {
        nextToken
      }
      type
      logo {
        id
        key
        region
        bucket
        lessonID
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      userOwnedOrganizationsId
      organizationLogoId
    }
  }
`;
export const onDeleteOrganization = /* GraphQL */ `
  subscription OnDeleteOrganization {
    onDeleteOrganization {
      id
      name
      owner {
        id
        firstName
        lastName
        email
        createdAt
        updatedAt
      }
      Principals {
        nextToken
      }
      WaitingForAcceptPupils {
        nextToken
      }
      AcceptedPupils {
        nextToken
      }
      Sections {
        nextToken
      }
      Teachers {
        nextToken
      }
      Classrooms {
        nextToken
      }
      members {
        nextToken
      }
      roles {
        nextToken
      }
      type
      logo {
        id
        key
        region
        bucket
        lessonID
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      userOwnedOrganizationsId
      organizationLogoId
    }
  }
`;
export const onCreateFile = /* GraphQL */ `
  subscription OnCreateFile {
    onCreateFile {
      id
      key
      region
      bucket
      lessonID
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateFile = /* GraphQL */ `
  subscription OnUpdateFile {
    onUpdateFile {
      id
      key
      region
      bucket
      lessonID
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteFile = /* GraphQL */ `
  subscription OnDeleteFile {
    onDeleteFile {
      id
      key
      region
      bucket
      lessonID
      createdAt
      updatedAt
    }
  }
`;
export const onCreateSection = /* GraphQL */ `
  subscription OnCreateSection {
    onCreateSection {
      id
      name
      parentID
      organizationID
      ParentSection {
        id
        name
        parentID
        organizationID
        imagePreviewID
        createdAt
        updatedAt
        sectionSectionOptionsId
      }
      OrganizationOwner {
        id
        name
        type
        createdAt
        updatedAt
        userOwnedOrganizationsId
        organizationLogoId
      }
      Lessons {
        nextToken
      }
      imagePreviewID
      ImagePreview {
        id
        key
        region
        bucket
        lessonID
        createdAt
        updatedAt
      }
      SectionOptions {
        id
        Activities
        Durations
        DeliveredBy
        createdAt
        updatedAt
        sectionOptionsSectionId
      }
      createdAt
      updatedAt
      sectionSectionOptionsId
    }
  }
`;
export const onUpdateSection = /* GraphQL */ `
  subscription OnUpdateSection {
    onUpdateSection {
      id
      name
      parentID
      organizationID
      ParentSection {
        id
        name
        parentID
        organizationID
        imagePreviewID
        createdAt
        updatedAt
        sectionSectionOptionsId
      }
      OrganizationOwner {
        id
        name
        type
        createdAt
        updatedAt
        userOwnedOrganizationsId
        organizationLogoId
      }
      Lessons {
        nextToken
      }
      imagePreviewID
      ImagePreview {
        id
        key
        region
        bucket
        lessonID
        createdAt
        updatedAt
      }
      SectionOptions {
        id
        Activities
        Durations
        DeliveredBy
        createdAt
        updatedAt
        sectionOptionsSectionId
      }
      createdAt
      updatedAt
      sectionSectionOptionsId
    }
  }
`;
export const onDeleteSection = /* GraphQL */ `
  subscription OnDeleteSection {
    onDeleteSection {
      id
      name
      parentID
      organizationID
      ParentSection {
        id
        name
        parentID
        organizationID
        imagePreviewID
        createdAt
        updatedAt
        sectionSectionOptionsId
      }
      OrganizationOwner {
        id
        name
        type
        createdAt
        updatedAt
        userOwnedOrganizationsId
        organizationLogoId
      }
      Lessons {
        nextToken
      }
      imagePreviewID
      ImagePreview {
        id
        key
        region
        bucket
        lessonID
        createdAt
        updatedAt
      }
      SectionOptions {
        id
        Activities
        Durations
        DeliveredBy
        createdAt
        updatedAt
        sectionOptionsSectionId
      }
      createdAt
      updatedAt
      sectionSectionOptionsId
    }
  }
`;
export const onCreateLesson = /* GraphQL */ `
  subscription OnCreateLesson {
    onCreateLesson {
      id
      title
      description
      sectionID
      Section {
        id
        name
        parentID
        organizationID
        imagePreviewID
        createdAt
        updatedAt
        sectionSectionOptionsId
      }
      LessonsRecords {
        nextToken
      }
      terms {
        nextToken
      }
      Attendances {
        nextToken
      }
      Files {
        nextToken
      }
      LessonTeacher {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateLesson = /* GraphQL */ `
  subscription OnUpdateLesson {
    onUpdateLesson {
      id
      title
      description
      sectionID
      Section {
        id
        name
        parentID
        organizationID
        imagePreviewID
        createdAt
        updatedAt
        sectionSectionOptionsId
      }
      LessonsRecords {
        nextToken
      }
      terms {
        nextToken
      }
      Attendances {
        nextToken
      }
      Files {
        nextToken
      }
      LessonTeacher {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteLesson = /* GraphQL */ `
  subscription OnDeleteLesson {
    onDeleteLesson {
      id
      title
      description
      sectionID
      Section {
        id
        name
        parentID
        organizationID
        imagePreviewID
        createdAt
        updatedAt
        sectionSectionOptionsId
      }
      LessonsRecords {
        nextToken
      }
      terms {
        nextToken
      }
      Attendances {
        nextToken
      }
      Files {
        nextToken
      }
      LessonTeacher {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateSectionOptions = /* GraphQL */ `
  subscription OnCreateSectionOptions {
    onCreateSectionOptions {
      id
      Section {
        id
        name
        parentID
        organizationID
        imagePreviewID
        createdAt
        updatedAt
        sectionSectionOptionsId
      }
      Activities
      Durations
      DeliveredBy
      createdAt
      updatedAt
      sectionOptionsSectionId
    }
  }
`;
export const onUpdateSectionOptions = /* GraphQL */ `
  subscription OnUpdateSectionOptions {
    onUpdateSectionOptions {
      id
      Section {
        id
        name
        parentID
        organizationID
        imagePreviewID
        createdAt
        updatedAt
        sectionSectionOptionsId
      }
      Activities
      Durations
      DeliveredBy
      createdAt
      updatedAt
      sectionOptionsSectionId
    }
  }
`;
export const onDeleteSectionOptions = /* GraphQL */ `
  subscription OnDeleteSectionOptions {
    onDeleteSectionOptions {
      id
      Section {
        id
        name
        parentID
        organizationID
        imagePreviewID
        createdAt
        updatedAt
        sectionSectionOptionsId
      }
      Activities
      Durations
      DeliveredBy
      createdAt
      updatedAt
      sectionOptionsSectionId
    }
  }
`;
export const onCreatePELessonRecord = /* GraphQL */ `
  subscription OnCreatePELessonRecord {
    onCreatePELessonRecord {
      id
      teacherID
      Teacher {
        id
        firstName
        lastName
        email
        schoolID
        createdAt
        updatedAt
      }
      Attendances {
        nextToken
      }
      date
      deliveredBy
      duration
      activity
      rating
      notes
      classroomID
      Classroom {
        id
        name
        schoolID
        yearGroupID
        createdAt
        updatedAt
        organizationClassroomsId
      }
      lessonID
      Lesson {
        id
        title
        description
        sectionID
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePELessonRecord = /* GraphQL */ `
  subscription OnUpdatePELessonRecord {
    onUpdatePELessonRecord {
      id
      teacherID
      Teacher {
        id
        firstName
        lastName
        email
        schoolID
        createdAt
        updatedAt
      }
      Attendances {
        nextToken
      }
      date
      deliveredBy
      duration
      activity
      rating
      notes
      classroomID
      Classroom {
        id
        name
        schoolID
        yearGroupID
        createdAt
        updatedAt
        organizationClassroomsId
      }
      lessonID
      Lesson {
        id
        title
        description
        sectionID
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePELessonRecord = /* GraphQL */ `
  subscription OnDeletePELessonRecord {
    onDeletePELessonRecord {
      id
      teacherID
      Teacher {
        id
        firstName
        lastName
        email
        schoolID
        createdAt
        updatedAt
      }
      Attendances {
        nextToken
      }
      date
      deliveredBy
      duration
      activity
      rating
      notes
      classroomID
      Classroom {
        id
        name
        schoolID
        yearGroupID
        createdAt
        updatedAt
        organizationClassroomsId
      }
      lessonID
      Lesson {
        id
        title
        description
        sectionID
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateSchoolHouse = /* GraphQL */ `
  subscription OnCreateSchoolHouse {
    onCreateSchoolHouse {
      id
      name
      Pupils {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSchoolHouse = /* GraphQL */ `
  subscription OnUpdateSchoolHouse {
    onUpdateSchoolHouse {
      id
      name
      Pupils {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSchoolHouse = /* GraphQL */ `
  subscription OnDeleteSchoolHouse {
    onDeleteSchoolHouse {
      id
      name
      Pupils {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateClassroomLesson = /* GraphQL */ `
  subscription OnCreateClassroomLesson {
    onCreateClassroomLesson {
      id
      classroomID
      lessonID
      Classroom {
        id
        name
        schoolID
        yearGroupID
        createdAt
        updatedAt
        organizationClassroomsId
      }
      Lesson {
        id
        title
        description
        sectionID
        createdAt
        updatedAt
      }
      completed
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateClassroomLesson = /* GraphQL */ `
  subscription OnUpdateClassroomLesson {
    onUpdateClassroomLesson {
      id
      classroomID
      lessonID
      Classroom {
        id
        name
        schoolID
        yearGroupID
        createdAt
        updatedAt
        organizationClassroomsId
      }
      Lesson {
        id
        title
        description
        sectionID
        createdAt
        updatedAt
      }
      completed
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteClassroomLesson = /* GraphQL */ `
  subscription OnDeleteClassroomLesson {
    onDeleteClassroomLesson {
      id
      classroomID
      lessonID
      Classroom {
        id
        name
        schoolID
        yearGroupID
        createdAt
        updatedAt
        organizationClassroomsId
      }
      Lesson {
        id
        title
        description
        sectionID
        createdAt
        updatedAt
      }
      completed
      createdAt
      updatedAt
    }
  }
`;
export const onCreateClassroom = /* GraphQL */ `
  subscription OnCreateClassroom {
    onCreateClassroom {
      id
      name
      teachers {
        nextToken
      }
      pupils {
        nextToken
      }
      schoolID
      school {
        id
        name
        country
        region
        principal
        createdAt
        updatedAt
      }
      Organization {
        id
        name
        type
        createdAt
        updatedAt
        userOwnedOrganizationsId
        organizationLogoId
      }
      yearGroupID
      yearGroup {
        id
        name
        createdAt
        updatedAt
      }
      members {
        nextToken
      }
      createdAt
      updatedAt
      organizationClassroomsId
    }
  }
`;
export const onUpdateClassroom = /* GraphQL */ `
  subscription OnUpdateClassroom {
    onUpdateClassroom {
      id
      name
      teachers {
        nextToken
      }
      pupils {
        nextToken
      }
      schoolID
      school {
        id
        name
        country
        region
        principal
        createdAt
        updatedAt
      }
      Organization {
        id
        name
        type
        createdAt
        updatedAt
        userOwnedOrganizationsId
        organizationLogoId
      }
      yearGroupID
      yearGroup {
        id
        name
        createdAt
        updatedAt
      }
      members {
        nextToken
      }
      createdAt
      updatedAt
      organizationClassroomsId
    }
  }
`;
export const onDeleteClassroom = /* GraphQL */ `
  subscription OnDeleteClassroom {
    onDeleteClassroom {
      id
      name
      teachers {
        nextToken
      }
      pupils {
        nextToken
      }
      schoolID
      school {
        id
        name
        country
        region
        principal
        createdAt
        updatedAt
      }
      Organization {
        id
        name
        type
        createdAt
        updatedAt
        userOwnedOrganizationsId
        organizationLogoId
      }
      yearGroupID
      yearGroup {
        id
        name
        createdAt
        updatedAt
      }
      members {
        nextToken
      }
      createdAt
      updatedAt
      organizationClassroomsId
    }
  }
`;
export const onCreateTeacherClassroom = /* GraphQL */ `
  subscription OnCreateTeacherClassroom {
    onCreateTeacherClassroom {
      id
      teacherID
      classroomID
      teacher {
        id
        firstName
        lastName
        email
        schoolID
        createdAt
        updatedAt
      }
      classroom {
        id
        name
        schoolID
        yearGroupID
        createdAt
        updatedAt
        organizationClassroomsId
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTeacherClassroom = /* GraphQL */ `
  subscription OnUpdateTeacherClassroom {
    onUpdateTeacherClassroom {
      id
      teacherID
      classroomID
      teacher {
        id
        firstName
        lastName
        email
        schoolID
        createdAt
        updatedAt
      }
      classroom {
        id
        name
        schoolID
        yearGroupID
        createdAt
        updatedAt
        organizationClassroomsId
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTeacherClassroom = /* GraphQL */ `
  subscription OnDeleteTeacherClassroom {
    onDeleteTeacherClassroom {
      id
      teacherID
      classroomID
      teacher {
        id
        firstName
        lastName
        email
        schoolID
        createdAt
        updatedAt
      }
      classroom {
        id
        name
        schoolID
        yearGroupID
        createdAt
        updatedAt
        organizationClassroomsId
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePupilClassroom = /* GraphQL */ `
  subscription OnCreatePupilClassroom {
    onCreatePupilClassroom {
      id
      pupilID
      classroomID
      pupil {
        id
        firstName
        lastName
        terraId
        provider
        schoolID
        schoolHouseID
        createdAt
        updatedAt
      }
      classroom {
        id
        name
        schoolID
        yearGroupID
        createdAt
        updatedAt
        organizationClassroomsId
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePupilClassroom = /* GraphQL */ `
  subscription OnUpdatePupilClassroom {
    onUpdatePupilClassroom {
      id
      pupilID
      classroomID
      pupil {
        id
        firstName
        lastName
        terraId
        provider
        schoolID
        schoolHouseID
        createdAt
        updatedAt
      }
      classroom {
        id
        name
        schoolID
        yearGroupID
        createdAt
        updatedAt
        organizationClassroomsId
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePupilClassroom = /* GraphQL */ `
  subscription OnDeletePupilClassroom {
    onDeletePupilClassroom {
      id
      pupilID
      classroomID
      pupil {
        id
        firstName
        lastName
        terraId
        provider
        schoolID
        schoolHouseID
        createdAt
        updatedAt
      }
      classroom {
        id
        name
        schoolID
        yearGroupID
        createdAt
        updatedAt
        organizationClassroomsId
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePupilOrganizationRequest = /* GraphQL */ `
  subscription OnCreatePupilOrganizationRequest {
    onCreatePupilOrganizationRequest {
      id
      pupilID
      organizationID
      pupil {
        id
        firstName
        lastName
        terraId
        provider
        schoolID
        schoolHouseID
        createdAt
        updatedAt
      }
      organization {
        id
        name
        type
        createdAt
        updatedAt
        userOwnedOrganizationsId
        organizationLogoId
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePupilOrganizationRequest = /* GraphQL */ `
  subscription OnUpdatePupilOrganizationRequest {
    onUpdatePupilOrganizationRequest {
      id
      pupilID
      organizationID
      pupil {
        id
        firstName
        lastName
        terraId
        provider
        schoolID
        schoolHouseID
        createdAt
        updatedAt
      }
      organization {
        id
        name
        type
        createdAt
        updatedAt
        userOwnedOrganizationsId
        organizationLogoId
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePupilOrganizationRequest = /* GraphQL */ `
  subscription OnDeletePupilOrganizationRequest {
    onDeletePupilOrganizationRequest {
      id
      pupilID
      organizationID
      pupil {
        id
        firstName
        lastName
        terraId
        provider
        schoolID
        schoolHouseID
        createdAt
        updatedAt
      }
      organization {
        id
        name
        type
        createdAt
        updatedAt
        userOwnedOrganizationsId
        organizationLogoId
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePupilOrganizationAccepted = /* GraphQL */ `
  subscription OnCreatePupilOrganizationAccepted {
    onCreatePupilOrganizationAccepted {
      id
      pupilID
      organizationID
      pupil {
        id
        firstName
        lastName
        terraId
        provider
        schoolID
        schoolHouseID
        createdAt
        updatedAt
      }
      organization {
        id
        name
        type
        createdAt
        updatedAt
        userOwnedOrganizationsId
        organizationLogoId
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePupilOrganizationAccepted = /* GraphQL */ `
  subscription OnUpdatePupilOrganizationAccepted {
    onUpdatePupilOrganizationAccepted {
      id
      pupilID
      organizationID
      pupil {
        id
        firstName
        lastName
        terraId
        provider
        schoolID
        schoolHouseID
        createdAt
        updatedAt
      }
      organization {
        id
        name
        type
        createdAt
        updatedAt
        userOwnedOrganizationsId
        organizationLogoId
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePupilOrganizationAccepted = /* GraphQL */ `
  subscription OnDeletePupilOrganizationAccepted {
    onDeletePupilOrganizationAccepted {
      id
      pupilID
      organizationID
      pupil {
        id
        firstName
        lastName
        terraId
        provider
        schoolID
        schoolHouseID
        createdAt
        updatedAt
      }
      organization {
        id
        name
        type
        createdAt
        updatedAt
        userOwnedOrganizationsId
        organizationLogoId
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateSchool = /* GraphQL */ `
  subscription OnCreateSchool {
    onCreateSchool {
      id
      name
      country
      region
      principal
      Teachers {
        nextToken
      }
      Principals {
        nextToken
      }
      Pupils {
        nextToken
      }
      classrooms {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSchool = /* GraphQL */ `
  subscription OnUpdateSchool {
    onUpdateSchool {
      id
      name
      country
      region
      principal
      Teachers {
        nextToken
      }
      Principals {
        nextToken
      }
      Pupils {
        nextToken
      }
      classrooms {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSchool = /* GraphQL */ `
  subscription OnDeleteSchool {
    onDeleteSchool {
      id
      name
      country
      region
      principal
      Teachers {
        nextToken
      }
      Principals {
        nextToken
      }
      Pupils {
        nextToken
      }
      classrooms {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateAttendance = /* GraphQL */ `
  subscription OnCreateAttendance {
    onCreateAttendance {
      id
      present
      wasRewarded
      pupilID
      lessonID
      Pupil {
        id
        firstName
        lastName
        terraId
        provider
        schoolID
        schoolHouseID
        createdAt
        updatedAt
      }
      Lesson {
        id
        title
        description
        sectionID
        createdAt
        updatedAt
      }
      lessonRecord {
        id
        teacherID
        date
        deliveredBy
        duration
        activity
        rating
        notes
        classroomID
        lessonID
        createdAt
        updatedAt
      }
      lessonRecordID
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateAttendance = /* GraphQL */ `
  subscription OnUpdateAttendance {
    onUpdateAttendance {
      id
      present
      wasRewarded
      pupilID
      lessonID
      Pupil {
        id
        firstName
        lastName
        terraId
        provider
        schoolID
        schoolHouseID
        createdAt
        updatedAt
      }
      Lesson {
        id
        title
        description
        sectionID
        createdAt
        updatedAt
      }
      lessonRecord {
        id
        teacherID
        date
        deliveredBy
        duration
        activity
        rating
        notes
        classroomID
        lessonID
        createdAt
        updatedAt
      }
      lessonRecordID
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteAttendance = /* GraphQL */ `
  subscription OnDeleteAttendance {
    onDeleteAttendance {
      id
      present
      wasRewarded
      pupilID
      lessonID
      Pupil {
        id
        firstName
        lastName
        terraId
        provider
        schoolID
        schoolHouseID
        createdAt
        updatedAt
      }
      Lesson {
        id
        title
        description
        sectionID
        createdAt
        updatedAt
      }
      lessonRecord {
        id
        teacherID
        date
        deliveredBy
        duration
        activity
        rating
        notes
        classroomID
        lessonID
        createdAt
        updatedAt
      }
      lessonRecordID
      createdAt
      updatedAt
    }
  }
`;
export const onCreateLessonTeacher = /* GraphQL */ `
  subscription OnCreateLessonTeacher {
    onCreateLessonTeacher {
      id
      teacherID
      lessonID
      Teacher {
        id
        firstName
        lastName
        email
        schoolID
        createdAt
        updatedAt
      }
      Lesson {
        id
        title
        description
        sectionID
        createdAt
        updatedAt
      }
      score
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateLessonTeacher = /* GraphQL */ `
  subscription OnUpdateLessonTeacher {
    onUpdateLessonTeacher {
      id
      teacherID
      lessonID
      Teacher {
        id
        firstName
        lastName
        email
        schoolID
        createdAt
        updatedAt
      }
      Lesson {
        id
        title
        description
        sectionID
        createdAt
        updatedAt
      }
      score
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteLessonTeacher = /* GraphQL */ `
  subscription OnDeleteLessonTeacher {
    onDeleteLessonTeacher {
      id
      teacherID
      lessonID
      Teacher {
        id
        firstName
        lastName
        email
        schoolID
        createdAt
        updatedAt
      }
      Lesson {
        id
        title
        description
        sectionID
        createdAt
        updatedAt
      }
      score
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTerm = /* GraphQL */ `
  subscription OnCreateTerm {
    onCreateTerm {
      id
      nam
      startDate
      finishDate
      subjects {
        nextToken
      }
      TermLessons {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTerm = /* GraphQL */ `
  subscription OnUpdateTerm {
    onUpdateTerm {
      id
      nam
      startDate
      finishDate
      subjects {
        nextToken
      }
      TermLessons {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTerm = /* GraphQL */ `
  subscription OnDeleteTerm {
    onDeleteTerm {
      id
      nam
      startDate
      finishDate
      subjects {
        nextToken
      }
      TermLessons {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateSubject = /* GraphQL */ `
  subscription OnCreateSubject {
    onCreateSubject {
      id
      name
      SubjectTerms {
        nextToken
      }
      curriculums {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSubject = /* GraphQL */ `
  subscription OnUpdateSubject {
    onUpdateSubject {
      id
      name
      SubjectTerms {
        nextToken
      }
      curriculums {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSubject = /* GraphQL */ `
  subscription OnDeleteSubject {
    onDeleteSubject {
      id
      name
      SubjectTerms {
        nextToken
      }
      curriculums {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCurriculum = /* GraphQL */ `
  subscription OnCreateCurriculum {
    onCreateCurriculum {
      id
      name
      subjects {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCurriculum = /* GraphQL */ `
  subscription OnUpdateCurriculum {
    onUpdateCurriculum {
      id
      name
      subjects {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCurriculum = /* GraphQL */ `
  subscription OnDeleteCurriculum {
    onDeleteCurriculum {
      id
      name
      subjects {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateParent = /* GraphQL */ `
  subscription OnCreateParent {
    onCreateParent {
      id
      firstName
      lastName
      email
      children {
        nextToken
      }
      InterventionFeedback {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateParent = /* GraphQL */ `
  subscription OnUpdateParent {
    onUpdateParent {
      id
      firstName
      lastName
      email
      children {
        nextToken
      }
      InterventionFeedback {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteParent = /* GraphQL */ `
  subscription OnDeleteParent {
    onDeleteParent {
      id
      firstName
      lastName
      email
      children {
        nextToken
      }
      InterventionFeedback {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePupilParent = /* GraphQL */ `
  subscription OnCreatePupilParent {
    onCreatePupilParent {
      id
      pupilID
      parentID
      Parent {
        id
        firstName
        lastName
        email
        createdAt
        updatedAt
      }
      Pupil {
        id
        firstName
        lastName
        terraId
        provider
        schoolID
        schoolHouseID
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePupilParent = /* GraphQL */ `
  subscription OnUpdatePupilParent {
    onUpdatePupilParent {
      id
      pupilID
      parentID
      Parent {
        id
        firstName
        lastName
        email
        createdAt
        updatedAt
      }
      Pupil {
        id
        firstName
        lastName
        terraId
        provider
        schoolID
        schoolHouseID
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePupilParent = /* GraphQL */ `
  subscription OnDeletePupilParent {
    onDeletePupilParent {
      id
      pupilID
      parentID
      Parent {
        id
        firstName
        lastName
        email
        createdAt
        updatedAt
      }
      Pupil {
        id
        firstName
        lastName
        terraId
        provider
        schoolID
        schoolHouseID
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePrincipal = /* GraphQL */ `
  subscription OnCreatePrincipal {
    onCreatePrincipal {
      id
      firstName
      lastName
      email
      schoolID
      School {
        id
        name
        country
        region
        principal
        createdAt
        updatedAt
      }
      organizationID
      Organization {
        id
        name
        type
        createdAt
        updatedAt
        userOwnedOrganizationsId
        organizationLogoId
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePrincipal = /* GraphQL */ `
  subscription OnUpdatePrincipal {
    onUpdatePrincipal {
      id
      firstName
      lastName
      email
      schoolID
      School {
        id
        name
        country
        region
        principal
        createdAt
        updatedAt
      }
      organizationID
      Organization {
        id
        name
        type
        createdAt
        updatedAt
        userOwnedOrganizationsId
        organizationLogoId
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePrincipal = /* GraphQL */ `
  subscription OnDeletePrincipal {
    onDeletePrincipal {
      id
      firstName
      lastName
      email
      schoolID
      School {
        id
        name
        country
        region
        principal
        createdAt
        updatedAt
      }
      organizationID
      Organization {
        id
        name
        type
        createdAt
        updatedAt
        userOwnedOrganizationsId
        organizationLogoId
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTeacher = /* GraphQL */ `
  subscription OnCreateTeacher {
    onCreateTeacher {
      id
      firstName
      lastName
      email
      schoolID
      classrooms {
        nextToken
      }
      LessonTeacher {
        nextToken
      }
      Organizations {
        nextToken
      }
      School {
        id
        name
        country
        region
        principal
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTeacher = /* GraphQL */ `
  subscription OnUpdateTeacher {
    onUpdateTeacher {
      id
      firstName
      lastName
      email
      schoolID
      classrooms {
        nextToken
      }
      LessonTeacher {
        nextToken
      }
      Organizations {
        nextToken
      }
      School {
        id
        name
        country
        region
        principal
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTeacher = /* GraphQL */ `
  subscription OnDeleteTeacher {
    onDeleteTeacher {
      id
      firstName
      lastName
      email
      schoolID
      classrooms {
        nextToken
      }
      LessonTeacher {
        nextToken
      }
      Organizations {
        nextToken
      }
      School {
        id
        name
        country
        region
        principal
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePupil = /* GraphQL */ `
  subscription OnCreatePupil {
    onCreatePupil {
      id
      firstName
      lastName
      terraId
      provider
      Attendances {
        nextToken
      }
      classrooms {
        nextToken
      }
      Organizations {
        nextToken
      }
      OrganizationsRequests {
        nextToken
      }
      schoolID
      schoolHouseID
      schoolHouse {
        id
        name
        createdAt
        updatedAt
      }
      school {
        id
        name
        country
        region
        principal
        createdAt
        updatedAt
      }
      parents {
        nextToken
      }
      Interventions {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePupil = /* GraphQL */ `
  subscription OnUpdatePupil {
    onUpdatePupil {
      id
      firstName
      lastName
      terraId
      provider
      Attendances {
        nextToken
      }
      classrooms {
        nextToken
      }
      Organizations {
        nextToken
      }
      OrganizationsRequests {
        nextToken
      }
      schoolID
      schoolHouseID
      schoolHouse {
        id
        name
        createdAt
        updatedAt
      }
      school {
        id
        name
        country
        region
        principal
        createdAt
        updatedAt
      }
      parents {
        nextToken
      }
      Interventions {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePupil = /* GraphQL */ `
  subscription OnDeletePupil {
    onDeletePupil {
      id
      firstName
      lastName
      terraId
      provider
      Attendances {
        nextToken
      }
      classrooms {
        nextToken
      }
      Organizations {
        nextToken
      }
      OrganizationsRequests {
        nextToken
      }
      schoolID
      schoolHouseID
      schoolHouse {
        id
        name
        createdAt
        updatedAt
      }
      school {
        id
        name
        country
        region
        principal
        createdAt
        updatedAt
      }
      parents {
        nextToken
      }
      Interventions {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateIntervention = /* GraphQL */ `
  subscription OnCreateIntervention {
    onCreateIntervention {
      id
      pupilID
      Pupil {
        id
        firstName
        lastName
        terraId
        provider
        schoolID
        schoolHouseID
        createdAt
        updatedAt
      }
      message
      viewed
      InterventionFeedback {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateIntervention = /* GraphQL */ `
  subscription OnUpdateIntervention {
    onUpdateIntervention {
      id
      pupilID
      Pupil {
        id
        firstName
        lastName
        terraId
        provider
        schoolID
        schoolHouseID
        createdAt
        updatedAt
      }
      message
      viewed
      InterventionFeedback {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteIntervention = /* GraphQL */ `
  subscription OnDeleteIntervention {
    onDeleteIntervention {
      id
      pupilID
      Pupil {
        id
        firstName
        lastName
        terraId
        provider
        schoolID
        schoolHouseID
        createdAt
        updatedAt
      }
      message
      viewed
      InterventionFeedback {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateParentInterventionFeedback = /* GraphQL */ `
  subscription OnCreateParentInterventionFeedback {
    onCreateParentInterventionFeedback {
      id
      parentID
      interventionID
      Parent {
        id
        firstName
        lastName
        email
        createdAt
        updatedAt
      }
      Intervention {
        id
        pupilID
        message
        viewed
        createdAt
        updatedAt
      }
      comment
      rating
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateParentInterventionFeedback = /* GraphQL */ `
  subscription OnUpdateParentInterventionFeedback {
    onUpdateParentInterventionFeedback {
      id
      parentID
      interventionID
      Parent {
        id
        firstName
        lastName
        email
        createdAt
        updatedAt
      }
      Intervention {
        id
        pupilID
        message
        viewed
        createdAt
        updatedAt
      }
      comment
      rating
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteParentInterventionFeedback = /* GraphQL */ `
  subscription OnDeleteParentInterventionFeedback {
    onDeleteParentInterventionFeedback {
      id
      parentID
      interventionID
      Parent {
        id
        firstName
        lastName
        email
        createdAt
        updatedAt
      }
      Intervention {
        id
        pupilID
        message
        viewed
        createdAt
        updatedAt
      }
      comment
      rating
      createdAt
      updatedAt
    }
  }
`;
export const onCreateSubjectTerm = /* GraphQL */ `
  subscription OnCreateSubjectTerm {
    onCreateSubjectTerm {
      id
      subjectID
      termID
      subject {
        id
        name
        createdAt
        updatedAt
      }
      term {
        id
        nam
        startDate
        finishDate
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSubjectTerm = /* GraphQL */ `
  subscription OnUpdateSubjectTerm {
    onUpdateSubjectTerm {
      id
      subjectID
      termID
      subject {
        id
        name
        createdAt
        updatedAt
      }
      term {
        id
        nam
        startDate
        finishDate
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSubjectTerm = /* GraphQL */ `
  subscription OnDeleteSubjectTerm {
    onDeleteSubjectTerm {
      id
      subjectID
      termID
      subject {
        id
        name
        createdAt
        updatedAt
      }
      term {
        id
        nam
        startDate
        finishDate
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTermLesson = /* GraphQL */ `
  subscription OnCreateTermLesson {
    onCreateTermLesson {
      id
      termID
      lessonID
      term {
        id
        nam
        startDate
        finishDate
        createdAt
        updatedAt
      }
      lesson {
        id
        title
        description
        sectionID
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTermLesson = /* GraphQL */ `
  subscription OnUpdateTermLesson {
    onUpdateTermLesson {
      id
      termID
      lessonID
      term {
        id
        nam
        startDate
        finishDate
        createdAt
        updatedAt
      }
      lesson {
        id
        title
        description
        sectionID
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTermLesson = /* GraphQL */ `
  subscription OnDeleteTermLesson {
    onDeleteTermLesson {
      id
      termID
      lessonID
      term {
        id
        nam
        startDate
        finishDate
        createdAt
        updatedAt
      }
      lesson {
        id
        title
        description
        sectionID
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCurriculumSubject = /* GraphQL */ `
  subscription OnCreateCurriculumSubject {
    onCreateCurriculumSubject {
      id
      curriculumID
      subjectID
      curriculum {
        id
        name
        createdAt
        updatedAt
      }
      subject {
        id
        name
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCurriculumSubject = /* GraphQL */ `
  subscription OnUpdateCurriculumSubject {
    onUpdateCurriculumSubject {
      id
      curriculumID
      subjectID
      curriculum {
        id
        name
        createdAt
        updatedAt
      }
      subject {
        id
        name
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCurriculumSubject = /* GraphQL */ `
  subscription OnDeleteCurriculumSubject {
    onDeleteCurriculumSubject {
      id
      curriculumID
      subjectID
      curriculum {
        id
        name
        createdAt
        updatedAt
      }
      subject {
        id
        name
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateRolesOfUser = /* GraphQL */ `
  subscription OnCreateRolesOfUser {
    onCreateRolesOfUser {
      id
      userInOrganizationID
      userRoleID
      userInOrganization {
        userID
        organizationID
        id
        createdAt
        updatedAt
      }
      userRole {
        id
        name
        createdAt
        updatedAt
        organizationRolesId
        userRolePermissionsId
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateRolesOfUser = /* GraphQL */ `
  subscription OnUpdateRolesOfUser {
    onUpdateRolesOfUser {
      id
      userInOrganizationID
      userRoleID
      userInOrganization {
        userID
        organizationID
        id
        createdAt
        updatedAt
      }
      userRole {
        id
        name
        createdAt
        updatedAt
        organizationRolesId
        userRolePermissionsId
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteRolesOfUser = /* GraphQL */ `
  subscription OnDeleteRolesOfUser {
    onDeleteRolesOfUser {
      id
      userInOrganizationID
      userRoleID
      userInOrganization {
        userID
        organizationID
        id
        createdAt
        updatedAt
      }
      userRole {
        id
        name
        createdAt
        updatedAt
        organizationRolesId
        userRolePermissionsId
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUserInOrganizationInClassroom = /* GraphQL */ `
  subscription OnCreateUserInOrganizationInClassroom {
    onCreateUserInOrganizationInClassroom {
      id
      userInOrganizationID
      classroomID
      userInOrganization {
        userID
        organizationID
        id
        createdAt
        updatedAt
      }
      classroom {
        id
        name
        schoolID
        yearGroupID
        createdAt
        updatedAt
        organizationClassroomsId
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUserInOrganizationInClassroom = /* GraphQL */ `
  subscription OnUpdateUserInOrganizationInClassroom {
    onUpdateUserInOrganizationInClassroom {
      id
      userInOrganizationID
      classroomID
      userInOrganization {
        userID
        organizationID
        id
        createdAt
        updatedAt
      }
      classroom {
        id
        name
        schoolID
        yearGroupID
        createdAt
        updatedAt
        organizationClassroomsId
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUserInOrganizationInClassroom = /* GraphQL */ `
  subscription OnDeleteUserInOrganizationInClassroom {
    onDeleteUserInOrganizationInClassroom {
      id
      userInOrganizationID
      classroomID
      userInOrganization {
        userID
        organizationID
        id
        createdAt
        updatedAt
      }
      classroom {
        id
        name
        schoolID
        yearGroupID
        createdAt
        updatedAt
        organizationClassroomsId
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTeacherOrganziation = /* GraphQL */ `
  subscription OnCreateTeacherOrganziation {
    onCreateTeacherOrganziation {
      id
      organizationID
      teacherID
      organization {
        id
        name
        type
        createdAt
        updatedAt
        userOwnedOrganizationsId
        organizationLogoId
      }
      teacher {
        id
        firstName
        lastName
        email
        schoolID
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTeacherOrganziation = /* GraphQL */ `
  subscription OnUpdateTeacherOrganziation {
    onUpdateTeacherOrganziation {
      id
      organizationID
      teacherID
      organization {
        id
        name
        type
        createdAt
        updatedAt
        userOwnedOrganizationsId
        organizationLogoId
      }
      teacher {
        id
        firstName
        lastName
        email
        schoolID
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTeacherOrganziation = /* GraphQL */ `
  subscription OnDeleteTeacherOrganziation {
    onDeleteTeacherOrganziation {
      id
      organizationID
      teacherID
      organization {
        id
        name
        type
        createdAt
        updatedAt
        userOwnedOrganizationsId
        organizationLogoId
      }
      teacher {
        id
        firstName
        lastName
        email
        schoolID
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
