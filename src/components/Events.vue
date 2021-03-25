<template>
	<div class="p-grid crud-demo">
		<div class="p-col-12">
			<div class="card">
				<Toast/>
				<Toolbar class="p-mb-4">
					<template v-slot:left>
						<Button label="New" icon="pi pi-plus" class="p-button-success p-mr-2" @click="openNew" />
					</template>

				</Toolbar>
				<DataTable :value="events" :paginator="true"  :rows="10" dataKey="id" :rowHover="true" 
							v-model:filters="filters" filterDisplay="menu" :loading="loading" :filters="filters" 
							:globalFilterFields="['id','name','languages','infraState','appState']" v-model:expandedRows="expandedRows" responsiveLayout="scroll" >
					<template #header>
                        <div class="p-d-flex p-jc-between p-flex-column p-flex-sm-row">
                            <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined p-mb-2" @click="clearFilter1()"/>
                            <span class="p-input-icon-left p-mb-2">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Keyword Search" style="width: 100%"/>
                            </span>
                        </div>
                    </template>
                    <template #empty>
                        No Events found.
                    </template>
                    <template #loading>
                        Loading Events data. Please wait.
                    </template>
					<Column :expander="true" headerStyle="width: 3rem" />
                    <Column field="id" header="Event Id" style="min-width:12rem">
                        <template #body="{data}">
                            <span class="p-column-title">Id</span>
                            {{data.id}}
                        </template>
                        <template #filter="{filterModel}">
                            <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name"/>
                        </template>
                    </Column>
					<Column field="name" header="Event Name" style="min-width:12rem">
                        <template #body="{data}">
                            <span class="p-column-title">Name</span>
                            {{data.name}}
                        </template>
                        <template #filter="{filterModel}">
                            <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name"/>
                        </template>
                    </Column>
					<Column field="infraState" header="Infrastructure Status" :filterMenuStyle="{'width':'14rem'}" style="min-width:12rem">
                        <template #body="{data}">
                            <span class="p-column-title">Status</span>
                            <span :class="'infraState-badge status-' + data.infraState">{{data.infraState}}</span>
                        </template>
                        <template #filter="{filterModel}">
                            <Dropdown v-model="filterModel.value" :options="infraStatus" placeholder="Any" class="p-column-filter" :showClear="true">
                                <template #value="slotProps">
                                    <span :class="'infraState-badge status-' + slotProps.value" v-if="slotProps.value">{{slotProps.value}}</span>
                                    <span v-else>{{slotProps.placeholder}}</span>
                                </template>
                                <template #option="slotProps">
                                    <span :class="'infraState-badge status-' + slotProps.option">{{slotProps.option}}</span>
                                </template>
                            </Dropdown>
                        </template>
                    </Column>
					<Column field="appState" header="Platform Status" :filterMenuStyle="{'width':'14rem'}" style="min-width:12rem">
                        <template #body="{data}">
                            <span class="p-column-title">Status</span>
                            <span :class="'appState-badge status-' + data.appState">{{data.appState}}</span>
                        </template>
                        <template #filter="{filterModel}">
                            <Dropdown v-model="filterModel.value" :options="appStatus" placeholder="Any" class="p-column-filter" :showClear="true">
                                <template #value="slotProps">
                                    <span :class="'appState-badge status-' + slotProps.value" v-if="slotProps.value">{{slotProps.value}}</span>
                                    <span v-else>{{slotProps.placeholder}}</span>
                                </template>
                                <template #option="slotProps">
                                    <span :class="'appState-badge status-' + slotProps.option">{{slotProps.option}}</span>
                                </template>
                            </Dropdown>
                        </template>
                    </Column>
					<Column field="protected" header="Access Protected" dataType="boolean" bodyClass="p-text-center" style="min-width:8rem">
                        <template #body="{data}">
                            <span class="p-column-title">Protected</span>
                            <i class="pi" :class="{'true-icon pi-check-circle': data.secure=='YES', 'false-icon pi-times-circle': data.secure=='NO'}"></i>
                        </template>
                        <template #filter={filterModel}>
                            <TriStateCheckbox v-model="filterModel.value" />
                        </template>
                    </Column>
					<Column field="appState" header="Platform Status"  style="min-width:12rem">
                        <template #body="{data}">
							<SelectButton v-model="selectedAppState[events.indexOf(data)]" :options="appState" optionLabel="name" @click="changePlatformStatus(events.indexOf(data))" :disabled="data.appState==='pending'"/>
                        </template>
                    </Column>
					<Column field="protected" header="Access Protected" tyle="min-width:8rem">
                         <template #body="{data}">
							<SelectButton v-model="selectedProtectedState[events.indexOf(data)]" :options="secureState" optionLabel="name" @click="changePlatformSecureStatus(events.indexOf(data))" :disabled="data.appState==='pending'"/>
                        </template>
                    </Column>
					<template #expansion="slotProps">
						<div class="p-column-title-new">
							<h5>Languages for Event {{slotProps.data.name}}</h5>
							<DataTable :value="slotProps.data.languages" responsiveLayout="scroll">
								<Column field="lang" header="Language" :sortable="true" >
									<template #body="slotProps" >
										<img src="assets/layout/flags/flag_placeholder.png" :alt="slotProps.data.lang" :class="'flag flag-' + slotProps.data.lang" width="30" />
									</template>
								</Column>
								<Column field="endpoint" header="Endpoint" >
									<template #body="slotProps">
										<span  >{{slotProps.data.endpont}}</span>
									</template>
								</Column>
								<Column field="incodec" header="In codec">
									<template #body="slotProps">
										<span class="p-text-bold" >IC: </span>
										{{slotProps.data.input_codec}}
									</template>
								</Column>
								<Column field="inres" header="In res" >
									<template #body="slotProps">
										<span class="p-text-bold" >IR: </span>
										{{slotProps.data.input_res}}
									</template>
								</Column>
								<Column field="inbr" header="In br" >
									<template #body="slotProps">
										<span class="p-text-bold" >IBR: </span>
										{{slotProps.data.input_br}} Mb/s
									</template>
								</Column>
								<Column field="inbr" header="In br" >
									<template #body="slotProps">
										<span class="p-text-bold" >OC: </span>
										{{slotProps.data.output_codec}}
									</template>
								</Column>
								<Column field="inbr" header="In br" >
									<template #body="slotProps">
										<span class="p-text-bold" >ORCM: </span>
										{{slotProps.data.output_rcm}}
									</template>
								</Column>
								<Column field="inbr" header="In br" >
									<template #body="slotProps">
										<span class="p-text-bold" >OBR: </span>
										{{slotProps.data.output_br}} Mb/s
									</template>
								</Column>
								<Column field="inbr" header="In br" >
									<template #body="slotProps">
										<span class="p-text-bold" >OFR: </span>
										{{slotProps.data.output_fr}} F/s
									</template>
								</Column>
								<Column field="inbr" header="In br" >
									<template #body="slotProps">
										<span :class="'chState-badge status-' + slotProps.data.status">{{slotProps.data.status}}</span>
									</template>
								</Column>
								<Column field="inbr" header="In br" >
									<template #body="slotProps">
										<Button label="Start"  class="p-button-success p-mr-1" @click="prova(slotProps.data.chId)" :disabled="slotProps.data.status!='stopped'"/>
										<Button label="Stop"  class="p-button-warning p-mr-1" @click="prova(slotProps.data.chId)" :disabled="slotProps.data.status!='started'"/>
									</template>
								</Column>
								
							</DataTable>
						</div>
					</template>
				</DataTable>

				<Dialog v-model:visible="eventDialog" :style="{width: '1300px'}" header="Event creation" :modal="true" @hide="resetDialog" >
					<div class="card">
						<Steps :model="stepItems" :readonly="true" />
					</div>
					<router-view v-slot="{Component}" :formData="formObject" @prev-page="prevPage($event)" @next-page="nextPage($event)" @complete="complete">
						<keep-alive>
							<component :is="Component" />
						</keep-alive>
					</router-view> 
				</Dialog>
				
			</div>
		</div>
	</div>

</template>

<script>
import {FilterMatchMode,FilterOperator} from 'primevue/api';
import EventService from '../service/EventService';


export default {
	data() {
		return {
			eventDialog: false,
			eventNew: null,
			eventSubmitted:false,
			events: null,
			loading: true,
			filters: null,
			appStatus: [
					'cs', 'streaming', 'vod','pending'
				],
			infraStatus: [
					'ready', 'pending', 'error'
				],
			expandedRows: [],
			selectedAppState:[],
			selectedProtectedState:[],
			appState: [
				{name: 'CS', code: 'cs'},
				{name: 'STREAMING', code: 'streaming'},
				{name: 'VOD', code: 'vod'}
			],
			secureState: [
				{name: 'YES', code: 'YES'},
				{name: 'NO', code: 'NO'},
			],
			stepItems: [{
                label: 'Languages',
                to: '/events'
            },
            {
                label: 'Coming Soon',
                to: '/events/csPage'
            },
            {
                label: 'Streaming Page',
                to: '/events/streamingPage'
            },
            {
                label: 'Summary',
                to: '/events/summary'
            }],
            formObject: {}
		}
	},
	eventService: null,
	created() {
		this.eventService = new EventService();
		this.initFilters();
	},
	mounted() {
		
		this.eventService.getEvents().then(data => {
			this.events = data; 
			this.loading = false;
			this.events.forEach(function(entry) {
				console.log(entry.secure)
				this.selectedAppState.push({"name":entry.appState.toUpperCase(),"code":entry.appState})
				this.selectedProtectedState.push({"name":entry.secure.toUpperCase(),"code":entry.secure})
		},this);
		});
	},
	
	methods: {
		formatCurrency(value) {
			return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
		},
		initFilters() {
				this.filters = {
					'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
					'id': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
					'name': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
					'languages': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
					'infraState': {operator: FilterOperator.OR, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
					'appState': {operator: FilterOperator.OR, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
					'protected': {value: null, matchMode: FilterMatchMode.EQUALS}
				}
			},
		clearFilter1() {
			this.initFilters();
		},
		changePlatformStatus(pos){
			if(this.selectedAppState[pos].code!='pending'){
				this.events[pos].appState=this.selectedAppState[pos].code
			}
		},
		changePlatformSecureStatus(pos){
			if(this.selectedAppState[pos].code!='pending'){
				this.events[pos].secure=this.selectedProtectedState[pos].code
			}
		},
		openNew() {
			this.eventNew = {};
			this.eventDialog = true;
			this.eventSubmitted = false;
		},	
		nextPage(event) {
            for (let field in event.formData) {
                this.formObject[field] = event.formData[field];
            }
            this.$router.push(this.stepItems[event.pageIndex + 1].to);
        },
        prevPage(event) {
            this.$router.push(this.stepItems[event.pageIndex - 1].to);
        },
        complete() {
            this.$toast.add({severity:'success', summary:'Order submitted', detail: 'Dear,  your order completed.'});
        },
		resetDialog(){
			console.log("ciaooo")
			this.formObject={}
			this.$router.push("/events")
		}
		
	}
}
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 960px) {
		::v-deep(.p-datatable) {
			&.p-datatable-customers {
				.p-datatable-thead > tr > th,
				.p-datatable-tfoot > tr > td {
					display: none !important;
				}

				.p-datatable-tbody > tr {
					border-bottom: 1px solid #dee2e6;
					> td {
						text-align: left;
						display: flex;
						align-items: center;
						justify-content: center;
						border: 0 none !important;
						width: 100% !important;
						float: left;
						clear: left;
						border: 0 none;

						.p-column-title {
							padding: .4rem;
							min-width: 30%;
							display: inline-block;
							margin: -.4rem 1rem -.4rem -.4rem;
							font-weight: bold;
						}

						.p-progressbar {
							margin-top: .5rem;
						}
					}
				}
			}
		}
	}
	.infraState-badge {
		border-radius: 2px;
		padding: .25em .5rem;
		text-transform: uppercase;
		font-weight: 700;
		font-size: 12px;
		letter-spacing: .3px;

		&.status-ready {
			background: #C8E6C9;
			color: #256029;
		}

		&.status-error {
			background: #FFCDD2;
			color: #C63737;
		}

		&.status-pending {
			background: #FEEDAF;
			color: #8A5340;
		}
	}
	.chState-badge {
		border-radius: 2px;
		padding: .25em .5rem;
		text-transform: uppercase;
		font-weight: 700;
		font-size: 12px;
		letter-spacing: .3px;

		&.status-started {
			background: #C8E6C9;
			color: #256029;
		}

		&.status-stopped {
			background: #FFCDD2;
			color: #C63737;
		}
		&.status-pending {
			background: #FEEDAF;
			color: #8A5340;
		}

	
	}

	.appState-badge {
		border-radius: 2px;
		padding: .25em .5rem;
		text-transform: uppercase;
		font-weight: 700;
		font-size: 12px;
		letter-spacing: .3px;

		&.status-streaming {
			background: #C8E6C9;
			color: #256029;
		}

		&.status-cs {
			background: #FFCDD2;
			color: #C63737;
		}

		&.status-vod {
			background: #B3E5FC;
			color: #23547B;
		}

		&.status-pending {
			background: #FEEDAF;
			color: #8A5340;
		}
	}
	.events-subtable {
		padding: 1rem;
	}

	.p-column-title-new {
		padding: .4rem;
		min-width: 30%;
		display: inline-block;
		margin: -.4rem 1rem -.4rem -.4rem;
		font-weight: bold;
	}
</style>