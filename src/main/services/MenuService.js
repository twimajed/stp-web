/**
 * Sidebar menus.
 * @type {Menu[]}
 */
var MENU_HOME = {
  menuIco: 'home', menuId: 'home', menuLbl: '首页', menuFix: 1
};

var MENU_DEV = {
  menuIco: 'chrome', menuId: 'ui', menuLbl: '～ DEV ～',
  menuSub: [
    {menuIco: 'calendar', menuId: 'ui001', menuLbl: '日历'},
    {menuIco: 'line-chart', menuId: 'ui002', menuLbl: '图表'},
    {menuIco: 'table', menuId: 'ui003', menuLbl: '表格排序分页'},
    {menuIco: 'table', menuId: 'ui007', menuLbl: '表格行编辑'},
    {menuIco: 'table', menuId: 'ui008', menuLbl: '表格滚动条'},
    {menuIco: 'table', menuId: 'ui010', menuLbl: '表格选择器'},
    {menuIco: 'edit', menuId: 'ui004', menuLbl: '表单(TODO)'},
    {menuIco: 'exchange', menuId: 'ui005', menuLbl: '数据'},
    {menuIco: 'exchange', menuId: 'ui006', menuLbl: '页面切换'},
    {menuIco: 'list', menuId: 'ui009', menuLbl: 'Suggestion'},
  ]
};

var  MENUS = [
  MENU_HOME, MENU_DEV,
  {
    menuIco: 'cubes', menuId: 'pm', menuLbl: '报价单管理',
    menuSub: [
      {menuIco: 'cubes', menuId: 'pm002', menuLbl: '报价单处理'},
      /*{menuIco: 'cubes', menuId: 'pm003', menuLbl: '待处理(主管)'},*/
      {menuIco: 'cubes', menuId: 'pm004', menuLbl: '待价格审核'},
      {menuIco: 'cubes', menuId: 'pm001', menuLbl: '报价单检索'}
      ]
  },
  {
    menuIco: 'share-alt', menuId: 'om', menuLbl: '销售订单管理',
    menuSub: [
      {menuIco: 'search', menuId: 'om001', menuLbl: '销售订单检索'},
      {menuIco: 'share-alt', menuId: 'om002', menuLbl: '营业待处理订单'},
      {menuIco: 'share-alt', menuId: 'om003', menuLbl: '待工艺评审订单'},
      {menuIco: 'share-alt', menuId: 'om004', menuLbl: '待信用审核订单'},
       {menuIco: 'share-alt', menuId: 'om006', menuLbl: '待确认委印单订单'},
        {menuIco: 'share-alt', menuId: 'om007', menuLbl: '待确认合同订单'},
         {menuIco: 'share-alt', menuId: 'om008', menuLbl: '待确认文件订单'},
         {menuIco: 'share-alt', menuId: 'om009', menuLbl: '待确认纸张订单'},
      {menuIco: 'search', menuId: 'om005', menuLbl: '发货通知单查询'}
    ]
  },
  {
    menuIco: 'dashboard',
    menuId: 'cm',
    menuLbl: '业务公司产能调度',
    menuSub: [
      {
        menuIco: 'dashboard',
        menuId: 'cm001',
        menuLbl: '驾驶舱'
      },
      // {
      //   menuIco: 'calendar',
      //   menuId: 'cm002',
      //   menuLbl: '生产支持'
      // },
      // {
      //   menuIco: 'bell',
      //   menuId: 'cm003',
      //   menuLbl: '订单警告'
      // },
      {
        menuIco: 'search',
        menuId: 'cm004',
        menuLbl: '工厂查询'
      },
      // {
      //   menuIco: 'search',
      //   menuId: 'cm005',
      //   menuLbl: '工厂查询-产能数据'
      // },
      {
        menuIco: 'share-alt',
        menuId: 'cm012',
        menuLbl: '订单查询'
      },
      // {
      //   menuIco: 'share-alt',
      //   menuId: 'cm007',
      //   menuLbl: '订单查询-产品明细'
      // },
      // {
      //   menuIco: 'share-alt',
      //   menuId: 'cm008',
      //   menuLbl: '订单查询-分单对象'
      // },
      // {
      //   menuIco: 'share-alt',
      //   menuId: 'cm009',
      //   menuLbl: '订单查询-选择工厂'
      // },
      // {
      //   menuIco: 'share-alt',
      //   menuId: 'cm010',
      //   menuLbl: '订单查询-分派订单'
      // },
      {menuIco: 'calculator',
        menuId: 'cm011',
        menuLbl: '订单核价'},
      // {
      //   menuIco: 'search',
      //   menuId: 'cm012',
      //   menuLbl: '订单查询'
      // },
      // {menuIco: 'share-alt',
      //   menuId: 'cm013',
      //   menuLbl: '分单规则'},
      // {
      //   menuIco: 'exchange',
      //   menuId: 'cm014',
      //   menuLbl: '纸张调拨单管理'
      // },
      // {menuIco: 'share-alt',
      //   menuId: 'cm015',
      //   menuLbl: '订单查询-选择工厂'}
    ]
  },
  {
    menuIco: 'dashboard', menuId: 'cm200', menuLbl: '生产工厂',
    menuSub: [
      {menuIco: 'dashboard', menuId: 'cm201', menuLbl: '驾驶舱'},
      {menuIco: 'bell', menuId: 'cm203', menuLbl: '公司查询'},
      {menuIco: 'search', menuId: 'cm205', menuLbl: '订单接单'},
      {menuIco: 'calculator', menuId: 'cm207', menuLbl: '生产管理'},
      {menuIco: 'share-alt', menuId: 'cm209', menuLbl: '订单查询'}
    ]
  },
  {
    menuIco: 'industry', menuId: 'fc', menuLbl: '工厂订单管理',
    menuSub: [
      {menuIco: 'dashboard', menuId: 'fc001', menuLbl: '驾驶舱'},
      {menuIco: 'bell', menuId: 'fc002', menuLbl: '订单警告'},
      {menuIco: 'search', menuId: 'fc003', menuLbl: '公司查询'},
      {menuIco: 'share-alt', menuId: 'fc004', menuLbl: '订单接单'},
      {menuIco: 'calendar', menuId: 'fc005', menuLbl: '生成管理'},
      {menuIco: 'search', menuId: 'fc006', menuLbl: '订单查询'},
      {menuIco: 'cubes', menuId: 'fc007', menuLbl: '成品入库单管理'}
    ]
  },
  {
    menuIco: 'truck', menuId: 'sm', menuLbl: '成品发运管理',
    menuSub: [
      {menuIco: 'search', menuId: 'sm001', menuLbl: '待处理发货通知单'},
      {menuIco: 'search', menuId: 'sm002', menuLbl: '发货通知单处理'},
      {menuIco: 'search', menuId: 'sm003', menuLbl: '发货通知单物流信息查询'},
      {menuIco: 'tasks', menuId: 'sm004', menuLbl: '产品发货记录查询'},
      {menuIco: 'search', menuId: 'sm006', menuLbl: '发货通知单回单确认'},
      {menuIco: 'tasks', menuId: 'sm005', menuLbl: '纸张调拨单管理'}
    ]
  },
  {
    menuIco: 'credit-card', menuId: 'fm', menuLbl: '结算管理',
    menuSub: [
      {menuIco: 'tasks', menuId: 'fm002', menuLbl: '对账单进度查询'},
      {menuIco: 'search', menuId: 'fm001', menuLbl: '对账单进度管理'},
      {menuIco: 'tasks', menuId: 'fm003', menuLbl: '发票查询'},
      {menuIco: 'tasks', menuId: 'fm004', menuLbl: '收款查询'},
      {menuIco: 'cog', menuId: 'fm005', menuLbl: '印刷采购单结算管理'}
    ]
  }
];

exports.menus = function () {
  return MENUS;
};
