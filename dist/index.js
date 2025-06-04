import React, { useState, useEffect } from 'react';
import { useRecordContext, useRecordsContext, useTableContext } from '@gristlabs/react-data-grid';
export default function MeditationWidget() {
  const records = useRecordsContext();
  const table = useTableContext();

  // Локальное состояние для отображения прогресса (можно синхронизировать с Grist)
  const [progressMap, setProgressMap] = useState({});
  useEffect(() => {
    // Инициализация прогресса из данных таблицы
    const initialProgress = {};
    records.forEach(rec => {
      initialProgress[rec.id] = rec['Progress Metric'] || 0;
    });
    setProgressMap(initialProgress);
  }, [records]);

  // Обработчик клика по кнопке "Отметить сессию"
  const toggleProgress = id => {
    const newProgress = progressMap[id] ? 0 : 1; // пример: 0 или 1 для простоты
    setProgressMap(prev => ({
      ...prev,
      [id]: newProgress
    }));

    // Обновляем значение в таблице Grist
    const rowId = id;
    table.updateRecord(rowId, {
      'Progress Metric': newProgress
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 10,
      fontFamily: 'Arial, sans-serif'
    }
  }, /*#__PURE__*/React.createElement("h3", null, "\u041F\u043B\u0430\u043D \u043C\u0435\u0434\u0438\u0442\u0430\u0446\u0438\u0439"), /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      borderBottom: '1px solid #ccc'
    }
  }, /*#__PURE__*/React.createElement("th", null, "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435"), /*#__PURE__*/React.createElement("th", null, "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435"), /*#__PURE__*/React.createElement("th", null, "\u0414\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C"), /*#__PURE__*/React.createElement("th", null, "\u0427\u0430\u0441\u0442\u043E\u0442\u0430"), /*#__PURE__*/React.createElement("th", null, "\u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441"))), /*#__PURE__*/React.createElement("tbody", null, records.map(rec => /*#__PURE__*/React.createElement("tr", {
    key: rec.id,
    style: {
      borderBottom: '1px solid #eee'
    }
  }, /*#__PURE__*/React.createElement("td", null, rec['Task']), /*#__PURE__*/React.createElement("td", null, rec['Description']), /*#__PURE__*/React.createElement("td", null, rec['Duration']), /*#__PURE__*/React.createElement("td", null, rec['Frequency']), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
    onClick: () => toggleProgress(rec.id),
    style: {
      padding: '5px 10px',
      backgroundColor: progressMap[rec.id] ? '#4caf50' : '#e0e0e0',
      color: progressMap[rec.id] ? 'white' : 'black',
      border: 'none',
      borderRadius: 4,
      cursor: 'pointer'
    }
  }, progressMap[rec.id] ? 'Выполнено' : 'Отметить')))))));
}