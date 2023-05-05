import React from 'react';
import { Container, Row } from 'reactstrap';
import ActivityFeed from './ActivityFeed';
import AddedJobs from './AddedJobs';
import CandidateSection from './CandidateSection';

//Import Components
import ChartSection from './ChartSection';
import JobVacancy from './JobVacancy';
import ReceivedTime from './ReceivedTime';
import Section from './Section';
import StatisticsApplications from './StatisticsApplications';

const DashboardJob = () => {
    document.title = "Job Dashboard | Skote - React Admin & Dashboard Template"
    const chartsData = [
        {
            id: 1,
            title: "New Jobs",
            price: "85",
            perstangeValue: "18.89",
            bagdeColor: "success",
            seriesData: [{
                name: "Job View",
                data: [36, 21, 65, 22, 35, 50, 87, 98],
            }],
            color: '["--bs-success", "--bs-transparent"]'
        },
        {
            id: 2,
            title: "Total Technicians",
            price: "150",
            perstangeValue: "24.07",
            bagdeColor: "success",
            seriesData: [{
                name: "New Application",
                data: [36, 48, 10, 74, 35, 50, 70, 73],
            }],
            color: '["--bs-success", "--bs-transparent"]'
        },
        {
            id: 3,
            title: "Jobs Assigned",
            price: "50",
            perstangeValue: " 8.41",
            bagdeColor: "success",
            seriesData: [{
                name: "Total Approved",
                data: [60, 14, 5, 60, 30, 43, 65, 84],
            }],
            color: '["--bs-success", "--bs-transparent"]'
        },
        {
            id: 4,
            title: "Jobs Unassigned",
            price: "25",
            perstangeValue: " 20.63",
            bagdeColor: "danger",
            istrendingArrow: true,
            seriesData: [{
                name: "Total Rejected",
                data: [32, 22, 7, 55, 20, 45, 36, 20],
            }],
            color: '["--bs-danger", "--bs-transparent"]'
        },
    ];
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>

                    <Section />

                    <ChartSection chartsData={chartsData} />
                    <Row>
                        {/* StatisticsApplications */}
                        <StatisticsApplications />

                        {/* CandidateSection */}
                        <AddedJobs />
                    </Row>

                    <Row>
                        <JobVacancy />
                    </Row>

                    <Row>
                        <ReceivedTime />
                        <ActivityFeed />
                        <AddedJobs />
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}

export default DashboardJob;
