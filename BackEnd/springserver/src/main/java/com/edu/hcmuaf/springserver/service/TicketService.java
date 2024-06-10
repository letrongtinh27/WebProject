package com.edu.hcmuaf.springserver.service;

import com.edu.hcmuaf.springserver.entity.*;
import com.edu.hcmuaf.springserver.repositories.TicketRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.List;
@Service
public class TicketService {
    @Autowired
    private TicketRepository ticketRepository;

    public List<Ticket> getAllTicket() {
        return ticketRepository.findAll();
    }

    public Ticket getTicketById(int id) {
        return ticketRepository.findOneById(id);
    }

    public boolean checkExistTicket(int showTimeId, int seatId) {
        return ticketRepository.existsByShowTimeIdAndSeatId((long) showTimeId, seatId);
    }

    public void saveTicket(Ticket ticket) {
        ticketRepository.save(ticket);
    }

    public Ticket findTicketByTicketCode(String ticketCode) {
        return ticketRepository.findTicketByTicketCode(ticketCode).orElse(null);
    }

    public List<Ticket> findTicketsByUserId(int userId) {
        return ticketRepository.findTicketsByUserId((long) userId);
    }

    public void deleteTicket(long id) {
        ticketRepository.deleteById(id);
    }

    public Page<Ticket> getAllwithSort(String filter, int page, int perPage, String sortBy, String order) {
        Sort.Direction direction = Sort.Direction.ASC;
        if (order.equalsIgnoreCase("DESC"))
            direction = Sort.Direction.DESC;

        JsonNode filterJson;
        try {
            filterJson = new ObjectMapper().readTree(java.net.URLDecoder.decode(filter, StandardCharsets.UTF_8));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        Specification<Ticket> specification = (root, query, criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction();
            if (filterJson.has("q")) {
                Join<Ticket, ShowTime> showTimeJoin = root.join("showTime", JoinType.INNER);
                Join<ShowTime, Movie> movieJoin = showTimeJoin.join("movie", JoinType.INNER);
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(criteriaBuilder.lower(movieJoin.get("title")), "%" + filterJson.get("q").asText().toLowerCase() + "%"));
            }
            if (filterJson.has("movie")) {
                Join<Ticket, ShowTime> showTimeJoin = root.join("showTime", JoinType.INNER);
                Join<ShowTime, Movie> movieJoin = showTimeJoin.join("movie", JoinType.INNER);
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(movieJoin.get("title"), "%" + filterJson.get("movie").asText() + "%"));
            }
            if (filterJson.has("theatre")) {
                Join<Ticket, ShowTime> showTimeJoin = root.join("showTime", JoinType.INNER);
                Join<ShowTime, Theatre> theatreJoin = showTimeJoin.join("theatre", JoinType.INNER);
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(theatreJoin.get("name"), "%" + filterJson.get("theatre").asText() + "%"));
            }
            if (filterJson.has("seat")) {
                Join<Ticket, Seat> seatJoin = root.join("seat", JoinType.INNER);
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(seatJoin.get("rowChar"), "%" + filterJson.get("seat").asText() + "%"));
            }
            if (filterJson.has("seat_number")) {
                Join<Ticket, Seat> seatJoin = root.join("seat", JoinType.INNER);
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(seatJoin.get("seatNumber"), "%" + filterJson.get("seat_number").asText() + "%"));
            }
            return predicate;
        };

        if (sortBy.equals("movie.title")) {
            return ticketRepository.findAll(specification, PageRequest.of(page, perPage, Sort.by(direction, "showTime.movie.title")));
        }
        if (sortBy.equals("theatre.name")) {
            return ticketRepository.findAll(specification, PageRequest.of(page, perPage, Sort.by(direction, "showTime.theatre.name")));
        }
        if (sortBy.equals("seat.rowChar")) {
            return ticketRepository.findAll(specification, PageRequest.of(page, perPage, Sort.by(direction, "seat.rowChar")));
        }
        if (sortBy.equals("seat.seatNumber")) {
            return ticketRepository.findAll(specification, PageRequest.of(page, perPage, Sort.by(direction, "seat.seatNumber")));
        }
        return ticketRepository.findAll(specification, PageRequest.of(page, perPage, Sort.by(direction, sortBy)));
    }
}