import { PAGE_KEY } from './permission';

export const EPIC_URL = {
  DASHBOARD: '/dashboard',
  EMPLOYEE_LIST: '/employee',
  INSURANCE: '/employee/insurance',
  EMPLOYEE_GROUP: '/employee/group',
  CONTRACT: '/employee/contract',
  SALARY: '/employee/salary',
  RECRUITMENT_PLANS: '/recruitment/plan',
  RECRUITMENT_CRITERIA: '/recruitment/criteria',
  RECRUITMENT_CANDIDATE: '/recruitment/candidate',
  RECRUITMENT_POSITION: '/recruitment/position',
  RECRUITMENT_NEEDS: '/recruitment/needs',
  TIME_SHEET: '/time-keeping/time-sheet',
  EMPLOYEE_SHIFT: '/time-keeping/employee-shift',
  OVER_TIME_SHEET: '/time-keeping/overtime-sheet',
  DAY_OFF: '/time-keeping/day-off',
  OVERTIME_APPLICATION: '/form-management/overtime-application',
  LEAVE_CONFIG: '/time-keeping/leave-config',
  ANNUAL_LEAVE: '/time-keeping/annual-leave',
  LEAVE_REPORT: '/time-keeping/leave-report',
  EXTRA_ATTENDANCE_FORM: '/form-management/extra-attendance-form',
  EXTRA_ATTENDANCE_APPLICATION: '/form-management/extra-attendance-application',
  OVERTIME_FORM: '/form-management/overtime-application',
  LEAVE_APPLICATION: '/form-management/leave-application',
  BUSINESS_TRIP_APPLICATION: '/form-management/business-trip-application',
  PRE_LEAVE_APPLICATION: '/form-management/pre-leave-application',
  OVERTIME_BREAK: '/time-keeping/overtime-break',
  CONFIG_DATA: '/system/config-data',
  CONFIG_STATUS: '/system/config-status',
  CONFIG_APPLICATION: '/system/config-application',
  CONFIG_DEPARTMENT: '/system/config-department',
  CONFIG_POSITION: '/system/config-position',
  CONFIG_JOB_TITLE: '/system/config-job-title',
  CONFIG_PERMISSION: '/system/config-permission',
  MANAGE_PAGE: '/system/manage-page',
  CONTACT_MANAGEMENT_EMPLOYEE: '/contact-management/employee',
  CONTACT_MANAGEMENT_SUPPLIER: '/contact-management/supplier',
  CONTACT_MANAGEMENT_CUSTOMER: '/contact-management/customer',

  PROJECT_PAGE_URL: '/projects',
  EQUIPMENT_PAGE_URL: '/equipment',
  MATERIAL_PAGE_URL: '/material',
};

export const DASHBOARD_URL = {
  list: {
    key: PAGE_KEY.DASHBOARD_LIST_VIEW,
    path: '/dashboard',
    shortenUrl: '',
  },
  create: {
    key: PAGE_KEY.DASHBOARD_LIST_CREATE,
    path: '/dashboard/create',
    shortenUrl: 'create',
  },
};

export const EMPLOYEE_LIST_URL = {
  list: {
    key: PAGE_KEY.EMPLOYEE_LIST_VIEW,
    path: '/employee/list',
    shortenUrl: 'list',
  },
  create: {
    key: PAGE_KEY.EMPLOYEE_LIST_CREATE,
    path: '/employee/create',
    shortenUrl: 'create',
  },
  update: {
    key: PAGE_KEY.EMPLOYEE_LIST_UPDATE,
    path: '/employee/update',
    shortenUrl: 'update/:id',
  },
  detail: {
    key: PAGE_KEY.EMPLOYEE_LIST_DETAIL,
    path: '/employee/detail',
    shortenUrl: 'detail/:id',
  },
};

export const INSURANCE_LIST_URL = {
  list: {
    key: PAGE_KEY.INSURANCE_LIST_VIEW,
    path: '/employee/insurance/list',
    shortenUrl: 'list',
  },
  create: {
    key: PAGE_KEY.INSURANCE_LIST_CREATE,
    path: '/employee/insurance/create',
    shortenUrl: 'create',
  },
  update: {
    key: PAGE_KEY.INSURANCE_LIST_UPDATE,
    path: '/employee/insurance/update',
    shortenUrl: 'update/:id',
  },
  detail: {
    key: PAGE_KEY.INSURANCE_LIST_DETAIL,
    path: '/employee/insurance/detail',
    shortenUrl: 'detail/:id',
  },
};

export const EMPLOYEE_GROUP_LIST_URL = {
  list: {
    key: PAGE_KEY.EMPLOYEE_GROUP_LIST_VIEW,
    path: '/employee/group/list',
    shortenUrl: 'list',
  },
};

export const CONTRACT_LIST_URL = {
  list: {
    key: PAGE_KEY.CONTRACT_LIST_VIEW,
    path: '/employee/contract/list',
    shortenUrl: 'list',
  },
  create: {
    key: PAGE_KEY.CONTRACT_LIST_CREATE,
    path: '/employee/contract/create',
    shortenUrl: 'create',
  },
  update: {
    key: PAGE_KEY.CONTRACT_LIST_UPDATE,
    path: '/employee/contract/update',
    shortenUrl: 'update/:id',
  },
  detail: {
    key: PAGE_KEY.CONTRACT_LIST_DETAIL,
    path: '/employee/contract/detail',
    shortenUrl: 'detail/:id',
  },
};

export const SALARY_LIST_URL = {
  list: {
    key: PAGE_KEY.SALARY_LIST_VIEW,
    path: '/employee/salary/list',
    shortenUrl: 'list',
  },
  create: {
    key: PAGE_KEY.SALARY_LIST_CREATE,
    path: '/employee/salary/create',
    shortenUrl: 'create',
  },
  update: {
    key: PAGE_KEY.SALARY_LIST_UPDATE,
    path: '/employee/salary/update',
    shortenUrl: 'update/:id',
  },
  detail: {
    key: PAGE_KEY.SALARY_LIST_DETAIL,
    path: '/employee/salary/detail',
    shortenUrl: 'detail/:id',
  },
};

export const EMPLOYEE_SHIFT_URL = {
  list: {
    key: PAGE_KEY.EMPLOYEE_SHIFT_LIST_VIEW,
    path: '/time-keeping/employee-shift',
    shortenUrl: '/time-keeping/employee-shift',
  },
  detail: {
    key: PAGE_KEY.EMPLOYEE_SHIFT_LIST_DETAIL,
    path: '/time-keeping/employee-shift/employee-shift-detail',
    shortenUrl: 'employee-shift-detail/:id',
  },
  employeeListInTheShift: {
    key: PAGE_KEY.LIST_EMPLOYEE_IN_THE_SHIFT,
    path: '/time-keeping/employee-shift/list-employee-in-the-shift',
    shortenUrl: 'list-employee-in-the-shift/:id',
  },
};

export const PLANS_LIST_URL = {
  list: {
    key: PAGE_KEY.PLANS_LIST_VIEW,
    path: '/recruitment/plan/list',
    shortenUrl: 'list',
  },
  vacancies_list: {
    key: PAGE_KEY.PLANS_LIST_VACANCIES_LIST,
    path: '/recruitment/plan/vacancies-list',
    shortenUrl: 'vacancies-list/:id',
  },
  submission: {
    key: PAGE_KEY.PLANS_LIST_SUBMISSION,
    path: '/recruitment/plan/submission',
    shortenUrl: 'submission/:id',
  },
};

export const CRITERIA_LIST_URL = {
  list: {
    key: PAGE_KEY.CRITERIA_LIST_VIEW,
    path: '/recruitment/criteria/list',
    shortenUrl: 'list',
  },
};

export const CANDIDATE_LIST_URL = {
  list: {
    key: PAGE_KEY.CANDIDATE_LIST_VIEW,
    path: '/recruitment/candidate/list',
    shortenUrl: 'list',
  },
  create: {
    key: PAGE_KEY.CANDIDATE_LIST_CREATE,
    path: '/recruitment/candidate/create',
    shortenUrl: 'create',
  },
  update: {
    key: PAGE_KEY.CANDIDATE_LIST_UPDATE,
    path: '/recruitment/candidate/update',
    shortenUrl: 'update/:id',
  },
  detail: {
    key: PAGE_KEY.CANDIDATE_LIST_DETAIL,
    path: '/recruitment/candidate/detail',
    shortenUrl: 'detail/:id',
  },
};

export const POSITION_LIST_URL = {
  list: {
    key: PAGE_KEY.POSITION_LIST_VIEW,
    path: '/recruitment/position/list',
    shortenUrl: 'list',
  },
  detail: {
    key: PAGE_KEY.POSITION_LIST_DETAIL,
    path: '/recruitment/position/detail',
    shortenUrl: 'detail/:id',
  },
};

export const NEEDS_LIST_URL = {
  list: {
    key: PAGE_KEY.NEEDS_LIST_VIEW,
    path: '/recruitment/needs/list',
    shortenUrl: 'list',
  },
  detail: {
    key: PAGE_KEY.NEEDS_LIST_DETAIL,
    path: '/recruitment/position/detail',
    shortenUrl: 'detail/:id',
  },
};

export const TIME_SHEET_URL = {
  list: {
    key: PAGE_KEY.TIME_SHEET_LIST_VIEW,
    path: '/time-keeping/time-sheet',
    shortenUrl: '',
  },
};

export const DAY_OFF_URL = {
  list: {
    key: PAGE_KEY.DAY_OFF_LIST_VIEW,
    path: '/time-keeping/day-off',
    shortenUrl: '',
  },
};

export const OVER_TIME_SHEET_URL = {
  list: {
    key: PAGE_KEY.OVER_TIME_SHEET_LIST_VIEW,
    path: '/time-keeping/overtime-sheet',
    shortenUrl: '',
  },
  detail: {
    key: PAGE_KEY.OVER_TIME_SHEET_LIST_DETAIL,
    path: '/time-keeping/overtime-sheet/detail',
    shortenUrl: 'detail/:id',
  },
};
export const LEAVE_CONFIG_URL = {
  list: {
    key: PAGE_KEY.LEAVE_CONFIG_LIST_VIEW,
    path: '/time-keeping/leave-config',
    shortenUrl: '',
  },
  detail: {
    key: PAGE_KEY.LEAVE_CONFIG_LIST_VIEW_DETAIL,
    path: '/time-keeping/leave-config/detail',
    shortenUrl: 'detail/:id',
  },
};
export const ANNUAL_LEAVE_URL = {
  list: {
    key: PAGE_KEY.ANNUAL_LEAVE_LIST_VIEW,
    path: '/time-keeping/annual-leave',
    shortenUrl: '',
  },
  detail: {
    key: PAGE_KEY.ANNUAL_LEAVE_LIST_VIEW_DETAIL,
    path: '/time-keeping/annual-leave/detail',
    shortenUrl: 'detail/:id',
  },
};

export const OVERTIME_BREAK_URL = {
  list: {
    key: PAGE_KEY.OVERTIME_BREAK_LIST_VIEW,
    path: '/time-keeping/overtime-break',
    shortenUrl: '',
  },
  detail: {
    key: PAGE_KEY.OVERTIME_BREAK_LIST_VIEW_DETAIL,
    path: '/time-keeping/overtime-break/detail',
    shortenUrl: 'detail/:id',
  },
};

export const LEAVE_REPORT_URL = {
  list: {
    key: PAGE_KEY.LEAVE_REPORT_LIST_VIEW,
    path: '/time-keeping/leave-report',
    shortenUrl: '',
  },
};
export const OVER_TIME_APPLICATION_URL = {
  list: {
    key: PAGE_KEY.OVERTIME_APPLICATION_LIST_VIEW,
    path: '/form-management/overtime-application',
    shortenUrl: '',
  },
};

export const LEAVE_APPLICATION_URL = {
  list: {
    key: PAGE_KEY.LEAVE_APPLICATION_LIST_VIEW,
    path: '/form-management/leave-application',
    shortenUrl: '',
  },
};

export const BUSINESS_TRIP_APPLICATION_URL = {
  list: {
    key: PAGE_KEY.BUSINESS_TRIP_APPLICATION_LIST_VIEW,
    path: '/form-management/business-trip-application',
    shortenUrl: '',
  },
};

export const EXTRA_ATTENDANCE_APPLICATION_URL = {
  list: {
    key: PAGE_KEY.EXTRA_ATTENDANCE_APPLICATION_LIST_VIEW,
    path: '/form-management/extra-attendance-application',
    shortenUrl: '',
  },
};

export const PRE_LEAVE_APPLICATION_URL = {
  list: {
    key: PAGE_KEY.PRE_LEAVE_APPLICATION_LIST_VIEW,
    path: '/form-management/pre-leave-application',
    shortenUrl: '',
  },
};

export const CONFIG_DATA_URL = {
  list: {
    key: PAGE_KEY.CONFIG_DATA_LIST_VIEW,
    path: '/system/config-data',
    shortenUrl: '',
  },
};

export const CONFIG_STATUS_URL = {
  list: {
    key: PAGE_KEY.CONFIG_STATUS_LIST_VIEW,
    path: '/system/config-status',
    shortenUrl: '',
  },
};

export const CONFIG_APPLICATION_URL = {
  list: {
    key: PAGE_KEY.CONFIG_APPLICATION_LIST_VIEW,
    path: '/system/config-application',
    shortenUrl: '',
  },
};

export const CONFIG_DEPARTMENT_URL = {
  list: {
    key: PAGE_KEY.CONFIG_DEPARTMENT_LIST_VIEW,
    path: '/system/config-department',
    shortenUrl: '',
  },
};
export const CONFIG_POSITION_URL = {
  list: {
    key: PAGE_KEY.CONFIG_POSITION_LIST_VIEW,
    path: '/system/config-position',
    shortenUrl: '',
  },
};
export const CONFIG_JOB_TITLE_URL = {
  list: {
    key: PAGE_KEY.CONFIG_JOB_TITLE_LIST_VIEW,
    path: '/system/config-job-title',
    shortenUrl: '',
  },
};
export const CONFIG_PERMISSION_URL = {
  list: {
    key: PAGE_KEY.CONFIG_PERMISSION_LIST_VIEW,
    path: '/system/config-permission',
    shortenUrl: '',
  },
  setting: {
    key: PAGE_KEY.CONFIG_PERMISSION_LIST_SETTING,
    path: '/system/config-permission/setting',
    shortenUrl: 'setting/:id',
  },
};

export const MANAGE_PAGE_URL = {
  list: {
    key: PAGE_KEY.MANAGE_PAGE_LIST_VIEW,
    path: '/system/manage-page',
    shortenUrl: '',
  },
  detail: {
    key: PAGE_KEY.MANAGE_PAGE_LIST_VIEW_DETAIL,
    path: '/system/manage-page',
    shortenUrl: ':pageId',
  },
  columnConfig: {
    key: PAGE_KEY.COLUMN_CONFIG_LIST_VIEW,
    path: '/system/manage-page',
    shortenUrl: ':pageId/column-config/:tableId',
  },
  tableConfig: {
    key: PAGE_KEY.MANAGE_PAGE_TABLE_CONFIG,
    path: '/system/manage-page/table-config',
    shortenUrl: 'table-config/:id',
  },
  tableConfigDetail: {
    key: PAGE_KEY.MANAGE_PAGE_TABLE_CONFIG_DETAIL,
    path: '/system/manage-page',
    shortenUrl: ':pageId/table-config-detail/:tableId',
  },
  controlConfig: {
    key: PAGE_KEY.MANAGE_PAGE_CONTROL_CONFIG,
    path: '/system/manage-page/control-config',
    shortenUrl: 'control-config/:pageId',
  },
};

export const PROJECT_PAGE_URL = {
  list: {
    key: PAGE_KEY.MANAGE_PAGE_LIST_VIEW,
    path: '/projects',
    shortenUrl: '',
  },
};

export const EQUIPMENT_PAGE_URL = {
  list: {
    key: PAGE_KEY.MANAGE_PAGE_LIST_VIEW,
    path: '/equipment',
    shortenUrl: '/equipment/list',
  },
  detail: {
    key: PAGE_KEY.MANAGE_PAGE_LIST_VIEW_DETAIL,
    path: '/equipment',
    shortenUrl: ':equipmentId',
  },
  category: {
    key: PAGE_KEY.MANAGE_PAGE_LIST_VIEW_DETAIL,
    path: '/category',
    shortenUrl: 'category',
  },
  maneuver: {
    key: PAGE_KEY.MANAGE_PAGE_LIST_VIEW_DETAIL,
    path: '/maneuver',
    shortenUrl: 'maneuver',
  },
  fix: {
    key: PAGE_KEY.MANAGE_PAGE_LIST_VIEW_DETAIL,
    path: '/fix',
    shortenUrl: 'fix',
  },
};

export const MATERIAL_PAGE_URL = {
  list: {
    key: PAGE_KEY.MANAGE_PAGE_LIST_VIEW,
    path: '/material',
    shortenUrl: '/material/list',
  },
  category: {
    key: PAGE_KEY.MANAGE_PAGE_LIST_VIEW_DETAIL,
    path: '/category',
    shortenUrl: 'category',
  },
  maneuver: {
    key: PAGE_KEY.MANAGE_PAGE_LIST_VIEW_DETAIL,
    path: '/maneuver',
    shortenUrl: 'maneuver',
  },
  report: {
    key: PAGE_KEY.MANAGE_PAGE_LIST_VIEW_DETAIL,
    path: '/report',
    shortenUrl: 'report',
  },
};

export const MANAGE_PAGE_CONFIG_FORM_URL = {
  list: {
    key: PAGE_KEY.MANAGE_PAGE_CONFIG_FORM,
    path: '/system/manage-page/config-form',
    shortenUrl: 'config-form/:pageId',
  },
  detail: {
    key: PAGE_KEY.MANAGE_PAGE_CONFIG_FORM_DETAIL,
    path: '/system/manage-page/config-form/detail',
    shortenUrl: 'config-form/:pageId/detail/:formId',
  },
  configField: {
    key: PAGE_KEY.MANAGE_PAGE_CONFIG_FIELD,
    path: '/system/manage-page/config-field',
    shortenUrl: ':pageId/config-field/:formId',
  },
};

export const PURCHASE_MANAGEMENT_URL = {
  create: {
    key: PAGE_KEY.PURCHASE_MANAGEMENT_LIST_CREATE,
    path: '/purchase/purchase-management/create',
    shortenUrl: 'create',
  },
  list: {
    key: PAGE_KEY.PURCHASE_MANAGEMENT_LIST_VIEW,
    path: '/purchase/purchase-management/list',
    shortenUrl: 'list',
  },
  detail: {
    key: PAGE_KEY.PURCHASE_MANAGEMENT_LIST_DETAIL,
    path: '/purchase/purchase-management/detail',
    shortenUrl: 'detail/:id',
  },
  update: {
    key: PAGE_KEY.PURCHASE_MANAGEMENT_LIST_CREATE,
    path: '/purchase/purchase-management/update',
    shortenUrl: 'update/:id',
  },
};
export const CONTACT_MANAGEMENT_EMPLOYEE_URL = {
  list: {
    key: PAGE_KEY.CONTACT_MANAGEMENT_EMPLOYEE_LIST_VIEW,
    path: '/crm/contact-management/employee',
    shortenUrl: 'employee',
  },
  detail: {
    key: PAGE_KEY.CONTACT_MANAGEMENT_EMPLOYEE_LIST_VIEW_DETAIL,
    path: '/crm/contact-management/employee',
    shortenUrl: 'employee/:id',
  },
  create: {
    key: PAGE_KEY.CONTACT_MANAGEMENT_EMPLOYEE_LIST_VIEW_CREATE,
    path: '/crm/contact-management/employee/create',
    shortenUrl: 'employee/create',
  },
  update: {
    key: PAGE_KEY.CONTACT_MANAGEMENT_EMPLOYEE_LIST_VIEW_UPDATE,
    path: '/crm/contact-management/employee/update',
    shortenUrl: 'employee/update/:id',
  },
};
export const CONTACT_MANAGEMENT_SUPPLIER_URL = {
  list: {
    key: PAGE_KEY.CONTACT_MANAGEMENT_SUPPLIER_LIST_VIEW,
    path: '/crm/contact-management/supplier',
    shortenUrl: 'supplier',
  },
  detail: {
    key: PAGE_KEY.CONTACT_MANAGEMENT_SUPPLIER_LIST_VIEW_DETAIL,
    path: '/crm/contact-management/supplier',
    shortenUrl: 'supplier/:id',
  },
  create: {
    key: PAGE_KEY.CONTACT_MANAGEMENT_SUPPLIER_LIST_VIEW_CREATE,
    path: '/crm/contact-management/supplier/create',
    shortenUrl: 'supplier/create',
  },
  update: {
    key: PAGE_KEY.CONTACT_MANAGEMENT_SUPPLIER_LIST_VIEW_UPDATE,
    path: '/crm/contact-management/supplier/update',
    shortenUrl: 'supplier/update/:id',
  },
};
export const CONTACT_MANAGEMENT_CUSTOMER_URL = {
  list: {
    key: PAGE_KEY.CONTACT_MANAGEMENT_CUSTOMER_LIST_VIEW,
    path: '/crm/contact-management/customer',
    shortenUrl: 'customer',
  },
  detail: {
    key: PAGE_KEY.CONTACT_MANAGEMENT_CUSTOMER_LIST_VIEW_DETAIL,
    path: '/crm/contact-management/customer',
    shortenUrl: 'customer/:id',
  },
  create: {
    key: PAGE_KEY.CONTACT_MANAGEMENT_CUSTOMER_LIST_VIEW_CREATE,
    path: '/crm/contact-management/customer/create',
    shortenUrl: 'customer/create',
  },
  update: {
    key: PAGE_KEY.CONTACT_MANAGEMENT_CUSTOMER_LIST_VIEW_UPDATE,
    path: '/crm/contact-management/customer/update',
    shortenUrl: 'customer/update/:id',
  },
};

export const PURCHASE_REQUEST_URL = {
  list: {
    key: PAGE_KEY.PURCHASE_REQUEST_LIST_VIEW,
    path: '/purchase/purchase-request/list',
    shortenUrl: 'list',
  },
  create: {
    key: PAGE_KEY.PURCHASE_REQUEST_LIST_CREATE,
    path: '/purchase/purchase-request/create',
    shortenUrl: 'create',
  },
  update: {
    key: PAGE_KEY.PURCHASE_REQUEST_LIST_UPDATE,
    path: '/purchase/purchase-request/update',
    shortenUrl: 'update/:id',
  },
  detail: {
    key: PAGE_KEY.PURCHASE_REQUEST_LIST_DETAIL,
    path: '/purchase/purchase-request/detail',
    shortenUrl: 'detail/:id',
  },
};

export const PURCHASE_ORDER_URL = {
  list: {
    key: PAGE_KEY.PURCHASE_ORDER_LIST_VIEW,
    path: '/crm/purchase-sales-management/purchase-order/list',
    shortenUrl: 'purchase-order/list',
  },
  detail: {
    key: PAGE_KEY.PURCHASE_ORDER_LIST_DETAIL,
    path: '/crm/purchase-sales-management/purchase-order/detail',
    shortenUrl: 'purchase-order/detail/:id',
  },
  payment: {
    key: PAGE_KEY.PURCHASE_ORDER_LIST_PAYMENT,
    path: '/crm/purchase-sales-management/purchase-order/payment',
    shortenUrl: 'purchase-order/payment/:paymentId',
  },
};

export const PRODUCT_MANAGEMENT_URL = {
  list: {
    key: PAGE_KEY.PRODUCT_MANAGEMENT_LIST_VIEW,
    path: '/crm/product-management/list',
    shortenUrl: 'list',
  },
  create: {
    key: PAGE_KEY.PRODUCT_MANAGEMENT_CREATE,
    path: '/crm/product-management/create',
    shortenUrl: 'create',
  },
  update: {
    key: PAGE_KEY.PRODUCT_MANAGEMENT_UPDATE,
    path: '/crm/product-management/update',
    shortenUrl: 'update/:productId',
  },
  detail: {
    key: PAGE_KEY.PRODUCT_MANAGEMENT_DETAIL,
    path: '/crm/product-management/list',
    shortenUrl: 'list/:productId',
  },
  historyTrade: {
    key: PAGE_KEY.PRODUCT_MANAGEMENT_HISTORY_TRADE,
    path: '/crm/product-management/history-trade',
    shortenUrl: 'history-trade/:productId',
  },
  category: {
    key: PAGE_KEY.PRODUCT_MANAGEMENT_CATEGORY_LIST,
    path: '/crm/product-management/category/list',
    shortenUrl: 'category/list',
  },
  detailCategory: {
    key: PAGE_KEY.PRODUCT_MANAGEMENT_CATEGORY_DETAIL,
    path: '/crm/product-management/category/list',
    shortenUrl: 'category/list/:categoryId',
  },
  brand: {
    key: PAGE_KEY.PRODUCT_MANAGEMENT_BRAND_LIST,
    path: '/crm/product-management/brand/list',
    shortenUrl: 'brand/list',
  },
  unit: {
    key: PAGE_KEY.PRODUCT_MANAGEMENT_UNIT_LIST,
    path: '/crm/product-management/unit/list',
    shortenUrl: 'unit/list',
  },
};

export const PRICE_QUOTATION_URL = {
  list: {
    key: PAGE_KEY.PRICE_QUOTATION_LIST_VIEW,
    path: '/crm/price-quotation/list',
    shortenUrl: 'list',
  },
  create: {
    key: PAGE_KEY.PRICE_QUOTATION_LIST_VIEW_CREATE,
    path: '/crm/price-quotation/create',
    shortenUrl: 'create',
  },
  update: {
    key: PAGE_KEY.PRICE_QUOTATION_LIST_VIEW_UPDATE,
    path: '/crm/price-quotation/update',
    shortenUrl: 'update/:id',
  },
  detail: {
    key: PAGE_KEY.PRICE_QUOTATION_LIST_VIEW_DETAIL,
    path: '/crm/price-quotation/detail',
    shortenUrl: 'detail/:id',
  },
};

export const SALES_ORDER_URL = {
  list: {
    key: PAGE_KEY.SALES_ORDER_LIST_VIEW,
    path: '/crm/purchase-sales-management/sales-order/list',
    shortenUrl: 'sales-order/list',
  },
  detail: {
    key: PAGE_KEY.SALES_ORDER_LIST_DETAIL,
    path: '/crm/purchase-sales-management/sales-order/detail',
    shortenUrl: 'sales-order/detail/:id',
  },
  payment: {
    key: PAGE_KEY.SALES_ORDER_LIST_PAYMENT,
    path: '/crm/purchase-sales-management/sales-order/payment',
    shortenUrl: 'sales-order/payment/:paymentId',
  },
};

export const DELIVERY_SELL_URL = {
  list: {
    key: PAGE_KEY.DELIVERY_SELL_LIST_VIEW,
    path: '/warehouse/transport/delivery-sell',
    shortenUrl: 'delivery-sell',
  },
  create: {
    key: PAGE_KEY.DELIVERY_SELL_LIST_CREATE,
    path: '/warehouse/transport/delivery-sell/create',
    shortenUrl: 'delivery-sell/create',
  },
  detail: {
    key: PAGE_KEY.DELIVERY_SELL_LIST_DETAIL,
    path: '/warehouse/transport/delivery-sell/detail',
    shortenUrl: 'delivery-sell/detail/:id',
  },
};

export const DELIVERY_PURCHASE_URL = {
  list: {
    key: PAGE_KEY.DELIVERY_PURCHASE_LIST_VIEW,
    path: '/warehouse/transport/delivery-purchase',
    shortenUrl: 'delivery-purchase',
  },
  create: {
    key: PAGE_KEY.DELIVERY_PURCHASE_LIST_CREATE,
    path: '/warehouse/transport/delivery-purchase/create',
    shortenUrl: 'delivery-purchase/create',
  },
  detail: {
    key: PAGE_KEY.DELIVERY_PURCHASE_LIST_DETAIL,
    path: '/warehouse/transport/delivery-purchase/detail',
    shortenUrl: 'delivery-purchase/detail/:id',
  },
};
export const SETTING_CONFIG_URL = {
  list: {
    key: PAGE_KEY.SETTING_CONFIG_LIST_VIEW,
    path: '/crm/setting/config',
    shortenUrl: 'config',
  },
};

export const PURCHASE_RETURN_URL = {
  list: {
    key: PAGE_KEY.PURCHASE_RETURN_LIST_VIEW,
    path: '/purchase/purchase-return/list',
    shortenUrl: 'list',
  },
  create: {
    key: PAGE_KEY.PURCHASE_RETURN_LIST_CREATE,
    path: '/purchase/purchase-return/create',
    shortenUrl: 'create',
  },
  update: {
    key: PAGE_KEY.PURCHASE_RETURN_LIST_UPDATE,
    path: '/purchase/purchase-return/update',
    shortenUrl: 'update/:id',
  },
  detail: {
    key: PAGE_KEY.PURCHASE_RETURN_LIST_DETAIL,
    path: '/purchase/purchase-return/detail',
    shortenUrl: 'detail/:id',
  },
};

export const SALE_ORDER_URL = {
  list: {
    key: PAGE_KEY.PURCHASE_REQUEST_LIST_VIEW,
    path: '/sale/sale-order/list',
    shortenUrl: 'list',
  },
  create: {
    key: PAGE_KEY.PURCHASE_REQUEST_LIST_CREATE,
    path: '/sale/sale-order/create',
    shortenUrl: 'create',
  },
  update: {
    key: PAGE_KEY.PURCHASE_REQUEST_LIST_UPDATE,
    path: '/sale/sale-order/update',
    shortenUrl: 'update/:id',
  },
  detail: {
    key: PAGE_KEY.PURCHASE_REQUEST_LIST_DETAIL,
    path: '/sale/sale-order/detail',
    shortenUrl: 'detail/:id',
  },
};

export const DELIVERY_COMPANY_URL = {
  list: {
    key: PAGE_KEY.DELIVERY_COMPANY_LIST_VIEW,
    path: '/crm/setting/delivery-company',
    shortenUrl: 'delivery-company',
  },
};
