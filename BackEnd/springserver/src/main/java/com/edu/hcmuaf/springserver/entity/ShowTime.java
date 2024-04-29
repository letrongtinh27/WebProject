package com.edu.hcmuaf.springserver.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.stereotype.Component;

import java.sql.Date;

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
    private Long movie_id;
    private Long theatre_id;
    private Long room;
    private Date start_time;
    private Date end_time;
    private Long status;

    @OneToOne
    @JoinTable(name = "movies",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "id"))
    private Movie movie_st;

    @OneToOne
    @JoinTable(name = "theatres",
            joinColumns = @JoinColumn(name = "theatre_id"),
            inverseJoinColumns = @JoinColumn(name = "id"))
    private Theatre theatre_name;

}
