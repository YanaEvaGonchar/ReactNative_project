import VisualSchedule from '../icons/visual-schedule.svg';
import Appointment from '../icons/appointment.svg';
import Checklist from '../icons/checklist.svg';
import Reminder from '../icons/reminder.svg';

import task1 from '../photos/1-task.jpg';
import task2 from '../photos/2-task.jpg';
import task3 from '../photos/3-task.jpg';
import task4 from '../photos/4-task.jpg';

const tasks = [
  {
    id: 1,
    photo: task1,
    icon: VisualSchedule,
    title: 'Play a Game',
    text: 'Running Now',
  },
  {
    id: 2,
    photo: task2,
    icon: Reminder,
    title: 'Visit the Dentist',
    text: 'Morning at 2:00 PM',
  },
  {
    id: 3,
    photo: task3,
    icon: Appointment,
    title: 'Visit the Dentist who does a gr...',
    text: 'Weekdays',
  },
  {
    id: 4,
    photo: task4,
    icon: Checklist,
    title: 'Use the Bathroom',
    text: 'Mon, Weds, Thur, Fri, Sat',
  },
  {
    id: 5,
    photo: task1,
    icon: VisualSchedule,
    title: 'Go to the Park',
    text: 'Weekends',
  },
];

export default tasks;
