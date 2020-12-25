<template>
	<div class="claim-container" claim-directive>
		<div class="clinic-claim-wrapper">
			<!-- content here -->
			<div class="claim-content">
				<section class="clinic-claim-btn-container">
					<button class="btn-nric" @click="modalClaim.verifyUser = true">Verify User by Mobile Number</button>
					<button class="btn-manual" @click="modalClaim.manualClaims = true">Manual Claims</button>
				</section>
	
				<section class="claim-card claim-registration-container">
					<div>
						<div class="row">
							<div>
								<h4 class="card-title"><span> <!--<i class="fa fa-circle-o-notch fa-spin"></i>--> </span> Registration </h4>
							</div>
						</div>
	
						<div class="row">
							<div class="container-fluid">
								<table class="table-registration">
									<thead>
										<th>Registration Date/Time</th>
										<th>Name</th>
										<!-- <th>NRIC</th> -->
										<th>Cap Per Visit</th>
										<th>Remarks</th>
										<th>Option</th>
									</thead>
									<tbody>
										<tr>
											<td><span>26 July 2019, 06:03 pm</span></td>
											<td><span>Allan Cheam Alzula</span></td>
											<!-- <td><span>G4635143L</span></td> -->
											<td>
												<span>S$</span>
												<span>30.00</span>
											</td>
											<td><span>Pending</span></td>
											<td> <button class="option-button remove-btn">Remove</button> </td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
	
					</div>
				</section>
	
				<section class="successful-transactions">
					<div class="claim-card">
	
						<div class="successful-trans-header-container">
							<div class="col-md-3 card-title-wrapper">
								<h4 class="card-title">Successful Transactions</h4>
							</div>
							<div class="filter">
								<div class="col-md-2 search-wrapper">
									<input class="search" type="text" placeholder="Search by NRIC">
									<button class="search-icon"><i class="fa fa-search" aria-hidden="true"></i></button>
								</div>
	
								<div class="col-md-5 text-left date-wrapper">
									<div class="btn-date">
										<div class="left-icon-wrapper">
											<i class="fa fa-calendar" aria-hidden="true"></i>
										</div>
										<v-date-picker :max-date='new Date()' v-model="timeFrame.start" :input-props='{class: "activity-custom-input", placeholder: "MM/DD/YYYY", readonly: true}' popover-visibility='focus'>
										</v-date-picker>
										<div class="right-icon-wrapper">
											<i class="fa fa-chevron-down" aria-hidden="true"></i>
										</div>
									</div>
									<span class="arrow-right">
												<i class="fa fa-long-arrow-down" aria-hidden="true"></i>
												<i class="fa fa-long-arrow-right" aria-hidden="true"></i>
											</span>
									<div class="btn-date">
										<div class="left-icon-wrapper">
											<i class="fa fa-calendar" aria-hidden="true"></i>
										</div>
										<v-date-picker :max-date='new Date()' v-model="timeFrame.end" :input-props='{class: "activity-custom-input", placeholder: "MM/DD/YYYY", readonly: true}' popover-visibility='focus'>
										</v-date-picker>
										<div class="right-icon-wrapper">
											<i class="fa fa-chevron-down" aria-hidden="true"></i>
										</div>
									</div>
								</div>
							</div>
						</div>
	
						<div class="row">
							<div class="container-fluid">
								<table class="table-successfulTransaction table-hover">
									<thead>
										<th>Registration Date/Time</th>
										<th>Payment Date/Time</th>
										<th>Transaction ID</th>
										<th>Name</th>
										<th>Mobile Number</th>
										<th>Service</th>
										<th>Mednefits Fee</th>
										<th>Mednefits Credit</th>
										<th>Cash</th>
										<th>Option</th>
									</thead>
									<tbody>
										<tr>
											<!-- <td colspan="10" class="text-center">No Transactions found</td> -->
										</tr>
										<tr>
											<td>01 April 2019, 03:57pm</td>
											<td>04 April 2019, 03:57pm</td>
											<td>MED013675</td>
											<td>Kum Kin Cheong</td>
											<td>+65 10101010</td>
											<td>Medicine & Treatment</td>
											<td>
												<span>S$<span></span></span>
												<span>RM<span></span></span>
											</td>
											<td>
												<span>S$<span></span></span>
												<span>RM<span></span></span>
											</td>
											<td>
												<span>S$<span></span></span>
												<span>RM<span></span></span>
											</td>
											<td>
												<button class="option-button remove-btn">Cancel</button>
												<button v-if="false" class="option-button mybg-red">Cancel</button>
	
												<label v-if="false" class="option-label removed">Removed</label>
												<label v-if="false" class="option-label refunded">Refunded</label>
											</td>
										</tr>
	
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</section>
	
				<section v-if="false">
					<!-- Modals -->
					<!-- <div id="modalNRIC" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myNRICModalLabel">
								<div class="modal-dialog" role="document">
									<div class="modal-content nric-modalWrapper">
										<div class="container nric-wrapper">
											<div class="row">
												<div class="col-md-11 nric-tittle-wrapper">
													<h4 class="nric-title">Verify User by NRIC
														<i class="fa fa-times" data-dismiss="modal"></i>
													</h4>
												</div>
											</div>
											<div class="row nric-content-wrapper">
												<form>
													<div class="col-md-5 search-box">
														<input class="form-control text-strong" type="text" placeholder="Search" ng-model="search_member">
													</div>
													<div class="col-md-3 search-button">
														<button class="btn btn-lg">Search</button>
													</div>
												</form>
											</div>
											<div class="row nric-content-wrapper">
												<div class="col-md-11">
													<table class="table-nric">
														<thead>
															<tr>
																<th>Name</th>
																<th>NRIC</th>
															</tr>
														</thead>
														<tbody>
															<tr>
																<td>Alfred</td>
																<td>G8472947H</td>
															</tr>
														</tbody>
													</table>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div> -->
	
					<!-- modal Manual -->
					<!-- <div id="modalManual" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myManualModalLabel">
								<div class="modal-dialog modal-sm" role="document">
									<div class="modal-content manual-modalWrapper">
										<div class="container-fluid manual-wrapper">
											<div class="row">
												<div class="container-fluid manual-tittle-wrapper">
													<h4 class="manual-title">Manual Claim <i class="fa fa-times" data-dismiss="modal"></i></h4>
												</div>
											</div>
											<div class="row">
												<div class="container-fluid manual-content-wrapper">
		
													<table class="table-manual">
														<thead>
															<tr>
																<th>NRIC</th>
																<th>Service</th>
																<th>Date of Visit</th>
																<th>Time of Visit</th>
																<th>Cash</th>
																<th>Option</th>
															</tr>
														</thead>
														<tbody>
															<tr>
																<td>
																	<input class="manual-form" type="text" placeholder="Search NRIC">
																	<div class="nric-drop">
																		<div class="nric-list">
																			<div class="img-wrapper">
																				<img :src="''">
																			</div>
																			<div class="details">
																				<p>Lorem Ipsum</p>
																				<p>email.com</p>
																				<p class="nric">NRIC</p>
																				<p>
																					<span>Corporate User</span>
															            <span>Invidual User</span>
															            <span>Dependent User</span>
															            <span>Dependent User</span>
																				</p>
																			</div>
																		</div>
																	</div>
																</td>
																<td class="service-td">
																	<input class="manual-form" type="text" placeholder="Select Procedure">
																	<input class="manual-form" type="text" placeholder="Select Procedure">
																	<div class="service-drop">
																		<div class="service-list">
																			<span></span>
																			<span class="remove-span"><i class="fa fa-times"></i></span>
																		</div>
																	</div>
																</td>
																<td>
																	<div class="manual-form date">
																		<input type="text" class="datepicker">
																		<div class="icon-wrapper">
																			<i class="fa fa-calendar" aria-hidden="true"></i>
																		</div>
																	</div>
																</td>
																<td class="datepicker-td">
																	<div class="manual-form time">
																		<div class="left-icon-wrapper">
																			<i class="fa fa-clock-o" aria-hidden="true"></i>
																		</div>
																		<input type="text">
																		<div class="right-icon-wrapper cursor-pointer">
																			<span>AM</span>
																		</div>
																	</div>
		
																	<div class="timepicker-container">
																		<div class="top">
																			<div class="arrow">
																				<i class="fa fa-caret-up"></i>
																			</div>
																			<div class="divider">
																			</div>
																			<div class="arrow">
																				<i class="fa fa-caret-up"></i>
																			</div>
																		</div>
																		<div class="middle">
																			<div class="hour-wrapper">
																				<span>0</span><span>01</span>
																			</div>
																			<div class="divider">
																				:
																			</div>
																			<div class="minute-wrapper">
																				<span>0</span><span>59</span>
																			</div>
																		</div>
																		<div class="bottom">
																			<div class="arrow">
																				<i class="fa fa-caret-down"></i>
																			</div>
																			<div class="divider">
																			</div>
																			<div class="arrow">
																				<i class="fa fa-caret-down"></i>
																			</div>
																		</div>
																	</div>
		
																	<div class="daytime-container">
																		<div class="daytime">AM</div>
																		<div class="daytime">PM</div>
																	</div>
																</td>
																<td>
																	<input valid-number class="manual-form" type="text"> 
																	<span class="SgDollar">S$</span>
																	<span class="SgDollar">RM</span>
																</td>
																<td>
																	<button class="btn btn-lg">Submit</button>
																</td>
															</tr>
														</tbody>
													</table>
		
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
		
							<div class="modal fade" id="check-claim-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
							  <div class="modal-dialog" role="document">
							  	<div class="modal-content isNotDoneChecking">
							  		<p>
							  			<i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
							  		</p>
							  		<p>
							  			Checking...
							  		</p>
							  	</div>
						      <div class="modal-content isDoneChecking" style="" hidden>
						      	<div class="modal-header">
						      		You have similar transactions with this user.
						      		<p>Please check and make sure it is not a duplicate claim entry.</p>
							      </div>
						        <div class="modal-body">
						        	<div class="your-transaction">
						        		<p>Your transaction </p>
						        		<p><label>Name:</label> <span>Allan Alzula</span></p>
						        		<p>
						        			<label>Service:</label> 
						        			<span>
						        				<span>Dental</span>
						        				<span>,</span>
						        			</span>
						        		</p>
						        		<p><label>Date:</label> <span>Jun 14,2016</span></p>
						        		<p><label>Amount:</label> <span>S$</span><span>RM</span><span>50.00</span></p>
						        		<p><label>Type:</label> <span>Cash</span></p>
						        	</div>
		
						        	<div class="other-transaction">
						        		<p>Similar transactions </p>
		
						        		<div class="similar">
							        		<p><label>Name:</label> <span>Allan Alzula</span></p>
							        		<p><label>Service:</label> <span>Dental</span></p>
							        		<p><label>Date:</label> <span>Jun 14,2016</span></p>
							        		<p><label>Amount:</label> <span></span><span>50.00</span></p>
							        		<p><label>Type:</label> <span>Cash</span></p>
						        		</div>
						        	</div>
						        </div>
						        <div class="modal-footer">
							      	<button class="btn btn-primary" data-dismiss="modal" >Cancel</button>
							      	<button class="btn btn-success">Proceed</button>
								    </div>
						      </div>
						    </div>
							</div>
		
							<div class="modal fade" id="summary-claim-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
							  <div class="modal-dialog" role="document">
						      <div class="modal-content">
						      	<div class="modal-header">
						      		<p>Please check your claim before you proceed.</p>
							      </div>
						        <div class="modal-body">
						        	<div class="top-content">
						        		<div class="row-summary">
						        			<div class="img-wrapper">
						        				<img :src="''">
						        			</div>
						        			<p><label>Transaction ID:</label> <span>ELYDI8</span></p>
						        		</div>
						        		<div class="row-summary">
						        			<div class="img-wrapper">
						        				<img :src="''">
						        			</div>
						        			<p><label>Transaction Date:</label> <span>15 April 2019, 11:49am</span></p>
						        		</div>
						        	</div>
						        	<div class="middle-content">
						        		<div class="column-details">
						        			<label>Member</label>
						        			<p>Terinn Teo</p>
						        		</div>
						        		<div class="column-details">
						        			<label>NRIC</label>
						        			<p>S345D3</p>
						        		</div>
						        		<div class="column-details">
						        			<label>Payment Type</label>
						        			<p>Cash</p>
						        		</div>
						        		<div class="column-details">
						        			<label>Currency Type</label>
						        			<p>MYR</p>
						        		</div>
						        	</div>
						        	<div class="bottom-content">
						        		<div class="item">
							        		<label>Item/Service</label>
							        		<div class="item-content">	
							        			<div class="img-wrapper">
							        				<img :src="''">
							        			</div>
							        			<p>Lorem Ipsum</p>
							        		</div>
						        		</div>
		
						        		<div class="item2">
						        			<label>Cash:</label> 
						        			<p>
						        				<span>S$</span> 
						        				<span>RM</span> 
						        				<span>15.00</span>
						        			</p>
						        		</div>
						        	</div>
						        </div>
						        <div class="modal-footer">
							      	<button class="btn btn-cancel-claim" data-dismiss="modal">Cancel</button>
						      		<button class="btn">Proceed</button>
								    </div>
						      </div>
						    </div>
							</div>
		
							<div class="modal fade" id="e-card-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
							  <div class="modal-dialog" role="document">
							    <div class="modal-content">
							      <div class="modal-body">
							      	<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		
							      	<div class="ecard-container">
								      	<img :src="''">
								      	<p>Allan Cheam Alzula</p>
								      	<p >Member ID : <span>5685</span> </p>
								      	<p><span>Corporate</span></p>
								      	<p>Company : <span>Allan Test</span></p>
								      	<p>Start Date : <span>04 September 2017</span></p>
								      	<p>Valid Thru : <span>31 July 2018</span></p>
								      	<p>Your Basic Coverage</p>
								      	<div class="coverage-box">
								      		<div class="cov-item">
								      			<div class="col-md-4"></div>
								      			<div class="col-md-6"></div>
								      		</div>
								      	</div>
							      	</div>
							      </div>
							    </div>
							  </div>
							</div> -->
	
				</section>
	
	
				<div>
					<Modal class="verify-user-modal" v-if="modalClaim.verifyUser">
						<div slot="header" class="verify-user-header-container">
							<h4>Verify User by Mobile Number</h4>
							<i @click="modalClaim.verifyUser = false" class="fa fa-times"></i>
						</div>
						<div slot="body">
							<div class="verfiy-user-body-modal">
								<input type="text" placeholder="Search">
								<button>Search</button>
							</div>
							<table class="table-nric">
								<thead>
									<tr>
										<th>Name</th>
										<th>Mobile Number</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>
											<span>Alfred</span>
										</td>
										<td>
											<span>+65 84729471</span>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</Modal>
	
					<Modal class="manual-claim-modal" v-if="modalClaim.manualClaims">
						<div slot="header" class="verify-user-header-container">
							<h4>Manual Claim</h4>
							<i @click="modalClaim.manualClaims = false" class="fa fa-times"></i>
						</div>
						<div slot="body">
							<div class="manual-claim-body-modal">
								<table class="table-manual">
									<thead>
										<tr>
											<th>Mobile Number</th>
											<th>Service</th>
											<th>Date of Visit</th>
											<th>Time of Visit</th>
											<th>Cash</th>
											<th>Option</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>
												<div>
													<span class="manual-head-text-input">Mobile Number</span>
													<input type="text" placeholder="Search Mobile number">
													<div v-if="false" class="nric-list-container" @click="modalClaim.eCardModal = true">
														<div class="img-wrapper">
															<img :src="'https://res.cloudinary.com/www-medicloud-sg/image/upload/v1427972951/ls7ipl3y7mmhlukbuz6r.png'">
														</div>
														<div class="details">
															<div>
																<span>Shan Yin Yow</span>
															</div>
															<div>
																<span>nicoleyow@asiamalls.com.sg</span>
															</div>
															<div class="nric">
																<span>+65 88699851</span>
															</div>
															<div>
																<span>Corporate User</span>
															</div>
														</div>
													</div>
												</div>
											</td>
											<td>
												<div class="select-procedure-container">
													<span class="manual-head-text-input">Service</span>
													<input @click="handleSelectService" v-model="manualClaimData.service" type="text" placeholder="Select Procedure" readonly="readonly">
													<div v-if="serviceDropdown" class="service-dropdown">
														<div class="service-list">
															<span> 
																	<a @click="handleSelectedDropdown('service', 'Consultation')">Consultation</a>
																</span>
															<span v-if="manualClaimData.service != undefined">
					         									<i @click="handleDelete('service')" class="fa fa-times"></i>
					         							</span>
														</div>
														<div class="service-list">
															<span> 
																	<a @click="handleSelectedDropdown('service', 'Sample Service')">Sample Service</a>
																</span>
															<span v-if="manualClaimData.service != undefined">
					         									<i @click="handleDelete('service')" class="fa fa-times"></i>
					         							</span>
														</div>
													</div>
												</div>
											</td>
											<td>
												<span class="manual-head-text-input">Date of Visit</span>
												<div class="calendar-input-wrapper">
													<v-date-picker :max-date='new Date()' v-model="timeFrame.end" :input-props='{class: "activity-custom-input", placeholder: "MM/DD/YYYY", readonly: true}' popover-visibility='focus'>
													</v-date-picker>
													<div>
														<i class="fa fa-calendar" aria-hidden="true"></i>
													</div>
												</div>
											</td>
											<td>
												<span class="manual-head-text-input">Time of Visit</span>
												<div class="time-visit-input-wrapper">
													<div>
														<i class="fa fa-clock-o" aria-hidden="true"></i>
													</div>
													<input type="text">
													<div class="am-pm-container">
														<span>AM</span>
													</div>
	
													<div v-if="false" class="am-pm-dropdown-container">
														<span>AM</span>
														<span>PM</span>
													</div>
	
													<div v-if="false" class="timepicker-container">
														<div class="top">
															<div class="arrow">
																<i class="fa fa-caret-up"></i>
															</div>
															<div class="divider">
															</div>
															<div class="arrow">
																<i class="fa fa-caret-up"></i>
															</div>
														</div>
														<div class="middle">
															<div class="hour-wrapper">
																<span>11</span>
															</div>
															<div class="divider">
																:
															</div>
															<div class="minute-wrapper">
																<span>34</span>
															</div>
														</div>
														<div class="bottom">
															<div class="arrow">
																<i class="fa fa-caret-down"></i>
															</div>
															<div class="divider">
															</div>
															<div class="arrow">
																<i class="fa fa-caret-down"></i>
															</div>
														</div>
													</div>
												</div>
											</td>
											<td>
												<span class="manual-head-text-input">Cash</span>
												<div class="cash-input-wrapper">
													<input type="text">
													<span>S$</span>
												</div>
											</td>
											<td>
												<div>
													<button @click="modalClaim.checkClaims = true">Submit</button>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</Modal>
	
					<Modal class="ecard-modal" v-if="modalClaim.eCardModal">
						<div slot="body">
							<i @click="modalClaim.eCardModal = false" class="fa fa-times"></i>
							<div class="ecard-container">
								<img :src="'../assets/img/mednefits_icon_blue.png'">
								<div class="ecard-full-name">Shan Yin Yow</div>
								<div>
									Member ID : <span>21755</span>
								</div>
								<div>
									Mednefits Care : <span>Bundle Pro</span>
								</div>
								<div>
									Company : <span>AsiaMalls Management Pte Ltd</span>
								</div>
								<div>
									Start Date : <span>01 January 2019</span>
								</div>
								<div>
									Valid Thru : <span>31 December 2019</span>
								</div>
								<div>Your Basic Coverage</div>
								<div class="coverage-box">
									<div class="cov-item">
										<div>Outpatient GP</div>
										<div>Consultation: S$0, covered by us. Medicine &amp; Treatment: Pay using Mednefits Credits.</div>
									</div>
									<div class="cov-item">
										<div>Health Screening</div>
										<div>1 complimentary basic health screening per year</div>
									</div>
									<div class="cov-item">
										<div>Health Specialist</div>
										<div>Save up to 60% on consultation.</div>
									</div>
									<div class="cov-item">
										<div>Wellness Benefits</div>
										<div>Save up to 40% on wellness services.</div>
									</div>
									<div class="cov-item">
										<div>Dental Care</div>
										<div>Up to 30% off dental services.</div>
									</div>
									<div class="cov-item">
										<div>TCM</div>
										<div>100% consultation covered by Mednefits. You only need to pay for medicine</div>
									</div>
								</div>
							</div>
						</div>
					</Modal>
	
					<Modal class="check-claims-modal" v-if="modalClaim.checkClaims">
						<div slot="header">
							<div class="check-claim-header-container">
								<p>You have similar transactions with this user.</p>
								<p>Please check and make sure it is not a duplicate claim entry.</p>
							</div>
						</div>
						<div slot="body">
							<div class="your-transaction">
								<div class="transaction-title">
									<span>Your transaction</span>
								</div>
								<div>
									<label>Name: </label>
									<span>Dhonald Lite</span>
								</div>
								<div>
									<label>Service:</label>
									<span></span>
								</div>
								<div>
									<label>Date: </label>
									<span>25 July 2019</span>
								</div>
								<div>
									<label>Amount: </label>
									<span>S$ </span>
									<span>10.00</span>
								</div>
								<div>
									<label>Type: </label>
									<span class="type-text">Cash</span>
								</div>
							</div>
							<div class="other-transaction">
								<div class="transaction-title">
									<span>Similar transaction</span>
								</div>
								<div class="other-transac-info-container">
									<div>
										<label>Name: </label>
										<span>Dhonald Lite</span>
									</div>
									<div>
										<label>Service: </label>
										<span>Consultation and Sample Service</span>
									</div>
									<div>
										<label>Date: </label>
										<span>25 July 2019, 09:29am</span>
									</div>
									<div>
										<label>Amount: </label>
										<span>S$ </span>
										<span>14.11</span>
									</div>
									<div>
										<label>Type: </label>
										<span class="type-text">Credits</span>
									</div>
								</div>
							</div>
						</div>
						<div slot="footer">
							<button @click="modalClaim.checkClaims = false">Cancel</button>
							<button>Proceed</button>
						</div>
					</Modal>
	
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import claim from '@/components/clinic/claim'
export default claim
</script>