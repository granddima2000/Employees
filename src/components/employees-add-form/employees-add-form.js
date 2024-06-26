import { Component } from 'react';

import './employees-add-form.css';


class EmployeesAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            salary: ''
        }
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value //в name попадет, то что написал польз. 
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        const {name, salary} = this.state
        if (name.length >= 3 || !salary.length) {
            this.props.onAdd(name, salary)
            
        }
        this.setState({ // значения сбрасывает
            name: '',
            salary: ''
        });
        
        
    };


    
   render() {
    const {name, salary} = this.state; 

    return (
        <div className="app-add-form">
            <h3>Добавьте нового сотрудника</h3>
            <form
                className="add-form d-flex"
                onSubmit={this.onSubmit}>
                <input type="text"
                    className="form-control new-post-label"
                    placeholder="Как его зовут?"
                    name="name" //name и value мы дописываем 
                    value={name} //сюда попадают данные из изменного состояния, если не прописать value, то внесенные данные будут храниться только на сайте
                    onChange={this.onValueChange}/>
                <input type="number"
                    className="form-control new-post-label"
                    placeholder="З/П в $?"
                    name="salary" //name и value мы дописываем 
                    value={salary} 
                    onChange={this.onValueChange}/>

                <button type="submit"
                    className="btn btn-outline-light">Добавить</button>
            </form>
        </div>
    );
   }
};
    

export default EmployeesAddForm;
