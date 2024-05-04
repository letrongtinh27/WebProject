package com.edu.hcmuaf.springserver.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Getter
@Setter
public class SeatResponse {
    private int id;
    private String seatNumber;
    private boolean isBooked;
}
