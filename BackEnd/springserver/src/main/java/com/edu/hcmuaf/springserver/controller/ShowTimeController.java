package com.edu.hcmuaf.springserver.controller;

import com.edu.hcmuaf.springserver.dto.ShowsResponse;
import com.edu.hcmuaf.springserver.entity.ShowTime;
import com.edu.hcmuaf.springserver.entity.Theatre;
import com.edu.hcmuaf.springserver.service.ShowTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.DateFormatter;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/shows")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ShowTimeController {
    @Autowired
    private ShowTimeService showTimeService;

    @GetMapping("/all")
    public ResponseEntity<?> getListShowTime() {
        List<ShowTime> showTimeList = showTimeService.getAllShowTime();
        if (showTimeList != null ) {
            return ResponseEntity.ok(showTimeList);
        }
        return ResponseEntity.badRequest().body(null);
    }

    @GetMapping("/get")
    public ResponseEntity<?> getShowsByMovieIdAndTheatreId(@RequestParam int movieId, @RequestParam int theatreId) {
        List<ShowsResponse> responses = new ArrayList<>();

        List<ShowTime> showTimeList = showTimeService.getShowTimesByMovieIdAndTheatreId(movieId, theatreId);

        if(!showTimeList.isEmpty()){
            for (ShowTime shows : showTimeList) {
                ShowsResponse s = new ShowsResponse();
                s.setId(shows.getId());
                s.setMovieId(shows.getMovieId());
                s.setTheatreId(shows.getTheatreId());
                LocalDate dt = shows.getStart_time().toLocalDate();
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/M");
                s.setDate(dt.format(formatter));
                s.setStart_time(shows.getStart_time().toLocalTime().format(DateTimeFormatter.ofPattern("hh:mm")));
                s.setStatus(shows.getStatus());
                responses.add(s);
            }
            return ResponseEntity.ok(responses);
        }
        return ResponseEntity.notFound().build();
    }


}