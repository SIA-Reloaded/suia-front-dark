import Group from '../models/group';

export const getUserData = async (username) => {
  const response = await fetch(
    `https://wb1jsep2hj.execute-api.us-east-1.amazonaws.com/Prod/system/getUserData/${username}`
  );

  const userData = await response.json();
  return userData[0];
};

export const getGroups = async (courseName, courseCode) => {
  const courseNameFilter = courseName ? `courseName=${courseName}` : ''
  const courseCodeFilter = courseCode ? `&courseCode=${courseCode}` : ''
  const response = await fetch(
    `https://wb1jsep2hj.execute-api.us-east-1.amazonaws.com/Prod/admin/getCourseGroups?${courseNameFilter}${courseCodeFilter}`
  );
  return await response.json();
};

export const getCourses = async () => {
  const response = await fetch(
    `https://wb1jsep2hj.execute-api.us-east-1.amazonaws.com/Prod/admin/getCourses`
  );
  return await response.json();
};

export const createGroup = async (group) => {
  console.log(group.groupJson)
  const response = await fetch(
    "https://wb1jsep2hj.execute-api.us-east-1.amazonaws.com/Prod/admin/createCourseGroup",
    {
      method: "POST",
      body: JSON.stringify(group.groupJson),
    }
  );
  return await response.json();
};

export const getCurrentAcademicCalendar = async () => {
  const response = await fetch(
    "https://wb1jsep2hj.execute-api.us-east-1.amazonaws.com/Prod/system/getCurrentAcademicCalendar"
  )
  return await response.json();
}

export const getSemestersList = async () => {
  const response = await fetch("https://wb1jsep2hj.execute-api.us-east-1.amazonaws.com/Prod/teachers/getSemestersList");
  return await response.json();
};

export const getRates = async (teacherID, academicCalendar) => {
  if (academicCalendar) {
    const response = await fetch(
      `https://wb1jsep2hj.execute-api.us-east-1.amazonaws.com/Prod/teachers/getRates?teacherID=${teacherID}&academicCalendar=${academicCalendar}`
    );
    return await response.json();
  } else {
    const response = await fetch(
      `https://wb1jsep2hj.execute-api.us-east-1.amazonaws.com/Prod/teachers/getRates?teacherID=${teacherID}`
    );
    return await response.json();
  }
}

export const getTeacherGroups = async (teacherID) => {
  const response = await fetch(
    `https://wb1jsep2hj.execute-api.us-east-1.amazonaws.com/Prod/teachers/getCourses?teacherID=${teacherID}`
  );
  return await response.json();
}

export const getGroup = async (courseID) => {
  const response = await fetch(
    `https://wb1jsep2hj.execute-api.us-east-1.amazonaws.com/Prod/teachers/getCourse?course_id=${courseID}`
  );
  return await response.json();
}

export const getCourseByCode = async (courseCode) => {
  const response = await fetch(
    `https://wb1jsep2hj.execute-api.us-east-1.amazonaws.com/Prod/teachers/getCourseById?courseCode=${courseCode}`
  );
  return await response.json();
}

export const getGroupGrades = async (courseID) => {
  const response = await fetch(
    `https://wb1jsep2hj.execute-api.us-east-1.amazonaws.com/Prod/teachers/getGrades?courseID=${courseID}`
  );
  return await response.json();
}

export const putRequest = async (body) => {
  const response = await fetch(
    `https://wb1jsep2hj.execute-api.us-east-1.amazonaws.com/Prod/admin/putRequest`,
    {
      method: "POST",
      body: JSON.stringify(body),
    }
  )
  return await response.json()
}

export const getAllRequests = async () => {
  const response = await fetch(
    `https://wb1jsep2hj.execute-api.us-east-1.amazonaws.com/Prod/admin/getAllRequests`
  );
  return await response.json();
}

export const updateRequest = async (body) => {
  const response = await fetch(
    `https://wb1jsep2hj.execute-api.us-east-1.amazonaws.com/Prod/admin/updateRequest`,
    {
      method: "POST",
      body: JSON.stringify(body),
    }
  )
  return await response.json()
}

export const putStudentInCourseGroup = async (body) => {
  const response = await fetch(
    `https://wb1jsep2hj.execute-api.us-east-1.amazonaws.com/Prod/admin/putStudentInCourseGroup`,
    {
      method: "POST",
      body: JSON.stringify(body),
    }
  )
  return await response.json()
}

export const putStudentGrades = async (grades) => {
  const response = await fetch(
    "https://wb1jsep2hj.execute-api.us-east-1.amazonaws.com/Prod/teachers/putStudentGrades",
    {
      method: "POST",
      body: JSON.stringify(grades),
    }
  );
  return await response.json();
};

export const getRequestsById = async (id) => {
  const response = await fetch(
    `https://wb1jsep2hj.execute-api.us-east-1.amazonaws.com/Prod/admin/getRequest?id=${id}`
  );
  return await response.json();
}

export const getRequestsByCourseAndRequesterId = async (courseID, requester_id) => {
  const response = await fetch(
    `https://wb1jsep2hj.execute-api.us-east-1.amazonaws.com/Prod/admin/getRequest?courseID=${courseID}&requester_id=${requester_id}`
  );
  return await response.json();
}