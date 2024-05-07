package com.edu.hcmuaf.springserver.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Getter
@Setter
@ToString
public class SeatResponse {
    private int id;
    private String seatNumber;
    private int price;
    private String payment;
    private boolean isBooked;
}
