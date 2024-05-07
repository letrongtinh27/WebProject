package com.edu.hcmuaf.springserver.repositories;

import com.edu.hcmuaf.springserver.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    boolean existsReservationByOrder(String orderId);
}

