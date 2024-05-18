package com.edu.hcmuaf.springserver.service;

import com.edu.hcmuaf.springserver.entity.Theatre;
import com.edu.hcmuaf.springserver.repositories.TheatreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class TheatreService {
    @Autowired
    private TheatreRepository theatreRepository;

    public List<Theatre> getAllTheatre() {
        return theatreRepository.findAll();
    }

    public Theatre getTheatreById(int id) {
        return theatreRepository.findOneById(id);
    }

    public void deleteTheatreById(long id) {theatreRepository.deleteById(id);}

    public Theatre createTheatre(Theatre theatre) { return theatreRepository.save(theatre);}

    public Theatre updateTheatre(Theatre theatre, int id) { return null;}
}
