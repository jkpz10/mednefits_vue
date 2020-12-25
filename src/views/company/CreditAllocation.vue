<template>
	<div class="credit-allocation-wrapper">
		<div class="container">
			<div class="benefits-cred-header">
				<h3>Benefits Credit Allocation</h3>
				<h5>Allocate your team's Benefits Credit</h5>
			</div>
			<div class="employee-details-search-wrapper">
				<div class="spending-account-wrapper">
					<div class="spending-account-container">
						<span>Medical Spending Account</span>
						<div>
							<div class="total-container">
								<div>Total: <span>S$ {{company_properties.total_medical_company_allocation}}</span></div>
							</div>
							<div class="alocated-container">
								<div>Allocated: <span>S$ {{company_properties.total_medical_employee_allocated}}</span></div>
							</div>
							<div class="unalocated-container">
								<div>Unallocated: <span>S$ {{company_properties.total_medical_company_unallocation}}</span></div>
							</div>
						</div>
					</div>
					<div class="spending-account-container">
						<span>Wellness Spending Account</span>
						<div>
							<div class="total-container">
								<div>Total: <span>S$ {{company_properties.total_medical_wellness_allocation}}</span></div>
							</div>
							<div class="alocated-container">
								<div>Allocated: <span>S$ {{company_properties.total_wellness_employee_allocated}}</span></div>
							</div>
							<div class="unalocated-container">
								<div>Unallocated: <span>S$ {{company_properties.total_medical_wellness_unallocation}}</span></div>
							</div>
						</div>
					</div>
				</div>
				<div class="employee-search-container">
					<span>{{employees.length}} Employee</span>
					<div>
						<!-- <form > -->
							<input type="text" placeholder="Search Employee" v-model="search" @keyup.enter="searchEmployee()">
							<i v-if="!search" class="fa fa-search"></i>
							<i v-if="search" class="fa fa-times" @click="removeSearchEmp()"></i>
						<!-- </form> -->
					</div>
				</div>
			</div>
			<div class="cred-details-wrapper">
				<!-- dri mag v-for -->
				<div v-for="(emp) in employees" :key="emp.user_id" class="cred-emp-wrapper">
					<div class="cred-header-container">
						<span>{{emp.name}}</span>
					</div>
					<div class="cred-body-container">
						<div class="email-address-container">
							<label>Email Address:</label>
							<span v-if="emp.name != ''">{{emp.email}}</span>
							<span v-if="emp.email == ''">N/A</span>
						</div>
						<div class="job-title-container">
							<label>Job Title:</label>
							<span>Marketing</span>
						</div>
						<div class="credit-allocation-container">
							<label>Credit Allocation:</label>
							<div class="credit-allocation-btn-container">
								<button v-bind:class="{'active' : emp.creditAllocSpendingType == 0}" @click="setSpendType(0, emp)">Medical</button>
								<button v-bind:class="{'active' : emp.creditAllocSpendingType == 1}" @click="setSpendType(1, emp)">Wellness</button>
							</div>
							<div class="allocated-spent-wrapper">
								<div class="allocated-spent-container">
									<div>
										<span v-if="emp.creditAllocSpendingType === 0">S$ {{emp.spending_account.medical.credits_allocation}}</span>
										<span v-if="emp.creditAllocSpendingType === 1">S$ {{emp.spending_account.wellness.credits_allocation_wellness}}</span>
										<span>Allocated</span>
									</div>
									<div>
										<span v-if="emp.creditAllocSpendingType == 0">S$ {{emp.spending_account.medical.credits_spent}}</span>
										<span v-if="emp.creditAllocSpendingType == 1">S$ {{emp.spending_account.wellness.credits_spent_wellness}}</span>
										<span>Spent</span>
									</div>
								</div>
								<div class="trans-btn-container">
									<button v-bind:class="{'active' : emp.creditAllocTransactionType == 0}" @click="setTransType(0, emp)" class="btn-add">Add</button>
									<button v-bind:class="{'active' : emp.creditAllocTransactionType == 1}" @click="setTransType(1, emp)" class="btn-deduct">Deduct</button>
								</div>
							</div>
							<div class="credits-add-input-wrapper">
								<label>Credits to <span>{{ emp.creditAllocTransactionTypeText }}*</span> </label>
								<input v-if="emp.creditAllocTransactionType == 0" tpye="number" placeholder="0" v-model="emp.add_credit" @keyup.enter="setSelectedEmp(emp)">
								<input v-if="emp.creditAllocTransactionType == 1" tpye="number" placeholder="0" v-model="emp.deduct_credit" @keyup.enter="setSelectedEmp(emp)">
							</div>
							<div calss="update-btn-container">
								<button class="btn-update" @click="setSelectedEmp(emp)">Update</button>
								<div class="update-verification">
									<div v-if="emp.success" class="text-success">
										Success <i class="fa fa-check-circle"></i>
									</div>
									<div v-if="emp.failed" class="text-error">
										Failed <i class="fa fa-times-circle"></i>
									</div>
									<div v-if="emp.empty" class="text-error">
										Please input credits. <i class="fa fa-times-circle"></i>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="cred-allocation-pagination-wrapper">
				<div class="global-pagination">
					<div class="prev-pagination">
						<i class="fa fa-angle-left"></i>
						<!-- <img :src="'../assets/img/icons/right-arrow-angle-blue.svg'"> -->
						<!-- <span>Prev</span> -->
					</div>
					<!-- <span class="numeric-pagination active">1</span>
		      		<span class="numeric-pagination">2</span>
		      		<span class="numeric-pagination">3</span>
		      		<span class="numeric-pagination">4</span> -->
					<div class="next-pagination">
						<i class="fa fa-angle-right"></i>
						<!-- <img :src="'../assets/img/icons/right-arrow-angle-blue.svg'"> -->
						<!-- <span>Next</span> -->
					</div>
					<div class="total-item">
						<span>1 - 10 of 100</span>
					</div>
					<div class="per-page-pagination">
						<span>
		      				<span>5</span> per page
						</span>
						<i class="fa fa-angle-down"></i>
						<!-- <img :src="'../assets/img/icons/right-arrow-angle-blue.svg'"> -->
						<div v-if="false" class="per-page">
							<ul class="nav">
								<li><a href="">5</a></li>
								<li><a href="">10</a></li>
								<li><a href="">20</a></li>
								<li><a href="">50</a></li>
								<li><a href="">100</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	
		<Modal class="credit-allocation-modal" v-if="showModalPassword">
			<div slot="header">
				<h5>Input Password</h5>
			</div>
			<div slot="body">
				<input type="text" v-model="passCredit" @keyup.enter="passwordCredit(passCredit)">
			</div>
			<div slot="footer">
				<button @click="showModalPassword = false">Cancel</button>
				<button @click="passwordCredit(passCredit)" :disabled="submitState == 'Checking...' ? true:false"> 
		    			<span>{{submitState}}</span> 
		    		</button>
			</div>
		</Modal>
	</div>
</template>

<script>
import creditAllocation from "@/components/company/creditAllocation";

export default creditAllocation;
</script>