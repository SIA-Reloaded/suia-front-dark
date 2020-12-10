export default class Group {
  constructor(
    id,
    name,
    code,
    capacityDistribution,
    group,
    schedule,
    classroom,
    studentsUserNames,
    teachersUsernames
  ) {
    this.id = id;
    this.name = name;
    this.code = code;
    this.capacityDistribution = capacityDistribution;
    this.group = group;
    this.schedule = schedule;
    this.classroom = classroom;
    this.studentsUserNames = studentsUserNames;
    this.teachersUsernames = teachersUsernames;
  }

  get rowRepresentation() {
    return [
      this.code,
      this.name,
      this.group,
      this.scheduleStringRepresentation,
      this.teachersUsernames[0] || 'No asignado',
      this.totalCapacity,
      this.studentsUserNames?.length || 0,
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
      studentsUserNames: this.studentsUserNames || [],
      teachersUsernames: this.teachersUsernames || [],
    };
  }
}
