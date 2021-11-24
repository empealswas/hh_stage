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
export const createSection = /* GraphQL */ `
  mutation CreateSection(
    $input: CreateSectionInput!
    $condition: ModelSectionConditionInput
  ) {
    createSection(input: $input, condition: $condition) {
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
export const updateSection = /* GraphQL */ `
  mutation UpdateSection(
    $input: UpdateSectionInput!
    $condition: ModelSectionConditionInput
  ) {
    updateSection(input: $input, condition: $condition) {
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
export const deleteSection = /* GraphQL */ `
  mutation DeleteSection(
    $input: DeleteSectionInput!
    $condition: ModelSectionConditionInput
  ) {
    deleteSection(input: $input, condition: $condition) {
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
export const createSchoolHouse = /* GraphQL */ `
  mutation CreateSchoolHouse(
    $input: CreateSchoolHouseInput!
    $condition: ModelSchoolHouseConditionInput
  ) {
    createSchoolHouse(input: $input, condition: $condition) {
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
export const updateSchoolHouse = /* GraphQL */ `
  mutation UpdateSchoolHouse(
    $input: UpdateSchoolHouseInput!
    $condition: ModelSchoolHouseConditionInput
  ) {
    updateSchoolHouse(input: $input, condition: $condition) {
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
export const deleteSchoolHouse = /* GraphQL */ `
  mutation DeleteSchoolHouse(
    $input: DeleteSchoolHouseInput!
    $condition: ModelSchoolHouseConditionInput
  ) {
    deleteSchoolHouse(input: $input, condition: $condition) {
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
export const updatePupilClassroom = /* GraphQL */ `
  mutation UpdatePupilClassroom(
    $input: UpdatePupilClassroomInput!
    $condition: ModelPupilClassroomConditionInput
  ) {
    updatePupilClassroom(input: $input, condition: $condition) {
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
export const deletePupilClassroom = /* GraphQL */ `
  mutation DeletePupilClassroom(
    $input: DeletePupilClassroomInput!
    $condition: ModelPupilClassroomConditionInput
  ) {
    deletePupilClassroom(input: $input, condition: $condition) {
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
export const createPupilOrganizationRequest = /* GraphQL */ `
  mutation CreatePupilOrganizationRequest(
    $input: CreatePupilOrganizationRequestInput!
    $condition: ModelPupilOrganizationRequestConditionInput
  ) {
    createPupilOrganizationRequest(input: $input, condition: $condition) {
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
export const updatePupilOrganizationRequest = /* GraphQL */ `
  mutation UpdatePupilOrganizationRequest(
    $input: UpdatePupilOrganizationRequestInput!
    $condition: ModelPupilOrganizationRequestConditionInput
  ) {
    updatePupilOrganizationRequest(input: $input, condition: $condition) {
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
export const deletePupilOrganizationRequest = /* GraphQL */ `
  mutation DeletePupilOrganizationRequest(
    $input: DeletePupilOrganizationRequestInput!
    $condition: ModelPupilOrganizationRequestConditionInput
  ) {
    deletePupilOrganizationRequest(input: $input, condition: $condition) {
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
export const createPupilOrganizationAccepted = /* GraphQL */ `
  mutation CreatePupilOrganizationAccepted(
    $input: CreatePupilOrganizationAcceptedInput!
    $condition: ModelPupilOrganizationAcceptedConditionInput
  ) {
    createPupilOrganizationAccepted(input: $input, condition: $condition) {
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
export const updatePupilOrganizationAccepted = /* GraphQL */ `
  mutation UpdatePupilOrganizationAccepted(
    $input: UpdatePupilOrganizationAcceptedInput!
    $condition: ModelPupilOrganizationAcceptedConditionInput
  ) {
    updatePupilOrganizationAccepted(input: $input, condition: $condition) {
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
export const deletePupilOrganizationAccepted = /* GraphQL */ `
  mutation DeletePupilOrganizationAccepted(
    $input: DeletePupilOrganizationAcceptedInput!
    $condition: ModelPupilOrganizationAcceptedConditionInput
  ) {
    deletePupilOrganizationAccepted(input: $input, condition: $condition) {
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
export const createOrganization = /* GraphQL */ `
  mutation CreateOrganization(
    $input: CreateOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    createOrganization(input: $input, condition: $condition) {
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
export const updateOrganization = /* GraphQL */ `
  mutation UpdateOrganization(
    $input: UpdateOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    updateOrganization(input: $input, condition: $condition) {
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
export const deleteOrganization = /* GraphQL */ `
  mutation DeleteOrganization(
    $input: DeleteOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    deleteOrganization(input: $input, condition: $condition) {
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
export const createIntervention = /* GraphQL */ `
  mutation CreateIntervention(
    $input: CreateInterventionInput!
    $condition: ModelInterventionConditionInput
  ) {
    createIntervention(input: $input, condition: $condition) {
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
export const updateIntervention = /* GraphQL */ `
  mutation UpdateIntervention(
    $input: UpdateInterventionInput!
    $condition: ModelInterventionConditionInput
  ) {
    updateIntervention(input: $input, condition: $condition) {
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
export const deleteIntervention = /* GraphQL */ `
  mutation DeleteIntervention(
    $input: DeleteInterventionInput!
    $condition: ModelInterventionConditionInput
  ) {
    deleteIntervention(input: $input, condition: $condition) {
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
