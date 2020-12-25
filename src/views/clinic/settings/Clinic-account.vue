<template>
	<div class="clinic-account-wrapper">
		<div class="account-header-title">
			<h2>Customize your account preferences</h2>
		</div>
		<div class="line-break">
			<div>
				<span>Default Calendar View</span>
			</div>
			<div>
				<label>This will be your default calendar view</label>
				<div>
					<label class="calendar-selector-container">
						<input name="type" type="radio">
						<span>Daily Calendar</span>
					</label>
					<label class="calendar-selector-container">
						<input name="type" type="radio">
						<span>Weekly Calendar</span>
					</label>
					<label class="calendar-selector-container">
						<input name="type" type="radio">
						<span>Monthly Calendar</span>
					</label>
				</div>
			</div>
		</div>
		<div class="line-break">
			<div>
				<span>Start the Week with</span>
			</div>
			<div class="account-input-wrapper">
				<div>
					<input @click="btnWeekSelector()" type="button" v-model="selectedDay">
					<i class="fa fa-caret-down" aria-hidden="true"></i>
				</div>
				<ul v-if="showWeekSelector" class="dropdown-menu" @mouseleave="showWeekSelector = false">
					<li v-for="days in itemWeekDays" :key="days.index" >
						<a @click="itemWeekSelector(days)">{{days}}</a>
					</li>
				</ul>	
			</div>
		</div>
		<div class="line-break">
			<div>
				<span>Calendar Time Unit</span>
			</div>
			<div class="account-input-wrapper">
				<div>
					<input @click="btnTimeSelector()" type="button" :value="`${selectedTime} Min`">
					<i class="fa fa-caret-down" aria-hidden="true"></i>
				</div>
				<ul v-if="showTimeSelector" class="dropdown-menu" @mouseleave="showTimeSelector = false">
					<li v-for="time in timeUnit" :key="time.index">
						<a @click="itemTimeSelector(time)">{{time}} Min</a>
					</li>
				</ul>	
			</div>
		</div>
		<div class="line-break">
			<div>
				<span>Calendar Start Hour</span>
			</div>
			<div class="account-input-wrapper">
				<div>
					<input @click="btnStartHourSelector()" type="button" v-model="selectedHour">
					<i class="fa fa-caret-down" aria-hidden="true"></i>
				</div>
				<div class="timepicker-wrapper">
					<ul v-if="showStartHourSeletor" class="dropdown-menu">
						<li v-for=" hours in hoursPerday" :key='hours.index'>
							<a @click="itemHourSelector(hours)">{{hours}}</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="line-break">
			<div>
				<span>Enable PIN Verification</span>
			</div>
			<div class="account-input-wrapper">
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
</template>

<script>
import clinicAccount from "@/components/clinic/settings/clinic-account";

export default clinicAccount;
</script>