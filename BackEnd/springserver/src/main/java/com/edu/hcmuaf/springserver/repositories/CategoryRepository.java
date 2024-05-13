package com.edu.hcmuaf.springserver.repositories;

import com.edu.hcmuaf.springserver.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Movie, Long> {
}
