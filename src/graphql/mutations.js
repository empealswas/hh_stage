/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten
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
      createdAt
      updatedAt
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
      createdAt
      updatedAt
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
      createdAt
      updatedAt
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
        createdAt
        updatedAt
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
        createdAt
        updatedAt
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
        createdAt
        updatedAt
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
export const updateAttendance = /* GraphQL */ `
  mutation UpdateAttendance(
    $input: UpdateAttendanceInput!
    $condition: ModelAttendanceConditionInput
  ) {
    updateAttendance(input: $input, condition: $condition) {
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
export const deleteAttendance = /* GraphQL */ `
  mutation DeleteAttendance(
    $input: DeleteAttendanceInput!
    $condition: ModelAttendanceConditionInput
  ) {
    deleteAttendance(input: $input, condition: $condition) {
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
        createdAt
        updatedAt
      }
      score
      createdAt
      updatedAt
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
export const updatePupil = /* GraphQL */ `
  mutation UpdatePupil(
    $input: UpdatePupilInput!
    $condition: ModelPupilConditionInput
  ) {
    updatePupil(input: $input, condition: $condition) {
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
export const deletePupil = /* GraphQL */ `
  mutation DeletePupil(
    $input: DeletePupilInput!
    $condition: ModelPupilConditionInput
  ) {
    deletePupil(input: $input, condition: $condition) {
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
