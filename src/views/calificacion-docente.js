import React from 'react'
import Dropdown from '../components/drop-down';
import styled from 'styled-components';
import * as awsHelper from '../utilities/aws-helper';

const Layout = styled.div`
    width:600px;
    padding-top: 10px;
    display: flex;
    margin-bottom: 30px;
    flex-direction: ${props => props.columns ? "column" : "row"};
`;

const CalificacionDocente = () => {

    const [cleanedSemesters, setCleanedSemesters] = React.useState([]);
    const [cleanedMaterias, setCleanedMateria] = React.useState([]);
    // rateList

    const getSemesters = async () => {
        const rates = await awsHelper.getRates("20");
        const academicCalendars = rates.map(
            (rate) => {
                return rate.academicCalendar;
            }
        );

        const semesters = await awsHelper.getSemestersList();
        setCleanedSemesters(
            semesters.filter(
                (semester) => {
                    return academicCalendars.includes(semester.id)
                }
            )
        )
    }


    const changeCourses = async () => {}

    React.useEffect(
        () => {
            getSemesters();
        }
    );
    
    
    return <div>
        <Layout >
            <Layout columns>
                <h3>Semestre</h3>
                <Dropdown width="150px">
                {
                    cleanedSemesters.map(
                        (cleanedSemesterList) =>
                        <option key={cleanedSemesterList.id}>{`${cleanedSemesterList.year}-${cleanedSemesterList.period}`}</option>
                    )
                }
                </Dropdown>
            </Layout>
            <Layout columns>
                <h3>Asignatura</h3>
                <Dropdown width="200px">
                {
                    
                }
                </Dropdown>
            </Layout>

        </Layout>
    </div>
}

export default CalificacionDocente