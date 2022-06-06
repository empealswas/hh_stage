/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
      terraId
      provider
      phoneNumber
      country
      address
      city
      zipCode
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        email
        terraId
        provider
        phoneNumber
        country
        address
        city
        zipCode
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getDependantGuardian = /* GraphQL */ `
  query GetDependantGuardian($id: ID!) {
    getDependantGuardian(id: $id) {
      guardian {
        id
        firstName
        lastName
        email
        terraId
        provider
        phoneNumber
        country
        address
        city
        zipCode
        createdAt
        updatedAt
      }
      dependant {
        id
        firstName
        lastName
        email
        terraId
        provider
        phoneNumber
        country
        address
        city
        zipCode
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
export const listDependantGuardians = /* GraphQL */ `
  query ListDependantGuardians(
    $filter: ModelDependantGuardianFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDependantGuardians(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        updatedAt
        userDependantsId
      }
      nextToken
    }
  }
`;
export const getUserInOrganization = /* GraphQL */ `
  query GetUserInOrganization($id: ID!) {
    getUserInOrganization(id: $id) {
      userID
      organizationID
      organization {
        id
        name
        isPublic
        type
        createdAt
        updatedAt
        userOwnedOrganizationsId
        organizationLogoId
      }
      user {
        id
        firstName
        lastName
        email
        terraId
        provider
        phoneNumber
        country
        address
        city
        zipCode
        createdAt
        updatedAt
      }
      status
      roles {
        nextToken
      }
      classrooms {
        nextToken
      }
      Attendances {
        nextToken
      }
      id
      createdAt
      updatedAt
    }
  }
`;
export const listUserInOrganizations = /* GraphQL */ `
  query ListUserInOrganizations(
    $filter: ModelUserInOrganizationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserInOrganizations(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        userID
        organizationID
        status
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserRole = /* GraphQL */ `
  query GetUserRole($id: ID!) {
    getUserRole(id: $id) {
      id
      name
      organization {
        id
        name
        isPublic
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
        canCreateLesson
        canRateLessons
        canDeleteLessons
        canUpdateLesson
        canUploadContent
        canViewContent
        canCreateSection
        canDeleteSection
        canUpdateSection
        canViewDashboard
        canManageOrganization
        id
        createdAt
        updatedAt
        rolePermissionsRoleId
      }
      sectionAvailableForThatRole {
        nextToken
      }
      createdAt
      updatedAt
      organizationRolesId
      sectionFromContentStoreRolesThatCanAccessId
      userRolePermissionsId
    }
  }
`;
export const listUserRoles = /* GraphQL */ `
  query ListUserRoles(
    $filter: ModelUserRoleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserRoles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
        organizationRolesId
        sectionFromContentStoreRolesThatCanAccessId
        userRolePermissionsId
      }
      nextToken
    }
  }
`;
export const getRolePermissions = /* GraphQL */ `
  query GetRolePermissions($id: ID!) {
    getRolePermissions(id: $id) {
      role {
        id
        name
        createdAt
        updatedAt
        organizationRolesId
        sectionFromContentStoreRolesThatCanAccessId
        userRolePermissionsId
      }
      canAccessAttendanceSheet
      canCreateLesson
      canRateLessons
      canDeleteLessons
      canUpdateLesson
      canUploadContent
      canViewContent
      canCreateSection
      canDeleteSection
      canUpdateSection
      canViewDashboard
      canManageOrganization
      id
      createdAt
      updatedAt
      rolePermissionsRoleId
    }
  }
`;
export const listRolePermissions = /* GraphQL */ `
  query ListRolePermissions(
    $filter: ModelRolePermissionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRolePermissions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        canAccessAttendanceSheet
        canCreateLesson
        canRateLessons
        canDeleteLessons
        canUpdateLesson
        canUploadContent
        canViewContent
        canCreateSection
        canDeleteSection
        canUpdateSection
        canViewDashboard
        canManageOrganization
        id
        createdAt
        updatedAt
        rolePermissionsRoleId
      }
      nextToken
    }
  }
`;
export const getOrganization = /* GraphQL */ `
  query GetOrganization($id: ID!) {
    getOrganization(id: $id) {
      id
      name
      owner {
        id
        firstName
        lastName
        email
        terraId
        provider
        phoneNumber
        country
        address
        city
        zipCode
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
      SectionsFromContentStore {
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
      isPublic
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
export const listOrganizations = /* GraphQL */ `
  query ListOrganizations(
    $filter: ModelOrganizationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrganizations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        isPublic
        type
        createdAt
        updatedAt
        userOwnedOrganizationsId
        organizationLogoId
      }
      nextToken
    }
  }
`;
export const getSectionFromContentStore = /* GraphQL */ `
  query GetSectionFromContentStore($id: ID!) {
    getSectionFromContentStore(id: $id) {
      sectionID
      organizationID
      organization {
        id
        name
        isPublic
        type
        createdAt
        updatedAt
        userOwnedOrganizationsId
        organizationLogoId
      }
      section {
        id
        name
        isPlacedInContentStore
        parentID
        organizationID
        imagePreviewID
        createdAt
        updatedAt
        sectionSectionOptionsId
      }
      rolesThatCanAccess {
        nextToken
      }
      score
      id
      createdAt
      updatedAt
    }
  }
`;
export const listSectionFromContentStores = /* GraphQL */ `
  query ListSectionFromContentStores(
    $filter: ModelSectionFromContentStoreFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSectionFromContentStores(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        sectionID
        organizationID
        score
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFile = /* GraphQL */ `
  query GetFile($id: ID!) {
    getFile(id: $id) {
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
export const listFiles = /* GraphQL */ `
  query ListFiles(
    $filter: ModelFileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        key
        region
        bucket
        lessonID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSection = /* GraphQL */ `
  query GetSection($id: ID!) {
    getSection(id: $id) {
      id
      name
      isPlacedInContentStore
      parentID
      organizationID
      ParentSection {
        id
        name
        isPlacedInContentStore
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
        isPublic
        type
        createdAt
        updatedAt
        userOwnedOrganizationsId
        organizationLogoId
      }
      OrganizationsFromContentStore {
        nextToken
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
      rolesThatCanAccess {
        nextToken
      }
      createdAt
      updatedAt
      sectionSectionOptionsId
    }
  }
`;
export const listSections = /* GraphQL */ `
  query ListSections(
    $filter: ModelSectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSections(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        isPlacedInContentStore
        parentID
        organizationID
        imagePreviewID
        createdAt
        updatedAt
        sectionSectionOptionsId
      }
      nextToken
    }
  }
`;
export const getLesson = /* GraphQL */ `
  query GetLesson($id: ID!) {
    getLesson(id: $id) {
      id
      title
      description
      sectionID
      Section {
        id
        name
        isPlacedInContentStore
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
export const listLessons = /* GraphQL */ `
  query ListLessons(
    $filter: ModelLessonFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLessons(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        sectionID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSectionOptions = /* GraphQL */ `
  query GetSectionOptions($id: ID!) {
    getSectionOptions(id: $id) {
      id
      Section {
        id
        name
        isPlacedInContentStore
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
export const listSectionOptions = /* GraphQL */ `
  query ListSectionOptions(
    $filter: ModelSectionOptionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSectionOptions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        Activities
        Durations
        DeliveredBy
        createdAt
        updatedAt
        sectionOptionsSectionId
      }
      nextToken
    }
  }
`;
export const getPELessonRecord = /* GraphQL */ `
  query GetPELessonRecord($id: ID!) {
    getPELessonRecord(id: $id) {
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
      isCompleted
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
export const listPELessonRecords = /* GraphQL */ `
  query ListPELessonRecords(
    $filter: ModelPELessonRecordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPELessonRecords(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        teacherID
        date
        deliveredBy
        duration
        activity
        rating
        notes
        isCompleted
        classroomID
        lessonID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const lessonRecordByName = /* GraphQL */ `
  query LessonRecordByName(
    $date: AWSDate!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPELessonRecordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    lessonRecordByName(
      date: $date
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        teacherID
        date
        deliveredBy
        duration
        activity
        rating
        notes
        isCompleted
        classroomID
        lessonID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const lessonByDate = /* GraphQL */ `
  query LessonByDate(
    $activity: String!
    $date: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPELessonRecordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    lessonByDate(
      activity: $activity
      date: $date
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        teacherID
        date
        deliveredBy
        duration
        activity
        rating
        notes
        isCompleted
        classroomID
        lessonID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSchoolHouse = /* GraphQL */ `
  query GetSchoolHouse($id: ID!) {
    getSchoolHouse(id: $id) {
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
export const listSchoolHouses = /* GraphQL */ `
  query ListSchoolHouses(
    $filter: ModelSchoolHouseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSchoolHouses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getClassroomLesson = /* GraphQL */ `
  query GetClassroomLesson($id: ID!) {
    getClassroomLesson(id: $id) {
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
export const listClassroomLessons = /* GraphQL */ `
  query ListClassroomLessons(
    $filter: ModelClassroomLessonFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClassroomLessons(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        classroomID
        lessonID
        completed
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getClassroom = /* GraphQL */ `
  query GetClassroom($id: ID!) {
    getClassroom(id: $id) {
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
        isPublic
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
      LessonRecords {
        nextToken
      }
      createdAt
      updatedAt
      organizationClassroomsId
    }
  }
`;
export const listClassrooms = /* GraphQL */ `
  query ListClassrooms(
    $filter: ModelClassroomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClassrooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        schoolID
        yearGroupID
        createdAt
        updatedAt
        organizationClassroomsId
      }
      nextToken
    }
  }
`;
export const getPupilOrganizationRequest = /* GraphQL */ `
  query GetPupilOrganizationRequest($id: ID!) {
    getPupilOrganizationRequest(id: $id) {
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
        isPublic
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
export const listPupilOrganizationRequests = /* GraphQL */ `
  query ListPupilOrganizationRequests(
    $filter: ModelPupilOrganizationRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPupilOrganizationRequests(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        pupilID
        organizationID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPupilOrganizationAccepted = /* GraphQL */ `
  query GetPupilOrganizationAccepted($id: ID!) {
    getPupilOrganizationAccepted(id: $id) {
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
        isPublic
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
export const listPupilOrganizationAccepteds = /* GraphQL */ `
  query ListPupilOrganizationAccepteds(
    $filter: ModelPupilOrganizationAcceptedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPupilOrganizationAccepteds(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        pupilID
        organizationID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSchool = /* GraphQL */ `
  query GetSchool($id: ID!) {
    getSchool(id: $id) {
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
export const listSchools = /* GraphQL */ `
  query ListSchools(
    $filter: ModelSchoolFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSchools(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        country
        region
        principal
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAttendance = /* GraphQL */ `
  query GetAttendance($id: ID!) {
    getAttendance(id: $id) {
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
      UserInOrganization {
        userID
        organizationID
        status
        id
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
        isCompleted
        classroomID
        lessonID
        createdAt
        updatedAt
      }
      lessonRecordID
      createdAt
      updatedAt
      userInOrganizationAttendancesId
    }
  }
`;
export const listAttendances = /* GraphQL */ `
  query ListAttendances(
    $filter: ModelAttendanceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAttendances(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        present
        wasRewarded
        pupilID
        lessonID
        lessonRecordID
        createdAt
        updatedAt
        userInOrganizationAttendancesId
      }
      nextToken
    }
  }
`;
export const attendanceByLessonRecordID = /* GraphQL */ `
  query AttendanceByLessonRecordID(
    $id: ID!
    $lessonRecordID: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAttendanceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    attendanceByLessonRecordID(
      id: $id
      lessonRecordID: $lessonRecordID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        present
        wasRewarded
        pupilID
        lessonID
        lessonRecordID
        createdAt
        updatedAt
        userInOrganizationAttendancesId
      }
      nextToken
    }
  }
`;
export const getLessonTeacher = /* GraphQL */ `
  query GetLessonTeacher($id: ID!) {
    getLessonTeacher(id: $id) {
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
export const listLessonTeachers = /* GraphQL */ `
  query ListLessonTeachers(
    $filter: ModelLessonTeacherFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLessonTeachers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        teacherID
        lessonID
        score
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTerm = /* GraphQL */ `
  query GetTerm($id: ID!) {
    getTerm(id: $id) {
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
export const listTerms = /* GraphQL */ `
  query ListTerms(
    $filter: ModelTermFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTerms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        nam
        startDate
        finishDate
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSubject = /* GraphQL */ `
  query GetSubject($id: ID!) {
    getSubject(id: $id) {
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
export const listSubjects = /* GraphQL */ `
  query ListSubjects(
    $filter: ModelSubjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCurriculum = /* GraphQL */ `
  query GetCurriculum($id: ID!) {
    getCurriculum(id: $id) {
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
export const listCurricula = /* GraphQL */ `
  query ListCurricula(
    $filter: ModelCurriculumFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCurricula(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getParent = /* GraphQL */ `
  query GetParent($id: ID!) {
    getParent(id: $id) {
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
export const listParents = /* GraphQL */ `
  query ListParents(
    $filter: ModelParentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listParents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        email
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPrincipal = /* GraphQL */ `
  query GetPrincipal($id: ID!) {
    getPrincipal(id: $id) {
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
        isPublic
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
export const listPrincipals = /* GraphQL */ `
  query ListPrincipals(
    $filter: ModelPrincipalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPrincipals(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        email
        schoolID
        organizationID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTeacher = /* GraphQL */ `
  query GetTeacher($id: ID!) {
    getTeacher(id: $id) {
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
export const listTeachers = /* GraphQL */ `
  query ListTeachers(
    $filter: ModelTeacherFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTeachers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        email
        schoolID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPupil = /* GraphQL */ `
  query GetPupil($id: ID!) {
    getPupil(id: $id) {
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
export const listPupils = /* GraphQL */ `
  query ListPupils(
    $filter: ModelPupilFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPupils(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getIntervention = /* GraphQL */ `
  query GetIntervention($id: ID!) {
    getIntervention(id: $id) {
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
export const listInterventions = /* GraphQL */ `
  query ListInterventions(
    $filter: ModelInterventionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInterventions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        pupilID
        message
        viewed
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const interventionByPupilByDate = /* GraphQL */ `
  query InterventionByPupilByDate(
    $pupilID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelInterventionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    interventionByPupilByDate(
      pupilID: $pupilID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        pupilID
        message
        viewed
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getParentInterventionFeedback = /* GraphQL */ `
  query GetParentInterventionFeedback($id: ID!) {
    getParentInterventionFeedback(id: $id) {
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
export const listParentInterventionFeedbacks = /* GraphQL */ `
  query ListParentInterventionFeedbacks(
    $filter: ModelParentInterventionFeedbackFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listParentInterventionFeedbacks(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        parentID
        interventionID
        comment
        rating
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getRolesOfUser = /* GraphQL */ `
  query GetRolesOfUser($id: ID!) {
    getRolesOfUser(id: $id) {
      id
      userInOrganizationID
      userRoleID
      userInOrganization {
        userID
        organizationID
        status
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
        sectionFromContentStoreRolesThatCanAccessId
        userRolePermissionsId
      }
      createdAt
      updatedAt
    }
  }
`;
export const listRolesOfUsers = /* GraphQL */ `
  query ListRolesOfUsers(
    $filter: ModelRolesOfUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRolesOfUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userInOrganizationID
        userRoleID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserInOrganizationInClassroom = /* GraphQL */ `
  query GetUserInOrganizationInClassroom($id: ID!) {
    getUserInOrganizationInClassroom(id: $id) {
      id
      userInOrganizationID
      classroomID
      userInOrganization {
        userID
        organizationID
        status
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
export const listUserInOrganizationInClassrooms = /* GraphQL */ `
  query ListUserInOrganizationInClassrooms(
    $filter: ModelUserInOrganizationInClassroomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserInOrganizationInClassrooms(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userInOrganizationID
        classroomID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getRolesThatCanAccess = /* GraphQL */ `
  query GetRolesThatCanAccess($id: ID!) {
    getRolesThatCanAccess(id: $id) {
      id
      userRoleID
      sectionID
      userRole {
        id
        name
        createdAt
        updatedAt
        organizationRolesId
        sectionFromContentStoreRolesThatCanAccessId
        userRolePermissionsId
      }
      section {
        id
        name
        isPlacedInContentStore
        parentID
        organizationID
        imagePreviewID
        createdAt
        updatedAt
        sectionSectionOptionsId
      }
      createdAt
      updatedAt
    }
  }
`;
export const listRolesThatCanAccesses = /* GraphQL */ `
  query ListRolesThatCanAccesses(
    $filter: ModelRolesThatCanAccessFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRolesThatCanAccesses(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userRoleID
        sectionID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTeacherOrganziation = /* GraphQL */ `
  query GetTeacherOrganziation($id: ID!) {
    getTeacherOrganziation(id: $id) {
      id
      organizationID
      teacherID
      organization {
        id
        name
        isPublic
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
export const listTeacherOrganziations = /* GraphQL */ `
  query ListTeacherOrganziations(
    $filter: ModelTeacherOrganziationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTeacherOrganziations(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        organizationID
        teacherID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
