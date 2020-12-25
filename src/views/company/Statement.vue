<template>
  <div class="statement-wrapper">

  	<div class="container">
  		<div class="statement-container">
  			<div>
  				<span class="timeframe-title">Select a timeframe</span>
  				<span class="year-selector"><a @click="showCustomDate(0, 'this-year')" v-bind:class="{'active': year_active.value === 0}">This year</a></span>
  				<span class="year-selector"><a @click="showCustomDate(1, 'last-year')" v-bind:class="{'active': year_active.value === 1}">Last year</a></span>
  				<span class="year-selector"><a @click="showCustomDate(2, 'custom')" v-bind:class="{'active': year_active.value === 2}">Custom</a></span>
  			</div>

        <div v-if="showRangeMonthSlider" class="claim-slider-container">
					<vue-slider 
            class="range-slider" 
            v-model="range_values" 
            :marks="range_marks" 
            :enableCross="true" 
            :tooltip="'none'" 
            :min="1" 
            :max="12" 
            :process="false" 
            @drag-start="() => inDragging = true" 
            @drag-end="() => inDragging = false" 
            @change="() => isFromSlider = true"
            :dragEnd="sliderDragged( range_values )"
          ></vue-slider>

          <div id="date-responsive" class="date-selection-container">
            <div class="custom-date-selector">
              <i class="fa fa-calendar"></i>
              <v-date-picker 
                mode='single' 
                popoverDirection="bottom" 
                :formats="formats"
                v-model='start_date' 
                :input-props='{class: "activity-custom-input", placeholder: "MM/DD/YYYY", readonly: true}'
                popover-visibility='focus'
              >
              </v-date-picker>
              <i class="fa fa-caret-down"></i>
            </div>

            <span><i class="fa fa-arrow-right"></i></span>
            
            <div class="custom-date-selector">  
              <i class="fa fa-calendar"></i>
              <v-date-picker 
                mode='single' 
                popoverDirection="bottom" 
                :formats="formats"
                v-model='end_date' 
                :input-props='{class: "activity-custom-input", placeholder: "MM/DD/YYYY", readonly: true}'
                popover-visibility='focus'
              >
              </v-date-picker>
              <i class="fa fa-caret-down"></i>  
            </div> 
          </div>
				</div>

        <div v-if="showInputDate" class="date-selection-container">

          <div class="custom-date-selector">
            <i class="fa fa-calendar"></i>
            <v-date-picker 
              mode='single' 
              popoverDirection="bottom" 
              :formats="formats"
              v-model='start_date' 
              :input-props='{class: "activity-custom-input", placeholder: "MM/DD/YYYY", readonly: true}'
              popover-visibility='focus'
              v-on:input='dateSelected( start_date , end_date )'
            >
            </v-date-picker>
            <i class="fa fa-caret-down"></i>
          </div>

          <span><i class="fa fa-arrow-right"></i></span>
          
          <div class="custom-date-selector">  
            <i class="fa fa-calendar"></i>
            <v-date-picker 
              mode='single' 
              popoverDirection="bottom" 
              :formats="formats"
              v-model='end_date' 
              :min-date='start_date'
              :input-props='{class: "activity-custom-input", placeholder: "MM/DD/YYYY", readonly: true}'
              popover-visibility='focus'
              v-on:input='dateSelected( start_date , end_date )'
            >
            </v-date-picker>
            <i class="fa fa-caret-down"></i>  
          </div>    
        </div>

  			<div class="team-benefits-wrapper">
					
					<h4>View Statement</h4>
					
					<div class="view-statement-container">

						<span class="header-content">Choose how you want your statement to be shown</span>

						<div class="btn-statement-wrapper">
							<button @click="statementType(0, 'overview')" v-bind:class="{'active': viewStatementType.value === 0}" class="btn-spending-type btn-overview">Overview</button>
							<button @click="statementType(1, 'full')" v-bind:class="{'active': viewStatementType.value === 1}" class="btn-spending-type btn-full">Full</button>
						</div>
					</div>
          
          <div v-if="full_active" class="health-spending-container">
            
            <span class="header-content">Choose which Health Spending Account</span>

            <div class="btn-health-spending-wrapper">
              <button @click="setSpendingType(0, 'medical')" v-bind:class="{'active': spendingTypeOpt.value === 0}" class="btn-spending-type btn-medical">Medical</button>
              <button @click="setSpendingType(1, 'wellness')" v-bind:class="{'active': spendingTypeOpt.value === 1}" class="btn-spending-type btn-wellness">Wellness</button>
              <button @click="setSpendingType(2, 'both')" v-bind:class="{'active': spendingTypeOpt.value === 2}" class="btn-spending-type btn-both">Both</button>
            </div>
          </div>
          
				</div>
  		</div>

      <!-- overview -->
      <div v-if="overview_active && !isNoTransaction" class="download-container" v-on:click="downloadPDF( overview_data.statement )">DOWNLOAD <img :src="'../assets/img/coverage/Download.png'"></div>
      <div v-if="overview_active && isNoTransaction" class="download-container" style="cursor: not-allowed;">DOWNLOAD <img :src="'../assets/img/coverage/Download.png'"></div>

      <!-- full -->
      <div v-if="full_active" class="statement-header-wrapper">
        <div class="search-wrapper">
          <div class="input-group">
            <input class="search-input" placeholder="Search Employee Name" v-model="search_emp" v-on:input="searchEmployeeChanged( search_emp )">
            <ul v-show="isActiveSearch" class="dropdown-menu">
              <li v-for="list in searchedEmployee ">
                <a class="dropdown-item" v-on:click="selectEmployeeSearch( list.user_id, list.Name )" role="option">{{ list.Name }}</a>
              </li>
            </ul>
            <span class="input-group-btn">
              <button v-if="search_emp == ''"><i class="fa fa-search"></i></button>
              <button v-if="search_emp != ''" v-on:click="closeSearchEmp()"><i class="fa fa-close"></i></button>
            </span>
          </div>
        </div>
        <div class="statement-transaction-header">
          <div>
            <div class="total-transactions-container">
              <span>{{ networkType.value == 0 ? filteredInNetwork.length : filteredOutNetwork.length }}</span> Total Transactions
            </div>
            <div class="total-spent-container"> Total Spent
              <span>S$ <span>{{ networkType.value == 0 ? roundFloatValue( overview_data.sub_total ) : roundFloatValue( overview_data.total_e_claim_spent )  }}</span> </span> 
            </div>
          </div>
          <div>
            <div class="btn-transaction-container">
              <button @click="netType(0, 'In-network')" v-bind:class="{'active': networkType.value === 0}">
                IN-NETWORK <br> TRANSACTIONS
              </button>
              <button @click="netType(1, 'In-network')" v-bind:class="{'active': networkType.value === 1}">
                E-CLAIM TRANSACTIONS <br> (OUT-OF-NETWORK)
              </button>
            </div>
          </div>
          <div>
            <div class="download-statement-container">
              <span>Download Statement</span>
              <button v-if="networkType.value === 0" class="btn-pdf" v-on:click="downloadFullINPDF( overview_data.statement, 'pdf' )">PDF</button>
              <button v-if="networkType.value === 0" class="btn-csv" v-on:click="downloadFullINPDF( overview_data.statement, 'csv' )">CSV</button>

              <button v-if="networkType.value === 1" class="btn-pdf" v-on:click="downloadFullINPDF( overview_data.statement, 'pdf' )">PDF</button>
              <button v-if="networkType.value === 1" class="btn-csv" v-on:click="downloadCSV( )">CSV</button>
            </div>
          </div>
        </div>
      </div> 
      

  	</div>

    <div class="statement-title-col">
      <h4>Statement for 
        <span>{{ filterDate( start_date, 'D MMMM YYYY' ) }}</span> - <span>{{ filterDate( end_date, 'D MMMM YYYY' ) }}</span>
      </h4>
    </div>

    
    <div class="statement-overview-container">
      <div v-if="overview_active" class="mobile-preview btn">
        <button class="btn-info"><i class="fa fa-eye" aria-hidden="true"></i> Preview</button>
      </div>
      <!-- overview transaction -->
      <transition name="fade">
        <div v-if="overview_active" class="statement-wrapper">
          <div class="statement-header">
            <div class="mednefits-img-container">
              <img :src="'../assets/img/mednefits_logo_v3_(white).png'">
            </div>
            <div class="invoice-details-container">
              <h2>INVOICE</h2>
              <div class="medicloud-pte-text">Medicloud Pte Ltd</div>
              <div>7 Temasek Boulevard</div>
              <div>#18-02 Suntec Tower</div>
              <div>038987</div>
              <div class="country-text">Singapore</div>
              <div>+65 6254 7889</div>
              <div>mednefits.com</div>
            </div>
          </div>

          <div v-if="isNoTransaction" class="no-transaction-month-container">
            <div>No Transactions for this Month.</div>
            <div>( <span>{{ filterDate( start_date, 'D MMMM YYYY' ) }}</span> - <span>{{ filterDate( end_date, 'D MMMM YYYY' ) }}</span> )</div>
          </div>

          <div v-if="!isNoTransaction" class="transaction-month-container">

            <div class="benefits-statement-container">
              <div class="benefits-statement-col-1">
                <div>Team Benefits Statement</div>
                <div>{{ overview_data.statement.company }}</div>
                <div class="company-address">
                  {{ overview_data.statement.company_address ? overview_data.statement.company_address : 'No Address Specified' }}
                </div>
                <div>{{ overview_data.statement.statement_contact_name }}</div>
                <div>{{ overview_data.statement.statement_contact_number }}</div>
                <div>{{ overview_data.statement.statement_contact_email }}</div>
              </div>
              <div class="benefits-statement-col-2">
                <div>
                  <label>Statement Number:</label>
                  <span>{{ overview_data.statement.statement_number }}</span>
                </div>
                <div>
                  <label>Statement Date:</label>
                  <span>{{ filterDate( overview_data.statement.statement_date, 'D MMM YYYY' ) }}</span>
                </div>
                <div>
                  <label>Payment Due:</label>
                  <span>{{ filterDate( overview_data.statement.statement_due, 'D MMM YYYY' ) }}</span>
                </div>
                <div>
                  <label>Amount Due (SGD):</label>
                  <span>${{ overview_data.statement.statement_total_amount }}</span>
                </div>
              </div>
            </div>

            <div class="summary-charges-container">
              <h4>Summary of Charges</h4>

              <div class="charges-row">
                <div class="spending-account-container">
                  In-Network Spending Account Usage
                  <span class="pull-right-amount">S$ {{ roundFloatValue( overview_data.statement.statement_in_network_amount ) }}</span>
                </div>
                <div class="statement-month-container">
                  Statement for
                  <span>{{ filterDate( start_date, 'D MMMM YYYY' ) }}</span> - <span>{{ filterDate( end_date, 'D MMMM YYYY' ) }}</span>
                </div>
                <div v-if="overview_data.lite_plan" class="charges-lite-plan">
                  Consultation Spent - General Practitioner 
                  <span class="pull-right-amount">S$ {{ overview_data.total_consultation }}</span>
                </div>
              </div>

              <div class="charges-row sub-total-container">
                Sub Total
                <span class="pull-right-amount">S$ {{ overview_data.sub_total }}</span>
              </div>

              <div class="total-due-container">
                Total Due <span class="pull-right-amount">S$ {{ overview_data.sub_total }}</span>
              </div>
            </div>

            <div class="payment-information-container">
              <div class="payment-info-title">Payment Information</div>

              <div class="cheque-payment-container">
                <div class="cheque-bank-title">Cheque Payment:</div>
                <div class="cheque-detail">Medicloud Pte Ltd</div>
                <div class="cheque-detail">7 Temasek Boulevard #18-02 Suntec Tower</div>
                <div class="cheque-detail">038987 Singapore</div>
              </div>

              <div class="bank-transfer-container">
                <div class="cheque-bank-title">Bank Transfer:</div>
                <div class="bank-detail">Bank: UOB</div>
                <div class="bank-detail">Account Name: Medicloud Pte Ltd</div>
                <div class="bank-detail">Account Number: 3743069399</div>
                <div v-if="overview_data.statement.payment_remarks" class="bank-detail">Note: {{ overview.statement.payment_remarks }}</div>
              </div>
            </div>

          </div>

        </div>
      </transition>

      <!-- full transaction -->
      <transition name="fade">
        <div v-if="full_active" class="transaction-table-container">
          
          <div v-if="networkType.value === 0" class="in-network-table">
            <table>
              <thead>
                <tr>
                  <th>DATE</th>
                  <th>ITEM/SERVICE</th>
                  <th>PROVIDER</th>
                  <th>TOTAL AMOUNT</th>
                  <th v-if="overview_data.lite_plan">MEDICINE & TREATMENT</th>
                  <th v-if="overview_data.lite_plan">CONSULTATION</th>
                  <th>EMPLOYEE</th>
                  <th></th>
                </tr>
              </thead>
              <tbody v-for="list in filteredInNetwork" :key="list.index">
                <tr @click="toggleDetails( list )">
                  <td>
                    <!-- <span>29 April 2019, 10:52am</span> -->
                    <span>{{ list.date_of_transaction }}</span>
                  </td>
                  <td>
                    <span>{{ list.clinic_type_and_service }}</span>
                  </td>
                  <td>
                    <span>{{ list.clinic_name }}</span>
                  </td>
                  <td>
                    S$ <span>{{ list.total_amount }}</span>
                  </td>
                  <td v-if="list.lite_plan">{{ list.amount }}</td>
                  <td v-if="list.lite_plan">{{ list.consultation }}</td>
                  <td>
                    <span>{{ list.member }}</span>
                    <div class="spouse-member">
                      <span v-if="list.dependent_relationship != null">{{ list.dependent_relationship }}</span> of <span>{{ list.owner_account }}</span>
                      <span v-if="list.dependent_relationship == null">Dependent</span> of <span>{{ list.owner_account }}</span>
                    </div>
                  </td>
                  <td>
                    <a>
                      <i class="fa fa-angle-right transition-easeInOutCubic-300ms" :class="{'fa-angle-down-active': showTransDetails === true}"></i>
                    </a>
                  </td>
                </tr>
                <transition name="fade">
                  <tr v-show="list.showTransDetails" class="in-network-subtr">
                    <td colspan="8">
                      <div class="provider-item-wrapper">
                        <img :src="list.clinic_image">
                        <div>{{ list.clinic_name }}</div>
                        <div class="service-box">
                          <img :src="list.clinic_type_image">
                          <label>
                            <span>{{ list.clinic_type_name }}</span>
                          </label>
                        </div>
                      </div>
                      <div class="transac-details-wrapper">
                        <div class="transac-details">
                          <div>
                            <label>MEMBER</label>
                            <span>{{ list.member }}</span>
                          </div>
                          <div v-if="list.sub_account_user_type">
                            <label>EMPLOYEE</label>
                            <span>{{ list.owner_account }}</span>
                          </div>
                          <div v-if="list.sub_account_user_type" class="dependent-relationship-container">
                            <label>DEPENDENT RELATIONSHIP</label>
                            <span v-if="list.dependent_relationship != null">{{ list.dependent_relationship }}</span>
                            <span v-if="list.dependent_relationship == null">Dependent of <span>{{ list.member }}</span></span>
                          </div>
                          <div>
                            <label>DATE</label>
                            <span>{{ list.date_of_transaction }}</span>
                          </div>
                          <div>
                            <label>TRANSACTION #</label>
                            <span>{{ list.transaction_id }}</span>
                          </div>
                          <div>
                            <label>ITEM/SERVICE</label>
                            <span>{{ list.clinic_type_and_service }}</span>
                          </div>
                          <div>
                            <div class="label-wrapper">
                              <label>TOTAL AMOUNT</label>
                              <span>S$ {{ list.total_amount }}</span>
                            </div>
                          </div>
                          <div v-if="list.lite_plan">
                            <div class="service-container">
                              <label>
                                <div class="credit-container">
                                  <span v-if="!list.service_credits && list.transaction_type == 'cash' || list.service_credits && list.transaction_type == 'cash'">Cash</span>
                                  <span v-if="list.service_credits && list.transaction_type == 'credits'">Credit</span>
                                </div>  
                              </label>
                              <div class="desc-wrapper">
                                <span>{{ list.service }}</span>
                                <div>S$ <span>{{ list.amount }}</span></div>
                              </div>
                            </div>
                            <div class="service-container">
                              <label>
                                <div class="credit-container">
                                  <span v-if="list.consultation_credits || list.service_credits">Credit</span>
                                  <span hidden>Cash</span>
                                </div>  
                              </label>
                              <div class="desc-wrapper">
                                <span>Consultation</span>
                                <div>S$ <span>{{ list.consultation }}</span></div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <label>PAYMENT TYPE</label>
                            <span>{{ list.type }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="download-receipt-container">
                        <button class="btn-download-receipt" v-bind:class="{'disabled' : !list.receipt_files || list.receipt_files.length == 0}" v-on:click="downloadReceipt( list.receipt_files, list )">Download Receipt</button>

                        <div class="trans-receipts-wrapper">
                          <div v-for="img in list.receipt_files" :key="img.index" class="click-box-wrapper">
                            <div class="click-box">
                              <i class="fa fa-plus"></i>
                            </div>
                            <img v-if="img.type == 'excel'" :src="'../assets/img/Receipt-doc-xls.png'" >
                            <img v-if="img.type == 'pdf'" :src="'../assets/img/Receipt-pdf.png'" >
                            <img v-if="img.type == 'image'" :src="img.file" >
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </transition>
              </tbody>
            </table>
          </div>

          <div v-if="networkType.value === 1" class="out-network-table">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>APPROVED DATE</th>
                  <th>CLAIM DATE</th>
                  <th>CLAIM TYPE</th>
                  <th>PROVIDER</th>
                  <th>TOTAL AMOUNT</th>
                  <th>EMPLOYEE</th>
                  <th></th>
                </tr>
              </thead>
              <tbody v-for="list in filteredOutNetwork" :key="list.index">
                <tr @click="toggleDetails( list )">
                  <td>
                    <label v-if="list.status == 0" class="status-text pending" >Pending</label>
                    <label v-if="list.status == 1" class="status-text approved" >Approved</label>
                    <label v-if="list.status == 2" class="status-text rejected" >Rejected</label>
                  </td>
                  <td>
                    <span>{{ list.approved_date }}</span>
                  </td>
                  <td>
                    <span>{{ list.claim_date }}</span>
                  </td>
                  <td>
                    <span>{{ list.service }}</span>
                  </td>
                  <td>
                    <span>{{ list.merchant }}</span>
                  </td>
                  <td>S$ <span>{{ list.amount }}</span></td>
                  <td>
                    <span>{{ list.member }}</span>
                    <div v-if="list.sub_account" class="spouse-member">
                      <span v-if="list.dependent_relationship != null">
                        <span>{{ list.dependent_relationship }}</span> of <span>{{ list.sub_account }}</span>
                      </span>
                      <span v-if="list.dependent_relationship == null">
                        <span>Dependent</span> of <span>{{ list.sub_account }}</span>
                      </span>
                    </div>
                  </td>
                  <td>
                    <a>
                      <i class="fa fa-angle-right transition-easeInOutCubic-300ms" :class="{'fa-angle-down-active': showTransDetails === true}"></i>
                    </a>
                  </td>
                </tr>
                <transition name="fade">
                  <tr v-show="list.showTransDetails" class="in-network-subtr">
                    <td colspan="8">
                      <div class="status-left-wrapper">
                        <div class="status-box-left">
                          <div class="status_text">Approved</div>
                          <div class="claim-date-text">Claim Date: <span>16 April 2019 05:09 PM</span></div>
                        </div>

                        <!-- this will appear when the status is rejected -->
                        <!-- <div class="reason-container">
                          <div class="label">REASON:</div>
                          <div>qwe</div>
                        </div> -->
                      </div>
                      <div class="transac-details-wrapper">
                        <div class="transac-details">
                          <div>
                            <label>MEMBER</label>
                            <span>Dith Tan</span>
                          </div>
                          <div>
                            <label>EMPLOYEE</label>
                            <span>Filbert Tan</span>
                          </div>
                          <div class="dependent-relationship-container">
                            <label>DEPENDENT RELATIONSHIP</label>
                            <span>Child</span>
                          </div>
                          <div>
                            <label>APPROVED DATE</label>
                            <span>09 April 2019</span>
                          </div>
                          <div>
                            <label>CLAIM DATE</label>
                            <span>09 April 2019</span>
                          </div>
                          <div>
                            <label>VISIT DATE</label>
                            <span>01 April 2019, 09:59 AM</span>
                          </div>
                          <div>
                            <label>TRANSACTION #</label>
                            <span>MNF000309</span>
                          </div>
                          <div>
                            <label>CLAIM TYPE</label>
                            <span>Health Screening</span>
                          </div>
                          <div>
                            <label>PROVIDER</label>
                            <span>TEST</span>
                          </div>
                          <div>
                            <label>CLAIM AMOUNT</label>
                            <span>S$ 50.00</span>
                          </div>
                          <div>
                            <label>PAYMENT TYPE</label>
                            <span>E-Claim</span>
                          </div>
                        </div>
                      </div>
                      <div class="download-receipt-container">
                        <button class="btn-download-receipt">
                          Upload Receipt
                          <input type="file" v-on:change="uploadReceipt( list, $event.target.files )">
                          <span v-if="list.uploading"><i class="fa fa-circle-o-notch fa-spin"></i></span>
                        </button>
                        <button class="btn-download-receipt" v-bind:class="{'disabled' : !list.files || list.files.length == 0}" v-on:click="downloadReceipt( list.files, list )">Download Receipt</button>
                        
                        <div class="trans-receipts-wrapper">
                          <div v-for="img in list.files" :key="img.index" class="click-box-wrapper">
                            <div class="click-box">
                              <i class="fa fa-plus"></i>
                            </div>
                            <img v-if="img.type == 'excel' || img.file_type == 'excel'" :src="'../assets/img/Receipt-doc-xls.png'" >
                            <img v-if="img.type == 'pdf' || img.file_type == 'pdf'" :src="'../assets/img/Receipt-pdf.png'" >
                            <img v-if="img.type == 'image' || img.file_type == 'image'" :src="img.file" >
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </transition>
              </tbody>
            </table>
          </div>
        </div>
      </transition>
    </div>

  </div>
</template>

<script>
import statement from "@/components/company/statement";

export default statement;
</script>

