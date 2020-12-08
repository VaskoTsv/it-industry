import {
    _cyan_,
    _green_,
    _lightRed_,
    _orange_,
    _purple_
} from './components/styles/utils.js';

export const BASE_URL = process.env.BASE_URL;

// Google maps api constants
export const SOFIA_CENTER_LOCATION = {lat: 42.6979, lng: 23.3213};
export const BULGARIA_BOUNDS = {
    north: 46,
    south: 39,
    west: 22,
    east: 30,
};

// Bulgaria main cities ordered by population
export const MAIN_CITIES = [
    {id: 1, title: 'Sofia', value: 'София'}, // value = city name as saved in db
    {id: 2, title: 'Plovdiv', value: 'Пловдив'},
    {id: 3, title: 'Varna', value: 'Варна'},
    {id: 4, title: 'Burgas', value: 'Бургас'},
    {id: 5, title: 'Ruse', value: 'Русе'},
    {id: 6, title: 'Stara Zagora', value: 'Стара Загора'},
    {id: 7, title: 'Pleven', value: 'Плевен'},
    {id: 8, title: 'Dobrich', value: 'Добрич'},
    {id: 9, title: 'Sliven', value: 'Сливен'},
    {id: 10, title: 'Shumen', value: 'Шумен'},
    {id: 11, title: 'Pernik', value: 'Перник'},
    {id: 12, title: 'Haskovo', value: 'Хасково'},
    {id: 13, title: 'Yambol', value: 'Ямбол'},
    {id: 14, title: 'Pazardzhik', value: 'Пазарджик'},
    {id: 15, title: 'Blagoevgrad', value: 'Благоевград'},
    {id: 16, title: 'Veliko Tarnovo', value: 'Велико Търново'},
    {id: 17, title: 'Vratsa', value: 'Враца'},
    {id: 18, title: 'Gabrovo', value: 'Габрово'},
    {id: 19, title: 'Vidin', value: 'Видин'},
    {id: 20, title: 'Lovech', value: 'Ловеч'},
];

export const TRANSLATED_CITIES = {
    'София': 'Sofia',
    'Пловдив': 'Plovdiv',
    'Варна': 'Varna',
    'Бургас': 'Burgas',
    'Русе': 'Ruse',
    'Стара Загора': 'Stara Zagora',
    'Плевен': 'Pleven',
    'Добрич': 'Dobrich',
    'Сливен': 'Sliven',
    'Шумен': 'Shumen',
    'Перник': 'Pernik',
    'Хасково': 'Haskovo',
    'Ямбол': 'Yambol',
    'Пазарджик': 'Pazardzhik',
    'Благоевград': 'Blagoevgrad',
    'Велико Търново': 'Veliko Tarnovo',
    'Враца': 'Vratsa',
    'Габрово': 'Gabrovo',
    'Видин': 'Vidin',
    'Ловеч': 'Lovech',
};

export const COMPANY_SIZE = [
    {id: 999, title: '------By Size------', value: '0-10000'}, // empty filter value
    {id: 1, title: 'Startup', value: '0-15'}, // value = number of employees, (min-max) values
    {id: 2, title: 'Small', value: '16-50'},
    {id: 3, title: 'Medium', value: '51-100'},
    {id: 4, title: 'Big', value: '101-300'},
    {id: 5, title: 'Large', value: '301-10000'},
];

export const PROFIT_SIZE = [
    {id: 999, title: '------By Profit------', value: '0-1000000'}, // empty filter value
    {id: 1, title: 'Broke', value: '0-0'}, // value = company profit, (min-max) values
    {id: 2, title: 'Poor', value: '0-60000'},
    {id: 3, title: 'Normal', value: '60000-200000'},
    {id: 4, title: 'Rich', value: '200000-600000'},
    {id: 5, title: 'Very rich', value: '600000-10000000'},
];

export const COMPANIES_COMPARE_TYPE = [
    {id: 1, title: 'Companies Size', value: 'size'},
    {id: 2, title: 'Companies Profit', value: 'profit'},
]

export const COMPANY_SCALE = {
    'Startup': {scale: 5, color: _lightRed_},
    'Small': {scale: 10, color: _orange_},
    'Medium': {scale: 20, color: _purple_},
    'Big': {scale: 30, color: _cyan_},
    'Large': {scale: 45, color: _green_},
};
