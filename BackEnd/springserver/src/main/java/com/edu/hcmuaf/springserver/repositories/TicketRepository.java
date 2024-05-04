package com.edu.hcmuaf.springserver.repositories;

import com.edu.hcmuaf.springserver.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    Ticket findOneById(int id);


}
