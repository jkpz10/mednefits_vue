<script>
/* eslint-disable */
import moment from 'moment'
import axios from "axios";
import Vue2Filters from 'vue2-filters';

//Methods here
let localNetwork = {
	mixins: [Vue2Filters.mixin],
	data() {
		return {
			sampleData: false,
			test: false,
			map: '',
			hoverState: '',

			active_localNetworkFilter: 'all',
			active_District: 'CENTRAL',

			local_networks: null,
			local_partners: null,
			options: {},

			central_length: 1,
			east_length: 1,
			west_length: 1,
			north_length: 1,
			south_length: 1,

		}
	},
	mounted() {
		this.getSession();
		this.getLocalNet();
	},
	computed: {
		filtered_local: function() {
			if (this.active_localNetworkFilter == 'all') {
				return this.local_partners;
			} else {
				let active_localNetworkFilter = this.active_localNetworkFilter;
				console.log('tanan dpat', this.active_localNetworkFilter);
				let newArr = this.local_partners.filter((item) => {
					console.log('item dpat', item.health);
					return item.health === active_localNetworkFilter;
				});
				console.log(newArr);
				return newArr;
			}
		}
	},
	methods: {
		testClicked() {
			this.test = true;
			console.log(this.test);
		},
		hover(data) {
			this.hoverState = data;
		},
		getLocalNetPart(id, index, net, map) {
			if (map == 'west') {
				this.map = 'west';
			} else if (map == 'central') {
				this.map = 'central';
			} else if (map == ' south') {
				this.map = 'south';
			} else if (map == 'east') {
				this.map = 'east';
			} else if (map == 'north') {
				this.map = 'north';
			}
			console.log('getLocalNetPart()', this.map);
			this.active_District = net.local_network_name;
			this.getLocalNetworkPartners(id, index);
		},

		//API Calls

		getSession() {
			axios.get(`${axios.defaults.serverUrl.node_company}/get-hr-session`)
				.then(res => {
					this.options.accessibility = res.data.accessibility;
					console.log('getSession()', this.options.accessibility);
				})
		},

		getLocalNet() {
			axios.get(`${axios.defaults.serverUrl.node_company}/list/local_network`)
				.then(res => {
					this.local_networks = res.data;
					this.getLocalNetPart(this.local_networks[0].local_network_id, 0, this.local_networks[0], 'central');
					console.log('getLocalNet()', this.local_networks);
				})
		},
		getLocalNetworkPartners(id, index) {
			axios.get(`${axios.defaults.serverUrl.node_company}/list/local_network_partners/${id}`)
				.then(res => {
					this.local_partners = res.data;
					console.log('getLocalNetworkPartners()', this.local_partners);
				})
		}


	},

};

export default localNetwork
</script>

<style lang="scss" scoped>
@import "./src/assets/css/company/plan-coverage.scss";
</style>
