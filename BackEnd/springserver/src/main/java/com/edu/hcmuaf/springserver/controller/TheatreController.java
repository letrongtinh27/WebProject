package com.edu.hcmuaf.springserver.controller;

import com.edu.hcmuaf.springserver.entity.Theatre;
import com.edu.hcmuaf.springserver.service.TheatreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/theatres")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TheatreController {
    @Autowired
    private TheatreService theatreService;

    @GetMapping("/all")
    public ResponseEntity<?> getListTheatre() {
        List<Theatre> theatreList = theatreService.getAllTheatre();
        if (theatreList != null ) {
            return ResponseEntity.ok(theatreList);
        }
        return ResponseEntity.badRequest().body(null);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTheatreById(@PathVariable int id) {
        Theatre theatre = theatreService.getTheatreById(id);
        if (theatre != null) {
            return ResponseEntity.ok(theatre);
        }
        return ResponseEntity.badRequest().body(null);
    }



    @PostMapping("/")
    public ResponseEntity<?> createTheatre() {
        return null;
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTheatre() {
        return null;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTheatre() {
        return null;
    }
}
