/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createDependantGuardian = /* GraphQL */ `
  mutation CreateDependantGuardian(
    $input: CreateDependantGuardianInput!
    $condition: ModelDependantGuardianConditionInput
  ) {
    createDependantGuardian(input: $input, condition: $condition) {
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
export const updateDependantGuardian = /* GraphQL */ `
  mutation UpdateDependantGuardian(
    $input: UpdateDependantGuardianInput!
    $condition: ModelDependantGuardianConditionInput
  ) {
    updateDependantGuardian(input: $input, condition: $condition) {
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
export const deleteDependantGuardian = /* GraphQL */ `
  mutation DeleteDependantGuardian(
    $input: DeleteDependantGuardianInput!
    $condition: ModelDependantGuardianConditionInput
  ) {
    deleteDependantGuardian(input: $input, condition: $condition) {
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
export const createUserInOrganization = /* GraphQL */ `
  mutation CreateUserInOrganization(
    $input: CreateUserInOrganizationInput!
    $condition: ModelUserInOrganizationConditionInput
  ) {
    createUserInOrganization(input: $input, condition: $condition) {
      id
      roles {
        nextToken
      }
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
      createdAt
      updatedAt
      userOrganizationsId
      organizationMembersId
      userInOrganizationUserId
      userInOrganizationOrganizationId
    }
  }
`;
export const updateUserInOrganization = /* GraphQL */ `
  mutation UpdateUserInOrganization(
    $input: UpdateUserInOrganizationInput!
    $condition: ModelUserInOrganizationConditionInput
  ) {
    updateUserInOrganization(input: $input, condition: $condition) {
      id
      roles {
        nextToken
      }
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
      createdAt
      updatedAt
      userOrganizationsId
      organizationMembersId
      userInOrganizationUserId
      userInOrganizationOrganizationId
    }
  }
`;
export const deleteUserInOrganization = /* GraphQL */ `
  mutation DeleteUserInOrganization(
    $input: DeleteUserInOrganizationInput!
    $condition: ModelUserInOrganizationConditionInput
  ) {
    deleteUserInOrganization(input: $input, condition: $condition) {
      id
      roles {
        nextToken
      }
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
      createdAt
      updatedAt
      userOrganizationsId
      organizationMembersId
      userInOrganizationUserId
      userInOrganizationOrganizationId
    }
  }
`;
export const createUserInOrganizationRole = /* GraphQL */ `
  mutation CreateUserInOrganizationRole(
    $input: CreateUserInOrganizationRoleInput!
    $condition: ModelUserInOrganizationRoleConditionInput
  ) {
    createUserInOrganizationRole(input: $input, condition: $condition) {
      id
      name
      userInOrganization {
        id
        createdAt
        updatedAt
        userOrganizationsId
        organizationMembersId
        userInOrganizationUserId
        userInOrganizationOrganizationId
      }
      createdAt
      updatedAt
      userInOrganizationRolesId
    }
  }
`;
export const updateUserInOrganizationRole = /* GraphQL */ `
  mutation UpdateUserInOrganizationRole(
    $input: UpdateUserInOrganizationRoleInput!
    $condition: ModelUserInOrganizationRoleConditionInput
  ) {
    updateUserInOrganizationRole(input: $input, condition: $condition) {
      id
      name
      userInOrganization {
        id
        createdAt
        updatedAt
        userOrganizationsId
        organizationMembersId
        userInOrganizationUserId
        userInOrganizationOrganizationId
      }
      createdAt
      updatedAt
      userInOrganizationRolesId
    }
  }
`;
export const deleteUserInOrganizationRole = /* GraphQL */ `
  mutation DeleteUserInOrganizationRole(
    $input: DeleteUserInOrganizationRoleInput!
    $condition: ModelUserInOrganizationRoleConditionInput
  ) {
    deleteUserInOrganizationRole(input: $input, condition: $condition) {
      id
      name
      userInOrganization {
        id
        createdAt
        updatedAt
        userOrganizationsId
        organizationMembersId
        userInOrganizationUserId
        userInOrganizationOrganizationId
      }
      createdAt
      updatedAt
      userInOrganizationRolesId
    }
  }
`;
export const createOrganization = /* GraphQL */ `
  mutation CreateOrganization(
    $input: CreateOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    createOrganization(input: $input, condition: $condition) {
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
export const updateOrganization = /* GraphQL */ `
  mutation UpdateOrganization(
    $input: UpdateOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    updateOrganization(input: $input, condition: $condition) {
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
export const deleteOrganization = /* GraphQL */ `
  mutation DeleteOrganization(
    $input: DeleteOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    deleteOrganization(input: $input, condition: $condition) {
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
export const createFile = /* GraphQL */ `
  mutation CreateFile(
    $input: CreateFileInput!
    $condition: ModelFileConditionInput
  ) {
    createFile(input: $input, condition: $condition) {
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
export const updateFile = /* GraphQL */ `
  mutation UpdateFile(
    $input: UpdateFileInput!
    $condition: ModelFileConditionInput
  ) {
    updateFile(input: $input, condition: $condition) {
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
export const deleteFile = /* GraphQL */ `
  mutation DeleteFile(
    $input: DeleteFileInput!
    $condition: ModelFileConditionInput
  ) {
    deleteFile(input: $input, condition: $condition) {
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
export const createSection = /* GraphQL */ `
  mutation CreateSection(
    $input: CreateSectionInput!
    $condition: ModelSectionConditionInput
  ) {
    createSection(input: $input, condition: $condition) {
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
export const updateSection = /* GraphQL */ `
  mutation UpdateSection(
    $input: UpdateSectionInput!
    $condition: ModelSectionConditionInput
  ) {
    updateSection(input: $input, condition: $condition) {
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
export const deleteSection = /* GraphQL */ `
  mutation DeleteSection(
    $input: DeleteSectionInput!
    $condition: ModelSectionConditionInput
  ) {
    deleteSection(input: $input, condition: $condition) {
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
export const createLesson = /* GraphQL */ `
  mutation CreateLesson(
    $input: CreateLessonInput!
    $condition: ModelLessonConditionInput
  ) {
    createLesson(input: $input, condition: $condition) {
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
export const updateLesson = /* GraphQL */ `
  mutation UpdateLesson(
    $input: UpdateLessonInput!
    $condition: ModelLessonConditionInput
  ) {
    updateLesson(input: $input, condition: $condition) {
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
export const deleteLesson = /* GraphQL */ `
  mutation DeleteLesson(
    $input: DeleteLessonInput!
    $condition: ModelLessonConditionInput
  ) {
    deleteLesson(input: $input, condition: $condition) {
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
export const createSectionOptions = /* GraphQL */ `
  mutation CreateSectionOptions(
    $input: CreateSectionOptionsInput!
    $condition: ModelSectionOptionsConditionInput
  ) {
    createSectionOptions(input: $input, condition: $condition) {
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
export const updateSectionOptions = /* GraphQL */ `
  mutation UpdateSectionOptions(
    $input: UpdateSectionOptionsInput!
    $condition: ModelSectionOptionsConditionInput
  ) {
    updateSectionOptions(input: $input, condition: $condition) {
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
export const deleteSectionOptions = /* GraphQL */ `
  mutation DeleteSectionOptions(
    $input: DeleteSectionOptionsInput!
    $condition: ModelSectionOptionsConditionInput
  ) {
    deleteSectionOptions(input: $input, condition: $condition) {
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
export const createPELessonRecord = /* GraphQL */ `
  mutation CreatePELessonRecord(
    $input: CreatePELessonRecordInput!
    $condition: ModelPELessonRecordConditionInput
  ) {
    createPELessonRecord(input: $input, condition: $condition) {
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
export const updatePELessonRecord = /* GraphQL */ `
  mutation UpdatePELessonRecord(
    $input: UpdatePELessonRecordInput!
    $condition: ModelPELessonRecordConditionInput
  ) {
    updatePELessonRecord(input: $input, condition: $condition) {
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
export const deletePELessonRecord = /* GraphQL */ `
  mutation DeletePELessonRecord(
    $input: DeletePELessonRecordInput!
    $condition: ModelPELessonRecordConditionInput
  ) {
    deletePELessonRecord(input: $input, condition: $condition) {
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
export const createSchoolHouse = /* GraphQL */ `
  mutation CreateSchoolHouse(
    $input: CreateSchoolHouseInput!
    $condition: ModelSchoolHouseConditionInput
  ) {
    createSchoolHouse(input: $input, condition: $condition) {
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
export const updateSchoolHouse = /* GraphQL */ `
  mutation UpdateSchoolHouse(
    $input: UpdateSchoolHouseInput!
    $condition: ModelSchoolHouseConditionInput
  ) {
    updateSchoolHouse(input: $input, condition: $condition) {
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
export const deleteSchoolHouse = /* GraphQL */ `
  mutation DeleteSchoolHouse(
    $input: DeleteSchoolHouseInput!
    $condition: ModelSchoolHouseConditionInput
  ) {
    deleteSchoolHouse(input: $input, condition: $condition) {
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
export const createClassroomLesson = /* GraphQL */ `
  mutation CreateClassroomLesson(
    $input: CreateClassroomLessonInput!
    $condition: ModelClassroomLessonConditionInput
  ) {
    createClassroomLesson(input: $input, condition: $condition) {
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
export const updateClassroomLesson = /* GraphQL */ `
  mutation UpdateClassroomLesson(
    $input: UpdateClassroomLessonInput!
    $condition: ModelClassroomLessonConditionInput
  ) {
    updateClassroomLesson(input: $input, condition: $condition) {
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
export const deleteClassroomLesson = /* GraphQL */ `
  mutation DeleteClassroomLesson(
    $input: DeleteClassroomLessonInput!
    $condition: ModelClassroomLessonConditionInput
  ) {
    deleteClassroomLesson(input: $input, condition: $condition) {
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
export const createClassroom = /* GraphQL */ `
  mutation CreateClassroom(
    $input: CreateClassroomInput!
    $condition: ModelClassroomConditionInput
  ) {
    createClassroom(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
      organizationClassroomsId
    }
  }
`;
export const updateClassroom = /* GraphQL */ `
  mutation UpdateClassroom(
    $input: UpdateClassroomInput!
    $condition: ModelClassroomConditionInput
  ) {
    updateClassroom(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
      organizationClassroomsId
    }
  }
`;
export const deleteClassroom = /* GraphQL */ `
  mutation DeleteClassroom(
    $input: DeleteClassroomInput!
    $condition: ModelClassroomConditionInput
  ) {
    deleteClassroom(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
      organizationClassroomsId
    }
  }
`;
export const createTeacherClassroom = /* GraphQL */ `
  mutation CreateTeacherClassroom(
    $input: CreateTeacherClassroomInput!
    $condition: ModelTeacherClassroomConditionInput
  ) {
    createTeacherClassroom(input: $input, condition: $condition) {
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
export const updateTeacherClassroom = /* GraphQL */ `
  mutation UpdateTeacherClassroom(
    $input: UpdateTeacherClassroomInput!
    $condition: ModelTeacherClassroomConditionInput
  ) {
    updateTeacherClassroom(input: $input, condition: $condition) {
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
export const deleteTeacherClassroom = /* GraphQL */ `
  mutation DeleteTeacherClassroom(
    $input: DeleteTeacherClassroomInput!
    $condition: ModelTeacherClassroomConditionInput
  ) {
    deleteTeacherClassroom(input: $input, condition: $condition) {
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
export const createPupilClassroom = /* GraphQL */ `
  mutation CreatePupilClassroom(
    $input: CreatePupilClassroomInput!
    $condition: ModelPupilClassroomConditionInput
  ) {
    createPupilClassroom(input: $input, condition: $condition) {
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
export const updatePupilClassroom = /* GraphQL */ `
  mutation UpdatePupilClassroom(
    $input: UpdatePupilClassroomInput!
    $condition: ModelPupilClassroomConditionInput
  ) {
    updatePupilClassroom(input: $input, condition: $condition) {
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
export const deletePupilClassroom = /* GraphQL */ `
  mutation DeletePupilClassroom(
    $input: DeletePupilClassroomInput!
    $condition: ModelPupilClassroomConditionInput
  ) {
    deletePupilClassroom(input: $input, condition: $condition) {
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
export const createPupilOrganizationRequest = /* GraphQL */ `
  mutation CreatePupilOrganizationRequest(
    $input: CreatePupilOrganizationRequestInput!
    $condition: ModelPupilOrganizationRequestConditionInput
  ) {
    createPupilOrganizationRequest(input: $input, condition: $condition) {
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
export const updatePupilOrganizationRequest = /* GraphQL */ `
  mutation UpdatePupilOrganizationRequest(
    $input: UpdatePupilOrganizationRequestInput!
    $condition: ModelPupilOrganizationRequestConditionInput
  ) {
    updatePupilOrganizationRequest(input: $input, condition: $condition) {
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
export const deletePupilOrganizationRequest = /* GraphQL */ `
  mutation DeletePupilOrganizationRequest(
    $input: DeletePupilOrganizationRequestInput!
    $condition: ModelPupilOrganizationRequestConditionInput
  ) {
    deletePupilOrganizationRequest(input: $input, condition: $condition) {
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
export const createPupilOrganizationAccepted = /* GraphQL */ `
  mutation CreatePupilOrganizationAccepted(
    $input: CreatePupilOrganizationAcceptedInput!
    $condition: ModelPupilOrganizationAcceptedConditionInput
  ) {
    createPupilOrganizationAccepted(input: $input, condition: $condition) {
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
export const updatePupilOrganizationAccepted = /* GraphQL */ `
  mutation UpdatePupilOrganizationAccepted(
    $input: UpdatePupilOrganizationAcceptedInput!
    $condition: ModelPupilOrganizationAcceptedConditionInput
  ) {
    updatePupilOrganizationAccepted(input: $input, condition: $condition) {
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
export const deletePupilOrganizationAccepted = /* GraphQL */ `
  mutation DeletePupilOrganizationAccepted(
    $input: DeletePupilOrganizationAcceptedInput!
    $condition: ModelPupilOrganizationAcceptedConditionInput
  ) {
    deletePupilOrganizationAccepted(input: $input, condition: $condition) {
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
export const createSchool = /* GraphQL */ `
  mutation CreateSchool(
    $input: CreateSchoolInput!
    $condition: ModelSchoolConditionInput
  ) {
    createSchool(input: $input, condition: $condition) {
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
export const updateSchool = /* GraphQL */ `
  mutation UpdateSchool(
    $input: UpdateSchoolInput!
    $condition: ModelSchoolConditionInput
  ) {
    updateSchool(input: $input, condition: $condition) {
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
export const deleteSchool = /* GraphQL */ `
  mutation DeleteSchool(
    $input: DeleteSchoolInput!
    $condition: ModelSchoolConditionInput
  ) {
    deleteSchool(input: $input, condition: $condition) {
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
export const createAttendance = /* GraphQL */ `
  mutation CreateAttendance(
    $input: CreateAttendanceInput!
    $condition: ModelAttendanceConditionInput
  ) {
    createAttendance(input: $input, condition: $condition) {
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
export const updateAttendance = /* GraphQL */ `
  mutation UpdateAttendance(
    $input: UpdateAttendanceInput!
    $condition: ModelAttendanceConditionInput
  ) {
    updateAttendance(input: $input, condition: $condition) {
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
export const deleteAttendance = /* GraphQL */ `
  mutation DeleteAttendance(
    $input: DeleteAttendanceInput!
    $condition: ModelAttendanceConditionInput
  ) {
    deleteAttendance(input: $input, condition: $condition) {
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
export const createLessonTeacher = /* GraphQL */ `
  mutation CreateLessonTeacher(
    $input: CreateLessonTeacherInput!
    $condition: ModelLessonTeacherConditionInput
  ) {
    createLessonTeacher(input: $input, condition: $condition) {
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
export const updateLessonTeacher = /* GraphQL */ `
  mutation UpdateLessonTeacher(
    $input: UpdateLessonTeacherInput!
    $condition: ModelLessonTeacherConditionInput
  ) {
    updateLessonTeacher(input: $input, condition: $condition) {
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
export const deleteLessonTeacher = /* GraphQL */ `
  mutation DeleteLessonTeacher(
    $input: DeleteLessonTeacherInput!
    $condition: ModelLessonTeacherConditionInput
  ) {
    deleteLessonTeacher(input: $input, condition: $condition) {
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
export const createTerm = /* GraphQL */ `
  mutation CreateTerm(
    $input: CreateTermInput!
    $condition: ModelTermConditionInput
  ) {
    createTerm(input: $input, condition: $condition) {
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
export const updateTerm = /* GraphQL */ `
  mutation UpdateTerm(
    $input: UpdateTermInput!
    $condition: ModelTermConditionInput
  ) {
    updateTerm(input: $input, condition: $condition) {
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
export const deleteTerm = /* GraphQL */ `
  mutation DeleteTerm(
    $input: DeleteTermInput!
    $condition: ModelTermConditionInput
  ) {
    deleteTerm(input: $input, condition: $condition) {
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
export const createSubject = /* GraphQL */ `
  mutation CreateSubject(
    $input: CreateSubjectInput!
    $condition: ModelSubjectConditionInput
  ) {
    createSubject(input: $input, condition: $condition) {
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
export const updateSubject = /* GraphQL */ `
  mutation UpdateSubject(
    $input: UpdateSubjectInput!
    $condition: ModelSubjectConditionInput
  ) {
    updateSubject(input: $input, condition: $condition) {
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
export const deleteSubject = /* GraphQL */ `
  mutation DeleteSubject(
    $input: DeleteSubjectInput!
    $condition: ModelSubjectConditionInput
  ) {
    deleteSubject(input: $input, condition: $condition) {
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
export const createCurriculum = /* GraphQL */ `
  mutation CreateCurriculum(
    $input: CreateCurriculumInput!
    $condition: ModelCurriculumConditionInput
  ) {
    createCurriculum(input: $input, condition: $condition) {
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
export const updateCurriculum = /* GraphQL */ `
  mutation UpdateCurriculum(
    $input: UpdateCurriculumInput!
    $condition: ModelCurriculumConditionInput
  ) {
    updateCurriculum(input: $input, condition: $condition) {
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
export const deleteCurriculum = /* GraphQL */ `
  mutation DeleteCurriculum(
    $input: DeleteCurriculumInput!
    $condition: ModelCurriculumConditionInput
  ) {
    deleteCurriculum(input: $input, condition: $condition) {
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
export const createParent = /* GraphQL */ `
  mutation CreateParent(
    $input: CreateParentInput!
    $condition: ModelParentConditionInput
  ) {
    createParent(input: $input, condition: $condition) {
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
export const updateParent = /* GraphQL */ `
  mutation UpdateParent(
    $input: UpdateParentInput!
    $condition: ModelParentConditionInput
  ) {
    updateParent(input: $input, condition: $condition) {
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
export const deleteParent = /* GraphQL */ `
  mutation DeleteParent(
    $input: DeleteParentInput!
    $condition: ModelParentConditionInput
  ) {
    deleteParent(input: $input, condition: $condition) {
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
export const createPupilParent = /* GraphQL */ `
  mutation CreatePupilParent(
    $input: CreatePupilParentInput!
    $condition: ModelPupilParentConditionInput
  ) {
    createPupilParent(input: $input, condition: $condition) {
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
export const updatePupilParent = /* GraphQL */ `
  mutation UpdatePupilParent(
    $input: UpdatePupilParentInput!
    $condition: ModelPupilParentConditionInput
  ) {
    updatePupilParent(input: $input, condition: $condition) {
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
export const deletePupilParent = /* GraphQL */ `
  mutation DeletePupilParent(
    $input: DeletePupilParentInput!
    $condition: ModelPupilParentConditionInput
  ) {
    deletePupilParent(input: $input, condition: $condition) {
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
export const createPrincipal = /* GraphQL */ `
  mutation CreatePrincipal(
    $input: CreatePrincipalInput!
    $condition: ModelPrincipalConditionInput
  ) {
    createPrincipal(input: $input, condition: $condition) {
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
export const updatePrincipal = /* GraphQL */ `
  mutation UpdatePrincipal(
    $input: UpdatePrincipalInput!
    $condition: ModelPrincipalConditionInput
  ) {
    updatePrincipal(input: $input, condition: $condition) {
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
export const deletePrincipal = /* GraphQL */ `
  mutation DeletePrincipal(
    $input: DeletePrincipalInput!
    $condition: ModelPrincipalConditionInput
  ) {
    deletePrincipal(input: $input, condition: $condition) {
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
export const createTeacher = /* GraphQL */ `
  mutation CreateTeacher(
    $input: CreateTeacherInput!
    $condition: ModelTeacherConditionInput
  ) {
    createTeacher(input: $input, condition: $condition) {
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
export const updateTeacher = /* GraphQL */ `
  mutation UpdateTeacher(
    $input: UpdateTeacherInput!
    $condition: ModelTeacherConditionInput
  ) {
    updateTeacher(input: $input, condition: $condition) {
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
export const deleteTeacher = /* GraphQL */ `
  mutation DeleteTeacher(
    $input: DeleteTeacherInput!
    $condition: ModelTeacherConditionInput
  ) {
    deleteTeacher(input: $input, condition: $condition) {
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
export const createPupil = /* GraphQL */ `
  mutation CreatePupil(
    $input: CreatePupilInput!
    $condition: ModelPupilConditionInput
  ) {
    createPupil(input: $input, condition: $condition) {
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
export const updatePupil = /* GraphQL */ `
  mutation UpdatePupil(
    $input: UpdatePupilInput!
    $condition: ModelPupilConditionInput
  ) {
    updatePupil(input: $input, condition: $condition) {
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
export const deletePupil = /* GraphQL */ `
  mutation DeletePupil(
    $input: DeletePupilInput!
    $condition: ModelPupilConditionInput
  ) {
    deletePupil(input: $input, condition: $condition) {
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
export const createIntervention = /* GraphQL */ `
  mutation CreateIntervention(
    $input: CreateInterventionInput!
    $condition: ModelInterventionConditionInput
  ) {
    createIntervention(input: $input, condition: $condition) {
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
export const updateIntervention = /* GraphQL */ `
  mutation UpdateIntervention(
    $input: UpdateInterventionInput!
    $condition: ModelInterventionConditionInput
  ) {
    updateIntervention(input: $input, condition: $condition) {
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
export const deleteIntervention = /* GraphQL */ `
  mutation DeleteIntervention(
    $input: DeleteInterventionInput!
    $condition: ModelInterventionConditionInput
  ) {
    deleteIntervention(input: $input, condition: $condition) {
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
export const createParentInterventionFeedback = /* GraphQL */ `
  mutation CreateParentInterventionFeedback(
    $input: CreateParentInterventionFeedbackInput!
    $condition: ModelParentInterventionFeedbackConditionInput
  ) {
    createParentInterventionFeedback(input: $input, condition: $condition) {
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
export const updateParentInterventionFeedback = /* GraphQL */ `
  mutation UpdateParentInterventionFeedback(
    $input: UpdateParentInterventionFeedbackInput!
    $condition: ModelParentInterventionFeedbackConditionInput
  ) {
    updateParentInterventionFeedback(input: $input, condition: $condition) {
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
export const deleteParentInterventionFeedback = /* GraphQL */ `
  mutation DeleteParentInterventionFeedback(
    $input: DeleteParentInterventionFeedbackInput!
    $condition: ModelParentInterventionFeedbackConditionInput
  ) {
    deleteParentInterventionFeedback(input: $input, condition: $condition) {
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
export const createSubjectTerm = /* GraphQL */ `
  mutation CreateSubjectTerm(
    $input: CreateSubjectTermInput!
    $condition: ModelSubjectTermConditionInput
  ) {
    createSubjectTerm(input: $input, condition: $condition) {
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
export const updateSubjectTerm = /* GraphQL */ `
  mutation UpdateSubjectTerm(
    $input: UpdateSubjectTermInput!
    $condition: ModelSubjectTermConditionInput
  ) {
    updateSubjectTerm(input: $input, condition: $condition) {
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
export const deleteSubjectTerm = /* GraphQL */ `
  mutation DeleteSubjectTerm(
    $input: DeleteSubjectTermInput!
    $condition: ModelSubjectTermConditionInput
  ) {
    deleteSubjectTerm(input: $input, condition: $condition) {
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
export const createTermLesson = /* GraphQL */ `
  mutation CreateTermLesson(
    $input: CreateTermLessonInput!
    $condition: ModelTermLessonConditionInput
  ) {
    createTermLesson(input: $input, condition: $condition) {
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
export const updateTermLesson = /* GraphQL */ `
  mutation UpdateTermLesson(
    $input: UpdateTermLessonInput!
    $condition: ModelTermLessonConditionInput
  ) {
    updateTermLesson(input: $input, condition: $condition) {
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
export const deleteTermLesson = /* GraphQL */ `
  mutation DeleteTermLesson(
    $input: DeleteTermLessonInput!
    $condition: ModelTermLessonConditionInput
  ) {
    deleteTermLesson(input: $input, condition: $condition) {
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
export const createCurriculumSubject = /* GraphQL */ `
  mutation CreateCurriculumSubject(
    $input: CreateCurriculumSubjectInput!
    $condition: ModelCurriculumSubjectConditionInput
  ) {
    createCurriculumSubject(input: $input, condition: $condition) {
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
export const updateCurriculumSubject = /* GraphQL */ `
  mutation UpdateCurriculumSubject(
    $input: UpdateCurriculumSubjectInput!
    $condition: ModelCurriculumSubjectConditionInput
  ) {
    updateCurriculumSubject(input: $input, condition: $condition) {
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
export const deleteCurriculumSubject = /* GraphQL */ `
  mutation DeleteCurriculumSubject(
    $input: DeleteCurriculumSubjectInput!
    $condition: ModelCurriculumSubjectConditionInput
  ) {
    deleteCurriculumSubject(input: $input, condition: $condition) {
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
export const createTeacherOrganziation = /* GraphQL */ `
  mutation CreateTeacherOrganziation(
    $input: CreateTeacherOrganziationInput!
    $condition: ModelTeacherOrganziationConditionInput
  ) {
    createTeacherOrganziation(input: $input, condition: $condition) {
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
export const updateTeacherOrganziation = /* GraphQL */ `
  mutation UpdateTeacherOrganziation(
    $input: UpdateTeacherOrganziationInput!
    $condition: ModelTeacherOrganziationConditionInput
  ) {
    updateTeacherOrganziation(input: $input, condition: $condition) {
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
export const deleteTeacherOrganziation = /* GraphQL */ `
  mutation DeleteTeacherOrganziation(
    $input: DeleteTeacherOrganziationInput!
    $condition: ModelTeacherOrganziationConditionInput
  ) {
    deleteTeacherOrganziation(input: $input, condition: $condition) {
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
