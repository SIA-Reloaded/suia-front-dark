
import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import * as awsHelper from "../utilities/aws-helper";
import { UserContext } from '../providers/user-provider';
import Group from '../models/group';

const GroupsTable = styled.table`
  width: 100%;
  text-align: center;
  margin-left: 30px;
  margin-top: 15px;
  tr {  
    td {
      &:not(:last-child) {
        padding: 15px 10px 15px 15px;
        color: #565A5C;
        border-bottom-style: dashed;
        border-bottom-width: 1px;
        border-bottom-color: gray;     
      }
    }
  }
`;

const Text = styled.p`
  font-size: ${(props) => props.size};
  margin-left: 15px;
  color: ${(props) => props.theme.colors.gray[1]};
`

const StudentCourses = (props) => {
    const [studentCoursesList, setStudentCoursesList] = React.useState([]);
    const [coursesGroup, setCoursesGroup] = React.useState([]);
    const [rows, setRows] = React.useState([]);

    const user = React.useContext(UserContext)

    React.useEffect(
        () => {
            getStudentCourses();        
        },
        []
      )

    React.useEffect(
    ()=>{
        if (studentCoursesList){
        getCourses();
        }
    }, [studentCoursesList]
    );

    React.useEffect(
      ()=>{
          if (coursesGroup){
          getRows();         
          }
      }, [coursesGroup]
      );


    const getStudentCourses = async () =>{
        const coursesId = user.userData.current_courses
        console.log(coursesId)
        setStudentCoursesList(coursesId)
    }
    const getCourses = async () => {
        //const courses = await awsHelper.getGroup("3268af60-34f7-11eb-a49f-6d59140d2783")
        const coursesPromises = studentCoursesList.map( 
            (courseID) => {
              return  awsHelper.getGroup(courseID);
            }
          )

        const responseCourses = await Promise.all(coursesPromises);
        setCoursesGroup(responseCourses)
      }

    const getRows = async () => {
      const rows = coursesGroup.map((group) => new Group(
        group.id,
        group.name,
        group.code,
        group.capacityDistribution,
        group.group,
        group.schedule,
        group.classroom,
        group.teacher
      ))
      setRows(rows)
      }

    return <div>
        <Text 
        size ="20px"
        >Cursos inscritos</Text>
        {studentCoursesList.length>0 && <GroupsTable>
        <thead>
          <tr>
            <th>
              CÓDIGO
            </th>
            <th>
              GRUPO
            </th>
            <th> 
              MATERIA
            </th>
            <th>
              PROFESOR
            </th>
            <th>
              SALÓN
            </th>
            <th>
              HORARIO
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(row => {
            return <tr>
              {row.rowRepresentation1.map((data, i) => <td key={data} >{data}</td>)}
            </tr>
              }
            )
          }
        </tbody>
    </GroupsTable>}
    </div>
    
}

export default StudentCourses;