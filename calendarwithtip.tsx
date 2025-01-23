import React, { useState } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import "bootstrap/dist/css/bootstrap.min.css";

dayjs.extend(isBetween);

const mockHolidays = [
  { name: "New Year's Day", start_date: "2025-01-01", end_date: "2025-01-01" },
  { name: "Family Day", start_date: "2025-01-02", end_date: "2025-01-02" },
  { name: "Independence Day", start_date: "2025-07-04", end_date: "2025-07-04" },
  { name: "Christmas", start_date: "2025-12-25", end_date: "2025-12-25" },
  { name: "Boxing Day", start_date: "2025-12-26", end_date: "2025-12-26" },
];

function HolidayTooltip({ holiday }) {
  return (
    <div className="tooltip-content">
      <h5>{holiday.name}</h5>
      <p>
        Start Date: {dayjs(holiday.start_date).format("DD MMM YYYY")}
        <br />
        End Date: {dayjs(holiday.end_date).format("DD MMM YYYY")}
      </p>
    </div>
  );
}

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [activeTab, setActiveTab] = useState("calendar");
  const [tooltip, setTooltip] = useState({
    visible: false,
    component: null,
    position: { x: 0, y: 0 },
  });

  const startOfMonth = currentDate.startOf("month");
  const daysInMonth = currentDate.daysInMonth();

  const handlePreviousMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  const handleDateChange = (event) => {
    setCurrentDate(dayjs(event.target.value));
  };

  const handleBadgeClick = (event, holiday) => {
    event.stopPropagation(); // Prevent outside click from closing the tooltip
    const rect = event.target.getBoundingClientRect();

    setTooltip({
      visible: true,
      component: <HolidayTooltip holiday={holiday} />,
      position: { x: rect.left - 220, y: rect.top + window.scrollY - 10 },
    });
  };

  const handleOutsideClick = () => {
    setTooltip({ visible: false, component: null, position: { x: 0, y: 0 } });
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
                <span
                  key={index}
                  className="badge"
                  onClick={(e) => handleBadgeClick(e, holiday)}
                >
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

  return (
    <div className="container" onClick={handleOutsideClick}>
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
          <div className="holiday-list">
            {mockHolidays.map((holiday, index) => (
              <HolidayTooltip key={index} holiday={holiday} />
            ))}
          </div>
        )}
      </div>

      {tooltip.visible && (
        <div
          className="custom-tooltip"
          style={{
            position: "absolute",
            top: tooltip.position.y,
            left: tooltip.position.x,
            zIndex: 1000,
          }}
        >
          {tooltip.component}
        </div>
      )}
    </div>
  );
}
