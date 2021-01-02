import * as React from 'react';

import 'molecules/SalaryList/SalaryList.scss';

export const SalaryList = () => {
  const [allSalary, setAllSalary] = React.useState<number>(0);
  const [allAvans, setAllAvans] = React.useState<number>(0);

  const data = [
    {
      name: 'Петя',
      sex: 'Муж.',
      phone: '079652374',
      salary: 3599,
      avans: 0
    },
    {
      name: 'Ваня',
      sex: 'Муж.',
      phone: '079652374',
      salary: 3599,
      avans: 600
    },
    {
      name: 'Гриша',
      sex: 'Муж.',
      phone: '079652374',
      salary: 3599,
      avans: 0
    },
    {
      name: 'Саша',
      sex: 'Муж.',
      phone: '079652374',
      salary: 3599,
      avans: 200
    },
    {
      name: 'Дима',
      sex: 'Муж.',
      phone: '079652374',
      salary: 3599,
      avans: 555
    },
    {
      name: 'Вася',
      sex: 'Муж.',
      phone: '079652374',
      salary: 3599,
      avans: 1000
    }
  ];

  const salaryResultItem = (x: number, y: number) => {
    return x - y;
  };

  const salaryRemain = () => {
    return allSalary - allAvans;
  };

  React.useEffect(() => {
    setAllAvans(data.reduce((total, item) => total + item.avans, 0));
    setAllSalary(data.reduce((total, item) => total + item.salary, 0));
  }, [data]);

  return (
    <div className="salary-list">
      <div className="title">
        <div className="title__text">Список зарплат</div>
        <div className="title__period">Период 01.02.2021 - 01.03.2021</div>
      </div>
      <div className="item_list">
        {data.map((item, index) => (
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
              <button>Аванс</button>
            </div>
            <div className="button-salary">
              <button>Зарплата</button>
            </div>
          </div>
        ))}
      </div>
      <div className="footer">
        <div className="title__total_number">{data.length} человек</div>
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
