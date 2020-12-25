<template>
  <div class="list-info-container">
    <div class="business-info">
      <h3 class="business-info-title">Business Information</h3>
      <table>
        <tbody>
          <tr>
            <td colspan="2">
              <h4>Company Name</h4>
              <span>{{ companyContactsData.business_information.company_name }}</span>
            </td>
          </tr>

          <tr>
            <td>
              <h4>Company Address</h4>
              <h6>{{ companyContactsData.business_information.company_address }}</h6>
            </td>

            <td class="edit-container">
              <button
                class="edit-button-in-table"
                @click="companyContactsModal('business_info', companyContactsData.business_information)"
              >Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="business-contact">
      <h3>Business Contact</h3>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email Address</th>
            <th colspan="2">Phone</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ companyContactsData.business_contact.first_name }}</td>
            <td>{{ companyContactsData.business_contact.last_name }}</td>
            <td>{{ companyContactsData.business_contact.work_email }}</td>
            <td>{{ companyContactsData.business_contact.phone }}</td>
            <td>
              <button
                class="edit-button-in-table"
                @click="companyContactsModal('business_contact', companyContactsData.business_contact)"
              >Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="billing-contact-address">
      <h3>Billing Contact & Address</h3>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th colspan="2">Email Address</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ companyContactsData.billing_contact.first_name }}</td>
            <td>{{ companyContactsData.billing_contact.last_name }}</td>
            <td>{{ companyContactsData.billing_contact.work_email }}</td>
            <td>
              <button
                class="edit-button-in-table"
                @click="companyContactsModal('Billing_contacts', companyContactsData.billing_contact)"
              >Edit</button>
            </td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Billing Address</th>
            <th colspan="2">Payment Method</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ companyContactsData.business_information.company_name }}</td>
            <td class="biliing-address-text">
              <span>{{ companyContactsData.billing_contact.billing_address }}</span>
            </td>
            <td>
              <span v-if="companyContactsData.payment_method.cheque == 'true'">Cheque</span> 
              <span v-if="companyContactsData.payment_method.credit_card == 'true'">Credit Card</span> 
            </td>
            <td>
              <button
                class="edit-button-in-table"
                @click="companyContactsModal('Billing_address', companyContactsData.payment_method)"
              >Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- modals here -->
    <!-- Company -->
    <Modal v-if="modals.company.business_info" class="edit-business-info-modal">
      <div slot="header">
        <h4>Edit Business Information</h4>
        <img @click="companyContactsModal('business_info')" :src="'../assets/img/icons/close.svg'">
      </div>
      <div slot="body">
        <form>
          <div class="form-group">
            <label>Company Address</label>
            <textarea v-model="selected_modal_data.company_address"></textarea>
          </div>
          <div class="form-group">
            <label>Postal Code</label>
            <input type="text" v-model="selected_modal_data.postal_code">
          </div>
        </form>
      </div>
      <div slot="footer">
        <button @click="companyContactsModal('business_info')">CANCEL</button>
        <button v-on:click="updateBusinessInfo( selected_modal_data )">UPDATE</button>
      </div>
    </Modal>
    <Modal v-if="modals.company.business_contact">
      <div slot="header">
        <h4>Edit Business Contact</h4>
        <img
          @click="companyContactsModal('business_contact')"
          :src="'../assets/img/icons/close.svg'"
        >
      </div>
      <div slot="body">
        <form>
          <div class="modal-input-wrapper">
            <label>First Name</label>
            <input type="text" v-model="selected_modal_data.first_name">
          </div>
          <div class="modal-input-wrapper">
            <label>Last Name</label>
            <input type="text" v-model="selected_modal_data.last_name">
          </div>
          <div class="modal-input-wrapper">
            <label>Email Address</label>
            <input type="text" v-model="selected_modal_data.work_email">
          </div>
          <div class="modal-input-wrapper">
            <label>Mobile</label>
            <input type="text" v-model="selected_modal_data.phone">
          </div>
          <div class="modal-input-wrapper">
            <label>Job Title</label>
            <select v-model="selected_modal_data.job_title">
              <option>Marketing</option>
              <option>Accounting, Audit, Finance</option>
              <option>Administration Support</option>
              <option>Arts/Culture/Heritage</option>
              <option>Building and Estate Management</option>
              <option>Corporate Strategy/Top Management</option>
            </select>
          </div>
        </form>
      </div>
      <div slot="footer">
        <button @click="companyContactsModal('business_contact')">CANCEL</button>
        <button v-on:click="updateBusinessContact( selected_modal_data )">UPDATE</button>
      </div>
    </Modal>
    <Modal v-if="modals.company.Billing_contacts">
      <div slot="header">
        <h4>Edit Billing Contact & Address</h4>
        <img
          @click="companyContactsModal('Billing_contacts')"
          :src="'../assets/img/icons/close.svg'"
        >
      </div>
      <div slot="body">
        <form>
          <div class="modal-input-wrapper">
            <label>First Name</label>
            <input type="text" v-model="selected_modal_data.first_name">
          </div>
          <div class="modal-input-wrapper">
            <label>Last Name</label>
            <input type="text" v-model="selected_modal_data.last_name">
          </div>
          <div class="modal-input-wrapper">
            <label>Email Address</label>
            <input type="text" v-model="selected_modal_data.work_email">
          </div>
        </form>
      </div>
      <div slot="footer">
        <button @click="companyContactsModal('Billing_contacts')">CANCEL</button>
        <button v-on:click="updateBillingContact( selected_modal_data )">UPDATE</button>
      </div>
    </Modal>
    <Modal v-if="modals.company.Billing_address">
      <div slot="header">
        <h4>Edit Billing Contact & Address</h4>
        <img
          @click="companyContactsModal('Billing_address')"
          :src="'../assets/img/icons/close.svg'"
        >
      </div>
      <div slot="body">
        <form>
          <div class="modal-input-wrapper">
            <label>Company Name</label>
            <input type="text" v-model="selected_modal_data.business_information.company_name">
          </div>
          <div class="modal-input-wrapper">
            <label>Billing Address</label>
            <input type="text" v-model="selected_modal_data.billing_contact.billing_address">
          </div>
          <div class="modal-input-wrapper">
            <label>Postal Code</label>
            <input type="number" v-model="selected_modal_data.billing_contact.postal">
          </div>
        </form>
      </div>
      <div slot="footer">
        <button @click="companyContactsModal('Billing_address')">CANCEL</button>
        <button v-on:click="updateBillingAddress( selected_modal_data )">UPDATE</button>
      </div>
    </Modal>
    <!-- end Company -->
  </div>
</template>

<script>
import AccountCompany from "@/components/company/account/company-contacts";

export default AccountCompany;
</script>

