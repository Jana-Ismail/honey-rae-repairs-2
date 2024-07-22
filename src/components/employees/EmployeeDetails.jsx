import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getEmployeeByUserId } from "../../services/employeeService.js"
import "./Employees.css"

export const EmployeeDetails = () => {
    const { employeeUserId } = useParams()
    const [ employee, setEmployee ] = useState([])
    const [ employeeTickets, setEmployeeTickets ] = useState([])

    // const getEmployee = () => {
    //     getEmployeeByUserId(employeeUserId).then((data) => {
    //         const employeeObj = data[0]
    //         setEmployee(employeeObj)

    //     })
    // }

    useEffect(() => {
        getEmployeeByUserId(employeeUserId).then(data => {
            const employeeObj = data[0]
            setEmployee(employeeObj)
        })
    }, [employeeUserId])

    useEffect(() => {
        getEmployeeByUserId(employeeUserId).then(data => {
            const employeeTicketsNum = data[0].employeeTickets?.length
            setEmployeeTickets(employeeTicketsNum)
        })
    }, [employee])


    return (
        <section className="employee">
            <header className="employee-header">{employee.user?.fullName}</header>
            <div>
                <span className="employee-info">Email : </span>
                {employee.user?.email}
            </div>
            <div>
                <span className="employee-info">Rate : </span>
                ${employee.rate} / hr
            </div>
            <div>
                <span className="employee-info">Specialty : </span>
                {employee.specialty}
            </div>
            <div>
                <span className="employee-info">Working on :</span>
                {employeeTickets} tickets
            </div>
        </section>
    )
}