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
    teachers
  ) {
    this.id = id;
    this.name = name;
    this.code = code;
    this.capacityDistribution = capacityDistribution;
    this.group = group;
    this.schedule = schedule;
    this.classroom = classroom;
    this.students = students;
    this.teachers = teachers;
  }

  get rowRepresentation() {
    console.log(this.code)
    console.log(this.teachers?.name || 'No asignado')
    return [
      this.code,
      this.name,
      this.group,
      this.scheduleStringRepresentation,
      this.teachers?.name || 'No asignado',
      this.totalCapacity,
      this.students?.length || 0,
    ];
  }

  get rowRepresentation1() {
    console.log(this.code)
    console.log(this.teachers?.name || 'No asignado')
    
    return [
      this.code,
      this.group,
      this.name,
      this.teachers?.name || 'No asignado',
      this.classroom,
      this.scheduleStringRepresentation,
      [],
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
      schedule: this.schedule,
      classroom: this.classroom,
      students: this.students || [],
      teachers: this.teachers || [],
    };
  }
}
