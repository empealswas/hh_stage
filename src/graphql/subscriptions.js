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
      pupil {
        id
        firstName
        lastName
        schoolID
        createdAt
        updatedAt
      }
      classroom {
        id
        name
        schoolID
        createdAt
        updatedAt
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
        schoolID
        createdAt
        updatedAt
      }
      classroom {
        id
        name
        schoolID
        createdAt
        updatedAt
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
        schoolID
        createdAt
        updatedAt
      }
      classroom {
        id
        name
        schoolID
        createdAt
        updatedAt
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
      pupilID
      lessonID
      Pupil {
        id
        firstName
        lastName
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
      pupilID
      lessonID
      Pupil {
        id
        firstName
        lastName
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
      pupilID
      lessonID
      Pupil {
        id
        firstName
        lastName
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
        createdAt
        updatedAt
      }
      score
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
      schoolID
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
      Attendances {
        nextToken
      }
      classrooms {
        nextToken
      }
      schoolID
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
      Attendances {
        nextToken
      }
      classrooms {
        nextToken
      }
      schoolID
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
