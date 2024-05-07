package com.edu.hcmuaf.springserver.service;

import com.edu.hcmuaf.springserver.dto.PaymentRequest;
import com.edu.hcmuaf.springserver.entity.Reservation;
import com.edu.hcmuaf.springserver.repositories.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    public void createReservation(Reservation reservation) {
        reservationRepository.save(reservation);
    }

    public boolean checkExistReservation(String codeOrder) {
       return reservationRepository.existsReservationByOrder(codeOrder);
    }
}
