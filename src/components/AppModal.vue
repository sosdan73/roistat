<template>
	<div
		class="app__modal-container"
		v-if="modalIsOpened"
		@click.self="closeModal"
	>
		<div class="app__modal modal">
			<div class="modal__icon" @click="closeModal">
				<span></span>
				<span></span>
			</div>
			<div class="modal__header">
				<h2 class="modal__title">Добавление пользователя</h2>
			</div>
			<div class="modal__content">
				<form class="form">
					<div class="form__row">
						<label for="name" class="form__label">Имя</label>
						<input
							class="input flex-shrink-0"
							type="text"
							name="name"
							placeholder="Иван"
							v-model="user.name"
						>
					</div>
					<div class="form__row">
						<label for="phone" class="form__label">Телефон</label>
						<input
							class="input flex-shrink-0"
							type="text"
							name="phone"
							placeholder="+7 (977) 777 77 77"
							v-maska="'+7 (###) ### ## ##'"
							v-model="user.phone"
						>
					</div>
					<div class="form__row">
						<label for="superior" class="form__label">Начальник</label>
						<select
							class="select flex-shrink-0"
							name="superior"
							:disabled="usersList.length === 0"
							v-model="user.superior"
						>
							<option
								v-for="user in usersList"
								:key="user.id"
								:value="user"
							>
								{{ user.name }}
							</option>
						</select>
					</div>
					<div class="form__row">
						<button
							class="form__button button --dark"
							:disabled="!formIsFilled"
							@click="updateUsers"
						>
							Сохранить
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import { maska } from "maska";
import { mapState, mapGetters, mapMutations } from "vuex";
import Modal from "../plugins/modal";

const setEmptyUser = () => ({
	name: undefined,
	phone: undefined,
	superior: undefined,
})

export default {
	name: "AppModal",
	directives: { maska },
	data() {
		return {
			modalIsOpened: false,
			user: setEmptyUser()
		}
	},
    beforeMount() {
        Modal.eventBus.$on('showModal', () => {
            this.showModal()
        })
    },
    methods: {
		...mapMutations(['addUser']),
		showModal() {
			document.body.style = 'overflow: hidden;';
			this.modalIsOpened = true;
		},
		closeModal() {
			document.body.style = '';
			this.user = setEmptyUser();
			this.modalIsOpened = false;
		},
		updateUsers() {
			const newUser = {
				name: this.user.name,
				phone: this.user.phone,
				superiorId: this.user.superior ? this.user.superior.id : null,
				subordinationLevel: this.user.superior ? this.user.superior.subordinationLevel + 1 : 0,
				subordinates: []
			}
			this.addUser(newUser);
			localStorage.roistatTestTask = JSON.stringify(this.usersTree);
			this.closeModal();
		},
	},
	computed: {
		...mapGetters(['usersList']),
		...mapState(['usersTree']),
		phoneIsValid() {
			const phoneRegExp = /^\+7 \(\d{3}\) \d{3} \d{2} \d{2}$/;
			return phoneRegExp.test(this.user.phone)
		},
		formIsFilled() {
			return this.user.name && this.phoneIsValid
		}
	},
}
</script>

<style lang="scss">
.app__modal-container {
	position: absolute;
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #333333bb;
}
.modal__icon {
	position: absolute;
	right: 6px;
	top: 10px;
	width: 30px;
	height: 30px;
}
.modal__icon > span {
	position: absolute;
	top: 40%;
	width: 30px;
	height: 5px;
	background-color: #f33;

	&:first-child {
		transform: rotate(45deg);
	}
	&:last-child {
		transform: rotate(-45deg);
	}
}
.app__modal {
	width: 500px;
	margin: 0 auto;
}
.modal {
	position: relative;
	padding: 50px 40px 40px 40px;
	box-sizing: border-box;
	background-color: #fff;
}
.modal__header {
	margin-bottom: 50px;
}
.modal__title {
	margin: 0;
	text-align: center;
}
.form {
	display: flex;
	flex-direction: column;
	margin-bottom: -40px;
}
.form__row {
	display: flex;
	align-items: center;
	margin-bottom: 40px;
}
.form__label {
	flex-grow: 1;
	margin-right: 10px;
}
.form__button {
	display: block;
	margin-left: auto;
}

@media (max-width: 600px) {
	.app__modal {
		min-width: 320px;
		width: 80%;
	}
	.form__row {
		flex-direction: column;
		align-items: start;
	}
	.form__label {
		margin-bottom: 10px;
	}
	.form__button {
		width: 100%;
	}
}
</style>