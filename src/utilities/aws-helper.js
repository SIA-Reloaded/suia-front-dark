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

  const mock = [
    {
      "classroom": "Ingeniería - 401",
      "code": "202225",
      "schedule": [
        {
          "startHours": "14:00",
          "day": "MON",
          "endHours": "16:00"
        }
      ],
      "create_datetime": "2020-11-13T20:47:59.926Z",
      "capacityDistribution": {
        "freeElection": "2",
        "disciplinaryOptional": "2",
        "fundamentation": "2",
        "disciplinaryObligatory": "2"
      },
      "update_datetime": "2020-11-13T20:47:59.926Z",
      "id": "84249c70-25f1-11eb-8fa9-d16b13a3bd96",
      "name": "Prueba",
      "students": []
    },
    {
      "classroom": "Ingeniería - 401",
      "code": "202225",
      "schedule": [
        {
          "startHours": "14:00",
          "day": "MON",
          "endHours": "16:00"
        }
      ],
      "create_datetime": "2020-11-13T20:54:54.674Z",
      "capacityDistribution": {
        "freeElection": "2",
        "disciplinaryOptional": "2",
        "fundamentation": "2",
        "disciplinaryObligatory": "2"
      },
      "update_datetime": "2020-11-13T20:54:54.674Z",
      "id": "7b59fb20-25f2-11eb-8b25-8bd2d684b3d6",
      "name": "Prueba",
      "students": []
    },
    {
      "classroom": "Ingeniería - 401",
      "code": "202225",
      "schedule": [
        {
          "startHours": "14:00",
          "day": "MON",
          "endHours": "16:00"
        }
      ],
      "create_datetime": "2020-11-13T20:30:25.453Z",
      "capacityDistribution": {
        "freeElection": "2",
        "disciplinaryOptional": "2",
        "fundamentation": "2",
        "disciplinaryObligatory": "2"
      },
      "update_datetime": "2020-11-13T20:30:25.453Z",
      "teacherID": "02",
      "id": "0fa0cce0-25ef-11eb-9c41-7b8105682f18",
      "name": "Prueba",
      "students": []
    },
    {
      "academicCalendar": "39ab2677-5bcb-47df-92fe-71de8c7b79f3",
      "classroom": "Ingeniería - 401",
      "code": "202225",
      "schedule": [
        {
          "startHours": "14:00",
          "day": "MON",
          "endHours": "16:00"
        }
      ],
      "create_datetime": "2020-11-13T22:02:08.675Z",
      "capacityDistribution": {
        "freeElection": "2",
        "disciplinaryOptional": "2",
        "fundamentation": "2",
        "disciplinaryObligatory": "2"
      },
      "update_datetime": "2020-11-13T22:02:08.675Z",
      "id": "dfd0e380-25fb-11eb-b527-a17e6724d3e6",
      "name": "Prueba",
      "students": []
    },
    {
      "classroom": "Ingeniería - 401",
      "code": "202225",
      "schedule": [
        {
          "startHours": "14:00",
          "day": "MON",
          "endHours": "16:00"
        }
      ],
      "create_datetime": "2020-11-13T20:43:27.590Z",
      "capacityDistribution": {
        "freeElection": "2",
        "disciplinaryOptional": "2",
        "fundamentation": "2",
        "disciplinaryObligatory": "2"
      },
      "update_datetime": "2020-11-13T20:43:27.590Z",
      "id": "e1d14860-25f0-11eb-b82a-151c91e92c69",
      "name": "Prueba",
      "students": []
    }
  ]

  const test = mock.map((group) => new Group(
    group.id,
    group.name,
    group.code,
    group.capacityDistribution,
    group.group,
    group.schedule,
    group.classroom,
    group.students,
    group.teacher
  ))

  return test;

  //return await response.json();


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
      method: "PUT",
      mode: 'cors',
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
