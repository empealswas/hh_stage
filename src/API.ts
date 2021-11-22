/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateFileInput = {
  id?: string | null,
  key?: string | null,
  region?: string | null,
  bucket?: string | null,
  lessonID?: string | null,
};

export type ModelFileConditionInput = {
  key?: ModelStringInput | null,
  region?: ModelStringInput | null,
  bucket?: ModelStringInput | null,
  lessonID?: ModelIDInput | null,
  and?: Array< ModelFileConditionInput | null > | null,
  or?: Array< ModelFileConditionInput | null > | null,
  not?: ModelFileConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type File = {
  __typename: "File",
  id: string,
  key?: string | null,
  region?: string | null,
  bucket?: string | null,
  lessonID?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateFileInput = {
  id: string,
  key?: string | null,
  region?: string | null,
  bucket?: string | null,
  lessonID?: string | null,
};

export type DeleteFileInput = {
  id: string,
};

export type CreateSectionInput = {
  id?: string | null,
  name?: string | null,
  parentID?: string | null,
  imagePreviewID?: string | null,
};

export type ModelSectionConditionInput = {
  name?: ModelStringInput | null,
  parentID?: ModelIDInput | null,
  imagePreviewID?: ModelIDInput | null,
  and?: Array< ModelSectionConditionInput | null > | null,
  or?: Array< ModelSectionConditionInput | null > | null,
  not?: ModelSectionConditionInput | null,
};

export type Section = {
  __typename: "Section",
  id: string,
  name?: string | null,
  parentID?: string | null,
  ParentSection?: Section | null,
  Lessons?: ModelLessonConnection | null,
  imagePreviewID?: string | null,
  ImagePreview?: File | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelLessonConnection = {
  __typename: "ModelLessonConnection",
  items:  Array<Lesson >,
  nextToken?: string | null,
};

export type Lesson = {
  __typename: "Lesson",
  id: string,
  title?: string | null,
  description?: string | null,
  sectionID?: string | null,
  Section?: Section | null,
  terms?: ModelTermLessonConnection | null,
  Attendances?: ModelAttendanceConnection | null,
  Files?: ModelFileConnection | null,
  LessonTeacher?: ModelLessonTeacherConnection | null,
  createdAt: string,
  updatedAt: string,
  LessonsRecords?: ModelPELessonRecordConnection | null,
};

export type ModelTermLessonConnection = {
  __typename: "ModelTermLessonConnection",
  items:  Array<TermLesson >,
  nextToken?: string | null,
};

export type TermLesson = {
  __typename: "TermLesson",
  id: string,
  termID: string,
  lessonID: string,
  term: Term,
  lesson: Lesson,
  createdAt: string,
  updatedAt: string,
};

export type Term = {
  __typename: "Term",
  id: string,
  nam?: string | null,
  startDate?: string | null,
  finishDate?: string | null,
  subjects?: ModelSubjectTermConnection | null,
  TermLessons?: ModelTermLessonConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelSubjectTermConnection = {
  __typename: "ModelSubjectTermConnection",
  items:  Array<SubjectTerm >,
  nextToken?: string | null,
};

export type SubjectTerm = {
  __typename: "SubjectTerm",
  id: string,
  subjectID: string,
  termID: string,
  subject: Subject,
  term: Term,
  createdAt: string,
  updatedAt: string,
};

export type Subject = {
  __typename: "Subject",
  id: string,
  name?: string | null,
  SubjectTerms?: ModelSubjectTermConnection | null,
  curriculums?: ModelCurriculumSubjectConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelCurriculumSubjectConnection = {
  __typename: "ModelCurriculumSubjectConnection",
  items:  Array<CurriculumSubject >,
  nextToken?: string | null,
};

export type CurriculumSubject = {
  __typename: "CurriculumSubject",
  id: string,
  curriculumID: string,
  subjectID: string,
  curriculum: Curriculum,
  subject: Subject,
  createdAt: string,
  updatedAt: string,
};

export type Curriculum = {
  __typename: "Curriculum",
  id: string,
  name?: string | null,
  subjects?: ModelCurriculumSubjectConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelAttendanceConnection = {
  __typename: "ModelAttendanceConnection",
  items:  Array<Attendance >,
  nextToken?: string | null,
};

export type Attendance = {
  __typename: "Attendance",
  id: string,
  present?: boolean | null,
  wasRewarded?: boolean | null,
  pupilID?: string | null,
  lessonID?: string | null,
  Lesson?: Lesson | null,
  lessonRecordID?: string | null,
  createdAt: string,
  updatedAt: string,
  lessonRecord?: PELessonRecord | null,
  Pupil?: Pupil | null,
};

export type PELessonRecord = {
  __typename: "PELessonRecord",
  id: string,
  teacherID?: string | null,
  Teacher?: Teacher | null,
  Attendances?: ModelAttendanceConnection | null,
  date?: string | null,
  deliveredBy?: string | null,
  duration?: number | null,
  activity?: string | null,
  rating?: number | null,
  notes?: string | null,
  classroomID?: string | null,
  Classroom?: Classroom | null,
  lessonID?: string | null,
  Lesson?: Lesson | null,
  createdAt: string,
  updatedAt: string,
};

export type Teacher = {
  __typename: "Teacher",
  id: string,
  firstName?: string | null,
  lastName?: string | null,
  email?: string | null,
  schoolID?: string | null,
  classrooms?: ModelTeacherClassroomConnection | null,
  LessonTeacher?: ModelLessonTeacherConnection | null,
  School?: School | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelTeacherClassroomConnection = {
  __typename: "ModelTeacherClassroomConnection",
  items:  Array<TeacherClassroom >,
  nextToken?: string | null,
};

export type TeacherClassroom = {
  __typename: "TeacherClassroom",
  id: string,
  teacherID: string,
  classroomID: string,
  teacher: Teacher,
  classroom: Classroom,
  createdAt: string,
  updatedAt: string,
};

export type Classroom = {
  __typename: "Classroom",
  id: string,
  name?: string | null,
  teachers?: ModelTeacherClassroomConnection | null,
  pupils?: ModelPupilClassroomConnection | null,
  schoolID?: string | null,
  school?: School | null,
  yearGroupID?: string | null,
  yearGroup?: Curriculum | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelPupilClassroomConnection = {
  __typename: "ModelPupilClassroomConnection",
  items:  Array<PupilClassroom >,
  nextToken?: string | null,
};

export type PupilClassroom = {
  __typename: "PupilClassroom",
  id: string,
  pupilID: string,
  classroomID: string,
  classroom: Classroom,
  createdAt: string,
  updatedAt: string,
  pupil: Pupil,
};

export type Pupil = {
  __typename: "Pupil",
  id: string,
  firstName?: string | null,
  lastName?: string | null,
  Attendances?: ModelAttendanceConnection | null,
  classrooms?: ModelPupilClassroomConnection | null,
  schoolID?: string | null,
  schoolHouseID?: string | null,
  schoolHouse?: SchoolHouse | null,
  school?: School | null,
  parents?: ModelPupilParentConnection | null,
  createdAt: string,
  updatedAt: string,
  Interventions?: ModelInterventionConnection | null,
};

export type SchoolHouse = {
  __typename: "SchoolHouse",
  id: string,
  name?: string | null,
  createdAt: string,
  updatedAt: string,
  Pupils?: ModelPupilConnection | null,
};

export type ModelPupilConnection = {
  __typename: "ModelPupilConnection",
  items:  Array<Pupil >,
  nextToken?: string | null,
};

export type School = {
  __typename: "School",
  id: string,
  name?: string | null,
  country?: string | null,
  region?: string | null,
  principal?: string | null,
  Teachers?: ModelTeacherConnection | null,
  Principals?: ModelPrincipalConnection | null,
  classrooms?: ModelClassroomConnection | null,
  createdAt: string,
  updatedAt: string,
  Pupils?: ModelPupilConnection | null,
};

export type ModelTeacherConnection = {
  __typename: "ModelTeacherConnection",
  items:  Array<Teacher >,
  nextToken?: string | null,
};

export type ModelPrincipalConnection = {
  __typename: "ModelPrincipalConnection",
  items:  Array<Principal >,
  nextToken?: string | null,
};

export type Principal = {
  __typename: "Principal",
  id: string,
  firstName?: string | null,
  lastName?: string | null,
  email?: string | null,
  schoolID?: string | null,
  School?: School | null,
  organizationID?: string | null,
  createdAt: string,
  updatedAt: string,
  Organization?: Organization | null,
};

export type Organization = {
  __typename: "Organization",
  id: string,
  name?: string | null,
  Principals?: ModelPrincipalConnection | null,
  type?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelClassroomConnection = {
  __typename: "ModelClassroomConnection",
  items:  Array<Classroom >,
  nextToken?: string | null,
};

export type ModelPupilParentConnection = {
  __typename: "ModelPupilParentConnection",
  items:  Array<PupilParent >,
  nextToken?: string | null,
};

export type PupilParent = {
  __typename: "PupilParent",
  id: string,
  pupilID: string,
  parentID: string,
  Parent: Parent,
  createdAt: string,
  updatedAt: string,
  Pupil: Pupil,
};

export type Parent = {
  __typename: "Parent",
  id: string,
  firstName?: string | null,
  lastName?: string | null,
  email?: string | null,
  children?: ModelPupilParentConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelInterventionConnection = {
  __typename: "ModelInterventionConnection",
  items:  Array<Intervention >,
  nextToken?: string | null,
};

export type Intervention = {
  __typename: "Intervention",
  id: string,
  pupilID: string,
  message?: string | null,
  createdAt: string,
  updatedAt: string,
  Pupil?: Pupil | null,
};

export type ModelLessonTeacherConnection = {
  __typename: "ModelLessonTeacherConnection",
  items:  Array<LessonTeacher >,
  nextToken?: string | null,
};

export type LessonTeacher = {
  __typename: "LessonTeacher",
  id: string,
  teacherID?: string | null,
  lessonID?: string | null,
  Teacher?: Teacher | null,
  Lesson?: Lesson | null,
  score?: number | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelFileConnection = {
  __typename: "ModelFileConnection",
  items:  Array<File >,
  nextToken?: string | null,
};

export type ModelPELessonRecordConnection = {
  __typename: "ModelPELessonRecordConnection",
  items:  Array<PELessonRecord >,
  nextToken?: string | null,
};

export type UpdateSectionInput = {
  id: string,
  name?: string | null,
  parentID?: string | null,
  imagePreviewID?: string | null,
};

export type DeleteSectionInput = {
  id: string,
};

export type CreateLessonInput = {
  id?: string | null,
  title?: string | null,
  description?: string | null,
  sectionID?: string | null,
};

export type ModelLessonConditionInput = {
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  sectionID?: ModelIDInput | null,
  and?: Array< ModelLessonConditionInput | null > | null,
  or?: Array< ModelLessonConditionInput | null > | null,
  not?: ModelLessonConditionInput | null,
};

export type UpdateLessonInput = {
  id: string,
  title?: string | null,
  description?: string | null,
  sectionID?: string | null,
};

export type DeleteLessonInput = {
  id: string,
};

export type CreateSchoolHouseInput = {
  id?: string | null,
  name?: string | null,
};

export type ModelSchoolHouseConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelSchoolHouseConditionInput | null > | null,
  or?: Array< ModelSchoolHouseConditionInput | null > | null,
  not?: ModelSchoolHouseConditionInput | null,
};

export type UpdateSchoolHouseInput = {
  id: string,
  name?: string | null,
};

export type DeleteSchoolHouseInput = {
  id: string,
};

export type CreateClassroomLessonInput = {
  id?: string | null,
  classroomID?: string | null,
  lessonID?: string | null,
  completed?: boolean | null,
};

export type ModelClassroomLessonConditionInput = {
  classroomID?: ModelIDInput | null,
  lessonID?: ModelIDInput | null,
  completed?: ModelBooleanInput | null,
  and?: Array< ModelClassroomLessonConditionInput | null > | null,
  or?: Array< ModelClassroomLessonConditionInput | null > | null,
  not?: ModelClassroomLessonConditionInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ClassroomLesson = {
  __typename: "ClassroomLesson",
  id: string,
  classroomID?: string | null,
  lessonID?: string | null,
  Classroom?: Classroom | null,
  Lesson?: Lesson | null,
  completed?: boolean | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateClassroomLessonInput = {
  id: string,
  classroomID?: string | null,
  lessonID?: string | null,
  completed?: boolean | null,
};

export type DeleteClassroomLessonInput = {
  id: string,
};

export type CreateClassroomInput = {
  id?: string | null,
  name?: string | null,
  schoolID?: string | null,
  yearGroupID?: string | null,
};

export type ModelClassroomConditionInput = {
  name?: ModelStringInput | null,
  schoolID?: ModelIDInput | null,
  yearGroupID?: ModelIDInput | null,
  and?: Array< ModelClassroomConditionInput | null > | null,
  or?: Array< ModelClassroomConditionInput | null > | null,
  not?: ModelClassroomConditionInput | null,
};

export type UpdateClassroomInput = {
  id: string,
  name?: string | null,
  schoolID?: string | null,
  yearGroupID?: string | null,
};

export type DeleteClassroomInput = {
  id: string,
};

export type CreateTeacherClassroomInput = {
  id?: string | null,
  teacherID: string,
  classroomID: string,
};

export type ModelTeacherClassroomConditionInput = {
  teacherID?: ModelIDInput | null,
  classroomID?: ModelIDInput | null,
  and?: Array< ModelTeacherClassroomConditionInput | null > | null,
  or?: Array< ModelTeacherClassroomConditionInput | null > | null,
  not?: ModelTeacherClassroomConditionInput | null,
};

export type UpdateTeacherClassroomInput = {
  id: string,
  teacherID?: string | null,
  classroomID?: string | null,
};

export type DeleteTeacherClassroomInput = {
  id: string,
};

export type CreatePupilClassroomInput = {
  id?: string | null,
  pupilID: string,
  classroomID: string,
};

export type ModelPupilClassroomConditionInput = {
  pupilID?: ModelIDInput | null,
  classroomID?: ModelIDInput | null,
  and?: Array< ModelPupilClassroomConditionInput | null > | null,
  or?: Array< ModelPupilClassroomConditionInput | null > | null,
  not?: ModelPupilClassroomConditionInput | null,
};

export type UpdatePupilClassroomInput = {
  id: string,
  pupilID?: string | null,
  classroomID?: string | null,
};

export type DeletePupilClassroomInput = {
  id: string,
};

export type CreateSchoolInput = {
  id?: string | null,
  name?: string | null,
  country?: string | null,
  region?: string | null,
  principal?: string | null,
};

export type ModelSchoolConditionInput = {
  name?: ModelStringInput | null,
  country?: ModelStringInput | null,
  region?: ModelStringInput | null,
  principal?: ModelStringInput | null,
  and?: Array< ModelSchoolConditionInput | null > | null,
  or?: Array< ModelSchoolConditionInput | null > | null,
  not?: ModelSchoolConditionInput | null,
};

export type UpdateSchoolInput = {
  id: string,
  name?: string | null,
  country?: string | null,
  region?: string | null,
  principal?: string | null,
};

export type DeleteSchoolInput = {
  id: string,
};

export type CreateAttendanceInput = {
  id?: string | null,
  present?: boolean | null,
  wasRewarded?: boolean | null,
  pupilID?: string | null,
  lessonID?: string | null,
  lessonRecordID?: string | null,
};

export type ModelAttendanceConditionInput = {
  present?: ModelBooleanInput | null,
  wasRewarded?: ModelBooleanInput | null,
  pupilID?: ModelIDInput | null,
  lessonID?: ModelIDInput | null,
  lessonRecordID?: ModelIDInput | null,
  and?: Array< ModelAttendanceConditionInput | null > | null,
  or?: Array< ModelAttendanceConditionInput | null > | null,
  not?: ModelAttendanceConditionInput | null,
};

export type UpdateAttendanceInput = {
  id: string,
  present?: boolean | null,
  wasRewarded?: boolean | null,
  pupilID?: string | null,
  lessonID?: string | null,
  lessonRecordID?: string | null,
};

export type DeleteAttendanceInput = {
  id: string,
};

export type CreateLessonTeacherInput = {
  id?: string | null,
  teacherID?: string | null,
  lessonID?: string | null,
  score?: number | null,
};

export type ModelLessonTeacherConditionInput = {
  teacherID?: ModelIDInput | null,
  lessonID?: ModelIDInput | null,
  score?: ModelIntInput | null,
  and?: Array< ModelLessonTeacherConditionInput | null > | null,
  or?: Array< ModelLessonTeacherConditionInput | null > | null,
  not?: ModelLessonTeacherConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateLessonTeacherInput = {
  id: string,
  teacherID?: string | null,
  lessonID?: string | null,
  score?: number | null,
};

export type DeleteLessonTeacherInput = {
  id: string,
};

export type CreateTermInput = {
  id?: string | null,
  nam?: string | null,
  startDate?: string | null,
  finishDate?: string | null,
};

export type ModelTermConditionInput = {
  nam?: ModelStringInput | null,
  startDate?: ModelStringInput | null,
  finishDate?: ModelStringInput | null,
  and?: Array< ModelTermConditionInput | null > | null,
  or?: Array< ModelTermConditionInput | null > | null,
  not?: ModelTermConditionInput | null,
};

export type UpdateTermInput = {
  id: string,
  nam?: string | null,
  startDate?: string | null,
  finishDate?: string | null,
};

export type DeleteTermInput = {
  id: string,
};

export type CreateSubjectInput = {
  id?: string | null,
  name?: string | null,
};

export type ModelSubjectConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelSubjectConditionInput | null > | null,
  or?: Array< ModelSubjectConditionInput | null > | null,
  not?: ModelSubjectConditionInput | null,
};

export type UpdateSubjectInput = {
  id: string,
  name?: string | null,
};

export type DeleteSubjectInput = {
  id: string,
};

export type CreateCurriculumInput = {
  id?: string | null,
  name?: string | null,
};

export type ModelCurriculumConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelCurriculumConditionInput | null > | null,
  or?: Array< ModelCurriculumConditionInput | null > | null,
  not?: ModelCurriculumConditionInput | null,
};

export type UpdateCurriculumInput = {
  id: string,
  name?: string | null,
};

export type DeleteCurriculumInput = {
  id: string,
};

export type CreateParentInput = {
  id?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  email?: string | null,
};

export type ModelParentConditionInput = {
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  email?: ModelStringInput | null,
  and?: Array< ModelParentConditionInput | null > | null,
  or?: Array< ModelParentConditionInput | null > | null,
  not?: ModelParentConditionInput | null,
};

export type UpdateParentInput = {
  id: string,
  firstName?: string | null,
  lastName?: string | null,
  email?: string | null,
};

export type DeleteParentInput = {
  id: string,
};

export type CreatePupilParentInput = {
  id?: string | null,
  pupilID: string,
  parentID: string,
};

export type ModelPupilParentConditionInput = {
  pupilID?: ModelIDInput | null,
  parentID?: ModelIDInput | null,
  and?: Array< ModelPupilParentConditionInput | null > | null,
  or?: Array< ModelPupilParentConditionInput | null > | null,
  not?: ModelPupilParentConditionInput | null,
};

export type UpdatePupilParentInput = {
  id: string,
  pupilID?: string | null,
  parentID?: string | null,
};

export type DeletePupilParentInput = {
  id: string,
};

export type CreatePrincipalInput = {
  id?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  email?: string | null,
  schoolID?: string | null,
  organizationID?: string | null,
};

export type ModelPrincipalConditionInput = {
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  email?: ModelStringInput | null,
  schoolID?: ModelIDInput | null,
  organizationID?: ModelIDInput | null,
  and?: Array< ModelPrincipalConditionInput | null > | null,
  or?: Array< ModelPrincipalConditionInput | null > | null,
  not?: ModelPrincipalConditionInput | null,
};

export type UpdatePrincipalInput = {
  id: string,
  firstName?: string | null,
  lastName?: string | null,
  email?: string | null,
  schoolID?: string | null,
  organizationID?: string | null,
};

export type DeletePrincipalInput = {
  id: string,
};

export type CreateTeacherInput = {
  id?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  email?: string | null,
  schoolID?: string | null,
};

export type ModelTeacherConditionInput = {
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  email?: ModelStringInput | null,
  schoolID?: ModelIDInput | null,
  and?: Array< ModelTeacherConditionInput | null > | null,
  or?: Array< ModelTeacherConditionInput | null > | null,
  not?: ModelTeacherConditionInput | null,
};

export type UpdateTeacherInput = {
  id: string,
  firstName?: string | null,
  lastName?: string | null,
  email?: string | null,
  schoolID?: string | null,
};

export type DeleteTeacherInput = {
  id: string,
};

export type CreateSubjectTermInput = {
  id?: string | null,
  subjectID: string,
  termID: string,
};

export type ModelSubjectTermConditionInput = {
  subjectID?: ModelIDInput | null,
  termID?: ModelIDInput | null,
  and?: Array< ModelSubjectTermConditionInput | null > | null,
  or?: Array< ModelSubjectTermConditionInput | null > | null,
  not?: ModelSubjectTermConditionInput | null,
};

export type UpdateSubjectTermInput = {
  id: string,
  subjectID?: string | null,
  termID?: string | null,
};

export type DeleteSubjectTermInput = {
  id: string,
};

export type CreateTermLessonInput = {
  id?: string | null,
  termID: string,
  lessonID: string,
};

export type ModelTermLessonConditionInput = {
  termID?: ModelIDInput | null,
  lessonID?: ModelIDInput | null,
  and?: Array< ModelTermLessonConditionInput | null > | null,
  or?: Array< ModelTermLessonConditionInput | null > | null,
  not?: ModelTermLessonConditionInput | null,
};

export type UpdateTermLessonInput = {
  id: string,
  termID?: string | null,
  lessonID?: string | null,
};

export type DeleteTermLessonInput = {
  id: string,
};

export type CreateCurriculumSubjectInput = {
  id?: string | null,
  curriculumID: string,
  subjectID: string,
};

export type ModelCurriculumSubjectConditionInput = {
  curriculumID?: ModelIDInput | null,
  subjectID?: ModelIDInput | null,
  and?: Array< ModelCurriculumSubjectConditionInput | null > | null,
  or?: Array< ModelCurriculumSubjectConditionInput | null > | null,
  not?: ModelCurriculumSubjectConditionInput | null,
};

export type UpdateCurriculumSubjectInput = {
  id: string,
  curriculumID?: string | null,
  subjectID?: string | null,
};

export type DeleteCurriculumSubjectInput = {
  id: string,
};

export type CreatePELessonRecordInput = {
  id?: string | null,
  teacherID?: string | null,
  date?: string | null,
  deliveredBy?: string | null,
  duration?: number | null,
  activity?: string | null,
  rating?: number | null,
  notes?: string | null,
  classroomID?: string | null,
  lessonID?: string | null,
};

export type ModelPELessonRecordConditionInput = {
  teacherID?: ModelIDInput | null,
  date?: ModelStringInput | null,
  deliveredBy?: ModelStringInput | null,
  duration?: ModelIntInput | null,
  activity?: ModelStringInput | null,
  rating?: ModelIntInput | null,
  notes?: ModelStringInput | null,
  classroomID?: ModelIDInput | null,
  lessonID?: ModelIDInput | null,
  and?: Array< ModelPELessonRecordConditionInput | null > | null,
  or?: Array< ModelPELessonRecordConditionInput | null > | null,
  not?: ModelPELessonRecordConditionInput | null,
};

export type UpdatePELessonRecordInput = {
  id: string,
  teacherID?: string | null,
  date?: string | null,
  deliveredBy?: string | null,
  duration?: number | null,
  activity?: string | null,
  rating?: number | null,
  notes?: string | null,
  classroomID?: string | null,
  lessonID?: string | null,
};

export type DeletePELessonRecordInput = {
  id: string,
};

export type CreateOrganizationInput = {
  id?: string | null,
  name?: string | null,
  type?: string | null,
};

export type ModelOrganizationConditionInput = {
  name?: ModelStringInput | null,
  type?: ModelStringInput | null,
  and?: Array< ModelOrganizationConditionInput | null > | null,
  or?: Array< ModelOrganizationConditionInput | null > | null,
  not?: ModelOrganizationConditionInput | null,
};

export type UpdateOrganizationInput = {
  id: string,
  name?: string | null,
  type?: string | null,
};

export type DeleteOrganizationInput = {
  id: string,
};

export type CreatePupilInput = {
  id?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  schoolID?: string | null,
  schoolHouseID?: string | null,
};

export type ModelPupilConditionInput = {
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  schoolID?: ModelIDInput | null,
  schoolHouseID?: ModelIDInput | null,
  and?: Array< ModelPupilConditionInput | null > | null,
  or?: Array< ModelPupilConditionInput | null > | null,
  not?: ModelPupilConditionInput | null,
};

export type UpdatePupilInput = {
  id: string,
  firstName?: string | null,
  lastName?: string | null,
  schoolID?: string | null,
  schoolHouseID?: string | null,
};

export type DeletePupilInput = {
  id: string,
};

export type CreateInterventionInput = {
  id?: string | null,
  pupilID: string,
  message?: string | null,
};

export type ModelInterventionConditionInput = {
  pupilID?: ModelIDInput | null,
  message?: ModelStringInput | null,
  and?: Array< ModelInterventionConditionInput | null > | null,
  or?: Array< ModelInterventionConditionInput | null > | null,
  not?: ModelInterventionConditionInput | null,
};

export type UpdateInterventionInput = {
  id: string,
  pupilID?: string | null,
  message?: string | null,
};

export type DeleteInterventionInput = {
  id: string,
};

export type ModelFileFilterInput = {
  id?: ModelIDInput | null,
  key?: ModelStringInput | null,
  region?: ModelStringInput | null,
  bucket?: ModelStringInput | null,
  lessonID?: ModelIDInput | null,
  and?: Array< ModelFileFilterInput | null > | null,
  or?: Array< ModelFileFilterInput | null > | null,
  not?: ModelFileFilterInput | null,
};

export type ModelSectionFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  parentID?: ModelIDInput | null,
  imagePreviewID?: ModelIDInput | null,
  and?: Array< ModelSectionFilterInput | null > | null,
  or?: Array< ModelSectionFilterInput | null > | null,
  not?: ModelSectionFilterInput | null,
};

export type ModelSectionConnection = {
  __typename: "ModelSectionConnection",
  items:  Array<Section >,
  nextToken?: string | null,
};

export type ModelLessonFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  sectionID?: ModelIDInput | null,
  and?: Array< ModelLessonFilterInput | null > | null,
  or?: Array< ModelLessonFilterInput | null > | null,
  not?: ModelLessonFilterInput | null,
};

export type ModelSchoolHouseFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelSchoolHouseFilterInput | null > | null,
  or?: Array< ModelSchoolHouseFilterInput | null > | null,
  not?: ModelSchoolHouseFilterInput | null,
};

export type ModelSchoolHouseConnection = {
  __typename: "ModelSchoolHouseConnection",
  items:  Array<SchoolHouse >,
  nextToken?: string | null,
};

export type ModelClassroomLessonFilterInput = {
  id?: ModelIDInput | null,
  classroomID?: ModelIDInput | null,
  lessonID?: ModelIDInput | null,
  completed?: ModelBooleanInput | null,
  and?: Array< ModelClassroomLessonFilterInput | null > | null,
  or?: Array< ModelClassroomLessonFilterInput | null > | null,
  not?: ModelClassroomLessonFilterInput | null,
};

export type ModelClassroomLessonConnection = {
  __typename: "ModelClassroomLessonConnection",
  items:  Array<ClassroomLesson >,
  nextToken?: string | null,
};

export type ModelClassroomFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  schoolID?: ModelIDInput | null,
  yearGroupID?: ModelIDInput | null,
  and?: Array< ModelClassroomFilterInput | null > | null,
  or?: Array< ModelClassroomFilterInput | null > | null,
  not?: ModelClassroomFilterInput | null,
};

export type ModelSchoolFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  country?: ModelStringInput | null,
  region?: ModelStringInput | null,
  principal?: ModelStringInput | null,
  and?: Array< ModelSchoolFilterInput | null > | null,
  or?: Array< ModelSchoolFilterInput | null > | null,
  not?: ModelSchoolFilterInput | null,
};

export type ModelSchoolConnection = {
  __typename: "ModelSchoolConnection",
  items:  Array<School >,
  nextToken?: string | null,
};

export type ModelAttendanceFilterInput = {
  id?: ModelIDInput | null,
  present?: ModelBooleanInput | null,
  wasRewarded?: ModelBooleanInput | null,
  pupilID?: ModelIDInput | null,
  lessonID?: ModelIDInput | null,
  lessonRecordID?: ModelIDInput | null,
  and?: Array< ModelAttendanceFilterInput | null > | null,
  or?: Array< ModelAttendanceFilterInput | null > | null,
  not?: ModelAttendanceFilterInput | null,
};

export type ModelLessonTeacherFilterInput = {
  id?: ModelIDInput | null,
  teacherID?: ModelIDInput | null,
  lessonID?: ModelIDInput | null,
  score?: ModelIntInput | null,
  and?: Array< ModelLessonTeacherFilterInput | null > | null,
  or?: Array< ModelLessonTeacherFilterInput | null > | null,
  not?: ModelLessonTeacherFilterInput | null,
};

export type ModelTermFilterInput = {
  id?: ModelIDInput | null,
  nam?: ModelStringInput | null,
  startDate?: ModelStringInput | null,
  finishDate?: ModelStringInput | null,
  and?: Array< ModelTermFilterInput | null > | null,
  or?: Array< ModelTermFilterInput | null > | null,
  not?: ModelTermFilterInput | null,
};

export type ModelTermConnection = {
  __typename: "ModelTermConnection",
  items:  Array<Term >,
  nextToken?: string | null,
};

export type ModelSubjectFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelSubjectFilterInput | null > | null,
  or?: Array< ModelSubjectFilterInput | null > | null,
  not?: ModelSubjectFilterInput | null,
};

export type ModelSubjectConnection = {
  __typename: "ModelSubjectConnection",
  items:  Array<Subject >,
  nextToken?: string | null,
};

export type ModelCurriculumFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelCurriculumFilterInput | null > | null,
  or?: Array< ModelCurriculumFilterInput | null > | null,
  not?: ModelCurriculumFilterInput | null,
};

export type ModelCurriculumConnection = {
  __typename: "ModelCurriculumConnection",
  items:  Array<Curriculum >,
  nextToken?: string | null,
};

export type ModelParentFilterInput = {
  id?: ModelIDInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  email?: ModelStringInput | null,
  and?: Array< ModelParentFilterInput | null > | null,
  or?: Array< ModelParentFilterInput | null > | null,
  not?: ModelParentFilterInput | null,
};

export type ModelParentConnection = {
  __typename: "ModelParentConnection",
  items:  Array<Parent >,
  nextToken?: string | null,
};

export type ModelPrincipalFilterInput = {
  id?: ModelIDInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  email?: ModelStringInput | null,
  schoolID?: ModelIDInput | null,
  organizationID?: ModelIDInput | null,
  and?: Array< ModelPrincipalFilterInput | null > | null,
  or?: Array< ModelPrincipalFilterInput | null > | null,
  not?: ModelPrincipalFilterInput | null,
};

export type ModelTeacherFilterInput = {
  id?: ModelIDInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  email?: ModelStringInput | null,
  schoolID?: ModelIDInput | null,
  and?: Array< ModelTeacherFilterInput | null > | null,
  or?: Array< ModelTeacherFilterInput | null > | null,
  not?: ModelTeacherFilterInput | null,
};

export type ModelPELessonRecordFilterInput = {
  id?: ModelIDInput | null,
  teacherID?: ModelIDInput | null,
  date?: ModelStringInput | null,
  deliveredBy?: ModelStringInput | null,
  duration?: ModelIntInput | null,
  activity?: ModelStringInput | null,
  rating?: ModelIntInput | null,
  notes?: ModelStringInput | null,
  classroomID?: ModelIDInput | null,
  lessonID?: ModelIDInput | null,
  and?: Array< ModelPELessonRecordFilterInput | null > | null,
  or?: Array< ModelPELessonRecordFilterInput | null > | null,
  not?: ModelPELessonRecordFilterInput | null,
};

export type ModelOrganizationFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  type?: ModelStringInput | null,
  and?: Array< ModelOrganizationFilterInput | null > | null,
  or?: Array< ModelOrganizationFilterInput | null > | null,
  not?: ModelOrganizationFilterInput | null,
};

export type ModelOrganizationConnection = {
  __typename: "ModelOrganizationConnection",
  items:  Array<Organization >,
  nextToken?: string | null,
};

export type ModelPupilFilterInput = {
  id?: ModelIDInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  schoolID?: ModelIDInput | null,
  schoolHouseID?: ModelIDInput | null,
  and?: Array< ModelPupilFilterInput | null > | null,
  or?: Array< ModelPupilFilterInput | null > | null,
  not?: ModelPupilFilterInput | null,
};

export type ModelInterventionFilterInput = {
  id?: ModelIDInput | null,
  pupilID?: ModelIDInput | null,
  message?: ModelStringInput | null,
  and?: Array< ModelInterventionFilterInput | null > | null,
  or?: Array< ModelInterventionFilterInput | null > | null,
  not?: ModelInterventionFilterInput | null,
};

export type CreateFileMutationVariables = {
  input: CreateFileInput,
  condition?: ModelFileConditionInput | null,
};

export type CreateFileMutation = {
  createFile?:  {
    __typename: "File",
    id: string,
    key?: string | null,
    region?: string | null,
    bucket?: string | null,
    lessonID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateFileMutationVariables = {
  input: UpdateFileInput,
  condition?: ModelFileConditionInput | null,
};

export type UpdateFileMutation = {
  updateFile?:  {
    __typename: "File",
    id: string,
    key?: string | null,
    region?: string | null,
    bucket?: string | null,
    lessonID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteFileMutationVariables = {
  input: DeleteFileInput,
  condition?: ModelFileConditionInput | null,
};

export type DeleteFileMutation = {
  deleteFile?:  {
    __typename: "File",
    id: string,
    key?: string | null,
    region?: string | null,
    bucket?: string | null,
    lessonID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateSectionMutationVariables = {
  input: CreateSectionInput,
  condition?: ModelSectionConditionInput | null,
};

export type CreateSectionMutation = {
  createSection?:  {
    __typename: "Section",
    id: string,
    name?: string | null,
    parentID?: string | null,
    ParentSection?:  {
      __typename: "Section",
      id: string,
      name?: string | null,
      parentID?: string | null,
      imagePreviewID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    Lessons?:  {
      __typename: "ModelLessonConnection",
      nextToken?: string | null,
    } | null,
    imagePreviewID?: string | null,
    ImagePreview?:  {
      __typename: "File",
      id: string,
      key?: string | null,
      region?: string | null,
      bucket?: string | null,
      lessonID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateSectionMutationVariables = {
  input: UpdateSectionInput,
  condition?: ModelSectionConditionInput | null,
};

export type UpdateSectionMutation = {
  updateSection?:  {
    __typename: "Section",
    id: string,
    name?: string | null,
    parentID?: string | null,
    ParentSection?:  {
      __typename: "Section",
      id: string,
      name?: string | null,
      parentID?: string | null,
      imagePreviewID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    Lessons?:  {
      __typename: "ModelLessonConnection",
      nextToken?: string | null,
    } | null,
    imagePreviewID?: string | null,
    ImagePreview?:  {
      __typename: "File",
      id: string,
      key?: string | null,
      region?: string | null,
      bucket?: string | null,
      lessonID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteSectionMutationVariables = {
  input: DeleteSectionInput,
  condition?: ModelSectionConditionInput | null,
};

export type DeleteSectionMutation = {
  deleteSection?:  {
    __typename: "Section",
    id: string,
    name?: string | null,
    parentID?: string | null,
    ParentSection?:  {
      __typename: "Section",
      id: string,
      name?: string | null,
      parentID?: string | null,
      imagePreviewID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    Lessons?:  {
      __typename: "ModelLessonConnection",
      nextToken?: string | null,
    } | null,
    imagePreviewID?: string | null,
    ImagePreview?:  {
      __typename: "File",
      id: string,
      key?: string | null,
      region?: string | null,
      bucket?: string | null,
      lessonID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateLessonMutationVariables = {
  input: CreateLessonInput,
  condition?: ModelLessonConditionInput | null,
};

export type CreateLessonMutation = {
  createLesson?:  {
    __typename: "Lesson",
    id: string,
    title?: string | null,
    description?: string | null,
    sectionID?: string | null,
    Section?:  {
      __typename: "Section",
      id: string,
      name?: string | null,
      parentID?: string | null,
      imagePreviewID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    terms?:  {
      __typename: "ModelTermLessonConnection",
      nextToken?: string | null,
    } | null,
    Attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    Files?:  {
      __typename: "ModelFileConnection",
      nextToken?: string | null,
    } | null,
    LessonTeacher?:  {
      __typename: "ModelLessonTeacherConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    LessonsRecords?:  {
      __typename: "ModelPELessonRecordConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type UpdateLessonMutationVariables = {
  input: UpdateLessonInput,
  condition?: ModelLessonConditionInput | null,
};

export type UpdateLessonMutation = {
  updateLesson?:  {
    __typename: "Lesson",
    id: string,
    title?: string | null,
    description?: string | null,
    sectionID?: string | null,
    Section?:  {
      __typename: "Section",
      id: string,
      name?: string | null,
      parentID?: string | null,
      imagePreviewID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    terms?:  {
      __typename: "ModelTermLessonConnection",
      nextToken?: string | null,
    } | null,
    Attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    Files?:  {
      __typename: "ModelFileConnection",
      nextToken?: string | null,
    } | null,
    LessonTeacher?:  {
      __typename: "ModelLessonTeacherConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    LessonsRecords?:  {
      __typename: "ModelPELessonRecordConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeleteLessonMutationVariables = {
  input: DeleteLessonInput,
  condition?: ModelLessonConditionInput | null,
};

export type DeleteLessonMutation = {
  deleteLesson?:  {
    __typename: "Lesson",
    id: string,
    title?: string | null,
    description?: string | null,
    sectionID?: string | null,
    Section?:  {
      __typename: "Section",
      id: string,
      name?: string | null,
      parentID?: string | null,
      imagePreviewID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    terms?:  {
      __typename: "ModelTermLessonConnection",
      nextToken?: string | null,
    } | null,
    Attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    Files?:  {
      __typename: "ModelFileConnection",
      nextToken?: string | null,
    } | null,
    LessonTeacher?:  {
      __typename: "ModelLessonTeacherConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    LessonsRecords?:  {
      __typename: "ModelPELessonRecordConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type CreateSchoolHouseMutationVariables = {
  input: CreateSchoolHouseInput,
  condition?: ModelSchoolHouseConditionInput | null,
};

export type CreateSchoolHouseMutation = {
  createSchoolHouse?:  {
    __typename: "SchoolHouse",
    id: string,
    name?: string | null,
    createdAt: string,
    updatedAt: string,
    Pupils?:  {
      __typename: "ModelPupilConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type UpdateSchoolHouseMutationVariables = {
  input: UpdateSchoolHouseInput,
  condition?: ModelSchoolHouseConditionInput | null,
};

export type UpdateSchoolHouseMutation = {
  updateSchoolHouse?:  {
    __typename: "SchoolHouse",
    id: string,
    name?: string | null,
    createdAt: string,
    updatedAt: string,
    Pupils?:  {
      __typename: "ModelPupilConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeleteSchoolHouseMutationVariables = {
  input: DeleteSchoolHouseInput,
  condition?: ModelSchoolHouseConditionInput | null,
};

export type DeleteSchoolHouseMutation = {
  deleteSchoolHouse?:  {
    __typename: "SchoolHouse",
    id: string,
    name?: string | null,
    createdAt: string,
    updatedAt: string,
    Pupils?:  {
      __typename: "ModelPupilConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type CreateClassroomLessonMutationVariables = {
  input: CreateClassroomLessonInput,
  condition?: ModelClassroomLessonConditionInput | null,
};

export type CreateClassroomLessonMutation = {
  createClassroomLesson?:  {
    __typename: "ClassroomLesson",
    id: string,
    classroomID?: string | null,
    lessonID?: string | null,
    Classroom?:  {
      __typename: "Classroom",
      id: string,
      name?: string | null,
      schoolID?: string | null,
      yearGroupID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    Lesson?:  {
      __typename: "Lesson",
      id: string,
      title?: string | null,
      description?: string | null,
      sectionID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    completed?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateClassroomLessonMutationVariables = {
  input: UpdateClassroomLessonInput,
  condition?: ModelClassroomLessonConditionInput | null,
};

export type UpdateClassroomLessonMutation = {
  updateClassroomLesson?:  {
    __typename: "ClassroomLesson",
    id: string,
    classroomID?: string | null,
    lessonID?: string | null,
    Classroom?:  {
      __typename: "Classroom",
      id: string,
      name?: string | null,
      schoolID?: string | null,
      yearGroupID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    Lesson?:  {
      __typename: "Lesson",
      id: string,
      title?: string | null,
      description?: string | null,
      sectionID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    completed?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteClassroomLessonMutationVariables = {
  input: DeleteClassroomLessonInput,
  condition?: ModelClassroomLessonConditionInput | null,
};

export type DeleteClassroomLessonMutation = {
  deleteClassroomLesson?:  {
    __typename: "ClassroomLesson",
    id: string,
    classroomID?: string | null,
    lessonID?: string | null,
    Classroom?:  {
      __typename: "Classroom",
      id: string,
      name?: string | null,
      schoolID?: string | null,
      yearGroupID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    Lesson?:  {
      __typename: "Lesson",
      id: string,
      title?: string | null,
      description?: string | null,
      sectionID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    completed?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateClassroomMutationVariables = {
  input: CreateClassroomInput,
  condition?: ModelClassroomConditionInput | null,
};

export type CreateClassroomMutation = {
  createClassroom?:  {
    __typename: "Classroom",
    id: string,
    name?: string | null,
    teachers?:  {
      __typename: "ModelTeacherClassroomConnection",
      nextToken?: string | null,
    } | null,
    pupils?:  {
      __typename: "ModelPupilClassroomConnection",
      nextToken?: string | null,
    } | null,
    schoolID?: string | null,
    school?:  {
      __typename: "School",
      id: string,
      name?: string | null,
      country?: string | null,
      region?: string | null,
      principal?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    yearGroupID?: string | null,
    yearGroup?:  {
      __typename: "Curriculum",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateClassroomMutationVariables = {
  input: UpdateClassroomInput,
  condition?: ModelClassroomConditionInput | null,
};

export type UpdateClassroomMutation = {
  updateClassroom?:  {
    __typename: "Classroom",
    id: string,
    name?: string | null,
    teachers?:  {
      __typename: "ModelTeacherClassroomConnection",
      nextToken?: string | null,
    } | null,
    pupils?:  {
      __typename: "ModelPupilClassroomConnection",
      nextToken?: string | null,
    } | null,
    schoolID?: string | null,
    school?:  {
      __typename: "School",
      id: string,
      name?: string | null,
      country?: string | null,
      region?: string | null,
      principal?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    yearGroupID?: string | null,
    yearGroup?:  {
      __typename: "Curriculum",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteClassroomMutationVariables = {
  input: DeleteClassroomInput,
  condition?: ModelClassroomConditionInput | null,
};

export type DeleteClassroomMutation = {
  deleteClassroom?:  {
    __typename: "Classroom",
    id: string,
    name?: string | null,
    teachers?:  {
      __typename: "ModelTeacherClassroomConnection",
      nextToken?: string | null,
    } | null,
    pupils?:  {
      __typename: "ModelPupilClassroomConnection",
      nextToken?: string | null,
    } | null,
    schoolID?: string | null,
    school?:  {
      __typename: "School",
      id: string,
      name?: string | null,
      country?: string | null,
      region?: string | null,
      principal?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    yearGroupID?: string | null,
    yearGroup?:  {
      __typename: "Curriculum",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateTeacherClassroomMutationVariables = {
  input: CreateTeacherClassroomInput,
  condition?: ModelTeacherClassroomConditionInput | null,
};

export type CreateTeacherClassroomMutation = {
  createTeacherClassroom?:  {
    __typename: "TeacherClassroom",
    id: string,
    teacherID: string,
    classroomID: string,
    teacher:  {
      __typename: "Teacher",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      schoolID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    classroom:  {
      __typename: "Classroom",
      id: string,
      name?: string | null,
      schoolID?: string | null,
      yearGroupID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTeacherClassroomMutationVariables = {
  input: UpdateTeacherClassroomInput,
  condition?: ModelTeacherClassroomConditionInput | null,
};

export type UpdateTeacherClassroomMutation = {
  updateTeacherClassroom?:  {
    __typename: "TeacherClassroom",
    id: string,
    teacherID: string,
    classroomID: string,
    teacher:  {
      __typename: "Teacher",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      schoolID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    classroom:  {
      __typename: "Classroom",
      id: string,
      name?: string | null,
      schoolID?: string | null,
      yearGroupID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTeacherClassroomMutationVariables = {
  input: DeleteTeacherClassroomInput,
  condition?: ModelTeacherClassroomConditionInput | null,
};

export type DeleteTeacherClassroomMutation = {
  deleteTeacherClassroom?:  {
    __typename: "TeacherClassroom",
    id: string,
    teacherID: string,
    classroomID: string,
    teacher:  {
      __typename: "Teacher",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      schoolID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    classroom:  {
      __typename: "Classroom",
      id: string,
      name?: string | null,
      schoolID?: string | null,
      yearGroupID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePupilClassroomMutationVariables = {
  input: CreatePupilClassroomInput,
  condition?: ModelPupilClassroomConditionInput | null,
};

export type CreatePupilClassroomMutation = {
  createPupilClassroom?:  {
    __typename: "PupilClassroom",
    id: string,
    pupilID: string,
    classroomID: string,
    classroom:  {
      __typename: "Classroom",
      id: string,
      name?: string | null,
      schoolID?: string | null,
      yearGroupID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    pupil:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type UpdatePupilClassroomMutationVariables = {
  input: UpdatePupilClassroomInput,
  condition?: ModelPupilClassroomConditionInput | null,
};

export type UpdatePupilClassroomMutation = {
  updatePupilClassroom?:  {
    __typename: "PupilClassroom",
    id: string,
    pupilID: string,
    classroomID: string,
    classroom:  {
      __typename: "Classroom",
      id: string,
      name?: string | null,
      schoolID?: string | null,
      yearGroupID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    pupil:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type DeletePupilClassroomMutationVariables = {
  input: DeletePupilClassroomInput,
  condition?: ModelPupilClassroomConditionInput | null,
};

export type DeletePupilClassroomMutation = {
  deletePupilClassroom?:  {
    __typename: "PupilClassroom",
    id: string,
    pupilID: string,
    classroomID: string,
    classroom:  {
      __typename: "Classroom",
      id: string,
      name?: string | null,
      schoolID?: string | null,
      yearGroupID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    pupil:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type CreateSchoolMutationVariables = {
  input: CreateSchoolInput,
  condition?: ModelSchoolConditionInput | null,
};

export type CreateSchoolMutation = {
  createSchool?:  {
    __typename: "School",
    id: string,
    name?: string | null,
    country?: string | null,
    region?: string | null,
    principal?: string | null,
    Teachers?:  {
      __typename: "ModelTeacherConnection",
      nextToken?: string | null,
    } | null,
    Principals?:  {
      __typename: "ModelPrincipalConnection",
      nextToken?: string | null,
    } | null,
    classrooms?:  {
      __typename: "ModelClassroomConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    Pupils?:  {
      __typename: "ModelPupilConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type UpdateSchoolMutationVariables = {
  input: UpdateSchoolInput,
  condition?: ModelSchoolConditionInput | null,
};

export type UpdateSchoolMutation = {
  updateSchool?:  {
    __typename: "School",
    id: string,
    name?: string | null,
    country?: string | null,
    region?: string | null,
    principal?: string | null,
    Teachers?:  {
      __typename: "ModelTeacherConnection",
      nextToken?: string | null,
    } | null,
    Principals?:  {
      __typename: "ModelPrincipalConnection",
      nextToken?: string | null,
    } | null,
    classrooms?:  {
      __typename: "ModelClassroomConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    Pupils?:  {
      __typename: "ModelPupilConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeleteSchoolMutationVariables = {
  input: DeleteSchoolInput,
  condition?: ModelSchoolConditionInput | null,
};

export type DeleteSchoolMutation = {
  deleteSchool?:  {
    __typename: "School",
    id: string,
    name?: string | null,
    country?: string | null,
    region?: string | null,
    principal?: string | null,
    Teachers?:  {
      __typename: "ModelTeacherConnection",
      nextToken?: string | null,
    } | null,
    Principals?:  {
      __typename: "ModelPrincipalConnection",
      nextToken?: string | null,
    } | null,
    classrooms?:  {
      __typename: "ModelClassroomConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    Pupils?:  {
      __typename: "ModelPupilConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type CreateAttendanceMutationVariables = {
  input: CreateAttendanceInput,
  condition?: ModelAttendanceConditionInput | null,
};

export type CreateAttendanceMutation = {
  createAttendance?:  {
    __typename: "Attendance",
    id: string,
    present?: boolean | null,
    wasRewarded?: boolean | null,
    pupilID?: string | null,
    lessonID?: string | null,
    Lesson?:  {
      __typename: "Lesson",
      id: string,
      title?: string | null,
      description?: string | null,
      sectionID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    lessonRecordID?: string | null,
    createdAt: string,
    updatedAt: string,
    lessonRecord?:  {
      __typename: "PELessonRecord",
      id: string,
      teacherID?: string | null,
      date?: string | null,
      deliveredBy?: string | null,
      duration?: number | null,
      activity?: string | null,
      rating?: number | null,
      notes?: string | null,
      classroomID?: string | null,
      lessonID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    Pupil?:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type UpdateAttendanceMutationVariables = {
  input: UpdateAttendanceInput,
  condition?: ModelAttendanceConditionInput | null,
};

export type UpdateAttendanceMutation = {
  updateAttendance?:  {
    __typename: "Attendance",
    id: string,
    present?: boolean | null,
    wasRewarded?: boolean | null,
    pupilID?: string | null,
    lessonID?: string | null,
    Lesson?:  {
      __typename: "Lesson",
      id: string,
      title?: string | null,
      description?: string | null,
      sectionID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    lessonRecordID?: string | null,
    createdAt: string,
    updatedAt: string,
    lessonRecord?:  {
      __typename: "PELessonRecord",
      id: string,
      teacherID?: string | null,
      date?: string | null,
      deliveredBy?: string | null,
      duration?: number | null,
      activity?: string | null,
      rating?: number | null,
      notes?: string | null,
      classroomID?: string | null,
      lessonID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    Pupil?:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type DeleteAttendanceMutationVariables = {
  input: DeleteAttendanceInput,
  condition?: ModelAttendanceConditionInput | null,
};

export type DeleteAttendanceMutation = {
  deleteAttendance?:  {
    __typename: "Attendance",
    id: string,
    present?: boolean | null,
    wasRewarded?: boolean | null,
    pupilID?: string | null,
    lessonID?: string | null,
    Lesson?:  {
      __typename: "Lesson",
      id: string,
      title?: string | null,
      description?: string | null,
      sectionID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    lessonRecordID?: string | null,
    createdAt: string,
    updatedAt: string,
    lessonRecord?:  {
      __typename: "PELessonRecord",
      id: string,
      teacherID?: string | null,
      date?: string | null,
      deliveredBy?: string | null,
      duration?: number | null,
      activity?: string | null,
      rating?: number | null,
      notes?: string | null,
      classroomID?: string | null,
      lessonID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    Pupil?:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type CreateLessonTeacherMutationVariables = {
  input: CreateLessonTeacherInput,
  condition?: ModelLessonTeacherConditionInput | null,
};

export type CreateLessonTeacherMutation = {
  createLessonTeacher?:  {
    __typename: "LessonTeacher",
    id: string,
    teacherID?: string | null,
    lessonID?: string | null,
    Teacher?:  {
      __typename: "Teacher",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      schoolID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    Lesson?:  {
      __typename: "Lesson",
      id: string,
      title?: string | null,
      description?: string | null,
      sectionID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    score?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateLessonTeacherMutationVariables = {
  input: UpdateLessonTeacherInput,
  condition?: ModelLessonTeacherConditionInput | null,
};

export type UpdateLessonTeacherMutation = {
  updateLessonTeacher?:  {
    __typename: "LessonTeacher",
    id: string,
    teacherID?: string | null,
    lessonID?: string | null,
    Teacher?:  {
      __typename: "Teacher",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      schoolID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    Lesson?:  {
      __typename: "Lesson",
      id: string,
      title?: string | null,
      description?: string | null,
      sectionID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    score?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteLessonTeacherMutationVariables = {
  input: DeleteLessonTeacherInput,
  condition?: ModelLessonTeacherConditionInput | null,
};

export type DeleteLessonTeacherMutation = {
  deleteLessonTeacher?:  {
    __typename: "LessonTeacher",
    id: string,
    teacherID?: string | null,
    lessonID?: string | null,
    Teacher?:  {
      __typename: "Teacher",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      schoolID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    Lesson?:  {
      __typename: "Lesson",
      id: string,
      title?: string | null,
      description?: string | null,
      sectionID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    score?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateTermMutationVariables = {
  input: CreateTermInput,
  condition?: ModelTermConditionInput | null,
};

export type CreateTermMutation = {
  createTerm?:  {
    __typename: "Term",
    id: string,
    nam?: string | null,
    startDate?: string | null,
    finishDate?: string | null,
    subjects?:  {
      __typename: "ModelSubjectTermConnection",
      nextToken?: string | null,
    } | null,
    TermLessons?:  {
      __typename: "ModelTermLessonConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTermMutationVariables = {
  input: UpdateTermInput,
  condition?: ModelTermConditionInput | null,
};

export type UpdateTermMutation = {
  updateTerm?:  {
    __typename: "Term",
    id: string,
    nam?: string | null,
    startDate?: string | null,
    finishDate?: string | null,
    subjects?:  {
      __typename: "ModelSubjectTermConnection",
      nextToken?: string | null,
    } | null,
    TermLessons?:  {
      __typename: "ModelTermLessonConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTermMutationVariables = {
  input: DeleteTermInput,
  condition?: ModelTermConditionInput | null,
};

export type DeleteTermMutation = {
  deleteTerm?:  {
    __typename: "Term",
    id: string,
    nam?: string | null,
    startDate?: string | null,
    finishDate?: string | null,
    subjects?:  {
      __typename: "ModelSubjectTermConnection",
      nextToken?: string | null,
    } | null,
    TermLessons?:  {
      __typename: "ModelTermLessonConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateSubjectMutationVariables = {
  input: CreateSubjectInput,
  condition?: ModelSubjectConditionInput | null,
};

export type CreateSubjectMutation = {
  createSubject?:  {
    __typename: "Subject",
    id: string,
    name?: string | null,
    SubjectTerms?:  {
      __typename: "ModelSubjectTermConnection",
      nextToken?: string | null,
    } | null,
    curriculums?:  {
      __typename: "ModelCurriculumSubjectConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateSubjectMutationVariables = {
  input: UpdateSubjectInput,
  condition?: ModelSubjectConditionInput | null,
};

export type UpdateSubjectMutation = {
  updateSubject?:  {
    __typename: "Subject",
    id: string,
    name?: string | null,
    SubjectTerms?:  {
      __typename: "ModelSubjectTermConnection",
      nextToken?: string | null,
    } | null,
    curriculums?:  {
      __typename: "ModelCurriculumSubjectConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteSubjectMutationVariables = {
  input: DeleteSubjectInput,
  condition?: ModelSubjectConditionInput | null,
};

export type DeleteSubjectMutation = {
  deleteSubject?:  {
    __typename: "Subject",
    id: string,
    name?: string | null,
    SubjectTerms?:  {
      __typename: "ModelSubjectTermConnection",
      nextToken?: string | null,
    } | null,
    curriculums?:  {
      __typename: "ModelCurriculumSubjectConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCurriculumMutationVariables = {
  input: CreateCurriculumInput,
  condition?: ModelCurriculumConditionInput | null,
};

export type CreateCurriculumMutation = {
  createCurriculum?:  {
    __typename: "Curriculum",
    id: string,
    name?: string | null,
    subjects?:  {
      __typename: "ModelCurriculumSubjectConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCurriculumMutationVariables = {
  input: UpdateCurriculumInput,
  condition?: ModelCurriculumConditionInput | null,
};

export type UpdateCurriculumMutation = {
  updateCurriculum?:  {
    __typename: "Curriculum",
    id: string,
    name?: string | null,
    subjects?:  {
      __typename: "ModelCurriculumSubjectConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCurriculumMutationVariables = {
  input: DeleteCurriculumInput,
  condition?: ModelCurriculumConditionInput | null,
};

export type DeleteCurriculumMutation = {
  deleteCurriculum?:  {
    __typename: "Curriculum",
    id: string,
    name?: string | null,
    subjects?:  {
      __typename: "ModelCurriculumSubjectConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateParentMutationVariables = {
  input: CreateParentInput,
  condition?: ModelParentConditionInput | null,
};

export type CreateParentMutation = {
  createParent?:  {
    __typename: "Parent",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    children?:  {
      __typename: "ModelPupilParentConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateParentMutationVariables = {
  input: UpdateParentInput,
  condition?: ModelParentConditionInput | null,
};

export type UpdateParentMutation = {
  updateParent?:  {
    __typename: "Parent",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    children?:  {
      __typename: "ModelPupilParentConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteParentMutationVariables = {
  input: DeleteParentInput,
  condition?: ModelParentConditionInput | null,
};

export type DeleteParentMutation = {
  deleteParent?:  {
    __typename: "Parent",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    children?:  {
      __typename: "ModelPupilParentConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePupilParentMutationVariables = {
  input: CreatePupilParentInput,
  condition?: ModelPupilParentConditionInput | null,
};

export type CreatePupilParentMutation = {
  createPupilParent?:  {
    __typename: "PupilParent",
    id: string,
    pupilID: string,
    parentID: string,
    Parent:  {
      __typename: "Parent",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    Pupil:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type UpdatePupilParentMutationVariables = {
  input: UpdatePupilParentInput,
  condition?: ModelPupilParentConditionInput | null,
};

export type UpdatePupilParentMutation = {
  updatePupilParent?:  {
    __typename: "PupilParent",
    id: string,
    pupilID: string,
    parentID: string,
    Parent:  {
      __typename: "Parent",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    Pupil:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type DeletePupilParentMutationVariables = {
  input: DeletePupilParentInput,
  condition?: ModelPupilParentConditionInput | null,
};

export type DeletePupilParentMutation = {
  deletePupilParent?:  {
    __typename: "PupilParent",
    id: string,
    pupilID: string,
    parentID: string,
    Parent:  {
      __typename: "Parent",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    Pupil:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type CreatePrincipalMutationVariables = {
  input: CreatePrincipalInput,
  condition?: ModelPrincipalConditionInput | null,
};

export type CreatePrincipalMutation = {
  createPrincipal?:  {
    __typename: "Principal",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    schoolID?: string | null,
    School?:  {
      __typename: "School",
      id: string,
      name?: string | null,
      country?: string | null,
      region?: string | null,
      principal?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    organizationID?: string | null,
    createdAt: string,
    updatedAt: string,
    Organization?:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type UpdatePrincipalMutationVariables = {
  input: UpdatePrincipalInput,
  condition?: ModelPrincipalConditionInput | null,
};

export type UpdatePrincipalMutation = {
  updatePrincipal?:  {
    __typename: "Principal",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    schoolID?: string | null,
    School?:  {
      __typename: "School",
      id: string,
      name?: string | null,
      country?: string | null,
      region?: string | null,
      principal?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    organizationID?: string | null,
    createdAt: string,
    updatedAt: string,
    Organization?:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type DeletePrincipalMutationVariables = {
  input: DeletePrincipalInput,
  condition?: ModelPrincipalConditionInput | null,
};

export type DeletePrincipalMutation = {
  deletePrincipal?:  {
    __typename: "Principal",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    schoolID?: string | null,
    School?:  {
      __typename: "School",
      id: string,
      name?: string | null,
      country?: string | null,
      region?: string | null,
      principal?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    organizationID?: string | null,
    createdAt: string,
    updatedAt: string,
    Organization?:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type CreateTeacherMutationVariables = {
  input: CreateTeacherInput,
  condition?: ModelTeacherConditionInput | null,
};

export type CreateTeacherMutation = {
  createTeacher?:  {
    __typename: "Teacher",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    schoolID?: string | null,
    classrooms?:  {
      __typename: "ModelTeacherClassroomConnection",
      nextToken?: string | null,
    } | null,
    LessonTeacher?:  {
      __typename: "ModelLessonTeacherConnection",
      nextToken?: string | null,
    } | null,
    School?:  {
      __typename: "School",
      id: string,
      name?: string | null,
      country?: string | null,
      region?: string | null,
      principal?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTeacherMutationVariables = {
  input: UpdateTeacherInput,
  condition?: ModelTeacherConditionInput | null,
};

export type UpdateTeacherMutation = {
  updateTeacher?:  {
    __typename: "Teacher",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    schoolID?: string | null,
    classrooms?:  {
      __typename: "ModelTeacherClassroomConnection",
      nextToken?: string | null,
    } | null,
    LessonTeacher?:  {
      __typename: "ModelLessonTeacherConnection",
      nextToken?: string | null,
    } | null,
    School?:  {
      __typename: "School",
      id: string,
      name?: string | null,
      country?: string | null,
      region?: string | null,
      principal?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTeacherMutationVariables = {
  input: DeleteTeacherInput,
  condition?: ModelTeacherConditionInput | null,
};

export type DeleteTeacherMutation = {
  deleteTeacher?:  {
    __typename: "Teacher",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    schoolID?: string | null,
    classrooms?:  {
      __typename: "ModelTeacherClassroomConnection",
      nextToken?: string | null,
    } | null,
    LessonTeacher?:  {
      __typename: "ModelLessonTeacherConnection",
      nextToken?: string | null,
    } | null,
    School?:  {
      __typename: "School",
      id: string,
      name?: string | null,
      country?: string | null,
      region?: string | null,
      principal?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateSubjectTermMutationVariables = {
  input: CreateSubjectTermInput,
  condition?: ModelSubjectTermConditionInput | null,
};

export type CreateSubjectTermMutation = {
  createSubjectTerm?:  {
    __typename: "SubjectTerm",
    id: string,
    subjectID: string,
    termID: string,
    subject:  {
      __typename: "Subject",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    term:  {
      __typename: "Term",
      id: string,
      nam?: string | null,
      startDate?: string | null,
      finishDate?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateSubjectTermMutationVariables = {
  input: UpdateSubjectTermInput,
  condition?: ModelSubjectTermConditionInput | null,
};

export type UpdateSubjectTermMutation = {
  updateSubjectTerm?:  {
    __typename: "SubjectTerm",
    id: string,
    subjectID: string,
    termID: string,
    subject:  {
      __typename: "Subject",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    term:  {
      __typename: "Term",
      id: string,
      nam?: string | null,
      startDate?: string | null,
      finishDate?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteSubjectTermMutationVariables = {
  input: DeleteSubjectTermInput,
  condition?: ModelSubjectTermConditionInput | null,
};

export type DeleteSubjectTermMutation = {
  deleteSubjectTerm?:  {
    __typename: "SubjectTerm",
    id: string,
    subjectID: string,
    termID: string,
    subject:  {
      __typename: "Subject",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    term:  {
      __typename: "Term",
      id: string,
      nam?: string | null,
      startDate?: string | null,
      finishDate?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateTermLessonMutationVariables = {
  input: CreateTermLessonInput,
  condition?: ModelTermLessonConditionInput | null,
};

export type CreateTermLessonMutation = {
  createTermLesson?:  {
    __typename: "TermLesson",
    id: string,
    termID: string,
    lessonID: string,
    term:  {
      __typename: "Term",
      id: string,
      nam?: string | null,
      startDate?: string | null,
      finishDate?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    lesson:  {
      __typename: "Lesson",
      id: string,
      title?: string | null,
      description?: string | null,
      sectionID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTermLessonMutationVariables = {
  input: UpdateTermLessonInput,
  condition?: ModelTermLessonConditionInput | null,
};

export type UpdateTermLessonMutation = {
  updateTermLesson?:  {
    __typename: "TermLesson",
    id: string,
    termID: string,
    lessonID: string,
    term:  {
      __typename: "Term",
      id: string,
      nam?: string | null,
      startDate?: string | null,
      finishDate?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    lesson:  {
      __typename: "Lesson",
      id: string,
      title?: string | null,
      description?: string | null,
      sectionID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTermLessonMutationVariables = {
  input: DeleteTermLessonInput,
  condition?: ModelTermLessonConditionInput | null,
};

export type DeleteTermLessonMutation = {
  deleteTermLesson?:  {
    __typename: "TermLesson",
    id: string,
    termID: string,
    lessonID: string,
    term:  {
      __typename: "Term",
      id: string,
      nam?: string | null,
      startDate?: string | null,
      finishDate?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    lesson:  {
      __typename: "Lesson",
      id: string,
      title?: string | null,
      description?: string | null,
      sectionID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCurriculumSubjectMutationVariables = {
  input: CreateCurriculumSubjectInput,
  condition?: ModelCurriculumSubjectConditionInput | null,
};

export type CreateCurriculumSubjectMutation = {
  createCurriculumSubject?:  {
    __typename: "CurriculumSubject",
    id: string,
    curriculumID: string,
    subjectID: string,
    curriculum:  {
      __typename: "Curriculum",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    subject:  {
      __typename: "Subject",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCurriculumSubjectMutationVariables = {
  input: UpdateCurriculumSubjectInput,
  condition?: ModelCurriculumSubjectConditionInput | null,
};

export type UpdateCurriculumSubjectMutation = {
  updateCurriculumSubject?:  {
    __typename: "CurriculumSubject",
    id: string,
    curriculumID: string,
    subjectID: string,
    curriculum:  {
      __typename: "Curriculum",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    subject:  {
      __typename: "Subject",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCurriculumSubjectMutationVariables = {
  input: DeleteCurriculumSubjectInput,
  condition?: ModelCurriculumSubjectConditionInput | null,
};

export type DeleteCurriculumSubjectMutation = {
  deleteCurriculumSubject?:  {
    __typename: "CurriculumSubject",
    id: string,
    curriculumID: string,
    subjectID: string,
    curriculum:  {
      __typename: "Curriculum",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    subject:  {
      __typename: "Subject",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePELessonRecordMutationVariables = {
  input: CreatePELessonRecordInput,
  condition?: ModelPELessonRecordConditionInput | null,
};

export type CreatePELessonRecordMutation = {
  createPELessonRecord?:  {
    __typename: "PELessonRecord",
    id: string,
    teacherID?: string | null,
    Teacher?:  {
      __typename: "Teacher",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      schoolID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    Attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    date?: string | null,
    deliveredBy?: string | null,
    duration?: number | null,
    activity?: string | null,
    rating?: number | null,
    notes?: string | null,
    classroomID?: string | null,
    Classroom?:  {
      __typename: "Classroom",
      id: string,
      name?: string | null,
      schoolID?: string | null,
      yearGroupID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    lessonID?: string | null,
    Lesson?:  {
      __typename: "Lesson",
      id: string,
      title?: string | null,
      description?: string | null,
      sectionID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePELessonRecordMutationVariables = {
  input: UpdatePELessonRecordInput,
  condition?: ModelPELessonRecordConditionInput | null,
};

export type UpdatePELessonRecordMutation = {
  updatePELessonRecord?:  {
    __typename: "PELessonRecord",
    id: string,
    teacherID?: string | null,
    Teacher?:  {
      __typename: "Teacher",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      schoolID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    Attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    date?: string | null,
    deliveredBy?: string | null,
    duration?: number | null,
    activity?: string | null,
    rating?: number | null,
    notes?: string | null,
    classroomID?: string | null,
    Classroom?:  {
      __typename: "Classroom",
      id: string,
      name?: string | null,
      schoolID?: string | null,
      yearGroupID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    lessonID?: string | null,
    Lesson?:  {
      __typename: "Lesson",
      id: string,
      title?: string | null,
      description?: string | null,
      sectionID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePELessonRecordMutationVariables = {
  input: DeletePELessonRecordInput,
  condition?: ModelPELessonRecordConditionInput | null,
};

export type DeletePELessonRecordMutation = {
  deletePELessonRecord?:  {
    __typename: "PELessonRecord",
    id: string,
    teacherID?: string | null,
    Teacher?:  {
      __typename: "Teacher",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      schoolID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    Attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    date?: string | null,
    deliveredBy?: string | null,
    duration?: number | null,
    activity?: string | null,
    rating?: number | null,
    notes?: string | null,
    classroomID?: string | null,
    Classroom?:  {
      __typename: "Classroom",
      id: string,
      name?: string | null,
      schoolID?: string | null,
      yearGroupID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    lessonID?: string | null,
    Lesson?:  {
      __typename: "Lesson",
      id: string,
      title?: string | null,
      description?: string | null,
      sectionID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateOrganizationMutationVariables = {
  input: CreateOrganizationInput,
  condition?: ModelOrganizationConditionInput | null,
};

export type CreateOrganizationMutation = {
  createOrganization?:  {
    __typename: "Organization",
    id: string,
    name?: string | null,
    Principals?:  {
      __typename: "ModelPrincipalConnection",
      nextToken?: string | null,
    } | null,
    type?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateOrganizationMutationVariables = {
  input: UpdateOrganizationInput,
  condition?: ModelOrganizationConditionInput | null,
};

export type UpdateOrganizationMutation = {
  updateOrganization?:  {
    __typename: "Organization",
    id: string,
    name?: string | null,
    Principals?:  {
      __typename: "ModelPrincipalConnection",
      nextToken?: string | null,
    } | null,
    type?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteOrganizationMutationVariables = {
  input: DeleteOrganizationInput,
  condition?: ModelOrganizationConditionInput | null,
};

export type DeleteOrganizationMutation = {
  deleteOrganization?:  {
    __typename: "Organization",
    id: string,
    name?: string | null,
    Principals?:  {
      __typename: "ModelPrincipalConnection",
      nextToken?: string | null,
    } | null,
    type?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePupilMutationVariables = {
  input: CreatePupilInput,
  condition?: ModelPupilConditionInput | null,
};

export type CreatePupilMutation = {
  createPupil?:  {
    __typename: "Pupil",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    Attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    classrooms?:  {
      __typename: "ModelPupilClassroomConnection",
      nextToken?: string | null,
    } | null,
    schoolID?: string | null,
    schoolHouseID?: string | null,
    schoolHouse?:  {
      __typename: "SchoolHouse",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    school?:  {
      __typename: "School",
      id: string,
      name?: string | null,
      country?: string | null,
      region?: string | null,
      principal?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    parents?:  {
      __typename: "ModelPupilParentConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    Interventions?:  {
      __typename: "ModelInterventionConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type UpdatePupilMutationVariables = {
  input: UpdatePupilInput,
  condition?: ModelPupilConditionInput | null,
};

export type UpdatePupilMutation = {
  updatePupil?:  {
    __typename: "Pupil",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    Attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    classrooms?:  {
      __typename: "ModelPupilClassroomConnection",
      nextToken?: string | null,
    } | null,
    schoolID?: string | null,
    schoolHouseID?: string | null,
    schoolHouse?:  {
      __typename: "SchoolHouse",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    school?:  {
      __typename: "School",
      id: string,
      name?: string | null,
      country?: string | null,
      region?: string | null,
      principal?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    parents?:  {
      __typename: "ModelPupilParentConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    Interventions?:  {
      __typename: "ModelInterventionConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeletePupilMutationVariables = {
  input: DeletePupilInput,
  condition?: ModelPupilConditionInput | null,
};

export type DeletePupilMutation = {
  deletePupil?:  {
    __typename: "Pupil",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    Attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    classrooms?:  {
      __typename: "ModelPupilClassroomConnection",
      nextToken?: string | null,
    } | null,
    schoolID?: string | null,
    schoolHouseID?: string | null,
    schoolHouse?:  {
      __typename: "SchoolHouse",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    school?:  {
      __typename: "School",
      id: string,
      name?: string | null,
      country?: string | null,
      region?: string | null,
      principal?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    parents?:  {
      __typename: "ModelPupilParentConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    Interventions?:  {
      __typename: "ModelInterventionConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type CreateInterventionMutationVariables = {
  input: CreateInterventionInput,
  condition?: ModelInterventionConditionInput | null,
};

export type CreateInterventionMutation = {
  createIntervention?:  {
    __typename: "Intervention",
    id: string,
    pupilID: string,
    message?: string | null,
    createdAt: string,
    updatedAt: string,
    Pupil?:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type UpdateInterventionMutationVariables = {
  input: UpdateInterventionInput,
  condition?: ModelInterventionConditionInput | null,
};

export type UpdateInterventionMutation = {
  updateIntervention?:  {
    __typename: "Intervention",
    id: string,
    pupilID: string,
    message?: string | null,
    createdAt: string,
    updatedAt: string,
    Pupil?:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type DeleteInterventionMutationVariables = {
  input: DeleteInterventionInput,
  condition?: ModelInterventionConditionInput | null,
};

export type DeleteInterventionMutation = {
  deleteIntervention?:  {
    __typename: "Intervention",
    id: string,
    pupilID: string,
    message?: string | null,
    createdAt: string,
    updatedAt: string,
    Pupil?:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type GetFileQueryVariables = {
  id: string,
};

export type GetFileQuery = {
  getFile?:  {
    __typename: "File",
    id: string,
    key?: string | null,
    region?: string | null,
    bucket?: string | null,
    lessonID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListFilesQueryVariables = {
  filter?: ModelFileFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListFilesQuery = {
  listFiles?:  {
    __typename: "ModelFileConnection",
    items:  Array< {
      __typename: "File",
      id: string,
      key?: string | null,
      region?: string | null,
      bucket?: string | null,
      lessonID?: string | null,
      createdAt: string,
      updatedAt: string,
    } >,
    nextToken?: string | null,
  } | null,
};

export type GetSectionQueryVariables = {
  id: string,
};

export type GetSectionQuery = {
  getSection?:  {
    __typename: "Section",
    id: string,
    name?: string | null,
    parentID?: string | null,
    ParentSection?:  {
      __typename: "Section",
      id: string,
      name?: string | null,
      parentID?: string | null,
      imagePreviewID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    Lessons?:  {
      __typename: "ModelLessonConnection",
      nextToken?: string | null,
    } | null,
    imagePreviewID?: string | null,
    ImagePreview?:  {
      __typename: "File",
      id: string,
      key?: string | null,
      region?: string | null,
      bucket?: string | null,
      lessonID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListSectionsQueryVariables = {
  filter?: ModelSectionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSectionsQuery = {
  listSections?:  {
    __typename: "ModelSectionConnection",
    items:  Array< {
      __typename: "Section",
      id: string,
      name?: string | null,
      parentID?: string | null,
      imagePreviewID?: string | null,
      createdAt: string,
      updatedAt: string,
    } >,
    nextToken?: string | null,
  } | null,
};

export type GetLessonQueryVariables = {
  id: string,
};

export type GetLessonQuery = {
  getLesson?:  {
    __typename: "Lesson",
    id: string,
    title?: string | null,
    description?: string | null,
    sectionID?: string | null,
    Section?:  {
      __typename: "Section",
      id: string,
      name?: string | null,
      parentID?: string | null,
      imagePreviewID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    terms?:  {
      __typename: "ModelTermLessonConnection",
      nextToken?: string | null,
    } | null,
    Attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    Files?:  {
      __typename: "ModelFileConnection",
      nextToken?: string | null,
    } | null,
    LessonTeacher?:  {
      __typename: "ModelLessonTeacherConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    LessonsRecords?:  {
      __typename: "ModelPELessonRecordConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type ListLessonsQueryVariables = {
  filter?: ModelLessonFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLessonsQuery = {
  listLessons?:  {
    __typename: "ModelLessonConnection",
    items:  Array< {
      __typename: "Lesson",
      id: string,
      title?: string | null,
      description?: string | null,
      sectionID?: string | null,
      createdAt: string,
      updatedAt: string,
    } >,
    nextToken?: string | null,
  } | null,
};

export type GetSchoolHouseQueryVariables = {
  id: string,
};

export type GetSchoolHouseQuery = {
  getSchoolHouse?:  {
    __typename: "SchoolHouse",
    id: string,
    name?: string | null,
    createdAt: string,
    updatedAt: string,
    Pupils?:  {
      __typename: "ModelPupilConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type ListSchoolHousesQueryVariables = {
  filter?: ModelSchoolHouseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSchoolHousesQuery = {
  listSchoolHouses?:  {
    __typename: "ModelSchoolHouseConnection",
    items:  Array< {
      __typename: "SchoolHouse",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    } >,
    nextToken?: string | null,
  } | null,
};

export type GetClassroomLessonQueryVariables = {
  id: string,
};

export type GetClassroomLessonQuery = {
  getClassroomLesson?:  {
    __typename: "ClassroomLesson",
    id: string,
    classroomID?: string | null,
    lessonID?: string | null,
    Classroom?:  {
      __typename: "Classroom",
      id: string,
      name?: string | null,
      schoolID?: string | null,
      yearGroupID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    Lesson?:  {
      __typename: "Lesson",
      id: string,
      title?: string | null,
      description?: string | null,
      sectionID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    completed?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListClassroomLessonsQueryVariables = {
  filter?: ModelClassroomLessonFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListClassroomLessonsQuery = {
  listClassroomLessons?:  {
    __typename: "ModelClassroomLessonConnection",
    items:  Array< {
      __typename: "ClassroomLesson",
      id: string,
      classroomID?: string | null,
      lessonID?: string | null,
      completed?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } >,
    nextToken?: string | null,
  } | null,
};

export type GetClassroomQueryVariables = {
  id: string,
};

export type GetClassroomQuery = {
  getClassroom?:  {
    __typename: "Classroom",
    id: string,
    name?: string | null,
    teachers?:  {
      __typename: "ModelTeacherClassroomConnection",
      nextToken?: string | null,
    } | null,
    pupils?:  {
      __typename: "ModelPupilClassroomConnection",
      nextToken?: string | null,
    } | null,
    schoolID?: string | null,
    school?:  {
      __typename: "School",
      id: string,
      name?: string | null,
      country?: string | null,
      region?: string | null,
      principal?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    yearGroupID?: string | null,
    yearGroup?:  {
      __typename: "Curriculum",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListClassroomsQueryVariables = {
  filter?: ModelClassroomFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListClassroomsQuery = {
  listClassrooms?:  {
    __typename: "ModelClassroomConnection",
    items:  Array< {
      __typename: "Classroom",
      id: string,
      name?: string | null,
      schoolID?: string | null,
      yearGroupID?: string | null,
      createdAt: string,
      updatedAt: string,
    } >,
    nextToken?: string | null,
  } | null,
};

export type GetSchoolQueryVariables = {
  id: string,
};

export type GetSchoolQuery = {
  getSchool?:  {
    __typename: "School",
    id: string,
    name?: string | null,
    country?: string | null,
    region?: string | null,
    principal?: string | null,
    Teachers?:  {
      __typename: "ModelTeacherConnection",
      nextToken?: string | null,
    } | null,
    Principals?:  {
      __typename: "ModelPrincipalConnection",
      nextToken?: string | null,
    } | null,
    classrooms?:  {
      __typename: "ModelClassroomConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    Pupils?:  {
      __typename: "ModelPupilConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type ListSchoolsQueryVariables = {
  filter?: ModelSchoolFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSchoolsQuery = {
  listSchools?:  {
    __typename: "ModelSchoolConnection",
    items:  Array< {
      __typename: "School",
      id: string,
      name?: string | null,
      country?: string | null,
      region?: string | null,
      principal?: string | null,
      createdAt: string,
      updatedAt: string,
    } >,
    nextToken?: string | null,
  } | null,
};

export type GetAttendanceQueryVariables = {
  id: string,
};

export type GetAttendanceQuery = {
  getAttendance?:  {
    __typename: "Attendance",
    id: string,
    present?: boolean | null,
    wasRewarded?: boolean | null,
    pupilID?: string | null,
    lessonID?: string | null,
    Lesson?:  {
      __typename: "Lesson",
      id: string,
      title?: string | null,
      description?: string | null,
      sectionID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    lessonRecordID?: string | null,
    createdAt: string,
    updatedAt: string,
    lessonRecord?:  {
      __typename: "PELessonRecord",
      id: string,
      teacherID?: string | null,
      date?: string | null,
      deliveredBy?: string | null,
      duration?: number | null,
      activity?: string | null,
      rating?: number | null,
      notes?: string | null,
      classroomID?: string | null,
      lessonID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    Pupil?:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type ListAttendancesQueryVariables = {
  filter?: ModelAttendanceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAttendancesQuery = {
  listAttendances?:  {
    __typename: "ModelAttendanceConnection",
    items:  Array< {
      __typename: "Attendance",
      id: string,
      present?: boolean | null,
      wasRewarded?: boolean | null,
      pupilID?: string | null,
      lessonID?: string | null,
      lessonRecordID?: string | null,
      createdAt: string,
      updatedAt: string,
    } >,
    nextToken?: string | null,
  } | null,
};

export type GetLessonTeacherQueryVariables = {
  id: string,
};

export type GetLessonTeacherQuery = {
  getLessonTeacher?:  {
    __typename: "LessonTeacher",
    id: string,
    teacherID?: string | null,
    lessonID?: string | null,
    Teacher?:  {
      __typename: "Teacher",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      schoolID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    Lesson?:  {
      __typename: "Lesson",
      id: string,
      title?: string | null,
      description?: string | null,
      sectionID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    score?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListLessonTeachersQueryVariables = {
  filter?: ModelLessonTeacherFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLessonTeachersQuery = {
  listLessonTeachers?:  {
    __typename: "ModelLessonTeacherConnection",
    items:  Array< {
      __typename: "LessonTeacher",
      id: string,
      teacherID?: string | null,
      lessonID?: string | null,
      score?: number | null,
      createdAt: string,
      updatedAt: string,
    } >,
    nextToken?: string | null,
  } | null,
};

export type GetTermQueryVariables = {
  id: string,
};

export type GetTermQuery = {
  getTerm?:  {
    __typename: "Term",
    id: string,
    nam?: string | null,
    startDate?: string | null,
    finishDate?: string | null,
    subjects?:  {
      __typename: "ModelSubjectTermConnection",
      nextToken?: string | null,
    } | null,
    TermLessons?:  {
      __typename: "ModelTermLessonConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTermsQueryVariables = {
  filter?: ModelTermFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTermsQuery = {
  listTerms?:  {
    __typename: "ModelTermConnection",
    items:  Array< {
      __typename: "Term",
      id: string,
      nam?: string | null,
      startDate?: string | null,
      finishDate?: string | null,
      createdAt: string,
      updatedAt: string,
    } >,
    nextToken?: string | null,
  } | null,
};

export type GetSubjectQueryVariables = {
  id: string,
};

export type GetSubjectQuery = {
  getSubject?:  {
    __typename: "Subject",
    id: string,
    name?: string | null,
    SubjectTerms?:  {
      __typename: "ModelSubjectTermConnection",
      nextToken?: string | null,
    } | null,
    curriculums?:  {
      __typename: "ModelCurriculumSubjectConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListSubjectsQueryVariables = {
  filter?: ModelSubjectFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSubjectsQuery = {
  listSubjects?:  {
    __typename: "ModelSubjectConnection",
    items:  Array< {
      __typename: "Subject",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    } >,
    nextToken?: string | null,
  } | null,
};

export type GetCurriculumQueryVariables = {
  id: string,
};

export type GetCurriculumQuery = {
  getCurriculum?:  {
    __typename: "Curriculum",
    id: string,
    name?: string | null,
    subjects?:  {
      __typename: "ModelCurriculumSubjectConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCurriculaQueryVariables = {
  filter?: ModelCurriculumFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCurriculaQuery = {
  listCurricula?:  {
    __typename: "ModelCurriculumConnection",
    items:  Array< {
      __typename: "Curriculum",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    } >,
    nextToken?: string | null,
  } | null,
};

export type GetParentQueryVariables = {
  id: string,
};

export type GetParentQuery = {
  getParent?:  {
    __typename: "Parent",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    children?:  {
      __typename: "ModelPupilParentConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListParentsQueryVariables = {
  filter?: ModelParentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListParentsQuery = {
  listParents?:  {
    __typename: "ModelParentConnection",
    items:  Array< {
      __typename: "Parent",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
    } >,
    nextToken?: string | null,
  } | null,
};

export type GetPrincipalQueryVariables = {
  id: string,
};

export type GetPrincipalQuery = {
  getPrincipal?:  {
    __typename: "Principal",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    schoolID?: string | null,
    School?:  {
      __typename: "School",
      id: string,
      name?: string | null,
      country?: string | null,
      region?: string | null,
      principal?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    organizationID?: string | null,
    createdAt: string,
    updatedAt: string,
    Organization?:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type ListPrincipalsQueryVariables = {
  filter?: ModelPrincipalFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPrincipalsQuery = {
  listPrincipals?:  {
    __typename: "ModelPrincipalConnection",
    items:  Array< {
      __typename: "Principal",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      schoolID?: string | null,
      organizationID?: string | null,
      createdAt: string,
      updatedAt: string,
    } >,
    nextToken?: string | null,
  } | null,
};

export type GetTeacherQueryVariables = {
  id: string,
};

export type GetTeacherQuery = {
  getTeacher?:  {
    __typename: "Teacher",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    schoolID?: string | null,
    classrooms?:  {
      __typename: "ModelTeacherClassroomConnection",
      nextToken?: string | null,
    } | null,
    LessonTeacher?:  {
      __typename: "ModelLessonTeacherConnection",
      nextToken?: string | null,
    } | null,
    School?:  {
      __typename: "School",
      id: string,
      name?: string | null,
      country?: string | null,
      region?: string | null,
      principal?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTeachersQueryVariables = {
  filter?: ModelTeacherFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTeachersQuery = {
  listTeachers?:  {
    __typename: "ModelTeacherConnection",
    items:  Array< {
      __typename: "Teacher",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      schoolID?: string | null,
      createdAt: string,
      updatedAt: string,
    } >,
    nextToken?: string | null,
  } | null,
};

export type GetPELessonRecordQueryVariables = {
  id: string,
};

export type GetPELessonRecordQuery = {
  getPELessonRecord?:  {
    __typename: "PELessonRecord",
    id: string,
    teacherID?: string | null,
    Teacher?:  {
      __typename: "Teacher",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      schoolID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    Attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    date?: string | null,
    deliveredBy?: string | null,
    duration?: number | null,
    activity?: string | null,
    rating?: number | null,
    notes?: string | null,
    classroomID?: string | null,
    Classroom?:  {
      __typename: "Classroom",
      id: string,
      name?: string | null,
      schoolID?: string | null,
      yearGroupID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    lessonID?: string | null,
    Lesson?:  {
      __typename: "Lesson",
      id: string,
      title?: string | null,
      description?: string | null,
      sectionID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPELessonRecordsQueryVariables = {
  filter?: ModelPELessonRecordFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPELessonRecordsQuery = {
  listPELessonRecords?:  {
    __typename: "ModelPELessonRecordConnection",
    items:  Array< {
      __typename: "PELessonRecord",
      id: string,
      teacherID?: string | null,
      date?: string | null,
      deliveredBy?: string | null,
      duration?: number | null,
      activity?: string | null,
      rating?: number | null,
      notes?: string | null,
      classroomID?: string | null,
      lessonID?: string | null,
      createdAt: string,
      updatedAt: string,
    } >,
    nextToken?: string | null,
  } | null,
};

export type GetOrganizationQueryVariables = {
  id: string,
};

export type GetOrganizationQuery = {
  getOrganization?:  {
    __typename: "Organization",
    id: string,
    name?: string | null,
    Principals?:  {
      __typename: "ModelPrincipalConnection",
      nextToken?: string | null,
    } | null,
    type?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListOrganizationsQueryVariables = {
  filter?: ModelOrganizationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListOrganizationsQuery = {
  listOrganizations?:  {
    __typename: "ModelOrganizationConnection",
    items:  Array< {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } >,
    nextToken?: string | null,
  } | null,
};

export type GetPupilQueryVariables = {
  id: string,
};

export type GetPupilQuery = {
  getPupil?:  {
    __typename: "Pupil",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    Attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    classrooms?:  {
      __typename: "ModelPupilClassroomConnection",
      nextToken?: string | null,
    } | null,
    schoolID?: string | null,
    schoolHouseID?: string | null,
    schoolHouse?:  {
      __typename: "SchoolHouse",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    school?:  {
      __typename: "School",
      id: string,
      name?: string | null,
      country?: string | null,
      region?: string | null,
      principal?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    parents?:  {
      __typename: "ModelPupilParentConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    Interventions?:  {
      __typename: "ModelInterventionConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type ListPupilsQueryVariables = {
  filter?: ModelPupilFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPupilsQuery = {
  listPupils?:  {
    __typename: "ModelPupilConnection",
    items:  Array< {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    } >,
    nextToken?: string | null,
  } | null,
};

export type GetInterventionQueryVariables = {
  id: string,
};

export type GetInterventionQuery = {
  getIntervention?:  {
    __typename: "Intervention",
    id: string,
    pupilID: string,
    message?: string | null,
    createdAt: string,
    updatedAt: string,
    Pupil?:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type ListInterventionsQueryVariables = {
  filter?: ModelInterventionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListInterventionsQuery = {
  listInterventions?:  {
    __typename: "ModelInterventionConnection",
    items:  Array< {
      __typename: "Intervention",
      id: string,
      pupilID: string,
      message?: string | null,
      createdAt: string,
      updatedAt: string,
    } >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateFileSubscription = {
  onCreateFile?:  {
    __typename: "File",
    id: string,
    key?: string | null,
    region?: string | null,
    bucket?: string | null,
    lessonID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateFileSubscription = {
  onUpdateFile?:  {
    __typename: "File",
    id: string,
    key?: string | null,
    region?: string | null,
    bucket?: string | null,
    lessonID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteFileSubscription = {
  onDeleteFile?:  {
    __typename: "File",
    id: string,
    key?: string | null,
    region?: string | null,
    bucket?: string | null,
    lessonID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateSectionSubscription = {
  onCreateSection?:  {
    __typename: "Section",
    id: string,
    name?: string | null,
    parentID?: string | null,
    ParentSection?:  {
      __typename: "Section",
      id: string,
      name?: string | null,
      parentID?: string | null,
      imagePreviewID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    Lessons?:  {
      __typename: "ModelLessonConnection",
      nextToken?: string | null,
    } | null,
    imagePreviewID?: string | null,
    ImagePreview?:  {
      __typename: "File",
      id: string,
      key?: string | null,
      region?: string | null,
      bucket?: string | null,
      lessonID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSectionSubscription = {
  onUpdateSection?:  {
    __typename: "Section",
    id: string,
    name?: string | null,
    parentID?: string | null,
    ParentSection?:  {
      __typename: "Section",
      id: string,
      name?: string | null,
      parentID?: string | null,
      imagePreviewID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    Lessons?:  {
      __typename: "ModelLessonConnection",
      nextToken?: string | null,
    } | null,
    imagePreviewID?: string | null,
    ImagePreview?:  {
      __typename: "File",
      id: string,
      key?: string | null,
      region?: string | null,
      bucket?: string | null,
      lessonID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSectionSubscription = {
  onDeleteSection?:  {
    __typename: "Section",
    id: string,
    name?: string | null,
    parentID?: string | null,
    ParentSection?:  {
      __typename: "Section",
      id: string,
      name?: string | null,
      parentID?: string | null,
      imagePreviewID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    Lessons?:  {
      __typename: "ModelLessonConnection",
      nextToken?: string | null,
    } | null,
    imagePreviewID?: string | null,
    ImagePreview?:  {
      __typename: "File",
      id: string,
      key?: string | null,
      region?: string | null,
      bucket?: string | null,
      lessonID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateLessonSubscription = {
  onCreateLesson?:  {
    __typename: "Lesson",
    id: string,
    title?: string | null,
    description?: string | null,
    sectionID?: string | null,
    Section?:  {
      __typename: "Section",
      id: string,
      name?: string | null,
      parentID?: string | null,
      imagePreviewID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    terms?:  {
      __typename: "ModelTermLessonConnection",
      nextToken?: string | null,
    } | null,
    Attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    Files?:  {
      __typename: "ModelFileConnection",
      nextToken?: string | null,
    } | null,
    LessonTeacher?:  {
      __typename: "ModelLessonTeacherConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    LessonsRecords?:  {
      __typename: "ModelPELessonRecordConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdateLessonSubscription = {
  onUpdateLesson?:  {
    __typename: "Lesson",
    id: string,
    title?: string | null,
    description?: string | null,
    sectionID?: string | null,
    Section?:  {
      __typename: "Section",
      id: string,
      name?: string | null,
      parentID?: string | null,
      imagePreviewID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    terms?:  {
      __typename: "ModelTermLessonConnection",
      nextToken?: string | null,
    } | null,
    Attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    Files?:  {
      __typename: "ModelFileConnection",
      nextToken?: string | null,
    } | null,
    LessonTeacher?:  {
      __typename: "ModelLessonTeacherConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    LessonsRecords?:  {
      __typename: "ModelPELessonRecordConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeleteLessonSubscription = {
  onDeleteLesson?:  {
    __typename: "Lesson",
    id: string,
    title?: string | null,
    description?: string | null,
    sectionID?: string | null,
    Section?:  {
      __typename: "Section",
      id: string,
      name?: string | null,
      parentID?: string | null,
      imagePreviewID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    terms?:  {
      __typename: "ModelTermLessonConnection",
      nextToken?: string | null,
    } | null,
    Attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    Files?:  {
      __typename: "ModelFileConnection",
      nextToken?: string | null,
    } | null,
    LessonTeacher?:  {
      __typename: "ModelLessonTeacherConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    LessonsRecords?:  {
      __typename: "ModelPELessonRecordConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnCreateSchoolHouseSubscription = {
  onCreateSchoolHouse?:  {
    __typename: "SchoolHouse",
    id: string,
    name?: string | null,
    createdAt: string,
    updatedAt: string,
    Pupils?:  {
      __typename: "ModelPupilConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdateSchoolHouseSubscription = {
  onUpdateSchoolHouse?:  {
    __typename: "SchoolHouse",
    id: string,
    name?: string | null,
    createdAt: string,
    updatedAt: string,
    Pupils?:  {
      __typename: "ModelPupilConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeleteSchoolHouseSubscription = {
  onDeleteSchoolHouse?:  {
    __typename: "SchoolHouse",
    id: string,
    name?: string | null,
    createdAt: string,
    updatedAt: string,
    Pupils?:  {
      __typename: "ModelPupilConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnCreateClassroomLessonSubscription = {
  onCreateClassroomLesson?:  {
    __typename: "ClassroomLesson",
    id: string,
    classroomID?: string | null,
    lessonID?: string | null,
    Classroom?:  {
      __typename: "Classroom",
      id: string,
      name?: string | null,
      schoolID?: string | null,
      yearGroupID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    Lesson?:  {
      __typename: "Lesson",
      id: string,
      title?: string | null,
      description?: string | null,
      sectionID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    completed?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateClassroomLessonSubscription = {
  onUpdateClassroomLesson?:  {
    __typename: "ClassroomLesson",
    id: string,
    classroomID?: string | null,
    lessonID?: string | null,
    Classroom?:  {
      __typename: "Classroom",
      id: string,
      name?: string | null,
      schoolID?: string | null,
      yearGroupID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    Lesson?:  {
      __typename: "Lesson",
      id: string,
      title?: string | null,
      description?: string | null,
      sectionID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    completed?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteClassroomLessonSubscription = {
  onDeleteClassroomLesson?:  {
    __typename: "ClassroomLesson",
    id: string,
    classroomID?: string | null,
    lessonID?: string | null,
    Classroom?:  {
      __typename: "Classroom",
      id: string,
      name?: string | null,
      schoolID?: string | null,
      yearGroupID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    Lesson?:  {
      __typename: "Lesson",
      id: string,
      title?: string | null,
      description?: string | null,
      sectionID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    completed?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateClassroomSubscription = {
  onCreateClassroom?:  {
    __typename: "Classroom",
    id: string,
    name?: string | null,
    teachers?:  {
      __typename: "ModelTeacherClassroomConnection",
      nextToken?: string | null,
    } | null,
    pupils?:  {
      __typename: "ModelPupilClassroomConnection",
      nextToken?: string | null,
    } | null,
    schoolID?: string | null,
    school?:  {
      __typename: "School",
      id: string,
      name?: string | null,
      country?: string | null,
      region?: string | null,
      principal?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    yearGroupID?: string | null,
    yearGroup?:  {
      __typename: "Curriculum",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateClassroomSubscription = {
  onUpdateClassroom?:  {
    __typename: "Classroom",
    id: string,
    name?: string | null,
    teachers?:  {
      __typename: "ModelTeacherClassroomConnection",
      nextToken?: string | null,
    } | null,
    pupils?:  {
      __typename: "ModelPupilClassroomConnection",
      nextToken?: string | null,
    } | null,
    schoolID?: string | null,
    school?:  {
      __typename: "School",
      id: string,
      name?: string | null,
      country?: string | null,
      region?: string | null,
      principal?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    yearGroupID?: string | null,
    yearGroup?:  {
      __typename: "Curriculum",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteClassroomSubscription = {
  onDeleteClassroom?:  {
    __typename: "Classroom",
    id: string,
    name?: string | null,
    teachers?:  {
      __typename: "ModelTeacherClassroomConnection",
      nextToken?: string | null,
    } | null,
    pupils?:  {
      __typename: "ModelPupilClassroomConnection",
      nextToken?: string | null,
    } | null,
    schoolID?: string | null,
    school?:  {
      __typename: "School",
      id: string,
      name?: string | null,
      country?: string | null,
      region?: string | null,
      principal?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    yearGroupID?: string | null,
    yearGroup?:  {
      __typename: "Curriculum",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateTeacherClassroomSubscription = {
  onCreateTeacherClassroom?:  {
    __typename: "TeacherClassroom",
    id: string,
    teacherID: string,
    classroomID: string,
    teacher:  {
      __typename: "Teacher",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      schoolID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    classroom:  {
      __typename: "Classroom",
      id: string,
      name?: string | null,
      schoolID?: string | null,
      yearGroupID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTeacherClassroomSubscription = {
  onUpdateTeacherClassroom?:  {
    __typename: "TeacherClassroom",
    id: string,
    teacherID: string,
    classroomID: string,
    teacher:  {
      __typename: "Teacher",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      schoolID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    classroom:  {
      __typename: "Classroom",
      id: string,
      name?: string | null,
      schoolID?: string | null,
      yearGroupID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTeacherClassroomSubscription = {
  onDeleteTeacherClassroom?:  {
    __typename: "TeacherClassroom",
    id: string,
    teacherID: string,
    classroomID: string,
    teacher:  {
      __typename: "Teacher",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      schoolID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    classroom:  {
      __typename: "Classroom",
      id: string,
      name?: string | null,
      schoolID?: string | null,
      yearGroupID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePupilClassroomSubscription = {
  onCreatePupilClassroom?:  {
    __typename: "PupilClassroom",
    id: string,
    pupilID: string,
    classroomID: string,
    classroom:  {
      __typename: "Classroom",
      id: string,
      name?: string | null,
      schoolID?: string | null,
      yearGroupID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    pupil:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type OnUpdatePupilClassroomSubscription = {
  onUpdatePupilClassroom?:  {
    __typename: "PupilClassroom",
    id: string,
    pupilID: string,
    classroomID: string,
    classroom:  {
      __typename: "Classroom",
      id: string,
      name?: string | null,
      schoolID?: string | null,
      yearGroupID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    pupil:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type OnDeletePupilClassroomSubscription = {
  onDeletePupilClassroom?:  {
    __typename: "PupilClassroom",
    id: string,
    pupilID: string,
    classroomID: string,
    classroom:  {
      __typename: "Classroom",
      id: string,
      name?: string | null,
      schoolID?: string | null,
      yearGroupID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    pupil:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type OnCreateSchoolSubscription = {
  onCreateSchool?:  {
    __typename: "School",
    id: string,
    name?: string | null,
    country?: string | null,
    region?: string | null,
    principal?: string | null,
    Teachers?:  {
      __typename: "ModelTeacherConnection",
      nextToken?: string | null,
    } | null,
    Principals?:  {
      __typename: "ModelPrincipalConnection",
      nextToken?: string | null,
    } | null,
    classrooms?:  {
      __typename: "ModelClassroomConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    Pupils?:  {
      __typename: "ModelPupilConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdateSchoolSubscription = {
  onUpdateSchool?:  {
    __typename: "School",
    id: string,
    name?: string | null,
    country?: string | null,
    region?: string | null,
    principal?: string | null,
    Teachers?:  {
      __typename: "ModelTeacherConnection",
      nextToken?: string | null,
    } | null,
    Principals?:  {
      __typename: "ModelPrincipalConnection",
      nextToken?: string | null,
    } | null,
    classrooms?:  {
      __typename: "ModelClassroomConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    Pupils?:  {
      __typename: "ModelPupilConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeleteSchoolSubscription = {
  onDeleteSchool?:  {
    __typename: "School",
    id: string,
    name?: string | null,
    country?: string | null,
    region?: string | null,
    principal?: string | null,
    Teachers?:  {
      __typename: "ModelTeacherConnection",
      nextToken?: string | null,
    } | null,
    Principals?:  {
      __typename: "ModelPrincipalConnection",
      nextToken?: string | null,
    } | null,
    classrooms?:  {
      __typename: "ModelClassroomConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    Pupils?:  {
      __typename: "ModelPupilConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnCreateAttendanceSubscription = {
  onCreateAttendance?:  {
    __typename: "Attendance",
    id: string,
    present?: boolean | null,
    wasRewarded?: boolean | null,
    pupilID?: string | null,
    lessonID?: string | null,
    Lesson?:  {
      __typename: "Lesson",
      id: string,
      title?: string | null,
      description?: string | null,
      sectionID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    lessonRecordID?: string | null,
    createdAt: string,
    updatedAt: string,
    lessonRecord?:  {
      __typename: "PELessonRecord",
      id: string,
      teacherID?: string | null,
      date?: string | null,
      deliveredBy?: string | null,
      duration?: number | null,
      activity?: string | null,
      rating?: number | null,
      notes?: string | null,
      classroomID?: string | null,
      lessonID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    Pupil?:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnUpdateAttendanceSubscription = {
  onUpdateAttendance?:  {
    __typename: "Attendance",
    id: string,
    present?: boolean | null,
    wasRewarded?: boolean | null,
    pupilID?: string | null,
    lessonID?: string | null,
    Lesson?:  {
      __typename: "Lesson",
      id: string,
      title?: string | null,
      description?: string | null,
      sectionID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    lessonRecordID?: string | null,
    createdAt: string,
    updatedAt: string,
    lessonRecord?:  {
      __typename: "PELessonRecord",
      id: string,
      teacherID?: string | null,
      date?: string | null,
      deliveredBy?: string | null,
      duration?: number | null,
      activity?: string | null,
      rating?: number | null,
      notes?: string | null,
      classroomID?: string | null,
      lessonID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    Pupil?:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnDeleteAttendanceSubscription = {
  onDeleteAttendance?:  {
    __typename: "Attendance",
    id: string,
    present?: boolean | null,
    wasRewarded?: boolean | null,
    pupilID?: string | null,
    lessonID?: string | null,
    Lesson?:  {
      __typename: "Lesson",
      id: string,
      title?: string | null,
      description?: string | null,
      sectionID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    lessonRecordID?: string | null,
    createdAt: string,
    updatedAt: string,
    lessonRecord?:  {
      __typename: "PELessonRecord",
      id: string,
      teacherID?: string | null,
      date?: string | null,
      deliveredBy?: string | null,
      duration?: number | null,
      activity?: string | null,
      rating?: number | null,
      notes?: string | null,
      classroomID?: string | null,
      lessonID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    Pupil?:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnCreateLessonTeacherSubscription = {
  onCreateLessonTeacher?:  {
    __typename: "LessonTeacher",
    id: string,
    teacherID?: string | null,
    lessonID?: string | null,
    Teacher?:  {
      __typename: "Teacher",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      schoolID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    Lesson?:  {
      __typename: "Lesson",
      id: string,
      title?: string | null,
      description?: string | null,
      sectionID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    score?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateLessonTeacherSubscription = {
  onUpdateLessonTeacher?:  {
    __typename: "LessonTeacher",
    id: string,
    teacherID?: string | null,
    lessonID?: string | null,
    Teacher?:  {
      __typename: "Teacher",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      schoolID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    Lesson?:  {
      __typename: "Lesson",
      id: string,
      title?: string | null,
      description?: string | null,
      sectionID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    score?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteLessonTeacherSubscription = {
  onDeleteLessonTeacher?:  {
    __typename: "LessonTeacher",
    id: string,
    teacherID?: string | null,
    lessonID?: string | null,
    Teacher?:  {
      __typename: "Teacher",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      schoolID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    Lesson?:  {
      __typename: "Lesson",
      id: string,
      title?: string | null,
      description?: string | null,
      sectionID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    score?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateTermSubscription = {
  onCreateTerm?:  {
    __typename: "Term",
    id: string,
    nam?: string | null,
    startDate?: string | null,
    finishDate?: string | null,
    subjects?:  {
      __typename: "ModelSubjectTermConnection",
      nextToken?: string | null,
    } | null,
    TermLessons?:  {
      __typename: "ModelTermLessonConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTermSubscription = {
  onUpdateTerm?:  {
    __typename: "Term",
    id: string,
    nam?: string | null,
    startDate?: string | null,
    finishDate?: string | null,
    subjects?:  {
      __typename: "ModelSubjectTermConnection",
      nextToken?: string | null,
    } | null,
    TermLessons?:  {
      __typename: "ModelTermLessonConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTermSubscription = {
  onDeleteTerm?:  {
    __typename: "Term",
    id: string,
    nam?: string | null,
    startDate?: string | null,
    finishDate?: string | null,
    subjects?:  {
      __typename: "ModelSubjectTermConnection",
      nextToken?: string | null,
    } | null,
    TermLessons?:  {
      __typename: "ModelTermLessonConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateSubjectSubscription = {
  onCreateSubject?:  {
    __typename: "Subject",
    id: string,
    name?: string | null,
    SubjectTerms?:  {
      __typename: "ModelSubjectTermConnection",
      nextToken?: string | null,
    } | null,
    curriculums?:  {
      __typename: "ModelCurriculumSubjectConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSubjectSubscription = {
  onUpdateSubject?:  {
    __typename: "Subject",
    id: string,
    name?: string | null,
    SubjectTerms?:  {
      __typename: "ModelSubjectTermConnection",
      nextToken?: string | null,
    } | null,
    curriculums?:  {
      __typename: "ModelCurriculumSubjectConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSubjectSubscription = {
  onDeleteSubject?:  {
    __typename: "Subject",
    id: string,
    name?: string | null,
    SubjectTerms?:  {
      __typename: "ModelSubjectTermConnection",
      nextToken?: string | null,
    } | null,
    curriculums?:  {
      __typename: "ModelCurriculumSubjectConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCurriculumSubscription = {
  onCreateCurriculum?:  {
    __typename: "Curriculum",
    id: string,
    name?: string | null,
    subjects?:  {
      __typename: "ModelCurriculumSubjectConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCurriculumSubscription = {
  onUpdateCurriculum?:  {
    __typename: "Curriculum",
    id: string,
    name?: string | null,
    subjects?:  {
      __typename: "ModelCurriculumSubjectConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCurriculumSubscription = {
  onDeleteCurriculum?:  {
    __typename: "Curriculum",
    id: string,
    name?: string | null,
    subjects?:  {
      __typename: "ModelCurriculumSubjectConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateParentSubscription = {
  onCreateParent?:  {
    __typename: "Parent",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    children?:  {
      __typename: "ModelPupilParentConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateParentSubscription = {
  onUpdateParent?:  {
    __typename: "Parent",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    children?:  {
      __typename: "ModelPupilParentConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteParentSubscription = {
  onDeleteParent?:  {
    __typename: "Parent",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    children?:  {
      __typename: "ModelPupilParentConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePupilParentSubscription = {
  onCreatePupilParent?:  {
    __typename: "PupilParent",
    id: string,
    pupilID: string,
    parentID: string,
    Parent:  {
      __typename: "Parent",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    Pupil:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type OnUpdatePupilParentSubscription = {
  onUpdatePupilParent?:  {
    __typename: "PupilParent",
    id: string,
    pupilID: string,
    parentID: string,
    Parent:  {
      __typename: "Parent",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    Pupil:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type OnDeletePupilParentSubscription = {
  onDeletePupilParent?:  {
    __typename: "PupilParent",
    id: string,
    pupilID: string,
    parentID: string,
    Parent:  {
      __typename: "Parent",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
    Pupil:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type OnCreatePrincipalSubscription = {
  onCreatePrincipal?:  {
    __typename: "Principal",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    schoolID?: string | null,
    School?:  {
      __typename: "School",
      id: string,
      name?: string | null,
      country?: string | null,
      region?: string | null,
      principal?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    organizationID?: string | null,
    createdAt: string,
    updatedAt: string,
    Organization?:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnUpdatePrincipalSubscription = {
  onUpdatePrincipal?:  {
    __typename: "Principal",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    schoolID?: string | null,
    School?:  {
      __typename: "School",
      id: string,
      name?: string | null,
      country?: string | null,
      region?: string | null,
      principal?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    organizationID?: string | null,
    createdAt: string,
    updatedAt: string,
    Organization?:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnDeletePrincipalSubscription = {
  onDeletePrincipal?:  {
    __typename: "Principal",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    schoolID?: string | null,
    School?:  {
      __typename: "School",
      id: string,
      name?: string | null,
      country?: string | null,
      region?: string | null,
      principal?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    organizationID?: string | null,
    createdAt: string,
    updatedAt: string,
    Organization?:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnCreateTeacherSubscription = {
  onCreateTeacher?:  {
    __typename: "Teacher",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    schoolID?: string | null,
    classrooms?:  {
      __typename: "ModelTeacherClassroomConnection",
      nextToken?: string | null,
    } | null,
    LessonTeacher?:  {
      __typename: "ModelLessonTeacherConnection",
      nextToken?: string | null,
    } | null,
    School?:  {
      __typename: "School",
      id: string,
      name?: string | null,
      country?: string | null,
      region?: string | null,
      principal?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTeacherSubscription = {
  onUpdateTeacher?:  {
    __typename: "Teacher",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    schoolID?: string | null,
    classrooms?:  {
      __typename: "ModelTeacherClassroomConnection",
      nextToken?: string | null,
    } | null,
    LessonTeacher?:  {
      __typename: "ModelLessonTeacherConnection",
      nextToken?: string | null,
    } | null,
    School?:  {
      __typename: "School",
      id: string,
      name?: string | null,
      country?: string | null,
      region?: string | null,
      principal?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTeacherSubscription = {
  onDeleteTeacher?:  {
    __typename: "Teacher",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    schoolID?: string | null,
    classrooms?:  {
      __typename: "ModelTeacherClassroomConnection",
      nextToken?: string | null,
    } | null,
    LessonTeacher?:  {
      __typename: "ModelLessonTeacherConnection",
      nextToken?: string | null,
    } | null,
    School?:  {
      __typename: "School",
      id: string,
      name?: string | null,
      country?: string | null,
      region?: string | null,
      principal?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateSubjectTermSubscription = {
  onCreateSubjectTerm?:  {
    __typename: "SubjectTerm",
    id: string,
    subjectID: string,
    termID: string,
    subject:  {
      __typename: "Subject",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    term:  {
      __typename: "Term",
      id: string,
      nam?: string | null,
      startDate?: string | null,
      finishDate?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSubjectTermSubscription = {
  onUpdateSubjectTerm?:  {
    __typename: "SubjectTerm",
    id: string,
    subjectID: string,
    termID: string,
    subject:  {
      __typename: "Subject",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    term:  {
      __typename: "Term",
      id: string,
      nam?: string | null,
      startDate?: string | null,
      finishDate?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSubjectTermSubscription = {
  onDeleteSubjectTerm?:  {
    __typename: "SubjectTerm",
    id: string,
    subjectID: string,
    termID: string,
    subject:  {
      __typename: "Subject",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    term:  {
      __typename: "Term",
      id: string,
      nam?: string | null,
      startDate?: string | null,
      finishDate?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateTermLessonSubscription = {
  onCreateTermLesson?:  {
    __typename: "TermLesson",
    id: string,
    termID: string,
    lessonID: string,
    term:  {
      __typename: "Term",
      id: string,
      nam?: string | null,
      startDate?: string | null,
      finishDate?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    lesson:  {
      __typename: "Lesson",
      id: string,
      title?: string | null,
      description?: string | null,
      sectionID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTermLessonSubscription = {
  onUpdateTermLesson?:  {
    __typename: "TermLesson",
    id: string,
    termID: string,
    lessonID: string,
    term:  {
      __typename: "Term",
      id: string,
      nam?: string | null,
      startDate?: string | null,
      finishDate?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    lesson:  {
      __typename: "Lesson",
      id: string,
      title?: string | null,
      description?: string | null,
      sectionID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTermLessonSubscription = {
  onDeleteTermLesson?:  {
    __typename: "TermLesson",
    id: string,
    termID: string,
    lessonID: string,
    term:  {
      __typename: "Term",
      id: string,
      nam?: string | null,
      startDate?: string | null,
      finishDate?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    lesson:  {
      __typename: "Lesson",
      id: string,
      title?: string | null,
      description?: string | null,
      sectionID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCurriculumSubjectSubscription = {
  onCreateCurriculumSubject?:  {
    __typename: "CurriculumSubject",
    id: string,
    curriculumID: string,
    subjectID: string,
    curriculum:  {
      __typename: "Curriculum",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    subject:  {
      __typename: "Subject",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCurriculumSubjectSubscription = {
  onUpdateCurriculumSubject?:  {
    __typename: "CurriculumSubject",
    id: string,
    curriculumID: string,
    subjectID: string,
    curriculum:  {
      __typename: "Curriculum",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    subject:  {
      __typename: "Subject",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCurriculumSubjectSubscription = {
  onDeleteCurriculumSubject?:  {
    __typename: "CurriculumSubject",
    id: string,
    curriculumID: string,
    subjectID: string,
    curriculum:  {
      __typename: "Curriculum",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    subject:  {
      __typename: "Subject",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePELessonRecordSubscription = {
  onCreatePELessonRecord?:  {
    __typename: "PELessonRecord",
    id: string,
    teacherID?: string | null,
    Teacher?:  {
      __typename: "Teacher",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      schoolID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    Attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    date?: string | null,
    deliveredBy?: string | null,
    duration?: number | null,
    activity?: string | null,
    rating?: number | null,
    notes?: string | null,
    classroomID?: string | null,
    Classroom?:  {
      __typename: "Classroom",
      id: string,
      name?: string | null,
      schoolID?: string | null,
      yearGroupID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    lessonID?: string | null,
    Lesson?:  {
      __typename: "Lesson",
      id: string,
      title?: string | null,
      description?: string | null,
      sectionID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePELessonRecordSubscription = {
  onUpdatePELessonRecord?:  {
    __typename: "PELessonRecord",
    id: string,
    teacherID?: string | null,
    Teacher?:  {
      __typename: "Teacher",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      schoolID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    Attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    date?: string | null,
    deliveredBy?: string | null,
    duration?: number | null,
    activity?: string | null,
    rating?: number | null,
    notes?: string | null,
    classroomID?: string | null,
    Classroom?:  {
      __typename: "Classroom",
      id: string,
      name?: string | null,
      schoolID?: string | null,
      yearGroupID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    lessonID?: string | null,
    Lesson?:  {
      __typename: "Lesson",
      id: string,
      title?: string | null,
      description?: string | null,
      sectionID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePELessonRecordSubscription = {
  onDeletePELessonRecord?:  {
    __typename: "PELessonRecord",
    id: string,
    teacherID?: string | null,
    Teacher?:  {
      __typename: "Teacher",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      schoolID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    Attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    date?: string | null,
    deliveredBy?: string | null,
    duration?: number | null,
    activity?: string | null,
    rating?: number | null,
    notes?: string | null,
    classroomID?: string | null,
    Classroom?:  {
      __typename: "Classroom",
      id: string,
      name?: string | null,
      schoolID?: string | null,
      yearGroupID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    lessonID?: string | null,
    Lesson?:  {
      __typename: "Lesson",
      id: string,
      title?: string | null,
      description?: string | null,
      sectionID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateOrganizationSubscription = {
  onCreateOrganization?:  {
    __typename: "Organization",
    id: string,
    name?: string | null,
    Principals?:  {
      __typename: "ModelPrincipalConnection",
      nextToken?: string | null,
    } | null,
    type?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateOrganizationSubscription = {
  onUpdateOrganization?:  {
    __typename: "Organization",
    id: string,
    name?: string | null,
    Principals?:  {
      __typename: "ModelPrincipalConnection",
      nextToken?: string | null,
    } | null,
    type?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteOrganizationSubscription = {
  onDeleteOrganization?:  {
    __typename: "Organization",
    id: string,
    name?: string | null,
    Principals?:  {
      __typename: "ModelPrincipalConnection",
      nextToken?: string | null,
    } | null,
    type?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePupilSubscription = {
  onCreatePupil?:  {
    __typename: "Pupil",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    Attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    classrooms?:  {
      __typename: "ModelPupilClassroomConnection",
      nextToken?: string | null,
    } | null,
    schoolID?: string | null,
    schoolHouseID?: string | null,
    schoolHouse?:  {
      __typename: "SchoolHouse",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    school?:  {
      __typename: "School",
      id: string,
      name?: string | null,
      country?: string | null,
      region?: string | null,
      principal?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    parents?:  {
      __typename: "ModelPupilParentConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    Interventions?:  {
      __typename: "ModelInterventionConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdatePupilSubscription = {
  onUpdatePupil?:  {
    __typename: "Pupil",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    Attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    classrooms?:  {
      __typename: "ModelPupilClassroomConnection",
      nextToken?: string | null,
    } | null,
    schoolID?: string | null,
    schoolHouseID?: string | null,
    schoolHouse?:  {
      __typename: "SchoolHouse",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    school?:  {
      __typename: "School",
      id: string,
      name?: string | null,
      country?: string | null,
      region?: string | null,
      principal?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    parents?:  {
      __typename: "ModelPupilParentConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    Interventions?:  {
      __typename: "ModelInterventionConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeletePupilSubscription = {
  onDeletePupil?:  {
    __typename: "Pupil",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    Attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    classrooms?:  {
      __typename: "ModelPupilClassroomConnection",
      nextToken?: string | null,
    } | null,
    schoolID?: string | null,
    schoolHouseID?: string | null,
    schoolHouse?:  {
      __typename: "SchoolHouse",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    school?:  {
      __typename: "School",
      id: string,
      name?: string | null,
      country?: string | null,
      region?: string | null,
      principal?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    parents?:  {
      __typename: "ModelPupilParentConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    Interventions?:  {
      __typename: "ModelInterventionConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnCreateInterventionSubscription = {
  onCreateIntervention?:  {
    __typename: "Intervention",
    id: string,
    pupilID: string,
    message?: string | null,
    createdAt: string,
    updatedAt: string,
    Pupil?:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnUpdateInterventionSubscription = {
  onUpdateIntervention?:  {
    __typename: "Intervention",
    id: string,
    pupilID: string,
    message?: string | null,
    createdAt: string,
    updatedAt: string,
    Pupil?:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnDeleteInterventionSubscription = {
  onDeleteIntervention?:  {
    __typename: "Intervention",
    id: string,
    pupilID: string,
    message?: string | null,
    createdAt: string,
    updatedAt: string,
    Pupil?:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};
