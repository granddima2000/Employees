import './app-info.css';

const AppInfo = ({increased, employees, rise}) => {
    return (
        <div className="app-info">
            <h1>Учет сотрудников в компаниии Рога и Копыта</h1>
            <h2>Общее число сотрудников: {employees}</h2>
            <h2>Премию получат: {increased}</h2>
            <h3>Повышение получат: {rise}</h3>

        </div>
    );
};

export default AppInfo;