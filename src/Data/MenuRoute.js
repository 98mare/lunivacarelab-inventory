export const MenuRoute = [
  {
    key: 'dashbord',
    name: 'dashbord',
    path: '/',
    icon: './Assets/icons/home.svg'
  },
  {
    key: 'item',
    name: 'Item',
    path: '/item',
    icon: './Assets/icons/product.svg',
    subMenu: [
      {
        key: 'addItem',
        name: 'add Item',
        path: '/item/add',
      },
      {
        key: 'editItem',
        name: 'edit Item',
        path: '/item/edit',
      },
    ],
  },
  {
    icon: './Assets/icons/product.svg',
    key: 'goodsin',
    name: 'goods in',
    path: '/goodsin',
  },
  {
    icon: './Assets/icons/product.svg',
    key: 'type',
    name: 'type',
    path: '/type'
  },
  {
    icon: './Assets/icons/product.svg',
    key: 'category',
    name: 'category',
    path: '/category'
  },
  {
    icon: './Assets/icons/product.svg',
    key: 'location',
    name: 'location',
    path: '/location'
  },
  {
    icon: './Assets/icons/product.svg',
    key: 'rack',
    name: 'rack',
    path: '/rack'
  }
  ,
  {
    icon: './Assets/icons/product.svg',
    key: 'wastage',
    name: 'wastage',
    path: '/wastage'
  }

  
]