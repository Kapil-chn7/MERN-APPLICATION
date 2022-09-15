import React from 'react'
import AddPhoto from './views/photogallery/AddPhoto'
import EditPhoto from './views/photogallery/EditPhoto'
import PhotoGallery from './views/photogallery/PhotoGallery'
import ViewPhoto from './views/photogallery/ViewPhoto'

const ChangePassword = React.lazy(() => import('./views/pages/login/ChangePassword'))
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
// Porperties
const ViewProperties = React.lazy(() => import('./views/properties/ViewProperties'))
const AddProperties = React.lazy(() => import('./views/properties/AddProperties'))
const EditProperties = React.lazy(() => import('./views/properties/EditProperties'))
const ViewSingleProperty = React.lazy(() => import('./views/properties/ViewSingleProperty.js'))

//Investors
const ViewInvestors = React.lazy(() => import('./views/investors/ViewInvestors'))
const AddInvestors = React.lazy(() => import('./views/investors/AddInvestors'))
const EditInvestor = React.lazy(() => import('./views/investors/EditInvestor'))
const ViewSingleInvestor = React.lazy(() => import('./views/investors/ViewSingleInvestor'))

// Developer
const AddDeveloper = React.lazy(() => import('./views/Developer/AddDeveloper'))
const EditDeveloper = React.lazy(() => import('./views/Developer/EditDeveloper'))
const ViewDevelopers = React.lazy(() => import('./views/Developer/ViewDevelopers'))
const ViewSingleDeveloper = React.lazy(() => import('./views/Developer/ViewSingleDeveloper'))

//Relationship Manager
const RelationMa = React.lazy(() => import('./views/relationmanager/RelationMa'))
const AddRelaManager = React.lazy(() => import('./views/relationmanager/AddRelaManager'))
//Contact Request
const ContactRequest = React.lazy(() => import('./views/contactRe/ContactRequest'))
const AddContactRequest = React.lazy(() => import('./views/contactRe/AddContactRequest'))
const ViewSingleContactRe = React.lazy(() => import('./views/contactRe/ViewSingleContactRe'))

//cms
const Cms = React.lazy(() => import('./views/cmsProperty/Cms'))
const EditCms = React.lazy(() => import('./views/cmsProperty/EditCms'))
const ViewSingleCMS = React.lazy(() => import('./views/cmsProperty/ViewSingleCMS'))

//cms page

const Page1 = React.lazy(() => import('./views/cmsLinks/pages/CmsLink1'))

//cms ->page ->CmsEditor

const CmsEditor = React.lazy(() => import('./views/cmsLinks/pages/CmsEditor'))

//cms -> Add Page functionality

const AddPage = React.lazy(() => import('./views/cmsLinks/pages/AddPage'))

//cms links

const section8 = React.lazy(() => import('./views/cmsLinks/pages/Section8'))
const section80g = React.lazy(() => import('./views/cmsLinks/pages/Section80G'))
const ungcni = React.lazy(() => import('./views/cmsLinks/pages/UNGCNI'))
const nitiaayog = React.lazy(() => import('./views/cmsLinks/pages/NitiAyog'))
const tnc = React.lazy(() => import('./views/cmsLinks/pages/TnC'))
const privacy = React.lazy(() => import('./views/cmsLinks/pages/PrivacyPolicy'))

//social media
const SocialMedia = React.lazy(() => import('./views/socialmedia/SocialMedia'))
//address
const Address = React.lazy(() => import('./views/address/Address'))
//profile
const Profile = React.lazy(() => import('./views/profile/Profile'))

//logos

const Logos = React.lazy(() => import('./views/logos/Logos'))

//About

const About = React.lazy(() => import('./views/about/About'))

const routes = [
  // { path: '/', exact: true, name: 'Login', element: Login },
  { path: '/changepassword', name: 'ChangePassword', element: ChangePassword },
  { path: '/', name: 'Home', exact: true },

  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/photogallery', name: 'Photo Gallery', element: PhotoGallery },
  { path: '/photogallery/addphoto', name: 'Add Photo', element: AddPhoto },
  { path: '/photogallery/editphoto/:id', name: 'Edit Photo', element: EditPhoto },
  { path: '/photogallery/viewphoto/:id', name: 'View Photo', element: ViewPhoto },

  // properties
  { path: '/view/properties', name: 'ViewProperties', element: ViewProperties },
  { path: '/add/properties', name: 'AddProperties', element: AddProperties },
  { path: '/edit/properties/:id', name: 'EditProperties', element: EditProperties },
  { path: '/view/property/:id', name: 'ViewSingleProperty', element: ViewSingleProperty },

  //Investors
  { path: '/view/investors', name: 'ViewInvestors', element: ViewInvestors },
  { path: '/add/investors', name: 'AddInvestors', element: AddInvestors },
  { path: '/edit/investor/:id', name: 'EditInvestor', element: EditInvestor },
  { path: '/view/investor/:id', name: 'ViewSingleInvestor', element: ViewSingleInvestor },
  // Developer
  { path: '/view/developers', name: 'ViewDevelopers', element: ViewDevelopers },
  { path: '/add/developer', name: 'AddDeveloper', element: AddDeveloper },
  { path: '/edit/developer/:id', name: 'EditDeveloper', element: EditDeveloper },
  { path: '/view/developer/:id', name: 'ViewSingleDeveloper', element: ViewSingleDeveloper },
  //Relationship Manager
  { path: '/view/staff', name: 'Staff', element: RelationMa },
  { path: '/add/relationmanager', name: 'AddRelaManager', element: AddRelaManager },
  //Conatct Request
  { path: '/view/contactrequests', name: 'ContactRequest', element: ContactRequest },
  { path: '/add/conRequest', name: 'AddContactRequest', element: AddContactRequest },
  { path: '/view/contactRequest/:id', name: 'ViewSingleContactRe', element: ViewSingleContactRe },

  //cms
  { path: '/view/cms', name: 'Cms', element: Cms },
  { path: '/edit/cms/:id', name: 'EditCms', element: EditCms },
  { path: '/view/cms/:id', name: 'ViewSingleCMS', element: ViewSingleCMS },

  //cms links

  //social media
  { path: '/view/socialmedia', name: 'SocialMedia', element: SocialMedia },
  //Address
  { path: '/view/address', name: 'Address', element: Address },
  //Profile
  { path: '/view/profile', name: 'Profile', element: Profile },
  //logos
  { path: '/view/logos', name: 'Logos', element: Logos },

  //inside cms page
  { path: '/view/page', name: 'Page', element: Page1 },

  //Inside CMS Add button page

  { path: '/view/addpage', name: 'Add Page', element: AddPage },

  //CmsEditor
  { path: '/view/page/cmseditor', name: 'Editor', element: CmsEditor },

  //cmslinks

  { path: '/view/section8', name: 'Section 8', element: section8 },
  { path: '/view/section80g', name: 'Section 80 G', element: section80g },
  { path: '/view/ungcni', name: 'UNGCNI', element: ungcni },
  { path: '/view/nitiaayog', name: 'Niti Aayog', element: nitiaayog },
  { path: '/view/tnc', name: 'Terms and Conditions', element: tnc },
  { path: '/view/privacy', name: 'Privacy Policy', element: privacy },

  //About Page
  { path: '/view/about', name: 'About', element: About },
]

export default routes
