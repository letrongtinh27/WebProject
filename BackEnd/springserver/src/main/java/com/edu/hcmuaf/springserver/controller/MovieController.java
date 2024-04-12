package com.edu.hcmuaf.springserver.controller;

import com.edu.hcmuaf.springserver.entity.Movie;
import com.edu.hcmuaf.springserver.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/movies")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MovieController {
    @Autowired
    private MovieService movieService;
    @GetMapping("/all")
    public ResponseEntity<?> getListMovie() {
        List<Movie> listMovie = movieService.getAllMovie();
        if(listMovie != null) {
            return ResponseEntity.ok(listMovie) ;
        }
        return ResponseEntity.badRequest().body(null);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getMovieById(@PathVariable int id) {
        Movie movie = movieService.getMovieById(id);
        if(movie != null) {
            return ResponseEntity.ok(movie);
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