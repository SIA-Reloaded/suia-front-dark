export default class Group {
  constructor(
    id,
    name,
    code,
    capacityDistribution,
    group,
    schedule,
    classroom,
    students,
    teacher
  ) {
    this.id = id;
    this.name = name;
    this.code = code;
    this.capacityDistribution = capacityDistribution;
    this.group = group;
    this.schedule = schedule;
    this.classroom = classroom;
    this.students = students;
    this.teacher = teacher;
  }

  get rowRepresentation() {
    console.log(this.code)
    console.log(this.teacher?.name || 'No asignado')
    return [
      this.code,
      this.name,
      this.group,
      this.scheduleStringRepresentation,
      this.teacher?.name || 'No asignado',
      this.totalCapacity,
      this.students?.length || 0,
    ];
  }

  get scheduleStringRepresentation() {
    let scheduleString = "";
    const spacer = ", ";
    this.schedule.forEach((session, index) => {
      scheduleString =
        scheduleString +
        `${session.day} ${session.startHours}-${session.endHours}`;
      if (index !== this.schedule.length - 1) {
        scheduleString = scheduleString + spacer;
      }
    });
    console.log(scheduleString);
    return scheduleString;
  }

  get totalCapacity() {
    let capacity = 0;
    for (const capacityType in this.capacityDistribution) {
      capacity += this.capacityDistribution[capacityType];
    }
    return capacity;
  }

  get groupJson() {
    return {
      name: this.name,
      code: this.code,
      capacityDistribution: this.capacityDistribution,
      group: this.group,
      schedule: this.schedule,
      classroom: this.classroom,
      students: [],
      teacher: {
        name: "Alejandro Díaz",
        id: 12341234,
      },
    };
  }
}
