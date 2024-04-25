package com.edu.hcmuaf.springserver.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalTime;

@NoArgsConstructor
@Getter
@Setter
public class ShowsResponse {
    private Long id;
    private int movieId;
    private int theatreId;
    private int room;
    private String date;
    private String start_time;
    private int status;
}
