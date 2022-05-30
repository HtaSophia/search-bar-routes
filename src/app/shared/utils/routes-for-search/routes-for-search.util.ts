export interface RouteForSearch {
  path: string;
  title: string;
  description: string;
  keywords: string[];
}

//Option for projects that already have many routes with the default configuration (routes in each routing.module)
export const ROUTES_FOR_SEARCH: RouteForSearch[] = [
  {
    path: 'home',
    title: 'KEYWORDS.HOME',
    description: 'KEYWORDS.HOME',
    keywords: ['KEYWORDS.HOME']
  },
  {
    path: 'product',
    title: 'KEYWORDS.PRODUCT',
    description: 'KEYWORDS.PRODUCT',
    keywords: ['KEYWORDS.PRODUCT', 'KEYWORDS.PRODUCT_LIST']
  },
  {
    path: 'user/new',
    title: 'KEYWORDS.USER',
    description: 'KEYWORDS.CREATE',
    keywords: ['KEYWORDS.CREATE', 'KEYWORDS.NEW', 'KEYWORDS.USER'],
  },
  {
    path: 'user/edit',
    title: 'KEYWORDS.USER',
    description: 'KEYWORDS.EDIT',
    keywords: ['KEYWORDS.EDIT', 'KEYWORDS.USER'],
  },
]
