<template>
  <div class="main-ui-container">
    <div v-if="$route.name != 'CompanyIntro'" class="top-navbar-wrapper">
      <div class="top-navbar">
        <router-link to="/company/dashboard" exact-active-class="router-active-disable">
          <img class="top-logo" :src="'../assets/img/mednefits_logo_v3_(white).png'">
        </router-link>

        <div class="need-help-wrapper">
          <a href="#" class="need-help-text-container">
            <h3 class="need-help-text">Need help?</h3>

            <div class="tooltip-container">
              <h3 class="tooltip-title">We're here to help.</h3>

              <div class="tooltip-phone-container">
                <h3 class="tooltip-phone-email-title">You may ring us</h3>

                <h3 class="tooltip-phone-email-details">+65 6254 7889</h3>

                <h3 class="tooltip-phone-email-details">Mon - Fri 10:00 to 19:00</h3>
              </div>

              <h3 class="tooltip-phone-email-title">Drop us a note, anytime</h3>

              <h3 class="tooltip-phone-email-details">happiness@mednefits.com</h3>
            </div>
          </a>
        </div>

        <div class="account-dropdown">
          <div class="account-img-container" ref="accountDropdownMenu">
            <a @click="dropdownClicked('account')">
              <img class="user-icon" :src="'../assets/img/user-nav.png'">

              <img class="arrow-down" :src="'../assets/img/icons/down-arrow.svg'">
            </a>
          </div>

          <div class="account-list-container" v-if="accountDropdown">
            <ul>
              <li>
                <router-link to="/company/account">
                  <h4>Account &amp; Billing</h4>
                </router-link>
              </li>

              <li>
                <router-link to="/company/plan-coverage">
                  <h4>Plan Coverage</h4>
                </router-link>
              </li>

              <li>
                <!-- <a href="/company-benefits-dashboard-logout">Log Out</a> -->

                <a id="logout-btn" v-on:click="logoutAccount()">Log Out</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="menu-bar-right">
          <button @click="btnNavbarCollapse()" class="menu-bar-wrapper">
            <div class="icon-bar"></div>
            <div class="icon-bar"></div>
            <div class="icon-bar"></div>
          </button>

          <div v-if="navbarCollapse" class="navbar-collapse">
            <ul>
              <li @click="btnHideNavbarCollapse()">
                <router-link to="/company/dashboard" >OVERVIEW</router-link>
              </li>
              <li  @click="btnHideNavbarCollapse()">
                <router-link to="/company/employee/overview">EMPLOYEE OVERVIEW</router-link>
              </li>
              <li  @click="btnHideNavbarCollapse()">
                <router-link to="/company/employee/credit-allocation">CREDIT ALLOCATION</router-link>
              </li>
              <li  @click="btnHideNavbarCollapse()">
                <router-link to="/company/activity">ACTIVITY</router-link>
              </li>
              <li  @click="btnHideNavbarCollapse()">
                <router-link to="/company/claim">CLAIM</router-link>
              </li>
              <li  @click="btnHideNavbarCollapse()">
                <router-link to="/company/statement">STATEMENT</router-link>
              </li>
              <li  @click="btnHideNavbarCollapse()">
                <router-link to="/company/account">ACCOUNT</router-link>
              </li>
              <li  @click="btnHideNavbarCollapse()">
                <router-link to="/company/plan-coverage">PLAN COVERAGE</router-link>
              </li>
              <li  @click="btnHideNavbarCollapse()">
                <router-link to="">LOG OUT</router-link>
              </li>
            </ul>
          </div>
        </div>

      </div>


      <div class="navbar-blue-bg main-navigation">
        <div class="container">
          <div
              v-if="$route.name != 'CompanyEnrollmentOptions' && $route.name != 'CompanyCreateTeamBenefitsTier' && $route.name != 'CompanyEnrollment' && $route.name != 'CompanyWebInput' && $route.name != 'CompanyExcel' && $route.name != 'CompanyEnroll'"
              class="dashboard-navbar-container"
            >
              <div class="welcome-container">
                <router-link to="/company/dashboard">
                  <h4>Overview</h4>
                </router-link>
              </div>

              <div class="welcome-container">
                <a
                  v-bind:class="{ 'router-active': (
                    $route.name == 'CompanyEmployee' || 
                    $route.name == 'CompanyEmployeeDetails' || 
                    $route.name == 'CompanyRemoveEmployee' || 
                    $route.name == 'CompanyCreditAllocation'
                  ) }"
                  ref="employeeDropdownMenu"
                >
                  <h4 @click="dropdownClicked('employee')">Employee</h4>
                </a>

                <ul v-show="isDropdown" class="dropdown-menu">
                  <li>
                    <router-link
                      v-bind:class="{ 'remove-active': ($route.name == 'CompanyEmployee') }"
                      to="/company/employee/overview"
                    >
                      <a>Overview</a>
                    </router-link>
                  </li>

                  <li>
                    <router-link
                      v-bind:class="{ 'remove-active': ($route.name == 'CompanyCreditAllocation') }"
                      to="/company/employee/credit-allocation"
                    >
                      <a>Credit Allocation</a>
                    </router-link>
                  </li>
                </ul>
              </div>

              <div class="welcome-container">
                <router-link to="/company/activity">
                  <h4>Activity</h4>
                </router-link>
              </div>

              <div class="welcome-container">
                <router-link to="/company/claim">
                  <h4>Claim</h4>
                </router-link>
              </div>

              <div class="welcome-container">
                <router-link to="/company/statement">
                  <h4>Statement</h4>
                </router-link>
              </div>

              <div class="welcome-container">
                <router-link to="/company/account">
                  <h4>Account</h4>
                </router-link>
              </div>
            </div>
          </div>
      </div>

      <div class="navbar-blue-bg">
        <div class="container">
          <div
            v-if=" $route.name === 'CompanyEnrollmentOptions' || $route.name === 'CompanyCreateTeamBenefitsTier' || $route.name === 'CompanyEnrollment' || $route.name === 'CompanyWebInput' || $route.name === 'CompanyExcel' || $route.name === 'CompanyEnroll'"
            class="enrollment-navbar-container welcome-container"
          >
            <h4
              v-if="$route.name === 'CompanyEnrollmentOptions' || $route.name === 'CompanyCreateTeamBenefitsTier' || $route.name === 'CompanyEnrollment' && isState === 'enrollment' || isState == 'enrollsum' && $route.name === 'CompanyEnroll'"
            >Enrollment</h4>

            <h4 v-if=" $route.name === 'CompanyWebInput'" class="web-input-title">WEB INPUT</h4>
            <h4
              class="excel-import-title"
              v-if=" $route.name === 'CompanyExcel' || $route.name === 'CompanyEnroll' && $route.name === 'CompanyExcel'"
            >EXCEL IMPORT</h4>
          </div>

          <div
            class="template-menu-accordion"
            v-if="$route.name === 'CompanyExcel' || $route.name === 'CompanyEnroll' && stepStatus === 4"
          >
            <div class="menu-accordion-list">
              <span
                class="number"
                :class="{'step' : stepStatus >= 1, 'done-step': stepStatus > 1}"
              >1</span>
              <span class="menu-accordion-label" :class="{'step' : stepStatus >= 1}">Download</span>
            </div>
            <div class="menu-accordion-list">
              <span
                class="number"
                :class="{'step' : stepStatus >= 2, 'done-step': stepStatus > 2}"
              >2</span>
              <span class="menu-accordion-label" :class="{'step' : stepStatus >= 2}">Prepare</span>
            </div>
            <div class="menu-accordion-list">
              <span
                class="number"
                :class="{'step' : stepStatus >= 3, 'done-step': stepStatus > 3}"
              >3</span>
              <span class="menu-accordion-label" :class="{'step' : stepStatus >= 3}">Upload</span>
            </div>
            <div class="menu-accordion-list">
              <span
                class="number"
                :class="{'step' : stepStatus >= 4, 'done-step': stepStatus > 4}"
              >4</span>
              <span class="menu-accordion-label" :class="{'step' : stepStatus >= 4}">Preview</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="$route.name === 'CompanyIntro'" class="welcome-top-navbar-wrapper">
      <div class="top-navbar">
        <img class="top-logo" :src="'../assets/img/mednefits_logo_v3_(white).png'">
        
        <div class="need-help-wrapper">
          <a href="#" class="need-help-text-container">
            <h3 class="need-help-text">Need help?</h3>

            <div class="tooltip-container">
              <h3 class="tooltip-title">We're here to help.</h3>

              <div class="tooltip-phone-container">
                <h3 class="tooltip-phone-email-title">You may ring us</h3>

                <h3 class="tooltip-phone-email-details">+65 6254 7889</h3>

                <h3 class="tooltip-phone-email-details">Mon - Fri 10:00 to 19:00</h3>
              </div>

              <h3 class="tooltip-phone-email-title">Drop us a note, anytime</h3>

              <h3 class="tooltip-phone-email-details">happiness@mednefits.com</h3>
            </div>
          </a>
        </div>

        <div
          v-if="$route.name === 'CompanyEnrollment' && isState === 'enrollment' || isState === 'web' "
          class="account-dropdown"
        >
          <div class="account-img-container">
            <img class="user-icon" :src="'../assets/img/user-nav.png'">

            <img class="arrow-down" :src="'../assets/img/icons/down-arrow.svg'">
          </div>

          <div class="account-list-container">
            <ul>
              <li>
                <a href="#">Account &amp; Billing</a>
              </li>

              <li>
                <a href>Plan Coverage</a>
              </li>

              <li>
                <!-- <a href="/company-benefits-dashboard-logout">Log Out</a> -->

                <a href id="logout-btn">Log Out</a>
              </li>
            </ul>
          </div>
        </div>

      </div>

      <div class="navbar-blue-bg">
        <div class="container">
          <div class="welcome-container">
            <h4 v-if="$route.name === 'CompanyIntro'">Welcome</h4>
          </div>
        </div>
      </div>
    </div>

    <!-- v-on:emitName="methodName" holds data from imported component -->
    <div class="child-content">
      <router-view v-on:overviewData="overviewData" @excelData="excelData" @enrollData="enrollData" @webInputData='webInputData'></router-view>
    </div>
    <!--    -->
    <div v-if="showLoader" class="main-body-loader">
      <div class="loader">
        <!-- <img :src="'../assets/img/mednefits_icon_blue.png'" style="  width: 25px;margin-top: 20px;"> -->
      </div>
    </div>
    <!--   -->
    <div v-if="isFloatingBox" class="floating-blue-box">
      <div class="receipt-download" style="display: none;">
        <p><i class="fa fa-circle-o-notch fa-spin"></i> Downloading <span id="receipt_count">1</span> of <span id="receipt_total">1</span> receipts.</p>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import dashboard from "@/components/company/dashboard";

export default dashboard;
</script>

