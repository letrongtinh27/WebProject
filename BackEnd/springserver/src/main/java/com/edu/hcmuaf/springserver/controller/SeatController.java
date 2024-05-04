package com.edu.hcmuaf.springserver.controller;

import com.edu.hcmuaf.springserver.dto.SeatResponse;
import com.edu.hcmuaf.springserver.service.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/seats")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SeatController {
    @Autowired
    private SeatService seatService;

    @GetMapping("/get/{showTimeId}/{theatreId}/{room}")
    public ResponseEntity<List<SeatResponse>> getSeatsByShowTime(@PathVariable("showTimeId") int showTimeId, @PathVariable("theatreId") int theatreId, @PathVariable("room") int room) {
        List<SeatResponse> seats = seatService.getSeatsByShowTime(showTimeId, theatreId, room);
        return ResponseEntity.ok(seats);
    }

}
