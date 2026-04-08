export const base_url = "https://backend.voltedz.com/";

export const URLS ={
    ContactByCourse : base_url +  "v1/voltedzApi/admin/enquiry/addenquiry",
    contactForm : base_url +  "v1/voltedzApi/admin/contactForm/create",
    studentRegister: base_url + "v1/voltedzApi/user/student/create",
    studentLogin: base_url + "v1/voltedzApi/user/student/studentLogin",
    getStudentProfile: base_url + "v1/voltedzApi/user/student/getStudentProfile",
    getMyCourses: base_url + "v1/voltedzApi/user/myCourses/getMyCourses",
    updateStudentProfileImg: base_url + "v1/voltedzApi/user/student/updateStudentProfileImg",
    updateStudentProfile: base_url + "v1/voltedzApi/user/student/updateStudentProfile",
    studentSendOtp: base_url + "v1/voltedzApi/user/student/sendotp",
    studentCompareOtp: base_url + "v1/voltedzApi/user/student/compareotp",
    studentResetPass: base_url + "v1/voltedzApi/user/student/resetpass",
    createTicket: base_url + "v1/voltedzApi/user/ticket/create",
    getMyTickets: base_url + "v1/voltedzApi/user/ticket/getMyTickets",
    getTicketDetails: base_url + "v1/voltedzApi/user/ticket/getTicketDetails",
    sendStudentOtp: base_url + "v1/voltedzApi/user/student/sendStudentOtp",
    verifyStudentOtp: base_url + "v1/voltedzApi/user/student/verifyStudentOtp",
}