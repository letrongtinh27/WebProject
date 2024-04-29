package com.edu.hcmuaf.springserver.controller;

import com.edu.hcmuaf.springserver.entity.ShowTime;
import com.edu.hcmuaf.springserver.service.ShowTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/show_time")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ShowTimeController {
    @Autowired
    private ShowTimeService showTimeService;

    @GetMapping("/all")
    public ResponseEntity<?> getListShowTime() {
        List<ShowTime> listShowTime = showTimeService.getAllShowtime();
        if(listShowTime != null) {
            return ResponseEntity.ok(listShowTime) ;
        }
        return ResponseEntity.badRequest().body(null);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getShowTimeById(@PathVariable int id) {
        ShowTime showTime = showTimeService.getShowTimeById(id);
        if(showTime != null) {
            return ResponseEntity.ok(showTime);
        }
        return ResponseEntity.badRequest().body(null);
    }

    @PostMapping("/")
    public ResponseEntity<?> createMovie() {
        return null;
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateMovie() {
        return null;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMovie() {
        return null;
    }
}

