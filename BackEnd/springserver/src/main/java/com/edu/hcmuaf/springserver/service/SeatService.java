package com.edu.hcmuaf.springserver.service;

import com.edu.hcmuaf.springserver.dto.SeatResponse;
import com.edu.hcmuaf.springserver.repositories.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SeatService {
    @Autowired
    private SeatRepository seatRepository;

    public List<SeatResponse> getSeatsByShowTime(int showTimeId, int theatreId, int room) {
        return seatRepository.findSeatsByShowTimeAndTheatre(showTimeId, theatreId, room);
    }
}
