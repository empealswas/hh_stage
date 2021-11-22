/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      yearGroupID
      yearGroup {
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
        schoolID
        schoolHouseID
        createdAt
        updatedAt
      }
      Lesson {
        id
        title
        description
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
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
        createdAt
        updatedAt
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
export const getLesson = /* GraphQL */ `
  query GetLesson($id: ID!) {
    getLesson(id: $id) {
      id
      title
      description
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
<<<<<<< Updated upstream
=======
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
      createdAt
      updatedAt
      Organization {
        id
        name
        type
        createdAt
        updatedAt
      }
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
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
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
      classroomID
      Classroom {
        id
        name
        schoolID
        yearGroupID
        createdAt
        updatedAt
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
        classroomID
        lessonID
        createdAt
        updatedAt
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
      Principals {
        nextToken
      }
      type
      createdAt
      updatedAt
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
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
>>>>>>> Stashed changes
export const getPupil = /* GraphQL */ `
  query GetPupil($id: ID!) {
    getPupil(id: $id) {
      id
      firstName
      lastName
      Attendances {
        nextToken
      }
      classrooms {
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
        schoolID
        schoolHouseID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
