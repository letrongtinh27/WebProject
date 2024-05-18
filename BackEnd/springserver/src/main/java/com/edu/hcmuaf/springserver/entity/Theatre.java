package com.edu.hcmuaf.springserver.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity

@Table(name = "theatres")
public class Theatre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long location_id;
    private String name;
    private String address;
    private String phone_number;
    private String email;
    private String description;
    private Long room_summary;
    private Time opening_hours;
    private Long rooms;

    @OneToOne
    @JoinTable(name = "location",
            joinColumns = @JoinColumn(name = "location_id"),
            inverseJoinColumns = @JoinColumn(name = "id"))
    private Location location;
}
