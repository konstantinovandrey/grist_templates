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
  const toggleProgress = (id) => {
    const newProgress = progressMap[id] ? 0 : 1; // пример: 0 или 1 для простоты
    setProgressMap(prev => ({ ...prev, [id]: newProgress }));

    // Обновляем значение в таблице Grist
    const rowId = id;
    table.updateRecord(rowId, { 'Progress Metric': newProgress });
  };

  return (
    <div style={{ padding: 10, fontFamily: 'Arial, sans-serif' }}>
      <h3>План медитаций</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #ccc' }}>
            <th>Название</th>
            <th>Описание</th>
            <th>Длительность</th>
            <th>Частота</th>
            <th>Прогресс</th>
          </tr>
        </thead>
        <tbody>
          {records.map(rec => (
            <tr key={rec.id} style={{ borderBottom: '1px solid #eee' }}>
              <td>{rec['Task']}</td>
              <td>{rec['Description']}</td>
              <td>{rec['Duration']}</td>
              <td>{rec['Frequency']}</td>
              <td>
                <button
                  onClick={() => toggleProgress(rec.id)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: progressMap[rec.id] ? '#4caf50' : '#e0e0e0',
                    color: progressMap[rec.id] ? 'white' : 'black',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                  }}
                >
                  {progressMap[rec.id] ? 'Выполнено' : 'Отметить'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
