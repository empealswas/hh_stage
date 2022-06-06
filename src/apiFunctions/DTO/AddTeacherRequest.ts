export type AddTeacherRequest =
{
    teacherEmail: string
    schoolId: string
    firstName: string
    lastName: string
}
export type AddTeacherOrganizationRequest =
{
    email: string
    organizationId: string
    firstName: string
    lastName: string
}
export type AddParentRequest = {
    email: string
    firstName: string
    lastName: string
}