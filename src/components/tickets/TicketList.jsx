import { useEffect, useState } from "react"
import { getAllTickets } from "../../services/ticketService.js"
import './Tickets.css'
import { Ticket } from "./Ticket.jsx"

export const TicketList = () => {
    const [allTickets, setAllTickets] = useState([])
    const [showEmergencyOnly, setShowEmergencyOnly] = useState(false)
    const [filteredTickets, setFilteredTickets] = useState([])

    useEffect(() => {
        getAllTickets().then((ticketsArr) => {
            setAllTickets(ticketsArr)
        })
    }, [])

    useEffect(() => {
        getAllTickets().then((ticketsArr) => {
            if (showEmergencyOnly) {
                const emergencyTickets = ticketsArr.filter((ticket) => ticket.emergency)
                setFilteredTickets(emergencyTickets)
            } else {
                setFilteredTickets(allTickets)
            }

    })

    }, [showEmergencyOnly, allTickets])

    return (
        <div className="tickets-container">
            <h2>Tickets</h2>
            <button 
                className="filter-btn btn-primary"
                onClick={() => setShowEmergencyOnly(true)}
            >
                Emergency
            </button>
            <button 
                className="filter-btn btn-secondary"
                onClick={() => setShowEmergencyOnly(false)}
            >
                Show All
            </button>
            <article className="tickets">
                {filteredTickets.map((ticket) => {
                    return (
                        <Ticket ticket={ticket} key={ticket.id} />
                    )
                })
                }
            </article>
        </div> 
    )
}