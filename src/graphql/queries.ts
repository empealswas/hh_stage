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
export const getSection = /* GraphQL */ `
  query GetSection($id: ID!) {
    getSection(id: $id) {
      id
      name
      parentID
      ParentSection {
        id
        name
        parentID
        imagePreviewID
        createdAt
        updatedAt
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
      createdAt
      updatedAt
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
        parentID
        imagePreviewID
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
      sectionID
      Section {
        id
        name
        parentID
        imagePreviewID
        createdAt
        updatedAt
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
export const getSchoolHouse = /* GraphQL */ `
  query GetSchoolHouse($id: ID!) {
    getSchoolHouse(id: $id) {
      id
      name
      createdAt
      updatedAt
      Pupils {
        nextToken
      }
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
      classrooms {
        nextToken
      }
      createdAt
      updatedAt
      Pupils {
        nextToken
      }
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
      Pupil {
        id
        firstName
        lastName
        schoolID
        schoolHouseID
        createdAt
        updatedAt
      }
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
      parents {
        nextToken
      }
      createdAt
      updatedAt
      Interventions {
        nextToken
      }
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
export const getIntervention = /* GraphQL */ `
  query GetIntervention($id: ID!) {
    getIntervention(id: $id) {
      id
      pupilID
      message
      createdAt
      updatedAt
      Pupil {
        id
        firstName
        lastName
        schoolID
        schoolHouseID
        createdAt
        updatedAt
      }
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
