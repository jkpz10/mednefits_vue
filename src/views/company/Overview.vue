<template>
  <div class="overview-body-container">
    <div class="container">
      <div class="hrdb-body-box">
       

        <div class="mednefits-blue-box">
          <div class="mednefits-body-box">
            <img :src="'../assets/img/overview.png'">
            <h2>
              <span v-if="isMorning">Good morning,</span>
              <span v-if="isAfternoon">Good afternoon,</span>
              <span v-if="isEvening">Good evening,</span>
              <span> {{intro.contact_name}}</span>
            </h2>
            <h5 class="text-center text-white body-subtext">
              <strong>{{intro.company_name}}</strong> is covering
              <strong v-if="intro.dependents">
                <span>{{intro.total_enrolled}}</span> employees &amp; dependents
              </strong>
              <strong v-if="!intro.dependents">
                <span>{{intro.total_enrolled}}</span> employees &amp; dependents
              </strong> from
              <strong>{{intro.plan_start}}</strong> and ends on
              <strong>{{intro.plan_end}}</strong>
            </h5>
            <!-- <router-link to="/company/enrollment-options"> -->
            <button class="btn-info" @click="toEnrollment('enrollment')">Employee Enrollment</button>
            <!-- </router-link> -->
          </div>
        </div>

        <div class="column-2">
          <div class="company-credits-container mednefits-box">
            <div class="mednefits-header-box">
              <h5>Total Company Credits</h5>
            </div>
            <div class="home-spending-type-container">
              <p>Spending Account</p>
              <button @click="spendType(0, 'medical')" v-bind:class="{'active': spendingType.value === 0}" class="btn-spending-type btn-medical">Medical</button>
              <button @click="spendType(1, 'wellness')" v-bind:class="{'active': spendingType.value === 1}" class="btn-spending-type btn-wellness">Wellness</button>
            </div>
            <div class="credit-box">
              <div class="credit-allocated-container">
                <h1>
                  S$
                  <span v-if="spendingType.value === 0">{{credits.total_medical_employee_allocated | currency('')}}</span>
                  <span v-if="spendingType.value === 1">{{credits.total_wellness_employee_allocated | currency('')}}</span>
                </h1>
                <span class="credit-text">ALLOCATED</span>
              </div>
              <div class="credit-spent-container">
                <h1>
                  S$
                  <span v-if="spendingType.value === 0">{{credits.total_medical_employee_spent | currency('')}}</span>
                  <span v-if="spendingType.value === 1">{{credits.total_wellness_employee_spent | currency('')}}</span>
                </h1>
                <span class="credit-text">SPENT</span>
              </div>
            </div>
          </div>
          <div class="employee-enrollment-box mednefits-box">
            <div class="mednefits-header-box">
              <h5>Employee Enrollment Status</h5>
            </div>
            <div class="mednefits-body-box">
              <div>
                <h3 class="enrollment-status-number">{{progress.employees.total_employees}}</h3>
                <h3 class="enrollment-status-text">Total number of seats</h3>
              </div>
              <div>
                <h3 class="enrollment-status-number">{{progress.employees.completed}}</h3>
                <h3 class="enrollment-status-text">Occupied seats</h3>
              </div>
              <div>
                <h3 class="enrollment-status-number">{{progress.employees.in_progress}}</h3>
                <h3 class="enrollment-status-text">Vacant seats</h3>
              </div>
            </div>
          </div>
          <div class="dependent-enrollment-box mednefits-box" v-if="progress.dependents.status">
            <div class="mednefits-header-box">
              <h5>Dependent Enrollment Status</h5>
            </div>
            <div class="mednefits-body-box">
              <div>
                <h3 class="enrollment-status-number">{{progress.dependents.total_number_of_seats}}</h3>
                <h3 class="enrollment-status-text">Total number of seats</h3>
              </div>
              <div>
                <h3 class="enrollment-status-number">{{progress.dependents.occupied_seats}}</h3>
                <h3 class="enrollment-status-text">Occupied seats</h3>
              </div>
              <div>
                <h3 class="enrollment-status-number">{{progress.dependents.vacant_seats}}</h3>
                <h3 class="enrollment-status-text">Vacant seats</h3>
              </div>
            </div>
          </div>
        </div>

        <div class="row-3">
          <div class="task-box">
            <div class="task-box-title">
              <h4>TASK</h4>
            </div>
            <div v-for="list in task_lists" :key="list.index"> <!-- v-for dri -->
              <div class="task-box-list mednefits-box" v-if="list.type == 'pending_activation'">
                <div class="task-box-details">
                  <h5 class="task-info">
                    Payment for Plan Subscription is due on <span>{{list.invoice_due}}</span>. Please kindly make payment as soon as possible, Thank you.
                  </h5>
                </div>
              </div>
              <div class="task-box-list mednefits-box" v-if="list.type == 'pending_enrollment' && list.total_employees > 0">
                <div class="task-box-details">
                  <h5 class="task-info">
                    <span>{{list.total_employees}}</span> employees have yet to enroll into the company benefits plan. 
                    <!-- <router-link to="/company/enrollment-options"> -->
                    <a v-on:click="toEnrollment('enrollment')">
                      Enroll them now.
                    </a> 
                    <!-- </router-link> -->
                  </h5>
                </div>
              </div>
              <div class="task-box-list mednefits-box" v-if="list.type == 'pending_enrollment_dependent' && list.total_employees > 0">
                <div class="task-box-details">
                  <h5 class="task-info">
                    <span>{{list.total_employees}}</span> dependents have yet to enroll into the company benefits plan.
                  </h5>
                </div>
              </div>
              <div class="task-box-list mednefits-box" v-if="list.type == 'vacant_seat'">
                <div class="task-box-details">
                  <h5 class="task-info">
                    	Schedule for Vacant Seat Enrollment for <span v-if="list.user_type == 'employee'">Employee</span> <span v-if="list.user_type == 'dependent'">Dependent</span> is <span>{{list.date_of_enrollment}}</span>. <a v-on:click="goToNewEmployee( list )">Enroll the new Employee</a> that will occupy this seat now.
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div class="billing-status-box-container">
            <div class="billing-status-title">
              <h4>BILLING STATUS</h4>
            </div>
            <div class="billing-status-box mednefits-box">
              <div class="plan-subscription-container">
                <h5>Plan Subscription</h5>
                <h6 class="subscription-current-balance">Current balance due</h6>
                <h4 class="subscription-price">
                  S$
                  <span>{{ billing_status.total_plan_due | currency('') }}</span>
                </h4>
              </div>
              <div class="health-spending-accounts-container">
                <h5>Health Spending Accounts</h5>
                <h6 class="subscription-current-balance">Current balance due</h6>
                <h4 class="subscription-price">
                  S$
                  <span>{{billing_status.total_spending.spending_total_due | currency('')}}</span>
                </h4>
                <h6 class="subscription-date" v-if="billing_status.total_spending.due_date">
                  Due by
                  <span>{{billing_status.total_spending.due_date}}</span>
                </h6>
              </div>
              <div class="view-invoice-button">
                <router-link to='/company/account/transactions'>
                  <button>VIEW INVOICE</button>
                </router-link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import overview from "@/components/company/overview";

export default overview;
</script>

