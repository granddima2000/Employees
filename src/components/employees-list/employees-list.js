import EmployeesListItem from "../employees-list-item/employees-list-item";

import './employees-list.css';

const EmployeesList = ({data, onDelete, onToggleProp, onChangeSalary}) => { //приходят как пропсы из app.js

    const elements = data.map(item => { //перебираем [] c данными и каждый раз создаем новую карточку с данными, ктр прописаны
        const {id, ...itemProps} = item; //необходимо из объекта элемента(item) отделить id
        return (
            <EmployeesListItem 
            key={id}
            {...itemProps}
            onDelete={() => onDelete(id)} //полученный из пропсов onDelete изменили указав стрелочную и id и передали далее в EmployeesListItem
            onToggleProp={(e) => onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))}
            onChangeSalary={(value) => onChangeSalary(id, value)}
            /> //e.currentTarget - всегда совпадает эл-том, на ктр обработчик события был назначен и когда один и тот же обр. события присваивается нескольк. эл.
        );
    });

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    );
};

export default EmployeesList;