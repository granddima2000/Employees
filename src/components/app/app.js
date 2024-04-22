import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [ // БД
                {name: "Dima R.", salary: 800, increase: true, rise: true, men: true, id: 1},
                {name: "Alex B.", salary: 3000, increase: false, rise: false, men: true, id: 2},
                {name: "Greg B.", salary: 5000, increase: true, rise: false, men: true, id: 3}
            ],
            term: "", //будет приходить из SearchPanel, а туда попадать при внесение инфо в value польз.
            filter: "all" //по умолчанию отражаются все сотрудники
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        });
    }

    addItem = (name, salary) => {
        const newItem = {  //шаблон нового поста 
            name,
            salary,
            increase: false,
            rise: false,
            id: this.maxId++
        };
        this.setState(({data}) => {
                const newArr = [...data, newItem]
            return {
                data: newArr
            }
        });
    };

    // добавляет rise / increase
    onToggleProp = (id, prop) => { //id - приходит при нажатии на кнопку с cookie или star
        this.setState(({data}) => ({ //возвращаем объект 
            data: data.map(item => { //map создает новый []
                if (item.id === id) {   //если при переборе id эл. совпадем с id приходящего эл
                    return {...item, [prop]: !item[prop]} //[prop]: !item[prop] - это если бы записали increase: !item.increase , создается новый объект с изменненным в нем increase на противоположен.
                }
                return item;
            })
        }))
    };
    // Метод для поиска
    searchEmp = (items, term) => {
        if (term.length === 0) { // если пользователь удаляет строку 
            return items; // Возвращаем массив
        } // Если ничего не приходит

        return items.filter(item => { // Фильтруем массив 
            return item.name.indexOf(term) > -1;
        });
    };

    onUpdateSearch = (term) => { //эти данные будут приходить из SearchPanel
        this.setState({term});
    };

    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise': 
                return items.filter(item => item.rise)
            case 'moreThen1000':
                return items.filter(item => item.salary > 1000)
            case 'men': 
                return items.filter(item => item.men)
            default: 
                return items;
        }
    };

    onFilterSelect = (filter) => {
        this.setState({filter});
    };


    onChangeSalary = (id, salary, value) => {
        this.setState(({data}) => {
            data.map(item => {
                
                if (item.id === id) {
                    return {...item, [salary]: value}
                }
                return item;
            });
        });
    };


    render() {
        const {data, term, filter} = this.state;
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter); // предварительно фильтруем массив 

        return (
            <div className="app">
                <AppInfo employees={employees} increased={increased}/>
    
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter 
                    filter={filter}
                    onFilterSelect={this.onFilterSelect}
                    />
                </div>
                
                <EmployeesList 
                data={visibleData}
                onDelete={this.deleteItem}
                onToggleProp={this.onToggleProp}
                onChangeSalary={this.onChangeSalary}
                />
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;