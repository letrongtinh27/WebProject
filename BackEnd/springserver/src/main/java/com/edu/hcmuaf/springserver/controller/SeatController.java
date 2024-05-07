package com.edu.hcmuaf.springserver.controller;

import com.edu.hcmuaf.springserver.dto.SeatResponse;
import com.edu.hcmuaf.springserver.service.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/seats")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SeatController {
    @Autowired
    private SeatService seatService;

    @GetMapping("/get/{showTimeId}/{theatreId}/{room}")
    public ResponseEntity<List<SeatResponse>> getSeatsByShowTime(@PathVariable("showTimeId") int showTimeId, @PathVariable("theatreId") int theatreId, @PathVariable("room") int room) {
        List<SeatResponse> seats = seatService.getSeatsByShowTime(showTimeId, theatreId, room);

        Map<Integer, SeatResponse> idMap = new HashMap<>();

        for (SeatResponse seat : seats) {
            if (idMap.containsKey(seat.getId()) && seat.getPayment() != null) {
                idMap.put(seat.getId(), seat);
            }
            else if (!idMap.containsKey(seat.getId())) {
                idMap.put(seat.getId(), seat);
            }
        }
        List result = new ArrayList(idMap.values());

        return ResponseEntity.ok(result);
    }

}
