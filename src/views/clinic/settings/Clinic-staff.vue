<template>
	<div class="clinic-staff-wrapper">
		<div class="staff-side-list" id="staff-side-wrapper">

			<div>
				<i @click="closeLeftContainer()" class="fa fa-times"></i>
			</div>

			<div class="staff-header-list">
				<span>1 Doctors</span>
				<div class="add-img-container">
					<a @click="btnAddDoctor()">
						<img :src="'../assets/img/ico_add new.svg'">
					</a>

					<div v-if="showAddDoctorTooltip" class="doctor-tooltip">
						<div class="arrow"></div>
						<h3>Add New Doctor</h3>
						<div class="tooltip-content">
							<input type="text" placeholder="Doctor Name">
							<input type="text" placeholder="Doctor Email">
							<div class="tooltip-btn-container">
								<button class="btn-add-doctor">Add Doctor</button>
								<button class="btn-cancel">Cancel</button>
							</div>
						</div>
					</div>

				</div>
			</div>

			<div class="staff-doctor-list-container">
				<div class="staff-doctor-container">
					<img :src="'../assets/img/doctor.png'">
					<span>gp@gmail.com</span>
				</div>
			</div>

		</div>
		<div class="detail-wrapper" id="staff-detail-wrapper">
			<div class="detail-header-container">
				<ul>
					<li>
						<a @click="sideBarCollapse(0)">
							<i class="fa fa-bars" ></i>
						</a>
					</li>
					<li>
						<a v-bind:class="{'active': detail_active.value === 0}" @click="selectDetail('0','details')">DETAILS</a>
					</li>
					<li>
						<a v-bind:class="{'active': detail_active.value === 1}" @click="selectDetail('1','services')">SERVICES</a>
					</li>
					<li>
						<a v-bind:class="{'active': detail_active.value === 2}" @click="selectDetail('2','working-hours')">WORKING HOURS</a>
					</li>
					<li>
						<a v-bind:class="{'active': detail_active.value === 3}" @click="selectDetail('3','breaks')">BREAKS</a>
					</li>
					<li>
						<a v-bind:class="{'active': detail_active.value === 4}" @click="selectDetail('4','time-off')">TIME-OFF</a>
					</li>
				</ul>

				<ul class="staff-select-header-wrapper">
					<li>
						<a @click="sideBarCollapse(0)">
							<i class="fa fa-bars" ></i>
						</a>
					</li>
					<li>
						<select v-model="detail_active.value">
							<option value="0">DETAILS</option>
							<option value="1">SERVICES</option>
							<option value="2">WORKING HOURS</option>
							<option value="3">BREAKS</option>
							<option value="4">TIME-OFF</option>
						</select>
					</li>
				</ul>

				<span class="trash-img-container">
					<a @click="btnDeleteDoctor()">
						<i class="fa fa-trash" aria-hidden="true"></i>
					</a>
					<div v-if="showDeleteDoctorTooltip" class="doctor-tooltip">
						<div class="arrow"></div>
						<h3>Are you sure?</h3>
						<div class="tooltip-btn-container">
							<button class="btn-delete">Delete</button>
							<button class="btn-cancel">Cancel</button>
						</div>
					</div>
				</span>	
			</div>

			<div class="detail-body-container">
				<div v-if=" detail_active.value === '0' " class="details-info-container">
					<div>
						<div class="clinic-row-container">
							<div>
								<img :src="'../assets/img/img-portfolio-place.png'">
							</div>
							<div>
								<input type="text" placeholder="Doctor Name">
							</div>
						</div>
						<div class="clinic-row-container">
							<div class="text-label">
								<span>Qualification</span>
							</div>
							<div>
								<input type="text" placeholder="Doctor Qualification">
							</div>
						</div>
						<div class="clinic-row-container">
							<div class="text-label">
								<span>Designation</span>
							</div>
							<div>
								<input type="text" placeholder="Doctor Designation">
							</div>
						</div>
						<div class="clinic-row-container">
							<div class="text-label">
								<span>Mobile</span>
							</div>
							<div class="phone-number-input-wrapper">
								<vue-tel-input ref="areaCode" v-bind="telProps" @input="setAreaCode"></vue-tel-input>
								<!-- <span @click="btnCountryCode()" class="input-group-addon">+65</span>
								<input type="text" placeholder="Phone Number">
								<ul v-if="showCountryCodeList" class="dropdown-menu">
									<li>
										<span>Afghanistan</span>
										<span>+358</span>
									</li>
								</ul> -->
							</div>
						</div>
						<div class="clinic-row-container">
							<div class="text-label">
								<span>Email</span>
							</div>
							<div>
								<input type="text" placeholder="Example@gmail.com">
							</div>
						</div>
						<div class="clinic-row-container">
							<div class="text-label">
								<span>CS Emails to</span>
							</div>
							<div>
								<input type="text" placeholder="Doctor CC E-Mail">
							</div>
						</div>
						<div class="clinic-row-container btn-update-container line-break">
							<div></div>
							<div>
								<button class="btn-staff">Update</button>
							</div>
						</div>
						<div class="clinic-row-container pin-container line-break">
							<div class="text-label">
								<span>PIN</span>
							</div>
							<div>
								<input class="" type="text" placeholder="4 Digit PIN">
								<button class="btn-staff">Enter</button>
							</div>
						</div>
						<div class="clinic-row-container google-sync-container line-break">
							<div class="text-label">
								<span>Google Sync</span>
							</div>
							<label class="clinic-switch-container">
			          <input type="checkbox" checked="">
			          <span class="slider">
			            <span class="off">On</span>
			            <span class="on">Off</span>
			          </span>
			        </label>
						</div>
					</div>
				</div>

				<div v-if="detail_active.value === '1' " class="services-info-container">
					<div class="detail-body-info-header">
						<div>
							<img :src="'../assets/img/clinic/ico_Profile.svg'">
						</div>
						<div>
							<h1>Services You Provide:</h1>
							<router-link :to="{ name: 'ClinicServices' }">
								<button>Add Service</button>
							</router-link>
						</div>
					</div>

					<div class="services-body-container">
						<div class="services-row-container">
							<div>
								<input type="checkbox" name="">
							</div>
							<div class="select-all-services-text">
								<span>Select All Services</span>
							</div>
						</div>

						<div class="services-row-container">
							<div class="right-container">
								<div>
									<input type="checkbox" name="">
								</div>
								<div>
									<span>consultation</span>
								</div>
							</div>

							<div class="left-container">
								<div>
									<span>30 mins</span>
								</div>
								<div>
									<span>10</span>
								</div>
							</div>
						</div>

						<div class="services-row-container">
							<div class="right-container">
								<div>
									<input type="checkbox" name="">
								</div>
								<div>
									<span>sample device</span>
								</div>
							</div>

							<div class="left-container">
								<div>
									<span>30 mins</span>
								</div>
								<div>
									<span>0</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div v-if="detail_active.value === '2' " class="working-hours-info-container">
					<div class="detail-body-info-header">
						<div>
							<img :src="'../assets/img/clinic/ico_Profile.svg'">
						</div>
						<div>
							<h1>Working Hours for you:</h1>
						</div>
					</div>
					<div class="working-hour-body-wrapper">
						<div></div>
						<div class="working-hour-body-container">
							<div v-for="( list ) in weekDayNames" class="working-row-container" :key="list.index">
								<div class="day-container">
									<span>{{ list }}</span>
								</div>
								<label class="clinic-switch-container">
				          <input type="checkbox" checked="">
				          <span class="slider">
				            <span class="off">On</span>
				            <span class="on">Off</span>
				          </span>
				        </label>
								<div class="timepicker-container">
									<div>
										<!-- <span v-if="false">08:00AM</span>
										<ul v-if="false" class="dropdown-menu">
											<li>
												<a>12:00 AM</a>
											</li>
											<li>
												<a>01:00 AM</a>
											</li>
											<li>
												<a>02:00 AM</a>
											</li>
											<li>
												<a>03:00 AM</a>
											</li>
											<li>
												<a>04:00 AM</a>
											</li>
											<li>
												<a>05:00 AM</a>
											</li>
											<li>
												<a>06:00 AM</a>
											</li>
											<li>
												<a>07:00 AM</a>
											</li>
											<li>
												<a>09:00 AM</a>
											</li>
											<li>
												<a>10:00 AM</a>
											</li>
											<li>
												<a>11:00 AM</a>
											</li>
											<li>
												<a>12:00 PM</a>
											</li>
											<li>
												<a>01:00 PM</a>
											</li>
											<li>
												<a>02:00 PM</a>
											</li>
											<li>
												<a>03:00 PM</a>
											</li>
											<li>
												<a>04:00 PM</a>
											</li>
											<li>
												<a>05:00 PM</a>
											</li>
											<li>
												<a>06:00 PM</a>
											</li>
											<li>
												<a>07:00 PM</a>
											</li>
											<li>
												<a>08:00 PM</a>
											</li>
											<li>
												<a>09:00 PM</a>
											</li>
											<li>
												<a>10:00 PM</a>
											</li>
											<li>
												<a>11:00 PM</a>
											</li>
										</ul> -->
										<select>
											<option v-for="time in hoursPerday" :key="time.index">{{time}}</option>
										</select>
									</div>
									
									<span>to</span>
									<div>
										<!-- <span v-if="false">05:30PM</span>
										<ul v-if="false" class="dropdown-menu">
											<li>
												<a>12:00 AM</a>
											</li>
											<li>
												<a>01:00 AM</a>
											</li>
											<li>
												<a>02:00 AM</a>
											</li>
											<li>
												<a>03:00 AM</a>
											</li>
											<li>
												<a>04:00 AM</a>
											</li>
											<li>
												<a>05:00 AM</a>
											</li>
											<li>
												<a>06:00 AM</a>
											</li>
											<li>
												<a>07:00 AM</a>
											</li>
											<li>
												<a>09:00 AM</a>
											</li>
											<li>
												<a>10:00 AM</a>
											</li>
											<li>
												<a>11:00 AM</a>
											</li>
											<li>
												<a>12:00 PM</a>
											</li>
											<li>
												<a>01:00 PM</a>
											</li>
											<li>
												<a>02:00 PM</a>
											</li>
											<li>
												<a>03:00 PM</a>
											</li>
											<li>
												<a>04:00 PM</a>
											</li>
											<li>
												<a>05:00 PM</a>
											</li>
											<li>
												<a>06:00 PM</a>
											</li>
											<li>
												<a>07:00 PM</a>
											</li>
											<li>
												<a>08:00 PM</a>
											</li>
											<li>
												<a>09:00 PM</a>
											</li>
											<li>
												<a>10:00 PM</a>
											</li>
											<li>
												<a>11:00 PM</a>
											</li>
										</ul> -->
										<select>
											<option v-for="time in hoursPerday" :key="time.index">{{time}}</option>
										</select>
									</div>	
								</div>
							</div>
						</div>
					</div>
				</div>

				<div v-if="detail_active.value === '3' " class="breaks-body-info-wrapper">
					<div class="detail-body-info-header">
						<div>
							<img :src="'../assets/img/clinic/ico_Profile.svg'">
						</div>
						<div>
							<h1>Breaks for you:</h1>
						</div>
					</div>

					<div class="breaks-body-info-container">

						<div v-for="( list, index1 ) in  dayBreakNames" class="working-row-container" :key="list.index">
							<div class="day-container">
								<span>{{ list.day }}</span>
							</div>
							<div>
								<button @click="btnAddBreak(index1, list.day)">Add Break</button>
							</div>
							<div v-if="list.staffBreaktimePicker.length != 0" class="break-timepicker-wrapper">
								<div>
									<div v-for="(select,index2) in list.staffBreaktimePicker"  :key="select.index" class="timepicker-container">
										<div>
											<!-- <span v-if="false">08:00AM</span>
											<ul v-if="false" class="dropdown-menu">
												<li>
													<a>12:00 AM</a>
												</li>
												<li>
													<a>01:00 AM</a>
												</li>
												<li>
													<a>02:00 AM</a>
												</li>
												<li>
													<a>03:00 AM</a>
												</li>
												<li>
													<a>04:00 AM</a>
												</li>
												<li>
													<a>05:00 AM</a>
												</li>
												<li>
													<a>06:00 AM</a>
												</li>
												<li>
													<a>07:00 AM</a>
												</li>
												<li>
													<a>09:00 AM</a>
												</li>
												<li>
													<a>10:00 AM</a>
												</li>
												<li>
													<a>11:00 AM</a>
												</li>
												<li>
													<a>12:00 PM</a>
												</li>
												<li>
													<a>01:00 PM</a>
												</li>
												<li>
													<a>02:00 PM</a>
												</li>
												<li>
													<a>03:00 PM</a>
												</li>
												<li>
													<a>04:00 PM</a>
												</li>
												<li>
													<a>05:00 PM</a>
												</li>
												<li>
													<a>06:00 PM</a>
												</li>
												<li>
													<a>07:00 PM</a>
												</li>
												<li>
													<a>08:00 PM</a>
												</li>
												<li>
													<a>09:00 PM</a>
												</li>
												<li>
													<a>10:00 PM</a>
												</li>
												<li>
													<a>11:00 PM</a>
												</li>
											</ul> -->
											<select v-model="select.start">
                        <option :value="select.start" disabled selected>{{select.start}}</option>
                        <option v-for="time in hoursPerday" :key="time.index">{{time}}</option>
											</select>
										</div>
										<span>to</span>
										<div>
											<!-- <span v-if="false">05:30PM</span>
											<ul v-if="false" class="dropdown-menu">
												<li>
													<a>12:00 AM</a>
												</li>
												<li>
													<a>01:00 AM</a>
												</li>
												<li>
													<a>02:00 AM</a>
												</li>
												<li>
													<a>03:00 AM</a>
												</li>
												<li>
													<a>04:00 AM</a>
												</li>
												<li>
													<a>05:00 AM</a>
												</li>
												<li>
													<a>06:00 AM</a>
												</li>
												<li>
													<a>07:00 AM</a>
												</li>
												<li>
													<a>09:00 AM</a>
												</li>
												<li>
													<a>10:00 AM</a>
												</li>
												<li>
													<a>11:00 AM</a>
												</li>
												<li>
													<a>12:00 PM</a>
												</li>
												<li>
													<a>01:00 PM</a>
												</li>
												<li>
													<a>02:00 PM</a>
												</li>
												<li>
													<a>03:00 PM</a>
												</li>
												<li>
													<a>04:00 PM</a>
												</li>
												<li>
													<a>05:00 PM</a>
												</li>
												<li>
													<a>06:00 PM</a>
												</li>
												<li>
													<a>07:00 PM</a>
												</li>
												<li>
													<a>08:00 PM</a>
												</li>
												<li>
													<a>09:00 PM</a>
												</li>
												<li>
													<a>10:00 PM</a>
												</li>
												<li>
													<a>11:00 PM</a>
												</li>
											</ul> -->
											<select v-model="select.end">
                        <option :value="select.end" disabled selected>{{select.end}}</option>
                        <option v-for="time in hoursPerday" :key="time.index">{{time}}</option>
											</select>
										</div>
										<div class="trash-container">
											<i @click="btnDeleteBreak(index1, index2)" class="fa fa-trash"></i>
										</div>	
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div v-if="detail_active.value === '4' " class="time-off-info-wrapper">
					<div class="detail-body-info-header">
						<div>
							<img :src="'../assets/img/clinic/ico_Profile.svg'">
						</div>
						<div>
							<h1>Time off for you:</h1>
							<div class="add-img-container">
								<a><img :src="'../assets/img/ico_add new.svg'"></a>
							</div>
						</div>
					</div>

					<div class="time-off-body-info-container">
						<div></div>
						<div>
							<p>Add your first Time off by clicking below button</p>
							<button @click="modalStaff.addTimeOffModal = true"> <img :src="'../assets/img/ico_add new.svg'"> Add Time Off</button>
						</div>
					</div>
				</div>
			</div>


		</div>

		<Modal class="add-time-modal" v-if="modalStaff.addTimeOffModal">
      <div slot="header">
        <h4>Add New Time Off</h4>
        <i @click="modalStaff.addTimeOffModal = false" class="fa fa-times"></i>
      </div>
      <div slot="body">
      	<div v-if="showDayTime" class="daytime-off">
         	<div class="time-off-input-wrapper">
         		<label>Start Date</label>
         		<input type="text">	
         	</div>
         	<div class="time-off-input-wrapper">
         		<label>End Date</label>
         		<input type="text">	
         	</div>
       	</div>
       	<div v-if="showCustomTime" class="custom-time-off">
       		<div class="">
	         	<div class="time-off-input-wrapper">
	         		<label>Start Date</label>
	         		<div>
	         			<input type="text">
	         		</div>	
	         	</div>
	         	<div class="time-off-input-wrapper">
	         		<label>Start Time</label>
	         		<div>
	         			<input type="text">
	         		</div>
	         	</div>
         	</div>

         	<div>
	         	<div class="time-off-input-wrapper">
	         		<label>End Date</label>
	         		<div>
	         			<input type="text">
	         		</div>
	         	</div>
	         	<div class="time-off-input-wrapper">
	         		<label>End Time</label>
	         		<div>
	         			<input type="text">
	         		</div>
	         	</div>
         	</div>
       	</div>
       	<div class="time-off-input-wrapper">
       		<label>Notes</label>
       		<input type="text" placeholder="Details ...">
       	</div>

       	<div class="staff-day-checkbox">
       		<label class="checkbox-container"> All Day
					  <input type="checkbox" v-model="showDayTime" @click="toggleCheckBox()">
					  <span class="checkmark" id="custom-checkmark"></span>
					</label>
       	</div>

       	<div v-if="showDayTime" class="time-wall">
       		From 06 August 2019 to 06 August 2019
       	</div>

       		<div v-if="showCustomTime" class="custom-time-off-text time-wall">
       		From 06 August 2019, 08:00 AM to 06 August 2019, 05:00 PM
       	</div>
 				
       	<div class="btn-footer">
 					<button>Save Changes</button>
 				</div>	
      </div>
    </Modal>
	</div>
</template>

<script>
import clinicStaff from "@/components/clinic/settings/clinic-staff";

export default clinicStaff;
</script>