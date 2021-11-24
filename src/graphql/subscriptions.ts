/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
export const onUpdateSection = /* GraphQL */ `
  subscription OnUpdateSection {
    onUpdateSection {
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
export const onDeleteSection = /* GraphQL */ `
  subscription OnDeleteSection {
    onDeleteSection {
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
        imagePreviewID
        createdAt
        updatedAt
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
      LessonsRecords {
        nextToken
      }
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
        imagePreviewID
        createdAt
        updatedAt
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
      LessonsRecords {
        nextToken
      }
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
        imagePreviewID
        createdAt
        updatedAt
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
      LessonsRecords {
        nextToken
      }
    }
  }
`;
export const onCreateSchoolHouse = /* GraphQL */ `
  subscription OnCreateSchoolHouse {
    onCreateSchoolHouse {
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
export const onUpdateSchoolHouse = /* GraphQL */ `
  subscription OnUpdateSchoolHouse {
    onUpdateSchoolHouse {
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
export const onDeleteSchoolHouse = /* GraphQL */ `
  subscription OnDeleteSchoolHouse {
    onDeleteSchoolHouse {
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
      classroom {
        id
        name
        schoolID
        yearGroupID
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      pupil {
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
export const onUpdatePupilClassroom = /* GraphQL */ `
  subscription OnUpdatePupilClassroom {
    onUpdatePupilClassroom {
      id
      pupilID
      classroomID
      classroom {
        id
        name
        schoolID
        yearGroupID
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      pupil {
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
export const onDeletePupilClassroom = /* GraphQL */ `
  subscription OnDeletePupilClassroom {
    onDeletePupilClassroom {
      id
      pupilID
      classroomID
      classroom {
        id
        name
        schoolID
        yearGroupID
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      pupil {
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
export const onCreatePupilOrganizationRequest = /* GraphQL */ `
  subscription OnCreatePupilOrganizationRequest {
    onCreatePupilOrganizationRequest {
      id
      pupilID
      organizationID
      createdAt
      updatedAt
      organization {
        id
        name
        type
        createdAt
        updatedAt
      }
      pupil {
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
export const onUpdatePupilOrganizationRequest = /* GraphQL */ `
  subscription OnUpdatePupilOrganizationRequest {
    onUpdatePupilOrganizationRequest {
      id
      pupilID
      organizationID
      createdAt
      updatedAt
      organization {
        id
        name
        type
        createdAt
        updatedAt
      }
      pupil {
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
export const onDeletePupilOrganizationRequest = /* GraphQL */ `
  subscription OnDeletePupilOrganizationRequest {
    onDeletePupilOrganizationRequest {
      id
      pupilID
      organizationID
      createdAt
      updatedAt
      organization {
        id
        name
        type
        createdAt
        updatedAt
      }
      pupil {
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
export const onCreatePupilOrganizationAccepted = /* GraphQL */ `
  subscription OnCreatePupilOrganizationAccepted {
    onCreatePupilOrganizationAccepted {
      id
      pupilID
      organizationID
      createdAt
      updatedAt
      organization {
        id
        name
        type
        createdAt
        updatedAt
      }
      pupil {
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
export const onUpdatePupilOrganizationAccepted = /* GraphQL */ `
  subscription OnUpdatePupilOrganizationAccepted {
    onUpdatePupilOrganizationAccepted {
      id
      pupilID
      organizationID
      createdAt
      updatedAt
      organization {
        id
        name
        type
        createdAt
        updatedAt
      }
      pupil {
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
export const onDeletePupilOrganizationAccepted = /* GraphQL */ `
  subscription OnDeletePupilOrganizationAccepted {
    onDeletePupilOrganizationAccepted {
      id
      pupilID
      organizationID
      createdAt
      updatedAt
      organization {
        id
        name
        type
        createdAt
        updatedAt
      }
      pupil {
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
export const onCreateAttendance = /* GraphQL */ `
  subscription OnCreateAttendance {
    onCreateAttendance {
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
      lessonRecordID
      createdAt
      updatedAt
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
export const onUpdateAttendance = /* GraphQL */ `
  subscription OnUpdateAttendance {
    onUpdateAttendance {
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
      lessonRecordID
      createdAt
      updatedAt
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
export const onDeleteAttendance = /* GraphQL */ `
  subscription OnDeleteAttendance {
    onDeleteAttendance {
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
      lessonRecordID
      createdAt
      updatedAt
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
export const onCreateOrganization = /* GraphQL */ `
  subscription OnCreateOrganization {
    onCreateOrganization {
      id
      name
      Principals {
        nextToken
      }
      WaitingForAcceptPupils {
        nextToken
      }
      AcceptedPupils {
        nextToken
      }
      type
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateOrganization = /* GraphQL */ `
  subscription OnUpdateOrganization {
    onUpdateOrganization {
      id
      name
      Principals {
        nextToken
      }
      WaitingForAcceptPupils {
        nextToken
      }
      AcceptedPupils {
        nextToken
      }
      type
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteOrganization = /* GraphQL */ `
  subscription OnDeleteOrganization {
    onDeleteOrganization {
      id
      name
      Principals {
        nextToken
      }
      WaitingForAcceptPupils {
        nextToken
      }
      AcceptedPupils {
        nextToken
      }
      type
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
      createdAt
      updatedAt
      Interventions {
        nextToken
      }
    }
  }
`;
export const onUpdatePupil = /* GraphQL */ `
  subscription OnUpdatePupil {
    onUpdatePupil {
      id
      firstName
      lastName
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
      createdAt
      updatedAt
      Interventions {
        nextToken
      }
    }
  }
`;
export const onDeletePupil = /* GraphQL */ `
  subscription OnDeletePupil {
    onDeletePupil {
      id
      firstName
      lastName
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
      createdAt
      updatedAt
      Interventions {
        nextToken
      }
    }
  }
`;
export const onCreateIntervention = /* GraphQL */ `
  subscription OnCreateIntervention {
    onCreateIntervention {
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
export const onUpdateIntervention = /* GraphQL */ `
  subscription OnUpdateIntervention {
    onUpdateIntervention {
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
export const onDeleteIntervention = /* GraphQL */ `
  subscription OnDeleteIntervention {
    onDeleteIntervention {
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
