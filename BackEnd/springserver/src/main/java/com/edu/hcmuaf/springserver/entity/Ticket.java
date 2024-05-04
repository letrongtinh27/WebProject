package com.edu.hcmuaf.springserver.entity;

import jakarta.persistence.*;
import lombok.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "tickets")
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int show_time_id;
    private int seat_id;
    private int reservation_id;
    private int price;

    @OneToOne (fetch = FetchType.LAZY)
    @JoinTable(name = "show_time",
            joinColumns = @JoinColumn(name = "show_time_id"),
            inverseJoinColumns = @JoinColumn(name = "id"))
    private ShowTime showTime;
//
    @OneToOne (fetch = FetchType.LAZY)
    @JoinTable(name = "seats",
            joinColumns = @JoinColumn(name = "seat_id"),
            inverseJoinColumns = @JoinColumn(name = "id"))
    private Seat seat;

    @OneToOne (fetch = FetchType.LAZY)
    @JoinTable(name = "reservation",
            joinColumns = @JoinColumn(name = "reservation_id"),
            inverseJoinColumns = @JoinColumn(name = "id"))
    private Reservation reservation;
}
