<template>
	<div class="business-hours-wrapper">
		<div class="business-hours-header">
			<ul>
				<li v-bind:class="{'active': business_active.value === 0}" @click="selectBusinessHours(0,'business-hours')">
					<a>BUSINESS HOURS</a>
				</li>
				<li v-bind:class="{'active': business_active.value === 1}" @click="selectBusinessHours(1,'breaks')">
					<a>BREAKS</a>
				</li>
				<li v-bind:class="{'active': business_active.value === 2}" @click="selectBusinessHours(2,'time-off')">
					<a>TIME-OFF</a>
				</li>
			</ul>
		</div>
	
		<div class="business-hours-body">
			<div v-if="business_active.value === 0">
				<div class="time-zone-container">
					<div>
						<span>Time Zone</span>
					</div>
					<div>
						<p>Your Time Zone is set to <u>SINGAPORE (UTC+08:00)</u> .</p>
					</div>
				</div>
				<div class="clinic-opening-container">
					<h1>
						Clinic Opening Times :
					</h1>
					<div>
						<div v-for="( list ) in weekDayNames" :key="list.index" class="working-row-container">
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
											<option v-for="time in hoursPerday" :key="time.index" :value="time">{{time}}</option>
										</select>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div v-if="business_active.value === 1">
				<div class="time-zone-container">
					<div>
						<span>Time Zone</span>
					</div>
					<div>
						<p>Your Time Zone is set to <u>SINGAPORE (UTC+08:00)</u> .</p>
					</div>
				</div>
				<div class="breaks-clinic-container">
					<h1>
						Breaks For You Clinic :
					</h1>
	
					<div class="breaks-body-info-container">
						<div v-for="( list, index1 ) in  dayBreakNames" :key="list.index" class="working-row-container">
							<div class="day-container">
								<span>{{ list.day }}</span>
							</div>
							<div>
								<button @click="addBreak('profile', index1)">Add Break</button>
							</div>
							<div v-if="list.profileBreaktimePicker.length != 0" class="break-timepicker-wrapper">
								<div>
									<div v-for="(select,index2) in list.profileBreaktimePicker"  :key="select.index" class="timepicker-container">
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
													<option>12:00AM</option>
													<option>12:00AM</option>
													<option>12:00AM</option>
													<option>12:00AM</option>
													<option>12:00AM</option>
													<option>12:00AM</option>
													<option>12:00AM</option>
													<option>12:00AM</option>
													<option>12:00AM</option>
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
													<option>12:00AM</option>
													<option>12:00AM</option>
													<option>12:00AM</option>
													<option>12:00AM</option>
													<option>12:00AM</option>
													<option>12:00AM</option>
													<option>12:00AM</option>
													<option>12:00AM</option>
													<option>12:00AM</option>
												</select>
										</div>
										<div class="trash-container">
											<i @click="deleteBreak('profile', index1, index2)" class="fa fa-trash"></i>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div v-if="business_active.value === 2">
				<div class="detail-body-container">
					<div class="time-off-info-wrapper">
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
								<button @click="modalProfile.addTimeOffModal = true"><img :src="'../assets/img/ico_add new.svg'"> Add Time Off</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	
		<Modal class="add-time-modal" v-if="modalProfile.addTimeOffModal">
			<div slot="header">
				<h4>Add New Time Off</h4>
				<i @click="modalProfile.addTimeOffModal = false" class="fa fa-times"></i>
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
import businessHours from "@/components/clinic/settings/profile/business-hours";

export default businessHours;
</script>