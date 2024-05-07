package com.edu.hcmuaf.springserver.entity;

import com.edu.hcmuaf.springserver.entity.Reservation;
import com.edu.hcmuaf.springserver.entity.Seat;
import com.edu.hcmuaf.springserver.entity.ShowTime;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "show_time_id")
    private ShowTime showTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seat_id")
    private Seat seat;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reservation_id")
    private Reservation reservation;

    private int price;
}
