import BarChartIcon from '@material-ui/icons/BarChart';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ChatIcon from '@material-ui/icons/ChatOutlined';
import CodeIcon from '@material-ui/icons/Code';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import ErrorIcon from '@material-ui/icons/ErrorOutline';
import FolderIcon from '@material-ui/icons/FolderOutlined';
import DashboardTwoToneIcon from '@material-ui/icons/DashboardTwoTone';
import GradeTwoTone from '@material-ui/icons/GradeTwoTone';
import ListAltIcon from '@material-ui/icons/ListAlt';
import LockOpenIcon from '@material-ui/icons/LockOpenOutlined';
import MailIcon from '@material-ui/icons/MailOutlined';
import PresentToAllIcon from '@material-ui/icons/PresentToAll';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import PersonIcon from '@material-ui/icons/PersonOutlined';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

var iconsMap = {
  BarChartIcon: BarChartIcon,
  CalendarTodayIcon: CalendarTodayIcon,
  ChatIcon: ChatIcon,
  CodeIcon: CodeIcon,
  DashboardIcon: DashboardIcon,
  ErrorIcon: ErrorIcon,
  FolderIcon: FolderIcon,
  DashboardTwoToneIcon: DashboardTwoToneIcon,
  GradeTwoTone: GradeTwoTone,
  ListAltIcon: ListAltIcon,
  LockOpenIcon: LockOpenIcon,
  MailIcon: MailIcon,
  PresentToAllIcon: PresentToAllIcon,
  PeopleIcon: PeopleIcon,
  PersonIcon: PersonIcon,
  ReceiptIcon: ReceiptIcon,
  SettingsIcon: SettingsIcon,
  ViewModuleIcon: ViewModuleIcon
};

export default [
  {
    label: 'Menu de Navegación',
    content: JSON.parse(
      `[
  {
    "label": "Inicio",
    "icon": "DashboardTwoToneIcon",
    "content": [
      {
        "label": "Dasboard",
        "description": "This is a dashboard page example built using this template.",
        "icon": "DashboardTwoToneIcon",
        "to": "/DashboardDefault"
      }
    ]
  },
  {
    "label": "Usuarios",
    "icon": "ViewModuleIcon",
    "content": [
      {
        "label": "Lista de usuarios",
        "description": "Wide selection of cards with multiple styles, borders, actions and hover effects.",
        "to": "/Users"
      }
    ]
  },
  {
    "label": "Cooperativas",
    "icon": "ErrorIcon",
    "content": [
      {
        "label": "Lista de cooperativas",
        "description": "",
        "to": "/Cooperativas"
      }
    ]
  },
  {
    "label": "Bocaminas",
    "icon": "ReceiptIcon",
    "content": [
      {
        "label": "Lista de bocaminas",
        "description": "Accordions represent collapsable component with extended functionality.",
        "to": "/Bocaminas"
      }
    ]
  },
  {
    "label": "Socios",
    "icon": "CodeIcon",
    "content": [
      {
        "label": "Lista de socios",
        "description": "Tables are the backbone of almost all web applications.",
        "to": "/Socios"
      }
    ]
  },
  {
    "label": "Vehiculos",
    "icon": "CodeIcon",
    "content": [
      {
        "label": "Lista de Vehiculos",
        "description": "Tables are the backbone of almost all web applications.",
        "to": "/Vehiculos"
      }
    ]
  },
  {
    "label": "Conductores",
    "icon": "CodeIcon",
    "content": [
      {
        "label": "Lista de Conductores",
        "description": "Tables are the backbone of almost all web applications.",
        "to": "/Conductores"
      }
    ]
  },
  {
    "label": "Empresas Mineras",
    "icon": "CodeIcon",
    "content": [
      {
        "label": "Lista de Empresas",
        "description": "Tables are the backbone of almost all web applications.",
        "to": "/Empresas"
      }
    ]
  }
]`,
      (key, value) => {
        if (key === 'icon') {
          return iconsMap[value];
        } else {
          return value;
        }
      }
    )
  }
];
