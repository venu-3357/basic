import Calendar from './components/Calendar';
import './App.scss';
import Card from './components/Card';
import peningImport from './assets/pening-activity.svg';
import banner from './assets/Info.svg';

function App() {
  return (
    <>
      <div className="app-wrapper">
        <div className="container-fluid">
          <div className="row">
            {/* First Column */}
            <div className="col-lg-9 col-md-8 col-sm-12">
              {/* Banner */}
              <div className="card shadow mb-3">
                <div className="card-body p-0">
                  <img src={banner} alt="Banner" width="100%" />
                </div>
              </div>

              {/* Cards Below Banner */}
              <div className="row">
                {[...Array(3)].map((_, index) => (
                  <div className="col-lg-4 col-md-6 col-sm-12 mb-3" key={index}>
                    <Card
                      headerTitle="Basic Card"
                      icon={peningImport}
                      subHeader="Approvals & Actions"
                      isBordered
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

              {/* Calendar */}
              <div className="card shadow h-100">
                <div className="card-body">
                  <Calendar />
                </div>
              </div>
            </div>

            {/* Second Column */}
            <div className="col-lg-3 col-md-4 col-sm-12">
              {[...Array(3)].map((_, index) => (
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
    </>
  );
}

export default App;
