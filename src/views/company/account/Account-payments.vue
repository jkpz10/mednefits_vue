<template>
  <div class="list-info-container">
    <h3>Plan Subscription</h3>
    <table>
      <tbody>
        <tr>
          <td>
            <h5>Plan</h5>
            <span>{{ billingsList.plan_type }}</span>
          </td>
          <td>
            <h5>Start Date</h5>
            <span>{{ planSubscriptions.start_date }}</span>
          </td>
          <td>
            <h5>End Date</h5>
            <span>{{ planSubscriptions.end_date }}</span>
          </td>
          <td>
            <h5>Days to Expiry</h5>
            <span>{{ planSubscriptions.plan_days_to_expire }}</span>
          </td>
          <td>
            <h5>Employees</h5>
            <span>{{ planSubscriptions.employees }}</span>
          </td>
          <td class="txt-left-imp">
            <h5>Dependents</h5>
            <span>{{ planSubscriptions.dependents }}</span>
          </td>
        </tr>
      </tbody>
    </table>

    <table>
      <thead>
        <tr>
          <th>Account</th>
          <th></th>
        </tr>
      </thead>
      <tbody class="account-and-payment-table-tbody">
        <tr>
          <td>Update Password</td>
          <td class="account-payment-btn-container">
            <button class="edit-button-in-table" @click="companyContactsModal('password', companyContactsData)">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>

    <h3 class="current-active-title">Current Active Plans:</h3>

    <div v-for="(list, index) in companyActivePlans" class="active-plan-container" >
      <div class="active-plan-text-container">
        <label>
          Active Plan #
          <span>{{ index + 1 }}</span>
        </label>
      </div>
      <div class="active-plan-text-container">
        <label>
          Active Plan ID #
          <span>{{ list.customer_active_plan_id }}</span>
        </label>
      </div>
      <div class="active-plan-wrapper">
        <div class="account-title">
          <span>Employee Account</span>
        </div>
        <div class="account-container">
          <label>Plan Type:</label>
          <span v-if="list.account_type == 'insurance_bundle'">Insurance Bundle</span>
          <span v-if="list.account_type == 'stand_alone_plan'">Standalone Plan</span>
          <span v-if="list.account_type == 'lite_plan'">Lite Plan</span>
          <span v-if="list.account_type == 'trial_plan'">Trial Plan</span>
        </div>
        <div class="account-container">
          <label>Start Date:</label>
          <span>{{ list.plan_start }}</span>
        </div>
        <div class="account-container">
          <label>Plan Duration:</label>
          <span>{{ list.duration }}</span>
        </div>
        <div class="account-container">
          <label>Total Seats:</label>
          <span>{{ list.employees }}</span>
        </div>
        <div class="account-container">
          <label>Occupied Seats:</label>
          <span>{{ list.occupied }}</span>
        </div>
        <div class="account-container">
          <label>Vacant Seats:</label>
          <span>{{ list.vacant }}</span>
        </div>
        <div class="account-container">
          <label>Plan Amount:</label>
          <span>
            S$
            <span>{{ list.plan_amount }}</span>
          </span>
        </div>
        <div class="account-container">
          <label>Payment Status:</label>
          <span ng-if="list.paid == 'true'">PAID</span>
          <span ng-if="list.paid == 'false'">PENDING</span>
        </div>
      </div>
      <div v-if="list.dependents.length > 0" class="active-plan-wrapper dependent-account-list-container">
        <div class="account-title">
          <span>Dependent Account</span>
        </div>
        <div v-for="dep in list.dependents" class="dependent-account-info">
          <div class="account-container">
            <label>Plan Account Type:</label>
            <span v-if="dep.account_type == 'insurance_bundle'">Insurance Bundle</span>
            <span v-if="dep.account_type == 'stand_alone_plan'">Standalone Plan</span>
            <span v-if="dep.account_type == 'lite_plan'">Lite Plan</span>
            <span v-if="dep.account_type == 'trial_plan'">Trial Plan</span>
          </div>
          <div class="account-container">
            <label>Start Date:</label>
            <span>{{ dep.plan_start }}</span>
          </div>
          <div class="account-container">
            <label>Plan Duration:</label>
            <span>{{ dep.duration }}</span>
          </div>
          <div class="account-container">
            <label>Total Seats:</label>
            <span>{{ dep.employees }}</span>
          </div>
          <div class="account-container">
            <label>Occupied Seats:</label>
            <span>{{ dep.occupied }}</span>
          </div>
          <div class="account-container">
            <label>Vacant Seats:</label>
            <span>{{ dep.vacant }}</span>
          </div>
          <div class="account-container">
            <label>Plan Amount:</label>
            <span>
              S$
              <span>{{ dep.plan_amount }}</span>
            </span>
          </div>
          <div class="account-container">
            <label>Payment Status:</label>
            <span ng-if="dep.paid == 'true'">PAID</span>
            <span ng-if="dep.paid == 'false'">PENDING</span>
          </div>
        </div>
      </div>
      <div v-if="list.plan_extension" class="extension-plan-wrapper">
        <div class="account-title">
          <span>Plan Extension</span>
        </div>
        <div class="account-container">
          <label>Plan Type:</label>
          <span v-if="list.plan_extension.account_type == 'insurance_bundle'">Insurance Bundle</span>
          <span v-if="list.plan_extension.account_type == 'stand_alone_plan'">Standalone Plan</span>
          <span v-if="list.plan_extension.account_type == 'lite_plan'">Lite Plan</span>
          <span v-if="list.plan_extension.account_type == 'trial_plan'">Trial Plan</span>
        </div>
        <div class="account-container">
          <label>Start Date:</label>
          <span>{{ list.plan_extension.plan_start }}</span>
        </div>
        <div class="account-container">
          <label>Plan Duration:</label>
          <span>{{ list.plan_extension.duration }}</span>
        </div>
        <div class="account-container">
          <label>Total Seats:</label>
          <span>{{ list.plan_extension.employees }}</span>
        </div>
        <div class="account-container">
          <label>Occupied Seats:</label>
          <span>{{ list.plan_extension.occupied }}</span>
        </div>
        <div class="account-container">
          <label>Vacant Seats:</label>
          <span>{{ list.plan_extension.vacant }}</span>
        </div>
        <div class="account-container">
          <label>Plan Amount:</label>
          <span>
            S$
            <span>{{ list.plan_extension.plan_amount }}</span>
          </span>
        </div>
        <div class="account-container">
          <label>Payment Status:</label>
          <span ng-if="list.plan_extension.paid == 'true'">PAID</span>
          <span ng-if="list.plan_extension.paid == 'false'">PENDING</span>
        </div>
      </div>
      <div class="medical-wellness-account-container">
        <div class="active-plan-wrapper">
          <div class="account-title">
            <span>Medical Spending Account:</span>
          </div>
          <div class="account-container">
            <label>Total:</label>
            <span>
              S$
              <span>10,000.00</span>
            </span>
          </div>
          <div class="account-container">
            <label>Unallocated:</label>
            <span>
              S$
              <span>0.00</span>
            </span>
          </div>
        </div>

        <div class="active-plan-wrapper">
          <div class="account-title">
            <span>Wellness Spending Account:</span>
          </div>
          <div class="account-container">
            <label>Total:</label>
            <span>
              S$
              <span>20,000.00</span>
            </span>
          </div>
          <div class="account-container">
            <label>Unallocated:</label>
            <span>
              S$
              <span>0.00</span>
            </span>
          </div>
        </div>
      </div>
      <div class="btn-view-plan-container">
        <button class="btn-view-plan" @click="companyContactsModal('active_plans', list)">View Plan</button>
      </div>
    </div>


    <!-- modals here -->
    <!-- Account & Payment -->
    <Modal v-if="modals.account.password" class="update-password-modal">
      <div slot="header">
        <h4>Update Account</h4>
        <img @click="companyContactsModal('password')" :src="'../assets/img/icons/close.svg'">
      </div>
      <div slot="body">
        <form>
          <div class="form-group">
            <label>Current Password</label>
            <input type="password" v-model="update_password_data.current_password">
          </div>
          <div class="form-group">
            <label>New Password</label>
            <input type="password" v-model="update_password_data.new_password">
          </div>
          <div class="form-group">
            <label>Re-type Password</label>
            <input type="password" v-model="update_password_data.retype_password">
          </div>
        </form>
      </div>
      <div slot="footer">
        <button @click="companyContactsModal('password')">CANCEL</button>
        <button v-on:click="updatePassword( update_password_data )">UPDATE</button>
      </div>
    </Modal>
    <Modal v-if="modals.account.active_plans" class="active-plan-modal">
      <div slot="header">
        <h4>Active Plan Details</h4>
        <img @click="companyContactsModal('active_plans')" :src="'../assets/img/icons/close.svg'">
      </div>
      <div slot="body">
        <div class="transactions-container">
          <div class="modal-title-header transactions-title-header">
            <span>Transactions</span>
          </div>
          <div class="modal-body-info transactions-body-info">
            <div class="col-1-body-info">
              <div>
                Plan Account Type:
                <span v-if="selected_modal_data.active_plan.account_type == 'stand_alone_plan'">Standalone Plan</span>
                <span v-if="selected_modal_data.active_plan.account_type == 'insurance_bundle'">Insurance Bundle</span>
                <span v-if="selected_modal_data.active_plan.account_type == 'lite_plan'">Lite Plan</span>
                <span v-if="selected_modal_data.active_plan.account_type == 'trial_plan'">Trial Plan</span>
              </div>
              <div>
                Invoice:
                <span>{{ selected_modal_data.invoice.invoice_number }}</span>
              </div>
              <div>
                Plan Duration:
                <span>{{ selected_modal_data.active_plan.duration }}</span>
              </div>
              <div>
                Employees:
                <span>{{ selected_modal_data.active_plan.employees }}</span>
              </div>
              <div>
                Plan Amount: S$
                <span>{{ selected_modal_data.active_plan.plan_amount }}</span>
              </div>
              <div>
                Payment Status:
                <span v-if="selected_modal_data.active_plan.paid == 'true'">PAID</span>
                <span v-if="selected_modal_data.active_plan.paid == 'false'">PENDING</span>
              </div>
            </div>
            <div class="col-2-body-info">
              <button class="btn-trans-dl-incove" v-on:click="activePlanDownloadInvoice( selected_modal_data.invoice.corporate_invoice_id )">DOWNLOAD INVOICE</button>
              <button class="btn-trans-pending-enrollment" v-on:click="goToEmpOverview()">
                <span>{{ selected_modal_data.active_plan.pending_enrollment }}</span> PENDING ENROLLMENT
              </button>
              <button class="btn-trans-download-receipt" v-on:click="activePlanDownloadReceipt( selected_modal_data.invoice.corporate_invoice_id )">DOWNLOAD RECEIPT</button>
            </div>
          </div>
        </div>
        <div v-if="selected_modal_data.dependents.length > 0" class="dependent-plans-container">
          <div class="modal-title-header dependent-title-header">
            <span>Dependent Plans</span>
          </div>
          <div v-for="list in selected_modal_data.dependents" class="modal-body-info dependent-body-info">
            <div class="col-1-body-info">
              <div>
                Dependent Plan Account Type:
                <span v-if="list.account_type == 'stand_alone_plan'">Standalone Plan</span>
                <span v-if="list.account_type == 'insurance_bundle'">Insurance Bundle</span>
                <span v-if="list.account_type == 'lite_plan'">Lite Plan</span>
                <span v-if="list.account_type == 'trial_plan'">Trial Plan</span>
              </div>
              <div>
                Active Plan Type:
                <span v-if="list.type == 'active_plan'">Active Plan</span>
                <span v-if="list.type == 'extension_plan'">Plan Extension</span>
              </div>
              <div>
                Plan Duration:
                <span>{{ list.duration }}</span>
              </div>
              <div>
                Total Seats:
                <span>{{ list.total_dependents }}</span>
              </div>
              <div>
                Occupied Seats:
                <span>{{ list.occupied }}</span>
              </div>
              <div>
                Vacant Seats:
                <span>{{ list.vacant }}</span>
              </div>
              <div>
                Plan Amount: S$
                <span>{{ list.total_amount }}</span>
              </div>
              <div>
                Payment Status:
                <span v-if="list.payment_status == true">PAID</span>
                <span v-if="list.payment_status == false">PENDING</span>
              </div>
            </div>
            <div class="col-2-body-info">
              <button class="btn-trans-dl-incove" v-on:click="dependentPlanDownloadInvoice( list )">DOWNLOAD INVOICE</button>
              <button class="btn-trans-pending-enrollment" v-on:click="goToEmpOverview()">
                <span>{{ list.vacant }}</span> PENDING ENROLLMENT
              </button>
              <!-- <button class="btn-trans-download-receipt">DOWNLOAD RECEIPT</button> -->
            </div>
          </div>
        </div>
        <div v-if="selected_modal_data.extension"  class="plan-extension-container">
          <div class="modal-title-header plan-extension-title-header">
            <span>Plan Extension</span>
          </div>
          <div class="modal-body-info plan-extension-body-info">
            <div class="col-1-body-info">
              <div>
                Plan Account Type:
                <span v-if="selected_modal_data.extension.account_type == 'stand_alone_plan'">Standalone Plan</span>
                <span v-if="selected_modal_data.extension.account_type == 'insurance_bundle'">Insurance Bundle</span>
                <span v-if="selected_modal_data.extension.account_type == 'lite_plan'">Lite Plan</span>
                <span v-if="selected_modal_data.extension.account_type == 'trial_plan'">Trial Plan</span>
              </div>
              <div>
                Invoice:
                <span>{{ selected_modal_data.extension.invoice.invoice_number }}</span>
              </div>
              <div>
                Plan Duration:
                <span>{{ selected_modal_data.extension.duration }}</span>
              </div>
              <div>
                Employees:
                <span>{{ selected_modal_data.extension.employees }}</span>
              </div>
              <div>
                Plan Amount: S$
                <span>{{ selected_modal_data.extension.plan_amount }}</span>
              </div>
              <div>
                Payment Status:
                <span v-if="selected_modal_data.extension.paid == 'true'">PAID</span>
                <span v-if="selected_modal_data.extension.paid == 'false'">PENDING</span>
              </div>
            </div>
            <!-- <div class="col-2-body-info">
              <button class="btn-trans-dl-incove">DOWNLOAD INVOICE</button>
            </div> -->
          </div>
        </div>
        <div v-if="selected_modal_data.deposits.length > 0" class="spending-account-container">
          <div class="modal-title-header spending-account-title-header">
            <span>Spending Account</span>
          </div>
          <div v-for="list in selected_modal_data.deposits" class="modal-body-info spending-account-body-info">
            <div class="col-1-body-info">
              <div>
                Invoce:
                <span>DEP000002</span>
              </div>
              <div>
                Total Credits: S$
                <span>1,000.00</span>
              </div>
              <div>(Wellness)</div>
              <div>
                Deposit: S$
                <span>50.00</span>
              </div>
              <div>
                Payment Status:
                <span>PENDING</span>
              </div>
            </div>
            <div class="col-2-body-info">
              <button class="btn-trans-dl-incove" v-on:click="downloadSpendingDeposit( list )">DOWNLOAD INVOICE</button>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <button @click="companyContactsModal('active_plans')">CLOSE</button>
      </div>
    </Modal>
  </div>
</template>

<script>
import AccountPayments from "@/components/company/account/account-payments";

export default AccountPayments;
</script>

