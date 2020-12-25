<template>
	<div class="calendar-container">
		<div class="clinic-calendar-wrapper">
			<div class="calendar-wrapper">
				<div class="calendar-header">
					<div class="header-list">
						<div>
							<div>
								<div @click="handleSelectHeaderDoctor()" class="dr-container">
									<img :src="'../assets/img/clinic/ico_Profile.svg'">
									<span>Dr Jimmy Yap</span>
								</div>
								<i class="fa fa-caret-down" aria-hidden="true"></i>
							</div>
							<ul @mouseleave="headerDoctorDropdown = false" class="header-dropdown-list" v-if="headerDoctorDropdown">
								<li v-for="doctor in doctors" :key="doctor.index">
									<a>{{doctor.name}}</a>
								</li>
							</ul>
						</div>
						<div @click="handleSelectCalendarView()" class="cal-view">
							<span>{{calendarView}}</span>
							<i class="fa fa-caret-down" aria-hidden="true"></i>
							<ul @mouseleave="headerCalendarView = false" class="header-dropdown-list" v-if="headerCalendarView">
								<li>
									<a @click="handleDefaultView('timeGridWeek','Weekly')">Weekly</a>
								</li>
								<li>
									<a @click="handleDefaultView('timeGridDay','Daily')">Daily</a>
								</li>
								<li>
									<a @click="handleDefaultView('dayGridMonth','Monthly')">Monthly</a>
								</li>
								<li>
									<a @click="handleDefaultView('timeGridWeek','By Group')">By Group</a>
								</li>
							</ul>
						</div>
					</div>
					<div class="calendar-view">
						<button @click="calNextPrev('today')" class="btn-today">Today</button>
						<div class="datepicker-btn">
							<button  @click="calNextPrev('prev')" class="btn-left"><img :src="'../assets/img/ico_left arrow.svg'"></button>
							<div class="custom-btn-wrapper">
								<div class="custom btn-date">
									{{selectedDateRange}}
								</div>

								<button class="btn-date">
									<v-date-picker v-model="dateRange"
										mode='single'
										:formats='formats'
										:input-props='{class: "vDatepicker btn-date", placeholder: "MM/DD/YYYY", readonly: true}'
										popover-visibility='focus' popover-direction='bottom'>
									</v-date-picker>
								</button>
							</div>
							<button @click="calNextPrev('next')" class="btn-right"><img :src="'../assets/img/ico_right arrow.svg'"></button>
						</div>
					</div>
					<div class="header-legend">
						<div class="blue">
							<i class="fa fa-circle"></i> Clinic
						</div>
						<div class="green">
							<i class="fa fa-circle"></i> Widget
						</div>
						<div class="yellow">
							<i class="fa fa-circle"></i> Mednefits App
						</div>
					</div>
					<div class="header-tool">
						<div>
							<img class="settings-icon" @click="handleSelectSettingsDropdown()" :src="'../assets/img/ico_Settings.svg'">
							<ul @mouseleave="headerSettingsDropdown = false" class="header-dropdown-list" v-if="headerSettingsDropdown">
								<li>
									<a>Providers</a>
								</li>
								<li class="provider-selector">
									<a>
										<input type="checkbox" name="type" v-model="headerSettings.dropDown">
										<span>View as Dropdown</span>
									</a>
								</li>
								<li class="provider-selector">
									<a>
												<input type="checkbox" name="type" v-model="headerSettings.tabs">
												<span>View as Tabs</span>
											</a>
								</li>
								<li class="divider"></li>
							</ul>
						</div>
						<div>
							<img :src="'../assets/img/info.png'">
						</div>
					</div>
				</div>
				<div class="view-tabs-doctors-container">
					<ul v-if="headerSettings.doctorstab">
						<li>
							<a class="active">
								<div class="dr-container">
									<img :src="'../assets/img/clinic/ico_Profile.svg'">
									<span>Dr Jimmy Yap</span>
								</div>
							</a>
						</li>
					</ul>
				</div>
			</div>
	
			<FullCalendar ref="calendar" @select="handelSelect" @eventMouseLeave="handleMouseLeave" @eventClick="handleEventClick"
			:plugins="config.plugins"
			:defaultView="config.defaultView"
			:timeZone="config.timeZone"
			:defaultDate="config.defaultDate"
			:slotDuration='config.slotDuration' 
			:locales="config.locales" 
			:locale="config.locale" 
			:firstDay="config.firstDay"
			:events="config.events" 
			:now="config.now" 
			:businessHours="config.businessHours" 
			:weekends="config.weekends" 
			:header="config.header" 
			:editable="config.editable" 
			:eventLimit="config.eventLimit" 
			:nowIndicator="config.nowIndicator"
			:selectable="config.selectable"
			/>

		</div>
	
		<div class="calendar-modal">
			<Modal v-if="appModal" class="appointment-modal">
				<div slot="header" class="appointment-header-container">
					<h4>Appointment</h4>
					<h4 v-if="false">Reserve Booking</h4>
					<i @click="appModal = false" class="fa fa-times"></i>
				</div>
				<div slot="body" class="appointment-body-container">
					<ul>
						<li class="left">
							<a @click="searchNewPatient = undefined">BOOKING</a>
						</li>
						<li class="left">
							<a>PATIENT</a>
						</li>
					</ul>
					<form v-if="searchNewPatient == undefined">
						<div class="modal-calendar-row-input-container">
							<label>Doctor</label>
							<div class="modal-calendar-input-wrapper">
								<div class="doctor-wrapper">
									<i v-if="appDetails.doctor != undefined" class="doctor-icon fa fa-check"></i>
									<i v-if="appDetails.doctor == undefined" class="doctor-icon fa fa-arrow-right"></i>
									<i class="doctor-icon fa fa-chevron-down"></i>
									<input type="text" @click="handleSelectDoctor" v-model="appDetails.doctor" class="modal-calendar-input-container doctor" placeholder="Select a Doctor" readonly="readonly">
								</div>
								<ul v-if="dropDownDoctor" class="dropdown-container">
									<li v-for="doctor in doctors" :key="doctor.index">
										<a @click="selectedData('doctor',doctor.name)">
											<div class="dr-container">
												<img :src="doctor.imgUrl">
												<span>{{doctor.name}}</span>
											</div>
										</a>
									</li>
								</ul>
							</div>
						</div>
						<div class="modal-calendar-row-input-container">
							<label>Service</label>
							<div class="modal-calendar-input-wrapper">
								<div class="service-wrapper">
									<div>
										<i v-if="appDetails.service != undefined" class="service-icon fa fa-check"></i>
										<i v-if="appDetails.service == undefined || serviceCustomIndicator == 2 && appDetails.service == undefined" class="service-icon fa fa-arrow-right"></i>
										<i class="service-icon fa fa-chevron-down"></i>
									</div>
									<input type="text" @click="handleSelectService" v-model="appDetails.service" class="modal-calendar-input-container service" placeholder="Select a service" readonly="readonly">
									<!-- <span>Select a service</span> -->
								</div>
	
								<ul v-if="dropDownService" class="dropdown-container service-dropdown-container">
									<li v-for="service in services" :key="service.index">
										<a @click="selectedData('service',service.name,service.type)">
											<div class="dr-container">
												<span>{{service.name}} </span> <span class="right">{{service.time}}</span>
											</div>
										</a>
									</li>
								</ul>
							</div>
						</div>
	
						<!-- Select a service -->
						<div v-if="appDetails.service == 'Slot Blocker' || appDetails.service == 'Medicine & Treatment' &&  serviceCustomIndicator != 2" class="duration-form-container">
							<div class="modal-calendar-row-input-container">
								<label>Duration</label>
								<div class="modal-calendar-input-wrapper">
									<input type="number" class="duration-container modal-calendar-input-container" placeholder="60">
									<div class="duration-wrapper mins-container">
										<i class="icon fa fa-chevron-down"></i>
										<input type="text" @click="handleSelectDuration" v-model="appDetails.duration" class="modal-calendar-input-container" placeholder="Mins" readonly="readonly">
									</div>
									<ul v-if="dropDownDuration" class="dropdown-container">
										<li>
											<a @click="selectedData('duration','Hours')">
												<div class="dr-container">
													<span>Hours</span>
												</div>
											</a>
										</li>
										<li>
											<a @click="selectedData('duration','Mins')">
												<div class="dr-container">
													<span>Mins</span>
												</div>
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
	
						<!-- Reserve booking -->
	
						<div v-if="serviceCustomIndicator == 2" class="reserve-booking-form-container">
	
							<!-- when selecting service -->
							<div class="price-container">
	
								<div class="modal-calendar-row-input-container">
									<label>Price</label>
									<div class="modal-calendar-input-wrapper">
										<input class="modal-calendar-input-container" v-model="appDetails.price">
									</div>
								</div>
	
								<div class="modal-calendar-row-input-container">
									<label>Duration</label>
									<div class="modal-calendar-input-wrapper">
										<input type="number" class="duration-container modal-calendar-input-container" placeholder="60">
										<div class="duration-wrapper mins-container">
											<i class="icon fa fa-chevron-down"></i>
											<input type="text" @click="handleSelectDuration" v-model="appDetails.duration" class="modal-calendar-input-container" placeholder="Mins" readonly="readonly">
										</div>
										<ul v-if="dropDownDuration && serviceCustomIndicator == 2" class="dropdown-container">
											<li>
												<a @click="selectedData('duration','Hours')">
													<div class="dr-container">
														<span>Hours</span>
													</div>
												</a>
											</li>
											<li>
												<a @click="selectedData('duration','Mins')">
													<div class="dr-container">
														<span>Mins</span>
													</div>
												</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
	
							<div v-if="true" class="modal-calendar-row-input-container">
								<label>Name</label>
								<div class="modal-calendar-input-wrapper">
									<input class="modal-calendar-input-container" placeholder="Name" v-model="appDetails.name">
								</div>
							</div>
	
							<div v-if="true" class="modal-calendar-row-input-container">
								<label>Email <span>(Optional)</span></label>
								<div class="modal-calendar-input-wrapper">
									<input class="modal-calendar-input-container" placeholder="Email"
									v-model="appDetails.email">
								</div>
							</div>
	
	
							<div v-if="true" class="modal-calendar-row-input-container">
								<label>Phone <span>(Optional)</span></label>
								<div class="modal-calendar-input-wrapper area-code-container">
									<!-- <button>+65</button>
									<input class="modal-calendar-input-container" placeholder="Mobile Number"> -->
									<vue-tel-input ref="areaCode" v-model="appDetails.mobile" v-bind="telProps" @input="setAreaCode"></vue-tel-input>
								</div>
							</div>
	
						</div>
	
						<div class="day-time-container">
							<div class="modal-calendar-row-input-container">
								<label>Day</label>
								<div class="modal-calendar-input-wrapper">
									<div>
										<!-- <span>Saturday, September 21 2019</span> -->
										<v-date-picker v-model="appDetails.dateDay"
                    :max-date='new Date()'
                    :formats='formats'
                    :input-props='{class: "vDatepicker modal-calendar-input-container", placeholder: "MM/DD/YYYY", readonly: true}'
                    popover-visibility='focus' popover-direction='top'>
                  </v-date-picker>
									</div>
								</div>
							</div>
	
							<div class="modal-calendar-row-input-container">
								<label>Time</label>
								<div class="modal-calendar-input-wrapper">
									<div class="time-wrapper">
										<i class="icon fa fa-chevron-down"></i>
										<input type="text" @click="handleSelectDay" v-model="appDetails.time" class="modal-calendar-input-container" placeholder="1:00 AM" readonly="readonly">
									</div>
									<ul v-if="dropDownDay" class="dropdown-container time-dropdown-container">
										<li v-for="hours in hoursPerday" :key='hours.index'>
											<a @click="selectedData('day',hours)"> 
												<div class="dr-container">
													<span>{{hours}}</span>
												</div>
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
	
						<div class="modal-calendar-row-input-container">
							<label>Notes</label>
							<div class="modal-calendar-input-wrapper">
								<input class="modal-calendar-input-container" type="text" placeholder="Notes / Instructions">
							</div>
						</div>
						
						<div v-if="false" class="modal-calendar-row-input-container error-message">
							<label></label>
							<div>
								<span>Please select a procedure!</span>
								<span>Please insert a duration!</span>
							</div>
						</div>

						<div class="modal-calendar-row-input-container">
							<label></label>
							<div class="modal-calendar-input-wrapper">
								<button v-if="serviceCustomIndicator == 3" class="btn-continue" @click.prevent="btnContinue(serviceCustomIndicator)">Continue</button>
								<button v-if="serviceCustomIndicator != 3" class="btn-continue" @click.prevent="btnContinue()">Continue</button>
								<button v-if="false" class="btn-continue">Reserve</button>
							</div>
						</div>
	
					</form>

					<!-- search employee -->
					<div v-if="searchNewPatient == 0" class="search-panel"> 
						<div class="modal-calendar-input-wrapper">
							<input class="modal-calendar-input-container" type="text" placeholder="Search Email Address or Phone Number">
							<i class="fa fa-search"></i>
						</div>
						<button @click.prevent="btnContinue('newPatient')" class="btn-continue"><i class="fa fa-plus"></i> New Patient</button>
					</div>

					<!-- new patient -->
					<div v-if="searchNewPatient == 1" class="new-customer">
						<div class="modal-calendar-row-input-container">
							<label><img :src="'../assets/img/clinic/ico_Profile.svg'"></label>
							<div class="modal-calendar-input-wrapper">
								<input class="modal-calendar-input-container" placeholder="Name">
							</div>
						</div>
						<div class="modal-calendar-row-input-container">
							<label></label>
							<div class="modal-calendar-input-wrapper area-code-container">
								<!-- <button>+65</button>
								<input class="modal-calendar-input-container" placeholder="Mobile Number" type="number"> -->
								<vue-tel-input ref="areaCode" v-model="newPatient.mobile" v-bind="telProps" @input="setAreaCode"></vue-tel-input>
							</div>
						</div>
						<div class="modal-calendar-row-input-container">
							<label></label>
							<div class="modal-calendar-input-wrapper">
								<input class="modal-calendar-input-container" placeholder="Email">
							</div>
						</div>
						<div class="modal-calendar-row-input-container">
							<label></label>
							<div class="modal-calendar-input-wrapper">
								<input class="modal-calendar-input-container" placeholder="Address">
							</div>
						</div>
						<div class="modal-calendar-row-input-container">
							<label></label>
							<div class="city-state-zip-container">
								<div class="modal-calendar-row-input-container">
									<div class="modal-calendar-input-wrapper">
										<input class="modal-calendar-input-container" placeholder="City">
									</div>
								</div>
								<div class="modal-calendar-row-input-container">
									<div class="modal-calendar-input-wrapper">
										<input class="modal-calendar-input-container" placeholder="State">
									</div>
								</div>
								<div class="modal-calendar-row-input-container">
									<div class="modal-calendar-input-wrapper">
										<input class="modal-calendar-input-container" placeholder="Zip" type="number">
									</div>
								</div>
							</div>
						</div>

						<div class="modal-calendar-row-input-container">
							<label></label>
							<div class="back-next-container">
								<button @click="searchNewPatient = 0" class="btn-continue appoint-back-btn">Back</button>
								<button @click="btnContinue('confirm')" class="btn-continue">Next</button>
							</div>
						</div>
					</div>

					<!-- confirm appointment -->
					<div v-if="searchNewPatient == 2" class="check-save">
						<h4>Confirm Appointment : </h4>
						<div class="confirm-info-wrapper">
							<div class="confirm-appointment-container">
								<div>
									<label>Doctor</label>
									<span>Dr Test</span>								
								</div>
								<div>
									<label>Procedure</label>
									<span>Scaling & Polishing</span>
								</div>
							</div>
							<div class="confirm-appointment-container">
								<div>
									<label>Name</label>
									<span>Jan</span>								
								</div>
								<div>
									<label>Email & Phone</label>
									<span>jan@gmail.com</span>
								</div>
							</div>
							<div class="confirm-appointment-container">
								<div>
									<label>Date & Time</label>
									<span>Monday, September 30 2019 </span> 
									<span>4:30 PM</span>						
								</div>
								<div>
									<label>Price</label>
									<span>0</span>
								</div>
							</div>
							<div class="confirm-appointment-container">
								<div>
									<label>Notes</label>
									<span></span>								
								</div>
							</div>
						</div>

						<div class="confirm-appointment-btn-container">
							<button @click="searchNewPatient = 1" class="btn-continue appoint-back-btn">Back</button>
							<button class="btn-continue">Save Appointment</button>
						</div>
					</div>

				</div>
			</Modal>
	

		<!-- setup calendar3 -->
			<Modal v-if="setupModal" class="clinic-config-modal">
				<div slot="header">
					<div class="setup-uncompleted-line"></div>
					<ul>
						<li>
							<label>Welcome</label>
							<a>
		    				<span class="clinic-badge" :class="{'active': setup.stepper >= 1}">
								<span v-if="setup.stepper <= 1">1</span>
		    				<i v-if="setup.stepper >= 2" class="fa fa-check done-step"></i>
		    				</span>
	    				</a>
						</li>
						<li>
							<label>Hours</label>
							<a>
		    				<span class="clinic-badge" :class="{'active': setup.stepper >= 2 }">
		    				<span v-if="setup.stepper <= 2">2</span>
		    				<i v-if="setup.stepper >= 3" class="fa fa-check done-step"></i>
		    				</span>
	    				</a>
						</li>
						<li>
							<label>Doctors</label>
							<a>
		    				<span class="clinic-badge" :class="{'active': setup.stepper >= 3 }">
		    				<span v-if="setup.stepper <= 3">3</span>
		    				<i v-if="setup.stepper >= 4" class="fa fa-check done-step"></i>
		    				</span>
	    				</a>
						</li>
						<li>
							<label>Service</label>
							<a>
		    				<span class="clinic-badge" :class="{'active': setup.stepper >= 4 }">
		    				<span v-if="setup.stepper <= 4">4</span>
		    				<i v-if="setup.stepper >= 5" class="fa fa-check done-step"></i>
		    				</span>
	    				</a>
						</li>
						<li>
							<label>DONE!</label>
							<a>
		    				<span class="clinic-badge" :class="{'active': setup.stepper == 5 }">
		    				<span v-if="setup.stepper < 5">5</span>
		    				<i v-if="setup.stepper == 5" class="fa fa-check done-step"></i>
		    				</span>
	    				</a>
						</li>
					</ul>
				</div>
				<div slot="body">
					<div v-if="setup.stepper == 1" class="first-step">
						<div class="panel-header">
							<div>
								<h3>Welcome to Medicloud</h3>
								<span>We'll get you setup in no time</span>
							</div>
							<div>
								<button @click="next()">Next <i class="fa fa-chevron-right"></i></button>
								<!-- <button v-if="setup.stepper == 2" @click="next(3)">Next <i class="fa fa-chevron-right"></i></button>
								<button v-if="setup.stepper == 3" @click="next(4)">Next <i class="fa fa-chevron-right"></i></button>
								<button v-if="setup.stepper == 4" @click="next(5)">Next <i class="fa fa-chevron-right"></i></button> -->
							</div>
						</div>
						<div class="panel-body">
							<span>This will only take a moment</span>
							<div>
								<div class="modal-calendar-row-input-container">
									<label>Clinic Name</label>
									<div class="modal-calendar-input-wrapper area-code-container">
										<input class="modal-calendar-input-container" placeholder="">
									</div>
								</div>
								<div class="modal-calendar-row-input-container">
									<label>Speciality</label>
									<div class="modal-calendar-input-wrapper area-code-container">
										<input @click="handleSpeciality()" class="modal-calendar-input-container" placeholder="" readonly="readonly" v-model="setup.dataStorage.speciality">
										<i class="fa fa-chevron-down"></i>
										<ul v-if="setupSpeciality" class="dropdown-container">
											<li v-for="item in specialities" :key="item.index">
												<a @click="selectedData('speciality',item.name, item.type)">
													<div class="dr-container">
														<span>{{item.name}}</span>
													</div>
												</a>
											</li>
										</ul>
									</div>
								</div>
								<div class="modal-calendar-row-input-container">
									<label>Phone No</label>
									<div class="modal-calendar-input-wrapper area-code-container">
										<button>+65</button>
										<input class="modal-calendar-input-container" placeholder="">
									</div>
								</div>
							</div>
						</div>
					</div>
					<div v-if="setup.stepper == 2" class="second-step">
						<div class="panel-header">
							<div>
								<h3>Set Yours Business Hours</h3>
								<span>Let your customers know when you're open</span>
							</div>
							<div>
								<button @click="back()" class="btn-prev"><i class="fa fa-chevron-left"></i></button>
								<button @click="next()">Next <i class="fa fa-chevron-right"></i></button>
							</div>
						</div>
						<div class="panel-body">
							<span class="time-zone-set-text">
	    					Your time Zone is set to <u style="cursor: pointer;">SINGAPORE (UTC+08:00)</u>.
	    				</span>
							<div class="working-row-container">
								<div class="day-container">
									<span>Monday</span>
								</div>
								<label class="clinic-switch-container">
			    						<input type="checkbox" :checked="true">
			    						<span class="slider">
			    							<span class="off">On</span>
			    							<span class="on">Off</span>
			    						</span>
			    					</label>
								<div class="timepicker-container">
									<div>
										<select >
											<option v-for="time in hoursPerday" :key="time.index" :value="time">
												{{time}}
											</option>
										</select>
									</div>
									<span>to</span>
									<div>
										<select >
											<option v-for="time in hoursPerday" :key="time.index" :value="time">
												{{time}}
											</option>
										</select>
									</div>
								</div>
							</div>
							<div class="working-row-container">
								<div class="day-container">
									<span>Tuesday</span>
								</div>
								<label class="clinic-switch-container">
			    						<input type="checkbox" checked="checked">
			    						<span class="slider">
			    							<span class="off">On</span>
			    							<span class="on">Off</span>
			    						</span>
			    					</label>
								<div class="timepicker-container">
									<div>
										<select >
											<option v-for="time in hoursPerday" :key="time.index" :value="time">
												{{time}}
											</option>
										</select>
									</div>
									<span>to</span>
									<div>
										<select >
											<option v-for="time in hoursPerday" :key="time.index" :value="time">
												{{time}}
											</option>
										</select>
									</div>
								</div>
							</div>
							<div class="working-row-container">
								<div class="day-container">
									<span>Wednesday</span>
								</div>
								<label class="clinic-switch-container">
			    						<input type="checkbox" checked="checked">
			    						<span class="slider">
			    							<span class="off">On</span>
			    							<span class="on">Off</span>
			    						</span>
			    					</label>
								<div class="timepicker-container">
									<div>
										<select >
											<option v-for="time in hoursPerday" :key="time.index" :value="time">
												{{time}}
											</option>
										</select>
									</div>
									<span>to</span>
									<div>
										<select >
											<option v-for="time in hoursPerday" :key="time.index" :value="time">
												{{time}}
											</option>
										</select>
									</div>
								</div>
							</div>
							<div class="working-row-container">
								<div class="day-container">
									<span>Thursday</span>
								</div>
								<label class="clinic-switch-container">
			    						<input type="checkbox" checked="checked">
			    						<span class="slider">
			    							<span class="off">On</span>
			    							<span class="on">Off</span>
			    						</span>
			    					</label>
								<div class="timepicker-container">
									<div>
										<select >
											<option v-for="time in hoursPerday" :key="time.index" :value="time">
												{{time}}
											</option>
										</select>
									</div>
									<span>to</span>
									<div>
									<select >
											<option v-for="time in hoursPerday" :key="time.index" :value="time">
												{{time}}
											</option>
										</select>
									</div>
								</div>
							</div>
							<div class="working-row-container">
								<div class="day-container">
									<span>Friday</span>
								</div>
								<label class="clinic-switch-container">
			    						<input type="checkbox" checked="checked">
			    						<span class="slider">
			    							<span class="off">On</span>
			    							<span class="on">Off</span>
			    						</span>
			    					</label>
								<div class="timepicker-container">
									<div>
										<select >
											<option v-for="time in hoursPerday" :key="time.index" :value="time">
												{{time}}
											</option>
										</select>
									</div>
									<span>to</span>
									<div>
										<select >
											<option v-for="time in hoursPerday" :key="time.index" :value="time">
												{{time}}
											</option>
										</select>
									</div>
								</div>
							</div>
							<div class="working-row-container">
								<div class="day-container">
									<span>Saturday</span>
								</div>
								<label class="clinic-switch-container">
			    						<input type="checkbox" checked="checked">
			    						<span class="slider">
			    							<span class="off">On</span>
			    							<span class="on">Off</span>
			    						</span>
			    					</label>
								<div class="timepicker-container">
									<div>
										<select >
											<option v-for="time in hoursPerday" :key="time.index" :value="time">
												{{time}}
											</option>
										</select>
									</div>
									<span>to</span>
									<div>
									<select >
											<option v-for="time in hoursPerday" :key="time.index" :value="time">
												{{time}}
											</option>
										</select>
									</div>
								</div>
							</div>
							<div class="working-row-container">
								<div class="day-container">
									<span>Sunday</span>
								</div>
								<label class="clinic-switch-container">
			    						<input type="checkbox" checked="checked">
			    						<span class="slider">
			    							<span class="off">On</span>
			    							<span class="on">Off</span>
			    						</span>
			    					</label>
								<div class="timepicker-container">
									<div>
										<select >
											<option v-for="time in hoursPerday" :key="time.index" :value="time">
												{{time}}
											</option>
										</select>
									</div>
									<span>to</span>
									<div>
									<select >
											<option v-for="time in hoursPerday" :key="time.index" :value="time">
												{{time}}
											</option>
										</select>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div v-if="setup.stepper == 3" class="third-step">
						<div class="panel-header">
							<div>
								<h3>Add Doctors</h3>
								<span>Dont worry - you can always edit these later</span>
							</div>
							<div>
								<button @click="back()" class="btn-prev"><i class="fa fa-chevron-left"></i></button>
								<button @click="next()">Next <i class="fa fa-chevron-right"></i></button>
							</div>
						</div>
						<div class="panel-body">
							
							<div class="add-doctors-info-wrapper">
								<div class="add-doctors-info-container">
									<div class="add-doctors-list">
										<div>
											<img :src="'../assets/img/clinic/ico_Profile.svg'">
										</div>
										<div>
											<span>Odin</span>
										</div>
										<div>
											<span>odil@gmail.com</span>
										</div>
										<div>
											<i class="fa fa-times"></i>
										</div>
									</div>
								</div>
							</div>
							<div class="add-doctors-input-container">
								<div>
									<img :src="'../assets/img/clinic/ico_Profile.svg'">
								</div>
								<div>
									<div class="modal-calendar-input-wrapper">
										<input class="modal-calendar-input-container" type="text" placeholder="Name">
									</div>
									<div class="modal-calendar-input-wrapper">
										<input class="modal-calendar-input-container" type="text" placeholder="Email">
									</div>
								</div>
								<div>
									<button class="btn-add">Add</button>
								</div>
							</div>
	
						</div>
					</div>
					<div v-if="setup.stepper == 4" class="fourth-step">
						<div class="panel-header">
							<div>
								<h3>Add the Services You Offer</h3>
								<span>Dont worry - you'll be able to edit these later</span>
							</div>
							<div>
								<button @click="back()" class="btn-prev"><i class="fa fa-chevron-left"></i></button>
								<button @click="next()">Next <i class="fa fa-chevron-right"></i></button>
							</div>
						</div>
						<div class="panel-body">
							<div class="service-info-wrapper">
								<div class="service-info-container">
									<div class="service-header">
										<div>
											<span>Service Name</span>
										</div>
										<div>
											<span>Time</span>
										</div>
										<div>
											<span>Price</span>
										</div>
										<div>
											<span>Doctors</span>
										</div>
									</div>
									<div class="service-info-list">
										<div>
											<span>Noel</span>
										</div>
										<div>
											<span>1 </span>
											<span>mins</span>
										</div>
										<div>
											<span>1</span>
										</div>
										<div>
											<i class="fa fa-user-md"> </i>
											<span>1</span>
										</div>
										<div>
											<i class="fa fa-times"></i>
										</div>
									</div>
								</div>
							</div>
							<div class="service-input-container">
								<div>
									<div class="modal-calendar-input-wrapper">
										<input class="modal-calendar-input-container" type="text" placeholder="Service Name">
									</div>
									<div class="time-container modal-calendar-input-wrapper">
										<div class="modal-calendar-input-wrapper">
											<input class="modal-calendar-input-container" type="text" placeholder="0">
										</div>
										<div>
											<button @click="handleServiceTime()" class="btn-mins">{{setup.dataStorage.serviceTime}}</button>
											<ul v-if="setupServiceTime" class="dropdown-container">
												<li>
													<a @click="selectedData('serviceTime', 'Mins')">Mins</a>
												</li>
												<li>
													<a @click="selectedData('serviceTime', 'Hours')">Hours</a>
												</li>
											</ul>
										</div>
									</div>
									<div class="modal-calendar-input-wrapper">
										<input class="modal-calendar-input-container" type="text" placeholder="$ 0">
									</div>
									<div class="select-doctor-container">
										<button @click="handleSetupDoctor()" class="btn-select-doctor">
	    								<i class="fa fa-user-md"> </i>
	    								<i class="fa fa-caret-down" ></i>
	    							</button>
	    							<ul v-if="setupDoctor" class="dropdown-container">
	    								<li>
	    									<span>Who can perform this service?</span>
	    								</li>
	    								<li>
	    									<label class="doctor-list-container">
	    										<input type="checkbox"> <span>Noelou</span>
	    									</label>
	    								</li>
	    							</ul>
									</div>
									<div>
										<button class="btn-add">Add</button>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div v-if="setup.stepper == 5" class="fifth-step">
						<div class="panel-header">
							<div>
								<h3>All done! Time to get down to business.</h3>
							</div>
						</div>
						<div class="setup-dashboard">
							<div class="setup-dashboard-link">
								<div>
									<img :src="'../assets/img/business/calendar-thumbnails.png'">
								</div>	
								<h1>Start Booking Appointments</h1>
							</div>
							<div class="setup-features-list">
								<div>
									<div class="setup-dashboard-link">
										<div class="features-img-container">
											<img :src="'../assets/img/business/booking-page-thumbnail.png'">
										</div>
										<span>See My Booking Page >></span>
									</div>
									<div class="setup-dashboard-link">
										<div class="features-img-container">
											<img :src="'../assets/img/business/booknow-btn-thumbnail.png'">
										</div>
										<span>Get the Booking Button >></span>
									</div>
								</div>
								<div>
									<div class="setup-dashboard-link">
										<div class="features-img-container">
											<img :src="'../assets/img/business/integration-thumbnail.png'">
										</div>
										<span>View Integrations >></span>
									</div>
									<div class="setup-dashboard-link">
										<div class="features-img-container">
											<img :src="'../assets/img/business/staff-or-service-thumbnail.png'">
										</div>
										<span>Add Staff / Services >></span>
									</div>
								</div>
							</div>
						</div>
						<div class="panel-footer">
							<div>
								<button @click="back()" class="btn-prev"><i class="fa fa-chevron-left"></i></button>
								<button @click="setupModal = false">Close</button>
							</div>
						</div>
					</div>
				</div>
			</Modal>

			<!-- Appointment Details -->
			<Modal v-if="false" class="appointment-details-modal">
				<div slot="header">
					<h1>Appointment Details</h1>
					<i class="fa fa-times"></i>
				</div>
				<div slot="body">
					<div class="appointment-date-time">
						<div>
							<span>Monday, September 30, 2019</span>
						</div>
						<div>
							<span>4:15 pm - 4:25 pm</span>
						</div>
					</div>
					<div class="appointment-details-row">
						<label>Doctor</label>
						<span>Dr Test</span>
					</div>
					<div class="appointment-details-row">
						<label>Service</label>
						<span>Machine & Treatment</span>
					</div>
					<div class="appointment-details-row">
						<label>Cost</label>
						<span>As Charged</span>
					</div>
					<div class="appointment-details-row">
						<label>Customer</label>
						<span></span>
					</div>
					<div class="appointment-details-row">
						<label>Email</label>
						<span></span>
					</div>
					<div class="appointment-details-row">
						<label>Phone</label>
						<span></span>
					</div>

				</div>
				<div slot="footer">
					<div class="appointment-btn-footer">
						<button>Edit Details</button>
						<button>Claim</button>
						<button>No Show</button>
						<button class="btn-delete">Delete</button>
					</div>
				</div>
			</Modal>

		</div>
	
	</div>
</template>

<script>
import calendar from "@/components/clinic/calendar";
export default calendar;
</script>