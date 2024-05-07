package com.edu.hcmuaf.springserver.repositories;

import com.edu.hcmuaf.springserver.entity.ShowTime;
import com.edu.hcmuaf.springserver.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    Ticket findOneById(int id);


    boolean existsByShowTimeIdAndSeatId(int showTimeId, int seatId);



}
