import axios from 'axios';

const API_URL = 'http://localhost:8080/rest/todo/';



class ToDoService {

    authorizeHeader() {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
        }
    }

    async addTodo(todo) {
        this.authorizeHeader();
        let result;
        await axios.post(API_URL + 'add', { "userId": JSON.parse(localStorage.getItem('user')).user.id, "title": todo }).then(function (response) {
            result = response.data.message;
        }).catch(
            function (error) {
                result = error.response.data.message;
            }
        );
        return result;
    }

    async updateTodo(id, todo) {
        this.authorizeHeader();
        let result;
        await axios.post(API_URL + 'update', { "id": id, "userId": JSON.parse(localStorage.getItem('user')).user.id, "title": todo }).then(function (response) {
            result = response.data.message;
        }).catch(
            function (error) {
                result = error.response.data.message;
            }
        );
        return result;
    }

    async getTodosByUserId() {
        this.authorizeHeader();
        let todos = [];
        await axios.post(API_URL + 'getAllByUserId?userId=' + JSON.parse(localStorage.getItem('user')).user.id).then(function (response) {
            todos = response.data.data;
        });
        return todos;
    }

    async deleteTodoById(id) {
        this.authorizeHeader();
        let result;
        await axios.delete(API_URL + 'delete?id=' + id).then(function (response) {
            result = response.data.message;
        });
        return result;
    }

    async doneChangeTodoById(id) {
        this.authorizeHeader();
        let result;
        await axios.post(API_URL + 'doneChange?id=' + id).then(function (response) {
            result = response.data.message;
        });
        return result;
    }
}

export default new ToDoService();