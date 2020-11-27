export const getUserData = async (username) => {
  const response = await fetch(
    `https://wb1jsep2hj.execute-api.us-east-1.amazonaws.com/Prod/system/getUserData/${username}`
  );

  const userData = await response.json();
  return userData[0];
};

export const getGroups = async (groupID) => {
  const response = await fetch(
    `https://wb1jsep2hj.execute-api.us-east-1.amazonaws.com/Prod/admin/getCourseGroups?courseCode=${groupID}`
  );
  return await response.json();
};

export const createGroup = async (group) => {
  const response = await fetch(
    "https://wb1jsep2hj.execute-api.us-east-1.amazonaws.com/Prod/admin/createCourseGroup",
    {
      method: "POST",
      body: JSON.stringify(group),
    }
  );
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
