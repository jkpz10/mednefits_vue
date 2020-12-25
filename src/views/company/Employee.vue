<template>
	<div class="employee-wrapper">
		<!-- Employee Overview Table -->
		<div class="overview-wrapper">
			<div class="employee-overview-header">
				<div class="overview-title">
					<h1>Employee Overview</h1>
					<h4>
						<span>{{member_count}}</span> total members
					</h4>
				</div>
				<div class="overview-menu">
					<div class="overview-input-wrapper">
						<input type="text" @keyup.enter="searchEmployee(inputSearch)" v-model="inputSearch" placeholder="Search member">
						<img v-if="!inputSearch" class="magnifying-img" :src="'../assets/img/icons/magnifying-glass.png'">
						<img v-if="inputSearch" @click="removeSearchEmp()" class="magnifying-img" :src="'../assets/img/icons/close-blue.svg'">
					</div>
					<button class="btn-export-members">
						<img class="download-img" :src="'../assets/img/coverage/Download.png'">
						<span class="export-text">Export </span> <span class="members-text">members details</span> 
					</button>
					<button @click="toEnrollment('enrollment')" class="btn-enroll-employees">
						Enroll <span>employees</span> 
					</button>
				</div>
			</div>
			<div class="employee-overview-table">
				<table>
					<thead>
						<tr>
							<th class="name-title">
								Name
								<div class="name-chevron-icon">
	
								</div>
							</th>
							<th class="status-title">Status</th>
							<th class="nric-fin-title">Mobile Number</th>
							<th class="plan-details-title">Plan details</th>
							<th class="family-coverage-title">Family coverage</th>
							<th class="spending-account-medical-title">
								Spending account <span>(medical)</span>
							</th>
							<th class="spending-account-wellness-title">
								Spending account <span>(wellness)</span>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(emp, index) in employees.data" :key="emp.member_id">
							<a @click="singleEmployee(index)">
								<td class="emp-name-container">
									<strong>{{emp.name}}</strong>
								</td>
								<td class="status-details-container">
									<div class="status-details" v-if="emp.account_status && emp.emp_status == 'pending'">
										<span class="status-color pending"></span>
										<span>Pending</span>
									</div>
									<div class="status-details" v-if="emp.account_status && emp.emp_status == 'active' || emp.account_status && emp.schedule">
										<span class="status-color active"></span>
										<span>Active</span>
									</div>
									<div class="status-details" v-if="!emp.account_status || emp.emp_status == 'deleted'">
										<span class="status-color removed"></span>
										<span>Removed</span>
									</div>
									<div class="status-expired-details" v-if="emp.deletion || emp.schedule">
										<span>{{emp.deletion_text}}</span>
									</div>
									<!-- <div class="status-expired-details">
													<span>Removed on 14/03/2019</span>
												</div> -->
								</td>
								<td class="nric-fin-container">{{emp.phone_no}}</td>
								<td class="plan-start-container">
									<span>{{emp.plan_tier? emp.plan_tier.plan_tier_name: ''}}</span>
									<div class="plan-details">
										<strong>Plan type:</strong>
										<span>{{emp.plan_name}}</span>
									</div>
									<div class="plan-details">
										<strong>Start date:</strong>
										<span>{{emp.start_date}}</span>
									</div>
								</td>
								<td class="family-coverage-container">
									<div class="family-dependent-details">
										<strong>Dependent:</strong>
										<span>{{emp.dependents}}</span>
									</div>
								</td>
								<td class="medical-details-container">
									<div class="medical-details">
										<strong>Allocation:</strong>
										<span>S$ <span>{{emp.spending_account.medical.credits_allocation}}</span></span>
									</div>
									<div class="plan-details">
										<strong>Balance:</strong>
										<span>S$ <span>{{emp.spending_account.medical.balance}}</span></span>
									</div>
								</td>
								<td class="wellness-details-container">
									<div class="wellness-details">
										<strong>Allocation:</strong>
										<span>S$ <span>{{emp.spending_account.wellness.credits_allocation_wellness}}</span></span>
									</div>
									<div class="wellness-details">
										<strong>Balance:</strong>
										<span>S$ <span>{{emp.spending_account.wellness.balance}}</span></span>
									</div>
								</td>
							</a>
						</tr>
					</tbody>
				</table>
			</div>
			<div v-if="!isSearchEmp" class="employee-pagination-wrapper">
				<div class="global-pagination">
					<div class="prev-pagination" :class="{notAllowed : !employees.hasPrevPage}">
						<i @click="employeePagination('prev')" class="fa fa-angle-left"></i>
						<!-- <img :src="'../assets/img/icons/right-arrow-angle-blue.svg'"> -->
						<!-- <span>Prev</span> -->
					</div>
					<!-- <span class="numeric-pagination active">1</span>
		        		<span class="numeric-pagination">2</span>
		        		<span class="numeric-pagination">3</span>
		        		<span class="numeric-pagination">4</span> -->
					<div class="next-pagination" :class="{notAllowed : !employees.hasNextPage}">
						<i @click="employeePagination('next')" class="fa fa-angle-right"></i>
						<!-- <img :src="'../assets/img/icons/right-arrow-angle-blue.svg'"> -->
						<!-- <span>Next</span> -->
					</div>
					<div class="total-item">
						<span>{{employees.pagingCounter}} - {{employees.limit}} of {{employees.totalDocs}}</span>
					</div>
					<div class="per-page-pagination">
						<span @click="perPage()">
		        				<span>{{page_ctr}}</span> per page
						</span>
						<i @click="perPage()" class="fa fa-angle-down"></i>
						<!-- <img :src="'../assets/img/icons/right-arrow-angle-blue.svg'"> -->
						<div @mouseleave="perPage()" v-if="paginationDropdown" class="per-page">
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
	</div>
</template>

<script>
import employee from "@/components/company/employee";

export default employee;
</script>

