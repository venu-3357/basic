import React, { useState } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

const mockHolidays = [
  { name: "New Year's Day", start_date: "2025-01-01", end_date: "2025-01-01" },
  { name: "New Year's Day", start_date: "2025-01-01", end_date: "2025-01-01" },
  { name: "New Year's Day", start_date: "2025-01-01", end_date: "2025-01-01" },
  { name: "New Year's Day", start_date: "2025-01-01", end_date: "2025-01-01" },
  { name: "Family Day", start_date: "2025-01-01", end_date: "2025-01-01" },
  {
    name: "Independence Day",
    start_date: "2025-07-04",
    end_date: "2025-07-04",
  },
  { name: "Christmas", start_date: "2025-12-25", end_date: "2025-12-25" },
  { name: "Boxing Day", start_date: "2025-12-25", end_date: "2025-12-25" },
];

export default function PremiumCalendar() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [activeTab, setActiveTab] = useState("calendar");

  const startOfMonth = currentDate.startOf("month");
  const daysInMonth = currentDate.daysInMonth();

  const handlePreviousMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentDate(dayjs(event.target.value));
  };

  const generateCalendar = () => {
    const days = [];
    for (let i = 0; i < startOfMonth.day(); i++) {
      days.push(<div key={`empty-${i}`} className="day-cell empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = currentDate.date(day).format("YYYY-MM-DD");
      const holidays = mockHolidays.filter((holiday) =>
        dayjs(date).isBetween(
          dayjs(holiday.start_date).startOf("day"),
          dayjs(holiday.end_date).endOf("day"),
          null,
          "[]"
        )
      );

      const isHoliday = holidays.length > 0;

      days.push(
        <div
          key={date}
          className={`day-cell ${isHoliday ? "holiday" : ""}`}
          title={isHoliday ? holidays.map((h) => h.name).join(", ") : ""}
        >
          <div className="date-label">{day}</div>
          {isHoliday && (
            <div className="holiday-badges">
              {holidays.slice(0, 2).map((holiday, index) => (
                <span key={index} className="badge">
                  {holiday.name}
                </span>
              ))}
              {holidays.length > 2 && (
                <span className="badge more-badge">
                  +{holidays.length - 2} more
                </span>
              )}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const renderHolidayList = () => {
    const holidays = mockHolidays.filter(
      (holiday) => dayjs(holiday.start_date).year() === currentDate.year()
    );

    return holidays.length > 0 ? (
      <div className="holiday-list">
        {holidays.map((holiday, index) => (
          <div key={index} className="list-item">
            <strong>{holiday.name}</strong>
            <div className="date-range">
              {dayjs(holiday.start_date).format("DD MMM YYYY")} -{" "}
              {dayjs(holiday.end_date).format("DD MMM YYYY")}
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="no-holidays">No holidays found for this year.</div>
    );
  };

  return (
    <div className="container">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center">
          <button className="btn btn-light me-2" onClick={handlePreviousMonth}>
            &lt;
          </button>
          <input
            type="month"
            className="form-control premium-date-picker me-2"
            value={currentDate.format("YYYY-MM")}
            onChange={handleDateChange}
          />
          <button className="btn btn-light ms-2" onClick={handleNextMonth}>
            &gt;
          </button>
        </div>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "calendar" ? "active" : ""}`}
              onClick={() => setActiveTab("calendar")}
            >
              Calendar View
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "list" ? "active" : ""}`}
              onClick={() => setActiveTab("list")}
            >
              List View
            </button>
          </li>
        </ul>
      </div>

      <div>
        {activeTab === "calendar" ? (
          <div className="calendar-grid">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div className="day-header" key={day}>
                {day}
              </div>
            ))}
            {generateCalendar()}
          </div>
        ) : (
          renderHolidayList()
        )}
      </div>

      <style>{`
        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          width: 100%;
          border: 1px solid #ccc;
        }
        .day-header,
        .day-cell {
          border: 1px solid #ccc;
          text-align: center;
          padding: 10px;
          min-height: 100px;
          position: relative;
        }
        .date-label {
          position: absolute;
          top: 5px;
          right: 5px;
          font-size: 12px;
          font-weight: bold;
          color: #888;
        }
        .day-cell.holiday {
          background-color: #f9f2e8;
        }
        .holiday-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-top: 5px;
        }
        .badge {
          background-color: #f48665;
          color: white;
          padding: 2px 5px;
          border-radius: 3px;
          font-size: 12px;
        }
        .more-badge {
          background-color: #d9534f;
        }

        .holiday-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .list-item {
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          background-color: #fff;
        }
        .list-item .date-range {
          color: #888;
          font-size: 14px;
          margin-top: 5px;
        }
        .no-holidays {
          color: #555;
          font-size: 16px;
          text-align: center;
        }
        .premium-date-picker {
          border: 1px solid #d4af37;
          border-radius: 5px;
          padding: 5px 10px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
          font-size: 16px;
          color: #555;
        }
        .premium-date-picker:focus {
          border-color: #b8860b;
          outline: none;
          box-shadow: 0 0 5px #b8860b;
        }
      `}</style>
    </div>
  );
}
