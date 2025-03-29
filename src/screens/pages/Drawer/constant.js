export const accountMenu = [
  {
    label: 'My Account',
    route: 'Profile',
    icon: 'https://cdn-icons-png.flaticon.com/512/1077/1077063.png', // User icon
  },
];

export const exploreMenu = [
  {
    label: 'Academics',
    icon: 'https://cdn-icons-png.flaticon.com/512/1042/1042333.png', // Orders icon
    children: [
      {
        label: 'Class',
        icon: 'https://cdn-icons-png.flaticon.com/512/1995/1995532.png', // Settings icon
        route: 'ClassScreen',
      },
      {
        label: 'Subject',
        icon: 'https://cdn-icons-png.flaticon.com/512/1995/1995532.png', // Settings icon
        route: 'SubjectScreen',
      },
      {
        label: 'Students',
        icon: 'https://cdn-icons-png.flaticon.com/512/1995/1995532.png', // Settings icon
        route: 'StudentScreen',
      },
      {
        label: 'Exam',
        icon: 'https://cdn-icons-png.flaticon.com/512/1995/1995532.png', // Settings icon
        route: 'ExamScreen',
      },
      {
        label: 'Assignment',
        icon: 'https://cdn-icons-png.flaticon.com/512/1995/1995532.png', // Settings icon
        route: 'AssignmentScreen',
      },
      {
        label: 'Attendance',
        icon: 'https://cdn-icons-png.flaticon.com/512/1995/1995532.png', // Settings icon
        route: 'AttendanceScreen',
      },
      {
        label: 'Event',
        icon: 'https://cdn-icons-png.flaticon.com/512/1995/1995532.png', // Settings icon
        route: 'EventScreen',
      },
      {
        label: 'Notice',
        icon: 'https://cdn-icons-png.flaticon.com/512/1995/1995532.png', // Settings icon
        route: 'NoticeScreen',
      },
      {
        label: 'Homework',
        icon: 'https://cdn-icons-png.flaticon.com/512/1995/1995532.png', // Settings icon
        route: 'HomeworkScreen',
      },
      {
        label: 'Timetable',
        icon: 'https://cdn-icons-png.flaticon.com/512/1995/1995532.png', // Settings icon
        route: 'TimetableScreen',
      },
    ],
  },
  {
    label: 'Teacher Management',
    icon: 'https://cdn-icons-png.flaticon.com/512/1995/1995532.png', // Settings icon
    children: [
      {
        label: 'Privacy',
        icon: 'https://cdn-icons-png.flaticon.com/512/565/565547.png', // Privacy icon
        route: 'PrivacyScreen',
      },
      {
        label: 'Notifications',
        icon: 'https://cdn-icons-png.flaticon.com/512/1827/1827279.png', // Notifications icon
        route: 'NotificationsScreen',
      },
    ],
  },
  {
    label: 'Reports',
    route: 'PDFViewer',
    icon: 'https://cdn-icons-png.flaticon.com/512/337/337946.png', // Documents icon
  },
  {
    label: 'Time Table',
    route: 'PDFViewer',
    icon: 'https://cdn-icons-png.flaticon.com/512/1827/1827279.png', // Documents icon
  },
  {
    label: 'Fees',
    icon: 'https://cdn-icons-png.flaticon.com/512/1611/1611179.png', // Settings icon
    children: [
      {
        label: 'Class Wise Fees',
        icon: 'https://cdn-icons-png.flaticon.com/512/565/565547.png', // Privacy icon
        route: 'PrivacyScreen',
      },
      {
        label: 'Manage Payment',
        icon: 'https://cdn-icons-png.flaticon.com/512/1827/1827279.png', // Notifications icon
        route: 'NotificationsScreen',
      },
      {
        label: 'Manage Fees Receipt',
        icon: 'https://cdn-icons-png.flaticon.com/512/565/565547.png', // Privacy icon
        route: 'PrivacyScreen',
      },
      {
        label: 'Manage Fees Reminder',
        icon: 'https://cdn-icons-png.flaticon.com/512/1827/1827279.png', // Notifications icon
        route: 'NotificationsScreen',
      },
    ],
  },
  {
    label: 'Help & Support',
    route: 'Help',
    icon: 'https://cdn-icons-png.flaticon.com/512/4712/4712038.png', // Help icon
  },
];

export const actionMenu = [
  {
    label: 'Terms & Conditions',
    route: 'Webview',
    icon: 'https://cdn-icons-png.flaticon.com/512/1250/1250615.png', // Terms icon
    params: {
      uri: 'https://www.example.com/terms',
      label: 'Terms & Conditions',
    },
  },
  {
    label: 'About Us',
    route: 'Webview',
    icon: 'https://cdn-icons-png.flaticon.com/512/1006/1006771.png', // About us icon
    params: {
      uri: 'https://www.example.com/about',
      label: 'About Us',
    },
  },
  {
    label: 'Settings',
    icon: 'https://cdn-icons-png.flaticon.com/512/2099/2099058.png', // Settings icon
    children: [
      {
        label: 'Privacy',
        icon: 'https://cdn-icons-png.flaticon.com/512/565/565547.png', // Privacy icon
        route: 'PrivacyScreen',
      },
      {
        label: 'Notifications',
        icon: 'https://cdn-icons-png.flaticon.com/512/1827/1827279.png', // Notifications icon
        route: 'NotificationsScreen',
      },
    ],
  },
];
