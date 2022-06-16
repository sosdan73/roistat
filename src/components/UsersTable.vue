<template>
    <table class="content__table table">
		<thead>
			<tr class="table__row --head">
				<th colspan="1">
					<div
						class="table__cell text-left d-flex align-center"
						@click="changeSort('name')"
					>
						<span class="flex-grow">Имя</span>
						<font-awesome-icon
							class="table__icon"
							:class="{
								'--transparent': sort.parameter !== 'name',
								'--rotated': sort.parameter === 'name' && sort.isReversed
							}"
							icon="fa-solid fa-filter"
						/>
					</div>

				</th>
				<th colspan="1">
					<div
						class="table__cell text-left d-flex align-center"
						@click="changeSort('phone')"
					>
						<span class="flex-grow">Телефон</span>
						<font-awesome-icon
							class="table__icon"
							:class="{
									'--transparent': sort.parameter !== 'phone',
									'--rotated': sort.parameter === 'phone' && sort.isReversed
								}"
							icon="fa-solid fa-filter"
						/>
					</div>
				</th>
			</tr>
		</thead>
		<tbody v-if="usersList.length > 0">
			<tr
				class="table__row"
				v-for="user in usersList"
				:key="user.id"
			>
				<td>
					<div
						class="table__cell"
						:style="getUserMargin(user)"
					>
						{{ user.name }}
					</div>
				</td>
				<td>
					<div class="table__cell">{{ user.phone }}</div>
				</td>
			</tr>
		</tbody>
		<tbody v-else>
			<tr class="table__row">
				<td colspan="2">
					<div class="table__cell">
						Пользоватали не добавлены!
					</div>
				</td>
			</tr>
		</tbody>
    </table>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { Sort } from "@/scripts/SortClass";

export default {
    name: "UsersTable",
	data() {
		return {
			sort: new Sort(),
		}
	},
	created() {
		if (localStorage.roistatTestTask) {
			this.initUsers();
		}
	},
	methods: {
		...mapMutations(['initUsers', 'sortUsers']),
		getUserMargin(user) {
			return user.subordinationLevel === 0 ? {} : {
				marginLeft: 15 * user.subordinationLevel + 'px'
			}
		},
		changeSort(parameter) {
			if (this.usersList.length === 0) {
				return
			}
			this.sort.setValues(parameter);
			this.sortUsers(this.sort.getValues())
		}
	},
	computed: {
		...mapGetters(['usersList']),
	},
}
</script>

<style lang="scss">
.table {
	table-layout: fixed;
	width: 100%;
	border-collapse: collapse;
}
.table__row.--head .table__cell {
	@include dark;
	@include transition-bgc;
	cursor: pointer;

	&:hover {
		background-color: #555;
	}
}
.table__cell {
	padding: 5px 10px;
	box-sizing: border-box;
	border: 2px solid #333;
	margin: -2px;
}
.table__icon {
	transition: transform .3s ease-in-out, opacity .3s ease-in-out;

	&.--transparent {
		opacity: 0.3;
	}
	&.--rotated {
		transform: rotate(180deg);
	}
}
</style>
