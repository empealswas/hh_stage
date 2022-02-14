/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  email?: string | null,
};

export type ModelUserConditionInput = {
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  email?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
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

export type User = {
  __typename: "User",
  id: string,
  firstName?: string | null,
  lastName?: string | null,
  email?: string | null,
  dependants?: ModelDependantGuardianConnection | null,
  organizations?: ModelUserInOrganizationConnection | null,
  ownedOrganizations?: ModelOrganizationConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelDependantGuardianConnection = {
  __typename: "ModelDependantGuardianConnection",
  items:  Array<DependantGuardian | null >,
  nextToken?: string | null,
};

export type DependantGuardian = {
  __typename: "DependantGuardian",
  guardian: User,
  dependant: User,
  id: string,
  createdAt: string,
  updatedAt: string,
  userDependantsId?: string | null,
};

export type ModelUserInOrganizationConnection = {
  __typename: "ModelUserInOrganizationConnection",
  items:  Array<UserInOrganization | null >,
  nextToken?: string | null,
};

export type UserInOrganization = {
  __typename: "UserInOrganization",
  userID?: string | null,
  organizationID?: string | null,
  user?: User | null,
  organization?: Organization | null,
  roles?: ModelRolesOfUserConnection | null,
  classrooms?: ModelUserInOrganizationInClassroomConnection | null,
  Attendances?: ModelAttendanceConnection | null,
  id: string,
  createdAt: string,
  updatedAt: string,
};

export type Organization = {
  __typename: "Organization",
  id: string,
  name?: string | null,
  owner: User,
  Principals?: ModelPrincipalConnection | null,
  WaitingForAcceptPupils?: ModelPupilOrganizationRequestConnection | null,
  AcceptedPupils?: ModelPupilOrganizationAcceptedConnection | null,
  Sections?: ModelSectionConnection | null,
  Teachers?: ModelTeacherOrganziationConnection | null,
  Classrooms?: ModelClassroomConnection | null,
  members?: ModelUserInOrganizationConnection | null,
  roles?: ModelUserRoleConnection | null,
  type?: string | null,
  logo?: File | null,
  createdAt: string,
  updatedAt: string,
  userOwnedOrganizationsId?: string | null,
  organizationLogoId?: string | null,
};

export type ModelPrincipalConnection = {
  __typename: "ModelPrincipalConnection",
  items:  Array<Principal | null >,
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
  Organization?: Organization | null,
  createdAt: string,
  updatedAt: string,
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
  Pupils?: ModelPupilConnection | null,
  classrooms?: ModelClassroomConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelTeacherConnection = {
  __typename: "ModelTeacherConnection",
  items:  Array<Teacher | null >,
  nextToken?: string | null,
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
  Organizations?: ModelTeacherOrganziationConnection | null,
  School?: School | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelTeacherClassroomConnection = {
  __typename: "ModelTeacherClassroomConnection",
  items:  Array<TeacherClassroom | null >,
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
  Organization?: Organization | null,
  yearGroupID?: string | null,
  yearGroup?: Curriculum | null,
  members?: ModelUserInOrganizationInClassroomConnection | null,
  LessonRecords?: ModelPELessonRecordConnection | null,
  createdAt: string,
  updatedAt: string,
  organizationClassroomsId?: string | null,
};

export type ModelPupilClassroomConnection = {
  __typename: "ModelPupilClassroomConnection",
  items:  Array<PupilClassroom | null >,
  nextToken?: string | null,
};

export type PupilClassroom = {
  __typename: "PupilClassroom",
  id: string,
  pupilID: string,
  classroomID: string,
  pupil: Pupil,
  classroom: Classroom,
  createdAt: string,
  updatedAt: string,
};

export type Pupil = {
  __typename: "Pupil",
  id: string,
  firstName?: string | null,
  lastName?: string | null,
  terraId?: string | null,
  provider?: string | null,
  Attendances?: ModelAttendanceConnection | null,
  classrooms?: ModelPupilClassroomConnection | null,
  Organizations?: ModelPupilOrganizationAcceptedConnection | null,
  OrganizationsRequests?: ModelPupilOrganizationRequestConnection | null,
  schoolID?: string | null,
  schoolHouseID?: string | null,
  schoolHouse?: SchoolHouse | null,
  school?: School | null,
  parents?: ModelPupilParentConnection | null,
  Interventions?: ModelInterventionConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelAttendanceConnection = {
  __typename: "ModelAttendanceConnection",
  items:  Array<Attendance | null >,
  nextToken?: string | null,
};

export type Attendance = {
  __typename: "Attendance",
  id: string,
  present?: boolean | null,
  wasRewarded?: boolean | null,
  pupilID?: string | null,
  lessonID?: string | null,
  Pupil?: Pupil | null,
  UserInOrganization: UserInOrganization,
  Lesson?: Lesson | null,
  lessonRecord?: PELessonRecord | null,
  lessonRecordID?: string | null,
  createdAt: string,
  updatedAt: string,
  userInOrganizationAttendancesId?: string | null,
};

export type Lesson = {
  __typename: "Lesson",
  id: string,
  title?: string | null,
  description?: string | null,
  sectionID?: string | null,
  Section?: Section | null,
  LessonsRecords?: ModelPELessonRecordConnection | null,
  terms?: ModelTermLessonConnection | null,
  Attendances?: ModelAttendanceConnection | null,
  Files?: ModelFileConnection | null,
  LessonTeacher?: ModelLessonTeacherConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type Section = {
  __typename: "Section",
  id: string,
  name?: string | null,
  parentID?: string | null,
  organizationID?: string | null,
  ParentSection?: Section | null,
  OrganizationOwner?: Organization | null,
  Lessons?: ModelLessonConnection | null,
  imagePreviewID?: string | null,
  ImagePreview?: File | null,
  SectionOptions?: SectionOptions | null,
  rolesThatCanAccess?: ModelRolesThatCanAccessConnection | null,
  createdAt: string,
  updatedAt: string,
  sectionSectionOptionsId?: string | null,
};

export type ModelLessonConnection = {
  __typename: "ModelLessonConnection",
  items:  Array<Lesson | null >,
  nextToken?: string | null,
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

export type SectionOptions = {
  __typename: "SectionOptions",
  id: string,
  Section?: Section | null,
  Activities?: Array< string | null > | null,
  Durations?: Array< number | null > | null,
  DeliveredBy?: Array< string | null > | null,
  createdAt: string,
  updatedAt: string,
  sectionOptionsSectionId?: string | null,
};

export type ModelRolesThatCanAccessConnection = {
  __typename: "ModelRolesThatCanAccessConnection",
  items:  Array<RolesThatCanAccess | null >,
  nextToken?: string | null,
};

export type RolesThatCanAccess = {
  __typename: "RolesThatCanAccess",
  id: string,
  userRoleID: string,
  sectionID: string,
  userRole: UserRole,
  section: Section,
  createdAt: string,
  updatedAt: string,
};

export type UserRole = {
  __typename: "UserRole",
  id: string,
  name: string,
  organization: Organization,
  users?: ModelRolesOfUserConnection | null,
  permissions?: RolePermissions | null,
  sectionAvailableForThatRole?: ModelRolesThatCanAccessConnection | null,
  createdAt: string,
  updatedAt: string,
  organizationRolesId?: string | null,
  userRolePermissionsId?: string | null,
};

export type ModelRolesOfUserConnection = {
  __typename: "ModelRolesOfUserConnection",
  items:  Array<RolesOfUser | null >,
  nextToken?: string | null,
};

export type RolesOfUser = {
  __typename: "RolesOfUser",
  id: string,
  userInOrganizationID: string,
  userRoleID: string,
  userInOrganization: UserInOrganization,
  userRole: UserRole,
  createdAt: string,
  updatedAt: string,
};

export type RolePermissions = {
  __typename: "RolePermissions",
  role?: UserRole | null,
  canAccessAttendanceSheet?: boolean | null,
  canCreateLesson?: boolean | null,
  canRateLessons?: boolean | null,
  canDeleteLessons?: boolean | null,
  canUpdateLesson?: boolean | null,
  canUploadContent?: boolean | null,
  canViewContent?: boolean | null,
  canCreateSection?: boolean | null,
  canDeleteSection?: boolean | null,
  canUpdateSection?: boolean | null,
  canViewDashboard?: boolean | null,
  id: string,
  createdAt: string,
  updatedAt: string,
  rolePermissionsRoleId?: string | null,
};

export type ModelPELessonRecordConnection = {
  __typename: "ModelPELessonRecordConnection",
  items:  Array<PELessonRecord | null >,
  nextToken?: string | null,
};

export type PELessonRecord = {
  __typename: "PELessonRecord",
  id: string,
  teacherID?: string | null,
  Teacher?: Teacher | null,
  Attendances?: ModelAttendanceConnection | null,
  date: string,
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

export type ModelTermLessonConnection = {
  __typename: "ModelTermLessonConnection",
  items:  Array<TermLesson | null >,
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
  items:  Array<SubjectTerm | null >,
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
  items:  Array<CurriculumSubject | null >,
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

export type ModelFileConnection = {
  __typename: "ModelFileConnection",
  items:  Array<File | null >,
  nextToken?: string | null,
};

export type ModelLessonTeacherConnection = {
  __typename: "ModelLessonTeacherConnection",
  items:  Array<LessonTeacher | null >,
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

export type ModelPupilOrganizationAcceptedConnection = {
  __typename: "ModelPupilOrganizationAcceptedConnection",
  items:  Array<PupilOrganizationAccepted | null >,
  nextToken?: string | null,
};

export type PupilOrganizationAccepted = {
  __typename: "PupilOrganizationAccepted",
  id: string,
  pupilID: string,
  organizationID: string,
  pupil: Pupil,
  organization: Organization,
  createdAt: string,
  updatedAt: string,
};

export type ModelPupilOrganizationRequestConnection = {
  __typename: "ModelPupilOrganizationRequestConnection",
  items:  Array<PupilOrganizationRequest | null >,
  nextToken?: string | null,
};

export type PupilOrganizationRequest = {
  __typename: "PupilOrganizationRequest",
  id: string,
  pupilID: string,
  organizationID: string,
  pupil: Pupil,
  organization: Organization,
  createdAt: string,
  updatedAt: string,
};

export type SchoolHouse = {
  __typename: "SchoolHouse",
  id: string,
  name?: string | null,
  Pupils?: ModelPupilConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelPupilConnection = {
  __typename: "ModelPupilConnection",
  items:  Array<Pupil | null >,
  nextToken?: string | null,
};

export type ModelPupilParentConnection = {
  __typename: "ModelPupilParentConnection",
  items:  Array<PupilParent | null >,
  nextToken?: string | null,
};

export type PupilParent = {
  __typename: "PupilParent",
  id: string,
  pupilID: string,
  parentID: string,
  Parent: Parent,
  Pupil: Pupil,
  createdAt: string,
  updatedAt: string,
};

export type Parent = {
  __typename: "Parent",
  id: string,
  firstName?: string | null,
  lastName?: string | null,
  email?: string | null,
  children?: ModelPupilParentConnection | null,
  InterventionFeedback?: ModelParentInterventionFeedbackConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelParentInterventionFeedbackConnection = {
  __typename: "ModelParentInterventionFeedbackConnection",
  items:  Array<ParentInterventionFeedback | null >,
  nextToken?: string | null,
};

export type ParentInterventionFeedback = {
  __typename: "ParentInterventionFeedback",
  id: string,
  parentID: string,
  interventionID: string,
  Parent: Parent,
  Intervention: Intervention,
  comment?: string | null,
  rating?: number | null,
  createdAt: string,
  updatedAt: string,
};

export type Intervention = {
  __typename: "Intervention",
  id: string,
  pupilID: string,
  Pupil?: Pupil | null,
  message?: string | null,
  viewed?: boolean | null,
  InterventionFeedback?: ModelParentInterventionFeedbackConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelInterventionConnection = {
  __typename: "ModelInterventionConnection",
  items:  Array<Intervention | null >,
  nextToken?: string | null,
};

export type ModelUserInOrganizationInClassroomConnection = {
  __typename: "ModelUserInOrganizationInClassroomConnection",
  items:  Array<UserInOrganizationInClassroom | null >,
  nextToken?: string | null,
};

export type UserInOrganizationInClassroom = {
  __typename: "UserInOrganizationInClassroom",
  id: string,
  userInOrganizationID: string,
  classroomID: string,
  userInOrganization: UserInOrganization,
  classroom: Classroom,
  createdAt: string,
  updatedAt: string,
};

export type ModelTeacherOrganziationConnection = {
  __typename: "ModelTeacherOrganziationConnection",
  items:  Array<TeacherOrganziation | null >,
  nextToken?: string | null,
};

export type TeacherOrganziation = {
  __typename: "TeacherOrganziation",
  id: string,
  organizationID: string,
  teacherID: string,
  organization: Organization,
  teacher: Teacher,
  createdAt: string,
  updatedAt: string,
};

export type ModelClassroomConnection = {
  __typename: "ModelClassroomConnection",
  items:  Array<Classroom | null >,
  nextToken?: string | null,
};

export type ModelSectionConnection = {
  __typename: "ModelSectionConnection",
  items:  Array<Section | null >,
  nextToken?: string | null,
};

export type ModelUserRoleConnection = {
  __typename: "ModelUserRoleConnection",
  items:  Array<UserRole | null >,
  nextToken?: string | null,
};

export type ModelOrganizationConnection = {
  __typename: "ModelOrganizationConnection",
  items:  Array<Organization | null >,
  nextToken?: string | null,
};

export type UpdateUserInput = {
  id: string,
  firstName?: string | null,
  lastName?: string | null,
  email?: string | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateDependantGuardianInput = {
  id?: string | null,
  userDependantsId?: string | null,
};

export type ModelDependantGuardianConditionInput = {
  and?: Array< ModelDependantGuardianConditionInput | null > | null,
  or?: Array< ModelDependantGuardianConditionInput | null > | null,
  not?: ModelDependantGuardianConditionInput | null,
  userDependantsId?: ModelIDInput | null,
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

export type UpdateDependantGuardianInput = {
  id: string,
  userDependantsId?: string | null,
};

export type DeleteDependantGuardianInput = {
  id: string,
};

export type CreateUserInOrganizationInput = {
  userID?: string | null,
  organizationID?: string | null,
  id?: string | null,
};

export type ModelUserInOrganizationConditionInput = {
  userID?: ModelIDInput | null,
  organizationID?: ModelIDInput | null,
  and?: Array< ModelUserInOrganizationConditionInput | null > | null,
  or?: Array< ModelUserInOrganizationConditionInput | null > | null,
  not?: ModelUserInOrganizationConditionInput | null,
};

export type UpdateUserInOrganizationInput = {
  userID?: string | null,
  organizationID?: string | null,
  id: string,
};

export type DeleteUserInOrganizationInput = {
  id: string,
};

export type CreateUserRoleInput = {
  id?: string | null,
  name: string,
  organizationRolesId?: string | null,
  userRolePermissionsId?: string | null,
};

export type ModelUserRoleConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelUserRoleConditionInput | null > | null,
  or?: Array< ModelUserRoleConditionInput | null > | null,
  not?: ModelUserRoleConditionInput | null,
  organizationRolesId?: ModelIDInput | null,
  userRolePermissionsId?: ModelIDInput | null,
};

export type UpdateUserRoleInput = {
  id: string,
  name?: string | null,
  organizationRolesId?: string | null,
  userRolePermissionsId?: string | null,
};

export type DeleteUserRoleInput = {
  id: string,
};

export type CreateRolePermissionsInput = {
  canAccessAttendanceSheet?: boolean | null,
  canCreateLesson?: boolean | null,
  canRateLessons?: boolean | null,
  canDeleteLessons?: boolean | null,
  canUpdateLesson?: boolean | null,
  canUploadContent?: boolean | null,
  canViewContent?: boolean | null,
  canCreateSection?: boolean | null,
  canDeleteSection?: boolean | null,
  canUpdateSection?: boolean | null,
  canViewDashboard?: boolean | null,
  id?: string | null,
  rolePermissionsRoleId?: string | null,
};

export type ModelRolePermissionsConditionInput = {
  canAccessAttendanceSheet?: ModelBooleanInput | null,
  canCreateLesson?: ModelBooleanInput | null,
  canRateLessons?: ModelBooleanInput | null,
  canDeleteLessons?: ModelBooleanInput | null,
  canUpdateLesson?: ModelBooleanInput | null,
  canUploadContent?: ModelBooleanInput | null,
  canViewContent?: ModelBooleanInput | null,
  canCreateSection?: ModelBooleanInput | null,
  canDeleteSection?: ModelBooleanInput | null,
  canUpdateSection?: ModelBooleanInput | null,
  canViewDashboard?: ModelBooleanInput | null,
  and?: Array< ModelRolePermissionsConditionInput | null > | null,
  or?: Array< ModelRolePermissionsConditionInput | null > | null,
  not?: ModelRolePermissionsConditionInput | null,
  rolePermissionsRoleId?: ModelIDInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateRolePermissionsInput = {
  canAccessAttendanceSheet?: boolean | null,
  canCreateLesson?: boolean | null,
  canRateLessons?: boolean | null,
  canDeleteLessons?: boolean | null,
  canUpdateLesson?: boolean | null,
  canUploadContent?: boolean | null,
  canViewContent?: boolean | null,
  canCreateSection?: boolean | null,
  canDeleteSection?: boolean | null,
  canUpdateSection?: boolean | null,
  canViewDashboard?: boolean | null,
  id: string,
  rolePermissionsRoleId?: string | null,
};

export type DeleteRolePermissionsInput = {
  id: string,
};

export type CreateOrganizationInput = {
  id?: string | null,
  name?: string | null,
  type?: string | null,
  userOwnedOrganizationsId?: string | null,
  organizationLogoId?: string | null,
};

export type ModelOrganizationConditionInput = {
  name?: ModelStringInput | null,
  type?: ModelStringInput | null,
  and?: Array< ModelOrganizationConditionInput | null > | null,
  or?: Array< ModelOrganizationConditionInput | null > | null,
  not?: ModelOrganizationConditionInput | null,
  userOwnedOrganizationsId?: ModelIDInput | null,
  organizationLogoId?: ModelIDInput | null,
};

export type UpdateOrganizationInput = {
  id: string,
  name?: string | null,
  type?: string | null,
  userOwnedOrganizationsId?: string | null,
  organizationLogoId?: string | null,
};

export type DeleteOrganizationInput = {
  id: string,
};

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
  organizationID?: string | null,
  imagePreviewID?: string | null,
  sectionSectionOptionsId?: string | null,
};

export type ModelSectionConditionInput = {
  name?: ModelStringInput | null,
  parentID?: ModelIDInput | null,
  organizationID?: ModelIDInput | null,
  imagePreviewID?: ModelIDInput | null,
  and?: Array< ModelSectionConditionInput | null > | null,
  or?: Array< ModelSectionConditionInput | null > | null,
  not?: ModelSectionConditionInput | null,
  sectionSectionOptionsId?: ModelIDInput | null,
};

export type UpdateSectionInput = {
  id: string,
  name?: string | null,
  parentID?: string | null,
  organizationID?: string | null,
  imagePreviewID?: string | null,
  sectionSectionOptionsId?: string | null,
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

export type CreateSectionOptionsInput = {
  id?: string | null,
  Activities?: Array< string | null > | null,
  Durations?: Array< number | null > | null,
  DeliveredBy?: Array< string | null > | null,
  sectionOptionsSectionId?: string | null,
};

export type ModelSectionOptionsConditionInput = {
  Activities?: ModelStringInput | null,
  Durations?: ModelIntInput | null,
  DeliveredBy?: ModelStringInput | null,
  and?: Array< ModelSectionOptionsConditionInput | null > | null,
  or?: Array< ModelSectionOptionsConditionInput | null > | null,
  not?: ModelSectionOptionsConditionInput | null,
  sectionOptionsSectionId?: ModelIDInput | null,
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

export type UpdateSectionOptionsInput = {
  id: string,
  Activities?: Array< string | null > | null,
  Durations?: Array< number | null > | null,
  DeliveredBy?: Array< string | null > | null,
  sectionOptionsSectionId?: string | null,
};

export type DeleteSectionOptionsInput = {
  id: string,
};

export type CreatePELessonRecordInput = {
  id?: string | null,
  teacherID?: string | null,
  date: string,
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
  organizationClassroomsId?: string | null,
};

export type ModelClassroomConditionInput = {
  name?: ModelStringInput | null,
  schoolID?: ModelIDInput | null,
  yearGroupID?: ModelIDInput | null,
  and?: Array< ModelClassroomConditionInput | null > | null,
  or?: Array< ModelClassroomConditionInput | null > | null,
  not?: ModelClassroomConditionInput | null,
  organizationClassroomsId?: ModelIDInput | null,
};

export type UpdateClassroomInput = {
  id: string,
  name?: string | null,
  schoolID?: string | null,
  yearGroupID?: string | null,
  organizationClassroomsId?: string | null,
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

export type CreatePupilOrganizationRequestInput = {
  id?: string | null,
  pupilID: string,
  organizationID: string,
};

export type ModelPupilOrganizationRequestConditionInput = {
  pupilID?: ModelIDInput | null,
  organizationID?: ModelIDInput | null,
  and?: Array< ModelPupilOrganizationRequestConditionInput | null > | null,
  or?: Array< ModelPupilOrganizationRequestConditionInput | null > | null,
  not?: ModelPupilOrganizationRequestConditionInput | null,
};

export type UpdatePupilOrganizationRequestInput = {
  id: string,
  pupilID?: string | null,
  organizationID?: string | null,
};

export type DeletePupilOrganizationRequestInput = {
  id: string,
};

export type CreatePupilOrganizationAcceptedInput = {
  id?: string | null,
  pupilID: string,
  organizationID: string,
};

export type ModelPupilOrganizationAcceptedConditionInput = {
  pupilID?: ModelIDInput | null,
  organizationID?: ModelIDInput | null,
  and?: Array< ModelPupilOrganizationAcceptedConditionInput | null > | null,
  or?: Array< ModelPupilOrganizationAcceptedConditionInput | null > | null,
  not?: ModelPupilOrganizationAcceptedConditionInput | null,
};

export type UpdatePupilOrganizationAcceptedInput = {
  id: string,
  pupilID?: string | null,
  organizationID?: string | null,
};

export type DeletePupilOrganizationAcceptedInput = {
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
  userInOrganizationAttendancesId?: string | null,
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
  userInOrganizationAttendancesId?: ModelIDInput | null,
};

export type UpdateAttendanceInput = {
  id: string,
  present?: boolean | null,
  wasRewarded?: boolean | null,
  pupilID?: string | null,
  lessonID?: string | null,
  lessonRecordID?: string | null,
  userInOrganizationAttendancesId?: string | null,
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

export type CreatePupilInput = {
  id?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  terraId?: string | null,
  provider?: string | null,
  schoolID?: string | null,
  schoolHouseID?: string | null,
};

export type ModelPupilConditionInput = {
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  terraId?: ModelStringInput | null,
  provider?: ModelStringInput | null,
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
  terraId?: string | null,
  provider?: string | null,
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
  viewed?: boolean | null,
  createdAt?: string | null,
};

export type ModelInterventionConditionInput = {
  pupilID?: ModelIDInput | null,
  message?: ModelStringInput | null,
  viewed?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelInterventionConditionInput | null > | null,
  or?: Array< ModelInterventionConditionInput | null > | null,
  not?: ModelInterventionConditionInput | null,
};

export type UpdateInterventionInput = {
  id: string,
  pupilID?: string | null,
  message?: string | null,
  viewed?: boolean | null,
  createdAt?: string | null,
};

export type DeleteInterventionInput = {
  id: string,
};

export type CreateParentInterventionFeedbackInput = {
  id?: string | null,
  parentID: string,
  interventionID: string,
  comment?: string | null,
  rating?: number | null,
};

export type ModelParentInterventionFeedbackConditionInput = {
  parentID?: ModelIDInput | null,
  interventionID?: ModelIDInput | null,
  comment?: ModelStringInput | null,
  rating?: ModelIntInput | null,
  and?: Array< ModelParentInterventionFeedbackConditionInput | null > | null,
  or?: Array< ModelParentInterventionFeedbackConditionInput | null > | null,
  not?: ModelParentInterventionFeedbackConditionInput | null,
};

export type UpdateParentInterventionFeedbackInput = {
  id: string,
  parentID?: string | null,
  interventionID?: string | null,
  comment?: string | null,
  rating?: number | null,
};

export type DeleteParentInterventionFeedbackInput = {
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

export type CreateRolesOfUserInput = {
  id?: string | null,
  userInOrganizationID: string,
  userRoleID: string,
};

export type ModelRolesOfUserConditionInput = {
  userInOrganizationID?: ModelIDInput | null,
  userRoleID?: ModelIDInput | null,
  and?: Array< ModelRolesOfUserConditionInput | null > | null,
  or?: Array< ModelRolesOfUserConditionInput | null > | null,
  not?: ModelRolesOfUserConditionInput | null,
};

export type UpdateRolesOfUserInput = {
  id: string,
  userInOrganizationID?: string | null,
  userRoleID?: string | null,
};

export type DeleteRolesOfUserInput = {
  id: string,
};

export type CreateUserInOrganizationInClassroomInput = {
  id?: string | null,
  userInOrganizationID: string,
  classroomID: string,
};

export type ModelUserInOrganizationInClassroomConditionInput = {
  userInOrganizationID?: ModelIDInput | null,
  classroomID?: ModelIDInput | null,
  and?: Array< ModelUserInOrganizationInClassroomConditionInput | null > | null,
  or?: Array< ModelUserInOrganizationInClassroomConditionInput | null > | null,
  not?: ModelUserInOrganizationInClassroomConditionInput | null,
};

export type UpdateUserInOrganizationInClassroomInput = {
  id: string,
  userInOrganizationID?: string | null,
  classroomID?: string | null,
};

export type DeleteUserInOrganizationInClassroomInput = {
  id: string,
};

export type CreateRolesThatCanAccessInput = {
  id?: string | null,
  userRoleID: string,
  sectionID: string,
};

export type ModelRolesThatCanAccessConditionInput = {
  userRoleID?: ModelIDInput | null,
  sectionID?: ModelIDInput | null,
  and?: Array< ModelRolesThatCanAccessConditionInput | null > | null,
  or?: Array< ModelRolesThatCanAccessConditionInput | null > | null,
  not?: ModelRolesThatCanAccessConditionInput | null,
};

export type UpdateRolesThatCanAccessInput = {
  id: string,
  userRoleID?: string | null,
  sectionID?: string | null,
};

export type DeleteRolesThatCanAccessInput = {
  id: string,
};

export type CreateTeacherOrganziationInput = {
  id?: string | null,
  organizationID: string,
  teacherID: string,
};

export type ModelTeacherOrganziationConditionInput = {
  organizationID?: ModelIDInput | null,
  teacherID?: ModelIDInput | null,
  and?: Array< ModelTeacherOrganziationConditionInput | null > | null,
  or?: Array< ModelTeacherOrganziationConditionInput | null > | null,
  not?: ModelTeacherOrganziationConditionInput | null,
};

export type UpdateTeacherOrganziationInput = {
  id: string,
  organizationID?: string | null,
  teacherID?: string | null,
};

export type DeleteTeacherOrganziationInput = {
  id: string,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  email?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelDependantGuardianFilterInput = {
  and?: Array< ModelDependantGuardianFilterInput | null > | null,
  or?: Array< ModelDependantGuardianFilterInput | null > | null,
  not?: ModelDependantGuardianFilterInput | null,
  userDependantsId?: ModelIDInput | null,
};

export type ModelUserInOrganizationFilterInput = {
  userID?: ModelIDInput | null,
  organizationID?: ModelIDInput | null,
  and?: Array< ModelUserInOrganizationFilterInput | null > | null,
  or?: Array< ModelUserInOrganizationFilterInput | null > | null,
  not?: ModelUserInOrganizationFilterInput | null,
};

export type ModelUserRoleFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelUserRoleFilterInput | null > | null,
  or?: Array< ModelUserRoleFilterInput | null > | null,
  not?: ModelUserRoleFilterInput | null,
  organizationRolesId?: ModelIDInput | null,
  userRolePermissionsId?: ModelIDInput | null,
};

export type ModelRolePermissionsFilterInput = {
  canAccessAttendanceSheet?: ModelBooleanInput | null,
  canCreateLesson?: ModelBooleanInput | null,
  canRateLessons?: ModelBooleanInput | null,
  canDeleteLessons?: ModelBooleanInput | null,
  canUpdateLesson?: ModelBooleanInput | null,
  canUploadContent?: ModelBooleanInput | null,
  canViewContent?: ModelBooleanInput | null,
  canCreateSection?: ModelBooleanInput | null,
  canDeleteSection?: ModelBooleanInput | null,
  canUpdateSection?: ModelBooleanInput | null,
  canViewDashboard?: ModelBooleanInput | null,
  and?: Array< ModelRolePermissionsFilterInput | null > | null,
  or?: Array< ModelRolePermissionsFilterInput | null > | null,
  not?: ModelRolePermissionsFilterInput | null,
  rolePermissionsRoleId?: ModelIDInput | null,
};

export type ModelRolePermissionsConnection = {
  __typename: "ModelRolePermissionsConnection",
  items:  Array<RolePermissions | null >,
  nextToken?: string | null,
};

export type ModelOrganizationFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  type?: ModelStringInput | null,
  and?: Array< ModelOrganizationFilterInput | null > | null,
  or?: Array< ModelOrganizationFilterInput | null > | null,
  not?: ModelOrganizationFilterInput | null,
  userOwnedOrganizationsId?: ModelIDInput | null,
  organizationLogoId?: ModelIDInput | null,
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
  organizationID?: ModelIDInput | null,
  imagePreviewID?: ModelIDInput | null,
  and?: Array< ModelSectionFilterInput | null > | null,
  or?: Array< ModelSectionFilterInput | null > | null,
  not?: ModelSectionFilterInput | null,
  sectionSectionOptionsId?: ModelIDInput | null,
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

export type ModelSectionOptionsFilterInput = {
  id?: ModelIDInput | null,
  Activities?: ModelStringInput | null,
  Durations?: ModelIntInput | null,
  DeliveredBy?: ModelStringInput | null,
  and?: Array< ModelSectionOptionsFilterInput | null > | null,
  or?: Array< ModelSectionOptionsFilterInput | null > | null,
  not?: ModelSectionOptionsFilterInput | null,
  sectionOptionsSectionId?: ModelIDInput | null,
};

export type ModelSectionOptionsConnection = {
  __typename: "ModelSectionOptionsConnection",
  items:  Array<SectionOptions | null >,
  nextToken?: string | null,
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

export type ModelIDKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
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
  items:  Array<SchoolHouse | null >,
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
  items:  Array<ClassroomLesson | null >,
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
  organizationClassroomsId?: ModelIDInput | null,
};

export type ModelPupilOrganizationRequestFilterInput = {
  id?: ModelIDInput | null,
  pupilID?: ModelIDInput | null,
  organizationID?: ModelIDInput | null,
  and?: Array< ModelPupilOrganizationRequestFilterInput | null > | null,
  or?: Array< ModelPupilOrganizationRequestFilterInput | null > | null,
  not?: ModelPupilOrganizationRequestFilterInput | null,
};

export type ModelPupilOrganizationAcceptedFilterInput = {
  id?: ModelIDInput | null,
  pupilID?: ModelIDInput | null,
  organizationID?: ModelIDInput | null,
  and?: Array< ModelPupilOrganizationAcceptedFilterInput | null > | null,
  or?: Array< ModelPupilOrganizationAcceptedFilterInput | null > | null,
  not?: ModelPupilOrganizationAcceptedFilterInput | null,
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
  items:  Array<School | null >,
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
  userInOrganizationAttendancesId?: ModelIDInput | null,
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
  items:  Array<Term | null >,
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
  items:  Array<Subject | null >,
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
  items:  Array<Curriculum | null >,
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
  items:  Array<Parent | null >,
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

export type ModelPupilFilterInput = {
  id?: ModelIDInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  terraId?: ModelStringInput | null,
  provider?: ModelStringInput | null,
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
  viewed?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelInterventionFilterInput | null > | null,
  or?: Array< ModelInterventionFilterInput | null > | null,
  not?: ModelInterventionFilterInput | null,
};

export type ModelParentInterventionFeedbackFilterInput = {
  id?: ModelIDInput | null,
  parentID?: ModelIDInput | null,
  interventionID?: ModelIDInput | null,
  comment?: ModelStringInput | null,
  rating?: ModelIntInput | null,
  and?: Array< ModelParentInterventionFeedbackFilterInput | null > | null,
  or?: Array< ModelParentInterventionFeedbackFilterInput | null > | null,
  not?: ModelParentInterventionFeedbackFilterInput | null,
};

export type ModelRolesOfUserFilterInput = {
  id?: ModelIDInput | null,
  userInOrganizationID?: ModelIDInput | null,
  userRoleID?: ModelIDInput | null,
  and?: Array< ModelRolesOfUserFilterInput | null > | null,
  or?: Array< ModelRolesOfUserFilterInput | null > | null,
  not?: ModelRolesOfUserFilterInput | null,
};

export type ModelUserInOrganizationInClassroomFilterInput = {
  id?: ModelIDInput | null,
  userInOrganizationID?: ModelIDInput | null,
  classroomID?: ModelIDInput | null,
  and?: Array< ModelUserInOrganizationInClassroomFilterInput | null > | null,
  or?: Array< ModelUserInOrganizationInClassroomFilterInput | null > | null,
  not?: ModelUserInOrganizationInClassroomFilterInput | null,
};

export type ModelRolesThatCanAccessFilterInput = {
  id?: ModelIDInput | null,
  userRoleID?: ModelIDInput | null,
  sectionID?: ModelIDInput | null,
  and?: Array< ModelRolesThatCanAccessFilterInput | null > | null,
  or?: Array< ModelRolesThatCanAccessFilterInput | null > | null,
  not?: ModelRolesThatCanAccessFilterInput | null,
};

export type ModelTeacherOrganziationFilterInput = {
  id?: ModelIDInput | null,
  organizationID?: ModelIDInput | null,
  teacherID?: ModelIDInput | null,
  and?: Array< ModelTeacherOrganziationFilterInput | null > | null,
  or?: Array< ModelTeacherOrganziationFilterInput | null > | null,
  not?: ModelTeacherOrganziationFilterInput | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    dependants?:  {
      __typename: "ModelDependantGuardianConnection",
      nextToken?: string | null,
    } | null,
    organizations?:  {
      __typename: "ModelUserInOrganizationConnection",
      nextToken?: string | null,
    } | null,
    ownedOrganizations?:  {
      __typename: "ModelOrganizationConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    dependants?:  {
      __typename: "ModelDependantGuardianConnection",
      nextToken?: string | null,
    } | null,
    organizations?:  {
      __typename: "ModelUserInOrganizationConnection",
      nextToken?: string | null,
    } | null,
    ownedOrganizations?:  {
      __typename: "ModelOrganizationConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    dependants?:  {
      __typename: "ModelDependantGuardianConnection",
      nextToken?: string | null,
    } | null,
    organizations?:  {
      __typename: "ModelUserInOrganizationConnection",
      nextToken?: string | null,
    } | null,
    ownedOrganizations?:  {
      __typename: "ModelOrganizationConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateDependantGuardianMutationVariables = {
  input: CreateDependantGuardianInput,
  condition?: ModelDependantGuardianConditionInput | null,
};

export type CreateDependantGuardianMutation = {
  createDependantGuardian?:  {
    __typename: "DependantGuardian",
    guardian:  {
      __typename: "User",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    dependant:  {
      __typename: "User",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    id: string,
    createdAt: string,
    updatedAt: string,
    userDependantsId?: string | null,
  } | null,
};

export type UpdateDependantGuardianMutationVariables = {
  input: UpdateDependantGuardianInput,
  condition?: ModelDependantGuardianConditionInput | null,
};

export type UpdateDependantGuardianMutation = {
  updateDependantGuardian?:  {
    __typename: "DependantGuardian",
    guardian:  {
      __typename: "User",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    dependant:  {
      __typename: "User",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    id: string,
    createdAt: string,
    updatedAt: string,
    userDependantsId?: string | null,
  } | null,
};

export type DeleteDependantGuardianMutationVariables = {
  input: DeleteDependantGuardianInput,
  condition?: ModelDependantGuardianConditionInput | null,
};

export type DeleteDependantGuardianMutation = {
  deleteDependantGuardian?:  {
    __typename: "DependantGuardian",
    guardian:  {
      __typename: "User",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    dependant:  {
      __typename: "User",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    id: string,
    createdAt: string,
    updatedAt: string,
    userDependantsId?: string | null,
  } | null,
};

export type CreateUserInOrganizationMutationVariables = {
  input: CreateUserInOrganizationInput,
  condition?: ModelUserInOrganizationConditionInput | null,
};

export type CreateUserInOrganizationMutation = {
  createUserInOrganization?:  {
    __typename: "UserInOrganization",
    userID?: string | null,
    organizationID?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    organization?:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    } | null,
    roles?:  {
      __typename: "ModelRolesOfUserConnection",
      nextToken?: string | null,
    } | null,
    classrooms?:  {
      __typename: "ModelUserInOrganizationInClassroomConnection",
      nextToken?: string | null,
    } | null,
    Attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserInOrganizationMutationVariables = {
  input: UpdateUserInOrganizationInput,
  condition?: ModelUserInOrganizationConditionInput | null,
};

export type UpdateUserInOrganizationMutation = {
  updateUserInOrganization?:  {
    __typename: "UserInOrganization",
    userID?: string | null,
    organizationID?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    organization?:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    } | null,
    roles?:  {
      __typename: "ModelRolesOfUserConnection",
      nextToken?: string | null,
    } | null,
    classrooms?:  {
      __typename: "ModelUserInOrganizationInClassroomConnection",
      nextToken?: string | null,
    } | null,
    Attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserInOrganizationMutationVariables = {
  input: DeleteUserInOrganizationInput,
  condition?: ModelUserInOrganizationConditionInput | null,
};

export type DeleteUserInOrganizationMutation = {
  deleteUserInOrganization?:  {
    __typename: "UserInOrganization",
    userID?: string | null,
    organizationID?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    organization?:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    } | null,
    roles?:  {
      __typename: "ModelRolesOfUserConnection",
      nextToken?: string | null,
    } | null,
    classrooms?:  {
      __typename: "ModelUserInOrganizationInClassroomConnection",
      nextToken?: string | null,
    } | null,
    Attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserRoleMutationVariables = {
  input: CreateUserRoleInput,
  condition?: ModelUserRoleConditionInput | null,
};

export type CreateUserRoleMutation = {
  createUserRole?:  {
    __typename: "UserRole",
    id: string,
    name: string,
    organization:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    },
    users?:  {
      __typename: "ModelRolesOfUserConnection",
      nextToken?: string | null,
    } | null,
    permissions?:  {
      __typename: "RolePermissions",
      canAccessAttendanceSheet?: boolean | null,
      canCreateLesson?: boolean | null,
      canRateLessons?: boolean | null,
      canDeleteLessons?: boolean | null,
      canUpdateLesson?: boolean | null,
      canUploadContent?: boolean | null,
      canViewContent?: boolean | null,
      canCreateSection?: boolean | null,
      canDeleteSection?: boolean | null,
      canUpdateSection?: boolean | null,
      canViewDashboard?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      rolePermissionsRoleId?: string | null,
    } | null,
    sectionAvailableForThatRole?:  {
      __typename: "ModelRolesThatCanAccessConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    organizationRolesId?: string | null,
    userRolePermissionsId?: string | null,
  } | null,
};

export type UpdateUserRoleMutationVariables = {
  input: UpdateUserRoleInput,
  condition?: ModelUserRoleConditionInput | null,
};

export type UpdateUserRoleMutation = {
  updateUserRole?:  {
    __typename: "UserRole",
    id: string,
    name: string,
    organization:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    },
    users?:  {
      __typename: "ModelRolesOfUserConnection",
      nextToken?: string | null,
    } | null,
    permissions?:  {
      __typename: "RolePermissions",
      canAccessAttendanceSheet?: boolean | null,
      canCreateLesson?: boolean | null,
      canRateLessons?: boolean | null,
      canDeleteLessons?: boolean | null,
      canUpdateLesson?: boolean | null,
      canUploadContent?: boolean | null,
      canViewContent?: boolean | null,
      canCreateSection?: boolean | null,
      canDeleteSection?: boolean | null,
      canUpdateSection?: boolean | null,
      canViewDashboard?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      rolePermissionsRoleId?: string | null,
    } | null,
    sectionAvailableForThatRole?:  {
      __typename: "ModelRolesThatCanAccessConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    organizationRolesId?: string | null,
    userRolePermissionsId?: string | null,
  } | null,
};

export type DeleteUserRoleMutationVariables = {
  input: DeleteUserRoleInput,
  condition?: ModelUserRoleConditionInput | null,
};

export type DeleteUserRoleMutation = {
  deleteUserRole?:  {
    __typename: "UserRole",
    id: string,
    name: string,
    organization:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    },
    users?:  {
      __typename: "ModelRolesOfUserConnection",
      nextToken?: string | null,
    } | null,
    permissions?:  {
      __typename: "RolePermissions",
      canAccessAttendanceSheet?: boolean | null,
      canCreateLesson?: boolean | null,
      canRateLessons?: boolean | null,
      canDeleteLessons?: boolean | null,
      canUpdateLesson?: boolean | null,
      canUploadContent?: boolean | null,
      canViewContent?: boolean | null,
      canCreateSection?: boolean | null,
      canDeleteSection?: boolean | null,
      canUpdateSection?: boolean | null,
      canViewDashboard?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      rolePermissionsRoleId?: string | null,
    } | null,
    sectionAvailableForThatRole?:  {
      __typename: "ModelRolesThatCanAccessConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    organizationRolesId?: string | null,
    userRolePermissionsId?: string | null,
  } | null,
};

export type CreateRolePermissionsMutationVariables = {
  input: CreateRolePermissionsInput,
  condition?: ModelRolePermissionsConditionInput | null,
};

export type CreateRolePermissionsMutation = {
  createRolePermissions?:  {
    __typename: "RolePermissions",
    role?:  {
      __typename: "UserRole",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      organizationRolesId?: string | null,
      userRolePermissionsId?: string | null,
    } | null,
    canAccessAttendanceSheet?: boolean | null,
    canCreateLesson?: boolean | null,
    canRateLessons?: boolean | null,
    canDeleteLessons?: boolean | null,
    canUpdateLesson?: boolean | null,
    canUploadContent?: boolean | null,
    canViewContent?: boolean | null,
    canCreateSection?: boolean | null,
    canDeleteSection?: boolean | null,
    canUpdateSection?: boolean | null,
    canViewDashboard?: boolean | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    rolePermissionsRoleId?: string | null,
  } | null,
};

export type UpdateRolePermissionsMutationVariables = {
  input: UpdateRolePermissionsInput,
  condition?: ModelRolePermissionsConditionInput | null,
};

export type UpdateRolePermissionsMutation = {
  updateRolePermissions?:  {
    __typename: "RolePermissions",
    role?:  {
      __typename: "UserRole",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      organizationRolesId?: string | null,
      userRolePermissionsId?: string | null,
    } | null,
    canAccessAttendanceSheet?: boolean | null,
    canCreateLesson?: boolean | null,
    canRateLessons?: boolean | null,
    canDeleteLessons?: boolean | null,
    canUpdateLesson?: boolean | null,
    canUploadContent?: boolean | null,
    canViewContent?: boolean | null,
    canCreateSection?: boolean | null,
    canDeleteSection?: boolean | null,
    canUpdateSection?: boolean | null,
    canViewDashboard?: boolean | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    rolePermissionsRoleId?: string | null,
  } | null,
};

export type DeleteRolePermissionsMutationVariables = {
  input: DeleteRolePermissionsInput,
  condition?: ModelRolePermissionsConditionInput | null,
};

export type DeleteRolePermissionsMutation = {
  deleteRolePermissions?:  {
    __typename: "RolePermissions",
    role?:  {
      __typename: "UserRole",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      organizationRolesId?: string | null,
      userRolePermissionsId?: string | null,
    } | null,
    canAccessAttendanceSheet?: boolean | null,
    canCreateLesson?: boolean | null,
    canRateLessons?: boolean | null,
    canDeleteLessons?: boolean | null,
    canUpdateLesson?: boolean | null,
    canUploadContent?: boolean | null,
    canViewContent?: boolean | null,
    canCreateSection?: boolean | null,
    canDeleteSection?: boolean | null,
    canUpdateSection?: boolean | null,
    canViewDashboard?: boolean | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    rolePermissionsRoleId?: string | null,
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
    owner:  {
      __typename: "User",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    Principals?:  {
      __typename: "ModelPrincipalConnection",
      nextToken?: string | null,
    } | null,
    WaitingForAcceptPupils?:  {
      __typename: "ModelPupilOrganizationRequestConnection",
      nextToken?: string | null,
    } | null,
    AcceptedPupils?:  {
      __typename: "ModelPupilOrganizationAcceptedConnection",
      nextToken?: string | null,
    } | null,
    Sections?:  {
      __typename: "ModelSectionConnection",
      nextToken?: string | null,
    } | null,
    Teachers?:  {
      __typename: "ModelTeacherOrganziationConnection",
      nextToken?: string | null,
    } | null,
    Classrooms?:  {
      __typename: "ModelClassroomConnection",
      nextToken?: string | null,
    } | null,
    members?:  {
      __typename: "ModelUserInOrganizationConnection",
      nextToken?: string | null,
    } | null,
    roles?:  {
      __typename: "ModelUserRoleConnection",
      nextToken?: string | null,
    } | null,
    type?: string | null,
    logo?:  {
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
    userOwnedOrganizationsId?: string | null,
    organizationLogoId?: string | null,
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
    owner:  {
      __typename: "User",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    Principals?:  {
      __typename: "ModelPrincipalConnection",
      nextToken?: string | null,
    } | null,
    WaitingForAcceptPupils?:  {
      __typename: "ModelPupilOrganizationRequestConnection",
      nextToken?: string | null,
    } | null,
    AcceptedPupils?:  {
      __typename: "ModelPupilOrganizationAcceptedConnection",
      nextToken?: string | null,
    } | null,
    Sections?:  {
      __typename: "ModelSectionConnection",
      nextToken?: string | null,
    } | null,
    Teachers?:  {
      __typename: "ModelTeacherOrganziationConnection",
      nextToken?: string | null,
    } | null,
    Classrooms?:  {
      __typename: "ModelClassroomConnection",
      nextToken?: string | null,
    } | null,
    members?:  {
      __typename: "ModelUserInOrganizationConnection",
      nextToken?: string | null,
    } | null,
    roles?:  {
      __typename: "ModelUserRoleConnection",
      nextToken?: string | null,
    } | null,
    type?: string | null,
    logo?:  {
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
    userOwnedOrganizationsId?: string | null,
    organizationLogoId?: string | null,
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
    owner:  {
      __typename: "User",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    Principals?:  {
      __typename: "ModelPrincipalConnection",
      nextToken?: string | null,
    } | null,
    WaitingForAcceptPupils?:  {
      __typename: "ModelPupilOrganizationRequestConnection",
      nextToken?: string | null,
    } | null,
    AcceptedPupils?:  {
      __typename: "ModelPupilOrganizationAcceptedConnection",
      nextToken?: string | null,
    } | null,
    Sections?:  {
      __typename: "ModelSectionConnection",
      nextToken?: string | null,
    } | null,
    Teachers?:  {
      __typename: "ModelTeacherOrganziationConnection",
      nextToken?: string | null,
    } | null,
    Classrooms?:  {
      __typename: "ModelClassroomConnection",
      nextToken?: string | null,
    } | null,
    members?:  {
      __typename: "ModelUserInOrganizationConnection",
      nextToken?: string | null,
    } | null,
    roles?:  {
      __typename: "ModelUserRoleConnection",
      nextToken?: string | null,
    } | null,
    type?: string | null,
    logo?:  {
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
    userOwnedOrganizationsId?: string | null,
    organizationLogoId?: string | null,
  } | null,
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
    organizationID?: string | null,
    ParentSection?:  {
      __typename: "Section",
      id: string,
      name?: string | null,
      parentID?: string | null,
      organizationID?: string | null,
      imagePreviewID?: string | null,
      createdAt: string,
      updatedAt: string,
      sectionSectionOptionsId?: string | null,
    } | null,
    OrganizationOwner?:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
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
    SectionOptions?:  {
      __typename: "SectionOptions",
      id: string,
      Activities?: Array< string | null > | null,
      Durations?: Array< number | null > | null,
      DeliveredBy?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
      sectionOptionsSectionId?: string | null,
    } | null,
    rolesThatCanAccess?:  {
      __typename: "ModelRolesThatCanAccessConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    sectionSectionOptionsId?: string | null,
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
    organizationID?: string | null,
    ParentSection?:  {
      __typename: "Section",
      id: string,
      name?: string | null,
      parentID?: string | null,
      organizationID?: string | null,
      imagePreviewID?: string | null,
      createdAt: string,
      updatedAt: string,
      sectionSectionOptionsId?: string | null,
    } | null,
    OrganizationOwner?:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
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
    SectionOptions?:  {
      __typename: "SectionOptions",
      id: string,
      Activities?: Array< string | null > | null,
      Durations?: Array< number | null > | null,
      DeliveredBy?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
      sectionOptionsSectionId?: string | null,
    } | null,
    rolesThatCanAccess?:  {
      __typename: "ModelRolesThatCanAccessConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    sectionSectionOptionsId?: string | null,
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
    organizationID?: string | null,
    ParentSection?:  {
      __typename: "Section",
      id: string,
      name?: string | null,
      parentID?: string | null,
      organizationID?: string | null,
      imagePreviewID?: string | null,
      createdAt: string,
      updatedAt: string,
      sectionSectionOptionsId?: string | null,
    } | null,
    OrganizationOwner?:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
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
    SectionOptions?:  {
      __typename: "SectionOptions",
      id: string,
      Activities?: Array< string | null > | null,
      Durations?: Array< number | null > | null,
      DeliveredBy?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
      sectionOptionsSectionId?: string | null,
    } | null,
    rolesThatCanAccess?:  {
      __typename: "ModelRolesThatCanAccessConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    sectionSectionOptionsId?: string | null,
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
      organizationID?: string | null,
      imagePreviewID?: string | null,
      createdAt: string,
      updatedAt: string,
      sectionSectionOptionsId?: string | null,
    } | null,
    LessonsRecords?:  {
      __typename: "ModelPELessonRecordConnection",
      nextToken?: string | null,
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
      organizationID?: string | null,
      imagePreviewID?: string | null,
      createdAt: string,
      updatedAt: string,
      sectionSectionOptionsId?: string | null,
    } | null,
    LessonsRecords?:  {
      __typename: "ModelPELessonRecordConnection",
      nextToken?: string | null,
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
      organizationID?: string | null,
      imagePreviewID?: string | null,
      createdAt: string,
      updatedAt: string,
      sectionSectionOptionsId?: string | null,
    } | null,
    LessonsRecords?:  {
      __typename: "ModelPELessonRecordConnection",
      nextToken?: string | null,
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
  } | null,
};

export type CreateSectionOptionsMutationVariables = {
  input: CreateSectionOptionsInput,
  condition?: ModelSectionOptionsConditionInput | null,
};

export type CreateSectionOptionsMutation = {
  createSectionOptions?:  {
    __typename: "SectionOptions",
    id: string,
    Section?:  {
      __typename: "Section",
      id: string,
      name?: string | null,
      parentID?: string | null,
      organizationID?: string | null,
      imagePreviewID?: string | null,
      createdAt: string,
      updatedAt: string,
      sectionSectionOptionsId?: string | null,
    } | null,
    Activities?: Array< string | null > | null,
    Durations?: Array< number | null > | null,
    DeliveredBy?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    sectionOptionsSectionId?: string | null,
  } | null,
};

export type UpdateSectionOptionsMutationVariables = {
  input: UpdateSectionOptionsInput,
  condition?: ModelSectionOptionsConditionInput | null,
};

export type UpdateSectionOptionsMutation = {
  updateSectionOptions?:  {
    __typename: "SectionOptions",
    id: string,
    Section?:  {
      __typename: "Section",
      id: string,
      name?: string | null,
      parentID?: string | null,
      organizationID?: string | null,
      imagePreviewID?: string | null,
      createdAt: string,
      updatedAt: string,
      sectionSectionOptionsId?: string | null,
    } | null,
    Activities?: Array< string | null > | null,
    Durations?: Array< number | null > | null,
    DeliveredBy?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    sectionOptionsSectionId?: string | null,
  } | null,
};

export type DeleteSectionOptionsMutationVariables = {
  input: DeleteSectionOptionsInput,
  condition?: ModelSectionOptionsConditionInput | null,
};

export type DeleteSectionOptionsMutation = {
  deleteSectionOptions?:  {
    __typename: "SectionOptions",
    id: string,
    Section?:  {
      __typename: "Section",
      id: string,
      name?: string | null,
      parentID?: string | null,
      organizationID?: string | null,
      imagePreviewID?: string | null,
      createdAt: string,
      updatedAt: string,
      sectionSectionOptionsId?: string | null,
    } | null,
    Activities?: Array< string | null > | null,
    Durations?: Array< number | null > | null,
    DeliveredBy?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    sectionOptionsSectionId?: string | null,
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
    date: string,
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
      organizationClassroomsId?: string | null,
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
    date: string,
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
      organizationClassroomsId?: string | null,
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
    date: string,
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
      organizationClassroomsId?: string | null,
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

export type CreateSchoolHouseMutationVariables = {
  input: CreateSchoolHouseInput,
  condition?: ModelSchoolHouseConditionInput | null,
};

export type CreateSchoolHouseMutation = {
  createSchoolHouse?:  {
    __typename: "SchoolHouse",
    id: string,
    name?: string | null,
    Pupils?:  {
      __typename: "ModelPupilConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    Pupils?:  {
      __typename: "ModelPupilConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    Pupils?:  {
      __typename: "ModelPupilConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
      organizationClassroomsId?: string | null,
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
      organizationClassroomsId?: string | null,
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
      organizationClassroomsId?: string | null,
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
    Organization?:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    } | null,
    yearGroupID?: string | null,
    yearGroup?:  {
      __typename: "Curriculum",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    members?:  {
      __typename: "ModelUserInOrganizationInClassroomConnection",
      nextToken?: string | null,
    } | null,
    LessonRecords?:  {
      __typename: "ModelPELessonRecordConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    organizationClassroomsId?: string | null,
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
    Organization?:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    } | null,
    yearGroupID?: string | null,
    yearGroup?:  {
      __typename: "Curriculum",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    members?:  {
      __typename: "ModelUserInOrganizationInClassroomConnection",
      nextToken?: string | null,
    } | null,
    LessonRecords?:  {
      __typename: "ModelPELessonRecordConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    organizationClassroomsId?: string | null,
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
    Organization?:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    } | null,
    yearGroupID?: string | null,
    yearGroup?:  {
      __typename: "Curriculum",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    members?:  {
      __typename: "ModelUserInOrganizationInClassroomConnection",
      nextToken?: string | null,
    } | null,
    LessonRecords?:  {
      __typename: "ModelPELessonRecordConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    organizationClassroomsId?: string | null,
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
      organizationClassroomsId?: string | null,
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
      organizationClassroomsId?: string | null,
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
      organizationClassroomsId?: string | null,
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
    pupil:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      terraId?: string | null,
      provider?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
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
      organizationClassroomsId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
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
    pupil:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      terraId?: string | null,
      provider?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
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
      organizationClassroomsId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
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
    pupil:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      terraId?: string | null,
      provider?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
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
      organizationClassroomsId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePupilOrganizationRequestMutationVariables = {
  input: CreatePupilOrganizationRequestInput,
  condition?: ModelPupilOrganizationRequestConditionInput | null,
};

export type CreatePupilOrganizationRequestMutation = {
  createPupilOrganizationRequest?:  {
    __typename: "PupilOrganizationRequest",
    id: string,
    pupilID: string,
    organizationID: string,
    pupil:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      terraId?: string | null,
      provider?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    organization:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePupilOrganizationRequestMutationVariables = {
  input: UpdatePupilOrganizationRequestInput,
  condition?: ModelPupilOrganizationRequestConditionInput | null,
};

export type UpdatePupilOrganizationRequestMutation = {
  updatePupilOrganizationRequest?:  {
    __typename: "PupilOrganizationRequest",
    id: string,
    pupilID: string,
    organizationID: string,
    pupil:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      terraId?: string | null,
      provider?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    organization:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePupilOrganizationRequestMutationVariables = {
  input: DeletePupilOrganizationRequestInput,
  condition?: ModelPupilOrganizationRequestConditionInput | null,
};

export type DeletePupilOrganizationRequestMutation = {
  deletePupilOrganizationRequest?:  {
    __typename: "PupilOrganizationRequest",
    id: string,
    pupilID: string,
    organizationID: string,
    pupil:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      terraId?: string | null,
      provider?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    organization:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePupilOrganizationAcceptedMutationVariables = {
  input: CreatePupilOrganizationAcceptedInput,
  condition?: ModelPupilOrganizationAcceptedConditionInput | null,
};

export type CreatePupilOrganizationAcceptedMutation = {
  createPupilOrganizationAccepted?:  {
    __typename: "PupilOrganizationAccepted",
    id: string,
    pupilID: string,
    organizationID: string,
    pupil:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      terraId?: string | null,
      provider?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    organization:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePupilOrganizationAcceptedMutationVariables = {
  input: UpdatePupilOrganizationAcceptedInput,
  condition?: ModelPupilOrganizationAcceptedConditionInput | null,
};

export type UpdatePupilOrganizationAcceptedMutation = {
  updatePupilOrganizationAccepted?:  {
    __typename: "PupilOrganizationAccepted",
    id: string,
    pupilID: string,
    organizationID: string,
    pupil:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      terraId?: string | null,
      provider?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    organization:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePupilOrganizationAcceptedMutationVariables = {
  input: DeletePupilOrganizationAcceptedInput,
  condition?: ModelPupilOrganizationAcceptedConditionInput | null,
};

export type DeletePupilOrganizationAcceptedMutation = {
  deletePupilOrganizationAccepted?:  {
    __typename: "PupilOrganizationAccepted",
    id: string,
    pupilID: string,
    organizationID: string,
    pupil:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      terraId?: string | null,
      provider?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    organization:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
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
    Pupils?:  {
      __typename: "ModelPupilConnection",
      nextToken?: string | null,
    } | null,
    classrooms?:  {
      __typename: "ModelClassroomConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    Pupils?:  {
      __typename: "ModelPupilConnection",
      nextToken?: string | null,
    } | null,
    classrooms?:  {
      __typename: "ModelClassroomConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    Pupils?:  {
      __typename: "ModelPupilConnection",
      nextToken?: string | null,
    } | null,
    classrooms?:  {
      __typename: "ModelClassroomConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    Pupil?:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      terraId?: string | null,
      provider?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    UserInOrganization:  {
      __typename: "UserInOrganization",
      userID?: string | null,
      organizationID?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    },
    Lesson?:  {
      __typename: "Lesson",
      id: string,
      title?: string | null,
      description?: string | null,
      sectionID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    lessonRecord?:  {
      __typename: "PELessonRecord",
      id: string,
      teacherID?: string | null,
      date: string,
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
    lessonRecordID?: string | null,
    createdAt: string,
    updatedAt: string,
    userInOrganizationAttendancesId?: string | null,
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
    Pupil?:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      terraId?: string | null,
      provider?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    UserInOrganization:  {
      __typename: "UserInOrganization",
      userID?: string | null,
      organizationID?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    },
    Lesson?:  {
      __typename: "Lesson",
      id: string,
      title?: string | null,
      description?: string | null,
      sectionID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    lessonRecord?:  {
      __typename: "PELessonRecord",
      id: string,
      teacherID?: string | null,
      date: string,
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
    lessonRecordID?: string | null,
    createdAt: string,
    updatedAt: string,
    userInOrganizationAttendancesId?: string | null,
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
    Pupil?:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      terraId?: string | null,
      provider?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    UserInOrganization:  {
      __typename: "UserInOrganization",
      userID?: string | null,
      organizationID?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    },
    Lesson?:  {
      __typename: "Lesson",
      id: string,
      title?: string | null,
      description?: string | null,
      sectionID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    lessonRecord?:  {
      __typename: "PELessonRecord",
      id: string,
      teacherID?: string | null,
      date: string,
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
    lessonRecordID?: string | null,
    createdAt: string,
    updatedAt: string,
    userInOrganizationAttendancesId?: string | null,
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
    InterventionFeedback?:  {
      __typename: "ModelParentInterventionFeedbackConnection",
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
    InterventionFeedback?:  {
      __typename: "ModelParentInterventionFeedbackConnection",
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
    InterventionFeedback?:  {
      __typename: "ModelParentInterventionFeedbackConnection",
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
    Pupil:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      terraId?: string | null,
      provider?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
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
    Pupil:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      terraId?: string | null,
      provider?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
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
    Pupil:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      terraId?: string | null,
      provider?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
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
    Organization?:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    Organization?:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    Organization?:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    Organizations?:  {
      __typename: "ModelTeacherOrganziationConnection",
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
    Organizations?:  {
      __typename: "ModelTeacherOrganziationConnection",
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
    Organizations?:  {
      __typename: "ModelTeacherOrganziationConnection",
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
    terraId?: string | null,
    provider?: string | null,
    Attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    classrooms?:  {
      __typename: "ModelPupilClassroomConnection",
      nextToken?: string | null,
    } | null,
    Organizations?:  {
      __typename: "ModelPupilOrganizationAcceptedConnection",
      nextToken?: string | null,
    } | null,
    OrganizationsRequests?:  {
      __typename: "ModelPupilOrganizationRequestConnection",
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
    Interventions?:  {
      __typename: "ModelInterventionConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    terraId?: string | null,
    provider?: string | null,
    Attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    classrooms?:  {
      __typename: "ModelPupilClassroomConnection",
      nextToken?: string | null,
    } | null,
    Organizations?:  {
      __typename: "ModelPupilOrganizationAcceptedConnection",
      nextToken?: string | null,
    } | null,
    OrganizationsRequests?:  {
      __typename: "ModelPupilOrganizationRequestConnection",
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
    Interventions?:  {
      __typename: "ModelInterventionConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    terraId?: string | null,
    provider?: string | null,
    Attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    classrooms?:  {
      __typename: "ModelPupilClassroomConnection",
      nextToken?: string | null,
    } | null,
    Organizations?:  {
      __typename: "ModelPupilOrganizationAcceptedConnection",
      nextToken?: string | null,
    } | null,
    OrganizationsRequests?:  {
      __typename: "ModelPupilOrganizationRequestConnection",
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
    Interventions?:  {
      __typename: "ModelInterventionConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    Pupil?:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      terraId?: string | null,
      provider?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    message?: string | null,
    viewed?: boolean | null,
    InterventionFeedback?:  {
      __typename: "ModelParentInterventionFeedbackConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    Pupil?:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      terraId?: string | null,
      provider?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    message?: string | null,
    viewed?: boolean | null,
    InterventionFeedback?:  {
      __typename: "ModelParentInterventionFeedbackConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    Pupil?:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      terraId?: string | null,
      provider?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    message?: string | null,
    viewed?: boolean | null,
    InterventionFeedback?:  {
      __typename: "ModelParentInterventionFeedbackConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateParentInterventionFeedbackMutationVariables = {
  input: CreateParentInterventionFeedbackInput,
  condition?: ModelParentInterventionFeedbackConditionInput | null,
};

export type CreateParentInterventionFeedbackMutation = {
  createParentInterventionFeedback?:  {
    __typename: "ParentInterventionFeedback",
    id: string,
    parentID: string,
    interventionID: string,
    Parent:  {
      __typename: "Parent",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    Intervention:  {
      __typename: "Intervention",
      id: string,
      pupilID: string,
      message?: string | null,
      viewed?: boolean | null,
      createdAt: string,
      updatedAt: string,
    },
    comment?: string | null,
    rating?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateParentInterventionFeedbackMutationVariables = {
  input: UpdateParentInterventionFeedbackInput,
  condition?: ModelParentInterventionFeedbackConditionInput | null,
};

export type UpdateParentInterventionFeedbackMutation = {
  updateParentInterventionFeedback?:  {
    __typename: "ParentInterventionFeedback",
    id: string,
    parentID: string,
    interventionID: string,
    Parent:  {
      __typename: "Parent",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    Intervention:  {
      __typename: "Intervention",
      id: string,
      pupilID: string,
      message?: string | null,
      viewed?: boolean | null,
      createdAt: string,
      updatedAt: string,
    },
    comment?: string | null,
    rating?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteParentInterventionFeedbackMutationVariables = {
  input: DeleteParentInterventionFeedbackInput,
  condition?: ModelParentInterventionFeedbackConditionInput | null,
};

export type DeleteParentInterventionFeedbackMutation = {
  deleteParentInterventionFeedback?:  {
    __typename: "ParentInterventionFeedback",
    id: string,
    parentID: string,
    interventionID: string,
    Parent:  {
      __typename: "Parent",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    Intervention:  {
      __typename: "Intervention",
      id: string,
      pupilID: string,
      message?: string | null,
      viewed?: boolean | null,
      createdAt: string,
      updatedAt: string,
    },
    comment?: string | null,
    rating?: number | null,
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

export type CreateRolesOfUserMutationVariables = {
  input: CreateRolesOfUserInput,
  condition?: ModelRolesOfUserConditionInput | null,
};

export type CreateRolesOfUserMutation = {
  createRolesOfUser?:  {
    __typename: "RolesOfUser",
    id: string,
    userInOrganizationID: string,
    userRoleID: string,
    userInOrganization:  {
      __typename: "UserInOrganization",
      userID?: string | null,
      organizationID?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    },
    userRole:  {
      __typename: "UserRole",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      organizationRolesId?: string | null,
      userRolePermissionsId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateRolesOfUserMutationVariables = {
  input: UpdateRolesOfUserInput,
  condition?: ModelRolesOfUserConditionInput | null,
};

export type UpdateRolesOfUserMutation = {
  updateRolesOfUser?:  {
    __typename: "RolesOfUser",
    id: string,
    userInOrganizationID: string,
    userRoleID: string,
    userInOrganization:  {
      __typename: "UserInOrganization",
      userID?: string | null,
      organizationID?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    },
    userRole:  {
      __typename: "UserRole",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      organizationRolesId?: string | null,
      userRolePermissionsId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteRolesOfUserMutationVariables = {
  input: DeleteRolesOfUserInput,
  condition?: ModelRolesOfUserConditionInput | null,
};

export type DeleteRolesOfUserMutation = {
  deleteRolesOfUser?:  {
    __typename: "RolesOfUser",
    id: string,
    userInOrganizationID: string,
    userRoleID: string,
    userInOrganization:  {
      __typename: "UserInOrganization",
      userID?: string | null,
      organizationID?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    },
    userRole:  {
      __typename: "UserRole",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      organizationRolesId?: string | null,
      userRolePermissionsId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserInOrganizationInClassroomMutationVariables = {
  input: CreateUserInOrganizationInClassroomInput,
  condition?: ModelUserInOrganizationInClassroomConditionInput | null,
};

export type CreateUserInOrganizationInClassroomMutation = {
  createUserInOrganizationInClassroom?:  {
    __typename: "UserInOrganizationInClassroom",
    id: string,
    userInOrganizationID: string,
    classroomID: string,
    userInOrganization:  {
      __typename: "UserInOrganization",
      userID?: string | null,
      organizationID?: string | null,
      id: string,
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
      organizationClassroomsId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserInOrganizationInClassroomMutationVariables = {
  input: UpdateUserInOrganizationInClassroomInput,
  condition?: ModelUserInOrganizationInClassroomConditionInput | null,
};

export type UpdateUserInOrganizationInClassroomMutation = {
  updateUserInOrganizationInClassroom?:  {
    __typename: "UserInOrganizationInClassroom",
    id: string,
    userInOrganizationID: string,
    classroomID: string,
    userInOrganization:  {
      __typename: "UserInOrganization",
      userID?: string | null,
      organizationID?: string | null,
      id: string,
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
      organizationClassroomsId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserInOrganizationInClassroomMutationVariables = {
  input: DeleteUserInOrganizationInClassroomInput,
  condition?: ModelUserInOrganizationInClassroomConditionInput | null,
};

export type DeleteUserInOrganizationInClassroomMutation = {
  deleteUserInOrganizationInClassroom?:  {
    __typename: "UserInOrganizationInClassroom",
    id: string,
    userInOrganizationID: string,
    classroomID: string,
    userInOrganization:  {
      __typename: "UserInOrganization",
      userID?: string | null,
      organizationID?: string | null,
      id: string,
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
      organizationClassroomsId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateRolesThatCanAccessMutationVariables = {
  input: CreateRolesThatCanAccessInput,
  condition?: ModelRolesThatCanAccessConditionInput | null,
};

export type CreateRolesThatCanAccessMutation = {
  createRolesThatCanAccess?:  {
    __typename: "RolesThatCanAccess",
    id: string,
    userRoleID: string,
    sectionID: string,
    userRole:  {
      __typename: "UserRole",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      organizationRolesId?: string | null,
      userRolePermissionsId?: string | null,
    },
    section:  {
      __typename: "Section",
      id: string,
      name?: string | null,
      parentID?: string | null,
      organizationID?: string | null,
      imagePreviewID?: string | null,
      createdAt: string,
      updatedAt: string,
      sectionSectionOptionsId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateRolesThatCanAccessMutationVariables = {
  input: UpdateRolesThatCanAccessInput,
  condition?: ModelRolesThatCanAccessConditionInput | null,
};

export type UpdateRolesThatCanAccessMutation = {
  updateRolesThatCanAccess?:  {
    __typename: "RolesThatCanAccess",
    id: string,
    userRoleID: string,
    sectionID: string,
    userRole:  {
      __typename: "UserRole",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      organizationRolesId?: string | null,
      userRolePermissionsId?: string | null,
    },
    section:  {
      __typename: "Section",
      id: string,
      name?: string | null,
      parentID?: string | null,
      organizationID?: string | null,
      imagePreviewID?: string | null,
      createdAt: string,
      updatedAt: string,
      sectionSectionOptionsId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteRolesThatCanAccessMutationVariables = {
  input: DeleteRolesThatCanAccessInput,
  condition?: ModelRolesThatCanAccessConditionInput | null,
};

export type DeleteRolesThatCanAccessMutation = {
  deleteRolesThatCanAccess?:  {
    __typename: "RolesThatCanAccess",
    id: string,
    userRoleID: string,
    sectionID: string,
    userRole:  {
      __typename: "UserRole",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      organizationRolesId?: string | null,
      userRolePermissionsId?: string | null,
    },
    section:  {
      __typename: "Section",
      id: string,
      name?: string | null,
      parentID?: string | null,
      organizationID?: string | null,
      imagePreviewID?: string | null,
      createdAt: string,
      updatedAt: string,
      sectionSectionOptionsId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateTeacherOrganziationMutationVariables = {
  input: CreateTeacherOrganziationInput,
  condition?: ModelTeacherOrganziationConditionInput | null,
};

export type CreateTeacherOrganziationMutation = {
  createTeacherOrganziation?:  {
    __typename: "TeacherOrganziation",
    id: string,
    organizationID: string,
    teacherID: string,
    organization:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    },
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
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTeacherOrganziationMutationVariables = {
  input: UpdateTeacherOrganziationInput,
  condition?: ModelTeacherOrganziationConditionInput | null,
};

export type UpdateTeacherOrganziationMutation = {
  updateTeacherOrganziation?:  {
    __typename: "TeacherOrganziation",
    id: string,
    organizationID: string,
    teacherID: string,
    organization:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    },
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
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTeacherOrganziationMutationVariables = {
  input: DeleteTeacherOrganziationInput,
  condition?: ModelTeacherOrganziationConditionInput | null,
};

export type DeleteTeacherOrganziationMutation = {
  deleteTeacherOrganziation?:  {
    __typename: "TeacherOrganziation",
    id: string,
    organizationID: string,
    teacherID: string,
    organization:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    },
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
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    dependants?:  {
      __typename: "ModelDependantGuardianConnection",
      nextToken?: string | null,
    } | null,
    organizations?:  {
      __typename: "ModelUserInOrganizationConnection",
      nextToken?: string | null,
    } | null,
    ownedOrganizations?:  {
      __typename: "ModelOrganizationConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetDependantGuardianQueryVariables = {
  id: string,
};

export type GetDependantGuardianQuery = {
  getDependantGuardian?:  {
    __typename: "DependantGuardian",
    guardian:  {
      __typename: "User",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    dependant:  {
      __typename: "User",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    id: string,
    createdAt: string,
    updatedAt: string,
    userDependantsId?: string | null,
  } | null,
};

export type ListDependantGuardiansQueryVariables = {
  filter?: ModelDependantGuardianFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListDependantGuardiansQuery = {
  listDependantGuardians?:  {
    __typename: "ModelDependantGuardianConnection",
    items:  Array< {
      __typename: "DependantGuardian",
      id: string,
      createdAt: string,
      updatedAt: string,
      userDependantsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserInOrganizationQueryVariables = {
  id: string,
};

export type GetUserInOrganizationQuery = {
  getUserInOrganization?:  {
    __typename: "UserInOrganization",
    userID?: string | null,
    organizationID?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    organization?:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    } | null,
    roles?:  {
      __typename: "ModelRolesOfUserConnection",
      nextToken?: string | null,
    } | null,
    classrooms?:  {
      __typename: "ModelUserInOrganizationInClassroomConnection",
      nextToken?: string | null,
    } | null,
    Attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUserInOrganizationsQueryVariables = {
  filter?: ModelUserInOrganizationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserInOrganizationsQuery = {
  listUserInOrganizations?:  {
    __typename: "ModelUserInOrganizationConnection",
    items:  Array< {
      __typename: "UserInOrganization",
      userID?: string | null,
      organizationID?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserRoleQueryVariables = {
  id: string,
};

export type GetUserRoleQuery = {
  getUserRole?:  {
    __typename: "UserRole",
    id: string,
    name: string,
    organization:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    },
    users?:  {
      __typename: "ModelRolesOfUserConnection",
      nextToken?: string | null,
    } | null,
    permissions?:  {
      __typename: "RolePermissions",
      canAccessAttendanceSheet?: boolean | null,
      canCreateLesson?: boolean | null,
      canRateLessons?: boolean | null,
      canDeleteLessons?: boolean | null,
      canUpdateLesson?: boolean | null,
      canUploadContent?: boolean | null,
      canViewContent?: boolean | null,
      canCreateSection?: boolean | null,
      canDeleteSection?: boolean | null,
      canUpdateSection?: boolean | null,
      canViewDashboard?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      rolePermissionsRoleId?: string | null,
    } | null,
    sectionAvailableForThatRole?:  {
      __typename: "ModelRolesThatCanAccessConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    organizationRolesId?: string | null,
    userRolePermissionsId?: string | null,
  } | null,
};

export type ListUserRolesQueryVariables = {
  filter?: ModelUserRoleFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserRolesQuery = {
  listUserRoles?:  {
    __typename: "ModelUserRoleConnection",
    items:  Array< {
      __typename: "UserRole",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      organizationRolesId?: string | null,
      userRolePermissionsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetRolePermissionsQueryVariables = {
  id: string,
};

export type GetRolePermissionsQuery = {
  getRolePermissions?:  {
    __typename: "RolePermissions",
    role?:  {
      __typename: "UserRole",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      organizationRolesId?: string | null,
      userRolePermissionsId?: string | null,
    } | null,
    canAccessAttendanceSheet?: boolean | null,
    canCreateLesson?: boolean | null,
    canRateLessons?: boolean | null,
    canDeleteLessons?: boolean | null,
    canUpdateLesson?: boolean | null,
    canUploadContent?: boolean | null,
    canViewContent?: boolean | null,
    canCreateSection?: boolean | null,
    canDeleteSection?: boolean | null,
    canUpdateSection?: boolean | null,
    canViewDashboard?: boolean | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    rolePermissionsRoleId?: string | null,
  } | null,
};

export type ListRolePermissionsQueryVariables = {
  filter?: ModelRolePermissionsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRolePermissionsQuery = {
  listRolePermissions?:  {
    __typename: "ModelRolePermissionsConnection",
    items:  Array< {
      __typename: "RolePermissions",
      canAccessAttendanceSheet?: boolean | null,
      canCreateLesson?: boolean | null,
      canRateLessons?: boolean | null,
      canDeleteLessons?: boolean | null,
      canUpdateLesson?: boolean | null,
      canUploadContent?: boolean | null,
      canViewContent?: boolean | null,
      canCreateSection?: boolean | null,
      canDeleteSection?: boolean | null,
      canUpdateSection?: boolean | null,
      canViewDashboard?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      rolePermissionsRoleId?: string | null,
    } | null >,
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
    owner:  {
      __typename: "User",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    Principals?:  {
      __typename: "ModelPrincipalConnection",
      nextToken?: string | null,
    } | null,
    WaitingForAcceptPupils?:  {
      __typename: "ModelPupilOrganizationRequestConnection",
      nextToken?: string | null,
    } | null,
    AcceptedPupils?:  {
      __typename: "ModelPupilOrganizationAcceptedConnection",
      nextToken?: string | null,
    } | null,
    Sections?:  {
      __typename: "ModelSectionConnection",
      nextToken?: string | null,
    } | null,
    Teachers?:  {
      __typename: "ModelTeacherOrganziationConnection",
      nextToken?: string | null,
    } | null,
    Classrooms?:  {
      __typename: "ModelClassroomConnection",
      nextToken?: string | null,
    } | null,
    members?:  {
      __typename: "ModelUserInOrganizationConnection",
      nextToken?: string | null,
    } | null,
    roles?:  {
      __typename: "ModelUserRoleConnection",
      nextToken?: string | null,
    } | null,
    type?: string | null,
    logo?:  {
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
    userOwnedOrganizationsId?: string | null,
    organizationLogoId?: string | null,
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
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    } | null >,
    nextToken?: string | null,
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
    } | null >,
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
    organizationID?: string | null,
    ParentSection?:  {
      __typename: "Section",
      id: string,
      name?: string | null,
      parentID?: string | null,
      organizationID?: string | null,
      imagePreviewID?: string | null,
      createdAt: string,
      updatedAt: string,
      sectionSectionOptionsId?: string | null,
    } | null,
    OrganizationOwner?:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
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
    SectionOptions?:  {
      __typename: "SectionOptions",
      id: string,
      Activities?: Array< string | null > | null,
      Durations?: Array< number | null > | null,
      DeliveredBy?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
      sectionOptionsSectionId?: string | null,
    } | null,
    rolesThatCanAccess?:  {
      __typename: "ModelRolesThatCanAccessConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    sectionSectionOptionsId?: string | null,
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
      organizationID?: string | null,
      imagePreviewID?: string | null,
      createdAt: string,
      updatedAt: string,
      sectionSectionOptionsId?: string | null,
    } | null >,
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
      organizationID?: string | null,
      imagePreviewID?: string | null,
      createdAt: string,
      updatedAt: string,
      sectionSectionOptionsId?: string | null,
    } | null,
    LessonsRecords?:  {
      __typename: "ModelPELessonRecordConnection",
      nextToken?: string | null,
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
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetSectionOptionsQueryVariables = {
  id: string,
};

export type GetSectionOptionsQuery = {
  getSectionOptions?:  {
    __typename: "SectionOptions",
    id: string,
    Section?:  {
      __typename: "Section",
      id: string,
      name?: string | null,
      parentID?: string | null,
      organizationID?: string | null,
      imagePreviewID?: string | null,
      createdAt: string,
      updatedAt: string,
      sectionSectionOptionsId?: string | null,
    } | null,
    Activities?: Array< string | null > | null,
    Durations?: Array< number | null > | null,
    DeliveredBy?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    sectionOptionsSectionId?: string | null,
  } | null,
};

export type ListSectionOptionsQueryVariables = {
  filter?: ModelSectionOptionsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSectionOptionsQuery = {
  listSectionOptions?:  {
    __typename: "ModelSectionOptionsConnection",
    items:  Array< {
      __typename: "SectionOptions",
      id: string,
      Activities?: Array< string | null > | null,
      Durations?: Array< number | null > | null,
      DeliveredBy?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
      sectionOptionsSectionId?: string | null,
    } | null >,
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
    date: string,
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
      organizationClassroomsId?: string | null,
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
      date: string,
      deliveredBy?: string | null,
      duration?: number | null,
      activity?: string | null,
      rating?: number | null,
      notes?: string | null,
      classroomID?: string | null,
      lessonID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type LessonRecordByNameQueryVariables = {
  date: string,
  id?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPELessonRecordFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type LessonRecordByNameQuery = {
  lessonRecordByName?:  {
    __typename: "ModelPELessonRecordConnection",
    items:  Array< {
      __typename: "PELessonRecord",
      id: string,
      teacherID?: string | null,
      date: string,
      deliveredBy?: string | null,
      duration?: number | null,
      activity?: string | null,
      rating?: number | null,
      notes?: string | null,
      classroomID?: string | null,
      lessonID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type LessonByDateQueryVariables = {
  activity: string,
  date?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPELessonRecordFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type LessonByDateQuery = {
  lessonByDate?:  {
    __typename: "ModelPELessonRecordConnection",
    items:  Array< {
      __typename: "PELessonRecord",
      id: string,
      teacherID?: string | null,
      date: string,
      deliveredBy?: string | null,
      duration?: number | null,
      activity?: string | null,
      rating?: number | null,
      notes?: string | null,
      classroomID?: string | null,
      lessonID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
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
    Pupils?:  {
      __typename: "ModelPupilConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    } | null >,
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
      organizationClassroomsId?: string | null,
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
    } | null >,
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
    Organization?:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    } | null,
    yearGroupID?: string | null,
    yearGroup?:  {
      __typename: "Curriculum",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    members?:  {
      __typename: "ModelUserInOrganizationInClassroomConnection",
      nextToken?: string | null,
    } | null,
    LessonRecords?:  {
      __typename: "ModelPELessonRecordConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    organizationClassroomsId?: string | null,
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
      organizationClassroomsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPupilOrganizationRequestQueryVariables = {
  id: string,
};

export type GetPupilOrganizationRequestQuery = {
  getPupilOrganizationRequest?:  {
    __typename: "PupilOrganizationRequest",
    id: string,
    pupilID: string,
    organizationID: string,
    pupil:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      terraId?: string | null,
      provider?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    organization:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPupilOrganizationRequestsQueryVariables = {
  filter?: ModelPupilOrganizationRequestFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPupilOrganizationRequestsQuery = {
  listPupilOrganizationRequests?:  {
    __typename: "ModelPupilOrganizationRequestConnection",
    items:  Array< {
      __typename: "PupilOrganizationRequest",
      id: string,
      pupilID: string,
      organizationID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPupilOrganizationAcceptedQueryVariables = {
  id: string,
};

export type GetPupilOrganizationAcceptedQuery = {
  getPupilOrganizationAccepted?:  {
    __typename: "PupilOrganizationAccepted",
    id: string,
    pupilID: string,
    organizationID: string,
    pupil:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      terraId?: string | null,
      provider?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    organization:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPupilOrganizationAcceptedsQueryVariables = {
  filter?: ModelPupilOrganizationAcceptedFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPupilOrganizationAcceptedsQuery = {
  listPupilOrganizationAccepteds?:  {
    __typename: "ModelPupilOrganizationAcceptedConnection",
    items:  Array< {
      __typename: "PupilOrganizationAccepted",
      id: string,
      pupilID: string,
      organizationID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
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
    Pupils?:  {
      __typename: "ModelPupilConnection",
      nextToken?: string | null,
    } | null,
    classrooms?:  {
      __typename: "ModelClassroomConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    } | null >,
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
    Pupil?:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      terraId?: string | null,
      provider?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    UserInOrganization:  {
      __typename: "UserInOrganization",
      userID?: string | null,
      organizationID?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    },
    Lesson?:  {
      __typename: "Lesson",
      id: string,
      title?: string | null,
      description?: string | null,
      sectionID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    lessonRecord?:  {
      __typename: "PELessonRecord",
      id: string,
      teacherID?: string | null,
      date: string,
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
    lessonRecordID?: string | null,
    createdAt: string,
    updatedAt: string,
    userInOrganizationAttendancesId?: string | null,
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
      userInOrganizationAttendancesId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type AttendanceByLessonRecordIDQueryVariables = {
  id: string,
  lessonRecordID?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelAttendanceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type AttendanceByLessonRecordIDQuery = {
  attendanceByLessonRecordID?:  {
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
      userInOrganizationAttendancesId?: string | null,
    } | null >,
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
    } | null >,
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
    } | null >,
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
    } | null >,
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
    } | null >,
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
    InterventionFeedback?:  {
      __typename: "ModelParentInterventionFeedbackConnection",
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
    } | null >,
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
    Organization?:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    } | null >,
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
    Organizations?:  {
      __typename: "ModelTeacherOrganziationConnection",
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
    } | null >,
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
    terraId?: string | null,
    provider?: string | null,
    Attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    classrooms?:  {
      __typename: "ModelPupilClassroomConnection",
      nextToken?: string | null,
    } | null,
    Organizations?:  {
      __typename: "ModelPupilOrganizationAcceptedConnection",
      nextToken?: string | null,
    } | null,
    OrganizationsRequests?:  {
      __typename: "ModelPupilOrganizationRequestConnection",
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
    Interventions?:  {
      __typename: "ModelInterventionConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
      terraId?: string | null,
      provider?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
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
    Pupil?:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      terraId?: string | null,
      provider?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    message?: string | null,
    viewed?: boolean | null,
    InterventionFeedback?:  {
      __typename: "ModelParentInterventionFeedbackConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
      viewed?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type InterventionByPupilByDateQueryVariables = {
  pupilID: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelInterventionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type InterventionByPupilByDateQuery = {
  interventionByPupilByDate?:  {
    __typename: "ModelInterventionConnection",
    items:  Array< {
      __typename: "Intervention",
      id: string,
      pupilID: string,
      message?: string | null,
      viewed?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetParentInterventionFeedbackQueryVariables = {
  id: string,
};

export type GetParentInterventionFeedbackQuery = {
  getParentInterventionFeedback?:  {
    __typename: "ParentInterventionFeedback",
    id: string,
    parentID: string,
    interventionID: string,
    Parent:  {
      __typename: "Parent",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    Intervention:  {
      __typename: "Intervention",
      id: string,
      pupilID: string,
      message?: string | null,
      viewed?: boolean | null,
      createdAt: string,
      updatedAt: string,
    },
    comment?: string | null,
    rating?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListParentInterventionFeedbacksQueryVariables = {
  filter?: ModelParentInterventionFeedbackFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListParentInterventionFeedbacksQuery = {
  listParentInterventionFeedbacks?:  {
    __typename: "ModelParentInterventionFeedbackConnection",
    items:  Array< {
      __typename: "ParentInterventionFeedback",
      id: string,
      parentID: string,
      interventionID: string,
      comment?: string | null,
      rating?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetRolesOfUserQueryVariables = {
  id: string,
};

export type GetRolesOfUserQuery = {
  getRolesOfUser?:  {
    __typename: "RolesOfUser",
    id: string,
    userInOrganizationID: string,
    userRoleID: string,
    userInOrganization:  {
      __typename: "UserInOrganization",
      userID?: string | null,
      organizationID?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    },
    userRole:  {
      __typename: "UserRole",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      organizationRolesId?: string | null,
      userRolePermissionsId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListRolesOfUsersQueryVariables = {
  filter?: ModelRolesOfUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRolesOfUsersQuery = {
  listRolesOfUsers?:  {
    __typename: "ModelRolesOfUserConnection",
    items:  Array< {
      __typename: "RolesOfUser",
      id: string,
      userInOrganizationID: string,
      userRoleID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserInOrganizationInClassroomQueryVariables = {
  id: string,
};

export type GetUserInOrganizationInClassroomQuery = {
  getUserInOrganizationInClassroom?:  {
    __typename: "UserInOrganizationInClassroom",
    id: string,
    userInOrganizationID: string,
    classroomID: string,
    userInOrganization:  {
      __typename: "UserInOrganization",
      userID?: string | null,
      organizationID?: string | null,
      id: string,
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
      organizationClassroomsId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUserInOrganizationInClassroomsQueryVariables = {
  filter?: ModelUserInOrganizationInClassroomFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserInOrganizationInClassroomsQuery = {
  listUserInOrganizationInClassrooms?:  {
    __typename: "ModelUserInOrganizationInClassroomConnection",
    items:  Array< {
      __typename: "UserInOrganizationInClassroom",
      id: string,
      userInOrganizationID: string,
      classroomID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetRolesThatCanAccessQueryVariables = {
  id: string,
};

export type GetRolesThatCanAccessQuery = {
  getRolesThatCanAccess?:  {
    __typename: "RolesThatCanAccess",
    id: string,
    userRoleID: string,
    sectionID: string,
    userRole:  {
      __typename: "UserRole",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      organizationRolesId?: string | null,
      userRolePermissionsId?: string | null,
    },
    section:  {
      __typename: "Section",
      id: string,
      name?: string | null,
      parentID?: string | null,
      organizationID?: string | null,
      imagePreviewID?: string | null,
      createdAt: string,
      updatedAt: string,
      sectionSectionOptionsId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListRolesThatCanAccessesQueryVariables = {
  filter?: ModelRolesThatCanAccessFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRolesThatCanAccessesQuery = {
  listRolesThatCanAccesses?:  {
    __typename: "ModelRolesThatCanAccessConnection",
    items:  Array< {
      __typename: "RolesThatCanAccess",
      id: string,
      userRoleID: string,
      sectionID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetTeacherOrganziationQueryVariables = {
  id: string,
};

export type GetTeacherOrganziationQuery = {
  getTeacherOrganziation?:  {
    __typename: "TeacherOrganziation",
    id: string,
    organizationID: string,
    teacherID: string,
    organization:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    },
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
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTeacherOrganziationsQueryVariables = {
  filter?: ModelTeacherOrganziationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTeacherOrganziationsQuery = {
  listTeacherOrganziations?:  {
    __typename: "ModelTeacherOrganziationConnection",
    items:  Array< {
      __typename: "TeacherOrganziation",
      id: string,
      organizationID: string,
      teacherID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    dependants?:  {
      __typename: "ModelDependantGuardianConnection",
      nextToken?: string | null,
    } | null,
    organizations?:  {
      __typename: "ModelUserInOrganizationConnection",
      nextToken?: string | null,
    } | null,
    ownedOrganizations?:  {
      __typename: "ModelOrganizationConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    dependants?:  {
      __typename: "ModelDependantGuardianConnection",
      nextToken?: string | null,
    } | null,
    organizations?:  {
      __typename: "ModelUserInOrganizationConnection",
      nextToken?: string | null,
    } | null,
    ownedOrganizations?:  {
      __typename: "ModelOrganizationConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    dependants?:  {
      __typename: "ModelDependantGuardianConnection",
      nextToken?: string | null,
    } | null,
    organizations?:  {
      __typename: "ModelUserInOrganizationConnection",
      nextToken?: string | null,
    } | null,
    ownedOrganizations?:  {
      __typename: "ModelOrganizationConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateDependantGuardianSubscription = {
  onCreateDependantGuardian?:  {
    __typename: "DependantGuardian",
    guardian:  {
      __typename: "User",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    dependant:  {
      __typename: "User",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    id: string,
    createdAt: string,
    updatedAt: string,
    userDependantsId?: string | null,
  } | null,
};

export type OnUpdateDependantGuardianSubscription = {
  onUpdateDependantGuardian?:  {
    __typename: "DependantGuardian",
    guardian:  {
      __typename: "User",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    dependant:  {
      __typename: "User",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    id: string,
    createdAt: string,
    updatedAt: string,
    userDependantsId?: string | null,
  } | null,
};

export type OnDeleteDependantGuardianSubscription = {
  onDeleteDependantGuardian?:  {
    __typename: "DependantGuardian",
    guardian:  {
      __typename: "User",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    dependant:  {
      __typename: "User",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    id: string,
    createdAt: string,
    updatedAt: string,
    userDependantsId?: string | null,
  } | null,
};

export type OnCreateUserInOrganizationSubscription = {
  onCreateUserInOrganization?:  {
    __typename: "UserInOrganization",
    userID?: string | null,
    organizationID?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    organization?:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    } | null,
    roles?:  {
      __typename: "ModelRolesOfUserConnection",
      nextToken?: string | null,
    } | null,
    classrooms?:  {
      __typename: "ModelUserInOrganizationInClassroomConnection",
      nextToken?: string | null,
    } | null,
    Attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserInOrganizationSubscription = {
  onUpdateUserInOrganization?:  {
    __typename: "UserInOrganization",
    userID?: string | null,
    organizationID?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    organization?:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    } | null,
    roles?:  {
      __typename: "ModelRolesOfUserConnection",
      nextToken?: string | null,
    } | null,
    classrooms?:  {
      __typename: "ModelUserInOrganizationInClassroomConnection",
      nextToken?: string | null,
    } | null,
    Attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserInOrganizationSubscription = {
  onDeleteUserInOrganization?:  {
    __typename: "UserInOrganization",
    userID?: string | null,
    organizationID?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    organization?:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    } | null,
    roles?:  {
      __typename: "ModelRolesOfUserConnection",
      nextToken?: string | null,
    } | null,
    classrooms?:  {
      __typename: "ModelUserInOrganizationInClassroomConnection",
      nextToken?: string | null,
    } | null,
    Attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserRoleSubscription = {
  onCreateUserRole?:  {
    __typename: "UserRole",
    id: string,
    name: string,
    organization:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    },
    users?:  {
      __typename: "ModelRolesOfUserConnection",
      nextToken?: string | null,
    } | null,
    permissions?:  {
      __typename: "RolePermissions",
      canAccessAttendanceSheet?: boolean | null,
      canCreateLesson?: boolean | null,
      canRateLessons?: boolean | null,
      canDeleteLessons?: boolean | null,
      canUpdateLesson?: boolean | null,
      canUploadContent?: boolean | null,
      canViewContent?: boolean | null,
      canCreateSection?: boolean | null,
      canDeleteSection?: boolean | null,
      canUpdateSection?: boolean | null,
      canViewDashboard?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      rolePermissionsRoleId?: string | null,
    } | null,
    sectionAvailableForThatRole?:  {
      __typename: "ModelRolesThatCanAccessConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    organizationRolesId?: string | null,
    userRolePermissionsId?: string | null,
  } | null,
};

export type OnUpdateUserRoleSubscription = {
  onUpdateUserRole?:  {
    __typename: "UserRole",
    id: string,
    name: string,
    organization:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    },
    users?:  {
      __typename: "ModelRolesOfUserConnection",
      nextToken?: string | null,
    } | null,
    permissions?:  {
      __typename: "RolePermissions",
      canAccessAttendanceSheet?: boolean | null,
      canCreateLesson?: boolean | null,
      canRateLessons?: boolean | null,
      canDeleteLessons?: boolean | null,
      canUpdateLesson?: boolean | null,
      canUploadContent?: boolean | null,
      canViewContent?: boolean | null,
      canCreateSection?: boolean | null,
      canDeleteSection?: boolean | null,
      canUpdateSection?: boolean | null,
      canViewDashboard?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      rolePermissionsRoleId?: string | null,
    } | null,
    sectionAvailableForThatRole?:  {
      __typename: "ModelRolesThatCanAccessConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    organizationRolesId?: string | null,
    userRolePermissionsId?: string | null,
  } | null,
};

export type OnDeleteUserRoleSubscription = {
  onDeleteUserRole?:  {
    __typename: "UserRole",
    id: string,
    name: string,
    organization:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    },
    users?:  {
      __typename: "ModelRolesOfUserConnection",
      nextToken?: string | null,
    } | null,
    permissions?:  {
      __typename: "RolePermissions",
      canAccessAttendanceSheet?: boolean | null,
      canCreateLesson?: boolean | null,
      canRateLessons?: boolean | null,
      canDeleteLessons?: boolean | null,
      canUpdateLesson?: boolean | null,
      canUploadContent?: boolean | null,
      canViewContent?: boolean | null,
      canCreateSection?: boolean | null,
      canDeleteSection?: boolean | null,
      canUpdateSection?: boolean | null,
      canViewDashboard?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      rolePermissionsRoleId?: string | null,
    } | null,
    sectionAvailableForThatRole?:  {
      __typename: "ModelRolesThatCanAccessConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    organizationRolesId?: string | null,
    userRolePermissionsId?: string | null,
  } | null,
};

export type OnCreateRolePermissionsSubscription = {
  onCreateRolePermissions?:  {
    __typename: "RolePermissions",
    role?:  {
      __typename: "UserRole",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      organizationRolesId?: string | null,
      userRolePermissionsId?: string | null,
    } | null,
    canAccessAttendanceSheet?: boolean | null,
    canCreateLesson?: boolean | null,
    canRateLessons?: boolean | null,
    canDeleteLessons?: boolean | null,
    canUpdateLesson?: boolean | null,
    canUploadContent?: boolean | null,
    canViewContent?: boolean | null,
    canCreateSection?: boolean | null,
    canDeleteSection?: boolean | null,
    canUpdateSection?: boolean | null,
    canViewDashboard?: boolean | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    rolePermissionsRoleId?: string | null,
  } | null,
};

export type OnUpdateRolePermissionsSubscription = {
  onUpdateRolePermissions?:  {
    __typename: "RolePermissions",
    role?:  {
      __typename: "UserRole",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      organizationRolesId?: string | null,
      userRolePermissionsId?: string | null,
    } | null,
    canAccessAttendanceSheet?: boolean | null,
    canCreateLesson?: boolean | null,
    canRateLessons?: boolean | null,
    canDeleteLessons?: boolean | null,
    canUpdateLesson?: boolean | null,
    canUploadContent?: boolean | null,
    canViewContent?: boolean | null,
    canCreateSection?: boolean | null,
    canDeleteSection?: boolean | null,
    canUpdateSection?: boolean | null,
    canViewDashboard?: boolean | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    rolePermissionsRoleId?: string | null,
  } | null,
};

export type OnDeleteRolePermissionsSubscription = {
  onDeleteRolePermissions?:  {
    __typename: "RolePermissions",
    role?:  {
      __typename: "UserRole",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      organizationRolesId?: string | null,
      userRolePermissionsId?: string | null,
    } | null,
    canAccessAttendanceSheet?: boolean | null,
    canCreateLesson?: boolean | null,
    canRateLessons?: boolean | null,
    canDeleteLessons?: boolean | null,
    canUpdateLesson?: boolean | null,
    canUploadContent?: boolean | null,
    canViewContent?: boolean | null,
    canCreateSection?: boolean | null,
    canDeleteSection?: boolean | null,
    canUpdateSection?: boolean | null,
    canViewDashboard?: boolean | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    rolePermissionsRoleId?: string | null,
  } | null,
};

export type OnCreateOrganizationSubscription = {
  onCreateOrganization?:  {
    __typename: "Organization",
    id: string,
    name?: string | null,
    owner:  {
      __typename: "User",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    Principals?:  {
      __typename: "ModelPrincipalConnection",
      nextToken?: string | null,
    } | null,
    WaitingForAcceptPupils?:  {
      __typename: "ModelPupilOrganizationRequestConnection",
      nextToken?: string | null,
    } | null,
    AcceptedPupils?:  {
      __typename: "ModelPupilOrganizationAcceptedConnection",
      nextToken?: string | null,
    } | null,
    Sections?:  {
      __typename: "ModelSectionConnection",
      nextToken?: string | null,
    } | null,
    Teachers?:  {
      __typename: "ModelTeacherOrganziationConnection",
      nextToken?: string | null,
    } | null,
    Classrooms?:  {
      __typename: "ModelClassroomConnection",
      nextToken?: string | null,
    } | null,
    members?:  {
      __typename: "ModelUserInOrganizationConnection",
      nextToken?: string | null,
    } | null,
    roles?:  {
      __typename: "ModelUserRoleConnection",
      nextToken?: string | null,
    } | null,
    type?: string | null,
    logo?:  {
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
    userOwnedOrganizationsId?: string | null,
    organizationLogoId?: string | null,
  } | null,
};

export type OnUpdateOrganizationSubscription = {
  onUpdateOrganization?:  {
    __typename: "Organization",
    id: string,
    name?: string | null,
    owner:  {
      __typename: "User",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    Principals?:  {
      __typename: "ModelPrincipalConnection",
      nextToken?: string | null,
    } | null,
    WaitingForAcceptPupils?:  {
      __typename: "ModelPupilOrganizationRequestConnection",
      nextToken?: string | null,
    } | null,
    AcceptedPupils?:  {
      __typename: "ModelPupilOrganizationAcceptedConnection",
      nextToken?: string | null,
    } | null,
    Sections?:  {
      __typename: "ModelSectionConnection",
      nextToken?: string | null,
    } | null,
    Teachers?:  {
      __typename: "ModelTeacherOrganziationConnection",
      nextToken?: string | null,
    } | null,
    Classrooms?:  {
      __typename: "ModelClassroomConnection",
      nextToken?: string | null,
    } | null,
    members?:  {
      __typename: "ModelUserInOrganizationConnection",
      nextToken?: string | null,
    } | null,
    roles?:  {
      __typename: "ModelUserRoleConnection",
      nextToken?: string | null,
    } | null,
    type?: string | null,
    logo?:  {
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
    userOwnedOrganizationsId?: string | null,
    organizationLogoId?: string | null,
  } | null,
};

export type OnDeleteOrganizationSubscription = {
  onDeleteOrganization?:  {
    __typename: "Organization",
    id: string,
    name?: string | null,
    owner:  {
      __typename: "User",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    Principals?:  {
      __typename: "ModelPrincipalConnection",
      nextToken?: string | null,
    } | null,
    WaitingForAcceptPupils?:  {
      __typename: "ModelPupilOrganizationRequestConnection",
      nextToken?: string | null,
    } | null,
    AcceptedPupils?:  {
      __typename: "ModelPupilOrganizationAcceptedConnection",
      nextToken?: string | null,
    } | null,
    Sections?:  {
      __typename: "ModelSectionConnection",
      nextToken?: string | null,
    } | null,
    Teachers?:  {
      __typename: "ModelTeacherOrganziationConnection",
      nextToken?: string | null,
    } | null,
    Classrooms?:  {
      __typename: "ModelClassroomConnection",
      nextToken?: string | null,
    } | null,
    members?:  {
      __typename: "ModelUserInOrganizationConnection",
      nextToken?: string | null,
    } | null,
    roles?:  {
      __typename: "ModelUserRoleConnection",
      nextToken?: string | null,
    } | null,
    type?: string | null,
    logo?:  {
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
    userOwnedOrganizationsId?: string | null,
    organizationLogoId?: string | null,
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
    organizationID?: string | null,
    ParentSection?:  {
      __typename: "Section",
      id: string,
      name?: string | null,
      parentID?: string | null,
      organizationID?: string | null,
      imagePreviewID?: string | null,
      createdAt: string,
      updatedAt: string,
      sectionSectionOptionsId?: string | null,
    } | null,
    OrganizationOwner?:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
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
    SectionOptions?:  {
      __typename: "SectionOptions",
      id: string,
      Activities?: Array< string | null > | null,
      Durations?: Array< number | null > | null,
      DeliveredBy?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
      sectionOptionsSectionId?: string | null,
    } | null,
    rolesThatCanAccess?:  {
      __typename: "ModelRolesThatCanAccessConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    sectionSectionOptionsId?: string | null,
  } | null,
};

export type OnUpdateSectionSubscription = {
  onUpdateSection?:  {
    __typename: "Section",
    id: string,
    name?: string | null,
    parentID?: string | null,
    organizationID?: string | null,
    ParentSection?:  {
      __typename: "Section",
      id: string,
      name?: string | null,
      parentID?: string | null,
      organizationID?: string | null,
      imagePreviewID?: string | null,
      createdAt: string,
      updatedAt: string,
      sectionSectionOptionsId?: string | null,
    } | null,
    OrganizationOwner?:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
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
    SectionOptions?:  {
      __typename: "SectionOptions",
      id: string,
      Activities?: Array< string | null > | null,
      Durations?: Array< number | null > | null,
      DeliveredBy?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
      sectionOptionsSectionId?: string | null,
    } | null,
    rolesThatCanAccess?:  {
      __typename: "ModelRolesThatCanAccessConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    sectionSectionOptionsId?: string | null,
  } | null,
};

export type OnDeleteSectionSubscription = {
  onDeleteSection?:  {
    __typename: "Section",
    id: string,
    name?: string | null,
    parentID?: string | null,
    organizationID?: string | null,
    ParentSection?:  {
      __typename: "Section",
      id: string,
      name?: string | null,
      parentID?: string | null,
      organizationID?: string | null,
      imagePreviewID?: string | null,
      createdAt: string,
      updatedAt: string,
      sectionSectionOptionsId?: string | null,
    } | null,
    OrganizationOwner?:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
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
    SectionOptions?:  {
      __typename: "SectionOptions",
      id: string,
      Activities?: Array< string | null > | null,
      Durations?: Array< number | null > | null,
      DeliveredBy?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
      sectionOptionsSectionId?: string | null,
    } | null,
    rolesThatCanAccess?:  {
      __typename: "ModelRolesThatCanAccessConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    sectionSectionOptionsId?: string | null,
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
      organizationID?: string | null,
      imagePreviewID?: string | null,
      createdAt: string,
      updatedAt: string,
      sectionSectionOptionsId?: string | null,
    } | null,
    LessonsRecords?:  {
      __typename: "ModelPELessonRecordConnection",
      nextToken?: string | null,
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
      organizationID?: string | null,
      imagePreviewID?: string | null,
      createdAt: string,
      updatedAt: string,
      sectionSectionOptionsId?: string | null,
    } | null,
    LessonsRecords?:  {
      __typename: "ModelPELessonRecordConnection",
      nextToken?: string | null,
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
      organizationID?: string | null,
      imagePreviewID?: string | null,
      createdAt: string,
      updatedAt: string,
      sectionSectionOptionsId?: string | null,
    } | null,
    LessonsRecords?:  {
      __typename: "ModelPELessonRecordConnection",
      nextToken?: string | null,
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
  } | null,
};

export type OnCreateSectionOptionsSubscription = {
  onCreateSectionOptions?:  {
    __typename: "SectionOptions",
    id: string,
    Section?:  {
      __typename: "Section",
      id: string,
      name?: string | null,
      parentID?: string | null,
      organizationID?: string | null,
      imagePreviewID?: string | null,
      createdAt: string,
      updatedAt: string,
      sectionSectionOptionsId?: string | null,
    } | null,
    Activities?: Array< string | null > | null,
    Durations?: Array< number | null > | null,
    DeliveredBy?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    sectionOptionsSectionId?: string | null,
  } | null,
};

export type OnUpdateSectionOptionsSubscription = {
  onUpdateSectionOptions?:  {
    __typename: "SectionOptions",
    id: string,
    Section?:  {
      __typename: "Section",
      id: string,
      name?: string | null,
      parentID?: string | null,
      organizationID?: string | null,
      imagePreviewID?: string | null,
      createdAt: string,
      updatedAt: string,
      sectionSectionOptionsId?: string | null,
    } | null,
    Activities?: Array< string | null > | null,
    Durations?: Array< number | null > | null,
    DeliveredBy?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    sectionOptionsSectionId?: string | null,
  } | null,
};

export type OnDeleteSectionOptionsSubscription = {
  onDeleteSectionOptions?:  {
    __typename: "SectionOptions",
    id: string,
    Section?:  {
      __typename: "Section",
      id: string,
      name?: string | null,
      parentID?: string | null,
      organizationID?: string | null,
      imagePreviewID?: string | null,
      createdAt: string,
      updatedAt: string,
      sectionSectionOptionsId?: string | null,
    } | null,
    Activities?: Array< string | null > | null,
    Durations?: Array< number | null > | null,
    DeliveredBy?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    sectionOptionsSectionId?: string | null,
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
    date: string,
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
      organizationClassroomsId?: string | null,
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
    date: string,
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
      organizationClassroomsId?: string | null,
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
    date: string,
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
      organizationClassroomsId?: string | null,
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

export type OnCreateSchoolHouseSubscription = {
  onCreateSchoolHouse?:  {
    __typename: "SchoolHouse",
    id: string,
    name?: string | null,
    Pupils?:  {
      __typename: "ModelPupilConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSchoolHouseSubscription = {
  onUpdateSchoolHouse?:  {
    __typename: "SchoolHouse",
    id: string,
    name?: string | null,
    Pupils?:  {
      __typename: "ModelPupilConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSchoolHouseSubscription = {
  onDeleteSchoolHouse?:  {
    __typename: "SchoolHouse",
    id: string,
    name?: string | null,
    Pupils?:  {
      __typename: "ModelPupilConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
      organizationClassroomsId?: string | null,
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
      organizationClassroomsId?: string | null,
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
      organizationClassroomsId?: string | null,
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
    Organization?:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    } | null,
    yearGroupID?: string | null,
    yearGroup?:  {
      __typename: "Curriculum",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    members?:  {
      __typename: "ModelUserInOrganizationInClassroomConnection",
      nextToken?: string | null,
    } | null,
    LessonRecords?:  {
      __typename: "ModelPELessonRecordConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    organizationClassroomsId?: string | null,
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
    Organization?:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    } | null,
    yearGroupID?: string | null,
    yearGroup?:  {
      __typename: "Curriculum",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    members?:  {
      __typename: "ModelUserInOrganizationInClassroomConnection",
      nextToken?: string | null,
    } | null,
    LessonRecords?:  {
      __typename: "ModelPELessonRecordConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    organizationClassroomsId?: string | null,
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
    Organization?:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    } | null,
    yearGroupID?: string | null,
    yearGroup?:  {
      __typename: "Curriculum",
      id: string,
      name?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    members?:  {
      __typename: "ModelUserInOrganizationInClassroomConnection",
      nextToken?: string | null,
    } | null,
    LessonRecords?:  {
      __typename: "ModelPELessonRecordConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    organizationClassroomsId?: string | null,
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
      organizationClassroomsId?: string | null,
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
      organizationClassroomsId?: string | null,
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
      organizationClassroomsId?: string | null,
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
    pupil:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      terraId?: string | null,
      provider?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
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
      organizationClassroomsId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePupilClassroomSubscription = {
  onUpdatePupilClassroom?:  {
    __typename: "PupilClassroom",
    id: string,
    pupilID: string,
    classroomID: string,
    pupil:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      terraId?: string | null,
      provider?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
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
      organizationClassroomsId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePupilClassroomSubscription = {
  onDeletePupilClassroom?:  {
    __typename: "PupilClassroom",
    id: string,
    pupilID: string,
    classroomID: string,
    pupil:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      terraId?: string | null,
      provider?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
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
      organizationClassroomsId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePupilOrganizationRequestSubscription = {
  onCreatePupilOrganizationRequest?:  {
    __typename: "PupilOrganizationRequest",
    id: string,
    pupilID: string,
    organizationID: string,
    pupil:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      terraId?: string | null,
      provider?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    organization:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePupilOrganizationRequestSubscription = {
  onUpdatePupilOrganizationRequest?:  {
    __typename: "PupilOrganizationRequest",
    id: string,
    pupilID: string,
    organizationID: string,
    pupil:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      terraId?: string | null,
      provider?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    organization:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePupilOrganizationRequestSubscription = {
  onDeletePupilOrganizationRequest?:  {
    __typename: "PupilOrganizationRequest",
    id: string,
    pupilID: string,
    organizationID: string,
    pupil:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      terraId?: string | null,
      provider?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    organization:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePupilOrganizationAcceptedSubscription = {
  onCreatePupilOrganizationAccepted?:  {
    __typename: "PupilOrganizationAccepted",
    id: string,
    pupilID: string,
    organizationID: string,
    pupil:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      terraId?: string | null,
      provider?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    organization:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePupilOrganizationAcceptedSubscription = {
  onUpdatePupilOrganizationAccepted?:  {
    __typename: "PupilOrganizationAccepted",
    id: string,
    pupilID: string,
    organizationID: string,
    pupil:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      terraId?: string | null,
      provider?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    organization:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePupilOrganizationAcceptedSubscription = {
  onDeletePupilOrganizationAccepted?:  {
    __typename: "PupilOrganizationAccepted",
    id: string,
    pupilID: string,
    organizationID: string,
    pupil:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      terraId?: string | null,
      provider?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    organization:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
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
    Pupils?:  {
      __typename: "ModelPupilConnection",
      nextToken?: string | null,
    } | null,
    classrooms?:  {
      __typename: "ModelClassroomConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    Pupils?:  {
      __typename: "ModelPupilConnection",
      nextToken?: string | null,
    } | null,
    classrooms?:  {
      __typename: "ModelClassroomConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    Pupils?:  {
      __typename: "ModelPupilConnection",
      nextToken?: string | null,
    } | null,
    classrooms?:  {
      __typename: "ModelClassroomConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    Pupil?:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      terraId?: string | null,
      provider?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    UserInOrganization:  {
      __typename: "UserInOrganization",
      userID?: string | null,
      organizationID?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    },
    Lesson?:  {
      __typename: "Lesson",
      id: string,
      title?: string | null,
      description?: string | null,
      sectionID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    lessonRecord?:  {
      __typename: "PELessonRecord",
      id: string,
      teacherID?: string | null,
      date: string,
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
    lessonRecordID?: string | null,
    createdAt: string,
    updatedAt: string,
    userInOrganizationAttendancesId?: string | null,
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
    Pupil?:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      terraId?: string | null,
      provider?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    UserInOrganization:  {
      __typename: "UserInOrganization",
      userID?: string | null,
      organizationID?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    },
    Lesson?:  {
      __typename: "Lesson",
      id: string,
      title?: string | null,
      description?: string | null,
      sectionID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    lessonRecord?:  {
      __typename: "PELessonRecord",
      id: string,
      teacherID?: string | null,
      date: string,
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
    lessonRecordID?: string | null,
    createdAt: string,
    updatedAt: string,
    userInOrganizationAttendancesId?: string | null,
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
    Pupil?:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      terraId?: string | null,
      provider?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    UserInOrganization:  {
      __typename: "UserInOrganization",
      userID?: string | null,
      organizationID?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    },
    Lesson?:  {
      __typename: "Lesson",
      id: string,
      title?: string | null,
      description?: string | null,
      sectionID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    lessonRecord?:  {
      __typename: "PELessonRecord",
      id: string,
      teacherID?: string | null,
      date: string,
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
    lessonRecordID?: string | null,
    createdAt: string,
    updatedAt: string,
    userInOrganizationAttendancesId?: string | null,
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
    InterventionFeedback?:  {
      __typename: "ModelParentInterventionFeedbackConnection",
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
    InterventionFeedback?:  {
      __typename: "ModelParentInterventionFeedbackConnection",
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
    InterventionFeedback?:  {
      __typename: "ModelParentInterventionFeedbackConnection",
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
    Pupil:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      terraId?: string | null,
      provider?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
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
    Pupil:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      terraId?: string | null,
      provider?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
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
    Pupil:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      terraId?: string | null,
      provider?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
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
    Organization?:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    Organization?:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    Organization?:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
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
    Organizations?:  {
      __typename: "ModelTeacherOrganziationConnection",
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
    Organizations?:  {
      __typename: "ModelTeacherOrganziationConnection",
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
    Organizations?:  {
      __typename: "ModelTeacherOrganziationConnection",
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

export type OnCreatePupilSubscription = {
  onCreatePupil?:  {
    __typename: "Pupil",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    terraId?: string | null,
    provider?: string | null,
    Attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    classrooms?:  {
      __typename: "ModelPupilClassroomConnection",
      nextToken?: string | null,
    } | null,
    Organizations?:  {
      __typename: "ModelPupilOrganizationAcceptedConnection",
      nextToken?: string | null,
    } | null,
    OrganizationsRequests?:  {
      __typename: "ModelPupilOrganizationRequestConnection",
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
    Interventions?:  {
      __typename: "ModelInterventionConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePupilSubscription = {
  onUpdatePupil?:  {
    __typename: "Pupil",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    terraId?: string | null,
    provider?: string | null,
    Attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    classrooms?:  {
      __typename: "ModelPupilClassroomConnection",
      nextToken?: string | null,
    } | null,
    Organizations?:  {
      __typename: "ModelPupilOrganizationAcceptedConnection",
      nextToken?: string | null,
    } | null,
    OrganizationsRequests?:  {
      __typename: "ModelPupilOrganizationRequestConnection",
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
    Interventions?:  {
      __typename: "ModelInterventionConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePupilSubscription = {
  onDeletePupil?:  {
    __typename: "Pupil",
    id: string,
    firstName?: string | null,
    lastName?: string | null,
    terraId?: string | null,
    provider?: string | null,
    Attendances?:  {
      __typename: "ModelAttendanceConnection",
      nextToken?: string | null,
    } | null,
    classrooms?:  {
      __typename: "ModelPupilClassroomConnection",
      nextToken?: string | null,
    } | null,
    Organizations?:  {
      __typename: "ModelPupilOrganizationAcceptedConnection",
      nextToken?: string | null,
    } | null,
    OrganizationsRequests?:  {
      __typename: "ModelPupilOrganizationRequestConnection",
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
    Interventions?:  {
      __typename: "ModelInterventionConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateInterventionSubscription = {
  onCreateIntervention?:  {
    __typename: "Intervention",
    id: string,
    pupilID: string,
    Pupil?:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      terraId?: string | null,
      provider?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    message?: string | null,
    viewed?: boolean | null,
    InterventionFeedback?:  {
      __typename: "ModelParentInterventionFeedbackConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateInterventionSubscription = {
  onUpdateIntervention?:  {
    __typename: "Intervention",
    id: string,
    pupilID: string,
    Pupil?:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      terraId?: string | null,
      provider?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    message?: string | null,
    viewed?: boolean | null,
    InterventionFeedback?:  {
      __typename: "ModelParentInterventionFeedbackConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteInterventionSubscription = {
  onDeleteIntervention?:  {
    __typename: "Intervention",
    id: string,
    pupilID: string,
    Pupil?:  {
      __typename: "Pupil",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      terraId?: string | null,
      provider?: string | null,
      schoolID?: string | null,
      schoolHouseID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    message?: string | null,
    viewed?: boolean | null,
    InterventionFeedback?:  {
      __typename: "ModelParentInterventionFeedbackConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateParentInterventionFeedbackSubscription = {
  onCreateParentInterventionFeedback?:  {
    __typename: "ParentInterventionFeedback",
    id: string,
    parentID: string,
    interventionID: string,
    Parent:  {
      __typename: "Parent",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    Intervention:  {
      __typename: "Intervention",
      id: string,
      pupilID: string,
      message?: string | null,
      viewed?: boolean | null,
      createdAt: string,
      updatedAt: string,
    },
    comment?: string | null,
    rating?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateParentInterventionFeedbackSubscription = {
  onUpdateParentInterventionFeedback?:  {
    __typename: "ParentInterventionFeedback",
    id: string,
    parentID: string,
    interventionID: string,
    Parent:  {
      __typename: "Parent",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    Intervention:  {
      __typename: "Intervention",
      id: string,
      pupilID: string,
      message?: string | null,
      viewed?: boolean | null,
      createdAt: string,
      updatedAt: string,
    },
    comment?: string | null,
    rating?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteParentInterventionFeedbackSubscription = {
  onDeleteParentInterventionFeedback?:  {
    __typename: "ParentInterventionFeedback",
    id: string,
    parentID: string,
    interventionID: string,
    Parent:  {
      __typename: "Parent",
      id: string,
      firstName?: string | null,
      lastName?: string | null,
      email?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    Intervention:  {
      __typename: "Intervention",
      id: string,
      pupilID: string,
      message?: string | null,
      viewed?: boolean | null,
      createdAt: string,
      updatedAt: string,
    },
    comment?: string | null,
    rating?: number | null,
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

export type OnCreateRolesOfUserSubscription = {
  onCreateRolesOfUser?:  {
    __typename: "RolesOfUser",
    id: string,
    userInOrganizationID: string,
    userRoleID: string,
    userInOrganization:  {
      __typename: "UserInOrganization",
      userID?: string | null,
      organizationID?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    },
    userRole:  {
      __typename: "UserRole",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      organizationRolesId?: string | null,
      userRolePermissionsId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateRolesOfUserSubscription = {
  onUpdateRolesOfUser?:  {
    __typename: "RolesOfUser",
    id: string,
    userInOrganizationID: string,
    userRoleID: string,
    userInOrganization:  {
      __typename: "UserInOrganization",
      userID?: string | null,
      organizationID?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    },
    userRole:  {
      __typename: "UserRole",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      organizationRolesId?: string | null,
      userRolePermissionsId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteRolesOfUserSubscription = {
  onDeleteRolesOfUser?:  {
    __typename: "RolesOfUser",
    id: string,
    userInOrganizationID: string,
    userRoleID: string,
    userInOrganization:  {
      __typename: "UserInOrganization",
      userID?: string | null,
      organizationID?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
    },
    userRole:  {
      __typename: "UserRole",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      organizationRolesId?: string | null,
      userRolePermissionsId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserInOrganizationInClassroomSubscription = {
  onCreateUserInOrganizationInClassroom?:  {
    __typename: "UserInOrganizationInClassroom",
    id: string,
    userInOrganizationID: string,
    classroomID: string,
    userInOrganization:  {
      __typename: "UserInOrganization",
      userID?: string | null,
      organizationID?: string | null,
      id: string,
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
      organizationClassroomsId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserInOrganizationInClassroomSubscription = {
  onUpdateUserInOrganizationInClassroom?:  {
    __typename: "UserInOrganizationInClassroom",
    id: string,
    userInOrganizationID: string,
    classroomID: string,
    userInOrganization:  {
      __typename: "UserInOrganization",
      userID?: string | null,
      organizationID?: string | null,
      id: string,
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
      organizationClassroomsId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserInOrganizationInClassroomSubscription = {
  onDeleteUserInOrganizationInClassroom?:  {
    __typename: "UserInOrganizationInClassroom",
    id: string,
    userInOrganizationID: string,
    classroomID: string,
    userInOrganization:  {
      __typename: "UserInOrganization",
      userID?: string | null,
      organizationID?: string | null,
      id: string,
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
      organizationClassroomsId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateRolesThatCanAccessSubscription = {
  onCreateRolesThatCanAccess?:  {
    __typename: "RolesThatCanAccess",
    id: string,
    userRoleID: string,
    sectionID: string,
    userRole:  {
      __typename: "UserRole",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      organizationRolesId?: string | null,
      userRolePermissionsId?: string | null,
    },
    section:  {
      __typename: "Section",
      id: string,
      name?: string | null,
      parentID?: string | null,
      organizationID?: string | null,
      imagePreviewID?: string | null,
      createdAt: string,
      updatedAt: string,
      sectionSectionOptionsId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateRolesThatCanAccessSubscription = {
  onUpdateRolesThatCanAccess?:  {
    __typename: "RolesThatCanAccess",
    id: string,
    userRoleID: string,
    sectionID: string,
    userRole:  {
      __typename: "UserRole",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      organizationRolesId?: string | null,
      userRolePermissionsId?: string | null,
    },
    section:  {
      __typename: "Section",
      id: string,
      name?: string | null,
      parentID?: string | null,
      organizationID?: string | null,
      imagePreviewID?: string | null,
      createdAt: string,
      updatedAt: string,
      sectionSectionOptionsId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteRolesThatCanAccessSubscription = {
  onDeleteRolesThatCanAccess?:  {
    __typename: "RolesThatCanAccess",
    id: string,
    userRoleID: string,
    sectionID: string,
    userRole:  {
      __typename: "UserRole",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      organizationRolesId?: string | null,
      userRolePermissionsId?: string | null,
    },
    section:  {
      __typename: "Section",
      id: string,
      name?: string | null,
      parentID?: string | null,
      organizationID?: string | null,
      imagePreviewID?: string | null,
      createdAt: string,
      updatedAt: string,
      sectionSectionOptionsId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateTeacherOrganziationSubscription = {
  onCreateTeacherOrganziation?:  {
    __typename: "TeacherOrganziation",
    id: string,
    organizationID: string,
    teacherID: string,
    organization:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    },
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
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTeacherOrganziationSubscription = {
  onUpdateTeacherOrganziation?:  {
    __typename: "TeacherOrganziation",
    id: string,
    organizationID: string,
    teacherID: string,
    organization:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    },
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
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTeacherOrganziationSubscription = {
  onDeleteTeacherOrganziation?:  {
    __typename: "TeacherOrganziation",
    id: string,
    organizationID: string,
    teacherID: string,
    organization:  {
      __typename: "Organization",
      id: string,
      name?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
      userOwnedOrganizationsId?: string | null,
      organizationLogoId?: string | null,
    },
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
    createdAt: string,
    updatedAt: string,
  } | null,
};
