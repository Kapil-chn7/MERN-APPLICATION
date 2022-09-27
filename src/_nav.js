import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilContact,
  cilStar,
  cilAddressBook,
  cilFilterPhoto,
  cilHome,
  cilDollar,
  cilBuilding,
  cilPeople,
  cilCommand,
  cilMedicalCross,
  cilAppsSettings,
  cilBullhorn,
  cilStream,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },

  ,
  {
    component: CNavGroup,
    name: 'CMS',
    icon: <CIcon icon={cilCommand} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Pages',

        to: '/view/page',
      },
      // {
      //   component: CNavItem,
      //   name: 'Upload',

      //   to: '/view/upload',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Section 80G',

      //   to: '/view/section80g',
      // },
      // {
      //   component: CNavItem,
      //   name: 'UNGCNI',

      //   to: '/view/ungcni',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Niti Aayog NGO Darpan',

      //   to: '/view/nitiaayog',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Terms and Conditions',

      //   to: '/view/tnc',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Privacy Policy',

      //   to: '/view/privacy',
      // },
    ],
  },
  //uncomment if you need these functionality in futures

  // {
  //   component: CNavItem,
  //   name: 'Properties ',
  //   to: '/view/properties',
  //   icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Investors ',
  //   to: '/view/Investors',
  //   icon: <CIcon icon={cilDollar} customClassName="nav-icon" />,
  // },

  // {
  //   component: CNavItem,
  //   name: 'Developers',
  //   to: '/view/developers',
  //   icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
  // },
  {
    component: CNavItem,
    name: 'Menu',
    to: '/menu',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },

  {
    component: CNavGroup,
    name: 'News & Events',
    icon: <CIcon icon={cilBullhorn} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Articles',
        icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
        to: '/newsandevents/articles',
      },
      {
        component: CNavItem,
        name: 'Categories',
        icon: <CIcon icon={cilStream} customClassName="nav-icon" />,
        to: '/newsandevents/categories',
      },
    ],
  },

  {
    component: CNavItem,
    name: 'Staff ',
    to: '/view/staff',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Contact Requests ',
    to: '/view/contactrequests',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Photo Gallery',
    to: '/photogallery',
    icon: <CIcon icon={cilFilterPhoto} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'News & Events',
    to: '/newsandevents',
    icon: <CIcon icon={cilFilterPhoto} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Donations',
    to: '/view/donations',
    icon: <CIcon icon={cilFilterPhoto} customClassName="nav-icon" />,
  },

  {
    component: CNavGroup,
    name: 'Settings',
    icon: <CIcon icon={cilAppsSettings} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Logos',
        icon: <CIcon icon={cilCommand} customClassName="nav-icon" />,
        to: '/view/logos',
      },
      {
        component: CNavItem,
        name: 'Social Media',
        icon: <CIcon icon={cilMedicalCross} customClassName="nav-icon" />,
        to: '/view/socialmedia',
      },
      {
        component: CNavItem,
        name: 'Address',
        icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
        to: '/view/address',
      },
      {
        component: CNavItem,
        name: 'Copyright',
        icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
        to: '/view/copyright',
      },
    ],
  },
]

export default _nav
