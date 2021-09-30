// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { File, SchoolHouse, Pupil, Attendance, Lesson, TermLesson, Term, SubjectTerm, Subject, CurriculumSubject, Curriculum, LessonTeacher, Teacher, TeacherClassroom, Classroom, PupilClassroom, School, ClassroomLesson, Parent } = initSchema(schema);

export {
  File,
  SchoolHouse,
  Pupil,
  Attendance,
  Lesson,
  TermLesson,
  Term,
  SubjectTerm,
  Subject,
  CurriculumSubject,
  Curriculum,
  LessonTeacher,
  Teacher,
  TeacherClassroom,
  Classroom,
  PupilClassroom,
  School,
  ClassroomLesson,
  Parent
};