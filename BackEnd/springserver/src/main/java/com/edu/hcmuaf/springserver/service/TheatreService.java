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
}
