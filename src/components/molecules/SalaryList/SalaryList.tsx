import * as React from 'react';
import { Context } from 'components/context/Context';
import { Button } from 'antd';
import './SalaryList.scss';

export const SalaryList = () => {
  const [allSalary, setAllSalary] = React.useState<number>(0);
  const [allAvans, setAllAvans] = React.useState<number>(0);
  const { salaryList } = React.useContext(Context);

  const salaryResultItem = (x: number, y: number) => {
    return x - y;
  };

  const salaryRemain = () => {
    return allSalary - allAvans;
  };

  React.useEffect(() => {
    setAllAvans(salaryList.reduce((total, item) => total + item.avans, 0));
    setAllSalary(salaryList.reduce((total, item) => total + item.salary, 0));
  }, [salaryList]);

  return (
    <div className="salary-list">
      <div className="title">
        <div className="title__text">Список зарплат</div>
        <div className="title__period">Период 01.02.2021 - 01.03.2021</div>
      </div>
      <div className="item_list">
        {salaryList.map((item, index) => (
          <div className="salary-item" key={index}>
            <div className="salary-item__name">
              {item.name}
              <span>{item.sex}</span>
              <span>Тел. {item.phone}</span>
            </div>
            <div className="salary-item__salary">Зарплата - {item.salary}</div>
            <div className="salary-item__avans">Аванс - {item.avans}</div>
            <div className="salary-item__result">
              Остаток - {salaryResultItem(item.salary, item.avans)}
            </div>
            <div className="button-avans">
              <Button>Аванс</Button>
            </div>
            <div className="button-salary">
              <Button>Выдал ЗП</Button>
            </div>
          </div>
        ))}
      </div>
      <div className="footer">
        <div className="title__total_number">{salaryList.length} человек</div>
        <div className="title__total_salary">
          <span>
            Выдал {allAvans} лей. / Осталось {salaryRemain()} лей.
          </span>
          <span>Всего к отплате {allSalary} лей.</span>
        </div>
      </div>
    </div>
  );
};
