
import { SectionTemplate } from '../types';

export const sectionTemplates: SectionTemplate[] = [
  {
    id: 'section-001',
    name: 'Предварительная подготовка (на базе)',
    type: 'checklist',
    items: [
      {
        id: 'item-001',
        content: 'Зарядить батареи:',
        type: 'checkbox',
        subItems: [
          {
            id: 'subitem-001',
            content: 'Силовые АКБ',
            type: 'checkbox',
            value: false,
          },
          {
            id: 'subitem-002',
            content: 'АКБ пульта РДУ',
            type: 'checkbox',
            value: false,
          },
          {
            id: 'subitem-003',
            content: 'АКБ НСУ',
            type: 'checkbox',
            value: false,
          },
        ],
      },
      {
        id: 'item-002',
        content: 'Подготовить и загрузить подложки для местности полетов на НСУ',
        type: 'checkbox',
        value: false,
      },
      {
        id: 'item-003',
        content: 'Загрузить карту высот на НСУ',
        type: 'checkbox',
        value: false,
      },
      {
        id: 'item-004',
        content: 'Подготовить маршрут',
        type: 'checkbox',
        value: false,
      },
      {
        id: 'item-005',
        content: 'Произвести сбор оборудования по списку',
        type: 'checkbox',
        value: false,
      },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'section-002',
    name: 'Предварительная подготовка (на месте)',
    type: 'checklist',
    items: [
      {
        id: 'item-006',
        content: 'Оценить погодные условия, отложить полет если:',
        type: 'checkbox',
        subItems: [
          {
            id: 'subitem-004',
            content: 'постоянный ветер более 10m/s',
            type: 'checkbox',
            value: false,
          },
          {
            id: 'subitem-005',
            content: 'порывы ветра более 15m/s',
            type: 'checkbox',
            value: false,
          },
          {
            id: 'subitem-006',
            content: 'направление ветра боковое относительно линии разгона',
            type: 'checkbox',
            value: false,
          },
          {
            id: 'subitem-007',
            content: 'видимость не позволяет вести съемку',
            type: 'checkbox',
            value: false,
          },
          {
            id: 'subitem-008',
            content: 'осадки',
            type: 'checkbox',
            value: false,
          },
          {
            id: 'subitem-009',
            content: 'негативная динамика погоды',
            type: 'checkbox',
            value: false,
          },
        ],
      },
      {
        id: 'item-007',
        content: 'Произвести сборку БЛА',
        type: 'checkbox',
        value: false,
      },
      {
        id: 'item-008',
        content: 'Установить фюзеляж в исходное положение',
        type: 'checkbox',
        value: false,
      },
      {
        id: 'item-009',
        content: 'Установить АКБ',
        type: 'checkbox',
        value: false,
      },
      {
        id: 'item-010',
        content: 'Установить воздушный винт на маршевый двигатель, проверить затяжку',
        type: 'checkbox',
        value: false,
      },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'section-003',
    name: 'Предполетная подготовка (Перед взлетом)',
    type: 'checklist',
    items: [
      {
        id: 'item-011',
        content: 'Подать электропитание питание на БЛА, дождаться загрузки автопилота',
        type: 'checkbox',
        value: false,
      },
      {
        id: 'item-012',
        content: 'Проверить наличие связи с НСУ, убедится в корректности телеметрии',
        type: 'checkbox',
        value: false,
      },
      {
        id: 'item-013',
        content: 'Пройти предполетные проверки',
        type: 'checkbox',
        subItems: [
          {
            id: 'subitem-010',
            content: 'Сервоприводы',
            type: 'checkbox',
            value: false,
          },
          {
            id: 'subitem-011',
            content: 'Регуляторы',
            type: 'checkbox',
            value: false,
          },
          {
            id: 'subitem-012',
            content: 'БАНО',
            type: 'checkbox',
            value: false,
          },
          {
            id: 'subitem-013',
            content: 'Сделать контрольное фото',
            type: 'checkbox',
            value: false,
          },
          {
            id: 'subitem-014',
            content: 'СВС',
            type: 'checkbox',
            value: false,
          },
        ],
      },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'section-004',
    name: 'Взлет',
    type: 'checklist',
    items: [
      {
        id: 'item-014',
        content: 'Запустить видеофиксацию',
        type: 'checkbox',
        value: false,
      },
      {
        id: 'item-015',
        content: 'Опрос перед взлетом:',
        type: 'checkbox',
        subItems: [
          {
            id: 'subitem-015',
            content: 'чеклист подготовки выполнен',
            type: 'checkbox',
            value: false,
          },
          {
            id: 'subitem-016',
            content: 'питание 220В наземной станции поступает',
            type: 'checkbox',
            value: false,
          },
          {
            id: 'subitem-017',
            content: 'батареи 50В',
            type: 'checkbox',
            value: false,
          },
          {
            id: 'subitem-018',
            content: 'GNSS 12+',
            type: 'checkbox',
            value: false,
          },
          {
            id: 'subitem-019',
            content: 'пилот готов, пульт в автоматическом режиме',
            type: 'checkbox',
            value: false,
          },
        ],
      },
      {
        id: 'item-016',
        content: 'Разблокировать АРМ с НСУ',
        type: 'checkbox',
        value: false,
      },
      {
        id: 'item-017',
        content: 'Заармить ЛА с пульта ДУ',
        type: 'checkbox',
        value: false,
      },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'section-005',
    name: 'Полет по Маршруту',
    type: 'checklist',
    items: [
      {
        id: 'item-018',
        content: 'Контролировать показатели скорости, высоты, крена и тангажа при прохождении ППМ',
        type: 'checkbox',
        value: false,
      },
      {
        id: 'item-019',
        content: 'Контролировать увеличение счетчика снимков на участках АФС',
        type: 'checkbox',
        value: false,
      },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'section-006',
    name: 'Посадка',
    type: 'checklist',
    items: [
      {
        id: 'item-020',
        content: 'Контролировать заход на посадочную глиссаду',
        type: 'checkbox',
        value: false,
      },
      {
        id: 'item-021',
        content: 'Контролировать выключение маршевого двигателя за 200 метров до последнего ППМ',
        type: 'checkbox',
        value: false,
      },
      {
        id: 'item-022',
        content: 'Контролировать заход на посадочную точку в коптерном режиме',
        type: 'checkbox',
        value: false,
      },
      {
        id: 'item-023',
        content: 'Контролировать снижение, при необходимости перехватить в ручной режим с пульта ДУ',
        type: 'checkbox',
        value: false,
      },
      {
        id: 'item-024',
        content: 'После касания земли заблокировать двигатели с НСУ или пульта ДУ',
        type: 'checkbox',
        value: false,
      },
    ],
    createdAt: new Date().toISOString(),
  },
];
