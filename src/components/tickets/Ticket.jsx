import { useEffect, useState } from "react"
import { getEmployees } from "../../services/employeeService"
import { assignTicket, updateTicket } from "../../services/ticketService"

export const Ticket = ( {ticket, currentUser, getAndSetTickets}) => {
    const [employees, setEmployees] = useState([])
    const [assignedEmployee, setAssignedEmployee] = useState( )

    const getAllEmployees = () => {
        getEmployees().then((employeeArr) => {
            setEmployees(employeeArr)
        })
    }

    useEffect(() => {
        getAllEmployees()
    }, [])

    useEffect(() => {
        const foundEmployee = employees.find((employee) => employee.id === ticket.employeeTickets[0]?.employeeId)
        setAssignedEmployee(foundEmployee)
    }, [employees, ticket])

    const handleClaim = () => {
        const currentEmployee = employees.find(employee => employee.userId === currentUser.id)

        const employeeTicket = {
            employeeId: currentEmployee.id,
            serviceTicketId: ticket.id,
        }

        assignTicket(employeeTicket).then(() => {
            getAndSetTickets()
        })
        
    }

    const handleClose = () => {
        const closedTicket = {
            id: ticket.id,
            userId: ticket.userId,
            description: ticket.description,
            emergency: ticket.emergency,
            dateCompleted: new Date()
        }

        updateTicket(closedTicket).then(() => {
            getAndSetTickets()
        })
    }

    return (
        <section className="ticket">
            <header className="ticket-info">#{ticket.id}</header>
            <div>{ticket.description}</div>
            <footer>
                <div>
                    <div className="ticket-info">emergency: </div>
                    <div>{ticket.emergency ? "yes" : "no"}</div>
                </div>
                <div>
                    <div className="ticket-info">employee: </div>
                    <div>
                        {assignedEmployee ? assignedEmployee.user?.fullName : "None"}
                    </div>
                </div>
                <div className=" btn-container">
                    {currentUser.isStaff && !assignedEmployee ? (
                        <button 
                            className="btn-secondary"
                            onClick={handleClaim}
                        >
                            Claim
                        </button>
                    ) : (
                        ""
                    )}
                    {currentUser.id === assignedEmployee?.userId && !ticket.dateCompleted ? (
                        <button className="btn btn-warning" onClick={handleClose}>Close</button>
                    ) : (
                        ""
                    )}
                </div>
            </footer>
        </section>
    )
}