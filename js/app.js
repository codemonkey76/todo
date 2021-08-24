let todoApp = () => {
	return {
		todos: JSON.parse(localStorage.getItem('todos')) ?? [],
		newTodo: '',
		markAll: false,	
		
		get hasTodos() {
			return this.todos.length !== 0;
		},

		get remainingTodos() {
			let count = this.activeTodos.length;
			return `<strong>${count}</strong> item${count !== 1? 's': ''} remaining`;
		},

		get activeTodos() {
			if (!Array.isArray(this.todos)) {
				return [];
			}

			return this.todos.filter(todo => !todo.completed);
		},

		get completedTodos() {
			if (!Array.isArray(this.todos)) {
				return [];
			}

			return this.todos.filter(todo => todo.completed);
		},


		addTodo() {
			if (this.newTodo !== '') {
				this.todos.push({
					body: this.newTodo.trim(),
					completed: false,
					editing: false,
					newText: ''
				});
				
				this.newTodo = '';
			}
		},

		editTodo(index) {
			let todo = this.todos[index];

			todo.newText = todo.body;
			todo.editing = true;
		},

		completeEdit(index) {
			let todo = this.todos[index];

			if (todo.newText === '') {
				this.todos.splice(index, 1)
			}

			todo.body = todo.newText.trim();
			todo.editing = false;
		},

		cancelEdit(index) {
			let todo = this.todos[index];

			todo.newText = '';
			todo.editing = false;
		},

		deleteTodo(index) {
			this.todos.splice(index, 1)
		},

		toggleAllCompleted() {
			this.markAll = ! this.markAll;
			this.todos.forEach(todo => todo.completed = this.markAll);
		},

		toggleCompleted() {
			this.markAll = this.todos.every(todo => todo.completed);
		},

		clearCompleted() {
			this.todos = this.todos.filter(todo => !todo.completed);
		}

	};
};
