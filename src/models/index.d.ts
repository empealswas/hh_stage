import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type FileMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type SchoolHouseMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PupilMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type AttendanceMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type LessonMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TermLessonMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TermMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type SubjectTermMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type SubjectMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CurriculumSubjectMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CurriculumMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type LessonTeacherMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TeacherMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TeacherClassroomMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ClassroomMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PupilClassroomMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type SchoolMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ClassroomLessonMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ParentMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class File {
  readonly id: string;
  readonly key?: string;
  readonly region?: string;
  readonly bucket?: string;
  readonly lessonID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<File, FileMetaData>);
  static copyOf(source: File, mutator: (draft: MutableModel<File, FileMetaData>) => MutableModel<File, FileMetaData> | void): File;
}

export declare class SchoolHouse {
  readonly id: string;
  readonly name?: string;
  readonly Pupils?: (Pupil | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<SchoolHouse, SchoolHouseMetaData>);
  static copyOf(source: SchoolHouse, mutator: (draft: MutableModel<SchoolHouse, SchoolHouseMetaData>) => MutableModel<SchoolHouse, SchoolHouseMetaData> | void): SchoolHouse;
}

export declare class Pupil {
  readonly id: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly Attendances?: (Attendance | null)[];
  readonly classrooms?: (PupilClassroom | null)[];
  readonly schoolHouse?: SchoolHouse;
  readonly school?: School;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Pupil, PupilMetaData>);
  static copyOf(source: Pupil, mutator: (draft: MutableModel<Pupil, PupilMetaData>) => MutableModel<Pupil, PupilMetaData> | void): Pupil;
}

export declare class Attendance {
  readonly id: string;
  readonly present?: boolean;
  readonly wasRewarded?: boolean;
  readonly Pupil?: Pupil;
  readonly Lesson?: Lesson;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Attendance, AttendanceMetaData>);
  static copyOf(source: Attendance, mutator: (draft: MutableModel<Attendance, AttendanceMetaData>) => MutableModel<Attendance, AttendanceMetaData> | void): Attendance;
}

export declare class Lesson {
  readonly id: string;
  readonly title?: string;
  readonly description?: string;
  readonly terms?: (TermLesson | null)[];
  readonly Attendances?: (Attendance | null)[];
  readonly Files?: (File | null)[];
  readonly LessonTeacher?: (LessonTeacher | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Lesson, LessonMetaData>);
  static copyOf(source: Lesson, mutator: (draft: MutableModel<Lesson, LessonMetaData>) => MutableModel<Lesson, LessonMetaData> | void): Lesson;
}

export declare class TermLesson {
  readonly id: string;
  readonly term: Term;
  readonly lesson: Lesson;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<TermLesson, TermLessonMetaData>);
  static copyOf(source: TermLesson, mutator: (draft: MutableModel<TermLesson, TermLessonMetaData>) => MutableModel<TermLesson, TermLessonMetaData> | void): TermLesson;
}

export declare class Term {
  readonly id: string;
  readonly nam?: string;
  readonly startDate?: string;
  readonly finishDate?: string;
  readonly subjects?: (SubjectTerm | null)[];
  readonly TermLessons?: (TermLesson | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Term, TermMetaData>);
  static copyOf(source: Term, mutator: (draft: MutableModel<Term, TermMetaData>) => MutableModel<Term, TermMetaData> | void): Term;
}

export declare class SubjectTerm {
  readonly id: string;
  readonly subject: Subject;
  readonly term: Term;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<SubjectTerm, SubjectTermMetaData>);
  static copyOf(source: SubjectTerm, mutator: (draft: MutableModel<SubjectTerm, SubjectTermMetaData>) => MutableModel<SubjectTerm, SubjectTermMetaData> | void): SubjectTerm;
}

export declare class Subject {
  readonly id: string;
  readonly name?: string;
  readonly SubjectTerms?: (SubjectTerm | null)[];
  readonly curriculums?: (CurriculumSubject | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Subject, SubjectMetaData>);
  static copyOf(source: Subject, mutator: (draft: MutableModel<Subject, SubjectMetaData>) => MutableModel<Subject, SubjectMetaData> | void): Subject;
}

export declare class CurriculumSubject {
  readonly id: string;
  readonly curriculum: Curriculum;
  readonly subject: Subject;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<CurriculumSubject, CurriculumSubjectMetaData>);
  static copyOf(source: CurriculumSubject, mutator: (draft: MutableModel<CurriculumSubject, CurriculumSubjectMetaData>) => MutableModel<CurriculumSubject, CurriculumSubjectMetaData> | void): CurriculumSubject;
}

export declare class Curriculum {
  readonly id: string;
  readonly name?: string;
  readonly subjects?: (CurriculumSubject | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Curriculum, CurriculumMetaData>);
  static copyOf(source: Curriculum, mutator: (draft: MutableModel<Curriculum, CurriculumMetaData>) => MutableModel<Curriculum, CurriculumMetaData> | void): Curriculum;
}

export declare class LessonTeacher {
  readonly id: string;
  readonly Teacher?: Teacher;
  readonly Lesson?: Lesson;
  readonly score?: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<LessonTeacher, LessonTeacherMetaData>);
  static copyOf(source: LessonTeacher, mutator: (draft: MutableModel<LessonTeacher, LessonTeacherMetaData>) => MutableModel<LessonTeacher, LessonTeacherMetaData> | void): LessonTeacher;
}

export declare class Teacher {
  readonly id: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly email?: string;
  readonly schoolID?: string;
  readonly classrooms?: (TeacherClassroom | null)[];
  readonly LessonTeacher?: (LessonTeacher | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Teacher, TeacherMetaData>);
  static copyOf(source: Teacher, mutator: (draft: MutableModel<Teacher, TeacherMetaData>) => MutableModel<Teacher, TeacherMetaData> | void): Teacher;
}

export declare class TeacherClassroom {
  readonly id: string;
  readonly teacher: Teacher;
  readonly classroom: Classroom;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<TeacherClassroom, TeacherClassroomMetaData>);
  static copyOf(source: TeacherClassroom, mutator: (draft: MutableModel<TeacherClassroom, TeacherClassroomMetaData>) => MutableModel<TeacherClassroom, TeacherClassroomMetaData> | void): TeacherClassroom;
}

export declare class Classroom {
  readonly id: string;
  readonly name?: string;
  readonly teachers?: (TeacherClassroom | null)[];
  readonly pupils?: (PupilClassroom | null)[];
  readonly school?: School;
  readonly yearGroup?: Curriculum;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Classroom, ClassroomMetaData>);
  static copyOf(source: Classroom, mutator: (draft: MutableModel<Classroom, ClassroomMetaData>) => MutableModel<Classroom, ClassroomMetaData> | void): Classroom;
}

export declare class PupilClassroom {
  readonly id: string;
  readonly pupil: Pupil;
  readonly classroom: Classroom;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<PupilClassroom, PupilClassroomMetaData>);
  static copyOf(source: PupilClassroom, mutator: (draft: MutableModel<PupilClassroom, PupilClassroomMetaData>) => MutableModel<PupilClassroom, PupilClassroomMetaData> | void): PupilClassroom;
}

export declare class School {
  readonly id: string;
  readonly name?: string;
  readonly country?: string;
  readonly region?: string;
  readonly principal?: string;
  readonly Teachers?: (Teacher | null)[];
  readonly Pupils?: (Pupil | null)[];
  readonly classrooms?: (Classroom | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<School, SchoolMetaData>);
  static copyOf(source: School, mutator: (draft: MutableModel<School, SchoolMetaData>) => MutableModel<School, SchoolMetaData> | void): School;
}

export declare class ClassroomLesson {
  readonly id: string;
  readonly Classroom?: Classroom;
  readonly Lesson?: Lesson;
  readonly completed?: boolean;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<ClassroomLesson, ClassroomLessonMetaData>);
  static copyOf(source: ClassroomLesson, mutator: (draft: MutableModel<ClassroomLesson, ClassroomLessonMetaData>) => MutableModel<ClassroomLesson, ClassroomLessonMetaData> | void): ClassroomLesson;
}

export declare class Parent {
  readonly id: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly email?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Parent, ParentMetaData>);
  static copyOf(source: Parent, mutator: (draft: MutableModel<Parent, ParentMetaData>) => MutableModel<Parent, ParentMetaData> | void): Parent;
}