import React from 'react'
import Getinvolved from './views/getinvolved/getinvolved'
import AddNewMenuItem from './views/menu/AddNewMenuItem'
import EditMenuItem from './views/menu/EditMenuItem'
import Menu from './views/menu/Menu'
import AddArticle from './views/newsandevents/AddArticle'
import AddCategory from './views/newsandevents/AddCategory'
import Articles from './views/newsandevents/Articles'
import Categories from './views/newsandevents/Categories'
import EditArticle from './views/newsandevents/EditArticle'
import EditCategory from './views/newsandevents/EditCategory'
import AddPhoto from './views/photogallery/AddPhoto'
import EditPhoto from './views/photogallery/EditPhoto'
import PhotoGallery from './views/photogallery/PhotoGallery'
import ViewPhoto from './views/photogallery/ViewPhoto'
import AddSlide from './views/sliders/AddSlide'
import EditSlide from './views/sliders/EditSlide'
import Sliders from './views/sliders/Sliders'
import ViewSlide from './views/sliders/ViewSlide'

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

//adding page for pdf video or images on cloudinary

const Addpvi = React.lazy(() => import('./views/cmsLinks/pages/Addvideopdf'))

//footer edit page

const Footeredit = React.lazy(() => import('./views/cmsLinks/pages/Footeredit.js'))

const MainPage = React.lazy(() => import('./views/cmsLinks/pages/MainCmslinkpage.js'))

//Donations

const Donations = React.lazy(() => import('./views/donation/Donations'))

//Copyright

const copyright = React.lazy(() => import('./views/copyright/Copyright'))

//view donations

const viewdonation = React.lazy(() => import('./views/donation/Viewdonations'))

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

//news and events

const newsandevent = React.lazy(() => import('./views/newsandevents/NewsandEvents'))

//newsletters
const newsletters = React.lazy(() => import('./views/newslettsuscribers/Newslettersus'))

//get involved section
const getinvolved = React.lazy(() => import('./views/getinvolved/getinvolved.js'))
const viewgetinvolved = React.lazy(() => import('./views/getinvolved/viewgetinvolved'))

const routes = [
  // { path: '/', exact: true, name: 'Login', element: Login },
  { path: '/changepassword', name: 'ChangePassword', element: ChangePassword },
  { path: '/', name: 'Home', exact: true },

  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  //menu
  { path: '/menu', name: 'Menu', element: Menu },
  { path: '/menu/add', name: 'Add New Menu Item', element: AddNewMenuItem },
  { path: '/menu/edit/:id', name: 'Edit Menu Item', element: EditMenuItem },

  //news & events
  { path: '/newsandevents/articles', name: 'Articles', element: Articles },
  { path: '/newsandevents/articles/addarticle', name: 'Add Article', element: AddArticle },
  { path: '/newsandevents/articles/editarticle/:id', name: 'Edit Article', element: EditArticle },
  { path: '/newsandevents/categories', name: 'Categories', element: Categories },
  { path: '/newsandevents/categories/addcategory', name: 'Add Category', element: AddCategory },
  {
    path: '/newsandevents/categories/editcategory/:id',
    name: 'Edit Category',
    element: EditCategory,
  },

  //photo gallery
  { path: '/photogallery', name: 'Photo Gallery', element: PhotoGallery },
  { path: '/photogallery/addphoto', name: 'Add Photo', element: AddPhoto },
  { path: '/photogallery/editphoto/:id', name: 'Edit Photo', element: EditPhoto },
  { path: '/photogallery/viewphoto/:id', name: 'View Photo', element: ViewPhoto },

  //sliders
  { path: '/sliders', name: 'Sliders', element: Sliders },
  { path: '/sliders/addslide', name: 'Add Slide', element: AddSlide },
  { path: '/sliders/editslide/:id', name: 'Edit Slide', element: EditSlide },
  { path: '/sliders/viewslide/:id', name: 'View Slide', element: ViewSlide },

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

  { path: '/view/upload', name: 'Upload', element: Addpvi },

  //CmsEditor with id
  { path: '/view/page/cmseditor/:id', name: 'Editor', element: CmsEditor },

  { path: '/view/page/cmseditor/Footer', name: 'Footer', element: Footeredit },

  //this is main page for cmslinks

  { path: '/view/page/:id', name: 'Links', element: MainPage },

  //donations

  { path: '/view/donations', name: 'Donations', element: Donations },

  { path: '/view/donations/viewdonations', name: 'View Donations', element: viewdonation },

  //copyright
  { path: '/view/copyright', name: 'Copyright', element: copyright },

  //news and Events

  { path: '/newsandevents', name: 'NewsandEvents', element: newsandevent },
  // //About Page
  // { path: '/view/about', name: 'About', element: About },

  //news letters
  {
    path: '/newslettersuscribers',
    name: 'Suscribers',
    element: newsletters,
  },
  {
    path: '/getinvolved',
    name: 'Get Involved',
    element: getinvolved,
  },

  {
    path: '/view/getinvolved/:category',
    name: 'View',
    element: viewgetinvolved,
  },
]

export default routes
