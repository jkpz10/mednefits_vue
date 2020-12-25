<template>
  <div class="list-info-container">
    <div class="plan-transactions">
      <h3>Plan Transactions</h3>
      <table>
        <thead>
          <tr>
            <th>Transaction</th>
            <th>Date Issue</th>
            <th>Type</th>
            <th>Amount</th>
            <th colspan="2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="list in transactions">
            <td>{{ list.transaction }}</td>
            <td>{{ list.date_issue }}</td>
            <td>{{ list.type }}</td>
            <td class="amount-text">{{ list.amount }}</td>
            <td>
              <span v-if="list.paid == true">Paid</span>
              <span v-if="list.paid == false">Not Paid</span>
            </td>
            <td>
              <a v-if="list.type_invoice == 'employee'" class="edit-button-in-table anchor-btn" v-bind:href="list.link" target="_blank">Download</a>
              <a v-if="list.type_invoice == 'dependent'" class="edit-button-in-table anchor-btn" v-on:click="downDepedentInvoice(list.invoice_id)">Download</a>
              <a v-if="list.paid == true && list.type_invoice == 'employee'" class="edit-button-in-table anchor-btn" v-bind:href="list.receipt_link" target="_blank" >Receipt</a>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="pagination-plan-transactions-container">
        <div v-if="transactions_pagination.current_page != 1" class="arrows" v-on:click="transactionsNextPrev( false )">
          <i class="fa fa-caret-left"></i>
        </div>
        <div v-if="transactions_pagination.current_page == 1" class="arrows">
          <i></i>
        </div>
        <div class="page-status">
          <span>{{ transactions_pagination.from }}</span> -
          <span>{{ transactions_pagination.to }}</span> of
          <span>{{ transactions_pagination.total }}</span>
        </div>
        <div v-if="transactions_pagination.current_page == transactions_pagination.last_page" class="arrows">
          <i></i>
        </div>
        <div v-if="transactions_pagination.current_page != transactions_pagination.last_page" class="arrows" v-on:click="transactionsNextPrev( true )">
          <i class="fa fa-caret-right"></i>
        </div>
      </div>
    </div>

    <div class="benefits-spending-account-container">
      <h3>Benefits Spending Account Transactions</h3>
      <table>
        <thead>
          <tr>
            <th>Transaction</th>
            <th>Date Issue</th>
            <th>Type</th>
            <th>Amount</th>
            <th colspan="2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="list in benefits_spending_transactions">
            <td>{{ list.transaction }}</td>
            <td>{{ list.date_issue }}</td>
            <td>{{ list.type }}</td>
            <td class="amount-text">{{ list.amount }}</td>
            <td>
              <span v-if="list.paid == 1">Paid</span>
              <span v-if="list.paid == 0">Not Paid</span>
            </td>
            <td>
              <a class="edit-button-in-table anchor-btn" v-on:click="downloadSpendingInvoice(list)">Download</a>
              <a v-if="list.status == 1" class="edit-button-in-table anchor-btn" v-on:click="downloadSpendingReceipt(list)">Receipt</a>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="pagination-plan-transactions-container">
        <div v-if="benefits_spending_transactions_pagination.current_page != 1" class="arrows" v-on:click="benefitsSpendingTransactionsNextPrev( false )">
          <i class="fa fa-caret-left"></i>
        </div>
        <div v-if="benefits_spending_transactions_pagination.current_page == 1" class="arrows">
          <i></i>
        </div>
        <div class="page-status">
          <span>{{ benefits_spending_transactions_pagination.from }}</span> -
          <span>{{ benefits_spending_transactions_pagination.to }}</span> of
          <span>{{ benefits_spending_transactions_pagination.total }}</span>
        </div>
        <div v-if="benefits_spending_transactions_pagination.current_page == benefits_spending_transactions_pagination.last_page" class="arrows">
          <i></i>
        </div>
        <div v-if="benefits_spending_transactions_pagination.current_page != benefits_spending_transactions_pagination.last_page" class="arrows" v-on:click="benefitsSpendingTransactionsNextPrev( true )">
          <i class="fa fa-caret-right"></i>
        </div>
      </div>
    </div>

    <div class="spending-account-container">
      <h3>Spending Account Deposits</h3>

      <table>
        <thead>
          <tr>
            <th>Transaction</th>
            <th>Date Issue</th>
            <th>Type</th>
            <th>Amount</th>
            <th colspan="2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="list in spending_deposits">
            <td>{{ list.transaction }}</td>
            <td>{{ list.date_issue }}</td>
            <td>{{ list.type }}</td>
            <td class="amount-text">{{ list.amount }}</td>
            <td>
              <span v-if="list.status == true">Paid</span>
              <span v-if="list.status == false">Not Paid</span>
            </td>
            <td>
              <a class="edit-button-in-table anchor-btn" v-on:click="downloadSpendingDeposit(list.deposit_id)">Download</a>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="pagination-plan-transactions-container">
        <div v-if="spending_deposits_pagination.current_page != 1" class="arrows" v-on:click="spendingDepositsNextPrev( false )">
          <i class="fa fa-caret-left"></i>
        </div>
        <div v-if="spending_deposits_pagination.current_page == 1" class="arrows">
          <i></i>
        </div>
        <div class="page-status">
          <span>{{ spending_deposits_pagination.from }}</span> -
          <span>{{ spending_deposits_pagination.to }}</span> of
          <span>{{ spending_deposits_pagination.total }}</span>
        </div>
        <div v-if="spending_deposits_pagination.current_page == spending_deposits_pagination.last_page" class="arrows">
          <i></i>
        </div>
        <div v-if="spending_deposits_pagination.current_page != spending_deposits_pagination.last_page" class="arrows" v-on:click="spendingDepositsNextPrev( true )">
          <i class="fa fa-caret-right"></i>
        </div>
      </div>
    </div>

    <div class="refund-container">
      <h3>Refund</h3>
      <table>
        <thead>
          <tr>
            <th>Items</th>
            <th>Date Withdraw</th>
            <th>Amount</th>
            <th colspan="3">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="list in refunds">
            <td>
              Withdraw -
              <span>{{ list.total_employees }}</span> employee
            </td>
            <td>{{ list.date_withdraw }}</td>
            <td class="amount-text">{{ list.total_amount }}</td>
            <td>
              <span v-if="list.refund_data.status == 1">Refunded</span>
              <span v-if="list.refund_data.status == 0">Pending</span>
            </td>
            <td>
              <a class="edit-button-in-table anchor-btn" v-on:click="downloadRefund(list.payment_refund_id)">Download</a>
            </td>
            <td>
              <button class="edit-button-in-table" @click="companyContactsModal('refund', list)">View</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- <div class="pagination-plan-transactions-container">
        <div class="arrows">
          <i class="fa fa-caret-left"></i>
        </div>
        <div class="page-status">
          <span>1</span> of
          <span>1</span>
        </div>
        <div class="arrows">
          <i class="fa fa-caret-right"></i>
        </div>
      </div> -->
    </div>

    <!-- modals here -->
    <!-- Transactions -->
    <Modal v-if="modals.transactions.refund" class="edit-refund-modal">
      <div slot="header">
        <div class="refund-info-header">
          <h4>{{ refund_data.data[refund_active_emp_ctr].user.Name }}</h4>
          <br>
          <h6>{{ refund_data.company.company_name }}</h6>
        </div>
        <img @click="companyContactsModal('refund')" :src="'../assets/img/icons/close.svg'">
      </div>
      <div slot="body">
        <div class="employee-active-text">
          <div class="arrow-modal">
            <span v-if="(refund_active_emp_ctr+1) > 1" class="prev-next-arrows-modal" ng-click="empRefundPrevNext( false )"><i class="fa fa-caret-left"></i></span>
          </div>
          <span class="emp-count">
            EMPLOYEE
            <span>1</span> OF
            <span>1</span>
          </span>
          <div class="arrow-modal">
            <span v-if="(refund_active_emp_ctr+1) < refund_data.data.length" class="prev-next-arrows-modal" ng-click="empRefundPrevNext( true )"><i class="fa fa-caret-right"></i></span>
          </div>
        </div>
        <form>
          <div class="modal-input-wrapper">
            <label>First Name</label>
            <input type="text" v-model="refund_data.data[refund_active_emp_ctr].user.fname">
          </div>
          <div class="modal-input-wrapper">
            <label>Last Name</label>
            <input type="text" v-model="refund_data.data[refund_active_emp_ctr].user.lname">
          </div>
          <div class="modal-input-wrapper">
            <label>NRIC/FIN</label>
            <input type="text" v-model="refund_data.data[refund_active_emp_ctr].user.NRIC">
          </div>
          <div class="modal-input-wrapper">
            <label>Work Email</label>
            <input type="text" v-model="refund_data.data[refund_active_emp_ctr].user.Email">
          </div>
          <div class="modal-input-wrapper">
            <label>Mobile</label>
            <input type="text" v-model="refund_data.data[refund_active_emp_ctr].user.PhoneNo">
          </div>
          <div class="modal-input-wrapper">
            <label>Job Title</label>
            <select v-model="refund_data.data[refund_active_emp_ctr].user.Job_Title">
              <option>Marketing</option>
              <option v-for="list in job_list">{{ list.job_title }}</option>
            </select>
          </div>
        </form>
      </div>
    </Modal>
    <!-- End Transactions -->
  </div>
</template>

<script>
import Transaction from "@/components/company/account/transaction";

export default Transaction;
</script>

