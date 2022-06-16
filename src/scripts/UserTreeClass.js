export class UsersTree {
	constructor(usersTree = []) {
		this.usersTree = usersTree
	}
	addUser(user, usersTreeLevel = this.usersTree, superiorId = null) {
		if (user.superiorId === superiorId) {
			usersTreeLevel.push({
				...user,
				subordinates: []
			});
			return
		}
		if (usersTreeLevel.length !== 0) {
			for (let i = 0; i < usersTreeLevel.length; i++) {
				this.addUser(user, usersTreeLevel[i].subordinates, usersTreeLevel[i].id)
			}
		}
	}
	getUsersList(usersList = [], usersTreeLevel = this.usersTree) {
		if (usersTreeLevel.length === 0) {
			return []
		}
		for (let i = 0; i < usersTreeLevel.length; i++) {
			usersList.push({
				name: usersTreeLevel[i].name,
				phone: usersTreeLevel[i].phone,
				id: usersTreeLevel[i].id,
				subordinationLevel: usersTreeLevel[i].subordinationLevel
			})
			if (usersTreeLevel[i].subordinates.length) {
				this.getUsersList(usersList, usersTreeLevel[i].subordinates)
			}
		}
		return usersList
	}
	sort(sortParameter, isReversed, usersTreeLevel = this.usersTree) {
		if (usersTreeLevel.length === 0) {
			return
		}
		usersTreeLevel.sort((user1, user2) => {
			if (user1[sortParameter] < user2[sortParameter]) {
				return -1;
			}
			if (user1[sortParameter] > user2[sortParameter]) {
				return 1;
			}
			return 0;
		})
		if (isReversed) {
			usersTreeLevel.reverse()
		}
		for (let i = 0; i < usersTreeLevel.length; i++) {
			if (usersTreeLevel[i].subordinates.length) {
				this.sort(sortParameter, isReversed, usersTreeLevel[i].subordinates)
			}
		}
	}
}