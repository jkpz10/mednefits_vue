<template>
  <div class="claim-wrapper">
  	<div class="container">
  		<div class="claim-container">
    		<span class="timeframe-title">Select a timeframe (Claim Date)</span>
    		<div class="activity-header-calendar">
					<div class="date-selection-container">

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
	              :min-date='start_date'
	              :input-props='{class: "activity-custom-input", placeholder: "MM/DD/YYYY", readonly: true}'
	              popover-visibility='focus'
	            >
	            </v-date-picker>
							<i class="fa fa-caret-down"></i>	
						</div>		

						<button class="btn-apply" v-on:click="getClaims()">
							Apply
						</button>
						
					</div>
				</div>

				<div class="team-benefits-wrapper">
					<div class="team-benefits-header">
						<h4>Team E-Claim</h4>
						<div class="spending-type-container">
							<button @click="spendType(0, 'medical')" v-bind:class="{'active': eclaimSpendingType.value === 0}" class="btn-spending-type btn-medical">Medical</button>
							<button @click="spendType(1, 'wellness')" v-bind:class="{'active': eclaimSpendingType.value === 1}" class="btn-spending-type btn-wellness">Wellness</button>
						</div>
					</div>
					<div class="cost-wrapper">
						<div class="benefit-box">
							<h5><span>{{ claim_data.total_e_claim_submitted_formatted | currency }}</span></h5>
							<p>TOTAL CLAIM SUBMITTED</p>
						</div>
						<div class="benefit-box">
							<h5><span>{{ claim_data.total_e_claim_pending_formatted | currency }}</span></h5>
							<p>PENDING</p>
						</div>
						<div class="benefit-box">
							<h5><span>{{ claim_data.total_e_claim_approved_formatted | currency }}</span></h5>
							<p>APPROVED</p>
						</div>
						<div class="benefit-box">
							<h5><span>{{ claim_data.total_e_claim_rejected_formatted | currency }}</span></h5>
							<p>REJECTED</p>
						</div>
					</div>
				</div>

    	</div>

    	<div class="view-search-transaction-eclaim-container">
	    	<div class="view-search-container">
	    		<div>
	    			<div class="view-toggle-btn">
	    				<h4>View</h4>

	    				<div class="btn-view-eclaim">
		    				<button @click="viewEclaimToggle(0,'open')">{{viewData}} <i class="fa fa-caret-down"></i></button>
		    				<ul v-if="viewEclaim" class="dropdown-menu">
							    <li><a @click="viewEclaimToggle(1,'All')">All</a></li>
							    <li><a @click="viewEclaimToggle(1,'Pending')">Pending</a></li>
							    <li><a @click="viewEclaimToggle(1,'Approved')">Approved</a></li>
							    <li><a @click="viewEclaimToggle(1,'Rejected')">Rejected</a></li>
							  </ul>
						  </div>
	    			</div>
	    			<div class="search-wrapper">
		          <div class="input-group">
		            <input class="search-input" placeholder="Search Employee Name" v-model="search_emp" v-on:input="searchEmployeeChanged( search_emp )">
		            <ul v-show="isActiveSearch" class="dropdown-menu">
		              <li v-for="list in searchedEmployee">
		                <a class="dropdown-item" v-on:click="selectEmployeeSearch( list.user_id, list.Name )" role="option">{{ list.Name }}</a>
		              </li>
		            </ul>
		            <span class="input-group-btn">
		              <button v-if="search_emp == ''"><i class="fa fa-search"></i></button>
		              <button v-if="search_emp != ''" v-on:click="closeSearchEmp()"><i class="fa fa-close"></i></button>
		            </span>
		          </div>
		        </div>
	    		</div>
	    	</div>

	    	<div class="total-claim-transaction">
	    		<div class="total-transaction-container"><span>{{ ( filteredEclaimTransactions ) ? filteredEclaimTransactions.length : "" }}</span> Total Transactions</div>
	    		<div class="total-claim-container">
	    			Total Claim 
	    			<span>S$ 
	    				<span v-if="viewData == 'All'">{{ claim_data.total_e_claim_submitted_formatted | currency }}</span>
	    				<span v-if="viewData == 'Pending'">{{ claim_data.total_e_claim_pending_formatted | currency }}</span>
	    				<span v-if="viewData == 'Approved'">{{ claim_data.total_e_claim_approved_formatted | currency }}</span>
	    				<span v-if="viewData == 'Rejected'">{{ claim_data.total_e_claim_rejected_formatted | currency }}</span>
	    			</span>
	    		</div>
	    	</div>

	    	<div class="download-btn-container">
	    		<button v-on:click="downloadCSV()">Download CSV <i class="fa fa-download"></i></button>
	    		<button v-on:click="downloadAllReceipts()" :disabled="all_receipts.length == 0">Download receipts <i class="fa fa-download"></i></button>
	    	</div>
    	</div>

    </div>

    <div class="transaction-wrapper">
    	<div class="transaction-table-container">
	    	<table>
	    		<thead>
						<tr>
							<th></th>
							<th>CLAIM DATE</th>
							<th>APPROVED/ REJECTED DATE</th>
							<th>CLAIM TYPE</th>
							<th>PROVIDER</th>
							<th>CLAIM AMOUNT</th>
							<th>MEMBER</th>
							<th></th>
						</tr>
	    		</thead>
	    		<tbody v-for="list in filteredEclaimTransactions" >
						<tr @click="toggleDetails( list )">
							<td>
								<label v-if="list.status == 0" class="status-text pending">Pending</label>
								<label v-if="list.status == 1" class="status-text approved">Approved</label>
								<label v-if="list.status == 2" class="status-text rejected">Rejected</label>
							</td>
							<td>
								<span>{{ list.claim_date }}</span>
							</td>
							<td>
								<span v-if="list.approved_date"></span>
								<span v-if="list.rejected_date"></span>
							</td>
							<td class="claim-type-details">
								<span>{{ list.service }}</span>
							</td>
							<td>
								<span>{{ list.merchant }}</span>
							</td>
							<td> S$
								<span>{{ list.amount }}</span>
							</td>
							<td>
								<span>{{ list.member }}</span>
								<div v-if="list.owner_account" class="spouse-member">
									<span>{{ list.relationship }} </span> of <span>{{ list.owner_account }}</span>
								</div>
							</td>
							<td>
								<i class="fa fa-angle-right transition-easeInOutCubic-300ms" :class="{'fa-angle-down-active': list.showTransDetails === true}" ></i>
							</td>
						</tr>
						<transition name="fade">
							<tr class="in-network-subtr" v-show="list.showTransDetails">
								<td colspan="8">


									<div class="status-left-wrapper">
										<div class="status-box-left">
											<div class="status_text">{{ list.status_text }}</div>
											<div class="claim-date-text" v-if="list.status == 0">Claim Date: <span>{{ list.claim_date }}</span></div>
											<div class="claim-date-text" v-if="list.status == 1">Approved Date: <span>{{ list.approved_date }}</span></div>
											<div class="claim-date-text" v-if="list.status == 2">Rejected Date: <span>{{ list.rejected_date }}</span></div>
										</div>

										<!-- this will appear when the status is rejected -->
										<div v-if="list.status == 2" class="reason-container">
											<div v-if="list.rejected_reason == null" class="label">REASON:</div>
											<div>{{ list.rejected_reason }}</div>
										</div>
									</div>

									<div class="transac-details-wrapper">
										<div class="transac-details">
											<div>
												<label>MEMBER</label>
												<span>{{ list.member }}</span>
											</div>
											<div v-if="list.owner_account">
												<label>EMPLOYEE</label>
												<span>{{ list.owner_account }}</span>
											</div>
											<div v-if="list.owner_account">
												<label v-if="list.sub_account_type">DEPENDENT RELATIONSHIP</label>
												<span v-if="list.relationship != null">{{ list.relationship }}</span>
												<span v-if="list.relationship == null">Dependent of {{ list.member }}</span>
											</div>
											<div>
												<label>APPROVED DATE</label>
												<span>{{ list.approved_date }}</span>
											</div>
											<div>
												<label>CLAIM DATE</label>
												<span>{{ list.claim_date }}</span>
											</div>
											<div>
												<label>VISIT DATE</label>
												<span>{{ list.visit_date }}</span>
											</div>
											<div>
												<label>TRANSACTION #</label>
												<span>{{ list.transaction_id }}</span>
											</div>
											<div>
												<label>CLAIM TYPE</label>
												<span>{{ list.service }}</span>
											</div>
											<div>
												<label>PROVIDER</label>
												<span>{{ list.merchant }}</span>
											</div>
											<div>
												<label>CLAIM AMOUNT</label>
												<span>S$ {{ list.amount }}</span>
											</div>
											<div>
												<label>PAYMENT TYPE</label>
												<span>{{ list.type }}</span>
											</div>
											<div>
												<label>REMARKS</label>
												<span>{{ list.remarks }}</span>
											</div>
										</div>

										<p class="text-center" v-if="list.message">
											<span v-if="list.res == false" class="text-error">{{ list.message }}</span>
											<span v-if="list.res == true" class="text-success">{{ list.message }}</span>
										</p>

										<div v-if="!list.showReasonInput && !list.showRemarksInput" class="transac-details-btn">
											<button v-if="list.status == 0" class="btn-approved" v-on:click="updateStatus(list, 1)">Approve Claim</button>
											<button v-if="list.status == 0" class="btn-rejected" v-on:click="updateStatus(list, 2)">Reject Claim</button>
											<button v-if="list.status != 0" class="btn-check-pending" v-on:click="updateStatus(list,3)">Change to Pending</button>
										</div>

										<div v-show="list.showReasonInput == true" class="reason-wrapper">
											<label>Reason</label>
											<input type="text" v-model="list.reason" />
											<div>
												<button class="btn-cancel" v-on:click="hideReasonInput(list)">Cancel</button>
												<button class="btn-proceed btn-approve-proceed" v-on:click="updateStatusText(list,2)">Proceed</button>
											</div>
										</div>

										<div v-show="list.showRemarksInput == true" class="reason-wrapper">
											<label>Remarks</label>
											<input type="text" v-model="list.reason" />
											<div>
												<button class="btn-cancel" v-on:click="hideReasonInput(list)">Cancel</button>
												<button class="btn-proceed btn-reject-proceed" v-on:click="updateStatusText(list,1)">Proceed</button>
											</div>
										</div>
									</div>

									<div class="download-receipt-container">
										<button class="btn-download-receipt" v-bind:class="{'disabled' : list.receipt_status == false}" v-on:click="downloadReceipt( list.files, list )">Download Receipt</button>

										<div class="trans-receipts-wrapper">
											<div v-for="img in list.files" class="click-box-wrapper">
												<a>
													<div v-on:click="togglePreview( img )" class="click-box transition-easeInOutCubic-200ms">
														<i class="fa fa-plus"></i>
													</div>
													<img v-if="img.type == 'image' || img.file_type == 'image'" class="thumbnail" :src="img.file">
													<img v-if="img.type == 'excel' || img.file_type == 'excel'" class="thumbnail" :src="'../assets/img/Receipt-doc-xls.png'">
													<img v-if="img.type == 'pdf' || img.file_type == 'pdf'" class="thumbnail" :src="'../assets/img/Receipt-pdf.png'">
												</a>
												
												<ImgPreview v-show="img.showPreview">
													<div slot="content">
														<a v-on:click="togglePreview( img )">
															<i class="fa fa-times"></i>
														</a>
														<img v-if="img.type == 'image' || img.file_type == 'image'" :src="img.file">
													</div>
												</ImgPreview>

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
  </div>
</template>

<script>
import claim from "@/components/company/claim";

export default claim;
</script>
