import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'

axios.defaults.baseURL = process.env.BASE_URL;
// axios.defaults.serverUrl = 'http://staging.medicloud.sg';
// axios.defaults.serverUrl = 'http://medicloud.local';
// axios.defaults.serverUrl = 'http://api-hr.medicloud.sg';
axios.defaults.serverUrl =  {
  node_company: 'http://localhost:5000',
  node_clinlic: 'http://localhost:4040',
  node_member: 'http://localhost:6000',
}
axios.defaults.user_id = null;



import Portal from './views/Portal.vue'

// MEMBER views 
import MemberAuth from './views/member/Auth.vue'
import MemberDashboard from './views/member/Dashboard.vue'
import MemberHome from './views/member/Home.vue'
import MemberActivity from './views/member/Activity.vue'
import MemberEclaim from './views/member/Eclaim.vue'
// COMPANY views
import CompanyAuth from './views/company/Auth.vue'
import CompanyIntro from './views/company/Intro.vue'
import CompanyDashboard from './views/company/Dashboard.vue'
import CompanyEmployee from './views/company/Employee.vue'
import CompanyEmployeeDetails from './views/company/employee/Employee-details.vue'
import CompanyRemoveEmployee from './views/company/employee/Remove-employee.vue'
import CompanyActivity from './views/company/Activity.vue'
import CompanyClaim from './views/company/Claim.vue'
import CompanyCreateTeamBenefitsTier from './views/company/enrollment/Create-team-benefits-tier.vue'
import CompanyStatement from './views/company/Statement.vue'
import CompanyAccount from './views/company/Account.vue'
import CompanyOverview from './views/company/Overview.vue'
import CompanyCreditAllocation from './views/company/CreditAllocation.vue'
import CompanyEnrollment from './views/company/Enrollment.vue'
import CompanyEnrollmentOptions from './views/company/enrollment/Enrollment-options.vue'
import CompanyWebInput from './views/company/enrollment/Web-input.vue'
import CompanyExcel from './views/company/enrollment/Excel.vue'
import CompanyEnroll from './views/company/enrollment/Enroll-summary.vue'
// accounts
import AccountCompany from './views/company/account/Company-contacts.vue'
import AccountTransaction from './views/company/account/Transaction.vue'
import AccountDocument from './views/company/account/Document-center.vue'
import AccountPayments from './views/company/account/Account-payments.vue'
import AccountBenefits from './views/company/account/Benefits-tier.vue'

import CompanyPlanCoverage from './views/company/Plan-coverage.vue'
import PlanBenefits from './views/company/planCoverage/Benefits.vue'
import PlanLocalNetwork from './views/company/planCoverage/LocalNetwork.vue'

// CLINIC views
import ClinicAuth from './views/clinic/Auth.vue'
import ClinicDashboard from './views/clinic/Dashboard.vue'
import ClinicDashboardSummary from './views/clinic/Dashboard-summary.vue'
import ClinicClaim from './views/clinic/Claim.vue'
import ClinicCalendar from './views/clinic/Calendar.vue'
import ClinicSettings from './views/clinic/Settings.vue'
// settings 
import ClinicAccount from './views/clinic/settings/Clinic-account.vue'
import ClinicStaff from './views/clinic/settings/Clinic-staff.vue'
import ClinicServices from './views/clinic/settings/Clinic-services.vue'
import ClinicProfile from './views/clinic/settings/Clinic-profile.vue'
import ClinicTransactions from './views/clinic/settings/Clinic-transactions.vue'
// profile in settings
import ClinicDetails from './views/clinic/settings/profile/Clinic-details.vue'
import BusinessHours from './views/clinic/settings/profile/Business-hours.vue'
import ProfilePassword from './views/clinic/settings/profile/Profile-password.vue'
import PaymentDetails from './views/clinic/settings/profile/Payment-details.vue'
import ProfileWidget from './views/clinic/settings/profile/Profile-widget.vue'
import QrCode from './views/clinic/settings/profile/Qr-code.vue'
// transactions in settings
import TransactionHistory from './views/clinic/settings/transactions/Transaction-history.vue'
import TransactionInvoice from './views/clinic/settings/transactions/Transaction-invoice.vue'
import StatementAccount from './views/clinic/settings/transactions/Statement-account.vue'

Vue.use(Router)
Vue.use(axios)


export default new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  linkActiveClass: 'router-active',
  routes: [
    { path: '*', redirect: '/portal' },
    { path: '/portal', name: 'portal', component: Portal },
    { path: '/member/auth', name: 'MemberAuth', component: MemberAuth },
    { path: '/company/auth', name: 'CompanyAuth', component: CompanyAuth },
    { path: '/clinic/auth', name: 'ClinicAuth', component: ClinicAuth },
    {
      path: '/member',
      name: 'member-dashboard',
      redirect: '/member/dashboard',
      component: MemberDashboard,
      meta: { auth: true },
      children: [
        { name: 'MemberHome', path: '/member/dashboard', component: MemberHome },
        { name: 'MemberActivity', path: '/member/activity', component: MemberActivity },
        { name: 'MemberEclaim', path: '/member/eclaim', component: MemberEclaim },
      ]
    },
    {
      path: '/company',
      name: 'company-dashboard',
      redirect: '/company/auth',
      component: CompanyDashboard,
      meta: { auth: true },
      children: [
        //dashboard
        { name: 'CompanyIntro', path: '/company/intro', component: CompanyIntro },
        { name: 'CompanyHome', path: '/company/dashboard', component: CompanyOverview },
        //employee
        { name: 'CompanyEmployee', path: '/company/employee/overview', component: CompanyEmployee },
        { name: 'CompanyCreditAllocation', path: '/company/employee/credit-allocation', component: CompanyCreditAllocation },
        { name: 'CompanyEmployeeDetails', path: '/company/employee/employee-details', component: CompanyEmployeeDetails, props: true },
        { name: 'CompanyRemoveEmployee', path: '/company/employee-details/remove-:name', component: CompanyRemoveEmployee, props: true },
        //acitivity
        { name: 'CompanyActivity', path: '/company/activity', component: CompanyActivity },
        //company claim
        { name: 'CompanyClaim', path: '/company/claim', component: CompanyClaim },
        //enrollment
        { name: 'CompanyCreateTeamBenefitsTier', path: '/company/create-team-benefits-tier', component: CompanyCreateTeamBenefitsTier },
        { name: 'CompanyEnrollment', path: '/company/enrollment', component: CompanyEnrollment },
        { name: 'CompanyEnrollmentOptions', path: '/company/enrollment-options', component: CompanyEnrollmentOptions },
        { name: 'CompanyWebInput', path: '/company/enrollment/web-input', component: CompanyWebInput },
        { name: 'CompanyExcel', path: '/company/enrollment/excel', component: CompanyExcel },
        { name: 'CompanyEnroll', path: '/company/enrollment/summary', component: CompanyEnroll, props: true },
        //company statement
        { name: 'CompanyStatement', path: '/company/statement', component: CompanyStatement },
        {
          name: 'CompanyAccount',
          path: '/company/account',
          component: CompanyAccount,
          redirect: '/company/account/account-payments',
          children: [
            {
              name: 'AccountCompany', path: '/company/account/company-contacts', components: { account: AccountCompany }
            },
            {
              name: 'AccountTransaction', path: '/company/account/transactions', components: { account: AccountTransaction }
            },
            {
              name: 'AccountDocument', path: '/company/account/document-center', components: { account: AccountDocument }
            },
            {
              name: 'AccountPayments', path: '/company/account/account-payments', components: { account: AccountPayments }
            },
            {
              name: 'AccountBenefits', path: '/company/account/team-benefits-tier', components: { account: AccountBenefits }
            },
          ]
        },
        {
          name: 'CompanyPlanCoverage',
          path: '/company/plan',
          redirect: '/company/plan-coverage',
          component: CompanyPlanCoverage,
          children: [
            { name: 'PlanBenefits', path: '/company/plan-coverage', components: { plan: PlanBenefits } },
            { name: 'PlanLocalNetwork', path: '/company/local-network-partners', components: { plan: PlanLocalNetwork } },
          ]
        },
        // { name: 'CompanyOverview', path: '/company/overview', component: CompanyOverview },

      ]
    },
    {
      path: '/clinic',
      name: 'clinic-dashboard',
      redirect: '/clinic/claim',
      component: ClinicDashboard,
      meta: { auth: true },
      children: [
        { name: 'clinicClaim', path: '/clinic/claim', component: ClinicClaim },
        { name: 'ClinicCalendar', path: '/clinic/calendar', component: ClinicCalendar },
        { name: 'clinicDashboardSummary', path: '/clinic/dashboard-summary', component: ClinicDashboardSummary },
        {
          name: 'clinicSettings', path: '/clinic/settings', component: ClinicSettings,
          redirect: '/clinic/settings/clinic-account',
          children: [
            {
              name: 'ClinicAccount', path: '/clinic/settings/clinic-account', components: { account: ClinicAccount }
            },
            {
              name: 'ClinicStaff', path: '/clinic/settings/clinic-staff', components: { account: ClinicStaff }
            },
            {
              name: 'ClinicServices', path: '/clinic/settings/clinic-services', components: { account: ClinicServices }
            },
            {
              name: 'ClinicProfile', path: '/clinic/settings/clinic-profile', components: { account: ClinicProfile },
              redirect: '/clinic/settings/profile/clinic-details',
              children: [
                {
                  name: 'ClinicDetails', path: '/clinic/settings/profile/clinic-details', components: { profile: ClinicDetails }
                },
                {
                  name: 'BusinessHours', path: '/clinic/settings/profile/business-hours', components: { profile: BusinessHours }
                },
                {
                  name: 'ProfilePassword', path: '/clinic/settings/profile/profile-password', components: { profile: ProfilePassword }
                },
                {
                  name: 'PaymentDetails', path: '/clinic/settings/profile/payment-details', components: { profile: PaymentDetails }
                },
                {
                  name: 'ProfileWidget', path: '/clinic/settings/profile/profile-widget', components: { profile: ProfileWidget }
                },
                {
                  name: 'QrCode', path: '/clinic/settings/profile/qr-code', components: { profile: QrCode }
                },
              ]
            },
            {
              name: 'ClinicTransactions', path: '/clinic/settings/clinic-transactions', components: { account: ClinicTransactions },
              redirect: '/clinic/settings/transactions/transaction-history',
              children: [
                {
                  name: 'TransactionHistory', path: '/clinic/settings/transactions/transaction-history', components: { transactions: TransactionHistory }
                },
                {
                  name: 'TransactionInvoice', path: '/clinic/settings/transactions/Transaction-invoice', components: { transactions: TransactionInvoice }
                },
                {
                  name: 'StatementAccount', path: '/clinic/settings/transactions/statement-account', components: { transactions: StatementAccount }
                },
              ]
            },
          ]
        }
      ]
    },
  ]
})
