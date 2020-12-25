<template>
	<div class="activity-wrapper">
	
		<div class="container">
			<div class="activity-container">
				<span class="timeframe-title">Select a timeframe</span>
	
				<div class="activity-header-calendar">
					<div class="date-selection-container">
	
						<div class="custom-date-selector">
							<i class="fa fa-calendar"></i>
							<v-date-picker :max-date='new Date()' v-model="timeFrame.rangePicker_start" :input-props='{class: "activity-custom-input", placeholder: "DD/MM/YYYY", readonly: true}' popover-visibility='focus'>
							</v-date-picker>
							<i class="fa fa-caret-down"></i>
						</div>
	
						<span><i class="fa fa-arrow-right"></i></span>
	
						<div class="custom-date-selector">
							<i class="fa fa-calendar"></i>
							<v-date-picker :max-date='new Date()' v-model="timeFrame.rangePicker_end" :input-props='{class: "activity-custom-input", placeholder: "DD/MM/YYYY", readonly: true}' popover-visibility='focus' :formats='formats'>
							</v-date-picker>
							<i class="fa fa-caret-down"></i>
						</div>
	
						<button class="btn-apply" @click="applyDates()">
									Apply
								</button>
	
					</div>
	
					<div class="search-wrapper">
						<div class="input-group">
							<input class="search-input" placeholder="Search Employee Name" v-model="search_emp" @input="searchTypeAhead(search_emp)">
							<!-- @input="searchEmployeeActivity(search_emp)" -->
							<ul v-if="isActiveSearch" class="dropdown-menu">
								<!-- <template v-for="list in activity_dates"> -->
									<li :class="{'active': false}" v-for="(item) in filterBy(searchRes, search_emp)" :key="item.index" @click="searchEmployeeActivity(item.user_id, item.Name)">
										<a class="dropdown-item" href="#" role="option">{{item.Name}}</a>
									</li>
								<!-- </template> -->
							</ul>
							<span class="input-group-btn">
						        <button v-if="!search.close"><i class="fa fa-search"></i></button>
						        <button v-if="search.close" @click="closeSearch"><i class="fa fa-close"></i></button>
						      </span>
						</div>
					</div>
				</div>
	
				<div class="team-benefits-wrapper">
					<div class="team-benefits-header">
						<h4>{{activity_title}}</h4>
						<div class="spending-type-container">
							<button @click="spendType(0, 'medical')" v-bind:class="{'active': spendingType.value === 0}" class="btn-spending-type btn-medical">Medical</button>
							<button @click="spendType(1, 'wellness')" v-bind:class="{'active': spendingType.value === 1}" class="btn-spending-type btn-wellness">Wellness</button>
						</div>
					</div>
					<div class="cost-wrapper">
						<div class="benefit-box">
							<h5>S$ <span>{{activity.total_spent_format_number | decimalTwo}}</span></h5>
							<p>SPENT</p>
						</div>
						<div class="benefit-box">
							<h5>S$
								<span v-if="spendingType.value == 0">{{credits.total_medical_employee_balance}}</span>
								<span v-if="spendingType.value == 1">{{credits.total_wellness_employee_balance}}</span>
							</h5>
							<p>BALANCE</p>
						</div>
						<div class="benefit-box">
							<h5>S$
								<span v-if="spendingType.value == 0">{{credits.total_medical_employee_allocated}}</span>
								<span v-if="spendingType.value == 1">{{credits.total_wellness_employee_allocated}}</span>
							</h5>
							<p>ALLOCATED</p>
						</div>
						<div class="benefit-box">
							<h5>S$
								<span v-if="activity.spending_type == 'medical'">{{total_allocation.total_allocation | decimalTwo}}</span>
								<span v-if="activity.spending_type == 'wellness'">{{total_allocation.total_wellness_allocation | decimalTwo}}</span>
							</h5>
							<p>TOTAL COMPANY CREDITS</p>
						</div>
					</div>
					<div class="spent-box">
						<div class="spending-title">Spending Breakdown</div>
						<div class="progress-wrapper">
							<div class="progress-bar transition-easeInOutCubic-900ms" :style='progressBar'></div>
						</div>
						<div class="in-out-network-container">
							<div class="in-network-box">
								<div>S$ <span>{{activity.in_network_spending_format_number | decimalTwo}}</span></div>
								<span>IN-NETWORK</span>
							</div>
							<div class="out-network-box">
								<div>S$ <span>{{activity.e_claim_spending_format_number | decimalTwo}}</span></div>
								<span>E-CLAIM(OUT-OF-NETWORK)</span>
							</div>
						</div>
					</div>
				</div>
	
				<div class="transaction-header">
					<div class="btn-transaction-container">
						<button @click="netType(0, 'In-network')" v-bind:class="{'active': networkType.value === 0}">
									IN - NETWORK <br> TRANSACTIONS
								</button>
						<button @click="netType(1, 'Out-of-network')" v-bind:class="{'active': networkType.value === 1}">
									E- CLAIM TRANSACTIONS <br> (OUT-OF-NETWORK)
								</button>
					</div>
					<div class="download-container">DOWNLOAD <img :src="'../assets/img/coverage/Download.png'"></div>
				</div>
	
			</div>
		</div>
	
	
		<div class="transaction-wrapper">
			<!-- transactions -->
	
			<!-- In network -->
			<transition name="fade">
				<div class="transaction-container transition-easeInOutCubic-600ms" id="transaction-container-inNetwork" :class="{'transaction-container-active': toggleSidebar.in === true}" v-if="networkType.value === 0">
					<div class="total-transac-header">
						<div>
							<span>{{inNetwork_pagination.total}}</span> Total Transactions
							<!-- <span>{{activity.total_in_network_transactions}}</span> Total Transactions -->
							<div>Total Spent
								<span>S$<span>{{activity.total_in_network_spent_format_number | decimalTwo}}</span></span>
							</div>
						</div>
					</div>
	
					<!-- to repeat -->
					<div class="transaction-rows">
						<!-- pra sa date na g filter ang timeline -->
						<div class="timeline" v-for="month in activity_dates" :key="month.index">
							<div class="date-box">{{month.month}}</div>
							<!-- para sa each transaction -->
							<div class="transaction-tr" :class="{'active': selected_list.index == index }" @click="toggleShowSidebar(index,trans)" v-for="(trans,index) in filterBy(month.transactions, search_emp)" :key="trans.id">
								<div class="dot-box">
									<div class="dot-circle"></div>
								</div>
								<div class="month-box">
									<span>{{trans.day}}</span>
								</div>
								<div class="img-wrapper">
									<img :src="'../assets/img/GP.png'">
								</div>
								<div class="transaction-details">
									<div>{{trans.member}}</div>
									<div>{{trans.clinic_type_and_service}}</div>
									<div>{{trans.clinic_name}}</div>
									<div class="spouse-dependent-container">
										<div v-if="trans.sub_account_user_type == 'spouse'">
											Spouse of <span>{{trans.owner_account}}</span>
										</div>
										<div v-if="trans.sub_account_user_type == 'dependent'">
											Dependent of <span>{{trans.owner_account}}</span>
										</div>
									</div>
									<div v-if="trans.transaction_type == 'credits'" class="credit-cash-wrap credits-spouse-wrap">
										<span>Credits</span>
									</div>
									<div v-if="trans.transaction_type == 'cash'" class="credit-cash-wrap cash-spouse-wrap">
										<span>Cash</span>
									</div>
									<div v-if="trans.status_text" class="status-text">
										<span>{{trans.status_text}}</span>
									</div>
								</div>
								<div class="transaction-price">
									S$ <span>{{trans.amount}}</span>
								</div>
							</div>
						</div>
					</div>
	
					<div class="activity-pagination-wrapper">
						<div class="trans-pagination-shadow transition-easeInOutCubic-600ms" :class="{'trans-pagination-shadow-active': toggleSidebar.in === true}"></div>
						<div class="global-pagination">
							<div class="prev-pagination">
								<i @click="transactionPagination('prev')" class="fa fa-angle-left"></i>
								<!-- <span>Prev</span> -->
							</div>
							<!-- <span class="numeric-pagination active">1</span>
									<span class="numeric-pagination">2</span>
									<span class="numeric-pagination">3</span>
									<span class="numeric-pagination">4</span> -->
							<div class="next-pagination">
								<i @click="transactionPagination('next')" class="fa fa-angle-right"></i>
								<!-- <span>Next</span> -->
							</div>
							<div class="total-item">
								<span>{{inNetwork_pagination.from}} - {{inNetwork_pagination.to}} of {{inNetwork_pagination.total}}</span>
							</div>
							<div class="per-page-pagination">
								<span @click="perPage()">
											<span>{{inNetwork_perPage}}</span> per page
								</span>
								<i class="fa fa-angle-down"></i>
								<div v-if="paginationDropdown" class="per-page">
									<ul class="nav">
										<li><a @click="selectedPerPage(5)">5</a></li>
										<li><a @click="selectedPerPage(10)">10</a></li>
										<li><a @click="selectedPerPage(20)">20</a></li>
										<li><a @click="selectedPerPage(50)">50</a></li>
										<li><a @click="selectedPerPage(100)">100</a></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</transition>
			<!-- side bar show/hide -->
			<transition name="slide">
				<div class="hidden-details-container" id="hidden-inNetwork" v-if="toggleSidebar.in">
					<span class="side-close" @click="toggleSidebar.in = false"> <i class="fa fa-times" aria-hidden="true"></i> </span>
					<img class="details-img" :src="selected_list.clinic_image">
					<h5>{{selected_list.clinic_type_and_service}}</h5>
					<div class="details-container">
						<div class="details-row">
							<div class="details-left">
								<div>MEMBER</div>
							</div>
							<div class="details-right">
								<div>{{selected_list.member}}</div>
							</div>
						</div>
						<div v-if="selected_list.owner_account" class="details-row">
							<div class="details-left">
								<div>EMPLOYEE</div>
							</div>
							<div class="details-right">
								<div>{{selected_list.owner_account}}</div>
							</div>
						</div>
						<div v-if="selected_list.dependent_relationship" class="details-row">
							<div class="details-left">
								<div>DEPENDENT RELATIONSHIP</div>
							</div>
							<div class="details-right">
								<div>{{selected_list.dependent_relationship}}</div>
							</div>
						</div>
						<div class="details-row">
							<div class="details-left">
								<div>DATE</div>
							</div>
							<div class="details-right">
								<div>{{selected_list.date_of_transaction}}</div>
							</div>
						</div>
						<div class="details-row">
							<div class="details-left">
								<div>TRANSACTION #</div>
							</div>
							<div class="details-right">
								<div>{{selected_list.transaction_id}}</div>
							</div>
						</div>
						<div class="details-row">
							<div class="details-left">
								<div>ITEM/SERVICE</div>
							</div>
							<div class="details-right">
								<div>{{selected_list.clinic_type_and_service}}</div>
							</div>
						</div>
						<div class="details-row">
							<div class="details-left">
								<div>TOTAL AMOUNT</div>
	
								<div :class="selected_list.service_credits && selected_list.transaction_type == 'credits' ? 'blue' : 'green'" class="procedure-indicator" v-if="selected_list.lite_plan">
									<span v-if="!selected_list.service_credits && selected_list.transaction_type == 'cash' || selected_list.service_credits && selected_list.transaction_type == 'cash'">Cash</span>
									<span v-if="selected_list.service_credits && selected_list.transaction_type == 'credits'">Credits</span>
								</div>
								<div v-if="selected_list.lite_plan" style="border-bottom: 1px solid #999;width: 50px;margin: 0 20px 5px auto;"></div>
								<div class="consultation-indicator blue" v-if="selected_list.lite_plan ">
									<span v-if="selected_list.consultation_credits || selected_list.service_credits">Credits</span>
									<span hidden>Cash</span>
								</div>
							</div>
							<div class="details-right">
								<div>S$ <span>{{selected_list.amount}}</span></div>
							</div>
						</div>
						<div class="details-row">
							<div class="details-left">
								<div>PAYMENT TYPE</div>
							</div>
							<div class="details-right">
								<div>{{selected_list.type}}</div>
							</div>
						</div>
						<div v-if="selected_list.cap_transaction" class="details-row">
							<div class="details-left">
								<div>Caps per visit</div>
							</div>
							<div class="details-right">
								<div>{{selected_list.cap_per_visit}}</div>
							</div>
						</div>
						<div v-if="selected_list.cap_transaction" class="details-row">
							<div class="details-left">
								<div>Paid by Credits</div>
							</div>
							<div class="details-right">
								<div>{{selected_list.paid_by_credits}}</div>
							</div>
						</div>
						<div v-if="selected_list.cap_transaction" class="details-row">
							<div class="details-left">
								<div>Paid by Cash</div>
							</div>
							<div class="details-right">
								<div>{{selected_list.paid_by_cash}}</div>
							</div>
						</div>
					</div>
					<div class="download-receipt-container">
						<button class="btn-download disabled">Download Receipt</button>
						<div class="trans-receipts-wrapper">
							<div class="click-box-wrapper" v-for="img in selected_list.files" :key="img.index">
								<!-- To Repeat -->
								<a>
									<div @click="showPreview = true" class="click-box transition-easeInOutCubic-200ms">
										<i class="fa fa-plus"></i>
									</div>
									<img :src="img.file">
								</a>
	
								<ImgPreview v-if="showPreview">
									<div slot="content">
										<a @click="showPreview = false">
													<i class="fa fa-times"></i>
												</a>
	
										<!-- <img :src="'https://res.cloudinary.com/dzh9uhsqr/image/upload/v1557387401/nhulevaerr46wlfy07d7.png'"> -->
										<img :src="img.file">
									</div>
								</ImgPreview>
	
							</div>
							<!--End sa To Repeat -->
						</div>
						<a href="/download/transaction_receipt/413" target="_blank" class="btn-download btn-receipt">Mednefits E-Receipt</a>
					</div>
				</div>
			</transition>
	
			<!-- Out network -->
			<transition name="fade">
				<div class="transaction-container e-claim-transactions transition-easeInOutCubic-600ms" :class="{'transaction-container-active': toggleSidebar.out === true}" v-if="networkType.value === 1">
					<div class="total-transac-header">
						<div>
							<span>{{outNetwork_pagination.total}}</span> Total Transactions
							<!-- <span>{{activity.e_claim_transactions.length}}</span> Total Transactions -->
							<div>Total Spent
								<span>S$<span>{{activity.e_claim_spending_format_number | decimalTwo}}</span></span>
							</div>
						</div>
					</div>
	
					<div class="transaction-rows">
						<div class="timeline" v-for="month in eclaim_dates" :key="month.index">
							<div class="date-box">{{month.month}}</div>
							<div class="transaction-tr" :class="{ 'active': selectedOut_list.index == index}" @click.prevent="toggleShowSidebar(index, trans)" v-for="(trans,index) in filterBy(month.transactions, search_emp)" :key="trans.index">
								<div class="dot-box">
									<div class="dot-circle"></div>
								</div>
								<div class="month-box">
									<span>{{trans.day}}</span>
								</div>
								<div class="img-wrapper">
									<img class="receipt-img" :src="'../assets/img/receipt.png'">
								</div>
								<div class="transaction-details">
									<div>{{trans.member}}</div>
									<div>{{trans.service}}</div>
									<div>{{trans.merchant}}</div>
									<div class="spouse-dependent-container">
										<div v-if="trans.sub_account_type == 'spouse'">
											Spouse of <span>{{trans.sub_account}}</span>
										</div>
										<div v-if="trans.sub_account_type == 'dependent'">
											Dependent of <span>{{trans.sub_account}}</span>
										</div>
									</div>
									<!-- <div class="credit-cash-wrap credits-spouse-wrap">
												<span>Credits</span>
											</div> -->
								</div>
								<div class="transaction-price">
									S$ <span>{{trans.amount}}</span>
								</div>
							</div>
						</div>
					</div>
	
					<div class="activity-pagination-wrapper">
						<div class="trans-pagination-shadow transition-easeInOutCubic-600ms" :class="{'trans-pagination-shadow-active': toggleSidebar.in === true}"></div>
						<div class="global-pagination">
							<div class="prev-pagination">
								<i @click="transactionPagination('prev')" class="fa fa-angle-left"></i>
								<!-- <span>Prev</span> -->
							</div>
							<!-- <span class="numeric-pagination active">1</span>
									<span class="numeric-pagination">2</span>
									<span class="numeric-pagination">3</span>
									<span class="numeric-pagination">4</span> -->
							<div class="next-pagination">
								<i @click="transactionPagination('next')" class="fa fa-angle-right"></i>
								<!-- <span>Next</span> -->
							</div>
							<div class="total-item">
								<span>{{inNetwork_pagination.from}} - {{inNetwork_pagination.to}} of {{inNetwork_pagination.total}}</span>
							</div>
							<div class="per-page-pagination">
								<span @click="perPage()">
											<span>{{inNetwork_perPage}}</span> per page
								</span>
								<i class="fa fa-angle-down"></i>
								<div v-if="paginationDropdown" class="per-page">
									<ul class="nav">
										<li><a @click="selectedPerPage(5)">5</a></li>
										<li><a @click="selectedPerPage(10)">10</a></li>
										<li><a @click="selectedPerPage(20)">20</a></li>
										<li><a @click="selectedPerPage(50)">50</a></li>
										<li><a @click="selectedPerPage(100)">100</a></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</transition>
			<transition name="slide">
				<div class="hidden-details-container e-claim-hidden-container" id="hidden-outNetwork" v-if="toggleSidebar.out">
					<span class="side-close" @click="toggleSidebar.out = false"> <i class="fa fa-times" aria-hidden="true"></i> </span>
					<img class="details-img" :src="'../assets/img//GP.png'">
					<div class="details-container">
						<div class="details-row">
							<div class="details-left">
								<div>MEMBER</div>
							</div>
							<div class="details-right">
								<div>{{selectedOut_list.member}}</div>
							</div>
						</div>
						<div v-if="selectedOut_list.owner_account" class="details-row">
							<div class="details-left">
								<div>EMPLOYEE</div>
							</div>
							<div class="details-right">
								<div>{{selectedOut_list.owner_account}}</div>
							</div>
						</div>
						<div v-if="selectedOut_list.dependent_relationship" class="details-row">
							<div class="details-left">
								<div>DEPENDENT</div>
							</div>
							<div class="details-right">
								<div>{{selectedOut_list.dependent_relationship}}</div>
							</div>
						</div>
						<div class="details-row">
							<div class="details-left">
								<div>APPROVED DATE</div>
							</div>
							<div class="details-right">
								<div>{{selectedOut_list.approved_date}}</div>
							</div>
						</div>
						<div class="details-row">
							<div class="details-left">
								<div>CLAIM DATE</div>
							</div>
							<div class="details-right">
								<div>{{selectedOut_list.claim_date}}</div>
							</div>
						</div>
						<div class="details-row">
							<div class="details-left">
								<div>VISIT DATE</div>
							</div>
							<div class="details-right">
								<div>{{selectedOut_list.visit_date}}</div>
							</div>
						</div>
						<div class="details-row">
							<div class="details-left">
								<div>TRANSACTION #</div>
							</div>
							<div class="details-right">
								<div>{{selectedOut_list.transaction_id}}</div>
							</div>
						</div>
						<div class="details-row">
							<div class="details-left">
								<div>CLAIM TYPE</div>
							</div>
							<div class="details-right">
								<div>{{selectedOut_list.service}}</div>
							</div>
						</div>
						<div class="details-row">
							<div class="details-left">
								<div>PROVIDER</div>
							</div>
							<div class="details-right">
								<div>{{selectedOut_list.merchant}}</div>
							</div>
						</div>
						<div class="details-row">
							<div class="details-left">
								<div>CLAIM AMOUNT</div>
							</div>
							<div class="details-right">
								<div>S$ <span>{{selectedOut_list.amount}}</span></div>
							</div>
						</div>
						<div class="details-row">
							<div class="details-left">
								<div>PAYMENT TYPE</div>
							</div>
							<div class="details-right">
								<div>{{selectedOut_list.type}}</div>
							</div>
						</div>
					</div>
					<div class="download-receipt-container">
						<button class="btn-download">Download Receipt</button>
						<div class="trans-receipts-wrapper">
							<div class="click-box-wrapper" v-for="img in selectedOut_list.files" :key="img.id">
								<a>
									<div @click="showPreview = true" class="click-box transition-easeInOutCubic-200ms">
										<i class="fa fa-plus"></i>
									</div>
									<img :src="img.file">
								</a>
								<ImgPreview v-if="showPreview">
									<div slot="content">
										<a @click="showPreview = false">
													<i class="fa fa-times"></i>
												</a>
	
										<img :src="img.file">
									</div>
								</ImgPreview>
							</div>
						</div>
					</div>
				</div>
			</transition>
		</div>
	
		<!-- 
			  <div class="transaction-wrapper e-claim-transaction-wrapper">
			    
		    </div> -->
	</div>
</template>

<script>
import activity from "@/components/company/activity";

export default activity;
</script>



