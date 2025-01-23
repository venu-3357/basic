import Calendar from './components/Calendar';
import './App.scss';
import Card from './components/Card';
import peningImport from './assets/pening-activity.svg';
import banner from './assets/Info.svg';

function App() {
  return (
    <div className="app-wrapper">
      <div className="container-fluid">
        {/* Row 1 */}
        <div className="row">
          {/* Left Column */}
          <div className="col-lg-9 col-md-8 col-sm-12 mb-3 left-column">
            <div className="card shadow">
              <div className="card-body p-0">
                <img src={banner} width="100%" />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-lg-3 col-md-4 col-sm-12 mb-3 right-column">
            <Card
              headerTitle="Basic Card"
              icon={peningImport}
              subHeader="Approvals & Actions"
            >
              <div className="request-stats-wrapper d-flex gap-2">
                <div className="d-flex justify-content-between align-items-center pfr-stats-wrapper">
                  <p className="mb-0 f-14">PFR</p>
                  <span>05</span>
                </div>
                <div className="d-flex justify-content-between align-items-center fsr-stats-wrapper">
                  <p className="mb-0 f-14">FSR</p>
                  <span>05</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Row 2 */}
        <div className="row">
          {/* Calendar Section */}
          <div className="col-lg-7 col-md-6 col-sm-12 mb-3">
            <div className="card shadow h-100">
              <div className="card-body">
                <Calendar />
              </div>
            </div>
          </div>

          {/* Cards Section */}
          <div className="col-lg-5 col-md-6 col-sm-12 mb-3">
            <div className="row">
              {[...Array(2)].map((_, index) => (
                <div className="col-12 mb-3" key={index}>
                  <Card
                    headerTitle="Basic Card"
                    icon={peningImport}
                    subHeader="Approvals & Actions"
                  >
                    <div className="request-stats-wrapper d-flex gap-2">
                      <div className="d-flex justify-content-between align-items-center pfr-stats-wrapper">
                        <p className="mb-0 f-14">PFR</p>
                        <span className="pfr-fsr-count">05</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center fsr-stats-wrapper">
                        <p className="mb-0 f-14">FSR</p>
                        <span className="pfr-fsr-count">05</span>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


.app-wrapper .row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* Ensures consistent spacing between rows */
}

.left-column,
.right-column {
  display: flex;
  flex-direction: column;
}

.card {
  flex-shrink: 0;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Align content to the top */
}

.right-column {
  gap: 15px; /* Adds consistent spacing between cards in the right column */
}

.row > [class*="col-"] {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.card.shadow {
  height: auto; /* Allows cards to adjust to their content */
}

.container-fluid {
  display: grid;
  grid-template-columns: 1fr; /* Full width for mobile, adjust as needed */
  gap: 20px; /* Consistent gap for rows */
}
