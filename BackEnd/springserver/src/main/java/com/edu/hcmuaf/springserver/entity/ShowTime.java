package com.edu.hcmuaf.springserver.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "show_time")
public class ShowTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "movie_id")
    private int movieId;
    @Column(name = "theatre_id")
    private int theatreId;
    private int room;
    private LocalDateTime start_time;
    private LocalDateTime end_time;
    private int status;
}