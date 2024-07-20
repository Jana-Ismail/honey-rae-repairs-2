import { useEffect, useState } from "react"
import { getAllTickets } from "../../services/ticketService.js"
import './Tickets.css'

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
                    <section className="ticket" key={ticket.id}>
                        <header className="ticket-info">#{ticket.id}</header>
                        <div>{ticket.description}</div>
                        <footer>
                        <div>
                            <div className="ticket-info">emergency </div>
                            <div>{ticket.emergency ? "yes" : "no"}</div>
                        </div>
                        </footer>
                    </section>
                    )
                })
                }
            </article>
        </div> 
    )
}