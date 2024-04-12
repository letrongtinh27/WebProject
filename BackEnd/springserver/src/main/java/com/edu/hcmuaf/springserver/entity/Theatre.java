package com.edu.hcmuaf.springserver.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

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
    private Date opening_hours;
    private Long rooms;

}
