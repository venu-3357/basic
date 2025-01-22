import React from 'react';
import Calendar from './components/Calendar';
import Card from './components/Card';
import peningImport from './assets/pening-activity.svg';

import './App.scss';

function App() {
  return (
    <>
      <div className="app-wrapper">
        <div className="container-fluid">
          {/* First Row */}
          <div className="row mb-3">
            <div className="col-md-9">
              <div className="card shadow">
                <div className="card-body">
                  <h3 className="card-title">Banner</h3>
                  <p className="card-text">Banner Content</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <Card
                headerTitle="Right Card"
                icon={peningImport}
                subHeader="Approvals & Actions"
              >
                <div className="request-stats-wrapper d-flex flex-column gap-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0">PFR</p>
                    <span>05</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0">FSR</p>
                    <span>05</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0">Additional Content</p>
                    <span>10</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Second Row */}
          <div className="row align-items-stretch">
            <div className="col-md-3 mb-3">
              <Card
                headerTitle="Left Card"
                icon={peningImport}
                subHeader="Left Content"
              >
                <p>This is a left-side card.</p>
              </Card>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card shadow">
                <div className="card-body h-100">
                  <Calendar />
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <Card
                headerTitle="Right Card 2"
                icon={peningImport}
                subHeader="Additional Actions"
              >
                <p>Content for the right-side card in the second row.</p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

.row {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch; /* Ensures columns stretch to match the tallest column */
}

.card {
  height: 100%; /* Ensures cards take the full height available in the column */
}

.col-md-3,
.col-md-6 {
  display: flex;
  flex-direction: column; /* Keeps content aligned within each column */
}

export default App;
