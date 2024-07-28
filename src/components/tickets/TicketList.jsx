import { useEffect, useState } from "react"
import { getAllTickets } from "../../services/ticketService.js"
import './Tickets.css'
import { Ticket } from "./Ticket.jsx"
import { TicketFilterBar } from "./TicketFilterBar.jsx"
import { CustomerList } from "../customers/CustomerList.jsx"

export const TicketList = ( { currentUser } ) => {
    const [allTickets, setAllTickets] = useState([])
    const [showEmergencyOnly, setShowEmergencyOnly] = useState(false)
    const [filteredTickets, setFilteredTickets] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    const getAndSetTickets = () => {
        getAllTickets().then((ticketsArr) => {
            setAllTickets(ticketsArr)
        })
    }

    useEffect(() => {
        getAndSetTickets()
    }, [])

    useEffect(() => {
        const foundTickets = allTickets.filter(ticket => ticket.description.toLowerCase().includes(searchTerm.toLowerCase()))
        setFilteredTickets(foundTickets)
    }, [searchTerm, allTickets])

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
            <TicketFilterBar setShowEmergencyOnly={setShowEmergencyOnly} setSearchTerm={setSearchTerm}/>
            <article className="tickets">
                {filteredTickets.map((ticket) => {
                    return (
                        <Ticket ticket={ticket} key={ticket.id} currentUser={currentUser} getAndSetTickets={getAndSetTickets}/>
                    )
                })
                }
            </article>
        </div> 
    )
}