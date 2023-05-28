# Webster 🎈
This is a service that helps people broaden their horizons and improve their networkingskills. 
## API 🎈
### Endpoints 🎈
<img valign='middle' src='https://readme-swatches.vercel.app/2496f2?style=round'/> -- Public\
<img valign='middle' src='https://readme-swatches.vercel.app/37bca4?style=round'/> -- For authorized users\
<img valign='middle' src='https://readme-swatches.vercel.app/de57d0?style=round'/> -- For the users themselves\
<img valign='middle' src='https://readme-swatches.vercel.app/ad2232?style=round'/> -- For Admins

#### - Authentication module 🎈
<img valign='middle' src='https://readme-swatches.vercel.app/ffc000?style=circle'/> **POST** - /api/auth/register -- registration of a new user <img valign='middle' src='https://readme-swatches.vercel.app/2496f2?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ffc000?style=circle'/> **POST** - /api/auth/active-email/:token -- active email with a token from email <img valign='middle' src='https://readme-swatches.vercel.app/de57d0?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ffc000?style=circle'/> **POST** - /api/auth/login -- log in user <img valign='middle' src='https://readme-swatches.vercel.app/2496f2?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ffc000?style=circle'/> **POST** - /api/auth/reset-password -- send a reset link to user email <img valign='middle' src='https://readme-swatches.vercel.app/2496f2?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ffc000?style=circle'/> **POST** - /api/auth/reset-password/:token -- confirm new password with a token from email <img valign='middle' src='https://readme-swatches.vercel.app/de57d0?style=round'/>

#### - User module 🎈
<img valign='middle' src='https://readme-swatches.vercel.app/5CB270?style=circle'/> **GET** - /api/users -- get all users <img valign='middle' src='https://readme-swatches.vercel.app/2496f2?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/5CB270?style=circle'/> **GET** - /api/users/:id -- get specified user data <img valign='middle' src='https://readme-swatches.vercel.app/2496f2?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ffc000?style=circle'/> **POST** - /api/users/:token -- create a new user <img valign='middle' src='https://readme-swatches.vercel.app/37bca4?style=round'/> <img valign='middle' src='https://readme-swatches.vercel.app/ad2232?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ececec?style=circle'/> **PATCH** - /api/users/avatar/:token -- update user data <img valign='middle' src='https://readme-swatches.vercel.app/37bca4?style=round'/> <img valign='middle' src='https://readme-swatches.vercel.app/de57d0?style=round'/> <img valign='middle' src='https://readme-swatches.vercel.app/ad2232?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ececec?style=circle'/> **PATCH** - /api/users/:id/:token -- update user data <img valign='middle' src='https://readme-swatches.vercel.app/37bca4?style=round'/> <img valign='middle' src='https://readme-swatches.vercel.app/de57d0?style=round'/> <img valign='middle' src='https://readme-swatches.vercel.app/ad2232?style=round'/> \
<img valign='middle' src='https://readme-swatches.vercel.app/ec3323?style=circle'/> **DEL** - /api/users/:id/:token -- delete user <img valign='middle' src='https://readme-swatches.vercel.app/37bca4?style=round'/>

#### - Role module
<img valign='middle' src='https://readme-swatches.vercel.app/5CB270?style=circle'/> **GET** - /api/roles -- get all roles <img valign='middle' src='https://readme-swatches.vercel.app/2496f2?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/5CB270?style=circle'/> **GET** - /api/roles/:id -- get specified role data <img valign='middle' src='https://readme-swatches.vercel.app/2496f2?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ffc000?style=circle'/> **POST** - /api/roles/:token -- create a new role <img valign='middle' src='https://readme-swatches.vercel.app/ad2232?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ececec?style=circle'/> **PATCH** - /api/roles/:id/:token -- update role data <img valign='middle' src='https://readme-swatches.vercel.app/ad2232?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ec3323?style=circle'/> **DEL** - /api/roles/:id/:token -- delete role <img valign='middle' src='https://readme-swatches.vercel.app/ad2232?style=round'/>

#### - Format module
<img valign='middle' src='https://readme-swatches.vercel.app/5CB270?style=circle'/> **GET** - /api/formats -- get all formats <img valign='middle' src='https://readme-swatches.vercel.app/2496f2?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/5CB270?style=circle'/> **GET** - /api/formats/:id -- get specified format data <img valign='middle' src='https://readme-swatches.vercel.app/2496f2?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ffc000?style=circle'/> **POST** - /api/formats/:token -- create a new format <img valign='middle' src='https://readme-swatches.vercel.app/ad2232?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ececec?style=circle'/> **PATCH** - /api/formats/:id/:token -- update format data <img valign='middle' src='https://readme-swatches.vercel.app/ad2232?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ec3323?style=circle'/> **DEL** - /api/formats/:id/:token -- delete format <img valign='middle' src='https://readme-swatches.vercel.app/ad2232?style=round'/>

#### - Project module
<img valign='middle' src='https://readme-swatches.vercel.app/5CB270?style=circle'/> **GET** - /api/projects -- get all projects <img valign='middle' src='https://readme-swatches.vercel.app/2496f2?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/5CB270?style=circle'/> **GET** - /api/projects/:id -- get specified project data <img valign='middle' src='https://readme-swatches.vercel.app/2496f2?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/5CB270?style=circle'/> **GET** - /api/projects/user/:id -- get specified project data by user's id <img valign='middle' src='https://readme-swatches.vercel.app/2496f2?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ffc000?style=circle'/> **POST** - /api/projects/:token -- create a new project <img valign='middle' src='https://readme-swatches.vercel.app/37bca4?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ececec?style=circle'/> **PATCH** - /api/projects/:id/:token -- update project data <img valign='middle' src='https://readme-swatches.vercel.app/37bca4?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ec3323?style=circle'/> **DEL** - /api/projects/:id/:token -- delete project <img valign='middle' src='https://readme-swatches.vercel.app/37bca4?style=round'/>

#### - Category module
<img valign='middle' src='https://readme-swatches.vercel.app/5CB270?style=circle'/> **GET** - /api/categories -- get all categories <img valign='middle' src='https://readme-swatches.vercel.app/2496f2?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/5CB270?style=circle'/> **GET** - /api/categories/:id -- get specified categories data <img valign='middle' src='https://readme-swatches.vercel.app/2496f2?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ffc000?style=circle'/> **POST** - /api/categories/:token -- create a new category <img valign='middle' src='https://readme-swatches.vercel.app/ad2232?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ececec?style=circle'/> **PATCH** - /api/categories/:id/:token -- update category data <img valign='middle' src='https://readme-swatches.vercel.app/ad2232?style=round'/>\
<img valign='middle' src='https://readme-swatches.vercel.app/ec3323?style=circle'/> **DEL** - /api/categories/:id/:token -- delete category <img valign='middle' src='https://readme-swatches.vercel.app/ad2232?style=round'/>
